Ext.define("App.View.Materiales.FormItemArmamento", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Armamento",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        me.EventoForm();
        this.callParent(arguments);
    },
    CargarGridComponentes: function () {
        var me = this;
        var storeCmp = Ext.create('App.Store.Armamentos.CmpArmamentos');
        me.gridCmp = Ext.create("Ext.grid.Panel", {
            title: 'Componentes',
            width: 490,
            store : storeCmp,
            height: 200,
            colspan : 2,
            columns: [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 90, sortable: true, dataIndex: 'CODIGO', align: 'center' },
            { header: "Armamento", width: 90, sortable: true, dataIndex: 'ARMAMENTO', align: 'center' },
            { header: "Descripcion", width: 200, sortable: true, dataIndex: "NOMBRE", align: 'center' }

            ],

        });
    },
    CargarFormulario: function () {
        var me = this;
        me.CargarGridComponentes();
        me.storeparte =  Ext.create('App.Store.Armamentos.PartesArmamento');
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ITEM",
            hidden: true,
        });
        me.txt_nro_fusil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Fusil",
            name: "NRO_FUSIL",
            maxLength: 20,
            colspan : 2,
            ///las dos propiedades son para obligar que el campo es requerido
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_mat_belico = Ext.create('App.Store.Armamentos.MatBelicos');
        me.store_mat_belico.setExtraParams({CATEGORIA : 'ARMAMENTO'});
        me.cbx_mat_belico = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Codigo",
            name: "ID_MAT_BELICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_BELICO',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {FABRICACION} - {NOMBRE} - {TIPO}" },
            store: me.store_mat_belico,
        });

        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            value: 'OPERABLE',
            readOnly: true
        });

        me.items = [
        me.txt_id,
        me.txt_nro_fusil,
        me.cbx_mat_belico,
        me.txt_estado,
        me.gridCmp
        //me.txt_ubicacion,
        //me.num_cod_tipo,
        //me.txt_desc_tipo,
        //me.dat_fecha_oper,
        //me.txt_estado,
        ];
    },
    EventoForm: function () {
        var me = this;
        me.cbx_mat_belico.on('select', function (cbx, rec) {
            //alert(cbx.getValue());
            me.codigo = rec[0].get('CODIGO');
            //alert(me.codigo);
            me.storeparte.setExtraParams({ ID_MAT_BELICO: rec[0].get('ID_MAT_BELICO') });
            me.storeparte.load();
            
            
        });
        me.storeparte.on('load', function ( str, records, successful, eOpts) {
            me.gridCmp.getStore().removeAll();
            str.each(function (record) {
                var rec = Ext.create('App.Model.Armamentos.CmpArmamentos', {
                    CODIGO: me.txt_nro_fusil.getValue(),
                    NOMBRE: record.get('NOMBRE'),
                    ARMAMENTO: me.codigo
                });
                me.gridCmp.getStore().add(rec);

            });
        });
        me.txt_nro_fusil.on('change', function ( txt, newValue, oldValue, eOpts) {
            me.gridCmp.getStore().each(function (record) {
                record.set('CODIGO', newValue);
            });
        });
    }
});
