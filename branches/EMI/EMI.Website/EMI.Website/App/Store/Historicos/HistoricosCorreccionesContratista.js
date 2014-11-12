Ext.define('App.store.Historicos.HistoricosCorreccionesContratista', {
    alternateClassName: 'App.Store.Historicos.HistoricosCorreccionesContratista',
    extend: 'Ext.data.Store',
    requires: 'App.Model.Historicos.HistoricosCorreccionesContratista',
    model: 'App.Model.Historicos.HistoricosCorreccionesContratista',
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'Historicos/ObtenerCorreccionesEjecutadoContratista',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});