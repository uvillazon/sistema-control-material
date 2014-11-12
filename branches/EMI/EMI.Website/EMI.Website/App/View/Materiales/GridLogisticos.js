Ext.define("App.View.Materiales.GridLogisticos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Materiales Logisticos Registrados',
    criterios: true,
    textBusqueda: 'Cod Material',
    imprimir: false,
    width: 550,
    //height: 350,
    equipo: 'Materiales Logisticos',
    initComponent: function () {
        var me = this;
        me.CargarComponentesGrid();
        this.callParent(arguments);
    },
    CargarComponentesGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Logisticos.ItemMatLogisticos");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Serie", width: 100, sortable: true, dataIndex: 'NRO_SERIE', align: 'center' },
            { header: "Codigo", width: 100, sortable: true, dataIndex: "CODIGO", align: 'center' },
            { header: "Fabricante", width: 120, sortable: true, dataIndex: "FABRICANTE", align: 'center' },
            { header: "Tipo <br> Componente", width: 120, sortable: true, dataIndex: "TIPO_COMPONENTE", align: 'center' },
            { header: "Aeronave", width: 120, sortable: true, dataIndex: "AERONAVE", align: 'center' },
            { header: "Grupo", width: 100, sortable: true, dataIndex: "GRUPO", align: 'center' },
            { header: "Nro Parte", width: 120, sortable: true, dataIndex: "NRO_PARTE", align: 'center' },
            { header: "Ciclo de Vida", width: 100, sortable: true, dataIndex: "CICLO_VIDA", align: 'center' },
            { header: "Hora de Vida", width: 100, sortable: true, dataIndex: "HORA_VIDA", align: 'center' },
            { header: "Descripcion", width: 300, sortable: true, dataIndex: "DESCRIPCION", align: 'center' },
            { header: "Fecha Dotacion", width: 90, sortable: true, dataIndex: "FECHA_DOTACION", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO", align: 'center' },
            { header: "Unidad", width:  100, sortable: true, dataIndex: "UNIDAD", align: 'center' },
        ];

    }
});