Ext.define('App.Store.Unidades.Unidades', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Unidades.Unidades',
    url: 'Unidades/ObtenerUnidadesPaginados',
    sortProperty: 'UNIDAD'
});