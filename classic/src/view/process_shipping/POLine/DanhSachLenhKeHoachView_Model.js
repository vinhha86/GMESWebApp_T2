Ext.define('GSmartApp.view.process_shipping.POLine.DanhSachLenhKeHoachView_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DanhSachLenhKeHoachView_Model',
    requires: [
        'GSmartApp.store.timesheetshifttypeorg.TimesheetShiftTypeOrgStore',
    ],
    stores: {
        POrder_Grant: {
            type: 'POrder_Grant'
        }
    },
    data: {
        productbuyercode: null,
        list_po: null,
        // colorid_link: null,
        // sizesetid_link: null,
    }
})