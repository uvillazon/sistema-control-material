Ext.define("App.View.Pedidos.GridDetalleConsulta", {
    extend: "Ext.grid.Panel",
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
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 80, sortable: true, dataIndex: "CODIGO", align: 'center' },
            { header: "Descripcion", width: 120, sortable: false, dataIndex: "CATEGORIA", align: 'center' },
            { header: "Cantidad<br>Solicitada", width: 70, sortable: true, dataIndex: "CANTIDAD_SOLICITADA", align: 'center' },
            { header: "Cantidad<br>Entregada", width: 70, sortable: true, dataIndex: "CANTIDAD_ENTREGADA", align: 'center' },
            { header: "Cantidad<br>Disp. Almacen", width: 90, sortable: true, dataIndex: "CANTIDAD_EXISTENTE", align: 'center' }
          
            
            
        ];

    }
});