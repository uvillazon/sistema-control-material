Ext.define('App.view.OrdenesTrabajo.ViewOrdenesTrabajo', {
    extend: 'Ext.view.View',
    xtype: 'viewordenestrabajo',
    itemId: 'vordenestrabajo',
    emptyText: 'Ninguna Orden de Trabajo para esta Solicitud',
    singleSelect: true,
    overItemCls: 'x-item-over',
    itemSelector: 'div.thumb-wrap2',
    tpl: [
        '<tpl for =".">',
                '<div class="thumb-wrap2">',
                /*'<div class="thumb">',
                    '<img src="content/images/ot.png"  height="120" width="80">',
                '</div>',*/
                '<font color="0066FF" size= 5.5em">OT: {ID_OT}</font></br>',
                '<b>Fuente:</b> {COD_FUENTE}</br>',
                '<b>Lugar:</b><font size= 1.5em"> {LUGAR_TRABAJO}</font></br>',
                '<b>{COD_MAN}:</b><font size= 1.5em"> {DESCRIP_MAN}</font></br>',
                '<b>Postes a Intervenir:</b> {CANTIDAD_POSTES}</br>',
                '<b>Asignado:</b><font size= 1.5em"> {NOMBRE_ASIGNADO}</font></br>',
            '</div>',
        '</tpl>'].join(''),
    
});