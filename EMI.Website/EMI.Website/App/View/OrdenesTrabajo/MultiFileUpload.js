Ext.define('App.View.OrdenesTrabajo.MultiFileUpload', {
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Importar archivos',
    result: null,
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;
        me.upload = Ext.create('App.Config.ux.multiupload.Panel', {
            title: 'Archivos',
            width: 600,
            height: 200,
            frame: true,
            uploadConfig: {
                uploadUrl: Constantes.HOST + 'OrdenesTrabajo/GenerarOTPorTramos',
                maxFileSize: 4 * 1024 * 1024,
                maxQueueLength: 10
            }
        });

        me.postes = Ext.create('Ext.grid.Panel', {
            title: 'Postes',
            width: 600,
            height: 300,
            frame: true,
            margin: '5 0 0',
            store: Ext.create('App.Store.OrdenesTrabajo.DetallesReemplazo'),
            columns: [
                 { xtype: "rownumberer", width: 30, sortable: false },
                 { header: 'POSTE', dataIndex: 'COD_POSTE', width: 250, sortable: false },
                 { header: 'PIQUETE', dataIndex: 'PIQUETE', width: 120, align: 'center', sortable: false },
                 { header: 'TENSION', dataIndex: 'TENSION', width: 120, align: 'center', sortable: false }
            ],
        });

        me.formulario = Ext.create('Ext.form.Panel', {
            title: 'Tension',
            width: 600,
            height: 50,
            items: [{
                xtype: 'checkboxgroup',
                fieldLabel: 'Postes',
                columns: 2,
                margin: '0 0 5 10',
                items: [{ name: 'tension1', id: 'tension1', boxLabel: 'BT', inputValue: 'BT', checked: true },
                        { name: 'tension2', id: 'tension2', boxLabel: 'MT', inputValue: 'MT', checked: true }]
            }]
        });

        return [me.upload, me.postes, me.formulario];
    }
});