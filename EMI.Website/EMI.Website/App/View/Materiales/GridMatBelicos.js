Ext.define("App.View.Materiales.GridMatBelicos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Materiales Belicos Registrados',
    criterios: true,
    textBusqueda: 'Material Belico',
    imprimir: false,
    width: 550,
    //height: 350,
    equipo: 'Materiales Belicos',
    paramsStore : { CATEGORIA: "ARMAMENTO" },
    initComponent: function () {
        var me = this;
        me.CargarComponentesGrid();
        this.callParent(arguments);
    },
    CargarComponentesGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Armamentos.MatBelicos");
        
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 120, sortable: true, dataIndex: "CODIGO", align: 'center' },
            { header: "Fabricacion", width: 120, sortable: true, dataIndex: "FABRICACION", align: 'center' },
            { header: "Calibre", width: 120, sortable: true, dataIndex: "CALIBRE", align: 'center' },
            { header: "Tipo", width: 120, sortable: true, dataIndex: "TIPO", align: 'center' },
            { header: "Nombre", width: 150, sortable: true, dataIndex: "NOMBRE", align: 'center' },
            { header: "Fecha <br>Dotacion", width: 150, sortable: true, dataIndex: "FECHA_DOTACION", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Observaciones", width: 400, sortable: true, dataIndex: "OBSERVACION", align: 'center' },
            { header: "Cantidad<br>Disponible", width: 100, sortable: true, dataIndex: "CANTIDAD_DISPONIBLE", align: 'center' }
            //{ header: "Unidad", width: 70, sortable: true, dataIndex: "ESTADO" },
        ];

    }
});