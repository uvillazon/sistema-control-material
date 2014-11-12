Ext.define('App.controller.OrdenesTrabajo.TrabajoDiario', {
    extend: 'Ext.app.Controller',
    stores: [/*'SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados',*/
             /*'OrdenesTrabajo.OrdenesTrabajoResponsable',*/
             'OrdenesTrabajo.PersonalTrabajoDiario',
             'OrdenesTrabajo.ElementosIntervenidos',
             'OrdenesTrabajo.DetallePrincipalTrabajoDiario',
             'SolicitudesMantenimiento.CodigosSolucion',
             'OrdenesTrabajo.MaterialesCodigoSolucion',
             'OrdenesTrabajo.DetalleTrabajoDiario',
             'Postes.Conductores',
             'Postes.Postes',
             'Postes.UnidadesConstructivas',
             'SolicitudesMantenimiento.CodigosMantenimiento'
             
    ],
    /* Los namespace de los archivos js deben tener en minuscula la palabra view o store. Ejem: Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.PrincipalTrabajoDiario',{})
     o como alternativa utilizar la siguiente propiedad al definir la clase:: alternateClassName: 'App.view.OrdenesTrabajo.ReporteTrabajoDiario.FormCabecera' */
    views: [
            'OrdenesTrabajo.ReporteTrabajoDiario.PrincipalTrabajoDiario',
            'OrdenesTrabajo.ReporteTrabajoDiario.FormCabecera',
            'OrdenesTrabajo.ReporteTrabajoDiario.TreeElementosIntervenidos',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridPrincipalDetalleTrabajoDiario',
            'OrdenesTrabajo.ReporteTrabajoDiario.ViewPersonalMovil',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridCodigosSolucion',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridMaterialesCodigoSolucion',
            'OrdenesTrabajo.ReporteTrabajoDiario.GridDetalleTrabajoDiario',
             'OrdenesTrabajo.ReporteTrabajoDiario.FormNuevoRegistro'
    ],
    refs: [{
                ref: 'treePostesConductores',
                 selector: '#trabajodiariomain #elementosintervenidos'
            },
            {
                ref: 'panelPersonal',
                selector: '#trabajodiariomain #panelpersonal'
            },
            {
                ref: 'viewUsuarios',
                selector: '#trabajodiariomain #mosaicousuarios'
            },
            {
                ref: 'gridPrincipalDetalleTrabajoDiario',
                selector: '#trabajodiariomain #gprincipaldetalletrabajodiario',
            },
            {
                ref: 'comboSm',
                selector: '#trabajodiariomain #comboboxsm'
            },
            {
                ref: 'fieldIdCabecera',
                selector: '#trabajodiariomain form #idtd'
            },
            {
                ref: 'comboOt',
                selector: '#trabajodiariomain #comboboxot'
            },
            {
                ref: 'hideOtOrigen',
                selector: '#trabajodiariomain #hideotorigen'
            },
            {
                ref: 'hideIdMovil',
                selector: '#trabajodiariomain #hideidmovil'
            },
            {
                ref: 'fieldMovil',
                selector: '#trabajodiariomain #fieldmovil'
            },
             {
                 ref: 'fieldDescripcion',
                 selector: '#trabajodiariomain #descripcionsm'
             },
            {
                ref: 'hideIdResponsable',
                selector: '#trabajodiariomain #hideidresponsable'
            },
            {
                ref: 'fieldCapataz',
                selector: '#trabajodiariomain #fieldcapataz'
            },
            {
                ref: 'fechaEjecucion',
                selector: '#fejec'
            },
            {
                ref: 'horaInicio',
                selector: '#hini'
            },
            {
                ref: 'horaFin',
                selector: '#hfin'
            },
            {
                ref: 'fieldEstado',
                selector: '#trabajodiariomain #fieldestadoreporte'
            },
            {
                ref: 'fieldObservacion',
                selector: '#trabajodiariomain #fieldobservacion'
            },
            {
                ref: 'comboConductor',
                selector: '#combo_conductor'
            },
            {
                ref: 'fieldFormacion',
                selector: '#fieldformacion'
            },
            {
                ref: 'fieldDescTipo',
                selector: '#desc_tipo'
            },
            {
                ref: 'comboPoste',
                selector: '#combo_poste'
            },
            {
                ref: 'comboUnidadConstructiva',
                selector: '#combo_uc'
            },
            {
                ref: 'fieldNivel',
                selector: '#fieldnivel'
            },
            {
                ref: 'comboCodigoMantenimiento',
                selector: '#combocodman'
            },
            {
                ref: 'gridCodigosSolucion',
                selector: '#gcodsol'
            },
            {
                ref: 'gridDetalleTrabajoDiario',
                selector: '#gdetalletrabajodiario'
            },
            {
                 ref: 'botonGuardar',
                 selector: 'window #btnGuardar'
            }
    ],

    init: function () {
        var me = this;
        me.control({

            '#maintab #trabajodiariomain #elementosintervenidos': {
                itemclick: me.mostrarDetallesTrabajoDiario
            },

            '#maintab #trabajodiariomain #gprincipaldetalletrabajodiario': {
                itemclick: me.buscarPersonalMovil
            },

            '#maintab #trabajodiariomain #gprincipaldetalletrabajodiario button[action=save]': {
                click: me.modificarDetalleTrabajoDiario
            },

            '#maintab #trabajodiariomain #gprincipaldetalletrabajodiario button[action=addpresupuesto]': {
                click: me.obtenerDatosPlanillaInspeccion
            },

            '#maintab #trabajodiariomain #gprincipaldetalletrabajodiario button[action=add]': {
                click: me.nuevoRegistroTrabajoDiario
            },

            '#mosaicousuarios': {
                itemdblclick: me.seleccionarPersonal
            },

            '#maintab #trabajodiariomain trabajodiariocabecera #comboboxot': {
                select: me.datosOrdenTrabajo
            },

            'window #combo_conductor': {
                select: me.obtenerFormacion
            },

            'window #combo_poste': {
                select: me.obtenerUnidadesConstructivas
            },

            'window #combo_uc': {
                select: me.obtenerCodigosMantenimiento
            },

            'window #btnposte': {
                click: me.cargarVentanaPosteOT
            },

            'window #btnuc': {
                click: me.cargarVentanaUC
            },

            'window #combocodman': {
                select: me.obtenerCodigosSolucion
            },

            'window #gdetalletrabajodiario button[action=addMaterial]': {
                click: me.mostrarVentanaMateriales
            },

            '#maintab #trabajodiariomain trabajodiariocabecera #comboboxsm': {
                select: me.getOrdenesTrabajo
                //keyup: me.teclapresionada
            },

            '#maintab #trabajodiariomain trabajodiariocabecera datefield': {
                select: me.getRegistrosDiario
                //keyup: me.teclapresionada
            },

            'window button[action=save]': {
                click: me.guardarDetalleTrabajoDiario
            },

            'window button[action=add-items]': {
                click: me.addMateriales
            },

            'window grid': {
                addbuttonclick: me.agregarMaterialesTodos,
                deletebuttonclick: me.removerMaterialesCodigoSolucion
            },

            'window #gcodsol': {
                itemdblclick: me.mostrarMateriales
            },

            '#winAddUc': {
                hide: me.actualizarComboUc
            },

            '#winAddPoste': {
                hide: me.actualizarComboPoste
            }
        });

        Funciones.checkTimeout();
    },

    addContent: function () {
        this.container.add({
            xtype: 'trabajodiarioprincipal',
            itemId: 'trabajodiariomain'
        });
    },

    buscarPersonalMovil: function (grid, record, item, index, event, options) {
        var me = this;
        me.getFechaEjecucion().setValue(record.get('FCH_HOR_INI'));
        me.getHoraInicio().setValue(record.get('FCH_HOR_INI'));
        me.getHoraFin().setValue(record.get('FCH_HOR_FIN'));
        me.getViewUsuarios().store.load({
            params: {
                ID_TD: record.get('ID_TD'),
                FCH_HOR_INI: record.get('FCH_HOR_INI'),
                //FCH_HOR_FIN: record.get('FCH_HOR_FIN')
            }
        });
    },

    datosOrdenTrabajo: function (combo, record, index) {
        //var valor = combo.getValue(); /*Este devuelve el valor seleccionado que aparece en el combo.*/
        var valor = this.getComboOt().getValue(); /*Este devuelve el valor seleccionado que aparece en el combo.*/
        this.getFieldCapataz().setValue(record[0].get('CAPATAZ'));
        this.getFieldMovil().setValue(record[0].get('MOVIL'));
        this.getComboSm().setValue(record[0].get('ID_SOL_MAN'));
        //this.getPostesIntervenidosStore().load({ params: { ID_OT: valor } });
    },

    teclapresionada: function (field, event, options) {
        if (event.getCharCode() === event.ENTER) {
            Ext.Msg.alert('Alert', field.getValue());
            this.getOrdenesTrabajoStore().load({ params: { idSolMan: field.getValue(), queryType: 'default' } });
        }
    },

    getOrdenesTrabajo: function (combo, record, index) {
        var valor = combo.getValue();
        var cb = this.getComboOt();
        cb.store.proxy.extraParams = { ID_SOL_MAN: valor };
        cb.store.load();
    },

    setValoresOrdenTrabajo: function (grid) {
        var me = this;
        var data = grid.getSelectionModel().getSelection()[0];
        if (data.get('TIPO_OT') == 'REPARACION_REEMPLAZO') {
            var botonPresupuesto = Ext.ComponentQuery.query('#maintab #trabajodiariomain #gprincipaldetalletrabajodiario button[action=addpresupuesto]')[0];
            botonPresupuesto.setVisible(true);
        } else {
            var botonPresupuesto = Ext.ComponentQuery.query('#maintab #trabajodiariomain #gprincipaldetalletrabajodiario button[action=addpresupuesto]')[0];
            botonPresupuesto.setVisible(false);
        }
        this.getComboSm().setValue(data.get('ID_SOL_MAN')); /*verificar que la propiedad del combo forceSelection: false*/
        this.getComboOt().setValue(data.get('ID_OT'));
        me.getHideOtOrigen().setValue(data.get('OT_ORIGEN'));
        this.getFieldDescripcion().setValue(data.get('DESC_PROBL'));
        this.getHideIdResponsable().setValue(data.get('ASIGNADO_A'));
        this.getFieldCapataz().setValue(data.get('NOMBRE_ASIGNADO'));
        this.getHideIdMovil().setValue(data.get('MOVIL_ASIG'));
        this.getFieldMovil().setValue(data.get('NOMBRE_MOVIL'));
        me.obtenerCabecera(data.get('ID_OT'));
        /*Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerTrabajoDiarioCabecera',
            params: { ID_OT: data.get('ID_OT') },
            method: 'GET',
            success: function (response, options) {
                cabecera = Ext.decode(response.responseText);
                if (cabecera.data != null) {
                    me.getFechaEjecucion().setValue(cabecera.data.FECHA_EJE_INI);
                    me.getHoraInicio().setValue(cabecera.data.FCH_HOR_INI);
                    me.getHoraFin().setValue(cabecera.data.FCH_HOR_FIN);
                    me.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: data.get('ID_OT') } });
                    me.ocultarColumnasGrid(me.getGridPrincipalDetalleTrabajoDiario(), true, true, 'root');
                    me.getGridPrincipalDetalleTrabajoDiario().store.proxy.extraParams['ID_TD'] = cabecera.data.ID_TD;
                    me.getGridPrincipalDetalleTrabajoDiario().store.load();
                    me.getFieldIdCabecera().setValue(cabecera.data.ID_TD);
                    me.getOrdenesTrabajoPersonalTrabajoDiarioStore().load({ params: { ID_TD: cabecera.data.ID_TD,  EJECUTA: 'T' } });
                    me.getViewUsuarios().show();
                } else {
                    me.getFieldIdCabecera().setValue(null);
                    me.getFechaEjecucion().setValue(null);
                    me.getHoraInicio().setValue(null);
                    me.getHoraFin().setValue(null);
                    me.getViewUsuarios().hide();
                    me.getOrdenesTrabajoPersonalTrabajoDiarioStore().load({ params: { EJECUTA: 'T' } });
                    me.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: data.get('ID_OT') } });
                    me.ocultarColumnasGrid(me.getGridPrincipalDetalleTrabajoDiario(), true, true, 'root');
                    me.getGridPrincipalDetalleTrabajoDiario().store.removeAll();
                }
            },
        });*/
    },

    mostrarDetallesTrabajoDiario: function (view, record, item, index, e) {
        Funciones.checkTimeout();
        var me = this;
        var g = this.getGridPrincipalDetalleTrabajoDiario();

        if (record.isRoot()) {
            me.ocultarColumnasGrid(g, true, false, 'root');
            g.store.proxy.extraParams['ID_TD'] = this.getFieldIdCabecera().getValue() > 0 ? this.getFieldIdCabecera().getValue() : 0;
            g.store.load();
            me.getOrdenesTrabajoPersonalTrabajoDiarioStore().load({ params: { ID_TD: me.getFieldIdCabecera().getValue(), EJECUTA: 'T' } });
        }
        if (record.isLeaf()) {
            /*Enviando parametros para cargar el store*/
            //g.store.proxy.extraParams[record.get('elemento')] = record.get('text');
            g.store.proxy.extraParams['ID_POSTE'] = record.get('ID_POSTE');
            g.store.proxy.extraParams['ID_UC'] = record.get('ID_UC');
            g.store.proxy.extraParams['ID_CONDUCTOR'] = record.get('ID_CONDUCTOR');
            g.store.proxy.extraParams['ID_TD'] = this.getFieldIdCabecera().getValue() > 0 ? this.getFieldIdCabecera().getValue() : 0;
            //g.store.proxy.extraParams['ID_OT'] = this.getComboOt().getValue();
            g.store.load();
            me.ocultarColumnasGrid(g, false, false, record.get('elemento'));
            /*Limpiar los parametros enviados al metodo que carga el store*/
            g.store.proxy.extraParams['ID_UC'] = null;
            g.store.proxy.extraParams['ID_CONDUCTOR'] = null;
            g.store.proxy.extraParams['ID_POSTE'] = null;
            g.store.proxy.extraParams['ID_TD'] = null;

        } else {
            me.ocultarColumnasGrid(g, false, false, record.get('elemento'));
            //g.store.proxy.extraParams['ID_OT'] = this.getComboOt().getValue();
            g.store.proxy.extraParams['ID_POSTE'] = record.get('ID_POSTE');
            g.store.proxy.extraParams['ID_TD'] = this.getFieldIdCabecera().getValue() > 0 ? this.getFieldIdCabecera().getValue() : 0;
            g.store.load();
            g.store.proxy.extraParams['ID_POSTE'] = null;
        }
    },

    nuevoRegistroTrabajoDiario: function () {
        var me = this;
        Funciones.checkTimeout();
        var ot = this.getComboOt().getValue();
        var fechaejecucion = this.getFechaEjecucion();
        var horainicio = this.getHoraInicio();
        var horafin = this.getHoraFin();
        var elementosintervenidos = this.getTreePostesConductores().getSelectionModel().getSelection()[0];
        if (this.validarCabecera(fechaejecucion.getValue(), horainicio.getValue(), horafin.getValue(), elementosintervenidos) == 'Satisfactorio') {
            //var nuevoregistro = Ext.create('App.View.OrdenesTrabajo.TrabajosEjecutados.FormDetalleTrabajoEjecutado');
            var nuevoregistro = Ext.create('App.view.OrdenesTrabajo.ReporteTrabajoDiario.FormNuevoRegistro');
            if (this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('ID_CONDUCTOR') != null) {
                var conductormodel = Ext.create('App.Model.Postes.Conductores', {
                    ID_CONDUCTOR: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('ID_CONDUCTOR'),
                    COD_CONDUCTOR: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('COD_CONDUCTOR'),
                    DESC_TIPO: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('DESC_TIPO'),
                });
                this.getComboConductor().store.add(conductormodel);
                var selectedRecord = this.getComboConductor().getStore().getAt(0);
                this.getComboConductor().setValue(selectedRecord);
                this.getFieldFormacion().setValue(this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('FORMACION_CND'));
                this.getFieldDescTipo().setValue(this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('DESC_TIPO'));
                this.getFieldFormacion().enable(true);
                this.getFieldDescTipo().enable(true);
                this.getComboUnidadConstructiva().setReadOnly(true);
                this.getFieldFormacion().setReadOnly(true);
                this.obtenerCodigosMantenimiento(this.getComboConductor());
            }
            if (elementosintervenidos.isLeaf() && this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('ID_CONDUCTOR') == null) {
                var postemodel = Ext.create('App.Model.Postes.Postes', {
                    ID_POSTE: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('ID_POSTE'),
                    COD_POSTE: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('COD_POSTE'),
                });
                this.getComboPoste().store.add(postemodel);
                var selectedRecord = this.getComboPoste().getStore().getAt(0);
                this.getComboPoste().setValue(selectedRecord);

                var ucmodel = Ext.create('App.Model.Postes.UnidadesConstructivas', {
                    ID_UC: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('ID_UC'),
                    COD_UC: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('COD_UC'),
                });
                this.getComboUnidadConstructiva().store.add(ucmodel);
                var selectedRecord = this.getComboUnidadConstructiva().getStore().getAt(0);
                this.getComboUnidadConstructiva().setValue(selectedRecord);
                this.getComboUnidadConstructiva().enable(true);
                this.getComboUnidadConstructiva().setReadOnly(true);
                this.obtenerCodigosMantenimiento(this.getComboUnidadConstructiva());
            } else {
                    var postemodel = Ext.create('App.Model.Postes.Postes', {
                        ID_POSTE: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('ID_POSTE'),
                        COD_POSTE: this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('COD_POSTE'),
                    });
                    this.getComboPoste().store.add(postemodel);
                    var selectedRecord = this.getComboPoste().getStore().getAt(0);
                    this.getComboPoste().setValue(selectedRecord);
                    this.getComboUnidadConstructiva().store.setExtraParam('ID_POSTE', this.getTreePostesConductores().getSelectionModel().getSelection()[0].get('ID_POSTE'));
                    this.getComboUnidadConstructiva().store.load();
                    this.getComboUnidadConstructiva().enable(true);
            }

            var win = Ext.create('Ext.window.Window', {
                itemId: 'winnuevoregistro',
                title: 'Registrar detalle Trabajo Diario',
                resizable: false,
                modal: true,
                bodyStyle: 'background-color:#fff',
                icon: Constantes.HOST + 'Content/images/pencil.png',
                items: [ { xtype: nuevoregistro } ],

                buttons: [{
                    text: 'Guardar',
                    disabled: true,
                    itemId: 'btnGuardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('.window').close(); }
                }],
            });
            win.show();
        } else {
            var mensaje = this.validarCabecera(fechaejecucion.getValue(), horainicio.getValue(), horafin.getValue(), elementosintervenidos);
            Ext.MessageBox.show({
                title: 'Completar datos',
                msg: 'Por favor! complete primero los siguientes datos: <br />' + mensaje,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    obtenerFormacion: function (combo, records) {
        if (this.getFieldFormacion().isDisabled) {
            this.getFieldFormacion().enable();
            this.getComboPoste().setValue(null);
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboUnidadConstructiva().disable();
        }
        if (this.getComboCodigoMantenimiento().isDisabled()) {
            this.getComboCodigoMantenimiento().enable();
        } else {
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        }
        this.getFieldFormacion().setValue(records[0].get('FORMACION'));
        var cbcm = this.getComboCodigoMantenimiento();
        cbcm.store = this.getSolicitudesMantenimientoCodigosMantenimientoStore().load({ params: { ID_CONDUCTOR: combo.getValue()} });
    },

    obtenerUnidadesConstructivas: function (combo, record, index) {

        if (this.getComboUnidadConstructiva().isDisabled()) {
            this.getComboUnidadConstructiva().enable();
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboConductor().setValue(null);
            this.getFieldFormacion().setValue(null);
            this.getFieldFormacion().disable();
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        } else {
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
        }
        if (!this.getComboCodigoMantenimiento().isDisabled()) {
            this.getComboCodigoMantenimiento().disable()
        } else {
            this.getComboUnidadConstructiva().setValue(null);
            this.getComboCodigoMantenimiento().setValue(null);
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        }
        var cbuc = this.getComboUnidadConstructiva();
        cbuc.store = this.getPostesUnidadesConstructivasStore().load({ params: { ID_POSTE: combo.getValue() } });
    },

    obtenerCodigosMantenimiento: function (combo, record, index) {
        record = combo.getSelectedRecord();
        if (this.getComboCodigoMantenimiento().isDisabled()) {
            this.getComboCodigoMantenimiento().enable();
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
        } else {
            this.getGridCodigosSolucion().store.removeAll();
            this.getGridCodigosSolucion().disable();
            this.getComboCodigoMantenimiento().store.removeAll();
            this.getComboCodigoMantenimiento().setValue(null);
        }
        var cbcm = this.getComboCodigoMantenimiento();
        cbcm.store = this.getSolicitudesMantenimientoCodigosMantenimientoStore().load({ params: { ID_UC: record.get('ID_UC'), ID_CONDUCTOR: record.get('ID_CONDUCTOR') } });
    },

    obtenerCodigosSolucion: function (combo, record, index) {
        var grid = this.getGridCodigosSolucion();
        if (grid.isDisabled()) {
            grid.enable();
        }
       grid.store.proxy.extraParams = { ID_COD_MAN: combo.getValue() };
       grid.store.load();
    },

    agregarMaterialesTodos: function (grid, rowIndex, colIndex) {
        var me = this;
        if (me.getComboPoste().getValue() != null && me.getFieldNivel().getValue() || me.getComboConductor().getValue() != null) {
            var selectionModel = grid.getSelectionModel(), record;
            selectionModel.select(rowIndex);
            record = selectionModel.getSelection()[0];
            var idcodigo = record.get('ID_COD_SOL');
            var codigo = record.get('COD_SOL');
            var gridDetalle = this.getGridDetalleTrabajoDiario();
            var store = Ext.create('App.store.OrdenesTrabajo.MaterialesCodigoSolucion');
            store.load({
                scope: this,
                params: { ID_COD_SOL: idcodigo },
                callback: function (records, operation, success) {
                    if (operation.resultSet.count > 0) {
                        for (var i = 0; i < operation.resultSet.count; i++) {
                            if (!me.buscarExiste(records[i].get('IDPRODUCTO'), gridDetalle.store)) {
                                var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                                    ID_POSTE: me.getComboPoste().getValue(),
                                    ID_CONDUCTOR: me.getComboConductor().getValue(),
                                    ID_UC: me.getComboUnidadConstructiva().getValue(),
                                    COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                                    ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                                    COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                                    ID_COD_SOL: idcodigo,
                                    COD_SOL: codigo,
                                    IDPRODUCTO: records[i].get('IDPRODUCTO'),
                                    COD_PROD: records[i].get('COD_ALTERNATIVO'),
                                    DESC_PROD: records[i].get('DESCRIPCION'),
                                    UNID_PROD: records[i].get('IDUNIDAD'),
                                    CANT_EJE: 1,
                                    FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                                    FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                                    FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                                    ID_RESP: me.getHideIdResponsable().getValue(),
                                    ID_MOVIL: me.getHideIdMovil().getValue(),
                                    NIVEL: me.getFieldNivel().getValue(),
                                    OBSERV: records[i].get('OBSERV'),
                                    ID_OT: me.getComboOt().getValue()
                                });
                                gridDetalle.store.add(det);
                            }
                        }
                        if (this.getBotonGuardar().isDisabled() && gridDetalle.store.count() > 0) {
                            this.getBotonGuardar().enable();
                        }
                    } else {
                        var selectionModel = grid.getSelectionModel(), record;
                        selectionModel.select(rowIndex);
                        record = selectionModel.getSelection()[0];
                        var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                            ID_POSTE: me.getComboPoste().getValue(),
                            ID_CONDUCTOR: me.getComboConductor().getValue(),
                            ID_UC: me.getComboUnidadConstructiva().getValue(),
                            COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                            ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                            COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                            ID_COD_SOL: idcodigo,
                            COD_SOL: codigo,
                            IDPRODUCTO: '',
                            COD_PROD: '',
                            DESC_PROD: record.get('DESCRIP_SOL') + '. NO REQUIERE MATERIALES',
                            UNID_PROD: '',
                            CANT_PRE: 0,
                            CANT_EJE: 0,
                            FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                            FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                            FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                            ID_RESP: me.getHideIdResponsable().getValue(),
                            ID_MOVIL: me.getHideIdMovil().getValue(),
                            NIVEL: me.getFieldNivel().getValue(),
                            OBSERV: '',
                            ID_OT: me.getComboOt().getValue()
                        });
                        if (!me.buscarExiste(det.get('DESC_PROD'), gridDetalle.store, idcodigo, me.getComboCodigoMantenimiento().getValue())) {
                            gridDetalle.store.add(det); //seteo un codigo de solucion sin materiales para poder habilitar el boton de guardar en la condicion debajo
                        }
                    }
                    if (this.getBotonGuardar().isDisabled() && gridDetalle.store.count() > 0) {
                        this.getBotonGuardar().enable();
                    }
                }
            });
        } else {
            var falta = me.getComboPoste().getValue() == null ? "POSTE" : "NIVEL";
            Ext.Msg.show({
                title: 'Falta completar datos importantes',
                msg: 'Por favor, verifique los siguientes campos: </br> <b>' + falta + '</b>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    mostrarMateriales: function (grid, rowIndex, colIndex) {
        var me = this;
        if (me.getComboPoste().getValue() != null && me.getFieldNivel().getValue() || me.getComboConductor().getValue() != null) {
            var selectionModel = grid.getSelectionModel(), record;
            selectionModel.select(rowIndex);
            record = selectionModel.getSelection()[0];
            var idcodigo = record.get('ID_COD_SOL');
            var codigo = record.get('COD_SOL');
            var gridMatSol = Ext.widget('gridmaterialescodigosolucion');
            //gridMatSol.store.load({ params: { ID_COD_SOL: idcodigo } });
            var store = Ext.create('App.store.OrdenesTrabajo.MaterialesCodigoSolucion');
            store.load({
                scope: this,
                params: { ID_COD_SOL: idcodigo },
                callback: function (records, operation, success) {
                    for (var i = 0; i < operation.resultSet.count; i++) {
                        var det = Ext.create('App.model.OrdenesTrabajo.MaterialesCodigoSolucion', {
                            ID_COD_SOL: idcodigo,
                            COD_SOL: codigo,
                            IDPRODUCTO: records[i].get('IDPRODUCTO'),
                            COD_ALTERNATIVO: records[i].get('COD_ALTERNATIVO'),
                            COD_PROD: records[i].get('COD_PROD'),
                            IDUNIDAD: records[i].get('IDUNIDAD'),
                            DESCRIPCION: records[i].get('DESCRIPCION'),
                        });
                        if (!me.buscarExiste(records[i].get('IDPRODUCTO'), gridMatSol.store, idcodigo, me.getComboCodigoMantenimiento().getValue())) {
                            gridMatSol.store.add(det);
                        }
                    }
                    if (operation.resultSet.count == 0) {
                        var det = Ext.create('App.model.OrdenesTrabajo.MaterialesCodigoSolucion', {
                            ID_COD_SOL: idcodigo,
                            COD_SOL: codigo,
                            IDPRODUCTO: '',
                            COD_ALTERNATIVO: '',
                            COD_PROD: '',
                            IDUNIDAD: '',
                            DESCRIPCION: record.get('DESCRIP_SOL') + '. NO REQUIERE MATERIALES',
                        });
                        gridMatSol.store.add(det);
                    }
                }
            });

            var winMateriales = Ext.widget('window', {
                layout: 'fit',
                title: 'Materiales que utiliza el Codigo de Solucion: ' + record.get('COD_SOL'),
                modal: true,
                width: 650,
                resizable: false,
                items: [{
                    xtype: gridMatSol
                }],
                buttons: [{
                    text: 'Aceptar',
                    action: 'add-items'
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('.window').close(); }
                }],
            });
            winMateriales.show();
        } else {
            var falta = me.getComboPoste().getValue() == null ? "POSTE" : "NIVEL";
            Ext.Msg.show({
                title: 'Falta completar datos importantes',
                msg: 'Por favor, verifique los siguientes campos: </br> <b>' + falta + '</b>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    addMateriales: function (button) {
        var me = this;
        var gridsol = me.getGridCodigosSolucion();
        record = gridsol.getSelectionModel().getSelection()[0];
        var idcodigo = record.get('ID_COD_SOL');
        var codigo = record.get('COD_SOL');
        var win = button.up('window');
        var grid = win.down('grid');
        var grid2 = this.getGridDetalleTrabajoDiario();
        var store2 = grid.getStore();
        store2.each(function (record, index) {
            if (!me.buscarExiste(record.get('IDPRODUCTO'), grid2.store)) {
                var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                    ID_POSTE: me.getComboPoste().getValue(),
                    ID_CONDUCTOR: me.getComboConductor().getValue(),
                    ID_UC: me.getComboUnidadConstructiva().getValue(),
                    COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                    ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                    COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                    ID_COD_SOL: idcodigo,
                    COD_SOL: codigo,
                    IDPRODUCTO: record.get('IDPRODUCTO'),
                    COD_PROD: record.get('COD_ALTERNATIVO'),
                    DESC_PROD: record.get('DESCRIPCION'),
                    UNID_PROD: record.get('IDUNIDAD'),
                    CANT_PRE: 0,
                    CANT_EJE: 1,
                    FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                    FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                    FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                    ID_RESP: me.getHideIdResponsable().getValue(),
                    ID_MOVIL: me.getHideIdMovil().getValue(),
                    NIVEL: me.getFieldNivel().getValue(),
                    OBSERV: record.get('OBSERV'),
                    ID_OT: me.getComboOt().getValue()
                });
                grid2.store.add(det);
            }
        });
        if (this.getBotonGuardar().isDisabled()) {
            this.getBotonGuardar().enable();
        }

        win.close();
    },

    removerMaterialesCodigoSolucion: function (grid, rowIndex, colIndex) {
        var selectionModel = grid.getSelectionModel(), record;
        selectionModel.select(rowIndex);
        record = selectionModel.getSelection()[0];
        var codigo = record.get('COD_SOL');

        var grid2 = this.getGridDetalleTrabajoDiario(); //Agarramos la referencia del grid detalle trabajo diario
        var store2 = grid2.getStore();

        var store3 = Ext.create('App.store.OrdenesTrabajo.DetalleTrabajoDiario'); //creamos un  store temporal
        grid2.getStore().each(function (rec, index) {
            /*La funcion store.remove(rec) me dio problemas porque se perdia el indice del registro, 
            por esta razon decidi almacenar en un store los items que no cumplen con una condicion,
            para luego sobrescribir el store del grid temporal*/
            if (rec.get('COD_SOL') != codigo) {
                store3.add(store2.getAt(index));
            }
        });
        grid2.store.removeAll();
        store3.each(function (record, index) {
            grid2.store.add(record);
        });
        if (store2.count() < 1) {
            this.getBotonGuardar().disable();
        } else {
            this.getBotonGuardar().enable()
        }
        /* grid.getStore().removeAt(rowIndex);*/
    },

    mostrarVentanaMateriales: function () {
        var me = this;
        if (me.getComboCodigoMantenimiento().getValue() && me.getFieldNivel().getValue()) {
            var gridMateriales = Ext.create('App.View.Postes.GridMateriales', { title: null, iconCls: null, opcion: 'GridMateriales', imagenes: false });
            var winMateriales = Ext.widget('window', {
                itemId: 'winmaterialeserp',
                layout: 'fit',
                iconCls: 'application_view_list',
                title: 'Lista de Materiales',
                modal: true,
                width: 600,
                resizable: false,
                items: [{
                    xtype: gridMateriales
                }],
                buttons: [{
                    text: 'Aceptar',
                    handler: function () {
                        var win = this.up('window');
                        var grid = win.down('grid');
                        if (grid.getSelectionModel().getSelection()[0]) {
                            var records = grid.getSelectionModel().getSelection()[0];
                            var gridDetalle = me.getGridDetalleTrabajoDiario();
                            gridDetalle.store.add(Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                                ID_POSTE: me.getComboPoste().getValue(),
                                ID_CONDUCTOR: me.getComboConductor().getValue(),
                                ID_UC: me.getComboUnidadConstructiva().getValue(),
                                COD_UC: me.getComboUnidadConstructiva().getRawValue(),
                                ID_COD_MAN: me.getComboCodigoMantenimiento().getValue(),
                                COD_MAN: me.getComboCodigoMantenimiento().getRawValue(),
                                ID_COD_SOL: 0,
                                COD_SOL: '',
                                IDPRODUCTO: records.get('IDPRODUCTO'),
                                COD_PROD: records.get('COD_ALTERNATIVO'),
                                DESC_PROD: records.get('DESCRIPCION'),
                                UNID_PROD: records.get('IDUNIDAD'),
                                CANT_EJE: 1,
                                FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                                FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                                FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                                ID_RESP: me.getHideIdResponsable().getValue(),
                                ID_MOVIL: me.getHideIdMovil().getValue(),
                                NIVEL: me.getFieldNivel().getValue(),
                                OBSERV: '',
                                ID_OT: me.getComboOt().getValue()
                            }));
                            win.close();
                            if (me.getBotonGuardar().isDisabled() && gridDetalle.store.count() > 0) {
                                me.getBotonGuardar().enable();
                            }
                        } else {
                            Ext.Msg.alert("Error", "Primero seleccione 1 Material del Grid")
                        }
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('window').close(); }
                }],
            });
            winMateriales.show();
        } else {
            if (me.getFieldNivel().getValue() == null && me.getComboCodigoMantenimiento().getValue() != null) {
                Ext.Msg.alert("Error", "Verfique que los siguientes datos esten seleccionados: </br><b>NIVEL</b>")
            } else {
                Ext.Msg.alert("Error", "Verfique que los siguientes datos esten seleccionados: <b></br></br>Poste o Conductor </br>Unidad Constructiva </br>Codigo Mantenimiento</b>")
            }
        }
    },

    guardarDetalleTrabajoDiario: function (button) {
        var me = this;
        var win = button.up('window');
        var grid = win.down('griddetalletrabajodiario');
        var store = grid.getStore();
            if (store.count() > 0) {
                Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de guardar los datos?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: Constantes.HOST + 'OrdenesTrabajo/GuardarCabeceraTrabajoDiario',
                            params: { ID_TD: me.getFieldIdCabecera().getValue(), ID_OT: me.getComboOt().getValue(), FECHA_EJE_INI: me.getFechaEjecucion().getValue(), FECHA_EJE_FIN: me.getFechaEjecucion().getValue() },
                            success: function (response, options) {
                                store.each(function (record) {
                                    record.setDirty();
                                });
                                store.sync();
                                win.close();
                                //me.getViewUsuarios().show();
                                me.getPanelPersonal().setDisabled(false);
                            },
                        });
                        me.obtenerCabecera(me.getComboOt().getValue());
                    }
                });
            } else {
                Ext.Msg.show({
                    title: 'No existen registros',
                    msg: 'Usted debe seleccionar por lo menos <br/> un codigo de solucion para guardar',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
                this.getBotonGuardar().disable();
            }
    },

    modificarDetalleTrabajoDiario: function () {
        var me = this;
        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de guardar los cambios?', function (btn) {
                if (btn == 'yes') {
                    var g = me.getGridPrincipalDetalleTrabajoDiario();
                    g.store.sync();
                } else {
                    Ext.Msg.show({
                        title: 'Sugerencia',
                        msg: 'Seleccione nuevamente el elemento afectado, para refrescar los datos',
                        width: 300,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                 });
             }
       });
    },

    seleccionarPersonal: function (view, record, item, index, event, options) {
        var me = this;
        if (record.get('active')) { /* true si el usuario esta seleccionado */
            Ext.Ajax.request({
                url: Constantes.HOST + 'OrdenesTrabajo/EliminarPersonalMovil',
                params: { ID_OT: this.getComboOt().getValue(), ID_MOVIL: this.getFieldMovil().getValue(), ID_RESP: record.get('ID_RESP'), FCH_HOR_INI: record.get('FCH_HOR_INI') },
                success: function (response) {
                    Ext.fly(item).removeCls('active');
                    Ext.fly(item).addCls('inactive');
                },
                failure: function (response) {
                }
            });
        } else {
            Ext.Ajax.request({
                url: Constantes.HOST + 'OrdenesTrabajo/GuardarPersonalMovil',
                params: {
                    //ID_TD: 1,
                    ID_OT: this.getComboOt().getValue(),
                    ID_MOVIL: this.getFieldMovil().getValue(),
                    ID_RESP: record.get('ID_RESP'),
                    FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),/*, estado: record.data.active*/
                    FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i'))
                },
                success: function (response) {
                    Ext.fly(item).removeCls('inactive');
                    Ext.fly(item).addCls('active');
                },
                failure: function (response) {
                }
            });
        }
        record.data.active = !record.data.active;
    },

    buscarExiste: function (item, store, codsol, codman) {
        for (var i = 0; i < store.getCount(); i++) {
            var comparar = store.getAt(i).data.IDPRODUCTO;
            if (item == comparar || item == store.getAt(i).data.DESC_PROD && store.getAt(i).data.ID_COD_SOL == codsol && store.getAt(i).data.ID_COD_MAN == codman) {
                return true;
            }
        }
    },

    cargarVentanaUC: function (){
        var comboPoste = this.getComboPoste();
        /*var v = comboPoste.getValue();
        var record = comboPoste.findRecord(comboPoste.valueField || comboPoste.displayField, v);*/
        var record = comboPoste.getSelectedRecord();
        var me = this;
        if (comboPoste.getValue() != null) {
            if (me.winPoste == null) {
                me.winPoste = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddUc'});
                me.formConfigPuesto = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPoste' });
                me.formConfigPuesto.loadRecord(record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: comboPoste.getValue() });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.add(me.formConfigPuesto);
                me.winPoste.show();
            }
            else {
                me.formConfigPuesto.getForm().reset();
                me.formConfigPuesto.loadRecord(record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: comboPoste.getValue() });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione Primero un Poste para Configurar UC con Postes")
        }
    },

    cargarVentanaPosteOT: function () {
        var comboOt = this.getComboOt();
        var store = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajo');
        var record = Ext.create('App.Model.OrdenesTrabajo.OrdenesTrabajo', { ID_OT : comboOt.getValue() });
        store.load({
            scope: this,
            params: { ID_OT: comboOt.getValue() },
            callback: function (records, operation, success) {
                if (operation.resultSet.count > 0) {
                    record = store.first();
                }
            }
        });
        var me = this;
        if (me.winPosteOT == null) {
            me.winPosteOT = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddPoste' });
            me.formConfigPuestoOT = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPosteOT' });
            me.formConfigPuestoOT.loadRecord(record);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: comboOt.getValue() });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.add(me.formConfigPuestoOT);
            me.winPosteOT.show();
        }
        else {
            me.formConfigPuestoOT.getForm().reset();
            me.formConfigPuestoOT.loadRecord(record);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: comboOt.getValue() });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.show();
        }
    },

    actualizarComboPoste: function () {
        var comboPoste = this.getComboPoste();
        comboPoste.setValue(null);
        comboPoste.store.load({ params: { ID_OT: this.getComboOt().getValue() } });
        this.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: this.getComboOt().getValue() } });
    },

    actualizarComboUc: function () {
        var comboUc = this.getComboUnidadConstructiva();
        comboUc.setValue(null);
        comboUc.store.load({ params: { ID_POSTE: this.getComboPoste().getValue() } });
        this.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: this.getComboOt().getValue() } });
    },

    sumarFechas: function (fecha, tiempo) {
        var nuevafecha = new Date(fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' + (fecha.getDate()) + ' ' + tiempo);
        return nuevafecha;
    },

    validarCabecera: function (fecha, horaini, horafin, elementos) {
       var datos = [fecha, horaini, horafin, elementos];
       var valores = ["<b>FECHA EJECUCION</b>", "<b>HORA INICIO</b>", "<b>HORA FIN</b>", "<b>ELEMENTO INTERVENIDO (Postes/Conductores)</b>"]
       if (fecha != null && horaini != null && horafin != null && elementos != null && !elementos.isRoot()) {
            return 'Satisfactorio'
        } else {
            var mensaje = '';
            for (var i = 0; i < datos.length; i++) {
                if (datos[i] == null) {
                    mensaje += valores[i] + '</br>';
                }
            }
            if (elementos != null && elementos.isRoot()) {
                mensaje += "<b>ELEMENTO INTERVENIDO (Postes/Conductores)</b>"
            }
            return mensaje
        }
    },

    getRegistrosDiario: function () {
    },

    obtenerDatosPlanillaInspeccion: function () {
        var me = this;
        Funciones.checkTimeout();
        var ot = this.getComboOt().getValue();
        var fechaejecucion = me.getFechaEjecucion();
        var horainicio = me.getHoraInicio();
        var horafin = me.getHoraFin();
        var elementosintervenidos = me.getTreePostesConductores().getSelectionModel().getSelection()[0];
        if (me.validarCabecera(fechaejecucion.getValue(), horainicio.getValue(), horafin.getValue(), elementosintervenidos) == 'Satisfactorio') {
            Ext.Ajax.request({
                url: Constantes.HOST + 'OrdenesTrabajo/ObtenerDetalleDesdePlanilla',
                method: 'GET',
                params: { OT_ORIGEN: me.getHideOtOrigen().getValue(), ID_CONDUCTOR: elementosintervenidos.get('ID_CONDUCTOR'), ID_POSTE: elementosintervenidos.get('ID_POSTE') },
                success: function (response) {
                    data = Ext.decode(response.responseText);
                    if (data.total > 0) {
                        gridprincipal = me.getGridPrincipalDetalleTrabajoDiario();
                        storeprincipal = gridprincipal.getStore();
                        storenuevo = Ext.create('App.store.OrdenesTrabajo.DetalleTrabajoDiario');
                        for (var i = 0; i < data.total; i++) {
                            if (!me.buscarExiste(data.data[i].IDPRODUCTO, storeprincipal, data.data[i].COD_SOL, data.data[i].COD_MAN)) {
                                gridprincipal.store.add(Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                                    ID_POSTE: data.data[i].ID_POSTE,
                                    COD_POSTE: data.data[i].COD_POSTE,
                                    ID_CONDUCTOR: data.data[i].ID_CONDUCTOR,
                                    COD_CONDUCTOR: data.data[i].COD_CONDUCTOR,
                                    FORMACION_CND: data.data[i].FORMACION_CND,
                                    ID_UC: data.data[i].ID_UC,
                                    COD_UC: data.data[i].COD_UC,
                                    ID_COD_MAN: data.data[i].ID_COD_MAN,
                                    COD_MAN: data.data[i].COD_MAN,
                                    ID_COD_SOL: data.data[i].ID_COD_SOL,
                                    COD_SOL: data.data[i].COD_SOL,
                                    IDPRODUCTO: data.data[i].IDPRODUCTO,
                                    COD_PROD: data.data[i].COD_PROD,
                                    DESC_PROD: data.data[i].DESC_PROD,
                                    UNID_PROD: data.data[i].UNID_PROD,
                                    CANT_EJE: 0,
                                    FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                                    FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                                    FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                                    ID_RESP: me.getHideIdResponsable().getValue(),
                                    CAPATAZ: me.getFieldCapataz().getValue(),
                                    ID_MOVIL: me.getHideIdMovil().getValue(),
                                    MOVIL: me.getFieldMovil().getValue(),
                                    NIVEL: 1,
                                    OBSERV: '',
                                    ID_OT: me.getComboOt().getValue()
                                }));

                                storenuevo.add(Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
                                    ID_POSTE: data.data[i].ID_POSTE,
                                    COD_POSTE: data.data[i].COD_POSTE,
                                    ID_CONDUCTOR: data.data[i].ID_CONDUCTOR,
                                    COD_CONDUCTOR: data.data[i].COD_CONDUCTOR,
                                    FORMACION_CND: data.data[i].FORMACION_CND,
                                    ID_UC: data.data[i].ID_UC,
                                    COD_UC: data.data[i].COD_UC,
                                    ID_COD_MAN: data.data[i].ID_COD_MAN,
                                    COD_MAN: data.data[i].COD_MAN,
                                    ID_COD_SOL: data.data[i].ID_COD_SOL,
                                    COD_SOL: data.data[i].COD_SOL,
                                    IDPRODUCTO: data.data[i].IDPRODUCTO,
                                    COD_PROD: data.data[i].COD_PROD,
                                    DESC_PROD: data.data[i].DESC_PROD,
                                    UNID_PROD: data.data[i].UNID_PROD,
                                    CANT_EJE: 0,
                                    FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                                    FCH_HOR_INI: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraInicio().getValue(), 'H:i')),
                                    FCH_HOR_FIN: me.sumarFechas(me.getFechaEjecucion().getValue(), Ext.Date.format(me.getHoraFin().getValue(), 'H:i')),
                                    ID_RESP: me.getHideIdResponsable().getValue(),
                                    CAPATAZ: me.getFieldCapataz().getValue(),
                                    ID_MOVIL: me.getHideIdMovil().getValue(),
                                    MOVIL: me.getFieldMovil().getValue(),
                                    NIVEL: 1,
                                    OBSERV: '',
                                    ID_OT: me.getComboOt().getValue()
                                }));
                            }
                        }
                        if (storenuevo.count() > 0) {
                            Ext.Msg.confirm('Confirmar', 'Se añadiran los datos obtenidos de la Planilla de Inspeccion. </br>¿Esta usted seguro de guardar los datos?', function (btn) {
                                if (btn == 'yes') {
                                    Ext.Ajax.request({
                                        url: Constantes.HOST + 'OrdenesTrabajo/GuardarCabeceraTrabajoDiario',
                                        params: { ID_TD: me.getFieldIdCabecera().getValue(), ID_OT: me.getComboOt().getValue(), FECHA_EJE_INI: me.getFechaEjecucion().getValue(), FECHA_EJE_FIN: me.getFechaEjecucion().getValue() },
                                        success: function (response, options) {
                                            storenuevo.sync();
                                            //me.getViewUsuarios().show();
                                            me.getPanelPersonal().setDisabled(false);
                                        },
                                    });
                                    me.obtenerCabecera(me.getComboOt().getValue());
                                } else {
                                    gridprincipal.store.removeAll();
                                }
                            });
                        }
                    }
                },
                failure: function (response) {
                }
            });
        } else {
            var mensaje = me.validarCabecera(fechaejecucion.getValue(), horainicio.getValue(), horafin.getValue(), elementosintervenidos);
            Ext.MessageBox.show({
                title: 'Completar datos',
                msg: 'Por favor! complete primero los siguientes datos: <br />' + mensaje,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    ocultarColumnasGrid: function (grid, v, f, elemento) {
        if (elemento == 'COD_POSTE') {
            grid.columns[1].setVisible(false);
            grid.columns[2].setVisible(true);
            grid.columns[3].setVisible(f);
            grid.columns[4].setVisible(f);
        }
        if (elemento == 'COD_CONDUCTOR') {
            grid.columns[1].setVisible(false);
            grid.columns[2].setVisible(false);
            grid.columns[3].setVisible(false);
            grid.columns[4].setVisible(true);
        }
        if (elemento == 'COD_UC') {
            grid.columns[1].setVisible(false);
            grid.columns[2].setVisible(false);
            grid.columns[3].setVisible(false);
            grid.columns[4].setVisible(false);
        }
        if (elemento == 'root') {
            grid.columns[1].setVisible(true);
            grid.columns[2].setVisible(true);
            grid.columns[3].setVisible(true);
            grid.columns[4].setVisible(true);
        }
    },

    obtenerCabecera: function (ot) {
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerTrabajoDiarioCabecera',
            params: { ID_OT:ot },
            method: 'GET',
            success: function (response, options) {
                cabecera = Ext.decode(response.responseText);
                if (cabecera.data != null) {
                    me.getFieldEstado().setValue(cabecera.data.ESTADO);
                    me.getFieldObservacion().setValue(cabecera.data.OBSERVACION);
                    me.getFechaEjecucion().setValue(cabecera.data.FECHA_EJE_INI);
                    me.getHoraInicio().setValue(cabecera.data.FCH_HOR_INI);
                    me.getHoraFin().setValue(cabecera.data.FCH_HOR_FIN);
                    me.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: ot } });
                    me.ocultarColumnasGrid(me.getGridPrincipalDetalleTrabajoDiario(), true, true, 'root');
                    me.getGridPrincipalDetalleTrabajoDiario().store.proxy.extraParams['ID_TD'] = cabecera.data.ID_TD;
                    me.getGridPrincipalDetalleTrabajoDiario().store.load();
                    me.getFieldIdCabecera().setValue(cabecera.data.ID_TD);
                    me.getOrdenesTrabajoPersonalTrabajoDiarioStore().load({ params: { ID_TD: cabecera.data.ID_TD, EJECUTA: 'T' } });
                    me.getPanelPersonal().setDisabled(false);
                    //me.getViewUsuarios().show();
                } else {
                    me.getFieldEstado().setValue(null);
                    me.getFieldObservacion().setValue(null);
                    me.getFieldIdCabecera().setValue(null);
                    me.getFechaEjecucion().setValue(null);
                    me.getHoraInicio().setValue(null);
                    me.getHoraFin().setValue(null);
                    me.getPanelPersonal().setDisabled(true);
                    //me.getViewUsuarios().hide();
                    me.getOrdenesTrabajoPersonalTrabajoDiarioStore().load({ params: { EJECUTA: 'T' } });
                    me.getOrdenesTrabajoElementosIntervenidosStore().load({ params: { ID_OT: ot } });
                    me.ocultarColumnasGrid(me.getGridPrincipalDetalleTrabajoDiario(), true, true, 'root');
                    me.getGridPrincipalDetalleTrabajoDiario().store.removeAll();
                }
            },
        });
    }
});