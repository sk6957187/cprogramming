import './model'; var $M = window.$M;

/*
    - Load possibleValue, initialValue and expressions from api
        - It do not care about rendering yardHtml using yard api data
    - Set these values to model ($M)
*/

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
        if (typeof $M === undefined) {
            $M = window.$M;
        }
        return "Window";
    }
    if (nodeStatus) {
        return "Node.js";
    }
    return "";
}

var platform = getPlatForm(global);
factory(global, platform, $M, $S);

}(window, function(global, Platform, $M, $S) {

var LoggerInfo = $M.getScriptFileNameRef();
var YardApiModel = function(selector, context) {
    return new YardApiModel.fn.init(selector, context);
};

YardApiModel.fn = YardApiModel.prototype = {
    constructor: YardApiModel,
    init: function(selector, context) {
        this.selector = selector;
        this.context = context;
        return this;
    }
};

$M.extendObject(YardApiModel);
var $, ajaxApiCall;
YardApiModel.extend({
    setJquery: function(jQuery) {
        $ = jQuery;
    },
    setAjaxApiCall: function(method) {
        ajaxApiCall = method;
    }
});


var RequestId = $M.getRequestId();

var YardData = {};
var YardControlData = {};
var PartialExpressions = {};
var PossibleValues = [];
var InitialValues = {};
var AllExpressions = [];
var ExpWithoutKey = {};
var TimerBits = {};

var ExpressionsAdded = [];

var PartialExpressionsLoadStatus = false;
var PossibleValuesLoadStatus = false;
var InitialValuesLoadStatus = false;
var ExpressionsLoadStatus = false;
var ExpressionsTxtLoadStatus = false;
var AsyncDataLoadStatus = false;

var YardDataPath = [];
var YardControlDataPath = [];
var PartialExpressionsPath = [];
var PossibleValuePath = [];
var InitialValuePath = [];
var ExpressionsPath = [];
var ExpressionsTxtPath = [];
var AsyncDataPath = [];
var TimerBitsPath = [];

var PossibleValuesByTypes = {};

var partialKeys = [];

function isApisLoadComplete() {
    var loadingCheck = [];
    loadingCheck.push(PartialExpressionsLoadStatus);
    loadingCheck.push(PossibleValuesLoadStatus);
    loadingCheck.push(InitialValuesLoadStatus);
    loadingCheck.push(ExpressionsLoadStatus);
    loadingCheck.push(ExpressionsTxtLoadStatus);
    loadingCheck.push(AsyncDataLoadStatus);
    for (var i = 0; i < loadingCheck.length; i++) {
        if (loadingCheck[i] === false) {
            return false;
        }
    }
    return true;
}


function loadYardData(callBack) {
    var url = [];
    for (var i = 0; i < YardDataPath.length; i++) {
        url.push(YardDataPath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callBack);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isObject(response)) {
            for (var key in response) {
                Object.assign(YardData, response[key]);
            }
        } else {
            $M.log("Invalid response (yardData):" + response, LoggerInfo);
        }
    }, callBack, null, ajaxApiCall);
}

function loadYardControlData(callBack) {
    var url = [];
    for (var i = 0; i < YardControlDataPath.length; i++) {
        url.push(YardControlDataPath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callBack);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isArray(response)) {
            YardControlData = response;
        } else {
            $M.log("Invalid response (yardData):" + response, LoggerInfo);
        }
    }, callBack, null, ajaxApiCall);
}

function loadAsyncData(callBack) {
    var url = [];
    for (var i = 0; i < AsyncDataPath.length; i++) {
        url.push(AsyncDataPath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callBack);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isObject(response)) {
            $M.setAsyncData(response);
        } else {
            $M.log("Invalid response (asyncData):" + response, LoggerInfo);
        }
    }, callBack, null, ajaxApiCall);
}

function loadPartialExpressions(callBack) {
    var url = [];
    for (var i = 0; i < PartialExpressionsPath.length; i++) {
        url.push(PartialExpressionsPath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callBack);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isObject(response)) {
            for (var key in response) {
                PartialExpressions[key] = response[key];
                partialKeys.push(key);
            }
        } else {
            $M.log("Invalid response (partialExpressions):" + response, LoggerInfo);
        }
    }, callBack, null, ajaxApiCall);
}

