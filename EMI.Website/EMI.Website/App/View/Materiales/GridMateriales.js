Ext.define("App.View.Materiales.GridMateriales", {
    extend: "App.Config.Abstract.Grid",
    title: 'Materiales Registrados',
    criterios: true,
    textBusqueda: 'Cod Material',
    imprimir: false,
    width: 550,
    //height: 350,
    equipo: 'Materiales',
    initComponent: function () {
        var me = this;
        me.CargarComponentesGridMateriales();
        this.callParent(arguments);
    },
    CargarComponentesGridMateriales: function () {
        var me = this;
        me.store = Ext.create("App.Store.Materiales.Materiales");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Material", width: 155, sortable: true, dataIndex: 'CODIGO_MATERIAL', align: 'center' },
            { header: "Calibre", width: 150, sortable: true, dataIndex: "CALIBRE", align: 'center' },
            { header: "Fabricacion", width: 150, sortable: true, dataIndex: "FABRICACION", align: 'center' },
            { header: "Fecha <br>Dotacion", width: 150, sortable: true, dataIndex: "FECHA_DOTACION", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO", align: 'center' },
        ];

    }
});