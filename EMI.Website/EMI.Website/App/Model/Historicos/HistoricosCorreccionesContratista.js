Ext.define('App.Model.Historicos.HistoricosCorreccionesContratista', {
    extend: 'Ext.data.Model',
    //idProperty: 'ID_TE_DET',
    fields: [
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y g:i A", convert: Funciones.Fecha },
        { type: "int", name: "ID_TE" },
        { type: "int", name: "ID_OT" },
        { type: 'string', name: 'INCR_EMER' },
        { type: "string", name: "INCR_TERR" },
         { type: "string", name: "DISTANCIA" },
        { type: 'int', name: 'ID_TE_DET' },
        { type: "int", name: "ID_POSTE" },
        { type: "string", name: "COD_POSTE" },
        { type: "int", name: "ID_UC" },
        { type: "string", name: "COD_UC" },
        { type: "int", name: "ID_CONDUCTOR" },
        { type: "string", name: "COD_CONDUCTOR" },
        { type: "string", name: "TIPO_PROD" },
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "COD_PROD" },
        { type: "string", name: "DESC_PROD" },
        { type: "string", name: "UNID_PROD" },
        { type: "float", name: "COSTO_UNIT" },
        { type: "float", name: "CANT_PRE" },
        { type: "string", name: "CANT_EJE" },
        { type: "string", name: "OBSERVACION" },
        { type: "string", name: "FORMACION_CND" }
    ],

    validations: [
        /*{ type: 'presence', field: 'NIVEL', message: 'Introduzca el NIVEL de la estructura' }*/
    ]
});