Ext.define("App.View.Materiales.PrincipalMuniciones", {
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
        Funciones.CrearMenu('btn_CrearMunicion', 'Crear Municion', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarMunicion', 'Editar Municion', Constantes.ICONO_EDITAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Movimiento', 'folder_database', me.EventoPrincipal, me.toolbar, this, null, null, true);
        //Funciones.CrearMenu('btn_Despachos', 'Despachos Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
      
        me.grid = Ext.create('App.View.Materiales.GridMuniciones', {
            region: 'center',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_EditarMunicion", "btn_Kardex"]

        });
        me.grid.on('itemdblclick', me.MostrarKardex, this);
        me.items = [me.grid];

    },
    MostrarKardex: function (grid, record, tr, owIndex, e, eOpts) {
        var me = this;
        //alert("asdasd2");
        var win = Ext.create('App.Config.Abstract.Window', { botones: false, textGuardar: 'Guardar Salida' });
        var grid = Ext.create('App.View.Kardex.GridKardexMuniciones', { width: 550, height: 400 });
        grid.getStore().setExtraParams({ ID_MAT_BELICO: record.get('ID_MAT_BELICO') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    },
    MostarCrearMuniciones: function (record) {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Items' });
        var form = Ext.create('App.View.Materiales.FormMunicion', { botones: false });
        win.add(form);
        if (record != null) {
            form.loadRecord(record);
            form.num_cantidad_disponible.setReadOnly(true);
            form.txt_codigo.setReadOnly(true);
        }
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Armamentos", "GuardarMuniciones", win, form, me.grid, "Esta Seguro de Guardar Municiones?", null, win);
        });
    },
    MostrarDespachos: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window');
        var toolbar = Funciones.CrearMenuBar();
        var btnDespachar = Funciones.CrearMenu('btn_Despachar', 'Despachar Municion', Constantes.ICONO_CREAR, null, null, null, null, null, true);
        toolbar.add(btnDespachar);
        //Funciones.CrearMenu('btn_Despachos', 'Despachos Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        var grid = Ext.create('App.View.Pedidos.GridDetallePedidos', {
            width: 700,
            height: 350,
            fbarmenu : toolbar,
            fbarmenuArray: ["btn_Despachar"]
        });
        btnDespachar.on('click', function () {
            me.MostrarCrearDespacho(grid);
            //alert("entro");
        });
        win.add(grid);
        win.show();
    },
    MostrarCrearDespacho: function (grid) {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Despacho' });
        var form = Ext.create('App.View.Pedidos.FormDespachoMuniciones', { botones: false });
        win.add(form);
        win.show();
    },
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_CrearMunicion":
                //alert("Formulario");App.View.Materiales.GridMatBelicos
                me.MostarCrearMuniciones();
                break;
            case "btn_EditarMunicion":
                me.MostarCrearMuniciones(me.grid.record);
                break;
            case "btn_Despachos":
                me.MostrarDespachos();
                break;
            case "btn_Kardex":
                me.MostrarKardex(null,me.grid.record);

                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
});
