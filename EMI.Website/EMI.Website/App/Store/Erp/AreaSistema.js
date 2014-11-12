Ext.define('App.store.Erp.AreaSistema', {
    extend: 'Ext.data.Store',
    requires: 'App.Model.Erp.AreaSistema',
    model: 'App.Model.Erp.AreaSistema',
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'ObrasErp/ObtenerAreaSistemaErpPaginado',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'AREA',
        direction: 'ASC'
    }]
});