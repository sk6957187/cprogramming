import $S from "../../../interface/stack.js";

import TemplateHelper from "../../TemplateHelper";

import DBViewTemplate from "./DBViewTemplate";

var DBViewTemplateHandler;
(function($S){
// var DT = $S.getDT();
// var loadingCount = 0;
DBViewTemplateHandler = function(arg) {
    return new DBViewTemplateHandler.fn.init(arg);
};
DBViewTemplateHandler.fn = DBViewTemplateHandler.prototype = {
    constructor: DBViewTemplateHandler,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(DBViewTemplateHandler);
DBViewTemplateHandler.extend({
    UpdateTemplate: function(key, value) {
        if ($S.isStringV2(key)) {
            DBViewTemplate[key] = value;
        }
    }
});
DBViewTemplateHandler.extend({
    _getTdText: function(tdData) {
        if (!$S.isObject(tdData)) {
            return tdData;
        }
        var value = $S.findParam([tdData], "value", "");
        var fieldName = $S.findParam([tdData], "fieldName", "");
        var text = $S.findParam([tdData], "text", "");
        var valueField = $S.findParam([tdData], "valueField", "");
        var wordBreak = $S.findParam([tdData], "wordBreak", "");
        var wordBreakTag = $S.findParam([tdData], "wordBreakTag", "");
        var temp = {};
        if ($S.isStringV2(wordBreak) && $S.isString(value)) {
            if (!$S.isStringV2(wordBreakTag)) {
                wordBreakTag = "li";
            }
            if ($S.isStringV2(value)) {
                value = value.split(wordBreak).map(function(el,i, arr) {
                    return {"tag": wordBreakTag, "text": el.trim()};
                });
            }
        }
        if (($S.isObject(text) || $S.isArray(text))) {
            if ($S.isStringV2(fieldName)) {
                temp[fieldName] = value;
                TemplateHelper.updateTemplateText(text, temp);
            }
            return text;
        } else if (($S.isObject(valueField) || $S.isArray(valueField))) {
            if ($S.isStringV2(fieldName)) {
                temp[fieldName] = value;
                TemplateHelper.updateTemplateValue(valueField, temp);
            }
            return valueField;
        }
        return value;
    },
    _generateTr: function(trData, isSortableFieldRequired, rowIndex) {
        var renderFieldTr = this.getTemplate("dbviewField.tr");
        var i, tdField, temp, isValidTr = false, tdClassName;
        if (!$S.isArray(trData)) {
            trData = [];
        }
        if (trData.length > 0) {
            tdField = {"tag": "td.b", "text": rowIndex+1};
            TemplateHelper.addItemInTextArray(renderFieldTr, "dbviewField.tr.tds", tdField);
        }
        for (i=0; i<trData.length; i++) {
            if ($S.isObject(trData[i]) && $S.isBooleanTrue(trData[i].hidden)) {
                continue;
            }
            isValidTr = true;
            tdClassName = $S.findParam([trData[i]], "className", "");
            temp = this._getTdText(trData[i]);
            tdField = {"tag": "td", "text": temp, "className": tdClassName};
            TemplateHelper.addItemInTextArray(renderFieldTr, "dbviewField.tr.tds", tdField);
        }
        if (!isValidTr) {
            renderFieldTr = [];
        }
        return renderFieldTr;
    },
    _getHeadingText: function(tdData, defaultHeading) {
        if (!$S.isObject(tdData)) {
            return defaultHeading;
        }
        if (!$S.isUndefined(tdData["heading"])) {
            return tdData["heading"];
        }
        if (!$S.isUndefined(tdData["name"])) {
            return tdData["name"];
        }
        return defaultHeading;
    },
    _generateFirstTr: function(trData, isSortableFieldRequired, sortingFields) {
        var renderFieldTr = this.getTemplate("dbviewField.tr");
        var i, tdField, isSortable, tdText, isFound;
        var defaultClassName = "btn", className, additionalClassName;
        var isValidTr = false;
        var tdClassName = "";
        if (!$S.isArray(trData)) {
            trData = [];
        }
        if (trData.length > 0) {
            tdField = {"tag": "td.b", "text": "S.No."};
            TemplateHelper.addItemInTextArray(renderFieldTr, "dbviewField.tr.tds", tdField);
        }
        if (!$S.isArray(sortingFields)) {
            sortingFields = [];
        }
        for (i=0; i<trData.length; i++) {
            if ($S.isObject(trData[i]) && $S.isBooleanTrue(trData[i].hidden)) {
                continue;
            }
            isValidTr = true;
            isSortable = $S.findParam([trData[i]], "isSortable", false);
            if ($S.isBooleanTrue(isSortable) && $S.isBooleanTrue(isSortableFieldRequired)) {
                isFound = $S.searchItems([trData[i].name], sortingFields, false, false, "i",
                    function(searchingPattern, el, i, arr, searchByPattern, isRevert, modifier) {
                        if (!$S.isObject(el)) {
                            return false;
                        }
                        if (searchingPattern.indexOf(el.name) >= 0) {
                            return true;
                        }
                        return false;
                    }
                );
                if (isFound.length > 0 && $S.isObject(isFound[0])) {
                    if (isFound[0].value === "descending") {
                        additionalClassName = " btn-primary";
                    } else {
                        additionalClassName = " btn-secondary";
                    }
                } else {
                    additionalClassName = " btn-light";
                }
                className = defaultClassName + additionalClassName;
                tdText = [{"tag": "button.b", "className": className, "name": "sortable", "value": trData[i].name, "text": this._getHeadingText(trData[i], "")}];
            } else {
                tdText = [{"tag": "b", "text": this._getHeadingText(trData[i], "")}];
            }
            tdClassName = $S.findParam([trData[i]], "className", "");
            tdField = {"tag": "td", "text": tdText, "className": tdClassName};
            TemplateHelper.addItemInTextArray(renderFieldTr, "dbviewField.tr.tds", tdField);
        }
        if (!isValidTr) {
            renderFieldTr = [];
        }
        return renderFieldTr;
    }
});

DBViewTemplateHandler.extend({
    _getTotalValue: function(renderData, name) {
        var total = 0, i, j;
        if ($S.isArray(renderData) && renderData.length > 0 && $S.isStringV2(name)) {
            for (i=0; i<renderData.length; i++) {
                if ($S.isArray(renderData[i])) {
                    for(j=0; j<renderData[i].length; j++) {
                        if (!$S.isObject(renderData[i][j])) {
                            continue;
                        }
                        if (renderData[i][j].name !== name) {
                            continue;
                        }
                        if ($S.isNumeric(renderData[i][j]["value"])) {
                            total = $S.numberToFixed(total + (1* renderData[i][j]["value"]), 3);
                        }
                    }
                }
            }
        }
        return total;
    },
    checkTotalRow: function(renderData) {
        var resultPattern = null;
        if ($S.isArray(renderData) && renderData.length > 0) {
            resultPattern = $S.clone(renderData[0]);
        }
        var i, temp, isTotalRow = false;
        if ($S.isArray(resultPattern) && resultPattern.length > 0) {
            for (i=0; i<resultPattern.length; i++) {
                temp = resultPattern[i];
                if (!$S.isObject(temp)) {
                    continue;
                }
                if ($S.isBooleanTrue(temp.isTotalRow)) {
                    isTotalRow = temp.isTotalRow;
                    temp.value = this._getTotalValue(renderData, temp.name);
                } else {
                    temp.value = temp.totalRowText;
                }
            }
            if (isTotalRow) {
                renderData.push(resultPattern);
            }
        }
        return renderData;
    }
});
DBViewTemplateHandler.extend({
    generateIndividualTableV2: function(renderData, isSortableFieldRequired, tableTemplateName, sortingFields) {
        var renderField = this.getTemplate(tableTemplateName);
        var renderFieldTr, i;
        this.checkTotalRow(renderData);
        if ($S.isArray(renderData) && renderData.length > 0) {
            for (i = 0; i < renderData.length; i++) {
                if (i===0) {
                    renderFieldTr = this._generateFirstTr(renderData[i], isSortableFieldRequired, sortingFields);
                    TemplateHelper.addItemInTextArray(renderField, "tableData.table.tr", renderFieldTr);
                }
                renderFieldTr = this._generateTr(renderData[i], isSortableFieldRequired, i);
                TemplateHelper.addItemInTextArray(renderField, "tableData.table.tr", renderFieldTr);
            }
        } else {
            renderField = null;
        }
        return renderField;
    },
    _generateHeading: function(headingText, key, currentList3Data, showReloadButton) {
        var heading = headingText;
        var formValue = {"tableHeading": headingText};
        var currentField = null;
        var i = 0, isFound = false;
        var reloadOption = $S.isBooleanTrue(showReloadButton) ? "-reload": "";
        formValue[key] = headingText;
        if ($S.isObject(currentList3Data) && $S.isArray(currentList3Data.value)) {
            for (i = 0; i < currentList3Data.value.length; i++) {
                if (!$S.isObject(currentList3Data.value[i])) {
                    continue;
                }
                if (currentList3Data.value[i].key === key) {
                    currentField = currentList3Data.value[i];
                    break;
                }
            }
        }
        if ($S.isObject(currentField)) {
            if ($S.isObject(currentField.text) || $S.isArray(currentField.text)) {
                heading = $S.clone(currentField.text);
                isFound = true;
            }
        }
        if (!isFound) {
            if ($S.isObject(currentList3Data) && $S.isArray(currentList3Data.value)) {
                if (i === 0 && currentList3Data.value.length === 1) {
                    heading = this.getTemplate("dbViewHeading1-1" + reloadOption);
                } else if (i === 0 && currentList3Data.value.length > 1) {
                    heading = this.getTemplate("dbViewHeading1-many");
                } else if (i === 1 && currentList3Data.value.length >= 2) {
                    heading = this.getTemplate("dbViewHeading2-many" + reloadOption);
                } else if (currentList3Data.value.length > 2) {
                    heading = this.getTemplate("dbViewHeading3-many");
                }
            }
        }
        if (!$S.isString(heading)) {
            TemplateHelper.updateTemplateText(heading, formValue);
        }
        return heading;
    },
    generateHeading: function(headingText, key, currentList3Data, showReloadButton) {
        return this._generateHeading(headingText, key, currentList3Data, showReloadButton);
    },
    _recursiveGenerateHeading: function(renderField, tempRenderData, currentList3Data, sortingFields, showReloadButton) {
        if (!$S.isArray(tempRenderData)) {
            return;
        }
        for (var i=0; i<tempRenderData.length; i++) {
            if ($S.isObject(tempRenderData[i])) {
                if ($S.isString(tempRenderData[i].name)) {
                    renderField.push(this._generateHeading(tempRenderData[i].name, tempRenderData[i].key, currentList3Data, showReloadButton));
                }
                this._recursiveGenerateHeading(renderField, tempRenderData[i].text, currentList3Data, sortingFields, showReloadButton);
            } else if ($S.isArray(tempRenderData[i])) {
                renderField.push(this.generateDbViewRenderFieldV2([{"tableData": tempRenderData}], true, "tableData", sortingFields));
                break;
            }
        }
    },
    _generateSummaryData: function(trsData, sortingFields) {
        var trData = [], temp;
        if ($S.isArray(trsData) && trsData.length > 0) {
            for(var i=0; i<trsData.length; i++) {
                temp = {};
                if (!$S.isObject(trsData[i])) {
                    continue;
                }
                if ($S.isString(trsData[i].name) && trsData[i].name.length > 0) {
                    temp["description"] = trsData[i].name;
                } else {
                    temp["description"] = "Total";
                }
                if ($S.isArray(trsData[i].text) && trsData[i].text.length > 0) {
                    if ($S.isObject(trsData[i].text[0])) {
                        if ($S.isArray(trsData[i].text[0].text)) {
                            temp["count"] = trsData[i].text[0].text.length;
                        } else {
                            temp["count"] = trsData[i].text.length;
                        }
                    } else {
                        temp["count"] = trsData[i].text.length;
                    }
                } else {
                    temp["count"] = 0;
                }
                trData.push(temp);
            }
        }
        trData = $S.sortResultV2(trData, sortingFields, "name");
        return trData;
    },
    _highlightSortingButton: function(field, sortingFields) {
        var sortingKeys = ["description", "count"];
        var countButton = {"tag": "button", "name": "sortable","value": "count","text": "Count","isSortable": true};
        var descriptionButton = {"tag": "button", "name": "sortable","value": "description","text": "Description","isSortable": true};
        var btn = {"description": descriptionButton, "count": countButton};
        if (!$S.isArray(sortingFields)) {
            sortingFields = [];
        }
        var buttonClass, isNotFound;
        if ($S.isArray(sortingKeys)) {
            for (var i=0; i<sortingKeys.length; i++) {
                if ($S.isStringV2(sortingKeys[i])) {
                    isNotFound = true;
                    buttonClass = "";
                    for(var j=0; j<sortingFields.length; j++) {
                        if ($S.isObject(sortingFields[j]) && sortingFields[j]["name"] === sortingKeys[i]) {
                            if (sortingFields[j]["value"] === "descending") {
                                buttonClass = "btn btn-primary";
                            } else {
                                buttonClass = "btn btn-secondary";
                            }
                            isNotFound = false;
                        }
                    }
                    if (isNotFound) {
                        buttonClass = "btn btn-light";
                    }
                    btn[sortingKeys[i]]["className"] = buttonClass;
                    TemplateHelper.setTemplateAttr(field, sortingKeys[i]+"Button", "text", btn[sortingKeys[i]]);
                }
            }
        }
    },
    _generateDbViewSummaryTr: function(trsData, sortingFields) {
        var field = this.getTemplate("dbviewSummaryField");
        if ($S.isArray(sortingFields)) {
            field = this.getTemplate("dbviewSummaryFieldV2");
            this._highlightSortingButton(field, sortingFields);
        }
        var trField, temp;
        var summaryData = this._generateSummaryData(trsData, sortingFields);
        if ($S.isArray(summaryData) && summaryData.length > 0) {
            for(var i=0; i<summaryData.length; i++) {
                trField = this.getTemplate("dbviewSummaryField.tr");
                temp = {};
                temp["dbviewSummaryField.tr.s_no"] = i+1;
                if (!$S.isObject(summaryData[i])) {
                    continue;
                }
                if ($S.isString(summaryData[i]["description"]) && summaryData[i]["description"].length > 0) {
                    temp["dbviewSummaryField.tr.description"] = summaryData[i]["description"];
                } else {
                    temp["dbviewSummaryField.tr.description"] = "Total";
                }
                if ($S.isNumeric(summaryData[i]["count"])) {
                    temp["dbviewSummaryField.tr.count"] = summaryData[i]["count"];
                } else {
                    temp["dbviewSummaryField.tr.count"] = 0;
                }
                TemplateHelper.updateTemplateText(trField, temp);
                TemplateHelper.addItemInTextArray(field, "dbviewSummaryField", trField);
            }
        }
        return field;
    },
    _recursiveGenerateHeadingV4: function(renderField, tempRenderData, currentList3Data, sortingFields, showReloadButton) {
        if (!$S.isArray(tempRenderData) || tempRenderData.length < 1) {
            return;
        }
        var isBreak = false;
        for (var i=0; i<tempRenderData.length; i++) {
            if (!$S.isObject(tempRenderData[i]) || !$S.isArray(tempRenderData[i].text)) {
                continue;
            }
            for(var j=0; j<tempRenderData[i].text.length; j++) {
                if (!$S.isObject(tempRenderData[i].text[j]) || !$S.isString(tempRenderData[i].text[j].key)) {
                    renderField.push(this._generateDbViewSummaryTr(tempRenderData, sortingFields));
                    isBreak = true;
                    break;
                }
                break;
            }
            if (isBreak) {
                break;
            }
            renderField.push(this._generateHeading(tempRenderData[i].name, tempRenderData[i].key, currentList3Data, showReloadButton));
            renderField.push(this._recursiveGenerateHeadingV4(renderField, tempRenderData[i].text, currentList3Data, sortingFields, showReloadButton));
        }
    },
    generateDbViewRenderFieldV2: function(renderData, isSortableFieldRequired, tableTemplateName, sortingFields) {
        var renderField = this.getTemplate("dbviewField");
        var tableView, tableField, i, tableHeading;
        var isTableAdded = false;
        if ($S.isArray(renderData) && renderData.length > 0) {
            for (i = 0; i < renderData.length; i++) {
                if (!$S.isObject(renderData[i])) {
                    continue;
                }
                tableView = this.getTemplate("tableView", []);
                tableHeading = renderData[i].tableHeading;
                if ($S.isString(tableHeading) && tableHeading.length > 0) {
                    TemplateHelper.updateTemplateText(tableView, {"tableHeading": renderData[i].tableHeading});
                } else {
                    TemplateHelper.addClassTemplate(tableView, "reload", "d-none");
                }
                tableField = this.generateIndividualTableV2(renderData[i].tableData, isSortableFieldRequired, tableTemplateName, sortingFields);
                if (tableField !== null) {
                    isTableAdded = true;
                    TemplateHelper.addItemInTextArray(tableView, "tableData", tableField);
                    TemplateHelper.addItemInTextArray(renderField, "tableView", tableView);
                }
            }
        }
        if (!isTableAdded) {
            renderField = this.getTemplate("noDataFound");
        }
        return renderField;
    },
    GenerateDbViewRenderField: function(renderData, currentList3Data, sortingFields, showReloadButton) {
        // currentList3Data is required for generate heading
        // sortingFields is required for highlight button (primary / secondary)
        var renderField = [];
        if ($S.isArray(renderData) && renderData.length > 0) {
            this._recursiveGenerateHeading(renderField, renderData, currentList3Data, sortingFields, showReloadButton);
        } else {
            renderField = this.getTemplate("noDataFound");
        }
        return renderField;
    },
    GenerateDbViewSummaryRenderField: function(renderData, currentList3Data, showReloadButton) {
        var renderField = [], sortingFields = null;
        if ($S.isArray(renderData) && renderData.length > 0) {
            this._recursiveGenerateHeadingV4(renderField, renderData, currentList3Data, sortingFields, showReloadButton);
        } else {
            renderField = this.getTemplate("noDataFound");
        }
        return renderField;
    },
    GenerateDbViewSummaryRenderFieldV2: function(renderData, currentList3Data, sortingFields, showReloadButton) {
        var renderField = [];
        if ($S.isArray(renderData) && renderData.length > 0) {
            this._recursiveGenerateHeadingV4(renderField, renderData, currentList3Data, sortingFields, showReloadButton);
        } else {
            renderField = this.getTemplate("noDataFound");
        }
        return renderField;
    }
});
DBViewTemplateHandler.extend({
    getTemplate: function(pageName) {
        if (DBViewTemplate[pageName]) {
            return $S.clone(DBViewTemplate[pageName]);
        }
        return $S.clone(DBViewTemplate["templateNotFound"]);
    },
});

})($S);

export default DBViewTemplateHandler;
