Ext.define("App.View.Usuarios.GridUsuarios", {
    extend: "App.Config.Abstract.Grid",
    title: 'Usuarios',
    imprimir: false,
    criterios: true,
    opcion: '',
    paramsStore: null,
    noLimpiar: null,
    //parametros obligados para mostrar reporte de historico de estados por tabla
    initComponent: function () {
        var me = this;

        me.store = Ext.create("App.Store.Usuarios.Usuarios");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "", width: 40, sortable: false, dataIndex: 'NRO_FALLIDO', renderer: me.renderUsr },
            { header: "Login", width: 90, sortable: true, dataIndex: "LOGIN" },
            { header: "Nombre", width: 200, sortable: true, dataIndex: "NOMBRE" },
            //{ header: "Email", width: 150, sortable: true, dataIndex: "EMAIL" },
            { header: "Fecha Alta", width: 90, sortable: true, dataIndex: "FECHA_ALTA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha Baja", width: 90, sortable: true, dataIndex: "FECHA_CADUCIDAD", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Perfil", width: 150, sortable: true, dataIndex: "PERFIL" },
            { header: "Estado", width: 90, sortable: true, dataIndex: "ESTADO" },
            { header: "Fecha Bloqueo", width: 90, sortable: true, dataIndex: "FECHA_BLOQUEO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        ];

        this.callParent(arguments);

    },

    renderUsr: function (val, metaData, record) {
        //alert(record.data.NRO_FALLIDO)
        if (record.data.NRO_FALLIDO >= 3) {

            return '<img data-qtip="Cuenta Bloqueada", src="' + Constantes.HOST + 'Content/Iconos/lock.png" />';
        }
       
        else {
            return '';
        }

    },
});

