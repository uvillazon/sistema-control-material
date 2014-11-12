Ext.define('App.Store.Usuarios.Perfiles', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Usuarios.Usuarios',
    remoteSort: true,
    autoLoad: false,//quizas comentar
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Usuarios/ObtenerPerfilesPaginados',
        reader: {
            root: 'Rows',
            totalProperty: 'Total',
            messageProperty: 'msg',
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'PERFIL',
        direction: 'DESC'
    }]
});