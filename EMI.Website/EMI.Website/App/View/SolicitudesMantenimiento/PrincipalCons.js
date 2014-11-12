Ext.define("App.View.SolicitudesMantenimiento.PrincipalCons", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalSolicitudes",
    controlador: 'SolicitudesMantenimiento',
    accionGrabar: 'GrabarSolicitudMantenimientoSP',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            region: 'west',
            width: '45%',
            borrarParametros: true

        });
        me.grupoBtn = Funciones.CrearGrupoBoton(3, "Opciones consulta");
        Funciones.CrearMenu('btn_OTporSM', 'Reporte <br>OT x SM', Constantes.ICONO_PRINT, me.EventosBoton, me.grupoBtn, this, null, null, true);
        Funciones.CrearMenu('btn_OtsSM', 'Mostrar <br> OTs', 'report', me.MostrarOTs, me.grupoBtn, this, null, null, true);

        //me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_CrearSolicitud', 'Crear', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        //Funciones.CrearMenu('btn_EditarSolicitud', 'Editar', Constantes.ICONO_EDITAR, me.EventosBoton, me.toolbar, this);
        //me.grid.addDocked(me.toolbar, 1);
        var btn_repoteRepetidos = Funciones.CrearMenu('btn_reporteRepetidos', 'Reporte Repetidos', Constantes.ICONO_VER, me.EventosBoton, null, this);
        me.grid.AgregarBtnToolbar(btn_repoteRepetidos);
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupoBtn

        });
        me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento");

        me.formulario.BloquearFormulario();
        me.form.add(me.formulario);
        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);
        //me.grid.on('celldblclick', me.MostrarOTs, this);
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
    EventosBoton: function (btn, e) {
        Funciones.checkTimeout();
        var me = this;
        if (btn.getItemId() == "btn_CrearSolicitud") {
            me.formulario.DesbloquearFormulario(["ESTADO", "NUS", "COD_POSTE", "DESC_TIPO", "COD_PUESTO1", "COD_PUESTO", "COD_ELEMENTO_2", "COD_ELEMENTO_1", "NRO_SOL", "DESCRIP_DEF", "PROPIEDAD", "USR"], true);
            //me.formulario.cmp_derivacion.btn.setDisabled(false);
            //me.formulario.cmp_poste.btn.setDisabled(false);
            me.formulario.LimpiarFormulario();
            me.formulario.BloquearBotones();
            me.formulario.btn_guardar.on('click', me.GuardarSolicitud, this);
        }
        else if (btn.getItemId() == "btn_EditarSolicitud") {//falta verificar que cuando seleccione recien desbloquee
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == "NUEVA") {
                if (!me.formulario.record.get('LE_CORRESPONDE')) {
                    Ext.Msg.alert("Error", "Solo puede Editar las SM que le correspondan a Ud");
                    return false;
                }
                //  me.formulario.CargarObjetosEdicion(me.formulario.record);
                me.formulario.DesbloquearFormulario(["ESTADO", "NUS", "COD_POSTE", "DESC_TIPO", "COD_PUESTO1", "COD_PUESTO", "COD_ELEMENTO_2", "COD_ELEMENTO_1", "NRO_SOL", "DESCRIP_DEF", "PROPIEDAD", "USR"], true);
                me.formulario.BloquearBotones();
                if (me.formulario.record.get('OBJETO') == 'NUS') {
                    me.formulario.num_nus.setReadOnly(false);
                } else if (me.formulario.record.get('OBJETO') == 'POSTE') {
                    me.formulario.cmp_codigoPoste.btn.setDisabled(false);
                } else if (me.formulario.record.get('OBJETO') == 'PUESTO') {
                    me.formulario.cmp_codigoPuesto.btn.setDisabled(false);
                } else if (me.formulario.record.get('OBJETO') == 'DERIVACION') {
                    //me.formulario.cmp_codigoDerivacion.btn.setDisabled(false);
                    //me.formulario.cmp_codigoDerivacionFinal.btn.setDisabled(false);
                }

                me.formulario.btn_guardar.on('click', me.GuardarSolicitud, this);
            }
            else {
                Ext.MessageBox.alert('Aviso', 'Seleccione un registro  en estado NUEVA para Editar..');
            }

        } else if (btn.getItemId() == "btn_reporteRepetidos") {
            me.verReporteReiteraciones(null, null, null);
        } else if (btn.getItemId() == "btn_OTporSM") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];// alert(datosOT.get('RELEVAMIENTO'));
            if (datosOT != null) {
                window.open(Constantes.HOST + 'Reportes/ReporteSM?ID_SOL_MAN=' + datosOT.get('ID_SOL_MAN'));
                // window.open(Constantes.HOST + 'Reportes/ReporteOtsSolMan?ID_SOL_MAN=' + datosOT.get('ID_SOL_MAN'));
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una SM.");
            }
        }
        else {
            alert("No se Selecciono ningun botton");
        }

    },
    GuardarSolicitud: function () {
        var me = this;
        var objeto = null; var id_objeto = 0;
        if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'NUS') {
            if (me.formulario.num_nus.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un POSTE");
            }
            else {
                id_objeto = me.formulario.cmp_codigoPoste.txt_id.getValue();
                cod_objecto = me.formulario.cmp_codigoPoste.txt_detalleComponente.getValue();
            }
        }
        else if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'POSTE') {
            //alert("hola");
            if (me.formulario.cmp_codigoPoste.txt_componente.getValue() == '') {
                //alert("hola2");
                Ext.MessageBox.alert('Error', "Seleccione un POSTE");
            }
            else {
                //alert("hola2");
                id_objeto = me.formulario.cmp_codigoPoste.txt_id.getValue();
                //alert(id_objeto);
                cod_objecto = me.formulario.cmp_codigoPoste.txt_componente.getValue();
            }

        } else if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'PUESTO') {
            if (me.formulario.cmp_codigoPuesto.txt_componente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un PUESTO");
            } else {
                id_objeto = me.formulario.cmp_codigoPuesto.txt_id.getValue();
                cod_objecto = me.formulario.cmp_codigoPuesto.txt_componente.getValue();
            }

        } else if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'DERIVACION') {
            if (me.formulario.cmp_codigoDerivacion.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un DERIVACION");
            } else {
                id_objeto = me.formulario.txt_id_derivacionIni.getValue();
                cod_objecto = me.formulario.cmp_codigoDerivacion.getValue();
            }
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un NUS, POSTE, PUESTO o DERIVACION");
        }
        objeto = me.formulario.grpb_grupoBoton.getValue()['rb'];
        //controlador, accion, mask, form, grid, msg, param, Formulario
        if (objeto != null && id_objeto != 0) {
            me.AjaxRequestForm(me.controlador, me.accionGrabar, me.form, me.formulario, me.grid, null, null, me.formulario);
        } else {
            Ext.MessageBox.alert('Error', "El objeto sujeto a inspeccion (NUS/POSTE/PUESTO/DERIVACION) debe tener VALOR." + objeto + "  " + id_objeto);
        }
    },
    AjaxRequestForm: function (controlador, accion, mask, form, grid, msg, param, Formulario) {
        var me = this;
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
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            //me.Formulario.Bloquear();
                            if (grid != null) {
                                grid.getStore().load();
                            }
                            if (Formulario != null) {
                                Formulario.BloquearFormulario();
                            }
                        },
                        failure: function (form, action) {
                            mask.el.unmask();
                            var result = action.result;
                            me.VerificarCampoMensaje(action.result.msg, action.result.ID_SOL_MAN, action.result.objeto, Formulario, result);
                            //Ext.MessageBox.alert('Error', action.result.msg);

                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    VerificarCampoMensaje: function (msg, ID, objecto, form, result) {
        var me = this;
        if (Ext.util.Format.substr(msg, 0, 2) == '01') {
            //form.BloquearFormulario();
            var btn_repoteRepetidos = Funciones.CrearMenu('btn_reporteRepetidos', 'Reporte Repetidos', Constantes.ICONO_VER, me.EventosBoton, null, this);
            btn_repoteRepetidos.on('click', function () {
                me.generarReporte(objecto == "POSTE" ? form.cmp_codigoPoste.txt_detalleComponente.getValue() : form.cmp_codigoPuesto.txt_detalleComponente.getValue(), objecto, new Date(), result);
                return false;
            });
            me.ventana = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Confirmar', mostrarBotonCerrar: false, btn3: btn_repoteRepetidos });
            me.formReiterar = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: 'ReiterarContinuar', msg: Ext.util.Format.substr(msg, 3, msg.length), hiddentxt_obs: true });
            me.ventana.add(me.formReiterar);
            me.ventana.show();
            me.ventana.btn_guardar.on('click', function () {

                if (me.formulario.isValid()) {
                    Funciones.AjaxRequestWin("SolicitudesMantenimiento", "GrabarReiteracionSM", me.ventana, me.formReiterar, me.grid, "Esta Seguro de Continuar", { ID_SOL_MAN: ID, elemento: objecto }, me.ventana);
                    me.formulario.BloquearFormulario();
                }
                else {
                    Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
                }
            });
            me.ventana.btn_cerrar.on('click', function () {
                Ext.Ajax.request({
                    url: Constantes.HOST + 'SolicitudesMantenimiento/EliminarSolMan',
                    params: { ID_SOL_MAN: ID },
                    success: function (response) {
                        var str = Ext.JSON.decode(response.responseText);
                        if (str.success == true) {
                            me.ventana.hide();
                        }
                        else {
                            Ext.Msg.alert("Error", str.msg);
                        }
                    },
                });
                return false;
            });
        }
        else {
            Ext.MessageBox.alert('Error', msg);
        }
    },
    GuardarReiterar: function () {
        alert("entro");
    },
    generarReporte: function (codigo, objeto, fecha, result) {
        var me = this;
        if (codigo == null && objeto == null) {
            var objeto = me.formReporteRepetidos.grpb_grupoBoton.getValue()['rb'];
            var codigo = me.formReporteRepetidos.txt_codigo.getValue();
            var fecha = me.formReporteRepetidos.date_fecha.getValue();
            var f_fecha;
            var myDate = new Date(fecha);
            var f_fecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
        } else {
            var f_fecha;
            var myDate = new Date(fecha);
            var f_fecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
        }
        if (result != null) {
            var file = result.data[0].FileName;
        }
        if (objeto != null && codigo != '') {
            if (file != null) {
                window.open(Constantes.HOST + 'Reportes/ReporteObjRepetidos?OBJETO=' + objeto + "&CODIGO=" + codigo + "&FECHA=" + f_fecha + "&fileName=" + file);
            }
            else {
                window.open(Constantes.HOST + 'Reportes/ReporteObjRepetidos?OBJETO=' + objeto + "&CODIGO=" + codigo + "&FECHA=" + f_fecha);
            }
        }
        else {
            Ext.MessageBox.alert('Error', "Criterios: Poste/Puesto, codigo y fecha son obligatorios");
        }
    },
    verReporteReiteraciones: function (Cod, Obj, result) {
        var me = this;
        me.winCriterioRepetidos = Ext.create("App.Config.Abstract.Window", {
            botones: true,
            textGuardar: 'Generar Reporte'
        });

        me.formReporteRepetidos = Ext.create("App.View.SolicitudesMantenimiento.Forms", {
            botones: false,
            opcion: 'FormCriterioRepetidos'
        });
        //alert(me.winCriterioRepetidos.getId());
        if (result != null && Obj != null) {
            me.formReporteRepetidos.grpb_grupoBoton.setValue({
                rb: [Obj]
            });
            me.formReporteRepetidos.txt_codigo.setValue(Cod);
            me.formReporteRepetidos.grpb_grupoBoton.items.items[2].setDisabled(false);
        } else {
            me.formReporteRepetidos.grpb_grupoBoton.items.items[2].setDisabled(true);
            //me.formReporteRepetidos.grpb_grupoBoton.getValue()[2].disable();
        }
        me.winCriterioRepetidos.add(me.formReporteRepetidos);
        me.winCriterioRepetidos.btn_guardar.on('click', function () {
            if (me.formReporteRepetidos.isValid()) {
                alert('aqui');
                if (result == null) {
                    Ext.Ajax.request({
                        url: Constantes.HOST + 'SolicitudesMantenimiento/ReiteracionesObjeto',
                        params: { objeto: me.formReporteRepetidos.grpb_grupoBoton.getValue().rb, codigo: me.formReporteRepetidos.txt_codigo.getValue() },
                        method: 'GET',
                        success: function (response, options) {
                            var data = Ext.decode(response.responseText);
                            if (data.data != null) {
                                result = data;
                                me.generarReporte(null, null, null, result)
                            } else {
                                Ext.MessageBox.alert('Mensaje', "No existen coincidencias con el valor introducido.");
                            }
                            me.winCriterioRepetidos.close();
                        }
                    });
                } else {
                    me.generarReporte(null, null, null, result)
                }

            } else {
                Ext.MessageBox.alert('Error', "Criterios: Poste/Puesto, codigo y fecha son obligatorios");
            }
        },
        this);
        me.winCriterioRepetidos.show();
    }
});
