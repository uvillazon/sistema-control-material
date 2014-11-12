Ext.define('App.Model.Materiales.Materiales', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_MATERIAL" },
        { type: "date", name: "FECHA_DOTACION", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_MODIFICACION", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "string", name: "ARMAMENTO" },
        { type: "string", name: "CALIBRE" },
        { type: "string", name: "CODIGO_MATERIAL" },
        { type: "string", name: "ESTADO" },
        { type: "string", name: "FABRICACION" }
      
        
       
    ]
});