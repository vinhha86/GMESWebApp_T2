Ext.define('GSmartApp.view.salary.Salary_MainView_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Salary_MainView_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore','GSmartApp.store.timesheetshifttypeorg.TimesheetShiftTypeOrgStore','GSmartApp.store.timesheetshifttype.TimesheetShiftTypeStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        SalTypeLevel_DefHourStore: {
            type: 'SalTypeLevelStore'
        },
        SalTypeLevel_DefProductivityStore: {
            type: 'SalTypeLevelStore'
        },
        SalTypeLaborLevelStore: {
            type: 'SalTypeLaborLevelStore'
        },
        SalTypePositionStore: {
            type: 'SalTypePositionStore'
        },
        SalBasicStore: {
            type: 'SalBasicStore'
        },
        SalComStore: {
            type: 'SalComStore'
        },
        SalComLaborLevelStore: {
            type: 'SalComLaborLevelStore'
        } ,
        SalComPositionStore: {
            type: 'SalComPositionStore'
        },
        TimesheetShiftTypeOrgStore:{
            type:'TimesheetShiftTypeOrgStore'
        },
        TimesheetShiftTypeStore:{
            type:'TimesheetShiftTypeStore'
        },
        TimesheetShiftTypeStore_LinkCaLamViec:{
            type:'TimesheetShiftTypeOrgStore'
      },
    },
    data: {
        selected_tab: null,
        isMenuHide_SalType: false,
        selected_orgid: null,
        selected_saltypeid: null,
        selected_salcomid: null,
        org_sal_basic: {
            id: null,
            sal_basic: null,
            sal_min: null,
            workingdays: null,
            costpersecond: null,
            overtime_normal: null,
            overtime_weekend: null,
            overtime_holiday: null,
            overtime_night: null,
        },
        TimeShift:null,
        orgid_link:null,
        tenLoaiCa: null,
        is_atnight: null,
        is_active: null,
        recData: null,
    },
    formulas: {
        isLinkCaLamViecHidden: function (get) {
            if (get('tenLoaiCa') != null) {
                if (get('tenLoaiCa') == 'Ca ăn'){
                    return false;
                }
                return true;
            }

            return true;
        }
    }
})