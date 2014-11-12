Ext.define("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.cargarStores) {
            //me.CargarStore();
            me.CargarComponentes();
        }
        else {
            me.CargarComponentesConsulta();
        }
        this.callParent(arguments);
    },
    CargarComponentesConsulta: function () {
        var me = this;
        me.formCabecera = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormSolicitud', colspan: 2 });
        me.formCabecera.BloquearFormulario();
        me.formCuerpo = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCuerpoOTConsulta' });
        me.gridTipo1 = Ext.create('App.View.Postes.GridPostes', { title: 'Postes Intervenidos', height: 300, imagenes: false,cargarStore : false,busqueda : true });
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [me.formCuerpo, me.gridTipo1]
        });
        me.items = [
        me.formCabecera,
        me.tabPanel
        ];
      
    },
    CargarComponentes: function () {
        var me = this;
        me.formCabecera = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormSolicitud', itemId: 'cabeceracrearot', colspan: 2 });
        me.formCabecera.BloquearFormulario();
        me.formCuerpo = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCuerpoOT', itemId: 'formcrearot' });
       
        me.formOTtipo1 = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormOTTipo1', formCuerpo: me.formCuerpo, formCabecera: me.formCabecera });
        me.formOTtipo1.gridReparacion.on('celldblclick', me.CargarDetalle, this);//permite realizar el evento doble click en los postes agregados para crear la OT
        me.formOTtipo1.setDisabled(true);
        me.formCuerpo.cbx_tipo.on('select', function (cmb) {
            me.formOTtipo1.gridReparacion.getStore().removeAll();//cuando selecciona otro tipo de OT se limpian todos los postes anteriormente agregados para intervenir
            me.formCuerpo.grpb_grupoBoton.getValue().rb == 'POSTE' ? me.formOTtipo1.setDisabled(true) : me.formOTtipo1.setDisabled(false);//cuando selecciona POSTE el tab de postes intervenidos debe ser bloqueado
            if (cmb.getValue() == 'PROYECTO') {
                /*me.smConOtInspeccion(me.formCabecera.record.get('ID_SOL_MAN'));*/
                me.formOTtipo1.setDisabled(false);
            }
            else if (cmb.getValue() == 'REPARACION_REEMPLAZO') {
                me.smConOtInspeccion(me.formCabecera.record.get('ID_SOL_MAN'))
                var radioposte = Ext.ComponentQuery.query('radio[inputValue=POSTE]')[0];
                var radiotramo = Ext.ComponentQuery.query('radio[inputValue=TRAMO]')[0];
                radioposte.enable();
                radiotramo.enable();
            }
            else if (cmb.getValue() == 'INSPECCION') {
                var radioposte = Ext.ComponentQuery.query('radio[inputValue=POSTE]')[0];
                var radiotramo = Ext.ComponentQuery.query('radio[inputValue=TRAMO]')[0];
                radioposte.enable();
                radiotramo.enable();
                me.formCuerpo.grpb_grupoBoton.getValue().rb == 'PUESTO' ? me.formOTtipo1.setDisabled(true) : me.formOTtipo1.setDisabled(false);//para inspeccion la opcion de PUESTO no se habilita el tab de postes intervenidos ya que no mostramos los postes
            }
            else {
                me.formOTtipo1.setDisabled(true);
            }
        });
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [me.formCuerpo , me.formOTtipo1]
        });
        me.formCuerpo.grpb_grupoBoton.on('change', me.ActivarTabPuesto, this);
        me.items = [
        me.formCabecera,
        me.tabPanel
        ];
    },
    ActivarTabPuesto: function (grp, newValue, oldValue, eOpts) {
        var me = this;
        me.formOTtipo1.gridReparacion.getStore().removeAll();

        if (newValue.rb == 'POSTE') {//permite una vez seleccionado objeto intervenido POSTE se bloquee el tab de postes intervenidos
            me.formOTtipo1.setDisabled(true);
        }
        if (newValue.rb == 'PUESTO') {//permite una vez seleccionado objeto intervenido PUESTO se bloquee el tab de postes intervenidos para INSPECCION para los demas desbloquear
            if (me.formCuerpo.cbx_tipo.getValue() == 'INSPECCION') {
                me.formOTtipo1.setDisabled(true);
            } else {
                me.formOTtipo1.setDisabled(false);
            }
        }
        if (newValue.rb == 'DERIVACION') {//permite una vez seleccionado objeto intervenido DERIVACION se desbloquee el tab de postes intervenidos
                me.formOTtipo1.setDisabled(false);
        }
        if (newValue.rb == 'TRAMO') {//permite una vez seleccionado objeto intervenido TRAMO se desbloquee el tab de postes intervenidos
            me.formOTtipo1.setDisabled(false);
            var winFileUpload = Ext.create('App.View.OrdenesTrabajo.MultiFileUpload', {
                itemId: 'windowfileupload',
                resizable: false,
                buttons: [{
                    text: 'Aceptar',
                    handler: function () {
                        var grid = Ext.ComponentQuery.query('#gridPostesIntervenidos')[0];
                        grid.store.removeAll();
                        var w = this.up('window');
                        w.postes.store.each(function (record) {
                            grid.store.add(record);
                        });
                        w.close();
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () {
                        this.up('window').close();
                    }
                }]
            });
            winFileUpload.upload.on('fileuploadcomplete', function (data) {
                var result = Ext.decode(data);
                me.formCuerpo.txt_codobjintervenido.setValue(result.data[0].COD_OBJ_INTERV);
                me.cargarGridPostes(result, winFileUpload.postes);
            });
           
            winFileUpload.show();
            var checkbt = Ext.getCmp('tension1');
            var checkmt = Ext.getCmp('tension2');
            checkbt.on('change', function () { me.filtrarPorTension(checkbt.getValue(), checkmt.getValue(), winFileUpload.postes.store) });
            checkmt.on('change', function () { me.filtrarPorTension(checkbt.getValue(), checkmt.getValue(), winFileUpload.postes.store) });

        }
    },
    CargarDatosSolicitud: function (record) {
        var me = this;
        me.getForm().reset();
        me.SM = record;
        //alert(record.get('DESCRIP_DEF'));
        me.formCabecera.CargarDatos(record);
        me.formCuerpo.loadRecord(record);
        me.formCuerpo.txt_lugartrabajo.setValue(record.get('UBICACION'));
        me.formCuerpo.store_ot.setExtraParam('TIPO_OT', 'INSPECCION');
        me.formCuerpo.store_ot.setExtraParam('ID_SOL_MAN', record.get('ID_SOL_MAN'));
        //me.formCuerpo.txt_codobjintervenido.setValue();
        me.formCuerpo.store_ot.load();

    },
    CargarDatosEditar: function (OT, SM) {
        var me = this;
        me.getForm().reset();
        me.formCabecera.CargarDatos(SM);
        me.formCuerpo.loadRecord(OT);
        //me.formCuerpo.grpb_grupoBoton.
        me.formCuerpo.CargarObjetosEdicion(OT);
        Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerPostesaIntevenir',
            params: { ID_OT: OT.get('ID_OT') },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if (data.data != null) {
                    /* captura el grid del tab reparacion y remplazo*/
                    var grid = Ext.ComponentQuery.query('#gridPostesIntervenidos')[0];
                    grid.store.removeAll();
                    me.cargarGridPostes(data, grid);
                }
            }
        });
    },
    CargarDatos: function (record, obra, estado) {
        var me = this;
        me.getForm().reset();
        me.formCabecera.loadFormulario("SolicitudesMantenimiento", "BuscarSolicitudMantenimiento", { ID_SOL_MAN: record.get('ID_SOL_MAN') });
        
        if (record.get('TIPO_OT') == 'PROYECTO') {
            /*Llamar funcion ajax al metodo obtener solicitud proyecto*/
            me.buscarSolicitudProyecto(record.get('NRO_SOL'), record);
        } else {
            me.formCuerpo.CargarDatos(record, obra, estado);
            me.record = record;
        }
        if (!me.cargarStores) {
            me.formCuerpo.setDisabled(false);
            me.gridTipo1.setDisabled(false);
            me.tabPanel.setActiveTab(0);
            me.gridTipo1.getStore().setExtraParam("ID_OT", record.get('ID_OT'));
            me.gridTipo1.getStore().load();
        }
        return false;
    },
    buscarSolicitudProyecto: function (ot, record) {
        var me = this;
        Ext.Ajax.request({
            type: 'ajax',
            url: Constantes.HOST + 'ObrasErp/ConsultarEstadoSolicitudProyecto',
            method: 'GET',
            params: { NRO_SOL: ot },
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                //record.set('SOLICITUD_PROYECTO', data.numero);
                record.set('ESTADO_SOL_PROY', data);
                me.formCuerpo.CargarDatos(record);
                me.record = record;
            },
            failure: function () {
              
            }
        });
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
                TIPO: me.formCuerpo.cbx_tipo.getValue(),
                page: 1,
                start: 0,
                limit: 25,
                sort: 'ID_OT',
                dir: 'DESC'
            },
            success: function (response, options) {
                var data = (response.responseText).substr(1, (response.responseText).length - 3);
                var result = Ext.decode(data);
                if (result.Total > 0) {
                    me.crearOtReparacionReemplazo(result.Rows, me.formCuerpo.cbx_tipo.getValue());
                } else {
                    if (me.formCuerpo.cbx_tipo.getValue() == 'PROYECTO') {
                        var radioposte = Ext.ComponentQuery.query('radio[inputValue=POSTE]')[0];
                        var radiotramo = Ext.ComponentQuery.query('radio[inputValue=TRAMO]')[0];
                        radioposte.disable();
                        radiotramo.disable();
                    }
                }
            },
            failure: function () {
            }
        });
    },

    crearOtReparacionReemplazo: function (rows, tipo) {
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
                            CANTIDAD_POSTES: rows[i].CANTIDAD_POSTES,
                            ESTADO_PLA: rows[i].ESTADO_PLA
                        })
                        store.add(ordentrabajo);
                    }

                        var panel = Ext.create('Ext.panel.Panel', {
                            frame: true,
                            autoScroll: true,
                            items: Ext.create('App.view.OrdenesTrabajo.ViewOrdenesTrabajo', {
                                store: store,
                                listeners: {
                                    itemclick: function (view, record, item, index, event, options) {
                                        win = this.up('window');
                                        if (record.get('ESTADO_PLA') != 'APROBADA') {
                                            Ext.Msg.show({
                                                title: 'Planilla de Inspeccion sin aprobar!',
                                                msg: 'Primero, debe aprobar la Planilla de Inspeccion de la OT seleccionada.',
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            });
                                        } else {
                                            Ext.Msg.confirm('Confirmar', 'Se agregaran todos los postes a intervenir registrados en la OT de Inspeccion ' + record.get('ID_OT'), function (button) {
                                                if (button == 'yes') {
                                                    me.formCuerpo.txt_otorigen.setValue(record.get('ID_OT'));
                                                    me.formCuerpo.txt_cantidadpostes.setValue(record.get('CANTIDAD_POSTES'));
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
                                                                    if (upload) upload.close();
                                                                }
                                                                /*Capturar grid*/
                                                                var grid = Ext.ComponentQuery.query('#gridPostesIntervenidos')[0];
                                                                grid.store.removeAll();
                                                                me.cargarGridPostes(data, grid);
                                                                Ext.Msg.show({
                                                                    title: 'Informacion',
                                                                    msg: data.msg,
                                                                    buttons: Ext.Msg.OK,
                                                                    icon: Ext.Msg.INFO
                                                                });
                                                                win.close();
                                                            } else {
                                                                Ext.Msg.show({
                                                                    title: 'Advertencia',
                                                                    msg: data.msg,
                                                                    buttons: Ext.Msg.OK,
                                                                    icon: Ext.Msg.WARNING
                                                                });
                                                            }
                                                        }
                                                    })
                                                }
                                            });
                                        }/*fin else planilla sin aprobar*/
                                    }
                                }
                           })
                    });
                    var win = Ext.widget('window', {
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
                    /*var radioposte = Ext.ComponentQuery.query('radio[inputValue=POSTE]')[0];
                    radiotramo = Ext.ComponentQuery.query('radio[inputValue=TRAMO]')[0];
                    radioposte.disable();
                    radiotramo.disable();*/
                }
            });
    },

    cargarGridPostes: function (result, grid) {
        var me = this;
        var data = result.data;
        var solicitud = me.formCuerpo.getValues();
        //var grid = Ext.ComponentQuery.query('#gridPostesIntervenidos')[0] /* captura el grid del tab reparacion y remplazo*/;
        //grid.store.removeAll();
        for (var i = 0; i < result.total; i++) {
            poste = Ext.create('App.Model.OrdenesTrabajo.DetallesReemplazo', {
                ID_COD_MAN: data[i].ID_COD_MAN != null ? data[i].ID_COD_MAN : solicitud.ID_COD_MAN,
                ID_COD_SOL: data[i].ID_COD_SOL != null ? data[i].ID_COD_SOL : solicitud.ID_COD_SOL,
                ID_POSTE: data[i].ID_POSTE,
                PIQUETE: data[i].PIQUETE,
                TENSION: data[i].TENSION,
                IDCENTRO_COSTO: '',
                DESC_CORTA: '',
                COD_MAN: data[i].COD_MAN != null ? data[i].COD_MAN : solicitud.COD_MAN,
                COD_SOL: data[i].COD_SOL != null ? data[i].COD_MAN : solicitud.COD_SOL,
                COD_POSTE: data[i].COD_POSTE,
                DESCRIPCION_CC: '',
                INTERVENIDO: data[i].INTERVENIDO,
                PRIORIDAD : data[i].PRIORIDAD
            });
            //alert(data[i].INTERVENIDO);
            if (!me.buscarRepetidos(grid.store, data[i].ID_POSTE) && data[i].COD_POSTE != null) {
                grid.store.add(poste);
            }
        }
    },

    buscarRepetidos: function (store, item) {
        for (var i = 0; i < store.count() ; i++) {
            var comparar = store.getAt(i).data.ID_POSTE;
            if (item == comparar) {
                return true;
            }
        }
    },

    filtrarPorTension: function (tension1, tension2, store) {
        if (tension1 && !tension2) {
            store.clearFilter();
            store.filter('TENSION', 'BT');
        }
        if (!tension1 && tension2) {
            store.clearFilter();
            store.filter('TENSION', 'MT');
        }
        if (tension1 && tension2) {
            store.clearFilter();
        }
        if (!tension1 && !tension2) {
            store.clearFilter();
            store.filter('TENSION', '?');
        }
    },
    CargarDetalle: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me=this;
        if (me.winDetalle == null) {
            me.winDetalle = Ext.create("App.Config.Abstract.Window", {
                botones: false,
                textGuardar: 'Detalle Intervencion de Postes'
            });
            me.gridDetalle = Ext.create("App.View.OrdenesTrabajo.Grids", {
                title: "Detalle Intervencion de Postes",
                width: 900,
                height:450,
                opcion: 'DetallePoste'
            });
            me.gridDetalle.getStore().load({ params: { ID_SOL_MAN: me.formCabecera.record.get('ID_SOL_MAN'), ID_POSTE: record.get('ID_POSTE') } });
            me.winDetalle.add(me.gridDetalle);
            me.winDetalle.show();
        }
        else {
            me.gridDetalle.getStore().load({ params: { ID_SOL_MAN: me.formCabecera.record.get('ID_SOL_MAN'), ID_POSTE: record.get('ID_POSTE') } });
            me.winDetalle.show();
        }
    }

});
