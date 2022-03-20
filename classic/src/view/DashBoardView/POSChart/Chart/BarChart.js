// OrderStatus data with bar chart view
Ext.define("GSmartApp.view.DashBoardView.POSChart.Chart.BarChart", {
  extend: "Ext.panel.Panel",
  xtype: "OSBarChart",

  controller: "OSBarChartController",

  requires: ["Ext.chart.theme.Muted"],

  layout: "fit",
  innerPadding: "0 10 0 10",

  items: [
    {
      xtype: "cartesian",

      width: "100%",
      height: "100%",

      // theme
      // interactions

      bind: {
        store: "{POSChartStore}",
        captions: "{chartCaption}",
      },

      axes: [
        {
          type: "numeric3d",
          position: "left",

          fields: "sum",

          grid: true,
        },
        {
          type: "category3d",
          position: "bottom",

          fields: "statusName",

          grid: true,

          label: {
            rotate: {
              degrees: -20,
            },
          },
        },
      ],
      series: [
        {
          type: "bar3d",
          xField: "statusName",
          yField: "sum",
        },
      ],
    },
  ],
});
