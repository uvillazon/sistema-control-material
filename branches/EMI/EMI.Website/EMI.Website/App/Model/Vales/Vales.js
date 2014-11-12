Ext.define('App.Model.Vales.Vales', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "IDSOLICITUD" },
        { type: "int", name: "NROCBTE" },
        { type: "string", name: "CLASIFICACION" },
        { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha }
    ]
});