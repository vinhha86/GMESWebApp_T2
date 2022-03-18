Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.AbsentView', {
    extend: 'Ext.form.Panel',
    xtype: 'AbsentView',
    itemId: 'AbsentView',
    reference: 'AbsentView',
    controller: 'AbsentView_Controller',
    viewModel: {
        type: 'AbsentView_Model'
    },
    items:[
        {
            xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
            editable: false,
            readOnly: false,
			bind: {
				store: '{AbsentTypeStore}',
                value: '{value}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5',
			fieldLabel: 'Loại nghỉ',
			labelWidth: 85,
            flex: 1,

            matchFieldWidth: false,
            listConfig: {
                listeners: {
                    beforeshow: function(picker) {
                        picker.minWidth = picker.up('combobox').getSize().width;
                    }
                }
            },
        },
        {
            xtype: 'combo',
			valueField: 'id',
			displayField: 'name',
            editable: true,
            readOnly: false,
			bind: {
				store: '{ListOrgStore}',
                value: '{orgid_link_grant}'
			},
			queryMode: 'local',
			anyMatch: true,
			margin: '5',
			fieldLabel: 'Tổ',
			labelWidth: 85,
            flex: 1,
            
            matchFieldWidth: false,
            listConfig: {
                listeners: {
                    beforeshow: function(picker) {
                        picker.minWidth = picker.up('combobox').getSize().width;
                    }
                }
            },
        }
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    xtype:'button',
                    text: 'Chấp nhận',
                    margin: 3,
                    itemId:'btnSelect',
                    iconCls: 'x-fa fa-save',
                    formBind: true
                    // bind: {
                    //     disabled: '{isBtnSelectDisable}'
                    // }
                },
                // {
                //     xtype:'button',
                //     text: 'Test',
                //     margin: 3,
                //     itemId:'btnTest',
                //     iconCls: 'x-fa fa-save',
                // },
            ]
        }
    ],
 
});

