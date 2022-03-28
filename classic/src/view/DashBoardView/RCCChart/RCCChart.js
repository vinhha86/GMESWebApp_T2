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
                    xtype: "combo",

                    fieldLabel: "Năm",

                    bind: {
                        store: "{YearStore}",
                        value: "{currentYear}",
                    },

                    displayField: "name",
                    valueField: "value",

                    width: 120,
                    labelWidth: 30,
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
