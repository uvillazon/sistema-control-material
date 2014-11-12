Ext.define("App.View.Historicos.GridHistoricosMatLog", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    title: 'Historicos de Verificacion de Horas Mat. Logisticos',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        me.CargarGrid();

        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Historicos.HistoricosMatLog");
        //me.selType = 'cellmodel';

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Fecha", width: 70, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Nuevo", width: 70, sortable: true, dataIndex: "HORA_ACTUAL" },
            { header: "Hora Anterior", width: 70, sortable: true, dataIndex: "HORA_ANTERIOR"},
            { header: "Observacion", width: 150, sortable: true, dataIndex: 'OBSERVACION', align: 'center' },
            { header: "Nro Serie", width: 80, sortable: true, dataIndex: 'NRO_SERIE', align: 'center' },
            { header: "Codigo", width: 90, sortable: true, dataIndex: "CODIGO", align: 'center' },
            { header: "Fabricante", width: 90, sortable: true, dataIndex: "FABRICANTE", align: 'center' },
            { header: "Tipo <br> Componente", width: 90, sortable: true, dataIndex: "TIPO_COMPONENTE", align: 'center' },
            { header: "Aeronave", width: 90, sortable: true, dataIndex: "AERONAVE", align: 'center' },
            { header: "Grupo", width: 100, sortable: true, dataIndex: "GRUPO", align: 'center' },
            { header: "Responsable <br>Operacion", width: 70, sortable: false, dataIndex: "RESPONSABLE", align: 'center' },


        ];
    }
});