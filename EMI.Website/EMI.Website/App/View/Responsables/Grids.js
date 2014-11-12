Ext.define("App.View.Responsables.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    requires: ['App.Config.ux.Printer'],
    loadMask: true,
    opcion: '',
    pieTitulo: '',
    editar: false,
    conPie: false,
    tituloImpresion: '',
    //evento del grid para mostrar las opcion de Verificar
    listenersbtn: null,
    /////
    initComponent: function () {

        var me = this;
        if (me.opcion == "GridResponsabilidades") {
            me.title = "Responsabilidades";
            me.pieTitulo = "Responsabilidades";
            me.CargarGridResponsabilidades();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarGridResponsabilidades: function () {
        var me = this;
        me.store = Ext.create('App.Store.Responsables.Responsabilidades', {
            url: 'Responsables/ObtenerResponsabilidadesPorResponsable',
        });
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Responsabilidad", width: 150, sortable: false, dataIndex: 'RESPONSABILIDAD' },
            { header: "Descripcion", width: 200, sortable: false, dataIndex: "DESCRIPCION" },
            { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" }

        ];
    }
});

