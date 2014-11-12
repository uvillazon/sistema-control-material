Ext.define("App.View.Materiales.FormArmamento", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Armamento",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        me.EventosForm();
        this.callParent(arguments);
    },
    CargarGridComponentes: function () {
        var me = this;
        var storeCmp = Ext.create('App.Store.Armamentos.PartesArmamento');
        me.gridCmp = Ext.create("Ext.grid.Panel", {
            title: 'Componentes',
            width: 490,
            store : storeCmp,
            height: 200,

            colspan : 2,
            columns: [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Descripcion", width: 300, sortable: true, dataIndex: "DESCRIPCION", align: 'center' },
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
             }

            ],

        });
    },
    CargarFormulario: function () {
        var me = this;
        me.CargarGridComponentes();
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MAT_BELICO",
            hidden: true,
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "CODIGO",
            colspan: 2,
            maxLength: 10,
            ///las dos propiedades son para obligar que el campo es requerido
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_fabricacion = Ext.create("App.Store.Listas.StoreLista");
        me.store_fabricacion.setExtraParam('ID_LISTA', Lista.Buscar('FABRICACION'));
        me.cbx_fabricacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Fabricacion",
            name: "FABRICACION",
            store: me.store_fabricacion,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.store_calibracion = Ext.create("App.Store.Listas.StoreLista");
        me.store_calibracion.setExtraParam('ID_LISTA', Lista.Buscar('CALIBRACION'));
        me.cbx_calibracion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Calibre",
            name: "CALIBRE",
            store: me.store_calibracion,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });


        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            colspan: 2,
            width : 480,
            maxLength: 150,
            ///las dos propiedades son para obligar que el campo es requerido
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.dat_fecha_dotacion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Dotacion",
            name: "FECHA_DOTACION",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.store_tipo = Ext.create("App.Store.Listas.StoreLista");
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_MAT_BELICO'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            store: me.store_tipo,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txta_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            colspan: 2,
            maxLength: 250
        });
        me.store_partes = Ext.create("App.Store.Listas.StoreLista");
        me.store_partes.setExtraParam('ID_LISTA', Lista.Buscar('COMP_ARMAMENTO'));
        me.cbx_partes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Partes",
            name: "PARTES",
            store: me.store_partes,
            selectOnFocus: true,
           
        });
        me.cmp_partes = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Parte',
            btn_iconCls: 'add',
            colspan: 2,
            componente: me.cbx_partes
        });


        me.items = [
        me.txt_id,
        me.txt_codigo,
        me.cbx_fabricacion,
        me.cbx_calibracion,
        me.txt_nombre,
        me.cbx_tipo,
        me.dat_fecha_dotacion,
        me.txta_observacion,
        me.cmp_partes,
        me.gridCmp
        ];
    },
    EventosForm: function () {
        var me = this;
        me.cmp_partes.btn.on('click', function () {
            //alert(me.cbx_partes.getValue());
            if (me.cbx_partes.getValue() != null) {
                if (!me.gridCmp.getStore().existeRecord('NOMBRE', me.cbx_partes.getValue())) {
                    var rec = Ext.create('App.Model.Armamentos.PartesArmamento', {
                        NOMBRE: me.cbx_partes.getValue(),
                        DESCRIPCION: me.cbx_partes.getValue()
                    });
                    me.gridCmp.getStore().add(rec);
                }
                else {
                    Ext.Msg.alert("Error", "Parte Existente.");
                }
            };
        });
    }
});
