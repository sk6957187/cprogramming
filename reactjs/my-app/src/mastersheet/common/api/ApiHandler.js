import $S from "../../../interface/stack.js";
// import Config from "../Config";
import DataHandler from "../DataHandler";
// import TemplateHandler from "../template/TemplateHandler";
// import DisplayUploadedFiles from "../pages/DisplayUploadedFiles";

import Api from "../../../common/Api";
import AppHandler from "../../../common/app/common/AppHandler";
import CommonConfig from "../../../common/app/common/CommonConfig";
import CommonDataHandler from "../../../common/app/common/CommonDataHandler";
import DBViewDataHandler from "../../../common/app/common/DBViewDataHandler";

var ApiHandler;

(function($S){
ApiHandler = function(arg) {
    return new ApiHandler.fn.init(arg);
};
ApiHandler.fn = ApiHandler.prototype = {
    constructor: ApiHandler,
    init: function(arg) {
        this.arg = arg;
        return this;
    }
};

$S.extendObject(ApiHandler);
ApiHandler.extend({
    _loadFileInfoData: function(callback) {
        var url = CommonConfig.getApiUrl("getFilesInfoApi", "", true);
        DataHandler.setData("filesInfoLoadStatus", "in_progress");
        var request = [], temp;
        if ($S.isStringV2(url)) {
            temp = {};
            temp.apiName = "getFilesInfoApi";
            temp.requestMethod = Api.getAjaxApiCallMethod();
            temp.url = [url];
            request.push(temp);
            AppHandler.LoadDataFromRequestApi(request, function() {
                DataHandler.setData("filesInfoLoadStatus", "completed");
                if ($S.isArray(request) && request.length === 1 && $S.isArray(request[0].response) && $S.isArray(request[0].response)) {
                    if (request[0].response.length === 1 && $S.isObject(request[0].response[0])) {
                        if (request[0].response[0].status === "SUCCESS") {
                            DataHandler.setData("filesInfoData", request[0].response[0].data);
                        }
                    }
                }
                $S.callMethod(callback);
            });
        } else {
            DataHandler.setData("filesInfoLoadStatus", "completed");
            $S.callMethod(callback);
        }
    },
    loadDataByParams: function(callback) {
        var pageName = DataHandler.getData("pageName", "");
        var filesInfoLoadStatus = DataHandler.getData("filesInfoLoadStatus", "");
        if (pageName === "manageFiles" && filesInfoLoadStatus === "not-started") {
            this._loadFileInfoData(callback);
        } else {
            $S.callMethod(callback);
        }
    }
});
ApiHandler.extend({
    _isValidTableEntry: function(dbApi) {
        if (!$S.isObject(dbApi)) {
            return false;
        }
        if (!$S.isString(dbApi.tableName) || dbApi.tableName.trim().length < 1) {
            return false;
        }
        if (!$S.isArray(dbApi.apis)) {
            return false;
        }
        return true;
    },
    _loadDBViewData: function(dbDataApis, callback) {
        var request = [], i, j, el, temp, urls;
        if ($S.isArray(dbDataApis) && dbDataApis.length > 0) {
            for(i=0; i<dbDataApis.length; i++) {
                if (!this._isValidTableEntry(dbDataApis[i])) {
                    continue;
                }
                urls = dbDataApis[i].apis.filter(function(el, j, arr) {
                    if ($S.isString(el) && el.length > 0) {
                        return true;
                    }
                    return false;
                });
                for (j=0; j<urls.length; j++) {
                    el = urls[j];
                    if ($S.isString(el) && el.split("?").length > 1) {
                        urls[j] = CommonConfig.baseApi + el + "&requestId=" + CommonConfig.requestId + "&temp_file_name=" + i + j;
                    } else {
                        urls[j] = CommonConfig.baseApi + el + "?requestId=" + CommonConfig.requestId + "&temp_file_name=" + i + j;
                    }
                }
                if (urls.length < 1) {
                    continue;
                }
                temp = {};
                temp.apis = dbDataApis[i].apis;
                temp.dataIndex = dbDataApis[i].dataIndex;
                temp.wordBreak = dbDataApis[i].wordBreak;
                temp.apiName = dbDataApis[i].tableName.trim();
                temp.requestMethod = Api.getAjaxApiCallMethodV2();
                temp.url = urls;
                request.push(temp);
            }
        }
        if (request.length < 1) {
            $S.callMethod(callback);
        } else {
            AppHandler.LoadDataFromRequestApi(request, function() {
                if ($S.isFunction(callback)) {
                    callback(request);
                }
            });
        }
    },
    _removeDeletedItem: function(dbViewData) {
        if (!$S.isObject(dbViewData)) {
            return;
        }
        var deleteTableName = DataHandler.getTableName("deleteTable");
        var deleteTableData = [], deletedIds = [], i;
        if ($S.isObject(dbViewData[deleteTableName])) {
            if ($S.isArray(dbViewData[deleteTableName].tableData)) {
                deleteTableData = dbViewData[deleteTableName].tableData;
            }
        }
        for(i=0; i<deleteTableData.length; i++) {
            if ($S.isStringV2(deleteTableData[i].deleteId)) {
                deletedIds.push(deleteTableData[i].deleteId);
            }
        }
        DBViewDataHandler.RemoveDeletedItem(dbViewData, deletedIds, deleteTableName, "tableUniqueId");
    },
    handleDefaultSorting: function(tableData) {
        this._removeDeletedItem(tableData);
        if (!$S.isObject(tableData)) {
            return;
        }
        var currentAppData = DataHandler.getCurrentAppData();
        var metaData = CommonDataHandler.getData("metaData", {});
        var defaultSorting = $S.findParam([currentAppData, metaData], "defaultSorting", []);
        return DBViewDataHandler.SortTableData(tableData, defaultSorting);
    },
    handlePageLoad: function(dbDataApis, dbTableDataIndex, callback) {
        var keys = ["appControlDataLoadStatus", "metaDataLoadStatus"];
        var status = CommonDataHandler.getDataLoadStatusByKey(keys);
        var database;
        if (status === "completed") {
            status = DataHandler.getData("dbViewDataLoadStatus");
            if (status === "not-started") {
                DataHandler.setData("dbViewDataLoadStatus", "in-progress");
                var dbViewData;
                this._loadDBViewData(dbDataApis, function(request) {
                    DataHandler.setData("dbViewDataLoadStatus", "completed");
                    database = AppHandler.GenerateDatabase(request, dbTableDataIndex);
                    dbViewData = DataHandler.getData("dbViewData", {});
                    dbViewData = AppHandler.MergeDatabase(dbViewData, database);
                    DataHandler.setData("dbViewData", dbViewData);
                    $S.callMethod(callback);
                });
            } else {
                $S.callMethod(callback);
            }
        }
    },
    handlePageLoadV2: function(getTableDataApiNameKey, tableFilterParam, dbTableDataIndex, combineTableData, callback) {
        var keys = ["appControlDataLoadStatus", "metaDataLoadStatus"];
        var status = CommonDataHandler.getDataLoadStatusByKey(keys);
        var status2 = DataHandler.getData("dbViewDataLoadStatus");
        if (status === "completed" && status2 === "completed") {
            status = DataHandler.getData("dbTableDataLoadStatus");
            if (status === "not-started") {
                DataHandler.setData("dbTableDataLoadStatus", "in-progress");
                var url = CommonConfig.getApiUrl(getTableDataApiNameKey, null, true);
                var dynamicFilenamesFilterParam = DataHandler.getAppData("dynamicFilenamesFilterParam", {});
                var dbViewData;
                AppHandler.LoadTableData(url, tableFilterParam, dynamicFilenamesFilterParam, dbTableDataIndex, function(database) {
                    DataHandler.setData("dbTableDataLoadStatus", "completed");
                    dbViewData = DataHandler.getData("dbViewData", {});
                    dbViewData = AppHandler.MergeDatabase(dbViewData, database);
                    AppHandler.CombineTableData(dbViewData, combineTableData);
                    ApiHandler.handleDefaultSorting(dbViewData);
                    DataHandler.setData("dbViewData", dbViewData);
                    $S.callMethod(callback);
                });
            } else {
                $S.callMethod(callback);
            }
        }
    }
});
})($S);

export default ApiHandler;
