Ext.define('App.controller.OrdenesTrabajo.TrabajosEjecutados', {
    extend: 'Ext.app.Controller',
    stores: ['OrdenesTrabajo.ElementosIntervenidos',
            'OrdenesTrabajo.DetalleTrabajosEjecutados',
            'OrdenesTrabajo.PersonalMovilTrabajosEjecutados',
    ],
    views: ['OrdenesTrabajo.TrabajosEjecutados.PrincipalTrabajosEjecutados' ],
    refs: [{
            ref: 'cabecera',
            selector: 'principaltrabajosejecutados cabeceratrabajosejecutados'
    }, {
        ref: 'menu',
        selector: 'principaltrabajosejecutados menuobjetosintervenidos'
    }, {
        ref: 'detalle',
        selector: 'principaltrabajosejecutados griddetalletrabajosejecutados'
    }, {
        ref: 'personal',
        selector: 'principaltrabajosejecutados panel personalmoviltrabajosejecutados'
    }],

    init: function () {
        var me = this;
        me.control({
            'principaltrabajosejecutados menuobjetosintervenidos': {
                itemclick: me.mostrarDetalleTrabajosEjecutados
            },
            'principaltrabajosejecutados griddetalletrabajosejecutados': {
                itemclick: me.mostrarPersonalEjecutor
            },
            'principaltrabajosejecutados menuobjetosintervenidos button[action=addElementoIntervenido]': {
                click: me.addObjetoIntervenido
            },
            'principaltrabajosejecutados menuobjetosintervenidos button[action=deleteElementoIntervenido]': {
                click: me.deleteObjetoIntervenido
            },
            'principaltrabajosejecutados griddetalletrabajosejecutados button[action=addTrabajoEjecutado]': {
                click: me.nuevosTrabajosEjecutados
            },
        });

        Funciones.checkTimeout();
        me.cargarDatosCabecera(331);
        me.cargarMenuObejtosIntervenidos(331);
        me.cargarDetalleTrabajoEjecutado(331, null, null, null, null);
        me.cargarPersonalMovil(331);
    },

    addContent: function () {
        this.container.add({
            xtype: 'principaltrabajosejecutados',
        });
    },

    cargarDatosCabecera: function (ot){
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/BuscarCabeceraTrabajosEjecutados',
            params: { ID_OT: ot },
            method: 'GET',
            success: function (response, options) {
                var result = Ext.decode(response.responseText).data;
                var record = Ext.create('App.Model.OrdenesTrabajo.CabeceraTrabajosEjecutados', {
                    ID_TE: result.ID_TE,
                    ID_OT: result.ID_OT,
                    OT_ORIGEN: result.OT_ORIGEN,
                    ID_RESPONSABLE: result.ID_RESPONSABLE,
                    CAPATAZ: result.CAPATAZ,
                    ID_MOVIL: result.ID_MOVIL,
                    MOVIL: result.MOVIL,
                    DESC_PROBL: result.DESC_PROBL,
                    ID_SOL_MAN: result.ID_SOL_MAN,
                    FECHA_EJE_INI: result.FECHA_EJE_INI,
                    FECHA_EJE_FIN: result.FECHA_EJE_FIN,
                    ESTADO: result.ESTADO,
                    OBSERVACION: result.OBSERVACION,
                });
                me.getCabecera().cargarDatosCabecera(record);
            }
        });
    },

    cargarMenuObejtosIntervenidos: function (ot) {
        var me = this;
        me.getMenu().store.load({ params: { ID_OT: ot } });
    },

    cargarDetalleTrabajoEjecutado: function (ot, te, poste, uc, conductor) {
        var me = this;
        me.getDetalle().store.load({
            params: {
                ID_OT: ot,
                ID_TE: te,
                ID_POSTE: poste,
                ID_UC: uc,
                ID_CONDUCTOR: conductor
            }
        });
    },

    cargarPersonalMovil: function (ot) {
        var me = this;
        me.getPersonal().store.setExtraParam('ID_OT', ot);
        //me.getPersonal().store.load({ params: { ID_OT: 331 } });
        me.getPersonal().store.load();
    },

    mostrarDetalleTrabajosEjecutados: function (grid, rowIndex, colIndex) {
        var me = this;
        var record = grid.getSelectionModel().getSelection()[0];
        record.get('elemento') != "CONDUCTOR" ? record.get('elemento') != "UNIDAD CONSTRUCTIVA" ? record.isRoot() ? me.bloquearBotones(true, false) : me.bloquearBotones(false, false) : me.bloquearBotones(false, true) : me.bloquearBotones(true, true);
        me.getDetalle().store.load({
            params: {
                ID_OT: record.get('ID_OT'),
                ID_TE: me.getCabecera().idcabecera.getValue(),
                ID_POSTE: record.get('ID_POSTE'),
                ID_UC: record.get('ID_UC'),
                ID_CONDUCTOR: record.get('ID_CONDUCTOR')
            },
            callback: function (records, operation, success) {
                me.getCabecera().setFechas(records[0].get('FCH_HOR_INI'), records[operation.resultSet.count - 1].get('FCH_HOR_FIN'));
                me.getPersonal().store.load({
                    params:
                        {
                            ID_OT: record.get('ID_OT'),
                            FCH_HOR_INI: records[0].get('FCH_HOR_INI'),
                            //FCH_HOR_FIN: records[operation.resultSet.count - 1].get('FCH_HOR_FIN')
                        }
                });
            }
        });
        me.getDetalle().ocultarColumnasGrid(record.get('elemento'));
    },

    mostrarPersonalEjecutor: function (grid, rowIndex, colIndex) {
        var me = this;
        var record = grid.getSelectionModel().getSelection()[0];
        me.getCabecera().setFechas(record.get('FCH_HOR_INI'), record.get('FCH_HOR_FIN'));
        me.getPersonal().store.load({
            params:
                {
                    ID_OT: record.get('ID_OT'),
                    FCH_HOR_INI: record.get('FCH_HOR_INI'),
                    //FCH_HOR_FIN: record.get('FCH_HOR_FIN')
                }
        });
    },

    addObjetoIntervenido: function (btn) {
        var me = this;
        me.getMenu().addNodo();
        /*tree = me.getMenu();
        selectedNode = tree.getSelectionModel().getSelection()[0] || tree.getRootNode(); 

        node = btn.up('form').getValues();//get the form values

        if (selectedNode.isLeaf()) { //insert the node in the parent node
            selectedNode.parentNode.insertChild(0, node);
        } else {//inserting as a child
            selectedNode.insertChild(0, node);
        }
        btn.up('menu').hide();// hide the menu*/
    },

    deleteObjetoIntervenido: function (btn) {
            var me = this;
            var node = me.getMenu().getSelectionModel().getSelection()[0];
            if (node) {
                switch (node.get('elemento')) {
                    case 'POSTE':
                        if (!node.isLeaf()) {
                            var mensaje = 'El objeto que desea eliminar es un ' + node.get('elemento') + '. Se <b>eliminaran</b> todos </br>sus objetos hijos. Esta usted seguro de eliminar el ' + node.get('elemento') + ': <b>' + node.get('text') + '</b>?';
                            var controller = 'OrdenesTrabajo/EliminarPosteOtPostesIntervenidos';
                            var params = { ID_OT: node.get('ID_OT'), ID_POSTE: node.get('ID_POSTE'), COD_POSTE: node.get('text') };
                            me.eliminarObjetoStoreServidor(mensaje, controller, params, node);
                        }
                        break;
                    case 'CONDUCTOR':
                        if (node.isLeaf()) {
                            var mensaje = '¿Esta usted seguro de <b>eliminar</b> el ' + node.get('elemento') + ': <b>' + node.get('text') + '</b>?';
                            var controller = 'OrdenesTrabajo/EliminarConductorPostesIntervenidos';
                            var params = { ID_OT: node.get('ID_OT'), ID_CONDUCTOR: node.get('ID_CONDUCTOR') };
                            me.eliminarObjetoStoreServidor(mensaje, controller, params, node);
                        }
                        break;
                    case 'UNIDAD CONSTRUCTIVA':
                        if (node.isLeaf()) {
                            var mensaje = '¿Esta usted seguro de <b>eliminar</b> la ' + node.get('elemento') + ': <b>' + node.get('text') + '</b>?';
                            var controller = 'OrdenesTrabajo/EliminarUnidadConstructivaPostesIntervenidos';
                            var params = { ID_OT: node.get('ID_OT'), ID_UC: node.get('ID_UC') };
                            me.eliminarObjetoStoreServidor(mensaje, controller, params, node);
                        }
                        break;
                    default:
                        break;
                }
            } else {
                Ext.Msg.alert('Advertencia', 'Primero, seleccione un elemento del Menu');
            }
        },

        eliminarObjetoStoreServidor: function (mensaje, controller, params, node) {
            var me = this;
            Ext.Msg.confirm('Advertencia', mensaje, function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: Constantes.HOST + controller,
                        params: params,
                        success: function (response, options) {
                            result = Ext.decode(response.responseText);
                            if (result.success) {
                                Ext.MessageBox.show({
                                    title: 'Eliminacion Correcta',
                                    msg: result.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                node.remove(true);
                            }
                        },
                    });
                }
            });
    },

    nuevosTrabajosEjecutados: function (btn) {
        var me = this;
        var record = me.getMenu().getSelectionModel().getSelection()[0];
        if (record != null && (record.get('elemento') == 'UNIDAD CONSTRUCTIVA' || record.get('elemento') == 'CONDUCTOR')) {
            var formularioNuevoTrabajosEjecutados = Ext.create('App.View.OrdenesTrabajo.TrabajosEjecutados.FormDetalleTrabajoEjecutado');
            /* Preparamos datos iniciales para setear el formulario de nuevo registro trabajo ejecutado */
            var detalleTrabajoEjecutado = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajosEjecutados', {
                ID_OT: record.get('ID_OT'),
                OT_ORIGEN: record.get('OT_ORIGEN'),
                OBJETO: record.get('elemento'),
                ID_TE: me.getCabecera().idcabecera.getValue(),
                ID_POSTE: record.get('ID_POSTE'),
                ID_UC: record.get('ID_UC'),
                ID_CONDUCTOR: record.get('ID_CONDUCTOR'),
                EMERGENCIA: 'NO',
                AP: 'NO',
                TERR_DURO: 'NO',
                NUEVA_INSTAL: 'NO',
                FCH_HOR_INI: me.getCabecera().fechaEjecucion.getValue(),
                FCH_HOR_FIN: me.getCabecera().fechaEjecucionFinal.getValue(),
                HORA_INI: Ext.Date.format(me.getCabecera().fechaEjecucion.getValue(),'H:i'),
                HORA_FIN: Ext.Date.format(me.getCabecera().fechaEjecucionFinal.getValue(), 'H:i')
            });
            formularioNuevoTrabajosEjecutados.cargarDatosIniciales(detalleTrabajoEjecutado);
            var win = Ext.create('Ext.window.Window', {
                title: 'Registrar detalle Trabajo Ejecutado',
                resizable: false,
                modal: true,
                bodyStyle: 'background-color:#fff',
                iconCls: 'icon-pencil',
                items: [{ xtype: formularioNuevoTrabajosEjecutados }],

                buttons: [{
                    text: 'Guardar',
                    action: 'save',
                    handler: function () {
                        if (formularioNuevoTrabajosEjecutados.isValid()) {
                            Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de guardar los datos?', function (btn) {
                                if (btn == 'yes') {
                                    me.getCabecera().guardarDatosCabecera();
                                    me.cargarDatosCabecera(me.getCabecera().ot.getValue());
                                    formularioNuevoTrabajosEjecutados.guardarDetalleTrabajosEjecutados();
                                    var record = me.getMenu().getSelectionModel().getSelection()[0];
                                    me.cargarPersonalMovil(me.getCabecera().ot.getValue());
                                    me.cargarDetalleTrabajoEjecutado(record.get('ID_OT'), me.getCabecera().idcabecera.getValue() == 0 ? null : me.getCabecera().idcabecera.getValue(), record.get('ID_POSTE'), record.get('ID_UC'), record.get('ID_CONDUCTOR'));
                                }
                            });
                        } else {
                            Ext.Msg.alert("Error", "Complete los datos obligatorios")
                        }
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('.window').close(); }
                }],
            });
            win.show();
        } else {
            Ext.Msg.alert('Error', 'Seleccion primero: </br><b>Unidad Constructiva o Conductor</b>');
        }
    },

    actualizarFechasPersonalEjecutor: function (fechainicio, fechafin) {
        var me = this;
        me.getCabecera().setFechas(fechainicio, fechafin);
        me.getPersonal().store.load({
            params:
                {
                    ID_OT: record.get('ID_OT'),
                    FCH_HOR_INI: fechainicio,
                    //FCH_HOR_FIN: records[operation.resultSet.count - 1].get('FCH_HOR_FIN')
                }
        });
    },

    bloquearBotones: function (eliminarobjeto, addobjeto) {
        var me = this;
        Ext.ComponentQuery.query('principaltrabajosejecutados menuobjetosintervenidos button[action=deleteElementoIntervenido]')[0].setDisabled(eliminarobjeto);
        Ext.ComponentQuery.query('principaltrabajosejecutados menuobjetosintervenidos button[action=addElementoIntervenido]')[0].setDisabled(addobjeto);
    }
});