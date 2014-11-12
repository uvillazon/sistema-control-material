Ext.define('App.Store.OrdenesTrabajo.PersonalMovilTrabajosEjecutados', {
    alternateClassName: 'App.store.OrdenesTrabajo.PersonalMovilTrabajosEjecutados',
    extend: 'Ext.data.Store',
    requires: 'App.Model.OrdenesTrabajo.PersonalMovilTrabajosEjecutados',
    model: 'App.Model.OrdenesTrabajo.PersonalMovilTrabajosEjecutados',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            create: Constantes.HOST + 'OrdenesTrabajo/GuardarPersonalMovilTrabajosEjecutados',
            read: Constantes.HOST + 'OrdenesTrabajo/ObtenerPersonalMovilTrabajosEjecutados',
            update: Constantes.HOST + 'OrdenesTrabajo/ActualizarPersonalMovilTrabajosEjecutados',
            destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarPersonalMovilTrabajosEjecutados'
        },
        reader: {
            type: 'json',
            root: 'Rows',
            totalProperty: 'Total'
        },
        writer: {
            type: 'json',
            allowSingle: false
        },
    }

});