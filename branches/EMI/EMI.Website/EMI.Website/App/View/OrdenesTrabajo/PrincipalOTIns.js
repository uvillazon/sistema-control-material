Ext.define("App.View.OrdenesTrabajo.PrincipalOTIns", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalOT",
    controlador: 'OrdenesTrabajo',
    accionGrabar: 'Seleccionar',
    accionGrabarInforme: 'GuardarInformeInspeccion',
    accionGrabarAsignar: 'GuardarAsignarReasignacion',//'GuardarAsignarOrdenesTrabajo',dd
    accionGrabarEjecucion: 'GuardarEjecucionOrdenesTrabajo',
    view: '',
    lat: -66.1325,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.OrdenesTrabajo.GridOrdenesTrabajo', {
            itemId: 'GridOTsInspector',//esto se aumento para el caso de aprobar planilla de inspeccion
            region: 'west',
            width: '45%',
            storeResponsable: true,
            borrarParametros: true,
            imagenPlanilla: false,
            imagenTrabEje: false,
            imagenInsInf: false,
            storeInspector: true,
        });

        var calendarStore = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoCalendario', {
            autoLoad: true

        });
        calendarStore.setExtraParams({ Inspector: true });

        var item = Ext.create("App.view.OrdenesTrabajo.CalendarPanelOrdenTrabajo", {
            store: calendarStore,
            alto: 150
        });
        item.on('dayclick', function () {
            alert("asdasd");
            return false;
        });
        me.panelMapa = Ext.create('App.View.OrdenesTrabajo.PanelMapa', {
            itemId: "map-google",
            //height: Constantes.ALTO - 120,
            //zoomLevel: 15,
            //title: 'Localizacion por OT',
            //iconCls: 'map',
            //setCenter: {
            //    'lat': -17.4194,
            //    'lng': -66.1325,
            //}
        });
        me.formulario = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
            cargarStores: false
        });
        me.formulario.BloquearFormulario();
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            itemId: 'tabvalorar',
            items: [
                me.formulario,
                {
                    title: 'Calendario de Actividades',
                    iconCls: 'calendar',
                    items: item
                }, me.panelMapa]
        });
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de OT Por Inspector");

        Funciones.CrearMenu('btn_CrearOT', 'Crear <br>Editar OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);

        Funciones.CrearMenu('btn_ImprimirOT', 'Imprimir <br>OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_RecepcionOT', 'Registro <br>Entrega OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_ValorarInformes', 'Valorar<br>Informes', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_EjecutarOT', 'Ejecucion<br>OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_PagoContratista', 'Generar<br>Pago Contra.', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_CerrarOT', 'Cerrar<br>OT ', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Impresion<br>Planilla Relev.', Constantes.ICONO_PRINT, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_Impresion_PlanillaInpseccion', 'Impresion<br>Planilla Insp.', Constantes.ICONO_PRINT, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_VerInformes', 'Consulta<br>Informes', Constantes.ICONO_VER, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_MostrarMateriales', 'Consulta<br>Materiales', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_MostrarTbjEjecutado', 'Consulta<br>T. Ejecutados', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_Impresion_TEjecutados', 'Impresion<br>T. a Ejcutar', Constantes.ICONO_PRINT, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_Ot_proyecto', 'Trab. Ejec.<br>Proyecto', 'project_2013_16x16', me.EventosBoton, me.grupo, this);

        if (Constantes.USUARIO.Perfil.search("INSPECTOR") != -1) {
            //Funciones.HiddenButton("btn_RecepcionOT", me.grupo, true);
          
        }
        else {
            Funciones.HiddenButton("btn_PagoContratista", me.grupo, true);
        }
        //else { }
        //project_2013_24x24
        //Funciones.CrearMenu('btn_prueba', 'Historico<br>Cambios OT ', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
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

            me.panelMapa.CargarPuntos({ lat: -17.4194, lng: me.lat });
            me.lat = me.lat - 0.010;
        }
        me.activarDesactivarBotones(record);
        //});
    },
    EventosBoton: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        //var store = Ext.create('App.Store.SolicitudesMantenimiento.SolicitudesMantenimiento');
        if (btn.getItemId() == "btn_CrearOT") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (me.winCrearOT == null) {
                me.winCrearOT = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Crear OT',
                    gridLoads: [me.grid]
                });
                me.formCrearOT = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Creación de OT's",
                    botones: false,
                    opcion: 'Crear',
                    winPadre: me.winCrearOT
                });
                if (datosOT != null) {
                    me.buscarSolicitudMantenimiento(datosOT.get('ID_SOL_MAN'));
                }
                me.winCrearOT.add(me.formCrearOT);
                me.winCrearOT.show();
            }
            else {
                me.formCrearOT.getForm().reset();
                me.formCrearOT.gridOT.getStore().removeAll();
                me.formCrearOT.formularioSolicitud.record = null;
                me.formCrearOT.gridSolicitudes.getStore().load();
                if (datosOT != null) {
                    me.buscarSolicitudMantenimiento(datosOT.get('ID_SOL_MAN'));
                }
                me.winCrearOT.show();
            }
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
                    opcion: 'ImprimirOT'
                });
                me.winImprimir.add(me.formOTImprimir);
                me.winImprimir.show();
            }
            else {
                me.formOTImprimir.gridOT.getStore().load();
                me.winImprimir.show();
            }
        }
        else if (btn.getItemId() == "btn_RecepcionOT") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('ESTADO') == 'ASIGNADA') {
                //alert('seleccione');
                if (me.winRecepcion == null) {
                    me.winRecepcion = Ext.create("App.Config.Abstract.Window", {
                        botones: true,
                        textGuardar: 'Recepcionar'
                    });
                    me.formOTRecepcion = Ext.create("App.View.OrdenesTrabajo.Forms", {
                        title: "Recepcion Ordenes Asignadas",
                        botones: false,
                        opcion: 'RegFechaHora'
                    });
                    me.formOTRecepcion.CargarDatosR(datosOT);
                    me.winRecepcion.add(me.formOTRecepcion);
                    me.winRecepcion.btn_guardar.on('click', me.GuardarRecepcion, this);
                    me.winRecepcion.show();
                }
                else {
                    me.formOTRecepcion.CargarDatosR(datosOT);
                    //me.formOTRecepcion.LimpiarFormulario();
                    //   me.winRecepcion.btn_guardar.on('click', me.GuardarRecepcion, this);
                    me.winRecepcion.show();
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en estado ASIGNADA para RECEPCIONAR.");
            }
        }
        else if (btn.getItemId() == "btn_CerrarOT") {
            me.verVetanaCierreReparacionReemplazo();
        }
        else if (btn.getItemId() == "btn_MostrarMateriales") {
            me.verVentanaMaterialesyMO();
        }
        else if (btn.getItemId() == "btn_MostrarTbjEjecutado") {
            me.verVentanaTbjEjecutado();
        } else if (btn.getItemId() == "btn_Impresion_TEjecutados") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0]; //alert(datosOT.get('ID_OT'));
            if (datosOT != null) {
                window.open(Constantes.HOST + 'Reportes/ReporteTEjecutadosCapataz?ID_OT=' + datosOT.get('ID_OT'));
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == 'btn_VerPlanillaOT') {
            var datosOT = me.formulario.record;
            if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
                me.VerPlanillaOT(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga Planilla.");
            }
        }
        else if (btn.getItemId() == "btn_EjecutarOT") {
            if (me.winEjecuta == null) {
                me.winEjecuta = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                });
                me.formOTEjecuta = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Ejecutar Ordenes de Trabajo",
                    botones: false,
                    opcion: 'EjecutaOT'
                });
                me.winEjecuta.add(me.formOTEjecuta);
                me.winEjecuta.show();
            }
            else {
                me.formOTEjecuta.gridOT.getStore().load();
                me.winEjecuta.show();
            }

        } else if (btn.getItemId() == "btn_ValorarInformes") {
            var datosOT = me.formulario.record;
            if (datosOT != null) {
                me.ValorarInformesOT(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        } else if (btn.getItemId() == "btn_PlanillaRelevamiento") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];// alert(datosOT.get('RELEVAMIENTO'));
            if (datosOT != null) {
                var recordsToSend = [];
                window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + datosOT.get('ID_OT') + "&TODOS=" + true);//me.gridPostes.getStore().proxy.extraParams["ID_OT"] 
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
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
        else if (btn.getItemId() == "btn_DevolucionMat") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            me.verVentanaDevoluciones(datosOT);
        }

            //para pago a contratista llamaremos a unaventana con los componentes del formulario pago a contratista
        else if (btn.getItemId() == "btn_PagoContratista") {
            me.VentanaPagoContratista();
        }
        else if (btn.getItemId() == "btn_Ot_proyecto") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null) {
                me.GenerarTrabajoEjecutadoPorProyecto(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione un Registro ...");
            }
        }
        else { Ext.Msg.alert("Error", "No Existe la opcion") }
    },

    verVentanaMaterialesyMO: function () {
        var me = this;
        var datosOT = me.formulario.record;
        if (datosOT != null) {
            if (me.winMaterialesMO == null) {
                me.winMaterialesMO = Ext.create("App.Config.Abstract.Window", { botones: false });
                me.formMaterialesyMO = Ext.create("App.View.OrdenesTrabajo.FormMaterialesyMO", { botones: false, columns: 1, opcion: 'PrincipalInspector' });
                me.formMaterialesyMO.CargarDatosPrincipalInsp(datosOT)
                me.winMaterialesMO.add(me.formMaterialesyMO);
                me.winMaterialesMO.show();
            }
            else {
                me.formMaterialesyMO.CargarDatosPrincipalInsp(datosOT)
                me.winMaterialesMO.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione un Regsitro")
        }
    },
    verVentanaTbjEjecutado: function () {
        var me = this;
        var btn_limpiar = Funciones.CrearMenu('btn_limpiar', 'Limpiar', Constantes.ICONO_VER, me.EventosBoton, null, this);
        me.winCriterioTEjecutados = Ext.create("App.Config.Abstract.Window", {
            btn3: btn_limpiar,
            botones: true,
            textGuardar: 'Generar Reporte'
        });
        me.formReporteTEjecutados = Ext.create("App.View.OrdenesTrabajo.Forms", {
            botones: false,
            opcion: 'FormCriterioTEjecutados'
        });
        me.winCriterioTEjecutados.add(me.formReporteTEjecutados);
        me.winCriterioTEjecutados.btn_guardar.on('click', me.generarReporte, this);
        me.winCriterioTEjecutados.show();

        btn_limpiar.on('click', function () {
            me.formReporteTEjecutados.cbx_movilReporta.reset();
            me.formReporteTEjecutados.cbx_nombreReporta.reset();
            me.formReporteTEjecutados.cbx_tipo.reset();
            me.formReporteTEjecutados.date_fechaInicio.reset();
            me.formReporteTEjecutados.date_fechaFin.reset();
            return false;
        })
    },
    verVetanaCierreReparacionReemplazo: function () {
        var me = this;
        var datosOT = me.formulario.record;
        if (datosOT != null && Funciones.contieneValorEnArray(datosOT.get('ESTADO'), ["EJECUTADA", "SOLIC_PAGO"])) {
            if (datosOT.get('TIPO_OT') == "REPARACION_REEMPLAZO") {
                //if (datosOT.get('ESTADO') == 'EJECUTADA')
                if (me.winCierre == null) {
                    me.winCierre = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Confirmar Cierre' });
                    me.formCierre = Ext.create("App.View.OrdenesTrabajo.FormMaterialesyMO", { botones: false, columns: 1, opcion: 'PrincipalInspectorCierre' });
                    me.formCierre.CargarDatosPrincipalInspCierre(datosOT)
                    me.winCierre.add(me.formCierre);
                    me.winCierre.btn_guardar.on('click', me.GuardarCierre, this);
                    me.winCierre.show();
                }
                else {
                    me.formCierre.CargarDatosPrincipalInspCierre(datosOT)
                    me.winCierre.show();
                }
            }
            else if (datosOT.get('TIPO_OT') == "INSPECCION") {
                //controlador, accion, mask, msg, msg1, param, grid
                me.AjaxRequestCerrarOTInspeccion("OrdenesTrabajo", "CerrarOTInspeccion", me, "Esta Seguro de Cerrar la OT", { ID_OT: datosOT.get('ID_OT') }, me.grid);
            }
            else {
                alert("saludos")
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione un Registro en Estado EJECTUADA");
        }
    },

    GuardarCierre: function () {
        var me = this;
        me.formCierre.VerificarCierre();
        if (me.formCierre.VerificarCierre()) {
            //alert("Se Efectuara el ")
            //Ext.Msg.alert("Exito", "Se Ejecuto Correctamente el Cierre de OT");
            //me.winCierre.hide();
            Funciones.AjaxRequestWin(me.controlador, "GuardarCerrarOT", me.winCierre, me.formCierre, me.grid, 'Esta seguro de Cerrar la OT?', null, me.winCierre);
        }
        else {
            var noCuadran = "";
            var record = me.formCierre.gridMaterialesPreEjeDev.getStore().getRange();//devuelve en arregle el store del grid
            for (var i = 0; i < me.formCierre.gridMaterialesPreEjeDev.getStore().getCount() ; i++) {
                // alert(record[i].get('COD_PROD'));
                //  alert(record[i].get('TOTAL'));
                if (record[i].get('TOTAL') != 0) {//no cuadra
                    noCuadran = noCuadran + record[i].get('COD_PROD') + ", ";
                }
            };

            Ext.Msg.alert("Error", "No puede cerrarse la OT por que las cantidades de Vale, Cant. Ejecutado y Cant. Devoluciones no son consecuentes: " + noCuadran);
        }
    },
    VerPlanillaOT: function (OT) {
        var me = this;
        if (me.winPlanilla == null) {
            me.winPlanilla = Ext.create("App.Config.Abstract.Window", { botones: false, textGuardar: 'Guardar Planilla OT' });
            me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanillaConsulta', botones: false, winPrincipal: me.winPlanilla });
            me.formPlanilla.CargarDatosPlanilla(OT);
            me.winPlanilla.add(me.formPlanilla);
            me.winPlanilla.show();
        }
        else {
            me.formPlanilla.CargarDatosPlanilla(OT);
            me.winPlanilla.show();
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
    AjaxRequestCerrarOTInspeccion: function (controlador, accion, mask, msg, param, grid) {
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        //var mensaje1 = (msg1 == null) ? 'Esta Seguro de Guardar Los cambios?' : msg1;
        Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
            if (btn == 'yes') {
                mask.el.mask('Procesando...', 'x-mask-loading');
                Ext.Ajax.request({
                    url: Constantes.HOST + '' + controlador + '/' + accion + '',
                    params: param,
                    success: function (response) {
                        mask.el.unmask();
                        var str = Ext.JSON.decode(response.responseText);
                        if (str.success == true) {
                            if (grid != null) {
                                grid.getStore().load();
                            }
                            Ext.MessageBox.alert('Exito', str.msg);
                        }
                        else {
                            mask.el.unmask();
                            if (str.ot == true) {
                                if (grid != null) {
                                    grid.getStore().load();
                                }
                                Ext.MessageBox.confirm('Confirmacion?', str.msg, function (btn1) {
                                    if (btn1 == 'yes') {
                                        //alert("confirmado");
                                        Funciones.AjaxRequestGridSC(controlador, "GurdarOTRRdesdeOTInspeccion", mask, param, grid, null);
                                    }


                                });
                            }
                            else {
                                Ext.MessageBox.alert('Error', str.msg);
                            }
                        }
                    },
                });
            }
        });
    },
    grabarPlanillaRelevar: function () {
        var me = this;

        if (me.gridPostes.getStore().getCount() == 0) {
            Ext.MessageBox.alert('Error', "Seleccione OT's para planilla de relevamiento.");
        }
        else {
            var modified = me.gridPostes.getSelectionModel().getSelection();
            var count = 0;
            if (!Ext.isEmpty(modified)) {
                var recordsToSend = [];
                Ext.each(modified, function (record) {
                    recordsToSend.push(Ext.apply({ ID: record.get("ID_POSTE") }));
                });
                recordsToSend = Ext.JSON.encode(recordsToSend);
                if (me.gridPostes.selModel.checkTodos == undefined) {//si no selecciona todos y si selecciona unos cuantos
                    me.gridPostes.selModel.checkTodos = false;
                }
                window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + me.gridPostes.getStore().proxy.extraParams["ID_OT"] + "&TODOS=" + me.gridPostes.selModel.checkTodos);

            }

        }
    },
    VerInformesOT: function (ot) {
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var panel = Ext.create('App.View.OrdenesTrabajo.FormConsulta', { opcion: 'ConsultaInforme' });
        panel.CargarDatos(ot);
        win.add(panel);
        win.show();
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
    ValorarInformesOT: function (ot) {
        var me = this;
        // var textoboton = ot.get('CON_INFORME') == true ? 'Guardar' : 'Aprobar';
        var win = Ext.create("App.Config.Abstract.Window", {
            itemId: 'ventanaValorar',
            maxWidth: 1600,
            width: 1110,
            //resizable: true,
            draggable: false,
            botones: false,
            buttons: [{
                text: 'Aprobar',
                action: 'Aprobar',
                iconCls: 'disk',
                handler: function () {
                    Funciones.checkTimeout();
                    var boton = this;
                    var w = this.up('window');
                    var t = w.down('tabpanel');
                    var form = t.getActiveTab();
                    var grid = Ext.ComponentQuery.query('#GridOTsInspector')[0];
                    var OT = grid.getSelectionModel().getSelection()[0];
                    if (form.id == 'tabValorarPlanilla') {
                        me.GuadarAprobacion(this, w, form, grid);
                    } else if (form.id == 'tabValorarInforme') {
                        me.GrabarInformeInspeccion(w, form);
                    } else if (form.id == 'tabValorarTrabajoEjecutado') {
                        if (OT.get('TIPO_OT') == 'INSPECCION') {
                            Ext.MessageBox.confirm('Confirmacion?', 'Desea crear una OT de Reparación/Remplazo a partir de esta OT?', function (btn) {
                                if (btn == 'yes') {
                                    Ext.Ajax.request({
                                        url: Constantes.HOST + 'OrdenesTrabajo/GurdarOTRRdesdeOTInspeccion',
                                        params: { ID_OT: OT.get('ID_OT') },
                                        success: function (response) {
                                            var result = Ext.decode(response.responseText)
                                            if (result.success) {
                                                form.valorarReporteTrabajoEjecutado(boton, w, grid, 'yes');
                                            } else {
                                                Ext.MessageBox.alert('Error', result.msg);
                                            }
                                        }
                                    });
                                }
                                else {
                                    form.valorarReporteTrabajoEjecutado(boton, w, grid, 'yes');
                                }
                            });
                        } else {
                            form.valorarReporteTrabajoEjecutado(boton, w, grid);
                        }
                    } else if (form.id == 'tabValorarContratista') {
                        form.valorarReporteEjecutadoContratista(this, w, grid);
                    }
                }
            },
                {
                    text: 'Rechazar',
                    iconCls: 'delete',
                    handler: function () {
                        Funciones.checkTimeout();
                        var w = this.up('window');
                        var t = w.down('tabpanel');
                        var form = t.getActiveTab();
                        var grid = Ext.ComponentQuery.query('#GridOTsInspector')[0];
                        var OT = grid.getSelectionModel().getSelection()[0];
                        if (form.id == 'tabValorarPlanilla') {
                            me.GuadarAprobacion(this, w, form, grid);
                        } else if (form.id == 'tabValorarInforme') {

                        } else if (form.id == 'tabValorarTrabajoEjecutado') {
                            form.valorarReporteTrabajoEjecutado(this, w, grid);
                        } else if (form.id == 'tabValorarContratista') {
                            form.valorarReporteEjecutadoContratista(this, w, grid);
                        }
                    }
                },
                {
                    text: 'Cerrar',
                    iconCls: 'cross',
                    handler: function () {
                        this.up('window').close();
                    }
                }]
        });

        var panel = Ext.create('App.View.OrdenesTrabajo.FormValidarInformes', { opcion: 'ValidarInforme', ventanaPrincipal: win });
        if (ot.get('CON_PLANILLA') == false && ot.get('CON_INFORME') == false && ot.get('CON_TRAB_EJEC') == false && ot.get('CON_EJEC_CONT') == false) {
            Ext.MessageBox.alert('Error', 'No existen Informes para APROBAR...');
        } else {
            panel.CargarDatos(ot);
            win.add(panel);
            me.botonesValoracion(true, true, 'Aprobar', ot.get('ESTADO_PLA'));
            me.botonesValoracion(true, true, 'Aprobar', ot.get('EST_TRAB_EJEC'));
            me.botonesValoracion(true, true, 'Aprobar', ot.get('EST_TRAB_CONT'));
            win.show();
            Ext.getCmp('tabValorarInforme').on('activate', function () {
                win.setWidth(560);
                me.botonesValoracion(true, false, 'Guardar', ot.get('EST_INFORME'));
            });
            Ext.getCmp('tabValorarPlanilla').on('activate', function () {
                win.setWidth(1100);
                me.botonesValoracion(true, true, 'Aprobar', ot.get('ESTADO_PLA'));
            });
            Ext.getCmp('tabValorarTrabajoEjecutado').on('activate', function () {
                win.setWidth(1110);
                me.botonesValoracion(true, true, 'Aprobar', ot.get('EST_TRAB_EJEC'));
            });
            Ext.getCmp('tabValorarContratista').on('activate', function () {
                win.setWidth(1110);
                me.botonesValoracion(true, true, 'Aprobar', ot.get('EST_TRAB_CONT'));
            });
        }

    },

    GuadarAprobacion: function (btn, win, form, grid) {
        if (btn.getText() == "Aprobar") {
            Ext.MessageBox.show({
                title: 'Aprobación Planilla',
                msg: 'Comentario de Aprobacion',
                width: 300,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                scope: this,
                fn: function (btn, text) {
                    if (btn == 'ok') {
                        this.GuardarAprobacionPlanilla(btn, text, win, form, grid);
                    }
                },
            });
        }
        else {
            Ext.MessageBox.show({
                title: 'Rechazo de Planilla',
                msg: 'Comentario de Rechazo',
                width: 300,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                scope: this,
                fn: function (btn, text) {
                    if (btn == 'ok') {
                        this.GuardarRechazoPlanilla(btn, text, win, form, grid);
                    }
                }
            });
        }
    },

    GuardarAprobacionPlanilla: function (btn, text, win, form, grid) {
        var me = this;
        var params = { ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', OBSERVACION: text, ESTADO_PLA: form.formCabeceraPlanilla.txt_estado_pla.getValue() };
        me.grabarValoracionPlanillaInspeccion("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", win, form, grid, "Esta Seguro de Aprobar La Planilla", params, win);
    },

    GuardarRechazoPlanilla: function (btn, text, win, form, grid) {
        var me = this;
        var params = { ESTADO_DESTINO: 'RECHAZADA', OPCION: 'RECHAZADO', OBSERVACION: text, ESTADO_PLA: form.formCabeceraPlanilla.txt_estado_pla.getValue() };
        me.grabarValoracionPlanillaInspeccion("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", win, form, grid, "Esta Seguro de Rechazar La Planilla", params, win);
    },

    GrabarInformeInspeccion: function (win, form) {
        var me = this;
        me.grabarValoracionPlanillaInspeccion(me.controlador, me.accionGrabarInforme, me, form, null, 'Esta seguro de Guardar informe de OT?', null, win);
    },

    botonesValoracion: function (aprobar, rechazar, text, estado) {
        btnaprobar = Ext.ComponentQuery.query('#ventanaValorar button[action=Aprobar]')[0];
        btnrechazar = Ext.ComponentQuery.query('#ventanaValorar button[text=Rechazar]')[0];
        btnaprobar.setText(text);
        if (estado == 'APROBADO' || estado == 'APROBADA' || estado == 'RECHAZADO' || estado == 'RECHAZADA') {
            btnaprobar.disable();
            btnrechazar.disable();
        } else if (estado == 'NUEVO' || estado == 'CORREGIDO' || estado == 'NUEVA' || estado == 'CORREGIDA' /*|| estado == ""*/) {
            btnaprobar.enable();
            text != 'Guardar' ? btnrechazar.enable() : btnrechazar.disable();
        }
    },

    activarDesactivarBotones: function (record) {
        btnRelevamiento = Ext.ComponentQuery.query('#btn_PlanillaRelevamiento')[0];
        btnPlanilla = Ext.ComponentQuery.query('#btn_Impresion_PlanillaInpseccion')[0];
        btnMateriales = Ext.ComponentQuery.query('#btn_MostrarMateriales')[0];
        btnValorarInformes = Ext.ComponentQuery.query('#btn_ValorarInformes')[0];
        if (record.get('TIPO_OT') == 'INSPECCION') {
            btnRelevamiento.enable();
            btnPlanilla.enable();
            btnMateriales.disable();
        } else {
            btnPlanilla.disable();
            btnRelevamiento.disable();
            btnMateriales.enable();
        }

        if (record.get('ESTADO') == 'CERRADA') {
            btnValorarInformes.disable();
        } else {
            btnValorarInformes.enable();
        }
    },
    generarReporte: function () {
        var me = this;
        var cond = '';
        var responsable = me.formReporteTEjecutados.cbx_nombreReporta.getValue();
        var movil = me.formReporteTEjecutados.cbx_movilReporta.getValue();
        var tipo = me.formReporteTEjecutados.cbx_tipo.getValue();
        if (me.formReporteTEjecutados.date_fechaInicio.getValue() != null && me.formReporteTEjecutados.date_fechaFin.getValue() != null) {

            var fechaIni = me.formReporteTEjecutados.date_fechaInicio.getValue();
            var myDate = new Date(fechaIni);
            var f_fechaIni = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();

            var fechaFin = me.formReporteTEjecutados.date_fechaFin.getValue();
            var myDate = new Date(fechaFin);
            var f_fechaFin = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();

            cond = cond + "&FECHA_INICIO=" + f_fechaIni + "&FECHA_FIN=" + f_fechaFin;
        }

        if (movil != null && movil != '') {
            cond = cond + "&MOVIL_CRI=" + movil;
        }
        if (responsable != null && responsable != '') {
            cond = cond + "&RESPONSABLE=" + responsable;
        }
        if (tipo != null && tipo != '') {
            cond = cond + "&TIPO_OT_CRI=" + tipo;
        }
        if ((responsable != null && responsable != '') || (movil != null && movil != '') || (tipo != null && tipo != '') || (fechaIni != null && fechaIni != '') || (fechaFin != null && fechaFin != '')) {
            window.open(Constantes.HOST + 'Reportes/ReporteTrabajoEjecutado?' + cond);
            //MOVIL_CRI=' + movil + "&RESPONSABLE=" + responsable + "&TIPO_OT_CRI=" + tipo + "&FECHA_INICIO=" + f_fechaIni + "&FECHA_FIN=" + f_fechaFin);
        }
        else {
            Ext.MessageBox.alert('Error', "Debe ingresar alguno de los criterios para generar el reporte.");
        }
    },
    //ventana de pago a Contratista
    VentanaPagoContratista: function () {
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Orden de Pago' });
        var form = Ext.create("App.View.OrdenesTrabajo.FormPagoContratista", {
            opcion: 'FormPagoContratista',
            botones: false,
            winPrincipal: win

        });
        var datosOT = this.formulario.record;
        if (datosOT != null) {
            //alert(datosOT.get('CON_EJEC_CONT'));
            if (datosOT.get('CON_EJEC_CONT')) {

                form.formCabeceraPago.loadRecord(datosOT);
                form.formOT.loadRecord(datosOT);
                form.gridDetalle.getStore().setExtraParams({ ID_TE: datosOT.get('ID_TE') });
                form.gridDetalle.getStore().load();
            }
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            if (form.gridDetalle.getStore().count() > 0) {
                Funciones.AjaxRequestWin('OrdenesTrabajo', "GuardarOrdenCompra", win, form.formCabeceraPago, form.gridOT, 'Esta seguro de Guardar la orden de Compra?', null, null);
            }
            else {
                Ext.Msg.alert("Aviso", "Selecciona una OT Con Detalle de mano de obra(MO)");
            }
        });

    },

    buscarSolicitudMantenimiento: function (sm) {
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'SolicitudesMantenimiento/BuscarSolicitudesMantenimiento',
            params: { ID_SOL_MAN: sm },
            method: 'GET',
            success: function (response, options) {
                record = Ext.decode(response.responseText).data;
                if (record != null) {
                    solicitudmantenimiento = Ext.create('App.Model.SolicitudesMantenimiento.SolicitudesMantenimiento', {
                        ID_SOL_MAN: record.ID_SOL_MAN,
                        UNIDAD_SOLICITANTE: record.UNIDAD_SOLICITANTE,
                        TIPO_DOCUMENTO: record.TIPO_DOCUMENTO,
                        NRO_DOCUMENTO: record.NRO_DOCUMENTO,
                        NOMBRE_AFECTADO: record.NOMBRE_AFECTADO,
                        AREA_UBIC: record.AREA_UBIC,
                        UBICACION: record.UBICACION,
                        NUS: record.NUS,
                        ID_POSTE: record.ID_POSTE,
                        COD_POSTE: record.COD_POSTE,
                        ID_PUESTO: record.ID_PUESTO,
                        COD_PUESTO: record.COD_PUESTO,
                        ID_ALIMENTADOR: record.ID_ALIMENTADOR,
                        COD_ALIMENTADOR: record.COD_ALIMENTADOR,
                        ID_SUBEST: record.ID_SUBEST,
                        NOM_SUBEST: record.NOM_SUBEST,
                        REPORTA_NOMBRE: record.REPORTA_NOMBRE,
                        REPORTA_MOVIL: record.REPORTA_MOVIL,
                        ID_COD_MAN: record.ID_COD_MAN,
                        COD_MAN: record.COD_MAN,
                        DESCRIP_MAN: record.DESCRIP_MAN,
                        ID_COD_DEF: record.ID_COD_DEF,
                        COD_DEF: record.COD_DEF,
                        DESCRIP_DEF: record.DESCRIP_DEF,
                        DESC_PROBL: record.DESC_PROBL,
                        OBSERVACION: record.OBSERVACION,
                        FECHA_PROBL: record.FECHA_PROBL,
                        HORA_PROBL: record.HORA_PROBL,
                        FECHA_REG: record.FECHA_REG,
                        ESTADO: record.ESTADO,
                    });
                    me.formCrearOT.CargarDatos(me.grid, null, null, solicitudmantenimiento, null, null, null, null);
                }
            }
        });
    },
    GuardarRecepcion: function () {
        var me = this;

        Ext.Msg.alert("Error", "Guardar los campos y cambiar de estado la OT a EN_EJEC");
        Funciones.AjaxRequestWin(me.controlador, "GuardarRecepcionOT", me.winRecepcion, me.formOTRecepcion, me.grid, 'Esta Seguro dar por Recepcionada la OT?', null, me.winRecepcion);
    },
    MetodoPruebaRowExpaner: function () {
        //  alert("asdasd");
        store_responsables = Ext.create('App.Store.Responsables.Responsables', { autoLoad: true });
        var grid = Ext.create('Ext.grid.Panel', {
            //xtype: 'row-expander-grid',
            store: store_responsables,

            columns: [
                { text: "Company", flex: 1, dataIndex: 'company' },
                { text: "Price", renderer: Ext.util.Format.usMoney, dataIndex: 'price' },
                { text: "Change", dataIndex: 'change' },
                { text: "% Change", dataIndex: 'pctChange' },
                { text: "Last Updated", renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange' }
            ],
            width: 600,
            height: 300,
            viewConfig: {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    return Constantes.CargarCssEstados(record.get("TIPO_PROD"), 'MO');
                }
            },
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl: ['ELFADALSD : {NOMBRE}']
            }],
            collapsible: true,
            animCollapse: false,
            title: 'Expander Rows in a Collapsible Grid',
            iconCls: 'icon-grid',
            bbar: Ext.create('Ext.PagingToolbar', {
                store: store_responsables,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen"

            })
        });
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        win.add(grid);
        win.show();
    },

    /*Se ha crado esta funcion que es igual a AjaxRequestWin para evitar afectar a la linea. win.hide() y corregir la replica del formulario en el tab */
    grabarValoracionPlanillaInspeccion: function (controlador, accion, mask, form, grid, msg, param, win) {
        var formSend = form.getForm();
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
                            if (grid != null) {
                                try {
                                    grid.getStore().load();
                                }
                                catch (err) {
                                    grid.load();
                                }
                            }
                            if (win != null) {
                                win.close();
                            }
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
    GenerarTrabajoEjecutadoPorProyecto: function (ot) {
        var me = this;
        if (ot.get('TIPO_OT') == "PROYECTO" && ot.get('NRO_PRO') == 0) {
            Funciones.AjaxRequestGrid(me.controlador, "CrearRTEporOTProyecto", me, "Esta Seguro de Generar OT's para registrar Trabajo Ejecutados?", { ID_OT: ot.get('ID_OT') }, me.grid, null);
        }
        else {
            //alert(ot.get('NRO_PRO'));
            Ext.Msg.alert("Aviso", "Seleccione una OT de proyecto BASE...");
        }
    }

});
