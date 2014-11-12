Ext.define('App.Store.Armamentos.Armamentos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Armamentos.Armamentos',
    url: 'Armamentos/ObtenerMaterialesPaginado',
    sortProperty: 'CODIGO'
});