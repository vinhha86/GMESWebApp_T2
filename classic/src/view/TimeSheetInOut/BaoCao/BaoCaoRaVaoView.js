Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoView', {
    extend: 'Ext.grid.Panel',
    xtype: 'BaoCaoRaVaoView',
    itemId: 'BaoCaoRaVaoView',

    viewModel: {
        type: 'BaoCaoRaVaoViewModel'
    },
    bind: '{TimeSheetDailyStore}',
    controller: 'BaoCaoRaVaoViewController',
    viewConfig: {
        columnLines: true,
        rowLines: true,
        stripeRows: false,
        getRowClass: function (record, index) {
            if (record.data.sortvalue == 0) {
                return "po_accept";
            }
        }
    },
    plugins: {
        gridexporter: true
    },
    columns: [
        {
            text: 'STT',
            width: 50,
            dataIndex: 'stt',
            align: 'center',
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return record.data.sortvalue == 0 ? value : "";
            }
        },
        {
            text: "Mã NV",
            width: 80,
            dataIndex: 'personnel_code',
            sortable: false,
            menuDisabled: true,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'CodeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCodeFilter',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return record.data.sortvalue == 0 ? value : "";
            }
        },
        {
            text: "Tên nhân viên",
            width: 150,
            dataIndex: 'fullname',
            sortable: false,
            menuDisabled: true,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'NameFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onNameFilter',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                return record.data.sortvalue == 0 ? value : "";
            }
        },
        {
            text: "1",
            width: 50,
            dataIndex: 'day1',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "2",
            width: 50,
            dataIndex: 'day2',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "3",
            width: 50,
            dataIndex: 'day3',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "4",
            width: 50,
            dataIndex: 'day4',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "5",
            width: 50,
            dataIndex: 'day5',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "6",
            width: 50,
            dataIndex: 'day6',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "7",
            width: 50,
            dataIndex: 'day7',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "8",
            width: 50,
            dataIndex: 'day8',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "9",
            width: 50,
            dataIndex: 'day9',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "10",
            width: 50,
            dataIndex: 'day10',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "11",
            width: 50,
            dataIndex: 'day11',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "12",
            width: 50,
            dataIndex: 'day12',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "13",
            width: 50,
            dataIndex: 'day13',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "14",
            width: 50,
            dataIndex: 'day14',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "15",
            width: 50,
            dataIndex: 'day15',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "16",
            width: 50,
            dataIndex: 'day16',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "17",
            width: 50,
            dataIndex: 'day17',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "18",
            width: 50,
            dataIndex: 'day18',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "19",
            width: 50,
            dataIndex: 'day19',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "20",
            width: 50,
            dataIndex: 'day20',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "21",
            width: 50,
            dataIndex: 'day21',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "22",
            width: 50,
            dataIndex: 'day22',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "23",
            width: 50,
            dataIndex: 'day23',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "24",
            width: 50,
            dataIndex: 'day24',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "25",
            width: 50,
            dataIndex: 'day25',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "26",
            width: 50,
            dataIndex: 'day26',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "27",
            width: 50,
            dataIndex: 'day27',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "28",
            width: 50,
            dataIndex: 'day28',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "29",
            width: 50,
            dataIndex: 'day29',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "30",
            width: 50,
            dataIndex: 'day30',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        },
        {
            text: "31",
            width: 50,
            dataIndex: 'day31',
            sortable: false,
            menuDisabled: true,
            listeners: {
                headerclick: 'onHeaderClick'
            },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                value = value == null ? "" : value;
                data_source = 0;
                if (value != ""){
                    ls_values = value.split("/");
                    if (ls_values.length > 1){
                        value = ls_values[0];
                        data_source = ls_values[1];
                        
                    } else
                        value = ls_values[0];
                }
                if (data_source == 0)
                    return record.data.sortvalue == 0 ? '<div style="font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : value;
                else
                    return record.data.sortvalue == 0 ? '<div style="background-color:yellow; font-weight: bold; color:darkred; text-decoration: underline;">' + value + "</div>" : '<div style="background-color:yellow;">' + value + "</div>";    
            }
        }
    ],
    dockedItems: [
        {
            layout: 'hbox',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Đơn vị',
                    bind: {
                        store: '{ListOrgStore}',
                        value: '{timesheetdaily.orgid_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    margin: 5,
                    labelWidth: 50,
                    itemId: 'cmbDonVi',
                    width: 180
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bộ phận',
                    bind: {
                        store: '{GrantStore}',
                        value: '{timesheetdaily.grantid_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    itemId: 'cmbBoPhan',
                    margin: 5,
                    labelWidth: 60,
                    width: 180
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Tháng',
                    bind: {
                        store: '{MonthStore}',
                        value: '{timesheetdaily.month}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    margin: 5,
                    labelWidth: 45,
                    width: 120
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Năm',
                    bind: {
                        store: '{YearStore}',
                        value: '{timesheetdaily.year}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    margin: 5,
                    labelWidth: 40,
                    width: 130
                },
                {
                    xtype: 'textfield',
                    clearable: true,
                    emptyText: 'Mã NV',
                    margin: 5,
                    width: 100,
                    bind: {
                        value: '{timesheetdaily.personnel_code}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Tìm kiếm',
                    iconCls: 'x-fa fa-filter',
                    itemId: 'btnSearch',
                    margin: 5,
                    handler: 'Search'
                },
                {
                    xtype: 'button',
                    text: 'Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    margin: 5,
                    handler: 'onExport_Excel'
                },
                {
                    xtype: 'button',
                    itemId: 'btnTinhToanDuLieu',
                    text: 'Tính toán dữ liệu',
                    iconCls: 'x-fa fa-calculator',
                    margin: 5,
                    // handler: 'onCalculate'
                }
            ]
        }
    ]
})