Ext.define('App.Model.Kardex.KardexMunicionesUnidad', {
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
        { type: "int", name: "ID_MUNICION_UNIDAD" },
         { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },

    ]
});
