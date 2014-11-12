Ext.define('App.Store.OrdenesTrabajo.CentroCostos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.CentroCostos',
    url: 'CentroCostos/ObtenerCentroCostos',
    sortProperty: 'IDCENTRO_COSTO'
});