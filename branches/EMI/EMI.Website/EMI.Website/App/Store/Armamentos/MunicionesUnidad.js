Ext.define('App.Store.Armamentos.MunicionesUnidad', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Armamentos.MatBelicos',
    url: 'Armamentos/ObtenerMunicionesPorUnidadPaginado',
    sortProperty: 'CODIGO'
});