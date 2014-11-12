Ext.define("App.View.Pedidos.PrincipalAutorizacion", {
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
        Funciones.CrearMenu('btn_verPedido', 'Ver Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this,null,null,true);
        Funciones.CrearMenu('btn_autorizar', 'Autorizacion de Pedido', Constantes.ICONO_EDITAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
       
        me.grid = Ext.create('App.View.Pedidos.GridPedidos', {
            region: 'center',
            fbarmenu: me.toolbar,
            paramsStore : {ESTADO : "NUEVO"},
            fbarmenuArray: ["btn_verPedido", "btn_autorizar"]

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
            case "btn_autorizar":
                //alert("Formulario");
                me.MostrarAutorizacion(me.grid.record);
                break;
            case "btn_verPedido":
                me.VerPedido(me.grid.record);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
   
    MostrarAutorizacion: function (record) {
        var me = this;
        var btn3 = Funciones.CrearMenu('btn_verRechazo', 'Rechazar Pedido', Constantes.ICONO_BAJA,null, null, this);
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Confirmar Autorizacion'  , btn3 : btn3});
        var form = Ext.create("App.View.Pedidos.FormAutorizacion", { botones: false });
        if (record != null) {
            form.loadRecord(me.grid.record);
            form.formConsulta.gridDetalle.getStore().setExtraParams({ ID_PEDIDO: record.get('ID_PEDIDO') });
            form.formConsulta.gridDetalle.getStore().load();
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //alert("Hoila mundo");
            form.formConsulta.txt_estado.setValue('APROBADO');
            Funciones.AjaxRequestWin("Pedidos", "AutorizarPedido", win, form, me.grid, "Esta Seguro de Autorizar Pedido?", null, win)
        });
        win.btn3.on('click', function () {
            //alert("Hoila mundo");
            form.formConsulta.txt_estado.setValue('RECHAZADO');
            Funciones.AjaxRequestWin("Pedidos", "AutorizarPedido", win, form, me.grid, "Esta Seguro de Rechazar el Pedido?", null, win)
        });
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
