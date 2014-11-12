Ext.define('App.Store.Materiales.Materiales', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Materiales.Materiales',
    url: 'Materiales/ObtenerMaterialesPaginado',
    sortProperty: 'CODIGO_MATERIAL'
});