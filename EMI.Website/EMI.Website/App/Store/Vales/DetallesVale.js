Ext.define('App.Store.Vales.DetallesVale', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Vales.DetallesVale',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Vales/ObtenerDetallesValePaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'COD_PROD', /*Observacion nro. 10 del correo enviado por Ubaldo el 30-01-2014*/
        direction: 'ASC'
    }]
});