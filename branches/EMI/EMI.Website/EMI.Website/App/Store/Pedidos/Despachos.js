Ext.define('App.Store.Pedidos.Despachos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Pedidos.Despachos',
    url: 'Pedidos/ObtenerDespachosPaginados',
    sortProperty: 'ID_DESPACHO'
});