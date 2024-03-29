﻿Ext.define("App.View.Responsables.GridResponsables", {
    extend: "App.Config.Abstract.Grid",
    title: 'Responsables Registrados',
    criterios: true,
    //stateId: 'MNGridResponsables',
    textBusqueda: 'Responsables.',
    imprimir: true,
    equipo: 'Responsables',
    check: false,
    initComponent: function () {
        var me = this;

        if (me.check) {
            sm = new Ext.selection.CheckboxModel({
                showHeaderCheckbox: false,
                checkOnly: true,
                headerWidth: 40,
            });
            me.selModel = sm;
        }

        me.store = Ext.create("App.Store.Responsables.Responsables");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nombre", width: 70, sortable: true, dataIndex: "NOMBRE" },
            { header: "Apellido", width: 70, sortable: true, dataIndex: "APELLIDO" },
            { header: "Unidad", width: 70, sortable: true, dataIndex: "UNIDAD" },
            { header: "Area", width: 70, sortable: true, dataIndex: "AREA" },
            //{ header: "Inspecciona", width: 70, sortable: true, dataIndex: "INSPECCIONA", renderer: me.renderImagen },
            //{ header: "Ejecuta", width: 70, sortable: true, dataIndex: "EJECUTA", renderer: me.renderImagen },
            //{ header: "Reporta", width: 70, sortable: true, dataIndex: "REPORTA", renderer: me.renderImagen },
            //{ header: "Atr 3", width: 70, sortable: true, dataIndex: "ATRIBUTO_3" },
            //{ header: "Atr 4", width: 70, sortable: true, dataIndex: "ATRIBUTO_4" },
            //{ header: "Atr 5", width: 70, sortable: true, dataIndex: "ATRIBUTO_5" },
            //{ header: "Atr 6", width: 70, sortable: true, dataIndex: "ATRIBUTO_6" },
            { header: 'Fecha<br>Alta', dataIndex: 'FCH_ALTA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Fecha<br>Baja', dataIndex: 'FCH_BAJA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },         
            ];
        this.callParent(arguments);
    },
    //renderImagen: function (value, record) {
    //    //alert(value);
    //    if (value == 'T') {    // Evalua si el valor campo “estado” es “A”
    //        str = "<img data-qtip='Tiene Permiso' src='" + Constantes.HOST + "Content/Iconos/accept.png'/>";    // Asigna imagen en código html a una variable
    //    }
    //    else {        // En caso el estado no sea “A”
    //        //alert(record.data.FUNCIONES_OK);
    //        str = "<img data-qtip='No Tiene Permiso' src='" + Constantes.HOST + "Content/Iconos/delete.png'/";     // Asigna imagen en código html a una variable
    //    }
    //    return str;
    //    //return record.data.MARCA; 
    //}
});

