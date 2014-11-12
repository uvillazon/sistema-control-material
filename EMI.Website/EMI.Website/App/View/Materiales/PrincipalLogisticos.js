Ext.define("App.View.Materiales.PrincipalLogisticos", {
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
        Funciones.CrearMenu('btn_CrearItems', 'Crear Items', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarItems', 'Editar Items', Constantes.ICONO_EDITAR, me.EventoPrincipal, me.toolbar, this, null, null, true);
        //Funciones.CrearMenu('btn_Despachos', 'Despachos Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_AdmModelos', 'Adm. Modelos', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);

        

        //});
        me.grid = Ext.create('App.View.Materiales.GridLogisticos', {
            region: 'center',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_EditarItems"]

        });
        me.items = [me.grid];

    },
    MostarCrearItems: function (record) {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Items' });
        var form = Ext.create('App.View.Materiales.FormItemLogistico', { botones: false ,columns : 1});
        win.add(form);
        if (record != null) {
            form.loadRecord(record);
            form.txt_nro_serie.setReadOnly(true);
        }
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Logisticos", "GuardarItemMatLogisticos", win, form, me.grid, "Esta Seguro de Guardar Item Material Logisticos?", null, win);
        });
    },
    MostrarDespachos: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Items' });
        var toolbar = Funciones.CrearMenuBar();
        var btnDespachar = Funciones.CrearMenu('btn_Despachar', 'Despachar Mat. Logistico', Constantes.ICONO_CREAR, null, null, null, null, null, true);
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
        var form = Ext.create('App.View.Pedidos.FormDespachoLogistico', { botones: false });
        win.add(form);
        win.show();
    },
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_CrearItems":
                //alert("Formulario");App.View.Materiales.GridMatBelicos
                me.MostarCrearItems();
                break;
            case "btn_EditarItems":
                if (me.grid.record.get('UNIDAD') != "") {
                    Ext.Msg.alert("Aviso", "No puede Editar Items que no se encuentran en Almacen.");
                }
                else {
                    me.MostarCrearItems(me.grid.record);
                }
                break;
            case "btn_Despachos":
                me.MostrarDespachos();
                break;
            case "btn_AdmModelos":
                me.MostrarAdmModelos();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    MostrarAdmModelos: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window');
        var toolbar = Funciones.CrearMenuBar();
        var btnCrear = Funciones.CrearMenu('btn_Crear', 'Crear', Constantes.ICONO_CREAR, null, null, null, null, null, false);
        var btnEditar = Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, null, null, null, null, null, true);
        toolbar.add([btnCrear,btnEditar]);
        var grid = Ext.create("App.View.Materiales.GridMatLogisticos", {
            width: 650,
            height: 400,
            fbarmenu: toolbar,
            fbarmenuArray: ["btn_Editar"]
        });
        btnCrear.on('click', function () {
            me.CrearModeloArmamento(grid);
        });
        btnEditar.on('click', function () {
            me.CrearModeloArmamento(grid,grid.record);
        });
        win.add(grid);
        win.show();
    },
    CrearModeloArmamento: function (grid,record) {
        var me = this;
        //alert("ebtro");
        var win = Ext.create('App.Config.Abstract.Window', {botones : true , textGuardar : 'Guardar'});
        var form = Ext.create('App.View.Materiales.FormMatLogistico', { botones: false });
        if (record != null) {
            form.loadRecord(record);
            form.txt_codigo.setReadOnly(true);
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Logisticos", "GuardarMatLogisticos", win, form, grid, "Esta Seguro de Guardar  Mat Logisticos?",null, win);
        });
    },
   
});
