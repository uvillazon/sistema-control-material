Ext.define('App.Store.Armamentos.MatBelicos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Armamentos.MatBelicos',
    url: 'Armamentos/ObtenerMaterialesBelicosPaginado',
    sortProperty: 'CODIGO'
});