Ext.define("App.View.Unidades.PrincipalUnidadMuniciones", {
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
        Funciones.CrearMenu('btn_salida', 'Salida Munciones', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Movimiento', 'folder_database', me.EventoPrincipal, me.toolbar, this, null, null, true);


        //});
        me.grid = Ext.create('App.View.Materiales.GridMunicionesUnidad', {
            region: 'center',
            fbarmenu: me.toolbar,
            paramsStore: { ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD },
            fbarmenuArray: ["btn_Kardex"]
            //height: 350,
            //imagenes: false,

        });
        me.grid.on('itemdblclick', me.MostrarKardex, this);
        me.items = [me.grid];

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
    MostarSalida: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', {botones : true , textGuardar : 'Guardar Salida'});
        var form = Ext.create('App.View.Unidades.FormSalidaMuniciones', { botones: false });
        //form.gridSalida.removeAll();
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //alert("Hoila mundo");
            Funciones.AjaxRequestWin("Armamentos", "GuardarSalidaMunicionesUnidad", win, form, me.grid, "Esta Seguro de Guardar la Salida?", { detalles: Funciones.convertirJson(form.gridSalida, 'create') }, win);
        });
    },

    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_salida":
                //alert("Formulario");App.View.Materiales.GridMatBelicos
                me.MostarSalida();
                break;
            case "btn_Kardex":
                me.MostrarKardex(null, me.grid.record);

                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
});
