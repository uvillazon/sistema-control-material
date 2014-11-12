Ext.define('App.store.OrdenesTrabajo.TrabajosContratistaObservados', {
    extend: 'Ext.data.Store',
    requires: 'App.Model.OrdenesTrabajo.DetalleEjecutadoContratista',
    model: 'App.Model.OrdenesTrabajo.DetalleEjecutadoContratista',
    proxy: {
        type: 'ajax',
        api: {
            read: Constantes.HOST + 'OrdenesTrabajo/MostrarObservados',
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});