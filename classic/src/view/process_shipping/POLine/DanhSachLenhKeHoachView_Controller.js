Ext.define('GSmartApp.view.process_shipping.POLine.DanhSachLenhKeHoachView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DanhSachLenhKeHoachView_Controller',
    isActivate: false,
    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#DanhSachLenhKeHoachView': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onAfterrender: function(){
        var m = this;
        var me= this.getView();
        var viewModel = this.getViewModel();

        var productbuyercode = viewModel.get('productbuyercode');
        var productid_link = viewModel.get('productid_link');
        var list_po  = viewModel.get('list_po');
        // var colorid_link  = viewModel.get('colorid_link');
        // var sizesetid_link  = viewModel.get('sizesetid_link');

        // console.log(productbuyercode);
        // console.log(list_po);
        // console.log(colorid_link);
        // console.log(sizesetid_link);

        // return;

        var POrder_Grant= viewModel.getStore('POrder_Grant');
        POrder_Grant.loadDanhSachLenhKeHoach(productid_link);
        POrder_Grant.getSorters().add({
            property: 'donvi',
            direction: 'ASC'
        },{
            property: 'granttoorgname',
            direction: 'ASC'
        },{
            property: 'start_date_plan',
            direction: 'ASC'
        },{
            property: 'finish_date_plan',
            direction: 'ASC'
        });
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var productbuyercode = viewModel.get('productbuyercode');
        var list_po = viewModel.get('list_po');

        var select = me.getSelectionModel().getSelection();
        if(select.length > 0){
            m.SelectPorderGrant(select);
        }else{
            // console.log('not select');
            m.SelectNoPorderGrant(productbuyercode, list_po);
        }
    },
    SelectPorderGrant: function(select){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var list_po = viewModel.get('list_po');

        // console.log(list_po);
        // console.log(select);

        var pordergrant_id = select[0].get('id');
        var list_pcontract_po = new Array();
        for(var i=0; i<list_po.length; i++){
            list_pcontract_po.push(list_po[i].data);
        }

        var params = new Object();
        params.pordergrant_id = pordergrant_id;
        params.list_pcontract_po = list_pcontract_po;
        params.colorid_link = viewModel.get('colorid_link') == null ? 0 : viewModel.get('colorid_link');
        params.sizesetid_link = viewModel.get('sizesetid_link') == null ? 0 : viewModel.get('sizesetid_link');

        GSmartApp.Ajax.post('/api/v1/schedule/create_many_porder_and_grant_byLenhKeHoach', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // success fire event etc...
                        // console.log('successed');
                        m.fireEvent('Create', response.data, response.orgid_link, response.orggrantid_link, response.remove);
                    }
                }else{
                    // console.log('failed');
                }
            })
    },
    SelectNoPorderGrant: function(productname, list_po){
        // console.log('SelectNoPorderGrant');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tạo lệnh sản xuất',
            closeAction: 'destroy',
            height: 200,
            width: 600,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CreateManyPorderView',
                viewModel: {
                    data: {
                        productname: productname,
                        list_po: list_po,
                        colorid_link: viewModel.get('colorid_link'),
                        sizesetid_link: viewModel.get('sizesetid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#CreateManyPorderView').on('Create', function (data, orgid_link, orggrantid_link, remove) {
            if (data != null)
                m.fireEvent('AddManyPlan', data, orgid_link, orggrantid_link, remove);
            // var store = viewModel.getStore('POLineStore');
            // store.load();
            form.close();
        })
    }
})