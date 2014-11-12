Ext.define("App.View.PanelMantenimiento.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalSolicitudes",
    controlador: 'SolicitudesMantenimiento',
    accionGrabar: 'AprobarRechazarSolicitudesMantenimiento',
 //   accionBaja: 'BajaLista',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
       // me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.grid = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            opcion: "GridSolicitudesRechazadas",
            region: 'west',
            width: '45%',
          //  criterios: true,
            opcion: 'Bandeja',
            borrarParametros: true,
            title: 'Solicitudes de Mantenimiento Rechazadas por Inspector'

        });

        me.grupoBtn = Funciones.CrearGrupoBoton(4, "Opciones de Rechazo");
        Funciones.CrearMenu('btn_AprobarSolicitud', 'Aprobar<br>Solicitud', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupoBtn, this);
        Funciones.CrearMenu('btn_RechazarSolicitud', 'Rechazar<br>Solicitud', Constantes.ICONO_BAJA, me.EventosBoton, me.grupoBtn, this);
        Funciones.CrearMenu('btn_OTporSM', 'Reporte <br>OT x SM', Constantes.ICONO_PRINT, me.EventosBoton, me.grupoBtn, this, null, null, true);
        Funciones.CrearMenu('btn_OtsSM', 'Mostrar <br> OTs', 'report', me.MostrarOTs, me.grupoBtn, this, null, null, true);
        me.form = Ext.create("App.Config.Abstract.FormPanel",
            {
                bbar: me.grupoBtn
               
            }
            );

        me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento", { cargarStores: false, verObservacion: false });
       
        me.formulario.BloquearFormulario(); 
        me.form.add(me.formulario);
        me.items = [me.grid, me.form];
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
        me.formulario.CargarDatos(record);
        me.formulario.txt_numeroSolicitud.setValue(record.get('ID_SOL_MAN'));
        me.formulario.grpb_grupoBoton.setValue({ rb: record.get('OBJETO') });//CON ESTO HACEMOS CHECKED AL RADIO QUE CORRESPONDE
        if (record.get('NUS') != 0) {
            me.formulario.num_nus.setValue(record.get('NUS'));
        }
        me.formulario.BloquearFormulario();

    },
    EventosBoton: function (btn) {
        var me = this;

        if (btn.getItemId() == "btn_AprobarSolicitud") {
            // me.form.btn_guardar.on('click', me.GuardarResponsables, this);
            if (me.formulario.record != null) {
                if (me.formulario.record.get('ESTADO') == 'RECH_INSP') {
                    if (me.winAceptar == null) {
                        me.winAceptar = Ext.create("App.Config.Abstract.Window", { textGuardar: "Aprobar Solicitud", botones: true, width: 560, height: 350 });
                        me.formAceptar = Ext.create("App.View.PanelMantenimiento.FormPanelMantenimiento", { botones: false, title: 'Ingresar Observaciones o Motivo de Aprobacion' });
                        me.formAceptar.txt_id.setValue(me.formulario.record.get('ID_SOL_MAN'));
                        me.formAceptar.txt_estado.setValue(me.formulario.record.get('ESTADO'));
                        me.winAceptar.btn_guardar.on('click', me.GuardarFormulario, this);
                        me.winAceptar.add(me.formAceptar);
                        me.winAceptar.show();
                    }
                    else {
                        me.formAceptar.getForm().reset();
                        me.formAceptar.txt_id.setValue(me.formulario.record.get('ID_SOL_MAN'));
                        me.formAceptar.txt_estado.setValue(me.formulario.record.get('ESTADO'));
                        me.winAceptar.show();
                    }
                } else {
                    Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado RECH_INSP");
                }
                
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado RECH_INSP");
            }
        }
        else if (btn.getItemId() == "btn_RechazarSolicitud") {
            if (me.formulario.record != null) {
                if (me.formulario.record.get('ESTADO') == 'RECH_INSP') {
                if (me.winRechazar == null) {
                    me.winRechazar = Ext.create("App.Config.Abstract.Window", { textGuardar: "Rechazar Solicitud", botones: true, width: 560, height: 350 });
                    me.formRechazar = Ext.create("App.View.PanelMantenimiento.FormPanelMantenimiento", { botones: false, title: 'Ingresar Observaciones o Motivo de Rechazo' });
                    me.formRechazar.txt_id.setValue(me.formulario.record.get('ID_SOL_MAN'));
                    me.formRechazar.txt_estado.setValue(me.formulario.record.get('ESTADO'));
                    me.winRechazar.btn_guardar.on('click', me.GuardarFormulario, this);
                    me.winRechazar.add(me.formRechazar);
                    me.winRechazar.show();
                }else {
                    me.formRechazar.getForm().reset();
                    me.formRechazar.txt_id.setValue(me.formulario.record.get('ID_SOL_MAN'));
                    me.formRechazar.txt_estado.setValue(me.formulario.record.get('ESTADO'));
                    me.winRechazar.show();
                }
                } else {
                    Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado RECH_INSP");
                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado RECH_INSP");
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
        else {
            alert("No se Selecciono ningun botton");
        }
       // me.form.btn_guardar.on('click', me.GuardarFormulario, this);
    },
    GuardarFormulario: function (btn) {
        var me = this;
        var ventanaUno = (btn.getText() == "Aprobar Solicitud") ? me.winAceptar : me.winRechazar;
        //Aclaramos que opcion eligio el jefe de mantenimiento es decir APROBADO(NIEGA RECHAZO DEL SUPERVISOR) Y RECHAZADA (CONFIRMA EL RECHAZO DEL SUPERVISOR)
        var param1 = (btn.getText() == "Aprobar Solicitud") ? "APROBADA" : "RECHAZADA";
        var formTipo = (btn.getText() == "Aprobar Solicitud") ? me.formAceptar : me.formRechazar;
        //Se envia como constantes tanto el estado origen: APR_JF_MN y estado destino:RECHAZADA
        var destino = (btn.getText() == "Aprobar Solicitud") ? "APR_JF_MN" : "RECHAZADA";
        Funciones.AjaxRequestWin(me.controlador, me.accionGrabar, ventanaUno, formTipo, me.grid, null, { OPCION: param1, ESTADO_DESTINO: destino }, ventanaUno);

    }
});
