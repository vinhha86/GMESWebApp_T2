Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVao_SearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BaoCaoRaVao_SearchViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.AbsentTypeStore'
    ],
    stores: {
        AbsentTypeStore: {
            type: 'AbsentTypeStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
    },
    data: {
        orgid_link_phanxuong: null,
        grantid_link: null,
        row_day: null,
        row_month: null,
        row_year: null,
        // value: null,
        // orgid_link_grant: null,
        date_to_calculate: new Date(),
    },
    formulas: {
        // windowTitle: function (get) {
        //     if (get('dataObj') != null && get('record') != null) {
        //         var dataObj = get('dataObj');
        //         var record = get('record');
        //         return record.get('fullname') + ': ' + dataObj.row_day + '/' + dataObj.row_month + '/' + dataObj.row_year;
        //     }

        //     return '';
        // },
    }
})