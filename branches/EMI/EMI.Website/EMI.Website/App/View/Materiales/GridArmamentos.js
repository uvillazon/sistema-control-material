Ext.define("App.View.Materiales.GridArmamentos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Armamentos Registrados',
    criterios: true,
    textBusqueda: 'Armamento',
    imprimir: false,
    width: 550,
    //height: 350,
    equipo: 'Armamento',
    initComponent: function () {
        var me = this;
        me.CargarComponentesGriArmamento();
        this.callParent(arguments);
    },
    CargarComponentesGriArmamento: function () {
        var me = this;
        me.store = Ext.create("App.Store.Armamentos.Armamentos");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Fusil", width: 120, sortable: true, dataIndex: 'NRO_FUSIL', align: 'center'},
            { header: "Codigo", width: 120, sortable: true, dataIndex: "CODIGO", align: 'center' },
            { header: "Fabricacion", width: 120, sortable: true, dataIndex: "FABRICACION", align: 'center' },
            { header: "Calibre", width: 120, sortable: true, dataIndex: "CALIBRE", align: 'center' },
            { header: "Nombre", width: 300, sortable: true, dataIndex: "NOMBRE", align: 'center' },
            { header: "Tipo", width: 120, sortable: true, dataIndex: "TIPO", align: 'center' },
            { header: "Fecha <br>Dotacion", width: 100, sortable: true, dataIndex: "FECHA_DOTACION", renderer: Ext.util.Format.dateRenderer('d/m/Y'), align: 'center' },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO", align: 'center' },
            { header: "Observaciones", width: 400, sortable: true, dataIndex: "OBSERVACION", align: 'center' },
            { header: "Unidad", width: 100, sortable: true, dataIndex: "UNIDAD", align: 'center' },
        ];

    }
});