Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.GridRegistrosObservados', {
    extend: 'Ext.grid.Panel',
    width: 650,
    height: 350,
    title: 'Registros Observados',
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
        return Ext.create('App.store.OrdenesTrabajo.TrabajosContratistaObservados');
    },

    buildColumns: function () {
        return [
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
                     dataIndex: 'CODIGO_UC'
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