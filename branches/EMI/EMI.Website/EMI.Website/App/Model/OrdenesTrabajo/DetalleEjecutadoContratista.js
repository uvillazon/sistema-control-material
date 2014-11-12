/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 14
* Elaborado por: P. Sergio Alvarado G.
* Model para guardar y mostrar el detalle del trabajo ejecutado por contratista
*/

Ext.define('App.Model.OrdenesTrabajo.DetalleEjecutadoContratista', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TE_DET',
    fields: [
        { type: 'int', name: 'ID_TE_DET' },
        { type: "int", name: "ID_TE" },
        { type: "int", name: "ID_OT" },
        { type: "int", name: "ID_POSTE" },
        { type: "string", name: "COD_POSTE" },
        { type: "int", name: "ID_UC" },
        { type: "string", name: "CODIGO_UC" },
        { type: "int", name: "ID_CONDUCTOR" },
        { type: "string", name: "COD_CONDUCTOR" },
        { type: "string", name: "TIPO_PROD" },
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "COD_PROD" },
        { type: "string", name: "DESC_PROD" },
        { type: "string", name: "UNID_PROD" },
        { type: "float", name: "COSTO_UNIT" },
        { type: "float", name: "CANT_PRE" },
        { type: "float", name: "CANT_EJE" },
        { type: "string", name: "OBSERVACION" },
        //agregando para Pago a Contratista Modificado UVV
        { type: "string", name: "CODIGO" }, //se mostrara el codigo de poste o conductor que corresponda
        { type: "float", name: "TOTAL" }, //TOTAL = COSTO_UNIT * CANT_EJE paar el pago a contratista
        { type: "string", name: "FORMACION_CND" }
        
    ],

    validations: [
        /*{ type: 'presence', field: 'NIVEL', message: 'Introduzca el NIVEL de la estructura' }*/
    ]
});