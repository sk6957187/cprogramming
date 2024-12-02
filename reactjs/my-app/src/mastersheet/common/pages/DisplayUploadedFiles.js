import $S from "../../../interface/stack.js";
import DataHandler from "../DataHandler";
// import DataHandlerV2 from "../DataHandlerV2";
import TemplateHandler from "../template/TemplateHandler";
import Config from "../Config";

import CommonConfig from "../../../common/app/common/CommonConfig";
import TemplateHelper from "../../../common/TemplateHelper";
// import FormHandler from "./FormHandler";
// import DBViewDataHandler from "../../../common/app/common/DBViewDataHandler";


var DisplayUploadedFiles;

(function($S){
// var DT = $S.getDT();

DisplayUploadedFiles = function(arg) {
    return new DisplayUploadedFiles.fn.init(arg);
};
DisplayUploadedFiles.fn = DisplayUploadedFiles.prototype = {
    constructor: DisplayUploadedFiles,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};
$S.extendObject(DisplayUploadedFiles);
DisplayUploadedFiles.extend({
    _getFileDisplayAsCommentOrLink: function(pageName, data, loginUsername, subject, heading) {
        var fileTemplate = TemplateHandler.getTemplate("file_details_as_comment_or_link");
        var buttonName = "delete_file.form.button";
        // We could not implement delete because
        // delete will only work when file exist
        var addedBy = "";//data.addedBy;
        var textReplaceParam = {"heading": heading};
        if ([Config.projectId].indexOf(pageName) >= 0) {
            if ($S.isStringV2(subject)) {
                textReplaceParam["subject"] = subject;
            }
            if (loginUsername === addedBy) {
                TemplateHelper.removeClassTemplate(fileTemplate, buttonName, "disabled");
                TemplateHelper.addClassTemplate(fileTemplate, buttonName, "text-danger");
            }
        }
        TemplateHelper.updateTemplateText(fileTemplate, textReplaceParam);
        var hrefReplaceParam = {};
        hrefReplaceParam["open_in_new_tab.href"] = heading;
        for(var key in hrefReplaceParam) {
            TemplateHelper.setTemplateAttr(fileTemplate, key, "href", hrefReplaceParam[key]);
        }
        return fileTemplate;
    },
    getFileDisplayTemplate: function(pageName, data, loginUsername) {
        if (!$S.isObject(data)) {
            data = {};
        }
        var fileTemplate = null;
        var fileTableName = DataHandler.getTableName("fileTable");
        var linkTableName = DataHandler.getTableName("projectLink");
        var commentTableName = DataHandler.getTableName("projectComment");
        var subject = data["subject"];
        var filename = data["filename"];
        var valueReplaceParam = {"view_file.unique_id": data.tableUniqueId, "delete_file.form": data.tableUniqueId};
        if (data["tableName"] === fileTableName) {
            fileTemplate = this.getFileDisplayTemplateV2(pageName, filename, loginUsername, subject);
            TemplateHelper.updateTemplateValue(fileTemplate, valueReplaceParam);
        } else if (data["tableName"] === linkTableName) {
            fileTemplate = this._getFileDisplayAsCommentOrLink(pageName, data, loginUsername, subject, filename);
            TemplateHelper.updateTemplateValue(fileTemplate, valueReplaceParam);
            TemplateHelper.removeClassTemplate(fileTemplate, "file-action-field", "d-none");
        } else if (data["tableName"] === commentTableName) {
            fileTemplate = this._getFileDisplayAsCommentOrLink(pageName, data, loginUsername, subject, filename);
            TemplateHelper.updateTemplateValue(fileTemplate, valueReplaceParam);
        }
        return fileTemplate;
    },
    getFileDisplayTemplateV2: function(pageName, filePath, loginUsername, subject) {
        var fileTemplate = TemplateHandler.getTemplate("file_details");
        var fileName = "";
        var temp, key, fileUsername;
        var isValidFileData = false;
        if ($S.isStringV2(filePath)) {
            temp = filePath.split("/");
            if (temp.length === 2) {
                isValidFileData = true;
                fileUsername = temp[0];
                fileName = temp[1];
            }
        }
        var textReplaceParam = {"heading": fileName};
        var hrefReplaceParam = {};
        var buttonName = "delete_file.form.button";
        if ([Config.projectId].indexOf(pageName) >= 0) {
            if ($S.isStringV2(subject)) {
                textReplaceParam["subject"] = subject;
            }
            if (loginUsername === fileUsername) {
                TemplateHelper.removeClassTemplate(fileTemplate, buttonName, "disabled");
                TemplateHelper.addClassTemplate(fileTemplate, buttonName, "text-danger");
            }
        }
        hrefReplaceParam["open_in_new_tab.href"] = CommonConfig.baseApi + "/view/file/" + filePath + "?u=" + loginUsername;
        hrefReplaceParam["download.href"] = CommonConfig.baseApi + "/download/file/" + filePath + "?u=" + loginUsername;
        TemplateHelper.updateTemplateText(fileTemplate, textReplaceParam);
        if (isValidFileData) {
            for(key in hrefReplaceParam) {
                TemplateHelper.setTemplateAttr(fileTemplate, key, "href", hrefReplaceParam[key]);
            }
        } else {
            TemplateHelper.addClassTemplate(fileTemplate, "file-action-field", "d-none");
        }
        return fileTemplate;
    }
});
})($S);

export default DisplayUploadedFiles;
