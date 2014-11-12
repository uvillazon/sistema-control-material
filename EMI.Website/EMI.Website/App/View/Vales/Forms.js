Ext.define("App.View.Vales.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormValeIncremental") {
            me.title = "";
            me.CargarFormValeIncremental();
            me.EventosFormValeIncremental();

        }
        else if (me.opcion == "FormValeCambio") {
            me.title = "";
            me.columns = 3,
            me.CargarFormValeCambio();
            me.EventosFormValeCambio();
        }
        else {
            alert("Seleccione alguna Opciones");
        }
        this.callParent(arguments);
    },
    CargarFormValeIncremental: function () {
        var me = this;
        //solo se mostrar todos los materiales en estato ACTIVO IDSTATUS = 1
        me.store_otros_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_otros_materiales.setExtraParams({ IDSTATUS: 1 });
        me.cbx_materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Materiales',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
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
        });
        me.cmp_materiales = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Material',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar los materiales seleccionados',
            btn_id: 'btn_material_add',
            colspan: 3,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_materiales, me.txt_cod_mat],
            //componente: me.cbx_codigoSolucion,
        });

        me.store_item = Ext.create("App.Store.OrdenesTrabajo.DetallesTrabajoEjecutadoCapCon");
        me.cbx_detalle_item_trabajo = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Detalle Trab. eje.',
            displayField: 'CODIGO',
            valueField: 'ID_TD_DET',
            name: 'ID_TD_DET',
            width: 240,
            store: me.store_item,
            textoTpl: function () {
                return '<div><h3>Cod : {CODIGO} - {CODIGO_UC}</h3> {COD_PROD} - {DESC_PROD}</div>';
            }
        });
        me.txt_id_detalle_trab = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DET_ID_TD_DET",
            maxLength: 500,
            width: 240,
            readOnly: true
        });
        me.cmp_itemDetalle = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Buscar Trab. eje.',
            //btn_iconCls: 'add',
            //btn_tooltip: 'Se Agregar los materiales seleccionados',
            //btn_id: 'btn_material_add11',
            colspan: 3,
            columns: 3,
            botton: false,
            cmpArray: [me.cbx_detalle_item_trabajo, me.txt_id_detalle_trab],
            //componente: me.cbx_codigoSolucion,
        });
        me.items = [
            me.cmp_itemDetalle,
            me.cmp_materiales
        ];
    },
    CargarFormValeCambio: function () {
        var me = this;
        //me.store_otros_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_materiales_pres = Ext.create("App.Store.OrdenesTrabajo.DetallesPresupuesto");
        me.cbx_materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Materiales presupuestados',
            displayField: 'COD_PROD',
            valueField: 'COD_PROD',
            name: 'COD_PROD',
            //colspan: 1,
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_materiales_pres,
            textoTpl: function () {
                return '<h3>[{CODIGO}] - {COD_PROD} - {DESC_PROD}</h3>';
            }
        });
        //solo se mostrar todos los materiales en estato ACTIVO IDSTATUS = 1
        me.store_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_materiales.setExtraParams({ IDSTATUS: 1 });
        me.cbx_materiales_cambio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Materiales Cambio',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
            //colspan: 1,
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_materiales,
            textoTpl: function () {
                return '<div class="{CSSSTATUS}">{COD_ALTERNATIVO} - {DESCRIPCION}</div>';
            }
        });
        me.btn = Ext.create('Ext.Button', {
            iconCls: 'add',
            tooltip: 'Agregar Material Cambio',
            text: 'Agregar Mat Cambio',
        });
        me.items = [
            me.cbx_materiales,
            me.cbx_materiales_cambio,
            me.btn
        ];
    },
    EventosFormValeIncremental: function () {
        var me = this;
        me.cbx_materiales.on('select', function (cmb, record) {
            me.txt_cod_mat.setValue(record[0].get('DESCRIPCION'));
        });
        me.cbx_detalle_item_trabajo.on('select', function (cmb, record) {
            //alert(record[0].get('ID_TD_DET'));
            if (record[0].get('COD_PROD') === null) {
                Ext.Msg.alert("Aviso", "Selecciono una Item que solo hace referencia a una Soluciona...");
                cmb.datos = null;
                me.txt_id_detalle_trab.reset();
                cmb.reset();
            }
            else {
                me.txt_id_detalle_trab.setValue(record[0].get('CODIGO') + '|' + record[0].get('CODIGO_UC') + '  ' + record[0].get('COD_PROD') + ' - ' + record[0].get('DESC_PROD'));
                cmb.datos = record[0];
            }
        });
    },
    EventosFormValeCambio: function () {
        var me = this;
        me.cbx_materiales.on('select', function (cmb, record) {
            if (record[0].get('IDVALE') == 0) {
                Ext.Msg.alert("Error", "Seleccione otro Material que tenga Vale generado");
                cmb.reset();
            }
            //me.txt_cod_mat.setValue(record[0].get('DESCRIPCION'));
        });
    }
});
