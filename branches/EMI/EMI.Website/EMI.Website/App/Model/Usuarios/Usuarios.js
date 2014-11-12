Ext.define('App.Model.Usuarios.Usuarios', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_USUARIO" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "NOMBRE" },
            //{ type: "string", name: "CONTRASEÑA" },
            
            { type: "date", name: "FECHA_ALTA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_CADUCIDAD", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_BLOQUEO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_PERFIL" },
            { type: "int", name: "NRO_FALLIDO" },
            { type: "string", name: "PERFIL" },
            { type: "string", name: "ESTADO" },

    ]
});