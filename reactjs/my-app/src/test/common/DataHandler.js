import $S from "../../libs/stack";
var DataHandler;
(function($S) {
var tableDataIndex = ["pageName", "username", "designation", "pf_number", "hq", "bill_unit_no"];
DataHandler = function(config) {
    return new DataHandler.fn.init(config);
};
DataHandler.fn = DataHandler.prototype = {
    constructor: DataHandler,
    init: function(config) {
        this.config = config;
        return this;
    }
};
$S.extendObject(DataHandler);
DataHandler.extend({
    getTableData: function(apiResponse) {
        var templateData = [];
        var textArray = [], i, j, temp, tableRow;
        var tableData = [];
        if (apiResponse) {
            textArray = apiResponse.split("\n");
        }
        for (var i=0; i<textArray.length; i++) {
            if (textArray[i]) {
                temp = textArray[i].split(",");
                tableRow = {};
                for (j=0; j<tableDataIndex.length; j++) {
                    if (j < temp.length) {
                        tableRow[tableDataIndex[j]] = temp[j];
                    } else {
                        tableRow[tableDataIndex[j]] = temp[j];
                    }
                }
                tableData.push(tableRow);
            }
        }
        temp = {};
        for (i=0; i<tableData.length; i++) {
            if (!temp[tableData[i]["pageName"]]) {
                temp[tableData[i]["pageName"]] = [];
            }
            temp[tableData[i]["pageName"]].push(tableData[i]);
        }

        for (var pageName in temp) {
            templateData.push(temp[pageName]);
        }
        return templateData;
    }
});
})($S);
export default DataHandler;
