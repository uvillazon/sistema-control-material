Ext.define("App.View.Unidades.FormReparacionComponente", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Reparacion de Armamento",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        me.EventosForm();
        this.callParent(arguments);
    },
    EventosForm: function () {
        var me = this;
        me.cbx_armamento_operable.on('select', function (cbx, record) {
            me.gridCmp1.getStore().setExtraParams({ ID_ITEM: record[0].get('ID_ITEM') });
            me.gridCmp1.getStore().load();
            me.store_cmp_operable.setExtraParams({ ID_ITEM: record[0].get('ID_ITEM') });
            me.store_cmp_operable.load();
            me.store_armamento_no_operable.setExtraParams({ID_MAT_BELICO :  record[0].get('ID_MAT_BELICO')});
            me.store_armamento_no_operable.load();
        });
        me.cbx_armamento_no_operable.on('select', function (cbx, record) {
            me.gridCmp2.getStore().setExtraParams({ ID_ITEM: record[0].get('ID_ITEM') });
            me.gridCmp2.getStore().load();
            me.store_cmp_cambio.setExtraParams({ ID_ITEM: record[0].get('ID_ITEM') });
            me.store_cmp_cambio.load();
        });
        me.btn_guardar.on('click', function () {
            if (me.isValid()) {
                if (me.cbx_cmp_operable.datos[0].get('NOMBRE') == me.cbx_cmp_cambio.datos[0].get('NOMBRE')) {
                    Funciones.AjaxRequestGridArray("Armamentos", "CambiarComponentesArmamento", me, "Esta Seguro de Cambiar de Estado?", { ID_CMP1: me.cbx_cmp_operable.getValue(), ID_CMP2: me.cbx_cmp_cambio.getValue() }, [me.gridCmp1, me.gridCmp2]);
                }
                else {
                    Ext.Msg.alert("Aviso", "Los compomentes tienen que ser del mismo tipo.");
                }
            }
            else {
                Ext.Msg.alert("Aviso", "Falta completar el formulario.");
            }
            //: function (controlador, accion, mask, msg, param, ArrayGrid)
        });
    },
    CargarFormulario: function () {
        var me = this;

        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ITEM",
            hidden: true,
        });

        me.store_armamento_operable = Ext.create('App.Store.Armamentos.Armamentos');
        me.store_armamento_operable.setExtraParams({ ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD, ESTADO: 'OPERABLE' });
        me.cbx_armamento_operable = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Armamento",
            name: "ID_ITEM",
            displayField: 'CODIGO',
            valueField: 'ID_ITEM',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO}/ Nro Fusil : {NRO_FUSIL} - {FABRICACION}" },
            store: me.store_armamento_operable,
        });

        //me. = Ext.create('App.Store.Materiales.Materiales');
        me.store_armamento_no_operable = Ext.create('App.Store.Armamentos.Armamentos');
        me.store_armamento_no_operable.setExtraParams({ ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD, ESTADO: 'NO OPERABLE' });
        me.cbx_armamento_no_operable = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Armamento No Operable",
            name: "ID_ITEM",
            displayField: 'CODIGO',
            valueField: 'ID_ITEM',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO}/ Nro Fusil : {NRO_FUSIL} - {FABRICACION}" },
            store: me.store_armamento_no_operable,
        });

        me.store_cmp_operable = Ext.create("App.Store.Armamentos.CmpArmamentos");
        me.cbx_cmp_operable = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Componente",
            name: "ID_CMP1",
            displayField: 'NOMBRE',
            valueField: 'ID_PARTE',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {NOMBRE}" },
            store: me.store_cmp_operable,
        });

        me.store_cmp_cambio = Ext.create("App.Store.Armamentos.CmpArmamentos");
        me.cbx_cmp_cambio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Componente Cambio",
            name: "ID_CMP2",
            displayField: 'NOMBRE',
            valueField: 'ID_PARTE',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {NOMBRE}" },
            store: me.store_cmp_cambio,
        });

        me.btn_guardar = Funciones.CrearMenuCss('btn_guardar', "Cambiar", 'disk', null, null, null);
        me.btn_guardar.colspan = 2;

        me.gridCmp1 = Ext.create("App.View.Materiales.GridComponentesArmamentos", {
            width: 240,
            height: 200,
            title: 'Componentes',
        });
        me.gridCmp2 = Ext.create("App.View.Materiales.GridComponentesArmamentos", {
            width: 240,
            height: 200,
            title: 'Componentes',
        });
        me.items = [
        me.txt_id,
        me.cbx_armamento_operable,
        me.cbx_armamento_no_operable,
        me.cbx_cmp_operable,
        me.cbx_cmp_cambio,
        me.btn_guardar,
        me.gridCmp1,
        me.gridCmp2
        ];
    },
});
