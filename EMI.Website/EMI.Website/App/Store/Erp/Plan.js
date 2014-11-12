Ext.define('App.store.Erp.Plan', {
    extend: 'Ext.data.Store',
    requires: 'App.Model.Erp.Plan',
    model: 'App.Model.Erp.Plan',
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'ObrasErp/ObtenerPlan',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});