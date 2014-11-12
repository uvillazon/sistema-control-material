Ext.define("App.View.OrdenesTrabajo.PrincipalOTJef", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalOT",
    controlador: 'OrdenesTrabajo',
    accionGrabar: 'Seleccionar',
    accionGrabarAsignar: 'GuardarAsignarOrdenesTrabajo',
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
            region: 'west',
            itemId: 'gridotejecutor',
            width: '45%',
            //storeResponsable: true,
            imagenPlanilla: false,
            imagenTrabEje: false,
            imagenInsInf: false,
            storeInspector: true,
        });

        //me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        //me.grid.addDocked(me.toolbar, 1);

        var calendarStore = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoCalendario', {
            autoLoad: true

        });
        calendarStore.setExtraParams({ Todos: true });

        var item = Ext.create("App.view.OrdenesTrabajo.CalendarPanelOrdenTrabajo", {
            store: calendarStore,
            alto: 150
        });
        item.on('dayclick', function () {
            alert("asdasd");
            return false;
        });
        me.panelMapa = Ext.create('App.Config.ux.GMapPanelv02', {
            itemId: "map-google",
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
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de OT Por Jefe de Mantenimiento");
        Funciones.CrearMenu('btn_OTProyecto', 'Valorar<br>OT Proyecto', Constantes.ICONO_VER, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_CrearOT', 'Crear <br>Editar OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_PresupuestoOT', 'Presupuesto<br>', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this,null,"Creacion de Presupuesto y Generacion de Vales");
        ////modoVale Adm
        ////Funciones.CrearMenu('btn_ValeOT', 'Generacion <br>Vales', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        ////Funciones.CrearMenu('btn_ValeDesdeOT', 'Crear <br>Vales', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_AsignarOTs', 'Asignar <br>OTs', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_ReasignarOTs', 'Reasignar <br>OTs', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_EjecutarOT', 'Ejecucion<br>OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_AprobarPlanillaOT', 'Valorar<br>Planilla', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_AprobarTrabEjecOT', 'Valorar <br>Trabajo Ejec.', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_CerrarOT', 'Cerrar <br>OT ', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_ValorarInformeInspeccion', 'Valorar Inf.<br>Inspeccion', Constantes.ICONO_VER, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Impresion<br>Planilla Relev.', Constantes.ICONO_PRINT, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_Impresion_PlanillaInpseccion', 'Impresion<br>Planilla Insp.', Constantes.ICONO_PRINT, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_VerInformes', 'Consulta<br>Informes', Constantes.ICONO_VER, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_MostrarMateriales', 'Consulta<br>Materiales', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);

        
        
        //
        
        //Funciones.CrearMenu('btn_RechazarPlanillaOT', 'Rechazar<br>Planilla', Constantes.ICONO_BAJA, me.EventosBoton, me.grupo, this);
        
       
        
        

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
            var latlng = new google.maps.LatLng(-17.4194, me.lat);

            var marker = new google.maps.Marker({
                position: latlng,
                zoom: 15,
                map: me.panelMapa.gmap
            });
            me.panelMapa.addMarkers(marker);
            me.lat = me.lat + 0.0110;
            me.panelMapa.gmap.setCenter(latlng);
        }
        //});
    },
    EventosBoton: function (btn) {
        Funciones.checkTimeout();
        var me = this;
        if (btn.getItemId() == "btn_CrearOT") {

            if (me.winCrearOT == null) {
                me.winCrearOT = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Crear OT'
                });
                me.formCrearOT = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Creación de OT's",
                    botones: false,
                    opcion: 'Crear'
                });
                me.winCrearOT.add(me.formCrearOT);
                me.winCrearOT.show();
            }
            else {
                me.formCrearOT.gridSolicitudes.getStore().load();
                me.winCrearOT.show();
            }
        }
        else if (btn.getItemId() == 'btn_ValorarInformeInspeccion') {
            var datosOT = me.formulario.record;
            if (datosOT != null && datosOT.get('CON_INFORME') == true && (datosOT.get('ESTADO') == 'EJECUTADA' || datosOT.get('ESTADO') == 'EN_EJEC')) {
                if (datosOT.get('EST_INFORME') != 'APROBADO') {
                    me.formInformeInspeccion = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormInforme', botones: false, title: 'Informe de Inspeccion' });
                    me.formInformeInspeccion.BloquearFormulario();
                    me.formInformeInspeccion.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: datosOT.get('ID_OT') }, true);
                    me.ventanaValorarInfomeInspeccion = Ext.widget('window', {
                        layout: 'fit',
                        draggable: true,
                        modal: true,
                        closable: false,
                        items: [{ xtype: me.formInformeInspeccion }],
                        buttons: [{ text: 'Aprobar', handler: function () { Funciones.checkTimeout(); me.formInformeInspeccion.valorarInformeInspeccion(this, this.up('window')) } }, { text: 'Rechazar', handler: function () { Funciones.checkTimeout(); me.formInformeInspeccion.valorarInformeInspeccion(this, this.up('window')) } }, { text: 'Cancelar', handler: function () { this.up('window').close(); } }]
                    });
                    me.ventanaValorarInfomeInspeccion.show();
                } else {
                    Ext.Msg.alert("Error", "El Informe de Inspeccion, ya fue Aprobado");
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que tenga INFORME DE INSPECCION y este en Estado EJECUTADA. o  EN_EJEC");
            }
        }
        else if (btn.getItemId() == "btn_MostrarMateriales") {
            me.verVentanaMaterialesyMO();
        }
        else if (btn.getItemId() == 'btn_VerPlanillaOT') {
            var datosOT = me.formulario.record;
            if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
                me.VerPlanillaOT(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga Planilla.");
            }
        }
        else if (btn.getItemId() == "btn_PlanillaRelevamiento") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];// alert(datosOT.get('RELEVAMIENTO'));
            if (datosOT != null && datosOT.get('ESTADO') != 'CERRADA') {//&& datosOT.get('RELEVAMIENTO') == true   CON NASIF DA FALSE
                //   window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_OT=' + datosOT.get('ID_OT'));
                var recordsToSend = [];
                window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + datosOT.get('ID_OT') + "&TODOS=" + true);//me.gridPostes.getStore().proxy.extraParams["ID_OT"] 
                /*if (me.winPostes == null) {
                    me.winPostes = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Generar' });
                    me.gridPostes = Ext.create("App.View.Postes.GridPostes", { paramsStore: { ID_OT: datosOT.get('ID_OT') }, check: true });
                    me.winPostes.add(me.gridPostes);
                    me.winPostes.btn_guardar.on('click', me.grabarPlanillaRelevar, this);
                    me.winPostes.show();
                }
                else {
                    me.gridPostes.getStore().setExtraParams({ ID_OT: datosOT.get('ID_OT') });
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
        else if (btn.getItemId() == "btn_OTProyecto") {
            Funciones.checkTimeout();
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('ESTADO') == 'NUEVA' && datosOT.get('TIPO_OT') == 'PROYECTO') {
                me.ventanaAprobarRechazar(datosOT);
            } else {
                Ext.MessageBox.alert('Aviso', "Seleccionar una OT tipo PROYECTO en estado: NUEVA");
            }
        }
        else { Ext.Msg.alert("Error", "No Existe la opcion") }
    },

    ventanaAprobarRechazar: function (record) {
        var me = this;
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
                xtype: 'textareafield',
                fieldLabel: 'Motivo:',
                name: 'OBSERV',
                labelAlign: 'top',
                flex: 1,
                margins: '0',
                //allowBlank: norequerido
            },{
                xtype: 'hiddenfield',
                name: 'ID_OT',
                value: record.get('ID_OT'),
            }, {
                xtype: 'hiddenfield',
                name: 'ESTADO',
                value: record.get('ESTADO')
            }],
            buttons: [{
                text: 'Aprobar',
                handler: function () {
                   me.accionAprobarRechazar(this, this.up('window'))
                }

            }, {
                text: 'Rechazar',
                handler: function () {
                    me.accionAprobarRechazar(this, this.up('window'))
                }
            }, {
                text: 'Cancelar',
                handler: function () {
                    this.up('form').getForm().reset();
                    this.up('window').close();
                }
            }]
        });

        win = Ext.widget('window', {
            title: 'Aprobar o Rechazar la OT Proyecto',
            closeAction: 'hide',
            width: 300,
            height: 300,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: form
        });
        win.show();
    },

    accionAprobarRechazar: function (btn, window) {
        var form = window.down('form');
        var record = form.getForm().getValues();
        if (form.getForm().isValid()) {
            Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de ' + btn.text + ' la OT ' + record.ID_OT + ' tipo Proyecto?', function (button) {
                if (button == 'yes') {
                    var accion = btn.text == 'Aprobar' ? 'APROBADA' : 'RECHAZADA';
                    Ext.Ajax.request({
                        url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarOTProyecto',
                        params: { ID_OT: record.ID_OT, ESTADO: record.ESTADO, ACCION: accion },
                        success: function (response, options) {
                            var data = Ext.decode(response.responseText);
                            if (data.success) {
                                Ext.MessageBox.show({
                                    title: 'Felicidades',
                                    msg: data.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
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
                    window.close();
                } else {
                    form.getForm().reset();
                    //window.close();
                }
            })
        } else {
            Ext.MessageBox.alert('Faltan datos importantes', 'Por favor! ingrese el Motivo');
        }
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
    verVetanaCierreReparacionReemplazo: function () {
        var me = this;
        var datosOT = me.formulario.record;
        if (datosOT != null && datosOT.get('ESTADO') == "EJECUTADA") {
            if (datosOT.get('TIPO_OT') == "REPARACION_REEMPLAZO") {
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
            Ext.Msg.alert("Error", "Seleccione un Regsitro en Estado EJECTUADA");
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
            Ext.Msg.alert("Error", "No se puede cerrar la OT por que los datos son incorrectos");
        }
    },
    grabarSeleccionOT: function () {
        var me = this;
        if (me.formOT.gridOT.getStore().getCount() == 0) {
            Ext.MessageBox.alert('Error', "Seleccione OT's para asignar.");
        }
        else {
            Funciones.AjaxRequestWin(me.controlador, me.accionGrabarAsignar, me.winAsignarOT, me.formOT, me.grid, 'Esta seguro de Asignar las OTs al responsable?', { listaOts: Funciones.convertirJson(me.formOT.gridOT) }, me.winAsignarOT);
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
    AprobarPlanilla: function (OT) {
        var me = this;
        if (OT.get('ESTADO_PLA') == 'NUEVA') {
            if (me.winPlanillaConsulta == null) {
                var btn = Funciones.CrearMenu('btn_Rechazar', 'Rechazar Planilla OT', 'delete', me.GuadarAprobacion, null, me);
                me.winPlanillaConsulta = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Aprobar Planilla OT', btn3: btn });
                me.formPlanillaConsulta = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanillaAprobarRechazar', title: 'Formulario de Aprobacion y Rechazo de Planilla', botones: false });
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.add(me.formPlanillaConsulta);
                me.winPlanillaConsulta.show();
                me.winPlanillaConsulta.btn_guardar.on('click', me.GuadarAprobacion, me);
            }
            else {
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.btn_guardar.setText("Aprobar Planilla OT");
                me.winPlanillaConsulta.show();
            }
        } else {
            Ext.Msg.alert("Error", "Seleccione una OT con Planilla en Estado NUEVA");
        }
    },
    GuadarAprobacion: function (btn) {
        //var winap = Ext.create
        //alert("se aprobo la planbilla");
        //alert(btn.getText());
        if (btn.getText() == "Aprobar Planilla OT") {
            Ext.MessageBox.show({
                title: 'Aprobación Planilla',
                msg: 'Comentario de Aprobacion',
                width: 300,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                scope: this,
                fn: this.GuardarAprobacionPlanilla
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
                fn: this.GuardarRechazoPlanilla
            });
        }
    },
    GuardarAprobacionPlanilla: function (btn, text) {
        var me = this;
        if (btn == "ok") {
            var params = { ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', OBSERVACION: text };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPlanillaConsulta, me.formPlanillaConsulta, me.grid, "Esta Seguro de Aprobar La Planilla", params, me.winPlanillaConsulta);
        }
    },
    GuardarRechazoPlanilla: function (btn, text) {
        var me = this;
        if (btn == "ok") {
            var params = { ESTADO_DESTINO: 'RECHAZADA', OPCION: 'RECHAZADO', OBSERVACION: text };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPlanillaConsulta, me.formPlanillaConsulta, me.grid, "Esta Seguro de Rechazar La Planilla", params, me.winPlanillaConsulta);
        }
    },
    RechazarPlanilla: function (OT) {
        var me = this;
        //alert(OT.get("ESTADO_PLA"));
        if (OT.get('ESTADO_PLA') == 'NUEVA') {
            if (me.winPlanillaConsulta == null) {
                me.winPlanillaConsulta = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Rechazar Planilla OT' });
                me.formPlanillaConsulta = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanillaAprobarRechazar', title: 'Formulario de Aprobacion y Rechazo de Planilla', botones: false });
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.add(me.formPlanillaConsulta);
                me.winPlanillaConsulta.show();
                me.winPlanillaConsulta.btn_guardar.on('click', me.GuadarAprobacion, me);
            }
            else {
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.btn_guardar.setText("Rechazar Planilla OT");
                me.winPlanillaConsulta.show();
            }
        } else {
            Ext.Msg.alert("Error", "Seleccione una OT con Planilla en Estado NUEVA");
        }
    },
    VentanaVale: function () {
        var me = this;
        if (me.winVale == null) {
            me.winVale = Ext.create("App.Config.Abstract.Window", {
                botones: false,
                title: 'Generacion de Vales por OT'
            });

            me.gridVale = Ext.create('App.View.Vales.GridVales', {
                opcion: 'GridVales',
            });
            me.toolbarVale = Funciones.CrearMenuBar();
            Funciones.CrearMenu('btn_CrearVale', 'Crear Vale', Constantes.ICONO_CREAR, me.EventosVale, me.toolbarVale, this);
            me.gridVale.addDocked(me.toolbarVale, 1);
            //me.formPresupuesto = Ext.create("App.View.OrdenesTrabajo.FormPresupuesto", {
            //    title: "Creación de Presupuesto para OT's",
            //    botones: false,
            //    opcion: 'Principal'
            //});
            me.winVale.add(me.gridVale);
            me.winVale.show();
        }
        else {
            //me.grid.getStore().load();
            me.gridVale.moverInicio();
            me.winVale.show();
        }
    },
    EventosVale: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearVale") {
            if (me.winCrearVale == null) {
                me.winCrearVale = Ext.create("App.Config.Abstract.Window", {
                    botones: true,
                    //title: 'Formulario de Creacion de vales',
                    textGuardar: 'Crear Vale'
                });
                me.formCrearVale = Ext.create("App.View.Vales.FormVale", {
                    opcion: 'FormCrearVale',
                    columns: 3
                });
                me.winCrearVale.add(me.formCrearVale);
                me.winCrearVale.btn_guardar.on('click', me.GuardarVale, this);
                me.winCrearVale.show();
            }
            else {
                me.formCrearVale.LimpiarFormulario();
                me.formCrearVale.gridMaterialesVale.getStore().removeAll();
                me.winCrearVale.show();

            }
        }
    },
    VentanaCrearValeDesdeOT: function (ot) {
        var me = this;
        if (me.winCrearValeOT == null) {
            me.winCrearValeOT = Ext.create("App.Config.Abstract.Window", {
                botones: true,
                //title: 'Formulario de Creacion de vales',
                textGuardar: 'Crear Vale'
            });
            me.formCrearValeOT = Ext.create("App.View.Vales.FormVale", {
                opcion: 'FormCrearVale',
                desdePrincipal : true,
                columns: 3
            });
            me.formCrearValeOT.loadRecord(ot);
            me.winCrearValeOT.add(me.formCrearValeOT);
            me.winCrearValeOT.btn_guardar.on('click', me.GuardarValeOT, this);
            me.winCrearValeOT.show();
        }
        else {
            me.formCrearValeOT.LimpiarFormulario();
            me.formCrearValeOT.loadRecord(ot);
            me.formCrearValeOT.gridMaterialesVale.getStore().removeAll();
            me.winCrearValeOT.show();

        }
    },
    GuardarVale: function () {
        var me = this;
        //Ext.Msg.alert("Aviso", "Se guardara el VALE");
        var formvale = me.formCrearVale.getForm();
        if (!formvale.isValid()) {
            Ext.Msg.alert("Error", "Falta Completar el formulario");
        }
        else {
            if (me.formCrearVale.ObtenerTipoOT() == "INSPECCION") {
                Ext.Msg.alert("Error", "No puede Generar Vale para una OT tipo INSPECCION");
            }
            else {
                Funciones.AjaxRequestWin("Presupuestos", "CrearVale", me.winCrearVale, me.formCrearVale, me.gridVale, null, null, me.winCrearVale)
                //Ext.Msg.alert("Exito", "Se genero Vale para la OT.");
                //me.winCrearVale.hide();
            }
        }
    },
    GuardarValeOT: function () {
        var me = this;
        //Ext.Msg.alert("Aviso", "Se guardara el VALE");
        var formvale = me.formCrearValeOT.getForm();
        if (!formvale.isValid()) {
            Ext.Msg.alert("Error", "Falta Completar el formulario");
        }
        else {
            if (me.formCrearValeOT.ObtenerTipoOT() == "INSPECCION") {
                Ext.Msg.alert("Error", "No puede Generar Vale para una OT tipo INSPECCION");
            }
            else {
                Funciones.AjaxRequestWin("Presupuestos", "CrearVale", me.winCrearValeOT, me.formCrearValeOT, me.grid, null, { detalles: Funciones.convertirJson(me.formCrearValeOT.gridMaterialesVale) }, me.winCrearValeOT)
                //Ext.Msg.alert("Exito", "Se genero Vale para la OT.");
                //me.winCrearVale.hide();
            }
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
            //***********************************************************************
            var modified = me.gridPostes.getSelectionModel().getSelection();
            var count = 0;
            if (!Ext.isEmpty(modified)) {
                var recordsToSend = [];
                Ext.each(modified, function (record) {
                    //  alert(record.get("ID_POSTE"));
                    // alert(record.data.ID_OT);
                    recordsToSend.push(Ext.apply({ ID: record.get("ID_POSTE") }));
                });
                recordsToSend = Ext.JSON.encode(recordsToSend);
                //alert(recordsToSend);
                //alert(me.gridPostes.getStore().proxy.extraParams["ID_OT"]);
                window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + me.gridPostes.getStore().proxy.extraParams["ID_OT"]);

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
});
