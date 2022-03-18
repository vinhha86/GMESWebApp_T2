Ext.define('GSmartApp.view.personel.TimeSheetLunch_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetLunch_MainViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgMenuTreeStore',
        'GSmartApp.store.TimeSheetLunch.TimeSheetLunchStore',
        'GSmartApp.store.TimeSheetLunch.TimeSheetLunchKhachStore'
    ],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        TimeSheetLunchStore: {
            type: 'TimeSheetLunchStore'
        },
        TimeSheetLunchKhachStore: {
            type: 'TimeSheetLunchKhachStore'
        },
        TimesheetShiftTypeOrgStore:{
            type: 'TimesheetShiftTypeOrgStore'
        },
    },
    data: {
        orgtypeid_link: null,
        orgid_link: null,
        isConfirm: null, // old, ko dung
        isToday: true,
        isEditable: null,
        isHidden_khach: true,
        current: new Date(),
        // confirm hidden, disabled,
        isBtnConfirmHidden: true,
        isBtnConfirmHiddenDisabled: true,
        isBtnUnconfirmHidden: true,
        isBtnUnconfirmHiddenDisabled: true,

        //
        numberShift: null,
        sumCa1: 0,
        sumCa2: 0,
        sumCa3: 0,
        sumCa4: 0,
        sumCa5: 0,
        sumCa6: 0,
        sumCa7: 0,
        sumCa8: 0,
        sumCa9: 0,
        sumCa10: 0,
        sumCa11: 0,
        sumCa12: 0,
        sumCa13: 0,
        sumCa14: 0,
        sumCa15: 0,
        sumCa16: 0,
        sumCa17: 0,
        sumCa18: 0,
        sumCa19: 0,
        sumCa20: 0,
        sumCa21: 0,
        sumCa22: 0,
        sumCa23: 0,
        sumCa24: 0,
        sumCa25: 0,
        sumCa26: 0,
        sumCa27: 0,
        sumCa28: 0,
        sumCa29: 0,
        sumCa30: 0,
        //

        // cho phep danh dau check o cac cot hay khong
        isCa1Confirm: false,
        isCa2Confirm: false,
        isCa3Confirm: false,
        isCa4Confirm: false,
        isCa5Confirm: false,
        isCa6Confirm: false,
        isCa7Confirm: false,
        isCa8Confirm: false,
        isCa9Confirm: false,
        isCa10Confirm: false,
        isCa11Confirm: false,
        isCa12Confirm: false,
        isCa13Confirm: false,
        isCa14Confirm: false,
        isCa15Confirm: false,
        isCa16Confirm: false,
        isCa17Confirm: false,
        isCa18Confirm: false,
        isCa19Confirm: false,
        isCa20Confirm: false,
        isCa21Confirm: false,
        isCa22Confirm: false,
        isCa23Confirm: false,
        isCa24Confirm: false,
        isCa25Confirm: false,
        isCa26Confirm: false,
        isCa27Confirm: false,
        isCa28Confirm: false,
        isCa29Confirm: false,
        isCa30Confirm: false,

        //
        isCa1Hidden: true,
        isCa2Hidden: true,
        isCa3Hidden: true,
        isCa4Hidden: true,
        isCa5Hidden: true,
        isCa6Hidden: true,
        isCa7Hidden: true,
        isCa8Hidden: true,
        isCa9Hidden: true,
        isCa10Hidden: true,
        isCa11Hidden: true,
        isCa12Hidden: true,
        isCa13Hidden: true,
        isCa14Hidden: true,
        isCa15Hidden: true,
        isCa16Hidden: true,
        isCa17Hidden: true,
        isCa18Hidden: true,
        isCa19Hidden: true,
        isCa20Hidden: true,
        isCa21Hidden: true,
        isCa22Hidden: true,
        isCa23Hidden: true,
        isCa24Hidden: true,
        isCa25Hidden: true,
        isCa26Hidden: true,
        isCa27Hidden: true,
        isCa28Hidden: true,
        isCa29Hidden: true,
        isCa30Hidden: true,
        
        // filter
        personnelCodeFilterValue: null,
        personnelRegCodeFilterValue: null,
        personnelFullnameFilterValue: null,

        //
        selectedRecord_Donvi: null,
    },
    formulas: {
        // fieldStyle1: function (get) {
        //     var isCa1Confirm = get('isCa1Confirm');
        //     if(isCa1Confirm){
        //         return 'background-color: lightblue;';
        //     }else{
        //         return 'background-color: white;';
        //     }
        // }
    }
})