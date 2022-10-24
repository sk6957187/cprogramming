var UploadFileTemplate = {};
UploadFileTemplate["templateNotFound"] = [{
    "tag": "center.h1",
    "text": {
        "tag": "span",
        "className": "badge badge-primary",
        "text": "Template not Found"
    }
}];
UploadFileTemplate["noDataFound"] = [
    {
        "tag": "center.h1",
        "text": {
            "tag": "span",
            "className": "badge badge-primary",
            "text": "No Data Found"
        }
    }
];
UploadFileTemplate["upload_file"] = [
    {
        "tag": "div.div",
        "className": "upload-file-form-div",
        "text": {
            "tag": "div",
            "className": "p-10px",
            "text": {
                "tag": "form",
                "id": "upload_file_form",
                "name": "upload_file_form",
                "value": "upload_file_form",
                "text": [
                    {
                        "tag": "div.h1",
                        "className": "p-10px",
                        "name": "upload_file.form_heading",
                        "text": "Upload File"
                    },
                    {
                        "tag": "div",
                        "className": "form-group",
                        "text": [
                            {
                                "tag": "div",
                                "className": "upload_file subject_field d-none",
                                "name": "upload_file.subject.div",
                                "text": [
                                    {
                                        "tag": "label",
                                        "name": "upload_file.subject_label",
                                        "text": "Subject"
                                    },
                                    {
                                        "tag": "input",
                                        "className": "form-control",
                                        "name": "upload_file.subject",
                                        "type": "text",
                                        "value": "",
                                        "text": ""
                                    }
                                ]
                            },
                            {
                                "tag": "div",
                                "className": "upload_file heading_field d-none",
                                "name": "upload_file.heading.div",
                                "text": [
                                    {
                                        "tag": "label",
                                        "name": "upload_file.heading_label",
                                        "text": "Heading"
                                    },
                                    {
                                        "tag": "input",
                                        "className": "form-control",
                                        "name": "upload_file.heading",
                                        "type": "text",
                                        "value": "",
                                        "text": ""
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "tag": "div",
                        "className": "form-group",
                        "text": [
                            {
                                "tag": "div",
                                "className": "upload_file file_field",
                                "name": "upload_file.file_field.div",
                                "text": [
                                    {
                                        "tag": "input",
                                        "type": "file",
                                        "name": "upload_file.file"
                                    },
                                    {
                                        "tag": "div.span",
                                        "name": "upload_file.message",
                                        "className": "small",
                                        "text": ""
                                    }

                                ]
                            }
                        ]
                    },
                    {
                        "tag": "div",
                        "className": "form-group",
                        "text": [
                            {
                                "tag": "button",
                                "className": "btn btn-primary",
                                "name": "upload_file.submit",
                                "text": "Submit"
                            },
                            {
                                "tag": "span",
                                "className": "pl-10px text-success",
                                "name": "upload_file.complete-status",
                                "text": ""
                            }
                        ]
                    }
                ]
            }
        }
    }
];
export default UploadFileTemplate;
