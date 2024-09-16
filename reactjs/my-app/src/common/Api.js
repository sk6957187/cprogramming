import React from 'react';
import {Link} from 'react-router-dom';
// import GoogleLogin from 'react-google-login';

import $S from '../interface/stack.js';

var Api;
(function($S) {
Api = function(config) {
    return new Api.fn.init(config);
};
Api.fn = Api.prototype = {
    constructor: Api,
    init: function(config) {
        this.config = config;
        return this;
    }
};

$S.extendObject(Api);

var validTags = [];
var childGenerator = {};

function generateReactChild(props, data, key) {
    var reactChild = null, reactChildText = null;
    if ($S.isString(data)) {
        return data;
    }
    if ($S.isObject(data)) {
        if ($S.isString(data.tag) && data.tag.length > 0) {
            var tags = data.tag.split(".");
            for (var i = tags.length-1; i > 0; i--) {
                data.text = {
                    "tag": tags[i],
                    "text": data.text
                };
            }
            data.tag = tags[0];
        }
        if (validTags.indexOf(data.tag) >= 0) {
            reactChildText = data.text;
            if ($S.isObject(reactChildText)) {
                reactChildText = generateReactChild(props, reactChildText, key);
            } if ($S.isArray(reactChildText)) {
                reactChildText = reactChildText.map(function(item, index, arr) {
                    return generateReactChild(props, item, index);
                });
            }
            if ($S.isBooleanTrue(reactChildText)) {
                reactChildText = "true";
            } else if ($S.isBooleanFalse(reactChildText)) {
                reactChildText = "false";
            }
            reactChild = childGenerator[data.tag](props, data, reactChildText, key);
        } else if ($S.isString(data.text)) {
            reactChild = data.text;
        } else {
            // console.log("Invalid tag: " + JSON.stringify(data));
        }
    } else if ($S.isArray(data)) {
        // For array of array fields
        reactChild = data.map(function(item, index, arr) {
            return generateReactChild(props, item, index);
        });
    }
    return reactChild;
}

var ajaxApiCall = function(ajax, callBack) {
        fetch(ajax.url)
            .then(res => res.json())
            .then(
                (result) => {
                    if ($S.isFunction(callBack)) {
                        callBack(ajax, "SUCCESS", result);
                    }
                },
                (error) => {
                    if ($S.isFunction(callBack)) {
                        callBack(ajax, "FAILURE", null);
                    }
                }
            );
};
// For loading text file like, csv
var ajaxApiCallV2 = function(ajax, callBack) {
        fetch(ajax.url)
            .then(res => res.text())
            .then(
                (result) => {
                    if ($S.isFunction(callBack)) {
                        callBack(ajax, "SUCCESS", result);
                    }
                },
                (error) => {
                    if ($S.isFunction(callBack)) {
                        callBack(ajax, "FAILURE", null);
                    }
                }
            );
};
Api.extend({
    getAjaxApiCallMethod: function() {
        return ajaxApiCall;
    },
    getAjaxApiCallMethodV2: function() {
        return ajaxApiCallV2;
    },
    getSpace: function(count) {
        var str = "\u00a0";
        if ($S.isNumber(count) && count > 0) {
            for (var i = 1; i < count; i++) {
                str += "\u00a0";
            }
        }
        return str;
    },
    generateFields: function(props, fieldItems, i) {
        var fields = null;
        if ($S.isArray(fieldItems)) {
            fields = fieldItems.map(function(item, index, arr) {
                return generateReactChild(props, item, index);
            });
        } else if ($S.isObject(fieldItems)) {
            fields = generateReactChild(props, fieldItems, i);
        } else if ($S.isString(fieldItems)) {
            fields = fieldItems;
        }
        return fields;
    }
});

childGenerator = {
    "link": function(props, data, reactChildText, key) {
        return <Link key={key} to={data.href} className={data.className}>{reactChildText}</Link>;
    },
    "a": function(props, data, reactChildText, key) {
        var target = "";
        if ($S.isBooleanTrue(data.isTargetBlank)) {
            target = "_blank";
        }
        return <a key={key} className={data.className} href={data.href} target={target}>{reactChildText}</a>;
    },
    "b": function(props, data, reactChildText, key) {
        return <b key={key} className={data.className}>{reactChildText}</b>;
    },
    "h1": function(props, data, reactChildText, key) {
        return <h1 key={key} className={data.className}>{reactChildText}</h1>;
    },
    "h2": function(props, data, reactChildText, key) {
        return <h2 key={key} className={data.className}>{reactChildText}</h2>;
    },
    "h3": function(props, data, reactChildText, key) {
        return <h3 key={key} className={data.className}>{reactChildText}</h3>;
    },
    "h4": function(props, data, reactChildText, key) {
        return <h4 key={key} className={data.className}>{reactChildText}</h4>;
    },
    "h5": function(props, data, reactChildText, key) {
        return <h5 key={key} className={data.className}>{reactChildText}</h5>;
    },
    "h6": function(props, data, reactChildText, key) {
        return <h6 key={key} className={data.className}>{reactChildText}</h6>;
    },
    "p": function(props, data, reactChildText, key) {
        return <p key={key} className={data.className}>{reactChildText}</p>;
    },
    "center": function(props, data, reactChildText, key) {
        return <center key={key} className={data.className}>{reactChildText}</center>;
    },
    "div": function(props, data, reactChildText, key) {
        return <div key={key} className={data.className}>{reactChildText}</div>;
    },
    "table": function(props, data, reactChildText, key) {
        return <table key={key} id={data.id} className={data.className}>{reactChildText}</table>;
    },
    "tbody": function(props, data, reactChildText, key) {
        return <tbody key={key}>{reactChildText}</tbody>;
    },
    "thead": function(props, data, reactChildText, key) {
        return <thead key={key}>{reactChildText}</thead>;
    },
    "tr": function(props, data, reactChildText, key) {
        return <tr key={key} id={data.id} className={data.className}>{reactChildText}</tr>;
    },
    "td": function(props, data, reactChildText, key) {
        return <td key={key} id={data.id} rowSpan={data.rowSpan} colSpan={data.colSpan} className={data.className}>{reactChildText}</td>;
    },
    "th": function(props, data, reactChildText, key) {
        return <th key={key} id={data.id} rowSpan={data.rowSpan} colSpan={data.colSpan} className={data.className}>{reactChildText}</th>;
    },
    "hr": function(props, data, reactChildText, key) {
        return <hr key={key} className={data.className}/>;
    },
    "br": function(props, data, reactChildText, key) {
        return <br key={key} className={data.className}/>;
    },
    "img": function(props, data, reactChildText, key) {
        return <img key={key} src={data.src} alt={data.alt} className={data.className}/>;
    },
    "ol": function(props, data, reactChildText, key) {
        return <ol key={key} type={data.type} className={data.className}>{reactChildText}</ol>;
    },
    "ul": function(props, data, reactChildText, key) {
        return <ul key={key} type={data.type} className={data.className}>{reactChildText}</ul>;
    },
    "object": function(props, data, reactChildText, key) {
        return <object key={key} type={data.type} className={data.className} id={data.id} data={data.data}>{reactChildText}</object>;
    },
    "embed": function(props, data, reactChildText, key) {
        return <embed key={key} type={data.type} className={data.className} id={data.id} src={data.src}/>;
    },
    "li": function(props, data, reactChildText, key) {
        return <li key={key} className={data.className}>{reactChildText}</li>;
    },
    "span": function(props, data, reactChildText, key) {
        return <span key={key} className={data.className}>{reactChildText}</span>;
    },
    "small": function(props, data, reactChildText, key) {
        return <small key={key} className={data.className}>{reactChildText}</small>;
    },
    "label": function(props, data, reactChildText, key) {
        return <label htmlFor={data.htmlFor} key={key} className={data.className}>{reactChildText}</label>;
    },
    "form": function(props, data, reactChildText, key) {
        return <form key={key} className={data.className} method={data.method} action={data.action} onSubmit={props.onFormSubmit} name={data.name} value={data.value} id={data.id} encType={data.enctype}>{reactChildText}</form>;
    },
    "button": function(props, data, reactChildText, key) {
        var btnClassName = data.className;
        return <button onClick={props.onClick} name={data.name} className={btnClassName} key={key} value={data.value}>{reactChildText}</button>;
    },
    "input": function(props, data, reactChildText, key) {
        // Uncontrolled value
        // When ever value changes, forms need not to be re-render
        var inputField = <input key={key} type={data.type} name={data.name}
                            placeholder={data.placeholder} className={data.className}
                            id={data.id} onChange={props.onChange}
                            defaultValue={data.value}/>;
        return inputField;
    },
    "inputV2": function(props, data, reactChildText, key) {
        // Controlled value
        // When ever value changes, forms needs to be re-render
        var inputField = <input key={key} type={data.type} name={data.name}
                            placeholder={data.placeholder} className={data.className}
                            id={data.id} onChange={props.onChange}
                            value={data.value}/>;
        return inputField;
    },
    "inputRequired": function(props, data, reactChildText, key) {
        var inputField = <input key={key} type={data.type} name={data.name}
                    placeholder={data.placeholder} className={data.className}
                    id={data.id} onChange={props.onChange}
                    value={data.value} required/>;
        return inputField;
    },
    "select": function(props, data, reactChildText, key) {
        // Here data.value is optional i.e. forms need not to re-render when it change
        // It is creating problem for attendance use case when we change section i.e. user list
        // There previous update field remain same
        // For example: user1 has value LAP on 01.07.2021 now when we change filter then user1Id will change but this LAP will remain same
        return <select key={key} name={data.name} className={data.className} defaultValue={data.value} onChange={props.dropDownChange}>{reactChildText}</select>;
    },
    "selectV2": function(props, data, reactChildText, key) {
        // Here data.value must be required i.e. forms needs to be re-render when it change
        return <select key={key} name={data.name} className={data.className} value={data.value} onChange={props.dropDownChange}>{reactChildText}</select>;
    },
    "textarea": function(props, data, reactChildText, key) {
        return <textarea key={key} name={data.name} className={data.className} rows={data.rows} cols={data.cols} defaultValue={data.value} onChange={props.onChange}></textarea>;
    },
    "textareaV2": function(props, data, reactChildText, key) {
        return <textarea key={key} name={data.name} className={data.className} rows={data.rows} cols={data.cols} value={data.value} onChange={props.onChange}></textarea>;
    },
    "option": function(props, data, reactChildText, key) {
        return <option key={key} value={data.value}>{reactChildText}</option>;
    },
    "dropdown": function(props, data, reactChildText, key, selectTagName) {
        if ($S.isObject(data)) {
            data.tag = "select"; //Other select parameters will be as it is (value, className, name)
            if (selectTagName === "selectV2") {
                data.tag = "selectV2";
            }
            var tempText = [];
            if ($S.isArray(data.text)) {
                var value, text;
                for (var i = 0; i < data.text.length; i++) {
                    value = data.text[i].value;
                    text = data.text[i].text;
                    tempText.push({"tag": "option", "value": value, "text": text});
                }
            }
            data.text = tempText;
        }
        return generateReactChild(props, data, key);
    },
    "dropdownV2": function(props, data, reactChildText, key) {
        return childGenerator["dropdown"](props, data, reactChildText, key, "selectV2");
    },
    "gmail-login": function(props, data, reactChildText, key) {
        if ($S.isFunction(props.methods.responseGoogleSuccess) && $S.isFunction(props.methods.responseGoogleFailure)) {
            return null;
            // return <GoogleLogin
            //     clientId={data.googleLoginClientId}
            //     buttonText={data.buttonText}
            //     onSuccess={props.methods.responseGoogleSuccess}
            //     onFailure={props.methods.responseGoogleFailure}
            //     cookiePolicy={'single_host_origin'}
            // />;
        } else {
            return null;
        }
    }
};

validTags = Object.keys(childGenerator);

})($S);
export default Api;

// "input": function(props, data, reactChildText, key) {
//     var inputField = <input key={key} type={data.type} name={data.name}
//                         placeholder={data.placeholder} className={data.className}
//                         id={data.id} onChange={props.onChange}
//                         value={data.value}/>;
//     return inputField;
// },
// "textarea": function(props, data, reactChildText, key) {
//     return <textarea key={key} name={data.name} className={data.className} rows={data.rows} cols={data.cols} value={data.value} onChange={props.onChange}></textarea>;
// },
