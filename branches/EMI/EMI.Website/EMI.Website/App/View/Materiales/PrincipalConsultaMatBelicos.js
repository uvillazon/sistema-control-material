Ext.define("App.View.Materiales.PrincipalConsultaMatBelicos", {
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
        Funciones.CrearMenu('btn_Kardex', 'Kardex Movimiento', 'folder_database', me.EventoPrincipal, me.toolbar, this, null, null, true);

        me.toolbar1 = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Kardex1', 'Kardex Movimiento', 'folder_database', me.EventoPrincipal, me.toolbar1, this, null, null, true);

        me.gridMuniciones = Ext.create('App.View.Materiales.GridMuniciones',
            {
                title: 'Municiones Por Almacen',
                fbarmenu: me.toolbar1,
                fbarmenuArray: ["btn_Kardex1"]

            });
        me.gridMunicionesUnidad = Ext.create('App.View.Materiales.GridMunicionesUnidad', {
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Kardex"]
        });
        me.gridArmamentos = Ext.create('App.View.Materiales.GridArmamentos');
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            region: 'center',
            items: [
                me.gridArmamentos,
                me.gridMuniciones,
                me.gridMunicionesUnidad
            ]
        });

        me.items = [me.tabPanel];

    },
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_Kardex":
                me.MostrarKardex(null, me.gridMunicionesUnidad.record);

                break;
            case "btn_Kardex1":
                me.MostrarKardex1(null, me.gridMuniciones.record);

                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    MostrarKardex: function (grid, record, tr, owIndex, e, eOpts) {
        var me = this;
        //alert("asdasd2");
        var win = Ext.create('App.Config.Abstract.Window', { botones: false, textGuardar: 'Guardar Salida' });
        var grid = Ext.create('App.View.Kardex.GridKardexMunicionesUnidad', { width: 550, height: 400 });
        grid.getStore().setExtraParams({ ID_MUNICION_UNIDAD: record.get('ID_MUNICION_UNIDAD') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    },
    MostrarKardex1: function (grid, record, tr, owIndex, e, eOpts) {
        var me = this;
        //alert("asdasd2");
        var win = Ext.create('App.Config.Abstract.Window', { botones: false, textGuardar: 'Guardar Salida' });
        var grid = Ext.create('App.View.Kardex.GridKardexMuniciones', { width: 550, height: 400 });
        grid.getStore().setExtraParams({ ID_MAT_BELICO: record.get('ID_MAT_BELICO') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    },
});
