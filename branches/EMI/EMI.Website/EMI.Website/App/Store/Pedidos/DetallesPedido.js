Ext.define('App.Store.Pedidos.DetallesPedido', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Pedidos.Pedidos',
    url: 'Pedidos/ObtenerDetallePaginados',
    sortProperty: 'ID_DETALLE'
});