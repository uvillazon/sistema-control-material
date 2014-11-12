Ext.define('App.Store.Armamentos.PartesArmamento', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Armamentos.PartesArmamento',
    url: 'Armamentos/ObtenerPartesArmamento',
    sortProperty: 'NOMBRE'
});