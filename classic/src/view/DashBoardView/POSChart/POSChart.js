// POrderStatusBarChart contains ChartView and TableView
Ext.define("GSmartApp.view.DashBoardView.POSChart.POSChart", {
    extend: "Ext.panel.Panel",
    xtype: "POSChart",

    controller: "POSChartController",
    viewModel: "POSChartViewModel",

    layout: "fit",

    // Set two view (chart and table) for POSChart part
    // Chart view is default
    items: [
        // Chart view
        {
            xtype: "OSBarChart",

            margin: "1",
            flex: 1,

            bind: {
                hidden: "{isTableShowed}",
            },
        },
        // Table view
        {
            xtype: "OSGrid",

            margin: "1",
            flex: 1,

            bind: {
                hidden: "{!isTableShowed}",
            },
        },
    ],
    // Setup button at the top
    dockedItems: [
        {
            xtype: "toolbar",

            dock: "top",
            border: true,

            height: 45,

            style: "",

            items: [
                {
                    xtype: "button",

                    itemId: "swapViewBtn",
                    tooltip: "Đổi góc nhìn",

                    iconCls: "x-fa fa-eye",
                },
            ],
        },
    ],
});
