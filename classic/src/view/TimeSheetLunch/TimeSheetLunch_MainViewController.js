Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_MainViewController',
    init: function () {

    },
    control: {
        '#txtdatefield': {
            change: 'onChange'
        }
    },
    onChange: function (datefield, newValue, oldValue, eOpts) {
        // console.log(newValue);
        var viewModel = this.getViewModel();

        var orgtypeid_link = viewModel.get('orgtypeid_link');
        var orgid_link = viewModel.get('orgid_link');
        
        var record = viewModel.get('selectedRecord_Donvi');
        if(record != null){
            var controler = Ext.getCmp('TimeSheetLunch_ListView').getController();
            controler.CreateColumns(record.get('id'));
        }

        var today = new Date();
        if (newValue.toDateString() == today.toDateString() || newValue > today) {
            viewModel.set('isToday', true);
        } else {
            viewModel.set('isToday', false);
        }
        
        if (orgid_link != null){
            this.checkStatus(orgid_link, newValue);
        }

        this.fireEvent('ChangeDate');
    },
    checkStatus: function (orgid_link, date) {
        var viewModel = this.getViewModel();
        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/isconfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    // set hidden and disabled btnConfirm...
                    // console.log(response);
                    var isConfirm = response.isConfirm;
                    viewModel.set('isConfirm', isConfirm);
                    if (isConfirm) {
                        viewModel.set('isBtnConfirmHidden', true);
                        viewModel.set('isBtnUnconfirmHidden', false);
                    } else {
                        viewModel.set('isBtnConfirmHidden', false);
                        viewModel.set('isBtnUnconfirmHidden', true);
                    }

                    var isToday = viewModel.get('isToday');
                    if (isToday) {
                        viewModel.set('isBtnUnconfirmHiddenDisabled', false);
                    } else {
                        viewModel.set('isBtnUnconfirmHiddenDisabled', true);
                    }

                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lấy status thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
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
                    console.log(data);

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
                    
                    // if (viewModel.get('isCa30Confirm') == true)
                    //     TimeSheetLunch_MainView.down('#sumCa30').setFieldStyle('background-color: lightblue;');
                    // else
                    //     TimeSheetLunch_MainView.down('#sumCa30').setFieldStyle('background-color: white;');
                }
            })
    },
})