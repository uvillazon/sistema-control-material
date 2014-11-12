﻿/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 13
Elaborado: P. Sergio Alvarado G.
Proposito: Modelo para crear un menu en forma de arobl que mostrara los elementos que estan sujetos a reparacion o remplazo.
*/
Ext.define('App.Model.OrdenesTrabajo.ElementosIntervenidos', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'text' },
        { name: 'ID_OT', type: 'int', useNull: true },
        { name: 'ID_POSTE', type: 'int', useNull: true },
        { name: 'COD_POSTE' },
        { name: 'ID_UC', type: 'int', useNull: true },
        { name: 'COD_UC' },
        { name: 'CODIGO_UC' },
        { name: 'COD_UC' },
        { name: 'CODIGO_REA' },
        { name: 'ID_CONDUCTOR', type: 'int', useNull: true },
        { name: 'COD_CONDUCTOR' },
        { name: 'FORMACION_CND' },
        { name: 'DESC_TIPO' },
        { name: 'elemento' }
    ]
});