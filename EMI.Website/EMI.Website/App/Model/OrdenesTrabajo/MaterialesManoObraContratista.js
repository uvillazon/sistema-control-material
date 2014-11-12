﻿Ext.define('App.Model.OrdenesTrabajo.MaterialesManoObraContratista', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_TE" },
        { type: "int", name: "ID_OT" },
        { type: "string", name: "TIPO_PROD" },
        { type: "int", name: "ID_POSTE" },
        { type: "string", name: "COD_POSTE" },
        { type: "int", name: "ID_CONDUCTOR" },
        { type: "string", name: "COD_CONDUCTOR" },
        { type: "int", name: "ID_UC" },
        { type: "string", name: "CODIGO_UC" },
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "COD_PROD" },
        { type: "string", name: "DESC_PROD" },
        { type: "string", name: "UNID_PROD" },
        { type: "float", name: "CANT_PRE" },
        { type: "float", name: "CANT_EJE" },
        { type: "int", name: "IDCUENTA" },
        { type: "string", name: "CODCUENTA" },
        { type: "string", name: "LOGIN_REG" },

    ]
});