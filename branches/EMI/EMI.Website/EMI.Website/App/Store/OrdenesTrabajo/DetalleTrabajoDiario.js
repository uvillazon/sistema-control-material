Ext.define('App.store.OrdenesTrabajo.DetalleTrabajoDiario', {
    extend: 'Ext.data.Store',
    requires: 'App.Model.OrdenesTrabajo.DetalleTrabajoDiario',
    model: 'App.Model.OrdenesTrabajo.DetalleTrabajoDiario',
    proxy: {
        type: 'ajax',
        api: {
            create: Constantes.HOST + 'OrdenesTrabajo/GuardarDetalleTrabajoDiario',
            //read: 'Home/MaterialPresupuestado',
            update: Constantes.HOST + 'OrdenesTrabajo/ActualizarDetalleTrabajoDiario',
            destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarDetalleTrabajoDiario'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            allowSingle: false
        },

        afterRequest: function (request, success) {
            if (request.action == 'read') {
                this.readCallback(request);
            }

            else if (request.action == 'create') {
                this.createCallback(request);
            }

            else if (request.action == 'update') {
                this.updateCallback(request);
            }

            else if (request.action == 'destroy') {
                this.deleteCallback(request);
            }
        },

       //Despues de crear un registro

        createCallback: function (request) {
            result = Ext.decode(request.operation.response.responseText);
            if (!result.result) {
                Ext.Msg.show(
                                {
                                    title: 'Advertencia',
                                    msg: Ext.decode(request.operation.response.responseText).msg /*'Ha ocurrido un error al intentar guardar los datos. </br> Por favor, comunique de este error al Administrador del Sistema'*/,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            } else {
                Ext.Msg.show(
                       {
                           title: 'Felicidades!',
                           msg: Ext.decode(request.operation.response.responseText).msg,
                           buttons: Ext.Msg.OK,
                           icon: Ext.Msg.INFO
                       });
                var grid = Ext.ComponentQuery.query('#trabajodiariomain #gprincipaldetalletrabajodiario')[0];
                var view = Ext.ComponentQuery.query('#mosaicousuarios')[0];
                Ext.ComponentQuery.query('#hini')[0].setValue(request.operation.records[0].get('FCH_HOR_INI'));
                Ext.ComponentQuery.query('#hfin')[0].setValue(request.operation.records[0].get('FCH_HOR_FIN'));
                id = Ext.decode(request.operation.response.responseText).ID;
                //tree.store.load({ params: { ID_OT: cbox.getValue() } });
                grid.store.load({
                    params: {
                        //ID_OT: request.operation.records[0].get('ID_OT'),
                        ID_POSTE: request.operation.records[0].get('ID_POSTE') == 0 ? null : request.operation.records[0].get('ID_POSTE'),
                        //ID_UC: request.operation.records[0].get('ID_UC') == 0 ? null : request.operation.records[0].get('ID_UC'),
                        ID_CONDUCTOR: request.operation.records[0].get('ID_CONDUCTOR') == 0 ? null : request.operation.records[0].get('ID_CONDUCTOR'),
                        ID_TD: id
                    }
                });
                //view.store.load({ params: { ID_TD: id, FCH_HOR_INI: request.operation.records[0].get('FCH_HOR_INI') } });
            }
        },

        //Despues de Actualizar los datos del grid

        updateCallback: function (request) {
            if (!request.operation.success) {
                Ext.Msg.show(
                                {
                                    title: 'Warning',
                                    msg: 'Could not update Album. Please try again.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            }
        },
    }

});