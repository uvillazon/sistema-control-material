Ext.define('App.Model.Kardex.KardexMuniciones', {
    extend: 'Ext.data.Model',
    fields: [

        { type: "string", name: "CODIGO" },
        { type: "string", name: "CATEGORIA" },
        { type: "float", name: "SALIDA" },
        { type: "float", name: "ENTRADA" },
        { type: "float", name: "SALDO" },
        { type: "string", name: "LOGIN" },
        { type: "string", name: "OPERACION" },
        { type: "int", name: "ID_MOV" },
        { type: "int", name: "ID_MAT_BELICO" },
         { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },

    ]
});
