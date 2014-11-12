Ext.define("App.View.OrdenesTrabajo.FormPlanillaV1", {
    extend: "App.Config.Abstract.Form",
  //  title: "Detalle de la Planilla de Inspeccion",
    cargarStores: true,
    //columns: 2,
    opcion: '',
    winUC: null,
    winDetalle: null,
    initComponent: function () {
        var me = this;

        if (me.opcion == "FormPlanilla") {
            me.title = "Crear Detalles de Planilla";
            me.CargarFormPlanilla();
            me.eventosPlanilla();
            //me.CargarVentanaDetalleItem();
            //me.winPrincipal.btn_guardar.on('click', me.GuardarPlanilla, this);
        }
        else if (me.opcion == "FormPlanillaAprobarRechazar") {
            me.CargarFormPlanillaConsulta();
            me.EventoConsulta();
        }
        else if (me.opcion == "FormPlanillaConsulta") {
            me.CargarFormPlanillaConsulta();
            me.EventoConsulta();
        }
        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    RevisionPoste: function (btn) {
        var me = this;
        var rec = me.gridDetallePlanilla.getSelectionModel().getSelection()[0];
        var veri = btn.getItemId() == "Verificado" ? true : false;
        Funciones.AjaxRequestGridSC("OrdenesTrabajo", "GuardarVerificacionPoste", me, { ID_PLA: rec.get('ID_PLA'), ID_PLA_DET: rec.get('ID_PLA_DET') , VERIFICADO : veri ?"VERIFICADO" : ""}, null, null, false);
        rec.set('VERIFICADO', veri);
        rec.set('OBSERV', veri ? "VERIFICADO" : "");
        //alert("Confirmar");
    },
    PrioridadPoste: function (btn) {
        var me = this;
        var prioridad = btn.getItemId() == "Alta" ? true : false;
        var rec = me.gridDetallePlanilla.getSelectionModel().getSelection()[0];
        Funciones.AjaxRequestGridSC("OrdenesTrabajo", "GuardarPlanillaInspeccionPrioridad", me, { ID_PLA: rec.get('ID_PLA'), ID_PLA_DET: rec.get('ID_PLA_DET') , PRIORIDAD : prioridad }, null, null,false)
        rec.set('PRIORIDAD', prioridad);
        //alert("Confirmar");
    },
    //modifcacion de la interfaz principal de Planilla Registro
    CargarFormPlanilla: function () {
        var me = this;
        //vamos a instanciar los botones para las celdas del grid
        var ConfirmAction = Ext.create('Ext.Action', {
            iconCls: 'accept',
            itemId: 'Verificado',
            text: 'Verificar',
            scope: this,
            handler: me.RevisionPoste
        });
        var NoConfirmAction = Ext.create('Ext.Action', {
            iconCls: 'bullet_error',
            itemId: 'NoVerificado',
            text: 'No Verificar',
            scope: this,
            handler: me.RevisionPoste
        });
        var PrioridadAltaAction = Ext.create('Ext.Action', {
            iconCls: 'flag_red',
            itemId : 'Alta',
            text: 'Prioridad Alta',
            scope: this,
            handler: me.PrioridadPoste
        });
        var PrioridadBajaAction = Ext.create('Ext.Action', {
            iconCls: 'flag_green',
            itemId: 'Baja',
            text: 'Prioridad Baja',
            scope: this,
            handler: me.PrioridadPoste
        });
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [
                ConfirmAction,
                NoConfirmAction,
                PrioridadAltaAction,
                PrioridadBajaAction
                //sellAction
            ]
        });
        
        //
        me.formCabeceraPlanilla = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCabeceraPlanilla', colspan: 2, columns: 4, icono: false });
        me.gridDetallePlanilla = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridPlanillaMTyBTV1",
            width: 680,
            editar: true,
            height: 450,
            colspan: 1,
            //listenersbtn: {
            //    itemcontextmenu: function (view, rec, node, index, e) {
            //        //alert(rec.get('INTERVENIDO'));
            //        if (rec.get('INTERVENIDO') == false && rec.get('VERIFICADO') == false) {
            //            e.stopEvent();
            //            //me.ConfirmAction.setDisabled(!rec.get('VERIFICADO'));
            //            contextMenu.showAt(e.getXY());
            //            return false;
            //        }
            //        //else { return false;}
            //    }
            //}
        });
        me.gridDetallePlanilla.on('itemcontextmenu', function (view, rec, node, index, e) {
            //if (rec.get('INTERVENIDO') == false && rec.get('VERIFICADO') == false) {
                e.stopEvent();
                var cont = contextMenu;
                var ban = (rec.get('VERIFICADO') == false) ? false : true;
                if (rec.get('INTERVENIDO') == true) {
                    ConfirmAction.setDisabled(true);
                    NoConfirmAction.setDisabled(true);
                }
                else {
                    ConfirmAction.setDisabled(ban);
                    NoConfirmAction.setDisabled(!ban);
                }
                PrioridadAltaAction.setDisabled(rec.get('PRIORIDAD'));
                PrioridadBajaAction.setDisabled(!rec.get('PRIORIDAD'));
                //me.ConfirmAction.setDisabled(!rec.get('VERIFICADO'));
                contextMenu.showAt(e.getXY());
                return false;
            //}
        });

        var btn_poste = Funciones.CrearMenu('btn_AgregarPoste', 'Agregar Poste', Constantes.ICONO_CREAR, me.EventosPlanillaV1, null, this);
        var btn_uc = Funciones.CrearMenu('btn_AgregarUC', 'Agregar UC', Constantes.ICONO_CREAR, me.EventosPlanillaV1, null, this);
        var btn_ucQuitar = Funciones.CrearMenu('btn_QuitarUC', 'Quitar UC', Constantes.ICONO_BAJA, me.EventosPlanillaV1, null, this);
        var btn_historicos = Funciones.CrearMenu('btn_HistoricoPoste', 'Historico Poste/UC', 'folder_table', me.EventosPlanillaV1, null, this);
        var btn_grupo = Funciones.CrearMenu('btn_GrupoMat', 'Mat. en Grupo', 'add', me.EventosPlanillaV1, null, this);

        me.gridDetallePlanilla.toolBar.add([btn_poste, btn_uc, btn_ucQuitar, btn_historicos, btn_grupo]);

        me.gridDetalleAcciones = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridSubDetallesPlanilla",
            width: 350,
            height: 450,
            colspan: 1,
            editar: false
        });

        me.items = [
           me.formCabeceraPlanilla,
           me.gridDetallePlanilla,
           me.gridDetalleAcciones

        ];
    },
    EventosPlanillaV1: function (btn) {
        var me = this;
        var record = me.gridDetallePlanilla.getSelectionModel().getSelection()[0];
        if (btn.getItemId() == 'btn_AgregarPoste') {
            win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Agregar Poste' });
            form = Ext.create("App.View.OrdenesTrabajo.FormDetallePlanilla", { opcion: 'FormAgregarPoste', botones: false, title: 'Agregar Poste a OT' });
            win.add(form);
            win.show();
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWin('OrdenesTrabajo', 'GuardarNuevoPoste', win, form, me.gridDetallePlanilla, 'Esta Seguro de agregar la unidad constructiva al poste.', { ID_PLA: me.record.get('ID_PLA') }, win);
            });
        }
        else if (btn.getItemId() == 'btn_AgregarUC') {
            if (record != null) {
                win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Agregar UC' });
                form = Ext.create("App.View.OrdenesTrabajo.FormDetallePlanilla", { opcion: 'FormAgregarUC', botones: false, title: 'Agregar Unidad Constructiva a Poste' });
                form.loadRecord(record);
                win.add(form);
                win.show();
                win.btn_guardar.on('click', function () {
                    Funciones.AjaxRequestWin('OrdenesTrabajo', 'GuardarNuevaUC', win, form, me.gridDetallePlanilla, 'Esta Seguro de agregar la unidad constructiva al poste.', { ID_PLA_DET: record.get('ID_PLA_DET'), ID_POSTE: record.get('ID_POSTE'), ID_PLA: record.get('ID_PLA') }, win);
                });
            }
            else {
                Ext.Msg.alert("Error", "Seleccione Un registro de la planilla");
            }
        }
        else if (btn.getItemId() == "btn_QuitarUC") {
            if (record != null) {
                if (record.get('ID_UC') != 0) {
                    Funciones.AjaxRequestForm('OrdenesTrabajo', 'EliminarUCDePlanilla', me, me, me.gridDetallePlanilla, 'Esta Seguro de Quitar la UC del Poste', { ID_PLA_DET: record.get('ID_PLA_DET'), ID_UC: record.get('ID_UC') }, null);
                }
                else {
                    Ext.Msg.alert("Error", "Seleccione Un registro de la planilla que tenga UNIDAD CONSTRUCCTIVA");
                }
            }
            else {
                Ext.Msg.alert("Error", "Seleccione Un registro de la planilla");
            }
        }
            //opcion para abrir el formulario de creacion de detalle de planilla por grupo
        else if (btn.getItemId() == "btn_GrupoMat") {
            //metodo donde esta la inicializacion de abrir la ventana creacion grupo detalle de planilla
            me.winDetalleGrupo();
        }
        else if (btn.getItemId() == "btn_HistoricoPoste") {
            if (record != null) {
                if (record.get('ID_POSTE') != 0) {
                    Funciones.CargarHistoricoEdicionPorVentana('MN_POSTES_UC', record.get('ID_POSTE'));
                }
                else {
                    Ext.Msg.alert("Error", "Seleccione Un registro de la planilla que tenga UNIDAD CONSTRUCCTIVA");
                }
            }
            else {
                Ext.Msg.alert("Error", "Seleccione Un registro de la planilla");
            }
        }
        else {
            Ext.Msg.alert("Error", "No Existe opcion");
        }
    },
    eventosPlanilla: function () {
        var me = this;
        var record = me.gridDetallePlanilla.getSelectionModel().getSelection()[0];
        me.gridDetallePlanilla.on('celldblclick', function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Detalle Mantenimiento' });
            form = Ext.create('App.View.OrdenesTrabajo.FormDetallePlanilla', { opcion: 'FormSubDetalle', columns: 2, botones: false });
            form.CargarDatosFormSubDetalle(record);
            /* Filtrar codigos de mantenimiento que empiezan con L cuando el elemento seleccionado es un conductor */
            if (record.get('ID_POSTE') == null || record.get('ID_POSTE') == 0) {
                form.cbx_codigoMantenimiento.store.setExtraParam('ID_CONDUCTOR', record.get('ID_CONDUCTOR'));
                form.cbx_codigoMantenimiento.store.load();
            }
            win.add(form);
            win.show();
            win.btn_guardar.on('click', function () {
                var me = this;
                if (Funciones.convertirJson(form.gridDetalleAcciones) == false) {
                    Ext.Msg.alert("Error", "No Existe ningun cambio");
                }
                else {
                    Funciones.AjaxRequestWin("OrdenesTrabajo", "GuardarDetallePlanillaManternimiento", win, form, grd, "Esta Seguro de Guardar La Planilla", { Detalles: Funciones.convertirJson(form.gridDetalleAcciones), OBSERV: 'SIN OBSERVACIONES', ID_PLA_DET: record.get('ID_PLA_DET') }, win);
                }
            });
        });
        me.gridDetallePlanilla.on('cellclick', function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            me.gridDetalleAcciones.getStore().setExtraParams({ ID_PLA_DET: record.get('ID_PLA_DET') });
            me.gridDetalleAcciones.getStore().load();
        });
        me.gridDetallePlanilla.on('edit', function (editor, e) {
            //alert(e.field + "  " + e.value);
        });
        //me.formCabeceraPlanilla.btnHistoricoEdicion.on('click', function () {
        //    if (record != null) {
        //        Funciones.CargarHistoricoEdicionPorVentana('MN_POSTES_UC', record.get('ID_POSTE'));
        //    }
        //    else {
        //        Ext.Msg.alert("Error", "Seleccione un Poste..");
        //    }
        //});

    },
    eventosBotton: function () {
        var me = this;
        me.btn_agregar.on('click', me.CargarVentanaDetalleItem, me);
        me.btn_quitar.on('click', me.EliminarItemDetalle, me);
        me.gridDetallePlanilla.on('edit', me.CargarCodMantenimiento, this);
    },
    CargarVentanaDetalleItem: function () {
        var me = this;
        if (me.winDetalle == null) {
            me.winDetalle = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Añadir a Planilla' });
            me.formDetalle = Ext.create("App.View.OrdenesTrabajo.FormDetallePlanilla", { opcion: 'FormDetalleItem', botones: false, columns: 3 });
            me.winDetalle.add(me.formDetalle);
            me.formDetalle.getForm().reset();
            //me.formDetalle.BloquearFormulario(["rb"]);
            Funciones.BloquearFormulario(me.formDetalle, ["rb"]);
            me.winDetalle.show();
            me.winDetalle.btn_guardar.on('click', me.agregarDetallePlanilla, this);
            me.formDetalle.CargarOT(me.record);
            me.formDetalle.gridDetalleMaterial.getStore().removeAll();
        }
        else {
            me.formDetalle.getForm().reset();
            me.formDetalle.gridDetalleMaterial.getStore().removeAll();
            Funciones.BloquearFormulario(me.formDetalle, ["rb"]);
            me.formDetalle.CargarOT(me.record);
            me.winDetalle.show();
        }
    },
    EliminarItemDetalle: function () {
        var me = this;
        var data = me.gridDetallePlanilla.getSelectionModel().getSelection()[0];
        if (data != null) {
            if (data.get('ID_PLA_DET') == 0) {
                me.gridDetallePlanilla.getStore().remove(data);
                me.gridDetallePlanilla.getView().refresh();
            }
            else {
                Funciones.AjaxRequestGrid("OrdenesTrabajo", "EliminarDetallePlanilla", me, "Esta Seguro De Eliminar Ese Detalle de Planilla", { ID_PLA_DET: data.get('ID_PLA_DET') }, me.gridDetallePlanilla);

            }
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
        }
    },
    //modo consulta de la PLANILLA
    CargarFormPlanillaConsulta: function () {
        var me = this;
        me.formCabeceraPlanilla = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCabeceraPlanilla', colspan: 2, columns: 4, icono: false });
        //me.formCabeceraPlanilla.BloquearFormulario();
        Funciones.BloquearFormulario(me.formCabeceraPlanilla, null, true);
        me.gridDetallePlanilla = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridPlanillaMTyBTV1",
            width: 650,
            height: 450,
            colspan: 1
        });

        var btn_historicos = Funciones.CrearMenu('btn_HistoricoPoste', 'Historico Poste/UC', 'folder_table', me.EventosPlanillaV1, null, this);


        me.gridDetallePlanilla.toolBar.add([btn_historicos]);
        me.gridDetalleAcciones = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridSubDetallesPlanilla",
            width: 350,
            height: 450,
            colspan: 1,
            editar: false
        });
        me.items = [
           me.formCabeceraPlanilla,
           me.gridDetallePlanilla,
           me.gridDetalleAcciones,
        ];
    },
    CargarFormPlanillaAprobarRechazar: function () {
        var me = this;
        me.CargarFormPlanillaConsulta();
        me.txta_Observacion.width = 400;
        me.txta_Comentario = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            maxLength: 250,
            width: 400,
            colspan: 1,
        });
        me.items = [
          me.formCabeceraPlanilla,
          me.gridDetallePlanilla,
          me.txta_Observacion,
          me.txta_Comentario
        ];
    },
    CargarcomponentesCodigoMantenimiento: function () {
        var me = this;
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.winCodigoMantenimiento = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: true });
        me.winCodigoMantenimiento.add(me.gridCodigoMantenimiento);
        me.gridCodigoMantenimiento.on('celldblclick', me.CargarRecord, this);
    },
    CargarcomponentesCodigoSolucion: function () {
        var me = this;
        me.gridCodigoSolucion = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoSolucion' });
        me.winCodigoSolucion = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: true });
        me.winCodigoSolucion.add(me.gridCodigoSolucion);
        //alert('entro');
        me.gridCodigoSolucion.on('celldblclick', me.CargarRecordSol, this);
    },
    CargarcomponentesMateriales: function () {
        var me = this;
        me.gridMateriales = Ext.create("App.View.Postes.GridMateriales", { opcion: 'GridMateriales' });
        me.winMateriales = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: false });
        me.winMateriales.add(me.gridMateriales);
        //alert('entro');
        me.gridMateriales.on('celldblclick', me.CargarRecordMat, this);
    },

    CargarCodMantenimiento: function (editor, e) {
        var me = this;

        if (e.field == "COD_MAN") {
            me.gridCodigoMantenimiento.recordEdit = e.record;
            me.gridCodigoMantenimiento.recordName = "COD_MAN";
            me.gridCodigoMantenimiento.recordId = "ID_COD_MAN";
            Funciones.AjaxRequestRecord("Codigos", "BuscarCodigoMantenimiento", e.grid, e.record, "COD_MAN", "ID_COD_MAN", { codMan: e.value }, me.winCodigoMantenimiento);
            e.record.set('ID_COD_SOL', '');
            e.record.set('COD_SOL', '');
            e.record.set('IDPRODUCTO', '');
            e.record.set('COD_PROD', '');
            e.record.set('DESC_PROD', '');
            e.record.set('UNID_PROD', '');
        }
        else if (e.field == 'COD_SOL') {
            if (e.record.get('ID_COD_MAN') != null) {
                me.gridCodigoSolucion.recordEdit = e.record;
                me.gridCodigoSolucion.recordName = "COD_SOL";
                me.gridCodigoSolucion.recordId = "ID_COD_SOL";
                me.gridCodigoSolucion.getStore().setExtraParams({ ID_COD_MAN: e.record.get('ID_COD_MAN') });
                me.gridCodigoSolucion.getStore().load();
                Funciones.AjaxRequestRecord("Codigos", "BuscarCodigoSolucion", e.grid, e.record, "COD_SOL", "ID_COD_SOL", { codSolucion: e.value }, me.winCodigoSolucion);
                //me.winCodigoSolucion.show();
                e.record.set('IDPRODUCTO', '');
                e.record.set('COD_PROD', '');
                e.record.set('DESC_PROD', '');
                e.record.set('UNID_PROD', '');
            }
        }
        else if (e.field == 'COD_PROD') {
            me.gridMateriales.recordEdit = e.record;
            me.gridMateriales.recordName = "COD_PROD";
            me.gridMateriales.recordId = "IDPRODUCTO";
            me.gridMateriales.getStore().setExtraParams({ ID_COD_SOL: e.record.get('ID_COD_SOL') });
            me.gridMateriales.getStore().load();
            Funciones.AjaxRequestRecordArray("Materiales", "BuscarMaterial", e.grid, e.record, ["COD_PROD", "IDPRODUCTO", "DESC_PROD", "UNID_PROD"], { codMaterial: e.value }, me.winMateriales);
            //me.winCodigoSolucion.show();

        }
        else if (e.field == "ID_COD_MAN") {
            alert(e.value);
        }
    },
    CargarRecord: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridCodigoMantenimiento.recordEdit.set(me.gridCodigoMantenimiento.recordName, record.get('COD_MAN'));
        me.gridCodigoMantenimiento.recordEdit.set(me.gridCodigoMantenimiento.recordId, record.get('ID_COD_MAN'));
        me.winCodigoMantenimiento.hide();
    },
    CargarRecordSol: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridCodigoSolucion.recordEdit.set(me.gridCodigoSolucion.recordName, record.get('COD_SOL'));
        me.gridCodigoSolucion.recordEdit.set(me.gridCodigoSolucion.recordId, record.get('ID_COD_SOL'));
        me.winCodigoSolucion.hide();
    },
    CargarRecordMat: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridMateriales.recordEdit.set(me.gridMateriales.recordName, record.get('COD_ALTERNATIVO'));
        me.gridMateriales.recordEdit.set(me.gridMateriales.recordId, record.get('IDPRODUCTO'));
        me.gridMateriales.recordEdit.set('DESC_PROD', record.get('DESCRIPCION'));
        me.gridMateriales.recordEdit.set('UNID_PROD', record.get('IDUNIDAD'));
        me.winMateriales.hide();
    },
    CargarDatosPlanilla: function (OT) {
        var me = this;
        me.getForm().reset();
        me.loadRecord(OT);
        //me.txta_Observacion.setValue(OT.get('OBSERV'));
        me.record = OT;
        //if(OT.get('CON_PLA'))
        me.gridDetallePlanilla.getStore().setExtraParams({ ID_PLA: OT.get('ID_PLA') });
        me.gridDetallePlanilla.getStore().load();

    },
    GuardarAprobarRechazarPlanilla: function () {
        var me = this;
        //alert("Se Guardo Correctamente");
        if (me.winPrincipal.btn_guardar.getText() == "Aprobar Planilla OT") {
            var params = { ID_PLA: me.record.get('ID_PLA'), ESTADO: "NUEVA", ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA' };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPrincipal, me, null, "Esta Seguro de Aprobar La Planialla", params, me.winPrincipal);
        }
        else {
            var params = { ID_PLA: me.record.get('ID_PLA'), ESTADO: me.record.get('ESTADO'), ESTADO_DESTINO: 'RECHAZADA', OPCION: 'RECHAZADA' };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPrincipal, me, null, "Esta Seguro de Rechazar La Planialla", params, me.winPrincipal);

        }
    },
    agregarDetallePlanilla: function () {
        var me = this;

        if (me.formDetalle.isValid() && me.formDetalle.gridDetalleMaterial.getStore().count() > 0) {
            me.formDetalle.el.mask('Añadiendo a grid...', 'x-mask-loading');

            me.formDetalle.gridDetalleMaterial.getStore().each(function (record) {
                if (!me.existeDetallePlanilla(record.get('IDPRODUCTO'), record.get('ID_COD_MAN'), record.get('ID_POSTE'))) {


                    var rec = Ext.create("App.Model.OrdenesTrabajo.DetallesPlanilla", {
                        ID_PLA_DET: 0,
                        IDPRODUCTO: record.get('IDPRODUCTO'),
                        COD_PROD: record.get('COD_ALTERNATIVO'),
                        DESC_PROD: record.get('DESCRIPCION'),
                        UNID_PROD: record.get('UNIDAD'),
                        CANT_PRE: record.get('CANT_PRE'),
                        CODIGO: record.get('CODIGO'),
                        ID_POSTE: record.get('ID_POSTE'),
                        ID_CONDUCTOR: record.get('ID_CONDUCTOR'),
                        FORMACION_CND: record.get('FORMACION_CND'),
                        TENSION: record.get('TENSION'),
                        ID_UC: record.get('ID_UC'),
                        COD_UC: record.get('COD_UC'),
                        DESCRIPCION: record.get('ID_CONDUCTOR') == 0 ? record.get('DESCRIPCION_UC') : 'Conductor',
                        COD_MAN: record.get('COD_MAN'),
                        ID_COD_MAN: record.get('ID_COD_MAN'),
                        ID_COD_SOL: record.get('ID_COD_SOL'),
                        COD_SOL: record.get('COD_SOL'),
                        ID_UC: record.get('ID_UC'),
                        PIQUETE: me.formDetalle.num_pique.getValue(),
                        NIVEL: me.formDetalle.num_nivelUC.getValue(),
                        CANTIDAD: record.get('CANTIDAD'),
                        AP: me.formDetalle.cbx_ap.getValue(),
                        DIST_POS_CAMI: me.formDetalle.num_distanciaAproximada.getValue(),
                        CANT_ACOM: me.formDetalle.num_cantidadAcometida.getValue(),

                    });
                    me.gridDetallePlanilla.getStore().insert(0, rec);
                    me.gridDetallePlanilla.getView().refresh();
                }
            });
            me.formDetalle.el.unmask();
            me.winDetalle.hide();

        }

        else {
            Ext.MessageBox.alert('Error', "Falta Parametros o al menos debe añadir un Material.");
        }

    },
    existeDetallePlanilla: function (IDPRODUCTO, ID_COD_MAN, ID_POSTE) {
        var me = this;
        var data = me.gridDetallePlanilla.getStore().data.items,
            dLen = data.length,
            record, d;
        for (d = 0; d < dLen; d++) {
            if (data[d].get("IDPRODUCTO") == IDPRODUCTO && data[d].get("ID_COD_MAN") == ID_COD_MAN && data[d].get("ID_POSTE") == ID_POSTE) {
                return true;
            }

        }
        return false;
    },
    EventoConsulta: function () {
        var me = this;
        me.gridDetallePlanilla.on('cellclick', function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            me.gridDetalleAcciones.getStore().setExtraParams({ ID_PLA_DET: record.get('ID_PLA_DET') });
            me.gridDetalleAcciones.getStore().load();
        });
    },
    winDetalleGrupo: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Detalle Por Grupo' });
        //formulario que llama a detalle planilla la opcion detalle en grupo
        form = Ext.create('App.View.OrdenesTrabajo.FormDetallePlanilla', { opcion: 'FormDetalleGrupo', columns: 3, botones: false });
        //se cargara la OT para filtrar todos los postes y Conductores de la OT
        form.CargarDatosGrupo(this.record);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            if (Funciones.convertirJson(form.gridDetalleAcciones) == false || Funciones.convertirJson(form.gridDetalleGrupo) == false) {
                Ext.Msg.alert("Error", "Tiene que agrear por lo menos un material y un poste intervenido...");
            }
            else {
                //alert("entro");
                Funciones.AjaxRequestWin("OrdenesTrabajo", "GuardarDetallePlanillaGrupoManternimiento", win, form, me.gridDetallePlanilla, "Esta Seguro de Guardar", { Detalles: Funciones.convertirJson(form.gridDetalleAcciones), DetallesGrupo: Funciones.convertirJson(form.gridDetalleGrupo), OBSERV: 'SIN OBSERVACIONES' }, win);
            }

        });
    }
});
