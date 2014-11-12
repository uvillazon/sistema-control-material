/**
 * @class App.View.Principal.Cabecera
 * @extends Ext.Component
 * requires 
 * @autor Name
 * @date 23/07/2013
 *
 * Description
 *
 *
 **/

Ext.define("App.View.Principal.Cabecera", {
    extend: "Ext.panel.Panel",
    height: 60,
    region: 'north',
    layout: 'border',
    tabPanel: null,
    initComponent: function () {
        var me = this;
        //me.flash = Ext.create('Ext.flash.Component', {
        //    url: 'Content/banner/banner.swf',
        //    region: 'west',
        //    height: 60,
        //    width: 400,
        //});
        me.flash = Ext.create('Ext.Img', {
            src: Constantes.HOST + 'Content/images/emi.png',
            region: 'west',
            height: 60,
            width: 400,
        });
        me.cabecera_top = Ext.create('Ext.Component', {
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1> Sistema de Control Material Logistico y Belico</h1>',
            height: 30,
            //width : 500,
        });
        me.tb = Ext.create('Ext.toolbar.Toolbar', {
            itemId: 'mainmenu',
            padding: 0,
            margin: 0,
            cls: 'ux-start-menu-toolbar',
        });

        me.panel_menubar = new Ext.Panel({
            region: 'south',
            //width: 500,
            border: true,
            margins: '0 0 1 0',
            split: false,
            tbar: me.tb
        });
        me.panel_bar = Ext.create('Ext.panel.Panel', {
            height: 60,
            region: 'center',
            layout: 'border',
            items: [me.cabecera_top, me.panel_menubar]
        });
        me.items = [me.flash, me.panel_bar];


        Ext.Ajax.request({
            //url: "MenuJs.js",
            url: "MenuOpciones/ObtenerMenuOpciones",
            method: 'POST',
            //url:'http://localhost:89/demo/extjs/crysfel-Bleextop-7fdca2b/index.php/desktop/config',
            scope: this,
            success: this.buildDesktop,
            failure: this.onError
        });
        //me.CargarBandejaEntrada();
        me.callParent();
    },
    onError: function (data) {
        //alert("Error al Recuperar los Datos de las Opciones del Menu.");
        document.location = Constantes.HOST + 'Account/LogOn';

    },
    buildDesktop: function (data) {
        var me = this;
        var data1 = Ext.decode(data.responseText);
        me.configuracion = data1;
        Constantes.LiSTAS = data1.Listas;
        Constantes.USUARIO = data1.Usuario;
        //me.Usuario = data1.Usuario.Nombre;
        me.CrearMenu(me.tb, data1.Opciones);
        me.CrearCabeceraLogin(me.tb, data1.Usuario);
        me.VerificarCaducidad(data1.Usuario.Caducidad);
    },
    VerificarCaducidad: function (caducidad) {
        var me = this;
        if (caducidad != "COMPLETADO") {
            Ext.Msg.confirm("Advertencia", caducidad, function (btn) {
                if (btn === "yes") {
                    me.VentanCambioContrasena();
                }
            });
        }
    },
    CrearCabeceraLogin: function (tb, data) {
        var me = this;
        var NombreUsuario = '<span  style="font-size:11px;height:11px;font-weight: bold;"> ' + data.PERFIL   + ' : ' + data.NOMBRE  + '  </span>';
        tb.add("->");
        tb.add(NombreUsuario, {
            text: "Contraseña",
            iconCls: "key",
            tooltip: "Cambiar Contraseña",
            scope: me,
            handler: me.VentanCambioContrasena
        }, {
            text: "Salir",
            iconCls: "exclamation",
            tooltip: "Cerrar Session",
            scope: me,
            handler: me.SalirSession
        }
        );

    },
    SalirSession: function () {
        Ext.Msg.confirm("Confirmar", "Esta seguro salir de la aplicación?", function (btn) {
            if (btn === "yes") {
                document.location = Constantes.HOST + 'Account/LogOff';
            }
        });
        //Ext.Msg.alert("Aviso", "Falta Implementar Opcion Salir");
        //var redirect = Constantes.HOST + 'Account/LogOff';
        //window.location = redirect;
    },
    CrearMenu: function (tb, data) {
        var me = this;
        //alert(me.tabPanel.getId());
        Ext.each(data, function (menu) {
            if (menu.menus) {
                var subMenu = Ext.create('Ext.menu.Menu');
                //alert(menu.text);
                tb.add({
                    text: menu.text,
                    iconCls: menu.iconCls,
                    menu: subMenu,
                    tooltip: menu.tooltip,
                    datos: menu,
                    scope: me,
                    handler: me.CargarClase
                });

                me.CrearMenu(subMenu, menu.menus);
            }
            else {
                tb.add({
                    text: menu.text,
                    iconCls: menu.iconCls,
                    menu: subMenu,
                    tooltip: menu.tooltip,
                    datos: menu,
                    scope: me,
                    handler: me.CargarClase
                });
            }
        });
    },
    CargarClase: function (menu) {
        //Funciones.checkTimeout();     
        var me = this;

        if (menu.datos.clase) {
            //alert(menu.estilo);
            if (menu.datos.iconCls != "report") {
                var open = !Ext.getCmp(menu.text);
                if (open) {
                    var principal = Ext.create(menu.datos.clase);
                    var tab = new Ext.Panel({
                        id: menu.text,
                        autoHeigth: true,
                        autoWidht: true,
                        title: menu.text,
                        autoScroll: true,
                        iconCls: menu.iconCls,
                        tooltip: menu.tooltip,
                        viewConfig: {
                            forceFit: true,
                        },
                        items: principal,
                        closable: true,

                    });
                    me.tabPanel.add(tab);
                    tab.show();
                }
                else {
                    me.tabPanel.setActiveTab(menu.text);
                }
            }
            else if (menu.datos.iconCls == "report") {
                var principal = Ext.create(menu.datos.clase).show();
            }
            else {
                //sas
            }
        }

    },
    CargarBandejaEntrada: function () {
        var me = this;
        var principal = Ext.create("App.View.BandejasEntrada.Principal");
        var tab = new Ext.Panel({
            id: "BandejaPrincipal",
            autoHeigth: true,
            autoWidht: true,
            title: "Bandeja de Entrada",
            autoScroll: true,
            iconCls: "email",
            tooltip: "Bandeja de Entrada por Usuario",
            viewConfig: {
                forceFit: true,
            },
            items: principal,
            closable: true,

        });
        me.tabPanel.add(tab);
        tab.show();
    },
    VentanCambioContrasena: function () {
        var me = this;
        if (me.winContrasena == null) {
            me.winContrasena = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Cambiar Contraseña' });
            me.formContrasena = Ext.create("App.View.Principal.Forms", { opcion: 'FormConstrasena', columns: 1 });
            me.winContrasena.add(me.formContrasena);
            me.winContrasena.show();
            me.winContrasena.btn_guardar.on('click', function () {
                if (me.formContrasena.getForm().findField('contrasena').score > 24) {
                    me.AjaxRequestWin("Usuarios", "CambiarContrasena", me.winContrasena, me.formContrasena, null, "Esta Seguro de Cambiar la Contraseña?", null, me.winContrasena);
                }
                else {
                    Ext.Msg.alert("Aviso", "Su Contraña es debil ");
                }
            });
        }
        else {
            me.formContrasena.reset();
            me.winContrasena.show();
        }
    },
    AjaxRequestWin: function (controlador, accion, mask, form, grid, msg, param, win) {

        var formSend = form.getForm();
        //var time = (timeout == null) ? 
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {

            Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
                if (btn == 'yes') {
                    mask.el.mask('Procesando...', 'x-mask-loading');
                    formSend.submit({
                        submitEmptyText: false,
                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                        params: param,
                        timeout: 1200,
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            document.location = Constantes.HOST + 'Account/Login';
                            
                        },
                        failure: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
});
