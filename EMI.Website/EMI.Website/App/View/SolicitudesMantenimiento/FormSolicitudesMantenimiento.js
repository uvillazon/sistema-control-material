Ext.define("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Solicitudes de Mantenimiento",
    cargarStores: true,
    //Observar el ultimo comentario de la transicion de ESTADO
    verObservacion: true,
    initComponent: function () {
        var me = this;
        if (me.cargarStores) {
            me.CargarStore();
            me.CargarComponentes();
            me.addListeners();
        }
        else {
            me.CargarComponentes();
        }
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;
        //store de las areas de mantenimiento
        me.store_area = Ext.create('App.Store.Listas.StoreLista');
        me.store_area.setExtraParam('ID_LISTA', Lista.Buscar("AREA"));
        //store de la unidad que solicita
        me.store_unidadSolicitante = Ext.create('App.Store.Listas.StoreLista');
        me.store_unidadSolicitante.setExtraParam('ID_LISTA', Lista.Buscar("UNIDAD_REPORTA"));

        me.store_tipoDocumento = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipoDocumento.setExtraParam('ID_LISTA', Lista.Buscar("TIPO_DOCUMENTO"));
        //store para obtener los responsables
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables', { autoLoad: true });
        /*  me.store_responsables.proxy.extraParams['Columna'] = 'REPORTA';
          me.store_responsables.proxy.extraParams['Valor'] = 'T';*/

        //me.store_responsables.setExtraParams({ Responsabilidades: ["REPORTA", "EJECUTA"], Areas: ["RURAL"] });
        //store para obtener los moviles
        me.store_moviles = Ext.create('App.Store.Moviles.Moviles', { autoLoad: true });
        //store para obtener las subestaciones
        me.store_subestaciones = Ext.create('App.Store.Puestos.Subestaciones', { autoLoad: true });
        //store para obtener escenarios
        me.store_escenario = Ext.create('App.Store.Listas.StoreLista');
        me.store_escenario.setExtraParam('ID_LISTA', Lista.Buscar("ESCENARIO"));
    },
    CargarComponentes: function () {
        var me = this;

        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOL_MAN",
            hidden: true,
        });

        me.txt_id_derivacionIni = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ELEMENTO_1",
            hidden: true,
        });
        me.txt_id_derivacionFin = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ELEMENTO_2",
            hidden: true,
        });

        me.txt_id_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ID_SUBEST',
            hidden: true
        });
        me.txt_id_equipo = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'N_ID_EQUIPO',
            hidden: true
        });
        me.cbx_unidadSolicitante = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Unidad Solicitante",
            name: "UNIDAD_SOLICITANTE",
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_unidadSolicitante
        });

        me.cbx_tipoDocumento = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo Documento",
            name: "TIPO_DOCUMENTO",
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_tipoDocumento,
            value: 'PENDIENTE SGT'
        });

        me.num_nroDocumento = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Documento",
            name: "NRO_DOCUMENTO",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });
        me.txt_nombreAfectado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre Afectado",
            name: "NOMBRE_AFECTADO",
            maxLength: 50,
            colspan: 2
        });
        me.grpb_grupoBoton = Ext.create("Ext.form.RadioGroup", {
            colspan: 2,
            width: 480,
            vertical: false,
            //allowBlank: false,
            items: [
                { boxLabel: 'P/ Nus', name: 'rb', inputValue: "NUS" },
                { boxLabel: 'P/ Poste', name: 'rb', inputValue: "POSTE" },
                { boxLabel: 'P/ Puesto', name: 'rb', inputValue: "PUESTO" },
                { boxLabel: 'P/ Derivacion', name: 'rb', inputValue: "DERIVACION" },
            ]
        });

        me.cbx_areaUbicacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Sistema",
            name: "AREA_UBIC",
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_area
        });

        me.txt_ubicacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ubicacion",
            name: "UBICACION",
            colspan: 2,
            width: 500,
            maxLength: 100,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_nus = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "NUS",
            name: "NUS",
            colspan: 2,
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false,
            readOnly: true,
        });
        me.txt_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Alimentador",
            name: "COD_ALIMENTADOR",
            maxLength: 20
        });

        me.cbx_nombreReporta = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nombre quien Reporta",
            name: "REPORTA_NOMBRE",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'NOMBRECOMPLETO',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
        });
        me.cbx_subestacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Subestacion",
            name: "ID_SUBEST",
            displayField: 'NOM_SUBEST',
            maxLength: 50,
            valueField: 'ID_SUBEST',
            store: me.store_subestaciones,
        });
        me.cbx_movilReporta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Movil que Reporta",
            displayField: 'MOVIL',
            name: "REPORTA_MOVIL",
            maxLength: 50,
            store: me.store_moviles
        });
        me.txta_descripcionProblema = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion del Problema",
            name: "DESC_PROBL",
            colspan: 2,
            maxLength: 450,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txta_Comentario = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion Rechazo SM",
            name: "OBSERV",
            colspan: 2,
            hidden: me.verObservacion,
            maxLength: 500,
        });
        me.txta_observaciones = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            colspan: 2,
            maxLength: 500,

        });
        me.txta_aclaracionRiesgo = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Aclaracion Riesgo",
            name: "ACLA_RIESGO ",
            colspan: 2,
            maxLength: 250,

        });
        me.date_fechaProblema = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha del Problema",
            name: "FECHA_PROBL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_horaProblema = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora del Problema",
            name: "HORA_PROBL",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.txt_numeroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "NRO_SOL",
            maxLength: 10,
            disabled: true
        });

        me.txt_propiedad = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Propiedad Puesto",
            name: "PROPIEDAD",
            disabled: true,
            colspan: 2,
        });

        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            value: "NUEVA",
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_usr = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Usr Ultima Modificacion",
            name: "USR",
        });
        //campos para subestaciones
        me.cbx_tipoEquipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo de Equipo",
            // displayField: 'TIPO_EQUIPO',
            name: "TIPO_EQUIPO",
            maxLength: 20,
            // store: me.store_moviles
        });
        me.cbx_equipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Equipo",
            // displayField: 'TIPO_EQUIPO',
            name: "COD_EQUIPO",
            maxLength: 30,
            // store: me.store_moviles
        });
        me.cbx_escenario = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Escenario",
            // displayField: 'TIPO_EQUIPO',
            name: "ESCENARIO",
            maxLength: 15,
            store: me.store_escenario,
            colspan: 2
        });

        me.store_codigoDefecto = Ext.create("App.Store.SolicitudesMantenimiento.CodigosDefecto");
        me.cbx_codigoDefecto = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Defecto',
            displayField: 'COD_DEF',
            valueField: 'COD_DEF',
            name: 'COD_DEF',
            //colspan: 3,
            width: 240,
            store: me.store_codigoDefecto,
            textoTpl: function () {
                return '<h4>{COD_DEF}</h4>  {DESCRIP_DEF}';
            }
        });
        me.txt_cod_def = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_DEF",
            maxLength: 500,
            width: 240,
        });
        me.txt_id_cod_def = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_COD_DEF",
            hidden: true
        });
        me.cmp_codigoDefecto = Ext.create("App.Config.Componente.FieldContainerBase", {
            columns: 2,
            colspan: 2,
            cmpArray: [me.cbx_codigoDefecto, me.txt_cod_def, me.txt_id_cod_def]
        });
        me.CargarPoste();
        me.items = [
            {
                xtype: 'fieldset',
                title: '<span style="color:red;font-weight:bold" data-qtip="Required">IMPORTANTE: Debe ingresar necesariamente NUS, Poste, Puesto o Derivación.</span>',
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [
                    me.txt_id,
                    me.txt_numeroSolicitud,
                    me.cbx_unidadSolicitante,
                    me.cbx_tipoDocumento,
                    me.cbx_nombreReporta,
                    me.num_nroDocumento,
                    me.cbx_movilReporta,
                    me.date_fechaProblema,
                    me.txt_horaProblema,
                    me.grpb_grupoBoton,
                    me.num_nus,
                    me.cmp_codigoPoste,
                    me.cmp_codigoPuesto,
                    me.txt_propiedad,
                    me.cmp_codigoDerivacion,
                    me.cmp_codigoDerivacionFinal,
                    me.cbx_areaUbicacion,
                    me.txt_alimentador,
                    me.txt_nombreAfectado,
                    me.cmp_codigoDefecto,
                    me.txt_ubicacion,
                    me.txta_descripcionProblema,
                    me.txta_Comentario,
                    me.txt_estado,
                    me.txt_usr,
                    me.txt_id_derivacionIni,
                    me.txt_id_derivacionFin
                ]
            }


        ];


    },
    CargarPoste: function () {
        var me = this;
        me.gridPostes = Ext.create('App.View.Postes.GridPostes');
        me.cmp_codigoPoste = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_POSTE',
            textComponente: 'Cod. Poste',
            nameComponente: 'COD_POSTE',
            nameDetalleComponente: 'COD_POSTE',
            btnId: 'btn_CodigoPoste',
            controlador: "Postes",
            accion: "BuscarPoste",
            param: "codPoste",
            //hiddenCmp: false,
            cmpCombo: true,
            mask: me,
            grid: me.gridPostes,
            textoTpl: function () { return '<h4>{COD_POSTE}</h4>  {AREA_UBIC} - {DESC_TIPO}'; },
            cmpArray: [me.txt_alimentador, me.txt_ubicacion, me.cbx_areaUbicacion]

        });
        me.store_derivacion = Ext.create("App.Store.Puestos.Derivaciones");
        me.store_derivacionFinal = Ext.create("App.Store.Puestos.Derivaciones");
        me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Derivacion Inicial",
            name: "COD_ELEMENTO_1",
            displayField: 'COD_ELEMENTO',
            valueField: 'COD_ELEMENTO',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{COD_ELEMENTO} - {AREA_UBIC}" },
            store: me.store_derivacion,
        });
        me.cmp_codigoDerivacionFinal = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Derivacion final",
            name: "COD_ELEMENTO_2",
            displayField: 'COD_ELEMENTO',
            valueField: 'COD_ELEMENTO',
            maxLength: 50,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
            textoTpl: function () { return "{COD_ELEMENTO} - {AREA_UBIC}" },
            store: me.store_derivacionFinal,
        });

        me.gridPuestos = Ext.create('App.View.Puestos.GridPuestos');
        me.cmp_codigoPuesto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_PUESTO',
            textComponente: 'Cod. Puesto',
            nameComponente: 'COD_PUESTO',
            nameDetalleComponente: 'COD_PUESTO',
            btnId: 'btn_CodigoPuesto',
            controlador: "ElementosRed",
            accion: "BuscarPuesto",
            param: "COD_PUESTO",
            colspan: 2,
            //hiddenCmp: true,
            cmpCombo: true,
            mask: me,
            grid: me.gridPuestos,
            textoTpl: function () { return '<h4>{COD_PUESTO}</h4>  {AREA_UBIC} - {UBICACION}'; },
            cmpArray: [me.txt_alimentador, me.txt_ubicacion, me.cbx_areaUbicacion, me.cmp_codigoDerivacion, me.cmp_codigoDerivacionFinal, me.txt_propiedad]

        });
    },
    addListeners: function () {
        var me = this;
        me.grpb_grupoBoton.on('change', me.CargarRadioButton, this);
        me.cbx_unidadSolicitante.on('select', me.cargarCodigoDefecto, me);
        me.cbx_codigoDefecto.on('select', function (cmb, record) {
            me.txt_cod_def.setValue(record[0].get('DESCRIP_DEF'));
            me.txt_id_cod_def.setValue(record[0].get('ID_COD_DEF'));
        });
        me.cbx_codigoDefecto.on('change', function (cmb, record) {
            if (this.getValue() === null) {
                me.txt_cod_def.reset();
                me.txt_id_cod_def.reset();
            }
        });
        me.num_nus.on('specialkey', function (f, e) {
            //alert(f.getValue());
            if (e.getKey() == e.ENTER) {

                //var cmpArray = me.cmp_codigoPoste.getArray([me.txt_ubicacion, me.cbx_areaUbicacion]);
                Funciones.AjaxRequestComponente("Postes", "BuscarPostePorNus", me, me, { NUS: f.value }, null);
                me.limpiarObjectoIntervenido();
            }
        });
        me.cmp_codigoPoste.txt_detalleComponente.on('change', function (cmp, newValue, oldValue, eOpts) {
            if (me.grpb_grupoBoton.getValue().rb == "POSTE" && newValue != '') {
                //metodo que actualizara los demas campos y en caso de que sea un poste MT obligara a escribir una derivacion
                me.AjaxRequestComponente("Postes", "BuscarPuestoPorPoste", me, me, { COD_POSTE: newValue }, null, me.cmp_codigoPuesto.cmpArray);
            }
        });
        me.cmp_codigoDerivacion.on('select', function (cbx, record) {
            //alert("asdasd");
            cmpArray = [me.txt_alimentador, me.cbx_areaUbicacion, me.txt_id_derivacionIni];
            Funciones.resetCmpArray(cmpArray);
            me.txt_alimentador.setValue(record[0].get('COD_ALIMENTADOR'));
            me.cbx_areaUbicacion.setValue(record[0].get('AREA_UBIC'));
            me.txt_id_derivacionIni.setValue(record[0].get('ID_ELEMENTO'));
            //Funciones.loadResultCmpArray(cmpArray,record[0]);
        });
        me.cmp_codigoDerivacion.on('select', function (cbx, record) {
            me.txt_id_derivacionFin.reset();
            me.txt_id_derivacionFin.setValue(record[0].get('ID_ELEMENTO'));
        });

    },
    //metodo que actualizara los demas campos y en caso de que sea un poste MT obligara a escribir una derivacion
    AjaxRequestComponente: function (controlador, accion, mask, cmp, param, win, cmpArray) {
        var me = this;
        mask.el.mask('Procesando...', 'x-mask-loading');
        Ext.Ajax.request({
            url: Constantes.HOST + '' + controlador + '/' + accion + '',
            params: param,
            success: function (response) {
                mask.el.unmask();
                var str = Ext.JSON.decode(response.responseText);
                //res = Ext.util.JSON.decode(result.responseText);
                if (str.success == true) {
                    //cmp.setValue(str);
                    try {
                        cmp.loadRecord(str.Result);
                        if (cmpArray != null) {
                            Funciones.loadResultCmpArray(cmpArray, str.Result);
                        }
                    }
                    catch (e) {
                        Funciones.loadRecordCmp(cmp, str.Result);
                        if (cmpArray != null) {
                            Funciones.loadResultCmpArray(cmpArray, str.Result);
                        }
                    }
                    //return true;
                }
                else {
                    if (cmpArray != null) {
                        Funciones.resetCmpArray(cmpArray);
                        me.cmp_codigoPuesto.reset();
                        //me.cmp_codigoDerivacion.btn.setDisabled(false);
                        //me.cmp_codigoDerivacionFinal.btn.setDisabled(false);
                        //alert("error");
                    }

                }


            },
        });
    },
    cargarCodigoDefecto: function (combo, records, eOpts) {
        var me = this;
        if (records[0].get('VALOR') == "OPERACIONES" || records[0].get('VALOR') == "MANTENIMIENTO") {
            me.cbx_codigoDefecto.allowBlank = false;
        }
        else {
            me.cbx_codigoDefecto.allowBlank = true;
        }
    },
    CargarRadioButton: function (rdb, newValue, oldValue, eOpts) {
        var me = this; //alert('aqui' + newValue.rb);
        if (newValue.rb == "NUS") {
            me.num_nus.setReadOnly(false);
            me.num_nus.allowBlank = false;
            me.num_nus.reset();
            //   me.cmp_codigoDerivacion.reset();
            me.cmp_codigoDerivacion.setReadOnly(true);
            //   me.cmp_codigoDerivacionFinal.reset();
            me.cmp_codigoDerivacionFinal.setReadOnly(true);

            //     me.cmp_codigoPuesto.reset();
            me.cmp_codigoPuesto.setReadOnly(true);
            //      me.cmp_codigoPoste.reset();
            me.cmp_codigoPoste.setReadOnly(true);
            me.cmp_codigoPoste.btn.setDisabled(true);
            //me.cmp_codigoDerivacion.btn.setDisabled(true);
            //me.cmp_codigoDerivacionFinal.btn.setDisabled(true);
            me.cmp_codigoPuesto.btn.setDisabled(true);

        }
        else if (newValue.rb == "POSTE") {
            me.num_nus.reset();
            //    me.cmp_codigoDerivacion.reset();
            me.cmp_codigoDerivacion.setReadOnly(true);
            //  me.cmp_codigoDerivacionFinal.reset();
            me.cmp_codigoDerivacionFinal.setReadOnly(true);

            //     me.cmp_codigoPuesto.reset();
            me.cmp_codigoPuesto.setReadOnly(true);
            //      me.cmp_codigoPoste.reset();
            me.cmp_codigoPoste.setReadOnly(false);

            me.num_nus.setReadOnly(true);
            me.cmp_codigoPoste.btn.setDisabled(false);
            //me.cmp_codigoDerivacion.btn.setDisabled(true);
            //me.cmp_codigoDerivacionFinal.btn.setDisabled(true);
            me.cmp_codigoPuesto.btn.setDisabled(true);
            me.num_nus.allowBlank = true;
        }
        else if (newValue.rb == "PUESTO") {
            me.num_nus.setReadOnly(true);
            me.cmp_codigoPoste.btn.setDisabled(true);
            //me.cmp_codigoDerivacion.btn.setDisabled(true);
            //me.cmp_codigoDerivacionFinal.btn.setDisabled(true);
            me.cmp_codigoPuesto.btn.setDisabled(false);
            me.num_nus.allowBlank = true;

            me.num_nus.reset();
            //    me.cmp_codigoDerivacion.reset();
            me.cmp_codigoDerivacion.setReadOnly(true);
            //    me.cmp_codigoDerivacionFinal.reset();
            me.cmp_codigoDerivacionFinal.setReadOnly(true);

            //     me.cmp_codigoPuesto.reset();
            me.cmp_codigoPuesto.setReadOnly(false);
            me.cmp_codigoPoste.reset();
            me.cmp_codigoPoste.setReadOnly(true);
        }
        else if (newValue.rb == "DERIVACION") {
            me.num_nus.setReadOnly(true);
            me.cmp_codigoPoste.btn.setDisabled(true);
            //me.cmp_codigoDerivacion.btn.setDisabled(false);
            //me.cmp_codigoDerivacionFinal.btn.setDisabled(false);
            me.cmp_codigoPuesto.btn.setDisabled(true);
            me.num_nus.allowBlank = true;
            me.num_nus.reset();
            //      me.cmp_codigoDerivacion.reset();
            me.cmp_codigoDerivacion.setReadOnly(false);
            //       me.cmp_codigoDerivacionFinal.reset();
            me.cmp_codigoDerivacionFinal.setReadOnly(false);
            me.cmp_codigoPuesto.reset();
            me.cmp_codigoPuesto.setReadOnly(true);
            me.cmp_codigoPoste.reset();
            me.cmp_codigoPoste.setReadOnly(true);
        }
    },
    limpiarObjectoIntervenido: function () {
        var me = this;
        //me.num_nus.reset();
        me.cmp_codigoDerivacion.reset();
        me.cmp_codigoDerivacionFinal.reset();
        me.cmp_codigoPuesto.reset();
        me.cmp_codigoPoste.reset();
    },
    BloquearBotones: function () {
        var me = this;
        me.cmp_codigoPoste.btn.setDisabled(true);
        me.cmp_codigoPuesto.btn.setDisabled(true);
        //me.cmp_codigoDerivacion.btn.setDisabled(true);
        //me.cmp_codigoDerivacionFinal.btn.setDisabled(true);
    }
});
