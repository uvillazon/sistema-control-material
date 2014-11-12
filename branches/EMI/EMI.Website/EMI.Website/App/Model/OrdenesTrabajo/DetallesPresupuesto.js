Ext.define('App.Model.OrdenesTrabajo.DetallesPresupuesto', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_PRE" },
        { type: "int", name: "ID_OT" },
        { type: "string", name: "TIPO_PROD" },
        { type: "int", name: "ID_POSTE" },
        { type: "string", name: "COD_POSTE" },
        { type: "string", name: "CODIGO" },
        { type: "int", name: "ID_CONDUCTOR" },
        { type: "string", name: "COD_CONDUCTOR" },
        { type: "int", name: "ID_UC" },
        { type: "string", name: "CODIGO_UC" },
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "COD_PROD" },
        { type: "string", name: "DESC_PROD" },
        { type: "string", name: "UNID_PROD" },
        { type: "float", name: "CANT_PRE" },
        //copia de la cantidad presupuestada a una variable CANT_VALE solo para el caso de Presupuesto por VALE
        { type: "float", name: "CANT_VALE", defaultValue: 'CANT_PRE', convert: Funciones.CopiarRecordmodelo },
        { type: "float", name: "CANT_EJE" },
        { type: "float", name: "COSTO_UNIT" },
        { type: "int", name: "IDCUENTA" },
        { type: "int", name: "IDVALE" },
        { type: "int", name: "NROCBTE" },
        { type: "int", name: "IDDEPOSITO" },
        { type: "string", name: "CODCUENTA" },
        { type: "string", name: "TIPO_VALE" },
        { type: "string", name: "LOGIN_REG" },
        { type: "string", name: "COD_CAMBIO" }, 
        { type: "int", name: "CAN_IDVALE" }
        
    ]
});