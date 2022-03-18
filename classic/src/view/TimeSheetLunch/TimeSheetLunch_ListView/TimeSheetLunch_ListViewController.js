Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_ListViewController',
    init: function () {
        var viewModel = this.getViewModel();
    },
    control: {
        '#btnConfirm': {
            click: 'onConfirm'
        },
        '#btnUnconfirm': {
            click: 'onUnconfirm'
        },
        '#btnAutoGetInfo': {
            click: 'onBtnAutoGetInfo'
        },
        '#btnSave': {
            click: 'onSave'
        },
        '#btnCancelApprove': {
            click: 'onCancel'
        },
    },
    listen: {
        store: {
            'TimeSheetLunchStore': {
                'TimeSheetLunchStore_Done': 'onTimeSheetLunchStore_Done'
            }
        }
    },
    renderedKhongAnTrua: function(value, metaData, record, rowIdx, colIdx, store){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var result = '';
        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        var items = TimesheetShiftTypeOrgStore.getData().items;

        if(value != null && value != 0){
            for(var i=0; i<items.length; i++){
                var item = items[i];
                var id = item.get('id');
                var name = item.get('name');
                var gio = item.get('gio');

                if(value == id){
                    result = gio;
                    break;
                }
            }
        }
        return result;
    },
    onTimeSheetLunchStore_Done: function () {
        var me = this;
        me.sumInfo();
        this.getView().setLoading(false);
    },
    CreateColumns: function (data) {
        var m = this;
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 5;
        //xóa cột sinh động
        // console.log(grid.headerCt.items);
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }

        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        if(TimeSheetLunch_MainView){
            TimeSheetLunch_MainView.setLoading(true);
        }

        var listtitle = [];
        var params = new Object();
        params.orgid_link = data;
        params.is_ca_an = true;
        GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn_All', Ext.JSON.encode(params),
            function (success, response, options) {
                
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var responseData = response.data;
                        responseData.sort(
                            function(a, b) {          
                               if (a.from_hour === b.from_hour) {
                                  // Price is only important when cities are the same
                                  return a.from_minute - b.from_minute;
                               }
                               return a.from_hour > b.from_hour ? 1 : -1;
                            }
                        );

                        // console.log(responseData);

                        for (var i = 0; i < responseData.length; i++) {
                            var data = responseData[i];
                            // console.log(data);
                            
                            var str = data.name.trim() + ' ';
                            var br = '<br>';
                            var time = '';
                            time += data.from_hour < 10 ? '0' + data.from_hour : data.from_hour;
                            time += data.from_minute < 10 ? ':0' + data.from_minute : ':' + data.from_minute;
                            time += ' - ';
                            time += data.to_hour < 10 ? '0' + data.to_hour : data.to_hour;
                            time += data.to_minute < 10 ? ':0' + data.to_minute : ':' + data.to_minute;
                            str += br;
                            str += time;

                            var is_active = data.is_active;
                            var timesheet_shift_type_id_link = data.timesheet_shift_type_id_link;
                            var timesheet_shift_id = data.id;

                            var columnObj = new Object();
                            columnObj.text = 'Ca ăn' + br + time;
                            columnObj.textTrue = str;
                            columnObj.textHour = time;
                            columnObj.is_active = is_active;
                            columnObj.timesheet_shift_type_id_link = timesheet_shift_type_id_link;
                            columnObj.timesheet_shift_id = timesheet_shift_id;

                            // listtitle.push(str);
                            if(columnObj.is_active){
                                listtitle.push(columnObj);
                            }

                        }
                        viewmodel.set('numberShift', response.data.length);
                        for (var i = 0; i < listtitle.length; i++) {
                            if ("" + listtitle[i].text == "") continue;

                            var column = Ext.create('Ext.grid.column.Check', {
                                text: listtitle[i].text,
                                hidden: !listtitle[i].is_active,
                                isShiftColumn: true, // de biet day la column ca an
                                timesheet_shift_type_id_link: listtitle[i].timesheet_shift_type_id_link,
                                timesheet_shift_id: listtitle[i].timesheet_shift_id,
                                textTrue: listtitle[i].textTrue,
                                textHour: listtitle[i].textHour,
                                is_active: listtitle[i].is_active,

                                sortable: false,
                                menuDisabled: true,
                                dataIndex: 'lunchShift' + (i + 1),
                                headerCheckbox: true,
                                // flex: 1,
                                width: 70,
                                listeners: {
                                    beforecheckchange: 'onBeforecheckchange',
                                    checkchange: 'onCheckchange',
                                    beforeheadercheckchange: 'onBeforeHeaderClick',
                                    // headerclick: 'onHeaderClick',
                                    headercheckchange: 'onHeaderClick',
                                },
                            })

                            // console.log('---------');
                            // console.log(listtitle[i]);
                            // console.log('lunchShift' + (i + 1));

                            grid.headerCt.insert(length, column);
                            length++;
                        }

                        // thêm cac textfield sum
                        var sumFieldContainer = grid.down('#sumFieldContainer');
                        sumFieldContainer.removeAll()
                        for (var i = 0; i < listtitle.length; i++) {
                            // console.log(listtitle[i]);
                            var textfield = Ext.create('Ext.form.field.Text', {
                                fieldLabel: listtitle[i].textHour,
                                margin: 3,
                                width: 120,
                                labelWidth: 60,
                                editable: false,
                                readOnly: true,
                            })
                            sumFieldContainer.add(textfield);
                        }

                        m.loadTimesheetLunchStore();
                        m.setShiftColumnConfirm();

                        // if(TimeSheetLunch_MainView){
                        //     TimeSheetLunch_MainView.setLoading(false);
                        // }
                    }else{
                        if(TimeSheetLunch_MainView){
                            TimeSheetLunch_MainView.setLoading(false);
                        }
                    }
                }else{
                    if(TimeSheetLunch_MainView){
                        TimeSheetLunch_MainView.setLoading(false);
                    }
                }
            })


    },
    setShiftColumnConfirm: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var orgid_link = viewModel.get('orgid_link');
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

        GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn_forConfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var data = response.data;

                    var sumFieldContainer = me.down('#sumFieldContainer');
                    var textfields = sumFieldContainer.items.items;
                    
                    for(var i=0;i<data.length;i++){
                        var gio = data[i].gio;
                        var isConfirm = data[i].isConfirm;
                        if(isConfirm){
                            for(var j=0;j<textfields.length;j++){
                                var textfield = textfields[j];
                                var fieldLabel = textfield.fieldLabel;
                                if(fieldLabel == gio){
                                    textfield.setFieldStyle('background-color: lightblue;');
                                }
                            }
                        }else{
                            for(var j=0;j<textfields.length;j++){
                                var textfield = textfields[j];
                                var fieldLabel = textfield.fieldLabel;
                                if(fieldLabel == gio){
                                    textfield.setFieldStyle('background-color: white;');
                                }
                            }
                        }
                    }
                }
            })
    },
    loadTimesheetLunchStore: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();
        var orgid_link = viewModel.get('orgid_link');
        
        // var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        // if(TimeSheetLunch_MainView){
        //     TimeSheetLunch_MainView.setLoading(true);
        // }

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        TimeSheetLunchStore.loadStore_async(orgid_link, date);
        TimeSheetLunchStore.load({
            scope: TimeSheetLunchStore,
            callback: function(records, operation, success) {
                var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
                if(TimeSheetLunch_MainView){
                    TimeSheetLunch_MainView.setLoading(false);
                }
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    // console.log(records);
                    TimeSheetLunchStore.fireEvent('TimeSheetLunchStore_Done');
                    m.setDataLunchShift(records);
                }
            }
        });
    },
    setDataLunchShift: function(records){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        var columns = me.getColumns();

        for(var i=0;i<records.length;i++){
            var record = records[i];
            var timesheet_shift_id_list = record.get('timesheet_shift_id_list');

            for(var j=0;j<timesheet_shift_id_list.length;j++){
                var timesheet_shift_id = timesheet_shift_id_list[j];
                for(var k=0;k<columns.length;k++){
                    var column = columns[k];
                    if(column.timesheet_shift_id == timesheet_shift_id){
                        record.set(column.dataIndex, true);
                    }
                }
            }
            // storeData.push(record.data);
        }
        // TimeSheetLunchStore.setData(storeData)
        TimeSheetLunchStore.commitChanges();
        m.sumInfo();
    },

    onEditCheckBox: function (editor, context, e) { },
    onBeforecheckchange: function (column, rowIndex, checked, record, e, eOpts) {
        var m = this;
        var viewModel = this.getViewModel();
        if (column.text.includes('Ca ăn 1 ') && viewModel.get('isCa1Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            // e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 2 ') && viewModel.get('isCa2Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            // e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 3 ') && viewModel.get('isCa3Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            // e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 4 ') && viewModel.get('isCa4Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            // e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 5 ') && viewModel.get('isCa5Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            // e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        return true;
    },
    onBeforeHeaderClick: function (column, checked, e, eOpts) {
        var m = this;
        var viewModel = this.getViewModel();

        if (column.text.includes('Ca ăn 1 ') && viewModel.get('isCa1Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 2 ') && viewModel.get('isCa2Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 3 ') && viewModel.get('isCa3Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 4 ') && viewModel.get('isCa4Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        if (column.text.includes('Ca ăn 5 ') && viewModel.get('isCa5Confirm') == true) {
            // TimeSheetLunchStore.rejectChanges();
            e.stopEvent();
            // record.set(column.dataIndex, !checked)
            return false;
        }
        return true;
    },
    // onHeaderClick: function (grid, column, e, t, eOpts) {
    onHeaderClick: function (column, checked, e, eOpts) {
        var m = this;
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
        var isConfirm = viewModel.get('isConfirm');
        if (isConfirm) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        var checked = column.allChecked;
        var dataIndex = column.dataIndex;

        m.onHeaderClickConfirm(column, checked, dataIndex);
    },
    onHeaderClickConfirm: function (column, checked, dataIndex) {
        var m = this;
        var viewModel = this.getViewModel();

        // console.log('Header:' + checked);

        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
        // TimeSheetLunchStore.rejectChanges();

        // store empty
        if (TimeSheetLunchStore.getData().items.length == 0) {
            return;
        }
        // neu ngay la hom qua thi khong duoc edit
        var isToday = viewModel.get('isToday');
        if (!isToday) {
            return;
        }
        // neu da xac nhan thi khong duoc edit
        var status = TimeSheetLunchStore.getData().items[0].data.status;
        if (status == 1) {
            return;
        }
        // console.log(dataIndex);
        var col = dataIndex.substr(dataIndex.length - 1);

        var lunchShift = "lunchShift" + col;
        var workingShift = "workingShift" + col;
        // console.log(lunchShift);


        // checked lunchShift
        // chọn tất cả ăn 
        if (dataIndex == lunchShift) {
            TimeSheetLunchStore.each(function (rec) {
                rec.set(lunchShift, checked);
            });
        } else {
            // checked workingShift
            //chọn tất cả (header)đi làm - ăn cũng được chọn theo
            TimeSheetLunchStore.each(function (rec) {
                rec.set(workingShift, checked);
                rec.set(lunchShift, checked);
            });
        }

        var data = new Array();
        TimeSheetLunchStore.each(function (rec) {
            var recData = rec.data;
            var obj = new Object();

            for (var i = 1; i <= col; i++) {
                var lunchShift = "lunchShift" + i;
                var workingShift = "workingShift" + i;
                obj.lunchShift = recData[lunchShift];
                obj.workingShift = recData[workingShift];
            }
            obj.personnelCode = recData.personnelCode;
            obj.personnelFullname = recData.personnelFullname;
            obj.personnelid_link = recData.personnelid_link;
            obj.workingdate = recData.workingdate;
            obj.dataIndex = col;
            data.push(obj);
        });
        // console.log(data);
        // m.saveRecord(data);
    },
    onCheckchange: function (column, rowIndex, checked, record, e, eOpts) {
        // console.log(column);
        // console.log(checked);
        var m = this;
        var viewModel = this.getViewModel();
        var isConfirm = viewModel.get('isConfirm');
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');

        // if (isConfirm) {
        //     TimeSheetLunchStore.rejectChanges();
        //     return;
        // }

        // if(column.text.includes('Ca ăn 1 ') && viewModel.get('isCa1Confirm') == true){
        //     TimeSheetLunchStore.rejectChanges();
        //     // e.stopEvent();
        //     // record.set(column.dataIndex, !checked)
        //     return;
        // }
        // if(column.text.includes('Ca ăn 2 ') && viewModel.get('isCa2Confirm') == true){
        //     TimeSheetLunchStore.rejectChanges();
        //     // e.stopEvent();
        //     // record.set(column.dataIndex, !checked)
        //     return;
        // }
        // if(column.text.includes('Ca ăn 3 ') && viewModel.get('isCa3Confirm') == true){
        //     TimeSheetLunchStore.rejectChanges();
        //     // e.stopEvent();
        //     // record.set(column.dataIndex, !checked)
        //     return;
        // }
        // if(column.text.includes('Ca ăn 4 ') && viewModel.get('isCa4Confirm') == true){
        //     TimeSheetLunchStore.rejectChanges();
        //     // e.stopEvent();
        //     // record.set(column.dataIndex, !checked)
        //     return;
        // }
        // if(column.text.includes('Ca ăn 5 ') && viewModel.get('isCa5Confirm') == true){
        //     TimeSheetLunchStore.rejectChanges();
        //     // e.stopEvent();
        //     // record.set(column.dataIndex, !checked)
        //     return;
        // }

        var dataIndex = column.dataIndex;

        // lấy số ca làm
        var numberShift = viewModel.get('numberShift');
        for (var i = 1; i <= numberShift; i++) {
            // neu check ca đi làm thi check an luôn
            if (dataIndex == 'workingShift' + i) {
                record.set('lunchShift' + i, checked);
            }
        }

        //cột đang check 
        var col = dataIndex.substr(dataIndex.length - 1);
        var recData = record.data;
        var data = new Array();
        var obj = new Object();

        for (var i = 1; i <= col; i++) {
            var lunchShift = "lunchShift" + i;
            var workingShift = "workingShift" + i;
            obj.lunchShift = recData[lunchShift];
            obj.workingShift = recData[workingShift];
        }
        obj.personnelCode = recData.personnelCode;
        obj.personnelFullname = recData.personnelFullname;
        obj.personnelid_link = recData.personnelid_link;

        obj.workingdate = recData.workingdate;
        obj.dataIndex = col;
        data.push(obj);

        // m.saveRecord(data);
    },
    saveRecord: function (data) {
        var viewModel = this.getViewModel();
        var me = this.getView();
        var th = this;
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');

        console.log(data);

        var params = new Object();
        params.data = data;
        // params.dataIndex = dataIndex;
        me.setLoading(true);
        GSmartApp.Ajax.post('/api/v1/timesheetlunch/save', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        TimeSheetLunchStore.commitChanges();
                    }
                    me.setLoading(false);
                    th.sumInfo();
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    TimeSheetLunchStore.rejectChanges();
                    me.setLoading(false);
                }
            })
    },
    onConfirm: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var orgid_link = viewModel.get('orgid_link');
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        // popup window
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Xác nhận danh sách báo ăn',
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
                xtype: 'Shift_List_View',
                viewModel: {
                    data: {
                        orgid_link: orgid_link,
                        date: date,
                        action: 'confirm'
                    }
                }
            }],
        });
        form.show();

        form.down('#Shift_List_View').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#Shift_List_View').getController().on('SelectConfirm', function (select, unselect) {
            var selectIds = new Array();
            var unselectIds = new Array();
            for (var i = 0; i < select.length; i++) {
                selectIds.push(select[i].get('id'));
            }
            for (var i = 0; i < unselect.length; i++) {
                unselectIds.push(unselect[i].get('id'));
            }

            var params = new Object();
            params.selectIds = selectIds;
            params.unselectIds = unselectIds;
            params.orgid_link = orgid_link;
            params.workingdate = date;
            params.comment = viewModel.get('record.comment');
            params.shifttypeid_link = viewModel.get('record.shifttypeid_link');

            GSmartApp.Ajax.post('/api/v1/timesheetlunch/updateStatus', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        form.close();
                        m.setShiftColumnConfirm();
                        m.reloadStore();
                        me.setLoading(false);
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        me.setLoading(false);
                    }
                })


        });
    },
    onCancel: function () {
        var me = this;

        var viewModel = this.getViewModel();
        var orgid_link = viewModel.get('orgid_link');
        var date = viewModel.get('current');

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Hủy Xác nhận danh sách báo ăn',
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
                xtype: 'HuyXacNhanView',
                viewModel: {
                    data: {
                        orgid_link: orgid_link,
                        date: date
                    }
                }
            }],
        });
        form.show();

        form.down('#HuyXacNhanView').getController().on('HuyXacNhan', function (record) {
            var data = new Object();
            data.comment = record.comment;
            data.shifttypeid_link = record.shifttypeid_link;
            data.date = date;
            data.orgid_link = orgid_link;
            viewModel.set('record', data);
            me.HuyXacNhan(data);
            form.close();

        });
    },
    HuyXacNhan: function (data) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // console.log(data);
        // return;
        
        // gui request len api
        var params = new Object();
        params.comment = data.comment;
        params.workingdate = data.date;
        params.orgid_link = data.orgid_link;
        params.shifttypeid_link = data.shifttypeid_link;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/cancel_approve', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // m.setTextfield_Ca_color(params);
                        m.reloadStore();
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lỗi huỷ xác nhận',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
        })

        
    },

    reloadStore: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var selectedRecord_Donvi = viewModel.get('selectedRecord_Donvi');

        if(selectedRecord_Donvi){
            var TimeSheetLunch_ListOrgView = Ext.getCmp('TimeSheetLunch_ListOrgView');
            if(TimeSheetLunch_ListOrgView){
                var TimeSheetLunch_ListOrgViewController = TimeSheetLunch_ListOrgView.getController();
                if(TimeSheetLunch_ListOrgViewController){
                    TimeSheetLunch_ListOrgViewController.onloadDetail(null, selectedRecord_Donvi);
                }
            }
        }
    },

    setTextfield_Ca_color: function(params){
        var viewmodel = this.getViewModel();
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');

        if (params.shifttypeid_link == 4) {
            viewmodel.set('isCa1Confirm', false);
            TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: white;');
        }
        else if (params.shifttypeid_link == 5) {
            viewmodel.set('isCa2Confirm', false);
            TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: white;');
        }
        else if (params.shifttypeid_link == 6) {
            viewmodel.set('isCa3Confirm', false);
            TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: white;');
        }
        else if (params.shifttypeid_link == 7) {
            viewmodel.set('isCa4Confirm', false);
            TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: white;');
        }
        else if (params.shifttypeid_link == 8) {
            viewmodel.set('isCa5Confirm', false);
            TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: white;');
        }
    },
    // setShiftColumnConfirm: function () {
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();

    //     var orgid_link = viewModel.get('orgid_link');
    //     var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
    //     var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

    //     var params = new Object();
    //     params.orgid_link = orgid_link;
    //     params.date = date;

    //     GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn_forConfirm', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             if (success) {
    //                 var response = Ext.decode(response.responseText);
    //                 // console.log(response);

    //                 var data = response.data;
    //                 // console.log(data);
    //                 for (var i = 0; i < data.length; i++) {
    //                     // console.log(data[i].name);
    //                     // console.log(data[i].isConfirm);
    //                     if (data[i].name == 'Ca ăn 1') {
    //                         if (data[i].isConfirm == true) {
    //                             viewModel.set('isCa1Confirm', true);
    //                         } else {
    //                             viewModel.set('isCa1Confirm', false);
    //                         }
    //                     }
    //                     if (data[i].name == 'Ca ăn 2') {
    //                         if (data[i].isConfirm == true) {
    //                             viewModel.set('isCa2Confirm', true);
    //                         } else {
    //                             viewModel.set('isCa2Confirm', false);
    //                         }
    //                     }
    //                     if (data[i].name == 'Ca ăn 3') {
    //                         if (data[i].isConfirm == true) {
    //                             viewModel.set('isCa3Confirm', true);
    //                         } else {
    //                             viewModel.set('isCa3Confirm', false);
    //                         }
    //                     }
    //                     if (data[i].name == 'Ca ăn 4') {
    //                         if (data[i].isConfirm == true) {
    //                             viewModel.set('isCa4Confirm', true);
    //                         } else {
    //                             viewModel.set('isCa4Confirm', false);
    //                         }
    //                     }
    //                     if (data[i].name == 'Ca ăn 5') {
    //                         if (data[i].isConfirm == true) {
    //                             viewModel.set('isCa5Confirm', true);
    //                         } else {
    //                             viewModel.set('isCa5Confirm', false);
    //                         }
    //                     }
    //                 }

    //                 if (viewModel.get('isCa1Confirm') == true)
    //                     TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: lightblue;');
    //                 else
    //                     TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: white;');
    //                 if (viewModel.get('isCa2Confirm') == true)
    //                     TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: lightblue;');
    //                 else
    //                     TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: white;');
    //                 if (viewModel.get('isCa3Confirm') == true)
    //                     TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: lightblue;');
    //                 else
    //                     TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: white;');
    //                 if (viewModel.get('isCa4Confirm') == true)
    //                     TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: lightblue;');
    //                 else
    //                     TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: white;');
    //                 if (viewModel.get('isCa5Confirm') == true)
    //                     TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: lightblue;');
    //                 else
    //                     TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: white;');
    //             }
    //         })
    // },
    // onConfirm: function () {
    //     var status = 1;
    //     this.updateStatus(status);
    // },
    onUnconfirm: function () {
        var status = 0;
        this.updateStatus(status);
    },
    updateStatus: function (status) {
        var viewModel = this.getViewModel();
        var m = this;
        var me = this.getView();
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var workingdate = TimeSheetLunch_MainView.down('#txtdatefield').getValue();
        var orgid_link = viewModel.get('orgid_link');

        var params = new Object();
        params.orgid_link = orgid_link;
        params.workingdate = workingdate;
        params.status = status;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/updateStatus', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
                        TimeSheetLunchStore.load();
                        m.setShiftColumnConfirm();

                        // set hidden btnConfirm
                        if (status == 1) {
                            viewModel.set('isBtnConfirmHidden', true);
                            viewModel.set('isBtnUnconfirmHidden', false);
                            viewModel.set('isConfirm', true);
                        } else {
                            viewModel.set('isBtnConfirmHidden', false);
                            viewModel.set('isBtnUnconfirmHidden', true);
                            viewModel.set('isConfirm', false);
                        }
                    }
                    me.setLoading(false);
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    me.setLoading(false);
                }
            })
    },
    onPersonnelCodeFilterKeyup: function () {
        var filterField = this.lookupReference('personnelCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.personnelCodeFilter = filters.add({
                id: 'personnelCodeFilter',
                property: 'personnelCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.personnelCodeFilter) {
            filters.remove(this.personnelCodeFilter);
            this.personnelCodeFilter = null;
        }
    },
    onPersonnelRegCodeFilterKeyup: function () {
        var filterField = this.lookupReference('personnelRegCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.personnelRegCodeFilter = filters.add({
                id: 'personnelRegCodeFilter',
                property: 'register_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.personnelRegCodeFilter) {
            filters.remove(this.personnelRegCodeFilter);
            this.personnelRegCodeFilter = null;
        }
    },
    onPersonnelFullnameFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('personnelFullnameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.personnelFullnameFilter = filters.add({
                id: 'personnelFullnameFilter',
                property: 'personnelFullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.personnelFullnameFilter) {
            filters.remove(this.personnelFullnameFilter);
            this.personnelFullnameFilter = null;
        }
    },
    sumInfo: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        var items = TimeSheetLunchStore.getData().items;
        var columns = me.getColumns();

        var sumFieldContainer = me.down('#sumFieldContainer');
        var textfields = sumFieldContainer.items.items;
        
        for(var i=0;i<columns.length;i++){
            var column = columns[i];
            var dataIndex = column.dataIndex;

            var textHour = column.textHour;
            for(var j=0;j<textfields.length;j++){
                var textfield = textfields[j];
                var fieldLabel = textfield.fieldLabel;
                if(fieldLabel == textHour){
                    // console.log(fieldLabel);
                    var total = 0;
                    for(var k=0;k<items.length;k++){
                        var item = items[k];
                        var isCheck = item.get(dataIndex);
                        if(isCheck){
                            total++;
                        }
                    }
                    textfield.setValue(total);
                }
            }
        }
    },
    // sumInfo: function () {
    //     var viewmodel = this.getViewModel();
    //     var me = this.getView();
    //     var store = viewmodel.getStore('TimeSheetLunchStore');

    //     var ca1 = 0, ca2 = 0, ca3 = 0, ca4 = 0, ca5 = 0;
    //     var ca6 = 0, ca7 = 0, ca8 = 0, ca9 = 0, ca10 = 0;
    //     var ca11 = 0, ca12 = 0, ca13 = 0, ca14 = 0, ca15 = 0;
    //     var ca16 = 0, ca17 = 0, ca18 = 0, ca19 = 0, ca20 = 0;
    //     var ca21 = 0, ca22 = 0, ca23 = 0, ca24 = 0, ca25 = 0;
    //     var ca26 = 0, ca27 = 0, ca28 = 0, ca29 = 0, ca30 = 0;

    //     console.log(store.data);

    //     for (var i = 0; i < store.data.length; i++) {
    //         var rec = store.data.items[i].data;
    //         if (rec.lunchShift1)
    //             ca1++;
    //         if (rec.lunchShift2)
    //             ca2++;
    //         if (rec.lunchShift3)
    //             ca3++;
    //         if (rec.lunchShift4)
    //             ca4++;
    //         if (rec.lunchShift5)
    //             ca5++;
    //         if (rec.lunchShift6)
    //             ca6++;
    //         if (rec.lunchShift7)
    //             ca7++;
    //         if (rec.lunchShift8)
    //             ca8++;
    //         if (rec.lunchShift9)
    //             ca9++;
    //         if (rec.lunchShift10)
    //             ca10++;
    //         if (rec.lunchShift11)
    //             ca11++;
    //         if (rec.lunchShift12)
    //             ca12++;
    //         if (rec.lunchShift13)
    //             ca13++;
    //         if (rec.lunchShift14)
    //             ca14++;
    //         if (rec.lunchShift15)
    //             ca15++;
    //         if (rec.lunchShift16)
    //             ca16++;
    //         if (rec.lunchShift17)
    //             ca17++;
    //         if (rec.lunchShift18)
    //             ca18++;
    //         if (rec.lunchShift19)
    //             ca19++;
    //         if (rec.lunchShift20)
    //             ca20++;
    //         if (rec.lunchShift21)
    //             ca21++;
    //         if (rec.lunchShift22)
    //             ca22++;
    //         if (rec.lunchShift23)
    //             ca23++;
    //         if (rec.lunchShift24)
    //             ca24++;
    //         if (rec.lunchShift25)
    //             ca25++;
    //         if (rec.lunchShift26)
    //             ca26++;
    //         if (rec.lunchShift27)
    //             ca27++;
    //         if (rec.lunchShift28)
    //             ca28++;
    //         if (rec.lunchShift29)
    //             ca29++;
    //         if (rec.lunchShift30)
    //             ca30++;
    //     }
    //     viewmodel.set('sumCa1', ca1);
    //     viewmodel.set('sumCa2', ca2);
    //     viewmodel.set('sumCa3', ca3);
    //     viewmodel.set('sumCa4', ca4);
    //     viewmodel.set('sumCa5', ca5);
    //     viewmodel.set('sumCa6', ca6);
    //     viewmodel.set('sumCa7', ca7);
    //     viewmodel.set('sumCa8', ca8);
    //     viewmodel.set('sumCa9', ca9);
    //     viewmodel.set('sumCa10', ca10);
    //     viewmodel.set('sumCa11', ca11);
    //     viewmodel.set('sumCa12', ca12);
    //     viewmodel.set('sumCa13', ca13);
    //     viewmodel.set('sumCa14', ca14);
    //     viewmodel.set('sumCa15', ca15);
    //     viewmodel.set('sumCa16', ca16);
    //     viewmodel.set('sumCa17', ca17);
    //     viewmodel.set('sumCa18', ca18);
    //     viewmodel.set('sumCa19', ca19);
    //     viewmodel.set('sumCa20', ca20);
    //     viewmodel.set('sumCa21', ca21);
    //     viewmodel.set('sumCa22', ca22);
    //     viewmodel.set('sumCa23', ca23);
    //     viewmodel.set('sumCa24', ca24);
    //     viewmodel.set('sumCa25', ca25);
    //     viewmodel.set('sumCa26', ca26);
    //     viewmodel.set('sumCa27', ca27);
    //     viewmodel.set('sumCa28', ca28);
    //     viewmodel.set('sumCa29', ca29);
    //     viewmodel.set('sumCa30', ca30);

    //     // set cac sum textfield hidden
    //     viewmodel.set('isCa1Hidden', true);
    //     viewmodel.set('isCa2Hidden', true);
    //     viewmodel.set('isCa3Hidden', true);
    //     viewmodel.set('isCa4Hidden', true);
    //     viewmodel.set('isCa5Hidden', true);
    //     viewmodel.set('isCa6Hidden', true);
    //     viewmodel.set('isCa7Hidden', true);
    //     viewmodel.set('isCa8Hidden', true);
    //     viewmodel.set('isCa9Hidden', true);
    //     viewmodel.set('isCa10Hidden', true);
    //     viewmodel.set('isCa11Hidden', true);
    //     viewmodel.set('isCa12Hidden', true);
    //     viewmodel.set('isCa13Hidden', true);
    //     viewmodel.set('isCa14Hidden', true);
    //     viewmodel.set('isCa15Hidden', true);
    //     viewmodel.set('isCa16Hidden', true);
    //     viewmodel.set('isCa17Hidden', true);
    //     viewmodel.set('isCa18Hidden', true);
    //     viewmodel.set('isCa19Hidden', true);
    //     viewmodel.set('isCa20Hidden', true);
    //     viewmodel.set('isCa21Hidden', true);
    //     viewmodel.set('isCa22Hidden', true);
    //     viewmodel.set('isCa23Hidden', true);
    //     viewmodel.set('isCa24Hidden', true);
    //     viewmodel.set('isCa25Hidden', true);
    //     viewmodel.set('isCa26Hidden', true);
    //     viewmodel.set('isCa27Hidden', true);
    //     viewmodel.set('isCa28Hidden', true);
    //     viewmodel.set('isCa29Hidden', true);
    //     viewmodel.set('isCa30Hidden', true);

    //     // loop qua danh sach ca cot cua bang, cot nao hidden thi set hidden cho textfield sum tuong ung
    //     // console.log(store);
    //     // console.log(me);
    //     var columns = me.getColumns();
    //     console.log(columns);

    //     for(var i=0; i<columns.length; i++){
    //         if(columns[i].isShiftColumn && !columns[i].hidden){
    //             var fullColumnIndex = columns[i].fullColumnIndex;
    //             // fullColumnIndex = 5 -> ca 1, 6 -> 2 ...
    //             viewmodel.set('isCa' + (fullColumnIndex - 4) + 'Hidden', false);
    //         }
    //     }
    // },
    onSave: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var data = new Array();

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        var storeData = TimeSheetLunchStore.getData().items;
        var modifiers = TimeSheetLunchStore.getModifiedRecords();

        var columns = me.getColumns();

        // console.log(storeData);
        // console.log(modifiers); 
        // console.log(columns);

        // return;

        for (var i = 0; i < modifiers.length; i++) {
            var recData = modifiers[i].data;
            var nolunch_shift_idlink = recData.nolunch_shift_idlink;

            if(isNaN(nolunch_shift_idlink)){
                nolunch_shift_idlink = null;
                modifiers[i].set('nolunch_shift_idlink', null);
            }

            var modified = modifiers[i].modified;
            // console.log(recData);
            // console.log(nolunch_shift_idlink);
            // console.log(modifiers[i]);
            // console.log(modified);
            var arr = new Array();

            for(var j=0;j<columns.length;j++){
                var column = columns[j];
                if(column.isShiftColumn){
                    var o = new Object();
                    o.lunchShift = recData[column.dataIndex];
                    o.nolunch_shift_idlink = nolunch_shift_idlink;
                    o.timesheet_shift_id = column.timesheet_shift_id; // timesheet shift org
                    o.timesheet_shift_type_id_link = column.timesheet_shift_type_id_link; // timesheet shift
                    arr.push(o);
                }
                
            }

            // console.log(arr.length);
            console.log(arr);

            for (var j = 0; j < arr.length; j++) {
                var obj = new Object();
                obj.lunchShift = arr[j].lunchShift;
                obj.workingShift = false;
                obj.personnelCode = recData.personnelCode;
                obj.personnelFullname = recData.personnelFullname;
                obj.personnelid_link = recData.personnelid_link;
                obj.workingdate = recData.workingdate;
                obj.dataIndex = arr[j].dataIndex;
                obj.orgid_link = recData.orgid_link;
                obj.orgmanagerid_link = recData.orgmanagerid_link;
                obj.nolunch_shift_idlink = arr[j].nolunch_shift_idlink;
                obj.timesheet_shift_id = arr[j].timesheet_shift_id;
                obj.timesheet_shift_type_id_link = arr[j].timesheet_shift_type_id_link;

                data.push(obj);
            }
        }

        // dataIndex: "1"
        // lunchShift: true
        // personnelCode: "101010"
        // personnelFullname: "Phạm Thị Quân"
        // personnelid_link: 3584
        // workingShift: false
        // workingdate: "2021-10-28T17:00:00.000+0000"

        m.saveRecord(data);
    },
    onBtnAutoGetInfo: function () {
        // popup window danh sach ca -> chon
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var orgid_link = viewModel.get('orgid_link');
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();
        //
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tự động lấy dữ liệu danh sách báo ăn',
            closeAction: 'destroy',
            // height: Ext.getBody().getViewSize().height * .95,
            // width: Ext.getBody().getViewSize().width * .95,
            height: 300,
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Shift_List_View',
                viewModel: {
                    data: {
                        orgid_link: orgid_link,
                        date: date,
                        action: 'autoGetInfo'
                    }
                }
            }],
        });
        form.show();

        form.down('#Shift_List_View').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#Shift_List_View').getController().on('Select', function (listCa, data) {
            console.log(listCa);
            console.log(data);
            viewModel.set('personnelCodeFilterValue', null);
            viewModel.set('personnelRegCodeFilterValue', null);
            viewModel.set('personnelFullnameFilterValue', null);
            m.personnelCodeFilter = null;
            m.personnelRegCodeFilter = null;
            m.personnelFullnameFilter = null;

            var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
            TimeSheetLunchStore.clearFilter();
            TimeSheetLunchStore.rejectChanges();
            var items = TimeSheetLunchStore.getData().items;



            // for (var i = 0; i < items.length; i++) {
            //     for (var j = 0; j < listCa.length; j++) {
            //         if (listCa[j].name == 'Ca ăn 1' && viewModel.get('isCa1Confirm') != true) {
            //             items[i].set('lunchShift1', true);
            //         }
            //         if (listCa[j].name == 'Ca ăn 2' && viewModel.get('isCa2Confirm') != true) {
            //             items[i].set('lunchShift2', true);
            //         }
            //         if (listCa[j].name == 'Ca ăn 3' && viewModel.get('isCa3Confirm') != true) {
            //             items[i].set('lunchShift3', true);
            //         }
            //         if (listCa[j].name == 'Ca ăn 4' && viewModel.get('isCa4Confirm') != true) {
            //             items[i].set('lunchShift4', true);
            //         }
            //         if (listCa[j].name == 'Ca ăn 5' && viewModel.get('isCa5Confirm') != true) {
            //             items[i].set('lunchShift5', true);
            //         }
            //     }
            // }

            // for (var i = 0; i < data.length; i++) {
            //     var gridRecord = TimeSheetLunchStore.findRecord('personnelid_link', data[i].personnelid_link, 0, false, false, true);
            //     // console.log(gridRecord);
            //     if (gridRecord) {
            //         gridRecord.set('lunchShift' + data[i].lunchShift, false);
            //     }
            // }

            form.close();
        });
    }
})