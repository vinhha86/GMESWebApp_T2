Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoRaVaoViewController',
    init: function (view) {
        var me = this;
        var viewmodel = this.getViewModel();
        var ListOrgStore = viewmodel.getStore('ListOrgStore');
        ListOrgStore.loadOrg_ByOrgType(13);

        var session = GSmartApp.util.State.get('session');
        if (session.orgid_link != 1) {
            viewmodel.set('timesheetdaily.orgid_link', session.orgid_link);
            var grantStore = viewmodel.getStore('GrantStore');
            grantStore.getbyParent(session.orgid_link);
            // me.Search();
        }

    },
    control: {
        '#BaoCaoRaVaoView': {
            celldblclick: 'onCelldblclick'
        },
        '#cmbDonVi': {
            select: 'onSelectDonVi'
        },
        '#btnTinhToanDuLieu': {
            // click: 'onCalculate',
            click: 'onToSearchView'
        }
    },
    listen: {
        store: {
            'TimeSheetDailyStore': {
                'loadStore_done': 'onloadStore_done'
            }
        }
    },
    onSelectDonVi: function (cmb, rec, e) {
        var viewmodel = this.getViewModel();
        var grantStore = viewmodel.getStore('GrantStore');
        grantStore.getbyParent(rec.get('id'));
    },
    onloadStore_done: function (records) {
        var me = this.getView();
        me.setLoading(false);
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('TimeSheetDailyStore');
        var count = 1;
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i];
            if (data.get('sortvalue') == 0) {
                data.set('stt', count);
                count++;
            }
        }
        store.commitChanges();
    },
    Search: function () {
        var me = this.getView();
        me.setLoading("Đang tải dữ liệu");
        var viewmodel = this.getViewModel();
        var month = viewmodel.get('timesheetdaily.month');
        var year = viewmodel.get('timesheetdaily.year');
        var orgid_link = viewmodel.get('timesheetdaily.orgid_link');
        var grantid_link = viewmodel.get('timesheetdaily.grantid_link');
        var personnel_code = viewmodel.get('timesheetdaily.personnel_code');

        var store = viewmodel.getStore('TimeSheetDailyStore');
        store.loadStore(month, year, orgid_link, grantid_link, personnel_code);
    },
    
    onCelldblclick: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
    
        var TimeSheetDailyStore = viewModel.getStore('TimeSheetDailyStore');
    
        if(cellIndex < 3){ // chua den cac cot day
            return;
        }
    
        // console.log(view);
        // console.log(cellIndex); // col number start at 0
        // console.log(rowIndex); // row number start at 0
        // console.log(record);
        // console.log(e);
    
        var dataObj = new Object();
        dataObj.row_day = view.grid.columns[cellIndex].text;
        dataObj.row_month = record.get('month');
        dataObj.row_year = record.get('year');
    
        dataObj.in_time;//Thời gian check-in trong ngày (sớm nhất)
        dataObj.out_time;//Thời gian check-out trong ngày (muộn nhất)
        dataObj.lunchstart_time;//Thời giat bắt đầu ăn trưa
        dataObj.lunchend_time;//Thời gian kết thúc ăn trưa
        dataObj.totalworking_time;//Tổng thời gian 
        
        dataObj.in_time_rowid;
        dataObj.out_rowid;
        dataObj.lunchstart_rowid;
        dataObj.lunchend_rowid;
        dataObj.totalworking_time_rowid;
    
        var personnel_code = record.get('personnel_code');
        var fullname = record.get('fullname');
    
        var records = TimeSheetDailyStore.queryBy(function(record,id){
            return (record.get('personnel_code') == personnel_code && 
                    record.get('fullname') == fullname
                );
        }).items;
        for(var i=0;i<records.length;i++){
            var sortvalue = records[i].get('sortvalue');
            switch(sortvalue){
                case 0:
                    dataObj.totalworking_time = records[i].data['day'+(cellIndex-2)];
                    dataObj.totalworking_time_rowid = records[i].data.id;
                    break;
                case 1:
                    dataObj.in_time = records[i].data['day'+(cellIndex-2)];
                    dataObj.in_time_rowid = records[i].data.id;
                    if(dataObj.in_time == null || dataObj.in_time == '' || dataObj.in_time == 'x' || dataObj.in_time == 'X'){
                        dataObj.in_time_editable = true;
                    }else{
                        dataObj.in_time_editable = false;
                    }
                    break;
                case 2:
                    dataObj.lunchstart_time = records[i].data['day'+(cellIndex-2)];
                    dataObj.lunchstart_rowid = records[i].data.id;
                    if(dataObj.lunchstart_time == null || dataObj.lunchstart_time == '' || dataObj.lunchstart_time == 'x' || dataObj.lunchstart_time == 'X'){
                        dataObj.lunchstart_time_editable = true;
                    }else{
                        dataObj.lunchstart_time_editable = false;
                    }
                    break;
                case 3:
                    dataObj.lunchend_time = records[i].data['day'+(cellIndex-2)];
                    dataObj.lunchend_rowid = records[i].data.id;
                    if(dataObj.lunchend_time == null || dataObj.lunchend_time == '' || dataObj.lunchend_time == 'x' || dataObj.lunchend_time == 'X'){
                        dataObj.lunchend_time_editable = true;
                    }else{
                        dataObj.lunchend_time_editable = false;
                    }
                    break;
                case 4:
                    dataObj.out_time = records[i].data['day'+(cellIndex-2)];
                    dataObj.out_rowid = records[i].data.id;
                    if(dataObj.out_time == null || dataObj.out_time == '' || dataObj.out_time == 'x' || dataObj.out_time == 'X'){
                        dataObj.out_time_editable = true;
                    }else{
                        dataObj.out_time_editable = false;
                    }
                    break;
            }
        }
        
        // console.log(records);
        this.onDetail(dataObj, record, cellIndex);
    },
    
    onDetail: function (dataObj, record, cellIndex) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetDailyStore = viewModel.getStore('TimeSheetDailyStore');
        
        // popup window
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: record.get('fullname') + ': ' + dataObj.row_day + '/' + dataObj.row_month + '/' + dataObj.row_year,
            closeAction: 'destroy',
            // height: Ext.getBody().getViewSize().height * .95,
            // width: Ext.getBody().getViewSize().width * .95,
            height: 300,
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'BaoCaoRaVaoView_Detail',
                viewModel: {
                    data: {
                        dataObj: dataObj,
                        record: record,
                    }
                }
            }],
        });
        form.show();
    
        form.down('#BaoCaoRaVaoView_Detail').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#BaoCaoRaVaoView_Detail').getController().on('updateSuccessed', function (params) {
            var personnel_code = record.get('personnel_code');
            var fullname = record.get('fullname');

            // console.log(params);

            if(params.totalworking_time == null || params.totalworking_time == ''){
                var records = TimeSheetDailyStore.queryBy(function(record,id){
                    return (record.get('personnel_code') == personnel_code && 
                            record.get('fullname') == fullname &&
                            record.get('sortvalue') == 0
                        );
                }).items;
                if(records.length > 0){
                    var recToUpdate = records[0];
                    recToUpdate.set('day'+(cellIndex-2), params.totalworking_time);
                }
            }else
            if(params.totalworking_time != 'x' && params.totalworking_time  != 'X'){
                var ls_values = params.totalworking_time.split("/");
                if (ls_values.length > 1){
                    var records = TimeSheetDailyStore.queryBy(function(record,id){
                        return (record.get('personnel_code') == personnel_code && 
                                record.get('fullname') == fullname &&
                                record.get('sortvalue') == 0
                            );
                    }).items;
                    if(records.length > 0){
                        var recToUpdate = records[0];
                        recToUpdate.set('day'+(cellIndex-2), params.totalworking_time);
                    }
                }
            }

            if(params.in_time != null && params.in_time != '' && params.in_time != 'x' && params.in_time != 'X'){
                var ls_values = params.in_time.split("/");
                if (ls_values.length > 1){
                    var records = TimeSheetDailyStore.queryBy(function(record,id){
                        return (record.get('personnel_code') == personnel_code && 
                                record.get('fullname') == fullname &&
                                record.get('sortvalue') == 1
                            );
                    }).items;
                    if(records.length > 0){
                        var recToUpdate = records[0];
                        recToUpdate.set('day'+(cellIndex-2), params.in_time);
                    }
                }
            }

            if(params.out_time != null && params.out_time != '' && params.out_time != 'x' && params.out_time != 'X'){
                var ls_values = params.out_time.split("/");
                if (ls_values.length > 1){
                    var records = TimeSheetDailyStore.queryBy(function(record,id){
                        return (record.get('personnel_code') == personnel_code && 
                                record.get('fullname') == fullname &&
                                record.get('sortvalue') == 4
                            );
                    }).items;
                    if(records.length > 0){
                        var recToUpdate = records[0];
                        recToUpdate.set('day'+(cellIndex-2), params.out_time);
                    }
                }
            }

            if(params.lunchstart_time != null && params.lunchstart_time != '' && params.lunchstart_time != 'x' && params.lunchstart_time != 'X'){
                var ls_values = params.lunchstart_time.split("/");
                if (ls_values.length > 1){
                    var records = TimeSheetDailyStore.queryBy(function(record,id){
                        return (record.get('personnel_code') == personnel_code && 
                                record.get('fullname') == fullname &&
                                record.get('sortvalue') == 2
                            );
                    }).items;
                    if(records.length > 0){
                        var recToUpdate = records[0];
                        recToUpdate.set('day'+(cellIndex-2), params.lunchstart_time);
                    }
                }
            }

            if(params.lunchend_time != null && params.lunchend_time != '' && params.lunchend_time != 'x' && params.lunchend_time != 'X'){
                var ls_values = params.lunchend_time.split("/");
                if (ls_values.length > 1){
                    var records = TimeSheetDailyStore.queryBy(function(record,id){
                        return (record.get('personnel_code') == personnel_code && 
                                record.get('fullname') == fullname &&
                                record.get('sortvalue') == 3
                            );
                    }).items;
                    if(records.length > 0){
                        var recToUpdate = records[0];
                        recToUpdate.set('day'+(cellIndex-2), params.lunchend_time);
                    }
                }
            }
            
            form.close();
        });
    },

    // 
    onToSearchView: function(header, column, e, t,eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var timesheetdaily = viewModel.get('timesheetdaily');
        if(timesheetdaily == null){
            return;
        }
        var orgid_link_phanxuong = timesheetdaily.orgid_link; // id px
        if(orgid_link_phanxuong == null || orgid_link_phanxuong == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn phân xưởng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        // var day = column.text;
        var month = timesheetdaily.month;
        var year = timesheetdaily.year;
        var grantid_link= timesheetdaily.grantid_link;
        var personnel_code = timesheetdaily.personnel_code;

        // if(day == null || day == ''){
        //     Ext.Msg.show({
        //         title: 'Thông báo',
        //         msg: 'Bạn cần chọn ngày',
        //         buttons: Ext.MessageBox.YES,
        //         buttonText: {
        //             yes: 'Đóng',
        //         }
        //     });
        //     return;
        // }
        if(month == null || month == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn tháng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if(year == null || year == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn năm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        // return;

        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 280,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chọn ngày cần tính',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'BaoCaoRaVao_SearchView',
                viewModel: {
                    data: {
                        orgid_link_phanxuong: orgid_link_phanxuong,
                        grantid_link: grantid_link,
                        personnel_code: personnel_code,
                        row_day: 1,
                        row_month: month,
                        row_year: year,
                    }
                }
            }]
        });
        form.show();

		form.down('#BaoCaoRaVao_SearchView').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#BaoCaoRaVao_SearchView').getController().on('LuuThanhCong', function (params) {
            console.log('LuuThanhCong');
            // var store = viewModel.getStore('TimeSheetDailyStore');
            // console.log(params);
            // store.loadStore(params.month, params.year, params.orgid_link, params.grantid_link, params.personnel_code, params.day);
            form.close();
        })
    },

    // click on header
    onHeaderClick: function(header, column, e, t,eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var timesheetdaily = viewModel.get('timesheetdaily');
        if(timesheetdaily == null){
            return;
        }
        var orgid_link_phanxuong = timesheetdaily.orgid_link; // id px
        if(orgid_link_phanxuong == null || orgid_link_phanxuong == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn phân xưởng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        // console.log(header);
        // console.log(column);
        // console.log(e);
        // console.log(t);

        var day = column.text;
        var month = timesheetdaily.month;
        var year = timesheetdaily.year;

        if(day == null || day == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn ngày',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if(month == null || month == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn tháng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if(year == null || year == ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn năm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        // return;

        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 315,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Sửa thông tin nghỉ',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'AbsentView',
                viewModel: {
                    data: {
                        orgid_link_phanxuong: orgid_link_phanxuong,
                        row_day: day,
                        row_month: month,
                        row_year: year,
                    }
                }
            }]
        });
        form.show();

		form.down('#AbsentView').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#AbsentView').getController().on('LuuThanhCong', function (responseObj) {
            console.log('LuuThanhCong');
            // form.close();
        })
    },

    onCodeFilter: function () {
        var filterField = this.lookupReference('CodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'personnel_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onNameFilter: function () {
        var filterField = this.lookupReference('NameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.NameFilter = filters.add({
                id: 'NameFilter',
                property: 'fullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.NameFilter) {
            filters.remove(this.NameFilter);
            this.NameFilter = null;
        }
    },
    onExport: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();

        var month = viewmodel.get('timesheetdaily.month');
        var year = viewmodel.get('timesheetdaily.year');
        var donvi = grid.down('#cmbDonVi').getRawValue();
        var bophan = grid.down('#cmbBoPhan').getRawValue();

        var cfg = Ext.merge({
            title: donvi + "-" + bophan + " Tháng " + month + " năm " + year,
            fileName: donvi + "-" + bophan + " Tháng " + month + " năm " + year + '.' + "xlsx"
        }, {
            type: 'excel07',
            ext: 'xlsx',
            includeGroups: false,
            includeSummary: false
        });

        grid.saveDocumentAs(cfg);
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
    onCalculate: function () {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('timesheetdaily.orgid_link');
        if (orgid_link == 0 || orgid_link == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn đơn vị',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        grid.setLoading("Đang tính dữ liệu");
        var params = new Object();
        params.orgid_link = orgid_link;

        GSmartApp.Ajax.post('/api/v1/timesheetinout/calculate_daily', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('TimeSheetLunchKhachStore');
                    if (response.respcode == 200) {
                        me.Search();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            }, 120000)
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);
        
        var blob = new Blob([byte], {type: "application/xlsx"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
    }
})