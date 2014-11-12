Ext.define('App.view.Historicos.GridCorreccionesTrabajoContratista', {
        extend: 'Ext.grid.Panel',
        layout: 'fit',
        iconCls: null,
        initComponent: function () {
            var me = this;
            me.createModel();
            me.columns = me.buildColumns();
            me.store = me.buildStore();
            this.callParent(arguments);
        },
        createModel: function () {
        },

        buildStore: function () {
            return Ext.create('App.store.Historicos.HistoricosCorreccionesContratista');
        },

        buildColumns: function () {
            return [
                {
                    text: "<b>FECHA CORRECCION</b>",
                    width: 120,
                    sortable: true,
                    dataIndex: "FECHA_REG",
                    renderer: Ext.util.Format.dateRenderer('d/m/Y  H:i:s')
                },
                {
                    text: '<b>INCR. EMERG.</b>',
                    width: 100,
                    flex: 1,
                    dataIndex: 'INCR_EMER'
                },
                {
                    text: '<b>INCR. TERRENO</b>',
                    width: 150,
                    flex: 1,
                    dataIndex: 'INCR_TERR'
                },
                 {
                     text: '<b>DISTANCIA</b>',
                     width: 150,
                     flex: 1,
                     dataIndex: 'DISTANCIA'
                 },
                 {
                     text: '<b>COD. POSTE</b>',
                     width: 150,
                     flex: 1,
                     dataIndex: 'COD_POSTE'
                 },
                 {
                    text: '<b>COD. UC</b>',
                    width: 150,
                    flex: 1,
                    dataIndex: 'COD_UC'
                },
                {
                    text: '<b>CONDUCTOR</b>',
                    width: 150,
                    flex: 1,
                    dataIndex: 'COD_CONDUCTOR'
                },
                {
                    text: '<b>PRODUCTO</b>',
                    width: 150,
                    flex: 1,
                    dataIndex: 'COD_PROD'
                },
                 {
                     text: '<b>DESCRIPCION</b>',
                     width: 500,
                     flex: 1,
                     dataIndex: 'DESC_PROD'
                 },
                {
                    text: '<b>UNIDAD</b>',
                    width: 100,
                    align: 'center',
                    flex: 1,
                    dataIndex: 'UNID_PROD'
                },
                {
                      text: '<b>CANT. EJEC.</b>',
                      width: 100,
                      align: 'center',
                      flex: 1,
                      dataIndex: 'CANT_EJE',
                  },
                  {
                      text: '<b>OBSERV.</b>',
                      width: 100,
                      flex: 1,
                      dataIndex: 'OBSERVACION',
                  }
            ]
        },
    });