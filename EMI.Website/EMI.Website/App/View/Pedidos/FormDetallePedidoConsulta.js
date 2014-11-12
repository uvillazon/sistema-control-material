Ext.define("App.View.Pedidos.FormDetallePedidoConsulta", {
    extend: "App.Config.Abstract.Form",
    title: "Datos Detalles de Pedido",
    
    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PEDIDO",
            hidden: true,
        });
        me.txt_id_detalle = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_DETALLE",
            hidden: true,
        });
      
        me.txt_nro_pedido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Pedido",
            name: "NRO_PEDIDO",
            readOnly: true,
            colspan : 2
        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            readOnly: true
        });
        
        me.txt_unidad = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Unidad Solicitante",
            name: "UNIDAD",
            readOnly: true
        });
        
        me.txt_fecha_registro = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Registro",
            name: "FECHA_REGISTRO",
            readOnly: true
        });
        
        me.txt_fecha_modificacion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Modificacion",
            name: "FECHA_MODIFICACION",
            readOnly: true
        });
        
        me.txt_observarcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACIONES",
            readOnly: true
        });
        
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "CODIGO",
            readOnly: true
        });
        
        me.txt_cantidad_solicitada = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad Solicitada",
            name: "CANTIDAD_SOLICITADA",
            readOnly: true
        });
        
        me.items = [
        me.txt_id,
        me.txt_id_detalle,
        me.txt_nro_pedido,
        me.txt_tipo,
        me.txt_unidad,
        me.txt_fecha_registro,
        me.txt_fecha_modificacion,
        me.txt_observarcion,
        me.txt_codigo,
        me.txt_cantidad_solicitada
        ];
    },
});
