// Controller for BarChartData
Ext.define("GSmartApp.view.DashBoardView.POSChart.Chart.BarChartController", {
    extend: "Ext.app.ViewController",
    alias: "controller.OSBarChartController",

    init: function () {},

    onToolTipRender: function (toolTip, record, ctx) {
        let porderBindingList = record.get("porderBinding_list");

        let htmlTT = "";

        for (let i = 0; i < porderBindingList.length; i++)
            htmlTT += `<p>${porderBindingList[i].orgName}: ${porderBindingList[i].sum}</p>`;

        toolTip.setHtml(htmlTT);
    },
});
