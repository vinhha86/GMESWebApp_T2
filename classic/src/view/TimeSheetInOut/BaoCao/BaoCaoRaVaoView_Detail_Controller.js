Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoView_Detail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoRaVaoView_Detail_Controller',

    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#BaoCaoRaVaoView_Detail': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onCheckTimeString'
        },
        '#btnTest': {
            click: 'onTest'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dataObj = viewModel.get('dataObj');

        if (dataObj.in_time != null && dataObj.in_time != '' && dataObj.in_time != 'x' && dataObj.in_time != 'X'){
            var ls_values = dataObj.in_time.split("/");
            if (ls_values.length > 1){
                dataObj.in_time = ls_values[0];
                viewModel.set('dataObj.in_time',ls_values[0]);
            }
        }
        if (dataObj.out_time != null && dataObj.out_time != '' && dataObj.out_time != 'x' && dataObj.out_time != 'X'){
            var ls_values = dataObj.out_time.split("/");
            if (ls_values.length > 1){
                dataObj.out_time = ls_values[0];
                viewModel.set('dataObj.out_time',ls_values[0]);
            }
        }
        if (dataObj.lunchstart_time != null && dataObj.lunchstart_time != '' && dataObj.lunchstart_time != 'x' && dataObj.lunchstart_time != 'X'){
            var ls_values = dataObj.lunchstart_time.split("/");
            if (ls_values.length > 1){
                dataObj.lunchstart_time = ls_values[0];
                viewModel.set('dataObj.lunchstart_time',ls_values[0]);
            }
        }
        if (dataObj.lunchend_time != null && dataObj.lunchend_time != '' && dataObj.lunchend_time != 'x' && dataObj.lunchend_time != 'X'){
            var ls_values = dataObj.lunchend_time.split("/");
            if (ls_values.length > 1){
                dataObj.lunchend_time = ls_values[0];
                viewModel.set('dataObj.lunchend_time',ls_values[0]);
            }
        }
        if (dataObj.totalworking_time != null && dataObj.totalworking_time != '' && dataObj.totalworking_time != 'x' && dataObj.totalworking_time != 'X'){
            var ls_values = dataObj.totalworking_time.split("/");
            if (ls_values.length > 1){
                dataObj.totalworking_time = ls_values[0];
                viewModel.set('dataObj.totalworking_time',ls_values[0]);
            }
        }

        dataObj.in_time_original = dataObj.in_time;
        dataObj.out_time_original = dataObj.out_time;
        dataObj.lunchstart_time_original = dataObj.lunchstart_time;
        dataObj.lunchend_time_original = dataObj.lunchend_time;
        dataObj.totalworking_time_original = dataObj.totalworking_time;
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
    onCheckTimeString: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dataObj = viewModel.get('dataObj');
        var check = this.checkTimeString(dataObj.in_time);
        if(!check){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Sai định dạng: Giờ vào',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        check = this.checkTimeString(dataObj.out_time);
        if(!check){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Sai định dạng: Giờ ra',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        check = this.checkTimeString(dataObj.lunchstart_time);
        if(!check){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Sai định dạng: Bắt đầu ăn',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        check = this.checkTimeString(dataObj.lunchend_time);
        if(!check){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Sai định dạng: Kết thúc ăn',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }


        this.onSelect();
    },
    checkTimeString: function(string){
        if(string == null || string == '' || string == 'x' || string == 'X'){
            return true;
        }

        var ls_values = string.split(":");
        if(ls_values.length != 2){
            return false;
        }
        if(isNaN(ls_values[0]) || isNaN(ls_values[1])){
            return false;
        }
        if(parseInt(ls_values[0]) < 0 || parseInt(ls_values[0]) > 24){
            return false;
        }
        if(parseInt(ls_values[1]) < 0 || parseInt(ls_values[1]) > 59){
            return false;
        }
        return true;
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dataObj = viewModel.get('dataObj');

        var params = new Object();
        params.row_day = dataObj.row_day;
        params.row_month = dataObj.row_month;
        params.row_year = dataObj.row_year;
        
        params.in_time_rowid = dataObj.in_time_rowid;
        params.out_time_rowid = dataObj.out_rowid;
        params.lunchstart_rowid = dataObj.lunchstart_rowid;
        params.lunchend_rowid = dataObj.lunchend_rowid;
        params.totalworking_time_rowid = dataObj.totalworking_time_rowid;

        if(dataObj.in_time == dataObj.in_time_original){
            params.in_time = dataObj.in_time;
        }else{
            params.in_time = dataObj.in_time + '/1';
        }
        if(dataObj.out_time == dataObj.out_time_original){
            params.out_time = dataObj.out_time;
        }else{
            params.out_time = dataObj.out_time + '/1';
        }
        if(dataObj.lunchstart_time == dataObj.lunchstart_time_original){
            params.lunchstart_time = dataObj.lunchstart_time;
        }else{
            params.lunchstart_time = dataObj.lunchstart_time + '/1';
        }
        if(dataObj.lunchend_time == dataObj.lunchend_time_original){
            params.lunchend_time = dataObj.lunchend_time;
        }else{
            params.lunchend_time = dataObj.lunchend_time + '/1';
        }
        if(dataObj.totalworking_time == dataObj.totalworking_time_original){
            params.totalworking_time = dataObj.totalworking_time;
        }else{
            params.totalworking_time = dataObj.totalworking_time + '/1';
        }


        GSmartApp.Ajax.post('/api/v1/timesheetinout/update_daily', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    // console.log('successed');
                    params.totalworking_time = response.data;
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Cập nhật thành công',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    m.fireEvent('updateSuccessed', params);
                    // console.log(dataObj);
                    // console.log(response);
                }else{
                    // console.log('failed');
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    // console.log(response);
                }
        })     
    },
})