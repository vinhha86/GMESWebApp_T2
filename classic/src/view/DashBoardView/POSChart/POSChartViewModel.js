// ViewModel for POSChart
Ext.define("GSmartApp.view.DashBoardView.POSChart.POSChartViewModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.POSChartViewModel",

    requires: ["GSmartApp.store.DashBoardView.POSChartStore"],

    stores: {
        POSChartStore: {
            type: "POSChartStore",
        },
    },

    data: {
        // Shared variable
        isTableShowed: false, // swap view variable
        fromDate: null,
        toDate: null,

        // For chart
        chartCaption: {
            title: {
                text: "test",
                alignTo: "cartesian",
            },
        },

        // For table
    },
});
