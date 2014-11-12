Ext.define("App.View.Pedidos.GridPedidos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Pedidos Registrados',
    criterios: true,
    textBusqueda: 'Pedido',
    imprimir: false,
    //width: 550,
    //height: 350,
    equipo: 'Pedidos',
    initComponent: function () {
        var me = this;
        me.CargarComponentesGrid();
        this.callParent(arguments);
    },
    CargarComponentesGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Pedidos.Pedidos");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Pedido", width: 80, sortable: true, dataIndex: 'NRO_PEDIDO', align: 'center' },
            { header: "Tipo", width: 90, sortable: true, dataIndex: "TIPO" },
            { header: "Fecha <br>Registro", width: 90, sortable: true, dataIndex: "FECHA_PEDIDO", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Fecha <br>Modificacion", width: 90, sortable: true, dataIndex: "FECHA_MODIF", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Observaciones", width: 800, sortable: true, dataIndex: "OBSERVACIONES", align: 'center' },
            { header: "Unidad<br>Solicitante", width: 80, sortable: true, dataIndex: "UNIDAD", align: 'center' },
            { header: "Estado", width: 120, sortable: true, dataIndex: "ESTADO", align: 'center' },
            
            
        ];

    }
});