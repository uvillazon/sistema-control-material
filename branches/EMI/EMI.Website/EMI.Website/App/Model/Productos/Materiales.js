﻿Ext.define('App.Model.Productos.Materiales', {
    extend: 'Ext.data.Model',
    fields: [
       { type: "int", name: "IDPRODUCTO" },
       { type: "int", name: "IDSTATUS" },
        { type: "string", name: "CSSSTATUS", convert: Funciones.MaterialesCSS },
        { type: "string", name: "COD_ALTERNATIVO" },
        { type: "string", name: "DESCRIPCION" },
        { type: "string", name: "DESC_CORTA" },
        { type: "string", name: "IDUNIDAD" },
        { type: "float", name: "COSTO" },
        { type: "float", name: "PRECIO_BASE" },
        { type: "string", name: "UBICACION" },
        { type: "float", name: "IDMONEDA" },
        { type: "float", name: "IDCUENTA_AF" },
        { type: "string", name: "IDTIPO_ACTIV_AF" },
        { type: "float", name: "CANT_PRE" },
        { type: "float", name: "CANTIDAD_MAT_UC" },
        { type: "string", name: "TIPO" },
        
       
    ]
});