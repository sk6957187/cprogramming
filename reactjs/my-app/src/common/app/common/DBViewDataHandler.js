import $S from "../../../interface/stack.js";
import AppHandler from "./AppHandler";
import TemplateHelper from "../../TemplateHelper";

var DBViewDataHandler;

(function($S){

var CurrentData = $S.getDataObj();
var keys = ["tableData", "resultPattern"];
CurrentData.setKeys(keys);

DBViewDataHandler = function(arg) {
    return new DBViewDataHandler.fn.init(arg);
};
DBViewDataHandler.fn = DBViewDataHandler.prototype = {
    constructor: DBViewDataHandler,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(DBViewDataHandler);

DBViewDataHandler.extend({
    setData: function(key, value, isDirect) {
        return CurrentData.setData(key, value, isDirect);
    },
    getData: function(key, defaultValue, isDirect) {
        return CurrentData.getData(key, defaultValue, isDirect);
    },
    setResultPattern: function(resultPattern) {
        return this.setData("resultPattern", resultPattern);
    },
    setTableData: function(resultPattern) {
        return this.setData("tableData", resultPattern);
    },
    UpdateSortingFields: function(sortingFields, value) {
        var finalSortingField = [];
        var temp = {};
        if (!$S.isArray(sortingFields)) {
            sortingFields = [];
        }
        for(var i=0; i<sortingFields.length; i++) {
            if (!$S.isObject(sortingFields[i])) {
                continue;
            }
            if (sortingFields[i].name === value) {
                temp = sortingFields[i];
                continue;
            }
            if (["descending", "ascending"].indexOf(sortingFields[i].value) >= 0) {
                finalSortingField.push(sortingFields[i]);
            }
        }
        if (temp.value === "descending") {
            temp.value = "ascending";
            finalSortingField.push(temp);
        } else if (temp.value === "ascending") {
            // Do nothing
        } else {
            temp.name = value;
            temp.value = "descending";
            finalSortingField.push(temp);
        }
        return finalSortingField;
    },
    ApplyResultPattern: function(dbViewTableData, resultPattern) {
        if (!$S.isArray(resultPattern) || !$S.isArray(dbViewTableData)) {
            return [];
        }
        var i, j, k, temp, t1Name, finalTable = [], value, valueArr;
        for (i = 0; i < dbViewTableData.length; i++) {
            temp = $S.clone(resultPattern);
            for (j=0; j<temp.length; j++) {
                t1Name = temp[j].tableName;
                if (!$S.isObject(dbViewTableData[i][t1Name]) || !$S.isStringV2(temp[j].name)) {
                    continue;
                }
                value = dbViewTableData[i][t1Name][temp[j].name];
                valueArr = [];
                if ($S.isArray(temp[j].combineDataFields) && temp[j].combineDataFields.length > 0) {
                    for (k=0; k<temp[j].combineDataFields.length; k++) {
                        if ($S.isStringV2(dbViewTableData[i][t1Name][temp[j].combineDataFields[k]])) {
                            valueArr.push(dbViewTableData[i][t1Name][temp[j].combineDataFields[k]]);
                        }
                    }
                    if (valueArr.length > 0) {
                        value = valueArr.join(",");
                    }
                }
                temp[j].value = value;
            }
            finalTable.push(temp);
        }
        return finalTable;
    },
    _generateTempDbViewData: function(dbViewData, tempTableData, resultCriteria) {
        if (!$S.isObject(dbViewData)) {
            dbViewData = {};
        }
        if (!$S.isArray(tempTableData) || tempTableData.length === 0) {
            return dbViewData;
        }
        var tempDbViewData = {};
        var result = $S.findParam([resultCriteria], "result");
        var tableName, tableEntry, resultFieldName, i, j;
        var tempTableName, tempFieldName, tempValue;
        if (!$S.isObject(result) || !$S.isArray(result.requiredData)) {
            return dbViewData;
        }
        tableName = result.tableName;
        if ($S.isStringV2(tableName)) {
            tempDbViewData[tableName] = {};
            tempDbViewData[tableName]["tableData"] = [];
            for(i=0; i<tempTableData.length; i++) {
                if (!$S.isObject(tempTableData[i])) {
                    continue;
                }
                tableEntry = {};
                if ($S.isObject(tempTableData[i][tableName])) {
                    tableEntry = tempTableData[i][tableName];
                }
                // tableEntry["tableName"] = tableName;
                for (j=0; j<result.requiredData.length; j++) {
                    if (!$S.isObject(result.requiredData[j])) {
                        continue;
                    }
                    if (!$S.isStringV2(result.requiredData[j].tableName)) {
                        continue
                    }
                    if (!$S.isStringV2(result.requiredData[j].fieldName)) {
                        continue;
                    }
                    if ($S.isStringV2(result.requiredData[j].resultFieldName)) {
                        resultFieldName = result.requiredData[j].resultFieldName;
                    } else {
                        resultFieldName = result.requiredData[j].fieldName;
                    }
                    tempValue = "";
                    tempTableName = result.requiredData[j].tableName;
                    tempFieldName = result.requiredData[j].fieldName;
                    if ($S.isObject(tempTableData[i][tempTableName])) {
                        tempValue = tempTableData[i][tempTableName][tempFieldName];
                    }
                    tableEntry[resultFieldName] = tempValue;
                }
                tempDbViewData[tableName]["tableData"].push(tableEntry);
            }
            for(var key in dbViewData) {
                if (key !== tableName) {
                    tempDbViewData[key] = dbViewData[key];
                }
            }
        } else {
            tempDbViewData = dbViewData;
        }
        return tempDbViewData;
    },
    _isDateEqual: function(date1, date2) {
        if (!AppHandler.isValidDateStr(date1) || !AppHandler.isValidDateStr(date2)) {
            return false;
        }
        var isDateEqual = AppHandler.isDateLiesInRangeV3(date1, date2);
        return isDateEqual;
    },
    _generateFinalTable: function(dbViewData, resultCriteria, requiredDataTable) {
        var i, j, k, op, values, t1, t1Name, t2, t2Name;
        var finalTable = [], temp, temp2, tableName;
        var force1stEntry, isNotMatching;
        if (!$S.isArray(resultCriteria)) {
            resultCriteria = [];
        }
        var finalDbViewData = {};
        if ($S.isArray(requiredDataTable) && requiredDataTable.length > 0) {
            temp = Object.keys(dbViewData);
            for (i=0; i<requiredDataTable.length; i++) {
                if (temp.indexOf(requiredDataTable[i]) >= 0) {
                    finalDbViewData[requiredDataTable[i]] = dbViewData[requiredDataTable[i]];
                }
            }
        } else {
            finalDbViewData = dbViewData;
        }
        if (resultCriteria.length === 0) {
            if ($S.isObject(finalDbViewData)) {
                for(tableName in finalDbViewData) {
                    t1 = finalDbViewData[tableName].tableData;
                    if ($S.isArray(t1)) {
                        for(i=0; i<t1.length; i++) {
                            temp = {};
                            temp[tableName] = t1[i];
                            finalTable.push(temp);
                        }
                    }
                }
            }
        } else {
            for(i=0; i<resultCriteria.length; i++) {
                op = $S.findParam([resultCriteria[i]], "op");
                if ($S.isString(op)) {
                    values = $S.findParam([resultCriteria[i]], "values");
                    if ($S.isArray(values) && values.length === 2) {
                        force1stEntry = $S.findParam([resultCriteria[i]], "force1stEntry");
                        t1Name = values[0].tableName;
                        t2Name = values[1].tableName;
                        t1 = null;
                        t2 = null;
                        if ($S.isObject(finalDbViewData[t1Name])) {
                            t1 = finalDbViewData[t1Name].tableData;
                        }
                        if ($S.isObject(finalDbViewData[t2Name])) {
                            t2 = finalDbViewData[t2Name].tableData;
                        }
                        if (!$S.isArray(t1)) {
                            continue;
                        }
                        for(j=0; j<t1.length; j++) {
                            if (op === "==") {
                                if ($S.isBooleanTrue(force1stEntry)) {
                                    temp = {};
                                    temp[t1Name] = t1[j];
                                    isNotMatching = true;
                                    if ($S.isArray(t2)) {
                                        for(k=0; k<t2.length; k++) {
                                            if (t1[j][values[0].col] === t2[k][values[1].col]) {
                                                temp2 = $S.clone(temp);
                                                temp2[t2Name] = t2[k];
                                                isNotMatching = false;
                                                finalTable.push(temp2);
                                            }
                                        }
                                    }
                                    if (isNotMatching) {
                                        finalTable.push(temp);
                                    }
                                } else {
                                    if ($S.isArray(t2)) {
                                        for(k=0; k<t2.length; k++) {
                                            if (t1[j][values[0].col] === t2[k][values[1].col]) {
                                                temp = {};
                                                temp[t1Name] = t1[j];
                                                temp[t2Name] = t2[k];
                                                finalTable.push(temp);
                                            }
                                        }
                                    }
                                }
                            } if (op === "date==") {
                                if ($S.isBooleanTrue(force1stEntry)) {
                                    temp = {};
                                    temp[t1Name] = t1[j];
                                    isNotMatching = true;
                                    if ($S.isArray(t2)) {
                                        for(k=0; k<t2.length; k++) {
                                            if (this._isDateEqual(t1[j][values[0].col], t2[k][values[1].col])) {
                                                temp2 = $S.clone(temp);
                                                temp2[t2Name] = t2[k];
                                                isNotMatching = false;
                                                finalTable.push(temp2);
                                            }
                                        }
                                    }
                                    if (isNotMatching) {
                                        finalTable.push(temp);
                                    }
                                } else {
                                    if ($S.isArray(t2)) {
                                        for(k=0; k<t2.length; k++) {
                                            if (this._isDateEqual(t1[j][values[0].col], t2[k][values[1].col])) {
                                                temp = {};
                                                temp[t1Name] = t1[j];
                                                temp[t2Name] = t2[k];
                                                finalTable.push(temp);
                                            }
                                        }
                                    }
                                }
                            } else if (op === "!=") {
                                isNotMatching = true;
                                if ($S.isArray(t2)) {
                                    for(k=0; k<t2.length; k++) {
                                        if (t1[j][values[0].col] === t2[k][values[1].col]) {
                                            isNotMatching = false;
                                            break;
                                        }
                                    }
                                }
                                if (isNotMatching) {
                                    temp = {};
                                    temp[t1Name] = t1[j];
                                    finalTable.push(temp);
                                }
                            }
                        }
                    }
                }
            }
        }
        return finalTable;
    },
    GetFinalTableV2: function(dbViewData, resultCriteria, requiredDataTable) {
        var finalTable = [];
        if ($S.isArray(resultCriteria) && resultCriteria.length >= 1) {
            for(var i=0; i<resultCriteria.length; i++) {
                finalTable = this._generateFinalTable(dbViewData, [resultCriteria[i]], requiredDataTable);
                dbViewData = this._generateTempDbViewData(dbViewData, finalTable, resultCriteria[i]);
            }
        } else {
            finalTable = this._generateFinalTable(dbViewData, resultCriteria, requiredDataTable);
        }
        return finalTable;
    },
    GetFinalTable: function(dbViewData, resultPattern, resultCriteria, requiredDataTable) {
        var finalTable = this.GetFinalTableV2(dbViewData, resultCriteria, requiredDataTable);
        return this.ApplyResultPattern(finalTable, resultPattern);
    },
    SortTableData: function(dbViewData, sortingField) {
        if (!$S.isObject(dbViewData)) {
            return;
        }
        var i, tableName;
        if ($S.isArray(sortingField)) {
            for(i=0; i<sortingField.length; i++) {
                if ($S.isObject(sortingField[i]) && $S.isString(sortingField[i].table)) {
                    if (sortingField[i].table.length === 0) {
                        continue;
                    }
                    if (!$S.isString(sortingField[i].index)) {
                        continue;
                    }
                    tableName = sortingField[i].table;
                    if (!$S.isObject(dbViewData[tableName])) {
                        continue;
                    }
                    if (!$S.isArray(dbViewData[tableName].tableData)) {
                        continue;
                    }
                    dbViewData[tableName].tableData = $S.sortResult(dbViewData[tableName].tableData, sortingField[i].sortableValue, sortingField[i].index, "name");
                }
            }
        }
        return dbViewData;
    },
    RemoveDeletedItem: function(dbViewData, deleteIds, deleteTableName, searchName) {
        if (!$S.isObject(dbViewData)) {
            return dbViewData;
        }
        if (!$S.isArray(deleteIds) || !$S.isStringV2(deleteTableName) || !$S.isStringV2(searchName)) {
            return dbViewData;
        }
        var i, tempTableData;
        for(var tableName in dbViewData) {
            if (tableName === deleteTableName) {
                continue;
            }
            tempTableData = [];
            if (!$S.isArray(dbViewData[tableName].tableData)) {
                continue;
            }
            for(i=0; i<dbViewData[tableName].tableData.length; i++) {
                if (!$S.isObject(dbViewData[tableName].tableData[i])) {
                    tempTableData.push(dbViewData[tableName].tableData[i]);
                    continue;
                }
                if ($S.isString(dbViewData[tableName].tableData[i][searchName])) {
                    if (deleteIds.indexOf(dbViewData[tableName].tableData[i][searchName]) >= 0) {
                        continue;
                    }
                }
                tempTableData.push(dbViewData[tableName].tableData[i]);
            }
            dbViewData[tableName].tableData = tempTableData;
        }
        return dbViewData;
    }
});
var GlobalArray = [];
DBViewDataHandler.extend({
    _convertRenderToDbData: function(renderData) {
        if (!$S.isArray(renderData)) {
            return $S.clone(GlobalArray);
        }
        for (var i = 0; i < renderData.length; i++) {
            if ($S.isObject(renderData[i])) {
                this._convertRenderToDbData(renderData[i].text)
            } else if ($S.isArray(renderData[i])) {
                GlobalArray = GlobalArray.concat(renderData);
                break;
            }
        }
        return $S.clone(GlobalArray);
    },
    _handleDateParameterV2: function(renderData, key, availableDate) {
        if (!$S.isArray(renderData)) {
            return renderData;
        }
        for (var i=0; i<renderData.length; i++) {
            if ($S.isObject(renderData[i])) {
                if (renderData[i].key === key) {
                    GlobalArray = [];
                    if (availableDate.indexOf(renderData[i].name) < 0) {
                        availableDate.push(renderData[i].name);
                    }
                    renderData[i].text = this._convertRenderToDbData(renderData[i].text);
                } else {
                    this._handleDateParameterV2(renderData[i].text, key, availableDate);
                }
            }
        }
        return renderData;
    },
    _handleDateParameterV3: function(renderData, key, list3Data, dateParameterField) {
        if (!$S.isArray(renderData)) {
            return renderData;
        }
        for (var i=0; i<renderData.length; i++) {
            if ($S.isObject(renderData[i])) {
                if (renderData[i].key === key) {
                    renderData[i].text = this.GenerateFinalDBViewData(renderData[i].text, list3Data, dateParameterField);
                } else {
                    this._handleDateParameterV3(renderData[i].text, key, list3Data, dateParameterField);
                }
            }
        }
        return renderData;
    },
    _handleDateParameterV5: function(renderData, key, dateRange) {
        var finalData = [], temp;
        for(var i=dateRange.length-1; i>=0; i--) {
            temp = {"key": key, "name": dateRange[i].dateHeading, "text": []};
            for (var j=0; j<renderData.length; j++) {
                if (AppHandler.isDateLiesInRange(dateRange[i].dateRange[0], dateRange[i].dateRange[1], renderData[j].name)) {
                    if ($S.isArray(renderData[j].text)) {
                        temp.text = temp.text.concat(renderData[j].text);
                    }
                }
            }
            if (temp.text.length > 0) {
                finalData.push(temp);
            }
        }
        return finalData;
    },
    _handleDateParameterV4: function(renderData, key, dateRange) {
        if (!$S.isArray(renderData)) {
            return renderData;
        }
        for (var i=0; i<renderData.length; i++) {
            if ($S.isObject(renderData[i])) {
                if (renderData[i].key === key) {
                    renderData = this._handleDateParameterV5(renderData, key, dateRange);
                    break;
                } else {
                    renderData[i].text = this._handleDateParameterV4(renderData[i].text, key, dateRange);
                }
            }
        }
        return renderData;
    },
    _handleDateParameter: function(renderData, currentList3Data, dateParameterField, dateSelect) {
        if (!$S.isString(dateSelect) || dateSelect.length < 1) {
            return renderData;
        }
        if (!$S.isArray(renderData)) {
            return renderData;
        }
        if (!$S.isObject(dateParameterField)) {
            return renderData;
        }
        if (!$S.isString(dateParameterField.table)) {
            return renderData;
        }
        if (!$S.isString(dateParameterField.fieldName) || dateParameterField.fieldName.length < 1) {
            return renderData;
        }
        if (!$S.isObject(currentList3Data)) {
            return renderData;
        }
        if (!$S.isArray(currentList3Data.value)) {
            return renderData;
        }
        var l3Data = null, i;
        var key = dateParameterField.fieldName;
        var tempList3Data = {};
        for(i=0; i<currentList3Data.value.length; i++) {
            if (!$S.isObject(currentList3Data.value[i])) {
                continue;
            }
            if (dateParameterField.fieldName === currentList3Data.value[i].key) {
                l3Data = currentList3Data.value[i];
                break;
            }
        }
        var availableDate = [];
        tempList3Data["value"] = currentList3Data.value.splice(i+1);
        if (!$S.isObject(l3Data)) {
            return renderData;
        }
        this._handleDateParameterV2(renderData, key, availableDate);
        availableDate = availableDate.sort();
        var dateRange = [];
        if (availableDate.length >= 0) {
            for(i=0; i<availableDate.length; i++) {
                if (AppHandler.isValidDateStr(availableDate[i])) {
                    dateRange.push(availableDate[i]);
                    break;
                }
            }
            for(i=availableDate.length-1; i>=0; i--) {
                if (AppHandler.isValidDateStr(availableDate[i])) {
                    dateRange.push(availableDate[i]);
                    break;
                }
            }
        }
        var dateParameters = AppHandler.GetDataParameterFromDate(dateRange);
        if ($S.isObject(dateParameters) && $S.isArray(dateParameters[dateSelect])) {
            dateParameters = dateParameters[dateSelect];
            renderData = this._handleDateParameterV4(renderData, key, dateParameters);
        }
        this._handleDateParameterV3(renderData, key, tempList3Data, dateParameterField);
        return renderData;
    },
    SortDbViewResult: function(renderData, sortingFields, dateParameterField) {
        // sortingFields is required for apply actual sorting
        if (!$S.isArray(renderData)) {
            return renderData;
        }
        for (var i=0; i<renderData.length; i++) {
            if ($S.isObject(renderData[i])) {
                if (i===0) {
                    if (!$S.isObject(dateParameterField) || dateParameterField.fieldName !== renderData[i].key) {
                        renderData = $S.sortResult(renderData, "descending", "name", "", "");
                    }
                }
                this.SortDbViewResult(renderData[i].text, sortingFields, dateParameterField);
            } else if ($S.isArray(renderData[i])) {
                renderData = $S.sortResultV2(renderData, sortingFields, "name", "");
                break;
            }
        }
        return renderData;
    },
    GenerateFinalDBViewData: function(finalTableData, currentList3Data, dateParameterField, dateSelect) {
        // finalTableData = data with result pattern
        var finalDataV2 = [], temp3, temp4;
        var list3Data = currentList3Data;
        var l3Data;
        var i, k, name, heading;
        if (!$S.isArray(finalTableData) || finalTableData.length < 1) {
            return null;
        }
        if ($S.isObject(list3Data) && $S.isArray(list3Data.value) && list3Data.value.length > 0) {
            for(i=0; i<finalTableData.length; i++) {
                if (!$S.isArray(finalTableData[i])) {
                    continue;
                }
                temp3 = finalDataV2;
                for(k=0; k<list3Data.value.length; k++) {
                    l3Data = list3Data.value[k];
                    if (!$S.isObject(l3Data) || !$S.isString(l3Data.key)) {
                        continue;
                    }
                    name = l3Data.key;
                    heading = $S.findParam(finalTableData[i], name, "", "name", "value");
                    if (!$S.isString(heading) || heading.length < 1) {
                        heading = "Empty: " + l3Data.key;
                    }
                    temp4 = TemplateHelper(temp3).searchField(heading);
                    if ($S.isObject(temp4) && temp4.name === heading) {

                    } else {
                        temp4 = {"name": heading, "key": l3Data.key, "text": []};
                        if ($S.isArray(temp3)) {
                            temp3.push(temp4);
                        } else if ($S.isObject(temp3) && $S.isArray(temp3.text)) {
                            temp3.text.push(temp4);
                        }
                    }
                    temp3 = temp4;
                }
                if ($S.isObject(temp4)) {
                    if ($S.isArray(temp4.text)) {
                        TemplateHelper.addItemInTextArray(temp4, heading, finalTableData[i]);
                        temp3 = temp4;
                    }
                }
                temp4 = null;
            }
            /**
                Cloned value of currentList3Data is passed because
                this method again will be called with different currentList3Data and it will be changed
            **/
            finalDataV2 = this._handleDateParameter(finalDataV2, $S.clone(currentList3Data), dateParameterField, dateSelect);
            return finalDataV2;
        } else {
            return [{"text": finalTableData}];
        }
    }
});

})($S);

export default DBViewDataHandler;
