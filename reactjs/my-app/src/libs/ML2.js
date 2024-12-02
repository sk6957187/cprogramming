import $S from './stack';
(function(window, $S) {

var CurrentData = $S.getDataObj();
var keys = ["apiResponse", "ml2FileRawData", "ml2FileData", "commentData", "assignStatement", "expression"];
CurrentData.setKeys(keys);

var ML2 = function(fileData, context) {
    return new ML2.fn.init(fileData, context);
};

var ML2Local = function(fileData, context) {
    return new ML2Local.fn.init(fileData, context);
};

ML2.fn = ML2.prototype = {
    constructor: ML2,
    init: function(fileData, context) {
        ML2Local.setData("apiResponse", fileData);
        ML2Local.readData();//It will generate ml2FileData, commentData
        ML2Local.filterAssignStatement();
        ML2Local.generateExpression();
        return this;
    }
};

ML2Local.fn = ML2Local.prototype = {
    constructor: ML2Local,
    init: function(fileData, context) {}
};

$S.extendObject(ML2);
$S.extendObject(ML2Local);

ML2Local.extend({
    setData: function(key, value, isDirect) {
        return CurrentData.setData(key, value, isDirect);
    },
    getData: function(key, defaultValue, isDirect) {
        return CurrentData.getData(key, defaultValue, isDirect);
    }
});
ML2.extend({
    getData: function(key, defaultValue, isDirect) {
        var result = ML2Local.getData(key, defaultValue, isDirect);
        if (["apiResponse"].indexOf(key) >= 0) {
            result = [result];
        } else if (["inOut"].indexOf(key) < 0) {
            result = $S.convertRowToColumn(result);
        }
        return result;
    },
    getDataV2: function(key, defaultValue, isDirect) {
        var result = ML2Local.getData(key, defaultValue, isDirect);
        return result;
    },
    getBlockData: function(blockFilterPattern) {
        var data = ML2Local.getData("ml2FileData", []);
        var result = [], i, j, k;
        var temp, temp1, temp2;
        var blockStartPatterns = [];
        if ($S.isArray(blockFilterPattern)) {
            blockStartPatterns = $S.searchItems(blockFilterPattern, blockFilterPattern, false, false, "i", function(sp, el) {
                return $S.isString(el) && el.trim().length > 0;
            });
        }
        var endPattern = ";";
        if ($S.isArray(data)) {
            for(i=0; i<data.length; i++) {
                temp = [];
                for (j = 0; j<data[i].length; j++) {
                    temp2 = data[i][j];
                    temp1 = $S.searchItems(blockStartPatterns, [temp2], true, false);
                    if (temp1.length > 0) {
                        temp.push(temp2);
                        for(k=j+1; k<data[i].length; k++) {
                            temp2 = data[i][k];
                            temp.push(temp2);
                            temp1 = $S.searchItems([endPattern], [temp2], true, false);
                            if (temp1.length > 0) {
                                break;
                            }
                            j++;
                        }
                    }
                }
                result.push(temp);
            }
        }
        return result;
    }
});

ML2Local.extend({
    _isPercentSymbolStart: function(str) {
        if (str.split("%").length < 2) {
            return false;
        }
        return true;
    },
    _isSingleBackSlash: function(str) {
        if (str.split("\\").length < 2) {
            return false;
        }
        return true;
    },
    _removeSingleLineComment: function(fileIndex, fileResponse) {
        var result = [], i, temp, comment;
        for (i = 0; i < fileResponse.length; i++) {
            temp = fileResponse[i].split("//");
            if (temp.length >= 2) {
                comment = "//" + temp.splice(1).join("//")
                this._storeCommentData(fileIndex, comment);
                temp = temp[0];
            } else {
                temp = fileResponse[i];
            }
            result.push(temp);
        }
        return result;
    },
    _storeCommentData: function(fileIndex, str) {
        var commentData = ML2Local.getData("commentData", []);
        if (!$S.isArray(commentData)) {
            commentData = [];
        }
        if (commentData.length <= fileIndex+1) {
            for (var i = commentData.length; i < fileIndex+1; i++) {
                commentData.push([]);
            }
        }
        commentData[fileIndex].push(str);
        ML2Local.setData("commentData", commentData);
    },
    _removeMultiLineComment: function(fileIndex, fileResponse) {
        var result = [], i, j;
        for (i = 0; i < fileResponse.length; i++) {
            if (this._isPercentSymbolStart(fileResponse[i])) {
                for (j = i; j < fileResponse.length; j++) {
                    this._storeCommentData(fileIndex, fileResponse[j]);
                    if (this._isSingleBackSlash(fileResponse[j])) {
                        break;
                    } else {
                        i++;
                        continue;
                    }
                }
            } else {
                result.push(fileResponse[i]);
            }
        }
        return result;
    },
    _readDataEachLine: function(allFileResponse) {
        var result = [], i;
        var fileResponse;
        for (i = 0; i < allFileResponse.length; i++) {
            fileResponse = this._removeMultiLineComment(i, allFileResponse[i]);
            fileResponse = this._removeSingleLineComment(i, fileResponse);
            result.push(fileResponse);
        }
        return result;
    }
});


ML2Local.extend({
    _isAssignStart: function(str) {
        if (str.split("ASSIGN").length < 2) {
            return false;
        }
        return true;
    },
    _isAssignEnd: function(str) {
        if (str.split(";").length < 2) {
            return false;
        }
        return true;
    },
    _readEachFileAssignStatement: function(fileData) {
        var temp = "", i, isAssignContinue = false;
        var result = [];
        if ($S.isArray(fileData)) {
            for (i = 0; i < fileData.length; i++) {
                if (this._isAssignStart(fileData[i]) && this._isAssignEnd(fileData[i])) {
                    isAssignContinue = false;
                    temp = $S.replaceString(fileData[i], "\t", " ");
                    temp = $S.replaceString(temp, "\r", "");
                    temp = $S.replaceString(temp, "  ", " ");
                    result.push(temp);
                    temp = "";
                    continue;
                } else if (this._isAssignStart(fileData[i])) {
                    isAssignContinue = true;
                    temp += fileData[i];
                    continue;
                } else if (isAssignContinue && this._isAssignEnd(fileData[i])) {
                    isAssignContinue = false;
                    temp += fileData[i];
                    temp = $S.replaceString(temp, "\t", " ");
                    temp = $S.replaceString(temp, "\r", "");
                    temp = $S.replaceString(temp, "  ", " ");
                    result.push(temp);
                    temp = "";
                    continue;
                } else if (isAssignContinue) {
                    temp += fileData[i];
                    continue;
                }
            }
        }
        return result;
    }
});


ML2Local.extend({
    readData: function() {
        var result = [], i, temp;
        var allFileResponse = [];
        var apiResponse = CurrentData.getData("apiResponse", []);
        var ml2FileRawData = [];
        if ($S.isArray(apiResponse)) {
            for (i = 0; i < apiResponse.length; i++) {
                ml2FileRawData.push([]);
                temp = apiResponse[i].split("\n");
                allFileResponse.push(temp);
                ml2FileRawData.push(temp);
            }
        }
        result = ML2Local._readDataEachLine(allFileResponse);
        ML2Local.setData("ml2FileData", result);
        ML2Local.setData("ml2FileRawData", ml2FileRawData);
        return result;
    },
    filterAssignStatement: function() {
        var allFileData = ML2Local.getData("ml2FileData", []);
        var result = [], i, temp;
        if ($S.isArray(allFileData)) {
            for (i = 0; i < allFileData.length; i++) {
                temp = ML2Local._readEachFileAssignStatement(allFileData[i]);
                if (temp.length < 1) {
                    $S.log("No Assign statement found");
                }
                result.push(temp);
            }
        }
        ML2Local.setData("assignStatement", result);
        return result;
    },
    _updateExpression: function(expression, statement) {
        if (!$S.isArray(expression)) {
            expression = [];
        }
        var i, temp, exp, items;
        if ($S.isString(statement)) {
            temp = statement.split("ASSIGN");
            if (temp.length !== 2) {
                $S.log("Invalid statement 1: " + statement);
                return;
            }
            temp = temp[1].split("TO ");
            if (temp.length !== 2) {
                $S.log("Invalid statement 2: " + statement);
                return;
            }
            exp = temp[0].trim();
            temp = temp[1].split(";");
            if (temp.length !== 2) {
                $S.log("Invalid statement 3: " + statement);
                return;
            }
            items = temp[0].split(",");
            for (i = 0; i < items.length; i++) {
                expression.push([items[i].trim(), exp]);
            }
        }
    },
    generateExpression: function() {
        var assignStatement = ML2Local.getData("assignStatement", []);
        var expression = [], i, j;
        if ($S.isArray(assignStatement)) {
            for (i = 0; i < assignStatement.length; i++) {
                expression.push([]);
                for(j=0; j<assignStatement[i].length; j++) {
                    this._updateExpression(expression[i], assignStatement[i][j]);
                }
            }
        }
        ML2Local.setData("expression", expression);
        return expression;
    }
});
window.$ML2 = ML2;

})(window, $S);
