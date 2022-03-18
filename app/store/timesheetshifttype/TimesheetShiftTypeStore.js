Ext.define('GSmartApp.store.timesheetshifttype.TimesheetShiftTypeStore', {
    extend: 'Ext.data.Store',
	alias: 'store.TimesheetShiftTypeStore',
	storeId: 'TimesheetShiftTypeStore',
	fields: [
        {name: 'id', type: 'int'},
		{
            name    : 'nameCode', 
            convert : function (value, rec) {
                var result = '';
                var name = rec.get('name');
                var code = rec.get('code');

				if(name != null && name != ''){
					result += name;
				}
				if(code != null && code != ''){
					result += ' (' + code + ')';
				}

                return result;
            }
        },
	],
	
	loadStore:function(){
		var me=this;
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttype/getall',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
    //lấy danh sách ca làm việc không có trong đơn vị
    loadStorebyOrgid_link:function(orgid_link, is_ca_an){
		var me=this;
        var params = new Object();
        params.id = orgid_link;
        params.is_ca_an = is_ca_an;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttype/getbyorgid_link',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	//lấy danh sách ca làm việc trong đơn vị
	loadStoreShiftbyOrgid_link:function(orgid_link){
		var me=this;
        var params = new Object();
        params.id = orgid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttype/getshiftbyorgid_link',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	//lấy danh sách ca làm việc không có trong đơn vị hoặc của time sheet shift type org hiện tại
    loadStorebyOrgid_link_shift_type_org:function(orgid_link, is_ca_an, timesheet_shift_type_id_link){
		var me=this;
        var params = new Object();
        params.timesheet_shift_type_id_link = timesheet_shift_type_id_link;
        params.id = orgid_link;
        params.is_ca_an = is_ca_an;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/timesheetshifttype/getbyorgid_link_shift_type_org',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
});
