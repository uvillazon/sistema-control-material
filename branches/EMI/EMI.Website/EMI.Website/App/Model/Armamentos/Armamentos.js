Ext.define('App.Model.Armamentos.Armamentos', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_ITEM" },
        { type: "int", name: "ID_MAT_BELICO" },
        //{ type: "int", name: "ID_ITEM_ARMAMENTO" },
        { type: "string", name: "UNIDAD" },
         { type: "string", name: "NRO_FUSIL" },
        { type: "date", name: "FECHA_DOTACION", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        //{ type: "date", name: "FECHA_MODIFICACION", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "string", name: "FABRICACION" },
        { type: "string", name: "CALIBRE" },
        { type: "string", name: "NOMBRE" },
        { type: "string", name: "ESTADO" },
        { type: "string", name: "ESTADO1", defaultValue: 'ESTADO', convert: Funciones.CopiarRecordmodelo },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "TIPO" },
        { type: "int", name: "CANTIDAD_DISPONIBLE" },
      { type: "string", name: "OBSERVACION" },
        
       
    ]
});