Ext.define('App.Store.Puestos.Alimentadores', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Puestos.Alimentadores',
    remoteSort: true,
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'ElementosRed/ObtenerAlimentadoresPaginados',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'COD_ALIMENTADOR',
        direction: 'ASC'
    }]
});