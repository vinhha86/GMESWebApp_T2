Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard_KhoTP_Main_Controller',
    init: function () {

    },
    control: {
        '#Dashboard_KhoTP_Main': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this;
       
        if (newCard.xtype == "Dashboard_KhoTP_POLine_Main") {
            // console.log(newCard.xtype);
                var me = this.getView();
                var dashboard_KhoTP_POLine_Main = me.down('#Dashboard_KhoTP_POLine_Main');
                var dashboard_KhoTP_POLine_List = dashboard_KhoTP_POLine_Main.down('#Dashboard_KhoTP_POLine_List')
                var store = dashboard_KhoTP_POLine_List.getStore('POLineStore');
                store.load();
        }
        else {
            if (newCard.xtype == "Stockout_P_Order_Main") {
                // console.log(newCard.xtype);
                var me = this.getView();
                var stockout_P_Order_Main = me.down('#Stockout_P_Order_Main');
                var stockout_P_Order_List = stockout_P_Order_Main.down('#Stockout_P_Order_List')
                var store = stockout_P_Order_List.getStore('Stockout_P_Order_Store');
                store.load();
            }
        }
    },
});
