Ext.define('App.Model.OrdenesTrabajo.CabeceraTrabajosEjecutados', {
    extend: 'Ext.data.Model',
    fields: [
        { type: 'int', name: 'ID_TE' },
        { type: 'int', name: 'ID_OT' },
        { type: 'int', name: 'OT_ORIGEN' },
        { type: 'int', name: 'ID_SOL_MAN' },
        { type: 'int', name: 'ID_RESPONSABLE' },
        { type: 'string', name: 'CAPATAZ' },
        { type: 'int', name: 'ID_MOVIL' },
        { type: 'string', name: 'MOVIL' },
        { type: 'string', name: 'DESC_PROBL' },
        { type: 'date', name: 'FECHA_EJE_INI' },
        { type: 'date', name: 'FECHA_EJE_FIN' },
        { type: 'string', name: 'ESTADO' },
        { type: 'string', name: 'OBSERVACION' }
    ]
});