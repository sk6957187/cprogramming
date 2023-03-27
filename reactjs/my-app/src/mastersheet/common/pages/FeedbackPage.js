import $S from "../../../interface/stack.js";
// import TemplateHandler from "../common/TemplateHandler";
// import Template from "../common/Template";

// import Config from "./Config";
import DataHandler from "../DataHandler";
import DataHandlerV2 from "../DataHandlerV2";
// import FormHandler from "../forms/FormHandler";


import TemplateHelper from "../../../common/TemplateHelper";
// import AppHandler from "../../../common/app/common/AppHandler";
// import CommonDataHandler from "../../../common/app/common/CommonDataHandler";
// import CommonConfig from "../../common/app/common/CommonConfig";
// import DBViewDataHandler from "../../../common/app/common/DBViewDataHandler";
// import DBViewTemplateHandler from "../../../common/app/common/DBViewTemplateHandler";


var FeedbackPage;
(function($S){
// var DT = $S.getDT();
// var loadingCount = 0;
FeedbackPage = function(arg) {
    return new FeedbackPage.fn.init(arg);
};
FeedbackPage.fn = FeedbackPage.prototype = {
    constructor: FeedbackPage,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(FeedbackPage);

FeedbackPage.extend({
    _getDetailsLink: function(rowData) {
        if (!$S.isArray(rowData)) {
            return null;
        }
        for (var i=0; i<rowData.length; i++) {
            if ($S.isObject(rowData[i]) && rowData[i]["name"] === "details_link") {
                return {"value": rowData[i]["value"], "heading": rowData[i]["heading"]};
            }
        }
        return null;
    },
    _updateAttrV2: function(pageName, pid, rowData, colData) {
        var updateLink, hrefLink, hrefText, displayValue = "";
        var refColName = "status";
        if ($S.isObject(colData)) {
            if (colData["name"] === refColName) {
                if ($S.isBooleanTrue(colData["displayValue"])) {
                    displayValue = colData["value"];
                }
                updateLink = this._getDetailsLink(rowData);
                if ($S.isObject(updateLink)) {
                    hrefLink = updateLink["value"];
                    hrefText = updateLink["heading"];
                }
                if (!$S.isStringV2(hrefText)) {
                    hrefText = "Details";
                }
                if ($S.isStringV2(hrefLink)) {
                    colData["text"] = {
                        "tag": "div",
                        "text": [
                            {
                                "tag": "div.span",
                                "text": displayValue
                            },
                            {
                                "tag": "div",
                                "text": {
                                    "tag": "link",
                                    "href": hrefLink,
                                    "text": hrefText
                                }
                            }
                        ]
                    };
                }
            }
        }
    },
    _updateFieldAttrV2: function(pageName, pid, data) {
        if (!$S.isArray(data)) {
            return data;
        }
        for (var i=0; i<data.length; i++) {
            if (!$S.isArray(data[i])) {
                continue;
            }
            for(var j=0; j<data[i].length; j++) {
                this._updateAttrV2(pageName, pid, data[i], data[i][j]);
            }
        }
        return data;
    },
    updateStatusText: function(pageName, pid, tableData) {
        this._updateFieldAttrV2(pageName, pid, tableData);
    },
    isFormDisplayEnable: function(pidRowData, id1RowData, tableData) {
        if (!$S.isArray(tableData)) {
            return true;
        }
        var finalStatusRef = DataHandler.getAppData("id1Page.finalStatusRef", "");
        if ($S.isStringV2(finalStatusRef) && $S.isObject(tableData[0]) && $S.isStringV2(tableData[0]["status"])) {
            if (!DataHandlerV2.isDisabled("form", "generic_form2.force")) {
                return true;
            }
            return id1RowData["status"] !== finalStatusRef;
        }
        return true;
    },
    getPreDefinedPattern: function(id1RowData) {
        var template = DataHandler.getAppData("pageName:id1Page." + DataHandlerV2.getRowDataParamByFormType(id1RowData, "preDefinedPattern"), null);
        if (template !== null) {
            TemplateHelper.updateTemplateText(template, id1RowData);
        }
        return template;
    }
});

})($S);

export default FeedbackPage;
