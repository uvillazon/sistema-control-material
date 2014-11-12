Ext.define("App.View.Pedidos.PrincipalPedidoConsulta", {
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
        //crear botones ne la parte inferior
        //crear un componente donde se alamcenara todos los botones
        me.toolbar = Funciones.CrearMenuBar();
        //creo las opciones
        Funciones.CrearMenu('btn_verPedido', 'Ver Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this,null,null,true);
        //Funciones.CrearMenu('btn_crearPedido', 'Crear Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_editarPedido', 'Editar Pedido', Constantes.ICONO_EDITAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
        //Funciones.CrearMenu('btn_recepcionPedido', 'Recepcion Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
       
        me.grid = Ext.create('App.View.Pedidos.GridPedidos', {
            region: 'center',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_verPedido"]

        });
        me.items = [me.grid];

    },
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crearPedido":
                //alert("Formulario");
                me.MostrarCrearPedido();
                break;
            case "btn_editarPedido":
                //alert("Formulario");
                me.MostrarCrearPedido(me.grid.record);
                break;
            case "btn_recepcionPedido":
                me.RecepcionPedido();
                break;
            case "btn_verPedido":
                me.VerPedido(me.grid.record);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    RecepcionPedido: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Items' });
        var toolbar = Funciones.CrearMenuBar();
        var btnRecepcion = Funciones.CrearMenu('btn_recepcion', 'Recepcion', Constantes.ICONO_CREAR, null, null, null, null, null, true);
        toolbar.add(btnRecepcion);
        //Funciones.CrearMenu('btn_Despachos', 'Despachos Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        var grid = Ext.create('App.View.Pedidos.GridDetallePedidos', {
            width: 700,
            height: 350,
            fbarmenu: toolbar,
            fbarmenuArray: ["btn_recepcion"]
        });
        btnRecepcion.on('click', function () {
            me.MostrarRecepcion(grid);
            //alert("entro");
        });
        win.add(grid);
        win.show();
    },
    MostrarRecepcion: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Confirmar Recepcion' });
        var form = Ext.create("App.View.Pedidos.FormRecepcionPedido", { botones: false });
        win.add(form);
        win.show();
    },
    MostrarCrearPedido: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create('App.View.Pedidos.FormPedido', { botones: false, columns: 2 });
        if (record != null) {
            form.loadRecord(me.grid.record);
            form.gridDetalle.getStore().setExtraParams({ ID_PEDIDO: record.get('ID_PEDIDO') });
            form.gridDetalle.getStore().load();
        }
        //solo funciona si el windows es de un abstracto si no 
        win.btn_guardar.on('click', function () {
            //alert("Hoila mundo");
            Funciones.AjaxRequestWin("Pedidos", "GuardarPedido", win, form, me.grid, "Esta Seguro de Guardar el Pedido?", { detalles: Funciones.convertirJson(form.gridDetalle, 'create') }, win)
        });
        win.add(form);
        win.show();

    },
    VerPedido: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var form = Ext.create('App.View.Pedidos.FormConsultaPedido', { botones: false, columns: 2 });
        if (record != null) {
            form.loadRecord(me.grid.record);
            form.gridDetalle.getStore().setExtraParams({ ID_PEDIDO: record.get('ID_PEDIDO') });
            form.gridDetalle.getStore().load();
        }
        win.add(form);
        win.show();
    }
});
