// import $S from './stack';
const $S = require('../../../../../static/js/stack.js');
(function(global, factory) {

function checkStatus(params) {
    var status = true;
    for (var i = 0; i < params.length; i++) {
        if (!params[i]) {
            status = false;
            break;
        }
    }
    return status;
}

function getPlatForm(global) {
    var checkingWindowStatus = [];
    checkingWindowStatus.push(typeof global !== 'undefined');
    if (checkStatus(checkingWindowStatus)) {
        checkingWindowStatus.push(typeof global.constructor !== 'undefined');
    } else {
        checkingWindowStatus.push(false);
    }

    if (checkStatus(checkingWindowStatus)) {
        checkingWindowStatus.push(global.constructor.name === "Window");
    } else {
        checkingWindowStatus.push(false);
    }
    var windowStatus = checkStatus(checkingWindowStatus);

    var checkingNodeStatus = [];
    checkingNodeStatus.push(typeof exports === 'object');
    checkingNodeStatus.push(typeof module !== 'undefined');
    var nodeStatus = checkStatus(checkingNodeStatus);

    if (windowStatus) {
        if (typeof $S === undefined) {
            $S = window.$S;
        }
        return "Window";
    }
    if (nodeStatus) {
        return "Node.js";
    }
    return "";
}

var platform = getPlatForm(global);
factory(global, platform, $S);

}(this, function(global, Platform, $S) {

// var loopCount = 0;
var setValueCount = 0, setValueCountLimit = 400;
var AllCallbacks = [];
var possibleKeys = [];
var binaryPossibleValues = "";
var inputKeys = [];
var binaryInputValues = "";
var isUpdateBinaryValue = false;
var verifyExpression = true;
var isProcessingCountEnable = false;
var changeValueLogStatus = true;
var changeValueDataLoggingEnable = false;
var changeValueData = {
    "0to1": [],
    "1to0": [],
    "0to1WithIndex": [],
    "1to0WithIndex": [],
    "all": []
};
var currentValues = {};
var timerBits = {};
var pendingTimerBits = [];
var exps = {};
var debug = [];
var valueToBeChecked = [];
var processingCount = {};
var variableDependencies = {};
var binaryOperators = ["&&","||","~"];
var binaryOperatorIncludingBracket = ["(",")"].concat(binaryOperators);
var binaryOperatorIncludingValue = [true,false].concat(binaryOperators);
var rechekIndex = 0;

var EvaluatingExpressionKey = "";

var Model = function(selector, context) {
    return new Model.fn.init(selector, context);
};
function setValueTobeChecked(values) {
    valueToBeChecked = [];
    for (var i = 0; i < values.length; i++) {
        if (valueToBeChecked.indexOf(values[i]) >= 0) {
            continue;
        } else {
            valueToBeChecked.push(values[i]);
        }
    }
    return true;
}
function increaseProcessingCount(name) {
    if (isProcessingCountEnable === false) {
        return name;
    }
    if (processingCount[name]) {
        processingCount[name]++;
    } else {
        processingCount[name] = 1;
    }
    if (Model.isFunction(Model["processingCallBack"])) {
        Model["processingCallBack"](name, processingCount[name]);
    }
    return name;
}
function setVariableDependencies (name1, name2) {
    if (Model.isArray(variableDependencies[name1])) {
        if (variableDependencies[name1].indexOf(name2) < 0) {
            variableDependencies[name1].push(name2);
        }
    } else {
        variableDependencies[name1] = [name2];
    }
    if (Model.isArray(variableDependencies[name2])){
        if (variableDependencies[name2].indexOf(name1) < 0) {
            variableDependencies[name2].push(name1);
        }
    } else {
        variableDependencies[name2] = [name1];
    }
    return variableDependencies;
}
var setValue = (function() {
    function set(key, newValue, oldValue, callback) {
        var self = this;
        this._isValueChanged = false;
        if (Model.isValidKey(key) && Model.isValidValue(newValue)) {
            var timerData = timerBits[key], delay = 0;
            if (oldValue !== newValue && Model.isObject(timerData)) {
                if (newValue === 1 && Model.isNumeric(timerData["STP"])) {
                    delay = timerData["STP"] * 1;
                } else if (Model.isNumeric(timerData["STR"])) {
                    delay = timerData["STR"] * 1;
                }
            }
            function localSetValue(key2, new2, old2, callback2) {
                currentValues[key2] = new2*1;
                Model(key2).updateBinaryValue(new2);
                if (new2 !== old2) {
                    setValueCount++;
                    var keyEquivalent = "";
                    for (var i = 0; i < key2.length; i++) {
                        keyEquivalent += "-";
                    }
                    if (changeValueDataLoggingEnable) {
                        changeValueData["all"].push(key2);
                        if (old2 === 0) {
                            changeValueData["0to1"].push(key2);
                            changeValueData["0to1WithIndex"].push(key2);
                            changeValueData["1to0WithIndex"].push(keyEquivalent);
                        }
                        if (old2 === 1) {
                            changeValueData["1to0"].push(key2);
                            changeValueData["1to0WithIndex"].push(key2);
                            changeValueData["0to1WithIndex"].push(keyEquivalent);
                        }
                    }
                    if (changeValueLogStatus) {
                        $S.log(setValueCount + ": set " + key2 + " value change from " + old2 + " to " + new2);
                    }
                    $S.callMethodV4(callback2, key2, new2, old2, true);
                    self._isValueChanged = true;
                } else {
                    $S.callMethodV4(callback2, key2, new2, old2, false);
                }
            }
            if (delay > 0) {
                if (pendingTimerBits.indexOf(key) < 0) {
                    setTimeout(function(key1, new1, old1, callback1) {
                        pendingTimerBits = pendingTimerBits.filter(function(el, arr, i) {
                            return el !== key1;
                        });
                        localSetValue(key1, new1, old1, function(key3, new3, old3, isChanged) {
                            if (isChanged) {
                                if (Model.isFunction(Model["timerBitChange"])) {
                                    Model["timerBitChange"](key3, new3, old3, $S.clone(pendingTimerBits));
                                }
                            }
                            $S.callMethodV4(callback1, key3, new3, old3, isChanged);
                        });
                    }, delay, key, newValue, oldValue, callback);
                    pendingTimerBits.push(key);
                }
            } else {
                localSetValue(key, newValue, oldValue, callback);
            }
        } else {
            $S.log("Invalid key for set: " + key);
            if (Model.isFunction(callback)) {
                callback(key, newValue, oldValue, false);
            }
        }
        return this._isValueChanged;
    }
    set.prototype.isValueChanged = function() {
        return this._isValueChanged;
    };
    return set;
})();
function isValidValue(value) {
    if (isNaN(value) || [0,1].indexOf(value*1) < 0) {
        return false;
    }
    return true;
}
function isValidKey(key) {
    if (!$S.isString(key)) {
        return false;
    }
    return possibleKeys.indexOf(key) >= 0 ? true : false;
}
/*
Direct access by id: $M("id").get()
*/
Model.fn = Model.prototype = {
    constructor: Model,
    init: function(selector, context) {
        if (typeof selector === "string") {
            this.key = selector;
        }
        return this;
    },
    get: function() {
        if (isValidKey(this.key)) {
            return currentValues[this.key] ? currentValues[this.key] : 0;
        }
        $S.log("Invalid key for get: " + this.key);
        return 0;
    },
    isUp: function(value) {
        return this.get() === 1;
    },
    isDown: function(value) {
        return this.get() === 0;
    },
    addExp: function(exp) {
        if (isValidKey(this.key)) {
            if (exps[this.key] && exps[this.key].length) {
                if (exps[this.key].indexOf(exp) < 0) {
                    exps[this.key].push(exp);
                } else {
                    $S.log("Trying to add duplicate expression for key:" + this.key + ", expression:"+exp);
                }
            } else {
                exps[this.key] = [exp];
            }
        } else {
            $S.log("Invalid expression key:" + this.key);
        }
        return 0;
    },
    setTimerBits: function(extTimerBits) {
        if (Model.isObject(extTimerBits)) {
            timerBits = extTimerBits;
        }
        return timerBits;
    },
    setCurrentValues: function(extCurrentValues) {
        if (Model.isObject(extCurrentValues)) {
            for (var key in extCurrentValues) {
                if (isValidKey(key) && inputKeys.indexOf(key) >= 0) {
                    currentValues[key] = extCurrentValues[key];
                    Model(key).updateInputBinaryValue(extCurrentValues[key]);
                    Model(key).updateBinaryValue(extCurrentValues[key]);
                } else {
                    $S.log("Invalid setCurrentValues key: " + key);
                }
            }
        }
        return currentValues;
    },
    setInputKeys: function(extInputKeys) {
        if (Model.isArray(extInputKeys)) {
            for (var i = 0; i < extInputKeys.length; i++) {
                if (inputKeys.indexOf(extInputKeys[i]) >= 0) {
                    $S.log("Duplicate entry in inputKeys: " + extInputKeys[i]);
                    continue;
                }
                if ($S.isStringV2(extInputKeys[i]) && inputKeys.indexOf(extInputKeys[i]) < 0 && possibleKeys.indexOf(extInputKeys[i]) >= 0) {
                    inputKeys.push(extInputKeys[i]);
                }
            }
        }
        return 1;
    },
    setPossibleKeys: function(extPossibleKeys) {
        if (Model.isArray(extPossibleKeys)) {
            possibleKeys = [];
            for (var i = 0; i < extPossibleKeys.length; i++) {
                if (possibleKeys.indexOf(extPossibleKeys[i]) >= 0) {
                    $S.log("Duplicate entry in possibleKeys: " + extPossibleKeys[i]);
                    continue;
                }
                if ($S.isStringV2(extPossibleKeys[i])) {
                    possibleKeys.push(extPossibleKeys[i]);
                }
            }
            setValueTobeChecked(possibleKeys);
        }
        return 1;
    },
    setValueTobeChecked: function(values) {
        if (Model.isArray(values)) {
            setValueTobeChecked(values);
            return 1;
        }
        return 0;
    },
    setBinaryOperators: function(opr) {
        var operators = [];
        if (Model.isArray(opr)) {
            for (var i = 0; i < opr.length; i++) {
                if (["&&","&","*","||","|","#","+","~"].indexOf(opr[i]) >= 0) {
                    operators.push(opr[i]);
                }
            }
        }
        binaryOperators = operators;
        binaryOperatorIncludingBracket = ["(",")"].concat(binaryOperators);
        binaryOperatorIncludingValue = [true,false].concat(binaryOperators);
        return 1;
    },
    addDebug: function() {
        if (isValidKey(this.key)) {
            if (debug.indexOf(this.key) < 0) {
                debug.push(this.key);
                return 1;
            } else {
                $S.log("Trying duplicate entry for debug: " + this.key);
            }
        } else {
            $S.log("Invalid key for debug:" + this.key);
        }
        return 0;
    },
    updateBinaryValue: function(newValue) {
        if (isUpdateBinaryValue && isValidKey(this.key)) {
            if (binaryPossibleValues.length !== possibleKeys.length) {
                binaryPossibleValues = "";
                for (var i=0; i<possibleKeys.length; i++) {
                    binaryPossibleValues += "0";
                }
            }
            var index = possibleKeys.indexOf(this.key);
            if (index < 0) {
                return;
            }
            binaryPossibleValues = binaryPossibleValues.substring(0, index) + newValue + binaryPossibleValues.substring(index + 1);
        }
    },
    updateInputBinaryValue: function(newValue) {
        if (isValidKey(this.key)) {
            if (binaryInputValues.length !== inputKeys.length) {
                binaryInputValues = "";
                for (var i=0; i<inputKeys.length; i++) {
                    binaryInputValues += "0";
                }
            }
            var index = inputKeys.indexOf(this.key);
            if (index < 0) {
                return;
            }
            binaryInputValues = binaryInputValues.substring(0, index) + newValue + binaryInputValues.substring(index + 1);
        }
    }
};
$S.extendObject(Model);
function checkInputValueChange() {
    var _currentBinaryInput = "";
    var temp;
    if (Model.isFunction(Model["getCurrentInput"])) {
        _currentBinaryInput = Model["getCurrentInput"]();
        if (_currentBinaryInput !== binaryInputValues || binaryInputValues.length !== inputKeys.length) {
            Model.setInputValueFromBinary(_currentBinaryInput);
        }
    }
}
function getExpressionValueByName(name) {
    var exp = exps[name];
    var oldValue = Model(name).get();
    var newValue = 0;
    if (debug.indexOf(name) >=0) {
        EvaluatingExpressionKey = name;
        $S.log("DEBUG: " + name);
    }
    checkInputValueChange();
    newValue = Model.isAllExpressionsTrue(exp) ? 1 : 0;
    if (debug.indexOf(name) >=0) {
        $S.log(name + ", oldValue=" + oldValue + ", newValue=" + newValue);
        EvaluatingExpressionKey = "";
    }
    return newValue;
}
Model.extend({
    fire: function(name) {
        for (var i = 0; i < AllCallbacks.length; i++) {
            if (AllCallbacks[i][name]) {
                Model.callMethod(AllCallbacks[i][name]);
            }
        }
        return 1;
    }
});
/* Stack warpper */
Model.extend({
    getStack: function(shareStorage) {
        return $S.getStack(shareStorage);
    },
    getLocalStorage: function() {
        return $S.getLocalStorage();
    },
    getTable: function(tableContent, tableId) {
        return $S.getTable(tableContent, tableId);
    },
    getDT: function() {
        return $S.getDT();
    },
    getBT: function(data) {
        return $S.getBT(data);
    },
    getBST: function(data) {
        return $S.getBST(data);
    },
    getRandomNumber: function(minVal, maxVal) {
        return $S.getRandomNumber(minVal, maxVal);
    },
    getUniqueNumber: function() {
        return $S.getUniqueNumber();
    },
    getRequestId: function() {
        return $S.getRequestId();
    },
    setLoggerDateTimeState: function(state,formats,splitter) {
        return $S.setLoggerDateTimeState(state,formats,splitter);
    },
    log: function(logText, loggerInfo) {
        return $S.log(logText, loggerInfo);
    },
    logV2: function(loggerInfo, logText) {
        return $S.logV2(loggerInfo, logText);
    },
    isString: function(value) {
        return $S.isString(value);
    },
    isArray: function(value) {
        return $S.isArray(value);
    },
    isObject: function(value) {
        return $S.isObject(value);
    },
    isNumber: function(value) {
        return $S.isNumber(value);
    },
    isNumeric: function(value) {
        return $S.isNumeric(value);
    },
    isFunction: function(value) {
        return $S.isFunction(value);
    },
    clone: function(source) {
        return $S.clone(source);
    },
    getScriptFileNameRef: function() {
        return $S.getScriptFileNameRef();
    },
    loadJsonData: function(JQ, urls, eachApiCallback, callBack, apiName, ajaxApiCall) {
        return $S.loadJsonData(JQ, urls, eachApiCallback, callBack, apiName, ajaxApiCall);
    },
    addElAt: function(arr, index, el) {
        return $S.addElAt(arr, index, el);
    },
    callMethod: function(method) {
        return $S.callMethod(method);
    },
    getDomino: function(dominoName) {
        return $S.getDomino(dominoName);
    },
    extendObject: function(Obj) {
        return $S.extendObject(Obj);
    }
});
/*Direct access of methods: $M.methodName*/
Model.extend({
    setVariableDependencies: function() {
        for (var expName in exps) {
            var expressions = exps[expName];
            var tokenizedExp = [];
            for (var i = 0; i < expressions.length; i++) {
                tokenizedExp = Model.getTokenizedExp(expressions[i]);
                if (tokenizedExp.length) {
                    for (var j = 0; j < tokenizedExp.length; j++) {
                        if (binaryOperatorIncludingBracket.indexOf(tokenizedExp[j]) < 0) {
                            setVariableDependencies(expName, tokenizedExp[j]);
                        }
                    }
                }
            }
        }
        return variableDependencies;
    },
    updateVariableDependencies: function(name, dependencies) {
        if (isValidKey(name) && Model.isArray(dependencies)) {
            variableDependencies[name] = dependencies;
        }
        return variableDependencies;
    }
});
Model.extend({
    enableChangeValueDataLogging: function() {
        changeValueDataLoggingEnable = true;
        return 1;
    },
    disableChangeValueDataLogging: function() {
        changeValueDataLoggingEnable = false;
        return 0;
    },
    enableChangeLogValueStatus: function() {
        changeValueLogStatus = true;
        return 1;
    },
    disableChangeLogValueStatus: function() {
        changeValueLogStatus = false;
        return 0;
    },
    enableVerifyExpression: function() {
        verifyExpression = true;
        return 1;
    },
    disableVerifyExpression: function() {
        verifyExpression = false;
        return 0;
    },
    enableUpdateBinaryValue: function() {
        isUpdateBinaryValue = true;
        return 1;
    },
    disableUpdateBinaryValue: function() {
        isUpdateBinaryValue = false;
        return 0;
    },
    isUpdateBinaryValueEnable: function() {
        return isUpdateBinaryValue;
    },
    enableProcessingCount: function() {
        isProcessingCountEnable = true;
        return 1;
    },
    disableProcessingCount: function() {
        isProcessingCountEnable = false;
        return 0;
    },
    getSetValueCount: function() {
        return setValueCount;
    },
    resetSetValueCount: function(newLimit) {
        setValueCount = 0;
        return 1;
    },
    changeSetValueCountLimit: function(newLimit) {
        if(Model.isNumber(newLimit)) {
            setValueCountLimit = newLimit*1;
            return 1;
        }
        $S.log("Invalid newLimit:" + newLimit);
        return 0;
    },
    getSetValueCountLimit: function() {
        return setValueCountLimit;
    },
    addCallbackSetValueCountLimitExceed: function(callBack) {
        AllCallbacks.push({"SetValueCountLimitExceed": callBack});
        return 1;
    }
});
Model.extend({
    isValidValue: function(value) {
        return isValidValue(value);
    },
    isValidKey: function(key) {
        return isValidKey(key);
    },
    isMethodDefined: function(name) {
        return Model.isFunction(this[name]);
    },
    isExpDefined: function(name) {
        if (exps[name] && exps[name].length) {
            return true;
        }
        return false;
    },
    getExps: function() {
        var expsResponse = {};
        var count = 0;
        for (var key in exps) {
            expsResponse[key] = exps[key];
            count++;
        }
        return {exps: expsResponse, count: count};
    },
    getInputKeys : function() {
        return $S.clone(inputKeys);
    },
    getPossibleKeys : function() {
        return $S.clone(possibleKeys);
    },
    getBinaryInputValue: function() {
        return binaryInputValues;
    },
    getBinaryPossibleValue: function() {
        return binaryPossibleValues;
    },
    getValueToBeChecked : function() {
        return $S.clone(valueToBeChecked);;
    },
    getPendingTimerBits: function() {
        return $S.clone(pendingTimerBits);
    },
    getProcessingCountStatus: function() {
        return isProcessingCountEnable;
    },
    getVerifyExpressionStatus: function() {
        return verifyExpression;
    },
    getProcessingCount: function() {
        var bst = Model.getBST();
        var response = {sortedResult: {}, total: 0, itemsCount: 0, processingCount: {}};
        for (var key in processingCount) {
            response.itemsCount++;
            response.total += processingCount[key];
            response.processingCount[key] = processingCount[key];
            var currentNode = bst.insertData(bst, processingCount[key]);
            currentNode.item = {count: processingCount[key], name: key};
        }
        var bstArr = bst.getInOrder(bst, []);
        var result = {};
        for (var i = bstArr.length-1; i >= 0; i--) {
            if (bstArr[i].item) {
                result[bstArr[i].item.name] = bstArr[i].item.count;
            }
        }
        response.sortedResult = result;
        return response;
    },
    getAllChangeValueData: function (changeValueKey) {
        return Model.clone(changeValueData);
    },
    getChangeValueData: function (changeValueKey) {
        var response = [];
        if (Model.isArray(changeValueData[changeValueKey])) {
            response = $S.clone(changeValueData[changeValueKey]);
        }
        return response;
    },
    resetChangeValueData: function () {
        for (var key in changeValueData) {
            changeValueData[key] = [];
        }
        return 0;
    },
    getVariableDependencies: function(sortedResultRequired) {
        var bst = Model.getBST();
        var response = {sortedResult: {}, count: 0, dependencies: {}};
        var keyName;
        for (keyName in variableDependencies) {
            response.count++;
            response.dependencies[keyName] = variableDependencies[keyName];
        }
        if ($S.isBoolean(sortedResultRequired) && sortedResultRequired) {
            for (keyName in response.dependencies) {
                var currentNode = bst.insertData(bst, response.dependencies[keyName].length);
                currentNode.item = {count: response.dependencies[keyName].length, name: keyName};
            }
            var bstArr = bst.getInOrder(bst, []);
            var result = {};
            for (var i = bstArr.length-1; i >= 0; i--) {
                if (bstArr[i].item) {
                    result[bstArr[i].item.name] = bstArr[i].item.count;
                }
            }
            response.sortedResult = result;
        }
        return response;
    },
    getVariableDependenciesByKey: function(name) {
        var dependentVariable = [];
        if (variableDependencies[name]) {
            dependentVariable = variableDependencies[name];
        }
        return dependentVariable;
    },
    getCurrentValues : function() {
        var count = Object.keys(currentValues).length;
        return {currentValues: $S.clone(currentValues), count: count};
    }
});
Model.extend({
    is: function(key, type) {
        if (type === "up") {
            return Model(key).isUp();
        } else if (type === "dn") {
            return Model(key).isDown();
        }
        return false;
    },
    isUp: function(key) {
        return Model(key).isUp();
    },
    isAllUp: function(keys) {
        if (Model.isArray(keys) && keys.length > 0) {
            for (var i = 0; i < keys.length; i++) {
                if (Model(keys[i]).isDown()) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    isDown: function(key) {
        return Model(key).isDown();
    },
    isAllDown: function(keys) {
        if (Model.isArray(keys) && keys.length > 0) {
            for (var i = 0; i < keys.length; i++) {
                if (Model(keys[i]).isUp()) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    getValue: function(key) {
        return Model(key).get();
    },
    getAllValue: function(keys) {
        var response = [];
        if (Model.isArray(keys)) {
            for (var i = 0; i < keys.length; i++) {
                response.push(Model(keys[i]).isUp());
            }
        }
        return response;
    },
    setValue: function(key, newValue, callback) {
        if (setValueCount >= setValueCountLimit) {
            Model.fire("SetValueCountLimitExceed");
            setValueCount++;
            var logText = setValueCount + ": Limit exceed, key:" + key + ", value:" + newValue;
            $S.log(logText);
            throw logText;
        }
        var oldValue = Model(key).get();
        new setValue(key, newValue, oldValue, function(finalKey, finalNewValue, finalOldValue, isChanged) {
            if (isChanged) {
                if (Model.isFunction(Model["setValueChangedCallback"])) {
                    Model["setValueChangedCallback"](finalKey, finalNewValue, finalOldValue, function() {
                        $S.callMethod(callback);
                    });
                }
            } else {
                $S.callMethod(callback);
            }
        });
        return 0;
    },
    toggleValue: function(key, callback) {
        var newValue = 1;
        if (Model(key).isUp()) {
            newValue = 0;
        }
        return Model.setValue(key, newValue, callback);
    }
});
Model.extend({
/*
possibleKeys = [1,2,3,4,5,6,7,8,9,10];
variableDependencies = {
    1: [2,3,4]
    2: [1,3]
    3: [1,2,5,6]
    4: [1]
    5: [3]
    6: [3]
};
exps : {
    1: []
    2: []
    3: []
    4: []
    5: []
    6: []
};
*/
    reCheckAllValues: function(callback) {
        if (rechekIndex >= valueToBeChecked.length) {
            rechekIndex = 0;
        }
        for (var i = rechekIndex; i < valueToBeChecked.length; i++) {
            var name = valueToBeChecked[i];
            rechekIndex++;
            increaseProcessingCount(name);
            var modelNode = Model(name);
            var oldValue = modelNode.get();
            var newValue = 0;
            if (Model.isExpDefined(name)) {
                Model.setValueWithExpression(name, function() {
                    setImmediate(function() {
                        Model.reCheckAllValues(callback);
                    });
                });
                return;
            } else if (Model.isMethodDefined(name)) {
                Model[name](name, function() {
                    setImmediate(function() {
                        Model.reCheckAllValues(callback);
                    });
                });
                return;
            }
        }
        if (rechekIndex >= valueToBeChecked.length) {
            $S.callMethod(callback);
        }
        return 1;
    },
    generateExpression: function(items) {
        var itemsWithExp = $S.generateExpression(items);
        return itemsWithExp ? itemsWithExp["exp"] : "";
    },
    setValueWithExpression: function(name, callback) {
        var newValue = getExpressionValueByName(name);
        Model.setValue(name, newValue, callback);
        return newValue;
    },
    getTokenizedExp: function(exp) {
        var tokenizedExp = $S.tokenize(exp, binaryOperatorIncludingBracket);
        return tokenizedExp;
    },
    isExpressionTrue: function(exp) {
        var tokenizedExp = Model.getTokenizedExp(exp);
        var posix = Model["createPosixTree"](tokenizedExp);
        var posixVal = [], posixValue, i;
        if (posix.length) {
            for (i = 0; i < posix.length; i++) {
                posixValue = posix[i];
                /*  posixValue can be following:
                        "key","~",
                        "&&","&",
                        "||","|","#",
                        "*","+"
                */
                if (binaryOperators.indexOf(posixValue) < 0) {
                    posixValue = Model.isUp(posixValue);
                }
                posixVal.push(posixValue);
            }
        }
        var result = $S.calBinary(posixVal);
        if (debug.indexOf(EvaluatingExpressionKey) >=0) {
            console.log(exp);
            console.log(posix);
            console.log(posixVal);
            var posixMapping = {};
            var tempKey = "";
            for (i = 0; i < posix.length; i++) {
                tempKey = posix[i];
                if (posixMapping[tempKey]) {
                    tempKey += ":"+i;
                }
                posixMapping[tempKey] = posixVal[i];
            }
            console.log(posixMapping);
            console.log(result);
        }
        /** Expression validation start **/
        if (verifyExpression) {
            var isValidExpression = true;
            for (i = 0; i < posixVal.length; i++) {
                if (binaryOperatorIncludingValue.indexOf(posixVal[i]) >= 0) {
                    continue;
                } else {
                    isValidExpression = false;
                    $S.log(EvaluatingExpressionKey + ": invalid posixVal: " + posixVal[i]);
                }
            }
            var tokenizedExpLength = 0;
            for (i = 0; i < tokenizedExp.length; i++) {
                if (["(",")"].indexOf(tokenizedExp[i]) >= 0) {
                    continue;
                }
                tokenizedExpLength++;
            }
            if (tokenizedExpLength !== posixVal.length) {
                isValidExpression = false;
                $S.log(EvaluatingExpressionKey + ": invalid expression: " + exp);
            }
            if (isValidExpression === false) {
                throw new Error(EvaluatingExpressionKey + ": invalid expression:" + exp);
            }
        }
        /** Expression validation End **/
        return result;
    }
});
Model.extend({
    isAllExpressionsTrue: function(exps) {
        var status = false, exp = "";
        if (Model.isArray(exps)) {
            for (var i = 0; i < exps.length; i++) {
                exp = exps[i];
                if (Model.isObject(exp)) {
                    exp = Model.generateExpression(exp);
                }
                if (Model.isExpressionTrue(exp)) {
                    status = true;
                    continue;
                } else {
                    status = false;
                    break;
                }
            }
        } else if (Model.isObject(exps)) { 
            status = Model.isAllExpressionsTrue([exps]);
        }
        return status;
    },
    "createPosixTree": $S.createPostOrderTree,
    setCreatePosixTreeMethodWithFilter: function() {
        $S.setSkipValuesFromPosixResult([""]);
        Model.extend({"createPosixTree": $S.createPosixTree});
    }
});
Model.extend({
    getTprClass: function(name) {
        if (Model.isValidKey(name + "-R")) {
            if (Model.isUp(name + "-R")) {
                return "btn-danger";
            }
        }
        if (Model.isValidKey(name + "-Y")) {
            if (Model.isUp(name + "-Y")) {
                return "btn-warning";
            }
        }
        if (Model.isDown(name)) {
            // return "btn-danger";
        }
        return "";
    }
});
Model.$S = $S;
/*End of direct access of methods*/
if (Platform === "Window") {
    window.$M = Model;
} else if (Platform === "Node.js") {
    module.exports = Model;
}
}));
