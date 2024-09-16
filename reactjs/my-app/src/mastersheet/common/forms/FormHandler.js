import $S from "../../../interface/stack.js";
import DataHandler from "../DataHandler";
import DataHandlerV2 from "../DataHandlerV2";
import Config from "../Config";

import TemplateHelper from "../../../common/TemplateHelper";
import AppHandler from "../../../common/app/common/AppHandler";
import CommonConfig from "../../../common/app/common/CommonConfig";
import CommonDataHandler from "../../../common/app/common/CommonDataHandler";


import FormHandlerUploadFile from "./FormHandlerUploadFile";
import FormHandlerAddProjectComment from "./FormHandlerAddProjectComment";
import FormHandlerAddProjectFiles from "./FormHandlerAddProjectFiles";

var FormHandler;

(function($S){
var DT = $S.getDT();

FormHandler = function(arg) {
    return new FormHandler.fn.init(arg);
};
FormHandler.fn = FormHandler.prototype = {
    constructor: FormHandler,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};
$S.extendObject(FormHandler);
FormHandler.extend({
    GetAleartMessage: function(key, value) {
        var messageMapping = DataHandler.getAppData("messageMapping", {});
        return CommonDataHandler.getAleartMessage(messageMapping, key);
    },
    FormateString: function(str) {
        return AppHandler.FormateString(str);
    },
    GetUniqueId: function() {
        return AppHandler.GetUniqueId();
    },
    IsResponseFailure: function(response, dafaultMessage) {
        return AppHandler.IsResponseFailure(response, dafaultMessage);
    }
});
FormHandler.extend({
    _getFormTemplateName: function(pageName, formType) {
        var formTemplateName = "formTemplate";
        if ($S.isStringV2(formType)) {
            formTemplateName = formType + "." + formTemplateName;
        }
        return formTemplateName;
    },
    _getFormName: function(pageName, formType) {
        var formName = "formName";
        if ($S.isStringV2(formType)) {
            formName = formType + "." + formName;
        }
        return formName;
    },
    _updateDynamicVariableFields: function(formName, formTemplate) {
        if (!$S.isStringV2(formName)) {
            return false;
        }
        if (!$S.isObjectV2(formTemplate) && !$S.isArrayV2(formTemplate)) {
            return false;
        }
        var variableFields = DataHandler.getAppData(formName + ".variableFields", {});
        if ($S.isObjectV2(variableFields)) {
            for (var key in variableFields) {
                variableFields[key] = DataHandler.getAppData(variableFields[key], []);
                if ($S.isObjectV2(variableFields[key]) || $S.isArrayV2(variableFields[key])) {
                    TemplateHelper.updateTemplateText(formTemplate, variableFields);
                }
            }
            return true;
        }
        return false;
    },
    getGenericTemplate: function(pageName, formType, formIdentifier) {
        // FormType parameter used for finding proper id1Page form
        // As each id1 may have different form types
        if (DataHandlerV2.isDisabled("form", formIdentifier)) {
            return null;
        }
        var formTemplateName = this._getFormTemplateName(pageName, formType);
        var formName = this._getFormName(pageName, formType);
        var formTemplate = DataHandler.getAppData(pageName + "." + formTemplateName, null);
        var finalFormName = DataHandler.getAppData(pageName + "." + formName, "");
        this._updateDynamicVariableFields(finalFormName, formTemplate);
        var validationData = null, status = null;
        if ($S.isStringV2(finalFormName)) {
            validationData = DataHandler.getAppData(finalFormName + ".validationData");
            status = DataHandler.getData("addentry.submitStatus", "");
        }
        formTemplate = CommonDataHandler.getFormTemplate(formTemplate, validationData, "addentry.submitStatus", status);
        return formTemplate;
    },
    _generateStringFromPattern: function(tableName, dynamicTableFileName, dynamicValue) {
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
    getTableNameFile: function(tableName) {
        var dynamicTableFileName = DataHandler.getAppData("dynamicTableFileName", []);
        var dynamicTableParameter = DataHandler.getAppData("dynamicTableParameter", []);
        var dynamicValue = CommonDataHandler.getFieldsData(dynamicTableParameter, "");
        return this._generateStringFromPattern(tableName, dynamicTableFileName, dynamicValue);
    },
    submitGenericForm: function(pageName, formName, formType, callback) {
        var status = DataHandler.getData("addentry.submitStatus", "");
        if (status === CommonConfig.IN_PROGRESS) {
            return null;
        }
        var tableNameKey = formName
        if ($S.isStringV2(formType)) {
            tableNameKey += "." + formType;
        }
        var requiredKeys = DataHandler.getAppData(formName + ".requiredKeys", []);
        var validationData = DataHandler.getAppData(formName + ".validationData", {});
        var tableName = DataHandler.getTableName(tableNameKey + ".tableName", "");
        var messageMapping = DataHandler.getAppData("messageMapping", {});
        var configMessageMapping = Config.getConfigData("messageMapping", {});
        var filename = this.getTableNameFile(tableName);
        if ($S.isObject(messageMapping)) {
            messageMapping = Object.assign(configMessageMapping, messageMapping);
        } else {
            messageMapping = configMessageMapping;
        }
        CommonDataHandler.submitForm(pageName, formName, tableName, filename, messageMapping, requiredKeys, validationData, function(status) {
            DataHandler.setData("addentry.submitStatus", status);
            $S.callMethod(callback);
        });
    }
});
FormHandler.extend({
    submitAddProjectComment: function(pageName, callback) {
        FormHandlerAddProjectComment.submit(pageName, callback);
    },
    submitUploadFile: function(pageName, callback) {
        FormHandlerUploadFile.submit(callback);
    },
    submitAddLink: function(pageName, callback) {
        FormHandlerUploadFile.submitAddLink(pageName, callback);
    },
    submitAddProjectFiles: function(pageName, callback) {
        FormHandlerAddProjectFiles.submit(pageName, callback);
    },
    submitDeleteFile: function(pageName, uniqueId, callback) {
        if (!$S.isStringV2(uniqueId)) {
            return;
        }
        var action = "";
        var deleteFileValue = DataHandler.getFieldsData("delete_file.form.button", "");
        var removeFileValue = DataHandler.getFieldsData("remove_file.form.button", "");
        if (deleteFileValue === "delete") {
            action = "delete";
        } else if (removeFileValue === "remove") {
            action = "remove";
        }
        if (["delete", "remove"].indexOf(action) < 0) {
            alert("Config error.");
            return;
        }
        var fileTableName = DataHandler.getTableName("fileTable");
        var filePath = DataHandlerV2.getDisplayName(fileTableName, "tableUniqueId", uniqueId, "filename");
        var deleting = window.confirm("Are you sure? You want to " + action + ": " + filePath);
        if (deleting) {
            FormHandlerUploadFile.deleteFile(uniqueId, filePath, action, callback);
        }
    },
    _handleDeleteResponse: function(callback, state, response) {
        var msg = "";
        if (state === "completed") {
            if ($S.isObject(response)) {
                if (response.status === "SUCCESS") {
                    $S.callMethod(callback);
                } else {
                    msg = CommonDataHandler.getErrorStringFromResponse(response);
                    alert(msg);
                }
            }
        }
    },
    deleteText: function(deleteId, callback) {
        if (!$S.isStringV2(deleteId)) {
            deleteId = "";
        }
        var postData = {};
        postData["deleteId"] = deleteId;
        $S.callMethodV2(this._handleDeleteResponse, callback, "in_progress");
        $S.sendPostRequest(CommonConfig.JQ, CommonConfig.getApiUrl("deleteText", null, true), postData, function(ajax, status, response) {
            DataHandler.setData("addentry.submitStatus", "completed");
            if (status === "FAILURE") {
                AppHandler.TrackApiRequest("deleteText", "FAILURE");
                alert("Error in uploading data, Please Try again.");
            } else {
                AppHandler.TrackApiRequest("deleteText", "SUCCESS");
            }
            $S.callMethodV3(FormHandler._handleDeleteResponse, callback, "completed", response);
        });
    },
    saveProjectContent: function(pid, arg1, arg2, tableName, filename, gaTrackingName, callback) {
        if (!$S.isStringV2(gaTrackingName)) {
            gaTrackingName = "projectContent";
        }
        if (!$S.isStringV2(pid)) {
            pid = "";
        }
        if (!$S.isStringV2(arg1)) {
            arg1 = "";
        }
        if (!$S.isStringV2(arg2)) {
            arg2 = "";
        }
        var url = CommonConfig.getApiUrl("getAddTextApi", null, true);
        if (!$S.isString(url)) {
            return;
        }
        if (!$S.isStringV2(tableName)) {
            alert(FormHandler.GetAleartMessage("tableName.invalid"));
            return;
        }
        if (!$S.isStringV2(filename)) {
            alert(FormHandler.GetAleartMessage("filename.invalid"));
            return;
        }
        var resultData = [pid, arg1, arg2];
        var postData = {};
        postData["text"] = [resultData.join(",")];
        postData["tableName"] = tableName;
        postData["filename"] = filename;
        DataHandler.setData("addentry.submitStatus", "in_progress");
        $S.callMethodV1(callback, "in_progress");
        $S.sendPostRequest(CommonConfig.JQ, url, postData, function(ajax, status, response) {
            DataHandler.setData("addentry.submitStatus", "completed");
            if (status === "FAILURE" || !$S.isObject(response) || response.status === "FAILURE") {
                AppHandler.TrackApiRequest(gaTrackingName, "FAILURE");
                alert("Error in uploading data, Please Try again.");
                $S.callMethodV2(callback, "completed", "FAILURE");
            } else {
                AppHandler.TrackApiRequest(gaTrackingName, "SUCCESS");
                $S.callMethodV2(callback, "completed", "SUCCESS");
                AppHandler.LazyReload(250);
            }
        });
    }
});
FormHandler.extend({
    updateBtnStatus: function(template) {
        var status = DataHandler.getData("addentry.submitStatus", "");
        if (status === "in_progress") {
            TemplateHelper.addClassTemplate(template, "addentry.submitStatus", "btn-secondary disabled");
            TemplateHelper.removeClassTemplate(template, "addentry.submitStatus", "btn-primary");
        } else {
            TemplateHelper.removeClassTemplate(template, "addentry.submitStatus", "disabled");
            TemplateHelper.removeClassTemplate(template, "addentry.submitStatus", "btn-secondary");
            TemplateHelper.addClassTemplate(template, "addentry.submitStatus", "btn-primary");
        }
    },
    getUploadFileTemplate: function(pageName) {
        if (DataHandlerV2.isDisabled("form", "fileUploadForm")) {
            return null;
        }
        var uploadFileTemplate = FormHandlerUploadFile.getUploadFileTemplate();
        return uploadFileTemplate;
    },
    getAddLinkTemplate: function(pageName) {
        if (DataHandlerV2.isDisabled("form", "projectLinkForm")) {
            return null;
        }
        var uploadFileTemplate = FormHandlerUploadFile.getAddLinkTemplate(pageName);
        return uploadFileTemplate;
    },
    getAddProjectCommentTemplate: function(pageName) {
        if (DataHandlerV2.isDisabled("form", "projectCommentForm")) {
            return null;
        }
        var template = FormHandlerAddProjectComment.getFormTemplate(pageName);
        this.updateBtnStatus(template);
        return template;
    },
    getAddProjectFilesTemplate: function(pageName, fileInfoData, allProjects) {
        var template = FormHandlerAddProjectFiles.getFormTemplate(pageName, fileInfoData, allProjects);
        this.updateBtnStatus(template);
        return template;
    }
});
})($S);

export default FormHandler;
