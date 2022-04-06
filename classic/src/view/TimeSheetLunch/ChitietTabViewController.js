Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.ChitietTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChitietTabViewController',
    init: function () {
    },
    control: {

    },
    listen: {
        controller: {
            'TimeSheetLunch_ListOrgViewController': {
                'SelectOrg': 'onSelectOrg'
            },
            'TimeSheetLunch_MainViewController': {
                'ChangeDate': 'onChangeDate'
            }
        }
    },
    onSelectOrg: function (record) {
        var viewModel = this.getViewModel();
        viewModel.set('orgid_link', record.get('id'));
        if (record.get('orgtypeid_link') == 13) {
            viewModel.set('isHidden_khach', false);
            var storeKhach = viewModel.getStore('TimeSheetLunchKhachStore');
            var orgid_link = viewModel.get('orgid_link');
            var date = viewModel.get('current');
            storeKhach.loadStore(orgid_link, date);
        }
        else
            viewModel.set('isHidden_khach', true);

    },
    onChangeDate: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var date = viewModel.get('current');
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        var orgtypeid_link = viewModel.get('orgtypeid_link');
        var orgid_link = viewModel.get('orgid_link');

        if (orgtypeid_link == 13) {
            var storeKhach = viewModel.getStore('TimeSheetLunchKhachStore');
            storeKhach.loadStore(orgid_link, date);
        }
    }
})