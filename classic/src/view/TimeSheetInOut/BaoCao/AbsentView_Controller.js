Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.AbsentView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AbsentView_Controller',

    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#AbsentView': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
        '#btnTest': {
            click: 'onTest'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var orgid_link_phanxuong = viewModel.get('orgid_link_phanxuong');

        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.getbyParent(orgid_link_phanxuong);
        // laod danh sach to
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dataObj = viewModel.get('dataObj');
        console.log(dataObj);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var orgid_link_phanxuong = viewModel.get('orgid_link_phanxuong');
        var row_day = viewModel.get('row_day');
        var row_month = viewModel.get('row_month');
        var row_year = viewModel.get('row_year');
        var value = viewModel.get('value');
        var orgid_link_grant = viewModel.get('orgid_link_grant');

        var params = new Object();
        params.orgid_link = orgid_link_phanxuong;
        params.row_day = row_day;
        params.row_month = row_month;
        params.row_year = row_year;
        params.grantid_link = orgid_link_grant;
        params.value = value;

        // console.log(params);
        // return;

        GSmartApp.Ajax.post('/api/v1/timesheetinout/update_daily_allrow', Ext.JSON.encode(params),
        function (success, response, options) {
            me.setLoading(false);
            var response = Ext.decode(response.responseText);
            if (success) {
                if (response.respcode == 200) {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thành công',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    m.fireEvent('LuuThanhCong', response);
                }
                else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }

            } else {
                Ext.Msg.show({
                    title: 'Lưu thất bại',
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        })
    },
})