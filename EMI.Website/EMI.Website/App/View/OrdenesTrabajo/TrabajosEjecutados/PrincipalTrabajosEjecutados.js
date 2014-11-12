/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 13
* Elaborado por: P. Sergio Alvarado G.
* Contenedor Principal para: FormCabecera, GridDetalleTrabajoDiario, TreePostes, FormPersonalMovil
*/

Ext.define('App.View.OrdenesTrabajo.TrabajosEjecutados.PrincipalTrabajosEjecutados', {
    alternateClassName: 'App.view.OrdenesTrabajo.TrabajosEjecutados.PrincipalTrabajosEjecutados',
    extend: 'Ext.container.Container',
    alias: 'widget.principaltrabajosejecutados',
    requires: [
        'Ext.layout.container.Border',
        'Ext.resizer.BorderSplitterTracker',
        'App.view.OrdenesTrabajo.TrabajosEjecutados.FormCabecera',
        'App.view.OrdenesTrabajo.TrabajosEjecutados.TreeObjetosIntervenidos',
        'App.view.OrdenesTrabajo.TrabajosEjecutados.GridDetalleTrabajoEjecutado',
        'App.view.OrdenesTrabajo.TrabajosEjecutados.ViewPersonalMovilTrabajoEjecutado'
    ],

    layout: 'border',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'cabeceratrabajosejecutados',
            region: 'north'
        }, {
            xtype: 'panel',
            title: 'Personal del Movil',
            width: 225,
            autoScroll: true,
            items: [{ xtype: 'personalmoviltrabajosejecutados' }],
            region: 'east',
            collapsible: true
        }, {
            xtype: 'menuobjetosintervenidos',
            width: 180,
            region: 'west',
            split: true,
            collapsible: false
        }, {
            xtype: 'griddetalletrabajosejecutados',
            region: 'center',
        }];

        me.callParent();
    }
});