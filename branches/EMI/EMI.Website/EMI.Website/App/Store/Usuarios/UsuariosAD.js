Ext.define('App.Store.Usuarios.UsuariosAD', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Usuarios.Usuarios',
    remoteSort: true,
    autoLoad: false,//quizas comentar
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Usuarios/ObtenerUsuariosAD',
        reader: {
            root: 'Rows',
            totalProperty: 'Total',
            messageProperty: 'msg',
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'NOMBRE',
        direction: 'DESC'
    }]
});