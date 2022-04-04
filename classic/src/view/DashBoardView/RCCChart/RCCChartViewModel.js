Ext.define("GSmartApp.view.DashBoardView.RCCChart.RCCChartViewModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.RCCChartViewModel",

    stores: {
        YearStore: {
            data: [
                {
                    name: new Date().getFullYear() - 1,
                    value: new Date().getFullYear() - 1,
                },
                {
                    name: new Date().getFullYear(),
                    value: new Date().getFullYear(),
                },
                {
                    name: new Date().getFullYear() + 1,
                    value: new Date().getFullYear() + 1,
                },
            ],
        },
        FactoryStore: {
            data: [
                {
                    factoryName: "DHA",
                    factoryId: 0,
                },
                {
                    factoryName: "BN1",
                    factoryId: 1,
                },
                {
                    factoryName: "BN2",
                    factoryId: 2,
                },
                {
                    factoryName: "BN3",
                    factoryId: 3,
                },
                {
                    factoryName: "NV",
                    factoryId: 4,
                },
                {
                    factoryName: "DG",
                    factoryId: 5,
                },
                {
                    factoryName: "ATV",
                    factoryId: 6,
                },
            ],
        },
    },

    data: {
        // Init default year chart
        currentYear: new Date().getFullYear(),

        // Init default factory
        defaultFactory: "DHA",
    },
});
