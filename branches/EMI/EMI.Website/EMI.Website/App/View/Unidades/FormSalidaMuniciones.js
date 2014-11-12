Ext.define("App.View.Unidades.FormSalidaMuniciones", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Verificacion Armamento",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        me.EventosForm();
        this.callParent(arguments);
    },
    EventosForm: function () {
        var me = this;
        me.cmp_municiones.btn.on('click', function () {
            if (me.cbx_municiones.getValue() != null) {
                me.AgregarMunicionSalida(me.cbx_municiones.datos[0]);
            }
            else {
                Ext.Msg.alert("Aviso", "Seleccione primero una municion");
            }

        });
    },
    CargarFormulario: function () {
        var me = this;
        me.store_municiones = Ext.create("App.Store.Armamentos.MunicionesUnidad");
        me.store_municiones.setExtraParams({ ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD });
        me.cbx_municiones = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Municiones",
            name: "ID_MAT_BELICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_BELICO',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {CALIBRE}" },
            store: me.store_municiones,
        });
        me.cmp_municiones = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Municion',
            btn_iconCls: 'add',
            colspan: 2,
            componente: me.cbx_municiones
        });
        me.gridSalida = Ext.create("App.View.Unidades.GridSalidas", {
            width: 600,
            title: 'Salida de Municiones',
            height: 300
        });
        me.items = [
            me.cmp_municiones,
            me.gridSalida
        ];
    },

    AgregarMunicionSalida: function (rec) {
        var me = this;
        var rec = Ext.create('App.Model.Armamentos.SalidaMuniciones', {
            CODIGO: rec.get('CODIGO'),
            CALIBRE: rec.get('CALIBRE'),
            ID_MAT_BELICO: rec.get('ID_MAT_BELICO'),
            SALIDA: 1,
            TIPO: rec.get('TIPO'),
            ID_MUNICION_UNIDAD: rec.get('ID_MUNICION_UNIDAD'),
            FECHA_DOTACION: rec.get('FECHA_DOTACION'),
            FABRICACION: rec.get('FABRICACION'),
            CANTIDAD_DISPONIBLE: rec.get('CANTIDAD_DISPONIBLE'),
            //OBSERVACION: 'MOTIVO SALIDA'
        });
        me.gridSalida.getStore().add(rec);

    },
});
