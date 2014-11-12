Ext.define("App.View.Vales.GridVales", {
    extend: "App.Config.Abstract.Grid",
    title: 'Vales Registrados',
    criterios: true,
    textBusqueda: 'Nro Vales',
    tamBusqueda : 70,
    imprimir: true,
    width: 550,
    height: 350,
    equipo: 'Vales',
    win: null,
    formulario: null,
    imagenes: true,
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridVales") {
            me.CargarComponentesGridVales();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarComponentesGridVales: function () {
        var me = this;
        me.store = Ext.create("App.Store.Vales.Vales");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 40, sortable: false },
            { header: "Nro Vale", width: 100, sortable: true, dataIndex: "IDSOLICITUD" },
            { header: "Nro <br>Comprobante", width: 100, sortable: true, dataIndex: "NROCBTE" },
            { header: "Fecha", width: 150, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Clasificacion", width: 150, sortable: true, dataIndex: "CLASIFICACION" },
        ];

    }
});