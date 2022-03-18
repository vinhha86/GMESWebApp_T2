Ext.define("GSmartApp.store.DashBoardView.MTChartStore", {
    extend: "Ext.data.Store",
    alias: "store.MTChartStore",

    fields: [
        { name: "marketName", type: "string" },
        { name: "sum", type: "int" },
    ],
    data: [],

    loadData: function () {
        var params = new Object();

        this.setProxy({
            type: "ajax",

            actionMethods: {
                create: "POST",
                read: "POST",
                update: "POST",
                destroy: "POST",
            },

            url:
                config.getAppBaseUrl() +
                "/api/v1/pcontract_po/getForMarketTypeChart",

            paramsAsJson: true,
            extraParams: params,

            noCache: false,

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

            reader: {
                type: "json",
                rootProperty: "data",
            },
        });

        this.loadPage(1, {
            scope: this,
            callback: function (records, operation, success) {},
        });
    },
});
