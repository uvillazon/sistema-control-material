Ext.define('App.Model.OrdenesTrabajo.PersonalMovilTrabajosEjecutados', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_PERMOV',
    fields: [
            { type: "int", name: "ID_PERMOV" },
            { type: "int", name: "ID_TD" },
            { type: "int", name: "ID_OT" },
            { type: "int", name: "ID_RESP" },
            { type: "int", name: "ID_MOVIL" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "APELLIDO" },
            { type: "string", name: "UNIDAD" },
            { type: "string", name: "AREA" },
            { type: "boolean", name: "active" },
            { name: 'FCH_HOR_INI', type: 'date'/*, dateFormat: "d/m/Y", convert: Funciones.Fecha*/ },
            { name: 'FCH_HOR_FIN', type: 'date'/*, dateFormat: "d/m/Y", convert: Funciones.Fecha*/ },
    ],

});