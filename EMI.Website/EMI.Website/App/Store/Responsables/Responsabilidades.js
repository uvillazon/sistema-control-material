Ext.define('App.Store.Responsables.Responsabilidades', {
    alternateClassName: 'App.store.Responsables.Responsabilidades',
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Responsables.Responsabilidades',
    url: 'Responsables/ObtenerResponsabilidades',
    sortProperty: 'DESCRIPCION'
});