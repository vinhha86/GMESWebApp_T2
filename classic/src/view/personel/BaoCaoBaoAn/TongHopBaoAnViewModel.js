Ext.define("GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnViewModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.TongHopBaoAnViewModel",
    requires: [
        "GSmartApp.store.org.ListOrgStore",
        "GSmartApp.store.BaoCaoBaoAn.BaoAnStore",
    ],
    stores: {
        OrgStore: {
            type: "ListOrgStore",
        },
        BaoAnStore: {
            type: "BaoAnStore",
        },
    },
    data: {
        date_from: new Date(),
        date_to: new Date(),
        org_name: "",
        orgid_link: 0,

        column_Ca1_hidden: true,
        column_Ca2_hidden: true,
        column_Ca3_hidden: true,
        column_Ca4_hidden: true,
        column_Ca5_hidden: true,
        column_Ca6_hidden: true,
        column_Ca7_hidden: true,
        column_Ca8_hidden: true,
        column_Ca9_hidden: true,
        column_Ca10_hidden: true,
        column_Ca11_hidden: true,
        column_Ca12_hidden: true,
        column_Ca13_hidden: true,
        column_Ca14_hidden: true,
        column_Ca15_hidden: true,
        column_Ca16_hidden: true,
        column_Ca17_hidden: true,
        column_Ca18_hidden: true,
        column_Ca19_hidden: true,
        column_Ca20_hidden: true,
        column_Ca21_hidden: true,
        column_Ca22_hidden: true,
        column_Ca23_hidden: true,
        column_Ca24_hidden: true,
        column_Ca25_hidden: true,
        column_Ca26_hidden: true,
        column_Ca27_hidden: true,
        column_Ca28_hidden: true,
        column_Ca29_hidden: true,
        column_Ca30_hidden: true,

        //
        column_Ca1_time: "Ca 1",
        column_Ca2_time: "Ca 2",
        column_Ca3_time: "Ca 3",
        column_Ca4_time: "Ca 4",
        column_Ca5_time: "Ca 5",
        column_Ca6_time: "Ca 6",
        column_Ca7_time: "Ca 7",
        column_Ca8_time: "Ca 8",
        column_Ca9_time: "Ca 9",
        column_Ca10_time: "Ca 10",
        column_Ca11_time: "Ca 11",
        column_Ca12_time: "Ca 12",
        column_Ca13_time: "Ca 13",
        column_Ca14_time: "Ca 14",
        column_Ca15_time: "Ca 15",
        column_Ca16_time: "Ca 16",
        column_Ca17_time: "Ca 17",
        column_Ca18_time: "Ca 18",
        column_Ca19_time: "Ca 19",
        column_Ca20_time: "Ca 20",
        column_Ca21_time: "Ca 21",
        column_Ca22_time: "Ca 22",
        column_Ca23_time: "Ca 23",
        column_Ca24_time: "Ca 24",
        column_Ca25_time: "Ca 25",
        column_Ca26_time: "Ca 26",
        column_Ca27_time: "Ca 27",
        column_Ca28_time: "Ca 28",
        column_Ca29_time: "Ca 29",
        column_Ca30_time: "Ca 30",
    },
    formulas: {
        title_detail: function (data) {
            var name = "Tổng hợp báo ăn lao động chính thức";
            name =
                data("org_name") == ""
                    ? name
                    : name + " đơn vị " + data("org_name");
            return name;
        },
        column_Ca1_title: function (get) {
            var result = "Ca 1";
            var column_Ca1_time = get("column_Ca1_time");
            result += column_Ca1_time == null ? "" : column_Ca1_time;
            return result;
        },
        column_Ca2_title: function (get) {
            var result = "Ca 2";
            var column_Ca2_time = get("column_Ca2_time");
            result += column_Ca2_time == null ? "" : column_Ca2_time;
            return result;
        },
        column_Ca3_title: function (get) {
            var result = "Ca 3";
            var column_Ca3_time = get("column_Ca3_time");
            result += column_Ca3_time == null ? "" : column_Ca3_time;
            return result;
        },
        column_Ca4_title: function (get) {
            var result = "Ca 4";
            var column_Ca4_time = get("column_Ca4_time");
            result += column_Ca4_time == null ? "" : column_Ca4_time;
            return result;
        },
        column_Ca5_title: function (get) {
            var result = "Ca 5";
            var column_Ca5_time = get("column_Ca5_time");
            result += column_Ca5_time == null ? "" : column_Ca5_time;
            return result;
        },
    },
});
