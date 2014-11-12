Ext.define("App.View.Kardex.GridKardexMunicionesUnidad", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    title : 'Kardex de Movimiento de Municiones',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        me.CargarGrid();
        
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Kardex.KardexMunicionesUnidad");
        //me.selType = 'cellmodel';
       
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Fecha", width: 70, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Codigo", width: 70, sortable: false, dataIndex: "CODIGO", align: 'center' },
            { header: "Operacion", width: 70, sortable: false, dataIndex: "OPERACION", align: 'center' },
            { header: "Entrada", width: 70, sortable: false, dataIndex: "ENTRADA", align: 'center' },
            { header: "Salida", width: 70, sortable: false, dataIndex: "SALIDA", align: 'center' },
            { header: "Saldo", width: 70, sortable: false, dataIndex: "SALDO", align: 'center' },
            { header: "Responsable <br>Operacion", width: 70, sortable: false, dataIndex: "LOGIN", align: 'center' },
        
           
        ];
    }
});

