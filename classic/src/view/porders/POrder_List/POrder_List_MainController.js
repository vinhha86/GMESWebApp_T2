Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_MainController',
    isActivate: false,
    init: function () {
        var viewModel = this.getViewModel();

        var VendorStore = viewModel.getStore('POrder_ListVendorStore');
        VendorStore.loadStore(11);
        VendorStore.sort('vendorname', 'ASC');
        var BuyerStore = viewModel.getStore('POrder_ListBuyerStore');
        BuyerStore.loadStore(12);
        BuyerStore.sort('buyername', 'ASC');
        var ListStatusStore = viewModel.getStore('POrder_ListStatusStore');
        ListStatusStore.loadStore();
        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadStore(13, null);

        //
        var objSearchPorder = GSmartApp.util.State.get('objSearchPorder');
        if (objSearchPorder != null) {
            objSearchPorder.golivedatefrom = new Date(objSearchPorder.golivedatefrom);
            objSearchPorder.golivedateto = new Date(objSearchPorder.golivedateto);
            viewModel.set('objSearch', objSearchPorder);
            GSmartApp.util.State.set('objSearchPorder', null);
        }else{
            viewModel.set('objSearch.golivedatefrom', new Date(new Date().getTime() - 30 * 86400000));
            viewModel.set('objSearch.golivedateto', new Date((new Date()).getFullYear(), (new Date()).getMonth() + 6, 1));
        }
    },
    control: {
        // '#porderlistmain': {
        //     // activate: 'onActivate',
        //     itemdblclick: 'onitemdblclick',
        // },
        '#btnTimKiem': {
            click: 'onBtnTimKiem'
        },
        '#btnExcel':{
            click: 'onExportExcel'
        }
    },
    listen: {
        store: {
            'POrder_ListStore': {
                'loadStoreBySearch_Done': 'onloadStoreBySearch_Done'
            }
        }
    },
    onloadStoreBySearch_Done: function () {
        this.getView().setLoading(false);
    },
    
    onBtnTimKiem: function () {
        var me = this.getView();
        me.setLoading("??ang t???i d??? li???u");

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('POrder_ListStore');
        //

        var objSearch = viewModel.get('objSearch'); // console.log(objSearch);
        var pobuyer = objSearch.pobuyer;
        var povendor = objSearch.povendor;
        var style = objSearch.style;
        var contractcode = objSearch.contractcode;
        var buyerid = objSearch.buyerid;
        var vendorid = objSearch.vendorid;
        var factoryid = objSearch.factoryid;
        var orderdatefrom = objSearch.orderdatefrom;
        var orderdateto = objSearch.orderdateto;
        var golivedatefrom = objSearch.golivedatefrom;
        var golivedateto = objSearch.golivedateto;
        var status = objSearch.status;

        var isHavingCri = false;
        if (pobuyer == "" || pobuyer == null) {
            pobuyer = "";
        } else 
            isHavingCri = true;
        // if (povendor == "" || povendor == null) {
        //     povendor = "";
        // } else 
        // isHavingCri = true;
        
        if (style == "" || style == null) {
            style = "";
        } else 
            isHavingCri = true;
        
        // if (contractcode == "" || contractcode == null) {
        //     contractcode = "";
        // } else 
        //     isHavingCri = true;

        if (buyerid == "" || buyerid == null) {
            buyerid = null;
        } else 
            isHavingCri = true;
        
        if (vendorid == "" || vendorid == null) {
            vendorid = null;
        } else 
            isHavingCri = true;
        
        // if (factoryid == "") {
        //     factoryid = null;
        // } else 
        // isHavingCri = true;
        
        // if (golivedatefrom == "") {
        //     golivedatefrom = null;
        // } else 
        // isHavingCri = true;
        
        // if (golivedateto == "") {
        //     golivedateto = null;
        // } else 
        // isHavingCri = true;
        
        // if (status == null || status == "") {
        //     status = [];
        // } else 
        // isHavingCri = true;
        
        if (isHavingCri){
            store.loadStoreBySearch(pobuyer, povendor, style, contractcode,
                buyerid, vendorid, factoryid,
                golivedatefrom, golivedateto,
                status, 500, 1);
        } else {
            Ext.Msg.show({
                title: 'Th??ng b??o',
                msg: 'C???n ph???i c?? ??t nh???t 01 ??i???u ki???n l???c',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng',
                }
            });
            me.setLoading(false);            
        }
    },
    onitemdblclick: function (m, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        var objSearch = viewModel.get('objSearch');
        GSmartApp.util.State.set('objSearchPorder', objSearch);
        console.log(objSearch);

        var id = record.data.id;
        this.redirectTo("porderlistmain/" + id + "/edit");
    },
    onMenu_POrderList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                // {
                //     text: 'Chu???n b??? s???n xu???t',
                //     reference: 'pprocess_productivity',
                //     separator: true,
                //     margin: '10 0 0',
                //     iconCls: 'x-fa fas fa-bell yellowIcon',
                //     handler: function () {
                //         if (record.get('status') > 0 && record.get('status') < 4) {   // 2   
                //             Ext.Msg.show({
                //                 title: 'Th??ng b??o',
                //                 msg: '?????i tr???ng th??i l???nh th??nh chu???n b??? s???n xu???t ?',
                //                 buttons: Ext.Msg.YESNO,
                //                 icon: Ext.Msg.QUESTION,
                //                 buttonText: {
                //                     yes: 'C??',
                //                     no: 'Kh??ng'
                //                 },
                //                 fn: function (btn) {
                //                     if (btn === 'yes') {
                //                         me.updatePorderStatus(record.data.id, 2);
                //                     }
                //                 }
                //             });
                //         } else {
                //             Ext.Msg.show({
                //                 title: 'Th??ng b??o',
                //                 msg: 'Tr???ng th??i l???nh ph???i l?? ???? ph??n chuy???n ho???c C??ng ??o???n ph???',
                //                 buttons: Ext.MessageBox.YES,
                //                 buttonText: {
                //                     yes: '????ng',
                //                 }
                //             });
                //         }
                //     }
                // },
                // {
                //     text: 'K???t th??c s???n xu???t',
                //     reference: 'pprocess_subprocess',
                //     margin: '10 0 0',
                //     iconCls: 'x-fa fas fa-stop violetIcon',
                //     handler: function () {
                //         // console.log(record.data.id);
                //         if (record.get('status') > 4) {     // 6
                //             Ext.Msg.show({
                //                 title: 'Th??ng b??o',
                //                 msg: '?????i tr???ng th??i l???nh th??nh k???t th??c s???n xu???t ?',
                //                 buttons: Ext.Msg.YESNO,
                //                 icon: Ext.Msg.QUESTION,
                //                 buttonText: {
                //                     yes: 'C??',
                //                     no: 'Kh??ng'
                //                 },
                //                 fn: function (btn) {
                //                     if (btn === 'yes') {
                //                         me.updatePorderStatus(record.data.id, 6);
                //                     }
                //                 }
                //             });
                //         } else {
                //             Ext.Msg.show({
                //                 title: 'Th??ng b??o',
                //                 msg: 'Tr???ng th??i l???nh ph???i l?? ???? s???n xu???t xong',
                //                 buttons: Ext.MessageBox.YES,
                //                 buttonText: {
                //                     yes: '????ng',
                //                 }
                //             });
                //         }
                //     }
                // },
                // {
                //     text: 'K??? ho???ch c???t',
                //     margin: '10 0 0',
                //     iconCls: 'x-fa fas fa-cut violetIcon',
                //     handler: function () {
                //         me.onCutPlan(record);
                //     }
                // }
                {
                    text: 'Th??ng tin s???n ph???m',
                    margin: '10 0 0',
                    iconCls: 'x-fa fa-shopping-bag yellowIcon',
                    handler: function () {
                        let window = Ext.create('GSmartApp.view.PContract.PContract_General_InfoView', {
                            IdPContract: record.data.pcontractid_link,
                            IdProduct: record.data.productid_link,
                            viewModel: {
                                data: {
                                    IdPContract: record.data.pcontractid_link,
                                    IdProduct: record.data.productid_link,
                                    isWindow: true
                                }
                            }
                        });
                        window.show();
                    }
                },
                {
                    text: 'Gi?? s???n ph???m',
                    margin: '10 0 0',
                    iconCls: 'x-fa fa-usd redIcon',
                    handler: function () {
                        // let window = Ext.create('GSmartApp.view.pcontract.PContract_PO_List', {
                        //     viewModel: {
                        //         data: {
                        //             IdPContract: record.data.pcontractid_link,
                        //             IdProduct: record.data.productid_link,
                        //             isWindow: true
                        //         }
                        //     }
                        // });
                        // window.show();
                    }
                },
                {
                    text: 'Quy???t to??n v???i kh??ch h??ng',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-calculator violetIcon',
                    handler: function () {
                        // me.onCutPlan(record);
                    }
                },
                {
                    text: 'Quy???t to??n v???i H???i quan',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-calculator greenIcon',
                    handler: function () {
                        // me.onCutPlan(record);
                    }
                }, 
                {
                    text: 'Quy???t to??n v???i Ph??n x?????ng',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-calculator blueIcon',
                    handler: function () {
                        // me.onCutPlan(record);
                    }
                }                       
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.showAt(position);
    },
    onCutPlan: function (record) {
        console.log(record);
        var viewmodel = this.getViewModel();
        var porderid_link = record.get('id');

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'K??? ho???ch c???t',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CutPlan_MainView',
                viewModel: {
                    data: {
                        porderid_link: porderid_link,
                        porder: record.data
                    }
                }
            }]
        });
        form.show();

        form.down('#CutPlan_MainView').getController().on('Thoat', function () {
            form.close();
        })
    },
    updatePorderStatus: function (porderid_link, status) {
        var me = this.getView();
        me.setLoading("??ang l??u d??? li???u");
        var params = new Object();
        params.porderid_link = porderid_link;
        params.status = status;

        GSmartApp.Ajax.post('/api/v1/porder/updateStatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Th??ng b??o",
                        msg: "L??u th??nh c??ng",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });

                    var store = me.getStore();
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: "Th??ng b??o",
                        msg: "L??u th???t b???i",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onOrderCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POrder_ListStore = viewmodel.get('POrder_ListStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('ordercodeFilterField'),
            filters = POrder_ListStore.getFilters();

        if (filterField.value) {
            this.ordercodeFilter = filters.add({
                id: 'ordercodeFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ordercodeFilter) {
            filters.remove(this.ordercodeFilter);
            this.ordercodeFilter = null;
        }
    },
    onStyleBuyerFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POrder_ListStore = viewmodel.get('POrder_ListStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stylebuyerFilterField'),
            filters = POrder_ListStore.getFilters();

        if (filterField.value) {
            this.stylebuyerFilter = filters.add({
                id: 'stylebuyerFilter',
                property: 'stylebuyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stylebuyerFilter) {
            filters.remove(this.stylebuyerFilter);
            this.stylebuyerFilter = null;
        }
    },
    onPo_BuyerFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var POrder_ListStore = viewmodel.get('POrder_ListStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('po_buyerFilterField'),
            filters = POrder_ListStore.getFilters();

        if (filterField.value) {
            this.po_buyerFilter = filters.add({
                id: 'po_buyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.po_buyerFilter) {
            filters.remove(this.po_buyerFilter);
            this.po_buyerFilter = null;
        }
    },
    onExportExcel: function(){
        this.getView().saveDocumentAs({
            type: 'excel',
            title: 'Danh s??ch L???nh s???n xu???t',
            showSummary: true,
            includeGroups: true,
            fileName:'lenhsanxuat.xls'
        });
    },
})