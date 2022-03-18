Ext.define('GSmartApp.view.salary.Salary_Sum_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Salary_Sum_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        SalarySumStore:{
            type: 'SalarySumStore'
        }                
    },
    data: {
        selected_tab: null,
        selected_orgid: null,
        year: null,
        month: null
    }
})