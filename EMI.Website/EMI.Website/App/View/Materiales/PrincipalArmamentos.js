Ext.define("App.View.Materiales.PrincipalArmamentos", {
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
        Funciones.CrearMenu('btn_CrearItems', 'Crear Items', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarItems', 'Editar Items', Constantes.ICONO_EDITAR, me.EventoPrincipal, me.toolbar, this,null,null,true);
        //Funciones.CrearMenu('btn_Despachos', 'Despachos Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_AdmModelos', 'Adm. Modelos', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        me.grid = Ext.create('App.View.Materiales.GridArmamentos', {
            region: 'center',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_EditarItems"]
        });
        me.items = [me.grid];

    },
    MostarCrearItems: function (record) {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Items' });
        var form = Ext.create('App.View.Materiales.FormItemArmamento', { botones: false });
        win.add(form);
        win.show();
        if (record != null) {
            form.loadRecord(record);
            form.gridCmp.getStore().setExtraParams({ ID_ITEM: record.get('ID_ITEM') });
            form.gridCmp.getStore().load();
            form.txt_nro_fusil.setReadOnly(true);
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Armamentos", "GuardarItemArmamento", win, form, me.grid, "Esta Seguro de Guardar EL Item Armamento?", { detalles: Funciones.convertirJson(form.gridCmp, 'create') }, win);
        });
        //GuardarItemArmamento
    },
    MostrarDespachos: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Items' });
        var toolbar = Funciones.CrearMenuBar();
        var btnDespachar = Funciones.CrearMenu('btn_Despachar', 'Despachar Armamento', Constantes.ICONO_CREAR, null, null, null, null, null, true);
        toolbar.add(btnDespachar);
        //Funciones.CrearMenu('btn_Despachos', 'Despachos Pedido', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        //var store = Ext.create
        var grid = Ext.create('App.View.Pedidos.GridDetallePedidos', {
            width: 700,
            height: 350,
            fbarmenu: toolbar,
            paramsStore: { Estados: 'APROBADO' },
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
        var form = Ext.create('App.View.Pedidos.FormDespachoArmamento', { botones: false });
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
                //alert(me.grid.record.get('UNIDAD'));
                if (me.grid.record.get('UNIDAD') != "") {
                    Ext.Msg.alert("Aviso", "No puede Editar Items que no se encuentran en Almacen.");
                } else {
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
        var grid = Ext.create("App.View.Materiales.GridMatBelicos", {
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
        var win = Ext.create('App.Config.Abstract.Window', {botones : true , textGuardar : 'Guardar Armamento'});
        var form = Ext.create('App.View.Materiales.FormArmamento', { botones: false });
        if (record != null) {
            form.loadRecord(record);
            form.gridCmp.getStore().setExtraParams({ ID_MAT_BELICO: record.get('ID_MAT_BELICO') });
            form.gridCmp.getStore().load();
            form.txt_codigo.setReadOnly(true);
            //alert("Se cargaran los datos "+grid.record.get('FABRICACION'));
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Armamentos", "GuardarModeloArmamento", win, form, grid, "Esta Seguro de Guardar EL Armamento?", { detalles: Funciones.convertirJson(form.gridCmp,'create') }, win)
        });
        win.add(form);
        win.show();
    },
   
    MostrarFormularioMaterial: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create('App.View.Materiales.FormMaterial', { botones: false, columns: 1 });
        //solo funciona si el windows es de un abstracto si no 
        win.btn_guardar.on('click', function () {
            //alert("Hoila mundo");
            Funciones.AjaxRequestWin("Materiales", "GuardarMaterial", win, form, me.grid, "Esta Seguro de Guardar el Material Belico?", { ESTADO: 'A' }, win)
        });
        win.add(form);
        win.show();

    },
    EliminarMaterial: function () {
        var me = this;
        var datos = me.grid.getSelectionModel().getSelection()[0];
        if (datos != null) {
            Funciones.AjaxRequestGrid("Materiales", "EliminarMaterial", me.grid, "Esta seguro de Elimninar el Registros", { ID_MATERIAL: datos.get('ID_MATERIAL') }, me.grid, null);
        }
        else {
            Ext.Msg.alert("Error", "Seleccione primero el material");
        }
    }
});
