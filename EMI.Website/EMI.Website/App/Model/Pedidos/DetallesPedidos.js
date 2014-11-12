Ext.define('App.Model.Pedidos.DetallesPedidos', {
    extend: 'Ext.data.Model',
    fields: [

        { type: "string", name: "CODIGO" },
        { type: "string", name: "CATEGORIA" },
        { type: "float", name: "CANTIDAD_SOLICITADA" },
        { type: "int", name: "ID_MAT_BELICO" },
        { type: "int", name: "ID_MAT_LOGISTICO" },


    ]
});
