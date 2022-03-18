Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoView_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'BaoCaoRaVaoView_Detail',
    itemId: 'BaoCaoRaVaoView_Detail',
    reference: 'BaoCaoRaVaoView_Detail',
    controller: 'BaoCaoRaVaoView_Detail_Controller',
    viewModel: {
        type: 'BaoCaoRaVaoView_Detail_ViewModel'
    },
    items:[
        {
            xtype:'textfield',
            margin: 2,
            fieldLabel: "Tổng giờ làm",
            labelWidth: 110,
            readOnly: true,
            editable: false,
            maskRe: /[0-9x:]/,
            bind:{
                value : '{dataObj.totalworking_time}'
            },
        },
        {
            xtype:'textfield',
            margin: 2,
            fieldLabel: "Giờ vào",
            labelWidth: 110,
            maskRe: /[0-9x:]/,
            allowBlank: false,
            blankText: 'Không được để trống, điền x nếu không có thông tin giờ',
            bind:{
                value : '{dataObj.in_time}',
                // editable: '{dataObj.in_time_editable}'
            },
        },
        {
            xtype:'textfield',
            margin: 2,
            fieldLabel: "Bắt đầu ăn",
            labelWidth: 110,
            maskRe: /[0-9x:]/,
            allowBlank: false,
            blankText: 'Không được để trống, điền x nếu không có thông tin giờ',
            bind:{
                value : '{dataObj.lunchstart_time}',
                // editable: '{dataObj.lunchstart_time_editable}'
            },
        },
        {
            xtype:'textfield',
            margin: 2,
            fieldLabel: "Kết thúc ăn",
            labelWidth: 110,
            maskRe: /[0-9x:]/,
            allowBlank: false,
            blankText: 'Không được để trống, điền x nếu không có thông tin giờ',
            bind:{
                value : '{dataObj.lunchend_time}',
                // editable: '{dataObj.lunchend_time_editable}'
            },
        },
        {
            xtype:'textfield',
            margin: 2,
            fieldLabel: "Giờ ra",
            labelWidth: 110,
            maskRe: /[0-9x:]/,
            allowBlank: false,
            blankText: 'Không được để trống, điền x nếu không có thông tin giờ',
            // validator: function(v) {
            //     return /PE[0-9]{3}\.[0-9]{3}/.test(v)? true : 'Entered text must be of the form PExxx.xxx, where x represent digits 0-9.';
            // },
            bind:{
                value : '{dataObj.out_time}',
                // editable: '{dataObj.out_time_editable}'
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

