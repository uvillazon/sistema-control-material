Ext.define("App.View.Pedidos.FormDespachoArmamento", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Despacho",
    initComponent: function () {
        var me = this;
        //alert("asdasdadad");
        me.CargarFormulario();
        me.EventosForm();
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.CargarGridRecepcion();
        me.formConsulta = Ext.create("App.View.Pedidos.FormDetallePedidoConsulta", { botones: false ,colspan : 2});

        me.store_item_armamento = Ext.create('App.Store.Armamentos.Armamentos');
        me.store_item_armamento.setExtraParams({almacen : true});
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Items Armamento",
            name: "ID_ITEM",
            displayField: 'CODIGO',
            valueField: 'ID_ITEM',
            width : 400,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return " {CODIGO} : {NRO_FUSIL}- {FABRICACION}" },
            store: me.store_item_armamento,
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Despacho",
            name: "FECHA",
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cmp_item_armamento = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Item',
            btn_iconCls: 'add',
            colspan : 2,    
            componente: me.cbx_item_armamento
        });
        me.txt_total = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Total",
            name: "TOTAL",
            readOnly: true
        });

        me.items = [
        me.formConsulta,
        me.dat_fecha,
        me.cmp_item_armamento,
        me.gridRecepcion,
        me.txt_total
        //me.txt_ubicacion,
        //me.num_cod_tipo,
        //me.txt_desc_tipo,
        //me.dat_fecha_oper,
        //me.txt_estado,
        ];
    },
    EventosForm : function(){
        var me = this;
        //me.cmp_item_armamento.btn.on()
        me.gridRecepcion.getStore().on('add', function () {
            me.CalcularTotales();
        });
        me.gridRecepcion.getStore().on('remove', function () {
            me.CalcularTotales();
        });
        me.cmp_item_armamento.btn.on('click', function () {
            if (me.cmp_item_armamento.componente.getValue() != null) {
                me.AgregarArmamento(me.cbx_item_armamento.datos[0]);
            }
            else {
                Ext.Msg.alert("Aviso", "Seleccione un Item Armamento");
            }
        });
    },
    AgregarArmamento: function (rec) {
        var me = this;
        if (!me.gridRecepcion.getStore().existeRecord('NRO_FUSIL', rec.get('NRO_FUSIL')) && me.ValidarCantidad()) {
            var rec = Ext.create('App.Model.Pedidos.DetallesDespacho', {
                CODIGO: rec.get('CODIGO'),
                NRO_FUSIL: rec.get('NRO_FUSIL'),
                ID_ITEM_ARMAMENTO: rec.get('ID_ITEM'),
                CANTIDAD_ENTREGADA: 1,
                ESTADO: "DESPACHADO",
                ID_DETALLE: me.formConsulta.txt_id_detalle.getValue()
            });
            me.gridRecepcion.getStore().add(rec);
        }
        else {
            var msg = !me.ValidarCantidad() ? "Cantidad Despachada Superior a lo Solicitado." : "Ya Existe el Item de Armamento.";
            Ext.Msg.alert("Error", msg);
        }

    },
    CalcularTotales: function () {
        var me = this;
        var total = 0;
        me.txt_total.setValue(me.gridRecepcion.getStore().count());
    },
    ValidarCantidad: function () {
        var me = this;
        if (me.txt_total.getValue() >= me.formConsulta.txt_cantidad_solicitada.getValue()) {
            return false;
        }
        else {
            return true;
        }
    },
    CargarGridRecepcion: function () {
        var me = this;
        me.gridRecepcion = Ext.create("Ext.grid.Panel", {
            title: 'Componentes',
            width: 490,
            height: 200,
            colspan: 2,
            columns: [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 100, sortable: true, dataIndex: 'CODIGO', align: 'center' },
            { header: "Nro Fusil", width: 100, sortable: true, dataIndex: "NRO_FUSIL", align: 'center' },
            { header: "Estado", width: 100, sortable: true, dataIndex: 'ESTADO', align: 'center' },
            {
                xtype: 'actioncolumn',
                width: 27,
                align: 'center',
                items: [
                        {
                            iconCls: 'delete',
                            tooltip: 'Eliminar',
                            handler: function (grid, rowIndex, colIndex) {
                                grid.getStore().removeAt(rowIndex);
                                //grid.getView().refresh();
                            }
                        }]
            },
            //{ header: "Descripcion", width: 300, sortable: true, dataIndex: "NOMBRE" }

            ],

            });
},
});
