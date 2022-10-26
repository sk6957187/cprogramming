import $S from "../../../interface/stack.js";
import Template from "./Template";

import Config from "../Config";
import DataHandler from "../DataHandler";
import DataHandlerV2 from "../DataHandlerV2";
import Mastersheet from "../Mastersheet";
import FormHandler from "../forms/FormHandler";

import PidPage from "../pages/PidPage";
import FeedbackPage from "../pages/FeedbackPage";


import TemplateHelper from "../../../common/TemplateHelper";
// import AppHandler from "../../../common/app/common/AppHandler";
import CommonDataHandler from "../../../common/app/common/CommonDataHandler";
import CommonConfig from "../../../common/app/common/CommonConfig";
import DBViewDataHandler from "../../../common/app/common/DBViewDataHandler";
import DBViewTemplateHandler from "../../../common/app/common/DBViewTemplateHandler";


var TemplateHandler;
(function($S){
// var DT = $S.getDT();
var loadingCount = 0;
TemplateHandler = function(arg) {
    return new TemplateHandler.fn.init(arg);
};
TemplateHandler.fn = TemplateHandler.prototype = {
    constructor: TemplateHandler,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(TemplateHandler);
DBViewTemplateHandler.UpdateTemplate("noDataFound", []);
TemplateHandler.extend({
    generateHomeRenderField: function(pageName, renderData) {
        // pageName = "home"
        var homeFields = [], i, linkTemplate;
        if ($S.isArray(renderData)) {
            for (i=0; i<renderData.length; i++) {
                if (!$S.isObject(renderData[i])) {
                    continue;
                }
                homeFields.push({"toUrl": this._getLink("projectId", renderData[i].tableUniqueId),
                        "toText": renderData[i].pName});
            }
        }
        var template = this.getHomeTemplatePartial("home");
        var genericTemplate;
        for (i = 0; i< homeFields.length; i++) {
            linkTemplate = this._getLinkTemplate(homeFields[i].toUrl, homeFields[i].toText);
            TemplateHelper.addItemInTextArray(template, "home.link", linkTemplate);
        }
        genericTemplate = FormHandler.getGenericTemplate(pageName, DataHandler.getAppData("form_type", ""), "generic_form0");
        if (!$S.isArrayV2(homeFields) && !$S.isArray(genericTemplate) && !$S.isObject(genericTemplate)) {
            template = this.getTemplate("noDataFound");
        } else {
            TemplateHelper.addItemInTextArray(template, "home.template", genericTemplate);
        }
        return template;
    }
});
TemplateHandler.extend({
    _generateFieldTable: function(tableData, tableName, resultPatternName, currentList3Data) {
        var resultPattern = DataHandler.getAppData(resultPatternName);
        var sortingFields = DataHandler.getData("sortingFields", []);
        var viewReloadOption = DataHandler.getAppData("enableReloadButton", false);
        var dbViewData = {};
        dbViewData[tableName] = {"tableData": tableData};
        var finalTable = DBViewDataHandler.GetFinalTable(dbViewData, resultPattern, null, null);
        finalTable = $S.sortResultV2(finalTable, sortingFields, "name");
        var htmlFields = DBViewTemplateHandler.GenerateDbViewRenderField(finalTable, currentList3Data, sortingFields, viewReloadOption);
        return htmlFields;
    }
});
TemplateHandler.extend({
    _getInvalidField: function(text) {
        var template = this.getTemplate("invalid-data");
        TemplateHelper.updateTemplateText(template, {"invalid-data.text": text});
        return template;
    },
    _getLinkTemplate: function(href, text) {
        var linkTemplate = this.getHomeTemplatePartial("link-field");
        TemplateHelper.setTemplateAttr(linkTemplate, "link-field.url", "href", href);
        TemplateHelper.updateTemplateText(linkTemplate, {"link-field.url": text});
        return linkTemplate;
    },
    _getLink: function(pageName, pid) {
        var link = "";
        var index = DataHandler.getPathParamsData("index", "0");
        if (pageName === "projectId") {
            link = CommonConfig.basepathname + "/" + index + "/pid/" + pid;
        } else {
            link = CommonConfig.basepathname + "/" + index;
            if (link === "") {
                link = "/" + index;
            }
        }
        return link;
    },
    generateProjectDetailsPage: function(pageName, renderData) {
        if (!$S.isObject(renderData)) {
            renderData = {};
        }
        if (!$S.isObject(renderData["pidRow"])) {
            renderData["pidRow"] = {};
        }
        var currentAppId = DataHandler.getPathParamsData("index", "");
        var template = this.getTemplate("projectId");
        var formName = DataHandlerV2.getFormNameByPageName(pageName);
        var tableName = DataHandler.getTableName("fileTable");
        if ($S.isStringV2(renderData["pidRow"]["form_type"])) {
            formName += "." + renderData["pidRow"]["form_type"];
        }
        var tableName2 = DataHandler.getTableName(formName + ".tableName", "");
        var uploadFileTableData = DataHandlerV2.getRenderTableDataV1(pageName);
        var generic1FormUploadedData = DataHandlerV2.getTableDataByAttr(tableName2, "pid", renderData["pidRow"]["tableUniqueId"]);
        generic1FormUploadedData = CommonDataHandler.applyRoleFilter(currentAppId, generic1FormUploadedData, "pageName:" + pageName + ".section.mapping");
        PidPage.updateDependentAttr(pageName, generic1FormUploadedData);
        generic1FormUploadedData = DataHandlerV2.generateFilterOptionAndApplyFilter(pageName, generic1FormUploadedData);
        var resultPatternName = DataHandlerV2.getResultPatternNameByPageName(pageName);
        var uploadFileData = this._generateFieldTable(uploadFileTableData, tableName, "pageName:projectId.resultPatternUploadedFiles");
        var generic1FormUploadedTable = PidPage.getRenderTable(pageName, tableName2, resultPatternName, generic1FormUploadedData);
        var uploadFileTemplate = FormHandler.getUploadFileTemplate(pageName);
        var addCommentTemplate = FormHandler.getAddProjectCommentTemplate(pageName);
        var genericTemplate = FormHandler.getGenericTemplate(pageName, renderData["pidRow"]["form_type"], "generic_form1");
        var addLinkTemplate = FormHandler.getAddLinkTemplate(pageName);
        if (!(($S.isArray(uploadFileTableData) && uploadFileTableData.length > 0) || ($S.isArray(generic1FormUploadedData) && generic1FormUploadedData.length > 0))) {
            if (uploadFileTemplate === null && addLinkTemplate === null && addCommentTemplate === null && genericTemplate === null) {
                return this.getTemplate("noDataFound");
            } else if (DataHandlerV2.isFilterEnabled(pageName)) {
                generic1FormUploadedTable = this.getTemplate("noDataFound");
            }
        }
        if (!$S.isArray(uploadFileData) || uploadFileData.length === 0) {
            uploadFileData = uploadFileTemplate;
            uploadFileTemplate = null;
        }
        TemplateHelper.updateTemplateText(template, {"projectId.pName": renderData["pidRow"]["pName"]});
        TemplateHelper.addItemInTextArray(template, "projectId.generic1-table", generic1FormUploadedTable);
        TemplateHelper.addItemInTextArray(template, "projectId.uploaded_files", uploadFileData);
        TemplateHelper.addItemInTextArray(template, "projectId.upload_file", uploadFileTemplate);
        TemplateHelper.addItemInTextArray(template, "projectId.upload_file", addLinkTemplate);
        TemplateHelper.addItemInTextArray(template, "pageName:projectId.otherTemplate", addCommentTemplate);
        TemplateHelper.addItemInTextArray(template, "pageName:projectId.otherTemplate", genericTemplate);
        return template;
    },
    generateId1Page: function(pageName, renderData) {
        if (!$S.isObject(renderData)) {
            renderData = {};
        }
        if (!$S.isObject(renderData["pidRow"])) {
            renderData["pidRow"] = {};
        }
        if (!$S.isObject(renderData["id1Row"])) {
            renderData["id1Row"] = {};
        }
        var template = this.getTemplate("id1Page");
        var formName = DataHandlerV2.getFormNameByPageName(pageName);
        if ($S.isStringV2(renderData["id1Row"]["form_type"])) {
            formName += "." + renderData["id1Row"]["form_type"];
        }
        var tableName = DataHandler.getTableName(formName + ".tableName", "");
        var generic2FormUploadedData = DataHandlerV2.getTableDataV4(pageName, tableName);
        var genericTemplate = null;
        if (FeedbackPage.isFormDisplayEnable(renderData["pidRow"], renderData["id1Row"], generic2FormUploadedData)) {
            genericTemplate = FormHandler.getGenericTemplate(pageName, renderData["id1Row"]["form_type"], "generic_form2");
        }
        var preDefinedPattern = FeedbackPage.getPreDefinedPattern(renderData["id1Row"]);
        if (!($S.isArray(generic2FormUploadedData) && generic2FormUploadedData.length > 0)) {
            if (genericTemplate === null && preDefinedPattern === null) {
                return this.getTemplate("noDataFound");
            }
        }
        var resultPatternName = DataHandlerV2.getResultPatternNameByPageName(pageName);
        var generic2FormUploadedTable = this._generateFieldTable(generic2FormUploadedData, tableName, resultPatternName);
        TemplateHelper.updateTemplateText(template, {"id1Page.pName": renderData["pidRow"]["pName"]});
        TemplateHelper.addItemInTextArray(template, "id1Page.preDefinedPattern", preDefinedPattern);
        TemplateHelper.addItemInTextArray(template, "id1Page.generic2-table", generic2FormUploadedTable);
        TemplateHelper.addItemInTextArray(template, "pageName:id1Page.formTemplate", genericTemplate);
        return template;
    },
    getViewPageTemplate: function(renderData) {
        var pageField;
        var currentList3Data = DataHandler.getCurrentList3Data();
        var sortingFields = DataHandler.getData("sortingFields", []);
        var viewReloadOption = DataHandler.getAppData("enableReloadButton", false);
        if (!$S.isArray(renderData) || renderData.length === 0) {
            pageField = TemplateHandler.getTemplate("noDataFound");
        } else {
            pageField = DBViewTemplateHandler.GenerateDbViewRenderField(renderData, currentList3Data, sortingFields, viewReloadOption);
        }
        var template = this.getTemplate("viewPage");
        TemplateHelper.addItemInTextArray(template, "viewPage.field", pageField);
        return template;
    }
});

TemplateHandler.extend({
    getTemplate: function(pageName) {
        if (Template[pageName]) {
            return $S.clone(Template[pageName]);
        }
        return $S.clone(Template["templateNotFound"]);
    },
    getHomeTemplatePartial: function(templateName) {
        var template = this.getTemplate(templateName);
        var temp;
        if (templateName === "home") {
            temp = DataHandler.getAppData("template.home");
        }
        if (templateName === "link-field") {
            temp = DataHandler.getAppData("template.home.link-field");
        }
        if ($S.isObject(temp) || $S.isArray(temp)) {
            template = temp;
        }
        return template;
    },
    getGoBackLinkTemplate: function(pageName) {
        var template = this.getTemplate("goBackLink");
        var backUrl = "";
        var pid = DataHandler.getPathParamsData("pid");
        switch(pageName) {
            case "id1Page":
                backUrl = this._getLink("projectId", pid);
            break;
            case "projectId":
            default:
                backUrl = this._getLink();
            break;
        }
        TemplateHelper.setTemplateAttr(template, "goBackLink.a", "href", backUrl);
        return template;
    },
    GetPageRenderField: function(dataLoadStatus, renderData, pageName) {
        var renderField;
        if (!dataLoadStatus) {
            renderField = this.getTemplate("loading");
            $S.log("loadingCount: " + (loadingCount++));
            return renderField;
        }
        var temp;
        var currentAppId = DataHandler.getPathParamsData("index", "");
        if ($S.isObject(renderData) && renderData.status === "FAILURE") {
            return this._getInvalidField(renderData.reason);
        } else {
            switch(pageName) {
                case "home":
                    // renderField = this.generateHomeRenderField(pageName, renderData);
                    renderField = Mastersheet.getPageFromData(pageName, renderData);
                break;
                case "projectId":
                    renderField = this.generateProjectDetailsPage(pageName, renderData);
                break;
                case "id1Page":
                    if ($S.isObject(renderData["id1Row"])) {
                        temp = CommonDataHandler.applyRoleFilter(currentAppId, [renderData["id1Row"]], "pageName:projectId.section.mapping");
                        if (!$S.isArray(temp) || temp.length === 0) {
                            return this.getTemplate("noDataFound");
                        }
                        PidPage.updateDependentAttr(pageName, [renderData["id1Row"]]);
                    }
                    renderField = this.generateId1Page(pageName, renderData);
                break;
                case "displayPage":
                    renderField = this.getViewPageTemplate(renderData);
                break;
                case "viewPage":
                    renderField = this.getViewPageTemplate(renderData);
                break;
                case "manageFiles":
                    renderField = this.getViewPageTemplate(renderData);
                break;
                case "noMatch":
                default:
                    renderField = this.getTemplate("noMatch");
                break;
            }
        }
        var isGoBackLinkEnable = DataHandler.getAppData(pageName + ".goBackLinkEnable", false);
        var isGoBackRowEnable = DataHandler.getAppData(pageName + ".goBackRowEnable", false);
        if ($S.isBooleanTrue(isGoBackRowEnable)) {
            TemplateHelper.removeClassTemplate(renderField, pageName + ".goBackRow", "d-none");
        }
        if ($S.isBooleanTrue(isGoBackLinkEnable)) {
            var goBackLink = this.getGoBackLinkTemplate(pageName);
            TemplateHelper.updateTemplateText(renderField, {"goBackRow.goBackLink": goBackLink});
        }
        return renderField;
    },
    GetHeadingField: function(headingText) {
        return [$S.clone(Config.headingJson), {"tag": "div.center", "text": $S.clone(Config.afterLoginLinkJson)}];
    }
});

})($S);

export default TemplateHandler;
