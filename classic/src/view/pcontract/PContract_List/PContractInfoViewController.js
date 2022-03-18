Ext.define('GSmartApp.view.pcontract.PContractInfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractInfoViewController',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnBaoCaoKHSX': {
            click: 'onBaoCaoKHSX'
        }
    },
    init: function () {
        var viewmodel = this.getViewModel();
        var storeproduct = viewmodel.getStore('PContractProductTreeStore');
        storeproduct.loadStore(viewmodel.get('pcontractid_link'), 0);
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onBaoCaoKHSX: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontractid_link = viewModel.get('pcontractid_link');

        

        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn sản phẩm để in",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }else{
            console.log(select);
            var product_ids = new Array();
            for(var i=0; i<select.length; i++){
                var item = select[i];
                if(item.childNodes != null){
                    if(item.childNodes.length == 0){
                        // sp con
                        var idSp = item.get('productid_link');
                        product_ids.push(idSp);
                    }else{
                        // sp bo -> lay danh sach san pham con
                        var idSp = item.get('productid_link');
                        product_ids.push(idSp);
                    }
                }
            }

            m.BaoCaoKHSX(pcontractid_link, product_ids);
 
        }
    },
    BaoCaoKHSX: function(pcontractid_link, product_ids){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var rec = viewModel.get('pcontract');

        var fileName = "KeHoachSX_" + rec.get('contractcode') + ".xlsx";
        var id = rec.get('id');

        me.setLoading(true);

        var params = new Object();
        params.id = pcontractid_link;
        params.product_ids = product_ids;

        GSmartApp.Ajax.post('/api/v1/pcontract/get_TongHopBaoCaoKHSX', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                me.setLoading(false);
				if (success) {
					if (response.respcode == 200) {
                        console.log('get_TongHopBaoCaoKHSX successed');
                        m.saveByteArray(fileName, response.data);
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: 'Lấy thông tin tổng hợp thất bại',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}
            })
    },

    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);
        
        var blob = new Blob([byte], {type: "application/xlsx"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
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

    onStyleCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var filterField = this.lookupReference('styleCodeFilter');
        store = viewmodel.getStore('PContractProductTreeStore'),
            filters = store.getFilters();

        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
})