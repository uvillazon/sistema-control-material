Ext.define('App.Store.OrdenesTrabajo.GrupoCentroCostos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.GrupoCentroCostos',
    url: 'CentroCostos/ObtenerGrupoCentroCostos',
    sortProperty: 'IDGRUPOCC'
});