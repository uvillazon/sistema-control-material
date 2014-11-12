Ext.define('App.Store.Armamentos.CmpArmamentos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Armamentos.CmpArmamentos',
    url: 'Armamentos/ObtenerCmpArmamentos',
    sortProperty: 'NOMBRE'
});