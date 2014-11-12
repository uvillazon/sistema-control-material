Ext.define('App.Store.Productos.MaterialesManoObra', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Postes.Materiales',
    remoteSort: true,

    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'Materiales/ObtenerMaterialesManoObraTodos',
        reader: {
            type: 'json',
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true,
        sorters: [{
            property: 'COD_ALTERNATIVO',
            direction: 'ASC'
        }]
    }
});