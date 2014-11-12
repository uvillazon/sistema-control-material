Ext.define('App.Store.OrdenesTrabajo.DetallesSubPlanilla', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.DetallesSubPlanilla',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerSubDetallePlanillaPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_DET_MNT',
        direction: 'ASC'
    }]
});