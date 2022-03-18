Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVao_SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoRaVao_SearchViewController',

    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#BaoCaoRaVao_SearchView': {
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

        var row_day = viewModel.get('row_day');
        var row_month = viewModel.get('row_month');
        var row_year = viewModel.get('row_year');
        var orgid_link_phanxuong = viewModel.get('orgid_link_phanxuong');
        var grantid_link = viewModel.get('grantid_link');

        // console.log(row_day);
        // console.log(row_month);
        // console.log(row_year);
        // console.log(orgid_link_phanxuong);
        // console.log(grantid_link);

        // var date = new Date(row_year, row_month - 1, row_day);
        // viewModel.set('date_to_calculate', date);

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

        var row_day = viewModel.get('row_day');
        var row_month = viewModel.get('row_month');
        var row_year = viewModel.get('row_year');
        var orgid_link_phanxuong = viewModel.get('orgid_link_phanxuong');
        var grantid_link = viewModel.get('grantid_link'); 
        var personnel_code = viewModel.get('personnel_code');
        var date_to_calculate = viewModel.get('date_to_calculate');

        var month = date_to_calculate.getMonth() + 1;	// Month	[mm]	(1 - 12)
        var day = date_to_calculate.getDate();		// Day		[dd]	(1 - 31)
        var year = date_to_calculate.getFullYear();	// Year		[yyyy]

        // console.log(orgid_link_phanxuong);
        // console.log(date_to_calculate);
        // console.log(day);
        // console.log(month);
        // console.log(year);

        var params = new Object();
        params.orgid_link = orgid_link_phanxuong;
        params.grantid_link = grantid_link;
        params.personnel_code = personnel_code;
        params.day = day;
        params.month = month;
        params.year = year;

        // m.fireEvent('LuuThanhCong', params);

        GSmartApp.Ajax.post('/api/v1/timesheetinout/calculate_daily', Ext.JSON.encode(params),
        function (success, response, options) {
            // me.setLoading(false);
            var response = Ext.decode(response.responseText);
            if (success) {
                if (response.respcode == 200) {
                    m.fireEvent('LuuThanhCong', response);
                }
                else {
                    Ext.Msg.show({
                        title: 'Tính toán thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }

            } else {
                Ext.Msg.show({
                    title: 'Tính toán thất bại',
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