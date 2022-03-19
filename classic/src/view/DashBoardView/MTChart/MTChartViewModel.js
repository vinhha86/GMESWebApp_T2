Ext.define("GSmartApp.view.DashBoardView.MTChart.MTChartViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.MTChartViewModel",

  requires: ["GSmartApp.store.DashBoardView.MTChartStore"],

  stores: {
    MTChartStore: {
      type: "MTChartStore",
    },
  },

  data: {
    chartCaption: {
      title: {
        text: "Thị trường",
        alignTo: "polar",
      },
    },
  },
});
