Ext.define(
    "GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnListOrgViewController",
    {
        extend: "Ext.app.ViewController",
        alias: "controller.TongHopBaoAnListOrgViewController",
        init: function () {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore("OrgStore");
            store.loadlistorg();
        },
        control: {
            "#TongHopBaoAnListOrgView": {
                itemclick: "onloadDetail",
            },
            "#date_from": {
                collapse: "loadData",
            },
            "#date_to": {
                collapse: "loadData",
            },

            "#exportGuestRiceData": {
                click: "exportGuestRice",
            },
            "#exportRiceData": {
                click: "exportRice",
            },
            "#exportExtraRiceData": {
                click: "exportExtraRice",
            },
            "#exportComCa": {
                click: "exportComCa",
            },
            "#exportComTangCa": {
                click: "exportComTangCa",
            },
        },
        onloadDetail: function (grid, record, item, index, e, eOpts) {
            var viewModel = this.getViewModel();
            viewModel.set("orgid_link", record.data.id);
            viewModel.set("org_name", record.get("name"));
            this.loadData();

            // set columns name

            this.getShiftTime(record.data.id);
        },
        loadData: function () {
            var grid = this.getView();
            var viewmodel = this.getViewModel();
            var orgid_link = viewmodel.get("orgid_link");
            var date_from = viewmodel.get("date_from");
            var date_to = viewmodel.get("date_to");
            var store = viewmodel.getStore("BaoAnStore");
            var detail = grid.up("#TongHopBaoAnView");
            detail.setLoading("Đang tải dữ liệu");
            store.loadStore(orgid_link, date_from, date_to);
        },

        getShiftTime: function (orgid_link) {
            var m = this;
            var me = this.getView();
            var viewModel = this.getViewModel();

            // viewModel.set('column_Ca1_time', '');
            // viewModel.set('column_Ca2_time', '');
            // viewModel.set('column_Ca3_time', '');
            // viewModel.set('column_Ca4_time', '');
            // viewModel.set('column_Ca5_time', '');

            var params = new Object();
            params.orgid_link = orgid_link;
            params.is_ca_an = true;
            GSmartApp.Ajax.post(
                "/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn",
                Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            m.setShiftTime(response);
                        }
                    }
                }
            );
        },
        setShiftTime: function (response) {
            var m = this;
            var me = this.getView();
            var viewModel = this.getViewModel();

            var setCa1 = false;
            var setCa2 = false;
            var setCa3 = false;
            var setCa4 = false;
            var setCa5 = false;
            var setCa6 = false;
            var setCa7 = false;
            var setCa8 = false;
            var setCa9 = false;
            var setCa10 = false;
            var setCa11 = false;
            var setCa12 = false;
            var setCa13 = false;
            var setCa14 = false;
            var setCa15 = false;
            var setCa16 = false;
            var setCa17 = false;
            var setCa18 = false;
            var setCa19 = false;
            var setCa20 = false;
            var setCa21 = false;
            var setCa22 = false;
            var setCa23 = false;
            var setCa24 = false;
            var setCa25 = false;
            var setCa26 = false;
            var setCa27 = false;
            var setCa28 = false;
            var setCa29 = false;
            var setCa30 = false;

            for (var i = 0; i < response.data.length; i++) {
                var data = response.data[i];
                // console.log(data);
                // var str = data.name.trim() + ' ';
                var str = "";
                var time = "<br>";
                time +=
                    data.from_hour < 10 ? "0" + data.from_hour : data.from_hour;
                time +=
                    data.from_minute < 10
                        ? ":0" + data.from_minute
                        : ":" + data.from_minute;
                time += " - ";
                time += data.to_hour < 10 ? "0" + data.to_hour : data.to_hour;
                time +=
                    data.to_minute < 10
                        ? ":0" + data.to_minute
                        : ":" + data.to_minute;
                // str += time;

                if (data.timesheet_shift_type_id_link == 4) {
                    str = "Ca ";
                    setCa1 = true;
                    viewModel.set("column_Ca1_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 5) {
                    str = "Ca ";
                    setCa2 = true;
                    viewModel.set("column_Ca2_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 6) {
                    str = "Ca ";
                    setCa3 = true;
                    viewModel.set("column_Ca3_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 7) {
                    str = "Ca ";
                    setCa4 = true;
                    viewModel.set("column_Ca4_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 8) {
                    str = "Ca ";
                    setCa5 = true;
                    viewModel.set("column_Ca5_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 9) {
                    str = "Ca ";
                    setCa6 = true;
                    viewModel.set("column_Ca6_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 10) {
                    str = "Ca ";
                    setCa7 = true;
                    viewModel.set("column_Ca7_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 11) {
                    str = "Ca ";
                    setCa8 = true;
                    viewModel.set("column_Ca8_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 12) {
                    str = "Ca ";
                    setCa9 = true;
                    viewModel.set("column_Ca9_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 13) {
                    str = "Ca ";
                    setCa10 = true;
                    viewModel.set("column_Ca10_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 14) {
                    str = "Ca ";
                    setCa11 = true;
                    viewModel.set("column_Ca11_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 15) {
                    str = "Ca ";
                    setCa12 = true;
                    viewModel.set("column_Ca12_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 16) {
                    str = "Ca ";
                    setCa13 = true;
                    viewModel.set("column_Ca13_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 17) {
                    str = "Ca ";
                    setCa14 = true;
                    viewModel.set("column_Ca14_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 18) {
                    str = "Ca ";
                    setCa15 = true;
                    viewModel.set("column_Ca15_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 19) {
                    str = "Ca ";
                    setCa16 = true;
                    viewModel.set("column_Ca16_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 20) {
                    str = "Ca ";
                    setCa17 = true;
                    viewModel.set("column_Ca17_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 21) {
                    str = "Ca ";
                    setCa18 = true;
                    viewModel.set("column_Ca18_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 22) {
                    str = "Ca ";
                    setCa19 = true;
                    viewModel.set("column_Ca19_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 23) {
                    str = "Ca ";
                    setCa20 = true;
                    viewModel.set("column_Ca20_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 24) {
                    str = "Ca ";
                    setCa21 = true;
                    viewModel.set("column_Ca21_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 25) {
                    str = "Ca ";
                    setCa22 = true;
                    viewModel.set("column_Ca22_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 26) {
                    str = "Ca ";
                    setCa23 = true;
                    viewModel.set("column_Ca23_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 27) {
                    str = "Ca ";
                    setCa24 = true;
                    viewModel.set("column_Ca24_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 28) {
                    str = "Ca ";
                    setCa25 = true;
                    viewModel.set("column_Ca25_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 29) {
                    str = "Ca ";
                    setCa26 = true;
                    viewModel.set("column_Ca26_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 30) {
                    str = "Ca ";
                    setCa27 = true;
                    viewModel.set("column_Ca27_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 31) {
                    str = "Ca ";
                    setCa28 = true;
                    viewModel.set("column_Ca28_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 32) {
                    str = "Ca ";
                    setCa29 = true;
                    viewModel.set("column_Ca29_time", str + time);
                } else if (data.timesheet_shift_type_id_link == 33) {
                    str = "Ca ";
                    setCa30 = true;
                    viewModel.set("column_Ca30_time", str + time);
                }
                // console.log(str + time);
            }

            if (!setCa1) {
                viewModel.set("column_Ca1_time", "Ca 1");
                viewModel.set("column_Ca1_hidden", true);
            } else {
                viewModel.set("column_Ca1_hidden", false);
            }
            if (!setCa2) {
                viewModel.set("column_Ca2_time", "Ca 2");
                viewModel.set("column_Ca2_hidden", true);
            } else {
                viewModel.set("column_Ca2_hidden", false);
            }
            if (!setCa3) {
                viewModel.set("column_Ca3_time", "Ca 3");
                viewModel.set("column_Ca3_hidden", true);
            } else {
                viewModel.set("column_Ca3_hidden", false);
            }
            if (!setCa4) {
                viewModel.set("column_Ca4_time", "Ca 4");
                viewModel.set("column_Ca4_hidden", true);
            } else {
                viewModel.set("column_Ca4_hidden", false);
            }
            if (!setCa5) {
                viewModel.set("column_Ca5_time", "Ca 5");
                viewModel.set("column_Ca5_hidden", true);
            } else {
                viewModel.set("column_Ca5_hidden", false);
            }
            if (!setCa6) {
                viewModel.set("column_Ca6_time", "Ca 6");
                viewModel.set("column_Ca6_hidden", true);
            } else {
                viewModel.set("column_Ca6_hidden", false);
            }
            if (!setCa7) {
                viewModel.set("column_Ca7_time", "Ca 7");
                viewModel.set("column_Ca7_hidden", true);
            } else {
                viewModel.set("column_Ca7_hidden", false);
            }
            if (!setCa8) {
                viewModel.set("column_Ca8_time", "Ca 8");
                viewModel.set("column_Ca8_hidden", true);
            } else {
                viewModel.set("column_Ca8_hidden", false);
            }
            if (!setCa9) {
                viewModel.set("column_Ca9_time", "Ca 9");
                viewModel.set("column_Ca9_hidden", true);
            } else {
                viewModel.set("column_Ca9_hidden", false);
            }
            if (!setCa10) {
                viewModel.set("column_Ca10_time", "Ca 10");
                viewModel.set("column_Ca10_hidden", true);
            } else {
                viewModel.set("column_Ca10_hidden", false);
            }
            if (!setCa11) {
                viewModel.set("column_Ca11_time", "Ca 11");
                viewModel.set("column_Ca11_hidden", true);
            } else {
                viewModel.set("column_Ca11_hidden", false);
            }
            if (!setCa12) {
                viewModel.set("column_Ca12_time", "Ca 12");
                viewModel.set("column_Ca12_hidden", true);
            } else {
                viewModel.set("column_Ca12_hidden", false);
            }
            if (!setCa13) {
                viewModel.set("column_Ca13_time", "Ca 13");
                viewModel.set("column_Ca13_hidden", true);
            } else {
                viewModel.set("column_Ca13_hidden", false);
            }
            if (!setCa14) {
                viewModel.set("column_Ca14_time", "Ca 14");
                viewModel.set("column_Ca14_hidden", true);
            } else {
                viewModel.set("column_Ca14_hidden", false);
            }
            if (!setCa15) {
                viewModel.set("column_Ca15_time", "Ca 15");
                viewModel.set("column_Ca15_hidden", true);
            } else {
                viewModel.set("column_Ca15_hidden", false);
            }
            if (!setCa16) {
                viewModel.set("column_Ca16_time", "Ca 16");
                viewModel.set("column_Ca16_hidden", true);
            } else {
                viewModel.set("column_Ca16_hidden", false);
            }
            if (!setCa17) {
                viewModel.set("column_Ca17_time", "Ca 17");
                viewModel.set("column_Ca17_hidden", true);
            } else {
                viewModel.set("column_Ca17_hidden", false);
            }
            if (!setCa18) {
                viewModel.set("column_Ca18_time", "Ca 18");
                viewModel.set("column_Ca18_hidden", true);
            } else {
                viewModel.set("column_Ca18_hidden", false);
            }
            if (!setCa19) {
                viewModel.set("column_Ca19_time", "Ca 19");
                viewModel.set("column_Ca19_hidden", true);
            } else {
                viewModel.set("column_Ca19_hidden", false);
            }
            if (!setCa20) {
                viewModel.set("column_Ca20_time", "Ca 20");
                viewModel.set("column_Ca20_hidden", true);
            } else {
                viewModel.set("column_Ca20_hidden", false);
            }
            if (!setCa21) {
                viewModel.set("column_Ca21_time", "Ca 21");
                viewModel.set("column_Ca21_hidden", true);
            } else {
                viewModel.set("column_Ca21_hidden", false);
            }
            if (!setCa22) {
                viewModel.set("column_Ca22_time", "Ca 22");
                viewModel.set("column_Ca22_hidden", true);
            } else {
                viewModel.set("column_Ca22_hidden", false);
            }
            if (!setCa23) {
                viewModel.set("column_Ca23_time", "Ca 23");
                viewModel.set("column_Ca23_hidden", true);
            } else {
                viewModel.set("column_Ca23_hidden", false);
            }
            if (!setCa24) {
                viewModel.set("column_Ca24_time", "Ca 24");
                viewModel.set("column_Ca24_hidden", true);
            } else {
                viewModel.set("column_Ca24_hidden", false);
            }
            if (!setCa25) {
                viewModel.set("column_Ca25_time", "Ca 25");
                viewModel.set("column_Ca25_hidden", true);
            } else {
                viewModel.set("column_Ca25_hidden", false);
            }
            if (!setCa26) {
                viewModel.set("column_Ca26_time", "Ca 26");
                viewModel.set("column_Ca26_hidden", true);
            } else {
                viewModel.set("column_Ca26_hidden", false);
            }
            if (!setCa27) {
                viewModel.set("column_Ca27_time", "Ca 27");
                viewModel.set("column_Ca27_hidden", true);
            } else {
                viewModel.set("column_Ca27_hidden", false);
            }
            if (!setCa28) {
                viewModel.set("column_Ca28_time", "Ca 28");
                viewModel.set("column_Ca28_hidden", true);
            } else {
                viewModel.set("column_Ca28_hidden", false);
            }
            if (!setCa29) {
                viewModel.set("column_Ca29_time", "Ca 29");
                viewModel.set("column_Ca29_hidden", true);
            } else {
                viewModel.set("column_Ca29_hidden", false);
            }
            if (!setCa30) {
                viewModel.set("column_Ca30_time", "Ca 30");
                viewModel.set("column_Ca30_hidden", true);
            } else {
                viewModel.set("column_Ca30_hidden", false);
            }

            // m.sortColumns();
        },

        // setShiftTime: function(response){
        //     var m = this;
        //     var me = this.getView();
        //     var viewModel = this.getViewModel();

        //     var obj = new Object();
        //     obj.setCa1 = false;
        //     obj.setCa2 = false;
        //     obj.setCa3 = false;
        //     obj.setCa4 = false;
        //     obj.setCa5 = false;
        //     obj.setCa6 = false;
        //     obj.setCa7 = false;
        //     obj.setCa8 = false;
        //     obj.setCa9 = false;
        //     obj.setCa10 = false;
        //     obj.setCa11 = false;
        //     obj.setCa12 = false;
        //     obj.setCa13 = false;
        //     obj.setCa14 = false;
        //     obj.setCa15 = false;
        //     obj.setCa16 = false;
        //     obj.setCa17 = false;
        //     obj.setCa18 = false;
        //     obj.setCa19 = false;
        //     obj.setCa20 = false;
        //     obj.setCa21 = false;
        //     obj.setCa22 = false;
        //     obj.setCa23 = false;
        //     obj.setCa24 = false;
        //     obj.setCa25 = false;
        //     obj.setCa26 = false;
        //     obj.setCa27 = false;
        //     obj.setCa28 = false;
        //     obj.setCa29 = false;
        //     obj.setCa30 = false;

        //     for (var i = 0; i < response.data.length; i++) {
        //         var data = response.data[i];
        //         // console.log(data);
        //         // var str = data.name.trim() + ' ';
        //         var str = '';
        //         var time = '<br>';
        //         time += data.from_hour < 10 ? '0' + data.from_hour : data.from_hour;
        //         time += data.from_minute < 10 ? ':0' + data.from_minute : ':' + data.from_minute;
        //         time += ' - ';
        //         time += data.to_hour < 10 ? '0' + data.to_hour : data.to_hour;
        //         time += data.to_minute < 10 ? ':0' + data.to_minute : ':' + data.to_minute;
        //         // str += time;

        //         response.data[i].time = time;
        //         response.data[i].str = 'Ca ' + str + time;

        //         // if(data.timesheet_shift_type_id_link == 4){
        //         //     str = 'Ca ';
        //         //     setCa1 = true;
        //         //     viewModel.set('column_Ca1_time', str + time);

        //         // }
        //     }

        //     // console.log(response.data);
        //     response.data.sort(function(a, b){
        //         if(a.from_hour > b.from_hour) return 1;
        //         if(a.from_hour < b.from_hour) return -1;
        //         if(a.from_minute > b.from_minute) return 1;
        //         if(a.from_minute < b.from_minute) return -1;
        //         return 0;
        //     });

        //     for(var i = 0; i < response.data.length; i++){
        //         var data = response.data[i];
        //         var str = 'Ca ';
        //         var time = response.data[i].time;

        //         obj['setCa' + (i+1)] = true;
        //         viewModel.set('column_Ca'+(i+1)+'_time', str + time);
        //     }

        //     // return;

        //     if(!obj.setCa1){
        //         viewModel.set('column_Ca1_time', 'Ca 1');
        //         viewModel.set('column_Ca1_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca1_hidden', false);
        //     }
        //     if(!obj.setCa2){
        //         viewModel.set('column_Ca2_time', 'Ca 2');
        //         viewModel.set('column_Ca2_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca2_hidden', false);
        //     }
        //     if(!obj.setCa3){
        //         viewModel.set('column_Ca3_time', 'Ca 3');
        //         viewModel.set('column_Ca3_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca3_hidden', false);
        //     }
        //     if(!obj.setCa4){
        //         viewModel.set('column_Ca4_time', 'Ca 4');
        //         viewModel.set('column_Ca4_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca4_hidden', false);
        //     }
        //     if(!obj.setCa5){
        //         viewModel.set('column_Ca5_time', 'Ca 5');
        //         viewModel.set('column_Ca5_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca5_hidden', false);
        //     }
        //     if(!obj.setCa6){
        //         viewModel.set('column_Ca6_time', 'Ca 6');
        //         viewModel.set('column_Ca6_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca6_hidden', false);
        //     }
        //     if(!obj.setCa7){
        //         viewModel.set('column_Ca7_time', 'Ca 7');
        //         viewModel.set('column_Ca7_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca7_hidden', false);
        //     }
        //     if(!obj.setCa8){
        //         viewModel.set('column_Ca8_time', 'Ca 8');
        //         viewModel.set('column_Ca8_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca8_hidden', false);
        //     }
        //     if(!obj.setCa9){
        //         viewModel.set('column_Ca9_time', 'Ca 9');
        //         viewModel.set('column_Ca9_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca9_hidden', false);
        //     }
        //     if(!obj.setCa10){
        //         viewModel.set('column_Ca10_time', 'Ca 10');
        //         viewModel.set('column_Ca10_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca10_hidden', false);
        //     }
        //     if(!obj.setCa11){
        //         viewModel.set('column_Ca11_time', 'Ca 11');
        //         viewModel.set('column_Ca11_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca11_hidden', false);
        //     }
        //     if(!obj.setCa12){
        //         viewModel.set('column_Ca12_time', 'Ca 12');
        //         viewModel.set('column_Ca12_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca12_hidden', false);
        //     }
        //     if(!obj.setCa13){
        //         viewModel.set('column_Ca13_time', 'Ca 13');
        //         viewModel.set('column_Ca13_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca13_hidden', false);
        //     }
        //     if(!obj.setCa14){
        //         viewModel.set('column_Ca14_time', 'Ca 14');
        //         viewModel.set('column_Ca14_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca14_hidden', false);
        //     }
        //     if(!obj.setCa15){
        //         viewModel.set('column_Ca15_time', 'Ca 15');
        //         viewModel.set('column_Ca15_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca15_hidden', false);
        //     }
        //     if(!obj.setCa16){
        //         viewModel.set('column_Ca16_time', 'Ca 16');
        //         viewModel.set('column_Ca16_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca16_hidden', false);
        //     }
        //     if(!obj.setCa17){
        //         viewModel.set('column_Ca17_time', 'Ca 17');
        //         viewModel.set('column_Ca17_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca17_hidden', false);
        //     }
        //     if(!obj.setCa18){
        //         viewModel.set('column_Ca18_time', 'Ca 18');
        //         viewModel.set('column_Ca18_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca18_hidden', false);
        //     }
        //     if(!obj.setCa19){
        //         viewModel.set('column_Ca19_time', 'Ca 19');
        //         viewModel.set('column_Ca19_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca19_hidden', false);
        //     }
        //     if(!obj.setCa20){
        //         viewModel.set('column_Ca20_time', 'Ca 20');
        //         viewModel.set('column_Ca20_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca20_hidden', false);
        //     }
        //     if(!obj.setCa21){
        //         viewModel.set('column_Ca21_time', 'Ca 21');
        //         viewModel.set('column_Ca21_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca21_hidden', false);
        //     }
        //     if(!obj.setCa22){
        //         viewModel.set('column_Ca22_time', 'Ca 22');
        //         viewModel.set('column_Ca22_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca22_hidden', false);
        //     }
        //     if(!obj.setCa23){
        //         viewModel.set('column_Ca23_time', 'Ca 23');
        //         viewModel.set('column_Ca23_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca23_hidden', false);
        //     }
        //     if(!obj.setCa24){
        //         viewModel.set('column_Ca24_time', 'Ca 24');
        //         viewModel.set('column_Ca24_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca24_hidden', false);
        //     }
        //     if(!obj.setCa25){
        //         viewModel.set('column_Ca25_time', 'Ca 25');
        //         viewModel.set('column_Ca25_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca25_hidden', false);
        //     }
        //     if(!obj.setCa26){
        //         viewModel.set('column_Ca26_time', 'Ca 26');
        //         viewModel.set('column_Ca26_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca26_hidden', false);
        //     }
        //     if(!obj.setCa27){
        //         viewModel.set('column_Ca27_time', 'Ca 27');
        //         viewModel.set('column_Ca27_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca27_hidden', false);
        //     }
        //     if(!obj.setCa28){
        //         viewModel.set('column_Ca28_time', 'Ca 28');
        //         viewModel.set('column_Ca28_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca28_hidden', false);
        //     }
        //     if(!obj.setCa29){
        //         viewModel.set('column_Ca29_time', 'Ca 29');
        //         viewModel.set('column_Ca29_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca29_hidden', false);
        //     }
        //     if(!obj.setCa30){
        //         viewModel.set('column_Ca30_time', 'Ca 30');
        //         viewModel.set('column_Ca30_hidden', true);
        //     }else{
        //         viewModel.set('column_Ca30_hidden', false);
        //     }

        //     // m.sortColumns();
        // },

        sortColumns: function () {
            var m = this;
            var me = this.getView();
            var viewModel = this.getViewModel();

            var ChiTietBaoAnView = Ext.getCmp("ChiTietBaoAnView");
            var headerCt = ChiTietBaoAnView.headerCt;
            var columns = headerCt.items.getRange();

            Ext.Array.sort(columns, function (col1, col2) {
                // if(record.get(col1.dataIndex) < record.get(col2.dataIndex)) return -1;
                // if(record.get(col1.dataIndex) > record.get(col2.dataIndex)) return 1;
                if (col1.is_shift_column < col2.is_shift_column) return -1;
                if (col1.is_shift_column > col2.is_shift_column) return 1;

                var col1Text = col1.text;
                var col2Text = col2.text;

                if (col1Text.length > col2Text.length) {
                    return -1;
                }
                if (col1Text.length < col2Text.length) {
                    return 1;
                }

                if (col1Text.length > 6 && col2Text.length > 6) {
                    // Ca <br>00:30 - 01:15
                    var col1TextSub = col1Text.substring(7, 3);
                    var col2TextSub = col2Text.substring(7, 3);
                    var col1TextSub2 = col1Text.substring(10, 3);
                    var col2TextSub2 = col2Text.substring(10, 3);

                    if (col1TextSub < col2TextSub) return -1;
                    if (col1TextSub > col2TextSub) return 1;
                    if (col1TextSub2 < col2TextSub2) return -1;
                    if (col1TextSub2 > col2TextSub2) return 1;
                }

                return 0;
            });

            headerCt.suspendLayouts();
            for (var i = 0; i < columns.length; i++) {
                headerCt.moveAfter(columns[i], columns[i - 1] || null);
            }
            headerCt.resumeLayouts(true);

            console.log(columns);
        },

        exportGuestRice: function () {
            var grid = this.getView();
            var detail = grid.up("#TongHopBaoAnView");
            var viewmodel = this.getViewModel();
            var me = this;

            var params = new Object();
            params.orgid_link = viewmodel.get("orgid_link");
            params.date_from = viewmodel.get("date_from");
            params.date_to = viewmodel.get("date_to");

            if (params.orgid_link == 0) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Chưa chọn đơn vị",
                    button: Ext.MessageBox.YES,
                    buttonText: {
                        yes: "Đóng",
                    },
                });
                return;
            }

            detail.setLoading("Đang tải dữ liệu");
            var fileName = "ComKhach.xlsx";

            GSmartApp.Ajax.post(
                "/api/v1/timesheetlunch/exportGuestRice",
                Ext.JSON.encode(params),
                function (success, response, options) {
                    detail.setLoading(false);

                    if (!success) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thất bại rồi",
                            button: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }

                    response = Ext.decode(response.responseText);

                    if (response.respcode == 200) {
                        me.saveByteArray(fileName, response.data);
                    } else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }
                }
            );
        },

        exportRice: function () {
            var grid = this.getView();
            var detail = grid.up("#TongHopBaoAnView");
            var viewmodel = this.getViewModel();
            var me = this;

            var params = new Object();
            params.orgid_link = viewmodel.get("orgid_link");
            params.date_from = viewmodel.get("date_from");
            params.date_to = viewmodel.get("date_to");

            if (params.orgid_link == 0) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Chưa chọn đơn vị",
                    button: Ext.MessageBox.YES,
                    buttonText: {
                        yes: "Đóng",
                    },
                });
                return;
            }

            detail.setLoading("Đang tải dữ liệu");
            var fileName = "TongHopComCa.xlsx";

            GSmartApp.Ajax.post(
                "/api/v1/timesheetlunch/exportRice",
                Ext.JSON.encode(params),
                function (success, response, options) {
                    detail.setLoading(false);

                    if (!success) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thất bại rồi",
                            button: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }

                    response = Ext.decode(response.responseText);

                    if (response.respcode == 200) {
                        me.saveByteArray(fileName, response.data);
                    } else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }
                }
            );
        },

        exportExtraRice: function () {
            var grid = this.getView();
            var detail = grid.up("#TongHopBaoAnView");
            var viewmodel = this.getViewModel();
            var me = this;

            var params = new Object();
            params.orgid_link = viewmodel.get("orgid_link");
            params.date_from = viewmodel.get("date_from");
            params.date_to = viewmodel.get("date_to");

            if (params.orgid_link == 0) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Chưa chọn đơn vị",
                    button: Ext.MessageBox.YES,
                    buttonText: {
                        yes: "Đóng",
                    },
                });
                return;
            }

            detail.setLoading("Đang tải dữ liệu");
            var fileName = "TongHopComTangCa.xlsx";

            GSmartApp.Ajax.post(
                "/api/v1/timesheetlunch/exportExtraRice",
                Ext.JSON.encode(params),
                function (success, response, options) {
                    detail.setLoading(false);

                    if (!success) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            button: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }

                    response = Ext.decode(response.responseText);

                    if (response.respcode == 200) {
                        me.saveByteArray(fileName, response.data);
                    } else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }
                }
            );
        },

        exportComCa: function () {
            var grid = this.getView();
            var detail = grid.up("#TongHopBaoAnView");
            var viewmodel = this.getViewModel();
            var me = this;

            var params = new Object();
            params.orgid_link = viewmodel.get("orgid_link");
            params.date_from = viewmodel.get("date_from");
            params.date_to = viewmodel.get("date_to");

            if (params.orgid_link == 0) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Chưa chọn đơn vị",
                    button: Ext.MessageBox.YES,
                    buttonText: {
                        yes: "Đóng",
                    },
                });
                return;
            }

            detail.setLoading("Đang tải dữ liệu");
            var fileName = "ComCa.xlsx";

            GSmartApp.Ajax.post(
                "/api/v1/timesheetlunch/exportComCa",
                Ext.JSON.encode(params),
                function (success, response, options) {
                    detail.setLoading(false);

                    if (!success) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            button: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }

                    response = Ext.decode(response.responseText);

                    if (response.respcode == 200) {
                        me.saveByteArray(fileName, response.data);
                    } else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }
                }
            );
        },

        exportComTangCa: function () {
            var grid = this.getView();
            var detail = grid.up("#TongHopBaoAnView");
            var viewmodel = this.getViewModel();
            var me = this;

            var params = new Object();
            params.orgid_link = viewmodel.get("orgid_link");
            params.date_from = viewmodel.get("date_from");
            params.date_to = viewmodel.get("date_to");

            if (params.orgid_link == 0) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Chưa chọn đơn vị",
                    button: Ext.MessageBox.YES,
                    buttonText: {
                        yes: "Đóng",
                    },
                });
                return;
            }

            detail.setLoading("Đang tải dữ liệu");
            var fileName = "ComTangCa.xlsx";

            GSmartApp.Ajax.post(
                "/api/v1/timesheetlunch/exportComTangCa",
                Ext.JSON.encode(params),
                function (success, response, options) {
                    detail.setLoading(false);

                    if (!success) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            button: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }

                    response = Ext.decode(response.responseText);

                    if (response.respcode == 200) {
                        me.saveByteArray(fileName, response.data);
                    } else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: "Đóng",
                            },
                        });
                    }
                }
            );
        },

        saveByteArray: function (reportName, byte) {
            byte = this.base64ToArrayBuffer(byte);

            var blob = new Blob([byte], { type: "application/xlsx" });
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            var fileName = reportName;
            link.download = fileName;
            link.click();
            link.remove();
        },

        base64ToArrayBuffer: function (base64) {
            var binaryString = window.atob(base64);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            return bytes;
        },
    }
);
