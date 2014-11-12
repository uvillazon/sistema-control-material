Ext.define('App.Store.Kardex.KardexMuniciones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Kardex.KardexMuniciones',
    url: 'Kardex/ObtenerKardexMuniciones',
    sortProperty: 'ID_MOV'
});