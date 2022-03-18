Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListOrgViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_ListOrgViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#TimeSheetLunch_ListOrgView': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        // console.log(record);
        this.fireEvent('SelectOrg', record);
        var m = this;
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');

        var orgtypeid_link = record.get('orgtypeid_link');
        var orgid_link = record.get('id');

        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        viewModel.set('orgtypeid_link', orgtypeid_link);
        viewModel.set('orgid_link', orgid_link);

        //load danh sách ca của đơn vị
        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        TimesheetShiftTypeOrgStore.getbyorgid_link_caAn(record.get('id'), true);

        //gọi function CreateColumns
        var controler = Ext.getCmp('TimeSheetLunch_ListView').getController();
        controler.CreateColumns(record.get('id'));
        // load danh sách nhân viên và ca
        // var TimeSheetLunch_ListView = Ext.getCmp('TimeSheetLunch_ListView');
        // if(TimeSheetLunch_ListView) TimeSheetLunch_ListView.setLoading(true);
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        TimeSheetLunchStore.removeAll();
        // TimeSheetLunchStore.loadStore(orgid_link, date);
        
        // set color
        // TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa6').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa7').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa8').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa9').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa10').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa11').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa12').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa13').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa14').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa15').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa16').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa17').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa18').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa19').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa20').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa21').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa22').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa23').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa24').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa25').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa26').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa27').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa28').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa29').setFieldStyle('background-color: white;');
        // TimeSheetLunch_MainView.down('#sumCa30').setFieldStyle('background-color: white;');

        // check status xác nhận của ngày và của đơn vị
        // this.setShiftColumnConfirm();

        //
        viewModel.set('selectedRecord_Donvi', record);
    },
    setDataLunchShift: function(records){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetLunch_MainView = me.up('#TimeSheetLunch_MainView');
        if(TimeSheetLunch_MainView){
            var TimeSheetLunch_ListView = TimeSheetLunch_MainView.down('#TimeSheetLunch_ListView');
            if(TimeSheetLunch_ListView){
                var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
                // records = TimeSheetLunchStore.getData().items;
                var columns = TimeSheetLunch_ListView.getColumns();
        
                console.log(records);
                console.log(columns);
        
                var storeData = new Array();
                for(var i=0;i<records.length;i++){
                    var record = records[i];
                    var timesheet_shift_id_list = record.get('timesheet_shift_id_list');

                    for(var j=0;j<timesheet_shift_id_list.length;j++){
                        var timesheet_shift_id = timesheet_shift_id_list[j];
                        for(var k=0;j<columns.length;k++){
                            var column = columns[k];
                            if(column.timesheet_shift_id == timesheet_shift_id){
                                record.set(column.dataIndex, true);
                            }
                        }
                    }
                    storeData.push(record.data);
                }
                TimeSheetLunchStore.setData(storeData)
                TimeSheetLunchStore.commitChanges();
            }
        }

        
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
                    console.log(response);

                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].name == 'Ca ăn 1') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa1Confirm', true);
                            } else {
                                viewModel.set('isCa1Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 2') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa2Confirm', true);
                            } else {
                                viewModel.set('isCa2Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 3') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa3Confirm', true);
                            } else {
                                viewModel.set('isCa3Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 4') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa4Confirm', true);
                            } else {
                                viewModel.set('isCa4Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 5') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa5Confirm', true);
                            } else {
                                viewModel.set('isCa5Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 6') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa6Confirm', true);
                            } else {
                                viewModel.set('isCa6Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 7') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa7Confirm', true);
                            } else {
                                viewModel.set('isCa7Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 8') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa8Confirm', true);
                            } else {
                                viewModel.set('isCa8Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 9') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa9Confirm', true);
                            } else {
                                viewModel.set('isCa9Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 10') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa10Confirm', true);
                            } else {
                                viewModel.set('isCa10Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 11') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa11Confirm', true);
                            } else {
                                viewModel.set('isCa11Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 12') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa12Confirm', true);
                            } else {
                                viewModel.set('isCa12Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 13') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa13Confirm', true);
                            } else {
                                viewModel.set('isCa13Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 14') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa14Confirm', true);
                            } else {
                                viewModel.set('isCa14Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 15') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa15Confirm', true);
                            } else {
                                viewModel.set('isCa15Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 16') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa16Confirm', true);
                            } else {
                                viewModel.set('isCa16Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 17') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa17Confirm', true);
                            } else {
                                viewModel.set('isCa17Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 18') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa18Confirm', true);
                            } else {
                                viewModel.set('isCa18Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 19') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa19Confirm', true);
                            } else {
                                viewModel.set('isCa19Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 20') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa20Confirm', true);
                            } else {
                                viewModel.set('isCa20Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 21') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa21Confirm', true);
                            } else {
                                viewModel.set('isCa21Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 22') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa22Confirm', true);
                            } else {
                                viewModel.set('isCa22Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 23') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa23Confirm', true);
                            } else {
                                viewModel.set('isCa23Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 24') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa24Confirm', true);
                            } else {
                                viewModel.set('isCa24Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 25') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa25Confirm', true);
                            } else {
                                viewModel.set('isCa25Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 26') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa26Confirm', true);
                            } else {
                                viewModel.set('isCa26Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 27') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa27Confirm', true);
                            } else {
                                viewModel.set('isCa27Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 28') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa28Confirm', true);
                            } else {
                                viewModel.set('isCa28Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 29') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa29Confirm', true);
                            } else {
                                viewModel.set('isCa29Confirm', false);
                            }
                        }else
                        if (data[i].name == 'Ca ăn 30') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa30Confirm', true);
                            } else {
                                viewModel.set('isCa30Confirm', false);
                            }
                        }

                    }

                    if (viewModel.get('isCa1Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa2Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa3Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa4Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa5Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: white;');

                    if (viewModel.get('isCa6Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa6').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa6').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa7Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa7').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa7').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa8Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa8').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa8').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa9Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa9').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa9').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa10Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa10').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa10').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa11Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa11').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa11').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa12Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa12').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa12').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa13Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa13').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa13').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa14Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa14').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa14').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa15Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa15').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa15').setFieldStyle('background-color: white;');

                    if (viewModel.get('isCa16Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa16').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa16').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa17Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa17').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa17').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa18Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa18').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa18').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa19Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa19').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa19').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa20Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa20').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa20').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa21Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa21').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa21').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa22Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa22').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa22').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa23Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa23').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa23').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa24Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa24').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa24').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa25Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa25').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa25').setFieldStyle('background-color: white;');

                    if (viewModel.get('isCa26Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa26').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa26').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa27Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa27').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa27').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa28Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa28').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa28').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa29Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa29').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa29').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa30Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa30').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa30').setFieldStyle('background-color: white;');
                }
            })
    },
    // checkStatus: function(orgid_link, date){
    //     var viewModel = this.getViewModel();
    //     var params = new Object();
    //     params.orgid_link = orgid_link;
    //     params.date = date;

    //     GSmartApp.Ajax.post('/api/v1/timesheetlunch/isconfirm', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             var response = Ext.decode(response.responseText);
    //             if (success) {
    //                 // set hidden and disabled btnConfirm...
    //                 // console.log(response);
    //                 var isConfirm = response.isConfirm;
    //                 if(isConfirm){
    //                     viewModel.set('isBtnConfirmHidden', true);
    //                     viewModel.set('isBtnUnconfirmHidden', false);
    //                     viewModel.set('isConfirm', isConfirm);
    //                 }else{
    //                     viewModel.set('isBtnConfirmHidden', false);
    //                     viewModel.set('isBtnUnconfirmHidden', true);
    //                     viewModel.set('isConfirm', isConfirm);
    //                 }

    //                 var isToday = viewModel.get('isToday');
    //                 if(isToday){
    //                     viewModel.set('isBtnUnconfirmHiddenDisabled', false);
    //                 }else{
    //                     viewModel.set('isBtnUnconfirmHiddenDisabled', true);
    //                 }

    //             } else {
    //                 Ext.MessageBox.show({
    //                     title: "Thông báo",
    //                     msg: 'Lấy status thất bại',
    //                     buttons: Ext.MessageBox.YES,
    //                     buttonText: {
    //                         yes: 'Đóng',
    //                     }
    //                 });
    //             }
    //     })

    // },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore();

        this.activeOnlyFilter = Ext.create('Ext.util.Filter', {
            id: 'activeOnlyFilter',
            property: 'status',
            value: 1
        });
        OrgStore.getFilters().add(this.activeOnlyFilter);

        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})