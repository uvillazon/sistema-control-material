Ext.define('App.Model.Historicos.HistoricosCmp', {
    extend: 'Ext.data.Model',
    fields: [
            
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "CODIGO" },
            { type: "string", name: "NRO_SERIE_OPERABLE" },
            { type: "string", name: "NRO_SERIE_NO_OPERABLE" },
            { type: "string", name: "CMP_ALTA" },
            { type: "string", name: "CMP_BAJA" },
            { type: "string", name: "USR" }
           
    ],

});