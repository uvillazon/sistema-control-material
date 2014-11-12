Ext.define("App.View.Materiales.FormItemLogistico", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Item Logistico",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
       
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ITEM",
            hidden: true,
        });
        me.txt_nro_serie = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Serie",
            name: "NRO_SERIE",
            maxLength: 20,
            colspan : 2,
            ///las dos propiedades son para obligar que el campo es requerido
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_mat_logistico = Ext.create('App.Store.Logisticos.MatLogisticos');
        me.store_mat_logistico = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Modelo",
            name: "ID_MAT_LOGISTICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_LOGISTICO',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {FABRICANTE} - {TIPO_COMPONENTE} - {AERONAVE} - {GRUPO}" },
            store: me.store_mat_logistico,
        });

        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            value: 'OPERABLE',
            readOnly: true
        });

        me.items = [
        me.txt_id,
        me.txt_nro_serie,
        me.store_mat_logistico,
        me.txt_estado
        ];
    },
});
