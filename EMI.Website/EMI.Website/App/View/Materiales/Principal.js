Ext.define("App.View.Materiales.Principal", {
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
        Funciones.CrearMenu('btn_CrearMaterial', 'Crear Material', Constantes.ICONO_CREAR, me.EventoPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_Imprimir', 'Imprimir', Constantes.ICONO_IMPRIMIR, me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventoPrincipal, me.toolbar, this, null, true);

        //me.grid = Ext.create('App.View.Ingresos.GridIngresos', {
        //    region: 'center',
        //    height: 350,
        //    imagenes: false,
        //    opcion: 'GridIngresos',
        //    toolbar: me.toolbar

        //});
        me.grid = Ext.create('App.View.Materiales.GridMateriales', {
            region: 'center',
            fbarmenu: me.toolbar
            //height: 350,
            //imagenes: false,

        });
        me.items = [me.grid];

    },
    EventoPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_CrearMaterial":
                //alert("Formulario");
                me.MostrarFormularioMaterial();
                break;
            case "btn_Eliminar":
                me.EliminarMaterial();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
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
