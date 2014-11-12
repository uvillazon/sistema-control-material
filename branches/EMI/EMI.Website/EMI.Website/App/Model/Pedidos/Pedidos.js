Ext.define('App.Model.Pedidos.Pedidos', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_PEDIDO" },
        { type: "int", name: "ID_DETALLE" },
        { type: "int", name: "ID_MAT_LOGISTICO" },
        { type: "int", name: "ID_MAT_BELICO" },
        { type: "int", name: "NRO_PEDIDO" },
        { type: "string", name: "TIPO" },
         { type: "string", name: "UNIDAD" },
        { type: "date", name: "FECHA_PEDIDO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_MODIF", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "string", name: "OBSERVACIONES" },
        { type: "string", name: "ESTADO" },
        { type: "string", name: "ESTADO_DETALLE" },
        { type: "string", name: "ESTADO_RECEPCION" },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "DETALLE" },
        { type: "float", name: "CANTIDAD_SOLICITADA" },
        { type: "float", name: "CANTIDAD_ENTREGADA" },
        { type: "string", name: "CATEGORIA" },
         { type: "float", name: "CANTIDAD_EXISTENTE" },
        


    ]
});
