Ext.define("App.View.OrdenesTrabajo.FormConsulta", {
    extend: "App.Config.Abstract.Form",
    title: "Consulta de Informes de Planilla , Trab. Ejec. , Contratistas",
    columns: 1,
    opcion: '',
    botones : false,
    initComponent: function () {
        var me = this;
        if (me.opcion == "ConsultaInforme") {
            me.ConsultaInforme();
        }
        else if (me.opcion == "Consulta OT") {
            me.CargarComponentesAsignar();
        } else if (me.opcion == "ConsultaIntervPoste") {
            me.ConsultaIntervPoste();
            me.eventoConsultaIntervPoste();
        }
      /*  else if (me.opcion == "ConsultaTEDiarios") {
            me.ConsultaIntervPoste();
            me.eventoConsultaIntervPoste();
        }*/
        else {
            Ext.Msg.alert("Error", "No Existe Opcion")
        }
        this.callParent(arguments);
    },
    ConsultaInforme: function () {
        var me = this;
        me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanillaV1", { opcion: 'FormPlanillaConsulta', botones: false ,title : 'Planilla de Inspeccion'});
        me.formInforme = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormInforme', botones: false ,title : 'Informe de Inspeccion'});
        me.formInforme.BloquearFormulario();
        me.formTrabajoEjecutado = Ext.create('App.View.OrdenesTrabajo.ReporteTrabajoDiario.ReporteTrabajoDiarioConsulta');
        me.formEjecutadoContratista = Ext.create('App.View.OrdenesTrabajo.EjecutadoContratista.EjecutadoContratistaConsulta');
        me.tabPanel = Ext.create('Ext.TabPanel', {
            items: [
                    me.formPlanilla, me.formInforme, me.formTrabajoEjecutado, me.formEjecutadoContratista
                ]
        });
        me.items = [
           //me.formularioOT,
           me.tabPanel
        ];
        //me.gridSolicitudes.on('cellclick', me.CargarDatos, this);
    },
    ConsultaIntervPoste: function () {
        var me = this;
        me.botonGenerar = Ext.create('Ext.Button', {
            text: 'Generar',
            width: 120,
            iconCls: 'application_form_add',
            textAlign: 'center',
            margin : 10

        });
        me.GridIntervPostes = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'IntervPostes', width: 610, height: 270 });

        me.txt_poste = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Poste",
            name: "COD_POSTE",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        
     /*   me.date_fechaI = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Prob. Ejec.",
            name: "FECHA_PROB_EJE",
            opcion: 'no'
        });
        me.date_fechaF = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Hasta <br>Fecha Problema",
            name: "FECHA_PROBL",
            opcion:'no'
        });*/
        me.items = [
            {
                xtype: 'fieldset',
                colspan: 2,
                defaultType: 'textfield',
                layout: {
                    type: 'table',
                },
                items: [
                   me.txt_poste,
                  /* me.date_fechaI,
                   me.date_fechaF,*/
                   me.botonGenerar,
                ]
            },
           me.GridIntervPostes
            
        ];
     //   me.cbx_bobina.on('focus',me.CargarCombo,this);
     //   me.cbx_bobina.on('select',me.CargarStoreRelacion,this);
     //   me.botonGenerar.on('click',me.GenerarGrid,this);
    
    },
   /* ConsultaIntervPoste: function () {
        var me = this;
        var btn_limpiar = Funciones.CrearMenu('btn_limpiar', 'Limpiar', Constantes.ICONO_VER, me.EventosBoton, null, this);
        me.winCriterioTEjecutados = Ext.create("App.Config.Abstract.Window", {
            btn3: btn_limpiar,
            botones: true,
            textGuardar: 'Generar Reporte'
        });
        me.formReporteTEjecutados = Ext.create("App.View.OrdenesTrabajo.Forms", {
            botones: false,
            opcion: 'FormCriterioTEDiarios'
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
    },*/
    CargarDatos: function (ot) {
        var me = this;
        me.formPlanilla.CargarDatosPlanilla(ot);
        me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: ot.get('ID_OT') }, true);
        me.formTrabajoEjecutado.cargarDatos(ot.get('ID_OT'));
        me.formEjecutadoContratista.cargarDatos(ot.get('ID_OT'));
    },
    eventoConsultaIntervPoste: function () {
        var me = this;
        me.botonGenerar.on('click', function () {
            me.GridIntervPostes.getStore().setExtraParams({ Contiene: me.txt_poste.getValue() });
         /*   me.GridIntervPostes.getStore().setExtraParams({ FECHA_FINAL: me.date_fechaF.getValue() });
            me.GridIntervPostes.getStore().setExtraParams({ FECHA_INICIAL: me.date_fechaI.getValue() });*/
            me.GridIntervPostes.getStore().load();
           // Funciones.AjaxRequestWin('OrdenesTrabajo', 'GuardarModificacionPlanilla', win, form, me.gridDetalleAcciones, 'Se borraran sus registros de mantenimiento asociados a la UC. Esta seguro de continuar', { ID_PLA_DET: me.record.get('ID_PLA_DET'), ID_POSTE: me.record.get('ID_POSTE'), ID_PLA: me.record.get('ID_PLA') }, win);
        });
    }
    
});
