Ext.define('App.Model.OrdenesTrabajo.GrupoCentroCostos', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "IDEMPLEADO" },
        { type: "int", name: "IDGRUPOCC" },
        { type: "string", name: "LOGIN" },
        { type: "string", name: "DESCRIPCION" },
    ]
});
