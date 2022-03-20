// MarketTypeChart (Pie chart)
Ext.define("GSmartApp.view.DashBoardView.MTChart.MTChart", {
  extend: "Ext.panel.Panel",
  xtype: "MTChart",

  controller: "MTChartController",
  viewModel: "MTChartViewModel",

  layout: "fit",

  items: [
    {
      xtype: "polar",

      // width: "90%",
      // height: "90%",

      padding: "25 25 25 25",

      theme: "green",
      interactions: "rotate",

      bind: {
        store: "{MTChartStore}",
        captions: "{chartCaption}",
      },

      series: [
        {
          type: "pie3d",

          angleField: "sum",
          label: {
            field: "marketName",
          },

          showInLegend: true,
          highlight: true,

          donut: 30,

          tooltip: {
            trackMouse: true,

            renderer: "onToolTipRender",
          },

          renderer: "onSeriesRender",
        },
      ],

      legend: {
        field: "marketName",
        docked: "bottom",
      },
    },
  ],
});
