Ext.define("App.View.Materiales.FormMatLogistico", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Modelo Logistico",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();

        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MAT_LOGISTICO",
            hidden: true,
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "CODIGO",
            colspan: 2,
            maxLength: 10,
            ///las dos propiedades son para obligar que el campo es requerido
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_fabricacion = Ext.create("App.Store.Listas.StoreLista");
        me.store_fabricacion.setExtraParam('ID_LISTA', Lista.Buscar('FABRICACION'));
        me.cbx_fabricacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Fabricante",
            name: "FABRICANTE",
            store: me.store_fabricacion,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.store_tipo_componente = Ext.create("App.Store.Listas.StoreLista");
        me.store_tipo_componente.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_COMPONENTE'));
        me.cbx_tipo_componente = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo Componente",
            name: "TIPO_COMPONENTE",
            store: me.store_tipo_componente,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.store_aeronave = Ext.create("App.Store.Listas.StoreLista");
        me.store_aeronave.setExtraParam('ID_LISTA', Lista.Buscar('AERONAVE'));
        me.cbx_aeronave = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Aeronave",
            name: "AERONAVE",
            store: me.store_aeronave,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_grupo = Ext.create("App.Store.Listas.StoreLista");
        me.store_grupo.setExtraParam('ID_LISTA', Lista.Buscar('GRUPO'));
        me.cbx_grupo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Grupo",
            name: "GRUPO",
            store: me.store_grupo,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.num_nro_parte = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Parte",
            name: "NRO_PARTE",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.dat_fecha_dotacion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Dotacion",
            name: "FECHA_DOTACION",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_ciclo_vida = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Ciclo Vida",
            name: "CICLO_VIDA",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });
        me.num_hora_vida = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Hora de Vida",
            name: "HORA_VIDA",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });
        me.txta_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            colspan: 2,
            maxLength: 250
        });


        me.items = [
        me.txt_id,
        me.txt_codigo,
        me.cbx_fabricacion,
        me.cbx_tipo_componente,
        me.cbx_aeronave,
        me.cbx_grupo,
        me.num_nro_parte,
        me.dat_fecha_dotacion,
        me.num_ciclo_vida,
        me.num_hora_vida,
        me.txta_descripcion
        ];
    },
});
