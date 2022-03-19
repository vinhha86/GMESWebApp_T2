// Controller for MTChart
Ext.define("GSmartApp.view.DashBoardView.MTChart.MTChartController", {
  extend: "Ext.app.ViewController",
  alias: "controller.MTChartController",

  init: function () {
    this.loadStoreData();
  },

  //// Setup part
  loadStoreData: function () {
    let viewModel = this.getViewModel();

    let store = viewModel.getStore("MTChartStore");

    store.loadData();
  },
  ////

  //// Render data part
  onToolTipRender: function (toolTip, record, ctx) {
    toolTip.setHtml(
      record.get("marketName") +
        ": " +
        Ext.util.Format.number(record.get("sum"), "0,000")
    );
  },

  onSeriesRender: function (sprite, config, rendererData, index) {},
  ////
});
