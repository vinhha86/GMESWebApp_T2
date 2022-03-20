// OrderStatus data with table view
Ext.define("GSmartApp.view.DashBoardView.POSChart.Grid.Grid", {
  extend: "Ext.grid.Panel",
  xtype: "OSGrid",

  // requires

  controller: "OSGridController",

  viewConfig: {
    enableTextSelection: true,

    columnLines: true,
    rowLines: true,
  },

  bind: {
    store: "{POSChartStore}",
  },

  columns: [
    {
      text: "Trạng thái",
      dataIndex: "statusName",
      flex: 1,
    },
    {
      text: "Số lượng",
      dataIndex: "sum",
      flex: 1,
    },
  ],

  plugins: {
    // rowwidget: {},
  },
});
