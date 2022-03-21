// OrderStatus data with table view
Ext.define("GSmartApp.view.DashBoardView.POSChart.Grid.Grid", {
    extend: "Ext.grid.Panel",
    xtype: "OSGrid",

    requires: ["Ext.grid.plugin.RowWidget"],

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
        rowwidget: {
            widget: {
                xtype: "grid",
                viewConfig: {
                    stripeRows: false,
                },
                bind: {
                    store: "{record.porderBinding_list}",
                },

                columns: [
                    {
                        text: "Phân xưởng",
                        dataIndex: "orgName",
                        flex: 1,
                    },
                    {
                        text: "Số lượng",
                        dataIndex: "sum",
                        flex: 1,
                    },
                ],
            },
        },
    },
});
