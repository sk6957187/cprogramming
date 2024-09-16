import $S from '../../../interface/stack.js';
import Api from '../../Api.js';
import TemplateHelper from '../../TemplateHelper.js';

// import CommonConfig from './CommonConfig.js';


var AppHandler;

(function($S){
var DT = $S.getDT();
var requestId = $S.getRequestId();
var configGtag = false;

AppHandler = function(arg) {
    return new AppHandler.fn.init(arg);
};

AppHandler.fn = AppHandler.prototype = {
    constructor: AppHandler,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};
$S.extendObject(AppHandler);
AppHandler.extend({
    setGtag: function(gtag) {
        configGtag = gtag;
    },
    getPageUrl: function(pageName) {
        return window.location.pathname;
    },
    LazyRedirect: function(url, delay) {
        // standard value of delay = 250 (i.e. 250ms)
        if ($S.isNumber(delay)) {
            window.setTimeout(function() {
                window.location.href = url;
            }, delay);
        } else {
            window.location.href = url;
        }
    },
    LazyReload: function(delay) {
        // standard value of delay = 250 (i.e. 250ms)
        if ($S.isNumber(delay)) {
            window.setTimeout(function() {
                window.location.reload();
            }, delay);
        } else {
            window.location.reload();
        }
    }
});
AppHandler.extend({
    getTagName: function(e) {
        return e.currentTarget.tagName.toLocaleLowerCase();
    },
    getFieldName: function(e) {
        var tagName = this.getTagName(e);
        if ($S.isString(tagName) && tagName === "span") {
            return e.currentTarget.getAttribute("name");
        }
        return e.currentTarget.name;
    },
    getFieldValue: function(e) {
        var tagName = this.getTagName(e);
        if ($S.isString(tagName) && ["span", "form"].indexOf(tagName) >= 0) {
            return e.currentTarget.getAttribute("value");
        }
        return e.currentTarget.value;
    }
});
AppHandler.extend({
    isValidDateStr: function(dateStr) {
        var p1Formate = "YYYY/-/MM/-/DD";
        var p2Formate = "YYYY/-/MM/-/DD/ /hh/:/mm";
        var p4Formate = "YYYY/-/MM/-/DD/ /hh/:/mm/:/ss";
        var p3Formate = "YYYY/-/MM/-/DD/ /hh/:/mm/:/ss/./ms";
        //2020-05-31
        var p1 = /[1-9]{1}[0-9]{3}-[0-1][0-9]-[0-3][0-9]/i;
        //2020-05-31 00:00
        var p2 = /[1-9]{1}[0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]/i;
        //2021-05-26 00:00:09.987
        var p3 = /[1-9]{1}[0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]{3}/i;
        var p4 = /[1-9]{1}[0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]:[0-5][0-9]/i;
        var dateObj;
        if ($S.isString(dateStr) && (dateStr.length === 16 || dateStr.length === 10 || dateStr.length === 23 || dateStr.length === 19)) {
            dateObj = DT.getDateObj(dateStr);
            if (dateObj !== null) {
                if (dateStr.search(p3) >= 0 && dateStr === DT.formateDateTime(p3Formate, "/", dateObj)) {
                    return true;
                } else if (dateStr.search(p4) >= 0 && dateStr === DT.formateDateTime(p4Formate, "/", dateObj)) {
                    return true;
                } else if (dateStr.search(p2) >= 0 && dateStr === DT.formateDateTime(p2Formate, "/", dateObj)) {
                    return true;
                } else if (dateStr.search(p1) >= 0 && dateStr === DT.formateDateTime(p1Formate, "/", dateObj)) {
                    return true;
                }
            }
        }
        return false;
    },
    isDateLiesInRange: function(startDate, endDate, fieldDate) {
        if (!$S.isString(startDate) || !$S.isString(endDate) || !$S.isString(fieldDate)) {
            return false;
        }
        if (fieldDate.length === 10) {
            fieldDate += " 00:00";
        }
        if (startDate.length === 10) {
            startDate += " 00:00";
        }
        if (endDate.length === 10) {
            endDate += " 23:59";
        }
        startDate = DT.getDateObj(startDate);
        endDate = DT.getDateObj(endDate);
        fieldDate = DT.getDateObj(fieldDate);
        if (startDate === null || endDate === null || fieldDate === null) {
            return false;
        }
        if (startDate.getTime() <= fieldDate.getTime() && endDate.getTime() >= fieldDate.getTime()) {
            return true;
        }
        return false;
    },
    isDateLiesInRangeV2: function(dateRange, fieldDate) {
        if ($S.isArray(dateRange) && dateRange.length === 2) {
            return this.isDateLiesInRange(dateRange[0], dateRange[1], fieldDate);
        }
        return false;
    },
    isDateLiesInRangeV3: function(dateStr, fieldDate) {
        // dateStr = 2021-06-11
        // fieldDate = 2021-06-11 09:19
        if ($S.isString(dateStr)) {
            return this.isDateLiesInRange(dateStr.substring(0, 10), dateStr, fieldDate);
        }
        return false;
    },
    generateDateSelectionParameter: function(allDateStr) {
        var dailyDateSelection = [];
        var monthlyDateSelection = [];
        var yearlyDateSelection = [];
        var allDateSelection = [];
        var allDate = [];
        if ($S.isArray(allDateStr)) {
            allDate = allDateStr;
        }
        var i, temp, heading, startDate, endDate;
        var isDateHeadingChanged;
        /*Daily Date Selection*/
        for (i=0; i<allDate.length; i++) {
            temp = allDate[i];
            dailyDateSelection.push({"dateRange": [temp+" 00:00", temp+" 23:59"], "dateHeading": temp});
        }
        /*Monthly Date Selection*/
        temp = [];
        var dObj;
        for (i=0; i<allDate.length; i++) {
            dObj = DT.getDateObj(allDate[i]);
            if (dObj !== null) {
                heading = DT.formateDateTime("MMM/ /YYYY", "/", dObj);
                endDate = DT.formateDateTime("YYYY/-/MM/-/DD/ 23:59", "/", dObj);
                if (temp.indexOf(heading) < 0) {
                    isDateHeadingChanged = true;
                } else {
                    isDateHeadingChanged = false;
                }
                if (isDateHeadingChanged) {
                    startDate = DT.formateDateTime("YYYY/-/MM/-/DD/ 00:00", "/", dObj);
                }
            } else {
                continue;
            }
            if (temp.indexOf(heading) < 0) {
                monthlyDateSelection.push({"dateRange": [startDate, endDate], "dateHeading": heading});
                temp.push(heading);
            } else {
                monthlyDateSelection[monthlyDateSelection.length-1]["dateRange"][1] = endDate;
            }
        }
        /*Yearly Date Selection*/
        temp = [];
        for (i=0; i<allDate.length; i++) {
            dObj = DT.getDateObj(allDate[i]);
            if (dObj !== null) {
                heading = DT.formateDateTime("YYYY", "/", dObj);
                endDate = DT.formateDateTime("YYYY/-/MM/-/DD/ 23:59", "/", dObj);
                if (temp.indexOf(heading) < 0) {
                    isDateHeadingChanged = true;
                } else {
                    isDateHeadingChanged = false;
                }
                if (isDateHeadingChanged) {
                    startDate = DT.formateDateTime("YYYY/-/MM/-/DD/ 00:00", "/", dObj);
                }
            } else {
                continue;
            }
            if (temp.indexOf(heading) < 0) {
                yearlyDateSelection.push({"dateRange": [startDate, endDate], "dateHeading": heading});
                temp.push(heading);
            } else {
                yearlyDateSelection[yearlyDateSelection.length-1]["dateRange"][1] = endDate;
            }
        }
        /*All Date Selection*/
        if (allDate.length > 0) {
            allDateSelection.push({"dateRange": [allDate[0] + " 00:00", allDate[allDate.length-1] + " 23:59"], "dateHeading": "All"});
        }
        var combinedDateSelectionParameter = {};
        combinedDateSelectionParameter["daily"] = dailyDateSelection;
        combinedDateSelectionParameter["monthly"] = monthlyDateSelection;
        combinedDateSelectionParameter["yearly"] = yearlyDateSelection;
        combinedDateSelectionParameter["all"] = allDateSelection;
        return combinedDateSelectionParameter;
    },
    ReplaceComma: function(str) {
        if ($S.isStringV2(str)) {
            return str.replaceAll("," , "...");
        }
        return str;
    },
    FormateString: function(str) {
        if (!$S.isStringV2(str)) {
            return str;
        }
        var temp = str.split("\n"), finalText = [];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].trim() !== "") {
                finalText.push(temp[i]);
            }
        }
        return finalText.join("; ");
    },
    GetUniqueId: function() {
        return DT.getDateTime("YYYY/MM/DD/hh/mm/ss/./ms","/");
    },
    IsResponseFailure: function(response, dafaultMessage) {
        if (!$S.isObject(response)) {
            alert(dafaultMessage);
            return true;
        }
        if (response.status === "FAILURE") {
            if (response.failureCode === "UNAUTHORIZED_USER") {
                alert(response.error);
                this.LazyReload(250);
                return true;
            } else {
                alert(response.error);
                return true;
            }
        }
        return false;
    },
    GetDataParameterFromDate: function(dateRange) {
        var allDate, tempAllDate, arrangedDate, startLimit, endLimit;
        var i;
        var startTime, endTime;
        if ($S.isArray(dateRange)) {
            if (dateRange.length === 2) {
                startTime = dateRange[0];
                endTime = dateRange[1];
            } else if (dateRange.length === 1) {
                dateRange = DT.getDateRange(dateRange[0]);
                if ($S.isArray(dateRange) && dateRange.length === 2) {
                    startTime = dateRange[0];
                    endTime = dateRange[1];
                }
            }
            allDate = this.GenerateDateBetween2Date(startTime, endTime);
            startLimit = startTime;
            endLimit = endTime;
            tempAllDate = allDate.map(function(el, index, arr) {
                return el.dateStr;
            });
            arrangedDate = this.generateDateSelectionParameter(tempAllDate);
            if ($S.isObject(arrangedDate)) {
                for(var key in arrangedDate) {
                    if ($S.isArray(arrangedDate[key])) {
                        for (i=0; i<arrangedDate[key].length; i++) {
                            if ($S.isArray(arrangedDate[key][i].dateRange) && arrangedDate[key][i].dateRange.length === 2) {
                                arrangedDate[key][i].allDate = this.GenerateDateBetween2Date(arrangedDate[key][i].dateRange[0], arrangedDate[key][i].dateRange[1], startLimit, endLimit);
                            }
                        }
                    }
                }
            }
        }
        return arrangedDate;
    }
});
AppHandler.extend({
    HandleToggleClick: function(appStateCallback, appDataCallback, oldValue) {
        var newValue = true;
        if ($S.isBooleanTrue(oldValue)) {
            newValue = false;
        }
        appDataCallback("enableFooterV2", newValue);
        appStateCallback();
    }
});
AppHandler.extend({
    // single select filter data
    getFilterData: function(selectionOptions) {
        var filterData = [];
        var i, j;
        if ($S.isArray(selectionOptions)) {
            for (i = 0; i < selectionOptions.length; i++) {
                if ($S.isArray(selectionOptions[i].text)) {
                    if ($S.isString(selectionOptions[i].selectedValue)) {
                        for (j = 0; j < selectionOptions[i].text.length; j++) {
                            if ($S.isObject(selectionOptions[i].text[j])) {
                                if (selectionOptions[i].selectedValue === selectionOptions[i].text[j].value) {
                                    selectionOptions[i].text[j]["selected"] = true;
                                } else {
                                    selectionOptions[i].text[j]["selected"] = false;
                                }
                            }
                        }
                    }
                    filterData.push({"type": selectionOptions[i].type, "text": selectionOptions[i].text, "selectName": selectionOptions[i].selectName});
                } else if ($S.isArray(selectionOptions[i].buttons)) {
                    if ($S.isString(selectionOptions[i].selectedValue)) {
                        for (j = 0; j < selectionOptions[i].buttons.length; j++) {
                            if ($S.isObject(selectionOptions[i].buttons[j])) {
                                if (selectionOptions[i].selectedValue === selectionOptions[i].buttons[j].value) {
                                    selectionOptions[i].buttons[j]["selected"] = true;
                                } else {
                                    selectionOptions[i].buttons[j]["selected"] = false;
                                }
                            }
                        }
                    }
                    filterData.push({"type": selectionOptions[i].type, "buttons": selectionOptions[i].buttons});
                }
            }
        }
        return filterData;
    },
    ConvertRowToCol: function(data) {
        var rows = [];
        var maxRowLen = 0, i, j;
        if ($S.isArray(data)) {
            for (i = 0; i < data.length; i++) {
                if ($S.isArray(data[i])) {
                    if (data[i].length > maxRowLen) {
                        maxRowLen = data[i].length;
                    }
                }
            }
            for (i = 0; i < maxRowLen; i++) {
                rows.push([]);
            }
            for (i = 0; i < data.length; i++) {
                if ($S.isArray(data[i])) {
                    for(j=0; j<data[i].length; j++) {
                        rows[j].push(data[i][j]);
                    }
                }
            }
        }
        return rows;
    },
    _parseTcpResponse: function(tcpResponse, defaultResponse) {
        if (!$S.isStringV2(tcpResponse)) {
            return defaultResponse;
        }
        var rArray = tcpResponse.split("|");
        var temp = [];
        for (var i=2; i<rArray.length-1; i++) {
            temp.push(rArray[i]);
        }
        return temp;
    },
    ParseTcpResponseString: function(tcpResponse, defaultResponse) {
        if (!$S.isStringV2(tcpResponse)) {
            return defaultResponse;
        }
        var temp = this._parseTcpResponse(tcpResponse, defaultResponse);
        if ($S.isArray(temp)) {
            return temp.join("");
        }
        return defaultResponse;
    },
    ParseTcpResponseJson: function(tcpResponse, defaultResponse) {
        if (!$S.isStringV2(tcpResponse)) {
            return defaultResponse;
        }
        var temp = this._parseTcpResponse(tcpResponse, defaultResponse);
        var response = defaultResponse;
        if ($S.isArray(temp)) {
            temp = temp.join("");
            try {
                response = JSON.parse(temp);
            } catch(e) {
                console.log("Error in parsing json.");
            }
        }
        return response;
    },
    ParseCSVData: function(dataStr) {
        return this.ParseTextData(dataStr, ",", false, true, null);
    },
    ParseTextData: function(dataStr, wordBreak, skipEmpty, trimEntry, request) {
        if (!$S.isString(wordBreak)) {
            wordBreak = ",";
        }
        if (!$S.isBooleanTrue(skipEmpty)) {
            skipEmpty = false;
        }
        if (!$S.isBooleanTrue(trimEntry)) {
            trimEntry = true;
        }
        var finalArr = [], temp, i, j;
        if (!$S.isString(dataStr) || $S.isJsonString(dataStr)) {
            return finalArr;
        }
        var arr = $S.readTextData(dataStr);
        if ($S.isObject(request)) {
            if ($S.isStringV2(request.singleLineComment)) {
                arr = $S.removeSingleLineComment(arr, request.singleLineComment);
            }
        }
        for (i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split(wordBreak);
        }
        for (i = 0; i < arr.length; i++) {
            if (arr[i].length === 1 && arr[i][0].trim() === "") {
                continue;
            }
            if (trimEntry) {
                for (j = 0; j < arr[i].length; j++) {
                    arr[i][j] = arr[i][j].trim();
                }
            }
            temp = [];
            if (skipEmpty) {
                for (j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] === "") {
                        continue;
                    }
                    temp.push(arr[i][j]);
                }
            } else {
                temp = arr[i];
            }
            if (temp.length > 0) {
                finalArr.push(temp);
            }
        }
        return finalArr;
    },
    ParseTextDataOnEqualWidth: function(dataStr, wordSplitingChar) {
        if (!$S.isString(dataStr)) {
            dataStr = "";
        }
        if (!$S.isArray(wordSplitingChar)) {
            wordSplitingChar = [];
        }
        if (wordSplitingChar.length === 0) {
            wordSplitingChar.push(" ");
        }
        var temp, i, j, maxLength = 0, arr = [], finalArr = [], startIndex = 0, lastIndex = 0;
        var wordBreakChar, isFound;
        var tempArr = dataStr.split("\n");
        for (i = 0; i < tempArr.length; i++) {
            if (tempArr[i].trim().length !== 0) {
                arr.push(tempArr[i]);
                if (tempArr[i].length > maxLength) {
                    maxLength = tempArr[i].length;
                }
            }
        }
        for(i=0; i<arr.length; i++) {
            for(j=arr[i].length; j<maxLength; j++) {
                arr[i] += " ";
            }
        }
        while(startIndex < maxLength && lastIndex < maxLength) {
            for(i=startIndex; i<maxLength; i++) {
                isFound = true;
                lastIndex = i;
                if (arr[0].length <= lastIndex) {
                    isFound = false;
                    lastIndex = maxLength;
                    break;
                }
                wordBreakChar = arr[0][lastIndex];
                if (wordSplitingChar.indexOf(wordBreakChar) < 0) {
                    continue;
                }
                for(j=1; j<arr.length; j++) {
                    if (wordBreakChar !== arr[j][lastIndex]) {
                        isFound = false;
                    }
                }
                if (isFound) {
                    break;
                }
            }
            for(i=0; i<arr.length; i++) {
                temp = arr[i].substring(startIndex, lastIndex);
                if (!$S.isArray(finalArr[i])) {
                    finalArr[i] = [];
                }
                finalArr[i].push(temp);
            }
            startIndex = lastIndex + 1;
        }
        var finalResult = [];
        var validDataIndex = [];
        if (finalArr.length > 0) {
            for(i=0; i<finalArr[0].length; i++) {
                isFound = false;
                for(j=0; j<finalArr.length; j++) {
                    if (finalArr[j][i].trim().length > 0) {
                        isFound = true;
                    }
                }
                if (isFound) {
                    validDataIndex.push(i);
                }
            }
        }
        for(i=0; i<finalArr.length; i++) {
            temp = [];
            for(j=0; j<validDataIndex.length; j++) {
                temp.push(finalArr[i][validDataIndex[j]].trim());
            }
            finalResult.push(temp);
        }
        return finalResult;
    }
});
AppHandler.extend({
    CombineTableData: function(dbViewData, combineTableData) {
        if (!$S.isObject(dbViewData)) {
            return false;
        }
        if (!$S.isArray(combineTableData)) {
            combineTableData = [];
        }
        var tableName, sourceTableName, destinationTableName;
        for (var i=0; i<combineTableData.length; i++) {
            if ($S.isObjectV2(combineTableData[i]) && $S.isStringV2(combineTableData[i]["destinationTableName"]) && $S.isArray(combineTableData[i]["sourceTableName"])) {
                if (combineTableData[i]["sourceTableName"].length > 0) {
                    sourceTableName = combineTableData[i]["sourceTableName"];
                    destinationTableName = combineTableData[i]["destinationTableName"];
                    if (!$S.isObject(dbViewData[destinationTableName])) {
                        dbViewData[destinationTableName] = {"tableData": []};
                    }
                    for (tableName in dbViewData) {
                        if (tableName !== destinationTableName && sourceTableName.indexOf(tableName) >= 0) {
                            if ($S.isObject(dbViewData[tableName]) && $S.isArray(dbViewData[tableName]["tableData"])) {
                                dbViewData[destinationTableName]["tableData"] = dbViewData[destinationTableName]["tableData"].concat(dbViewData[tableName]["tableData"]);
                            }
                        }
                    }
                }
            }
        }
        return true;
    },
    CombineTableDataV2: function(dbViewData, otherData, combineTableData) {
        if (!$S.isObject(dbViewData)) {
            return false;
        }
        if (!$S.isArray(otherData)) {
            return false;
        }
        var i=0;
        if (!$S.isArray(combineTableData)) {
            combineTableData = [];
        }
        if (combineTableData.length < 1) {
            for (i=0; i<otherData.length; i++) {
                if ($S.isObject(otherData[i])) {
                    combineTableData = combineTableData.concat(Object.keys(otherData[i]));
               }
            }
            combineTableData = $S.removeDuplicate(combineTableData);
            for (i=0; i<combineTableData.length; i++) {
                combineTableData[i] = {"sourceTableName": [combineTableData[i]], "destinationTableName": combineTableData[i]};
            }
        }
        var tableName, sourceTableName, destinationTableName;
        for (i=0; i<combineTableData.length; i++) {
            if ($S.isObjectV2(combineTableData[i]) && $S.isStringV2(combineTableData[i]["destinationTableName"]) && $S.isArray(combineTableData[i]["sourceTableName"])) {
                if (combineTableData[i]["sourceTableName"].length > 0) {
                    sourceTableName = combineTableData[i]["sourceTableName"];
                    destinationTableName = combineTableData[i]["destinationTableName"];
                    if (!$S.isObject(dbViewData[destinationTableName])) {
                        dbViewData[destinationTableName] = {"tableData": []};
                    }
                    for (var j=0; j<otherData.length; j++) {
                        for (tableName in otherData[j]) {
                            if (sourceTableName.indexOf(tableName) >= 0) {
                                if ($S.isArray(otherData[j][tableName]["tableData"])) {
                                    // for (var k=0; k<otherData[j][tableName]["tableData"].length; k++) {
                                    //     if ($S.isObject(otherData[j][tableName]["tableData"][k]) && $S.isStringV2(otherData[j][tableName]["tableData"][k]["tableName"])) {
                                    //         otherData[j][tableName]["tableData"][k]["tableName"] = destinationTableName;
                                    //     }
                                    // }
                                    dbViewData[destinationTableName]["tableData"] = dbViewData[destinationTableName]["tableData"].concat(otherData[j][tableName]["tableData"]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    },
    GenerateDatabaseV3: function(request) {
        // Response is json data
        var tableData = {}, i, j, temp;
        if ($S.isArray(request)) {
            for(i=0; i<request.length; i++) {
                temp = [];
                if (!$S.isObject(request[i])) {
                    continue;
                }
                if (!$S.isString(request[i].apiName) || request[i].apiName.length < 1) {
                    continue;
                }
                if ($S.isUndefined(tableData[request[i].apiName])) {
                    tableData[request[i].apiName] = {};
                }
                tableData[request[i].apiName]["request"] = request[i];
                tableData[request[i].apiName]["tableName"] = request[i].apiName;
                tableData[request[i].apiName]["apis"] = request[i].apis;
                if ($S.isArray(request[i].response)) {
                    for (j=0; j<request[i].response.length; j++) {
                        temp = temp.concat(request[i].response[j]);
                    }
                }
                tableData[request[i].apiName]["tableData"] = temp;
            }
        }
        return tableData;
    },
    GenerateDatabaseV2: function(request) {
        var tableData = {}, i, temp;
        var wordBreak;
        if ($S.isArray(request)) {
            for(i=0; i<request.length; i++) {
                if (!$S.isObject(request[i])) {
                    continue;
                }
                if (!$S.isString(request[i].apiName) || request[i].apiName.length < 1) {
                    continue;
                }
                if ($S.isUndefined(tableData[request[i].apiName])) {
                    tableData[request[i].apiName] = {};
                }
                tableData[request[i].apiName]["request"] = request[i];
                tableData[request[i].apiName]["tableName"] = request[i].apiName;
                tableData[request[i].apiName]["dataIndex"] = request[i].dataIndex;
                tableData[request[i].apiName]["apis"] = request[i].apis;
                tableData[request[i].apiName]["wordBreak"] = request[i].wordBreak;
                tableData[request[i].apiName]["skipEmpty"] = request[i].skipEmpty;
                tableData[request[i].apiName]["response"] = request[i].response;
            }
        }
        for(var key in tableData) {
            tableData[key]["responseJson"] = [];
            wordBreak = tableData[key].wordBreak;
            if ($S.isArray(tableData[key]["response"])) {
                for(i=0; i<tableData[key]["response"].length; i++) {
                    temp = this.ParseTextData(tableData[key]["response"][i], wordBreak, tableData[key].skipEmpty, true, tableData[key]["request"]);
                    tableData[key]["responseJson"] = tableData[key]["responseJson"].concat(temp);
                }
            }
            tableData[key]["tableData"] = this.ConvertJsonToTable(tableData[key]["responseJson"], tableData[key]["dataIndex"]);
        }
        return tableData;
    },
    GenerateDatabase: function(request, dbTableDataIndex) {
        var i, tableName, apiName;
        var wordBreak, jsonData;
        var tableData = {};
        var dataTable = [], finalDB = {};
        if (!$S.isObject(dbTableDataIndex)) {
            dbTableDataIndex = {};
        }
        if ($S.isArray(request)) {
            for(i=0; i<request.length; i++) {
                if (!$S.isObject(request[i])) {
                    continue;
                }
                if (!$S.isString(request[i].apiName) || request[i].apiName.length < 1) {
                    continue;
                }
                if ($S.isUndefined(tableData[request[i].apiName])) {
                    tableData[request[i].apiName] = {};
                }
                tableData[request[i].apiName]["request"] = request[i];
                tableData[request[i].apiName]["apiName"] = request[i].apiName;
                tableData[request[i].apiName]["apis"] = request[i].apis;
                tableData[request[i].apiName]["wordBreak"] = request[i].wordBreak;
                tableData[request[i].apiName]["response"] = request[i].response;
            }
        }
        for(apiName in tableData) {
            tableData[apiName]["responseJson"] = [];
            wordBreak = tableData[apiName].wordBreak;
            if ($S.isArray(tableData[apiName]["response"])) {
                for(i=0; i<tableData[apiName]["response"].length; i++) {
                    jsonData = this.ParseTextData(tableData[apiName]["response"][i], wordBreak, false, true, tableData[apiName]["request"]);
                    tableData[apiName]["responseJson"] = tableData[apiName]["responseJson"].concat(jsonData);
                }
            }
            dataTable = dataTable.concat(this.ConvertJsonToTable(tableData[apiName]["responseJson"], dbTableDataIndex[apiName]));
        }
        for (i=0; i<dataTable.length; i++) {
            if ($S.isObject(dataTable[i]) && $S.isStringV2(dataTable[i]["tableName"])) {
                tableName = dataTable[i]["tableName"];
                if (!$S.isObject(finalDB[tableName]) || !$S.isArray(finalDB[tableName]["tableData"])) {
                    finalDB[tableName] = {"tableData": []};
                }
                finalDB[tableName]["tableData"].push(dataTable[i]);
            }
        }
        return finalDB;
    },
    MergeDatabase: function(dbViewData, database) {
        if ($S.isObject(database)) {
            if (!$S.isObject(dbViewData)) {
                dbViewData = {};
            }
            for (var tableName in database) {
                if (!$S.isObject(database[tableName])) {
                    continue;
                }
                if (!$S.isArray(database[tableName]["tableData"])) {
                    continue;
                }
                if (!$S.isObject(dbViewData[tableName])) {
                    dbViewData[tableName] = {};
                }
                if (!$S.isArray(dbViewData[tableName]["tableData"])) {
                    dbViewData[tableName]["tableData"] = [];
                }
                dbViewData[tableName]["tableData"] = dbViewData[tableName]["tableData"].concat(database[tableName]["tableData"]);
            }
        }
        return dbViewData;
    },
    _isValidTableEntry: function(dbApi) {
        if (!$S.isObject(dbApi)) {
            return false;
        }
        if (!$S.isString(dbApi.tableName) || dbApi.tableName.trim().length < 1) {
            return false;
        }
        if (!$S.isArray(dbApi.apis)) {
            return false;
        }
        return true;
    },
    GenerateApiRequest: function(dbDataApis, ajaxApiCallMethod, baseApi, requestId) {
        var request = [], i, j, el, urls, temp;
        if ($S.isArray(dbDataApis) && dbDataApis.length > 0) {
            for(i=0; i<dbDataApis.length; i++) {
                if (!this._isValidTableEntry(dbDataApis[i])) {
                    continue;
                }
                urls = dbDataApis[i].apis.filter(function(el, j, arr) {
                    if ($S.isString(el) && el.length > 0) {
                        return true;
                    }
                    return false;
                });
                for (j=0; j<urls.length; j++) {
                    el = urls[j];
                    if ($S.isString(el) && el.split("?").length > 1) {
                        urls[j] = baseApi + el + "&requestId=" + requestId;
                    } else {
                        urls[j] = baseApi + el + "?requestId=" + requestId;
                    }
                }
                if (urls.length < 1) {
                    continue;
                }
                temp = {};
                temp.apis = dbDataApis[i].apis;
                temp.dataIndex = dbDataApis[i].dataIndex;
                temp.wordBreak = dbDataApis[i].wordBreak;
                temp.singleLineComment = dbDataApis[i].singleLineComment;
                temp.apiName = dbDataApis[i].tableName.trim();
                temp.requestMethod = ajaxApiCallMethod;
                temp.url = urls;
                request.push(temp);
            }
        }
        return request;
    },
    ConvertJsonToTable: function(jsonData, dataIndex) {
        return $S.convertArrayToTable(jsonData, dataIndex);
    },
    _getProperTableData: function(tableData, dataIndex) {
        var tableRow;
        if ($S.isArray(tableData)) {
            for(var i=0; i<tableData.length; i++) {
                if ($S.isObject(tableData[i])) {
                    tableRow = this.ConvertJsonToTable([tableData[i]["text"]], dataIndex);
                    if ($S.isArray(tableRow) && tableRow.length === 1) {
                        tableData[i] = Object.assign(tableData[i], tableRow[0]);
                    }
                }
            }
        }
    },
    _convertTableDataToDatabase: function(allTableData, allTableDataIndex) {
        var database = {}, tableName;
        if (!$S.isObject(allTableData)) {
            allTableData = {};
        }
        if (!$S.isObject(allTableDataIndex)) {
            allTableDataIndex = {};
        }
        var tableData = [], dataIndex = [];
        for (tableName in allTableData) {
            tableData = allTableData[tableName];
            dataIndex = allTableDataIndex[tableName];
            this._getProperTableData(tableData, dataIndex);
            database[tableName] = {"tableData": tableData};
        }
        return database;
    }
});
AppHandler.extend({
    getPathParamsData: function(pathParams, key, defaultValue) {
        if ($S.isString(key) && key.length > 0) {
            if ($S.isObject(pathParams)) {
                if ($S.isUndefined(pathParams[key])) {
                    return defaultValue;
                } else {
                    return pathParams[key];
                }
            }
        }
        return defaultValue;
    },
    GenerateDateBetween2Date: function(startDateStr, endDateStr, startLimit, endLimit) {
        if (!this.isValidDateStr(startDateStr) || !this.isValidDateStr(endDateStr)) {
            return [];
        }
        if (!this.isValidDateStr(startLimit)) {
            startLimit = startDateStr;
        }
        if (!this.isValidDateStr(endLimit)) {
            endLimit = endDateStr;
        }
        if ($S.isString(startLimit) && startLimit.length === 10) {
            startLimit += " 00:00";
        }
        if ($S.isString(endLimit) && endLimit.length === 10) {
            endLimit += " 23:59";
        }
        var dateArr = [];
        var startDateObj = DT.getDateObj(startDateStr);
        var endDateObj = DT.getDateObj(endDateStr);
        var startLimitDateObj = DT.getDateObj(startLimit);
        var endLimitDateObj = DT.getDateObj(endLimit);
        endLimitDateObj.setHours(23);
        endLimitDateObj.setMinutes(59);
        endDateObj.setHours(23);
        endDateObj.setMinutes(59);
        if (startDateObj > endDateObj) {
            startDateObj = endDateObj;
            endDateObj = DT.getDateObj(startDateStr);
        }
        do {
            if (startLimitDateObj <= startDateObj && startDateObj <= endLimitDateObj) {
                dateArr.push({"dateStr": DT.formateDateTime("YYYY/-/MM/-/DD", "/", startDateObj),
                    "date": DT.formateDateTime("DD", "/", startDateObj)*1, "day": DT.formateDateTime("DDD", "/", startDateObj)});
            }
            startDateObj = DT.addDate(startDateObj, 1);
        } while(startDateObj <= endDateObj);
        return dateArr;
    }
});

var userDetails = {"username": "", "displayName": "", "orgUsername": "", "login": false, "roles": {}};

AppHandler.extend({
    GetUserDetails: function() {
        return $S.clone(userDetails);
    },
    SetUserDetails: function(tempUserDetails) {
        if (!$S.isObject(tempUserDetails)) {
            return false;
        }
        userDetails = $S.clone(tempUserDetails);
        return true;
    },
    GetUserData: function(key, defaultValue) {
        if (!$S.isStringV2(key) || !$S.isObject(userDetails)) {
            return defaultValue;
        }
        if ($S.isString(userDetails[key]) || key === "login") {
            return userDetails[key];
        }
        // valid roles key: isAdminUser, isAddTextEnable, isUploadFileEnable
        if ($S.isObject(userDetails["roles"]) && $S.isBooleanTrue(userDetails["roles"][key])) {
            return userDetails["roles"][key];
        }
        return defaultValue;
    },
    GetUserActiveRoles: function() {
        if (!$S.isObject(userDetails)) {
            return [];
        }
        if ($S.isObject(userDetails["roles"])) {
            return Object.keys(userDetails["roles"]);
        }
        return [];
    },
    GetTrackUsername: function() {
        var username = this.GetUserData("username", "");
        if (!$S.isString(username) || username.length < 1) {
            username = "empty-username";
        }
        return username;
    },
    LoadLoginUserDetails: function(url, callback) {
        if (!$S.isString(url)) {
            $S.callMethod(callback);
        }
        $S.loadJsonData(null, [url], function(response, apiName, ajax){
            if ($S.isObject(response) && response["status"] === "SUCCESS" && $S.isObject(response["data"])) {
                userDetails = response["data"];
            }
        }, function() {
            $S.log("Load loginUserDetails complete.");
            $S.callMethod(callback);
        }, null, Api.getAjaxApiCallMethod());
    }
});

var staticData = {"page": "", "appVersion": "", "uploadFileApiVersion": "",
                "headingJson": "", "afterLoginLinkJson": "",
                "footerLinkJson": "", "footerLinkJsonAfterLogin": "",
                "jsonFileData": {}};

AppHandler.extend({
    GetAllStaticDetails: function() {
        return $S.clone(staticData);
    },
    SetStaticData: function(tempStaticData) {
        if (!$S.isObject(tempStaticData)) {
            return false;
        }
        staticData = $S.clone(tempStaticData);
        return true;
    },
    SetStaticDataAttr: function(key, value) {
        if (!$S.isStringV2(key)) {
            return false;
        }
        var keys = Object.keys(staticData);
        if (keys.indexOf(key) < 0) {
            return false
        }
        staticData[key] = $S.clone(value);
        return true;
    },
    GetStaticData: function(key, defaultValue, type) {
        var result = defaultValue;
        if ($S.isString(staticData[key])) {
            result = $S.clone(staticData[key]);
        } else if ($S.isObject(staticData[key])) {
            result = $S.clone(staticData[key]);
        } else if ($S.isArray(staticData[key])) {
            result = $S.clone(staticData[key]);
        }
        if (type === "json" && $S.isStringV2(result)) {
            try {
                result = JSON.parse(result);
            } catch(e) {
                result = defaultValue;
            }
        }
        return result;
    },
    GetStaticDataJsonFile: function(key, defaultValue) {
        var jsonFileData = staticData["jsonFileData"];
        if (!$S.isObject(jsonFileData)) {
            return defaultValue;
        }
        if ($S.isString(jsonFileData[key])) {
            return $S.clone(jsonFileData[key]);
        } else if ($S.isObject(jsonFileData[key])) {
            return $S.clone(jsonFileData[key]);
        } else if ($S.isArray(jsonFileData[key])) {
            return $S.clone(jsonFileData[key]);
        }
        return defaultValue;
    },
    LoadStaticData: function(url, callback) {
        if (!$S.isString(url)) {
            $S.callMethod(callback);
        }
        $S.loadJsonData(null, [url], function(response, apiName, ajax){
            if ($S.isObject(response) && response["status"] === "SUCCESS" && $S.isObject(response["data"])) {
                staticData = response["data"];
            }
        }, function() {
            $S.log("Load staticData complete.");
            $S.callMethod(callback);
        }, null, Api.getAjaxApiCallMethod());
    },
    _getTimeDependentFilenamePattern: function(dynamicFilenamesFilterParam) {
        if (!$S.isObject(dynamicFilenamesFilterParam)) {
            return "";
        }
        var dateRange;
        var temp = [], temp2 = [], temp3, dateObj;
        if ($S.isStringV2(dynamicFilenamesFilterParam["patternSeprator"])) {
            if ($S.isStringV2(dynamicFilenamesFilterParam["pattern"])) {
                if ($S.isStringV2(dynamicFilenamesFilterParam["dateRange"])) {
                    dateRange = DT.getDateRange(dynamicFilenamesFilterParam["dateRange"]);
                    if ($S.isArray(dateRange) && dateRange.length === 2) {
                        dateRange = this.GetDataParameterFromDate(dateRange);
                        if ($S.isObject(dateRange) && $S.isArray(dateRange["all"]) && dateRange["all"].length === 1) {
                            if ($S.isObject(dateRange["all"][0]) && $S.isArray(dateRange["all"][0]["allDate"])) {
                                temp = dateRange["all"][0]["allDate"].map(function(el, arr, i) {
                                    if ($S.isObject(el) && $S.isStringV2(el["dateStr"])) {
                                        return el["dateStr"];
                                    }
                                    return "";
                                });
                            }
                        }
                    }
                }
            }
        }
        for(var i=0; i<temp.length; i++) {
            if ($S.isStringV2(temp[i])) {
                dateObj = DT.getDateObj(temp[i]);
                if (dateObj !== null) {
                    temp3 = DT.formateDateTime(dynamicFilenamesFilterParam["pattern"], dynamicFilenamesFilterParam["patternSeprator"], dateObj);
                    if (temp2.indexOf(temp3) < 0) {
                        temp2.push(temp3);
                    }
                }
            }
        }
        if (temp2.length > 0) {
            return "(" + temp2.join("|") + ")";
        }
        return "";
    },
    LoadTableData: function(url, tableFilterParam, dynamicFilenamesFilterParam, dbTableDataIndex, callback) {
        if (!$S.isStringV2(url)) {
            return $S.callMethod(callback);
        }
        if (!$S.isObject(tableFilterParam)) {
            tableFilterParam = {};
        }
        var queryParam = "";
        var filenames = "";
        var filenamePattern = "";
        if ($S.isObject(dynamicFilenamesFilterParam)) {
            filenamePattern = this._getTimeDependentFilenamePattern(dynamicFilenamesFilterParam);
            if ($S.isStringV2(filenamePattern)) {
                if ($S.isStringV2(dynamicFilenamesFilterParam["preFileName"])) {
                    filenames += dynamicFilenamesFilterParam["preFileName"];
                }
                filenames += filenamePattern;
                if ($S.isStringV2(dynamicFilenamesFilterParam["postFileName"])) {
                    filenames += dynamicFilenamesFilterParam["postFileName"];
                }
                tableFilterParam["filenames"] = filenames;
            }
        }
        for(var key in tableFilterParam) {
            if ($S.isStringV2(queryParam)) {
                queryParam += "&";
            }
            queryParam += key + "=" + tableFilterParam[key];
        }
        if ($S.isStringV2(queryParam)) {
            url += "?" + queryParam;
        }
        var request = [], database = null;
        var requestApi = {
            "url": [url],
            "apiName": "tableData",
            "requestMethod": Api.getAjaxApiCallMethod()
        };
        request.push(requestApi);
        this.LoadDataFromRequestApi(request, function() {
            if ($S.isArray(request[0].response) && request[0].response.length > 0) {
                if ($S.isObject(request[0].response[0]) && request[0].response[0].status === "SUCCESS") {
                    database = AppHandler._convertTableDataToDatabase(request[0].response[0].data, dbTableDataIndex);
                }
            }
            $S.callMethodV1(callback, database);
        });
    }
});

AppHandler.extend({
    LoadDataFromRequestApi: function(request, callback) {
        if (!$S.isArray(request) || request.length < 1) {
            return $S.callMethod(callback);
        }
        var temp;
        var tempRequestMapping = {};
        function isValidRequest(el) {
            if (!$S.isObject(el)) {
                return false;
            }
            if (!$S.isArray(el.url)) {
                return false;
            }
            if (!$S.isString(el.apiName)) {
                return false;
            }
            if (!$S.isFunction(el.requestMethod)) {
                return false;
            }
            for (var i=0; i<el.url.length; i++) {
                if (!$S.isString(el.url[i])) {
                    return false;
                }
            }
            return true;
        }
        function fireCallback() {
            temp = true;
            for (var k=0; k<request.length; k++) {
                if (!isValidRequest(request[k])) {
                    continue;
                }
                if ($S.isNumber(tempRequestMapping[request[k].apiName].requestCount)) {
                    if (tempRequestMapping[request[k].apiName].requestCount !== tempRequestMapping[request[k].apiName].responseCount) {
                        temp = false;
                        break;
                    }
                }
            }
            if (temp) {
                $S.callMethod(callback);
            }
        }
        for (var i=0; i<request.length; i++) {
            if (!isValidRequest(request[i])) {
                continue;
            }
            tempRequestMapping[request[i].apiName] = {};
            tempRequestMapping[request[i].apiName].requestCount = request[i].url.length;
            tempRequestMapping[request[i].apiName].responseCount = 0;
            if (request[i].url.length < 1) {
                continue;
            }
            $S.loadJsonData(request[i].JQ, request[i].url, function(response, apiName, ajax){
                for (var j=0; j<request.length; j++) {
                    if (!isValidRequest(request[j])) {
                        continue;
                    }
                    if ($S.isString(request[j].apiName) && request[j].apiName === apiName) {
                        if (!$S.isNumber(tempRequestMapping[apiName].responseCount)) {
                            tempRequestMapping[apiName].responseCount = 0;
                        }
                        tempRequestMapping[apiName].responseCount++;
                        if (!$S.isArray(request[j].response)) {
                            request[j].response = [];
                        }
                        request[j].response.push(response);
                    }
                }
                // fireCallback();
            }, function() {
                fireCallback();
            }, request[i].apiName, request[i].requestMethod);
        }
        fireCallback();
    }
});
AppHandler.extend({
    getHeadingText: function(currentAppData, defaultValue) {
        var headingText = defaultValue;
        if (!$S.isObject(currentAppData)) {
            return headingText;
        }
        var heading = currentAppData.heading;
        var name = currentAppData.name;
        if ($S.isString(heading) && heading.length > 0) {
            headingText = heading;
        } else if ($S.isString(name) && name.length > 0) {
            headingText = name;
        }
        return headingText;
    },
    _addAppId: function(response) {
        var metaData = {};
        var appControlData = [];
        if ($S.isObject(response)) {
            if ($S.isArray(response.list1Data)) {
                appControlData = response.list1Data;
            }
            if ($S.isObject(response.metaData)) {
                metaData = response.metaData;
            }
        } else if ($S.isArray(response)) {
            appControlData = response;
        }
        appControlData.map(function(el, i, arr) {
            if ($S.isObject(el)) {
                el.id = i.toString();
            }
            return el;
        });
        return {"appControlData": appControlData, "metaData": metaData};
    },
    loadAppControlData: function(appControlApi, baseApi, appControlDataPath, validAppControl, callback) {
        if ($S.isString(baseApi) && $S.isString(appControlDataPath) && $S.isArray(validAppControl)) {
            for(var i=0; i<validAppControl.length; i++) {
                if (this.GetUserData(validAppControl[i])) {
                    appControlApi = baseApi + appControlDataPath + validAppControl[i] + ".json?v=" + requestId;
                    break;
                }
            }
        }
        if (!$S.isString(appControlApi) || appControlApi.length < 1) {
            return callback();
        }
        var request = [];
        var appControlRequest = {
                            "url": [appControlApi],
                            "apiName": "appControlData",
                            "requestMethod": Api.getAjaxApiCallMethod()};
        request.push(appControlRequest);
        var result, fileResponse;
        AppHandler.LoadDataFromRequestApi(request, function() {
            if ($S.isArray(request[0].response) && request[0].response.length > 0) {
                fileResponse = request[0].response[0];
            }
            if ($S.isFunction(callback)) {
                result = AppHandler._addAppId(fileResponse);
                callback(result.appControlData, result.metaData);
            }
        });
    }
});
AppHandler.extend({
    getSearchByPattern: function(filterOption, selectedValue, isRevert) {
        if (!$S.isString(selectedValue) || selectedValue.length === 0) {
            return false;
        }
        if ($S.isBooleanTrue(isRevert)) {
            isRevert = true;
        } else {
            isRevert = false;
        }
        if ($S.isArray(filterOption)) {
            for(var i=0; i<filterOption.length; i++) {
                if (!$S.isObject(filterOption[i])) {
                    continue;
                }
                if (isRevert) {
                    if (filterOption[i].value === "~" + selectedValue) {
                        return $S.isBooleanTrue(filterOption[i].searchByPattern);
                    }
                } else if (filterOption[i].value === selectedValue) {
                    return $S.isBooleanTrue(filterOption[i].searchByPattern);
                }
            }
        }
        return false;
    },
    _applyKeyMapping: function(keyMapping, currentAppData, metaData) {
        /**
         * keyMapping = {"x.filterKeys": "filterKeys"}
         * currentAppData = {}
         * metaData = {"x.filterKeys": [status, device]}
         * then it will generate as
         * currentAppData["filterKeys"] = undefined
         * metaData["filterKeys"] = [status, device]
         * */
        if (!$S.isObject(keyMapping)) {
            keyMapping = {};
        }
        if (!$S.isObject(currentAppData)) {
            currentAppData = {};
        }
        if (!$S.isObject(metaData)) {
            metaData = {};
        }
        var value;
        for(var key in keyMapping) {
            value = keyMapping[key];
            currentAppData[value] = currentAppData[key];
            metaData[value] = metaData[key];
        }
    },
    _getRequiredMetaData: function(currentAppData, metaData) {
        var preFilter = $S.findParam([currentAppData, metaData], "preFilter", {});
        var filterKeys = $S.findParam([currentAppData, metaData], "filterKeys", []);
        var onlyPreFilterKeys = $S.findParam([currentAppData, metaData], "onlyPreFilterKeys", []);
        if (!$S.isObject(preFilter)) {
            preFilter = {};
        }
        if (!$S.isArray(filterKeys)) {
            filterKeys = [];
        }
        if (!$S.isArray(onlyPreFilterKeys)) {
            onlyPreFilterKeys = [];
        }
        var finalKeys = [], temp, temp2;
        for(var i=0; i<filterKeys.length; i++) {
            if (!$S.isString(filterKeys[i]) || filterKeys[i].length < 1) {
                continue;
            }
            temp = filterKeys[i];
            finalKeys.push(temp);
            temp2 = $S.findParam([currentAppData, metaData], temp + "Prefilter", []);
            if ($S.isArray(temp2) && temp2.length > 0) {
                preFilter[temp] = temp2;
            }
        }
        return {"preFilter": preFilter, "filterKeys": finalKeys, "onlyPreFilterKeys": onlyPreFilterKeys};
    },
    generateFilterData: function(currentAppData, metaData, csvData, filterSelectedValues, searchParam) {
        if (!$S.isArray(csvData)) {
            return [];
        }
        if (!$S.isObject(filterSelectedValues)) {
            filterSelectedValues = {};
        }
        var metaDataTemp = this._getRequiredMetaData(currentAppData, metaData);
        var filterKeys = metaDataTemp["filterKeys"];
        var preFilter = metaDataTemp["preFilter"];
        var onlyPreFilterKeys = metaDataTemp["onlyPreFilterKeys"];
        var i, j, temp, temp2;

        var tempFilterOptions = {};
        for(i=0; i<filterKeys.length; i++) {
            tempFilterOptions[filterKeys[i]] = {
                "selectName": filterKeys[i]+"Selected",
                "dataKey": filterKeys[i],
                "dataDisplay": filterKeys[i]+"Display",
                "possibleIds": [],
                "filterOption": [],
                "preFilter": preFilter[filterKeys[i]]
            };
        }
        var resetButton = [{"name": "reset-filter", "value": "reset-filter", "display": "Reset"}];
        function getFilterText(data, key) {
            if ($S.isObject(data)) {
                return data[key];
            }
            if ($S.isArray(data)) {
                for(var i=0; i<data.length; i++) {
                    if ($S.isObject(data[i]) && $S.isString(data[i][searchParam])) {
                        if (key === data[i][searchParam]) {
                            return data[i].value;
                        }
                    }
                }
            }
            return null;
        }
        for(i=0; i<csvData.length; i++) {
            for(j=0; j<filterKeys.length; j++) {
                if (onlyPreFilterKeys.indexOf(filterKeys[j]) >= 0) {
                    continue;
                }
                temp = getFilterText(csvData[i], tempFilterOptions[filterKeys[j]].dataKey);//csvData[i][tempFilterOptions[filterKeys[j]].dataKey];
                if (!$S.isString(temp) || temp.trim().length < 1) {
                    continue;
                }
                temp = temp.trim();
                temp2 = getFilterText(csvData[i], tempFilterOptions[filterKeys[j]].dataDisplay);
                if (!$S.isString(temp2)) {
                    temp2 = $S.capitalize(temp);
                }
                if (tempFilterOptions[filterKeys[j]].possibleIds.indexOf(temp) < 0) {
                    tempFilterOptions[filterKeys[j]].possibleIds.push(temp);
                    tempFilterOptions[filterKeys[j]].filterOption.push({"value": temp, "option": temp2});//csvData[i][tempFilterOptions[filterKeys[j]].dataDisplay]});
                }
            }
        }
        for(temp in tempFilterOptions) {
            tempFilterOptions[temp].filterOption.sort(function(a, b) {
                return a.option > b.option ? 1 : -1;
            });
            if ($S.isArray(tempFilterOptions[temp].preFilter)) {
                for (i=tempFilterOptions[temp].preFilter.length-1; i>=0; i--) {
                    if ($S.isObject(tempFilterOptions[temp].preFilter[i]) && $S.isString(tempFilterOptions[temp].preFilter[i].value)) {
                        if (tempFilterOptions[temp].possibleIds.indexOf(tempFilterOptions[temp].preFilter[i].value) < 0) {
                            tempFilterOptions[temp].possibleIds.push(tempFilterOptions[temp].preFilter[i].value);
                        }
                        $S.addElAt(tempFilterOptions[temp].filterOption, 0, tempFilterOptions[temp].preFilter[i]);
                    }
                }
            } else if (tempFilterOptions[temp].filterOption.length > 0) {
                $S.addElAt(tempFilterOptions[temp].filterOption, 0, {"value": "", "option": "All"});
            }
        }
        var selectionOptions = [];
        var selectedValue;
        var isResetBtn = false;
        for(i=0; i<filterKeys.length; i++) {
            if (filterKeys[i] === "reset") {
                isResetBtn = true;
                selectionOptions.push({"type": "buttons", "buttons": resetButton, "selectedValue": ""});
                continue;
            }
            selectedValue = filterSelectedValues[tempFilterOptions[filterKeys[i]].selectName];
            if (!$S.isString(selectedValue)) {
                selectedValue = "";
            }
            if (tempFilterOptions[filterKeys[i]].possibleIds.indexOf(selectedValue) < 0) {
                selectedValue = "";
            }
            filterSelectedValues[filterKeys[i] + "Selected"] = selectedValue;
            if (tempFilterOptions[filterKeys[i]].filterOption.length > 0) {
                selectionOptions.push({"type": "dropdown",
                    "text": tempFilterOptions[filterKeys[i]].filterOption,
                    "selectName": tempFilterOptions[filterKeys[i]].selectName,
                    "dataKey": tempFilterOptions[filterKeys[i]].dataKey,
                    "possibleIds": tempFilterOptions[filterKeys[i]].possibleIds,
                    "selectedValue": selectedValue
                });
            }
        }
        if (isResetBtn && selectionOptions.length === 1) {
            selectionOptions = [];
        }
        return selectionOptions;
    },
    generateFilterDataV2: function(keyMapping, currentAppData, metaData, csvData, filterSelectedValues, searchParam) {
        this._applyKeyMapping(keyMapping, currentAppData, metaData);
        return this.generateFilterData(currentAppData, metaData, csvData, filterSelectedValues, searchParam);
    },
    getFilteredData: function(currentAppData, metaData, csvData, filterOptions, searchParam) {
        var reportData = csvData;
        var metaDataTemp = this._getRequiredMetaData(currentAppData, metaData);
        var preFilter = metaDataTemp["preFilter"];
        var temp, temp2, temp3, i, j, k, l, filterIndex, filterValue, searchByPattern;
        var isRevert;
        function _isResultRevert(filterIndex, filterValue) {
            if ($S.isUndefined(filterIndex) || !$S.isString(filterValue)) {
                return false;
            }
            if ($S.isObject(preFilter) && $S.isArray(preFilter[filterIndex])) {
                for (l=0; l<preFilter[filterIndex].length; l++) {
                    if ($S.isObject(preFilter[filterIndex][l]) && preFilter[filterIndex][l].value === filterValue) {
                        if ($S.isBooleanTrue(preFilter[filterIndex][l].exceptValue)) {
                            return true;
                        }
                        break;
                    }
                }
            }
            return false;
        }
        if (!$S.isArray(reportData)) {
            reportData = [];
        }
        if (!$S.isArray(filterOptions)) {
            filterOptions = [];
        }
        for(k=0; k<filterOptions.length; k++) {
            filterIndex = filterOptions[k].dataKey;
            filterValue = filterOptions[k].selectedValue;
            isRevert = _isResultRevert(filterIndex, filterValue);
            if (isRevert && $S.isString(filterValue)) {
                temp = filterValue.split("~");
                if (temp.length > 1) {
                    if (temp[0] === "") {
                        filterValue = temp.splice(1).join("~");
                   }
                }
            }
            if (!$S.isString(filterIndex) || filterIndex === "") {
                continue;
            }
            if (!$S.isString(filterValue) || filterValue === "") {
                continue;
            }
            temp3 = [];
            for (i = 0; i < reportData.length; i++) {
                temp = reportData[i];
                if ($S.isObject(temp) && $S.isString(temp[filterIndex])) {
                    searchByPattern = this.getSearchByPattern(filterOptions[k].text, filterValue, isRevert);
                    temp2 = $S.searchItems([filterValue], [temp[filterIndex]], searchByPattern, isRevert);
                    if (temp2.length > 0) {
                        temp3.push(temp);
                    }
                } else if ($S.isArray(temp)) {
                    for (j=0; j<temp.length; j++) {
                        if (!$S.isObject(temp[j])) {
                            continue;
                        }
                        if (temp[j][searchParam] === filterIndex) {
                            searchByPattern = this.getSearchByPattern(filterOptions[k].text, filterValue, isRevert);
                            temp2 = $S.searchItems([filterValue], [temp[j]["value"]], searchByPattern, isRevert);
                            if (temp2.length > 0) {
                                temp3.push(temp);
                                break;
                            }
                        }
                    }
                }
            }
            reportData = temp3;
        }
        return reportData;
    },
    getFilteredDataV2: function(keyMapping, currentAppData, metaData, csvData, filterOptions, searchParam) {
        this._applyKeyMapping(keyMapping, currentAppData, metaData);
        return this.getFilteredData(currentAppData, metaData, csvData, filterOptions, searchParam);
    }
});
AppHandler.extend({
    GetFooterData: function(metaData) {
        if (!$S.isObject(metaData)) {
            metaData = {};
        }
        var staticFooterData = metaData.footerData;
        var footerData = [];
        if ($S.isArray(staticFooterData)) {
            for (var i = 0; i < staticFooterData.length; i++) {
                if (!$S.isArray(staticFooterData[i].entry)) {
                    $S.log("Invalid footer entry: " + staticFooterData[i]);
                    continue;
                }
                if (staticFooterData[i].type === "table-rows") {
                    footerData.push({"type": "table", "entry": staticFooterData[i].entry});
                } else if (staticFooterData[i].type === "table-cols") {
                    footerData.push({"type": "table", "entry": this.ConvertRowToCol(staticFooterData[i].entry)});
                } else {
                    footerData.push({"type": "div", "entry": staticFooterData[i].entry});
                }
            }
        }
        return footerData;
    },
    _generateLink: function(metaData, linkType, name) {
        var text = name;
        var href = "";
        if ($S.isObject(metaData) && $S.isArray(metaData.footerLink)) {
            for (var i = 0; i < metaData.footerLink.length; i++) {
                if (metaData.footerLink[i].name === name) {
                    href = metaData.footerLink[i].link;
                    if ($S.isString(metaData.footerLink[i].footerLinkText)) {
                        text = metaData.footerLink[i].footerLinkText;
                    }
                    break;
                }
            }
        }
        return {"tag": "a", "href": href, "text": text};
    },
    GenerateFooterHtml: function(metaData, footerData) {
        var htmlFields = [], i, j, k;
        var divField = [{"tag": "div", "name": "tempDiv", "text": []}];
        var divField2 = [{"tag": "div", "name": "tempDiv2", "text": []}];
        var tableField = [{"tag": "table.tbody", "className": "", "name": "tempTable", "text": []}];
        var trField = [{"tag": "tr", "name": "tempTr", "text": []}];
        var tempDivField, tempDivField2, tempTableField, tempTrField;
        if ($S.isArray(footerData)) {
            for(i=0; i<footerData.length; i++) {
                if (!$S.isArray(footerData[i].entry)) {
                    continue;
                }
                if (footerData[i].type === "div") {
                    tempDivField = $S.clone(divField);
                    for (j=0; j<footerData[i].entry.length; j++) {
                        if ($S.isArray(footerData[i].entry[j])) {
                            tempDivField2 = $S.clone(divField2);
                            for (k = 0; k < footerData[i].entry[j].length-1; k++) {
                                TemplateHelper.addItemInTextArray(tempDivField2, "tempDiv2", this._generateLink(metaData, footerData[i].linkType, footerData[i].entry[j][k]));
                                TemplateHelper.addItemInTextArray(tempDivField2, "tempDiv2", {"tag": "a", "text": {"tag": "span", "text": "|"}});
                            }
                            TemplateHelper.addItemInTextArray(tempDivField2, "tempDiv2", this._generateLink(metaData, footerData[i].linkType, footerData[i].entry[j][k]));
                            TemplateHelper.addItemInTextArray(tempDivField, "tempDiv", tempDivField2);
                        }
                    }
                    htmlFields.push(tempDivField);
                } else if (footerData[i].type === "table") {
                    tempTableField = $S.clone(tableField);
                    for (j=0; j<footerData[i].entry.length; j++) {
                        if ($S.isArray(footerData[i].entry[j])) {
                            tempTrField = $S.clone(trField);
                            for (k = 0; k < footerData[i].entry[j].length-1; k++) {
                                TemplateHelper.addItemInTextArray(tempTrField, "tempTr", {"tag": "td", "text": this._generateLink(metaData, footerData[i].linkType, footerData[i].entry[j][k])});
                                TemplateHelper.addItemInTextArray(tempTrField, "tempTr", {"tag": "td", "text": {"tag": "span", "text": "|"}});
                            }
                            TemplateHelper.addItemInTextArray(tempTrField, "tempTr", {"tag": "td", "text": this._generateLink(metaData, footerData[i].linkType, footerData[i].entry[j][k])});
                            TemplateHelper.addItemInTextArray(tempTableField, "tempTable", tempTrField);
                        }
                    }
                    htmlFields.push(tempTableField);
                }
            }
        }
        return htmlFields;
    }
});
AppHandler.extend({
    getTemplate: function(allTemplate, pageName, defaultTemplate) {
        if ($S.isObject(allTemplate) && allTemplate[pageName]) {
            return $S.clone(allTemplate[pageName]);
        }
        return defaultTemplate;
    },
});

AppHandler.extend({
    Track: function(trackingAction, eventCategory, eventLabel) {
        if (configGtag) {
            $S.pushGAEvent(configGtag, eventCategory, trackingAction, eventLabel);
        }
    },
    TrackApiRequest: function(requestName, requestStatus) {
        var username = this.GetTrackUsername();
        this.Track(username, requestName+":"+requestStatus, this.getPageUrl());
    },
    TrackDebug: function(content) {
        if (!$S.isString(content) || content.length < 1) {
            content = "empty-content";
        }
        var username = this.GetTrackUsername();
        this.Track(username, "Debug:"+content, $S.getUserAgentTrackingData());
    },
    TrackPageView: function(pageName) {
        if (!$S.isString(pageName) || pageName.length < 1) {
            pageName = "empty-pageName";
        }
        var username = this.GetTrackUsername();
        this.Track(username, "pageView:"+pageName, this.getPageUrl());
    },
    TrackDropdownChange: function(listName, value) {
        if (!$S.isString(value) || value.length < 1) {
            value = "empty-value";
        }
        if (!$S.isStringV2(listName)) {
            listName = "emptyList"
        }
        var username = this.GetTrackUsername();
        this.Track(username, listName+"Change:"+value, this.getPageUrl());
    },
    TrackEvent: function(event) {
        var username = this.GetTrackUsername();
        this.Track(username, event, this.getPageUrl());
    }
});
})($S);

export default AppHandler;
