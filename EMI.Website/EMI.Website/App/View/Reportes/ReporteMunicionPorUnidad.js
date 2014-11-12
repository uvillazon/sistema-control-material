Ext.define("App.View.Reportes.ReporteMunicionPorUnidad", {
    extend: "App.Config.Abstract.Window",
    title: "Reporte Armamento P/Unidad",
    botones: true,
    textGuardar : 'Generar Reporte',
    initComponent: function () {
        var me = this;
        me.CargarFormulario();

        
        this.callParent(arguments);
        me.EventosForm();
    },
    CargarFormulario: function () {
        var me = this;
       
        me.items = [
        me.CargarFormularioReporte()
        ];
    },
    CargarFormularioReporte: function () {
        var me = this;
        me.form = Ext.create("App.Config.Abstract.Form", { botones: false, icono: false, columns: 1 });

        me.store_item_armamento = Ext.create("App.Store.Armamentos.MunicionesUnidad");
        
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Municion",
            name: "ID_MUNICION_UNIDAD",
            displayField: 'CALIBRE',
            valueField: 'ID_MUNICION_UNIDAD',
            width: 400,
            disabled : true,
            textoTpl: function () { return "{CODIGO} - {CALIBRE}" },
            store: me.store_item_armamento,
        });

        me.store_unidad = Ext.create('App.Store.Unidades.Unidades');
        me.cbx_unidad = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Unidad",
            name: "ID_UNIDAD",
            displayField: 'UNIDAD',
            valueField: 'ID_UNIDAD',
            width: 400,
            textoTpl: function () { return "{UNIDAD} - {DESCRIPCION}" },
            store: me.store_unidad,
        });
        me.cbx_unidad.on('select', function (cmb, record) {
            me.store_item_armamento.setExtraParams({ ID_UNIDAD: record[0].get('ID_UNIDAD') });
            me.store_item_armamento.load();
            me.cbx_item_armamento.setDisabled(false);
        });
        me.form.add([me.cbx_unidad, me.cbx_item_armamento]);
        return me.form;
    },
    EventosForm: function () {
        var me = this;
        me.btn_guardar.on('click', function () {
            //me.close();
            if (me.form.isValid()) {
                window.open(Constantes.HOST + 'Reportes/ReporteMuniciones.aspx?ID_MUNICION_UNIDAD=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + me.cbx_unidad.getValue());
                //window.open(Constantes.HOST + 'Reportes/ReporteMuniciones.aspx?ID_MUNICION_UNIDAD=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD);
                me.close();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar Formulario");
            }
        });
    }
});
