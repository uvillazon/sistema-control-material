Ext.define("App.View.Pedidos.FormConsultaPedido", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Pedido",
    
    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarGridComponentes: function () {
        var me = this;
        me.gridCmp = Ext.create("App.View.Materiales.GridComponentesArmamentos", {
            title: 'Componentes',
            width: 490,
            height: 200,
            colspan : 2

        });
    },
    CargarFormulario: function () {
        var me = this;
        me.CargarGridComponentes();
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PEDIDO",
            hidden: true,
        });
        me.txt_nro = Ext.create("App.Config.Componente.TextFieldBase", {
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
        me.txt_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Registro",
            name: "FECHA_PEDIDO",
            readOnly: true
        });
        me.txt_fecha_modificacion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Modificacion",
            name: "FECHA_MODIF",
            readOnly: true
        });
        
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACIONES",
            colspan : 2,
            readOnly: true
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            colspan : 2,
            readOnly: true
        });
        me.gridDetalle = Ext.create("App.View.Pedidos.GridDetalleConsulta",
            {
                width: 480,
                height: 250,
                title: 'Detalle Pedido',
                colspan : 2
            }
            );
        me.items = [
        me.txt_id,
        me.txt_nro,
        me.txt_tipo,
        me.txt_unidad,
        me.txt_fecha,
        me.txt_fecha_modificacion,
        me.txt_observacion,
        me.txt_estado,
        me.gridDetalle
        ];
    },
});
