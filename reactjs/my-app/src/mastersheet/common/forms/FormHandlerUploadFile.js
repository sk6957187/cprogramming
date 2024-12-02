import $S from "../../../interface/stack.js";
import DataHandler from "../DataHandler";
import DataHandlerV2 from "../DataHandlerV2";
import Config from "../Config";

import UploadFileFormHandler from "../../../common/app/common/upload_file/UploadFileFormHandler";
import AppHandler from "../../../common/app/common/AppHandler";
import TemplateHelper from "../../../common/TemplateHelper";
import CommonConfig from "../../../common/app/common/CommonConfig";
import FormHandler from "./FormHandler";

var FormHandlerUploadFile;

UploadFileFormHandler.updateTemplate("upload_file.message", "text", Config.uploadFileInstruction);

(function($S){
// var DT = $S.getDT();

FormHandlerUploadFile = function(arg) {
    return new FormHandlerUploadFile.fn.init(arg);
};
FormHandlerUploadFile.fn = FormHandlerUploadFile.prototype = {
    constructor: FormHandlerUploadFile,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};
$S.extendObject(FormHandlerUploadFile);
FormHandlerUploadFile.extend({
    getUploadFileTemplate: function(pageName) {
        var formSubmitStatus = DataHandler.getData("addentry.submitStatus", "");
        var percentComplete = DataHandler.getFieldsData("upload_file.percentComplete", 0);
        var subject = DataHandler.getFieldsData("upload_file.subject", "");
        var uploadFileTemplate = UploadFileFormHandler.getUploadFileTemplate("v2", formSubmitStatus, percentComplete, subject);
        TemplateHelper.addClassTemplate(uploadFileTemplate, "upload_file.heading.div", "d-none");
        return uploadFileTemplate;
    },
    getAddLinkTemplate: function(pageName) {
        var formSubmitStatus = DataHandler.getData("addentry.submitStatus", "");
        var subject = DataHandler.getFieldsData("upload_file_link.subject", "");
        var heading = DataHandler.getFieldsData("upload_file_link.heading", "");
        var uploadFileTemplate = UploadFileFormHandler.getUploadFileTemplate("v2", formSubmitStatus, 0, subject, heading);
        var updateFieldParameter = [];
        updateFieldParameter.push(["upload_file.subject", "name", "upload_file_link.subject"]);
        updateFieldParameter.push(["upload_file.heading", "name", "upload_file_link.heading"]);
        updateFieldParameter.push(["upload_file.subject_label", "text", "Link Text"]);
        updateFieldParameter.push(["upload_file.heading_label", "text", "Link Url"]);
        updateFieldParameter.push(["upload_file_form", "id", "upload_file_form_link"]);
        updateFieldParameter.push(["upload_file_form", "value", "upload_file_form_link"]);
        updateFieldParameter.push(["upload_file_form", "name", "upload_file_form_link"]);
        updateFieldParameter.push(["upload_file.form_heading", "text", "Add link"]);
        TemplateHelper.addClassTemplate(uploadFileTemplate, "upload_file.file_field.div", "d-none");
        for(var i=0; i<updateFieldParameter.length; i++) {
            TemplateHelper.setTemplateAttr(uploadFileTemplate, updateFieldParameter[i][0], updateFieldParameter[i][1], updateFieldParameter[i][2]);
        }
        return uploadFileTemplate;
    },
    uploadFile: function(file, subject, callback) {
        var url = CommonConfig.getApiUrl("upload_file", null, true);
        if (!$S.isString(url)) {
            return;
        }
        var tableName = DataHandler.getTableName("fileTable");
        if (!$S.isStringV2(tableName)) {
            alert(FormHandler.GetAleartMessage("tableName.invalid"))
            return;
        }
        var filename = FormHandler.getTableNameFile(tableName);
        var pid = DataHandler.getPathParamsData("pid", "");
        UploadFileFormHandler.uploadFile(CommonConfig.JQ, url, file, function(formSubmitStatus, percentComplete, ajax, response) {
            if (formSubmitStatus === "in_progress") {
                DataHandler.setData("addentry.submitStatus", "in_progress");
                DataHandler.setFieldsData("upload_file.percentComplete", percentComplete);
                $S.callMethod(callback);
            } else {
                DataHandler.setData("addentry.submitStatus", "completed");
                $S.callMethod(callback);
                if ($S.isObject(response)) {
                    if (response.status === "SUCCESS") {
                        FormHandler.saveProjectContent(pid, subject, response.data.path, tableName, filename, "addInFileTable", function(formStatus, resultStatus) {
                            $S.callMethod(callback);
                        });
                    } else if (response.failureCode === "UNAUTHORIZED_USER") {
                        AppHandler.LazyReload(250);
                    }
                }
            }
        });
    },
    submit: function(callback) {
        var key = Config.fieldsKey.UploadFile;
        var file = DataHandler.getData(key, false, true);
        var subject = DataHandler.getFieldsData("upload_file.subject", "");
        if ($S.isBooleanFalse(file)) {
            alert(FormHandler.GetAleartMessage(key));
            return;
        }
        if (!$S.isStringV2(subject)) {
            alert("Subject required.");
            return;
        }
        this.uploadFile(file, subject, callback);
    },
    submitAddLink: function(pageName, callback) {
        var requiredKeys = [Config.fieldsKey.AddLinkText, Config.fieldsKey.AddLinkUrl];
        var fieldsData = DataHandler.getData("fieldsData", {});
        var i, isFormValid = true, temp, formData = {};
        if (!$S.isObject(fieldsData)) {
            fieldsData = {};
        }
        for (i=0; i<requiredKeys.length; i++) {
            temp = fieldsData[requiredKeys[i]];
            if (!$S.isStringV2(temp)) {
                isFormValid = false;
                alert(FormHandler.GetAleartMessage(requiredKeys[i]));
                break;
            }
            formData[requiredKeys[i]] = AppHandler.ReplaceComma(temp);
        }
        if (isFormValid) {
            var pid = DataHandler.getPathParamsData("pid", "");
            var linkText = formData[Config.fieldsKey.AddLinkText];
            var linkUrl = formData[Config.fieldsKey.AddLinkUrl];
            var tableName = DataHandler.getTableName("projectLink");
            var filename = FormHandler.getTableNameFile(tableName);
            FormHandler.saveProjectContent(pid, linkText, linkUrl, tableName, filename, "addProjectLink", function(formStatus, resultStatus) {
                $S.callMethod(callback);
            });
        }
    },
    deleteFile: function(uniqueId, filePath, action, callback) {
        var url = CommonConfig.getApiUrl("delete_file", "", true);
        var postData = {};
        postData["filename"] = filePath;
        var message = "Error in delete file, Please Try again.";
        var fileTableName = DataHandler.getTableName("fileTable");
        var fileTable = DataHandlerV2.getTableDataByAttr(fileTableName, "filename", filePath);
        if ($S.isArray(fileTable)) {
            if (action === "remove") {
                FormHandler.deleteText(uniqueId, function() {
                    AppHandler.LazyReload(250);
                });
            } else if (fileTable.length > 1) {
                FormHandler.deleteText(uniqueId, function() {
                    AppHandler.LazyReload(250);
                });
            } else {
                $S.sendPostRequest(CommonConfig.JQ, url, postData, function(ajax, status, response) {
                    if (FormHandler.IsResponseFailure(response, message)) {
                        AppHandler.TrackApiRequest("deleteFile", "FAILURE");
                    } else {
                        AppHandler.TrackApiRequest("deleteFile", "SUCCESS");
                        FormHandler.deleteText(uniqueId, function() {
                            AppHandler.LazyReload(250);
                        });
                    }
                });
            }
        }
    }
});
})($S);

export default FormHandlerUploadFile;
