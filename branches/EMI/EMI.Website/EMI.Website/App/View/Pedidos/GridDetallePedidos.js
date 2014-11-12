Ext.define("App.View.Pedidos.GridDetallePedidos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Detalles Pedidos',
    criterios: true,
    textBusqueda: 'Pedido',
    imprimir: false,
    //width: 550,
    //height: 350,
    equipo: 'Detalle Pedidos',
    initComponent: function () {
        var me = this;
        me.CargarComponentesGrid();
        this.callParent(arguments);
    },
    CargarComponentesGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Pedidos.DetallesPedido");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Pedido", width: 80, sortable: true, dataIndex: 'NRO_PEDIDO', align: 'center' },
            { header: "Codigo", width: 90, sortable: true, dataIndex: "CODIGO", align: 'center' },
            { header: "Cantidad<br>Solicitada", width: 90, sortable: true, dataIndex: "CANTIDAD_SOLICITADA", align: 'center' },
            { header: "Cantidad<br>Entregada", width: 90, sortable: true, dataIndex: "CANTIDAD_ENTREGADA", align: 'center' },
            { header: "Tipo", width: 90, sortable: true, dataIndex: "TIPO" },
            { header: "Fecha <br>Registro", width: 90, sortable: true, dataIndex: "FECHA_PEDIDO", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Fecha <br>Modificacion", width: 90, sortable: true, dataIndex: "FECHA_MODIF", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Observaciones", width: 400, sortable: true, dataIndex: "OBSERVACIONES", align: 'center' },
            { header: "Unidad", width: 80, sortable: true, dataIndex: "UNIDAD", align: 'center' },
            { header: "Estado<br>Pedido", width: 120, sortable: true, dataIndex: "ESTADO", align: 'center' },
            { header: "Estado<br>Detalle", width: 150, sortable: true, dataIndex: "ESTADO_DETALLE", align: 'center' },
            { header: "Estado<br>Recepcion", width: 150, sortable: true, dataIndex: "ESTADO_RECEPCION", align: 'center' }
            
            
        ];

    }
});