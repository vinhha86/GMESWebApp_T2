Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetLunch_ListView',
    id: 'TimeSheetLunch_ListView',
    cls: 'TimeSheetLunch_ListView',
    controller: 'TimeSheetLunch_ListViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.get('status') == 1) {
                return 'po_offer';
            }
        }
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEditCheckBox'
            // } 
        }
    },    
    bind: {
        store: '{TimeSheetLunchStore}'
    },
    enableColumnMove: false,
    reserveScrollbar: true,
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NV',
        dataIndex: 'personnelCode',
        width: 100,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelCodeFilter',
            itemId: 'personnelCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            bind: {
                value: '{personnelCodeFilterValue}'
            },
            listeners: {
                keyup: 'onPersonnelCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Mã đăng ký',
        dataIndex: 'register_code',
        width: 100,
        sortable: false,
        menuDisabled: true,
        hidden: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelRegCodeFilter',
            itemId: 'personnelRegCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            bind: {
                value: '{personnelRegCodeFilterValue}'
            },
            listeners: {
                keyup: 'onPersonnelRegCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Họ và tên',
        dataIndex: 'personnelFullname',
        // flex: 1,
        width: 200,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelFullnameFilter',
            itemId: 'personnelFullnameFilter',
            // flex: 1,
            width: 196,
            margin: 2,
            enableKeyEvents: true,
            bind: {
                value: '{personnelFullnameFilterValue}'
            },
            listeners: {
                keyup: 'onPersonnelFullnameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Không ăn trưa',
        dataIndex: 'nolunch_shift_idlink',
        // flex: 1,
        width: 100,
        sortable: false,
        menuDisabled: true,
        // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
        //     // metaData.tdAttr = 'data-qtip="' + value + '"';
        //     var viewModel = this.getViewModel();
        //     console.log(viewModel);
        //     return value;
        // },
        renderer: 'renderedKhongAnTrua',
        editor:{
            field: {
                xtype: 'combobox',
                bind:{
                    store:'{TimesheetShiftTypeOrgStore}',
                    // value: '{data.type}'
                },
                displayField: 'gio',
                valueField: 'id',
                // editable: false,
                allowBlank: true,
                listeners:{
                    // change: 'onTypeChange',
                    // focusleave: 'onTypeFocusLeave'
                }
            }
        }
    },
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        itemId: 'sumFieldContainer',
        autoScroll: true,
        items: [
            
        ]
    },{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Xác nhận',
                iconCls: 'x-fa fa-check',
                itemId: 'btnConfirm',
                // bind: {
                //     hidden: '{isBtnConfirmHidden}'
                // }
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Tự động lấy dữ liệu',
                iconCls: 'x-fa fa-sync',
                itemId: 'btnAutoGetInfo',
                hidden: true,
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Lưu',
                iconCls: 'x-fa fa-save',
                itemId: 'btnSave',
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Hủy xác nhận',
                iconCls: 'x-fa fa-backward',
                itemId: 'btnCancelApprove',
            }
        ]
    }, {
        dock: 'top',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            itemId: 'sumCa1',
            fieldLabel: 'Ca 1',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa1}',
                hidden: '{isCa1Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa2',
            fieldLabel: 'Ca 2',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa2}',
                hidden: '{isCa2Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa3',
            fieldLabel: 'Ca 3',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa3}',
                hidden: '{isCa3Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa4',
            fieldLabel: 'Ca 4',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa4}',
                hidden: '{isCa4Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa5',
            fieldLabel: 'Ca 5',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa5}',
                hidden: '{isCa5Hidden}'
            }
        },{
            xtype: 'textfield',
            itemId: 'sumCa6',
            fieldLabel: 'Ca 6',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa6}',
                hidden: '{isCa6Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa7',
            fieldLabel: 'Ca 7',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa7}',
                hidden: '{isCa7Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa8',
            fieldLabel: 'Ca 8',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa8}',
                hidden: '{isCa8Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa9',
            fieldLabel: 'Ca 9',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa9}',
                hidden: '{isCa9Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa10',
            fieldLabel: 'Ca 10',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa10}',
                hidden: '{isCa10Hidden}'
            }
        },{
            xtype: 'textfield',
            itemId: 'sumCa11',
            fieldLabel: 'Ca 11',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa11}',
                hidden: '{isCa11Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa12',
            fieldLabel: 'Ca 12',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa12}',
                hidden: '{isCa12Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa13',
            fieldLabel: 'Ca 13',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa13}',
                hidden: '{isCa13Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa14',
            fieldLabel: 'Ca 14',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa14}',
                hidden: '{isCa14Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa15',
            fieldLabel: 'Ca 15',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa15}',
                hidden: '{isCa15Hidden}'
            }
        },{
            xtype: 'textfield',
            itemId: 'sumCa16',
            fieldLabel: 'Ca 16',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa16}',
                hidden: '{isCa16Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa17',
            fieldLabel: 'Ca 17',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa17}',
                hidden: '{isCa17Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa18',
            fieldLabel: 'Ca 18',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa18}',
                hidden: '{isCa18Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa19',
            fieldLabel: 'Ca 19',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa19}',
                hidden: '{isCa19Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa20',
            fieldLabel: 'Ca 20',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa20}',
                hidden: '{isCa20Hidden}'
            }
        },{
            xtype: 'textfield',
            itemId: 'sumCa21',
            fieldLabel: 'Ca 21',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa21}',
                hidden: '{isCa21Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa22',
            fieldLabel: 'Ca 22',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa22}',
                hidden: '{isCa22Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa23',
            fieldLabel: 'Ca 23',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa23}',
                hidden: '{isCa23Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa24',
            fieldLabel: 'Ca 24',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa24}',
                hidden: '{isCa24Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa25',
            fieldLabel: 'Ca 25',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa25}',
                hidden: '{isCa25Hidden}'
            }
        },
        //
        {
            xtype: 'textfield',
            itemId: 'sumCa26',
            fieldLabel: 'Ca 26',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa26}',
                hidden: '{isCa26Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa27',
            fieldLabel: 'Ca 27',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa27}',
                hidden: '{isCa27Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa28',
            fieldLabel: 'Ca 28',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa28}',
                hidden: '{isCa28Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa29',
            fieldLabel: 'Ca 29',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa29}',
                hidden: '{isCa29Hidden}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'sumCa30',
            fieldLabel: 'Ca 30',
            margin: 3,
            width: 120,
            labelWidth: 50,
            editable: false,
            bind: {
                value: '{sumCa30}',
                hidden: '{isCa30Hidden}'
            }
        },]
    }]
});

