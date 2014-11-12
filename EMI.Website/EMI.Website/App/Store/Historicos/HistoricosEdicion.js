Ext.define('App.Store.Historicos.HistoricosEdicion', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Historicos.HistoricosEdicion',
    url: 'Bitacoras/ObtenerBitacoras',
    sortProperty: 'FECHA'
});