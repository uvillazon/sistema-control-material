Ext.define("App.View.Pedidos.FormRecepcionArmamento", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Recepcion de Armamentos",
    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        me.EventosForm();
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.formConsulta = Ext.create("App.View.Pedidos.FormDetallePedidoConsulta", { botones: false ,colspan : 2});
        me.gridDespacho = Ext.create("App.View.Pedidos.GridDespachos", {
            width: 300,
            height: 250,
            title: 'Despachos Registrados por Detalle',
            colspan : 1
        });
        me.gridParteArmamento = Ext.create("App.View.Materiales.GridComponentesArmamentos", {
            width: 250,
            height: 250,
            title: 'Partes del Armamento',
            colspan: 1
        });
       
        me.items = [
        me.formConsulta,
        me.gridDespacho,
        me.gridParteArmamento
        ];
    },
    EventosForm: function () {
        var me = this;
        me.gridDespacho.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            //me.recordDespacho = disabled ? null : selections[0];
            if (!disabled) {
                me.gridParteArmamento.getStore().setExtraParams({ ID_ITEM: selections[0].get('ID_ITEM_ARMAMENTO') });
                me.gridParteArmamento.getStore().load();
            }
            //Funciones.DisabledButton('btn_guardar', win, disabled);
        });
    }
});
