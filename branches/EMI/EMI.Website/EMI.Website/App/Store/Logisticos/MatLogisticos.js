Ext.define('App.Store.Logisticos.MatLogisticos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Logisticos.MatLogisticos',
    url: 'Logisticos/ObtenerMatLogisticosPaginados',
    sortProperty: 'CODIGO'
});