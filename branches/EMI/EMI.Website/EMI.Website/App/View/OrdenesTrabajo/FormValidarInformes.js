Ext.define("App.View.OrdenesTrabajo.FormValidarInformes", {
    extend: "App.Config.Abstract.Form",
    title: "Validar Informes de Planilla , Trab. Ejec. , Contratistas",
    columns: 1,
    opcion: '',
    botones: false,
    controlador: 'OrdenesTrabajo',
    accionGrabarInforme: 'GuardarInformeInspeccion',
    ventanaPrincipal : null,
    initComponent: function () {
        var me = this;
        if (me.opcion == "ValidarInforme") {
            me.ValidarInforme();
        }
        else if (me.opcion == "Consulta OT") {
            me.CargarComponentesAsignar();
        }
        else {
            Ext.Msg.alert("Error", "No Existe Opcion")
        }
        this.callParent(arguments);
    },
    ValidarInforme: function () {
        var me = this;
        var btn_RechazarPlanillaOT = Funciones.CrearMenu('btn_RechazarPlanillaOT', 'Rechazar', 'disk', me.EventoValidar, null, me, null, null);
      //  me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { id: 'tabValorarPlanilla', title: 'Planilla de Inspeccion', opcion: 'FormPlanillaConsulta' });
        me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanillaV1", { id: 'tabValorarPlanilla', opcion: 'FormPlanillaConsulta', botones: false, title: 'Planilla de Inspeccion' });
        me.formInforme = Ext.create("App.View.OrdenesTrabajo.Forms", { id: 'tabValorarInforme', opcion: 'FormInforme', botones: false, title: 'Informe de Inspeccion', hiddenBtnLimpiar: true, cargarStores: false });
        me.formTrabajoEjecutado = Ext.create('App.View.OrdenesTrabajo.ReporteTrabajoDiario.ReporteTrabajoDiarioConsulta', { id: 'tabValorarTrabajoEjecutado' }/*, { buttons: [{ text: 'Aprobar', handler: function () { me.formTrabajoEjecutado.valorarReporteTrabajoEjecutado(this, this.up('window')) } }, { text: 'Rechazar', handler: function () { me.formTrabajoEjecutado.valorarReporteTrabajoEjecutado(this, this.up('window')) } }] }*/);
        me.formEjecutadoContratista = Ext.create('App.View.OrdenesTrabajo.EjecutadoContratista.EjecutadoContratistaConsulta', { id: 'tabValorarContratista' } /*{ buttons: [{ text: 'Aprobar', handler: function () { me.formEjecutadoContratista.valorarReporteEjecutadoContratista(this, this.up('window')) } }, { text: 'Rechazar', handler: function () { me.formEjecutadoContratista.valorarReporteEjecutadoContratista(this, this.up('window')) } }] }*/);

        me.tabPanel = Ext.create('Ext.TabPanel', {
         items: [
                    me.formPlanilla, me.formInforme, me.formTrabajoEjecutado, me.formEjecutadoContratista
                ]
        });
        me.items = [
           me.tabPanel
        ];
    },
    CargarDatos: function (ot) {
        var me = this;
        //Este codigo permite bloquear o no el tab de acuerdo a la existencia o no de cada planilla o formulario
        if (ot.get('CON_PLANILLA') == true) {
            if (ot.get('ESTADO') == 'EJECUTADA' || ot.get('ESTADO') == 'EN_EJEC') {
                me.formPlanilla.setDisabled(false);
                me.formPlanilla.CargarDatosPlanilla(ot);
               
            } else {
                me.formPlanilla.setDisabled(true);
            }
        } else if (ot.get('CON_PLANILLA') == false) {
            me.formPlanilla.setDisabled(true);
        }
        if (ot.get('CON_INFORME') == true) {
            if (ot.get('TIPO_OT') == 'PROYECTO') {
                me.formInforme.setDisabled(true);
            }
            else {
                me.formInforme.setDisabled(false);
                me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: ot.get('ID_OT') }, true);
                Funciones.DesbloquearFormulario(me.formInforme, ["FECHA_INSP", "HORA_INI", "HORA_FIN", "INFORME"]);
           //     me.formInforme.btn_guardar.on('click', me.GrabarInformeInspeccion, this);
                
            }
        } else if (ot.get('CON_INFORME') == false) {
            me.formInforme.setDisabled(true);
        }
        if (ot.get('CON_TRAB_EJEC') == true && (ot.get('ESTADO') == 'EJECUTADA' || ot.get('ESTADO') == 'EN_EJEC')) {
            me.formTrabajoEjecutado.cargarDatos(ot.get('ID_OT'));
        } else if (ot.get('CON_TRAB_EJEC') == false) {
            me.formTrabajoEjecutado.setDisabled(true);
        }
        if (ot.get('CON_EJEC_CONT') == true && (ot.get('ESTADO') == 'EJECUTADA' || ot.get('ESTADO') == 'EN_EJEC')) {
            me.formEjecutadoContratista.cargarDatos(ot.get('ID_OT'));
        } else if (ot.get('CON_EJEC_CONT') == false) {
             me.formEjecutadoContratista.setDisabled(true);
        }
        //El codigo que sigue abajo es para posicionar el tab de acuerdo a la existencia o no de la informacion
      if (ot.get('CON_PLANILLA') == false && ot.get('CON_INFORME') == false && ot.get('CON_TRAB_EJEC') == false) {
            me.tabPanel.setActiveTab(3);
        } else if (ot.get('CON_PLANILLA') == false && ot.get('CON_INFORME') == false) {
            me.tabPanel.setActiveTab(2);
        } else if (ot.get('CON_PLANILLA') == false) {
            me.tabPanel.setActiveTab(1);
        }
        //debe existir una opcion para cuando no tenga ninguna de los formularios le salga un mensaje que no existe informacion para valorar ni para ingresar la recomendacion de informe de inspeccion
    },

    GrabarInformeInspeccion: function () {
        var me = this;
        Funciones.AjaxRequestWin(me.controlador, me.accionGrabarInforme, me, me.formInforme, null, 'Esta seguro de Guardar informe de OT?', null, me.ventanaPrincipal);
    },

});
