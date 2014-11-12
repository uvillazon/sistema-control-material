Ext.define('App.Store.OrdenesTrabajo.DetalleIntervencionPoste', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.OrdenesTrabajo',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'OrdenesTrabajo/DetalleIntervencionPostes',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_POSTE',
        direction: 'ASC'
    }]
});