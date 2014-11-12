Ext.define('App.Model.Pedidos.DetallesDespacho', {
    extend: 'Ext.data.Model',
    fields: [

        { type: "string", name: "CODIGO" },
        { type: "string", name: "NRO_FUSIL" },
        { type: "string", name: "TIPO_COMPONENTE" },
        { type: "string", name: "GRUPO" },
        { type: "string", name: "ESTADO" },
        { type: "int", name: "ID_ITEM_ARMAMENTO", useNull: true },
        { type: "int", name: "ID_DETALLE" },
        { type: "int", name: "ID_ITEM_LOGISTICO", useNull: true },
        { type: "float", name: "CANTIDAD_ENTREGADA" }


    ]
});
