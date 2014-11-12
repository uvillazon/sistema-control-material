 Ext.define("App.View.BandejasEntrada.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Responsables',
    accionGrabar: 'GrabarResponsableSP',
    view: '',
    win: null,
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            region: 'west',
            width: '45%',
            opcion: 'Bandeja',
            borrarParametros: true  
        });
        me.CargarBotones();

        //Funciones.CrearMenu('id13', 'Nombre2', Constantes.ICONO_EDITAR, me.CargarEventos, me.toolbar, this);
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });
        me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento", { cargarStores: false , verObservacion : false});
        me.formulario.BloquearFormulario();
        me.form.add(me.formulario);
        me.items = [me.grid
            //{
            //    region: 'west',
            //    //autoScroll : true,
            //    width: '45%',
            //    items: [me.grid,/* me.CargarTabPanel()*/]
            //}
            , me.form
        ];
        me.grid.on('cellclick', me.CargarDatos, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = !disabled ? selections[0] : null;
        Funciones.DisabledButton("btn_OTporSM", me, disabled);
        Funciones.DisabledButton("btn_OtsSM", me, disabled);
    },
    MostrarOTs: function (/*grd, td, cellIndex, record, tr, rowIndex, e, eOpts*/) {
        var me = this;
        win = Ext.create("App.Config.Abstract.Window");
        grid = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            paramsStore: {
                ID_SOL_MAN: me.record.get('ID_SOL_MAN')
            },
            width: 600,
            height: 500
        });
        win.add(grid);
        win.show();
    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        //alert(record.get('ID_SOL_MAN'));
        me.formulario.CargarDatos(record);
        me.formulario.txt_numeroSolicitud.setValue(record.get('ID_SOL_MAN'));
        me.formulario.grpb_grupoBoton.setValue({ rb: record.get('OBJETO') });//CON ESTO HACEMOS CHECKED AL RADIO QUE CORRESPONDE
        if (record.get('NUS') != 0) {
            me.formulario.num_nus.setValue(record.get('NUS'));
        }
        me.formulario.BloquearFormulario();

    },
    CargarBotones: function () {
        var me = this;
        me.grupo = Funciones.CrearGrupoBoton("4", "opciones de Solicitudes");
        Funciones.CrearMenu('btn_AprobarSolicitud', 'Aprobar<br>Solicitud', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_RechazarSolicitud', 'Rechazar<br>Solicitud', Constantes.ICONO_BAJA, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_OTporSM', 'Reporte <br>OT x SM', Constantes.ICONO_PRINT, me.EventosBoton, me.grupo, this, null, null, true);
        Funciones.CrearMenu('btn_OtsSM', 'Mostrar <br> OTs', 'report', me.MostrarOTs, me.grupo, this, null, null, true);
        //Funciones.CrearMenu('btn_ContinuarSolicitud', 'RechazarContinuar<br>Solicitud', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
    },
    CargarTabPanel: function () {
        var me = this;
        var gridSolicitutesAceptadas = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridSolicitudesAceptadas", width: '100%',
            height: 200,
        });
        var gridSolicitutesRechazadas = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridSolicitudesRechazadas", width: '100%',
            height: 200,
        });
        me.TabPanel = Ext.create("Ext.tab.Panel", {
            items: [gridSolicitutesAceptadas, gridSolicitutesRechazadas]
        });
        return me.TabPanel;
    },
    EventosBoton: function (btn) {
        var me = this;

        if (btn.getItemId() == "btn_AprobarSolicitud") {
            if (me.formulario.record != null) {
                if (me.formulario.record.get('ESTADO') == 'NUEVA' || me.formulario.record.get('ESTADO') == 'APR_JF_MN') {
                    if (me.win == null) {
                        me.win = Ext.create("App.Config.Abstract.Window", { textGuardar: "Aprobar Solicitudes", botones: true });
                        me.formAprobacion = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "FormAprobacion" });
                        me.formAprobacion.CargarFormularioAprobacion(me.formulario.record);
                        me.win.btn_guardar.on('click', me.GuardarFormulario, this);
                        me.win.add(me.formAprobacion);
                        me.win.show();
                    }
                    else {
                        me.formAprobacion.CargarFormularioAprobacion(me.formulario.record);
                        me.win.show();
                    }
                }
                else {
                    Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado NUEVA");
                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado NUEVA");
            }

        }
        else if (btn.getItemId() == "btn_RechazarSolicitud") {
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == 'NUEVA') {
                if (me.winRechazo == null) {
                    me.winRechazo = Ext.create("App.Config.Abstract.Window", { textGuardar: "Rechazar Solicitud", botones: true });
                    me.formRechazo = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "FormRechazo" });
                    me.formRechazo.CargarFormularioRechazo(me.formulario.record);
                    me.winRechazo.btn_guardar.on('click', me.GuardarFormulario, this);
                    me.winRechazo.add(me.formRechazo);
                    me.winRechazo.show();
                }
                else {
                    me.formRechazo.CargarFormularioRechazo(me.formulario.record);
                    me.winRechazo.show();
                }
            } else {
                var msg = me.formulario.record != null && me.formulario.record.get('ESTADO') == 'APR_JF_MN' ? "No Puede Rechazar la SM. fue aprobada por el JEFE MANTENIMIENTO" : "Seleccione una Solicitud en Estado NUEVA";
                Ext.MessageBox.alert('Error', msg);
            }
        } else if (btn.getItemId() == "btn_OTporSM") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];// alert(datosOT.get('RELEVAMIENTO'));
            if (datosOT != null) {
                window.open(Constantes.HOST + 'Reportes/ReporteSM?ID_SOL_MAN=' + datosOT.get('ID_SOL_MAN'));
                // window.open(Constantes.HOST + 'Reportes/ReporteOtsSolMan?ID_SOL_MAN=' + datosOT.get('ID_SOL_MAN'));
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una SM.");
            }
        }

        else if (btn.getItemId() == "btn_ContinuarSolicitud") {
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == 'NUEVA') {
                if (me.winContinuar == null) {
                    me.winContinuar = Ext.create("App.Config.Abstract.Window", { textGuardar: "Rechazar Solicitud", botones: true });
                    me.formContinuar = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "ReiterarContinuar" });
                    me.formContinuar.CargarFormularioRechazo(me.formulario.record);
                    me.winContinuar.btn_guardar.on('click', me.GuardarFormulario, this);
                    me.winContinuar.add(me.formContinuar);
                    me.winContinuar.show();
                }
                else {
                    me.formContinuar.CargarFormularioRechazo(me.formulario.record);
                    me.winContinuar.show();
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en Estado NUEVA");
            }
        }
        else {
            alert("No se Selecciono ningun botton");
        }
    },
    GuardarFormulario: function (btn) {
        var me = this;
        if (btn.getText() == 'Rechazar Solicitud') {
            Funciones.AjaxRequestWin("SolicitudesMantenimiento", "AprobarRechazarSolicitudesMantenimiento", me.winRechazo, me.formRechazo, me.grid, "Esta Seguro de Rechazar la Solicitud", { ESTADO: 'NUEVA', ESTADO_DESTINO: 'RECH_INSP', OPCION: 'RECHAZADA', duplicado: '-' }, me.winRechazo);
        } else {
            me.AjaxRequestWinAprobado("SolicitudesMantenimiento", "GrabarAprobacionSolicitudMantenimientoVerificar", me.win, me.formAprobacion.formAprobacion, me.grid, "Esta Seguro de Confirmar la Aprobacion", { ID_SOL_MAN: me.formAprobacion.formSolicitud.txt_id.getValue(), ESTADO: me.formulario.record.get('ESTADO'), ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', duplicado: '-' }, me.win);
        }
    },
    AjaxRequestWinAprobado: function (controlador, accion, mask, form, grid, msg, param, win) {
        var me = this;
        var formSend = form.getForm();
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {

            Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
                if (btn == 'yes') {
                    var rec = formSend.getValues();
                    if (me.formulario.record.get('COD_DEF') == 'DP0' || rec.COD_DEF == 'DP0') {
                        Ext.MessageBox.show({
                            title: 'OBSERVACIONES',
                            msg: 'Es necesario indicar la unidad que atendera esta SM con Codigo de Defecto DP0',
                            width: 300,
                            buttons: Ext.MessageBox.OKCANCEL,
                            multiline: true,
                            maxLength : 10,
                            scope: this,
                            fn: function (btn, text) {
                                if (btn == 'ok' && text != '') {
                                    param = { ID_SOL_MAN: me.formAprobacion.formSolicitud.txt_id.getValue(), ESTADO: me.formulario.record.get('ESTADO'), ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', duplicado: '-', OBSERVACION: text }
                                    mask.el.mask('Procesando...', 'x-mask-loading');
                                    formSend.submit({
                                        submitEmptyText: false,
                                        timeout: 1200,
                                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                                        params: param,
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
                                                win.hide();
                                            }
                                        },
                                        failure: function (form, action1) {
                                            mask.el.unmask();
                                            me.VerificarCampoMensaje(action1.result.msg, action1.result.ID_SOL_MAN, action1.result.objeto, win);
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert("Error", "Es obligatorio el ingreso de un comentario </br> para aprobar la SM con codigo de defecto DP0")
                                }
                            },
                        })
                    } else {
                        mask.el.mask('Procesando...', 'x-mask-loading');
                        formSend.submit({
                        submitEmptyText: false,
                        timeout :1200,
                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                        params: param,
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            //me.Formulario.Bloquear();
                            if (grid != null) {
                                try {
                                    grid.getStore().load();
                                }
                                catch (err) {
                                    grid.load();
                                }
                            }
                            if (win != null) {
                                win.hide();
                            }
                        },
                        failure: function (form, action1) {
                            mask.el.unmask();
                            me.VerificarCampoMensaje(action1.result.msg, action1.result.ID_SOL_MAN, action1.result.objeto, win);
                          
                            }
                        });
                    }
                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    VerificarCampoMensaje: function (msg,ID,objeto,win) {
        var me = this;
        if (Ext.util.Format.substr(msg, 0, 2) == '01') {
            me.ventana = Ext.create("App.Config.Abstract.Window", {botones : true , textGuardar : 'Confirmar'});
            me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: 'ReiterarContinuar', msg: msg, hiddentxt_obs: true });
            me.ventana.add(me.formulario);
            me.ventana.show();
            me.ventana.btn_guardar.on('click', function () {
                if (me.formulario.isValid()) {
                    Funciones.AjaxRequestWinArray("SolicitudesMantenimiento", "GrabarAprobacionSolicitudMantenimiento", me.ventana, me.formAprobacion, me.grid, "Esta Seguro de Continuar", { ID_SOL_MAN: ID, ESTADO: 'NUEVA', ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', elemento: objeto, duplicado: me.formulario.grpb_grupoBoton.getValue().duplicado }, [me.win, me.ventana]);
                }
                else {
                    Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
                }
            });
        }
        else {
            Ext.MessageBox.alert('Error', msg);
        }
    },
    
});
