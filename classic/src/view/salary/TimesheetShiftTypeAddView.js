Ext.define('GSmartApp.view.salary.TimesheetShiftTypeAddView', {
    extend: 'Ext.form.Panel',
    xtype: 'TimesheetShiftTypeAddView',
    id:'TimesheetShiftTypeAddView',
    controller:'TimesheetShiftTypeAddViewController',
    viewModel: {
        type: 'Salary_MainView_Model',
    },
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        width: '100%',
        items: [
            {
                xtype: 'combobox',
                margin: 5,
                fieldLabel: 'Tên ca',
            // reference: 'name',
                allowBlank: false,
                flex:1,
                labelWidth: 90,
                displayField: 'nameCode',
                valueField: 'id',
                queryMode: 'local',
                bind: {
                    store:'{TimesheetShiftTypeStore}',
                    value: '{TimeShift.timesheet_shift_type_id_link}',
                
                }
            },
            // {
            //     xtype: 'checkbox',
            //     reference: 'checkboxcaan',
            //     fieldLabel: 'Ca ăn',
            //     margin: 5,
            //     labelWidth: 70,
            //     width: 120,
            //     inputValue:1,
            //     uncheckedValue:-1,
            //     // bind: {
            //     //     value: '{checkboxto}'
            //     // }
            // }
        ]
    },
    {
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype: 'timefield',
            margin: 5,
            fieldLabel: 'Bắt đầu',
            reference: 'timefrom',
            allowBlank: false,
            flex:1,
            labelWidth: 90,
            format: 'H:i',
            // bind: {
            //     value: '{timefrom}'
            // },
            // minValue: '1:30 AM',
            // maxValue: '9:15 PM',
           // value: '00:00 AM',
            // listeners: {
            //     change: 'onChange'
            // }
        },
        {
            margin: 5,
            width: 120,
        },
        {
            xtype: 'checkbox',
            reference: 'checkboxfrom',
            fieldLabel: 'Hôm sau',
            margin: 5,
            labelWidth: 70,
            width: 120,
            inputValue:1,
            uncheckedValue:-1,
            hidden: true,
            // bind: {
            //     value: '{checkboxfrom}'
            // },
        }]
    },
    {
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype: 'timefield',
            margin: 5,
            fieldLabel: 'Kết thúc',
            reference: 'timeto',
            allowBlank: false,
            flex:1,
            labelWidth: 90,
            format: 'H:i',
            // bind: {
            //     value: '{timeto}'
            // },
            // minValue: '1:30 AM',
            // maxValue: '9:15 PM',
          //  value: '10:00 PM',
        },{
            xtype: 'checkbox',
            reference: 'checkboxto',
            fieldLabel: 'Hôm sau',
            margin: 5,
            labelWidth: 70,
            width: 120,
            inputValue:1,
            uncheckedValue:-1,
            // bind: {
            //     value: '{checkboxto}'
            // }
        }]
    },
    {
        layout: 'hbox',
        width: '100%',
        items: [
            {
                xtype: 'combobox',
                margin: 5,
                fieldLabel: 'Ca làm việc',
                // reference: 'name',
                // allowBlank: false,
                flex:1,
                labelWidth: 90,
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                bind: {
                    store:'{TimesheetShiftTypeStore_LinkCaLamViec}',
                    value: '{TimeShift.working_shift}',
                    hidden: '{isLinkCaLamViecHidden}'
                }
            },
            // {
            //     xtype: 'checkbox',
            //     reference: 'checkboxcaan',
            //     fieldLabel: 'Ca ăn',
            //     margin: 5,
            //     labelWidth: 70,
            //     width: 120,
            //     inputValue:1,
            //     uncheckedValue:-1,
            //     // bind: {
            //     //     value: '{checkboxto}'
            //     // }
            // }
        ]
    },
    {
        layout: 'hbox',
        width: '100%',
        items: [
        {
            xtype: 'checkbox',
            reference: 'checkboxactive',
            fieldLabel: 'Hoạt động',
            margin: 5,
            labelWidth: 90,
            width: 120,
            inputValue:1,
            uncheckedValue:-1,
            // hidden: true,
            // bind: {
            //     value: '{checkboxfrom}'
            // },
        }]
    },
   
],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})