Ext.define("App.View.Kardex.GridHistoricosCmp", {
    extend: "App.Config.Abstract.Grid",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    width: 600,
    height : 450,
    title : 'Historicos de Cambios de Componentes',
    //btnEliminarRecord: false,
    criterios: true,
    //textBusqueda: 'Pedido',
    imprimir: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        me.CargarGrid();
        
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Historicos.HistoricosCmp");
        //me.selType = 'cellmodel';
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            //{ header: "id", width: 70, sortable: false, dataIndex: "ID_MOV", align: 'center' },
            { header: "Fecha", width: 70, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Codigo", width: 70, sortable: false, dataIndex: "CODIGO", align: 'center' },
            { header: "Nro Fusil <br> Operable", width: 70, sortable: false, dataIndex: "NRO_SERIE_OPERABLE", align: 'center' },
            { header: "Nro Fusil <br> No Operable", width: 70, sortable: false, dataIndex: "NRO_SERIE_NO_OPERABLE", align: 'center' },
            { header: "Componente<br> Alta", width: 100, sortable: false, dataIndex: "CMP_BAJA", align: 'center' },
            { header: "Componeten<br>Baja", width: 100, sortable: false, dataIndex: "CMP_ALTA", align: 'center' },
            { header: "Responsable", width: 70, sortable: false, dataIndex: "USR", align: 'center' },
        
           
        ];
    }
});

