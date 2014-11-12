Ext.define("App.View.Pedidos.PrincipalDespacho", {
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
        Funciones.CrearMenu('btn_despachoMuniciones', 'Despacho Municiones', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
        Funciones.CrearMenu('btn_despachoArmamento', 'Despacho Armamento', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
        Funciones.CrearMenu('btn_despachoLogistico', 'Despacho Mat. Logistico', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
       
        me.grid = Ext.create('App.View.Pedidos.GridDetallePedidos', {
            region: 'center',
            fbarmenu: me.toolbar,
            paramsStore: { Estados: ['APROBADO', 'DESPACHADO'] },
            //fbarmenuArray: ["btn_verPedido", "btn_editarPedido"]

        });
        me.grid.getSelectionModel().on('selectionchange', me.onSeleccion, this);
        me.items = [me.grid];

    },
    onSeleccion: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.grid.record = disabled ? null : selections[0];
        Funciones.DisabledButton('btn_verPedido', me.grid, disabled);
        if (!disabled) {
            if (selections[0].get('TIPO') == "BELICO") {
                Funciones.DisabledButton('btn_despachoLogistico', me.grid, true);
                if (selections[0].get('CATEGORIA') == "MUNICIONES") {
                    Funciones.DisabledButton('btn_despachoMuniciones', me.grid, false);
                    Funciones.DisabledButton('btn_despachoArmamento', me.grid, true);
                }
                else {
                    Funciones.DisabledButton('btn_despachoMuniciones', me.grid, true);
                    Funciones.DisabledButton('btn_despachoArmamento', me.grid, false);
                }
            }
            else {
                Funciones.DisabledButton('btn_despachoLogistico', me.grid, false);
                Funciones.DisabledButton('btn_despachoMuniciones', me.grid, true);
                Funciones.DisabledButton('btn_despachoArmamento', me.grid, true);
            }
        }
        else {
            Funciones.DisabledButton('btn_despachoLogistico', me.grid, true);
            Funciones.DisabledButton('btn_despachoMuniciones', me.grid, true);
            Funciones.DisabledButton('btn_despachoArmamento', me.grid, true);
        }
    },
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_despachoMuniciones":
                //alert("Formulario");
                me.MostrarDespachoMuniciones();
                break;
            case "btn_despachoArmamento":
                //alert("Formulario");
                me.MostrarDespachoArmamento();
                break;
            case "btn_despachoLogistico":
                me.MostrarDespachoLogistico();
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
    MostrarDespachoMuniciones : function(){
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Despacho' });
        var form = Ext.create('App.View.Pedidos.FormDespachoMuniciones', { botones: false });
        form.loadRecord(me.grid.record);
        form.gridDespacho.getStore().setExtraParams({ ID_DETALLE: me.grid.record.get('ID_DETALLE') });
        form.gridDespacho.getStore().load();
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Pedidos", "GuardarDespacho", win, form, me.grid, "Esta Seguro de Guardar Despacho?", null, win)
        });
    },
    MostrarDespachoArmamento : function(){
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Despacho' });
        var form = Ext.create('App.View.Pedidos.FormDespachoArmamento', { botones: false });
        form.loadRecord(me.grid.record);
        form.store_item_armamento.setExtraParams({ ID_MAT_BELICO: me.grid.record.get('ID_MAT_BELICO') });
        form.gridRecepcion.getStore().removeAll(true);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Pedidos", "GuardarDetalleDespacho", win, form, me.grid, "Esta Seguro de Guardar Despacho?", { detalles: Funciones.convertirJson(form.gridRecepcion, 'crear') }, win)
        });
    },
    MostrarDespachoLogistico : function(){
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Despacho' });
        var form = Ext.create('App.View.Pedidos.FormDespachoLogistico', { botones: false });
        form.loadRecord(me.grid.record);
        form.store_item_armamento.setExtraParams({ ID_MAT_LOGISTICO: me.grid.record.get('ID_MAT_LOGISTICO') });
        form.gridRecepcion.getStore().removeAll(true);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Pedidos", "GuardarDetalleDespacho", win, form, me.grid, "Esta Seguro de Guardar Despacho?", { detalles: Funciones.convertirJson(form.gridRecepcion, 'crear') }, win)
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
