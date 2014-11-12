Ext.define('App.store.OrdenesTrabajo.DetalleTrabajosEjecutados', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.DetalleTrabajosEjecutados',
    proxy: {
        type: 'ajax',
        api: {
            create: Constantes.HOST + 'OrdenesTrabajo/GuardarDetalleTrabajosEjecutados',
            read: Constantes.HOST + 'OrdenesTrabajo/ObtenerDetalleTrabajosEjecutadosPaginado',
            update: Constantes.HOST + 'OrdenesTrabajo/ActualizarDetalleTrabajosEjecutados',
            destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarDetalleTrabajosEjecutados'
        },
        reader: {
            type: 'json',
            root: 'Rows',
            totalProperty: 'Total'
        },
        writer: {
            type: 'json',
            allowSingle: false
        },

        afterRequest: function (request, success) {

            if (request.action == 'read') {
                //this.readCallback(request);
            }

            if (request.action == 'create') {
                console.dir('hasta aca, bien');
                this.createCallback(request);
            }

            if (request.action == 'update') {
                this.updateCallback(request);
            }

            if (request.action == 'destroy') {
                this.deleteCallback(request);
            }
        },

        createCallback: function (request) {
            console.dir(request);
            if (request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Felicitaciones!',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
            } else {
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: Ext.decode(request.operation.response.responseText).msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            }
        },
    }
});