Ext.define('App.Store.Pedidos.Pedidos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Pedidos.Pedidos',
    url: 'Pedidos/ObtenerPedidosPaginados',
    sortProperty: 'NRO_PEDIDO'
});