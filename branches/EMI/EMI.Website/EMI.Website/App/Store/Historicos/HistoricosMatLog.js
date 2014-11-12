Ext.define('App.Store.Historicos.HistoricosMatLog', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Historicos.HistoricosMatLog',
    url: 'Kardex/ObtenerHistoricoVerificacionMatLogisticoPaginados',
    sortProperty: 'FECHA'
});