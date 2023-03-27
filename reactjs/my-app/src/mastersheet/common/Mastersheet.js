import $S from "../../interface/stack.js";
import TemplateHelper from "../../common/TemplateHelper";

// import Config from "./Config";
import DataHandler from "./DataHandler";
var Mastersheet;
(function($S){
// var DT = $S.getDT();
Mastersheet = function(arg) {
    return new Mastersheet.fn.init(arg);
};
Mastersheet.fn = Mastersheet.prototype = {
    constructor: Mastersheet,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(Mastersheet);
Mastersheet.extend({
    _generateTemplateData: function(mastersheetData) {
        var tempData = {}, tempData2, pageId, i;
        if ($S.isArray(mastersheetData)) {
            for (i=0; i<mastersheetData.length; i++) {
                if ($S.isObject(mastersheetData[i]) && $S.isStringV2(mastersheetData[i]["pageId"])) {
                    pageId = mastersheetData[i]["pageId"];
                    if (!$S.isArray(tempData[pageId])) {
                        tempData[pageId] = [];
                    }
                    tempData[pageId].push(mastersheetData[i]);
                }
            }
        }
        var finalData = [];
        for (pageId in tempData) {
            tempData2 = DataHandler.getAppData("pageParam", {});
            if ($S.isArray(tempData[pageId])) {
                for (i=0; i<tempData[pageId].length; i++) {
                    if ($S.isObject(tempData[pageId][i])) {
                        tempData2["username-" + tempData[pageId][i]["s_no"]] = tempData[pageId][i]["s_no"] + ") " + tempData[pageId][i]["username"];
                        tempData2["user-designation-" + tempData[pageId][i]["s_no"]] = tempData[pageId][i]["designation"];
                        tempData2["user-pf-number-" + tempData[pageId][i]["s_no"]] = tempData[pageId][i]["pf_no"];
                        tempData2["hq"] = tempData[pageId][i]["hq"];
                        tempData2["bill-unit-no"] = tempData[pageId][i]["bill_unit_no"]
                    }
                }
            }
            finalData.push(tempData2);
        }
        return finalData;
    }
});
Mastersheet.extend({
    getTemplate: function(pageName, mastersheetData) {
        var mastersheetPage = [];
        var templateName = DataHandler.getAppData("templateName", "");
        if ($S.isStringV2(templateName)) {
            mastersheetPage = DataHandler.getAppData(templateName, []);
        }
        return mastersheetPage;
    },
    getPageFromData: function(pageName, mastersheetData) {
        // mastersheetData = [
        //     {
        //         "pageId": "GDBR",
        //         "s_no": "1",
        //         "username": "Tanmay Sikdar",
        //         "designation": "Tech(SM)-I",
        //         "pf_no": "50700770131",
        //         "hq": "GDBR",
        //         "bill_unit_no": "705-571"
        //     },
        //     {
        //         "pageId": "GDBR",
        //         "s_no": "2",
        //         "username": "Dharmendra Kumar",
        //         "designation": "Helper",
        //         "pf_no": "18529801722",
        //         "hq": "GDBR",
        //         "bill_unit_no": "705-571"
        //     },
        //     {
        //         "pageId": "GDBR",
        //         "s_no": "3",
        //         "username": "Jagdish Mahato",
        //         "designation": "Helper",
        //         "pf_no": "50700404871",
        //         "hq": "XYZ",
        //         "bill_unit_no": "705-571"
        //     }
        // ];
        var finalPages = [], template;
        var templateData = this._generateTemplateData(mastersheetData);
        for (var i=0; i<templateData.length; i++) {
            template = this.getTemplate();
            TemplateHelper.updateTemplateText(template, templateData[i]);
            finalPages.push(template);
        }
        return finalPages;
    }
});

})($S);

export default Mastersheet;
