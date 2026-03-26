import $S from "../../../interface/stack.js";
import DataHandler from "../DataHandler";
import TemplateHandler from "../template/TemplateHandler";
import Config from "../Config";

import AppHandler from "../../../common/app/common/AppHandler";
import TemplateHelper from "../../../common/TemplateHelper";
// import CommonConfig from "../../../common/app/common/CommonConfig";
import FormHandler from "./FormHandler";

var FormHandlerAddProjectComment;

(function($S){
// var DT = $S.getDT();

FormHandlerAddProjectComment = function(arg) {
    return new FormHandlerAddProjectComment.fn.init(arg);
};
FormHandlerAddProjectComment.fn = FormHandlerAddProjectComment.prototype = {
    constructor: FormHandlerAddProjectComment,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};
$S.extendObject(FormHandlerAddProjectComment);
FormHandlerAddProjectComment.extend({
    getFormTemplate: function(pageName) {
        var template = TemplateHandler.getTemplate("addCommentProjectTemplate");
        var requiredKeys = [Config.fieldsKey.AddProjectComment];
        var formValue = {};
        var fieldsData = DataHandler.getData("fieldsData", {});
        if (!$S.isObject(fieldsData)) {
            fieldsData = {};
        }
        for (var i=0; i<requiredKeys.length; i++) {
            formValue[requiredKeys[i]] = fieldsData[requiredKeys[i]];
        }
        TemplateHelper.updateTemplateValue(template, formValue);
        return template;
    },
    submit: function(pageName, callback) {
        var requiredKey = Config.fieldsKey.AddProjectComment;
        var fieldsData = DataHandler.getData("fieldsData", {});
        var isFormValid = true, commentText;
        var pid = DataHandler.getPathParamsData("pid", "");
        var tableName = DataHandler.getTableName("projectComment");
        var filename = FormHandler.getTableNameFile(tableName);
        if (!$S.isObject(fieldsData)) {
            fieldsData = {};
        }
        commentText = fieldsData[requiredKey];
        if (!$S.isStringV2(commentText)) {
            isFormValid = false;
            alert(FormHandler.GetAleartMessage(requiredKey));
        }
        commentText = AppHandler.ReplaceComma(commentText);
        if (isFormValid) {
            FormHandler.saveProjectContent(pid, "Comment", commentText, tableName, filename, "addProjectComment", function(formStatus, resultStatus) {
                $S.callMethod(callback);
            });
        }
    }
});
})($S);

export default FormHandlerAddProjectComment;
