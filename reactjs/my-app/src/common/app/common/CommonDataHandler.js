import $S from "../../../interface/stack.js";

import Api from "../../Api";
import TemplateHelper from "../../TemplateHelper";
import AppHandler from "../../app/common/AppHandler";

import CommonConfig from "./CommonConfig";


var CommonDataHandler;

(function($S){
var DT = $S.getDT();
var CurrentData = $S.getDataObj();
var keys = [];
// var _temp;
keys.push("fieldsData");
keys.push("pathParams");

keys.push("appControlMetaData");
keys.push("appControlData");
keys.push("metaData");

keys.push("metaDataLoadStatus");
keys.push("appControlDataLoadStatus");
keys.push("firstTimeDataLoadStatus");


keys.push("loginUserDetailsLoadStatus");

keys.push("date-select");

CurrentData.setKeys(keys);

CurrentData.setData("firstTimeDataLoadStatus", "not-started");

CommonDataHandler = function(arg) {
    return new CommonDataHandler.fn.init(arg);
};
CommonDataHandler.fn = CommonDataHandler.prototype = {
    constructor: CommonDataHandler,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(CommonDataHandler);

CommonDataHandler.extend({
    addAdditionalDataKeys: function(keysArray) {
        var isUpdated = false;
        if ($S.isArray(keysArray)) {
            for(var i=0; i<keysArray.length; i++) {
                if ($S.isStringV2(keysArray[i]) && keys.indexOf(keysArray[i]) < 0) {
                    isUpdated = true;
                    keys.push(keysArray[i]);
                }
            }
        }
        if (isUpdated) {
            CurrentData.setKeys(keys);
        }
        return isUpdated;
    },
    setData: function(key, value, isDirect) {
        return CurrentData.setData(key, value, isDirect);
    },
    getData: function(key, defaultValue, isDirect) {
        return CurrentData.getData(key, defaultValue, isDirect);
    },
    clearFieldsData: function() {
        this.setData("fieldsData", {});
    },
    setFieldsData: function(key, value) {
        if (!$S.isStringV2(key)) {
            return;
        }
        var fieldsData = this.getData("fieldsData", {});
        if (!$S.isObject(fieldsData)) {
            fieldsData = {};
        }
        if ($S.isString(value)) {
            value = value.trim();
        }
        fieldsData[key] = value;
        this.setData("fieldsData", fieldsData);
    },
    getFieldsData: function(key, defaultValue) {
        var fieldsData = this.getData("fieldsData", {});
        if ($S.isStringV2(key)) {
            if ($S.isObject(fieldsData)) {
                if ($S.isUndefined(fieldsData[key])) {
                    return defaultValue;
                } else {
                    return fieldsData[key];
                }
            }
        }
        return defaultValue;
    },
    getPathParamsData: function(key, defaultValue) {
        var pathParams = this.getData("pathParams", {});
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
    getAppDataById: function(currentAppId, defaultCurrentAppData) {
        var appControlData = this.getData("appControlData", []);
        var currentAppData = defaultCurrentAppData;
        if ($S.isArray(appControlData)) {
            for (var i = 0; i < appControlData.length; i++) {
                if (appControlData[i]["id"] === currentAppId) {
                    currentAppData = appControlData[i];
                    break;
                }
            }
        }
        return currentAppData;
    },
    getDataLoadStatusByKey: function(keys) {
        var dataLoadStatus = [], i;
        var loadStatus;
        if ($S.isArray(keys)) {
            for (i = 0; i < keys.length; i++) {
                if ($S.isString(keys[i])) {
                    loadStatus = this.getData(keys[i], "");
                    dataLoadStatus.push(loadStatus);
                }
            }
        } else {
            return "";
        }
        for (i = 0; i < dataLoadStatus.length; i++) {
            if (dataLoadStatus[i] !== "completed") {
                return "";
            }
        }
        return "completed";
    }
});

CommonDataHandler.extend({
    getAppData: function(appId, key, defaultValue) {
        if (!$S.isStringV2(key)) {
            return defaultValue;
        }
        var currentAppData = this.getAppDataById(appId, {});
        var metaData = this.getData("metaData", {});
        return $S.findParam([currentAppData, metaData], key, defaultValue);
    }
});

CommonDataHandler.extend({
    clearMetaData: function() {
        this.setData("metaData", {});
    },
    _handleMetaDataLoad: function(defaultMetaData, metaDataResponse) {
        var finalMetaData = {}, i, tempMetaData, temp;
        var appControlMetaData = this.getData("appControlMetaData", {});
        var metaData = this.getData("metaData", {});
        if ($S.isObject(defaultMetaData)) {
            finalMetaData = defaultMetaData;
        }
        if ($S.isObject(appControlMetaData)) {
            finalMetaData = Object.assign(finalMetaData, appControlMetaData);
        }
        if ($S.isObject(metaData)) {
            finalMetaData = Object.assign(finalMetaData, metaData);
        }
        if ($S.isArray(metaDataResponse)) {
            for (i=0; i<metaDataResponse.length; i++) {
                if ($S.isObject(metaDataResponse[i])) {
                    tempMetaData = metaDataResponse[i];
                    temp = tempMetaData.metaData;
                    if ($S.isObject(temp)) {
                        temp = Object.keys(temp);
                        if (temp.length > 0) {
                            tempMetaData = tempMetaData.metaData;
                        }
                    }
                    finalMetaData = Object.assign(finalMetaData, tempMetaData);
                }
            }
        }
        this.setData("metaData", finalMetaData);
    },
    setDateSelectParameter: function(appId) {
        var currentAppControlData = this.getAppDataById(appId, {});
        var metaData = this.getData("metaData", {});
        var dateSelect = this.getData("date-select", "");
        if (dateSelect === "") {
            dateSelect = $S.findParam([currentAppControlData, metaData], "dateSelect", "");
            if (dateSelect === "") {
                dateSelect = CommonConfig.defaultDateSelect;
            }
        }
        this.setData("date-select", dateSelect);
    }
});

CommonDataHandler.extend({
    loadLoginUserDetailsData: function(callback) {
        var loginUserDetailsApi = CommonConfig.getApiUrl("getLoginUserDetailsApi", null, true);
        if ($S.isStringV2(loginUserDetailsApi)) {
            CommonDataHandler.setData("loginUserDetailsLoadStatus", "in_progress");
            AppHandler.LoadLoginUserDetails(loginUserDetailsApi, function() {
                CommonDataHandler.setData("loginUserDetailsLoadStatus", "completed");
                $S.callMethod(callback);
            });
        } else {
            CommonDataHandler.setData("loginUserDetailsLoadStatus", "completed");
            $S.callMethod(callback);
        }
    },
    loadAppControlData: function(defaultMetaData, callback) {
        var appControlApi = CommonConfig.getApiUrl("getAppControlApi", null, true);
        this.setData("appControlDataLoadStatus", "in_progress");
        AppHandler.loadAppControlData(appControlApi, CommonConfig.baseApi, CommonConfig.appControlDataPath, CommonConfig.validAppControl, function(appControlData, metaData) {
            CommonDataHandler.setData("appControlData", appControlData);
            CommonDataHandler.setData("appControlMetaData", metaData);
            CommonDataHandler._handleMetaDataLoad(defaultMetaData, null);
            $S.log("appControlData load complete");
            CommonDataHandler.setData("appControlDataLoadStatus", "completed");
            $S.callMethod(callback);
        });
    },
    loadMetaDataByMetaDataApi: function(defaultMetaData, metaDataApi, callback) {
        var request = [];
        if (!$S.isArray(metaDataApi)) {
            metaDataApi = [];
        }
        metaDataApi = metaDataApi.map(function(el, i, arr) {
            return CommonConfig.baseApi + el + "?v=" + CommonConfig.appVersion;
        });
        var metaDataRequest = {
                            "url": metaDataApi,
                            "apiName": "metaData",
                            "requestMethod": Api.getAjaxApiCallMethod()};
        request.push(metaDataRequest);
        this.setData("metaDataLoadStatus", "in_progress");
        AppHandler.LoadDataFromRequestApi(request, function() {
            for(var i=0; i<request.length; i++) {
                if (request[i].apiName === "metaData") {
                    CommonDataHandler._handleMetaDataLoad(defaultMetaData, request[i].response);
                }
            }
            CommonDataHandler.setData("metaDataLoadStatus", "completed");
            $S.log("metaData load complete");
            $S.callMethod(callback);
        });
    },
    loadMetaDataByAppId: function(defaultMetaData, appId, callback) {
        var currentAppControlData = this.getAppDataById(appId, {});//{}
        var metaDataApi = [];
        if ($S.isArray(currentAppControlData["metaDataApi"])) {
            metaDataApi = currentAppControlData["metaDataApi"];
        }
        this.loadMetaDataByMetaDataApi(defaultMetaData, metaDataApi, callback);
    },
    loadJSONDataByApiName: function(apiName, callback) {
        var apiUrl = CommonConfig.getApiUrl(apiName, null, true);
        if ($S.isStringV2(apiUrl)) {
            $S.loadJsonData(CommonConfig.JQ, [apiUrl], function(response, apiName, ajax){
                if ($S.isFunction(callback)) {
                    callback(apiName, response);
                }
            }, null, apiName, Api.getAjaxApiCallMethod());
        } else {
            $S.callMethod(callback);
        }
    }
});
CommonDataHandler.extend({
    OnReloadClick: function(appStateCallback, appDataCallback) {
        AppHandler.TrackEvent("reloadClick");
    },
    OnResetClick: function(appStateCallback, appDataCallback, name, value) {
        AppHandler.TrackEvent("resetClick");
    },
    OnClick: function(appStateCallback, appDataCallback, name, value) {
        if ($S.isStringV2(name)) {
            return;
        }
        this.setFieldsData(name, value);
    },
    OnDateSelectClick: function(appStateCallback, appDataCallback, name, value) {
        CommonDataHandler.setData("date-select", value);
    },
    OnDropdownChange: function(appStateCallback, appDataCallback, name, value) {
        if ($S.isStringV2(name)) {
            return;
        }
        this.setFieldsData(name, value);
    },
    OnInputChange: function(appStateCallback, appDataCallback, name, value) {
        if ($S.isStringV2(name)) {
            return;
        }
        this.setFieldsData(name, value);
    }
});
CommonDataHandler.extend({
    _updateBtnStatus: function(template, submitBtnName, formSubmitStatus) {
        if (!$S.isStringV2(submitBtnName)) {
            return;
        }
        if (formSubmitStatus === "in_progress") {
            TemplateHelper.addClassTemplate(template, submitBtnName, "btn-secondary disabled");
            TemplateHelper.removeClassTemplate(template, submitBtnName, "btn-primary");
        } else {
            TemplateHelper.removeClassTemplate(template, submitBtnName, "disabled");
            TemplateHelper.removeClassTemplate(template, submitBtnName, "btn-secondary");
            TemplateHelper.addClassTemplate(template, submitBtnName, "btn-primary");
        }
    },
    _getCurrentValue: function(dataAttr, key, fieldData) {
        if ($S.isStringV2(fieldData)) {
            return fieldData;
        }
        if (!$S.isObject(dataAttr)) {
            return fieldData;
        }
        if (dataAttr.type === "date") {
            fieldData = DT.getDateTime(dataAttr["default"], "/");
        } else {
            fieldData = dataAttr["default"];
        }
        this.setFieldsData(key, fieldData);
        return fieldData;
    },
    getFormTemplate: function(formTemplate, validationData, submitBtnName, formSubmitStatus) {
        if (!$S.isObject(validationData)) {
            return formTemplate;
        }
        var fieldsData = this.getData("fieldsData", {});
        if (!$S.isObject(fieldsData)) {
            return formTemplate;
        }
        var formText = {};
        for(var key in validationData) {
            formText[key] = this._getCurrentValue(validationData[key], key, fieldsData[key]);
        }
        TemplateHelper.updateTemplateValue(formTemplate, formText);
        this._updateBtnStatus(formTemplate, submitBtnName, formSubmitStatus);
        return formTemplate;
    },
    removeDuplicateString: function(requestArray) {
        var responseArray = [];
        if ($S.isArray(requestArray)) {
            for (var i=0; i<requestArray.length; i++) {
                if ($S.isString(requestArray[i]) && responseArray.indexOf(requestArray[i]) < 0) {
                    responseArray.push(requestArray[i]);
                }
            }
        }
        return responseArray;
    },
    setHeaderAndFooterData: function(afterLoginLinkJson, footerLinkJsonAfterLogin, enabledPageId, enabledViewPage, enabledPages) {
        var i;
        var username = AppHandler.GetUserData("username", "");
        var activeUserRole = AppHandler.GetUserActiveRoles();
        var addBasepathLinkName = this.removeDuplicateString(CommonConfig.addBasepathLinkName);
        var basepathname = CommonConfig.basepathname;
        if ($S.isStringV2(username)) {
            TemplateHelper.updateTemplateText(afterLoginLinkJson, {"pageHeading.username": username});
        }
        if ($S.isArray(enabledPageId)) {
            for(i=0; i<enabledPageId.length; i++) {
                TemplateHelper.removeClassTemplate(afterLoginLinkJson, "pageId:" + enabledPageId[i], "d-none");
                TemplateHelper.removeClassTemplate(footerLinkJsonAfterLogin, "pageId:" + enabledPageId[i], "d-none");
            }
        }
        if ($S.isArray(enabledViewPage)) {
            for(i=0; i<enabledViewPage.length; i++) {
                TemplateHelper.removeClassTemplate(afterLoginLinkJson, "viewPageName:" + enabledViewPage[i], "d-none");
                TemplateHelper.removeClassTemplate(footerLinkJsonAfterLogin, "viewPageName:" + enabledViewPage[i], "d-none");
            }
        }
        if ($S.isArray(enabledPages)) {
            for(i=0; i<enabledPages.length; i++) {
                TemplateHelper.removeClassTemplate(afterLoginLinkJson, "pageName:" + enabledPages[i], "d-none");
                TemplateHelper.removeClassTemplate(footerLinkJsonAfterLogin, "pageName:" + enabledPages[i], "d-none");
            }
        }
        if ($S.isArray(addBasepathLinkName) && $S.isStringV2(basepathname)) {
            for(i=0; i<addBasepathLinkName.length; i++) {
                TemplateHelper.addInHref(afterLoginLinkJson, addBasepathLinkName[i], basepathname);
                TemplateHelper.addInHref(footerLinkJsonAfterLogin, addBasepathLinkName[i], basepathname);
            }
        }
        if ($S.isArray(activeUserRole)) {
            for(i=0; i<activeUserRole.length; i++) {
                TemplateHelper.removeClassTemplate(afterLoginLinkJson, "roleId:" + activeUserRole[i], "d-none");
                TemplateHelper.removeClassTemplate(footerLinkJsonAfterLogin, "roleId:" + activeUserRole[i], "d-none");
            }
        }
    }
});

CommonDataHandler.extend({
    getAleartMessage: function(messageMapping, key, isInvalid) {
        if ($S.isObject(messageMapping)) {
            if ($S.isBooleanTrue(isInvalid)) {
                if ($S.isStringV2(messageMapping[key + ".invalid"])) {
                    return messageMapping[key + ".invalid"];
                }
            }
            if ($S.isStringV2(messageMapping[key])) {
                return messageMapping[key];
            }
        }
        return "Invalid " + key;
    },
    getErrorStringFromResponse: function(response) {
        var msg = "";
        if ($S.isObject(response) && response.status === "FAILURE") {
            msg = response.error;
        }
        return msg;
    },
    _saveData: function(pageName, formName, tableName, filename, uiEntryTime, formData, requiredKeys, callback) {
        var resultData = requiredKeys;
        var url = CommonConfig.getApiUrl("getAddTextApi", null, true);
        if (!$S.isString(url)) {
            return;
        }
        if (!$S.isStringV2(tableName)) {
            alert("Invalid table_name");
            return;
        }
        var finalText = [];
        for(var i=0; i<resultData.length; i++) {
            finalText.push(AppHandler.ReplaceComma(formData[resultData[i]]));
        }
        var postData = {};
        postData["text"] = [finalText.join(",")];
        postData["tableName"] = tableName;
        postData["filename"] = filename;
        postData["uiEntryTime"] = uiEntryTime;
        if ($S.isFunction(callback)) {
            callback(CommonConfig.IN_PROGRESS);
        }
        $S.sendPostRequest(CommonConfig.JQ, url, postData, function(ajax, status, response) {
            if ($S.isFunction(callback)) {
                callback(CommonConfig.COMPLETED);
            }
            if (status === "FAILURE" || ($S.isObject(response) && response.status === "FAILURE")) {
                AppHandler.TrackApiRequest("addNewProject", "FAILURE");
                alert("Error in uploading data, Please Try again.");
            } else {
                AppHandler.TrackApiRequest("addNewProject", "SUCCESS");
                AppHandler.LazyReload(250);
            }
        });
    },
    _isValidField: function(messageMapping, validationData, key, value) {
        if (!$S.isStringV2(key)) {
            alert("Invalid key");
            return false;
        }
        if (!$S.isObject(validationData[key])) {
            alert(key + ": not found in validation data");
            return false;
        }
        var fieldAttr = validationData[key];
        var isInvalid = false, isValid;
        /**
         * There are 3 scenario
         * field is valid type (string) and content is also valid
         * field is valid type (string) but content is invalid
         * field is invalid type
         * */
        if ($S.isBooleanTrue(fieldAttr.isRequired)) {
            isValid = $S.isStringV2(value);
            if (isValid) {
                switch(fieldAttr.type) {
                    case "date":
                        isValid = AppHandler.isValidDateStr(value);
                    break;
                    case "numeric":
                        isValid = $S.isNumeric(value);
                        if (!isValid) {
                            isInvalid = true;
                        }
                    break;
                    case "string":
                    break;
                    default:
                    break;
                }
            }
        } else {
            isValid = true;
        }
        if (!isValid) {
            alert(this.getAleartMessage(messageMapping, key, isInvalid));
        }
        return isValid;
    },
    _getFinalFieldData: function(validationData, fieldsData, key) {
        if (!$S.isObject(validationData)) {
            validationData = {};
        }
        if (!$S.isObject(fieldsData)) {
            fieldsData = {};
        }
        var fieldAttr = validationData[key];
        if ($S.isObject(fieldAttr) && $S.isBooleanTrue(fieldAttr.readPathParam)) {
            return this.getPathParamsData(key);
        }
        return AppHandler.FormateString(fieldsData[key]);
    },
    submitForm: function(pageName, formName, tableName, filename, messageMapping, requiredKeys, validationData, callback) {
        var fieldsData = CommonDataHandler.getData("fieldsData", {});
        var uiEntryTime = DT.getDateTime("YYYY/-/MM/-/DD/ /hh/:/mm/:/ss","/");
        var i, isFormValid = true, formData = {};
        if (!$S.isObject(fieldsData)) {
            fieldsData = {};
        }
        if (!$S.isObject(validationData)) {
            validationData = {};
        }
        if (!$S.isArray(requiredKeys)) {
            alert("Required keys not found in config.");
            requiredKeys = [];
        }
        var key = formName + ".uiEntryTime", value;
        if ($S.isObjectV2(validationData[key])) {
            uiEntryTime = this._getFinalFieldData(validationData, fieldsData, key);
            if (!this._isValidField(messageMapping, validationData, key, uiEntryTime)) {
                return;
            }
        }
        for (i=0; i<requiredKeys.length; i++) {
            key = requiredKeys[i];
            value = this._getFinalFieldData(validationData, fieldsData, key);
            if (!this._isValidField(messageMapping, validationData, key, value)) {
                isFormValid = false;
                break;
            }
            formData[key] = value;
        }
        if (isFormValid) {
            this._saveData(pageName, formName, tableName, filename, uiEntryTime, formData, requiredKeys, callback);
        }
    }
});

CommonDataHandler.extend({
    _getDynamicEnabledData: function(allDynamicEnabledData) {
        if (!$S.isObject(allDynamicEnabledData)) {
            return true;
        }
        var dynamicEnablingData = [];
        var isValidRole;
        for(var key in allDynamicEnabledData) {
            isValidRole = AppHandler.GetUserData(key);
            if ($S.isBooleanTrue(isValidRole)) {
                dynamicEnablingData = allDynamicEnabledData[key];
                break;
            }
        }
        return dynamicEnablingData;
    },
    getEnabledPageId: function(allDynamicEnabledData) {
        var dynamicEnablingData = this._getDynamicEnabledData(allDynamicEnabledData);
        var enabledPageId = [];
        if ($S.isObject(dynamicEnablingData)) {
            enabledPageId = dynamicEnablingData["enabledPageId"];
        }
        return enabledPageId;
    },
    getEnabledViewPageName: function(allDynamicEnabledData) {
        var dynamicEnablingData = this._getDynamicEnabledData(allDynamicEnabledData);
        var enabledViewPage = [];
        if ($S.isObject(dynamicEnablingData)) {
            enabledViewPage = dynamicEnablingData["enabledViewPage"];
        }
        return enabledViewPage;
    },
    isEnabled: function(allDynamicEnabledData, type, value) {
        var dynamicEnablingData = this._getDynamicEnabledData(allDynamicEnabledData);
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
            return enabledPages.indexOf(value) >= 0;
        }
        if (type === "pageId") {
            return enabledPageId.indexOf(value) >= 0;
        }
        if (type === "form") {
            return enabledForms.indexOf(value) >= 0;
        }
        if (type === "viewPage") {
            return enabledViewPage.indexOf(value) >= 0;
        }
        return false;
    }
});
CommonDataHandler.extend({
    _getRoleFilterMapping: function(appId, filterKey) {
        if (!$S.isStringV2(filterKey)) {
            return [];
        }
        var filterMapping = this.getAppData(appId, filterKey, {});
        var roles = AppHandler.GetUserActiveRoles();
        var visibleFeedbackSection = [];
        if ($S.isArray(roles) && $S.isObject(filterMapping)) {
            for (var key in filterMapping) {
                if (roles.indexOf(key) >= 0) {
                    if ($S.isStringV2(filterMapping[key])) {
                        visibleFeedbackSection.push(filterMapping[key]);
                    } else if ($S.isArray(filterMapping[key])) {
                        visibleFeedbackSection = visibleFeedbackSection.concat(filterMapping[key]);
                    }
                }
            }
        }
        return visibleFeedbackSection;
    },
    getTableFilename: function(tableName, dynamicTableFileName, dynamicValue) {
        if (!$S.isString(tableName)) {
            return tableName;
        }
        var filename = tableName;
        if ($S.isArray(dynamicTableFileName) && dynamicTableFileName.indexOf(tableName) >= 0) {
            if ($S.isStringV2(dynamicValue)) {
                filename = tableName + DT.getDateTimeV2(dynamicValue, "_/YYYY/-/MMM","/");
            } else {
                filename = tableName + DT.getDateTime("_/YYYY/-/MMM","/");
            }
        }
        return filename + ".csv";
    },
    applyRoleFilter: function(appId, tableData, filterKey) {
        if (!$S.isStringV2(filterKey)) {
            return tableData;
        }
        var filterMapping = this._getRoleFilterMapping(appId, filterKey);
        if (!$S.isArray(filterMapping) || filterMapping.length === 0) {
            return tableData;
        }
        if (!$S.isArray(tableData)) {
            return tableData;
        }
        var finalTableData = [];
        var filterKeyArr = filterKey.split(".");
        var key = filterKey;
        if (filterKeyArr.length >= 2) {
            key = filterKeyArr[filterKeyArr.length - 2];
        }
        for (var i=0; i<tableData.length; i++) {
            if (!$S.isObject(tableData[i])) {
                continue;
            }
            if (filterMapping.indexOf(tableData[i][key]) >= 0) {
                finalTableData.push(tableData[i]);
            }
        }
        return finalTableData;
    }
});
CommonDataHandler.extend({
    _isValidDataHandler: function(DataHandler) {
        if (!$S.isFunction(DataHandler)) {
            return false;
        }
        return true;
    },
    getDataLoadStatusByKeyV2: function(DataHandler, keys) {
        if (!this._isValidDataHandler(DataHandler) || !$S.isFunction(DataHandler.getData)) {
            return "";
        }
        var dataLoadStatus = [], i;
        var loadStatus;
        if ($S.isArray(keys)) {
            for (i = 0; i < keys.length; i++) {
                if ($S.isString(keys[i])) {
                    loadStatus = DataHandler.getData(keys[i], "");
                    dataLoadStatus.push(loadStatus);
                }
            }
        } else {
            return "";
        }
        for (i = 0; i < dataLoadStatus.length; i++) {
            if (dataLoadStatus[i] !== "completed") {
                return "";
            }
        }
        return "completed";
    },
    isPageDisabled: function(DataHandler, pageName) {
        if (!this._isValidDataHandler(DataHandler) || !$S.isFunction(DataHandler.getAppData)) {
            return false;
        }
        var enabledPages = DataHandler.getAppData("enabledPages");
        if ($S.isArray(enabledPages)) {
            if (enabledPages.indexOf("all") >= 0) {
                return false;
            }
            return enabledPages.indexOf(pageName) < 0;
        }
        return true;
    },
    getTableData: function(DataHandler, tableName) {
        if (!this._isValidDataHandler(DataHandler) || !$S.isFunction(DataHandler.getData)) {
            return [];
        }
        if (!$S.isStringV2(tableName)) {
            return [];
        }
        var dbViewData = DataHandler.getData("dbViewData", {});
        if ($S.isObject(dbViewData) && $S.isObject(dbViewData[tableName]) && $S.isArray(dbViewData[tableName]["tableData"])) {
            return dbViewData[tableName]["tableData"];
        }
        return [];
    },
    getList2Data: function(DataHandler, otherPagesList) {
        if (!this._isValidDataHandler(DataHandler) || !$S.isFunction(DataHandler.getAppData)) {
            return [];
        }
        if (!$S.isArray(otherPagesList)) {
            otherPagesList = [];
        }
        var enabledPages = DataHandler.getAppData("enabledPages");
        var redirectPages = DataHandler.getAppData("redirectPages");
        var linkText = DataHandler.getAppData("linkText");
        if (!$S.isArray(enabledPages)) {
            enabledPages = [];
        }
        if (!$S.isObject(linkText)) {
            linkText = {};
        }
        var list2Data = [];
        var temp, i, key;
        var pageOrder = [];
        if (enabledPages.indexOf("all") >= 0) {
            pageOrder = otherPagesList;
        } else {
            for(i=0; i<enabledPages.length; i++) {
                if (otherPagesList.indexOf(enabledPages[i]) >= 0) {
                    pageOrder.push(enabledPages[i]);
                }
            }
        }
        for(i=0; i<pageOrder.length; i++) {
            key = pageOrder[i];
            if ($S.isString(linkText[key])) {
                temp = linkText[key];
            } else {
                temp = $S.capitalize(key);
            }
            list2Data.push({"name": key, "toText": temp, "pageName": key});
        }
        if ($S.isArray(redirectPages)) {
            for(i=0; i<redirectPages.length; i++) {
                temp = redirectPages[i];
                if (!$S.isObject(temp)) {
                    continue;
                }
                if (!$S.isStringV2(temp.name)) {
                    continue;
                }
                if (!$S.isStringV2(temp.toText)) {
                    continue;
                }
                if (!$S.isStringV2(temp.toUrl)) {
                    continue;
                }
                list2Data.push({"name": temp.name, "toText": temp.toText, "toUrl": temp.toUrl});
            }
        }
        return list2Data;
    },
    generateDateSelectionParameter: function(allDateStr) {
        var dailyDateSelection = [];
        var monthlyDateSelection = [];
        var yearlyDateSelection = [];
        var allDateSelection = [];
        var allDate = [];
        if ($S.isArray(allDateStr)) {
            allDate = allDateStr.sort();
        }
        var i, temp, heading, startDate, endDate;
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
                dObj.setDate(1);
                heading = DT.formateDateTime("MMM/ /YYYY", "/", dObj);
                startDate = DT.formateDateTime("YYYY/-/MM/-/DD/ 00:00", "/", dObj);
                dObj.setMonth(dObj.getMonth()+1);
                dObj.setDate(0);
                endDate = DT.formateDateTime("YYYY/-/MM/-/DD/ 23:59", "/", dObj);
            } else {
                continue;
            }
            if (temp.indexOf(heading) < 0) {
                monthlyDateSelection.push({"dateRange": [startDate, endDate], "dateHeading": heading});
                temp.push(heading);
            }
        }
        /*Yearly Date Selection*/
        temp = [];
        for (i=0; i<allDate.length; i++) {
            dObj = DT.getDateObj(allDate[i]);
            if (dObj !== null) {
                dObj.setDate(1);
                heading = DT.formateDateTime("YYYY", "/", dObj);
                startDate = heading +"-01-01 00:00";
                endDate = heading +"-12-31 23:59";
            } else {
                continue;
            }
            if (temp.indexOf(heading) < 0) {
                yearlyDateSelection.push({"dateRange": [startDate, endDate], "dateHeading": heading});
                temp.push(heading);
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
    _getList3Id: function(name, index, allId, configId) {
        if ($S.isStringV2(name) && $S.isNumeric(index) && $S.isArray(allId)) {
            if ($S.isStringV2(configId) && allId.indexOf(configId) < 0) {
                return configId;
            }
            if (allId.indexOf(name + "-name-" + index) >= 0) {
                return name + "-name-" + index + "-" + index;
            } else {
                return name + "-name-" + index;
            }
        }
        return "invalid-id";
    },
    getList3Data: function(DataHandler, list3NameIdentifier) {
        if (!this._isValidDataHandler(DataHandler) || !$S.isFunction(DataHandler.getMetaData) || !$S.isFunction(DataHandler.getCurrentAppData) || !$S.isFunction(DataHandler.getPathParamsData)) {
            return [];
        }
        if (!$S.isStringV2(list3NameIdentifier)) {
            return [];
        }
        var pageName = DataHandler.getPathParamsData("pageName", "");
        if (this.isPageDisabled(DataHandler, pageName)) {
            return [];
        }
        var name = list3NameIdentifier;
        var metaData = DataHandler.getMetaData({});
        var currentAppData = DataHandler.getCurrentAppData({});
        var list3Data = $S.findParam([currentAppData, metaData], name, []);
        var temp = [], id;
        if ($S.isArray(list3Data)) {
            for (var i = 0; i < list3Data.length; i++) {
                if ($S.isObject(list3Data[i])) {
                    id = this._getList3Id(name, i, temp, list3Data[i].name);
                    temp.push(id);
                    list3Data[i]["name"] = id;

                }
            }
        }
        return list3Data;
    },
});
})($S);

export default CommonDataHandler;
