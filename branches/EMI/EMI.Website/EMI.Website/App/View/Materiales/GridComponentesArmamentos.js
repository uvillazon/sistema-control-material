Ext.define("App.View.Materiales.GridComponentesArmamentos", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
       
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Postes.Materiales");
        //me.selType = 'cellmodel';
        me.store = Ext.create("App.Store.Armamentos.CmpArmamentos");
        me.columns = [ 
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 70, sortable: true, dataIndex: 'CODIGO', align: 'center' },
            { header: "Descripcion", width: 150, sortable: true, dataIndex: "NOMBRE", align: 'center' }

        ];
    },
   

});

