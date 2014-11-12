//el objetivo de esta clase era para definir solo componentes de formularios sin accion de eventos
//las acciones de evento llevarlo en el formulario principal
Ext.define("App.View.OrdenesTrabajo.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormSolicitud") {
            me.title = "Datos del Solicitud de Mantenimiento";
            me.columns = 3;
            me.CargarFormSolicitud();

        }
        else if (me.opcion == "FormCuerpoOT") {
            me.title = "Datos Generales de la OT";
            me.columns = 2;
            me.CargarFormCuerpoOT();
        }
        else if (me.opcion == "FormCuerpoOTConsulta") {
            me.title = "Datos Generales de la OT";
            me.columns = 2;
            me.CargarFormCuerpoOTConsulta();
        }
        else if (me.opcion == "FormOTTipo1") {
            me.title = "Poste(s) Intervenido(s)";
            me.columns = 1;
            me.CargarFormOTTipo1();
        }
        else if (me.opcion == "FormOTCierre") {
            me.title = "Datos Generales OT";
            me.columns = 3;
            me.CargarFormOTCierre();
        }
        else if (me.opcion == "FormOTAsignar") {
            me.columns = 3;
            me.CargarFormOTAsignar();
        }
        else if (me.opcion == "RegFechaHora") {
            me.CargarFechaHora();
        }
        else if (me.opcion == "FormCabeceraPlanilla") {
            me.CargarFormCabeceraPlanilla();
        }
        else if (me.opcion == "CargarFormUCyPoste") {
                me.CargarFormUCyPoste();
            
        }
        else if (me.opcion == "FormInforme") {
            me.title = me.title == "" ? "Registro de Informe de Inspeccion" : me.title;
            me.CargarFormOTInforme();
        }
        else if (me.opcion == "FormConsultaOTSM") {
            me.CargarFormConsultaOTSM();
        }
        else if (me.opcion == 'CargarFormOT') {
            me.columns = 3;
            me.CargarFormOT();
        }
        else if (me.opcion == "FormCriterioTEjecutados") {
            me.title = "Criterio del Reporte de Trabajos Ejecutados";
            me.columns = 2;
            me.CargarFormReporteTEjecutados();
        }
      /*  else if (me.opcion == "FormCriterioTEDiarios") {
            me.title = "Criterio del Reporte de T. Ejecutados Diarios";
            me.columns = 2;
            me.CargarFormReporteTEjecutados();
        }*/
            //form para pagos de contratista
        else if (me.opcion == "FormPagoContratista") {
            //me.columns = 2;
            me.CargarFormPagoContratista();
        } 
        else if (me.opcion == "FormConsultaOTContratista") {
            me.CargarFormConsultaOTContratista();
        }
        
        else {
            alert("Seleccione alguna Opciones");
        }

        this.callParent(arguments);
    },
    CargarFormSolicitud: function () {
        var me = this;
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            hidden: true,
        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Quien Reporta",
            name: "REPORTA_NOMBRE",
        });
        me.txt_direccion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Direccion",
            name: "UBICACION",
            width: 730,
            colspan: 3
        });

        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA_PROBL",
        });
        me.txt_id_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ALIMENTADOR",
            hidden: true
        });
        me.txt_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Alimentador",
            name: "COD_ALIMENTADOR",
            hidden: true
        });
        me.txt_id_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SUBEST",
            hidden: true
        });
        me.txt_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subestacion",
            name: "NOM_SUBEST",
            hidden: true
        });
        me.items = [
            me.txt_estado,
            me.txt_nroSolicitud,
            me.txt_nombre,
            me.dat_fecha,
            me.txt_direccion,
            me.txt_id_alimentador,
            me.txt_alimentador,
            me.txt_id_subestacion,
            me.txt_subestacion
        ];
    },
    CargarFormOT: function () {
        var me = this;
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            hidden: true,
        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });
        me.cmp_codigoPoste = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_POSTE',
            textComponente: 'Cod. Poste',
            nameComponente: 'COD_POSTE1',
            nameDetalleComponente: 'COD_POSTE',
            btnId: 'btn_CodigoPoste',
            controlador: "Postes",
            accion: "BuscarPoste",
            param: "codPoste",
            hiddenCmp: true,
            mask: me,
            grid: me.gridPostes,
            hiddenBtn: true,
        });
        me.cmp_codigoPuesto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_PUESTO',
            textComponente: 'Cod. Puesto',
            nameComponente: 'COD_PUESTO1',
            nameDetalleComponente: 'COD_PUESTO',
            hiddenCmp: true,
            btnId: 'btn_CodigoPuesto',
            controlador: "ElementosRed",
            accion: "BuscarPuesto",
            param: "COD_PUESTO",
            mask: me,
            grid: me.gridPuestos,
            hiddenBtn: true,
        });
        me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO',
            textComponente: 'Derivacion',
            nameComponente: 'COD_ELEMENTO1',
            nameDetalleComponente: 'COD_ELEMENTO',
            hiddenCmp: true,
            btnId: 'btn_CodigoDerivacion',
            controlador: "ElementosRed",
            accion: "BuscarDerivacion",
            param: "CODIGO",
            mask: me,
            grid: me.gridDerivacion,
            hiddenBtn: true,
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true

        });

        me.txt_ot_ext = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "OT_EXTRA",
            hidden: true

        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT1",
            readOnly: true

        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_OT'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
            displayField: 'VALOR',
            store: me.store_tipo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_id_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SUBEST",
            hidden: true
        });
        me.txt_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subestacion",
            name: "NOM_SUBEST",
            hidden: true
        });
        me.txt_id_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ALIMENTADOR",
            hidden: true
        });
        me.txt_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Alimentador",
            name: "COD_ALIMENTADOR",
            hidden: true
        });

        me.items = [
            me.txt_nroSolicitud,
            me.txt_nroOT,
            me.cbx_tipo,
            me.cmp_codigoPoste,
            me.cmp_codigoPuesto,
            me.cmp_codigoDerivacion,
            me.txt_id,
            me.txt_ot_ext,

            me.txt_estado,
            me.txt_id_subestacion,
            me.txt_subestacion,
            me.txt_id_alimentador,
            me.txt_alimentador,
           /* me.txt_nombre,
            me.txt_direccion*/
        ];
    },
    CargarFormCuerpoOT: function () {
        var me = this;
        me.CargarGridsCodigos();
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true

        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",
            hidden: true
        });
        me.txt_ot_ext = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "OT_EXTRA",
            hidden: true

        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT1",
            readOnly: true

        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_OT'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
            displayField: 'VALOR',
            store: me.store_tipo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_tipo.on('select', function (cmb, record, index) {
            if (cmb.getValue() == 'REPARACION_REEMPLAZO') {
                me.cbx_otOrigen.setDisabled(false);
            } else {
                me.cbx_otOrigen.setDisabled(true);
            }
        });

        me.store_ot = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoIntPostes');
        me.cbx_otOrigen = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "OT origen",
            name: "TIPO_OT1",
            displayField: 'ID_OT',
            store: me.store_ot,
            disabled: true,
            colspan: 2
        });

        me.txt_otorigen = Ext.widget('hiddenfield', {
            name: 'OT_ORIGEN',
        });

        me.txt_cantidadpostes = Ext.widget('hiddenfield', {
            name: 'CANTIDAD_POSTES',
        });

        me.checkFormularioSolicitudObra = Ext.create('Ext.form.field.Checkbox', {
            boxLabel: 'Formulario Solicitud Obra',
            name: 'FORMULARIO_OBRA',
            labelSeparator: '',
            fieldLabel: '',
            margin: '10 0 10 0',
            colspan: 2,
            allowBlank: false,
            checked: true,
            readOnly: true,
            disabled: true
        });

        me.txt_codobjintervenido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "COD_OBJ_INTERV",
            hidden: true
        });

        me.txt_designado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Asignado a",
            name: "ASIGNADO_A",
            hidden: true
        });
        me.txt_lugartrabajo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Lugar de Trabajo",
            name: "LUGAR_TRABAJO",
            colspan: 2,
            maxLength: 400,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Asignacion",
            hidden: true,
            name: "FECHA_PROBL",
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.cmp_codigoMantenimiento = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_MAN',
            textComponente: 'Cod. Mantenimiento',
            nameComponente: 'COD_MAN',
            nameDetalleComponente: 'DESCRIP_MAN',
            btnId: 'btn_CodigoMantenimiento',
            controlador: "Codigos",
            accion: "BuscarCodigoMantenimiento",
            //param: {codMan : 0},
            param: "codMan",
            mask: me,
            grid: me.gridCodigoMantenimiento,
            allowBlank: false,
            colspan: 3,
            cmpCombo: true,
            textoTpl: function () { return "{COD_MAN} - {DESCRIP_MAN}" },
            //scope: this,
        });
        me.cmp_codigoMantenimiento.txt_componente.on('select', function (cmb, record, index) {
            me.cmp_codigoSolucion.reset();
        });
        me.cmp_codigoDefecto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_DEF',
            textComponente: 'Cod. Defecto',
            btnId: 'btn_CodigoMantenimiento1',
            nameComponente: 'COD_DEF',
            nameDetalleComponente: 'DESCRIP_DEF',
            controlador: "Codigos",
            accion: "BuscarCodigoDefecto",
            param: "codDef",
            allowBlank: false,
            mask: me,
            grid: me.gridCodigoDefecto,
            colspan: 3,
            cmpCombo: true,
            textoTpl: function () { return "{COD_DEF} - {DESCRIP_DEF}" },
            //scope: this,
            //handler: me.CargarStore

        });
        me.cmp_codigoSolucion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_SOL',
            textComponente: 'Cod. Solucion',
            nameComponente: 'COD_SOL',
            nameDetalleComponente: 'DESCRIP_SOL',
            controlador: "Codigos",
            accion: "BuscarCodigoSolucion",
            param: "codSolucion",
            mask: me,
            grid: me.gridCodigoSolucion,
            colspan: 3,
            cmpCombo: true,
            textoTpl: function () { return "{COD_SOL} - {DESCRIP_SOL}" },
            //scope: this,
            //handler: me.CargarStore

        });
        me.cmp_codigoSolucion.txt_componente.on('focus', function (cmb, the) {
            if (me.cmp_codigoMantenimiento.txt_id.getValue() == null) {
                return false;
            }
            else {
                me.cmp_codigoSolucion.grid.getStore().setExtraParam("ID_COD_MAN", me.cmp_codigoMantenimiento.txt_id.getValue());
                me.cmp_codigoSolucion.grid.getStore().load();
            }
        });
        me.grpb_grupoBoton = Ext.create("Ext.form.RadioGroup", {
            colspan: 2,
            width: 480,
            vertical: false,
            allowBlank: false,
            items: [
                { boxLabel: 'P/ Poste', name: 'rb', inputValue: "POSTE", items: 1 },
                { boxLabel: 'P/ Puesto', name: 'rb', inputValue: "PUESTO", items: 2 },
                { boxLabel: 'P/ Derivacion', name: 'rb', inputValue: "DERIVACION", items: 3 },
                { boxLabel: 'P/ Tramo', name: 'rb', inputValue: "TRAMO", items: 4 },
            ]
        });

        me.txta_instruccion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Instrucciones",
            name: "INSTRUCCIONES",
            colspan: 2,
            maxLength: 750
        });

        me.txt_nro_sol = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "NRO_SOL",
            hidden: true
        });

        /* En esta region se creara componentes ocultos que almacenaran los datos de solicitud de obra*/
        me.txt_idcliente = Ext.widget('numberfield', { name: 'IDCLIENTE', hidden: true });
        me.txt_nombres = Ext.widget('textfield', { name: 'NOMBRES', hidden: true });
        me.txt_apellidos = Ext.widget('textfield', { name: 'APELLIDOS', hidden: true });
        me.txt_calle = Ext.widget('numberfield', { name: 'CALLE', hidden: true });
        me.txt_telefonos = Ext.widget('textfield', { name: 'TELEFONOS', hidden: true });
        me.txt_area = Ext.widget('textfield', { name: 'AREA', hidden: true });
        me.txt_sistema = Ext.widget('textfield', { name: 'SISTEMA', hidden: true });
        me.txt_subsistema = Ext.widget('textfield', { name: 'SUBSISTEMA', hidden: true });
        me.txt_mnsistema = Ext.widget('textfield', { name: 'MN_SISTEMA', hidden: true });
        me.txt_nroclientes = Ext.widget('textfield', { name: 'NRO_CLIENTES', hidden: true });
        me.txt_distancia = Ext.widget('numberfield', { name: 'DISTANCIA', hidden: true });
        me.txt_plan = Ext.widget('textfield', { name: 'PLAN', hidden: true });
        me.txt_urbanizacion = Ext.widget('textfield', { name: 'URBANIZACION', hidden: true });
        me.txt_areaconcesion = Ext.widget('textfield', { name: 'AREA_CONCESION', hidden: true });
        me.txt_motivo = Ext.widget('textfield', { name: 'MOTIVO', hidden: true });
        me.txt_tensionsuministro = Ext.widget('textfield', { name: 'TENSION_SUMINISTRO', hidden: true });
        me.txt_inicia = Ext.widget('textfield', { name: 'INICIA', hidden: true });
        me.txt_subencionado = Ext.widget('textfield', { name: 'SUBENCIONADO', hidden: true });
        me.txt_porcentajesubencion = Ext.widget('numberfield', { name: 'PORCENTAJE_SUBENCION', hidden: true });
        me.txt_observacion = Ext.widget('textarea', { name: 'OBSERVACION', hidden: true });
        me.txt_croquis = Ext.widget('textfield', { name: 'CROQUIS', hidden: true });
        /* fin campos ocultos de solicitud obras */

        me.CargarObjetos();
        me.items = [
            me.txt_id,
            me.txt_ot_ext,
            me.txt_nroOT,
            me.cbx_tipo,
            me.txt_designado,
            me.txt_codobjintervenido,
            me.date_fecha,
            me.txt_lugartrabajo,
            me.cmp_codigoMantenimiento,
            me.cmp_codigoDefecto,
            me.cmp_codigoSolucion,
            me.txt_otorigen,
            me.txt_cantidadpostes,
            me.checkFormularioSolicitudObra,
            //me.cbx_otOrigen,
            me.txt_nroSolicitud,
            {
                xtype: 'fieldset',
                colspan: 2,
                title: '<span style="color:red;font-weight:bold" data-qtip="Required">OBJETO SUJETO A INSPECCION<br>Importante: Seleccionar necesariamente Poste, Puesto, Derivacion o Tramo.</span>',
                layout: {
                    type: 'table',
                    columns: 2,
                },
                items: [
                me.grpb_grupoBoton, ]
            },
            me.cmp_codigoPoste,
            me.cmp_codigoPuesto,
            me.cmp_codigoDerivacion,
            me.cmp_codigoDerivacionFinal,
            me.txta_instruccion,
            me.txt_nro_sol, /* campo oculto para asociar OT proyectos reiterativos, que ya son atendidos por una solicitud*/
            /* componentes ocultos */
            me.txt_apellidos, me.txt_nombres, me.txt_idcliente, me.txt_calle, me.txt_telefonos, me.txt_area, me.txt_sistema,
            me.txt_subsistema, me.txt_mnsistema, me.txt_nroclientes, me.txt_distancia, me.txt_plan, me.txt_urbanizacion,
            me.txt_areaconcesion, me.txt_motivo, me.txt_tensionsuministro, me.txt_inicia, me.txt_subencionado, me.txt_porcentajesubencion,
            me.txt_observacion, me.txt_croquis
        ];
    },
    CargarObjetos: function () {
        var me = this;

        me.cmp_codigoPoste = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_POSTE',
            textComponente: 'Cod. Poste',
            nameComponente: 'COD_POSTE1',
            nameDetalleComponente: 'COD_POSTE',
            btnId: 'btn_CodigoPoste',
            controlador: "Postes",
            accion: "BuscarPoste",
            param: "codPoste",
            hiddenCmp: true,
            mask: me,
            hiddenBtn: true,
        });
        me.cmp_codigoPuesto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_PUESTO',
            textComponente: 'Cod. Puesto',
            nameComponente: 'COD_PUESTO1',
            nameDetalleComponente: 'COD_PUESTO',
            hiddenCmp: true,
            btnId: 'btn_CodigoPuesto',
            controlador: "ElementosRed",
            accion: "BuscarPuesto",
            param: "COD_PUESTO",
            mask: me,
            hiddenBtn: true,
        });
        //me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
        //    nameIdComponente: 'ID_ELEMENTO',
        //    textComponente: 'Derivacion',
        //    nameComponente: 'COD_ELEMENTO1',
        //    nameDetalleComponente: 'COD_ELEMENTO',
        //    hiddenCmp: true,
        //    btnId: 'btn_CodigoDerivacion',
        //    controlador: "ElementosRed",
        //    accion: "BuscarDerivacion",
        //    param: "CODIGO",
        //    mask: me,
        //    hiddenBtn: true,
        //});
        me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO_1',
            textComponente: 'Derivacion Inicial',
            nameComponente: 'COD_ELEMENTO_11',
            nameDetalleComponente: 'COD_ELEMENTO_1',
            hiddenCmp: true,
            hiddenBtn: true,
            param: "CODIGO",
            mask: me,
            colspan: 1,
            widthdetalle: 130,

        });
        me.cmp_codigoDerivacionFinal = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO_2',
            textComponente: 'Derivacion final',
            nameComponente: 'COD_ELEMENTO_21',
            nameDetalleComponente: 'COD_ELEMENTO_2',
            hiddenCmp: true,
            hiddenBtn: true,
            param: "CODIGO",
            mask: me,
            colspan: 1,
            widthdetalle: 130,
        });

    },
    CargarObjetosEdicion: function (OT) {
        var me = this;
        me.grpb_grupoBoton.setValue({ rb: OT.get('TIPO_OBJ_INTERV') });//CON ESTO HACEMOS CHECKED AL RADIO QUE CORRESPONDE
        // me.cmp_codigoDerivacion.txt_detalleComponente.disabledCls = 'background-color:#FFFFCC;';
        //.setDisabled(true);
        //style: 'background-color: #ddd;',
    },
    /* CargarRadioButton: function (rdb, newValue, oldValue, eOpts) {
         var me = this;
         if (newValue.rb == "POSTE") {
            // me.cmp_codigoDerivacion.reset();
           //  me.cmp_codigoPuesto.reset();
 
             me.cmp_codigoDerivacion.btn.setDisabled(true);
             me.cmp_codigoPuesto.btn.setDisabled(true);
             me.cmp_codigoPoste.btn.setDisabled(false);
             //alert(me.cmp_codigoPoste.txt_componente.getValue()); ESTE SERIA EL VALOR INTRODUCIDO EN EL CAMPO DEL TEXTO NO BLOQUEADO EN EL CASLO NO EXISTE VALOR
             //alert(me.cmp_codigoPoste.txt_detalleComponente.getValue());//muestra el codigo del poste
             //alert(me.cmp_codigoPoste.txt_id.getValue());//muestra el id del poste
            
         } else if (newValue.rb == "PUESTO") {
           //  me.cmp_codigoDerivacion.reset();
           //  me.cmp_codigoPoste.reset();
 
             me.cmp_codigoDerivacion.btn.setDisabled(true);
             me.cmp_codigoPoste.btn.setDisabled(true);
             me.cmp_codigoPuesto.btn.setDisabled(false);
         } else if (newValue.rb == "DERIVACION") {
           //  me.cmp_codigoPuesto.reset();
           //  me.cmp_codigoPoste.reset();
 
             me.cmp_codigoPoste.btn.setDisabled(true);
             me.cmp_codigoPuesto.btn.setDisabled(true);
             me.cmp_codigoDerivacion.btn.setDisabled(false);
         }
     },*/
    CargarGridsCodigos: function () {
        var me = this;
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.gridCodigoDefecto = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoDefecto' });
        me.gridCodigoSolucion = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoSolucion' });
    },
    CargarFormOTTipo1: function () {
        var me = this;
        me.btn_grupo = Funciones.CrearGrupoBoton("2", "");
        Funciones.CrearMenu('btn_AgregarPosteUC', 'Agregar', Constantes.ICONO_CREAR, me.EventosBoton, me.btn_grupo, this);
        Funciones.CrearMenu('btn_Quitar', 'Quitar', Constantes.ICONO_BAJA, me.EventosBoton, me.btn_grupo, this);
        me.gridReparacion = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'GridOTTipo1', itemId: 'gridPostesIntervenidos', width: 480, height: 300 });
        me.items = [

            me.btn_grupo,
            me.gridReparacion
        ];
    },
    CargarFormCuerpoOTConsulta: function () {
        var me = this;
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT"
        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT"
        });

        me.txt_designado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Asignado a",
            name: "NOMBRE_ASIGNADO",
        });
        me.txt_lugartrabajo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Lugar de Trabajo",
            name: "LUGAR_TRABAJO",
            colspan: 2,
            width: 480,
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Asignacion",
            name: "FECHA_ASIG"
        });
        me.txt_codMantenimiento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Mantenimiento",
            name: "COD_MAN",
        });
        me.txt_codDefecto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Defecto",
            name: "COD_DEF",
        });
        me.txt_codSolucion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Solucion",
            name: "COD_SOL",
            colspan: 2,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            colspan: 2
        });
        me.txt_objintervenido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Objecto Intervenido",
            name: "TIPO_OBJ_INTERV",
        });
        me.txt_codobjintervenido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "COD_OBJ_INTERV",
        });

        me.txt_solicitudobra = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Solicitud Proyecto",
            name: "NRO_SOL",
        });

        me.txt_estadoobra = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado Solicitud Proyecto",
            name: "ESTADO_SOL_PROY",
        });

        me.cbx_subproyectosobra = Ext.widget('combobox', {
            fieldLabel: 'Sub-Proyectos',
            width: 240
        });

        me.txt_estadosubproyecto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado Sub-Proyecto",
            name: "ESTADO_SUBPROYECTO",
        });

        me.items = [
           me.txt_nroOT,
           me.txt_tipo,
           me.txt_designado,
           me.date_fecha,
           me.txt_lugartrabajo,
           me.txt_codMantenimiento,
           me.txt_codDefecto,
           me.txt_codSolucion,
           me.txt_objintervenido,
           me.txt_codobjintervenido,
           me.txt_estado,
           me.txt_solicitudobra,
           me.txt_estadoobra,
           /*me.cbx_subproyectosobra,
           me.txt_estadosubproyecto*/
        ];
    },
    CargarFormOTCierre: function () {
        var me = this;
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "NOMBRE_AFECTADO",
            readOnly: true

        });

        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Asignacion",
            name: "FECHA_ASIG",
            renderer: Ext.util.Format.dateRenderer('Y/m/d'),
        });
        me.txt_codigoMantenimiento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Mantenimiento",
            name: "COD_MAN",
        });
        me.txt_codigoDefecto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Defecto",
            name: "COD_DEF",

        });
        me.txt_codigoSolucion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Solucion",
            name: "COD_SOL",

        });
        me.items = [
            me.txt_nroOT,
            me.txt_tipo,
            me.date_fecha,
            me.txt_codigoMantenimiento,
            me.txt_codigoDefecto,
            me.txt_codigoSolucion

        ];
    },
    CargarFormOTAsignar: function () {
        var me = this;
        me.txt_id_asigna = Ext.create('App.Config.Componente.TextFieldBase', {
            name: "ASIGNADO_A",
            hidden: true
        });
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables');
        me.store_responsables.setExtraParam("Opcional", "Movil");
        me.store_responsables.proxy.extraParams['Columna'] = 'INSPECCIONA';
        me.store_responsables.proxy.extraParams['Valor'] = 'T';
        me.cbx_nombreReporta = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Responsable",
            labelWidth: 75,
            width: 250,
            name: "Nombre",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'NOMBRECOMPLETO',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
            margen: 0
        });
        me.cbx_nombreReporta.on('select', function (cmb, record) {
            me.txt_id_asigna.setValue(record[0].get('ID_RESP'));
        });
        //store para obtener los moviles
        me.store_moviles = Ext.create('App.Store.Moviles.Moviles', { autoLoad: true });
        me.cbx_movilReporta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Movil",
            labelWidth: 40,
            width: 200,
            displayField: 'MOVIL',
            valueField: 'ID_MOVIL',
            name: "MOVIL_ASIG",
            maxLength: 50,
            store: me.store_moviles
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            maximo: 'no',
            opcion: 'no',
            fieldLabel: "Fecha Estimada de Ejecucion",
            labelWidth: 170,
            name: "FECHA_PROB_EJE",
            width: 317,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.items = [
            me.txt_id_asigna,
            me.cbx_nombreReporta,
            me.cbx_movilReporta,
            me.date_fecha,
          //  me.txt_Observacion

        ];
    },
    CargarFechaHora: function () {
        var me = this;
         me.txt_id_ot = Ext.create('App.Config.Componente.TextFieldBase', {
              name: "ID_OT",
              hidden: true
          });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Recepcion",
            labelWidth: 170,
            name: "FECHA",
            width: 317,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
           // value:Date.now
        });
        me.txt_hora = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Recepcion",
            name: "HORA",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.items = [
           me.txt_id_ot,
           me.date_fecha,
           me.txt_hora

        ];
    },
    CargarDatosR: function (record) {
        var me = this;
        me.record = record;
        me.getForm().reset();
       // me.getForm().txt_id_ot.setValue(record.GET('ID_OT'));
        me.getForm().loadRecord(record);
    },
    EventosBoton: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_AgregarPosteUC") {
            if (me.winPosteUC == null) {
                // alert(me.formCuerpo.cmp_codigoPuesto.txt_id.getValue());
                me.winPosteUC = Ext.create("App.Config.Abstract.Window");
                me.formPosteUC = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'CargarFormUCyPoste', title: 'Postes Intervenidos' });
                me.formPosteUC.gridUC.columnAction.on('click', me.CargarUCaGrid, this);
                me.winPosteUC.add(me.formPosteUC);
                me.formPosteUC.CargarDatosPostePuesto(me.formCuerpo.cmp_codigoPuesto.txt_id.getValue(), me.formCabecera.txt_nroSolicitud.getValue(), me.formCuerpo.grpb_grupoBoton.getValue().rb);
                me.winPosteUC.show();
            }
            else {
                me.formPosteUC.CargarDatosPostePuesto(me.formCuerpo.cmp_codigoPuesto.txt_id.getValue(), me.formCabecera.txt_nroSolicitud.getValue(), me.formCuerpo.grpb_grupoBoton.getValue().rb);
                me.winPosteUC.show();
            }
        } else if (btn.getItemId() == "btn_Quitar") {
            var me = this;
            var data = me.gridReparacion.getSelectionModel().getSelection()[0];
            if (data != null) {
                me.gridReparacion.getStore().remove(data);
                me.gridReparacion.getView().refresh();
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
            }
        }
        else {
            alert("No Existe Ese Boton");
        }

    },
    CargarFormCabeceraPlanilla: function () {
        var me = this;
        me.txt_ot = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "OT",
            name: "ID_OT",
            readOnly: true,
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PLA",
            hidden: true
        });

        me.txt_fuente = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fuente",
            name: "COD_FUENTE",
            readOnly: true,
        });
        me.txt_responsable = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Responsable",
            name: "NOMBRE_ASIGNADO",
            readOnly: true,
        });
        me.txt_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Movil",
            name: "NOMBRE_MOVIL",
            readOnly: true,
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Inspeccion",
            name: "FECHA_INSP",
        });
        me.txt_ubicacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ubicacion",
            width: 480,
            colspan: 2,
            maxLength: 100,
            name: "LUGAR_TRABAJO",
            readOnly: true,
        });

        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            readOnly: true,
        });
        me.txt_estado_pla = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO_PLA",
            readOnly: true,
            fieldLabel: "Estado Planilla",
            //hidden: true,
        });
        me.btnHistoricoEstado = Funciones.CrearMenu('btn_historicoEstado', 'Historicos Estado', 'report', null, null, this);
        me.btnHistoricoEstado.on('click', function () {
            Funciones.CargarHistoricoEstadoPorVentana('MN_OT_PLANILLA_INSP', me.txt_id.getValue());
        });
        //me.btnHistoricoEdicion = Funciones.CrearMenu('btn_historicoEdicion', 'Historicos Edicion UC', 'folder_table', null, null, this);
        //me.btnHistoricoEstado.on('click', function () {
        //    Funciones.CargarHistoricoEstadoPorVentana('MN_OT_PLANILLA_INSP', me.txt_id.getValue());
        //});
        //var btn = Funciones.CrearMenu('btn_consultaHistorico', 'Historico de Cambios', 'folder_table', null, null, null);
        //btn.on('click', function () {
        //    Funciones.CargarHistoricoEdicionPorVentana('MN_POSTES_UC', me.record.get('ID_POSTE'));
        //});
        me.items = [
            me.txt_id,
            me.txt_ot,
            me.txt_fuente,
            me.txt_responsable,
            me.txt_movil,
            me.date_fecha,
            me.txt_ubicacion,
            me.txt_estado,
            me.txt_estado_pla,
            me.btnHistoricoEstado,
            //me.btnHistoricoEdicion
        ];
    },
    CargarFormPlanillaConsulta: function () {

    },
    CargarFormUCyPoste: function () {
        var me = this;
        //   alert(me.cmp_codigoPuesto.getValue());
        //alert(me.formCuerpo.cmp_codigoPuesto.getValue());
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.cmp_codigoMantenimiento = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_MAN',
            textComponente: 'Cod. Mantenimiento',
            nameComponente: 'COD_MAN',
            nameDetalleComponente: 'DESCRIP_MAN',
            btnId: 'btn_CodigoMantenimiento',
            controlador: "Codigos",
            accion: "BuscarCodigoMantenimiento",
            param: "codMan",
            mask: me,
            allowBlank: false,
            grid: me.gridCodigoMantenimiento,
            cmpCombo: true,
            textoTpl: function () { return "{COD_MAN} - {DESCRIP_MAN}" },

        });
        me.cmp_codigoMantenimiento.txt_componente.on('select', function (cmb, record, index) {
            me.cmp_codigoSolucion.reset();
        });
        me.gridCodigoSolucion = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoSolucion' });
        me.cmp_codigoSolucion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_SOL',
            textComponente: 'Cod. Solucion',
            nameComponente: 'COD_SOL',
            nameDetalleComponente: 'DESCRIP_SOL',
            controlador: "Codigos",
            accion: "BuscarCodigoSolucion",
            param: "codSolucion",
            mask: me,
            allowBlank: false,
            grid: me.gridCodigoSolucion,
            cmpCombo: true,
            textoTpl: function () { return "{COD_SOL} - {DESCRIP_SOL}" },
        });
        me.cmp_codigoSolucion.txt_componente.on('focus', function (cmb, the) {
            if (me.cmp_codigoMantenimiento.txt_id.getValue() == null) {
                return false;
            }
            else {
                me.cmp_codigoSolucion.grid.getStore().setExtraParam("ID_COD_MAN", me.cmp_codigoMantenimiento.txt_id.getValue());
                me.cmp_codigoSolucion.grid.getStore().load();
            }
        });
        me.txt_centroCosto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Centro Costo",
            name: "DESCRIPCION_CC",
            maxLength: 30,
            colspan: 2,
        });
        me.gridUC = Ext.create("App.View.Postes.GridPostes", {
            criterios: true,
            busqueda: false,
            opcion: 'PostesPuesto'
        });
       
        me.items = [
           me.cmp_codigoMantenimiento,
           me.cmp_codigoSolucion,
        //   me.txt_centroCosto,
           me.gridUC
        ];
    },
    CargarFormOTInforme: function () {
        var me = this;
        me.txt_id_inf = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_INFINSP",
            hidden: true
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true
        });
        me.date_fechaInspeccion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Inspeccion",
            name: "FECHA_INSP",
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.txt_horaInicio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Inicio",
            name: "HORA_INI",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_horaFin = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Fin",
            name: "HORA_FIN",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado:",
            name: "ESTADO",
            colspan: 1,
            readOnly: true
        });
        me.txta_Informe = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Informe",
            name: "INFORME",
            colspan: 2,
            maxLength: 1000,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.txta_Recomendacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Recomendacion",
            name: "RECOMEN",
            colspan: 2,
            maxLength: 1000,
            disabled: true
        });
        me.check_enviarCorreo = Ext.create('Ext.form.field.Checkbox', {
            boxLabel: '<I>Enviar este informe al Jefe de Mantenimiento</I>',
            name: 'enviarInforme',
            inputValue: 'SI',
            labelSeparator: '',
            fieldLabel: '',
            margin: '10 0 10 0',
            colspan: 2,
            //allowBlank: false,
            //checked: true,
            //readOnly: true,
            //disabled: true
        });
        me.txt_usuario = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "LOGIN_REG",
            hidden: true
        });
        me.items = [
            me.txt_id_inf,
            me.txt_id,
            me.date_fechaInspeccion,
            me.txt_estado,
            me.txt_horaInicio,
            me.txt_horaFin,
            me.txta_Informe,
            me.txta_Recomendacion,
            me.check_enviarCorreo,
            me.txt_usuario
        ];

    },
    CargarUCaGrid: function (view, cell, row, col, e/*grd, td, cellIndex, record, tr, rowIndex, e, eOpts*/) {
        var me = this; 
        record = view.getStore().getAt(row);
        if (me.formPosteUC.getForm().isValid()) {
          //  alert(me.formCuerpo.cbx_tipo.getValue() + '----' + me.formCuerpo.grpb_grupoBoton.getValue().rb + '>>' + record.get('ID_POSTE'));
            if (this.gridReparacion.getStore().existeRecord('ID_POSTE', record.get('ID_POSTE')) == false && ((me.formCuerpo.cbx_tipo.getValue() == 'REPARACION_REEMPLAZO' && this.gridReparacion.getStore().data.items.length < 5) || (me.formCuerpo.cbx_tipo.getValue() == 'PROYECTO') || (me.formCuerpo.cbx_tipo.getValue() == 'INSPECCION' && (me.formCuerpo.grpb_grupoBoton.getValue().rb == 'DERIVACION' || me.formCuerpo.grpb_grupoBoton.getValue().rb == 'TRAMO')))) {
                var rec = new App.Model.OrdenesTrabajo.DetallesReemplazo({
                    
                    //**************************************************************************************
                    ID_OT: record.get('ID_OT'),
                    ID_POSTE: record.get('ID_POSTE'),
                    ID_COD_MAN: me.formPosteUC.getForm().findField('ID_COD_MAN').getValue(),
                    ID_COD_SOL: me.formPosteUC.getForm().findField('ID_COD_SOL').getValue(),
                    INSTRUC_SOL: me.formPosteUC.getForm().findField('COD_SOL').getValue(),
                    IDCENTRO_COSTO: 1,//me.formPosteUC.getForm().findField('IDCENTRO_COSTO').getValue(),
                    COD_POSTE: record.get('COD_POSTE'),
                    INTERVENIDO: record.get('INTERVENIDO'),
                    PRIORIDAD: record.get('PRIORIDAD'),
                    COD_MAN: me.formPosteUC.getForm().findField('COD_MAN').getValue(),
                    COD_SOL: me.formPosteUC.getForm().findField('COD_SOL').getValue(),
                    //  DESCRIPCION_CC: me.formPosteUC.getForm().findField('DESCRIPCION_CC').getValue(),
                    //**************************************************************************************
                });
                this.gridReparacion.getStore().insert(0, rec);
                this.gridReparacion.getView().refresh();

            }
            else {
                if (me.formCuerpo.cbx_tipo.getValue() == 'REPARACION_REEMPLAZO') {//caso cuando seleccione al mismo poste o ya se seleccionaron los 5 postes y quiere seguir agregando
                    Ext.MessageBox.alert('Error', "Se permite adicionar 5 unidades constructivas, No puede repetirse UC, se ingreso: " + this.gridReparacion.getStore().data.items.length);
                }
                else {//cuando seleccione el mismo poste
                    Ext.MessageBox.alert('Error', "No puede repetirse UC, ya selecciono: " + record.get('COD_POSTE'));
                }
            }
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un Codigo de Mantenimiento...");
        }
    },
    //Formulario de Consulta para OT y SM se utiliza en presupuesto
    CargarFormConsultaOTSM: function () {
        var me = this;
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Quien Reporta",
            name: "REPORTA_NOMBRE",
            maxLength: 230,
        });
        me.txt_direccion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Direccion",
            name: "UBICACION",
            width: 730,
            maxLength: 1000,
            colspan: 3
        });

        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA_PROBL",
        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT",
            readOnly: true

        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado OT",
            name: "ESTADO",
        });
        me.txt_codigoMantenimiento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Mantenimiento",
            name: "COD_MAN",
        });
        me.txt_codigoDefecto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Defecto",
            name: "COD_DEF",

        });
        me.txt_codigoSolucion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Solucion",
            name: "COD_SOL",

        });
        me.items = [
            me.txt_nroSolicitud,
            me.txt_nombre,
            me.dat_fecha,
            me.txt_direccion,
            me.txt_nroOT,
            me.txt_tipo,
            me.txt_estado,
            me.txt_codigoMantenimiento,
            me.txt_codigoDefecto,
            me.txt_codigoSolucion
        ];
    },
    //formualrio de postes
    CargarDatosPostePuesto: function (id_puesto , ID_SOL_MAN,OBJETO ) {
        var me = this;
        if (OBJETO == 'DERIVACION') {
            me.gridUC.getStore().setExtraParams({ ID_PUESTO: 0, ID_SOL_MAN: ID_SOL_MAN });
        } else {
            me.gridUC.getStore().setExtraParams({ ID_PUESTO: id_puesto, ID_SOL_MAN: ID_SOL_MAN });
        }
        me.cmp_codigoMantenimiento.reset();
        me.cmp_codigoSolucion.reset();
        me.gridUC.getStore().load();
    },
    /*Este metodo puede llegar a ser muy comun para ventanas, analizar para colocar como una funcion comun en los abstractos*/
    valorarInformeInspeccion: function (btn, window) {
        var me = this;
        var norequerido = btn.text == 'Aprobar' ? true : false;
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
                xtype: 'textfield',
                name: 'EST_ORIG',
                value: me.txt_estado.getValue(),
                hidden: true
            },
                    {
                        xtype: 'textfield',
                        name: 'ID_OT',
                        value: me.txt_id.getValue(),
                        hidden: true
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Motivo:',
                        name: 'OBSERV',
                        labelAlign: 'top',
                        flex: 1,
                        margins: '0',
                        allowBlank: norequerido
                    }],
            buttons: [{
                text: btn.text,
                handler: function () {
                    var form = this.up('form');
                    var record = form.getForm().getValues();
                    if (this.up('form').getForm().isValid()) {
                        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de ' + btn.text + ' el Informe de Inspeccion?', function (button) {
                            if (button == 'yes') {
                                var estadodestino = btn.text == 'Aprobar' ? 'APROBADO' : 'RECHAZADO';
                                Ext.Ajax.request({
                                    url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarInformeInspeccion',
                                    params: { ID_OT: record.ID_OT, EST_ORIG: record.EST_ORIG, EST_DEST: estadodestino, OBSERV: record.OBSERV },
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
                            }
                        })
                        this.up('form').getForm().reset();
                        this.up('window').close();
                    } else {
                        Ext.MessageBox.alert('Faltan datos importantes', 'Por favor! ingrese el Motivo');
                    }
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
            title: 'Descripcion',
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
    CargarFormReporteTEjecutados: function () {
        var me = this;
        me.date_fechaInicio = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Inicio",
            name: "FECHA_INICIO",
        });

        me.date_fechaFin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Fin",
            name: "FECHA_FIN",
        });
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables');
        me.store_responsables.setExtraParam("Opcional", "Movil");
        me.store_responsables.proxy.extraParams['Columna'] = 'INSPECCIONA';
        me.store_responsables.proxy.extraParams['Valor'] = 'T';
        me.cbx_nombreReporta = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'ID_RESP',
            maxLength: 50,
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
            margen: 0
        });
        me.store_moviles = Ext.create('App.Store.Moviles.Moviles', { autoLoad: true });
        me.cbx_movilReporta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Movil",
            displayField: 'MOVIL',
            valueField: 'ID_MOVIL',
            name: "MOVIL_CRI",
            maxLength: 50,
            store: me.store_moviles
        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_OT'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT_CRI",
            displayField: 'VALOR',
            store: me.store_tipo
        });

        me.items = [
                    me.date_fechaInicio,
                    me.date_fechaFin,
                    me.cbx_movilReporta,
                    me.cbx_nombreReporta,
                    me.cbx_tipo

        ];
    },
    //componentes del formulario de pago contratista donde se registrara la fecha y centro de costo
    CargarFormPagoContratista: function () {
        var me = this;
        me.txt_id_ot = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true
        });

        me.txt_nro_pago = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Orden Pago",
            name: "NRO_PAGO",
            width: 240,
            maxLength: 20,
            readOnly: true
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Orden",
            name: "FECHA_PAGO",
            width: 240,
            colspan :2 
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.chk_css = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: 'Grupos Propios',
            name: 'GCC',
            checked: true
        });
        me.store_grupoSCC = Ext.create('App.Store.OrdenesTrabajo.GrupoCentroCostos').load();
        me.cbx_grupoSCC = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Grp Centro Costos",
            name: "IDGRUPOCC",
            valueField: 'IDGRUPOCC',
            displayField: 'IDGRUPOCC',
            store: me.store_grupoSCC,
            afterLabelTextTpl: Constantes.REQUERIDO,
            textoTpl: function () { return "{IDGRUPOCC} -  {DESCRIPCION}" },
            allowBlank: false,
        });
        me.store_SCC = Ext.create('App.Store.OrdenesTrabajo.CentroCostos');
        me.cbx_SCC = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Centro Costos",
            name: "IDCENTRO_COSTO",
            displayField: 'IDCENTRO_COSTO',
            valueField: 'IDCENTRO_COSTO',
            store: me.store_SCC,
            afterLabelTextTpl: Constantes.REQUERIDO,
            textoTpl: function () { return "{IDCENTRO_COSTO} - {DESCRIPCION}" },
            allowBlank: false,

        });
        me.items = [
                    me.txt_id_ot,
                    me.txt_nro_pago,
                    me.dat_fecha,
                    me.chk_css,
                    me.cbx_grupoSCC,
                    me.cbx_SCC    ];

    },
    //Formula,rio de Consulta para OT con trabajos Ejecutados por Contratista
    CargarFormConsultaOTContratista: function () {
        var me = this;
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Contratista",
            name: "NOMBRE_ASIGNADO",
            maxLength: 230,
        });
        me.txt_direccion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ubicacion Trabajo",
            name: "UBICACION",
            width: 730,
            maxLength: 1000,
            colspan: 3
        });

        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Asignacion",
            name: "FECHA_ASIG",
        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT",
            readOnly: true

        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado OT",
            name: "ESTADO",
        });
        me.dat_fecha_eje = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Ejecucion",
            name: "FECHA_EJE",
        });
        me.txt_distancia = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Distancia",
            name: "DISTANCIA",
            colspan: 2
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descripcion Trabajo",
            name: "DESCRIPCION_EJE",
            width: 730,
            maxLength: 1000,
            colspan: 3
        });
        //me.cbx_camino = Ext.create("Ext.form.field.Checkbox", {
        //    boxLabel: 'Camino Inaccecible',
        //    name: 'CAMINO',
        //    //inputValue: '0',
        //});
        me.items = [
            me.txt_nroSolicitud,
            me.txt_nombre,
            me.dat_fecha,
            
            me.txt_nroOT,
            me.txt_tipo,
            me.txt_estado,
            me.dat_fecha_eje,
            me.txt_distancia,
            me.txt_direccion,
            me.txt_descripcion,

            //me.cbx_camino
        ];
    },
});
