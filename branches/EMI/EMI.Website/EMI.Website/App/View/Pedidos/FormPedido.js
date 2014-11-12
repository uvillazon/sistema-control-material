Ext.define("App.View.Pedidos.FormPedido", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Pedido",
    initComponent: function () {
        var me = this;
        //alert("asdasdadad");
        me.CargarFormulario();
        me.EventosForm();
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PEDIDO",
            hidden: true,
        });
        me.txt_id_unidad = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_UNIDAD",
            hidden: true,
            value : Constantes.USUARIO.ID_UNIDAD
        });
        me.txt_nro_pedido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Pedido",
            name: "NRO_PEDIDO",
            colspan: 2,
            maxLength: 10,
            readOnly : true
        });
        me.store_tipo = Ext.create("App.Store.Listas.StoreLista");
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_PEDIDO'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            store: me.store_tipo,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_unidad_solicitante = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Unidad Solicitante",
            name: "UNIDAD_SOLICITANTE",
            readOnly: true,
            value: Constantes.USUARIO.UNIDAD
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Registro",
            name: "FECHA_PEDIDO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.dat_fecha_modif = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Modificacion",
            name: "FECHA_MODIF",
            readOnly : true
        });
        me.txta_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACIONES",
            colspan: 2,
            maxLength: 250
        });
      
        me.store_item_armamento = Ext.create('App.Store.Armamentos.MatBelicos');
        me.store_item_armamento.setExtraParams({CATEGORIA : 'ARMAMENTO'});
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Items Armamento",
            name: "ID_MAT_BELICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_BELICO',
            width : 400,
            textoTpl: function () { return "{CODIGO} - {NOMBRE} Cant. Disp. {CANTIDAD_DISPONIBLE}"},
            store: me.store_item_armamento,
        });
        me.cmp_item_armamento = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Item',
            btn_iconCls: 'add',
            colspan : 2,    
            componente: me.cbx_item_armamento
        });

        me.store_municiones = Ext.create('App.Store.Armamentos.MatBelicos');
        me.store_municiones.setExtraParams({ CATEGORIA: 'MUNICIONES' });
        me.cbx_municiones = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Municiones",
            name: "ID_MAT_BELICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_BELICO',
            width: 400,
            textoTpl: function () { return "{CODIGO} - {CALIBRE} Cant. Disp. {CANTIDAD_DISPONIBLE}" },
            store: me.store_municiones,
        });
        me.cmp_item_municiones = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Item',
            btn_iconCls: 'add',
            colspan: 2,
            componente: me.cbx_municiones
        });

        me.store_logistico = Ext.create('App.Store.Logisticos.MatLogisticos');
        me.cbx_logistico = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Mat. Logisticos",
            name: "ID_MAT_LOGISTICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_LOGISTICO',
            width: 400,
            textoTpl: function () { return "{CODIGO} - {TIPO_COMPONENTE} - {AERONAVE} - {NRO_PARTE} - {GRUPO} Cant. Disp. {CANTIDAD_DISPONIBLE}" },
            store: me.store_logistico,
        });
        me.cmp_logistico = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Item',
            btn_iconCls: 'add',
            colspan: 2,
            componente: me.cbx_logistico
        });
        me.gridDetalle = Ext.create("App.View.Pedidos.GridDetalles", {
            width: 480,
            height: 250,
            colspan : 2,
            title : 'Detalle Pedido'
            
        });
        me.items = [
        me.txt_id,
        me.txt_id_unidad,
        me.txt_nro_pedido,
        me.cbx_tipo,
        me.txt_unidad_solicitante,
        me.dat_fecha,
        me.dat_fecha_modif,
        me.txta_observacion,
        me.cmp_item_armamento,
        me.cmp_item_municiones,
        me.cmp_logistico,
        me.gridDetalle
        ];
    },
    EventosForm : function(){
        var me = this;
        me.cbx_tipo.on('select', function (cbx, rec) {
            me.gridDetalle.getStore().removeAll();
            if (cbx.getValue() == "BELICO") {
                me.cmp_logistico.reset();
                me.cmp_logistico.setDisabled(true);
                me.cmp_item_armamento.setDisabled(false);
                me.cmp_item_municiones.setDisabled(false);
            }
            else {
                me.cmp_item_armamento.reset();
                me.cmp_item_municiones.reset();
                me.cmp_logistico.setDisabled(false);
                me.cmp_item_armamento.setDisabled(true);
                me.cmp_item_municiones.setDisabled(true);
            }
        });
        me.cmp_item_armamento.btn.on('click', function () {
            if (me.cmp_item_armamento.componente.getValue() != null) {
                me.AgregarArmamento(me.cbx_item_armamento.datos[0]);
            }
            else {
                Ext.Msg.alert("Aviso", "Seleccione un Armamento");
            }
        });
        me.cmp_item_municiones.btn.on('click', function () {
            if (me.cmp_item_municiones.componente.getValue() != null) {
                me.AgregarArmamento(me.cbx_municiones.datos[0]);
            }
            else {
                Ext.Msg.alert("Aviso", "Seleccione un Armamento");
            }
        });
        me.cmp_logistico.btn.on('click', function () {
            if (me.cmp_logistico.componente.getValue() != null) {
                me.AgregarLogistico(me.cbx_logistico.datos[0]);
            }
            else {
                Ext.Msg.alert("Aviso", "Seleccione un Armamento");
            }
        });
    },
    AgregarArmamento : function(rec){
        var me = this;
        if (!me.gridDetalle.getStore().existeRecord('CODIGO', rec.get('CODIGO'))) {
            var rec = Ext.create('App.Model.Pedidos.DetallesPedidos', {
                CODIGO: rec.get('CODIGO'),
                CATEGORIA: rec.get('CATEGORIA'),
                ID_MAT_BELICO: rec.get('ID_MAT_BELICO'),
                CANTIDAD_SOLICITADA: 1
            });
            me.gridDetalle.getStore().add(rec);
        }
        else {
            Ext.Msg.alert("Error", "Ya existe ese Armamento y/o Municion");
        }

    },
    AgregarLogistico: function (rec) {
        var me = this;
        if (!me.gridDetalle.getStore().existeRecord('CODIGO', rec.get('CODIGO'))) {
            var rec = Ext.create('App.Model.Pedidos.DetallesPedidos', {
                CODIGO: rec.get('CODIGO'),
                CATEGORIA: 'MAT_LOGISTICO',
                ID_MAT_LOGISTICO: rec.get('ID_MAT_LOGISTICO'),
                CANTIDAD_SOLICITADA: 1
            });
            me.gridDetalle.getStore().add(rec);
        }
        else {
            Ext.Msg.alert("Error", "Ya existe ese Material Logistico.");
        }

    }
});
