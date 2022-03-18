Ext.define("GSmartApp.view.personel.BaoCaoBaoAn.ChiTietBaoAnView", {
    extend: "Ext.grid.Panel",
    xtype: "ChiTietBaoAnView",
    id: "ChiTietBaoAnView",
    controller: "ChiTietBaoAnViewController",
    bind: {
        store: "{BaoAnStore}",
        title: "{title_detail}",
    },
    features: [
        {
            ftype: "summary",
            dock: "top",
        },
    ],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        columnLines: true,
        getRowClass: function (record, index) {
            if (record.get("orgtypeid_link") == 166) {
                return "po_offer";
            }
        },
    },
    columns: [
        {
            dataIndex: "org_name",
            text: "Tổ",
            is_shift_column: 0,
            flex: 1,
        },
        {
            dataIndex: "ca1",
            // text: 'Ca 1',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca1_title}',
                text: "{column_Ca1_time}",
                hidden: "{column_Ca1_hidden}",
            },
        },
        {
            dataIndex: "ca2",
            // text: 'Ca 2',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca2_title}'
                text: "{column_Ca2_time}",
                hidden: "{column_Ca2_hidden}",
            },
        },
        {
            dataIndex: "ca3",
            // text: 'Ca 3',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca3_title}'
                text: "{column_Ca3_time}",
                hidden: "{column_Ca3_hidden}",
            },
        },
        {
            dataIndex: "ca4",
            // text: 'Ca 4',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca4_title}'
                text: "{column_Ca4_time}",
                hidden: "{column_Ca4_hidden}",
            },
        },
        {
            dataIndex: "ca5",
            // text: 'Ca 5',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca5_title}'
                text: "{column_Ca5_time}",
                hidden: "{column_Ca5_hidden}",
            },
        },
        {
            dataIndex: "ca6",
            // text: 'Ca 1',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca1_title}',
                text: "{column_Ca6_time}",
                hidden: "{column_Ca6_hidden}",
            },
        },
        {
            dataIndex: "ca7",
            // text: 'Ca 2',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca2_title}'
                text: "{column_Ca7_time}",
                hidden: "{column_Ca7_hidden}",
            },
        },
        {
            dataIndex: "ca8",
            // text: 'Ca 3',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca3_title}'
                text: "{column_Ca8_time}",
                hidden: "{column_Ca8_hidden}",
            },
        },
        {
            dataIndex: "ca9",
            // text: 'Ca 4',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca4_title}'
                text: "{column_Ca9_time}",
                hidden: "{column_Ca9_hidden}",
            },
        },
        {
            dataIndex: "ca10",
            // text: 'Ca 5',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca5_title}'
                text: "{column_Ca10_time}",
                hidden: "{column_Ca10_hidden}",
            },
        },
        {
            dataIndex: "ca11",
            // text: 'Ca 1',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca1_title}',
                text: "{column_Ca11_time}",
                hidden: "{column_Ca11_hidden}",
            },
        },
        {
            dataIndex: "ca12",
            // text: 'Ca 2',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca2_title}'
                text: "{column_Ca12_time}",
                hidden: "{column_Ca12_hidden}",
            },
        },
        {
            dataIndex: "ca13",
            // text: 'Ca 3',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca3_title}'
                text: "{column_Ca13_time}",
                hidden: "{column_Ca13_hidden}",
            },
        },
        {
            dataIndex: "ca14",
            // text: 'Ca 4',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca4_title}'
                text: "{column_Ca14_time}",
                hidden: "{column_Ca14_hidden}",
            },
        },
        {
            dataIndex: "ca15",
            // text: 'Ca 5',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca5_title}'
                text: "{column_Ca15_time}",
                hidden: "{column_Ca15_hidden}",
            },
        },
        {
            dataIndex: "ca16",
            // text: 'Ca 1',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca1_title}',
                text: "{column_Ca16_time}",
                hidden: "{column_Ca16_hidden}",
            },
        },
        {
            dataIndex: "ca17",
            // text: 'Ca 2',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca2_title}'
                text: "{column_Ca17_time}",
                hidden: "{column_Ca17_hidden}",
            },
        },
        {
            dataIndex: "ca18",
            // text: 'Ca 3',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca3_title}'
                text: "{column_Ca18_time}",
                hidden: "{column_Ca18_hidden}",
            },
        },
        {
            dataIndex: "ca19",
            // text: 'Ca 4',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca4_title}'
                text: "{column_Ca19_time}",
                hidden: "{column_Ca19_hidden}",
            },
        },
        {
            dataIndex: "ca20",
            // text: 'Ca 5',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca5_title}'
                text: "{column_Ca20_time}",
                hidden: "{column_Ca20_hidden}",
            },
        },
        {
            dataIndex: "ca21",
            // text: 'Ca 1',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca1_title}',
                text: "{column_Ca21_time}",
                hidden: "{column_Ca21_hidden}",
            },
        },
        {
            dataIndex: "ca22",
            // text: 'Ca 2',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca2_title}'
                text: "{column_Ca22_time}",
                hidden: "{column_Ca22_hidden}",
            },
        },
        {
            dataIndex: "ca23",
            // text: 'Ca 3',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca3_title}'
                text: "{column_Ca23_time}",
                hidden: "{column_Ca23_hidden}",
            },
        },
        {
            dataIndex: "ca24",
            // text: 'Ca 4',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca4_title}'
                text: "{column_Ca24_time}",
                hidden: "{column_Ca24_hidden}",
            },
        },
        {
            dataIndex: "ca25",
            // text: 'Ca 5',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca5_title}'
                text: "{column_Ca25_time}",
                hidden: "{column_Ca25_hidden}",
            },
        },
        {
            dataIndex: "ca26",
            // text: 'Ca 1',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca1_title}',
                text: "{column_Ca26_time}",
                hidden: "{column_Ca26_hidden}",
            },
        },
        {
            dataIndex: "ca27",
            // text: 'Ca 2',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca2_title}'
                text: "{column_Ca27_time}",
                hidden: "{column_Ca27_hidden}",
            },
        },
        {
            dataIndex: "ca28",
            // text: 'Ca 3',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca3_title}'
                text: "{column_Ca28_time}",
                hidden: "{column_Ca28_hidden}",
            },
        },
        {
            dataIndex: "ca29",
            // text: 'Ca 4',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca4_title}'
                text: "{column_Ca29_time}",
                hidden: "{column_Ca29_hidden}",
            },
        },
        {
            dataIndex: "ca30",
            // text: 'Ca 5',
            width: 70,
            menuDisabled: true,
            sortable: false,
            is_shift_column: 1,
            summaryType: "sum",
            summaryRenderer: "renderSum",
            renderer: function (
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store
            ) {
                return value == null || value == 0 ? "" : value;
            },
            bind: {
                // text: '{column_Ca5_title}'
                text: "{column_Ca30_time}",
                hidden: "{column_Ca30_hidden}",
            },
        },
    ],
});
