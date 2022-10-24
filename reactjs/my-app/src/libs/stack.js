function ExtendObject(Object) {
    Object.fn.init.prototype = Object.fn;
    Object.extend = Object.fn.extend = function(options) {
        if (typeof options == "object" && isNaN(options.length)) {
            for (var key in options) {
                if (typeof options[key] == "function") {
                    /*If method already exist then it will be overwritten*/
                    if (typeof Object[key]  == "function") {
                        console.log('Method "' + Object.name + "." + key + '" is overwritten.');
                    }
                    Object[key] = options[key];
                }
            }
        }
        return Object;
    };
}

(function(attr, factory) {

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

function getPlatForm(attr) {
    var checkingWindowStatus = [];
    checkingWindowStatus.push(typeof attr !== 'undefined');
    if (checkStatus(checkingWindowStatus)) {
        checkingWindowStatus.push(typeof attr.constructor !== 'undefined');
    } else {
        checkingWindowStatus.push(false);
    }

    if (checkStatus(checkingWindowStatus)) {
        checkingWindowStatus.push(attr.constructor.name === "Window");
    } else {
        checkingWindowStatus.push(false);
    }
    var windowStatus = checkStatus(checkingWindowStatus);

    var checkingNodeStatus = [];
    checkingNodeStatus.push(typeof exports === 'object');
    checkingNodeStatus.push(typeof module !== 'undefined');
    var nodeStatus = checkStatus(checkingNodeStatus);

    if (windowStatus) {
        return "Window";
    }
    if (nodeStatus) {
        return "Node.js";
    }
    return "";
}

var platform = getPlatForm(attr);
factory(platform);

}(this, function(Platform) {

var Stack = function(selector, context) {
    return new Stack.fn.init(selector, context);
};
Stack.fn = Stack.prototype = {
    constructor: Stack,
    init: function(selector, context) {
        return this;
    }
};
var skipValuesInResult = [];
var RequestId = 0;
var LoggerInfo;
var Last1000UniqueNumberQue;
function isUndefined(value) {
    if (typeof value == "undefined") {
        return true;
    }
    return false;
}
function isString(value) {
    return typeof value == "string";
}
function isArray(value) {
    if (typeof value == "undefined" || value == null) {
        return false;
    }
    return (typeof value == "object" && !isNaN(value.length)) ? true : false;
}
function isObject(value) {
    if (typeof value == "undefined" || value == null) {
        return false;
    }
    return (typeof value == "object" && isNaN(value.length)) ? true : false;
}
function isNumber(value) {
    if (typeof value == "number" && !isNaN(value)) {
        return true;
    }
    return false;
}
function isNumeric(value) {
    /**
     * isNaN(value) = false, for value = null, "", "9090", 9090, [], {}
     * isNaN(value) = true, for value = "string", {}
     * value = null, typeof value = "object"
     */
    if (!isNaN(value) && typeof value != "object") {
        // if value = "" then it should return false
        if (typeof value === "string" && value.trim() === "") {
            return false;
        }
        return true;
    }
    return false;
}
function isBoolean(value) {
    if (typeof value == "boolean") {
        return true;
    }
    return false;
}
function isFunction(value) {
    if (typeof value == "undefined") {
        return false;
    }
    return typeof value == "function" ? true : false;
}
function addElAt(arr, index, el) {
    if (isArray(arr) && isNumber(index)) {
        if (index >= arr.length) {
            arr.push(el);
        } else {
            arr.splice(index, 0, el);
        }
        return 1;
    }
    return 0;
}
function capitalize(str) {
    if (isString(str) && str.length > 0) {
        return str.replace(/^./, str[0].toUpperCase());
    }
    return str;
}
function calculateNumericalValue(op1, operator, op2) {
    var val = null;
    switch (operator) {
        case '+':
            val = op1 + op2;
        break;
        case '-':
            val = op1 - op2;
        break;
        case '*':
            val = op1 * op2;
        break;
        case '/':
            if (op2 !== 0) {
                val = op1 / op2;
            } else {
                val = 0;
            }
        break;
        default:
        break;
    }
    return val;
}
function calculateValue(op1, operator, op2) {
    var val = null;
    switch (operator) {
        case '*':
        case "&&":
        case "&":
            val = op1 && op2;
        break;
        case "||":
        case "|":
        case "#":
        case '+':
            val = op1 || op2;
        break;
        case '~':
            val = !op1;
        break;
        default:
        break;
    }
    return val;
}
function getRandomNumber(minVal, maxVal) {
    /* Both number are inclusive. */
    var random;
    if (isNumber(minVal) && isNumber(maxVal)) {
        random = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    } else {
        //5 digit random number from 10000 to 99999
        random = getRandomNumber(10000, 99999);
    }
    return random;
}
var Data = (function() {
    function isValidKey(keys, key) {
        if (keys.indexOf(key) >= 0) {
            return true;
        }
        return false;
    }
    function Data() {
        this.name = "DataObj";
        this.keys = [];
        this.localData = {};
    }
    Data.prototype.setKeys = function(keysArray) {
        var keys = this.keys;
        if (Stack.isArray(keysArray)) {
            for (var i = 0; i < keysArray.length; i++) {
                if (Stack.isString(keysArray[i])) {
                    keys.push(keysArray[i]);
                    this.localData[keys[i]] = null;
                }
            }
        }
        return 1;
    };
    Data.prototype.resetKeys = function(keysArray) {
        this.keys = [];
        return 0;
    };
    Data.prototype.getKeys = function() {
        return Stack.clone(this.keys);
    };
    Data.prototype.resetData = function() {
        var keys = this.keys;
        for (var i = 0; i < keys.length; i++) {
            this.localData[keys[i]] = null;
        }
        return 0;
    };
    Data.prototype.initData = function(bypassKeys) {
        if (!isArray(bypassKeys)) {
            return;
        }
        var keys = this.getKeys();
        var allData = this.getAllData();
        var key, defaultData;
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (bypassKeys.indexOf(key) >= 0) {
                continue;
            }
            defaultData = null;
            if (isObject(allData[key])) {
                defaultData = {};
            } else if (isArray(allData[key])) {
                defaultData = [];
            } else if (isString(allData[key])) {
                defaultData = "";
            }
            this.setData(key, defaultData);
        }
    };
    Data.prototype.setData = function(key, value, isDirect) {
        if (isValidKey(this.keys, key)) {
            if (Stack.isBooleanTrue(isDirect)) {
                this.localData[key] = value;
            } else {
                this.localData[key] = Stack.clone(value);
            }
        } else {
            console.log("Invalid key: "+key);
        }
        return this.getData(key, null, isDirect);
    };
    Data.prototype.getData = function(key, defaultData, isDirect) {
        if (isValidKey(this.keys, key)) {
            if (this.localData[key] === null) {
                return defaultData;
            }
            // Fix for storing file upload data
            if (Stack.isBooleanTrue(isDirect)) {
                return this.localData[key];
            } else {
                return Stack.clone(this.localData[key]);
            }
        } else {
            console.log("Invalid key: "+key);
        }
        return defaultData;
    };
    Data.prototype.getAllData = function() {
        return Stack.clone(this.localData);
    };
    return Data;
})();

//DateTimeObject
var DT = (function() {
    var dateTime;
    // var YYYY, MM, DD, hh, mm, ss, ms, mr; //mr = meridian (AM/PM)
    var MMMList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var DDDList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    function isDateObject(dateObj) {
        if (dateObj && dateObj.constructor && dateObj.constructor.name === "Date") {
            if (isNumber(dateObj.getDate())) {
                return true;
            }
        }
        return false;
    }
    function DateTime() {
        dateTime = new Date();
        this.now = dateTime;
    }
    function getFormatedDateTime(formatedValue, format, seprator) {
        var response = "";
        var formatKeys = format ? format.split(seprator) : [];
        if (formatedValue) {
            for (var i=0; i<formatKeys.length; i++) {
                if (formatedValue[formatKeys[i]]) {
                    response+=formatedValue[formatKeys[i]];
                } else {
                    response+=formatKeys[i];
                }
            }
        }
        return response;
    };
    DateTime.prototype.formateDateTime = function(format, seprator, dateObj) {
        // "D/YYYY/-/MM/-/DD/T/hh/:/mm/:/ss/:/ms","/" --> "D2020-01-26T22:34:24:071"
        var currentDateTime = "";
        if (isDateObject(dateObj)) {
            currentDateTime = dateObj;
        } else {
            currentDateTime = dateTime;
        }
        var fullYear = currentDateTime.getFullYear();
        var month = currentDateTime.getMonth()+1;
        var date = currentDateTime.getDate();
        var horus = currentDateTime.getHours();
        var minutes = currentDateTime.getMinutes();
        var seconds = currentDateTime.getSeconds();
        var miliSeconds = currentDateTime.getMilliseconds();
        var formatedValue = {};
        formatedValue["YYYY"] = fullYear;
        formatedValue["MM"] = month <= 9 ? "0"+month : month;
        formatedValue["MMM"] = MMMList[month-1];
        formatedValue["DD"] = date <= 9 ? "0"+date : date;
        formatedValue["DDD"] = DDDList[currentDateTime.getDay()];
        formatedValue["hh"] = horus <= 9 ? "0"+horus : horus;
        formatedValue["mm"] = minutes <= 9 ? "0"+minutes : minutes;
        formatedValue["ss"] = seconds <= 9 ? "0" + seconds : seconds;
        if (miliSeconds <= 9) {
            miliSeconds = "00" + miliSeconds;
        } else if (miliSeconds <= 99) {
            miliSeconds = "0" + miliSeconds;
        }
        formatedValue["ms"] = miliSeconds;
        return getFormatedDateTime(formatedValue, format, seprator);
    };
    DateTime.prototype.getDateTime = function(format, seprator) {
        var currentDateTime = new Date();
        return this.formateDateTime(format, seprator, currentDateTime);
    };
    DateTime.prototype.getDateTimeV2 = function(dateTimeStr, format, seprator) {
        var currentDateTime = this.getDateObj(dateTimeStr);
        if (currentDateTime === null) {
            currentDateTime = new Date();
        }
        return this.formateDateTime(format, seprator, currentDateTime);
    };
    DateTime.prototype.getDayNumberTimeFromSeconds = function(seconds, format, seprator) {
        var response = "";
        var formatKeys = format ? format.split(seprator) : [];
        var formatedValue = {};
        var dayNum = "000" + Math.ceil(seconds/(24*60*60));//058, day number
        var hours = "00" + Math.floor((seconds/(60*60))%24);
        var minutes = "00" + Math.floor((seconds/60)%60);
        var second = "00" + Math.floor(seconds%60);
        formatedValue["ddd"] = dayNum.substring(dayNum.length - 3); 
        formatedValue["hh"] = hours.substring(hours.length - 2);
        formatedValue["mm"] = minutes.substring(minutes.length - 2);
        formatedValue["ss"] = second.substring(second.length - 2);
        if (formatedValue) {
            for (var i=0; i<formatKeys.length; i++) {
                if (formatedValue[formatKeys[i]]) {
                    response+=formatedValue[formatKeys[i]];
                } else {
                    response+=formatKeys[i];
                }
            }
        }
        return response;
    };
    DateTime.prototype.getDateObj = function(dateStr) {
        if (isString(dateStr)) {
            var dateObj = new Date(dateStr);
            if (isDateObject(dateObj)) {
                return dateObj;
            }
        }
        return null;
    };
    DateTime.prototype.addDate = function(dateObj, count) {
        if (isDateObject(dateObj) && isNumber(count)) {
            dateObj = new Date(dateObj.setDate(dateObj.getDate() + count));
            return dateObj;
        }
        return null;
    };
    DateTime.prototype.addMinutes = function(dateObj, count) {
        if (isDateObject(dateObj) && isNumber(count)) {
            dateObj = new Date(dateObj.setMinutes(dateObj.getMinutes() + count));
            return dateObj;
        }
        return null;
    };
    DateTime.prototype._getEndTime = function(todayDateObj, isAddMinute) {
        var endTime = "";
        if (isAddMinute) {
            var temp = this.addMinutes(todayDateObj, 1);
            if (temp !== null) {
                return this.formateDateTime("YYYY/-/MM/-/DD/ /hh/:/mm", "/", temp);
            }
        } else {
            this.addDate(todayDateObj, 1);
            endTime = this.formateDateTime("YYYY/-/MM/-/DD/ 00:00", "/", todayDateObj);
            this.addDate(todayDateObj, -1);
            return endTime;
        }
        return this.formateDateTime("YYYY/-/MM/-/DD/ /hh/:/mm", "/", todayDateObj);
    };
    DateTime.prototype._getMatchingIndex = function(patternList, timeRange) {
        var matchIndex = -1, temp;
        if (!Stack.isStringV2(timeRange)) {
            return matchIndex;
        }
        if (isArray(patternList)) {
            for (var i=0; i<patternList.length; i++) {
                temp = Stack.searchItems(patternList[i], [timeRange], true);
                if (Stack.isArray(temp) && temp.length === 1) {
                    matchIndex = i;
                    break;
                }
            }
        }
        return matchIndex;
    };
    DateTime.prototype.getDateRange = function(timeRange) {
        var finalTimeRange = [];
        if (!Stack.isStringV2(timeRange)) {
            return finalTimeRange;
        }
        var today = new Date(), startDay;
        var startTime = "", endTime = "";
        var count = 0, temp, temp2, i;
        var patternList = [];
        patternList.push(["last-[0-9]{1,3}-days-offset-[0-9]{1,3}"]); //0
        patternList.push(["last-[0-9]{1,3}-days"]); //1
        patternList.push(["last-[0-9]{1,3}-months-offset-[0-9]{1,3}"]); //2
        patternList.push(["last-[0-9]{1,3}-months"]); //3
        patternList.push(["from-[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"]); // 4
        patternList.push(["[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2},[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"]); // 5
        var matchIndex = this._getMatchingIndex(patternList, timeRange);
        if ([0, 1].indexOf(matchIndex) >= 0) {
            temp = timeRange.split("-");
            endTime = this._getEndTime(today, true);
            if (temp.length === 5) {
                count = temp[4] * 1;
                if (count > 0) {
                    startDay = this.addDate(today, -1 * count);
                    endTime = this._getEndTime(startDay, false);
                    today = startDay;
                }
            }
            if (temp.length >= 3) {
                count = temp[1] * 1;
                startDay = this.addDate(today, -1 * count);
                startTime = this.formateDateTime("YYYY/-/MM/-/DD/ 00:00", "/", startDay);
            }
        } else if ([2, 3].indexOf(matchIndex) >= 0) {
            temp = timeRange.split("-");
            endTime = this._getEndTime(today, true);
            if (temp.length === 5) {
                count = temp[4] * 1;
                startDay = today;
                if (count > 0) {
                    for(i=0; i<count; i++) {
                        startDay = this.addDate(startDay, -1);
                        startDay.setDate(1);
                    }
                    startDay.setDate(0);
                    endTime = this._getEndTime(startDay, false);
                    today = startDay;
                }
            }
            if (temp.length >= 3) {
                count = temp[1] * 1;
                startDay = today;
                startDay.setDate(1);
                for(i=0; i<count; i++) {
                    startDay = this.addDate(startDay, -1);
                    startDay.setDate(1);
                }
                startTime = this.formateDateTime("YYYY/-/MM/-/DD/ 00:00", "/", startDay);
            }
        } else if (matchIndex === 4) {
            temp = timeRange.split("from-");
            endTime = this._getEndTime(today, true);
            if (temp.length === 2) {
                temp2 = this.getDateObj(temp[1]);
                if (temp2 !== null) {
                    startTime = temp[1];
                }
            }
        } else if (matchIndex === 5) {
            temp = timeRange.split(",");
            if (temp.length === 2) {
                temp2 = this.getDateObj(temp[0]);
                if (temp2 !== null) {
                    temp2 = this.getDateObj(temp[1]);
                    if (temp2 !== null) {
                        startTime = temp[0];
                        endTime = temp[1];
                    }
                }
            }
        } else {
            console.log("Invalid timeRange pattern: " + timeRange);
        }
        finalTimeRange.push(startTime);
        finalTimeRange.push(endTime);
        return finalTimeRange;
    }
    return DateTime;
})();
//WebSocket
var WSS = (function() {
    function WebSocketObj(url, obj) {
        if (!Stack.isStringV2(url)) {
            this.connection = null;
            return;
        }
        if (!isObject(obj)) {
            obj = {};
        }
        this.connection = new WebSocket(url);
        this.connection.onopen = function(e) {
            Stack.callMethodV1(obj.onopen, e);
        };
        this.connection.onclose = function(e) {
            Stack.callMethodV1(obj.onclose, e);
        };
        this.connection.onmessage = function(e) {
            Stack.callMethodV2(obj.onmessage, e, e.data);
        };
        this.connection.onerror = function(e) {
            Stack.callMethodV1(obj.onerror, e);
        };
    }
    WebSocketObj.prototype.send = function(data) {
        if (this.connection) {
            this.connection.send(data);
        }
    };
    WebSocketObj.prototype.close = function() {
        if (this.connection) {
            this.connection.close();
        }
    };
    return WebSocketObj;
})();
var LocalStorage = (function(){
    function LocalStorage () {
        var _localStorage = localStorage;
        var validKeys = ["item1"];
        var bypassKeys = ["local_storage_support_test","length","key","getItem","setItem","removeItem","clear"];
        function isValidKey (key) {
            if (bypassKeys.indexOf(key) >= 0 || validKeys.indexOf(key) < 0) {
                return false;
            }
            return true;
        };
        function get(key) {
            var response = {"status": false, "value": null};
            if (_localStorage && key && isValidKey(key)) {
                var value = _localStorage.getItem(key);
                if (value) {
                    response["status"] = true;
                    response["value"] = value;
                }
            }
            return response;
        };
        function getAll() {
            var response = {"status": true, count:0, "value": {}};
            for (var key in _localStorage) {
                if (isValidKey(key)) {
                    var temp = get(key);
                    if (temp.status) {
                        response.value[key] = temp.value;
                        response.count++;
                    }
                }
            }
            return response;
        };
        function set(key, value) {
            var response = {"status": false};
            if (_localStorage && key && isValidKey(key)) {
                _localStorage.setItem(key, value);
                response["status"] = true;
            }
            return response;
        };
        function remove(key) {
            var response = {"status": false};
            if (_localStorage && key && isValidKey(key)) {
                _localStorage.removeItem(key);
                response["status"] = true;
            }
            return response;
        };
        function clear() {
            var response = {"status": false};
            if (_localStorage) {
                for (var i=0; i< validKeys.length; i++) {
                    _localStorage.removeItem(validKeys[i]);
                }
                response["status"] = true;
            }
            return response;
        };
        return {
            getAll: getAll,
            get: get,
            set: set,
            remove: remove,
            clear: clear
        };
    }
    return LocalStorage;
})();

var LocationParser = function() {
    return new LocationParser.fn.init();
};
LocationParser.fn = LocationParser.prototype = {
    constructor: LocationParser,
    init: function() {
        return this;
    }
};
ExtendObject(LocationParser);
LocationParser.extend({
    getOrigin: function(Location) {
        var origin = "";
        try {
            origin = Location.origin;
        } catch(e) {

        }
        return origin;
    }
});

var UrlParserObj = (function(){
    var data = {};
    function UrlParser(href) {
        if (!isString(href)) {
            href = "";
        }
        var hrefObj = href.split("?");
        if (hrefObj.length) {
            data["hrefPath"] = hrefObj[0];
        }
        if (hrefObj.length > 1) {
            var params = hrefObj[1];
            var paramsObj = params.split("&");
            if (paramsObj.length > 0) {
                for (var i=0; i< paramsObj.length; i++) {
                    var keyVal = paramsObj[i];
                    var keyValObj = keyVal.split("=");
                    if (keyValObj.length > 1) {
                        data[keyValObj[0]] = keyValObj[1];
                    }
                }
            }
        }
    }
    UrlParser.prototype.getData = function (key, defaultValue) {
        if (data[key]) {
            return data[key];
        }
        return defaultValue;
    };
    return UrlParser;
})();
var Log = (function(){
    var LoggerId = Date.now();
    function Logger(){
        this.dateTimeEnable = false;
        this.format = "";
        this.splitter = "";
        this.logKey = getRandomNumber(10000, 99999);
    }
    Logger.prototype.getLoggerId = function() {
        return LoggerId;
    };
    Logger.prototype.resetLoggerKey = function(loggerKey) {
        this.logKey = Stack.getRandomNumber(10000, 99999);;
        return this.logKey;
    };
    Logger.prototype.updateLoggerKey = function(loggerKey) {
        this.logKey = loggerKey;
        return this.logKey;
    };
    Logger.prototype.setLoggerKeyUnique = function() {
        this.logKey = Stack.getUniqueNumber();
        return this.logKey;
    };
    Logger.prototype.setDateTimeState = function(state,v1,v2) {
        this.format=v1;
        this.splitter=v2;
        if (state === true) {
            this.dateTimeEnable = true;
        } else {
            this.dateTimeEnable = false;
        }
    };
    Logger.prototype.logInApi = function(log, loggerInfo) {
        console.log(this.logKey + ":" + log);
    };
    Logger.prototype.log = function(log, loggerInfo) {
        var preLog = this.logKey + ":" ;
        if (isString(loggerInfo)) {
            preLog += loggerInfo + ":";
        }
        if (this.dateTimeEnable) {
            var dt = new DT();
            preLog += dt.getDateTime(this.format,this.splitter)+":";
        }
        console.log(preLog+ log);
    };
    return Logger;
})();
var Logger = new Log();

var St = (function(){
    var MAXSTACK = 500000;
    function St() {
        this._STACK = [];
        this._TOP = -1;
    }
    St.prototype.reset = function() {
        this._TOP = -1;
        return true;
    };
    St.prototype.push = function(item) {
        if (this._TOP >= MAXSTACK - 1) {
            var logText = "stack over flow";
            Logger.log(logText);
        } else {
            this._TOP = this._TOP + 1;
            this._STACK[this._TOP] = item;
        }
        return 1;
    };
    St.prototype.pop = function() {
        var item = null;
        if (this._TOP < 0) {
            var logText = "stack under flow";
            Logger.log(logText);
        } else {
            item = this._STACK[this._TOP];
            this._TOP = this._TOP - 1;
        }
        return item;
    };
    St.prototype.getTop = function() {
        return this._TOP;
    };
    St.prototype.getAll = function() {
        var res = [];
        for (var i = 0; i <= this._TOP; i++) {
            res.push(this._STACK[i]);
        }
        return res;
    };
    St.prototype.print = function() {
        for (var i = 0; i <= this._TOP; i++) {
            Logger.log(i + "-" + this._STACK[i]);
        }
        return 0;
    }
    return St;
})();
var Que = (function(){
    var maxCapacity = 500000;
    function Que(_capacity) {
        if (isNumber(_capacity) && _capacity > 0 && _capacity <= maxCapacity) {
            this._CAPACITY = _capacity;
        } else {
            this._CAPACITY = maxCapacity;
        }
        this._que = [];
        this._FRONT = -1;
        this._BACK = -1;
    }
    Que.prototype._shiftElement = function() {
        var index = 0;
        for (var i = this._FRONT; i <= this._BACK; i++) {
            this._que[index] = this._que[i];
            index++;
        }
        this._FRONT = 0;
        this._BACK = index-1;
    };
    Que.prototype.Enque = function(item) {
        var size = this.getSize();
        if (this._BACK === this._CAPACITY - 1) {
            if (size < 1) {
                this.clear();
            } else if (size < this._CAPACITY) {
                this._shiftElement();
            } else {
                Logger.log("Que full");
                return 0;
            }
        }
        if (this._FRONT === -1) {
            this._FRONT = 0;
        }
        this._BACK++;
        this._que[this._BACK] = item;
        return 1;
    };
    Que.prototype.Deque = function() {
        var item = 0;
        if (this._FRONT === -1 || this._FRONT > this._BACK) {
            Logger.log("Que under flow");
            return 0;
        }
        item = this._que[this._FRONT];
        this._FRONT++;
        return item;
    };
    Que.prototype.clear = function() {
        this._FRONT = -1;
        this._BACK = -1;
        return 1;
    };
    Que.prototype.getAll = function() {
        var res = [];
        var size = this.getSize();
        if (size > 0) {
            for (var i = this._FRONT; i <= this._BACK; i++) {
                res.push(this._que[i]);
            }
        }
        return res;
    };
    Que.prototype.getSize = function() {
        if (this._FRONT >= 0 && this._FRONT <= this._BACK) {
            return this._BACK - this._FRONT+1;
        }
        return 0;
    };
    return Que;
})();
var CirQue = (function(){
    function CirQue(capacity) {
        this.capacity = 50;
        this.que = [];
        if (isNumber(capacity) && capacity > 0 && capacity <= 500000) {
            this.capacity = capacity;
        }
        for (var i = 0; i < this.capacity; i++) {
            this.que.push(0);
        }
        this._FRONT = -1;
        this._BACK = -1;
    }
    CirQue.prototype.clear = function() {
        this._FRONT = -1;
        this._BACK = -1;
        return 1;
    };
    CirQue.prototype.isFull = function() {
        if( (this._FRONT === this._BACK + 1) || (this._FRONT === 0 && this._BACK === this.capacity-1)) {
            return true;
        }
        return false;
    };
    CirQue.prototype.isEmpty = function() {
        if(this._FRONT === -1) {
            return true;
        }
        return false;
    };
    CirQue.prototype.Enque = function(item) {
        if (this.isFull()) {
            var logText = "CirQue full";
            Logger.log(logText);
            return 0;
        }
        if (this._FRONT === -1) {
            this._FRONT = 0;
            this._BACK = 0;
        } else if (this._BACK === this.capacity-1 && this._FRONT !== 0) {
            this._BACK = 0;
        } else {
            this._BACK++;
        }
        this.que[this._BACK] = item;
        return 1;
    };
    CirQue.prototype.EnqueV2 = function(item) {
        if (this._FRONT === -1) {
            this._FRONT = 0;
            this._BACK = 0;
        } else if (this._BACK === this.capacity-1 && this._FRONT !== 0) {
            this._BACK = 0;
        } else if (this.isFull()) {
            this._BACK = this._FRONT;
            this._FRONT = (this._FRONT + 1) % this.capacity;
        } else {
            this._BACK++;
        }
        this.que[this._BACK] = item;
        return 1;
    };
    CirQue.prototype.Deque = function() {
        var item = 0;
        if (this.isEmpty()) {
            var logText = "CirQue under flow";
            Logger.log(logText);
            return -1;
        }
        item = this.que[this._FRONT];
        if (this._FRONT === this._BACK) {
            this._FRONT = -1;
            this._BACK = -1;
        } else {
            this._FRONT = (this._FRONT+ 1) % this.capacity;
        }
        return Stack.clone(item);
    };
    CirQue.prototype.getAll = function() {
        var res = [];
        if (this.isEmpty()) {
            return res;
        }
        if (this._BACK >= this._FRONT) {
            for (var i = this._FRONT; i <= this._BACK; i++) {
                res.push(this.que[i]);
            }
        } else {
            for (var j = this._FRONT; j < this.capacity; j++) {
                res.push(this.que[j]);
            }
            for (var k = 0; k <= this._BACK; k++) {
                res.push(this.que[k]);
            }
        }
        return Stack.clone(res);
    };
    CirQue.prototype.getSize = function() {
        var size = 0;
        if (this.isEmpty()) {
            size = 0;
        } else if (this._BACK >= this._FRONT) {
            size = this._BACK - this._FRONT + 1;
        } else {
            size = (this.capacity - this._FRONT) + this._BACK + 1;
        }
        return size;
    };
    CirQue.prototype.getDetails = function() {
        var res = {};
        res.capacity = this.capacity;
        res.size = this.getSize();
        res.front = this._FRONT;
        res.back = this._BACK;
        res.isFull = this.isFull();
        res.isEmpty = this.isEmpty();
        res.items = this.getAll();
        res.que = Stack.clone(this.que);
        return res;
    };
    return CirQue;
})();
// After insertion data into BST it will return that particular node
// That node can be modified as per requirement
var BST = (function() {
    function BST(rootData) {
        this.data = rootData;
        this.right = null;
        this.left = null;
    }
    BST.prototype.insertData = function(root, data) { 
        if (isNumber(data) === false) {
            return root;
        }
        if (isNumber(root.data) === false) {
            root.data = data;
            return root;
        }
        if(data < root.data) {
            if(root.left === null) {
                root.left = new BST(data);
                return root.left;
            } else {
                return this.insertData(root.left, data);  
            } 
        } else {
            if(root.right === null) {
                root.right = new BST(data);
                return root.right;
            } else {
                return this.insertData(root.right, data); 
            }
        }
    };
    BST.prototype.getInOrder = function(node, result) {
        if (!isArray(result)) {
            result = [];
        }
        if (node != null) {
            this.getInOrder(node.left, result);
            result.push(node);
            this.getInOrder(node.right, result);
        }
        return result;
    };
    BST.prototype.getPostOrder = function(node, result) {
        if (!isArray(result)) {
            result = [];
        }
        if (node != null) {
            this.getInOrder(node.left, result);
            this.getInOrder(node.right, result);
            result.push(node);
        }
        return result;
    };
    BST.prototype.getPreOrder = function(node, result) {
        if (!isArray(result)) {
            result = [];
        }
        if (node != null) {
            result.push(node);
            this.getInOrder(node.left, result);
            this.getInOrder(node.right, result);
        }
        return result;
    }
    return BST;
})();
var BT = (function(){
    function BT(val) {
        this.data = val;
        this.isSubTree = false;
        this.left = null;
        this.right = null;
    }
    BT.prototype.insertLeft = function(node, data) {
        var newNode = new BT(data);
        if (node) {
            node.left = newNode;
        } else {
            node = newNode;
        }
    };
    BT.prototype.insertRight = function(node, data) {
        var newNode = new BT(data);
        if (node) {
            node.right = newNode;
        } else {
            node = newNode;
        }
    };
    BT.prototype.insertNodeInLeft = function(parent, leftNode) {
        if (parent) {
            parent.left = leftNode;
        } else {
            parent = leftNode;
        }
    };
    BT.prototype.getLeftChild = function(node) {
        if (node && node.left) {
            return node.left;
        }
        return node;
    };
    BT.prototype.getRightChild = function(node) {
        if (node && node.right) {
            return node.right;
        }
        return node;
    };
    BT.prototype.getPostOrder = function(root) {
        var postOrderResult = [];
        if (root == null) {
            return postOrderResult;
        }
        postOrderResult = postOrderResult.concat(this.getPostOrder(root.left));
        postOrderResult = postOrderResult.concat(this.getPostOrder(root.right));
        postOrderResult.push(root.data);
        return postOrderResult;
    };
    BT.prototype.getInOrder = function(root) {
        var inOrderResult = [];
        if (root == null) {
            return inOrderResult;
        }
        inOrderResult = inOrderResult.concat(this.getInOrder(root.left));
        inOrderResult.push(root.data);
        inOrderResult = inOrderResult.concat(this.getInOrder(root.right));
        return inOrderResult;
    };
    BT.prototype.getPreOrder = function(root) {
        var preOrderResult = [];
        if (root == null) {
            return preOrderResult;
        }
        preOrderResult.push(root.data);
        preOrderResult = preOrderResult.concat(this.getPreOrder(root.left));
        preOrderResult = preOrderResult.concat(this.getPreOrder(root.right));
        return preOrderResult;
    };
    BT.prototype._isSymbol = function(item) {
        if (["+","-","*","/","&&","&","||","|","#","~"].indexOf(item) >= 0) {
            return true;
        }
        return false;
    };
    BT.prototype._isNewNodeHasHighPrecedence = function(newSymbol, oldSymbol) {
        if (newSymbol === oldSymbol) {
            return false;
        }
        if (["&&","&"].indexOf(newSymbol) >= 0) {
            if (["||","|","#"].indexOf(oldSymbol) >= 0) {
                return true;
            }
        } else if (["~"].indexOf(newSymbol) >= 0) {
            return true;
        }
        switch(oldSymbol) {
            case "-":
            case "+":
                if (["*", "/"].indexOf(newSymbol) >= 0) {
                    return true;
                }
            break;
            case "*":
                if (["/"].indexOf(newSymbol) >= 0) {
                    return true;
                }
            break;
            case "/":
            default:
            break;
        }
        return false;
    };
    BT.prototype._insertTreeNode = function(root, data, newNode) {
        if (root === null) {
            return newNode;
        }
        var temp = null;
        if (this._isSymbol(root.data)) {
            if (this._isSymbol(data)) {
                if (root.isSubTree !== true && this._isNewNodeHasHighPrecedence(data, root.data)) {
                    root.right = this._insertTreeNode(root.right, data, newNode);
                } else {
                    temp = newNode;
                    temp.left = root;
                    root = temp;
                }
            } else {
                root.right = this._insertTreeNode(root.right, data, newNode);
            }
        } else {
            if (this._isSymbol(data)) {
                temp = newNode;
                temp.left = root;
                root = temp;
            }
        }
        return root;
    };
    BT.prototype._getLeaf = function(root) {
        if (root === null || root.right === null) {
            return root;
        }
        return this._getLeaf(root.right);
    };
    BT.prototype.createBinaryTree = function(items, obj) {
        var eTree = null, newNode = null;
        var temp = null;
        var start = isObject(obj) && isNumber(obj.start) ? obj.start : 0;
        for (var i=start; i<items.length; i++) {
            if (items[i] === "__SKIP__") {
                continue;
            }
            if (items[i] === "(") {
                temp = this._getLeaf(eTree);
                if (temp == null) {
                    eTree = this.createBinaryTree(items, {"start": i+1});
                } else {
                    temp.right = this.createBinaryTree(items, {"start": i+1});
                }
            } else if (items[i] === ")") {
                items[i] = "__SKIP__";
                eTree.isSubTree = true;
                return eTree;
            } else {
                newNode = new BT(items[i]);
                eTree = this._insertTreeNode(eTree, items[i], newNode);
            }
            items[i] = "__SKIP__";
        }
        return eTree;
    };
    BT.prototype.createBinaryTreeOld = function(items) {
        var st = new St();
        var currentTree, parent;
        var eTree = new BT("");
        st.push(eTree);
        currentTree = eTree;
        for (var i = 0; i < items.length; i++) {
            if (items[i] === "(") {
                this.insertLeft(currentTree, "");
                st.push(currentTree);
                currentTree = this.getLeftChild(currentTree);
            } else if(items[i] === ")") {
                currentTree = st.pop();
            } else if(["+","-","*","/","&&","&","||","|","#"].indexOf(items[i]) >=0) {
                // Numeric: "+","-","*","/"
                // Boolean: and: "&&","&","*"
                // Boolean: or:  "||","|","#","+"
                var newData = items[i];
                /*
                    Input = [(,A,&&,B,&&,C,)]
                    Tree structure
                    ----------------
                       &&
                    A       &&
                         B      C
                    -----------------
                */
                if (currentTree.data !== "") {
                    var oldRight = currentTree.right;
                    this.insertRight(currentTree, newData);
                    currentTree = this.getRightChild(currentTree);
                    this.insertNodeInLeft(currentTree, oldRight);
                } else {
                    currentTree.data = newData;
                }
                this.insertRight(currentTree, "");
                st.push(currentTree);
                currentTree = this.getRightChild(currentTree);
            } else if(["~"].indexOf(items[i]) >=0) {
                /*
                    Finding complement
                    Input = [~,A]
                    ----------------
                       ~
                    A
                    -----------------
                */
                currentTree.data = items[i];
                if (i < items.length-1) {
                    i++;
                    this.insertLeft(currentTree, items[i]);
                }
                parent = st.pop();
                currentTree = parent;
            } else {
                currentTree.data = items[i];
                parent = st.pop();
                currentTree = parent;
            }
        }
        return eTree;
    };
    return BT;
})();

var TextFilter;
(function() {
var Filter = function(className) {
    return new Filter.fn.init(className);
};
Filter.fn = Filter.prototype = {
    constructor: Filter,
    init: function(className) {
        if (!isString(className)) {
            className = "";
        }
        this.className = className;
        return this;
    },
    addClass: function(className) {
        if (!isString(className)) {
            className = "";
        }
        if (!this.hasClass(className)) {
            this.className += " " + className;
        }
        return this;
    },
    removeClass: function(className) {
        if (!isString(className)) {
            className = "";
        }
        className = className.trim();
        var filterClass = [className];
        var btnClassArr = this.className.split(" ").filter(function(el, index, arr) {
                if (filterClass.indexOf(el) >= 0) {
                    return false;
                }
                return true;
            });
        this.className = btnClassArr.join(" ");
        return this;
    },
    getClassName: function() {
        return this.className;
    },
    hasClass: function(className) {
        if (!isString(className)) {
            className = "";
        }
        return this.className.split(" ").indexOf(className) >= 0;
    },
    contains: function(className) {
        return this.hasClass(className);
    },
    includes: function(str) {
        if (!isString(str)) {
            str = "";
        }
        return this.className.includes(str);
    }
};
ExtendObject(Filter);
TextFilter = Filter;
})();
var Domino = (function() {
    var maxRow = 3, maxCol = 5;
    function isValidIndex(r, c) {
        if (typeof r == "number" && !isNaN(r)) {
            if (typeof c == "number" && !isNaN(c)) {
                if (r >=0 && r<maxRow && c>=0 && c<maxCol) {
                    return true;
                }
            }
        }
        return false;
    }
    function isValidDominoData(d) {
        var validRowCount = 0;
        var validColCount = 0, validColCountStatus = false;
        var isRowIncremented = false;
        for (var i = 0; i < d.data.length; i++) {
            validColCount = 0;
            isRowIncremented = false;
            for (var j = 0; j < d.data[i].length; j++) {
                if (d.data[i][j] !== null) {
                    validColCount++;
                    if (isRowIncremented === false) {
                        validRowCount++;
                        isRowIncremented = true;
                    }
                }
                if (validColCount === 5) {
                    validColCountStatus = true;
                }
            }
        }
        if (validRowCount === maxRow && validColCountStatus) {
            return true;
        }
        return false;
    };
    function Domino(name) {
        var data = [];
        for (var i = 0; i < maxRow; i++) {
            data.push([]);
            for (var j = 0; j < maxCol; j++) {
                data[i].push(null);
            }
        }
        this.name = name;
        this.data = data;
        this.isValidData = isValidDominoData(this);
        return this;
    }
    Domino.prototype.setData = function(r, c, data) {
        var logText;
        if (isValidIndex(r,c)) {
            if (this.data[r][c] !== null) {
                logText = "Data already present.";
                throw logText;
            }
            this.data[r][c] = data;
        } else {
            logText = "Invalid index: r=" + r+", c="+c;
            console.log("Domino name: " + this.name);
            throw logText;
        }
        this.isValidData = isValidDominoData(this);
        return true;
    };
    Domino.prototype.setRowData = function(r, data) {
        if (typeof data == "object" && !isNaN(data.length)) {
            for (var i = 0; i < data.length; i++) {
                this.setData(r, i, data[i]);
            }
        }
        return true;
    };
    Domino.prototype.getData = function() {
        var response = [];
        for (var i = 0; i < this.data.length; i++) {
            response.push([]);
            for (var j = 0; j < this.data[i].length; j++) {
                if (this.data[i][j] !== null) {
                    response[i].push(this.data[i][j]);
                }
            }
        }
        if (this.isValidData) {
            return response;
        }
        console.log("Domino name: " + this.name);
        console.log(this.data);
        var logText = "Invalid Domino Data.";
        throw logText;
    };
    Domino.prototype.isValidDomino = function() {
        return this.isValidData;
    };
    return Domino;
})();
Stack.fn.init.prototype = Stack.fn;

Stack.extend = Stack.fn.extend = function(options) {
    if (isObject(options)) {
        for (var key in options) {
            if (isFunction(options[key])) {
                /*If method already exist then it will be overwritten*/
                if (isFunction(this[key])) {
                    Logger.log("Method " + key + " is overwritten.");
                }
                this[key] = options[key];
            }
        }
    }
    return this;
};
Stack.extend({
    getScriptFileName: function(location) {
        var scriptName = "";
        if (Platform === "Window") {
            var scripts = document.getElementsByTagName('script');
            var lastScript = scripts[scripts.length-1];
            scriptName = lastScript.src;
            var origin = LocationParser.getOrigin(location);
            var splitResult = scriptName.split(origin);
            if (splitResult.length > 1) {
                scriptName = splitResult[1];
                splitResult = scriptName.split("?");
                if (splitResult.length > 1) {
                    scriptName = splitResult[0];
                };
            }
        }
        return scriptName;
    },
    getScriptFileNameRef: function(location) {
        var scriptName = Stack.getScriptFileName(location);
        var result = [];
        var splitResult = scriptName.split("/");
        result = splitResult.filter(function(el, index, arr) {
            return el !== "";
        });
        result = result.map(function(el, index, arr){
            if (index === this.lastIndex) {
                return el;
            }
            return el.charAt(0).toUpperCase();
        }, {lastIndex: result.length-1});
        return result.join(".");
    }
});

Last1000UniqueNumberQue = new CirQue(1000);
Stack.extend({
    getQue: function(size) {
        return new Que(size);
    },
    getCirQue: function(size) {
        return new CirQue(size);
    },
    getRequestId: function() {
        return RequestId;
    },
    getRandomNumber: function(minVal, maxVal) {
        return getRandomNumber(minVal, maxVal);
    },
    getUniqueNumber: function() {
        // Number of miliseconds elapsed since 1st Jan 1970 + random number
        var unqieNumber = Date.now();
        var randomNum = Stack.getRandomNumber(10,99);
        unqieNumber += randomNum;
        /**
            This is for making sure at least 1000 request will give unique number
        **/
        if (Last1000UniqueNumberQue.getAll().indexOf(unqieNumber) >= 0) {
            unqieNumber = Stack.getUniqueNumber();
        } else {
            Last1000UniqueNumberQue.EnqueV2(unqieNumber);
        }
        return unqieNumber;
    },
    generateRandomUUID: function(matchedStr, index, orgStr) {
        return (matchedStr ? (matchedStr ^ ((Math.random() * 16) >> (matchedStr / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, Stack.generateRandomUUID));
    }
});

LoggerInfo= Stack.getScriptFileNameRef();
RequestId = Stack.getUniqueNumber();

var Table = (function() {
var rows=0, cols=0, content = [], tId="", processedTids = [];
function getUniqueTid(tId) {
    var verifiedTid = "";
    if (typeof tId == "string") {
        verifiedTid = tId;
    }
    if (processedTids.indexOf(verifiedTid) >= 0) {
        var max = 9, min = 1;
        var key = Math.floor(Math.random() * (max - min + 1)) + min;
        verifiedTid += "--"+key;
        if (processedTids.indexOf(verifiedTid) >= 0) {
            return getUniqueTid(verifiedTid);
        } else {
            processedTids.push(verifiedTid);
        }
    } else {
        processedTids.push(verifiedTid);
    }
    return verifiedTid;
}
function getTableId() {
    if (typeof tId != "string") {
        var max = 9999, min = 1000;
        var key = Math.floor(Math.random() * (max - min + 1)) + min;
        tId = key.toString();
    }
    return getUniqueTid(tId);
}
function generateTdHtml(tdContent, rIndex, cIndex) {
    var tdHtml = "";
    if (["string", "number"].indexOf(typeof tdContent) >= 0) {
        return tdContent;
    } else if(isObject(tdContent)) {
        var attr = tdContent.attr ? tdContent.attr : "";
        var preTag = tdContent.tag ? '<'+tdContent.tag+' '+attr+'>' : "";
        var postTag = tdContent.tag ? '</'+tdContent.tag+'>' : "";
        tdHtml += preTag;
        tdHtml += generateTdHtml(tdContent.text, rIndex, cIndex);
        tdHtml += postTag;
    } else if (isArray(tdContent)) {
        for (var i = 0; i < tdContent.length; i++) {
            tdHtml += generateTdHtml(tdContent[i], rIndex, cIndex);
        }
    }
    return tdHtml;
};
function Table(tableItems, tableId) {
    var i;
    content = [];
    rows = 0; cols = 0;
    if (tableItems && tableItems.length) {
        rows = tableItems.length;
        for (i = 0; i < tableItems.length; i++) {
            content.push([]);
            if (tableItems[i] && tableItems[i].length > cols) {
                cols = tableItems[i].length;
            }
        }
        for (i = 0; i < tableItems.length; i++) {
            for (var j = 0; j < cols; j++) {
                if (j >= tableItems[i].length) {
                    content[i].push("");
                } else {
                    content[i].push(tableItems[i][j]);
                }
            }
        }
    }
    tId = tableId;
}
/* For better functioning: addRowIndex should be called after addColIndex  */
Table.prototype.addRowIndex = function(currentIndex) {
    if (!isNumber(currentIndex)) {
        currentIndex = 1;
    }
    currentIndex = currentIndex*1;
    var rowIndexAdded = false;
    for (var i = 0; i < rows; i++) {
        //Insert first item in each row as index
        content[i].splice(0, 0, currentIndex++);
        rowIndexAdded = true;
    }
    if (rowIndexAdded) {
        cols++;
    }
    return currentIndex;
};
/* For better functioning: addColIndex should be called before addRowIndex */
Table.prototype.addColIndex = function(currentIndex) {
    //Insert first row as empty array
    content.splice(0, 0, []);
    if (!isNumber(currentIndex)) {
        currentIndex = 1;
    }
    currentIndex = currentIndex*1;
    var colIndexAdded = false;
    for (var i = 0; i < cols; i++) {
        content[0].push(currentIndex++);
        colIndexAdded = true;
    }
    // Fix for empty content = []
    // i.e. rows = 0, cols = 0 then rows should not increase
    if (colIndexAdded) {
        rows++;
    }
    return currentIndex;
};
Table.prototype.updateTableContent = function(rowIndex, colIndex, item) {
    if (isNumber(rowIndex) && isNumber(colIndex)) {
        if (rowIndex >= 0 && colIndex >= 0) {
            if (rowIndex < rows && colIndex < cols) {
                content[rowIndex][colIndex] = item;
                return true;
            }
        }
    }
    return false;
}
Table.prototype.getHtml = function() {
    var tableId = getTableId();
    var html = '<table id="'+tableId+'">',
        displayContent = "",
        attr = "";
    for (var i = 0; i < rows; i++) {
        var rId = [tableId,i].join("-");
        var rClass = i%2 ? "odd" : "even";
        html += '<tr id="'+rId+'" class="'+rClass+'">';
        for (var j = 0; j < cols; j++) {
            var cId = [tableId,i,j].join("-");
            attr = (content[i][j] && content[i][j].parentAttr) ? content[i][j].parentAttr : "";
            displayContent = generateTdHtml(content[i][j], i, j);
            // If id will be in attr then that will be ignored
            html += '<td id="'+cId+'" '+attr+'>' + displayContent + '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
};
Table.prototype.getContent = function() {
    return Stack.clone(content);
};
Table.prototype.getProcessedTids = function() {
    var response = [];
    for (var i = 0; i < processedTids.length; i++) {
        response.push(processedTids[i]);
    }
    return response;
};
Table.prototype.setProcessedTids = function(pIds) {
    if (!isArray(pIds)) {
        return false;
    }
    processedTids = [];
    for (var i = 0; i < pIds.length; i++) {
        if (typeof pIds[i] == "string") {
            processedTids.push(pIds[i]);
        }
    }
    return true;
};
Table.prototype.clearProcessedTids = function() {
    return this.setProcessedTids([]);
};
return Table;
})();

Stack.extend({
    getStack: function() {
        return new St();
    },
    getLocalStorage: function() {
        return new LocalStorage();
    },
    getDT: function() {
        return new DT();
    },
    getWSS: function(url, obj) {
        return new WSS(url, obj);
    },
    getDataObj: function() {
        return new Data();
    },
    getBT: function(data) {
        return new BT(data);
    },
    getBST: function(rootData) {
        return new BST(rootData);
    },
    getTable: function(tableContent, tableId) {
        return new Table(tableContent, tableId);
    },
    getDomino: function(dominoName) {
        return new Domino(dominoName);
    },
    getLogger: function() {
        return new Log();
    },
    getTextFilter: function() {
        return TextFilter;
    },
    log: function(log, loggerInfo) {
        return Logger.log(log, loggerInfo);
    },
    logV2: function(loggerInfo, log) {
        return Logger.log(log, loggerInfo);
    },
    updateLoggerKey: function(loggerKey) {
        Logger.updateLoggerKey(loggerKey);
    },
    setLoggerDateTimeState: function(state,formats,splitter) {
        Logger.setDateTimeState(state,formats,splitter);
    },
    isUndefined: function(value) {
        return isUndefined(value);
    },
    isDefined: function(value) {
        return !isUndefined(value);
    },
    isString: function(value) {
        return isString(value);
    },
    isStringV2: function(value) {
        var temp = isString(value);
        if (temp) {
            return value.trim().length > 0;
        }
        return false;
    },
    capitalize: function(str) {
        return capitalize(str);
    },
    isArray: function(value) {
        return isArray(value);
    },
    isArrayV2: function(value) {
        return isArray(value) && value.length > 0;
    },
    isObject: function(value) {
        return isObject(value);
    },
    isObjectV2: function(value) {
        var temp = isObject(value);
        if (temp) {
            return Object.keys(value).length > 0;
        }
        return false;
    },
    isFunction: function(value) {
        return isFunction(value);
    },
    isNumber: function(value) {
        return isNumber(value);
    },
    isNumeric: function(value) {
        return isNumeric(value);
    },
    isBoolean: function(value) {
        return isBoolean(value);
    },
    isBooleanTrue: function(value) {
        return isBoolean(value) && value === true;
    },
    isBooleanFalse: function(value) {
        return isBoolean(value) && value === false;
    },
    isJsonString: function(str) {
        if (isString(str)) {
            try {
                JSON.parse(str);
                return true;
            } catch(e) {}
        }
        return false;
    },
    addElAt: function(arr, index, el) {
        return addElAt(arr, index, el);
    },
    isMethodDefined: function(name) {
        return this.isFunction(this[name]);
    },
    getUrlAttribute: function(url, name, defaultValue) {
        var UrlParser = new UrlParserObj(url);
        return UrlParser.getData(name, defaultValue);
    },
    getPlatform: function() {
        return Platform;
    },
    replaceString: function(str, find, replace) {
        var temp;
        if (isString(str) && isString(find) && isString(replace) && find !== replace) {
            temp = str.split(find);
            if (temp.length > 1) {
                str = temp.join(replace);
                return this.replaceString(str, find, replace);
            }
        }
        return str;
    },
    removeDuplicate: function(arr) {
        var result = [];
        if (isArray(arr)) {
            for (var i=0; i<arr.length; i++) {
                if (isString(arr[i]) || isNumeric(arr[i])) {
                    if (result.indexOf(arr[i]) < 0) {
                        result.push(arr[i]);
                    }
                }
            }
        }
        return result;
    },
    sortResult: function(requestedArray, sortableValue, sortableName, searchName, defaultValue) {
        // sortableValue: "ascending" or "descending"
        // sortableName: used for [{},{}]
        // serachName: used for [[{},{}], [{},{}]]
        if (!isString(searchName)) {
            searchName = "";
        }
        if (!isNumber(defaultValue)) {
            defaultValue = "";
        }
        var isNumericData = false;
        if (isArray(requestedArray) && isString(sortableName) && isString(sortableValue) && sortableName.length > 0 && sortableValue.length > 0) {
            for (var p = 0; p < requestedArray.length; p++) {
                if (isObject(requestedArray[p])) {
                    isNumericData = Stack.isBooleanTrue(requestedArray[p].isNumericData);
                    break;
                } else if (isArray(requestedArray[p])) {
                    for (var q=0; q<requestedArray[p].length; q++) {
                        if (isObject(requestedArray[p][q])) {
                            if (sortableName === requestedArray[p][q][searchName]) {
                                isNumericData = Stack.isBooleanTrue(requestedArray[p][q].isNumericData);
                                break;
                            }
                        }
                    }
                }
            }
            requestedArray = requestedArray.sort(function(a, b) {
                var i, aName = null, bName = null, temp;
                if (isArray(a)) {
                    for (i=0; i<a.length; i++) {
                        if (sortableName === a[i][searchName]) {
                            aName = a[i]["value"];
                            break;
                        }
                    }
                } else if (isObject(a)) {
                    aName = a[sortableName];
                } else {
                    aName = a;
                }
                if (isUndefined(aName) || aName === null) {
                    aName = defaultValue;
                }
                if (isArray(b)) {
                    for (i=0; i<b.length; i++) {
                        if (sortableName === b[i][searchName]) {
                            bName = b[i]["value"];
                            break;
                        }
                    }
                } else if (isObject(b)) {
                    bName = b[sortableName];
                } else {
                    bName = b;
                }
                if (isUndefined(bName) || bName === null) {
                    bName = defaultValue;
                }
                if (isNumericData) {
                    if (isNumeric(aName)) {
                        aName = aName * 1;
                    }
                    if (isNumeric(bName)) {
                        bName = bName * 1;
                    }
                }
                if (sortableValue === "ascending") {
                    temp = aName;
                    aName = bName;
                    bName = temp;
                } else if (sortableValue !== "descending") {
                    return 0;
                }
                if (aName < bName) {
                    return 1;
                } else if (aName > bName) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
        return requestedArray;
    },
    sortResultV2: function(requestedArray, sortingFields, searchName, defaultValue) {
        if (isArray(sortingFields)) {
            for(var i=0; i<sortingFields.length; i++) {
                if (!isObject(sortingFields[i])) {
                    continue;
                }
                requestedArray = Stack.sortResult(requestedArray, sortingFields[i].value, sortingFields[i].name, searchName, defaultValue);
            }
        }
        return requestedArray;
    },
    searchItems: function(searchingPattern, allData, searchByPattern, isRevert, modifier, isTrue) {
        if (!isArray(allData)) {
            return [];
        }
        if (!isArray(searchingPattern)) {
            searchingPattern = [];
        }
        if (Stack.isBooleanTrue(searchByPattern)) {
            searchByPattern = true;
        } else {
            searchByPattern = false;
        }
        if (Stack.isBooleanTrue(isRevert)) {
            isRevert = true;
        } else {
            isRevert = false;
        }
        if (modifier === "g") {
            modifier = 'g';
        } else {
            modifier = 'i';
        }
        var j, temp1;
        function isTrue1(el, i, arr) {
            if (isFunction(isTrue)) {
                var b = isTrue(searchingPattern, el, i, arr, searchByPattern, isRevert, modifier);
                return Stack.isBooleanTrue(b);
            }
            if (!isString(el)) {
                return false;
            }
            if (!searchByPattern) {
                return searchingPattern.indexOf(el) >= 0;
            }
            for(j=0; j<searchingPattern.length; j++) {
                if (!isString(searchingPattern[j])) {
                    continue;
                }
                temp1 = new RegExp(searchingPattern[j], modifier);
                if (el.search(temp1) >= 0) {
                    return true;
                }
            }
            return false;
        }
        var result = allData.filter(function(el, i, arr) {
            var t = isTrue1(el, i, arr);
            if (isRevert) {
                t = !t;
            }
            return  t;
        });
        return result;
    },
    findParam: function(availableItems, key, defaultValue, searchName, searchValue) {
        if (!isArray(availableItems)) {
            return defaultValue;
        }
        if (!isString(key) || key.length === 0) {
            return defaultValue;
        }
        if (!isString(searchName) || searchName.length === 0) {
            searchName = "";
        }
        if (!isString(searchValue) || searchValue.length === 0) {
            searchValue = "";
        }
        for (var i = 0; i < availableItems.length; i++) {
            if (!isObject(availableItems[i])) {
                continue;
            }
            if (searchName !== "" && searchValue !== "") {
                if (availableItems[i][searchName] === key) {
                    return availableItems[i][searchValue];
                }
            } else if (!isUndefined(availableItems[i][key])) {
                return availableItems[i][key]
            }
        }
        return defaultValue;
    },
    changeBase: function(n, fromBase, toBase) {
        // void 0 === 'undefined'
        if (fromBase === void 0) {
            fromBase = 10;
        }
        if (toBase === void 0) {
            toBase = 10;
        }
        return parseInt(n.toString(), fromBase).toString(toBase);
    },
    changeBaseV2: function(n, fromBase, toBase, minLength) {
        var result = "", temp;
        if (!isNumber(minLength)) {
            minLength = 1;
        }
        if (isString(n)) {
            for(var i=0; i<n.length; i++) {
                if (n[i] === ' ') {
                    result += ' ';
                    continue;
                }
                temp = Stack.changeBase(n[i], fromBase, toBase);
                if (minLength > 1) {
                    temp = temp.padStart(minLength, '0');
                }
                result += temp;
            }
        }
        return result;
    },
    convertHexToBin: function(hexCodedData) {
        var binaryData = [];
        for(var i=0; i<hexCodedData.length; i++) {
            binaryData.push(Stack.changeBase(hexCodedData[i], 10, 2).padStart(8, '0'));
        }
        return binaryData;
    },
    convertHexToStr: function(hexCodedData) {
        var strData = [];
        for(var i=0; i<hexCodedData.length; i++) {
            strData.push(Stack.changeBase(hexCodedData[i], 10, 16).padStart(2, '0'));
        }
        return strData.join(" ");
    }
});

Stack.extend({
    clone26032020: function(obj) {
        var res = obj;
        if (isArray(obj)) {
            res = [].concat(obj)
        } else if (isObject(obj)) {
            res = {};
            for (var key in obj) {
                res[key] = Stack.clone26032020(obj[key]);
            }
        }
        return res;
    },
    clone: function(source) {
        if (isArray(source)) {
            return source.map(Stack.clone);
        }
        if (isObject(source)) {
            var target = {};
            var keys = Object.keys(source);
            var klen = keys.length;
            for (var k=0; k < klen; k++) {
                target[keys[k]] = Stack.clone(source[keys[k]]);
            }
            return target;
        }
        return source;
    },
    updateDataObj: function(dataObj, key, value, type) {
        if (isObject(dataObj) && isString(key) && key.length > 0) {
            if (type === "checkType") {
                if (typeof dataObj[key] === typeof value) {
                    if (typeof value === "object") {
                        if (Stack.isArray(value) === Stack.isArray(dataObj[key])) {
                            dataObj[key] = value;
                        } else if (Stack.isObject(value) === Stack.isObject(dataObj[key])) {
                            dataObj[key] = value;
                        } else {
                            Stack.log("dataObj not updated: " + type + ":" + key);
                        }
                    } else {
                        dataObj[key] = value;
                    }
                } else {
                    Stack.log("dataObj not updated: " + type + ":" + key);
                }
            } else if (type === "checkUndefined") {
                if (isUndefined(dataObj[key])) {
                    dataObj[key] = value;
                }
            } else {
                dataObj[key] = value;
            }
        } else {
            Stack.log("dataObj is invalid: " + key);
        }
        return dataObj;
    },
    updateListItemAsIndex: function(listItems, key, preSyntax) {
        if (!Stack.isStringV2(key)) {
            return listItems;
        }
        if (!isArray(listItems)) {
            return listItems;
        }
        if (isUndefined(preSyntax)) {
            preSyntax = "";
        }
        for (var i=0; i<listItems.length; i++) {
            if (!isObject(listItems[i])) {
                continue;
            }
            listItems[i][key] = preSyntax + i;
        }
        return listItems;
    }
});

Stack.extend({
    /**
     * Preferences (Depricated and follow strictly BODMAS) => 1st it will evaluate Bracket, then it will follow right associativity (i.e. Right to Left)
     * Date: 10.11.2021
     * 3*5 = 15
     * 2+2*2 = 6
     * 2*2+2 = 6
     * (1*((1+1)*1+1*1)*1) = 2+1 = 3
     * (3*((4+5)*7+8*9)*2) = (3*(9*7+8*9)*2) = (3*(63+72)*2) = (6*135) = 810
     * (3*((4+5)*7+8*9)) = 3*(63+72) = 3*135 = 405
     * (3*(9*7+4)*2) = (3*67*2) = 402
     * (3*((4+5)*7+2*2)*2) = (3*(9*7+2*2)*2) = (3*67*2) = 402
     * (3*((4+5)*7+2*2)) = 3*(9*7+2*2) = (3*67) = 201
     * (3*(9*7+4)) = 3*67 = 201
     * (2*3+5+5*4+2) = 6+5+20+2 = 33
     * (3*4*5*6) = 360
     * (((3*4)*5)*6) = 360
     * (4+(5*6)) = 34
     * (3+(4*5)) = 23
     * (3*(4+5)) = 27
     * (3*(((5+5)*5)+5)) = 3*(10*5+5)
     * (2*3+4*7) = 34
     * (2+3*4*7) = 2+84 = 86
     * ((2+3)*(4*7)) = 5*28 = 140
     * (2*3*4+7) = 24+7 = 31
     * (3+4*(7+2)) = 3+36 = 39
     * (3+4*7+2) = 3+28+2 = 33
     * (3*4*(7+2)) = 12*9 = 108
     * ((3*4)*7+2) = 84+2 = 86
     * (2*3*(5*5*2*2+2)) = 6*(100+2) = 612
    */
    /*
        It follows BODMAS strictly except exponent part (which is not implemented)
        Priority of + and - is same
        BODMAS: Bracket, Of, Division, Multiplication, Addition, Subtraction
        BODMAS is also known as PEDMAS: Parentheses, Exponent, ...
        Exponent can be intiger or fraction 1/2, 1/3
        It does not support Exponent
        It support other things, Bracket, Division, Multiplication, Addition and Subtraction
    */
    calNumerical: function(postfix) {
        var st = new St();
        var A, op, B;
        var val, result;
        for (var i = 0; i<postfix.length; i++) {
            op = postfix[i]; //operator
            if (!isNaN(postfix[i])) {
                st.push(postfix[i]*1);
            } else if (["+","-","*","/"].indexOf(op) >= 0) {
                A = st.pop()*1;
                B = st.pop()*1;
                val = calculateNumericalValue(B, op, A);
                st.push(val);
            } else {
                var logText = "Invalid operator or value for numerical calculation: " + op;
                logText += ", in postfix:" + postfix.toString();
                Logger.log(logText);
                throw logText;
            }
        }
        result = st.pop();
        return result;
    },
    calBinary: function(postfix) {
        var st = new St();
        var A, op, B;
        var  val, result;
        for (var i = 0; i<postfix.length; i++) {
            op = postfix[i]; //operator
            if (typeof postfix[i] == "boolean") {
                st.push(postfix[i]);
            } else if (["&&","&","*","||","|","#","+"].indexOf(op) >= 0) {
                A = st.pop();
                B = st.pop();
                val = calculateValue(B, op, A);
                st.push(val);
            } else if (["~"].indexOf(op) >= 0) {
                A = st.pop();
                val = calculateValue(A, op);
                st.push(val);
            } else {
                var logText = "Invalid operator or value for binary calculation: " + op;
                logText += ", in postfix: " + postfix.toString();
                Logger.log(logText);
                throw logText;
            }
        }
        result = st.pop();
        return result;
    },
    createPreOrderTree: function(tokenizedExp) {
        var bt = new BT("");
        var btRoot = bt.createBinaryTree(Stack.clone(tokenizedExp));
        var preOrderTreeValue = bt.getPreOrder(btRoot);
        return preOrderTreeValue;
    },
    createInOrderTree: function(tokenizedExp) {
        var bt = new BT("");
        var btRoot = bt.createBinaryTree(Stack.clone(tokenizedExp));
        var inOrderTreeValue = bt.getInOrder(btRoot);
        return inOrderTreeValue;
    },
    createPostOrderTree: function(tokenizedExp) {
        var bt = new BT("");
        var btRoot = bt.createBinaryTree(Stack.clone(tokenizedExp));
        var postOrderTreeValue = bt.getPostOrder(btRoot);
        return postOrderTreeValue;
    },
    generateExpression: function (items) {
        var st = new St();
        var pre, post;
        var op, values;
        if (isObject(items)) {
            /*
                Not using default expression as && or anything because
                && can be written in multiple ways like &&,&,* etc...
                || can be written in multiple ways like ||,|,+,# etc...
            */
            op = items["op"]; //operator
            values = items["val"];
            for (var i = 0; i < values.length; i++) {
                st.push(values[i]);
            }
            while(st.getTop() > 0) {
                pre = st.pop();
                if (pre.val) {
                    Stack.generateExpression(pre);
                    pre = pre.exp;
                }
                post = st.pop();
                if (post.val) {
                    Stack.generateExpression(post);
                    post = post.exp;
                }
                st.push("("+post+op+pre+")");
            }
            items["exp"] = st.pop();
        }
        return items;
    },
    evaluateNumerical: function(expression) {
        var tokens = Stack.tokenize(expression, ["(",")","+","-","*","/"]);
        var posix = Stack.createPosixTree(tokens);
        return Stack.calNumerical(posix);
    },
    evaluateBinary: function(expression) {
        var tokens = Stack.tokenize(expression, ["(",")","&&","*","||","#","+","~"]);
        var posix = Stack.createPosixTree(tokens);
        for (var i = 0; i < posix.length; i++) {
            if (posix[i] === "true") {
                posix[i] = true;
            } else if (posix[i] === "false") {
                posix[i] = false;
            } else {
                continue;
            }
        }
        return Stack.calBinary(posix);
    },
    evaluateBinaryV2: function(expression) {
        var tokens = Stack.tokenize(expression, ["(",")","&","*","|","#","+","~"]);
        var posix = Stack.createPosixTree(tokens);
        for (var i = 0; i < posix.length; i++) {
            if (posix[i] === "true") {
                posix[i] = true;
            } else if (posix[i] === "false") {
                posix[i] = false;
            } else {
                continue;
            }
        }
        return Stack.calBinary(posix);
    },
    tokenize: function(expression, tokenItems) {
        var tokens = [];
        if (tokenItems && tokenItems.length) {
            for (var i = 0; i < tokenItems.length; i++) {
                expression = expression.split(tokenItems[i]).join(","+tokenItems[i]+",");
            }
        }
        var temp = expression.split(","), tempToken;
        //Remove empty values and trim all token
        for (var j = 0; j < temp.length; j++) {
            tempToken = temp[j].trim();
            if (tempToken === "") {
                continue;
            } else {
                tokens.push(tempToken);
            }
        }
        return tokens;
    },
});
Stack.extend({
    setSkipValuesFromPosixResult: function(skipValues) {
        if (isArray(skipValues)) {
            skipValuesInResult = [];
            for (var i = 0; i < skipValues.length; i++) {
                if (["string", "number"].indexOf(typeof skipValues[i]) >= 0) {
                    skipValuesInResult.push(skipValues[i]);
                }
            }
        }
        return true;
    },
    createPosixTree: function(tokenizedExp) {
        var response = [];
        var posixTreeValue = Stack.createPostOrderTree(tokenizedExp);
        // Fix for single item expression, like
        // exp = "(true)" => tokenizedExp = ["(", "true", ")"]
        // exp = "((true))" or "(((true)))"
        // BT => root.data = "", root.left.data = "true"
        // Therefore response should be ["true"] instead of ["true", ""]
        for (var i = 0; i < posixTreeValue.length; i++) {
            if (skipValuesInResult.indexOf(posixTreeValue[i]) >= 0) {
                continue;
            }
            response.push(posixTreeValue[i]);
        }
        return response;
    }
});
Stack.extend({
    _fireCallBack: function(callBack, ajax, status, response) {
        if (Stack.isFunction(callBack)) {
            callBack(ajax, status, response);
        }
    },
    _send: function(JQ, options, callBack) {
        options["success"] = function(res, textStatus) {
            Stack._fireCallBack(callBack, options, "SUCCESS", res);
        };
        options["error"] = function(xhr, textStatus, errorThrown) {
            Stack._fireCallBack(callBack, options, "FAILURE", null);
        };
        JQ.ajax(options);
    },
    sendPostRequest: function(JQ, url, data, callback) {
        this.sendPostRequestV2(JQ, url, data, null, callback);
    },
    sendPostRequestV2: function(JQ, url, data, headers, callback) {
        var reqOption = {};
        reqOption["url"] = url;
        reqOption["type"] = "POST";
        reqOption["data"] = JSON.stringify(data);
        reqOption["dataType"] = "json";
        if (Stack.isObject(headers)) {
            reqOption["headers"] = headers;
            //headers = {"Accept": "text/html", "Content-Type": "application/json"};
        } else {
            reqOption["headers"] = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            };
        }
        Stack._send(JQ, reqOption, callback);
    },
    uploadFile: function(JQ, url, formData, callBack, percentageCompleteCallBack) {
        var reqOption = {};
        reqOption["url"] = url;
        reqOption["type"] = "POST";
        reqOption["data"] = formData;
        reqOption["processData"] = false;
        reqOption["contentType"] = false;
        if (Stack.isFunction(percentageCompleteCallBack)) {
            reqOption["xhr"] = function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        percentageCompleteCallBack(percentComplete);
                    }
                }, false);
                return xhr;
            }
        }
        Stack._send(JQ, reqOption, callBack);
    },
    loadJsonData: function(JQ, urls, eachApiCallback, callBack, apiName, ajaxApiCall) {
        var obj = {"type": "json", "dataType": "json"};
        return Stack.callGetRequest(JQ, urls, obj, eachApiCallback, callBack, apiName, ajaxApiCall);
    },
    callGetRequest: function(JQ, urls, obj, eachApiCallback, callBack, apiName, ajaxApiCall) {
        if (Stack.isFunction(JQ) && Stack.isFunction(JQ.ajax)) {
            ajaxApiCall = function(ajax, callBack) {
                JQ.ajax({url: ajax.url,
                    type: "GET",
                    success: function(response, textStatus) {
                        callBack(ajax, "SUCCESS", response);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        callBack(ajax, "FAILURE", null);
                    }
                });
            }
        }
        if (isArray(urls) === false || urls.length < 1 || isFunction(ajaxApiCall) === false) {
            if (isFunction(eachApiCallback)) {
                eachApiCallback(null, apiName);
            }
            Stack.callMethod(callBack);
            return false;
        }
        if (!isObject(obj)) {
            obj = {};
        }
        var apiSendCount = urls.length, apiReceiveCount = 0;
        var st = Stack.getStack(), temp;
        for (var i = 0; i < urls.length; i++) {
            var ajax = {};
            ajax.type = obj.type ? obj.type : "json";
            ajax.dataType = obj.dataType ? obj.dataType : "json";
            ajax.url = urls[i];
            ajax.apiName = apiName;
            st.push(ajax);
        }
        function loadAjaxSequentially() {
            if (st.getTop() >= 0) {
                temp = st.pop();
                ajaxApiCall(temp, function(ajaxDetails, status, response) {
                    apiReceiveCount++;
                    if (status === "FAILURE") {
                        Stack.log("Error in api: " + ajaxDetails.url, LoggerInfo);
                    }
                    if (isFunction(eachApiCallback)) {
                        eachApiCallback(response, ajaxDetails.apiName, ajaxDetails);
                    }
                    if (apiSendCount === apiReceiveCount) {
                        Stack.callMethod(callBack);
                    } else {
                        loadAjaxSequentially();
                    }
                });
            }
        }
        loadAjaxSequentially();
        return true;
    }
});
Stack.extend({
    callMethod: function(method) {
        if (Stack.isFunction(method)) {
            method();
            return 1;
        }
        return 0;
    },
    callMethodV1: function(method, arg1) {
        if (Stack.isFunction(method)) {
            method(arg1);
            return 1;
        }
        return 0;
    },
    callMethodV2: function(method, arg1, arg2) {
        if (Stack.isFunction(method)) {
            method(arg1, arg2);
            return 1;
        }
        return 0;
    },
    callMethodV3: function(method, arg1, arg2, arg3) {
        if (Stack.isFunction(method)) {
            method(arg1, arg2, arg3);
            return 1;
        }
        return 0;
    },
    callMethodV4: function(method, arg1, arg2, arg3, arg4) {
        if (Stack.isFunction(method)) {
            method(arg1, arg2, arg3, arg4);
            return 1;
        }
        return 0;
    },
    extendObject: function(Obj) {
        ExtendObject(Obj);
    },/*
    loadJsonDataOld: function(JQ, urls, eachApiCallback, callBack, apiName, ajaxApiCall) {
        if (Stack.isFunction(JQ) && Stack.isFunction(JQ.ajax)) {
            ajaxApiCall = function(ajax, callBack) {
                JQ.ajax({url: ajax.url,
                    type: "GET",
                    success: function(response, textStatus) {
                        callBack(ajax, "SUCCESS", response);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        callBack(ajax, "FAILURE", null);
                    }
                });
            }
        }
        if (isArray(urls) === false || urls.length < 1 || isFunction(ajaxApiCall) === false) {
            if (isFunction(eachApiCallback)) {
                eachApiCallback(null, apiName);
            }
            Stack.callMethod(callBack);
            return false;
        }
        var apiSendCount = urls.length, apiReceiveCount = 0;
        for (var i = 0; i < urls.length; i++) {
            var ajax = {};
            ajax.type = "json";
            ajax.dataType = "json";
            ajax.url = urls[i];
            ajax.apiName = apiName;
            ajaxApiCall(ajax, function(ajaxDetails, status, response) {
                apiReceiveCount++;
                if (status === "FAILURE") {
                    Stack.log("Error in api: " + ajaxDetails.url, LoggerInfo);
                }
                if (isFunction(eachApiCallback)) {
                    eachApiCallback(response, ajax.apiName);
                }
                if (apiSendCount === apiReceiveCount) {
                    Stack.callMethod(callBack);
                }
            });
        }
        return true;
    },*/
});
Stack.extend({
    /*
        () ==> ""
        (0) => Zero
        (1) => One
        (81) => Eighty One
        (19) => Nineteen
        (190) => One Hundred and Ninety
        (1900) => One Thousand Nine Hundred
        (1912) => One Thousand Nine Hundred and Twelve
        (1922) => One Thousand Nine Hundred and Twenty Two
        (190000) => One Lakh Ninety Thousand
        (190001) => One Lakh Ninety Thousand and One
        (190018) => One Lakh Ninety Thousand and Eighteen
        (190118) => One Lakh Ninety Thousand One Hundred and Eighteen
    */
    numberToWord: function(n) {
        if (!Stack.isNumeric(n)) {
            return "";
        }
        n = n*1;
        var string = n.toString();
        if (string.split(".").length > 1) {
            return "";
        }
        var units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
        var and = 'and';
        /* Is number zero? */
        if (parseInt(string) === 0) {
            return 'Zero';
        }
        /* Array of units as words */
        units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
                'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
                'Eighteen', 'Nineteen'];
        /* Array of tens as words */
        tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        /* Array of scales as words */
        scales = ['', 'Thousand', 'Lakh', 'Crore'];
        /* Split user arguemnt into 3 digit chunks from right to left */
        start = string.length;
        chunks = [];
        var splitLength = 3;
        while (start > 0) {
            end = start;
            start = Math.max(0, start - splitLength);
            chunks.push(string.slice(start, end));
            splitLength = 2;
        }
        /* Check if function has enough scale words to be able to stringify the user argument */
        chunksLen = chunks.length;
        if (chunksLen > scales.length) {
            return '';
        }
        /* Stringify each integer in each chunk */
        words = [];
        for (i = 0; i < chunksLen; i++) {
            chunk = parseInt(chunks[i]);
            if (chunk) {
                /* Split chunk into array of individual integers */
                ints = chunks[i].split('').reverse().map(parseFloat);
                /* If tens integer is 1, i.e. 10, then add 10 to units integer */
                if (ints[1] === 1) {
                    ints[0] += 10;
                }
                /* Add scale word if chunk is not zero and array item exists */
                if ((word = scales[i])) {
                    words.push(word);
                }
                /* Add unit word if array item exists */
                if ((word = units[ints[0]])) {
                    words.push(word);
                }
                /* Add tens word if array item exists */
                if ((word = tens[ints[1]])) {
                    words.push(word);
                }
                /* Add 'and' string after units or tens integer if: */
                if (ints[0] || ints[1]) {
                    /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                    // if (ints[2] || !i && chunksLen) {
                    if (!Stack.isUndefined(ints[2]) && !i) {
                        words.push(and);
                    }
                }
                /* Add hundreds word if array item exists */
                if ((word = units[ints[2]])) {
                    words.push(word + ' Hundred');
                }
            }
        }
        return words.reverse().join(' ');
    },
    numberToFixed: function(num, decimal) {
        if (isNumeric(num) && isNumber(decimal)) {
            if ([0,1,2,3,4].indexOf(decimal) < 0) {
                decimal = 2;
            }
            num = num.toFixed(decimal)*1;
        }
        return num;
    }
});
//GATracking push event
Stack.extend({
    pushGAEvent: function(Gtag, action, category, label) {
        if (!Stack.isString(action)) {
            action = "not-string";
        } else if (action.length === 0) {
            action = "empty-string";
        }
        if (!Stack.isString(category)) {
            category = "not-string";
        } else if (category.length === 0) {
            category = "empty-string";
        }
        if (!Stack.isString(label)) {
            label = "not-string";
        } else if (label.length === 0) {
            label = "empty-string";
        }
        if (Stack.isDefined(Gtag) && Gtag !== null) {
            setTimeout(function(){
                Gtag('event', action, {
                  'event_category' : category,
                  'event_label' : label
                });
            }, 1);
        } else {
            Stack.log("Gtag is Invalid");
        }
    },
    convertRowToColumn: function(data) {
        var rows = [];
        var maxRowLen = 0, i, j;
        if (isArray(data)) {
            for (i = 0; i < data.length; i++) {
                if (isArray(data[i])) {
                    if (data[i].length > maxRowLen) {
                        maxRowLen = data[i].length;
                    }
                }
            }
            for (i = 0; i < maxRowLen; i++) {
                rows.push([]);
            }
            for (i = 0; i < data.length; i++) {
                if (isArray(data[i])) {
                    for(j=0; j<data[i].length; j++) {
                        rows[j].push(data[i][j]);
                    }
                }
            }
        }
        return rows;
    }
});
Stack.extend({
    getNavigatorData: function(uiNavigator, key) {
        // uiNavigator = window.navigator
        var result = key;
        try {
            if (!isObject(uiNavigator)) {
                return result;
            }
            if (isString(uiNavigator[key])) {
                result = uiNavigator[key];
            }
        } catch(err) {
            result = "error in " + key;
        }
        return result;
    },
    getUserAgentTrackingData: function(uiNavigator) {
        var trackingData = [];
        var trackingKey = ["platform","appVersion","appCodeName","appName"];
        for(var i=0; i<trackingKey.length; i++) {
            trackingData.push(this.getNavigatorData(uiNavigator, trackingKey[i]));
        }
        return trackingData.join(",");
    }
});
Stack.extend({
    readTextData: function(rawResponse) {
        var temp = [];
        if (Stack.isStringV2(rawResponse)) {
            temp = rawResponse.split("\r\n");
            if (temp.length === 1) {
                temp = rawResponse.split("\n");
            }
        }
        return temp;
    },
    removeSingleLineComment: function(fileResponse, singleLineCommentPattern) {
        var result = [], i, temp;
        if (!isArray(fileResponse)) {
            return result;
        }
        if (!Stack.isStringV2(singleLineCommentPattern)) {
            return fileResponse;
        }
        for (i = 0; i < fileResponse.length; i++) {
            temp = fileResponse[i].split(singleLineCommentPattern);
            if (temp.length >= 2) {
                result.push(temp[0]);
                continue;
            }
            result.push(fileResponse[i]);
        }
        return result;
    },
    removeEmpty: function(fileResponse) {
        var result = [], i, temp;
        if (!isArray(fileResponse)) {
            return result;
        }
        for (i = 0; i < fileResponse.length; i++) {
            temp = fileResponse[i].trim();
            if (temp.length > 0) {
                result.push(temp);
            }
        }
        return result;
    },
    removeMultiLineComment: function(fileResponse, startPattern, endPattern) {
        var result = [], i, j, k, temp, temp2;
        for (i = 0; i < fileResponse.length; i++) {
            if (fileResponse[i].split(startPattern).length >= 2) {
                temp = fileResponse[i].split(startPattern);
                result.push(temp[0]);
                // j loop started from i because in the same line end pattern may be found
                for (j = i; j < fileResponse.length; j++) {
                    if (fileResponse[j].split(endPattern).length >= 2) {
                        temp = fileResponse[j].split(endPattern);
                        temp2 = [];
                        // k loop started from 1 by ignoring first part
                        for (k=1; k<temp.length; k++) {
                            temp2.push(temp[k]);
                        }
                        result.push(temp2.join(endPattern));
                        // Here i++ not required because it will be automatically done
                        break;
                    }
                    i++;
                }
            } else {
                result.push(fileResponse[i]);
            }
        }
        return result;
    },
    tokenizeFileData: function(fileResponse, wordBreak) {
        var result = [];
        if (Stack.isArray(fileResponse) && Stack.isStringV2(wordBreak)) {
            for (var i=0; i<fileResponse.length; i++) {
                if (Stack.isStringV2(fileResponse[i])) {
                    result.push(fileResponse[i].split(wordBreak));
                }
            }
        }
        return result;
    },
    _generateTableRow: function(rowData, rowIndex) {
        var result = {}, i, j, temp;
        if (Stack.isArray(rowData) && Stack.isArray(rowIndex)) {
            for (i = 0; i < rowData.length; i++) {
                if (i < rowIndex.length-1) {
                    result[rowIndex[i]] = rowData[i].trim();
                } else {
                    temp = [];
                    for(j=i; j<rowData.length; j++) {
                        if (Stack.isString(rowData[j]) && rowData[j].length > 0) {
                            temp.push(rowData[j].trim());
                        }
                    }
                    i = j;
                    result[rowIndex[rowIndex.length-1]] = temp.join(",");
                }
            }
        }
        return result;
    },
    convertArrayToTable: function(arrayData, dataIndex) {
        var maxLength = 0, i, j;
        if (!Stack.isArray(arrayData)) {
            arrayData = [];
        }
        for(i=0; i<arrayData.length; i++) {
            if (Stack.isArray(arrayData[i])) {
                if (maxLength < arrayData[i].length) {
                    maxLength = arrayData[i].length;
                }
            }
        }
        for(i=0; i<arrayData.length; i++) {
            if (Stack.isArray(arrayData[i])) {
                for(j = arrayData[i].length; j<maxLength; j++) {
                    arrayData[i].push("");
                }
            }
        }
        if (!Stack.isArray(dataIndex) || dataIndex.length === 0) {
            dataIndex = [];
            for (i=0; i<maxLength; i++) {
                dataIndex.push(i.toString());
            }
        }
        var result = [];
        for(i=0; i<arrayData.length; i++) {
            result.push(this._generateTableRow(arrayData[i], dataIndex));
        }
        return result;
    },
    convertFileDataToTable: function(fileData, dbDataApiObj) {
        var temp = Stack.readTextData(fileData);
        if (Stack.isObject(dbDataApiObj) && Stack.isStringV2(dbDataApiObj["singleLineComment"])) {
            temp = Stack.removeSingleLineComment(temp, dbDataApiObj["singleLineComment"]);
        }
        temp = Stack.removeEmpty(temp);
        if (Stack.isObject(dbDataApiObj)) {
            if (Stack.isStringV2(dbDataApiObj["wordBreak"])) {
                temp = Stack.tokenizeFileData(temp, dbDataApiObj["wordBreak"]);
            }
            if (Stack.isArray(dbDataApiObj["dataIndex"])) {
                temp = Stack.convertArrayToTable(temp, dbDataApiObj["dataIndex"]);
            }
        }
        if (!Stack.isArray(dbDataApiObj["tableData"])) {
            dbDataApiObj["tableData"] = [];
        }
        dbDataApiObj["tableData"].push(temp);
    }
});
/*End of direct access of methods*/
if (Platform === "Window") {
    window.$S = Stack;
} else if (Platform === "Node.js") {
    module.exports = Stack;
}
}));
