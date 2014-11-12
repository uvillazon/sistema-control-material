Ext.define("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
    extend: "App.Config.Abstract.Grid",
    title: 'Ordenes de Trabajo Registrados',
    //stateId: 'MNGridSolicitudesMantenimiento',
    itemId: 'gridotprincipal',
    textBusqueda: 'OT',
    imprimir: false,
    criterios: false,
    tamBusqueda: 20,
    //busqueda : true,
    equipo: 'Ordenes de Trabajo',
    opcion: '',
    ckeck: false,
    imagenPlanilla: true,
    imagenTrabEje: true,
    imagenInsInf: true,
    imagenPago: true,
    storeResponsable: false,
    storeInspector: false,
    noLimpiar: null,
    //para mostrar el icono de Historicos de Estado si corresponde
    reportesHistoricoEstados: false,
    tabla: 'MN_ORDENES_TRABAJO',
    id_tabla: 'ID_OT',
    //parametros obligados para mostrar reporte de historico de estados por tabla
    initComponent: function () {
        var me = this;
        if (me.opcion == '') {
            me.CargarComponentesGeneral();
        }

        else if (me.opcion == 'GridOTSeleccionadas') {
            me.CargarComponentesOTSeleccionadas();
        }
        else if (me.opcion == 'GridOTElegidas') {
            me.CargarComponentesOTElegidas();
        }
        else if (me.opcion == 'GridOTContratistas') {
            me.CargarOTContratistas();
        }
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarComponentesGeneral: function () {
        var me = this;
        if (me.storeResponsable) {
            me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable");
            if (me.storeInspector) {
                me.store.setExtraParam("Inspector", true);
                me.noLimpiar = ["Inspector"];
            }
        }
        else {
            me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajo");
        }

        me.CargarComponentes();
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'OT');
            }
        };
        //me.selModel =  {
        //    selType: 'cellmodel'
        //} ;
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Pla<br>nilla", width: 40, sortable: false, dataIndex: 'ESTADO_PLA', renderer: me.renderImagenPlanilla, disabled: me.imagenPlanilla ? true : false, hidden: me.imagenPlanilla },
            { header: "Trab<br>Ejec", width: 40, sortable: false, dataIndex: 'CON_TRAB_EJEC', renderer: me.renderImagenTrabEje, disabled: me.imagenTrabEje ? true : false, hidden: me.imagenTrabEje },
            { header: "Inf.<br>Insp.", width: 40, sortable: false, dataIndex: 'CON_INFORME', renderer: me.renderImagenInforme, disabled: me.imagenInsInf ? true : false, hidden: me.imagenInsInf },
            { header: "Nro <br>Solicitud", width: 50, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Area SM", width: 50, sortable: true, dataIndex: "AREA_UBIC" },
            { header: "Nro OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
            { header: "Tipo OT", width: 70, sortable: true, dataIndex: "TIPO_OT" },
            { header: "Tipo Objecto<br>Intervenido", width: 70, sortable: true, dataIndex: "TIPO_OBJ_INTERV" },
            { header: "Codigo Objecto<br>Intervenido", width: 70, sortable: true, dataIndex: "COD_OBJ_INTERV" },
            { header: "Lugar <br>Trabajo", width: 120, sortable: true, dataIndex: "LUGAR_TRABAJO" },
            { header: "Asignado a", width: 70, sortable: true, dataIndex: "NOMBRE_ASIGNADO" },
            { header: "Fecha <br>Asignacion", width: 70, sortable: true, dataIndex: "FECHA_ASIG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Cod. <br>Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. <br>Defecto", width: 70, sortable: true, dataIndex: "COD_DEF" },
            { header: "Cod. <br>Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "OT origen", width: 70, sortable: true, dataIndex: "OT_ORIGEN" },
            { header: "Problema", width: 250, sortable: true, dataIndex: "DESC_PROBL" },
        ];
    },
    CargarComponentesOTSeleccionadas: function () {
        var me = this;
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'OT');
            }
        };
        sm = new Ext.selection.CheckboxModel({
            showHeaderCheckbox: false,
            checkOnly: true,
            headerWidth: 40,
        });
        me.selModel = sm;
        if (me.storeResponsable) {
            me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable");
            if (me.storeInspector) {
                me.store.setExtraParam("Inspector", true);
            }
        }
        else {
            me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajo");
        }
        //me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajo");
        //me.store = Funciones.CrearStore("App.Model.OrdenesTrabajo.OrdenesTrabajo", "ObtenerOrdenesTrabajoPaginado", "ID_OT");
        me.CargarComponentes();
        me.columns = [
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Nro OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Asignado a", width: 70, sortable: true, dataIndex: "NOMBRE_ASIGNADO" },
            { header: "Tipo OT", width: 70, sortable: true, dataIndex: "TIPO_OT" },
            { header: "Lugar Trabajo", width: 120, sortable: true, dataIndex: "LUGAR_TRABAJO" },
            { header: "Tipo Objecto<br>Intervenido", width: 70, sortable: true, dataIndex: "TIPO_OBJ_INTERV" },
            { header: "Codigo Objecto<br>Intervenido", width: 70, sortable: true, dataIndex: "COD_OBJ_INTERV" },
            { header: "Cod. Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. Defecto", width: 70, sortable: true, dataIndex: "COD_DEF" },
            { header: "Cod. Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Problema", width: 250, sortable: true, dataIndex: "DESC_PROBL" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    obtenerSeleccionados: function () {
        var me = this;
        var selecction = me.selModel.getSelection();
        return (selecction != null) ? selecction : false;
    },
    Criterios: function () {
        var me = this;
        var formulario1 = Ext.create('App.View.OrdenesTrabajo.VentanaCriterios', { title: " Criterios de Busqueda", botones: true, textGuardar: 'Buscar', storeBuscar: me.store, gridBuscar: me, tmp: me.bar, noLimpiar: me.noLimpiar });
        formulario1.show();
    },
    CargarComponentesOTElegidas: function () {
        var me = this;
        //*****************************************
        if (me.ckeck) {
            sm = new Ext.selection.CheckboxModel({
                showHeaderCheckbox: false,
                checkOnly: true,
                headerWidth: 40,
                header: 'titulo',
                opcion: 'OT',

            });
            me.selModel = sm;
            //*****************************************
        }
        me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable");
        me.CargarComponentes();
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'OT');
            }
        };
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false, hidden: me.ckeck },
            { header: "Pla<br>nilla", width: 40, sortable: false, dataIndex: 'ESTADO_PLA', renderer: me.renderImagenPlanilla, disabled: me.imagenPlanilla ? true : false, hidden: me.imagenPlanilla },
            { header: "Trab<br>Ejec", width: 40, sortable: false, dataIndex: 'CON_TRAB_EJEC', renderer: me.renderImagenTrabEje, disabled: me.imagenTrabEje ? true : false, hidden: me.imagenTrabEje },
            { header: "Inf.<br>Insp.", width: 40, sortable: false, dataIndex: 'CON_INFORME', renderer: me.renderImagenInforme, disabled: me.imagenInsInf ? true : false, hidden: me.imagenInsInf },
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Nro OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Tipo OT", width: 70, sortable: true, dataIndex: "TIPO_OT" },
            { header: "Tipo Objecto<br>Intervenido", width: 70, sortable: true, dataIndex: "TIPO_OBJ_INTERV" },
            { header: "Codigo Objecto<br>Intervenido", width: 70, sortable: true, dataIndex: "COD_OBJ_INTERV" },
            { header: "Lugar <br>Trabajo", width: 120, sortable: true, dataIndex: "LUGAR_TRABAJO" },
            { header: "Asignado a", width: 70, sortable: true, dataIndex: "NOMBRE_ASIGNADO" },
            { header: "Fecha <br>Asignacion", width: 70, sortable: true, dataIndex: "FECHA_ASIG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Objeto<br>Intervenido", width: 70, sortable: true, dataIndex: "TIPO_OBJ_INTERV" },
            { header: "Cod. <br>Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. <br>Defecto", width: 70, sortable: true, dataIndex: "COD_DEF" },
            { header: "Cod. <br>Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Problema", width: 250, sortable: true, dataIndex: "DESC_PROBL" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    renderImagenPlanilla: function (val, metaData, record) {
        //alert(record.data.ESTADO_PLA)
        if (record.data.ESTADO_PLA == "NUEVA") {
            return '<img data-qtip="OT con Planilla en Estado NUEVA", src="' + Constantes.HOST + 'Content/Iconos/layout.png" />';
        }
        else if (record.data.ESTADO_PLA == "APROBADA") {
            return '<img data-qtip="OT con Planilla en Estado APROBADA", src="' + Constantes.HOST + 'Content/Iconos/layout_add.png" />';
        }
        else if (record.data.ESTADO_PLA == "RECHAZADA") {
            return '<img data-qtip="OT con Planilla en Estado RECHAZADA", src="' + Constantes.HOST + 'Content/Iconos/layout_delete.png" />';
        }
        else if (record.data.ESTADO_PLA == "CORREGIDA") {
            return '<img data-qtip="OT con Planilla en Estado CORREGIDA", src="' + Constantes.HOST + 'Content/Iconos/layout_edit.png" />';
        }
        else {
            return '';
        }

    },
    renderImagenTrabEje: function (val, metaData, record) {

        if (record.data.EST_TRAB_EJEC == 'NUEVO') {
            return '<img data-qtip="OT con Trabajo Ejecutado", src="' + Constantes.HOST + 'Content/Iconos/worker.png" />';
        }
        else if (record.data.EST_TRAB_EJEC == "APROBADO") {
            return '<img data-qtip="OT con Trabajo Ejecutado Aprobado", src="' + Constantes.HOST + 'Content/images/trabEjecApro.png" />';
        }
        else if (record.data.EST_TRAB_EJEC == "RECHAZADO") {
            return '<img data-qtip="OT con Trabajo Ejecutado RECHAZADA", src="' + Constantes.HOST + 'Content/images/trabEjecRech.png" />';
        }
        else if (record.data.EST_TRAB_EJEC == "CORREGIDO") {
            return '<img data-qtip="OT con Trabajo Ejecutado CORREGIDO", src="' + Constantes.HOST + 'Content/images/worker.png" />';
        }
        else {
            if (record.data.EST_TRAB_CONT == 'NUEVO') {
                return '<img data-qtip="OT con Trabajo Ejecutado Contratista", src="' + Constantes.HOST + 'Content/Iconos/layout.png" />';
            }
            else if (record.data.EST_TRAB_CONT == "APROBADO") {
                return '<img data-qtip="OT con Trabajo Ejecutado Contratista Aprobado", src="' + Constantes.HOST + 'Content/Iconos/layout_add.png" />';
            }
            else if (record.data.EST_TRAB_CONT == "RECHAZADO") {
                return '<img data-qtip="OT con Trabajo Ejecutado  Contratista RECHAZADA", src="' + Constantes.HOST + 'Content/Iconos/layout_delete.png" />';
            }
            else if (record.data.EST_TRAB_CONT == "CORREGIDO") {
                return '<img data-qtip="OT con Trabajo Ejecutado Contratista CORREGIDO", src="' + Constantes.HOST + 'Content/Iconos/layout_edit.png" />';
            }
            return '';
        }
    },
    renderImagenInforme: function (val, metaData, record) {

        if (val == true) {
            return '<img data-qtip="OT con Informe de Inspeccion", src="' + Constantes.HOST + 'Content/Iconos/building.png" />';
        }
        else {
            return '';
        }
    },
    //Grid donde se muestra las OT que corresponda a Contratista
    CargarOTContratistas: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajoContratista");
        me.CargarComponentes();
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'OT');
            }
        };
        //me.selModel = {
        //    selType: 'cellmodel'
        //};
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Con<br>OC", width: 40, sortable: false, dataIndex: 'CON_PAGO', renderer: me.renderImagenPago, disabled: me.imagenPago ? true : false, hidden: me.imagenPago },
            { header: "Trab<br>Ejec", width: 40, sortable: false, dataIndex: 'ESTADO_EJE_CNT', renderer: me.renderImagenTEContratista, disabled: me.imagenTrabEje ? true : false, hidden: me.imagenTrabEje },
            { header: "Nro <br>Solicitud", width: 50, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Area SM", width: 50, sortable: true, dataIndex: "AREA_UBIC" },
            { header: "Nro OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
            { header: "Tipo OT", width: 70, sortable: true, dataIndex: "TIPO_OT" },
            { header: "Nro <br>Compra", width: 50, sortable: true, dataIndex: "NROCBTE" },
            { header: "Lugar <br>Trabajo", width: 120, sortable: true, dataIndex: "LUGAR_TRABAJO" },
            { header: "Asignado a", width: 70, sortable: true, dataIndex: "NOMBRE_ASIGNADO" },
            { header: "Fecha <br>Asignacion", width: 70, sortable: true, dataIndex: "FECHA_ASIG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Cod. <br>Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. <br>Defecto", width: 70, sortable: true, dataIndex: "COD_DEF" },
            { header: "Cod. <br>Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Problema", width: 250, sortable: true, dataIndex: "DESC_PROBL" },
        ];
    },
    renderImagenPago: function (val, metaData, record) {

        if (val == false) {
            return '<img data-qtip="OT con Pago", src="' + Constantes.HOST + 'Content/Iconos/lock.png" />';
        }
        else {
            return '';
        }
    },
    renderImagenTEContratista: function (val, metaData, record) {
        //alert(record.data.ESTADO_EJE_CNT);
        if (record.data.ESTADO_EJE_CNT == "NUEVO") {
            return '<img data-qtip="OT con Trabajo Ejecutado en Estado NUEVO", src="' + Constantes.HOST + 'Content/Iconos/layout.png" />';
        }
        else if (record.data.ESTADO_EJE_CNT == "APROBADO") {
            return '<img data-qtip="OT con Trabajo Ejecutada en Estado APROBAD=", src="' + Constantes.HOST + 'Content/Iconos/layout_add.png" />';
        }
        else if (record.data.ESTADO_EJE_CNT == "RECHAZADO") {
            return '<img data-qtip="OT con Trabajo Ejecutado en Estado RECHAZADO", src="' + Constantes.HOST + 'Content/Iconos/layout_delete.png" />';
        }
        else {
            return '';
        }

    }
});

