Ext.define("App.View.Materiales.GridMuniciones", {
    extend: "App.Config.Abstract.Grid",
    title: 'Municiones Registrados',
    criterios: true,
    textBusqueda: 'Municiones',
    imprimir: false,
    width: 550,
    //height: 350,
    equipo: 'Municiones',
    paramsStore: { CATEGORIA: "MUNICIONES" },

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
            { header: "Codigo", width: 110, sortable: true, dataIndex: "CODIGO", align: 'center' },
            { header: "Fabricacion", width: 130, sortable: true, dataIndex: "FABRICACION", align: 'center' },
            { header: "Calibre", width: 130, sortable: true, dataIndex: "CALIBRE", align: 'center' },
            { header: "Tipo", width: 130, sortable: true, dataIndex: "TIPO", align: 'center' },
            { header: "Fecha <br>Dotacion", width: 120, sortable: true, dataIndex: "FECHA_DOTACION", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Observaciones", width: 650, sortable: true, dataIndex: "OBSERVACION", align: 'center' },
            { header: "Cantidad<br>Disponible", width: 120, sortable: true, dataIndex: "CANTIDAD_DISPONIBLE", align: 'center' },
        ];

    }
});