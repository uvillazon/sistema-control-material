Ext.define('App.Store.OrdenesTrabajo.OrdenesTrabajoContratista', {
    alternateClassName: 'App.store.OrdenesTrabajo.OrdenesTrabajo',
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.OrdenesTrabajo',
    url: 'OrdenesTrabajo/ObtenerOrdenesTrabajoContratistaPaginado',
    sortProperty: 'ID_OT'
});