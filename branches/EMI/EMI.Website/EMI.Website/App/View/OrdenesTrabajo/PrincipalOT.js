Ext.define("App.View.OrdenesTrabajo.PrincipalOT", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalOT",
    controlador: 'OrdenesTrabajo',
    accionGrabar: 'Seleccionar',
    accionGrabarInforme: 'GuardarInformeInspeccion',
    view: '',
    lat: -66.168383423569,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.OrdenesTrabajo.GridOrdenesTrabajo', {
            itemId: 'gridotejecutor',
            region: 'west',
            width: '45%',
            storeResponsable: true,
            imagenPlanilla: false,
            imagenTrabEje: false,
            imagenInsInf: false,
            borrarParametros: true,
            //noLimpiar : ["Inspector"]
        });

        //me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        //me.grid.addDocked(me.toolbar, 1);

        var calendarStore = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoCalendario', {
            autoLoad: true
        });
        calendarStore.setExtraParams({ Inspector: false });
        var item = Ext.create("App.view.OrdenesTrabajo.CalendarPanelOrdenTrabajo", {
            store: calendarStore,
        });

        me.panelMapa = Ext.create('App.Config.ux.GMapPanelv02', {
            itemId: 'map-google',
            height: Constantes.ALTO - 120,
            zoomLevel: 15,
            title: 'Localizacion por OT',
            iconCls: 'map',
            setCenter: {
                'lat': -17.4194,
                'lng': -66.1325,
            }
        });
        me.formulario = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
            cargarStores: false
        });
        me.formulario.BloquearFormulario();

        me.tabPanel = Ext.create('Ext.tab.Panel', {

            items: [
                 me.formulario,
                {
                    title: 'Calendario de Actividades',
                    iconCls: 'calendar',
                    items: item
                }, me.panelMapa]
        });
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de OT Por Responsable");
        Funciones.CrearMenu('btn_ImprimirOT', 'Imprimir <br>OT', Constantes.ICONO_CREAR, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_TrabajoEjecutado1', "Trabajos <br>Ejecutados", Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this, 'App.controller.OrdenesTrabajo.TrabajoDiario');
        Funciones.CrearMenu('btn_PlanillaInspeccion', "Planilla <br>Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_InformeInspeccion', "Informe <br>Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_DevolucionMat', 'Devolucion<br>Materiales', Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_EjecutarOT', "Ejecutar<br>OT", Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Impresion<br>Planilla Relev.', Constantes.ICONO_PRINT, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_Impresion_PlanillaInpseccion', 'Impresion<br>Planilla Insp.', Constantes.ICONO_PRINT, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_VerInformes', 'Consulta<br>Informes', Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_MostrarMaterialesMOOT', 'Consulta<br>Mat. y/o MO', Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_Impresion_TEjecutados', 'Impresion<br>T. a Ejcutar', Constantes.ICONO_PRINT, me.EventoEjecutar, me.grupo, this);



        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });
        me.form.add(me.tabPanel);

        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formulario.CargarDatos(record);
        var itemId = me.tabPanel.getActiveTab().getItemId();
        if (itemId == "map-google") {
            me.panelMapa.hideMarkers();
            //Ext.each(me.grid.obtenerSeleccionados(), function (record) {
            var latlng = new google.maps.LatLng(-17.4779694517418, me.lat);

            var marker = new google.maps.Marker({
                position: latlng,
                zoom: 15,
                map: me.panelMapa.gmap
            });
            me.panelMapa.addMarkers(marker);
            me.lat = me.lat + 0.0110;
            me.panelMapa.gmap.setCenter(latlng);
        }
        me.activarDesactivarBotones(record.get('TIPO_OT'));
        //});
    },
    EventosPlanilla: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        if (btn.getItemId() == "btn_PlanillaRelevamiento") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null) {//&& datosOT.get('RELEVAMIENTO') == true
                //   window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_OT=' + datosOT.get('ID_OT'));

                /* if (me.winPostes == null) {
                     me.winPostes = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Generar' });
                     me.gridPostes = Ext.create("App.View.Postes.GridPostes", { paramsStore: { ID_OT: datosOT.get('ID_OT') }, check: true, relevamiento: true });
            
                     me.winPostes.add(me.gridPostes);
                     me.winPostes.btn_guardar.on('click', me.grabarPlanillaRelevar, this);
                     me.winPostes.show();
                 }
                 else {
                     me.gridPostes.getStore().setExtraParams({ ID_OT: datosOT.get('ID_OT') });
                     me.gridPostes.selModel.checkTodos = false;
                     me.gridPostes.moverInicio();
                     me.winPostes.show();
                 }*/
                var recordsToSend = [];
                window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + datosOT.get('ID_OT') + "&TODOS=" + true);//me.gridPostes.getStore().proxy.extraParams["ID_OT"] 
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else {
            Ext.MessageBox.alert('Aviso', "Seleccionar una OT.");
        }
    },
    EventoEjecutar: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        var data = me.grid.getSelectionModel().getSelection()[0];
        if (btn.getItemId() == 'btn_EjecutarOT') {

            if (data == null || data.get('ESTADO') != 'EN_EJEC') {
                Ext.MessageBox.alert('Error', "Seleccione OT en estado EN_EJEC.");
            }
            else {
                if (data.get('TIPO_OT') == "REPARACION_REEMPLAZO") {
                    me.verVetanaEjecutarReparacionReemplazo(data);
                }
                else {
                    var params = { ID_OT: data.get('ID_OT'), TIPO_OT: data.get('TIPO_OT'), ESTADO_DESTINO: "EJECUTADA", ID_POSTE: 0, NRO_SOL: 0, listaCodSol: null, ID_OT_PT_INT: 0 };
                    Funciones.AjaxRequestForm("OrdenesTrabajo", "GuardarEjecucionOrdenesTrabajo", me, me.formulario, me.grid, "Esta Seguro dar por Ejecutada esta OT?", params, null);
                }
            }
        }
        else if (btn.getItemId() == 'btn_InformeInspeccion') {
            if (data != null) {
                me.VentanaInforme(data);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == 'btn_TrabajoEjecutado1') {
            /* if (me.winEjecuta == null) {
                 me.winEjecuta = Ext.create("App.Config.Abstract.Window", {
                     botones: false,
                 });
                 me.formOTEjecuta = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                     title: "Ejecutar Ordenes de Trabajo",
                     botones: false,
                     btn_TrabajoDiario: true,
                     opcion: 'EjecutaOT'
                 });
                 me.winEjecuta.add(me.formOTEjecuta);
                 me.winEjecuta.show();
             }
             else {
                 me.formOTEjecuta.gridOT.getStore().load();
                 me.winEjecuta.show();
             }*/
        }
        else if (btn.getItemId() == 'btn_PlanillaInspeccion') {
            if (data != null) {
                if (data.get('CON_PLANILLA') != false) {
                    //alert(data.get('CON_PLANILLA'));
                    me.VentanaPlanilla(data, data.get('CON_PLANILLA'));
                } else {
                    Ext.MessageBox.alert('Error', "Seleccione una OT en Estado EN_EJEC que tenga PLANILLA de RELEVAMIENTO.");
                }

            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en Estado EN_EJEC que tenga PLANILLA de RELEVAMIENTO.");
            }
        }
        else if (btn.getItemId() == 'btn_InformeInspeccion') {
            if (data != null) {
                me.VentanaInforme(data);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == 'btn_TrabajoEjecutado') {
            if (data == null) {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == "btn_DevolucionMat") {
            me.verVentanaDevoluciones(data);
        }
        else if (btn.getItemId() == "btn_ImprimirOT") {
            if (me.winImprimir == null) {
                me.winImprimir = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Imprimir OT'
                });
                me.formOTImprimir = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Imprimir Ordenes Asignadas",
                    botones: false,
                    opcion: 'ImprimirOT',
                    Inspector : false
                });
                me.winImprimir.add(me.formOTImprimir);
                me.winImprimir.show();
            }
            else {
                me.formOTImprimir.gridOT.getStore().load();
                me.winImprimir.show();
            }
        }
        else if (btn.getItemId() == "btn_PlanillaRelevamiento") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];// alert(datosOT.get('RELEVAMIENTO'));
            if (datosOT != null && datosOT.get('ESTADO') != 'CERRADA') {//&& datosOT.get('RELEVAMIENTO') == true   CON NASIF DA FALSE
                //   window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_OT=' + datosOT.get('ID_OT'));

             
                var recordsToSend = [];
                // window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_PLA=' + datosOT.get('ID_PLA'));
                //window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + me.gridPostes.getStore().proxy.extraParams["ID_OT"] + "&TODOS=" + me.gridPostes.selModel.checkTodos);
                window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + datosOT.get('ID_OT') + "&TODOS=" + true);//me.gridPostes.getStore().proxy.extraParams["ID_OT"] 
              

                /*if (me.winPostes == null) {
                    me.winPostes = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Generar' });
                    me.gridPostes = Ext.create("App.View.Postes.GridPostes", { paramsStore: { ID_OT: datosOT.get('ID_OT') }, check: true, relevamiento: true });
                    me.winPostes.add(me.gridPostes);
                    me.winPostes.btn_guardar.on('click', me.grabarPlanillaRelevar, this);
                    me.winPostes.show();
                }
                else {
                    me.gridPostes.getStore().setExtraParams({ ID_OT: datosOT.get('ID_OT') });
                    me.gridPostes.selModel.checkTodos = false;
                    me.gridPostes.moverInicio();
                    me.winPostes.show();
                }*/
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en estado ASIGNADA y que este ASIGNADA A Usted.");
            }
        }
        else if (btn.getItemId() == "btn_Impresion_PlanillaInpseccion") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];

            if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
                window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_PLA=' + datosOT.get('ID_PLA'));
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que tenga PLANILLA.");
            }

        }
        else if (btn.getItemId() == "btn_VerInformes") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null) {
                me.VerInformesOT(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == "btn_MostrarMaterialesMOOT") {
            me.verVentanaMaterialesyMO();
        }
        else if (btn.getItemId() == "btn_Impresion_TEjecutados") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0]; //alert(datosOT.get('ID_OT'));
            if (datosOT != null) {
               // var recordsToSend = [];
                window.open(Constantes.HOST + 'Reportes/ReporteTEjecutadosCapataz?ID_OT=' + datosOT.get('ID_OT'));
                //window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_PLA=' + datosOT.get('ID_PLA'));
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else {
            alert('No existe Evento para ese boton');
        }
    },
    VentanaPlanilla: function (OT, editar) {
        var me = this;
        if (OT.get('ESTADO_PLA') != "APROBADA" && OT.get('ESTADO') == 'EN_EJEC') {
            if (me.winPlanilla == null) {
                me.winPlanilla = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Planilla OT' });
                //me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanilla', botones: false, }); 
                me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanillaV1", { opcion: 'FormPlanilla', botones: false, });

                me.formPlanilla.CargarDatosPlanilla(OT);
                me.winPlanilla.add(me.formPlanilla);
                me.winPlanilla.btn_guardar.on('click', me.GuardarPlanilla, this);
                me.winPlanilla.show();
            }
            else {
                me.formPlanilla.CargarDatosPlanilla(OT);
                me.winPlanilla.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione una OT con Planilla En Estado NUEVA o RECHAZADA y estado OT en EN_EJEC");
        }
    },
    GuardarPlanilla: function () {
        var me = this;
        Funciones.AjaxRequestWin("OrdenesTrabajo", "GuardarPlanillaInspeccion", me.winPlanilla, me.formPlanilla.formCabeceraPlanilla, me.grid, "Esta Seguro de Guardar La Planilla", { Detalles: Funciones.convertirJson(me.formPlanilla.gridDetallePlanilla), OBSERV: 'SIN OBSERVACIONES' }, me.winPlanilla);
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
    VentanaInforme: function (OT) {
        //alert(OT.get('ID_OT'));d
        var me = this;
        if ( OT.get('ESTADO') == 'EN_EJEC') {
            if (me.winInforme == null) {
                me.winInforme = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Informe OT' });
                me.formInforme = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormInforme', botones: false });
                me.formInforme.loadRecord(OT);
                me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: OT.get('ID_OT') }, true);
                me.formInforme.check_enviarCorreo.setDisabled(true);
                me.winInforme.add(me.formInforme);
                me.winInforme.btn_guardar.on('click', me.GrabarInformeInspeccion, this);
                me.winInforme.show();
            }
            else {
                me.formInforme.getForm().reset();
                me.formInforme.loadRecord(OT);
                me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: OT.get('ID_OT') }, true);
                me.winInforme.add(me.formInforme);
                me.winInforme.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione una OT en estado OT en EN_EJEC");
        }
    },
    GrabarInformeInspeccion: function () {
        Funciones.checkTimeout();
        var me = this;
                                //controlador, accion, mask, form, grid, msg, param, win
        Funciones.AjaxRequestWin(me.controlador, me.accionGrabarInforme, me.winInforme, me.formInforme, me.grid, 'Esta seguro de Guardar informe de OT?', me.grid, me.winInforme);
    },
    VerInformesOT: function (ot) {
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var panel = Ext.create('App.View.OrdenesTrabajo.FormConsulta', { opcion: 'ConsultaInforme' });
        panel.CargarDatos(ot);
        win.add(panel);
        win.show();
    },
    verVentanaMaterialesyMO: function () {
        var me = this;
        var datosOT = me.formulario.record;
        if (datosOT != null) {
            if (me.winMaterialesMO == null) {
                me.winMaterialesMO = Ext.create("App.Config.Abstract.Window", { botones: false });
                me.formMaterialesyMO = Ext.create("App.View.OrdenesTrabajo.FormMaterialesyMO", { botones: false, columns: 1 });
                me.formMaterialesyMO.CargarDatos(datosOT)
                me.winMaterialesMO.add(me.formMaterialesyMO);
                me.winMaterialesMO.show();
            }
            else {
                me.formMaterialesyMO.CargarDatos(datosOT)
                me.winMaterialesMO.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione un Regsitro")
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
        
        //me.formEjecutarOTRR.VerificarCierre();
        if (me.formEjecutarOTRR.VerificarCierre()) {
            var data = me.formEjecutarOTRR.record;
            //alert("Se Efectuara el ")
            //Ext.Msg.alert("Exito", "Se Ejecuto Correctamente el Cierre de OT");
            //me.winCierre.hide();
            var params = { ID_OT: data.get('ID_OT'), TIPO_OT: data.get('TIPO_OT'), ESTADO_DESTINO: "EJECUTADA", ID_POSTE: 0, NRO_SOL: 0, listaCodSol: null, ID_OT_PT_INT: 0 };
            //Funciones.AjaxRequestForm("OrdenesTrabajo", "GuardarEjecucionOrdenesTrabajo", me, me.formulario, me.grid, "Esta Seguro dar por Ejecutada esta OT?", params, null);

            Funciones.AjaxRequestWin(me.controlador, "GuardarEjecucionOrdenesTrabajo", me.winEjecutarOTRR, me.formEjecutarOTRR, me.grid, 'Esta Seguro dar por Ejecutada esta OT?', params, me.winEjecutarOTRR);
        }
        else {
            Ext.Msg.alert("Error", "No se puede dar por EJECUTADO la OT por que los datos son incorrectos");
        }
    },

    activarDesactivarBotones: function (tipoOt) {
        btnPlanilla = Ext.ComponentQuery.query('#btn_PlanillaInspeccion')[0];
        btnInforme = Ext.ComponentQuery.query('#btn_InformeInspeccion')[0];
        btnPresupuesto = Ext.ComponentQuery.query('#btn_DevolucionMat')[0];
        btnMateriales = Ext.ComponentQuery.query('#btn_MostrarMaterialesMOOT')[0];
        btnImpRelevamiento = Ext.ComponentQuery.query('#btn_PlanillaRelevamiento')[0];
        btnImpPlanilla = Ext.ComponentQuery.query('#btn_Impresion_PlanillaInpseccion')[0];
        if (tipoOt == 'INSPECCION') {
            btnPlanilla.enable();
            btnInforme.enable();
            btnImpPlanilla.enable();
            btnImpRelevamiento.enable();
            btnPresupuesto.disable();
            btnMateriales.disable();
        } else {
            btnPlanilla.disable();
            btnInforme.disable();
            btnImpPlanilla.disable();
            btnImpRelevamiento.disable();
            btnPresupuesto.enable();
            btnMateriales.enable();
        }
    }
});
