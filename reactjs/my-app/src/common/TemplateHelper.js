import $S from '../interface/stack.js';
var TemplateHelper;
(function($S) {
var TextFilter = $S.getTextFilter();
var Template = function(template) {
    return new Template.fn.init(template);
};
Template.fn = Template.prototype = {
    constructor: Template,
    init: function(template) {
        this.template = template;
        return this;
    },
    searchField: function (fieldName) {
        // It will search in only in text
        if (!$S.isString(fieldName)) {
            return {};
        }
        var field = {};
        if ($S.isArray(this.template)) {
            for (var i = 0; i<this.template.length; i++) {
                field = Template(this.template[i]).searchField(fieldName);
                if (field.name === fieldName) {
                    return field;
                }
            }
        } else if ($S.isObject(this.template)) {
            if (this.template["name"] === fieldName) {
                return this.template;
            }
            return Template(this.template["text"]).searchField(fieldName);
        }
        return {};
    },
    searchFieldV2: function(fieldName) {
        // It will search in not only in text but in every variable
        if (!$S.isString(fieldName)) {
            return {};
        }
        var field = {};
        if ($S.isArray(this.template)) {
            for (var i = 0; i<this.template.length; i++) {
                field = Template(this.template[i]).searchFieldV2(fieldName);
                if (field.name === fieldName) {
                    return field;
                }
            }
        } else if ($S.isObject(this.template)) {
            if (this.template["name"] === fieldName) {
                return this.template;
            }
            for (var key in this.template) {
                field = Template(this.template[key]).searchFieldV2(fieldName);
                if (field.name === fieldName) {
                    return field;
                }
            }
        }
        return {};
    },
    searchFieldV3: function(attr, value) {
        // Similar to V2, like search item by tag
        if (!$S.isString(attr)) {
            return {};
        }
        var field = {};
        if ($S.isArray(this.template)) {
            for (var i = 0; i<this.template.length; i++) {
                field = Template(this.template[i]).searchFieldV3(attr, value);
                if (field[attr] === value) {
                    return field;
                }
            }
        } else if ($S.isObject(this.template)) {
            if (this.template[attr] === value) {
                return this.template;
            }
            for (var key in this.template) {
                field = Template(this.template[key]).searchFieldV3(attr, value);
                if (field[attr] === value) {
                    return field;
                }
            }
        }
        return {};
    }
};
$S.extendObject(Template);
function updateField(field, attr) {
    if ($S.isObject(field) && $S.isObject(attr)) {
        for (var key in attr) {
            switch(key) {
                case "addClass":
                    field.className = TextFilter(field.className).addClass(attr[key]).getClassName();
                break;
                case "removeClass":
                    field.className = TextFilter(field.className).removeClass(attr[key]).getClassName();
                break;
                case "setValue":
                    field.value = attr[key];
                break;
                case "setText":
                    field.text = attr[key];
                break;
                case "addInHref":
                    if ($S.isStringV2(field.href)) {
                        field.href =  attr[key] + field.href;
                    } else {
                        field.href = attr[key];
                    }
                break;
                case "replaceTextPattern":
                    if ($S.isString(field.text) && $S.isString(field.pattern)) {
                        field.text = field.text.replace(field.pattern, attr[key]);
                    }
                break;
                default:
                break;
            }
        }
    }
}
Template.extend({
    updateTemplateText: function(template, formValues) {
        var field = {};
        if ($S.isObject(formValues)) {
            for (var fieldName in formValues) {
                field = Template(template).searchField(fieldName);
                if (field.name === fieldName) {
                    updateField(field, {"setText": formValues[fieldName]});
                }
            }
        }
        return template;
    },
    addItemInTextArray: function(template, fieldName, subTemplate) {
        var field = Template(template).searchField(fieldName);
        if ($S.isObject(field)) {
            if ($S.isArray(field.text)) {
                field.text.push(subTemplate);
            }
        }
        return template;
    },
    addInHref: function(template, fieldName, basepathname) {
        if (!$S.isStringV2(basepathname)) {
            return template;
        }
        var field = {};
        if ($S.isStringV2(fieldName)) {
            field = Template(template).searchField(fieldName);
            if (field.name === fieldName) {
                updateField(field, {"addInHref": basepathname});
            }
        }
        return template;
    },
    addClassTemplate: function(template, fieldName, className) {
        var field = {};
        if ($S.isString(fieldName)) {
            field = Template(template).searchField(fieldName);
            if (field.name === fieldName) {
                updateField(field, {"addClass": className});
            }
        }
        return template;
    },
    removeClassTemplate: function(template, fieldName, className) {
        var field = {};
        if ($S.isString(fieldName)) {
            field = Template(template).searchField(fieldName);
            if (field.name === fieldName) {
                updateField(field, {"removeClass": className});
            }
        }
        return template;
    },
    updateTemplateValue: function(template, values) {
        var field = {};
        if ($S.isObject(values)) {
            for (var fieldName in values) {
                field = Template(template).searchField(fieldName);
                if (field.name === fieldName) {
                    updateField(field, {"setValue": values[fieldName]});
                }
            }
        }
        return template;
    },
    replaceTextPattern: function(template, fieldName, patternValue) {
        var field = {};
        if ($S.isString(fieldName) && $S.isString(patternValue)) {
            field = Template(template).searchField(fieldName);
            if (field.name === fieldName) {
                updateField(field, {"replaceTextPattern": patternValue});
            }
        }
        return template;
    }
});
Template.extend({
    getTemplateAttr: function(template, fieldName, attrName, defaultValue) {
        var field = Template(template).searchFieldV2(fieldName);
        if ($S.isDefined(field[attrName])) {
            return field[attrName];
        }
        return defaultValue;
    },
    setTemplateAttr: function(template, fieldName, attrName, value) {
        var field = Template(template).searchFieldV2(fieldName);
        if ($S.isDefined(field[attrName])) {
            field[attrName] = value;
            return true;
        }
        return false;
    }
});
TemplateHelper = Template;
})($S);
export default TemplateHelper;
