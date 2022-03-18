Ext.define('GSmartApp.view.process_shipping.POLine.DanhSachLenhKeHoachView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DanhSachLenhKeHoachView',
    itemId: 'DanhSachLenhKeHoachView',
    reference: 'DanhSachLenhKeHoachView',
    controller: 'DanhSachLenhKeHoachView_Controller',
    viewModel: {
        type: 'DanhSachLenhKeHoachView_Model'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{POrder_Grant}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        allowDeselect: true
    },
    columns: [
        {
            text: 'Tổ', 
            menuDisabled: true,
            sortable: false,
            dataIndex: 'granttoorgname',
            flex: 1,
        },
        {
            text: 'Ngày bắt đầu', 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            menuDisabled: true,
            sortable: false,
            dataIndex: 'start_date_plan',
            flex: 1,
        },
        {
            text: 'Ngày kết thúc', 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            menuDisabled: true,
            sortable: false,
            dataIndex: 'finish_date_plan',
            flex: 1,
        },
        {
            text: 'Năng suất', 
            xtype: 'numbercolumn',
			format:'0,000',
			align: 'right',
            menuDisabled: true,
            sortable: false,
            dataIndex: 'productivity',
            flex: 1,
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
                    iconCls: 'x-fa fa-check',
                },
            ]
        }
    ],
 
});

