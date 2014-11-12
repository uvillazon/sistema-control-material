Ext.define('App.Model.Historicos.HistoricosMatLog', {
    extend: 'Ext.data.Model',
    fields: [
            
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "CODIGO" },
            { type: "string", name: "NRO_SERIE" },
            { type: "string", name: "FABRICANTE" },
            { type: "string", name: "TIPO_COMPONENTE" },
            { type: "string", name: "AERONAVE" },
            { type: "string", name: "GRUPO" },
            { type: "string", name: "HORA_ANTERIOR" },
            { type: "string", name: "HORA_ACTUAL" },
            { type: "string", name: "RESPONSABLE" },
            { type: "string", name: "OBSERVACION" }
           
    ],

});