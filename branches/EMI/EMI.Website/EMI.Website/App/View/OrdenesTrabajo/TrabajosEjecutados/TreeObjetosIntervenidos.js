/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 13
* Elaborado por: P. Sergio Alvarado G.
* Tree panel para mostrar los los postes intervenidos en la Orden de Trabajo
*/
Ext.define('App.View.OrdenesTrabajo.TrabajosEjecutados.TreeObjetosIntervenidos', {
    alternateClassName: 'App.view.OrdenesTrabajo.TrabajosEjecutados.TreeObjetosIntervenidos',
    extend: 'Ext.tree.Panel',
    alias: 'widget.menuobjetosintervenidos',
    store: 'OrdenesTrabajo.ElementosIntervenidos',
    //title: 'Postes/Conductores',
    rootVisible: true,
    initComponent: function () {
        var me = this;
        me.tbar = me.construirToolbar();
        me.callParent();
    },

    construirToolbar: function () {
        return [{ text: '<b>Postes/Conductores</b>' },
           { xtype: 'tbfill' },
           {
               text: '',
               iconCls: 'icon-add',
               action: 'addElementoIntervenido'
           },
           {
               text: '',
               iconCls: 'icon-delete',
               action: 'deleteElementoIntervenido',
               //handler: this.eliminarObjeto,
               //scope: this
           }]
    },
    viewConfig: { 
        plugins:{
            ptype:'treeviewdragdrop' 
        }
    },

    addNodo: function () {
        var me = this;
        var window = Ext.widget('window');
        window.show();
    },

    eliminarObjeto: function (btn) {
        var me = this;
        var tree = me;
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            switch (node.get('elemento')) {
                case 'POSTE':
                    if (!node.isLeaf()) {
                        var mensaje = 'El objeto que desea eliminar es un ' + node.get('elemento') + '. Se <b>eliminaran</b> todos </br>sus objetos hijos. Esta usted seguro de eliminar el ' + node.get('elemento') + ': <b>' + node.get('text') + '</b>?';
                        var controller = 'OrdenesTrabajo/EliminarPosteOtPostesIntervenidos';
                        var params = { ID_OT: node.get('ID_OT'), ID_POSTE: node.get('ID_POSTE'), COD_POSTE: node.get('text') };
                        me.eliminarObjetoStoreServidor(mensaje, controller, params, node);
                    }
                    break;
                case 'CONDUCTOR':
                    if (node.isLeaf()) {
                        var mensaje = '¿Esta usted seguro de <b>eliminar</b> el ' + node.get('elemento') + ': <b>' + node.get('text') + '</b>?';
                        var controller = 'OrdenesTrabajo/EliminarConductorPostesIntervenidos';
                        var params = { ID_OT: node.get('ID_OT'), ID_CONDUCTOR: node.get('ID_CONDUCTOR') };
                        me.eliminarObjetoStoreServidor(mensaje, controller, params, node);
                    }
                    break;
                case 'UNIDAD CONSTRUCTIVA':
                    if (node.isLeaf()) {
                        var mensaje = '¿Esta usted seguro de <b>eliminar</b> la ' + node.get('elemento') + ': <b>' + node.get('text') + '</b>?';
                        var controller = 'OrdenesTrabajo/EliminarUnidadConstructivaPostesIntervenidos';
                        var params = { ID_OT: node.get('ID_OT'), ID_UC: node.get('ID_UC') };
                        me.eliminarObjetoStoreServidor(mensaje, controller, params, node);
                    }
                    break;
                default:
                    break;
            }
        } else {
            Ext.Msg.alert('Advertencia', 'Primero, seleccione un elemento del Menu');
        }
    },

    eliminarObjetoStoreServidor: function (mensaje, controller, params, node) {
        var me = this;
        Ext.Msg.confirm('Advertencia', mensaje, function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: Constantes.HOST + controller,
                    params: params,
                    success: function (response, options) {
                        result = Ext.decode(response.responseText);
                        if (result.success) {
                            Ext.MessageBox.show({
                                title: 'Eliminacion Correcta',
                                msg: result.msg,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                            node.remove(true);
                        }
                    },
                });
            }
        });
    }
});