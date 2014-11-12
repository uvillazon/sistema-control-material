Ext.define('App.Model.Historicos.HistoricosEdicion', {
    extend: 'Ext.data.Model',
    fields: [
            
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "MOTIVO" },
            { type: "string", name: "TABLA" },
            { type: "string", name: "USUARIO" },
            { type: "string", name: "DETALLE" },
           
    ],

});