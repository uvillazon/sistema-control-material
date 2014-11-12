Ext.define('App.Model.Pedidos.Despachos', {
    extend: 'Ext.data.Model',
    fields: [

        { type: "string", name: "CODIGO" },
        { type: "string", name: "CATEGORIA" },
        { type: "float", name: "CANTIDAD_ENTREGADA" },
        { type: "string", name: "LOGIN" },
        { type: "string", name: "ESTADO" },
        { type: "int", name: "ID_DETALLE" },
        { type: "int", name: "ID_PEDIDO" },
        { type: "int", name: "ID_ITEM_ARMAMENTO" },
        { type: "int", name: "ID_ITEM_LOGISTICO" },
        { type: "int", name: "ID_DESPACHO" },
        { type: "int", name: "NRO_PEDIDO" },
         { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },

    ]
});