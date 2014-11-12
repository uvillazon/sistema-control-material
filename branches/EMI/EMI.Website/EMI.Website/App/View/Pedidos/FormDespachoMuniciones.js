Ext.define("App.View.Pedidos.FormDespachoMuniciones", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Despacho",
    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.formConsulta = Ext.create("App.View.Pedidos.FormDetallePedidoConsulta", { botones: false ,colspan : 2});

        me.txt_cantidad_disponible = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cantidad Disponible",
            name: "CANTIDAD_EXISTENTE",
            colspan : 2,
            readOnly: true
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Despacho",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_cantidad_a_despachar = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad a Despachar",
            name: "CANTIDAD_ENTREGADA",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });
        me.gridDespacho = Ext.create("App.View.Pedidos.GridDespachos", {
            width: 500,
            height: 250,
            title: 'Despachos Registrados por Detalle',
            colspan : 2
        });
        me.items = [
        me.formConsulta,
        me.txt_cantidad_disponible,
        me.dat_fecha,
        me.num_cantidad_a_despachar,
        me.gridDespacho
        ];
    }
});
