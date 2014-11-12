Ext.define('App.Model.Vales.DetallesVale', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "IDPRODUCTO" },
        { type: "int", name: "ID_POSTE" },
        { type: "int", name: "ID_CONDUCTOR" },
        { type: "int", name: "ID_UC" },
        { type: "string", name: "COD_PROD" },
        { type: "string", name: "COD_PROD_VC" },
        { type: "string", name: "DESC_PROD" },
        { type: "int", name: "NROCBTE" },
        { type: "int", name: "ID_PRE_VC" },
        { type: "int", name: "NRORENGLON" },
        { type: "string", name: "UNID_PROD" },
        { type: "float", name: "CANTIDAD" },
        { type: "float", name: "CANT_VALE" },
        { type: "float", name: "CANTIDAD_CMP" },
        //{ type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        //{ type: "date", name: "FECHA_VENCE", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        //{ type: "date", name: "FECHA_RECHAZO", dateFormat: "d/m/Y", convert: Funciones.Fecha },


    ]
});
