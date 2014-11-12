Ext.define("App.View.Pedidos.FormRecepcionPedido", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Despacho",
    initComponent: function () {
        var me = this;
        //alert("asdasdadad");
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        
        me.formConsulta = Ext.create("App.View.Pedidos.FormDetallePedidoConsulta", { botones: false ,colspan : 2});
        me.gridCmp = Ext.create("App.View.Materiales.GridComponentesArmamentos", {
            colspan: 1,
            title: 'Componentes',
            width: 200,
            height: 200,
        });
        me.CargarGridRecepcion();
        me.items = [
        me.formConsulta,
        me.gridRecepcion,
        me.gridCmp,
        //me.txt_ubicacion,
        //me.num_cod_tipo,
        //me.txt_desc_tipo,
        //me.dat_fecha_oper,
        //me.txt_estado,
        ];
    },
    CargarGridRecepcion: function () {
        var me = this;
        me.gridRecepcion = Ext.create("Ext.grid.Panel", {
            title: 'Armamento',
            width: 300,
            height: 200,
            colspan: 1,
            columns: [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Fusil", width: 90, sortable: true, dataIndex: 'NRO_FUSIL', align: 'center' },
            { header: "Observaciones", width: 250, sortable: true, dataIndex: "OBSERVACIONES", align: 'center' },
            { header: "Estado", width: 70, sortable: true, dataIndex: 'ESTADO', align: 'center' },
            //{ header: "Descripcion", width: 300, sortable: true, dataIndex: "NOMBRE" }

            ],

        });
    },
});
