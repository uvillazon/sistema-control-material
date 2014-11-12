Ext.define('App.Store.OrdenesTrabajo.DetallesTrabajoEjecutadoCapCon', {
    alternateClassName: 'App.store.OrdenesTrabajo.DetallesTrabajoEjecutadoCapCon',
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.DetalleTrabajoDiario',
    url: 'OrdenesTrabajo/ObtenerTrabajoDiarioDetalleCapCon',
    sortProperty: 'ID_POSTE'
});