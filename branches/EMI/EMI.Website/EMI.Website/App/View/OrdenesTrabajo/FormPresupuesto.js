Ext.define("App.View.OrdenesTrabajo.FormPresupuesto", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    opcion: '',
    winUC: null,
    winDetalle: null,
    initComponent: function () {
        var me = this;

        if (me.opcion == "Principal") {
            me.CargarFormPrincipal();
        }
        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    //modifcacion de la interfaz principal de Planilla Registro
    CargarFormPrincipal: function () {
        var me = this;
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
        });
        me.formularioOT = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormConsultaOTSM', columns: 3, title: 'Datos Generales OT' });
        me.formularioOT.BloquearFormulario();

        me.gridMateriales = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'PresupuestoMaterialMO', title: 'Presupuesto por Item', width: 740, height: 350, handler: me.EliminarItem });
        toolbarMateriales = Funciones.CrearMenuBar();
        toolbarMateriales.height = 45;
        Funciones.CrearMenu('btn_AgregarItemMaterial', "Agregar<br> Item", Constantes.ICONO_CREAR, me.EventosBotonPresupuesto, toolbarMateriales, this);
        Funciones.CrearMenu('btn_AgregarItemMaterialPorUC', "Agregar <br>Item Por UC", Constantes.ICONO_CREAR, me.EventosBotonPresupuesto, toolbarMateriales, this);
        Funciones.CrearMenu('btn_AgregarItemPlanilla', "Agregar Item <br>Planilla o Trabajos Ejec.", Constantes.ICONO_CREAR, me.EventosBotonPresupuesto, toolbarMateriales, this);
        Funciones.CrearMenu('btn_ValeDesdeOT', "Generacion <br>Vales", Constantes.ICONO_CREAR, me.EventosBotonPresupuesto, toolbarMateriales, this);
        me.gridMateriales.addDocked(toolbarMateriales, 1);


        me.form.add(me.formularioOT);
        me.form.add(me.gridMateriales);
        me.items = [
           //me.grid,
           me.form
        ];

    },
    //CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
    CargarDatos: function (grid) {
        var me = this;
        record = grid.getSelectionModel().getSelection()[0];
        me.formularioOT.CargarDatos(record);
        me.gridMateriales.getStore().setExtraParams({ ID_OT: record.get('ID_OT') });
        me.gridMateriales.getStore().load();
        //me.me.gridMateriales
    },
    //eventosFormulario: function () {
    //    var me = this;
    //    me.grid.on('cellclick', me.CargarDatos, this);
    //},
    EventosBotonPresupuesto: function (btn) {
        //return false;
        var me = this;
        var ot = me.formularioOT.record;
        var datosOT = me.formularioOT.record;
        if (ot == null) {
            Ext.Msg.alert("Error", "Seleccione una OT...");
            return false;
        }
        //todas las ot tipo inspeccion no tiene presupuesto las ot RR y PRO tienen presupuesto
        if (ot.get('TIPO_OT') == "INSPECCION") {
            Ext.Msg.alert("Error", "Seleccione una OT tipo Reparacion o Reemplazo");
            return false;
        }
        if (btn.getItemId() == "btn_AgregarItemMaterial") {
            if (datosOT != null && Funciones.contieneValorEnArray(datosOT.get('ESTADO'), ["APROBADA"])) {
                //var win = Ext.create("App.Config.Abstract.Window", {
                //    botones: false,
                //    textGuardar: 'Crear OT'
                //});
                //var formitem = Ext.create("App.View.OrdenesTrabajo.FormDetallePresupuesto", { opcion: 'FormPresupuestoPorMaterial', botones: false });
                //formitem.CargarDatos(ot);
                //win.add(formitem);
                //win.show();
                //win.btn_cerrar.on('click', function () {
                //    win.hide();
                //    me.gridMateriales.getStore().load();
                //    return false;
                //});
                if (me.winPresupuestoItem == null) {
                    me.winPresupuestoItem = Ext.create("App.Config.Abstract.Window", {
                        botones: false,
                        textGuardar: 'Crear OT'
                    });
                    me.formitem = Ext.create("App.View.OrdenesTrabajo.FormDetallePresupuesto", { opcion: 'FormPresupuestoPorMaterial', botones: false });
                    me.formitem.CargarDatos(ot);
                    me.winPresupuestoItem.add(me.formitem);
                    me.winPresupuestoItem.show();
                    me.winPresupuestoItem.btn_cerrar.on('click', function () {
                        me.winPresupuestoItem.hide();
                        me.gridMateriales.getStore().load();
                        return false;
                    });
                }
                else {
                    me.formitem.CargarDatos(ot);
                    me.winPresupuestoItem.show();
                }

            } else {
                Ext.Msg.alert("Error", "Seleccione una OT en ESTADO APROBADA");
            }

        }
        else if (btn.getItemId() == "btn_AgregarItemMaterialPorUC") {
            if (datosOT != null && Funciones.contieneValorEnArray(datosOT.get('ESTADO'), ["APROBADA"])) {
                if (me.winPresupuestoItemUC == null) {
                    me.winPresupuestoItemUC = Ext.create("App.Config.Abstract.Window", {
                        botones: false,
                        textGuardar: 'Crear OT'
                    });
                    me.formitemUC = Ext.create("App.View.OrdenesTrabajo.FormDetallePresupuesto", { opcion: 'FormPresupuestoPorUC', botones: false });
                    me.formitemUC.CargarDatosUC(ot);
                    me.winPresupuestoItemUC.add(me.formitemUC);
                    me.winPresupuestoItemUC.show();
                    me.winPresupuestoItemUC.btn_cerrar.on('click', function () {
                        me.winPresupuestoItemUC.hide();
                        me.gridMateriales.getStore().load();
                        return false;
                    });
                }
                else {
                    me.formitemUC.CargarDatosUC(ot);
                    me.winPresupuestoItemUC.show();
                }
            }
            else {
                Ext.Msg.alert("Error", "Seleccione una OT en ESTADO APROBADA");
            }
        }
        else if (btn.getItemId() == 'btn_AgregarItemPlanilla' || btn.getItemId() == 'btn_AgregarItemTrabEje') {
            if (datosOT != null /*&& datosOT.get('TIPO_OT') == "REPARACION_REEMPLAZO" */ && Funciones.contieneValorEnArray(datosOT.get('ESTADO'), ["APROBADA"])) {
                if (me.winPresupuestoPlanilla == null) {
                    var btn = Funciones.CrearMenu('btn_GuardarMatTrabEje', 'Obtener Materiales del Trabajo Ejecutado', 'disk', me.GuardarItemPlanilla, null, this);
                    me.winPresupuestoPlanilla = Ext.create("App.Config.Abstract.Window", {
                        botones: true,
                        btn3: btn,
                        textGuardar: 'Obtener Materiales de la Planilla'
                    });
                    me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
                        imagenPlanilla: false,
                        imagenTrabEje: false,
                        borrarParametros: true,
                        width: 650,
                        height: 550,
                    });
                    var toolbarOT = Funciones.CrearMenuBar();
                    Funciones.CrearMenu('btn_reportePlanilla', "Ver Informes", "report", me.verPlanilla, toolbarOT, this);
                    //Funciones.CrearMenu('btn_reporteTrabajoEjecutado', "Ver Trabajo Ejecutado", "report", me.verPlanilla, toolbarOT, this);
                    me.gridOT.addDocked(toolbarOT, 1);
                    me.ot = ot;
                    //me.formitemUC = Ext.create("App.View.OrdenesTrabajo.FormDetallePresupuesto", { opcion: 'FormPresupuestoPorUC', botones: false });
                    //me.formitemUC.CargarDatosUC(ot);
                    me.winPresupuestoPlanilla.add(me.gridOT);
                    me.winPresupuestoPlanilla.show();
                    me.winPresupuestoPlanilla.btn_guardar.on('click', me.GuardarItemPlanilla, this);
                }
                else {
                    me.ot = ot;
                    me.gridOT.getStore().load();
                    me.winPresupuestoPlanilla.show();
                }
            }
            else {
                Ext.Msg.alert("Error", "Seleccione una OT en ESTADO APROBADA");
            }
        }
        else if (btn.getItemId() == "btn_ValeDesdeOT") {
            var datosOT = ot;
            if (datosOT != null && Funciones.contieneValorEnArray(datosOT.get('ESTADO'), ["ASIGNADA", "EN_EJEC"])) {
                me.VentanaCrearValeDesdeOT(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT  en Estado Adecuado.");
            }

        }
        else {
            Ext.Msg.alert("Error", "Seleccione una Opcion");
        }
    },
    EliminarItem: function (gr) {
        alert("se elimino" + gr.getId());
    },
    verPlanilla: function () {
        var me = this;
        //Ext.Msg.alert("Aviso", "asdasdasdada");
        var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
        if (datosOT != null /*&& datosOT.get('CON_PLANILLA') == true*/) {
            me.VerPlanillaOT(datosOT);
        } else {
            Ext.MessageBox.alert('Error', "Seleccione una OT .");
        }
    },
    VerPlanillaOT: function (OT) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var panel = Ext.create('App.View.OrdenesTrabajo.FormConsulta', { opcion: 'ConsultaInforme' });
        panel.CargarDatos(OT);
        win.add(panel);
        win.show();

    },
    GuardarItemPlanilla: function (btn) {
        var me = this;
        //alert(btn.getItemId());
        var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
        if (btn.getItemId() == "btn_GuardarMatTrabEje") {
            if (datosOT != null && datosOT.get('CON_TRAB_EJEC') == true ) {
                Funciones.AjaxRequestWin("Presupuestos", "CrearPresupuestoPorTrabEje", me, me, me.gridMateriales, "Esta Seguro de Guardar los Item de Trabajo Ejectuado Seleccionada", { ID_OT: me.ot.get('ID_OT'), ID_OT_SEL: datosOT.get('ID_OT') }, me.winPresupuestoPlanilla);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga registro de TRABAJO EJECTUADO.");
            }
        }
        else {
            if (datosOT != null && datosOT.get('CON_PLANILLA') == true && datosOT.get('ESTADO_PLA') == 'APROBADA') {
                Funciones.AjaxRequestWin("Presupuestos", "CrearPresupuestoPorPlanilla", me, me, me.gridMateriales, "Esta Seguro de Guardar los Item de la Planilla Seleccionada", { ID_OT: me.ot.get('ID_OT'), ID_PLA: datosOT.get('ID_PLA') }, me.winPresupuestoPlanilla);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga Planilla APROBADA.");
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
                desdePrincipal: false,
                columns: 3
            });
            me.formCrearValeOT.LimpiarFormulario(ot);
            me.formCrearValeOT.ot = ot;
            me.formCrearValeOT.loadRecord(ot);

            me.winCrearValeOT.add(me.formCrearValeOT);
            me.winCrearValeOT.btn_guardar.on('click', me.GuardarValeOT, this);
            me.winCrearValeOT.show();
        }
        else {
            me.formCrearValeOT.LimpiarFormulario(ot);
            me.formCrearValeOT.loadRecord(ot);
            me.formCrearValeOT.ot = ot;
            me.winCrearValeOT.show();

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
                if (me.formCrearValeOT.gridMaterialesVale.getStore().data.items.length>0) {
                    Funciones.AjaxRequestWin("Presupuestos", "CrearVale", me.winCrearValeOT, me.formCrearValeOT, me.gridMateriales, null, { detalles: Funciones.convertirJson(me.formCrearValeOT.gridMaterialesVale) }, me.winCrearValeOT)
                } else {
                    Ext.Msg.alert("Error", "Debe introducir materiales en el grid.");
                }
            }
        }
    },
});
