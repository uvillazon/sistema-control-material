Ext.define('App.Model.Responsables.Responsabilidades', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_RESPDAD" },
            { type: "string", name: "DESCRIPCION" },
            { type: "string", name: "RESPONSABILIDAD" },
            { type: "string", name: "ESTADO" }
    ],
    
});