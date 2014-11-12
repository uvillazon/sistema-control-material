Ext.define("App.View.Pedidos.GridDespachos", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        me.CargarGrid();
        
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Pedidos.Despachos");
        //me.selType = 'cellmodel';
        
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 80, sortable: false, dataIndex: "CODIGO", align: 'center' },
            { header: "Cantidad <br> Despachada", width: 100, sortable: false, dataIndex: "CANTIDAD_ENTREGADA", align: 'center' },
            { header: "Fecha <br>Despacho", width: 90, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO", align: 'center' },
            { header: "Usuario", width: 100, sortable: false, dataIndex: "LOGIN", align: 'center' },
        ];
    }

});

