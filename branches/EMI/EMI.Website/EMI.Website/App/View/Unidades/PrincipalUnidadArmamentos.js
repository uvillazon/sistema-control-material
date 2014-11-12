Ext.define("App.View.Unidades.PrincipalUnidadArmamentos", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.EventosPrincipal();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        //crear botones ne la parte inferior
        //crear un componente donde se alamcenara todos los botones
        me.toolbar = Funciones.CrearMenuBar();
        //creo las opciones
        Funciones.CrearMenu('btn_reparacion', 'Reparacion', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_verificacion', 'Verificacion', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this,null,null,true);
        Funciones.CrearMenu('btn_Kardex', 'Historico Reparacion', 'folder_database', me.EventoPrincipal, me.toolbar, this, null, null, true);
        //MostrarHistoricoCmp

        //});
        me.grid = Ext.create('App.View.Materiales.GridArmamentos', {
            region: 'center',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_verificacion", "btn_Kardex"],
            paramsStore: { ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD }
            //height: 350,
            //imagenes: false,

        });
        me.gridCmp = Ext.create("App.View.Materiales.GridComponentesArmamentos", {
            title: 'Componentes',
            width: 300,
            region : 'east'
        });
        me.items = [me.grid , me.gridCmp];

    },
    EventosPrincipal : function(){
        var me = this;
        me.grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            if (!disabled) {
                me.gridCmp.getStore().setExtraParams({ ID_ITEM: selections[0].get('ID_ITEM') });
                me.gridCmp.getStore().load();
            }
            else {
                me.gridCmp.getStore().setExtraParams({ ID_ITEM:0});
                me.gridCmp.getStore().load();
            }
            //Funciones.DisabledButton('btn_guardar', win, disabled);
        });
    },
    MostarReparacion: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window');
        var form = Ext.create('App.View.Unidades.FormReparacionComponente', { botones: false });
        win.add(form);
        win.show();
        //win.btn_guardar.on('click', function () {
        //    Funciones.AjaxRequestWin("Armamentos", "CambiarComponentesArmamento", win, form, me.grid, "Esta Seguro de revisar el cambio de componentes?", null, win)
        //});
        //
    },
    MostrarVerificacion : function(){
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', {botones : true , textGuardar : 'Guardar Verificacion'});
        var form = Ext.create('App.View.Unidades.FormVerificacionArmamento', { botones: false });
        form.loadRecord(me.grid.record);
        form.formArmamento.gridCmp.getStore().setExtraParams({ ID_ITEM: me.grid.record.get('ID_ITEM') });
        form.formArmamento.gridCmp.getStore().load();
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Armamentos", "BajaItemArmamento", win, form, me.grid, "Esta Seguro de Cambiar de Estado?", null, win)
        });
    },
   
    
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_reparacion":
                //alert("Formulario");App.View.Materiales.GridMatBelicos
                me.MostarReparacion();
                break;
            case "btn_verificacion":
                if (me.grid.record.get('ESTADO') == "OPERABLE") {
                    me.MostrarVerificacion();
                }
                else {
                    Ext.Msg.alert("Aviso", "Seleccione un Armamento en estado OPERABLE");
                }
                break;
            case "btn_Kardex":
                Funciones.MostrarHistoricoCmp(me.grid.record.get('ID_ITEM'), me.grid.record.get('ESTADO'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
});
