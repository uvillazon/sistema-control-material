/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 14
* Elaborado por: P. Sergio Alvarado G.
* Contenedor Principal para: FormCabecera, GridDetalleTrabajoDiario, TreePostes, FormPersonalMovil
*/

Ext.define('App.View.OrdenesTrabajo.EjecutadoContratista.PrincipalEjecutadoContratista', {
    alternateClassName: 'App.view.OrdenesTrabajo.EjecutadoContratista.PrincipalEjecutadoContratista',
    extend: 'Ext.container.Container',
    alias: 'widget.ejecutadocontratistaprincipal',
    requires: [
        'Ext.layout.container.Border',
        'Ext.resizer.BorderSplitterTracker',
    ],

    layout: 'border',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'panel',
            layout: 'fit',
            title: 'Opciones de Busqueda',
            width: 300,
            autoScroll: true,
            items: [{ xtype: 'formotcontratista' }],
            collapsible: true,
            region: 'west'
        },{
            xtype: 'panel',
            layout: 'border',
            region: 'center',
            items:[{
                xtype: 'ejecutadocontratistacabecera',
                itemId: 'formcabeceraejecutadocontratista',
                width: 200,
                region: 'north'
            },{
                xtype: 'panel',
                itemId: 'panelelementosintervenidos',
                //title: '<b>Elementos Intervendios</b>',
                tbar: [{ text: '<b>Elementos Intervenidos</b>' },
                       { text: 'Ajustar', iconCls: 'wrench', action: 'addElementoIntervenido' }],
                width: 225,
                autoScroll: true,
                items: [{ xtype: 'viewelementosintervenidos' }],
                region: 'west',
                collapsible: false
            }, {
                xtype: 'panel',
                itemId: 'panelunidadesconstructivas',
                items: [{
                    xtype: 'panel',
                    //title: 'Unidades Constructivas',
                    tbar: [{ text: '<b>Unidades Constructivas</b>' },
                      { text: 'Ajustar', iconCls: 'wrench', action: 'addUnidadConstructiva' }],
                    height: 200,
                    autoScroll: true,
                    items: [{ xtype: 'viewunidadesconstructivas' }],
                    region: 'north'
                    }, {
                    xtype           : 'tabpanel',
                    activeTab       : 0,
                    id              : 'myTPanel',
                    enableTabScroll : true,
                    resizeTabs      : true,
                    minTabWidth     : 75,
                    items           : [
                        {
                            title: 'Materiales',
                            items: [{ xtype: 'gridmaterialesmanoobra', itemId: 'gridmateriales' }]
                        },
                        {
                            title: 'Mano de Obra',
                            items: [{
                                xtype: 'gridmaterialesmanoobra',
                                tbar: [{
                                    xtype: 'tbfill'
                                },
                                 {
                                     text: 'Cargar Presupuesto',
                                     icon: Constantes.HOST + 'Content/Iconos/layout_add.png',
                                     //iconCls: 'icon-add',
                                     action: 'addPresupuesto'
                                 },
                                {
                                    text: 'Añadir Mano de Obra',
                                    iconCls: 'icon-add',
                                    action: 'addManoObra'
                                }],
                                itemId: 'gridmanoobra',
                            }],
                        }
                    ],
                    height: 400,
                    region: 'south'
                }],
                region: 'center',
                height: 600,
                width: 900
            }]
        }];

        me.callParent();
    }
});



