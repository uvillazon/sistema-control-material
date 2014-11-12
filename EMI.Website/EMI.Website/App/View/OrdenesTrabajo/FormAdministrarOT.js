Ext.define("App.View.OrdenesTrabajo.FormAdministrarOT", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",

    controlador: 'OrdenesTrabajo',
    accionGrabar: 'ValidarOrdenesTrabajo',//'GuardarOrdenesTrabajo',
    accionQuitar: 'EliminarOrdenTrabajo',
    accionCerrar: 'GuardarCerrarOT',
    accionGrabarInforme: 'GuardarInformeInspeccion',
    accionGrabarAsignar: 'GuardarAsignarReasignacion',
    cargarStores: true,
    columns: 2,
    opcion: '',
    winPadre: null,
    Inspector : null,
    btn_TrabajoDiario: false,
    initComponent: function () {
        var me = this;
        if (me.opcion == "Crear") {
            me.CargarComponentesCrear();
        }
        else if (me.opcion == "Asignar") {
            me.CargarComponentesAsignar();
        }
        else if (me.opcion == "Ejecutar") {
            me.CargarComponentesEjecutar();
        }
        else if (me.opcion == "Cerrar") {
            me.CargarComponentesCerrar();
        }
        else if (me.opcion == "EjecutaOT") {
            me.CargarComponentesEjecutaOT();
        }
        else if (me.opcion == "ImprimirOT") {
            me.CargarComponentesImprimirOT();
        }
        else if (me.opcion == "CerrarOT") {
            me.CargarComponentesCerrarOT();
        }
        this.callParent(arguments);
    },                                                       
    CargarStore: function () {
        var me = this;
    },
    CargarComponentesCrear: function () {
        var me = this;
        //me.formCrear = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCrearOT', icono: false });
        // Grid de solicitudes
        me.gridSolicitudes = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            region: 'west',
            width: 500,
            criterios: false,
            borrarParametros: true,
            height: 500,
            opcion: 'Bandeja',
            paramsStore: { Estados: ['APROBADA', 'CON_OT'] }
        });
        me.btn_grupo = Funciones.CrearGrupoBoton(5, "Opciones de SM");

        Funciones.CrearMenu('btn_FinOT', 'Fin<br>OT', Constantes.ICONO_CREAR, me.EventosBotonOT, me.btn_grupo, this);
        Funciones.CrearMenu('btn_OTExtraordinario', 'OT<br>Extraordinario', Constantes.ICONO_CREAR, me.EventosBotonOT, me.btn_grupo, this);
        Funciones.CrearMenu('btn_OTRegularizacion', 'OT<br>Regularizacíon', Constantes.ICONO_CREAR, me.EventosBotonOT, me.btn_grupo, this);
        //    Funciones.CrearMenu('btn_nulo', null, null, null, me.btn_grupo, this);
        Funciones.CrearMenu('btn_AReasignaOTs', 'Asignar<br>OTs', Constantes.ICONO_CREAR, me.EventosBotonAsignar, me.btn_grupo, this);
        Funciones.CrearMenu('btn_PresupuestoOT', 'Presupuesto<br>', Constantes.ICONO_CREAR, me.EventosBotonOT, me.btn_grupo, this, null, "Creacion de Presupuesto y Generacion de Vales");
        //me.form.add(me.btn_grupo);
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.btn_grupo
        });
        me.formularioSolicitud = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormSolicitud' });
        me.formularioSolicitud.BloquearFormulario();

        // Grid de Ordenes de trabajo que pertenecen a la solicitud
        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            criterios: true,
            busqueda: true,
            cargarStore: false,
            width: 755,
            height: 300,
        });
        // Opciones de crea, editar y eliminar OT
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarOT', "Crear OT", Constantes.ICONO_CREAR, me.EventosBotonOT, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarOT', "Editar OT", Constantes.ICONO_EDITAR, me.EventosBotonOT, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarOT', "Eliminar OT", "delete", me.EventosBotonOT, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        // Eventos del grid de OTs
        me.gridOT.on('cellclick', function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
            btnPresupuesto = Ext.ComponentQuery.query('#btn_PresupuestoOT')[0];
            if (record.get('TIPO_OT') == 'INSPECCION') {
                btnPresupuesto.disable();
            } else {
                btnPresupuesto.enable();
            }
        });

        me.form.add(me.formularioSolicitud);
        me.form.add(me.gridOT);
        me.items = [
           me.gridSolicitudes,
           me.form
        ];
        //me.gridSolicitudes.on('cellclick', me.CargarDatos, this);
        me.gridSolicitudes.getSelectionModel().on('selectionchange', me.onSelectChange, this);
    },
    onSelectChange: function (selModel, selections) {

        var me = this;
        var disabled = selections.length === 0;

        if (disabled) {
            me.getForm().reset();
            me.formularioSolicitud.record = null;
            me.gridOT.getStore().setExtraParams({ ID_SOL_MAN: 0 });
            me.gridOT.getStore().load();
        }
        else {
            me.formularioSolicitud.CargarDatos(selections[0]);
            me.gridOT.getStore().setExtraParam("ID_SOL_MAN", selections[0].get('ID_SOL_MAN'));
            me.gridOT.getStore().load();

        }
    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formularioSolicitud.CargarDatos(record);
        me.gridOT.getStore().setExtraParam("ID_SOL_MAN", record.get('ID_SOL_MAN'));
        me.gridOT.getStore().load();
    },
    CargarComponentesAsignar: function () {
        var me = this;
        //Formulario que contiene la informacion necesaria para asignar y reasignar
        me.formAsignacion = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormOTAsignar', colspan: 2, icono: false });
        //Grid que contiene todas las OT`s seleccionadas para asignar o reasignar
        me.gridOT = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "OTSeleccionadas",
            width: 428,
            height: 470,
        });
        //Grid que contiene todas las OT`s en estado "APROBADA", "CON_MO", "CON_MAT", "ASIGNADA", "EN_EJEC" 
        me.gridOTAprobados = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            paramsStore: { Estados: ["APROBADA", "CON_MO", "CON_MAT", "ASIGNADA", "EN_EJEC"]},//para reasignar  paramsStore: { Estados: ["ASIGNADA", "EN_EJEC"] },
            opcion: 'GridOTSeleccionadas',
            width: 428,
            height: 470,
            storeResponsable: true,
            storeInspector: true,
            colspan: 1,
            borrarParametros: true,
            noLimpiar: ["Inspector", "Estados"]
        });
        //me.gridOTAprobados.getStore().on('load', function (str, records, successful, eOpts) {
        //    if (successful) {
        //        //var str1 = str;
        //        str.each(function (rec) {
        //            if (rec != null) {
        //                if (rec.get('TIPO_OT') == 'PROYECTO') {
        //                    str.remove(rec);
        //                    //alert(rec.get('TIPO_OT'));
        //                }
        //            }
        //        });
        //        //me.gridOTAprobados.getStore().each(function (rec) {
        //        //    if (rec.get('TIPO_OT') == 'PROYECTO') {
        //        //        str.remove(rec);
        //        //        //alert(rec.get('TIPO_OT'));
        //        //    }
        //        //});
        //        //str.each(function (rec) {
        //        //    //alert(rec.get('TIPO_OT'));

        //        //    //alert(rec.get('TIPO_OT'));
        //        //});
        //    }
        //});
        me.toolbar = Funciones.CrearMenuBar();
        me.gridOT.on('edit', me.CargarCodDefecto, this);
        Funciones.CrearMenu('btn_AgregarOT', "Seleccionar OT's", Constantes.ICONO_CREAR, me.EventosBotonAsignar, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarOT', "Quitar OT's", "delete", me.EventosBotonAsignar, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        me.CargarcomponentesCodigoDefecto();
        me.storeTmp = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajo");
        me.storeTmp.setExtraParams({ Estados: ["APROBADA", "CON_MO", "CON_MAT", "ASIGNADA", "EN_EJEC"]/*, Tipo_ot: ["INSPECCION", "REPARACION_REEMPLAZO"] */ });
        me.storeTmp.on('load', me.CargarStoreOTAsignar, this);
        me.items = [
           me.formAsignacion,
           {
               xtype: 'fieldset',
               title: '<span style="color:red;font-weight:bold" data-qtip="Required">OBSERVACION: Campo Opcional para ASIGNACION y Campo obligatorio para REASIGNACION.</span>',
               layout: {
                   type: 'table',
                   columns: 2
               },
               items: [
                    me.gridOTAprobados,
                    me.gridOT
               ]
           }

        ];
    },
    CargarStoreOTAsignar: function (str, succes) {
        var me = this;
        if (succes = true) {
            str.each(function (record) {
                var seleccionados = record;
                if (me.gridOT.store.existeRecord('ID_OT', record.data.ID_OT) == false) {
                    var rec = new App.Model.OrdenesTrabajo.OrdenesTrabajo({
                        ID_OT: record.data.ID_OT,
                        ID_SOL_MAN: record.data.ID_SOL_MAN,
                        ASIGNADO_A: record.data.ASIGNADO_A,
                        NOMBRE_ASIGNADO: record.data.NOMBRE_ASIGNADO,
                        TIPO_OT: record.data.TIPO_OT,
                        LUGAR_TRABAJO: record.data.LUGAR_TRABAJO,
                        COD_MAN: record.data.COD_MAN,
                        COD_DEF: record.data.COD_DEF,
                        COD_SOL: record.data.COD_SOL,
                        ID_COD_DEF: record.data.ID_COD_DEF,
                        DESC_PROBL: record.data.DESC_PROBL,
                        MOTIVO: record.data.MOTIVO,
                        ESTADO: record.data.ESTADO
                    });
                    if (record.data.TIPO_OT == "REPARACION_REEMPLAZO") {
                        if (record.data.CON_PRESUPUESTO == false) {//Una OT de REPARACION Y REEMPLAZO necesita tener presupuesto para ser asignada
                            Ext.Msg.alert("Error", "La OT : " + record.data.ID_OT + " no tiene presupuesto. No puede ser Asignado.");
                        } else {
                            if (record.data.REPORTE_CONTRATISTA != "NO_REPORTE" && record.data.ESTADO != 'APROBADA') {//Una OT de REPARACION Y REEMPLAZO si tiene trabajos ejecutados por contratista no puede ser asignada
                                Ext.Msg.alert("Error", "La OT : " + record.data.ID_OT + " tiene TRABAJOS EJECUTADOS por CONTRATISTA. No puede ser Reasignado.");
                            }
                            else {
                                me.gridOT.store.insert(0, rec);
                                me.gridOT.getView().refresh();
                                me.gridOTAprobados.store.remove(record);
                            }
                        }
                    } else if (record.data.TIPO_OT == "PROYECTO") {//Una OT de PROYECTO no puede ser asignada porque todo su ciclo es realizado en MODULO de OBRAS
                        Ext.Msg.alert("Error", "La OT : " + record.data.ID_OT + " es tipo PROYECTO. No puede ser Asignado.");
                    } else
                        me.gridOT.store.insert(0, rec);
                    me.gridOT.getView().refresh();
                    me.gridOTAprobados.store.remove(record);
                }
                else {
                    Ext.MessageBox.alert('Error', "Ya fue seleccionada(as) la(s) OT.");
                }

            });

        }
    },
    CargarDatosOTdeSM: function (datosOT) {
        var me = this;
        me.storeTmp.load({ params: { ID_SOL_MAN: datosOT.get('ID_SOL_MAN') } });

    },

    CargarcomponentesCodigoDefecto: function () {
        var me = this;
        me.gridCodigoDefecto = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoDefecto' });
        me.winCodigoDefecto = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: true });
        me.winCodigoDefecto.add(me.gridCodigoDefecto);
        me.gridCodigoDefecto.on('celldblclick', me.CargarRecordDefecto, this);
    },
    CargarComponentesEjecutar: function () {
        var me = this;
        me.txt_numeroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "NRO_SOL",
            hidden: true
        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT",
            hidden: true
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            hidden: true,
        });
        me.cbx_poste = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Poste",
            name: "ID_OT_PT_INT",
            maxLength: 20,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: ['1', '10', '11', '2'],
            colspan: 2
            // store: me.store_moviles
        });
        me.store_codSol = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.cbx_codigoSolucion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Solucion',
            displayField: 'COD_SOL',
            valueField: 'ID_COD_SOL',
            name: 'COD_SOL',
            colspan: 2,
            store: me.store_codSol,
            textoTpl: function () {
                return '<h3>{COD_SOL} - {DESCRIP_SOL}</h3>';
            },
        });
        me.cbx_codigoSolucion.on('select', me.CargarRecord, this);
        me.gridCodSoluciones = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridCodigoSoluciones",
            busqueda: true,
            width: 755,
            height: 350,
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_QuitarSOL', "Quitar Soluncion", "delete", me.BorrarCodSol, me.toolbar, this);
        me.gridCodSoluciones.addDocked(me.toolbar, 1);

        me.items = [
            me.txt_numeroSolicitud,
            me.txt_nroOT,
            me.txt_estado,
            me.cbx_poste,
            me.cbx_codigoSolucion,
            me.gridCodSoluciones
        ];
    },
    CargarRecord: function (cmb, record) {
        var me = this;
        if (me.gridCodSoluciones.store.existeRecord('ID_COD_SOL', record[0].get('ID_COD_SOL')) == false) {
            var rec = new App.Model.SolicitudesMantenimiento.CodigosSolucion({
                ID_COD_SOL: record[0].get('ID_COD_SOL'),
                COD_SOL: record[0].get('COD_SOL'),
                DESCRIP_SOL: record[0].get('DESCRIP_SOL'),

            });
            me.gridCodSoluciones.store.insert(0, rec);
            me.gridCodSoluciones.getView().refresh();
        }
        else {
            Ext.MessageBox.alert('Error', "Ya fue seleccionado el Cod. Solicitud.");
        }
    },
    BorrarCodSol: function () {
        var me = this;
        var data = me.gridCodSoluciones.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.gridCodSoluciones.getStore().remove(data);
            me.gridCodSoluciones.getView().refresh();
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
        }
    },
    CargarComponentesCerrar: function () {
        var me = this;
        me.formCabecera = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormSolicitud', colspan: 2 });
        me.formCabecera.BloquearFormulario();
        me.formCuerpo = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormOTCierre', colspan: 2 });
        me.formCuerpo.BloquearFormulario();

        me.gridMaterialesOT = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "MaterialesOT",
            busqueda: true,
            width: 755,
            height: 200,
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarMaterial', "Agregar Material", "add", me.EventosBotonMaterial, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarMaterial', "Quitar Material", "delete", me.EventosBotonMaterial, me.toolbar, this);
        me.gridMaterialesOT.addDocked(me.toolbar, 1);
        me.items = [
            me.formCabecera,
            me.formCuerpo,
            me.gridMaterialesOT
        ];
    },
    CargarDatosSolicitud: function (record) {
        var me = this;
        me.getForm().reset();
        me.formCabecera.loadRecord(record);
        me.formCuerpo.txt_lugartrabajo.setValue(record.get('UBICACION'));
    },
    EventosBotonAsignar: function (btn) {
        var me = this; /////
        if (btn.getItemId() == 'btn_AgregarOT') {
            var seleccionadosOT = me.gridOTAprobados.obtenerSeleccionados();
            if (seleccionadosOT == false) {
                Ext.MessageBox.alert('Error', 'Seleccione OT(s) para asignar.');
            }
            else {
                Ext.each(seleccionadosOT, function (record) {
                    if (record.data.TIPO_OT == "PROYECTO") {//Las OT´S tipo PROYECTO no pueden ser asignadas porque todo su ciclo se realiza en el modulo de OBRAS
                        Ext.Msg.alert("Error", "La OT : " + record.data.ID_OT + " es tipo PROYECTO no puede asignarse.");
                        return false;
                    }
                    if (record.data.TIPO_OT == "REPARACION_REEMPLAZO") {
                        if (record.data.CON_PRESUPUESTO == false) {//Las OT`S tipo REPARACION Y REEMPLAZO deben tener presupuesto para poder ser asignadas
                            Ext.Msg.alert("Error", "La OT : " + record.data.ID_OT + " no tiene presupuesto.");
                            return false;
                        }
                    } if (record.data.REPORTE_CONTRATISTA != "NO_REPORTE" && record.data.ESTADO != 'APROBADA') {//Las OT´S tipo REPARACION Y REEMPLAZO no deben tener ni un trabajo ejecutado para contratista para ser asignado o reasignado
                        Ext.Msg.alert("Error", "La OT : " + record.data.ID_OT + " tiene TRABAJOS EJECUTADOS por CONTRATISTA.");
                        return false;
                    }
                    var seleccionados = record;
                    if (me.gridOT.store.existeRecord('ID_OT', record.data.ID_OT) == false) {
                        var rec = new App.Model.OrdenesTrabajo.OrdenesTrabajo({
                            ID_OT: record.data.ID_OT,
                            ID_SOL_MAN: record.data.ID_SOL_MAN,
                            ASIGNADO_A: record.data.ASIGNADO_A,
                            NOMBRE_ASIGNADO: record.data.NOMBRE_ASIGNADO,
                            TIPO_OT: record.data.TIPO_OT,
                            LUGAR_TRABAJO: record.data.LUGAR_TRABAJO,
                            COD_MAN: record.data.COD_MAN,
                            COD_DEF: record.data.COD_DEF,
                            COD_SOL: record.data.COD_SOL,
                            ID_COD_DEF: record.data.ID_COD_DEF,
                            DESC_PROBL: record.data.DESC_PROBL,
                            MOTIVO: record.data.MOTIVO,
                            ESTADO: record.data.ESTADO
                        });
                        me.gridOT.store.insert(0, rec);
                        me.gridOT.getView().refresh();
                        me.gridOTAprobados.store.remove(record);

                    }
                    else {
                        Ext.MessageBox.alert('Error', "Ya fue seleccionada(as) la(s) OT.");
                    }

                });
            }

        }
        else if (btn.getItemId() == 'btn_QuitarOT') {
            var me = this;
            var data = me.gridOT.getSelectionModel().getSelection()[0];

            if (data != null) {
                me.gridOT.getStore().remove(data);
                me.gridOT.getView().refresh();
                me.gridOTAprobados.getStore().load();
                me.RevisarExistentes();
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
            }
        }
        else if (btn.getItemId() == 'btn_AReasignaOTs') {
            var datosOTSM = me.gridSolicitudes.getSelectionModel().getSelection()[0];// alert(datosOT.get('RELEVAMIENTO'));
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            /* if (datosOT != null) {
                 alert(datosOT.get('ESTADO'));
                 alert('hi');//datosOT.get('TIPO_OT') != 'PROYECTO' ||
             }
             if (datosOT == null) {
                // alert(datosOT.get('ESTADO'));
                 alert('en1tre');
             }*/
            //alert('hi');
            if (me.winAsignarOT == null) {
                me.winAsignarOT = Ext.create("App.Config.Abstract.Window", {
                    botones: true,
                });

                me.formOT1 = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Asignacion de OT's",
                    botones: false,
                    height: 600,
                    width: 900,
                    opcion: 'Asignar'
                });
                if (datosOT != null) {
                    if (datosOT.get('TIPO_OT') != 'PROYECTO') {
                        me.formOT1.CargarDatosOTdeSM(datosOT);
                    }
                    /* else {
                         Ext.MessageBox.alert('Error', "La OT tipo PROYECTO no se puede asignar seleccione otra OT.");
                     }*/
                }
                else {
                    if (datosOTSM != null) {
                        me.formOT1.CargarDatosOTdeSM(datosOTSM);
                    }
                }
                me.winAsignarOT.add(me.formOT1);
                me.winAsignarOT.btn_guardar.on('click', me.grabarSeleccionOT, this);
                me.winAsignarOT.show();
            }
            else {
                me.formOT1.getForm().reset();
                me.formOT1.gridOTAprobados.getStore().load();
                me.formOT1.gridOT.getStore().load();
                me.winAsignarOT.show();
                if (datosOT != null) {
                    if (datosOT.get('TIPO_OT') != 'PROYECTO') {
                        me.formOT1.CargarDatosOTdeSM(datosOT);
                    }
                    /* else {
                         Ext.MessageBox.alert('Error', "La OT tipo PROYECTO no se puede asignar seleccione otra OT.");
                     }*/

                }
                else {
                    if (datosOTSM != null) {
                        me.formOT1.CargarDatosOTdeSM(datosOTSM);
                    }
                }
            }
        }
        else {
            Ext.MessageBox.alert('Error', "No existe ninguna Opcion para ese Botton");
        }

    },
    RevisarExistentes: function () {

        //me.gridOT.getStore()
    },
    EventosBotonMaterial: function (btn) {
        alert('Falta implementar');
    },
    EventosBotonOT: function (btn) {
        var me = this;

        if (btn.getItemId() == 'btn_AgregarOT') {
            if (me.formularioSolicitud.record != null && me.formularioSolicitud.record.get('ESTADO') == 'APROBADA') {
                if (me.winOT == null) {
                    me.winOT = Ext.create("App.Config.Abstract.Window", {
                        botones: true,
                        textGuardar: 'Guardar Orden Trabajo'
                    });
                    me.formOT = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
                        botones: false,
                        winPadre : me.winOT
                    });
                    //me.formOT.loadRecord(me.formularioSolicitud.record);
                    me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                    me.winOT.add(me.formOT);
                    me.formOT.formCuerpo.txt_ot_ext.setValue("F");
                    me.winOT.btn_guardar.on('click', me.GuardarOrdenTrabajo, this);
                    me.winOT.show();
                }
                else {
                    me.winOT.btn_guardar.setText('Guardar Orden Trabajo');
                    me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                    me.formOT.formCuerpo.txt_ot_ext.setValue("F");
                    me.formOT.formCuerpo.checkFormularioSolicitudObra.setDisabled(true);
                    me.formOT.tabPanel.setActiveTab(0);
                    me.formOT.formOTtipo1.gridReparacion.getStore().load();
                    me.formOT.formOTtipo1.setDisabled(true);
                    me.winOT.show();
                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud de Mantenimiento en Estado APROBADA caso Contrario Seleccione una OT Extraordinaria.");
            }
        }
        else if (btn.getItemId() == 'btn_EditarOT') {
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('ESTADO') == 'NUEVA') {
                me.EditarOT(datosOT, me.formularioSolicitud.record);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en Estado NUEVA.");
            }
        }
        else if (btn.getItemId() == 'btn_QuitarOT') {

            var data = me.gridOT.getSelectionModel().getSelection()[0];

            if (data != null && data.get('ESTADO') == 'NUEVA') {
                Funciones.AjaxRequestForm(me.controlador, me.accionQuitar, me, me.formularioSolicitud, me.gridOT, "Esta seguro(a) de eliminar la OT?", { ID_OT: data.get('ID_OT') }, null);
                //me.gridOT.getStore().remove(data);
                //me.gridOT.getView().refresh();
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione una Orden de Trabajo en estado NUEVA.');
            }
        }
        else if (btn.getItemId() == 'btn_FinOT') {
            if (me.formularioSolicitud.record != null && me.formularioSolicitud.record.get('ESTADO') == 'APROBADA') {
                Funciones.AjaxRequestGridArray(me.controlador, "FinOrdenesTrabajo", me, "Esta Seguro de Finalizar las OT's", { ESTADO_DESTINO: 'APROBADA', ID_SOL_MAN: me.formularioSolicitud.record.get('ID_SOL_MAN') }, [me.gridOT, me.gridSolicitudes]);
                //me.gridSolicitudes.getStore().load();
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una SM en Estado APROBADA");
            }
        }
        else if (btn.getItemId() == 'btn_OTExtraordinario') {
            if (me.formularioSolicitud.record != null && me.formularioSolicitud.record.get('ESTADO') == 'CON_OT') {
                if (me.gridOT.getStore().countRegistros('OT_EXTRA', 'T') >= 5) {
                    Ext.MessageBox.alert('Error', "la SM ya cuenta con 5  OT Extraordinaria");
                }
                else {

                    if (me.winOT == null) {
                        me.winOT = Ext.create("App.Config.Abstract.Window", {
                            botones: true,
                            textGuardar: 'Guardar Orden Trabajo ExtraOrdinaria'
                        });
                        me.formOT = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
                            botones: false,
                            winPadre : me.winOT
                        });
                        //me.formOT.loadRecord(me.formularioSolicitud.record);
                        me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                        me.winOT.add(me.formOT);
                        me.formOT.formCuerpo.txt_ot_ext.setValue("T");
                        me.winOT.btn_guardar.on('click', me.GuardarOrdenTrabajo, this);
                        me.winOT.show();
                    }
                    else {

                        me.winOT.btn_guardar.setText('Guardar Orden Trabajo ExtraOrdinaria');
                        me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                        me.formOT.formCuerpo.txt_ot_ext.setValue("T");
                        me.formOT.tabPanel.setActiveTab(0);
                        me.formOT.formCuerpo.checkFormularioSolicitudObra.setDisabled(true);
                        me.formOT.formOTtipo1.gridReparacion.getStore().load();
                        me.formOT.formOTtipo1.setDisabled(true);
                        me.winOT.show();
                    }

                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud de Mantenimiento en Estado CON_OT para añadir ");
            }
        }
        else if (btn.getItemId() == "btn_OTRegularizacion") {
            var seleccionadosOT = me.gridOT.getSelectionModel().getSelection()[0];

            if (seleccionadosOT != null) {
                if (seleccionadosOT.get('CON_TRAB_EJEC')) {
                    Funciones.AjaxRequestForm("OrdenesTrabajo", "GurdarOTRRdesdeOTInspeccion", me, me.formularioSolicitud, me.gridOT, "Esta Seguro de crear una OT de REGULARIZACION?", { ID_OT: seleccionadosOT.get('ID_OT') }, null);
                }
                else {
                    Ext.Msg.alert("Error", "Seleccione una OT con registro de Trabajo Diario");
                }
            } else {
                Ext.Msg.alert("Error", "Seleccione una OT para REGULARIZAR.");
            }
        }
        else if (btn.getItemId() == "btn_PresupuestoOT") {
            if (me.gridOT.getSelectionModel().getSelection()[0] != null) {/*
                Ext.Msg.alert("Aviso", "Seleccionar OT...");
                return false;
            }*/
                if (me.winPresupuesto == null) {
                    me.winPresupuesto = Ext.create("App.Config.Abstract.Window", {
                        botones: false,
                        textGuardar: 'Crear Presupuesto OT'
                    });
                    me.formPresupuesto = Ext.create("App.View.OrdenesTrabajo.FormPresupuesto", {
                        title: "Creación de Presupuesto para OT's",
                        botones: false,
                        opcion: 'Principal'
                    });
                    me.winPresupuesto.add(me.formPresupuesto);
                    me.formPresupuesto.CargarDatos(me.gridOT); // Enviamos el grid de OT
                    me.winPresupuesto.show();
                }
                else {
                    //me.formPresupuesto.grid.getStore().load();

                    me.formPresupuesto.getForm().reset();
                    me.formPresupuesto.CargarDatos(me.gridOT); // Enviamos el grid de OT
                    me.formPresupuesto.gridMateriales.getStore().removeAll();
                    me.winPresupuesto.show();
                }
            } else {
                Ext.Msg.alert("Error", "Seleccione una OT tipo Reparacion y Reemplazo para Presupuestar.");
            }
        }
        else {
            Ext.MessageBox.alert('Error', "No existe ninguna Opcion para ese Botton");
        }

    },
    EditarOT: function (OT, SM) {
        var me = this;
        if (me.winOT == null) {
            me.winOT = Ext.create("App.Config.Abstract.Window", {
                botones: true,
                textGuardar: 'Guardar Orden Trabajo'
            });
            me.formOT = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
                winPadre : me.winOT,
                botones: false
            });
            me.formOT.CargarDatosEditar(OT, SM);

            me.formOT.formCuerpo.txt_ot_ext.setValue("F");
            me.winOT.add(me.formOT);
            me.winOT.btn_guardar.on('click', me.GuardarOrdenTrabajo, this);
            me.winOT.show();
        }
        else {
            me.winOT.btn_guardar.setText('Guardar Orden Trabajo');
            me.formOT.CargarDatosEditar(OT, SM);
            me.formOT.formCuerpo.txt_ot_ext.setValue("F");
            me.winOT.show();
        }

        /* Cuando se edita una OT cuyo objeto a intervenir es Tramo, entonces por el evento asociado 
           a este boto de radio, se muestra la ventana de windowsFileUpload, para cargar archivos excel. 
           El codigo debajo, sirve para cerrar la ventana y evitar que el usuario la perciba */
        var winUpload = Ext.ComponentQuery.query('#windowfileupload')[0];
        if (winUpload != null) {
            winUpload.close();
        }

    },
    GuardarOrdenTrabajo: function () {
        var me = this;
        var objeto = null; var id_objeto = 0; var cod_objecto = null; cod_objecto2 = null; var id_objecto2 = 0;
        var checkboxSolicitudObra = me.formOT.formCuerpo.checkFormularioSolicitudObra;
        if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'POSTE') {
            if (me.formOT.formCuerpo.cmp_codigoPoste.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un POSTE");
            }
            else {
                id_objeto = me.formOT.formCuerpo.cmp_codigoPoste.txt_id.getValue();
                cod_objecto = me.formOT.formCuerpo.cmp_codigoPoste.txt_detalleComponente.getValue();
                id_objecto2 = 0;
                cod_objecto2 = null;
            }

        } else if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'PUESTO') {
            if (me.formOT.formCuerpo.cmp_codigoPuesto.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un PUESTO");
            } else {
                id_objeto = me.formOT.formCuerpo.cmp_codigoPuesto.txt_id.getValue();
                cod_objecto = me.formOT.formCuerpo.cmp_codigoPuesto.txt_detalleComponente.getValue();
                id_objecto2 = 0;
                cod_objecto2 = null;
            }

        } else if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'DERIVACION') {
            if (me.formOT.formCuerpo.cmp_codigoDerivacion.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un DERIVACION");
            } else {
                id_objeto = me.formOT.formCuerpo.cmp_codigoDerivacion.txt_id.getValue();
                cod_objecto = me.formOT.formCuerpo.cmp_codigoDerivacion.txt_detalleComponente.getValue();
                id_objecto2 = me.formOT.formCuerpo.cmp_codigoDerivacionFinal.txt_id.getValue();
                cod_objecto2 = me.formOT.formCuerpo.cmp_codigoDerivacionFinal.txt_detalleComponente.getValue();

            }
        } else if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'TRAMO') {
            objeto = 1;
            id_objeto = 1;
            id_objecto2 = 0;
            cod_objecto = me.formOT.formCuerpo.txt_codobjintervenido.getValue();
            cod_objecto2 = null;
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un POSTE,PUESTO, DERIVACION o TRAMO");
        }
        if (me.formOT.formCuerpo.cbx_tipo.getValue() == "REPARACION_REEMPLAZO" && me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] != 'POSTE') {
            if (Funciones.convertirJson(me.formOT.formOTtipo1.gridReparacion) == false) {
                Ext.Msg.alert("Error", "Agregar por lo menos un poste intervenido.");
                return false;
            } else if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'TRAMO' && me.formOT.formOTtipo1.gridReparacion.getStore().count()>5) {
                Ext.Msg.alert("Error", "Seleccione como maximo 5 postes a intervenir en OT de REPARACION Y REEMPLAZO, actualmente son: " + me.formOT.formOTtipo1.gridReparacion.getStore().count()+" postes");
                return false;
            }
        }
        if (me.formOT.formCuerpo.cbx_tipo.getValue() == "PROYECTO") {
            if (Funciones.convertirJson(me.formOT.formOTtipo1.gridReparacion) == false) {
                Ext.Msg.alert("Error", "Agregar al menos 6 postes intervenidos.");
                return false;
            }
        }
        if (me.formOT.formCuerpo.cbx_tipo.getValue() == "INSPECCION" && (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'DERIVACION' || me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'TRAMO')) {
            if (Funciones.convertirJson(me.formOT.formOTtipo1.gridReparacion) == false) {
                Ext.Msg.alert("Error", "Agregar al menos 1 poste intervenido.");
                return false;
            }
        }
        objeto = me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'];//POSTE/PUESTO/DERIVACION
        //  alert(objeto);
        //  alert(id_objeto);
        if (objeto != null && id_objeto != 0 && checkboxSolicitudObra.getValue()) {
            //  Funciones.AjaxRequestWin(me.controlador, me.accionGrabar, me.winOT, me.formOT.formCuerpo, me.gridOT, "Esta Seguro de Guardar la Orden de trabajo?", { ESTADO: 'NUEVA', ID_SOL_MAN: me.formOT.formCabecera.record.get('ID_SOL_MAN'), TIPO_OT: me.formOT.formCuerpo.cbx_tipo.getValue(), OBJETO: objeto, ID_OBJETO: id_objeto, COD_OBJETO: cod_objecto,ID_OBJ_INTERV_2 : id_objecto2,COD_OBJ_INTERV_2 : cod_objecto2 , UCReemplazos: Funciones.convertirJson(me.formOT.formOTtipo1.gridReparacion) }, me.winOT);
            //alert(me.formOT.formCuerpo.cbx_tipo.getValue());
            //alert(me.formOT.formOTtipo1.gridReparacion.getStore().data.items.length);
            if (me.formOT.formCuerpo.cbx_tipo.getValue() == 'PROYECTO' && me.formOT.formOTtipo1.gridReparacion.getStore().data.items.length<6) {
                Ext.Msg.alert("Error", "Agregar al menos 6 postes a intervenir.");
            } else if (me.formOT.formCuerpo.cbx_tipo.getValue() == 'REPARACION_REEMPLAZO' && me.formOT.formOTtipo1.gridReparacion.getStore().data.items.length >5) {
                Ext.Msg.alert("Error", "No puede agregar mas de 5 postes a intervenir.");
            }
            else {
                me.AjaxRequestForm(me.controlador, me.accionGrabar, me.formOT.winPadre, me.formOT.formCuerpo, me.gridOT, null, { ESTADO: 'NUEVA', ID_SOL_MAN: me.formOT.formCabecera.record.get('ID_SOL_MAN'), TIPO_OT: me.formOT.formCuerpo.cbx_tipo.getValue(), OBJETO: objeto, ID_OBJETO: id_objeto, COD_OBJETO: cod_objecto, ID_OBJ_INTERV_2: id_objecto2, COD_OBJ_INTERV_2: cod_objecto2, UCReemplazos: Funciones.convertirJson(me.formOT.formOTtipo1.gridReparacion) }, me.formOT.formCuerpo);

            }
        } else {
            checkboxSolicitudObra.getValue() ? Ext.MessageBox.alert('Error', "El objeto sujeto a inspeccion (TRAMO/PUESTO/POSTE) debe tener CODIGO.") : Ext.MessageBox.alert('Error', 'La OT que intenta crear, es del tipo PROYECTO. </br> Por favor, llene primero el formulario de Solicitud de Proyecto');//cuando no encuentra el id del valor cargado
        }
    },
    AjaxRequestForm: function (controlador, accion, mask, form, grid, msg, param, Formulario) {
        var me = this;
        var formSend = form.getForm();
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {
            /*  Ext.MessageBox.confirm('Confirmacion?', null, function (btn) {
                  if (btn == 'yes') {*/
            mask.el.mask('Procesando...', 'x-mask-loading');
            formSend.submit({
                submitEmptyText: false,
                url: Constantes.HOST + '' + controlador + '/' + accion + '',
                params: param,
                success: function (form, action) {
                    mask.el.unmask();
                    me.GuardarOrdenTrabajoValidado(param,'duplicado');
                },
                failure: function (form, action) {
                    mask.el.unmask();
                    if (action.result.msg == 'Se produjo un error al intentar validar la OT (No se guardo OT).') {
                        Ext.MessageBox.alert('Error', action.result.msg);
                    } else {
                        var result = action.result;
                        var btn_reporteRepetidos = Funciones.CrearMenu('btn_reporteRepetidos', 'Reporte Repetidos', Constantes.ICONO_VER, null, null, this);
                        btn_reporteRepetidos.on('click', function () {
                            me.generarReporte(param.OBJETO == "POSTE" || param.OBJETO == "PUESTO" || param.OBJETO == "TRAMO" || param.OBJETO == "DERIVACION" ? param.COD_OBJETO : null, (param.OBJETO == "POSTE" || param.OBJETO == "PUESTO" || param.OBJETO == "TRAMO" || param.OBJETO == "DERIVACION" ? param.OBJETO : null), result);

                            return false;
                        })
                        //********************************
                        //  var btn_reporteRepetidos = Funciones.CrearMenu('btn_reporteRepetidos', 'Reporte Repetidos', Constantes.ICONO_VER,, null, this);

                        Ext.MessageBox.confirm('Esta seguro de continuar con Guardar OT?', action.result.msg, function (btn) {
                            if (btn == 'yes') {
                                mask.el.unmask();
                                me.GuardarOrdenTrabajoValidado(param,null);
                            }
                        }, null, btn_reporteRepetidos);
                    }

                }
            });

            /* }
         });*/

        }
        else {

            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
  /*  verReporteReiteraciones: function (Cod, Obj, result) {
        var me = this;
        //   alert(Cod+'-->'+Obj);
        me.winCriterioRepetidos = Ext.create("App.Config.Abstract.Window", {
            botones: true,
            textGuardar: 'Generar Reporte'
        });
        me.formReporteRepetidos = Ext.create("App.View.SolicitudesMantenimiento.Forms", {
            botones: false,
            opcion: 'FormCriterioRepetidos'
        });
        me.formReporteRepetidos.grpb_grupoBoton.setValue({
            rb: [Obj]
        });
        me.formReporteRepetidos.txt_codigo.setValue(Cod);
        me.winCriterioRepetidos.add(me.formReporteRepetidos);
        me.winCriterioRepetidos.btn_guardar.on('click', function () { me.generarReporte(result) }, this);
        me.winCriterioRepetidos.show();
    },*/
    GuardarOrdenTrabajoValidado: function (param,msg) {
        var me = this;
        /*Funciones.*/me.AjaxRequestWin(me.controlador, 'GuardarOrdenesTrabajo', me.winOT, me.formOT.formCuerpo, me.gridOT, msg, param, me.winOT);
    },
    //Ajax Request Con Confirmacion para los Windows
    AjaxRequestWin: function (controlador, accion, mask, form, grid, msg, param, win) {

        var formSend = form.getForm();
        //var time = (timeout == null) ? 
        var mensaje = 'Esta Seguro de Guardar Los cambios?';//(msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (msg == null) {//existen repetidos
            if (formSend.isValid()) {
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
                            win.hide();
                        }
                    },
                    failure: function (form, action) {
                        mask.el.unmask();
                        Ext.MessageBox.alert('Error', action.result.msg);
                    }
                });
            }
            else {
                Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
            }
        } else {//no existen duplicados
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
        }
 
    },
    CargarComponentesEjecutaOT: function () {
        var me = this;
        //alert(me.getId());
        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            opcion: "GridOTElegidas",
            busqueda: true,
            ckeck: false,
            width: 755,
            height: 400,
            
            imagenPlanilla: false,
            paramsStore: { Estados: ["EN_EJEC"], Inspector: false },//ASIGNADA
            title: 'Ordenes de Trabajo Asignados'
        });
        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_ReporteOT', "Imprimir OT", Constantes.ICONO_PRINT, me.EventoEjecutar, me.toolbar, this);
        Funciones.CrearMenu('btn_TrabajoEjecutado', "Trabajos Ejecutados", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this, 'App.controller.OrdenesTrabajo.TrabajoDiario');
        if (!me.btn_TrabajoDiario) {
            Funciones.CrearMenu('btn_PlanillaInspeccion', "Planilla Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
            Funciones.CrearMenu('btn_InformeInspeccion', "Informe Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
            Funciones.CrearMenu('btn_EjecutarOT', "Ejecutar", "add", me.EventoEjecutar, me.toolbar, this);
        }
        me.gridOT.addDocked(me.toolbar, 1);
        me.items = [
           me.gridOT
        ];
    },
    CargarComponentesImprimirOT: function () {
        var me = this;

        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            opcion: "GridOTElegidas",
            busqueda: true,
            ckeck: true,
            Inspector: true,
            width: 755,
            height: 400,
            paramsStore: { Estados: ["ASIGNADA", "EN_EJEC"], Inspector: me.Inspector == null ? true : me.Inspector },
            title: 'Ordenes de Trabajo Asignados'
        });
        me.toolbar = Funciones.CrearMenuBar();
        //  Funciones.CrearMenu('btn_EjecutarOT', "Ejecutar", "add", me.EventoEjecutar, me.toolbar, this);
        Funciones.CrearMenu('btn_ReporteOT', "Imprimir OT's", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        me.items = [
           me.gridOT
        ];
    },
    CargarComponentesCerrarOT: function () {
        var me = this;

        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            opcion: "GridOTElegidas",
            busqueda: true,
            width: 755,
            height: 400,
            paramsStore: { ESTADO: 'EJECUTADA' },
            title: 'Ordenes de Trabajo Asignados'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CerrarOT', "Cerrar", "add", me.EventoEjecutar, me.toolbar, this);
        //Funciones.CrearMenu('btn_ReporteOT', "Reporte OT's", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        me.items = [
           me.gridOT
        ];
    },
    EventoEjecutar: function (btn) {
        var me = this;
        var data = me.gridOT.getSelectionModel().getSelection()[0];
        if (btn.getItemId() == 'btn_EjecutarOT') {
            if (data == null /*|| data.get('TIPO_OT') != 'INSPECCION'*/) {
                Ext.MessageBox.alert('Error', "Seleccione OT para Ejecutar.");
            }
            else {
                var params = { ID_OT: data.get('ID_OT'), TIPO_OT: data.get('TIPO_OT'), ESTADO_DESTINO: "EJECUTADA", ID_POSTE: 0, NRO_SOL: 0, listaCodSol: null, ID_OT_PT_INT: 0 };
                Funciones.AjaxRequestForm("OrdenesTrabajo", "GuardarEjecucionOrdenesTrabajo", me, me, me.gridOT, "Esta Seguro dar por Ejecutada esta OT?", params, null);
            }
        } else if (btn.getItemId() == 'btn_ReporteOT') {
            if (data != null) {

                if (data.get('ESTADO') == 'ASIGNADA' || data.get('ESTADO') == 'EN_EJEC') {
                    var modified = me.gridOT.getSelectionModel().getSelection();
                    var count = 0;
                    if (!Ext.isEmpty(modified)) {
                        var recordsToSend = [];
                        Ext.each(modified, function (record) {
                            recordsToSend.push(Ext.apply({ ID: record.data.ID_OT }));
                        });
                        recordsToSend = Ext.JSON.encode(recordsToSend);
                        window.open(Constantes.HOST + 'Reportes/ReporteOT?OTS=' + recordsToSend);
                    } else {
                        Ext.MessageBox.alert('Error', "Seleccione una OT ASIGNADA o EN_EJEC.");
                    }
                } else {
                    Ext.MessageBox.alert('Error', "Seleccione OT's para generar Imprimir OT's.");
                }

            } else {
                Ext.MessageBox.alert('Error', "Seleccione OT's para generar Imprimir OT's.");
            }



        }
        else if (btn.getItemId() == 'btn_CerrarOT') {

            if (data == null || data.get('TIPO_OT') != 'INSPECCION') {
                Ext.MessageBox.alert('Error', "Seleccione OT para Ejecutar que sea Tipo 'INSPECCION'.");
            }
            else {
                // alert(data.get('ID_OT'));
                var params = { ID_OT: data.get('ID_OT'), OBSERVACION: 'Cerrar OT' };//TIPO_OT: data.get('TIPO_OT'),
                Funciones.AjaxRequestForm(me.controlador, me.accionCerrar, me, me, me.gridOT, "Esta Seguro dar Cerrar esta OT?", params, null);
            }
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
        } else if (btn.getItemId() == 'btn_InformeInspeccion') {
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('TIPO_OT') != 'PROYECTO') {
                me.VentanaInforme(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT cuyo tipo OT sea diferente de PROYECTO");
            }
        }
        else if (btn.getItemId() == 'btn_TrabajoEjecutado') {
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            if (datosOT == null) {
                Ext.MessageBox.alert('Error', "Seleccione una OT en Estado EN_EJEC cuyo tipo OT sea diferente de PROYECTO");
            }
            /*Su evento esta controlado por el controller TrabajoDiario de la carpeta controller*/
        }
        else {
            alert('No existe Evento para ese boton');
        }
    },
    CargarCodDefecto: function (editor, e) {
        var me = this;
        //   alert(e.field);
        if (e.field == "COD_DEF") {
            me.gridCodigoDefecto.recordEdit = e.record;
            me.gridCodigoDefecto.recordName = "COD_DEF";
            me.gridCodigoDefecto.recordId = "ID_COD_DEF";
            Funciones.AjaxRequestRecord("Codigos", "BuscarCodigoDefecto", e.grid, e.record, "COD_DEF", "ID_COD_DEF", { codDef: e.value }, me.winCodigoDefecto);
        } else if (e.field == "MOTIVO") {
            me.recordEdit = e.record;
            me.recordName = "MOTIVO";
            //me.gridOT.OBSERVACION = e.value;
            e.record.set('MOTIVO', e.value);

        }

    },
    CargarRecordDefecto: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridCodigoDefecto.recordEdit.set(me.gridCodigoDefecto.recordName, record.get('COD_DEF'));
        me.gridCodigoDefecto.recordEdit.set(me.gridCodigoDefecto.recordId, record.get('ID_COD_DEF'));
        me.winCodigoDefecto.hide();
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

    VentanaInforme: function (OT) {
        // alert('entreVentanaINf');
        var me = this;
        me.winInforme = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Informe OT' });
        me.formInforme = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormInforme', botones: false });
        me.formInforme.loadRecord(OT);
        me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: OT.get('ID_OT') }, true);
        me.winInforme.add(me.formInforme);
        me.winInforme.btn_guardar.on('click', me.GrabarInformeInspeccion, this);
        me.winInforme.show();
    },
    GrabarInformeInspeccion: function () {
        var me = this;
        Funciones.AjaxRequestWin(me.controlador, me.accionGrabarInforme, me.winInforme, me.formInforme, null, 'Esta seguro de Guardar informe de OT?', null, me.winInforme);
    },
    GuardarPlanilla: function () {
        var me = this;
        Funciones.AjaxRequestWin("OrdenesTrabajo", "GuardarPlanillaInspeccion", me.winPlanilla, me.formPlanilla.formCabeceraPlanilla, me.gridOT, "Esta Seguro de Guardar La Planilla", { Detalles: Funciones.convertirJson(me.formPlanilla.gridDetallePlanilla), OBSERV: me.formPlanilla.txta_Observacion.getValue() }, me.winPlanilla);
    },
    generarReporte: function (objeto, codigo, result) {
        var me = this;
        /*var recordsToSend = [];
        for (var i = 0; i < result.total; i++) {
            recordsToSend.push(Ext.apply({ 
                ID_SOL_MAN: result.data[i].ID_SOL_MAN,
                ID_OT: result.data[i].ID_OT,
                TIPO_OT: result.data[i].TIPO_OT,
                ID_POSTE: result.data[i].ID_POSTE,
                COD_POSTE: result.data[i].COD_POSTE,
                COD_PUESTO: result.data[i].COD_PUESTO,
                ASIGNADO_A: result.data[i].ASIGNADO_A,
                ESTADO: result.data[i].ESTADO,
                DESC_PROBL: result.data[i].DESC_PROBL,
            }));
        }*/
        /*var objeto = me.formReporteRepetidos.grpb_grupoBoton.getValue()['rb'];
        var codigo = me.formReporteRepetidos.txt_codigo.getValue();
        var fecha = me.formReporteRepetidos.date_fecha.getValue();*/
        var file = result.data[0].FileName;
        /*if (result.total > 0) {
            recordsToSend = Ext.JSON.encode(recordsToSend);
        }*/
    /*    var f_fecha;
        var myDate = new Date(fecha);
        var f_fecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();*/
        if (objeto != null && codigo != '') {
            window.open(Constantes.HOST + 'Reportes/ReporteObjRepetidos?OBJETO=' + objeto + "&CODIGO=" + codigo + "&fileName=" + file);
        }
        else {
            Ext.MessageBox.alert('Error', "Criterios: Poste/Puesto, codigo y fecha son obligatorios");
        }
    },
    grabarSeleccionOT: function () {
        var me = this; //alert(me.formOT.gridOT.getSelectionModel().getSelection());
        var observacionReasignacion = false;
        var gridots = me.formOT1.gridOT.getStore();
        var mensajeObservaciones = '';
        gridots.each(function (record) {
            console.log(record.get('MOTIVO'));
            if (record.get('MOTIVO') == '' && (record.get('ESTADO') == 'ASIGNADA' || record.get("ESTADO") == 'EN_EJEC')) {
                observacionReasignacion = true;
                mensajeObservaciones += 'Usted esta reasignado la OT ' + record.get('ID_OT') + ' por tanto, es obligario ingresar una observacion. </br>';
            }
        });
        if (observacionReasignacion || me.formOT1.gridOT.getStore().getCount() == 0 || !(me.formOT1.formAsignacion.getForm().isValid())) {

            Ext.MessageBox.alert('Error', "Seleccione OT's para asignar y complete parametros. </br>" + mensajeObservaciones);
        }
        else {

            if ((me.formOT1.gridOT.getStore().getCount()) != 0 && (me.formOT1.formAsignacion.getForm().isValid())) {//!Ext.isEmpty(modified) && me.formOT.formAsignacion.getForm().isValid()
                var asignados = new Array();
                var reasignados = new Array();
                var error = new Array();
                var mensajeAsignada = '';
                var mensajeReasignada = '';
                var mensajeError = '';
                var mensaje = '';
                var submensaje = '';
                var recordsToSend = [];
                var existeReasignacion = false;
                me.formOT1.gridOT.getStore().each(function (record) {
                    var rec = Ext.create("App.Model.OrdenesTrabajo.OrdenesTrabajo", {
                        ID_OT: record.get('ID_OT'),
                        ASIGNADO_A: record.get('ASIGNADO_A'),
                        ESTADO: record.get('ESTADO'),
                    });
                    if (/*rec.get("ASIGNADO_A") == 0 &&*/ rec.get("ESTADO") == 'APROBADA') {//ASIGNARE POR PRIMERA VEZ
                        asignados.push(record.get('ID_OT'));//ingreso todos los id de las ot que se estan asignando
                    } else if (/*rec.get("ASIGNADO_A") != 0 && */(rec.get("ESTADO") == 'ASIGNADA' || rec.get("ESTADO") == 'EN_EJEC')) {
                        reasignados.push(record.get('ID_OT'));//ingreso todos los id de las ot que se estan reasignando
                    } /*else {
                        error.push(record.get('ID_OT'));//ingreso todos los id que estan con error
                    }*/
                });
                //Verifico si se tienen asginados, reasignados o con error dependiendo a esto tambien muestro el mensaje
                if (asignados != null) {
                    for (var i = 0; i < asignados.length; i++) {
                        if (i == 0) { mensajeAsignada = 'Nro OT Asignada(s): ' + asignados[i]; }
                        else { mensajeAsignada += ',' + asignados[i]; }
                    }
                    mensaje = mensaje + '<br><br>' + mensajeAsignada;
                }
                if (reasignados != null) {
                    for (var i = 0; i < reasignados.length; i++) {
                        if (i == 0) { mensajeReasignada = 'Nro OT Reasignada(s): ' + reasignados[i]; }
                        else { mensajeReasignada += ',' + reasignados[i]; }
                    }
                    mensaje = mensaje + '<br><br>' + mensajeReasignada;
                    //  submensaje = mensajeReasignada;
                    existeReasignacion = true;
                } else
                    existeReasignacion = false;
                /* var grid = null;
                 if (ot == null) {
                     me.grid = me.gridOT;
                 }*/
                //(controlador, accion, mask, form, grid, msg, param, win)
                
                Funciones.AjaxRequestWin(me.controlador, me.accionGrabarAsignar, me.winAsignarOT, me.formOT1, me.gridOT, mensaje, { listaOts: Funciones.convertirJson(me.formOT1.gridOT) }, me.winAsignarOT);
               // me.formOT1.gridOT.getStore().load(); si se habilita se borrara los registros del grid de seleccionadas antes de confirmar o rechazar accion
                //me.formOT1.gridOTAprobados.getStore().load();
            } else if (!(me.formOT1.formAsignacion.getForm().isValid())) {
                Ext.MessageBox.alert('Error', "Faltan Parametros.");
            } else if (me.formOT1.gridOT.getStore().getCount() == 0) {
                Ext.MessageBox.alert('Error', "Seleccione OT's para asignar.");
            }

        }
    },
});
