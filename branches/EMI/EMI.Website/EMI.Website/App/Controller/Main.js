Ext.define('App.Controller.Main', {
    extend: 'Ext.app.Controller',
    refs: [{
        ref: 'botonTrabajoEjecutado',
        selector: '#btn_TrabajoEjecutado'
    }, {
            ref: 'cabeceraCrearOt',
            selector: '#cabeceracrearot'
        },{
            ref: 'cuerpoCrearOt',
            selector: '#formcrearot'
    }],

    init: function () {
        var me = this;
        me.control({
            '#btn_TrabajoEjecutado': {
                click: me.openModule
            },

            '#btn_TrabajoEjecutado1': {
                click: me.openModuleFromEjecutor
            },

            'toolbar[itemId=mainmenu] menuitem[text="Trabajos Ejecutados Contratista"]': {
                click: me.openModuleFromMenu
            },

            '#formcrearot combobox[name="TIPO_OT"]': {
                select: me.openModuloOtProyecto
            }
        });

    },

    openModule: function (button) {
        Funciones.checkTimeout();
        var me = this;
        var grid = button.up('grid');

        if (grid.getSelectionModel().getSelection()[0] && grid.getSelectionModel().getSelection()[0].get('TIPO_OT') != 'PROYECTO') {
            if (grid.getSelectionModel().getSelection()[0].get('EST_TRAB_EJEC') != 'APROBADO') {
                var admin = button.up('window');
                admin.hide(); /*Oculto la ventana AdminOT*/

                maintab = Ext.ComponentQuery.query('#maintab')[0];
                Ext.Msg.wait('Procesando...');
                Ext.require(button.controller, function () {
                    Ext.Msg.hide();
                    var controller = me.application.controllers.get(button.controller);
                    if (!controller) {
                        controller = Ext.create(button.controller, {
                            id: button.controller,
                            application: me.application
                        });

                        controller.container = me.createContainer(button);
                        maintab.add(controller.container);
                        controller.addContent();
                        me.application.controllers.add(controller);
                        controller.init(me.application);
                        controller.onLaunch(me.application);
                        controller.setValoresOrdenTrabajo(grid);
                    }
                    else {
                        if (controller.container.isDestroyed) {
                            controller.container = me.createContainer(button);
                            maintab.add(controller.container);
                            controller.addContent();
                            controller.setValoresOrdenTrabajo(grid);
                        } else {
                            controller.setValoresOrdenTrabajo(grid);
                        }
                    }
                    maintab.show();
                    maintab.setActiveTab(controller.container);
                });
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Usted ya no puede editar el Reporte de Trabajos Ejecutados </br> porque el reporte ya fue aprobado.',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        } else {
            Ext.MessageBox.show({
                title: 'Tipo de OT incorrecto',
                msg: 'Selecciona una OT de Inspeccion o Reparacion y Reemplazo',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },

    openModuleFromEjecutor: function (button) {
        Funciones.checkTimeout();
        var me = this;
        var form = button.up('form');
        var grid = Ext.ComponentQuery.query('#gridotejecutor')[0];

        if (grid.getSelectionModel().getSelection()[0] && grid.getSelectionModel().getSelection()[0].get('TIPO_OT') != 'PROYECTO' && grid.getSelectionModel().getSelection()[0].get('ESTADO') == 'EN_EJEC') {
            if (grid.getSelectionModel().getSelection()[0].get('EST_TRAB_EJEC') != 'APROBADO') {
                maintab = Ext.ComponentQuery.query('#maintab')[0];
                Ext.Msg.wait('Procesando...');
                Ext.require(button.controller, function () {
                    Ext.Msg.hide();
                    var controller = me.application.controllers.get(button.controller);
                    if (!controller) {
                        controller = Ext.create(button.controller, {
                            id: button.controller,
                            application: me.application
                        });

                        controller.container = me.createContainer(button);
                        maintab.add(controller.container);
                        controller.addContent();
                        me.application.controllers.add(controller);
                        controller.init(me.application);
                        controller.onLaunch(me.application);
                        controller.setValoresOrdenTrabajo(grid);
                    }
                    else {
                        if (controller.container.isDestroyed) {
                            controller.container = me.createContainer(button);
                            maintab.add(controller.container);
                            controller.addContent();
                            controller.setValoresOrdenTrabajo(grid);
                        } else {
                            controller.setValoresOrdenTrabajo(grid);
                        }
                    }
                    maintab.show();
                    maintab.setActiveTab(controller.container);
                });
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Usted ya no puede editar el Reporte de Trabajos Ejecutados </br> porque el reporte ya fue aprobado.',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        } else {
            Ext.MessageBox.show({
                title: 'El Tipo de la OT o su Estado es incorrecto',
                msg: 'Verifique que la OT cumpla la siguientes condiciones: </br>La OT es de Inspeccion o Reparacion y Reemplazo.</br>El Estado de la OT esta: EN_EJEC',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },


    openModuleFromEjecutor1: function (button) {
        Funciones.checkTimeout();
        var me = this;
                maintab = Ext.ComponentQuery.query('#maintab')[0];
                Ext.Msg.wait('Procesando...');
                Ext.require('App.controller.OrdenesTrabajo.TrabajosEjecutados', function () {
                    Ext.Msg.hide();
                    var controller = me.application.controllers.get('App.controller.OrdenesTrabajo.TrabajosEjecutados'/*button.controller*/);
                    if (!controller) {
                        controller = Ext.create('App.controller.OrdenesTrabajo.TrabajosEjecutados', {
                            id: 'App.controller.OrdenesTrabajo.TrabajosEjecutados',
                            application: me.application
                        });

                        controller.container = me.createContainer(button);
                        maintab.add(controller.container);
                        controller.addContent();
                        me.application.controllers.add(controller);
                        controller.init(me.application);
                        controller.onLaunch(me.application);
                        //controller.setValoresOrdenTrabajo(grid);
                    }
                    else {
                        if (controller.container.isDestroyed) {
                            controller.container = me.createContainer(button);
                            maintab.add(controller.container);
                            controller.addContent();
                            //controller.setValoresOrdenTrabajo(grid);
                        } else {
                            //controller.setValoresOrdenTrabajo(grid);
                        }
                    }
                    maintab.show();
                    maintab.setActiveTab(controller.container);
                });
    },

    openModuleFromMenu: function (menuoption) {
        Funciones.checkTimeout();
        var me = this;
        maintab = Ext.ComponentQuery.query('#maintab')[0];
        Ext.Msg.wait('Procesando...');
        Ext.require(menuoption.datos.estilo, function () {
            Ext.Msg.hide();
            var controller = me.application.controllers.get(menuoption.datos.estilo);
            if (!controller) {
                controller = Ext.create(menuoption.datos.estilo, {
                    id: menuoption.datos.estilo,
                    application: me.application
                });

                controller.container = me.createContainer(menuoption);
                maintab.add(controller.container);
                controller.addContent();
                me.application.controllers.add(controller);
                controller.init(me.application);
                controller.onLaunch(me.application);
            }
            else {
                if (controller.container.isDestroyed) {
                    controller.container = me.createContainer(menuoption);
                    maintab.add(controller.container);
                    controller.addContent();
                } 
            }
            maintab.show();
            maintab.setActiveTab(controller.container);
        });
    },

    createContainer: function (menuoption) {
        return Ext.widget({
            xtype: 'container',
            title: 'Trabajos Ejecutados',
            renderTo: Ext.getBody(),
            closable: false,
            icon: Constantes.HOST + 'Content/images/worker.png',
            layout: 'fit'
        });
    },

    createWindow: function (menuoption) {
        return Ext.widget({
            xtype: 'window',
            itemId: 'winsolicitudproyecto',
            modal: true,
            title: 'Datos para la Solicitud de Proyecto',
            icon: Constantes.HOST + 'Content/images/pencil.png',
            buttons: [{
                text: 'Aceptar'
            }, {
                text: 'Cancelar',
                handler: function () { this.up('.window').close(); }
            }]
        });
    },

    openModuloOtProyecto: function (cbx) {
        Funciones.checkTimeout();
        if (cbx.getValue() == 'PROYECTO') {
            var me = this;
            me.getCuerpoCrearOt().checkFormularioSolicitudObra.enable();
            me.getCuerpoCrearOt().checkFormularioSolicitudObra.setValue(false);

            Ext.Msg.wait('Procesando...');
            Ext.require('App.controller.OrdenesTrabajo.TipoProyecto', function () {
                Ext.Msg.hide();
                var controller = me.application.controllers.get('App.controller.OrdenesTrabajo.TipoProyecto');
                if (!controller) {
                    controller = Ext.create('App.controller.OrdenesTrabajo.TipoProyecto', {
                        id: 'App.controller.OrdenesTrabajo.TipoProyecto',
                        application: me.application
                    });
                    controller.container = me.createWindow('Datos del proyecto');
                    controller.addContent();
                    me.application.controllers.add(controller);
                    controller.init(me.application);
                    controller.onLaunch(me.application);
                }
                else {
                    if (controller.container.isDestroyed) {
                        controller.container = me.createWindow('Datos del proyecto');
                        controller.addContent();
                    }
                }
                controller.smConOtInspeccion(me.getCabeceraCrearOt().record.get('ID_SOL_MAN'));
                //controller.container.show();
            });
        } else {
            var me = this;
            me.getCuerpoCrearOt().checkFormularioSolicitudObra.disable();
            me.getCuerpoCrearOt().checkFormularioSolicitudObra.setValue(true);
        }
    },
});