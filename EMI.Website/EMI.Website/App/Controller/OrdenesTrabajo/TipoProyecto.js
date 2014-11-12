Ext.define('App.controller.OrdenesTrabajo.TipoProyecto', {
    extend: 'Ext.app.Controller',
    views: ['OrdenesTrabajo.FormOTProyecto'],

    refs: [{
                ref: 'cabeceraCrearOt',
                selector: '#cabeceracrearot'
    },{
        ref: 'cuerpoCrearOt',
        selector: '#formcrearot'
    }, {
        ref: 'winOtsInspeccion',
        selector: '#viewOTs'
    }],

    init: function () {
        var me = this;
        me.control({
            '#winsolicitudproyecto combobox[name="IDCLIENTE"]' : {
                select: me.cargarDatosCliente
            },

            '#winsolicitudproyecto combobox[name="AREA"]': {
                select: me.cargarDatosArea
            },

            '#winsolicitudproyecto button[text="Aceptar"]': {
                click: me.guardarFormulario
            },

            '#viewOTs': {
                close: me.mostrarFormulario
            },
        });

    },

    addContent: function () {
        this.container.add({
            xtype: 'formotproyecto',
        });
    },

    cargarDatosCliente: function(cbx) {
        var record = cbx.getSelectedRecord();
        var form = this.container.down('form');
        form.getForm().loadRecord(record);
    },

    cargarDatosArea: function (cbx) {
        var record = cbx.getSelectedRecord();
        var form = this.container.down('form');
        form.getForm().loadRecord(record);
    },

    guardarFormulario: function () {
        var me = this;
        var form = this.container.down('form');
        if (form.isValid()) {
            var record = form.getForm().getRecord();
            var values = form.getForm().getValues();
            record.set(values);
            var f = Ext.ComponentQuery.query('#formcrearot')[0];
            /** NO FUNCIONA f.getForm().loadRecord(record) **/
            f.txt_apellidos.setValue(record.get('APELLIDOS'));
            f.txt_nombres.setValue(record.get('NOMBRES'));
            f.txt_idcliente.setValue(record.get('IDCLIENTE'));
            f.txt_calle.setValue(record.get('CALLE'));
            f.txt_telefonos.setValue(record.get('TELEFONOS'));
            f.txt_area.setValue(record.get('AREA'));
            f.txt_sistema.setValue(record.get('SISTEMA'));
            f.txt_subsistema.setValue(record.get('SUBSISTEMA'));
            f.txt_mnsistema.setValue(record.get('MN_SISTEMA'));
            f.txt_nroclientes.setValue(record.get('NRO_CLIENTES'));
            f.txt_distancia.setValue(record.get('DISTANCIA'));
            f.txt_plan.setValue(record.get('PLAN'));
            f.txt_urbanizacion.setValue(record.get('URBANIZACION'));
            f.txt_areaconcesion.setValue(record.get('AREA_CONCESION'));
            f.txt_motivo.setValue(record.get('MOTIVO'));
            f.txt_tensionsuministro.setValue(record.get('TENSION_SUMINISTRO'));
            f.txt_inicia.setValue(record.get('INICIA'));
            f.txt_subencionado.setValue(record.get('SUBENCIONADO'));
            f.txt_porcentajesubencion.setValue(record.get('PORCENTAJE_SUBENCION'));
            f.txt_observacion.setValue(record.get('OBSERVACION'));
            f.txt_croquis.setValue(record.get('CROQUIS'));
            f.txt_otorigen.setValue(record.get('ID_OT'));
            f.checkFormularioSolicitudObra.setValue(true);
            me.container.close();
        } else {
            Ext.Msg.show({
                title: 'Falta completar datos importantes',
                msg: 'Por favor, revise el formulario y complete los datos obligatorios.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    smConOtInspeccion: function (idsm) {
        var me = this;
        Ext.Ajax.request({
            type: 'ajax',
            url: Constantes.HOST + 'OrdenesTrabajo/OTReparacionRemplazoProyecto',
            method: 'GET',
            params: {
                ID_SOL_MAN: idsm,
                TIPO_OT: 'INSPECCION',
                TIPO: 'PROYECTO',
                page: 1,
                start: 0,
                limit: 25,
                sort: 'ID_OT',
                dir: 'DESC'
            },
            success: function (response, options) {
                var data = (response.responseText).substr(1, (response.responseText).length - 3);
                var result = Ext.decode(data);
                var grid = Ext.ComponentQuery.query('#gridPostesIntervenidos')[0];
                if (result.Total > 0 || grid.store.count() > 0 ) {
                    result.Total > 0 ? me.seleccionarOtInspeccion(result.Rows, 'PROYECTO') : me.buscarReiteraciones(null, grid.getStore());
                } else {
                    var radioposte = Ext.ComponentQuery.query('radio[inputValue=POSTE]')[0];
                    var radiotramo = Ext.ComponentQuery.query('radio[inputValue=TRAMO]')[0];
                    radioposte.disable();
                    //radiotramo.disable();
                    //me.buscarReiteraciones(radiotramo);/* > 0 ? me.comboSolicitudesProyecto() : me.mostrarFormulario();*/
                    me.container.show();
                }
            },
            failure: function () {
            }
        });
    },

    seleccionarOtInspeccion: function (rows, tipo) {
        var me = this;
        Ext.Msg.confirm('Confirmar', 'Esta Solicitud ya tiene OTs de Inspeccion asociadas. ¿Desea crear una OT</br>de tipo ' + tipo + ', a partir de alguna de estas OTs de Inspeccion?', function (button) {
            if (button == 'yes') {
                var store = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajo');
                for (var i = 0; i < rows.length; i++) {
                    var ordentrabajo = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajo', {
                        ID_OT: rows[i].ID_OT,
                        AREA_UBIC: rows[i].AREA_UBIC,
                        ASIGNADO_A: rows[i].ASIGNADO_A,
                        COD_DEF: rows[i].COD_DEF,
                        COD_ELEMENTO_1: rows[i].COD_ELEMENTO_1,
                        COD_ELEMENTO_2: rows[i].COD_ELEMENTO_2,
                        COD_FUENTE: rows[i].COD_FUENTE,
                        COD_MAN: rows[i].COD_MAN,
                        COD_OBJ_INTERV: rows[i].COD_OBJ_INTERV,
                        COD_POSTE: rows[i].COD_POSTE,
                        COD_PUESTO: rows[i].COD_PUESTO,
                        COD_SOL: rows[i].COD_SOL,
                        DESCRIP_DEF: rows[i].DESCRIP_DEF,
                        DESCRIP_MAN: rows[i].DESCRIP_MAN,
                        DESCRIP_SOL: rows[i].DESCRIP_SOL,
                        DESC_PROBL: rows[i].DESC_PROBL,
                        ESTADO: rows[i].ESTADO,
                        FECHA_ASIG: rows[i].FECHA_ASIG,
                        FECHA_REG: rows[i].FECHA_REG,
                        ID_COD_DEF: rows[i].ID_COD_DEF,
                        ID_COD_MAN: rows[i].ID_COD_MAN,
                        ID_COD_SOL: rows[i].ID_COD_SOL,
                        ID_ELEMENTO_1: rows[i].ID_ELEMENTO_1,
                        ID_ELEMENTO_2: rows[i].ID_ELEMENTO_2,
                        ID_FUENTE: rows[i].ID_FUENTE,
                        ID_OBJ_INTERV: rows[i].ID_OBJ_INTERV,
                        ID_OT: rows[i].ID_OT,
                        ID_POSTE: rows[i].ID_POSTE,
                        ID_PUESTO: rows[i].ID_PUESTO,
                        ID_SOL_MAN: rows[i].ID_SOL_MAN,
                        INSTRUCCIONES: rows[i].INSTRUCCIONES,
                        LOGIN_USR: rows[i].LOGIN_USR,
                        LUGAR_TRABAJO: rows[i].LUGAR_TRABAJO,
                        MOVIL_ASIG: rows[i].MOVIL_ASIG,
                        NOMBRE_ASIGNADO: rows[i].NOMBRE_ASIGNADO,
                        NOMBRE_MOVIL: rows[i].NOMBRE_MOVIL,
                        OT_EXTRA: rows[i].OT_EXTRA,
                        REPORTA_NOMBRE: rows[i].REPORTA_NOMBRE,
                        TIPO_OBJ_INTERV: rows[i].TIPO_OBJ_INTERV,
                        TIPO_OT: rows[i].TIPO_OT,
                        UBICACION: rows[i].UBICACION,
                        CANTIDAD_POSTES: rows[i].CANTIDAD_POSTES
                    })
                    store.add(ordentrabajo);
                }
                var panel = Ext.create('Ext.panel.Panel', {
                        frame: true,
                        autoScroll: true,
                        items: Ext.create('App.view.OrdenesTrabajo.ViewOrdenesTrabajo', { store: store,
                            listeners: {
                                itemclick: function (view, record, item, index, event, options) {
                                    w = this.up('window');
                                    Ext.Msg.confirm('Confirmar', 'Se utilizaran los datos de inspeccion registrados en la OT de Inspeccion ' + record.get('ID_OT'), function (button) {
                                        if (button == 'yes') {
                                            var f = Ext.ComponentQuery.query('#formcrearot')[0];
                                            f.txt_cantidadpostes.setValue(record.get('CANTIDAD_POSTES'));
                                            me.cargarDatosInspeccion(record);
                                            //var radio = Ext.ComponentQuery.query('radio[inputValue=' + record.get('TIPO_OBJ_INTERV') + ']')[0]
                                            //radio.setValue(true);
                                            w.hide();
                                        }
                                    });
                                }
                            }
                        })
                    });

                var win = Ext.widget('window', {
                    itemId: 'viewOTs',
                    title: 'Ordenes de Trabajo Tipo Inspeccion',
                    closeAction: 'hide',
                    width: 400,
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    items: panel
                });
                win.show();
            } else {
                radioposte = Ext.ComponentQuery.query('radio[inputValue=POSTE]')[0];
                //radiotramo = Ext.ComponentQuery.query('radio[inputValue=TRAMO]')[0];
                radioposte.disable();
                //radiotramo.disable();
                //me.buscarReiteraciones(radioposte);
                me.mostrarFormulario();
            }
        });
    },

    cargarDatosInspeccion: function (record) {
        var me = this;
        var form = this.container.down('form');
        form.getForm().loadRecord(record);
        Ext.Ajax.request({
            type: 'ajax',
            url: Constantes.HOST + 'OrdenesTrabajo/PostesIntervenidosOTInspeccion',
            method: 'GET',
            params: { ID_OT: record.get('ID_OT') },
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    var radio = Ext.ComponentQuery.query('radio[inputValue=' + record.get('TIPO_OBJ_INTERV') + ']')[0]
                    radio.setValue(true);
                    if (record.get('TIPO_OBJ_INTERV') == 'TRAMO') {
                        var upload = Ext.ComponentQuery.query('#windowfileupload')[0]
                        if(upload)upload.close();
                    }
                    me.cargarGridPostes(data);
                }
            }
        });
    },

    cargarGridPostes: function (result) {
        var me = this;
        var data = result.data;
        var grid = Ext.ComponentQuery.query('#gridPostesIntervenidos')[0] /* captura el grid del tab reparacion y remplazo*/;
        grid.store.removeAll();
        for (var i = 0; i < result.total; i++) {
            poste = Ext.create('App.Model.OrdenesTrabajo.DetallesReemplazo', {
                ID_COD_MAN: data[i].ID_COD_MAN,
                ID_COD_SOL: data[i].ID_COD_SOL,
                ID_POSTE: data[i].ID_POSTE,
                PIQUETE: data[i].PIQUETE,
                IDCENTRO_COSTO: '',
                DESC_CORTA: '',
                COD_MAN: data[i].COD_MAN,
                COD_SOL: data[i].COD_SOL,
                COD_POSTE: data[i].COD_POSTE,
                DESCRIPCION_CC: '',
                INTERVENIDO: data[i].INTERVENIDO,
                PRIORIDAD: data[i].PRIORIDAD
            });
            if (data[i].COD_POSTE) {
                grid.store.add(poste);
            } 
        }
        me.buscarReiteraciones(data, null);
    },

    comboSolicitudesProyecto: function (record) {
        var me = this;
        var storeproyectos = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajo')
        for (var i = 0; i < record.length; i++) {
            storeproyectos.add(record[i]);
        }
        var form = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            items: [{
                xtype: 'combobox',
                emptyText: 'Seleccione...',
                name: 'NRO_SOL',
                fieldLabel: 'Nro. Solicitud',
                displayField: 'NRO_SOL',
                valueField: 'NRO_SOL',
                store: storeproyectos,
                queryMode: 'local', /*esta propiedad hace que no se vuelva a llamar a la solicitud ajax del store cuando se expande el combo*/
                forceSelection: true,
                allowBlank: false,
                afterLabelTextTpl: Constantes.REQUERIDO,
            }]
        });

        var ventanaSolicitudes = Ext.widget('window', {
            title: 'Solicitudes de Proyecto',
            iconCls: 'application_form_add',
            modal: true,
            width: 250,
            //height: 150,
            resizable: false,
            closable: false,
            items: [{ xtype: form }],
            buttons: [
                {
                    text: 'Asociar',
                    handler: function () {
                        var ventana = this.up('window');
                        var formulario = ventana.down('form');
                        if (formulario.isValid()) {
                            var combo = formulario.down('combobox');
                            var f = Ext.ComponentQuery.query('#formcrearot')[0];
                            f.checkFormularioSolicitudObra.setValue(true);
                            f.txt_nro_sol.setValue(combo.getValue());
                            this.up('window').close();
                        } else {
                            Ext.Msg.show({
                                title: 'Falta completar datos importantes',
                                msg: 'Por favor, seleccione un Nro. de Solicitud',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    }
                },
                {
                    text: 'Cancelar',
                    handler: function () {
                        this.up('window').close();
                        me.mostrarFormulario();
                    }
                }]
        });
        ventanaSolicitudes.show();
    },

    buscarReiteraciones: function (data, store) {
        var me = this;
        cantidad = 0;
        var storepostes = Ext.create('App.Store.Postes.Postes', {
            requires: 'App.Model.Postes.Postes',
            model: 'App.Model.Postes.Postes',
            proxy: {
                type: 'ajax',
                api: {
                    create: Constantes.HOST + 'OrdenesTrabajo/BuscarPostesReiteradosEnProyectos',
                },
                writer: {
                    type: 'json',
                    allowSingle: false
                },
                afterRequest: function (request, success) {
                    if (Ext.decode(request.operation.response.responseText).total > 0) {
                        Ext.Msg.show({
                             title: 'Confirmar!',
                             msg: Ext.decode(request.operation.response.responseText).msg + '</br>¿Desea asociar a una Solicitud de Proyecto existente?',
                             icon: Ext.Msg.QUESTION,
                             buttons: Ext.Msg.YESNO,
                             fn: function (button) {
                                 if (button == 'yes') {
                                     record = Ext.decode(request.operation.response.responseText).data;
                                     me.comboSolicitudesProyecto(record);
                                } else {
                                     me.mostrarFormulario();
                                }
                            }
                        });
                    } else {
                        me.mostrarFormulario();
                    }
                },
            }
        });

        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                poste = Ext.create('App.Model.Postes.Postes', {
                   ID_POSTE: data[i].ID_POSTE,
                });
                storepostes.add(poste);
            }
            storepostes.sync();
        } else {
            store.each(function (record) { storepostes.add(record) });
            storepostes.sync();
        }
    },

    mostrarFormulario: function () {
        this.container.show();
    },
  
});