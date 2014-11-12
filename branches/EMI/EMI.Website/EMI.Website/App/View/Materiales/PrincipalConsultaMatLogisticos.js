Ext.define("App.View.Materiales.PrincipalConsultaMatLogisticos", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        // base o super que llama a su clase heredada en este caso a App.Config.Abstract.PanelPrincipal
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        //creo las opciones
        Funciones.CrearMenu('btn_Kardex', 'Kardex Verificaciones', 'folder_database', me.EventoPrincipal, me.toolbar, this, null, null, true);

        me.gridLogisticos = Ext.create('App.View.Materiales.GridLogisticos', {
            region: 'center',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Kardex"]
        });
        me.items = [me.gridLogisticos];
        me.gridLogisticos.on('itemdblclick', me.MostrarKardex, this);

    },
    MostrarKardex: function (grid, record, tr, owIndex, e, eOpts) {
        var me = this;
        //alert("asdasd2");
        var win = Ext.create('App.Config.Abstract.Window', { botones: false, textGuardar: 'Guardar Salida' });
        var grid = Ext.create('App.View.Historicos.GridHistoricosMatLog', { width: 550, height: 400 });
        grid.getStore().setExtraParams({ ID_ITEM: record.get('ID_ITEM') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    },
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_Kardex":
                me.MostrarKardex(null, me.gridLogisticos.record);

                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
});
