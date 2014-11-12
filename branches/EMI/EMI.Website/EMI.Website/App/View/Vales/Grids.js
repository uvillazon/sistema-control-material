Ext.define("App.View.Vales.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    editar: false,
    handler: null,
    scope : null,
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridMaterialesPresupuesto") {
            me.title = "Materiales Por Vale";
            me.pieTitulo = "Materiales";
            me.CargarGridMaterialesPresupuesto();
            
        }
        else {
            alert("Defina el tipo primero");
        }
        if (me.pieTitulo != '') {
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        this.callParent(arguments);
    },

    CargarGridMaterialesPresupuesto: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPresupuesto");
        if (me.editar) {
            me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
            ];
            me.columnCant = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad",
                width: 75,
                sortable: true,
                dataIndex: "CANT_VALE",
                editor: {
                    xtype: 'numberfield',
                }
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                scope: me.scope == null? this: me.scope,
                items: [
                    {
                        iconCls: 'delete',
                        tooltip: 'Eliminar',
                        handler: me.handler == null? me.EliminarItem : me.handler
                    }]
            });
        }
        else {
            me.columnCant = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad",
                width: 75,
                sortable: true,
                dataIndex: "CANT_VALE"
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                hidden: true,
            });
        }
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 200, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            { header: "Tipo<br>Vale", width: 55, sortable: true, dataIndex: "TIPO_VALE" },
            { header: "Nro<br>Vale", width: 55, sortable: true, dataIndex: "IDVALE" },
             me.columnCant,
            { header: "Mat<br>Cambiado", width: 120, sortable: true, dataIndex: "COD_PROD_VC" },
            //{ header: "Cantidad", width: 100, sortable: true, dataIndex: "CANT_VALE" },
            
             me.columnAction
        ];
    },
    EliminarItem: function (grid, rowIndex, colIndex) {
        //var me = this;
        grid.getStore().removeAt(rowIndex);
    }
});

