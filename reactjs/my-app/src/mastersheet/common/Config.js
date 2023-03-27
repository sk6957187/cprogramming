import $$$ from '../../interface/global';
import $S from "../../interface/stack.js";
import CommonConfig from "../../common/app/common/CommonConfig";

var Config = {};

var basepathname = CommonConfig.basepathname;

Config.uploadFileInstruction = $$$.uploadFileInstruction;

Config.tempConfig = {
    "form_type": "Project",
    "afterLoginLinkJson": [
        {
            "tag": "span",
            "text": [
                {"tag":"span","text":"Login as: "},
                {"tag":"span.b","name":"pageHeading.username","text":""}
            ]
        },
        {
            "tag": "span",
            "text": [
                {"tag":"span", "text":" |  "},
                {"tag":"span", "text":{"tag":"a","name":"pageHeading.logoutLink","href":"/logout","text":"Logout"}}
            ]
        }
    ]
};
var tempConfigGlobalKey = ["pageName:manageFiles.appIndex"];
for (var i=0; i<tempConfigGlobalKey.length; i++) {
    if ($S.isStringV2($$$[tempConfigGlobalKey[i]])) {
        Config.tempConfig[tempConfigGlobalKey[i]] = $$$[tempConfigGlobalKey[i]];
    }
}

Config.headingJson = [];
Config.afterLoginLinkJson = [];
Config.footerLinkJsonAfterLogin = [];

var pages = {
    "origin": basepathname+"/",
    "home": basepathname+"/:index",
    "projectId": basepathname+"/:index/pid/:pid",
    "id1Page": basepathname+"/:index/pid/:pid/id1/:id1",
    "displayPage": basepathname+"/:index/display/:pageId",
    "viewPage": basepathname+"/:index/view/:viewPageName",
    "manageFiles": basepathname+"/display/manageFiles",
};

Config.pages = pages;

Config.origin = "origin";
Config.home = "home";
Config.noMatch = "noMatch";
Config.projectId = "projectId";
Config.id1Page = "id1Page";
Config.displayPage = "displayPage";
Config.viewPage = "viewPage";
Config.manageFiles = "manageFiles";


Config.dateSelection = [
    {"name": "Daily", "value": "daily"},
    {"name": "Monthly", "value": "monthly"},
    {"name": "Yearly", "value": "yearly"},
    {"name": "All", "value": "all"}
];
Config.defaultDateSelect = "monthly";
Config.dateSelectionRequiredPages = [];

Config.fieldsKey = {
    "Value": "common-value",
    "DateKey": "date-entry-key",
    "RemarksKey": "remark-entry-key",
    "DistanceKey": "new-work-status.distance",
    "SectionKey": "new-work-status.section",
    "supplyDiscription": "supplyDiscription",
    "UploadFile": "upload_file.file",
    "AddProjectComment": "add-project-comment-form.comment",
    "ProjectFileKey": "add-project-files-form.project",
    "AddLinkText": "upload_file_link.subject",
    "AddLinkUrl": "upload_file_link.heading"
};

var messageMapping = {
    "form.generic_form0.entry.project-name": "Project name required.",
    "form.generic_form0.entry.form_type": "Form type required."
};
var defaultMetaData = {
    "home.Project.formTemplate": [
        {
            "tag": "div",
            "text": [
                {
                    "tag": "form",
                    "name": "form.generic_form0",
                    "value": "form.generic_form0",
                    "text": [
                        {
                            "tag": "div",
                            "text": {
                                "tag": "span",
                                "className": "badge badge-secondary",
                                "text": "Add New Project"
                            }
                        },
                        {
                            "tag": "div.table.tbody",
                            "text": [
                                {
                                    "tag": "tr",
                                    "text": [
                                        {
                                            "tag": "td",
                                            "text": "Project Name"
                                        },
                                        {
                                            "tag": "td",
                                            "text": {
                                                "tag": "input",
                                                "className": "form-control",
                                                "name": "form.generic_form0.entry.project-name",
                                                "value": ""
                                            }
                                        }
                                    ]
                                },
                                {
                                    "tag": "tr",
                                    "text": [
                                        {
                                            "tag": "td",
                                            "colSpan": 4,
                                            "className": "text-center",
                                            "text": [
                                                {
                                                    "tag": "button",
                                                    "name": "addentry.submitStatus",
                                                    "className": "btn btn-primary form-control",
                                                    "text": "Save"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "home.Project.formName": "form.generic_form0",
    "form.generic_form0.validationData": {
        "form.generic_form0.entry.project-name": {
            "type": "string",
            "isRequired": true
        },
        "form.generic_form0.entry.form_type": {
            "type": "string",
            "default": "Project",
            "isRequired": true
        }
    },
    "form.generic_form0.requiredKeys": ["form.generic_form0.entry.form_type", "form.generic_form0.entry.project-name"]
};

Config.getConfigData = function(key, defaultValue) {
    switch(key) {
        case "messageMapping":
            return $S.clone(messageMapping);
        case "defaultMetaData":
            return $S.clone(defaultMetaData);
        default:
            return defaultValue;
    }
};

export default Config;
