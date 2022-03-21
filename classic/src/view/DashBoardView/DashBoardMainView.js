Ext.define("GSmartApp.view.DashBoardView.DashBoardMainView", {
    extend: "Ext.container.Container",
    xtype: "DashBoardMainView",
    id: "DashBoardMainView",
    reference: "DashBoardMainView",
    controller: "DashBoardMainViewController",
    requires: ["Ext.chart.*"],
    viewModel: {
        type: "DashBoardMainViewModel",
    },
    layout: "border",
    items: [
        {
            region: "north",
            border: false,
            height: "50%",
            margin: 1,
            layout: "hbox",
            items: [
                {
                    // xtype: "POrderStatusChart",
                    xtype: "POSChart",
                    border: true,
                    margin: 1,
                    height: "100%",
                    flex: 3,
                },
                {
                    // xtype: "PieChartMarketType",
                    xtype: "MTChart",
                    border: true,
                    margin: 1,
                    height: "100%",
                    flex: 2,
                },
            ],
        },
        {
            region: "center",
            border: false,
            height: "50%",
            margin: 1,
            layout: "hbox",
            items: [
                {
                    // xtype: "PContractChartView",
                    xtype: "PCChart",
                    border: true,
                    margin: 1,
                    height: "100%",
                    flex: 3,
                },
                {
                    // xtype: "LineChartRegisterCodeCount",
                    xtype: "RCCChart",
                    border: true,
                    margin: 1,
                    height: "100%",
                    flex: 2,
                },
            ],
        },
    ],
});
