Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoView_Detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BaoCaoRaVaoView_Detail_ViewModel',
    requires: [
        
    ],
    stores: {
        
    },
    data: {
        dataObj: {
            row_day: null,
            row_month: null,
            row_year: null,

            in_time: null,//Thời gian check-in trong ngày (sớm nhất)
            out_time: null,//Thời gian check-out trong ngày (muộn nhất)
            lunchstart_time: null,//Thời giat bắt đầu ăn trưa
            lunchend_time: null,//Thời gian kết thúc ăn trưa
            totalworking_time: null,//Tổng thời gian 

            in_time_original: null,
            out_time_original: null,
            lunchstart_time_original: null,
            lunchend_time_original: null,
            totalworking_time_original: null,
            
            in_time_rowid: null,
            out_rowid: null,
            lunchstart_rowid: null,
            lunchend_rowid: null,
            totalworking_time_rowid: null,

            in_time_editable: null,
            out_time_editable: null,
            lunchstart_time_editable: null,
            lunchend_time_editable: null,
        },
        record: null,
    },
    formulas: {
        windowTitle: function (get) {
            if (get('dataObj') != null && get('record') != null) {
                var dataObj = get('dataObj');
                var record = get('record');
                return record.get('fullname') + ': ' + dataObj.row_day + '/' + dataObj.row_month + '/' + dataObj.row_year;
            }

            return '';
        },
        // isBtnSelectDisable: function(get){
        //     if (get('dataObj') != null){
        //         var dataObj = get('dataObj');
        //         if(
        //             dataObj.in_time == null || dataObj.in_time == '' || 
        //             dataObj.out_time == null || dataObj.out_time == '' || 
        //             dataObj.lunchstart_time == null || dataObj.lunchstart_time == '' || 
        //             dataObj.lunchend_time == null || dataObj.lunchend_time == ''
        //             ){
        //                 return true;
        //         }
        //         return false;
        //     }
        // },
    }
})