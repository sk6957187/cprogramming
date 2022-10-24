import $S from "../../../interface/stack.js";
import DataHandler from "../DataHandler";
import DataHandlerV2 from "../DataHandlerV2";
import TemplateHandler from "../template/TemplateHandler";
import Config from "../Config";

// import AppHandler from "../../../common/app/common/AppHandler";
import TemplateHelper from "../../../common/TemplateHelper";
// import CommonConfig from "../../../common/app/common/CommonConfig";
import FormHandler from "./FormHandler";
// import FormHandlerUploadFile from "./FormHandlerUploadFile";


var FormHandlerAddProjectFiles;

(function($S){
// var DT = $S.getDT();

FormHandlerAddProjectFiles = function(arg) {
    return new FormHandlerAddProjectFiles.fn.init(arg);
};
FormHandlerAddProjectFiles.fn = FormHandlerAddProjectFiles.prototype = {
    constructor: FormHandlerAddProjectFiles,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};
$S.extendObject(FormHandlerAddProjectFiles);
FormHandlerAddProjectFiles.extend({
    getFormTemplate: function(pageName, fileInfoData, allProjects) {
        if (!$S.isObject(fileInfoData)) {
            fileInfoData = {};
        }
        var template = TemplateHandler.getTemplate("addProjectFilesTemplate");
        var dropdownList = [];
        var filepath = fileInfoData["filepath"];
        if ($S.isStringV2(filepath) && $S.isArray(allProjects) && allProjects.length > 0) {
            dropdownList.push({"value": "", "text": "Select..."});
            for(var i=0; i<allProjects.length; i++) {
                dropdownList.push({"value": filepath + "::" + allProjects[i]["tableUniqueId"], "text": allProjects[i].pName})
            }
            TemplateHelper.updateTemplateText(template, {"add-project-files-form.project": dropdownList});
        } else {
            template = null;
        }
        return template;
    },
    submit: function(pageName, callback) {
        var requiredKeys = [Config.fieldsKey.ProjectFileKey];
        var fieldsData = DataHandler.getData("fieldsData", {});
        var i, isFormValid = true, temp, value;
        if (!$S.isObject(fieldsData)) {
            fieldsData = {};
        }
        for (i=0; i<requiredKeys.length; i++) {
            temp = fieldsData[requiredKeys[i]];
            if (!$S.isStringV2(temp)) {
                isFormValid = false;
                alert(FormHandler.GetAleartMessage(requiredKeys[i]));
                return;
            }
            value = temp;
        }
        var subject, filepath, pid;
        var fileTableName = DataHandler.getTableName("fileTable");
        var projectTableName = DataHandler.getTableName("projectTable");
        var filename = FormHandler.getTableNameFile(fileTableName);;
        var valueArr = value.split("::");
        if (valueArr.length === 2) {
            filepath = valueArr[0];
            pid = valueArr[1];
        }
        var fileTable = DataHandlerV2.getTableDataByAttr(fileTableName, "filename", filepath);
        var projectTable = DataHandlerV2.getTableDataByAttr(projectTableName, "tableUniqueId", pid);
        if (!$S.isArray(projectTable) || projectTable.length !== 1 || !$S.isObject(projectTable[0])) {
            alert("Invalid project Id");
            return;
        }
        if ($S.isArray(fileTable) && fileTable.length > 0) {
            if ($S.isObject(fileTable[fileTable.length-1])) {
                subject = fileTable[fileTable.length-1].subject;
            }
        }
        if (!$S.isStringV2(subject)) {
            subject = "File added to Project " + projectTable[0].pName;
        }
        if (isFormValid) {
            FormHandler.saveProjectContent(pid, subject, filepath, fileTableName, filename, "addNewProjectFile", function(formStatus, resultStatus) {
                $S.callMethod(callback);
            });
        }
    }
});
})($S);

export default FormHandlerAddProjectFiles;
