Ext.define("App.View.OrdenesTrabajo.FormDetallePlanilla", {
    extend: "App.Config.Abstract.Form",
    title: "Detalle de la Planilla de Inspeccion",
    cargarStores: true,
    columns: 2,
    opcion: '',
    winUC: null,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormSubDetalle") {
            me.CargarFormSubDetalle();
            me.eventosSubDetallePlanilla(true);
        }
            //formulario para el detalle de planilla por grupo
        else if (me.opcion == "FormDetalleGrupo") {
            me.CargarFormDetalleGrupo();
            me.eventosSubDetallePlanilla(false);
        }


        else if (me.opcion == "FormCambioUC") {
            me.CargarFormCambioUC();
        }
        else if (me.opcion == "FormAgregarPoste") {
            me.CargarFormAgregarPoste();
            me.EventosFormAgregarPoste();
        }
        else if (me.opcion == "FormAgregarUC") {
            me.CargarFormAgregarUC();

        }
        else {
            alert("No selecciono ninguna Opcion");
        }
        me.callParent(arguments);
    },
    CargarFormSubDetalle: function () {
        var me = this;
        me.txt_cod_posteCnd = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "CODIGO",
            fieldLabel: "Cod. Poste / Conductor",
            readOnly: true,
        });
        me.txt_piquete = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'PIQUETE',
            fieldLabel: 'Piquete',
            readOnly: true
        });
        me.txt_nivel = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'NIVEL',
            fieldLabel: 'Nivel',
            readOnly: true
        });
        me.txt_formacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'FORMACION_CND',
            fieldLabel: 'Formacion Cnd',
            readOnly: true
        });
        me.txt_longitud = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'LONGITUD',
            fieldLabel: 'Longitud Cnd',
            readOnly: true,
            colspan : 2
        });
        me.txt_detalle = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'DESCRIPCION',
            maxLength: 250,
            fieldLabel: 'Descripcion',
            readOnly: true
        });
        me.txt_uc = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'COD_UC',
            fieldLabel: 'Unidad Constructiva',
            readOnly: true
        });
        me.cmp_cod_uc = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Modificar UC',
            btn_iconCls: 'link_edit',
            btn_tooltip: 'Modificar Unidad Constructivas Del Poste',
            colspan: 1,
            columns: 2,
            botton: true,
            cmpArray: [me.txt_uc]
            //componente: ,
        });
        me.store_codManUC = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento");
        me.cbx_codigoMantenimiento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Mantenimiento UC',
            displayField: 'COD_MAN',
            valueField: 'COD_MAN',
            name: 'COD_MAN_UC',
            //colspan: 3,
            width: 240,
            store: me.store_codManUC,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_MAN} - {DESCRIP_MAN}</h3>';
            }
        });
        me.txt_cod_man = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_MAN",
            maxLength: 500,
            readOnly: true,
        });
        me.cnt_codman = Ext.create("App.Config.Componente.FieldContainerBase", {
            columns: 2,
            colspan: 2,
            cmpArray: [me.cbx_codigoMantenimiento, me.txt_cod_man]
        });
        me.store_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_codSol = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.cbx_codigoSolucion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Solucion',
            displayField: 'COD_SOL',
            valueField: 'COD_SOL',
            name: 'COD_SOL',
            //colspan: 1,
            width: 240,
            store: me.store_codSol,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_SOL} - {DESCRIP_SOL}</h3>';
            }
        });
        me.txt_cod_sol = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_SOL",
            maxLength: 500,
            width: 240,
            readOnly: true
        });
        me.cmp_cod_sol = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Otros Items',
            btn_iconCls: 'add',
            btn_tooltip: 'Otros Items',
            btn_id: 'btn_materiales_add',
            colspan: 3,
            columns: 3,
            botton: false,
            cmpArray: [me.cbx_codigoSolucion, me.txt_cod_sol],
            //componente: me.cbx_codigoSolucion,
        });
        me.gridDetalleAcciones = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridSubDetallesPlanilla",
            width: 550,
            height: 300,
            colspan: 2,
            editar: true,
            handler: me.EliminarItemMaterial
        });
        // se mostrar solo los materiales en ESTADO ACTIVO
        me.store_otros_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_otros_materiales.setExtraParams({ IDSTATUS: 1 });

        me.cbx_materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Otros Materiales',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
            //colspan: 1,
            width: 240,
            store: me.store_otros_materiales,
            textoTpl: function () {
                return '<div class="{CSSSTATUS}">{COD_ALTERNATIVO} - {DESCRIPCION}</div>';
            }
        });
        me.txt_cod_mat = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION_MAT",
            maxLength: 500,
            width: 240,
            readOnly: true
        });
        me.cmp_materiales = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Material',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar los materiales seleccionados',
            btn_id: 'btn_material_otros_add',
            colspan: 3,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_materiales, me.txt_cod_mat],
            //componente: me.cbx_codigoSolucion,
        });
        me.items = [
            me.txt_cod_posteCnd,
            me.txt_detalle,
            me.txt_piquete,
            me.txt_nivel,
            me.txt_formacion,
            
            me.cmp_cod_uc,
            me.txt_longitud,
            me.cnt_codman,
            me.cmp_cod_sol,
            me.cmp_materiales,
            me.gridDetalleAcciones
        ];

    },
    CargarFormCambioUC: function () {
        var me = this;
        me.txt_uc = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'COD_UC',
            fieldLabel: 'UC Actual',
            readOnly: true
        });
        me.store_uc = Ext.create("App.Store.Postes.UnidadesConstructivasCatalogo");
        me.cbx_unidadConstructivas = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Unidad Constructivas',
            displayField: 'COD_UC',
            valueField: 'ID_UC',
            name: 'ID_UC',
            colspan: 1,
            //width: 220,
            store: me.store_uc,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_UC}&tamano=150&TABLA=MN_UNIDADES_CONS" /><h3>{COD_UC} - {DESCRIPCION}</h3>';
                return '<h3>{COD_UC} - {DESCRIPCION}</h3>';
            },
        });
        me.items = [
            me.txt_uc,
            me.cbx_unidadConstructivas
        ];

    },
    CargarFormAgregarPoste: function () {
        var me = this;
        me.store_codPoste = Ext.create("App.Store.Postes.Postes");
        me.cbx_poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Poste',
            displayField: 'COD_POSTE',
            valueField: 'COD_POSTE',
            name: 'COD_POSTE',
            colspan: 1,
            store: me.store_codPoste,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_POSTE}&tamano=150&TABLA=MN_POSTES" /> <h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
                return '<h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
            },
        });
        me.num_pique = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Piquete",
            name: "PIQUETE",
            maxLength: 2,
            colspan: 1,
            maxValue: 99,
            allowNegative: false,
            allowDecimals: false,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.formPoste = Ext.create("App.View.Postes.Forms", { botones: false, opcion: 'FormPoste', title: '', colspan: 2 });
        Funciones.BloquearFormularioReadOnly(me.formPoste);
        me.items = [
                me.cbx_poste,
                me.num_pique,
                me.formPoste
        ];

    },

    CargarFormAgregarUC: function () {
        var me = this;
        me.txt_poste = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'CODIGO',
            fieldLabel: 'Poste',
            readOnly: true,
            colspan: 2
        });
        me.store_uc = Ext.create("App.Store.Postes.UnidadesConstructivasCatalogo");
        me.cbx_unidadConstructivas = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Unidad Constructivas',
            displayField: 'COD_UC',
            valueField: 'ID_UC',
            name: 'ID_UC',
            colspan: 2,
            //width: 220,
            store: me.store_uc,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_UC}&tamano=150&TABLA=MN_UNIDADES_CONS" /><h3>{COD_UC} - {DESCRIPCION}</h3>';
                return '<h3>{COD_UC} - {DESCRIPCION}</h3>';
            },
        });
        me.store_tension = Ext.create('App.Store.Listas.StoreLista');
        me.store_tension.setExtraParam('ID_LISTA', Lista.Buscar('TENSION'));
        me.cbx_tension = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tension",
            name: "TENSION",
            displayField: 'VALOR',
            colspan: 2,
            store: me.store_tension,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.items = [
            me.txt_poste,
            me.cbx_tension,
            me.cbx_unidadConstructivas
        ];

    },
    EventosFormAgregarPoste: function () {
        var me = this;
        me.cbx_poste.on('select', function (cmb, record) {
            me.formPoste.getForm().reset();
            me.formPoste.loadRecord(record[0]);
        });
    },
    eventosSubDetallePlanilla: function (uc) {
        var me = this;
        me.cbx_codigoMantenimiento.on('select', function (cmb, record) {
            me.store_codSol.setExtraParam("ID_COD_MAN", record[0].get('ID_COD_MAN'));
            me.store_codSol.load();
            me.txt_cod_man.setValue(record[0].get('DESCRIP_MAN'));
        });
        me.cbx_codigoSolucion.on('select', function (cmb, record) {
            if (me.isValid()) {
                me.store_materiales.setExtraParam("ID_COD_SOL", record[0].get('ID_COD_SOL'));
                me.store_materiales.load();
                me.txt_cod_sol.setValue(record[0].get('DESCRIP_SOL'));
            }
            else { Ext.Msg.alert("Error", "Complete el formulario"); }
        });
        me.store_materiales.on('load', function (str, records, successful, eOpts) {
            if (successful) {
                if (str.count() == 0) {
                    //Ext.Msg.alert("Aviso", "el Codigo de Solucion : " + me.cbx_codigoSolucion.getValue() + " - No Cuenta con Materiales");
                    //return false;
                    //en caso de que el codigo de solucion no contiene materiales le preguntara si desea agregar la solucion como Item
                    Ext.MessageBox.confirm('Confirmacion?', 'El Codigo de Solucion no Cuenta con Materiales desea agregar la Solucion', function (btn) {
                        if (btn == 'yes') {
                            var rec = Ext.create("App.Model.OrdenesTrabajo.DetallesSubPlanilla", {
                                ID_PLA_DET: me.record.get('ID_PLA_DET'),
                                CANT_PRE: 1,
                                IDSTATUS : 1,
                                COD_PROD: me.cbx_codigoSolucion.datos[0].get('COD_SOL'),
                                DESC_PROD: me.cbx_codigoSolucion.datos[0].get('DESCRIP_SOL'),
                                UNID_PROD: "UND",
                                ID_COD_MAN: me.cbx_codigoMantenimiento.datos[0].get('ID_COD_MAN'),
                                COD_MAN: me.cbx_codigoMantenimiento.datos[0].get('COD_MAN'),
                                ID_COD_SOL: me.cbx_codigoSolucion == null ? '' : me.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
                                COD_SOL: me.cbx_codigoSolucion == null ? '' : me.cbx_codigoSolucion.datos[0].get('COD_SOL'),
                            });
                            me.gridDetalleAcciones.getStore().insert(0, rec);
                            me.gridDetalleAcciones.getView().refresh();
                            return false;
                        }
                        else {
                            return false;
                        }
                    });
                }
                str.each(function (rc) {
                    if (!me.gridDetalleAcciones.getStore().existeRecord('IDPRODUCTO', rc.get('IDPRODUCTO'))) {
                        var rec = Ext.create("App.Model.OrdenesTrabajo.DetallesSubPlanilla", {
                            IDPRODUCTO: rc.get('IDPRODUCTO'),
                            IDSTATUS : rc.get('IDSTATUS'),
                            ID_PLA_DET: me.record.get('ID_PLA_DET'),
                            CANT_PRE: 1,
                            COD_PROD: rc.get('COD_ALTERNATIVO'),
                            DESC_PROD: rc.get('DESCRIPCION'),
                            UNID_PROD: rc.get('IDUNIDAD'),
                            ID_COD_MAN: me.cbx_codigoMantenimiento.datos[0].get('ID_COD_MAN'),
                            COD_MAN: me.cbx_codigoMantenimiento.datos[0].get('COD_MAN'),
                            ID_COD_SOL: me.cbx_codigoSolucion == null ? '' : me.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
                            COD_SOL: me.cbx_codigoSolucion == null ? '' : me.cbx_codigoSolucion.datos[0].get('COD_SOL'),
                        });
                        me.gridDetalleAcciones.getStore().insert(0, rec);
                        me.gridDetalleAcciones.getView().refresh();
                    }
                });
            }
        });
        if (uc) {
            me.cmp_cod_uc.btn.on('click', function () {
               
                win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Modificar UC'});
                form = Ext.create('App.View.OrdenesTrabajo.FormDetallePlanilla', { opcion: 'FormCambioUC', botones: false, title: 'Formulario Cambio de UC de un Poste' });
                form.loadRecord(me.record);
                win.add(form);
                win.btn_guardar.on('click', function () {
                    //
                    Funciones.AjaxRequestWin('OrdenesTrabajo', 'GuardarModificacionPlanilla', win, form, me.gridDetalleAcciones, 'Se borraran sus registros de mantenimiento asociados a la UC. Esta seguro de continuar', { ID_PLA_DET: me.record.get('ID_PLA_DET'), ID_POSTE: me.record.get('ID_POSTE'), ID_PLA: me.record.get('ID_PLA') }, win);
                });
                win.show();
                //alert("asda");
            });
        }
        me.cbx_materiales.on('select', function (cmb, record) {
            me.txt_cod_mat.setValue(record[0].get('DESCRIPCION'));
        });
        me.cmp_materiales.btn.on('click', function () {
            if (me.isValid() && me.cbx_materiales.getValue() != null) {
                var rc = me.cbx_materiales.datos[0];
                if (!me.gridDetalleAcciones.getStore().existeRecord('IDPRODUCTO', rc.get('IDPRODUCTO'))) {
                    var rec = Ext.create("App.Model.OrdenesTrabajo.DetallesSubPlanilla", {
                        IDPRODUCTO: rc.get('IDPRODUCTO'),
                        ID_PLA_DET: me.record.get('ID_PLA_DET'),
                        CANT_PRE: 1,
                        IDSTATUS: 1,
                        COD_PROD: rc.get('COD_ALTERNATIVO'),
                        DESC_PROD: rc.get('DESCRIPCION'),
                        UNID_PROD: rc.get('IDUNIDAD'),
                        ID_COD_MAN: me.cbx_codigoMantenimiento.datos[0].get('ID_COD_MAN'),
                        COD_MAN: me.cbx_codigoMantenimiento.datos[0].get('COD_MAN'),
                        ID_COD_SOL: me.cbx_codigoSolucion.getValue() == null ? '' : me.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
                        COD_SOL: me.cbx_codigoSolucion.getValue() == null ? '' : me.cbx_codigoSolucion.datos[0].get('COD_SOL'),
                    });
                    me.gridDetalleAcciones.getStore().add(rec);
                    me.gridDetalleAcciones.getView().refresh();
                }
            }
            else {
                Ext.Msg.alert("Error", "Complete el Formulario para Agregar un material o Seleccione un Material para Añadir a DETALLE...");
            }
        });
    },
    CargarDatosFormSubDetalle: function (detalle) {
        var me = this;
        me.getForm().reset();
        me.loadRecord(detalle);
        me.record = detalle;
        if (detalle.get('ID_UC') != 0) {
            me.store_codManUC.setExtraParam("ID_UC", detalle.get('ID_UC'));
            me.store_codManUC.load();
        }
        else {
            me.cmp_cod_uc.btn.setDisabled(true);
        }
        me.gridDetalleAcciones.getStore().setExtraParams({ ID_PLA_DET: detalle.get('ID_PLA_DET') });
        me.gridDetalleAcciones.getStore().load();

    },
    eventosDetallePlanilla: function () {
        var me = this;
        me.grpb_grupoBoton.on('change', me.CargarRadioButton, this);
        me.cbx_conductor.on('select', function (cmb, record) {
            me.txt_formacion.setValue(record[0].get('FORMACION'));
        });
        me.cbx_poste.on('select', function (cmb, record) {

            //Funciones.resetForm(me, ["rb"]);
            Funciones.resetCmpArray([me.cbx_unidadConstructivas, me.txt_desc_uc, me.cbx_codigoMantenimiento, me.txt_cod_man, me.cbx_codigoSolucion, me.txt_cod_sol, me.cbx_materiales, me.txt_cod_mat]);
            me.store_uc.setExtraParam("ID_POSTE", record[0].get('ID_POSTE'));
            me.store_uc.load();
        });
        me.cbx_unidadConstructivas.on('select', function (cmb, record) {
            me.store_codManUC.setExtraParam("ID_UC", record[0].get('ID_UC'));
            me.store_codManUC.load();
            me.txt_desc_uc.setValue(record[0].get('DESCRIPCION'));
        });
        me.cbx_unidadConstructivas.on('focus', function () {
            me.store_uc.load();
        });
        me.cbx_codigoMantenimiento.on('select', function (cmb, record) {
            me.store_codSol.setExtraParam("ID_COD_MAN", record[0].get('ID_COD_MAN'));
            me.store_codSol.load();
            me.txt_cod_man.setValue(record[0].get('DESCRIP_MAN'));
        });
        me.cbx_codigoMantenimientoConductor.on('select', function (cmb, record) {
            me.store_codSol.setExtraParam("ID_COD_MAN", record[0].get('ID_COD_MAN'));
            me.store_codSol.load();
            me.txt_desc_cnd.setValue(record[0].get('DESCRIP_MAN'));
        });
        me.cbx_materiales.on('select', function (cmb, record) {
            me.txt_cod_mat.setValue(record[0].get('DESCRIPCION'));
        });
        me.cbx_codigoSolucion.on('select', function (cmb, record) {
            me.store_materiales.setExtraParam("ID_COD_SOL", record[0].get('ID_COD_SOL'));
            me.store_materiales.load();
            me.txt_cod_sol.setValue(record[0].get('DESCRIP_SOL'));
        });
        me.cmp_materiales.btn.on('click', me.cargarOtrosMateriales, me);

        me.cmp_cod_uc.btn.on('click', me.cargarVentanaUC, this);
        me.cmp_cod_poste.btn.on('click', me.cargarVentanaPosteOT, this);
        me.cmp_cod_sol.btn.on('click', function () {
            if (me.isValid()) {
                if (me.store_materiales.count() > 0) {
                    var codigo = "";
                    var id_poste = 0;
                    var id_conductor = 0;
                    if (me.cbx_poste.isDisabled() == true) {
                        var recordConductor = me.cbx_conductor.datos[0];
                        id_poste = 0;
                        id_conductor = recordConductor.get('ID_CONDUCTOR');
                        codigo = recordConductor.get('COD_CONDUCTOR');
                        formacion = recordConductor.get('FORMACION');
                    }
                    else {
                        var recordPuesto = me.cbx_poste.datos[0];
                        id_conductor = 0;
                        id_poste = recordPuesto.get('ID_POSTE');
                        codigo = recordPuesto.get('COD_POSTE');
                        formacion = null;
                    }
                    var recordUC = me.cbx_poste.isDisabled() ? null : me.cbx_unidadConstructivas.datos[0];
                    me.store_materiales.each(function (record) {
                        if (me.gridDetalleMaterial.getStore().existeRecord('IDPRODUCTO', record.get('IDPRODUCTO')) && (me.gridDetalleMaterial.getStore().existeRecord('COD_SOL', me.cbx_codigoSolucion.datos[0].get('COD_SOL')))) {
                            //Ext.MessageBox.alert('Error', "Ya Selecciono Ese Material");
                        }
                        else {
                            var rec = Ext.create("App.Model.OrdenesTrabajo.DetalleMaterial", {
                                IDPRODUCTO: record.get('IDPRODUCTO'),
                                ID_POSTE: id_poste,
                                ID_CONDUCTOR: id_conductor,
                                FORMACION_CND: formacion,
                                CODIGO: codigo,
                                ID_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('ID_UC'),
                                COD_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('COD_UC'),
                                TENSION: me.cbx_poste.isDisabled() ? null : recordUC.get('TENSION'),
                                DESCRIPCION_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('DESCRIPCION'),
                                ID_COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('ID_COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('ID_COD_MAN'),
                                COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('COD_MAN'),
                                COD_ALTERNATIVO: record.get('COD_ALTERNATIVO'),
                                DESCRIPCION: record.get('DESCRIPCION'),
                                UNIDAD: record.get('IDUNIDAD'),
                                CANT_PRE: 1,
                                CANTIDAD: me.num_cantidadUC.isDisabled() ? 1 : me.num_cantidadUC.getValue(),
                                ID_COD_SOL: me.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
                                COD_SOL: me.cbx_codigoSolucion.datos[0].get('COD_SOL')
                            });
                            me.gridDetalleMaterial.getStore().insert(0, rec);
                            me.gridDetalleMaterial.getView().refresh();
                        }
                    });
                }
                else {
                    Ext.Msg.alert("Aviso", "No Existe Materiales para Agregar Seleccione otro Codigo de solucion que Contenga  Materiales");
                }
            }
            else {
                Ext.Msg.alert("Error", "Complete el Formulario para Agregar un material");
            }
        });
    },
    cargarOtrosMateriales: function () {
        var me = this;
        if (me.isValid() && me.cbx_materiales.getValue() != null) {
            var codigo = "";
            var id_poste = 0;
            var id_conductor = 0;
            if (me.cbx_poste.isDisabled() == true) {
                var recordConductor = me.cbx_conductor.datos[0];
                id_poste = 0;
                id_conductor = recordConductor.get('ID_CONDUCTOR');
                codigo = recordConductor.get('COD_CONDUCTOR');
                formacion = recordConductor.get('FORMACION');
            }
            else {
                var recordPuesto = me.cbx_poste.datos[0];
                id_conductor = 0;
                id_poste = recordPuesto.get('ID_POSTE');
                codigo = recordPuesto.get('COD_POSTE');
                formacion = null;
            }
            var record = me.cbx_materiales.datos[0];
            if (me.gridDetalleMaterial.getStore().existeRecord('IDPRODUCTO', record.get('IDPRODUCTO')) && (me.gridDetalleMaterial.getStore().existeRecord('COD_SOL', me.cbx_codigoSolucion.datos[0].get('COD_SOL')))) {
                Ext.MessageBox.alert('Error', "Ya Selecciono Ese Material con esa solucion Seleccione Otra");
            }
            else {

                var recordUC = me.cbx_poste.isDisabled() ? null : me.cbx_unidadConstructivas.datos[0];
                var rec = Ext.create("App.Model.OrdenesTrabajo.DetalleMaterial", {
                    IDPRODUCTO: record.get('IDPRODUCTO'),
                    ID_POSTE: id_poste,
                    ID_CONDUCTOR: id_conductor,
                    FORMACION_CND: formacion,
                    CODIGO: codigo,
                    ID_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('ID_UC'),
                    COD_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('COD_UC'),
                    TENSION: me.cbx_poste.isDisabled() ? null : recordUC.get('TENSION'),
                    DESCRIPCION_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('DESCRIPCION'),
                    ID_COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('ID_COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('ID_COD_MAN'),
                    COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('COD_MAN'),
                    COD_ALTERNATIVO: record.get('COD_ALTERNATIVO'),
                    DESCRIPCION: record.get('DESCRIPCION'),
                    UNIDAD: record.get('IDUNIDAD'),
                    CANT_PRE: 1,
                    CANTIDAD: me.num_cantidadUC.isDisabled() ? 1 : me.num_cantidadUC.getValue(),
                    ID_COD_SOL: me.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
                    COD_SOL: me.cbx_codigoSolucion.datos[0].get('COD_SOL')
                });
                me.gridDetalleMaterial.getStore().add(rec);
                me.gridDetalleMaterial.getView().refresh();
            }
        }
        else {
            Ext.Msg.alert("Error", "Complete el Formulario para Agregar un material o Seleccione un Material para Añadir a DETALLE...");
        }
    },
    cargarVentanaUC: function () {
        var me = this;
        if (me.cbx_poste.getValue() != null) {
            if (me.winPoste == null) {
                me.winPoste = Ext.create("App.Config.Abstract.Window");
                me.formConfigPuesto = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPoste' });
                me.formConfigPuesto.loadRecord(me.cbx_poste.datos[0]);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: me.cbx_poste.datos[0].get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.add(me.formConfigPuesto);
                me.winPoste.show();
            }
            else {
                me.formConfigPuesto.getForm().reset();
                me.formConfigPuesto.loadRecord(me.cbx_poste.datos[0]);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: me.cbx_poste.datos[0].get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione Primero un Poste para Configurar UC con Postes")
        }
    },
    cargarVentanaPosteOT: function () {
        var me = this;

        if (me.winPosteOT == null) {
            me.winPosteOT = Ext.create("App.Config.Abstract.Window");
            me.formConfigPuestoOT = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPosteOT' });
            me.formConfigPuestoOT.loadRecord(me.OT);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: me.OT.get('ID_OT') });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.add(me.formConfigPuestoOT);
            me.winPosteOT.show();
        }
        else {
            me.formConfigPuestoOT.getForm().reset();
            me.formConfigPuestoOT.loadRecord(me.OT);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: me.OT.get('ID_OT') });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.show();
        }
    },
    CargarRadioButton: function (rdb, newValue, oldValue, eOpts) {
        var me = this;
        if (newValue.rb == "POSTE") {
            Funciones.resetForm(me, ["rb"]);
            me.DesbloquearFormulario(["COD_CONDUCTOR", "FORMACION", "COD_MAN_CND", "DESCRIP_MAN_CONDUCTOR"]);
            //me.gridDetalleMaterial.getStore().removeAll();
            //me.gridDetalleMaterial.getView().refresh();
        }
        else {
            Funciones.resetForm(me, ["rb"]);
            me.BloquearFormulario(["COD_CONDUCTOR", "FORMACION", "COD_MAN_CND", "COD_SOL", "DESCRIP_SOL", "rb", "btn_materiales_add", "btn_material_otros_add", "DESCRIPCION_MAT", "COD_ALTERNATIVO", "CANT_PRE", "DESCRIP_MAN_CONDUCTOR"]);
            //me.gridDetalleMaterial.getStore().removeAll();
            //me.gridDetalleMaterial.getView().refresh();
        }
    },
    //Cargar Postes y Conductores de una ot usado para Formulario Planilla
    CargarOT: function (record) {
        //alert(record.get('ID_OT'));
        //this.txt_id.setValue()
        this.OT = record;
        this.store_codPoste.setExtraParam("ID_OT", record.get('ID_OT'));
        this.store_cnd.setExtraParam("ID_OT", record.get('ID_OT'));
        this.store_codPoste.load();
        this.store_cnd.load();
    },
    ValidarValoresGrid: function (store1, store2) {
        var me = this;
        store2.each(function (record) {
            if (store1.existeRecord('ID_PRODUCTI', record.get('ID_PRODUCTO'))) {
                alert("Existe ese Producto" || record.get('ID_PRODUCTO'));
                return false;
            }
        });

    },
    EliminarItemMaterial: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.get('ID_DET_MNT') > 0) {
            Funciones.AjaxRequestGrid("OrdenesTrabajo", "EliminarDetallePlanillaMantenimiento", grid, "Esta Seguro de Eliminar el Item", { ID_DET_MNT: rec.get('ID_DET_MNT') }, grid);
        }
        else {
            grid.getStore().removeAt(rowIndex);
        }
        //alert("Terminate " + rec.get('firstname'));
    },

    //Cargar los componenes para el formulario de detalle de planilla por grupo los componentes se adecuaran en 3 columnas
    CargarFormDetalleGrupo: function () {
        var me = this;

        me.gridDetallePoste = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridDetallePlanillaCorto",
            width: 265,
            title: 'Detalle Planilla',
            editar: true,
            conPie: true,
            height: 250,
            //colspan: 3
        });
        //evento donde se guardar en una variable los seleccionado
        //me.gridDetallePoste.on('itemclick', me.onItemClick, this);
        //evento donde se habilitara o desabilitara algunos botones segun la seleccion
        me.gridDetallePoste.getSelectionModel().on('selectionchange', me.onSelectChange, this);

        me.gridDetalleGrupo = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridDetallePlanillaCorto",
            width: 265,
            title: 'Seleccion de Postes y Conductores',
            editar: true,
            height: 250,
            colspan: 1
        });
        //habilitaremos el boton de quitar cuando se seleccione uno
        me.gridDetalleGrupo.getSelectionModel().on('selectionchange', me.onSelectChangeGroup, this);

        var btn = Ext.create('Ext.Button', {
            text: ">>",
            tooltip: "Agregar al grupo",
            itemId: "btn_agregar",
            scope: me,
            width: 57,
            disabled: true,
            handler: me.eventoBotonesDetalleGrupo,

        });
        var btn1 = Ext.create('Ext.Button', {
            text: "<<",
            tooltip: "Quitar del grupo",
            itemId: "btn_quitar",
            scope: me,
            width: 57,
            disabled: true,
            handler: me.eventoBotonesDetalleGrupo,
            //handler: handler,

        });

        me.compBtn = Ext.create('Ext.form.FieldContainer', {
            width: 60,
            //height: 250,
            columns: 1,
            //layout: 'anchor',
            margin: '100 , 0 , 0 , 0',
            items: [btn, btn1]
        });


        me.store_codManUC = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento");
        me.cbx_codigoMantenimiento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Mantenimiento UC',
            displayField: 'COD_MAN',
            valueField: 'COD_MAN',
            name: 'COD_MAN_UC',
            //colspan: 3,
            width: 240,
            store: me.store_codManUC,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_MAN} - {DESCRIP_MAN}</h3>';
            }
        });
        me.txt_cod_man = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_MAN",
            maxLength: 500,
            readOnly: true,
        });
        me.cnt_codman = Ext.create("App.Config.Componente.FieldContainerBase", {
            columns: 2,
            colspan: 3,
            cmpArray: [me.cbx_codigoMantenimiento, me.txt_cod_man]
        });
        me.store_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_codSol = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.cbx_codigoSolucion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Solucion',
            displayField: 'COD_SOL',
            valueField: 'COD_SOL',
            name: 'COD_SOL',
            //colspan: 1,
            width: 240,
            store: me.store_codSol,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_SOL} - {DESCRIP_SOL}</h3>';
            }
        });
        me.txt_cod_sol = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_SOL",
            maxLength: 500,
            width: 240,
            readOnly: true
        });
        me.cmp_cod_sol = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Otros Items',
            btn_iconCls: 'add',
            btn_tooltip: 'Otros Items',
            btn_id: 'btn_materiales_add',
            colspan: 3,
            columns: 3,
            botton: false,
            cmpArray: [me.cbx_codigoSolucion, me.txt_cod_sol],
            //componente: me.cbx_codigoSolucion,
        });
        me.gridDetalleAcciones = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridSubDetallesPlanilla",
            width: 550,
            height: 300,
            colspan: 3,
            editar: true,
            handler: me.EliminarItemMaterial
        });

        me.store_otros_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_otros_materiales.setExtraParams({ IDSTATUS: 1 });
        me.cbx_materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Otros Materiales',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
            //colspan: 1,
            width: 240,
            store: me.store_otros_materiales,
            textoTpl: function () {
                return '<div class="{CSSSTATUS}">{COD_ALTERNATIVO} - {DESCRIPCION}</div>';
            }
        });
        me.txt_cod_mat = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION_MAT",
            maxLength: 500,
            width: 240,
            readOnly: true
        });
        me.cmp_materiales = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Material',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar los materiales seleccionados',
            btn_id: 'btn_material_otros_add',
            colspan: 3,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_materiales, me.txt_cod_mat],
            //componente: me.cbx_codigoSolucion,
        });
        me.items = [
            me.gridDetallePoste,
            me.compBtn,
            me.gridDetalleGrupo,

            me.cmp_cod_uc,
            me.cnt_codman,
            me.cmp_cod_sol,
            me.cmp_materiales,
            me.gridDetalleAcciones
        ];
    },
    //Metodo que carga los datos de la OT al formulario detalle grupo
    CargarDatosGrupo: function (ot) {
        var me = this;
        me.getForm().reset();
        me.record = ot;
        me.gridDetallePoste.getStore().setExtraParams({ ID_PLA: ot.get('ID_PLA') });
        me.gridDetallePoste.getStore().load();

    },
    //eventos de quitar y agregar postes o conductores para el formulario de detalle planilla en grupo
    eventoBotonesDetalleGrupo: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            //en caso de que el boton sea agregar al grupo se agregar al grid grupo seleccionados y se retirar del otro lado
            case "btn_agregar":

                me.AgregarItemGrid(me.gridDetalleGrupo, me.gridDetallePoste, me.gridDetallePoste.recordSelected);
                break;
                //en caso de que sea quitar se quitara del grid de seleccion 
            case "btn_quitar":
                me.AgregarItemGrid(me.gridDetallePoste, me.gridDetalleGrupo, me.gridDetalleGrupo.recordSelected);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }

    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_agregar', me, disabled);
    },
    onSelectChangeGroup: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_quitar', me, disabled);
    },
    //metodo que añade un item seleccionado y quita del grid que seleciono y añade a otro grid en caso de que el grid ya contiene  no lo agrega y lo quita del otro grid
    AgregarItemGrid: function (gridAgregar, gridQuitar, record) {
        if (gridAgregar.getStore().existeRecord('ID_PLA_DET', record.get('ID_PLA_DET'))) {
            gridQuitar.getStore().remove(record);
            return false;
        }
        var rec = Ext.create("App.Model.OrdenesTrabajo.DetallesPlanilla", {
            ID_PLA_DET: record.get('ID_PLA_DET'),
            CODIGO: record.get('CODIGO'),
            COD_UC: record.get('COD_UC'),
            TENSION: record.get('TENSION'),
            FORMACION_CND: record.get('')
        });
        gridAgregar.getStore().add(rec);
        gridAgregar.getView().refresh();
        gridQuitar.getStore().remove(record);
    }
});
