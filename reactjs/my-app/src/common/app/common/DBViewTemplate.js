var DBViewTemplate = {};
DBViewTemplate["templateNotFound"] = [{
    "tag": "center.h1",
    "text": {
        "tag": "span",
        "className": "badge badge-primary",
        "text": "Template not Found"
    }
}];
DBViewTemplate["noDataFound"] = [
    {
        "tag": "center.h1",
        "text": {
            "tag": "span",
            "className": "badge badge-primary",
            "text": "No Data Found"
        }
    }
];
DBViewTemplate["dbviewField"] = [
    {
        "tag": "div",
        "name": "tableView",
        "text": []
    }
];
DBViewTemplate["dbViewHeading1-1"] = [
    {
        "tag": "div.h4",
        "text": [
            {
                "tag": "span",
                "className": "badge badge-primary",
                "name": "tableHeading",
                "text": ""
            }
        ]
    }
];
DBViewTemplate["dbViewHeading1-1-reload"] = [
    {
        "tag": "div.h4",
        "text": [
            {
                "tag": "span",
                "className": "badge badge-primary",
                "name": "tableHeading",
                "text": ""
            },
            {
                "tag": "button",
                "className": "btn btn-primary pt-0 pb-0 ml-10px",
                "value": "reload",
                "name": "reload",
                "text": "Reload"
            }
        ]
    }
];
DBViewTemplate["dbViewHeading1-many"] = [
    {
        "tag": "div.h4",
        "text": [
            {
                "tag": "span",
                "className": "badge badge-primary",
                "name": "tableHeading",
                "text": ""
            }
        ]
    }
];
DBViewTemplate["dbViewHeading2-many"] = [
    {
        "tag": "div.h6",
        "text": [
            {
                "tag": "span",
                "className": "badge badge-primary",
                "name": "tableHeading",
                "text": ""
            }
        ]
    }
];
DBViewTemplate["dbViewHeading2-many-reload"] = [
    {
        "tag": "div.h6",
        "text": [
            {
                "tag": "span",
                "className": "badge badge-primary",
                "name": "tableHeading",
                "text": ""
            },
            {
                "tag": "button",
                "className": "btn btn-primary pt-0 pb-0 ml-10px fs-80",
                "value": "reload",
                "name": "reload",
                "text": "Reload"
            }
        ]
    }
];
DBViewTemplate["dbViewHeading3-many"] = [
    {
        "tag": "div.b",
        "text": [
            {
                "tag": "span",
                "className": "badge badge-secondary",
                "name": "tableHeading",
                "text": ""
            }
        ]
    }
];
DBViewTemplate["tableView"] = [
    {
        "tag": "div.h4",
        "text": [
            {
                "tag": "span",
                "className": "badge badge-primary",
                "name": "tableHeading",
                "text": ""
            },
            {
                "tag": "button",
                "className": "btn btn-primary pt-0 pb-0 ml-10px",
                "value": "reload",
                "name": "reload",
                "text": "Reload"
            }
        ]
    },
    {
        "tag": "div",
        "name": "tableData",
        "text":[]
    }
];
DBViewTemplate["tableData"] = [
    {
        "tag": "table.tbody",
        "className": "table-striped table-padded-px-5",
        "name": "tableData.table.tr",
        "text": []
    }
];
DBViewTemplate["tableDataV2"] = [
    {
        "tag": "table.tbody",
        "className": "table-bordered table-bordered-dark table-striped table-padded-px-5",
        "name": "tableData.table.tr",
        "text": []
    }
];
DBViewTemplate["dbviewField.tr"] = [
    {
        "tag": "tr",
        "name": "dbviewField.tr.tds",
        "text": []
    }
];
DBViewTemplate["dbviewSummaryField"] = [
    {
        "tag": "table.tbody",
        "className": "table table-striped table-padded-px-5",
        "name": "dbviewSummaryField",
        "text": [
            {
                "tag": "tr",
                "text": [
                    {
                        "tag": "th",
                        "text": "S.No."
                    },
                    {
                        "tag": "th",
                        "text": "Description"
                    },
                    {
                        "tag": "th",
                        "className": "text-center",
                        "text": "Count"
                    }
                ]
            }
        ]
    }
];
DBViewTemplate["dbviewSummaryFieldV2"] = [
    {
        "tag": "table.tbody",
        "className": "table table-striped table-padded-px-5",
        "name": "dbviewSummaryField",
        "text": [
            {
                "tag": "tr",
                "text": [
                    {
                        "tag": "td.b",
                        "text": "S.No."
                    },
                    {
                        "tag": "td.b",
                        "name": "descriptionButton",
                        "text": []
                    },
                    {
                        "tag": "td.b",
                        "className": "text-center",
                        "name": "countButton",
                        "text": []
                    }
                ]
            }
        ]
    }
];
DBViewTemplate["dbviewSummaryField.tr"] = [
    {
        "tag": "tr",
        "text": [
            {
                "tag": "td",
                "name": "dbviewSummaryField.tr.s_no",
                "text": ""
            },
            {
                "tag": "td",
                "name": "dbviewSummaryField.tr.description",
                "text": ""
            },
            {
                "tag": "td",
                "name": "dbviewSummaryField.tr.count",
                "className": "text-center",
                "text": ""
            }
        ]
    }
];
export default DBViewTemplate;
