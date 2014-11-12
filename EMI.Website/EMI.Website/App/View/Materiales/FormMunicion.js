Ext.define("App.View.Materiales.FormMunicion", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Municion",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
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
        
        me.num_cantidad_disponible = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad Disponible",
            name: "CANTIDAD_DISPONIBLE",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });

        me.items = [
        me.txt_id,
        me.txt_codigo,
        me.cbx_fabricacion,
        me.cbx_calibracion,
        //me.txt_nombre,
        me.cbx_tipo,
        me.dat_fecha_dotacion,
        me.txta_observacion,
        me.num_cantidad_disponible,
        ];
    },
});
