Ext.define("App.View.Pedidos.GridDetalles", {
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
        me.store = Ext.create("App.Store.Pedidos.DetallesPedido");
        //me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 80, sortable: false, dataIndex: "CODIGO", align: 'center' },
            { header: "Descripcion", width: 100, sortable: false, dataIndex: "CATEGORIA", align: 'center' },
            
           
            {
                header: "Cantidad1", width: 70, sortable: false, dataIndex: "CANTIDAD_SOLICITADA", editor: {
                    xtype: 'numberfield',
                    allowNegative: false,
                    minValue: 1
                }
            },
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
    }

});