function loadPossibleValues(callBack) {
    var url = [];
    for (var i = 0; i < PossibleValuePath.length; i++) {
        url.push(PossibleValuePath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callBack);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isObject(response)) {
            for (var key in response) {
                if ($M.isArray(response[key])) {
                    for (var i = 0; i < response[key].length; i++) {
                        if (key === "addDebug") {
                            continue;
                        }
                        if ($M.isString(response[key][i])) {
                            PossibleValues.push(response[key][i]);
                        }
                    }
                    if ($M.isArray(PossibleValuesByTypes[key])) {
                        PossibleValuesByTypes[key] = PossibleValuesByTypes[key].concat(response[key]);
                    } else {
                        PossibleValuesByTypes[key] = response[key];
                    }
                }
            }
        } else {
            $M.log("Invalid response (possibleValue):" + response, LoggerInfo);
        }
    }, callBack, null, ajaxApiCall);
}
function loadInitialValues(callBack) {
    var url = [];
    for (var i = 0; i < InitialValuePath.length; i++) {
        url.push(InitialValuePath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callBack);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isObject(response)) {
            Object.assign(InitialValues, response);
        } else {
            $M.log("Invalid response (initialValue):" + response, LoggerInfo);
        }
    }, callBack, null, ajaxApiCall);
}
function loadTimerBits(callback) {
    var url = [];
    for (var i = 0; i < TimerBitsPath.length; i++) {
        url.push(TimerBitsPath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callback);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isObject(response)) {
            Object.assign(TimerBits, response);
        } else {
            $M.log("Invalid response (timer_bits):" + response, LoggerInfo);
        }
    }, callback, null, ajaxApiCall);
}
function addExp(key, exp) {
    var partialKey, partialExp;
    for (var i = 0; i < partialKeys.length; i++) {
        partialKey = partialKeys[i];
        if (exp.search(partialKey) >= 0) {
            partialExp = $M.generateExpression(PartialExpressions[partialKey]);
            exp = exp.replace(partialKey, partialExp);
            i = 0;
        }
    }
    return $M(key).addExp(exp);
}
function loadExpressions(callBack) {
    function expressionLoadComplete() {
        var allExpressions = AllExpressions, exps;
        for (var i = 0; i < allExpressions.length; i++) {
            exps = allExpressions[i];
            for (var key in exps) {
                if (ExpressionsAdded.indexOf(key) < 0) {
                    ExpressionsAdded.push(key);
                } else {
                    $M.log("Expressions for '" + key + "' already added.", LoggerInfo);
                }
                if ($M.isArray(exps[key])) {
                    for (var j = 0; j < exps[key].length; j++) {
                        if ($M.isObject(exps[key][j])) {
                            addExp(key, $M.generateExpression(exps[key][j]));
                            // $M(key).addExp($M.generateExpression(exps[key][j]));
                        } else {
                            addExp(key, exps[key][j]);
                            // $M(key).addExp(exps[key][j]);
                        }
                    }
                } else if ($M.isObject(exps[key])) {
                    addExp(key, $M.generateExpression(exps[key]));
                    // $M(key).addExp($M.generateExpression(exps[key]));
                }
            }
        }
    }
    var url = [];
    for (var i = 0; i < ExpressionsPath.length; i++) {
        url.push(ExpressionsPath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        expressionLoadComplete();
        return $M.callMethod(callBack);
    }
    $M.loadJsonData($, url, function(response) {
        if ($M.isObject(response)) {
            AllExpressions.push(response);
        }
    }, function() {
        expressionLoadComplete();
        callBack();
    }, null, ajaxApiCall);
}
function loadTxtExpressions(callBack) {
    var url = [];
    for (var i = 0; i < ExpressionsTxtPath.length; i++) {
        url.push(ExpressionsTxtPath[i]+"?"+RequestId);
    }
    if (url.length === 0) {
        return $M.callMethod(callBack);
    }
    $S.loadJsonData($, url, function(response) {
        if ($S.isString(response)) {
            var t = response.split("\n");
            var temp = {}, t2;
            for (var j=0; j<t.length; j++) {
                if (!$S.isStringV2(t[j])) {
                    continue;
                }
                t[j] = t[j].replaceAll(" ", "");
                t[j] = t[j].split("\r").join("");
                t2 = t[j].split("=");
                if (t2.length !== 2) {
                    console.log("Invalid expression: " + t[j]);
                    continue;
                }
                if (temp[t2[0]]) {
                    // console.log("Duplicate entry: " + t[j] + ":::" + temp[t2[0]]);
                    continue;
                }
                temp[t2[0]] = [t2[1]];
            }
        }
        if ($M.isObject(temp)) {
            AllExpressions.push(temp);
        }
    }, function() {
        callBack();
    }, null, ajaxApiCall);
}

YardApiModel.extend({
    loadYardData: function(callBack) {
        loadYardData(function() {
            callBack(YardData);
        });
    },
    loadYardControlData: function(callBack) {
        loadYardControlData(function() {
            callBack(YardControlData);
        });
    },
    documentLoaded: function(callBack) {
        loadAsyncData(function() {
            AsyncDataLoadStatus = true;
            loadPartialExpressions(function() {
                PartialExpressionsLoadStatus = true;
                loadTxtExpressions(function() {
                    ExpressionsTxtLoadStatus = true;
                    loadPossibleValues(function() {
                        PossibleValuesLoadStatus = true;
                        $M().setPossibleValues(PossibleValues);
                        var debugItems = YardApiModel.getPossiblesValueByType("addDebug");
                        for (var j = 0; j < debugItems.length; j++) {
                            $M(debugItems[j]).addDebug();
                        }
                        loadTimerBits(function() {
                            $M().setTimerBits(TimerBits);
                            loadInitialValues(function() {
                                InitialValuesLoadStatus = true;
                                $M().initializeCurrentValues(InitialValues);
                                loadExpressions(function() {
                                    ExpressionsLoadStatus = true;
                                    if (isApisLoadComplete()) {
                                        callBack();
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});

YardApiModel.extend({
    getAllPossiblesValueByType: function() {
        return PossibleValuesByTypes;
    },
    getPossiblesValueByType: function(key) {
        if (PossibleValuesByTypes[key]) {
            return PossibleValuesByTypes[key];
        }
        return [];
    },
    getPossibleKeys: function() {
        return PossibleValues;
    },
    setApisPath: function(paths) {
        for (var key in paths) {
            switch(key) {
                case "yard-data":
                    YardDataPath = PossibleValuePath.concat(paths[key]);
                break;
                case "yard-control-btn-data":
                    YardControlDataPath = PossibleValuePath.concat(paths[key]);
                break;
                case "possible-value":
                    PossibleValuePath = PossibleValuePath.concat(paths[key]);
                break;
                case "initial-value":
                    InitialValuePath = InitialValuePath.concat(paths[key]);
                break;
                case "timer_bits":
                    TimerBitsPath = TimerBitsPath.concat(paths[key]);
                break;
                case "expressions":
                    ExpressionsPath = ExpressionsPath.concat(paths[key]);
                break;
                case "expressionsTxt":
                    ExpressionsTxtPath = ExpressionsTxtPath.concat(paths[key]);
                break;
                case "async-data":
                    AsyncDataPath = AsyncDataPath.concat(paths[key]);
                break;
                case "partial-expressions-value":
                    PartialExpressionsPath = PartialExpressionsPath.concat(paths[key]);
                break;
                default:
                break;
            }
        }
        return 1;
    }
});
YardApiModel.extend({
    getExpressionsStatus: function() {
        var possiblesValueByType = PossibleValuesByTypes;
        var expressions = $M.getExps().exps;
        var missingExpressionItems = {};
        var expMissingList = [];
        var foundExpressionItens = {};
        var expFoundList = [];
        var item;

        for (var type in possiblesValueByType) {
            for (var i = 0; i < possiblesValueByType[type].length; i++) {
                item = possiblesValueByType[type][i];
                if ($M.isArray(expressions[item])) {
                    if (!$M.isArray(foundExpressionItens[type])) {
                        foundExpressionItens[type] = [];
                    }
                    foundExpressionItens[type].push(item);
                    expFoundList.push(item);
                    continue;
                }
                if (!$M.isArray(missingExpressionItems[type])) {
                    missingExpressionItems[type] = [];
                }
                expMissingList.push(item);
                missingExpressionItems[type].push(item);
            }
        }
        var response = {
            missing: missingExpressionItems,
            found: foundExpressionItens,
            expMissingList: expMissingList,
            expFoundList: expFoundList,
            expWithoutKey: ExpWithoutKey
        };
        return response;
    }
});
var logData = [];

YardApiModel.extend({
    displayChangeValueData: function() {
        var changeValueData = $M.getAllChangeValueData();
        var zeroTo1 = changeValueData["0to1WithIndex"];
        var oneTo0 = changeValueData["1to0WithIndex"];
        var all = changeValueData["all"];
        var time = "";
        if (all.length < 1) {
            return;
        }
        $M.addElAt(logData, 0, {zeroTo1: zeroTo1, oneTo0: oneTo0, all: all, time: $S.getDT().getDateTime("hh/:/mm/:/ss/:/ms", "/")});
        // console.log(zeroTo1);
        // console.log(oneTo0);
        // console.log(all);
        var displayHtml = "";
        for (var i = 0; i < logData.length; i++) {
            zeroTo1 = logData[i]["zeroTo1"];
            oneTo0 = logData[i]["oneTo0"];
            all = logData[i]["all"];
            time = logData[i]["time"];
            if (zeroTo1.length !== oneTo0.length) {
                $M.logV2(LoggerInfo, "Invalid data.");
                console.log(logData[i]);
                continue;
            }
            var tempData = [];
            var tableData = [time];
            var dataAddedStatus;
            for (var j = 0; j < zeroTo1.length; j++) {
                dataAddedStatus = false;
                if (all.indexOf(zeroTo1[j]) >= 0) {
                    dataAddedStatus = true;
                    tableData.push('<span class="alert-success">' + zeroTo1[j] + '</span>');
                }
                if (all.indexOf(oneTo0[j]) >= 0) {
                    dataAddedStatus = true;
                    tableData.push('<span class="alert-warning">' + oneTo0[j] + '</span>');
                }
                if (!dataAddedStatus) {
                    tempData.push(zeroTo1[j]);
                    tempData.push(oneTo0[j]);
                }
            }
            if (tempData.length) {
                $M.logV2(LoggerInfo, "Keys not found in all.");
                console.log(tempData);
            }
            var table = $M.getTable([tableData], "display-log");
            table.addColIndex(1);
            displayHtml += table.getHtml();
            displayHtml += "<hr>";
        }
        $("#changeValueData").html(displayHtml);
        $("#changeValueData table").addClass("table table-bordered");
        $("span.alert-warning").parent("td").addClass("alert-warning")
        $("span.alert-success").parent("td").addClass("alert-success")
        return 1;
    }
});


var lsKey = "displayYardDominoBoundary";
var keyMapping = {
    "displayYardDominoBoundary": "item1"
};
lsKey = keyMapping[lsKey];

var LS = $M.getLocalStorage();

YardApiModel.extend({
    getDisplayYardDominoBoundary: function() {
        var lsValue = LS.get(lsKey);
        var response = false;
        if (lsValue.status && lsValue.value === "true") {
            response = true;
        }
        return response;
    },
    toggleDisplayYardDominoBoundary: function() {
        if (YardApiModel.getDisplayYardDominoBoundary()) {
            LS.set(lsKey, false);
        } else {
            LS.set(lsKey, true);
        }
        return YardApiModel.getDisplayYardDominoBoundary();
    }
});

var ValidateDomino = false;
function getTableHtml(yardData, name) {
    var tableData = [];
    if (yardData && yardData[name]) {
        tableData = yardData[name];
    }
    if (ValidateDomino) {
        /* Checking data intigrity.*/
        var d = $M.getDomino(name);
        for (var i = 0; i < tableData.length; i++) {
            d.setRowData(i, tableData[i]);
        }
        tableData = d.getData();
        /* Checking data intigrity End.*/
    }
    var table = $M.getTable(tableData, name);
    return table.getHtml();
}

YardApiModel.extend({
    getYardTableContent: function(yardComponent, requiredContent) {
        var tableContent = [];
        for (var i = 0; i < requiredContent.length; i++) {
            var curData = [];
            for (var j = 0; j < requiredContent[i].length; j++) {
                if (requiredContent[i][j] === "") {
                    curData.push("");
                } else {
                    curData.push(getTableHtml(yardComponent, requiredContent[i][j]));
                }
            }
            tableContent.push(curData);
        }
        return tableContent;
    },
    getYardTableContentV2: function(yardComponent, requiredContent) {
        var tableContent = [], tableData, name;
        if (!$M.isObject(yardComponent) || !$M.isArray(requiredContent)) {
            return tableContent;
        }
        for (var i = 0; i < requiredContent.length; i++) {
            var curData = [];
            for (var j = 0; j < requiredContent[i].length; j++) {
                if (requiredContent[i][j] === "") {
                    curData.push("");
                } else {
                    name = requiredContent[i][j];
                    tableData = [];
                    if (yardComponent[name]) {
                        tableData = yardComponent[name];
                    }
                    curData.push($M.getTable(tableData, name).getContent());
                }
            }
            tableContent.push(curData);
        }
        return $M.getTable(tableContent, "yard").getContent();
    },
    enableDomino: function () {
        ValidateDomino = true;
        return true;
    },
    disableDomino: function () {
        ValidateDomino = false;
        return false;
    }
});

window.$YApiModel = YardApiModel;

}));
