Ext.define('App.controller.OrdenesTrabajo.EjecutadoContratista', {
    extend: 'Ext.app.Controller',
    stores: [
        'Postes.Postes',
        'Postes.Conductores',
        'Postes.UnidadesConstructivas',
        'OrdenesTrabajo.OrdenesTrabajo',
        'OrdenesTrabajo.OrdenesTrabajoResponsable',
        'OrdenesTrabajo.ElementosIntervenidosContratista',
        'OrdenesTrabajo.UnidadesConstructivasIntervenidasContratista',
        'OrdenesTrabajo.MaterialesManoObraContratista',
        'OrdenesTrabajo.DetallesPresupuesto'

    ],

    views: [
          'OrdenesTrabajo.EjecutadoContratista.PrincipalEjecutadoContratista',
          'OrdenesTrabajo.EjecutadoContratista.FormCabecera',
          'OrdenesTrabajo.EjecutadoContratista.ViewElementosIntervenidos',
          'OrdenesTrabajo.EjecutadoContratista.ViewUnidadesConstructivas',
          'OrdenesTrabajo.EjecutadoContratista.GridMaterialesManoObra',
          'OrdenesTrabajo.EjecutadoContratista.FormOTsContratista',
          'OrdenesTrabajo.EjecutadoContratista.WindowNuevoRegistro'
    ],

    refs: [{
                ref: 'gridOTsContratista',
                selector: '#gridOTsContratista'
            },
            {
                ref: 'cabecera',
                selector: '#formcabeceraejecutadocontratista'
            },
            {
                ref: 'fechaEjecucion',
                selector: '#formcabeceraejecutadocontratista #fejecini'
            },
            {
                ref: 'distancia',
                selector: '#formcabeceraejecutadocontratista #fielddistancia'
            },
            {
                ref: 'hideIdCabecera',
                selector: '#formcabeceraejecutadocontratista #idte'
            },
            {
                ref: 'hideEstado',
                selector: '#formcabeceraejecutadocontratista #hestado'
            },
            {
                ref: 'idOt',
                selector: '#formcabeceraejecutadocontratista #comboboxot'
            },
            {
                ref: 'comboPoste',
                selector: 'window #comboposte'
            },
            {
                ref: 'comboUnidadConstructiva',
                selector: 'window #combouc'
            },
            {
                ref: 'comboConductor',
                selector: 'window #comboconductor'
            },
            {
                ref: 'fieldFormacion',
                selector: 'window #fieldformacion'
            },
            {
                ref: 'viewElementosIntervenidos',
                selector: 'ejecutadocontratistaprincipal panel #velementosintervenidos'
            },
            {
                ref: 'viewUnidadesConstructivas',
                selector: 'ejecutadocontratistaprincipal panel #vunidadesconstructivas'
            },
            {
                ref: 'gridMateriales',
                selector: 'ejecutadocontratistaprincipal panel #gridmateriales'
            },
            {
                ref: 'gridManoObra',
                selector: 'ejecutadocontratistaprincipal panel #gridmanoobra'
            },
    ],

    init: function () {
        var me = this;
        me.control({
            '#maintab ejecutadocontratistaprincipal panel #gridmateriales': {
                render: me.cargarOTsContratista
            }, 
            '#maintab ejecutadocontratistaprincipal panel button[action=add]': {
                click: me.nuevoRegistroEjecutadoContratista
            },
            '#maintab ejecutadocontratistaprincipal panel form grid': {
                itemclick: me.mostrarTrabajoEjecutado
            },
            '#maintab ejecutadocontratistaprincipal panel form textfield': {
                keyup: me.buscarOrdenTrabajoKeyEnter
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Buscar]': {
                click: me.buscarOrdenTrabajo
            },
            '#velementosintervenidos': {
                itemclick: me.obtenerViewUnidadesConstructivas
            },
            /*'#vunidadesconstructivas': {
                itemclick: me.obtenerDetalleMaterialesManoObra
            },*/
            '#maintab ejecutadocontratistaprincipal panel form button[text=Nuevo]': {
                click: me.nuevoRegistroEjecutadoContratista
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Editar]': {
                click: me.editarRegistro
            },
            '#maintab ejecutadocontratistaprincipal panel form button[action=verobservaciones]': {
                click: me.mostrarRegistrosObservados
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Guardar]': {
                click: me.guardarCambiosRegistro
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Aprobar]': {
                click: me.mostrarAprobarRechazar
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Rechazar]': {
                click: me.mostrarAprobarRechazar
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Imprimir <br>OT]': {
                click: me.imprimirOrdenTrabajo
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Ejecutar <br>OT]': {
                click: me.ejecutarOrdenTrabajo
            },
            '#maintab ejecutadocontratistaprincipal panel form button[text=Devolucion<br>Materiales]': {
                click: me.devolucionMateriales
            },
            'window #comboposte': {
                select: me.obtenerComboUnidadesConstructivas
            },
            'window #comboconductor': {
                select: me.obtenerFormacionConductor
            },
            'window #combouc': {
                select: me.obtenerPresupuesto
            },
            'window button[action=save]': {
                click: me.guardarDetalleEjecutadoContratista
            },
            'grid button[action=addMaterial]': {
                click: me.btnAdicionarMaterial
            },
            'grid button[action=addManoObra]': {
                click: me.btnAdicionarManoObra
            },
            'grid button[action=addPresupuesto]': {
            click: me.btnAdicionarPresupuesto
            },
            'window #btnuc': {
                click: me.cargarVentanaUC
            },
            '#winAddUc': {
                hide: me.actualizarComboUc
            },
            'button[action=addElementoIntervenido]': {
                click: me.agregarElementoIntervenido
            },
            'button[action=addUnidadConstructiva]': {
                click: me.agregarUnidadConstructiva
            },
            '#winAddUc': {
                hide: me.actualizarUnidadesConstructivas
            },

            '#winAddPoste': {
                hide: me.actualizarElementosIntervenidos
            }
        });

        //me.getGridOTsContratista().store.load({ params: { ESTADO: 'EN_EJEC', TIPO_OT: 'REPARACION_REEMPLAZO' } });
        //me.getGridOTsContratista().store.setExtraParam('ESTADO', 'EN_EJEC');
        Funciones.checkTimeout();
        me.getGridOTsContratista().store.setExtraParams({tiposOT :  ['REPARACION_REEMPLAZO','PROYECTO']});
        me.getGridOTsContratista().store.load();
    },

    addContent: function () {
        this.container.add({
            xtype: 'ejecutadocontratistaprincipal',
            itemId: 'ejecutadocontratistamain'
        });
    },

    cargarOTsContratista: function () {
        Funciones.checkTimeout();
        var me = this;
        //me.getGridOTsContratista().store.setExtraParam('ESTADO', 'EN_EJEC');
        me.getGridOTsContratista().store.setExtraParam('TIPO_OT', 'REPARACION_REEMPLAZO');
        me.getGridOTsContratista().store.load();
        me.getViewElementosIntervenidos().store.removeAll();
        me.getViewUnidadesConstructivas().store.removeAll();
    },

    mostrarTrabajoEjecutado: function (grid, rowIndex, colIndex) {
        Funciones.checkTimeout();
        var me = this;
        var selectionModel = grid.getSelectionModel(), record;
        selectionModel.select(rowIndex);
        record = selectionModel.getSelection()[0];
        btnnuevo = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Nuevo]')[0];
        btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
        btnguardar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Guardar]')[0];
        btnaprobar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Aprobar]')[0];
        btnrechazar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Rechazar]')[0];
        if (record.get('REPORTE_CONTRATISTA') == 'APROBADO') {
            btnnuevo.disable();
            btneditar.disable();
            btnguardar.disable();
            me.modoConsulta(true, false);
            me.bloquear(false);
        } else if (record.get('REPORTE_CONTRATISTA') == 'RECHAZADO') {
            //btnnuevo.disable();
            //btneditar.enable();
            me.modoConsulta(false, true);
            btnguardar.enable();
            me.bloquear(false);
        } else if (record.get('REPORTE_CONTRATISTA') == 'CORREGIDO') {
            me.modoConsulta(false, true);
            btnguardar.enable();
            me.bloquear(false);
        } else if (record.get('REPORTE_CONTRATISTA') == 'NO_REPORTE') {
            btnnuevo.disable();
            btneditar.disable();
            if (record.get('ESTADO') == 'EN_EJEC') {
                me.modoConsulta(false, true);
                btnobservados = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel button[action=verobservaciones]')[0];
                btnemail = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel button[action=notificarValoracion]')[0];
                btnobservados.disable();
                btnemail.disable();
                btnguardar.enable();
                me.bloquear(false);
            } else {
                //btnguardar.disable();
                me.bloquear(true);
            }
        } else {
            btnnuevo.disable();
            btneditar.enable();
            me.modoConsulta(false, true);
            me.bloquear(false);
            btnguardar.enable();
        }
        me.obtenerCabeceraEjecutadoContratista(record);
        me.obtenerElementosIntervenidosContratista(record.get('ID_OT'));
        me.getViewUnidadesConstructivas().store.removeAll();
        Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel #gridmateriales')[0].getStore().removeAll();
        Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel #gridmanoobra')[0].getStore().removeAll();
    },

    buscarOrdenTrabajoKeyEnter: function (field, event, options) {
        Funciones.checkTimeout();
        var me = this;
        if (event.getCharCode() === event.ENTER) {
            grid = me.getGridOTsContratista();
            //grid.store.limpiarParametros();
            grid.store.load({ params: { /*ESTADO: 'EN_EJEC',*/ Contiene: field.getValue() , start: 0, page: 1 } });
        }
    },

    buscarOrdenTrabajo: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        var field = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel form textfield')[0];
        grid = me.getGridOTsContratista();
        grid.store.load({ params: { /*ESTADO: 'EN_EJEC',*/ Contiene: field.getValue(), start: 0, page: 1 } });
    },

    obtenerCabeceraEjecutadoContratista: function (record) {
        Funciones.checkTimeout();
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerCabeceraEjecutadosContratista',
            params: { ID_OT: record.get('ID_OT') },
            method: 'GET',
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if (data.data != null) {
                    data.data.INCR_EMER == 'SI' ? Ext.getCmp('checkboxemergencia').setValue(true) : Ext.getCmp('checkboxemergencia').setValue(false);
                    data.data.INCR_TERR == 'SI' ? Ext.getCmp('checkboxterreno').setValue(true) : Ext.getCmp('checkboxterreno').setValue(false);
                    me.getHideIdCabecera().setValue(data.data.ID_TE);
                    me.getHideEstado().setValue(data.data.ESTADO);
                    me.getFechaEjecucion().setValue(data.data.FECHA_EJE_INI);
                    me.getDistancia().setValue(data.data.DISTANCIA);
                    /* Setear solo de lectura cabecera */
                    me.readOnlyCabecera(false);
                    if (record.get('REPORTE_CONTRATISTA') != 'APROBADO') {
                        btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
                        btneditar.enable();
                    } else {
                        me.readOnlyCabecera(true);
                    }
                } else {
                    Ext.getCmp('checkboxemergencia').setValue(false);
                    Ext.getCmp('checkboxterreno').setValue(false);
                    me.getFechaEjecucion().setValue(null);
                    me.getDistancia().setValue(null);
                    me.getViewUnidadesConstructivas().store.removeAll();
                    me.getGridMateriales().store.removeAll();
                    me.getGridManoObra().store.removeAll();
                    record.get('ESTADO') == 'EN_EJEC' ? me.readOnlyCabecera(false) : me.readOnlyCabecera(true);
                    btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
                    btneditar.disable();
                }
            }
        });
        var formcabecera = me.getCabecera();
        formcabecera.getForm().loadRecord(record);
    },

    obtenerElementosIntervenidosContratista: function (id) {
        Funciones.checkTimeout();
        var me = this;
        me.getOrdenesTrabajoElementosIntervenidosContratistaStore().load({ params: { ID_OT: id } });
    },

    obtenerViewUnidadesConstructivas: function (view, record, item, index, event, options) {
        Funciones.checkTimeout();
        var me = this;
        var gridmateriales = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmateriales')[0];
        var gridmanoobra = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmanoobra')[0];

        if (record.get('ID_POSTE')) {
            gridmateriales.store.load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'ITEM' } });
            gridmanoobra.store.load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'MO' } });

            me.ocultarColumnasGrid(gridmateriales, true, false, 'POSTE');
            me.ocultarColumnasGrid(gridmanoobra, true, false, 'POSTE'); 
            me.getOrdenesTrabajoUnidadesConstructivasIntervenidasContratistaStore().load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_POSTE') } });
        } else {
            me.getOrdenesTrabajoUnidadesConstructivasIntervenidasContratistaStore().load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_CONDUCTOR') } });
            gridmateriales.store.load({ params: { ID_TE: record.get('ID_TE'), ID_CONDUCTOR: record.get('ID_CONDUCTOR'), TIPO_PROD: 'ITEM' } });
            gridmanoobra.store.load({ params: { ID_TE: record.get('ID_TE'), ID_CONDUCTOR: record.get('ID_CONDUCTOR'), TIPO_PROD: 'MO' } });
            me.ocultarColumnasGrid(gridmateriales, true, false, 'CONDUCTOR');
            me.ocultarColumnasGrid(gridmanoobra, true, false, 'CONDUCTOR');
        }
    },

    obtenerDetalleMaterialesManoObra: function (view, record, item, index, event, options) {
        Funciones.checkTimeout();
        var me = this;
        var gridmateriales = me.getGridMateriales();
        gridmateriales.store.load({ params: { ID_TE: me.getHideIdCabecera().getValue(), ID_POSTE: record.get('ID_POSTE'), ID_UC: record.get('ID_UC'), TIPO_PROD: 'ITEM' } });

        var gridmanoobra = me.getGridManoObra();
        gridmanoobra.store.load({ params: { ID_TE: me.getHideIdCabecera().getValue(), ID_POSTE: record.get('ID_POSTE'), ID_UC: record.get('ID_UC'), TIPO_PROD: 'MO' } });
    },

    nuevoRegistroEjecutadoContratista: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        var form = btn.up('form');
        var grid = me.getGridOTsContratista();
        var elementos = me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0];
        if (grid.getSelectionModel().getSelection()[0] && me.validarCabecera(me.getFechaEjecucion().getValue(), me.getDistancia().getValue(), elementos) == 'Satisfactorio') {
            var record = grid.getSelectionModel().getSelection()[0];
            var ot = record.get('ID_OT');
            var win = Ext.widget('windownuevoregistro', { modal: true });
            var comboposte = Ext.ComponentQuery.query('window #comboposte')[0];
            var comboconductor = Ext.ComponentQuery.query('window #comboconductor')[0];
            comboposte.store.setExtraParam('ID_OT', ot);
            comboposte.store.load();
            comboconductor.store.setExtraParam('ID_OT', ot);
            comboconductor.store.load();
            win.show();
        } else {
            if (!grid.getSelectionModel().getSelection()[0]) {
                msg = '<b>Seleccione una Orden de Trabajo</b>';
            } else {
                msg = me.validarCabecera(me.getFechaEjecucion().getValue(), me.getDistancia().getValue(), elementos);
            }
            Ext.MessageBox.show({
                title: 'Completar datos',
                msg: 'Por favor! complete primero los siguientes datos: <br />' + msg,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    obtenerComboUnidadesConstructivas: function (combo, records) {
        Funciones.checkTimeout();
        var me = this;
        var record = combo.getSelectedRecord();
        var ot = me.getIdOt().getValue();
        var combouc = Ext.ComponentQuery.query('window #combouc')[0];
        if (combouc.isDisabled()) {
            combouc.enable();
            combouc.setValue(null);
            me.getComboConductor().setValue(null);
            me.getFieldFormacion().setValue(null);
            me.getFieldFormacion().disable();
        } else {
            combouc.setValue(null);
        }
        combouc.store = this.getPostesUnidadesConstructivasStore().load({ params: { ID_POSTE: record.get('ID_POSTE') } });
        /*Para cargar items de materiales y mano de obra, asociados solo a los postes y no a una unidad constructiva*/    
        var gridmateriales = Ext.ComponentQuery.query('window tabpanel #gridmaterialespresupuesto')[0];
        var gridmanoobra = Ext.ComponentQuery.query('window tabpanel #gridmanoobrapresupuesto')[0];

        var store = Ext.create('App.Store.OrdenesTrabajo.DetallesPresupuesto');
        store.load({
          scope: this,
          params: { ID_OT: record.get('ID_OT'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'ITEM' },
          callback: function (records, operation, success) {
              if (operation.resultSet.count > 0) {
                  for (var i = 0; i < operation.resultSet.count; i++) {
                      if (records[i].get('ID_UC') == 0 && !me.buscarExiste(records[i].get('IDPRODUCTO'), gridmateriales.store)) {
                          var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                              ID_TE: me.getHideIdCabecera().getValue(),
                              ID_OT: ot,
                              ID_POSTE: record.get('ID_POSTE'),
                              COD_POSTE: record.get('COD_POSTE'),
                              ID_UC: records[i].get('ID_UC'),
                              CODIGO_UC: records[i].get('COD_UC'),
                              ID_CONDUCTOR: records[i].get('ID_CONDUCTOR'),
                              COD_CONDUCTOR: records[i].get('COD_CONDUCTOR'),
                              TIPO_PROD: records[i].get('TIPO_PROD'),
                              IDPRODUCTO: records[i].get('IDPRODUCTO'),
                              COD_PROD: records[i].get('COD_PROD'),
                              DESC_PROD: records[i].get('DESC_PROD'),
                              UNID_PROD: records[i].get('UNID_PROD'),
                              COSTO_UNIT: records[i].get('COSTO_UNIT'),
                              CANT_PRE: records[i].get('CANT_PRE'),
                              CANT_EJE: 0,
                              OBSERVACION: records[i].get('OBSERVACION'),
                          });
                          gridmateriales.store.add(pre);
                          var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                          if (gridmateriales.store.count() > 0) {
                              btn.enable();
                          } else {
                              btn.disable();
                          }
                      }
                  }
              }
          }
      });

      store.load({
          scope: this,
          params: { ID_OT: record.get('ID_OT'), ID_POSTE: record.get('ID_POSTE'), TIPO_PROD: 'MO' },
          callback: function (records, operation, success) {
              if (operation.resultSet.count > 0) {
                  for (var i = 0; i < operation.resultSet.count; i++) {
                      if (records[i].get('ID_UC') == 0 && !me.buscarExiste(records[i].get('IDPRODUCTO'), gridmanoobra.store)) {
                          var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                              ID_TE: me.getHideIdCabecera().getValue(),
                              ID_OT: ot,
                              ID_POSTE: record.get('ID_POSTE'),
                              COD_POSTE: record.get('COD_POSTE'),
                              ID_UC: records[i].get('ID_UC'),
                              CODIGO_UC: records[i].get('COD_UC'),
                              ID_CONDUCTOR: records[i].get('ID_CONDUCTOR'),
                              COD_CONDUCTOR: records[i].get('COD_CONDUCTOR'),
                              TIPO_PROD: records[i].get('TIPO_PROD'),
                              IDPRODUCTO: records[i].get('IDPRODUCTO'),
                              COD_PROD: records[i].get('COD_PROD'),
                              DESC_PROD: records[i].get('DESC_PROD'),
                              UNID_PROD: records[i].get('UNID_PROD'),
                              COSTO_UNIT: records[i].get('COSTO_UNIT'),
                              CANT_PRE: records[i].get('CANT_PRE'),
                              CANT_EJE: 0,
                              OBSERVACION: records[i].get('OBSERVACION'),
                          });
                          gridmanoobra.store.add(pre);
                          var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                          if (gridmanoobra.store.count() > 0) {
                              btn.enable();
                          } else {
                              btn.disable();
                          }
                      }
                  }
              }
          }
      });
    },

    obtenerFormacionConductor: function(combo, records){
        var me = this;
        if (me.getFieldFormacion().isDisabled) {
            me.getFieldFormacion().enable();
            me.getComboPoste().setValue(null);
            me.getComboUnidadConstructiva().setValue(null);
            me.getComboUnidadConstructiva().disable();
        }
        me.getFieldFormacion().setValue(records[0].get('FORMACION'));
        me.obtenerPresupuesto(combo, records);
    },

    obtenerPresupuesto: function (combo, records) {
        Funciones.checkTimeout();
        var me = this;
        var record = combo.getSelectedRecord();
        var ot = me.getIdOt().getValue();
        var gridmateriales = Ext.ComponentQuery.query('window #gridmaterialespresupuesto')[0];
        var gridmanoobra = Ext.ComponentQuery.query('window #gridmanoobrapresupuesto')[0];

        var store = Ext.create('App.Store.OrdenesTrabajo.DetallesPresupuesto');
        me.cargarGrid(store, ot, record.get('ID_POSTE'), record.get('ID_UC'), record.get('ID_CONDUCTOR'), 'ITEM', gridmateriales, record);
        me.cargarGrid(store, ot, record.get('ID_POSTE'), record.get('ID_UC'), record.get('ID_CONDUCTOR'), 'MO', gridmanoobra, record);
        var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
        if (gridmateriales.store.count() > 0 || gridmanoobra.store.count() > 0) {
            btn.enable();
        } else {
            btn.disable();
        }
    },

    guardarDetalleEjecutadoContratista: function(btn) {
        Funciones.checkTimeout();
        var me = this;
        var win = btn.up('window');
        var gridmateriales = win.down('#gridmaterialespresupuesto');
        var gridmanoobra = win.down('#gridmanoobrapresupuesto');
        var storemateriales = gridmateriales.getStore();
        var storemanoobra = gridmanoobra.getStore();
        if (storemateriales.count() > 0 || storemanoobra.count() > 0) {
            me.sincronizarStoresGrids(gridmateriales, gridmanoobra);
            win.close();
        } else {
            Ext.Msg.show({
                title: 'No existen registros para grabar',
                msg: 'Usted debe seleccionar por lo menos <br/> un item de Material o Mano de Obra',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            btn.disable();
        }
    },

    cargarGrid: function (store, ot, poste, uc, conductor, producto, grid, record) {
        var me = this;
        //var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
        store.load({
            params: { ID_OT: ot, ID_POSTE: poste, ID_UC: uc, ID_CONDUCTOR: conductor, TIPO_PROD: producto },
            callback: function (records, operation, success) {
                if (operation.resultSet.count > 0) {
                    for (var i = 0; i < operation.resultSet.count; i++) {
                        if (!me.buscarExiste(records[i].get('IDPRODUCTO'), grid.store)) {
                            var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                                ID_TE: me.getHideIdCabecera().getValue(),
                                ID_OT: ot,
                                ID_POSTE: poste,
                                COD_POSTE: record.get('COD_POSTE'),
                                ID_UC: uc,
                                CODIGO_UC: record.get('COD_UC'),
                                ID_CONDUCTOR: conductor,
                                COD_CONDUCTOR: record.get('COD_CONDUCTOR'),
                                TIPO_PROD: records[i].get('TIPO_PROD'),
                                IDPRODUCTO: records[i].get('IDPRODUCTO'),
                                COD_PROD: records[i].get('COD_PROD'),
                                DESC_PROD: records[i].get('DESC_PROD'),
                                UNID_PROD: records[i].get('UNID_PROD'),
                                COSTO_UNIT: records[i].get('COSTO_UNIT'),
                                CANT_PRE: records[i].get('CANT_PRE'),
                                CANT_EJE: 0,
                                OBSERVACION: records[i].get('OBSERVACION'),
                            });
                            grid.store.add(pre);
                        }
                        /*if (btn.isDisabled()) {
                            btn.enable();
                        }*/
                    }
                }
            }
        });
    },

    btnAdicionarMaterial: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        var win = btn.up('window');
        var gridmateriales = btn.up('grid');

        if (win != null) {
            if (/*me.getComboUnidadConstructiva().getValue()*/me.getComboPoste().getValue() || me.getComboConductor().getValue()) {
                var record = me.getComboUnidadConstructiva().getValue() == null ? me.getComboPoste().getValue() == null ?  me.getComboConductor().getSelectedRecord() : me.getComboPoste().getSelectedRecord() : me.getComboUnidadConstructiva().getSelectedRecord();
                me.mostrarVentanaMaterialesManoObra('GridMateriales', 'Lista de Materiales ERP', gridmateriales, record);
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste o Conductor </br>Unidad Constructiva</b>")
            }
        } else {
            if (me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]) {
                if (me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] || me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0].get('ID_CONDUCTOR') != null) {
                    var record = me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] != null ? me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] : me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]
                    me.mostrarVentanaMaterialesManoObra('GridMateriales', 'Lista de Materiales ERP', gridmateriales, record);
                } else {
                    Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: </br><b>Unidad Constructiva</b>")
                }
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste</br>o Conductor</b>")
            }
        }
    },

    btnAdicionarManoObra: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        var win = btn.up('window');
        var gridmanoobra = btn.up('grid');
        if (win != null) {
            if (/*me.getComboUnidadConstructiva().getValue()*/me.getComboPoste().getValue() || me.getComboConductor().getValue()) {
                var record = me.getComboUnidadConstructiva().getValue() == null ? me.getComboPoste().getValue() == null ? me.getComboConductor().getSelectedRecord() : me.getComboPoste().getSelectedRecord() : me.getComboUnidadConstructiva().getSelectedRecord();
                //var record = me.getComboUnidadConstructiva().getValue() != null ? me.getComboUnidadConstructiva().getSelectedRecord() : me.getComboConductor().getSelectedRecord();
                me.mostrarVentanaMaterialesManoObra('GridManoObra', 'Lista de Mano de Obra ERP', gridmanoobra, record);
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste o Conductor </br>Unidad Constructiva</b>")
            }
        } else {
            if (me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] || me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]) {
                var record = me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] != null ? me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0] : me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]
                me.mostrarVentanaMaterialesManoObra('GridManoObra', 'Lista de Mano de Obra ERP', gridmanoobra, record);
            } else {
                Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste y/o Unidad Constructiva </br>o Conductor</b>")
            }
        }
    },

    mostrarVentanaMaterialesManoObra: function (tipoproducto, title, gridtab, record) {
        Funciones.checkTimeout();
        var me = this;
            var gridMaterialesManoObra = Ext.create('App.View.Postes.GridMateriales', { title: null, iconCls: null, opcion: tipoproducto, imagenes: false });
            var winMaterialesManoObra = Ext.widget('window', {
                itemId: 'winproductoserp',
                layout: 'fit',
                iconCls: 'application_view_list',
                title: title,
                modal: true,
                width: 600,
                resizable: false,
                items: [{
                    xtype: gridMaterialesManoObra
                }],
                buttons: [{
                    text: 'Aceptar',
                    handler: function () {
                        var win = this.up('window');
                        var grid = win.down('grid');
                        if (grid.getSelectionModel().getSelection()[0]) {
                            var records = grid.getSelectionModel().getSelection()[0];
                            tipo = tipoproducto == 'GridMateriales' ? 'ITEM' : 'MO';
                            me.nuevoMaterialManoObra(record, records, gridtab, tipo);
                            var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                            if (btn != null && gridtab.store.count() > 0) {
                                btn.enable();
                            }
                            win.close();
                        } else {
                            Ext.Msg.alert("Error", "Primero seleccione 1 Material del Grid")
                        }
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('window').close(); }
                }],
            });
            winMaterialesManoObra.show();
    },

    nuevoMaterialManoObra: function (record, records, grid, tipo) {
        Funciones.checkTimeout();
        var me = this;
        var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
        var model = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
            ID_TE: me.getHideIdCabecera().getValue(),
            ID_OT: me.getIdOt().getValue(),
            ID_POSTE: record.get('ID_POSTE'),
            COD_POSTE: record.get('COD_POSTE'),
            ID_UC: record.get('ID_UC'),
            CODIGO_UC: record.get('COD_UC'),
            ID_CONDUCTOR: record.get('ID_CONDUCTOR'),
            COD_CONDUCTOR: record.get('COD_CONDUCTOR'),
            TIPO_PROD: tipo,
            IDPRODUCTO: records.get('IDPRODUCTO'),
            COD_PROD: records.get('COD_ALTERNATIVO'),
            DESC_PROD: records.get('DESCRIPCION'),
            UNID_PROD: records.get('IDUNIDAD'),
            COSTO_UNIT: records.get('COSTO_UNIT'),
            CANT_PRE: records.get('CANT_PRE'),
            CANT_EJE: 0,
            OBSERVACION: records.get('OBSERVACION'),
        });
        grid.store.add(model);
    },

    cargarVentanaUC: function () {
        var me = this;
        var comboPoste = me.getComboPoste();
        var record = comboPoste.getSelectedRecord();
        if (comboPoste.getValue() != null) {
            if (me.winPoste == null) {
                me.winPoste = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddUc' });
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

    actualizarComboUc: function () {
        var me = this;
        var comboUc = me.getComboUnidadConstructiva();
        comboUc.setValue(null);
        comboUc.store.load({ params: { ID_POSTE: me.getComboPoste().getValue() } });
    },

    validarCabecera: function (fecha, distancia, elementosintervenidos) {
        var datos = [fecha, distancia, elementosintervenidos];
        var valores = ["<b>FECHA EJECUCION</b>", "<b>DISTANCIA</b>","<b>ELEMENTO INTERVENIDO (Postes/Conductores)</b>"]
        if (fecha != null && distancia != null && elementosintervenidos != null) {
            return 'Satisfactorio'
        } else {
            var mensaje = '';
            for (var i = 0; i < datos.length; i++) {
                if (datos[i] == null) {
                    mensaje += valores[i] + '</br>';
                }
            }
            return mensaje
        }

        /* if (fecha != null && distancia != null) {
            return 'Satisfactorio'
        } else {
            if(fecha == null && distancia != null){
                var mensaje =  '<b>Fecha Ejecucion</b>';
            }
            if(fecha != null && distancia == null){
                var mensaje = '<b>Distancia</b>';
            }
            if (fecha == null && distancia == null) {
                var mensaje = '<b>Fecha Ejecucion </br>Distancia</b>';
            }
            return mensaje
        }*/
    },

    buscarExiste: function (item, store) {
        for (var i = 0; i < store.getCount() ; i++) {
            var comparar = store.getAt(i).data.IDPRODUCTO;
            if (item == comparar) {
                return true;
            }
        }
    },

    ocultarColumnasGrid: function (grid, v, f, elemento) {
        if (elemento == 'POSTE') {
            grid.columns[0].setVisible(v);
            grid.columns[1].setVisible(v);
            grid.columns[2].setVisible(v);
        } else {
            grid.columns[0].setVisible(v);
            grid.columns[1].setVisible(v);
            grid.columns[2].setVisible(v);
        }
    },

    readOnlyCabecera: function (v) {
        var me = this;
        Ext.getCmp('checkboxemergencia').setReadOnly(v);
        Ext.getCmp('checkboxterreno').setReadOnly(v);
        me.getFechaEjecucion().setReadOnly(v);
        me.getDistancia().setReadOnly(v);
    },

    editarRegistro: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        me.readOnlyCabecera(false);
        btnguardar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Guardar]')[0];
        btnguardar.enable();
        btn.disable();
    },

    guardarCambiosRegistro: function (btnguardar) {
        Funciones.checkTimeout();
        var me = this;
        var grid = me.getGridOTsContratista();
        console.log(grid.getSelectionModel().getSelection()[0].get('ESTADO'));
        var elementos = me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0];
        if (grid.getSelectionModel().getSelection()[0] && me.validarCabecera(me.getFechaEjecucion().getValue(), me.getDistancia().getValue(), elementos) == 'Satisfactorio') {
            var gridmateriales = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel tabpanel #gridmateriales')[0];
            var gridmanoobra = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel tabpanel #gridmanoobra')[0];
            me.sincronizarStoresGrids(gridmateriales, gridmanoobra);
            //me.readOnlyCabecera(false);
            //btnguardar.disable();
            btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
            btneditar.enable();
        } else {
            if (!grid.getSelectionModel().getSelection()[0]) {
                msg = '<b>Seleccione una Orden de Trabajo cuyo Estado es EN_EJEC</b></br>(color de fondo celeste)';
            } else {
                msg = me.validarCabecera(me.getFechaEjecucion().getValue(), me.getDistancia().getValue(), elementos);
            }
            Ext.MessageBox.show({
                title: 'Completar datos',
                msg: 'Por favor! complete primero los siguientes datos: <br />' + msg,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    sincronizarStoresGrids: function (gridmateriales, gridmanoobra) {
        var me = this;
        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de guardar los datos?', function (btn) {
            if (btn == 'yes') {
                var storemateriales = gridmateriales.getStore();
                var storemanoobra = gridmanoobra.getStore();
                gridots = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel form grid')[0];
                var record = gridots.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    url: Constantes.HOST + 'OrdenesTrabajo/GuardarCabeceraEjecutadoContratista',
                    params: {
                        ID_TE: me.getHideIdCabecera().getValue(),
                        ID_OT: record.get('ID_OT'),
                        FECHA_EJE_INI: me.getFechaEjecucion().getValue(),
                        FECHA_EJE_FIN: me.getFechaEjecucion().getValue(),
                        DISTANCIA: me.getDistancia().getValue(),
                        INCR_TERR: Ext.getCmp('checkboxterreno').getValue() == true ? Ext.getCmp('checkboxterreno').inputValue : Ext.getCmp('checkboxterreno').uncheckedValue,
                        INCR_EMER: Ext.getCmp('checkboxemergencia').getValue() == true ? Ext.getCmp('checkboxemergencia').inputValue : Ext.getCmp('checkboxemergencia').uncheckedValue
                    },
                    success: function (response, options) {
                        var data = Ext.decode(response.responseText);
                        if (data.success) {
                            gridmateriales.store.sync();
                            gridmanoobra.store.sync();
                            //me.readOnlyCabecera(true);
                        } else {
                            Ext.Msg.show({
                                title: 'Se ha producido un error',
                                msg: data.msg,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                        var record = me.getGridOTsContratista().getSelectionModel().getSelection()[0];
                        me.obtenerCabeceraEjecutadoContratista(record);
                        /*storedetalle = Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista');
                        storemateriales.each(function (record, index) {
                            storedetalle.add(record);
                        });

                        storemanoobra.each(function (record, index) {
                            storedetalle.add(record);
                        });

                        storedetalle.each(function (record, index) {
                            record.setDirty();
                        });
                        storedetalle.sync();*/
                    },

                    failure: function (response, options) {
                        console.dir(response);
                    }
                });
            }
        })
    },

    mostrarAprobarRechazar: function (btn) {
        var me = this;
        gridots = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel form grid')[0];
        if (gridots.getSelectionModel().getSelection()[0]) {

            var norequerido = btn.text == 'Aprobar' ? true : false;
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
                    xtype: 'textfield',
                    name: 'EST_ORIG',
                    value: me.getHideEstado().getValue(),
                    hidden: true
                },
                        {
                            xtype: 'textfield',
                            name: 'ID_TE',
                            value: me.getHideIdCabecera().getValue(),
                            hidden: true
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Motivo:',
                            name: 'OBSERV',
                            labelAlign: 'top',
                            flex: 1,
                            margins: '0',
                            allowBlank: norequerido
                        }],
                buttons: [{
                    text: 'Cancelar',
                    handler: function () {
                        this.up('form').getForm().reset();
                        this.up('window').close();
                    }
                }, {
                    text: btn.text,
                    handler: function () {
                        var form = this.up('form');
                        var record = form.getForm().getValues();
                        if (this.up('form').getForm().isValid()) {
                            Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de ' + btn.text + ' el Reporte del Trabajo Ejecutado?', function (button) {
                                if (button == 'yes') {
                                    var estadodestino = btn.text == 'Aprobar' ? 'APROBADO' : 'RECHAZADO';
                                    Ext.Ajax.request({
                                        url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarEjecutadoContratista',
                                        params: { ID_TE: record.ID_TE, OPERACION: btn.text, EST_ORIG: record.EST_ORIG, EST_DEST: estadodestino, OBSERV: record.OBSERV },
                                        success: function (response, options) {
                                            var data = Ext.decode(response.responseText);
                                            if (data.success) {
                                                Ext.MessageBox.show({
                                                    title: 'Felicidades',
                                                    msg: data.msg,
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.INFO
                                                });
                                                /*actualizo el grid para mostrar el icono del reporte*/
                                                grid = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form grid')[0];
                                                grid.store.load();
                                            } else {
                                                Ext.MessageBox.show({
                                                    title: 'Advertencia',
                                                    msg: data.msg,
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.WARNING
                                                });
                                            }
                                        }
                                    });

                                }
                            })
                            this.up('form').getForm().reset();
                            this.up('window').close();
                        } else {
                            Ext.MessageBox.alert('Faltan datos importantes', 'Por favor! ingrese el Motivo');
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Descripcion',
                closeAction: 'hide',
                width: 300,
                height: 300,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
            win.show();
        } else {
            Ext.MessageBox.alert('Error', 'Primero seleccione una Orden de Trabajo');
        }

    },

    btnAdicionarPresupuesto: function () {
        Funciones.checkTimeout();
        var me = this;
        if (me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]) {
            if (me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0]) {
                var record = me.getViewUnidadesConstructivas().getSelectionModel().getSelection()[0];
                me.obtenerPresupuesto2(record);
            } else {
                var record = me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0]
                var gridmateriales = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmateriales')[0];
                var gridmanoobra = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmanoobra')[0];

                var store = Ext.create('App.Store.OrdenesTrabajo.DetallesPresupuesto');
                store.load({
                    scope: this,
                    params: { ID_OT: record.get('ID_OT'), ID_POSTE: record.get('ID_POSTE'), ID_CONDUCTOR: record.get('ID_CONDUCTOR'), TIPO_PROD: 'ITEM' },
                    callback: function (records, operation, success) {
                        if (operation.resultSet.count > 0) {
                            for (var i = 0; i < operation.resultSet.count; i++) {
                                if (/*records[i].get('ID_UC') == 0 &&*/ !me.buscarExiste(records[i].get('IDPRODUCTO'), gridmateriales.store)) {
                                    var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                                        ID_TE: me.getHideIdCabecera().getValue(),
                                        ID_OT: record.get('ID_OT'),
                                        ID_POSTE: record.get('ID_POSTE'),
                                        COD_POSTE: record.get('COD_POSTE'),
                                        ID_UC: records[i].get('ID_UC'),
                                        CODIGO_UC: records[i].get('CODIGO_UC'),  /* EL NOMBRE EN EL MODEL DEBERIA SER COD_UC*/
                                        ID_CONDUCTOR: records[i].get('ID_CONDUCTOR'),
                                        COD_CONDUCTOR: records[i].get('COD_CONDUCTOR'),
                                        TIPO_PROD: records[i].get('TIPO_PROD'),
                                        IDPRODUCTO: records[i].get('IDPRODUCTO'),
                                        COD_PROD: records[i].get('COD_PROD'),
                                        DESC_PROD: records[i].get('DESC_PROD'),
                                        UNID_PROD: records[i].get('UNID_PROD'),
                                        COSTO_UNIT: records[i].get('COSTO_UNIT'),
                                        CANT_PRE: records[i].get('CANT_PRE'),
                                        CANT_EJE: 0,
                                        OBSERVACION: records[i].get('OBSERVACION'),
                                    });
                                    gridmateriales.store.add(pre);
                                    /*var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                                    if (gridmateriales.store.count() > 0) {
                                        btn.enable();
                                    } else {
                                        btn.disable();
                                    }*/
                                }
                            }
                        } 
                    }
                });

                store.load({
                    scope: this,
                    params: { ID_OT: record.get('ID_OT'), ID_POSTE: record.get('ID_POSTE'), ID_CONDUCTOR: record.get('ID_CONDUCTOR'), TIPO_PROD: 'MO' },
                    callback: function (records, operation, success) {
                        if (operation.resultSet.count > 0) {
                            for (var i = 0; i < operation.resultSet.count; i++) {
                                if (/*records[i].get('ID_UC') == 0 &&*/ !me.buscarExiste(records[i].get('IDPRODUCTO'), gridmanoobra.store)) {
                                    var pre = Ext.create('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
                                        ID_TE: me.getHideIdCabecera().getValue(),
                                        ID_OT: record.get('ID_OT'),
                                        ID_POSTE: record.get('ID_POSTE'),
                                        COD_POSTE: record.get('COD_POSTE'),
                                        ID_UC: records[i].get('ID_UC'),
                                        CODIGO_UC: records[i].get('CODIGO_UC'), /* EL NOMBRE EN EL MODEL DEBERIA SER COD_UC*/
                                        ID_CONDUCTOR: records[i].get('ID_CONDUCTOR'),
                                        COD_CONDUCTOR: records[i].get('COD_CONDUCTOR'),
                                        TIPO_PROD: records[i].get('TIPO_PROD'),
                                        IDPRODUCTO: records[i].get('IDPRODUCTO'),
                                        COD_PROD: records[i].get('COD_PROD'),
                                        DESC_PROD: records[i].get('DESC_PROD'),
                                        UNID_PROD: records[i].get('UNID_PROD'),
                                        COSTO_UNIT: records[i].get('COSTO_UNIT'),
                                        CANT_PRE: records[i].get('CANT_PRE'),
                                        CANT_EJE: 0,
                                        OBSERVACION: records[i].get('OBSERVACION'),
                                    });
                                    gridmanoobra.store.add(pre);
                                    /*var btn = Ext.ComponentQuery.query('window button[action=save]')[0];
                                    if (gridmanoobra.store.count() > 0) {
                                        btn.enable();
                                    } else {
                                        btn.disable();
                                    }*/
                                }
                            }
                        } 
                    }
                });
            }
        } else {
            Ext.Msg.alert("Error", "Seleccione primero los siguientes datos: <b></br></br>Poste y/o Unidad Constructiva </br>o Conductor</b>")
        }
    },

    obtenerPresupuesto2: function (record) {
        Funciones.checkTimeout();
        var me = this;
        //var record = combo.getSelectedRecord();
        var ot = me.getIdOt().getValue();
        var gridmateriales = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmateriales')[0];
        var gridmanoobra = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #gridmanoobra')[0];

        var store = Ext.create('App.Store.OrdenesTrabajo.DetallesPresupuesto');
        me.cargarGrid(store, ot, record.get('ID_POSTE'), record.get('ID_UC'), record.get('ID_CONDUCTOR'), 'ITEM', gridmateriales, record);
        me.cargarGrid(store, ot, record.get('ID_POSTE'), record.get('ID_UC'), record.get('ID_CONDUCTOR'), 'MO', gridmanoobra, record);
    },

    imprimirOrdenTrabajo: function () {
        Funciones.checkTimeout();
        var me = this;
        record = me.getGridOTsContratista().getSelectionModel().getSelection()[0];
        if (record != null) {
                var recordsToSend = [];
                Ext.each(record, function (record) {
                    recordsToSend.push(Ext.apply({ ID: record.data.ID_OT }));
                });
                recordsToSend = Ext.JSON.encode(recordsToSend);
                window.open(Constantes.HOST + 'Reportes/ReporteOT?OTS=' + recordsToSend);
        } else {
            Ext.MessageBox.alert('Error', 'Seleccione una Orden de Trabajo para imprimir');
        }
    },

    ejecutarOrdenTrabajo: function () {
        Funciones.checkTimeout();
        var me = this;
        record = me.getGridOTsContratista().getSelectionModel().getSelection()[0];
        if (record != null && record.get('ESTADO') == 'EN_EJEC' && record.get('EST_TRAB_CONT') == 'APROBADO') {
            me.verVetanaEjecutarReparacionReemplazo(record);
        }
        else {
            mensaje = record == null ? 'Seleccione la Orden de Trabajo que desea dar por Ejecutado' : 'Seleccione una OT que cumpla las siguientes condiciones: </br> Estado: EN_EJEC </br> Reporte: APROBADO';
            Ext.MessageBox.alert('Error', mensaje);
        }
    },

    verVetanaEjecutarReparacionReemplazo: function (datosOT) {
        var me = this;
        if (me.winEjecutarOTRR == null) {
            me.winEjecutarOTRR = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Confirmar Ejecucion de OT' });
            me.formEjecutarOTRR = Ext.create("App.View.OrdenesTrabajo.FormMaterialesyMO", { botones: false, columns: 1, opcion: 'PrincipalInspectorCierre' });
            me.formEjecutarOTRR.CargarDatosPrincipalInspCierre(datosOT)
            me.winEjecutarOTRR.add(me.formEjecutarOTRR);
            me.winEjecutarOTRR.btn_guardar.on('click', me.GuardarEjecucion, this);
            me.winEjecutarOTRR.show();
        }
        else {
            me.formEjecutarOTRR.CargarDatosPrincipalInspCierre(datosOT)
            me.winEjecutarOTRR.show();
        }
    },

    GuardarEjecucion: function () {
        var me = this;
        if (me.formEjecutarOTRR.VerificarCierre()) {
            var data = me.formEjecutarOTRR.record;
            var params = { ID_OT: data.get('ID_OT'), TIPO_OT: data.get('TIPO_OT'), ESTADO_DESTINO: "EJECUTADA", ID_POSTE: 0, NRO_SOL: 0, listaCodSol: null, ID_OT_PT_INT: 0 };
            Funciones.AjaxRequestWin('OrdenesTrabajo', "GuardarEjecucionOrdenesTrabajo", me.winEjecutarOTRR, me.formEjecutarOTRR, me.getGridOTsContratista(), 'Esta Seguro dar por Ejecutada esta OT?', params, me.winEjecutarOTRR);
        }
        else {
            Ext.Msg.alert("Error", "No se puede dar por EJECUTADO la OT por que los datos son incorrectos");
        }
    },

    devolucionMateriales: function () {
        Funciones.checkTimeout();
        var me = this;
        record = me.getGridOTsContratista().getSelectionModel().getSelection()[0];
        if (record != null && record.get('ESTADO') == 'EN_EJEC' /*&& record.get('EST_TRAB_CONT') != 'APROBADO'*/) {
            me.verVentanaDevoluciones(record);
        }
        else {
            mensaje = record == null ? 'Seleccione una Orden de Trabajo' : 'Seleccione una OT que cumpla las siguientes condiciones: </br> Estado: EN_EJEC </br> Reporte: RECHAZADO O NUEVO';
            Ext.MessageBox.alert('Error', mensaje);
        }
    },

    verVentanaDevoluciones: function (OT) {
        var me = this;
        if (OT != null) {
            if (me.winDevolucion == null) {
                me.winDevolucion = Ext.create("App.Config.Abstract.Window", { botones: false });
                me.formDevolucion = Ext.create("App.View.OrdenesTrabajo.FormDevolucion", { botones: false, columns: 1, title: 'Datos de Devolucion de Materiales por OT' });
                me.formDevolucion.CargarDatos(OT);
                me.winDevolucion.add(me.formDevolucion);
                me.winDevolucion.show();
            }
            else {
                me.formDevolucion.CargarDatos(OT);
                me.winDevolucion.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione un registro");
        }
    },

    controlarBotones: function (nuevo, editar, guardar) {
        btnnuevo = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Nuevo]')[0];
        btneditar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Editar]')[0];
        btnguardar = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel form button[text=Guardar]')[0];

        btnnuevo.disable(nuevo);
        btneditar.disable(editar);
        btnguardar.disable(guardar);
    },

    bloquear: function (v) {
        var me = this;
        elementosintervenidos = Ext.ComponentQuery.query('#panelelementosintervenidos')[0];
        unidadesconstructivas = Ext.ComponentQuery.query('#panelunidadesconstructivas')[0];
        elementosintervenidos.setDisabled(v);
        unidadesconstructivas.setDisabled(v);
        //me.getCabecera().bloquearCabecera(true);
        //panel = Ext.ComponentQuery.query('#panelEdicion')[0];
        //panel.setDisabled(v);
    },

    modoConsulta: function (v, f) {
        var me = this;
        me.controlarBotones(v, v, v);
       // me.bloquear(f);
        btnobservados = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel button[action=verobservaciones]')[0];
        btnemail = Ext.ComponentQuery.query('#maintab ejecutadocontratistaprincipal panel button[action=notificarValoracion]')[0];
        btnpresupuesto = Ext.ComponentQuery.query('grid button[action=addPresupuesto]')[0];
        btnmaterial = Ext.ComponentQuery.query('grid button[action=addMaterial]')[0];
        btnmanoobra = Ext.ComponentQuery.query('grid button[action=addManoObra]')[0];
        btnaddElementoIntervenido = Ext.ComponentQuery.query('button[action=addElementoIntervenido]')[0];
        //btndeleteElementoIntervenido = Ext.ComponentQuery.query('button[action=deleteElementoIntervenido]')[0];
        btnaddUnidadConstructiva = Ext.ComponentQuery.query('button[action=addUnidadConstructiva]')[0];
        //btndeleteUnidadConstructiva = Ext.ComponentQuery.query('button[action=deleteUnidadConstructiva]')[0];
        btnobservados.setDisabled(v);
        btnemail.setDisabled(v);
        btnpresupuesto.setDisabled(v);
        btnmaterial.setDisabled(v);
        btnmanoobra.setDisabled(v);
        btnaddElementoIntervenido.setDisabled(v);
        //btndeleteElementoIntervenido.setDisabled(v);
        btnaddUnidadConstructiva.setDisabled(v);
        //btndeleteUnidadConstructiva.setDisabled(v);
    },

    itemmaterialesmanoobra: function (materiales, manoobra) {
        if (!materiales && !manoobra) {
            Ext.MessageBox.show({
                title: 'Informacion',
                msg: 'No se ha presupuestado ni Materiales ni Mano de Obra para este Item',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }
        if (!materiales && manoobra) {
            Ext.MessageBox.show({
                title: 'Informacion',
                msg: 'Este Item no tiene Materiales prespuestados </br> pero si tiene presupuestado Mano de Obra',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }
        if (materiales && !manoobra) {
            Ext.MessageBox.show({
                title: 'Informacion',
                msg: 'Este Item tiene Materiales prespuestados </br> pero no tiene presupuestado Mano de Obra',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }
    },

    agregarElementoIntervenido: function () {
        var me = this;
        record = me.getGridOTsContratista().getSelectionModel().getSelection()[0];
        if (record != null && record.get('ESTADO') == 'EN_EJEC' && record.get('EST_TRAB_CONT') != 'APROBADO') {
            var store = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajo');
            store.load({
                scope: this,
                params: { ID_OT: record.get('ID_OT') },
                callback: function (records, operation, success) {
                    if (operation.resultSet.count > 0) {
                        record = store.first();
                    }
                }
            });
            if (me.winPosteOT == null) {
                me.winPosteOT = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddPoste' });
                me.formConfigPuestoOT = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPosteOT' });
                me.formConfigPuestoOT.loadRecord(record);
                me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: record.get('ID_OT') });
                me.formConfigPuestoOT.grid.getStore().load();
                me.winPosteOT.add(me.formConfigPuestoOT);
                me.winPosteOT.show();
            }
            else {
                me.formConfigPuestoOT.getForm().reset();
                me.formConfigPuestoOT.loadRecord(record);
                me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: record.get('ID_OT') });
                me.formConfigPuestoOT.grid.getStore().load();
                me.winPosteOT.show();
            }
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Seleccione primero una Orden de Trabajo </br> <b>Estado:</b> EN_EJEC </br> <b>Reporte:</b> NUEVO, RECHAZADO, CORREGIDO',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },

    actualizarElementosIntervenidos: function () {
        var me = this;
        record = me.getGridOTsContratista().getSelectionModel().getSelection()[0];
        me.getViewElementosIntervenidos().store.load({ params: { ID_OT: record.get('ID_OT')} });
    },

    agregarUnidadConstructiva: function () {
        var me = this;
        record = me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0];
        if (record != null) {
            if (me.winPoste == null) {
                me.winPoste = Ext.create("App.Config.Abstract.Window", { itemId: 'winAddUc' });
                me.formConfigPuesto = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPoste' });
                me.formConfigPuesto.loadRecord(record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: record.get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.add(me.formConfigPuesto);
                me.winPoste.show();
            }
            else {
                me.formConfigPuesto.getForm().reset();
                me.formConfigPuesto.loadRecord(record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: record.get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione Primero un Poste para agregar una Unidad Constructiva")
        }
    },

    actualizarUnidadesConstructivas: function () {
        var me = this;
        record = me.getViewElementosIntervenidos().getSelectionModel().getSelection()[0];
        me.getViewUnidadesConstructivas().store.load({ params: { ID_TE: record.get('ID_TE'), ID_POSTE: record.get('ID_POSTE'), ID_CONDUCTOR: record.get('ID_CONDUCTOR') } });
    },

    mostrarRegistrosObservados: function () {
        var me = this;
        var gridObservados = Ext.create('App.view.OrdenesTrabajo.EjecutadoContratista.GridRegistrosObservados');
        gridObservados.store.load({ params: { ID_TE: me.getCabecera().idcabecera.getValue() } });
        var winObservados = Ext.widget('window', {
            layout: 'fit',
            title: '',
            modal: true,
            width: 700,
            resizable: false,
            items: [ gridObservados ],
            /*buttons: [{
                text: 'Aceptar',
                action: 'add-items'
            }, {
                text: 'Cancelar',
                handler: function () { this.up('.window').close(); }
            }],*/
        });
        //winObservados.setOpacity(0); //le damos opacidad 0 al elemento
       // winObservados.fadeIn();
        winObservados.show();
    }

});