Ext.define("GSmartApp.view.DashBoardView.RCCChart.RCCChart", {
    extend: "Ext.panel.Panel",
    xtype: "RCCChart",

    controller: "RCCChartController",
    viewModel: "RCCChartViewModel",

    layout: "fit",

    items: [],

    dockedItems: [
        {
            xtype: "toolbar",

            dock: "top",
            layout: "hbox",

            items: [
                {
                    xtype: "datefield",

                    labelWidth: 0,

                    emptyText: "Ngày",

                    format: "d/m/Y",
                    margin: "5 1 5 0",
                    width: 130,
                    enableKeyEvents: true,
                },
                {
                    xtype: "combo",

                    fieldLabel: "Đơn vị",

                    bind: {
                        store: "{FactoryStore}",
                        value: "{defaultFactory}",
                    },

                    displayField: "factoryName",
                    valueField: "factoryId",

                    width: 140,
                    labelWidth: 50,
                },
            ],
        },
    ],
});
