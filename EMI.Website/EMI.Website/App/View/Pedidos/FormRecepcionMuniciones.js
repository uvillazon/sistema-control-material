Ext.define("App.View.Pedidos.FormRecepcionMuniciones", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Recepcion de Municiones",
    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.formConsulta = Ext.create("App.View.Pedidos.FormDetallePedidoConsulta", { botones: false ,colspan : 2});

       
        me.gridDespacho = Ext.create("App.View.Pedidos.GridDespachos", {
            width: 500,
            height: 250,
            title: 'Despachos Registrados por Detalle',
            colspan : 2
        });
        me.items = [
        me.formConsulta,
        me.gridDespacho
        ];
    }
});
