Ext.define('App.Store.Vales.Vales', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Vales.Vales',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Vales/ObtenerValesPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'IDSOLICITUD',
        direction: 'ASC'
    }]
});