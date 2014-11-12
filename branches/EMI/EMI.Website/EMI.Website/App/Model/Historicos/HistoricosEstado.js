Ext.define('App.Model.Historicos.HistoricosEstado', {
    extend: 'Ext.data.Model',
    fields: [
            
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "TABLA" },
            { type: "string", name: "OPERACION" },
            { type: "string", name: "EST_ORIG" },
            { type: "string", name: "EST_DEST" },
            { type: "string", name: "OBSERV" },
            { type: "string", name: "NOM_AUTORIZA" },
            { type: "string", name: "LOGIN_USR" }
           
    ],

});