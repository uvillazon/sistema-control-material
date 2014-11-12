Ext.define('App.Model.Armamentos.CmpArmamentos', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_CMP" },
        { type: "int", name: "ID_PARTE" },
        { type: "int", name: "ID_ITEM" },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "NOMBRE" },
        { type: "string", name: "ARMAMENTO" },


    ]
});