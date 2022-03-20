Ext.define('GSmartApp.view.baocao_ns.BaoCaoNS_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoNS_ViewController',
    init: function () {
    },
    control: {
        '#baocao_ns': {
            afterrender: 'onAfterrender'
        },
        '#date': {
            change: 'onDateChange'
        },
        '#btnRefresh': {
            click: 'onRefresh'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var date = viewModel.get('date');
        console.log(date);
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.getForBaoCaoNS(date);
    },
    onRefresh: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.load();
    },
    onDateChange: function( datefield, newValue, oldValue, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        console.log(newValue);
        // var date = viewModel.get('date');
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.getForBaoCaoNS(newValue);
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onExport_Excel: function () {
        var viewmodel = this.getViewModel();
        var me = this;
        var grid = this.getView();
        
        var params = new Object();
        params.month = viewmodel.get('timesheetdaily.month');
        params.year = viewmodel.get('timesheetdaily.year');
        params.orgid_link = viewmodel.get('timesheetdaily.orgid_link');
        params.grantid_link = viewmodel.get('timesheetdaily.grantid_link');
        params.personnel_code = viewmodel.get('timesheetdaily.personnel_code');

        if (null != params.grantid_link){
            grid.setLoading("Đang tính dữ liệu");

            var fileName = "Bangcong_T" + params.month + "_" + params.year + "_" + params.orgid_link + ".xlsx";

            GSmartApp.Ajax.post('/api/v1/timesheet_report/daily', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray(fileName, response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        } else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'File Excel chỉ được tải cho từng bộ phận',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
    },
})