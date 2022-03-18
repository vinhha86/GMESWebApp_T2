Ext.define('GSmartApp.view.baocao_ns.BaoCaoNS_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'BaoCaoNS_View',
    id: 'baocao_ns',
    viewModel: {
        type: 'BaoCaoNS_ViewModel'
    },
    controller: 'BaoCaoNS_ViewController',
    reference: 'BaoCaoNS_View',
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{TimeSheetAbsenceStore}'
    },
    columns: [
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center',
            sortable: false,
            menuDisabled: true,
        }, 
        {
            text: 'Đơn vị',
            dataIndex: 'orgName',
            flex: 1,
            sortable: false,
            menuDisabled: true,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Tổng lao động',
            dataIndex: 'tongLaoDong',
            flex: 1,
            align: 'end',
            sortable: false,
            menuDisabled: true,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(!isNaN(value)) {
                    if(value == 0){
                        return '-';
                    }
                    value = Ext.util.Format.number(value, '0,000');
                }else{
                    return '-';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum',
        },
        {
            text: 'Số có mặt',
            dataIndex: 'soCoMat',
            flex: 1,
            align: 'end',
            sortable: false,
            menuDisabled: true,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(!isNaN(value)) {
                    if(value == 0){
                        return '-';
                    }
                    value = Ext.util.Format.number(value, '0,000');
                }else{
                    return '-';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum',
        },
        {
            text: 'Nghỉ phép',
            dataIndex: 'nghiPhep',
            flex: 1,
            align: 'end',
            sortable: false,
            menuDisabled: true,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(!isNaN(value)) {
                    if(value == 0){
                        return '-';
                    }
                    value = Ext.util.Format.number(value, '0,000');
                }else{
                    return '-';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum',
        },
        {
            text: 'Không phép',
            dataIndex: 'nghiKhongPhep',
            flex: 1,
            align: 'end',
            sortable: false,
            menuDisabled: true,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(!isNaN(value)) {
                    if(value == 0){
                        return '-';
                    }
                    value = Ext.util.Format.number(value, '0,000');
                }else{
                    return '-';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum',
        },
        {
            text: 'Cách ly',
            dataIndex: 'nghiCachLy',
            flex: 1,
            align: 'end',
            sortable: false,
            menuDisabled: true,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(!isNaN(value)) {
                    if(value == 0){
                        return '-';
                    }
                    value = Ext.util.Format.number(value, '0,000');
                }else{
                    return '-';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum',
        },
        {
            text: 'Khác',
            dataIndex: 'nghiConLai',
            flex: 1,
            align: 'end',
            sortable: false,
            menuDisabled: true,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(!isNaN(value)) {
                    if(value == 0){
                        return '-';
                    }
                    value = Ext.util.Format.number(value, '0,000');
                }else{
                    return '-';
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'sum',
            summaryRenderer: 'renderSum',
        },
        // {
        //     text: 'Nghỉ 1/2 ngày',
        //     dataIndex: 'nghi1phan2',
        //     flex: 1,
        //     align: 'end',
        //     sortable: false,
        //     menuDisabled: true,
        //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        //         if(!isNaN(value)) {
        //             if(value == 0){
        //                 return '-';
        //             }
        //             value = Ext.util.Format.number(value, '0,000');
        //         }else{
        //             return '-';
        //         }
        //         metaData.tdAttr = 'data-qtip="' + value + '"';
        //         return value;
        //     }
        // },
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            // xtype: 'toolbar',
            border: false,
            items: [
                {
                    xtype: 'datefield',
                    labelWidth: 50,
                    fieldLabel: 'Ngày:',
                    editable: false,
                    // emptyText:'Ngày:',
                    itemId: 'date',
                    reference: 'date',
                    format:'d/m/Y',
                    margin: 5,
                    width: 200,
                    bind: {
                        value: '{date}'
                    }
                },
                {
                    xtype: 'button',
                    margin: 5,
                    // text: 'Lưu',
                    iconCls: 'x-fa fa-refresh',
                    itemId: 'btnRefresh',
                },
            ]
        }, 
    ]
});

