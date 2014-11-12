Ext.define('App.Model.Armamentos.MatBelicos', {
    extend: 'Ext.data.Model',
    fields: [
       
        { type: "int", name: "ID_MAT_BELICO" },
         { type: "int", name: "ID_MUNICION_UNIDAD" },
        { type: "date", name: "FECHA_DOTACION", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        //{ type: "date", name: "FECHA_MODIFICACION", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "string", name: "FABRICACION" },
        { type: "string", name: "CALIBRE" },
         { type: "string", name: "CATEGORIA" },
        { type: "string", name: "NOMBRE" },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "TIPO" },
        { type: "string", name: "UNIDAD" },
        { type: "int", name: "CANTIDAD_DISPONIBLE" },
      { type: "string", name: "OBSERVACION" },
        
       
    ]
});