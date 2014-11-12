Ext.define("App.View.Unidades.PrincipalUnidadLogisticos", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        //crear botones ne la parte inferior
        //crear un componente donde se alamcenara todos los botones
        me.toolbar = Funciones.CrearMenuBar();
        //creo las opciones
        Funciones.CrearMenu('btn_verificacion', 'Verificacion', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Verificaciones', 'folder_database', me.EventoPrincipal, me.toolbar, this, null, null, true);


        me.grid = Ext.create('App.View.Materiales.GridLogisticos', {
            region: 'center',
            fbarmenu: me.toolbar,
            paramsStore: { ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD },
            fbarmenuArray: ["btn_verificacion", "btn_Kardex"]
        });
        me.items = [me.grid];
        me.grid.on('itemdblclick', me.MostrarKardex, this);

    },
    MostarVerificacion: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Salida' });
        var form = Ext.create('App.View.Unidades.FormVerificacionMatLogistico', { botones: false });
        form.loadRecord(me.grid.record);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Logisticos", "VerificacionMaterialLogistico", win, form, me.grid, "Esta Seguro de Guardar la Verificacion de Mat. Logistico?", null, win);
        });
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
            case "btn_verificacion":
                //alert("Formulario");App.View.Materiales.GridMatBelicos
                me.MostarVerificacion();
                break;
            case "btn_Kardex":
                me.MostrarKardex(null, me.grid.record);

                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
});
