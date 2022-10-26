import $S from "../../interface/stack.js";
import Config from "./Config";
import DataHandler from "./DataHandler";
// import TemplateHandler from "./template/TemplateHandler";
import DisplayPage from "./pages/DisplayPage";
import DisplayUploadedFiles from "./pages/DisplayUploadedFiles";

// import Api from "../../common/Api";
import AppHandler from "../../common/app/common/AppHandler";
import CommonDataHandler from "../../common/app/common/CommonDataHandler";
import FormHandler from "./forms/FormHandler";
import TemplateHelper from "../../common/TemplateHelper";
// import CommonConfig from "../../common/app/common/CommonConfig";

var DataHandlerV2;

(function($S){
// var DT = $S.getDT();
DataHandlerV2 = function(arg) {
    return new DataHandlerV2.fn.init(arg);
};
DataHandlerV2.fn = DataHandlerV2.prototype = {
    constructor: DataHandlerV2,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(DataHandlerV2);

DataHandlerV2.extend({
    getList1Data: function() {
        var appControlData = CommonDataHandler.getData("appControlData", []);
        var pageName = DataHandler.getData("pageName", "");
        var list1RequiredPages = DataHandler.getAppData("list1RequiredPages", []);
        if ($S.isArray(list1RequiredPages) && list1RequiredPages.indexOf(pageName) >= 0) {
            return appControlData;
        }
        return [];
    },
    getList3Data: function() {
        var pageName = DataHandler.getData("pageName", "");
        var pageId = DataHandler.getPathParamsData("pageId", "");
        var viewPageName = DataHandler.getPathParamsData("viewPageName", "");
        var key = "";
        if (Config.displayPage === pageName) {
            key = "pageId:" + pageId;
        } else if (Config.viewPage === pageName) {
            key = "viewPageName:" + viewPageName;
        }
        if (!$S.isStringV2(key)) {
            return [];
        }
        key += ".list3DataKey";
        var name = DataHandler.getAppData(key, false);
        var list3Data = DataHandler.getAppData(name, []);
        if ($S.isArray(list3Data)) {
            for (var i = 0; i < list3Data.length; i++) {
                if ($S.isObject(list3Data[i])) {
                    if (!$S.isString(list3Data[i].name)) {
                        list3Data[i].name = name + "-name-" + i;
                    }
                }
            }
        }
        return list3Data;
    },
    generateFilterOptions: function(pageName, dbViewData, filterKeyMapping) {
        var currentAppData = DataHandler.getCurrentAppData();
        var metaData = CommonDataHandler.getData("metaData", {});
        var filterSelectedValues = DataHandler.getData("filterValues", {});
        var filterOptions = AppHandler.generateFilterDataV2(filterKeyMapping, currentAppData, metaData, dbViewData, filterSelectedValues, "name");
        DataHandler.setData("filterOptions", filterOptions);
        DataHandler.setData("filterValues", filterSelectedValues);
        return dbViewData;
    },
    generateFilterOptionAndApplyFilter: function(pageName, tableData) {
        var currentAppData = DataHandler.getCurrentAppData({});
        var metaData = CommonDataHandler.getData("metaData", {});
        var filterSelectedValues = DataHandler.getData("filterValues", {});
        var pageRef = this.getPageRefByPageName(pageName);
        var keyMapping = DataHandler.getAppData("pageName:" + pageRef + ".filterKeyMapping", {});
        var filterOptions = AppHandler.generateFilterDataV2(keyMapping, currentAppData, metaData, tableData, filterSelectedValues, "name");
        DataHandler.setData("filterOptions", filterOptions);
        DataHandler.setData("filterValues", filterSelectedValues);
        var result = AppHandler.getFilteredData(currentAppData, metaData, tableData, filterOptions, "name");
        return result;
    },
    findCurrentList3Id: function() {
        var currentList3Data = DataHandler.getCurrentList3Data();
        var currentList3Id = DataHandler.getData("currentList3Id", "");
        var keys, list3Data;
        if ($S.isObject(currentList3Data)) {
            keys = Object.keys(currentList3Data);
            if (keys.length < 1) {
                list3Data = this.getList3Data();
                if ($S.isArray(list3Data)) {
                    for (var i = 0; i < list3Data.length; i++) {
                        if ($S.isObject(list3Data[i])) {
                            if ($S.isBooleanTrue(list3Data[i].defaultSelected)) {
                                currentList3Id = list3Data[i].name;
                                break;
                            }
                        }
                    }
                }
            }
        }
        DataHandler.setData("currentList3Id", currentList3Id);
    }
});
DataHandlerV2.extend({
    _updateFileInfo: function(pageName, uploadedFileData) {
        var loginUsername = AppHandler.GetUserData("username", "");
        if ($S.isArray(uploadedFileData)) {
            for(var i=0; i<uploadedFileData.length; i++) {
                if (!$S.isObject(uploadedFileData[i])) {
                    continue;
                }
                uploadedFileData[i]["file_details"] = DisplayUploadedFiles.getFileDisplayTemplate(pageName, uploadedFileData[i], loginUsername);
            }
        }
        return uploadedFileData;
    },
    getRowDataByAttr: function(tableName, attr) {
        var response = {"status": "FAILURE"};
        if (!$S.isObject(attr)) {
            response["reason"] = "Invalid attr";
            return response;
        }
        var projectTable = DataHandlerV2.getTableDataByAttrV2(tableName, attr);

        if (!$S.isArray(projectTable) || projectTable.length !== 1) {
            response["reason"] = "Invalid row, ";
            for (var key in attr) {
                response["reason"] += " "+ key + " : " + attr[key];
            }
        } else {
            response["status"] = "SUCCESS";
            response["rowData"] = projectTable[0];
        }
        return response;
    },
    getProjectDataV2: function(pageName) {
        var tableName = DataHandler.getTableName("projectTable");
        var pid = DataHandler.getPathParamsData("pid");
        var response = this.getRowDataByAttr(tableName, {"tableUniqueId": pid});
        var finalResponse = {"status": "SUCCESS"};
        if (response.status === "SUCCESS") {
            finalResponse["pidRow"] = response["rowData"];
        } else {
            finalResponse = response;
        }
        return finalResponse;
    },
    getProjectDataV3: function(pageName) {
        var tableName = DataHandler.getTableName("projectTable");
        var formName = this.getFormNameByPageName("projectId");
        var formType = this.getFormTypeByPageName("projectId");
        var pid = DataHandler.getPathParamsData("pid");
        var response = this.getRowDataByAttr(tableName, {"tableUniqueId": pid});
        var finalResponse = {"status": "SUCCESS"};
        if ($S.isStringV2(formType)) {
            formName += "." + formType;
        }
        if (response.status === "SUCCESS") {
            var id1 = DataHandler.getPathParamsData("id1", "");
            tableName = DataHandler.getTableName(formName + ".tableName");
            var response2 = this.getRowDataByAttr(tableName, {"pid": pid, "tableUniqueId": id1});
            if (response2.status === "SUCCESS") {
                finalResponse["pidRow"] = response["rowData"];
                finalResponse["id1Row"] = response2["rowData"];
            } else {
                finalResponse = response2;
            }
        } else {
            finalResponse = response;
        }
        return finalResponse;
    },
    getRenderTableDataV1: function(pageName) {
        var pid = DataHandler.getPathParamsData("pid");
        var fileTableName = DataHandler.getTableName("fileTable");
        var uploadedFileData = DataHandlerV2.getTableDataByAttr(fileTableName, "pid", pid);
        var uploadedFileTable = $S.sortResult(uploadedFileData, "descending", "entryTime", null, "");
        uploadedFileTable = this._updateFileInfo(pageName, uploadedFileData);
        return uploadedFileTable;
    },
    getRenderTableDataV1_1: function(pageName) {
        var fileTableName = DataHandler.getTableName("fileTable");
        var uploadedFileData = DataHandlerV2.getTableData(fileTableName);
        var uploadedFileTable = $S.sortResult(uploadedFileData, "descending", "entryTime", null, "");
        uploadedFileTable = this._updateFileInfo(pageName, uploadedFileData);
        return uploadedFileTable;
    },
    getFormTypeByPageName: function(pageName) {
        var formType = "";
        if (pageName === "home") {
            formType = DataHandler.getAppData("form_type", "");
            if (!$S.isStringV2(formType)) {
                formType = "";
            }
        } else if (pageName === "projectId") {
            var pidData = this.getProjectDataV2(pageName);
            if (pidData.status === "SUCCESS") {
                if ($S.isObject(pidData["pidRow"]) && $S.isStringV2(pidData["pidRow"]["form_type"])) {
                    formType = pidData["pidRow"]["form_type"];
                }
            }
        } else if (pageName === "id1Page") {
            var id1PageData = this.getProjectDataV3(pageName);
            if (id1PageData.status === "SUCCESS") {
                if ($S.isObject(id1PageData["id1Row"]) && $S.isStringV2(id1PageData["id1Row"]["form_type"])) {
                    formType = id1PageData["id1Row"]["form_type"];
                }
            }
        }
        return formType;
    },
    getRowDataParamByFormType: function(rowData, param) {
        var rowDataParam = "";
        if ($S.isObject(rowData) && $S.isStringV2(rowData["form_type"]) && $S.isStringV2(param)) {
            rowDataParam = rowData["form_type"] + "." + param;
        }
        return rowDataParam;
    },
    getPageRefByPageName: function(pageName) {
        var formType = this.getFormTypeByPageName(pageName);
        var pageRef = pageName;
        if ($S.isStringV2(formType)) {
            pageRef += "." + formType;
        }
        return pageRef;
    },
    getFormNameByPageName: function(pageName) {
        var formType = this.getFormTypeByPageName(pageName);
        var formNameKey = pageName;
        if ($S.isStringV2(formType)) {
            formNameKey += "." + formType;
        }
        return DataHandler.getAppData(formNameKey + ".formName", "");
    },
    getResultPatternNameByPageName: function(pageName) {
        var formType = this.getFormTypeByPageName(pageName);
        var formNameKey = pageName;
        if ($S.isStringV2(formType)) {
            formNameKey += "." + formType;
        }
        return "pageName:" + formNameKey + ".resultPattern";
    },
    handlePageByPageId: function(pageName, pageId, dbViewData) {
        var i, loginUsername, fileTableName, tempData;
        var result = [];
        switch(pageId) {
            case "displayUploadedFiles":
                loginUsername = AppHandler.GetUserData("username", "");
                fileTableName = DataHandler.getTableName("fileTable");
                if ($S.isArray(dbViewData)) {
                    for (i=0; i < dbViewData.length; i++) {
                        if (!$S.isObject(dbViewData[i]) || !$S.isObject(dbViewData[i][fileTableName])) {
                            continue;
                        }
                        dbViewData[i][fileTableName]["file_details"] = DisplayUploadedFiles.getFileDisplayTemplate(null, dbViewData[i][fileTableName], loginUsername);
                        tempData = {};
                        tempData[fileTableName] = dbViewData[i][fileTableName];
                        result.push(tempData);
                    }
                }
            break;
            default:
            break;
        }
        return result;
    },
    handlePageByPageName: function(pageName, dbViewData) {
        var i, loginUsername, fileTableName, tempData, tempData2;
        var fileInfoData, fileInfoTableName, projectTable;
        var result = [];
        var addedFilePid = [];
        var availableOn;
        switch(pageName) {
            case "manageFiles":
                loginUsername = AppHandler.GetUserData("username", "");
                fileTableName = DataHandler.getTableName("fileTable");
                fileInfoData = DataHandler.getData("filesInfoData");
                fileInfoTableName = DataHandler.getTableName("pageName:manageFiles.fileInfoTable");
                projectTable = DataHandlerV2.getTableData(DataHandler.getTableName("projectTable"));
                if ($S.isStringV2(fileInfoTableName)) {
                    if ($S.isArray(fileInfoData)) {
                        for(i=0; i<fileInfoData.length; i++) {
                            if (!$S.isObject(fileInfoData[i])) {
                                continue;
                            }
                            tempData = {};
                            fileInfoData[i]["file_details"] = DisplayUploadedFiles.getFileDisplayTemplateV2(pageName, fileInfoData[i].filepath, loginUsername);
                            fileInfoData[i]["available_on"] = DisplayPage.getFileAvailableProjects(fileInfoData[i], dbViewData, loginUsername, addedFilePid);
                            fileInfoData[i]["add_projects"] = FormHandler.getAddProjectFilesTemplate(pageName, fileInfoData[i], projectTable);
                            tempData[fileInfoTableName] = fileInfoData[i];
                            result.push(tempData);
                        }
                    }
                }
                if ($S.isStringV2(fileInfoTableName) && $S.isArray(dbViewData) && $S.isArray(addedFilePid)) {
                    for (i=0; i < dbViewData.length; i++) {
                        if (!$S.isObject(dbViewData[i]) || !$S.isObject(dbViewData[i][fileTableName]) || !$S.isStringV2(dbViewData[i][fileTableName].tableUniqueId)) {
                            continue;
                        }
                        if (addedFilePid.indexOf(dbViewData[i][[fileTableName]].tableUniqueId) >= 0) {
                            continue;
                        }
                        availableOn = DisplayPage.getFileAvailableProjectsV2(dbViewData[i][[fileTableName]], loginUsername, addedFilePid);
                        if (!$S.isArray(availableOn) || availableOn.length === 0) {
                            continue;
                        }
                        tempData = {};
                        tempData2 = dbViewData[i];
                        tempData2["available_on"] = availableOn;
                        tempData[fileInfoTableName] = tempData2;
                        result.push(tempData);
                    }
                }
            break;
            default:
            break;
        }
        return result;
    },
    _addIndex: function(index, obj) {
        var field = TemplateHelper(obj).searchFieldV3("tag", "link");
        if ($S.isString(field["href"])) {
            field["href"] = "/" + index + field["href"];
        }
    },
    updateLinkIndex: function(afterLoginLinkJson, footerLinkJsonAfterLogin, enabledPageId, enabledViewPage) {
        var i, temp;
        var index = DataHandler.getPathParamsData("index", "0");
        if ($S.isArray(enabledPageId)) {
            for(i=0; i<enabledPageId.length; i++) {
                temp = TemplateHelper(afterLoginLinkJson).searchFieldV2("pageId:" + enabledPageId[i]);
                this._addIndex(index, temp);
                temp = TemplateHelper(footerLinkJsonAfterLogin).searchFieldV2("pageId:" + enabledPageId[i]);
                this._addIndex(index, temp);
            }
        }
        if ($S.isArray(enabledViewPage)) {
            for(i=0; i<enabledViewPage.length; i++) {
                temp = TemplateHelper(afterLoginLinkJson).searchFieldV2("viewPageName:" + enabledViewPage[i]);
                this._addIndex(index, temp);
                temp = TemplateHelper(footerLinkJsonAfterLogin).searchFieldV2("viewPageName:" + enabledViewPage[i]);
                this._addIndex(index, temp);
            }
        }
        temp = TemplateHelper(afterLoginLinkJson).searchFieldV2("pageName:home");
        this._addIndex(index, temp);
        temp = TemplateHelper(footerLinkJsonAfterLogin).searchFieldV2("pageName:home");
        this._addIndex(index, temp);
    }
});

DataHandlerV2.extend({
    getTableData: function(tableName) {
        if (!$S.isStringV2(tableName)) {
            return [];
        }
        var dbViewData = DataHandler.getData("dbViewData", {});
        var tableData = [];
        if ($S.isObject(dbViewData) && $S.isObject(dbViewData[tableName])) {
            if ($S.isArray(dbViewData[tableName].tableData)) {
                tableData = dbViewData[tableName].tableData;
            }
        }
        return tableData;
    },
    getTableDataByAttr: function(tableName, attrName, attrValue) {
        var attr = {};
        attr[attrName] = attrValue;
        return this.getTableDataByAttrV2(tableName, attr);
    },
    getTableDataByAttrV2: function(tableName, attr) {
        var tableData = this.getTableData(tableName);
        if (!$S.isArray(tableData) || !$S.isObject(attr)) {
            return [];
        }
        var result = $S.searchItems(null, tableData, false, false, "i",
            function(searchingPattern, el, i, arr) {
                if (!$S.isObject(el)) {
                    return false;
                }
                for (var key in attr) {
                    if (el[key] !== attr[key]) {
                        return false;
                    }
                }
                return true;
            }
        );
        return result;
    },
    getTableDataV2: function(pageName, tableName) {
        var pid = DataHandler.getPathParamsData("pid", "");
        if (!$S.isStringV2(pid)) {
            return [];
        }
        var tableData = DataHandlerV2.getTableDataByAttrV2(tableName, {"pid": pid});
        return tableData;
    },
    getTableDataV3: function(pageName, tableName, id1) {
        var pid = DataHandler.getPathParamsData("pid", "");
        if (!$S.isStringV2(pid) || !$S.isStringV2(id1)) {
            return [];
        }
        var tableData = DataHandlerV2.getTableDataByAttrV2(tableName, {"pid": pid, "id1": id1});
        return tableData;
    },
    getTableDataV4: function(pageName, tableName) {
        var id1 = DataHandler.getPathParamsData("id1", "");
        var tableData = this.getTableDataV3(pageName, tableName, id1);
        return tableData;
    },
    getDisplayName: function(tableName, searchKey, searchRef, requiredKey, defaultValue) {
        var tableData = this.getTableData(tableName);
        if (!$S.isArray(tableData) || !$S.isStringV2(searchKey) || !$S.isStringV2(requiredKey)) {
            return defaultValue;
        }
        var displayText = $S.findParam(tableData, searchRef, defaultValue, searchKey, requiredKey);
        return displayText;
    }
});
DataHandlerV2.extend({
    _getDynamicEnabledData: function() {
        var dynamicEnabling = DataHandler.getAppData("dynamicEnabling");
        if (!$S.isObject(dynamicEnabling)) {
            return true;
        }
        var dynamicEnablingData;
        for(var key in dynamicEnabling) {
            if (AppHandler.GetUserData(key)) {
                dynamicEnablingData = dynamicEnabling[key];
                break;
            }
        }
        return dynamicEnablingData;
    },
    getEnabledPageId: function() {
        var dynamicEnablingData = this._getDynamicEnabledData();
        var enabledPageId = [];
        if ($S.isObject(dynamicEnablingData)) {
            enabledPageId = dynamicEnablingData["enabledPageId"];
        }
        return enabledPageId;
    },
    getEnabledViewPageName: function() {
        var dynamicEnablingData = this._getDynamicEnabledData();
        var enabledViewPage = [];
        if ($S.isObject(dynamicEnablingData)) {
            enabledViewPage = dynamicEnablingData["enabledViewPage"];
        }
        return enabledViewPage;
    },
    getEnabledPages: function() {
        var dynamicEnablingData = this._getDynamicEnabledData();
        var enabledPages = [];
        if ($S.isObject(dynamicEnablingData)) {
            enabledPages = dynamicEnablingData["enabledPages"];
        }
        return enabledPages;
    },
    isDisabled: function(type, value) {
        if (!$S.isStringV2(value)) {
            return true;
        }
        var dynamicEnablingData = this._getDynamicEnabledData();
        var enabledPages = [], enabledPageId = [], enabledForms = [], enabledViewPage = [];
        if ($S.isObject(dynamicEnablingData)) {
            if ($S.isArray(dynamicEnablingData["enabledPages"])) {
                enabledPages = dynamicEnablingData["enabledPages"];
            }
            if ($S.isArray(dynamicEnablingData["enabledPageId"])) {
                enabledPageId = dynamicEnablingData["enabledPageId"];
            }
            if ($S.isArray(dynamicEnablingData["enabledForms"])) {
                enabledForms = dynamicEnablingData["enabledForms"];
            }
            if ($S.isArray(dynamicEnablingData["enabledViewPage"])) {
                enabledViewPage = dynamicEnablingData["enabledViewPage"];
            }
        }
        if (type === "pageName") {
            return enabledPages.indexOf(value) < 0;
        }
        if (type === "pageId") {
            return enabledPageId.indexOf(value) < 0;
        }
        if (type === "form") {
            return enabledForms.indexOf(value) < 0;
        }
        if (type === "viewPage") {
            return enabledViewPage.indexOf(value) < 0;
        }
        return true;
    },
    isFilterEnabled: function(pageName, pageId, viewPageName) {
        var status = false;
        if ([Config.projectId].indexOf(pageName) >= 0) {
            status = true;
        } else if ([Config.manageFiles].indexOf(pageName) >= 0) {
            status = true;
        } else if ([Config.displayPage].indexOf(pageName) >= 0) {
            if (!this.isDisabled("pageId", pageId)) {
                status = true;
            }
        } else if ([Config.viewPage].indexOf(pageName) >= 0) {
            if (!this.isDisabled("viewPage", viewPageName)) {
                status = true;
            }
        }
        if (status) {
            var filterOptions = DataHandler.getData("filterOptions", []);
            if (!$S.isArray(filterOptions) || filterOptions.length === 0) {
                status = false;
            }
        }
        return status;
    },
    getDateParameterField: function(identifier, value) {
        var dateParameterField = null;
        var currentList3Data = DataHandler.getCurrentList3Data();
        if ($S.isObjectV2(currentList3Data) && $S.isObjectV2(currentList3Data["dateParameterField"])) {
            dateParameterField = currentList3Data["dateParameterField"];
        } else if (identifier === "pageId") {
            dateParameterField = DataHandler.getAppData("pageId:" + value + ".dateParameterField", {});
        } else if (identifier === "viewPage") {
            dateParameterField = DataHandler.getAppData("viewPageName:" + value + ".dateParameterField", {});
        } else if (identifier === "pageName") {
            dateParameterField = DataHandler.getAppData("pageName:" + value + ".dateParameterField", {});
        }
        return dateParameterField;
    },
    isDateSelectionEnable: function(pageName, pageId, viewPageName) {
        var status, dateParameterField, currentList3Data;
        if ([Config.home, Config.projectId, Config.id1Page].indexOf(pageName) < 0) {
            status = false;
        }
        if ([Config.displayPage].indexOf(pageName) >= 0) {
            if (!this.isDisabled("pageId", pageId)) {
                status = true;
                dateParameterField = this.getDateParameterField("pageId", pageId);
            }
        }
        if ([Config.viewPage].indexOf(pageName) >= 0) {
            if (!this.isDisabled("viewPage", viewPageName)) {
                status = true;
                dateParameterField = this.getDateParameterField("viewPage", viewPageName);
            }
        }
        if (status && $S.isObjectV2(dateParameterField)) {
            status = false;
            currentList3Data = DataHandler.getCurrentList3Data();
            if ($S.isObject(currentList3Data) && $S.isArray(currentList3Data.value)) {
                if ($S.isObjectV2(dateParameterField) && $S.isStringV2(dateParameterField.fieldName)) {
                    for (var i=0; i<currentList3Data.value.length; i++) {
                        if ($S.isObject(currentList3Data.value[i])) {
                            if (currentList3Data.value[i].key === dateParameterField.fieldName) {
                                status = true;
                            }
                        }
                    }
                }
            }
        } else {
            status = false;
        }
        return status;
    }
});
})($S);

export default DataHandlerV2;
