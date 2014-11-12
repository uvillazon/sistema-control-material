Ext.define('App.Store.Historicos.HistoricosCmp', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Historicos.HistoricosCmp',
    url: 'Kardex/ObtenerHistoricosCmpArmamentoPaginados',
    sortProperty: 'FECHA'
});