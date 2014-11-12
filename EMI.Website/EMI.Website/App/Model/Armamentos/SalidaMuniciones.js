Ext.define('App.Model.Armamentos.SalidaMuniciones', {
    extend: 'Ext.data.Model',
    fields: [

        { type: "int", name: "ID_MAT_BELICO" },
        { type: "int", name: "ID_MUNICION_UNIDAD" },
        { type: "date", name: "FECHA_DOTACION", dateFormat: "d/m/Y" },
        { type: "string", name: "FABRICACION" },
        { type: "string", name: "CALIBRE" },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "TIPO" },
        { type: "int", name: "CANTIDAD_DISPONIBLE" },
        { type: "string", name: "OBSERVACION" },
        { type: "int", name: "SALIDA" },


    ]
});