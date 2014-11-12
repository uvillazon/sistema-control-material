Ext.define("App.View.Pedidos.FormDespachoLogistico", {
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
        me.formConsulta = Ext.create("App.View.Pedidos.FormDetallePedidoConsulta", { botones: false, colspan: 2 });

        me.store_item_armamento = Ext.create('App.Store.Logisticos.ItemMatLogisticos');
        me.store_item_armamento.setExtraParams({ almacen: true });
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Items Logistico",
            name: "ID_ITEM",
            displayField: 'CODIGO',
            valueField: 'ID_ITEM',
            width: 400,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return " {CODIGO} : {NRO_SERIE}- {TIPO_COMPONENTE} {AERONAVE} {GRUPO}" },
            store: me.store_item_armamento,
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Despacho",
            name: "FECHA",
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cmp_item_armamento = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Item',
            btn_iconCls: 'add',
            colspan: 2,
            componente: me.cbx_item_armamento
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
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
        ];
    },
    EventosForm: function () {
        var me = this;
        me.gridRecepcion.getStore().on('add', function () {
            me.CalcularTotales();
        });
        me.gridRecepcion.getStore().on('remove', function () {
            me.CalcularTotales();
        });
        //me.cmp_item_armamento.btn.on()
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
        if (!me.gridRecepcion.getStore().existeRecord('NRO_FUSIL', rec.get('NRO_SERIE')) && me.ValidarCantidad()) {
            var rec = Ext.create('App.Model.Pedidos.DetallesDespacho', {
                CODIGO: rec.get('CODIGO'),
                NRO_FUSIL: rec.get('NRO_SERIE'),
                ID_ITEM_LOGISTICO: rec.get('ID_ITEM'),
                CANTIDAD_ENTREGADA: 1,
                ESTADO: "DESPACHADO",
                TIPO_COMPONENTE: rec.get('TIPO_COMPONENTE'),
                GRUPO: rec.get('GRUPO'),
                ID_DETALLE: me.formConsulta.txt_id_detalle.getValue()
            });
            me.gridRecepcion.getStore().add(rec);
            //me.CalcularTotales();
        }
        else {
            var msg = !me.ValidarCantidad() ? "Cantidad Despachada Superior a lo Solicitado." : "Ya Existe el Material Logistico.";
            Ext.Msg.alert("Error", msg);
        }
    },
    CalcularTotales : function(){
        var me = this;
        var total = 0;
        me.txt_total.setValue(me.gridRecepcion.getStore().count());
    },
    ValidarCantidad : function(){
        var me = this;
        if (me.txt_total.getValue()  >=  me.formConsulta.txt_cantidad_solicitada.getValue()) {
            return false;
        }
        else {
            return true;
        }
    },
    CargarGridRecepcion: function () {
        var me = this;
        me.gridRecepcion = Ext.create("Ext.grid.Panel", {
            title: 'Item Mat. Logisticos',
            width: 490,
            height: 200,
            colspan: 2,
            columns: [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 70, sortable: true, dataIndex: 'CODIGO', align: 'center' },
             { header: "Nro Serie", width: 70, sortable: true, dataIndex: 'NRO_FUSIL', align: 'center' },
            { header: "Tipo <br>Componente", width: 100, sortable: true, dataIndex: "TIPO_COMPONENTE", align: 'center' },
             { header: "Grupo", width: 100, sortable: true, dataIndex: "GRUPO", align: 'center' },
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
