Ext.define("App.View.Usuarios.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Clientes',
    accionGrabar: 'GrarbarCliente',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Nuevo Usuario', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosPrincipal, me.toolbar, this, null, null, true);
        Funciones.CrearMenu('btn_Editar', 'Editar Usuario', Constantes.ICONO_EDITAR, me.EventosPrincipal, me.toolbar, this, null, null, true);

        Funciones.CrearMenu('btn_Desbloquear', 'Desbloquear Cuenta', 'lock_open', me.EventosPrincipal, me.toolbar, this, null, null, true);
        //Funciones.CrearMenu('btn_CrearPerfil', 'Perfiles', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCliente, me.toolbar, this);

        me.grid = Ext.create('App.View.Usuarios.GridUsuarios', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridUsuarios',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Editar", "btn_Desbloquear"]
            //toolbar: me.toolbar
        });
        me.items = [me.grid];
        //me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);
    },
   
    EventosPrincipal: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Crear" || btn.getItemId() == "btn_Editar") {

            var win = Ext.create("App.Config.Abstract.Window", { botones: true });
            var form = Ext.create("App.View.Usuarios.FormUsuarios", {
                columns: 2,
                title: 'Formulario de Usuario',
                botones: false
            })
            if (btn.getItemId() == "btn_Editar") {
                form.CargarDatos(me.grid.record);
                form.DesbloquearFormulario();
                form.txt_login.setReadOnly(true);
            }
            win.add(form);
            win.show();
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWinArray("Usuarios", "GuardarUsuario", win, form, me.grid, null, null, [win]);
                //                alert("Saludos");
            });
        }
        else if (btn.getItemId() == "btn_Desbloquear") {
            if (me.grid.record.get('NRO_FALLIDO') >= 3) {
                Funciones.AjaxRequestGrid("Usuarios", "DesbloquearUsuario", me.grid, "Esta seguro de Desbloquear", {ID_USUARIO : me.grid.record.get('ID_USUARIO')}, me.grid, null);
            }
            else {
                Ext.Msg.alert("Error", "No Requiere Desbloquear la Cuenta.");
            }
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
});
