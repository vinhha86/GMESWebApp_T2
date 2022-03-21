// Controller for POrderStatusBarChart
Ext.define("GSmartApp.view.DashBoardView.POSChart.POSChartController", {
    extend: "Ext.app.ViewController",
    alias: "controller.POSChartController",

    control: {
        "#swapViewBtn": {
            click: "onClickSwapViewBtn",
        },
    },

    init: function () {
        this.loadStoreData();
        this.setupChartCaption();
    },

    //// Setup part
    loadStoreData: function () {
        let viewModel = this.getViewModel();

        let store = viewModel.getStore("POSChartStore");

        store.loadData();
    },

    setupChartCaption: function () {
        let viewModel = this.getViewModel();

        let from = new Date();
        from.setMonth(from.getMonth() - 1);

        let to = new Date();
        to.setMonth(to.getMonth() + 12);

        viewModel.set("fromDate", from);
        viewModel.set("toDate", to);

        let titleText = `Diễn biến sản xuất từ ${Ext.Date.format(
            from,
            "d/m/y"
        )} đến ${Ext.Date.format(to, "d/m/y")}`;

        let caption = {
            title: {
                text: titleText,
                alignTo: "cartesian",
            },
        };

        viewModel.set("chartCaption", caption);
    },
    ////

    //// Click button handler
    onClickSwapViewBtn: function () {
        let viewModel = this.getViewModel();

        let isTableShowed = viewModel.get("isTableShowed");

        viewModel.set("isTableShowed", !isTableShowed);
    },
    ////
});
