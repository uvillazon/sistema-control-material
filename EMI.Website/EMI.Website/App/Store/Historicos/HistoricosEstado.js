Ext.define('App.Store.Historicos.HistoricosEstado', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Historicos.HistoricosEstado',
    url: 'Historicos/ObtenerHistoricosEstados',
    sortProperty: 'FECHA_REG'
});