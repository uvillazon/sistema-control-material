Ext.define('App.Store.Logisticos.ItemMatLogisticos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Logisticos.MatLogisticos',
    url: 'Logisticos/ObtenerItemMatLogisticos',
    sortProperty: 'NRO_SERIE'
});