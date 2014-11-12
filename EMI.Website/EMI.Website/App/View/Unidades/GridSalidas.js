Ext.define("App.View.Unidades.GridSalidas", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        me.CargarGrid();
        
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Postes.Materiales");
        //me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 70, sortable: false, dataIndex: "CODIGO", align: 'center' },
            { header: "Fabricacion", width: 70, sortable: false, dataIndex: "FABRICACION", align: 'center' },
            { header: "Calibre", width: 70, sortable: false, dataIndex: "CALIBRE", align: 'center' },
            { header: "Tipo", width: 70, sortable: false, dataIndex: "TIPO", align: 'center' },
            { header: "Cantidad<br>Disponible", width: 50, sortable: false, dataIndex: "CANTIDAD_DISPONIBLE", align: 'center' },
            {
                header: "Salida", width: 70, sortable: false, dataIndex: "SALIDA", editor: {
                    xtype: 'numberfield', align: 'center',
                    allowNegative: false,
                }
            },
            {
                header: "Observacion", width: 120, sortable: false, dataIndex: "OBSERVACION", editor: {
                    xtype: 'textfield',
                    emptyText : 'Ingrese Motivo de Salida'
                }
            },
            //{
            //    header: "Fecha", width: 70, sortable: false, dataIndex: "FECHA_SALIDA", editor: {
            //        xtype: 'datefield'
            //    }
            //},
            {
                xtype: 'actioncolumn',
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls : 'delete',
                        tooltip: 'Eliminar',
                        hidden : me.btnEliminarRecord,
                        handler: function (grid, rowIndex, colIndex) {
                            grid.getStore().removeAt(rowIndex);
                            //grid.getView().refresh();
                        }
                    }]
            }
           
        ];
    },
    CargarComponentesSolicitudesRechazadas: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados");
        me.store.setExtraParams({ Estados: 'RECH_INSP' });
        me.store.load();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Unidad<br>Reporta", width: 70, sortable: true, dataIndex: "UNIDAD_REPORTA" },
            { header: "Tipo Documento", width: 70, sortable: true, dataIndex: "TIPO_DOCUMENTO" },
            { header: "Nro<br>Documento", width: 70, sortable: true, dataIndex: "NRO_DOCUMENTO" },
            { header: "Nombre<br>Afectado", width: 100, sortable: true, dataIndex: "NOMBRE_AFECTADO" },
            { header: "Sistema", width: 70, sortable: true, dataIndex: "AREA_UBIC" },
            { header: "Ubicacion", width: 100, sortable: true, dataIndex: "UBICACION" },
            { header: "Nus", width: 70, sortable: true, dataIndex: "NUS" },
            { header: "Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Tipo Objeto", width: 70, sortable: true, dataIndex: "TIPO_OBJ" },
            { header: "Nombre quien<br>Reporta", width: 100, sortable: true, dataIndex: "REPORTA_NOMBRE" },
            { header: "Movil que Reporta", width: 70, sortable: true, dataIndex: "REPORTA_MOVIL" },
            { header: "Fecha Problema", width: 70, sortable: true, dataIndex: "FECHA_PROBL", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Problema", width: 70, sortable: true, dataIndex: "HORA_PROBL" },
            { header: "Nro Reclamo", width: 70, sortable: true, dataIndex: "NRO_RECLAMO" },
            { header: "Observacion", width: 70, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    CargarComponentesCodigoSoluciones: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.columns = [
           { header: "Codigo<br>Solicitud", width: 120, sortable: true, dataIndex: "COD_SOL" },
           { header: "Descripcion", width: 330, sortable: true, dataIndex: "DESCRIP_SOL" }
        ];

    }

});

