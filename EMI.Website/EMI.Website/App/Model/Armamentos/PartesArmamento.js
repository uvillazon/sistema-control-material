Ext.define('App.Model.Armamentos.PartesArmamento', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_PARTE" },
        { type: "int", name: "ID_MAT_BELICO" },
        { type: "string", name: "NOMBRE" },
        { type: "string", name: "DESCRIPCION" },
    
        
       
    ]
});