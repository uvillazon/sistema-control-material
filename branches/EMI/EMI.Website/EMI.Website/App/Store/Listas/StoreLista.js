Ext.define('App.Store.Listas.StoreLista', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Listas.StoreLista',
    remoteSort: false,
    autoLoad: true,
    pageSize : 75,
    proxy: {
         type: 'jsonp',
         url: Constantes.HOST + 'Listas/ObtenerListasItem',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
         property: 'CODIGO',
            direction: 'ASC'
        }]
});