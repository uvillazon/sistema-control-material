Ext.define('App.view.OrdenesTrabajo.TrabajosEjecutados.GridDetalleTrabajoEjecutado', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.griddetalletrabajosejecutados',
    iconCls: null,
    tbar: [{
        text: '<b>Detalle Trabajo Ejecutado:</b>'
    }, {
        xtype: 'tbfill'
    }, /*{
        text: 'Obtener Presup. de Planilla',
        iconCls: 'layout_add',
        action: 'addpresupuesto'
    }, */{
        text: 'Registrar Tarea',
        iconCls: 'icon-add',
        action: 'addTrabajoEjecutado'
    }, {
        text: 'Guardar',
        tooltip: 'Pulse guardar solo si realizo algun cambio en el grid',
        iconCls: 'icon-save',
        action: 'save'
    }],
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],

    initComponent: function () {
        var me = this;
        me.createModel();
        me.columns = me.buildColumns();
        me.store = me.buildStore();
        //me.dockedItems = me.buildDockedItems();
        //me.store.load();
        me.callParent(arguments);
    },

    createModel: function () {
    },

    buildColumns: function () {
        return [
            { xtype: 'rownumberer' },
            { text: 'POSTE', width: 70, dataIndex: 'COD_POSTE' },
            { text: 'UC', width: 70, dataIndex: 'CODIGO_UC' },
            { text: 'CONDUCTOR', width: 70, dataIndex: 'COD_CONDUCTOR' },
            { text: 'FORMACION CND.', width: 120, dataIndex: 'FORMACION_CND' },
            { text: 'COD. MANT.', width: 80, dataIndex: 'COD_MAN' },
            { text: 'COD. SOL.', width: 80, dataIndex: 'COD_SOL' },
            { text: 'MATERIAL', width: 70, dataIndex: 'COD_PROD' },
            { text: 'DESCRIPCION', width: 200, dataIndex: 'DESC_PROD' },
            { text: 'UNIDAD', width: 70, dataIndex: 'UNID_PROD' },
            { text: 'CANT. PRE.', width: 90, flex: 1, dataIndex: 'CANT_PRE', hidden: true },
            { text: 'CANT. EJEC.', width: 50, dataIndex: 'CANT_EJE', editor: { xtype: 'numberfield', allowBlank: false, allowNegative: false, minValue: 0 }},
            { text: 'NIVEL', width: 50, dataIndex: 'NIVEL', editor: { xtype: 'numberfield', allowBlank: true, allowNegative: false, minValue: 0 }},
            { text: 'OBSERVACION', width: 150, dataIndex: 'OBSERVACION', editor: { xtype: 'textfield', allowBlank: true }},
            { text: 'FECHA INI.', width: 100, dataIndex: 'FCH_HOR_INI', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i') },
            { text: 'FECHA FIN.', width: 100, dataIndex: 'FCH_HOR_FIN', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'), dateParamFormat: 'd/m/Y H:i' },
            { text: 'CAPATAZ', width: 150, dataIndex: 'CAPATAZ' },
            { text: 'MOVIL', width: 60, dataIndex: 'MOVIL' },
            { xtype: 'actioncolumn',
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls: 'icon-delete',
                        tooltip: 'Eliminar',
                        handler: function (grid, rowIndex, colIndex) {
                            grid.getStore().removeAt(rowIndex);
                        }
                    }]
            },
        ];
    },

    buildDockedItems: function () {
        return [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: this.store,
            displayInfo: true,
            displayMsg: '{0} - {1} of {2} Materiales/Mano de Obra',
            emptyMsg: 'No hay registros',
            //pageSize: 10
        }]
    },

    buildStore: function () {
        return Ext.create('App.store.OrdenesTrabajo.DetalleTrabajosEjecutados');
    },

    ocultarColumnasGrid: function (elemento) {
        var me = this;
        if (elemento == 'POSTE') {
            me.columns[1].setVisible(false);
            me.columns[2].setVisible(true);
            me.columns[3].setVisible(false);
            me.columns[4].setVisible(false);
        }
        if (elemento == 'CONDUCTOR') {
            me.columns[1].setVisible(false);
            me.columns[2].setVisible(false);
            me.columns[3].setVisible(false);
            me.columns[4].setVisible(true);
        }
        if (elemento == 'UNIDAD CONSTRUCTIVA') {
            me.columns[1].setVisible(false);
            me.columns[2].setVisible(false);
            me.columns[3].setVisible(false);
            me.columns[4].setVisible(false);
        }
        if (elemento == null || elemento == '') {
            me.columns[1].setVisible(true);
            me.columns[2].setVisible(true);
            me.columns[3].setVisible(true);
            me.columns[4].setVisible(true);
        }
    }
});