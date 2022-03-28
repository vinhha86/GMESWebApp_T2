Ext.define("GSmartApp.store.DashBoardView.RCCChartStore", {
    extend: "Ext.data.Store",
    alias: "store.RCCChartStore",

    fields: ["month", "work", "offWork"],
    data: [],

    loadData: function () {
        let params = new Object();

        this.setProxy({
            type: "ajax",

            actionMethods: {
                create: "POST",
                read: "POST",
                update: "POST",
                destroy: "POST",
            },
        });
    },
});
