Ext.define('App.store.Erp.Clientes', {
    extend: 'Ext.data.Store',
    requires: 'App.Model.Erp.Clientes',
    model: 'App.Model.Erp.Clientes',
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'ObrasErp/ObtenerClientesErpPaginado',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});