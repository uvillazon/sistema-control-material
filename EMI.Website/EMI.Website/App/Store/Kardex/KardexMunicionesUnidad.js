Ext.define('App.Store.Kardex.KardexMunicionesUnidad', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Kardex.KardexMunicionesUnidad',
    url: 'Kardex/ObtenerKardexMunicionesUnidad',
    sortProperty: 'ID_MOV'
});