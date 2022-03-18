Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVao_SearchView', {
    extend: 'Ext.form.Panel',
    xtype: 'BaoCaoRaVao_SearchView',
    itemId: 'BaoCaoRaVao_SearchView',
    reference: 'BaoCaoRaVao_SearchView',
    controller: 'BaoCaoRaVao_SearchViewController',
    viewModel: {
        type: 'BaoCaoRaVao_SearchViewModel'
    },
    items:[
        {
            xtype: 'datefield',
            labelWidth: 85,
            fieldLabel: 'Ngày',
            // emptyText:'Ngày',
            itemId: 'date_to_calculate',
            reference: 'date_to_calculate',
            format:'d/m/Y',
            margin: '3',
            allowBlank: false,
            flex: 1,
            // width: 130
            bind: {
                value: '{date_to_calculate}'
            }
        },
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
                    text: 'Chọn',
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

