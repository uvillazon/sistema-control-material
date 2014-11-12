Ext.define("App.View.Reportes.ReporteMunicion", {
    extend: "App.Config.Abstract.Window",
    title: "Reporte Armamento",
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
        var form = Ext.create("App.Config.Abstract.Form", { botones: false  , icono : false});

        me.store_item_armamento =Ext.create("App.Store.Armamentos.MunicionesUnidad");
        me.store_item_armamento.setExtraParams({ ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD });
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Municion",
            name: "ID_MUNICION_UNIDAD",
            displayField: 'CALIBRE',
            valueField: 'ID_MUNICION_UNIDAD',
            width: 400,
            textoTpl: function () { return "{CALIBRE} - {CODIGO}" },
            store: me.store_item_armamento,
        });

        form.add(me.cbx_item_armamento);
        return form;
    },
    EventosForm: function () {
        var me = this;
        me.btn_guardar.on('click', function () {
            //me.close();
            window.open(Constantes.HOST + 'Reportes/ReporteMuniciones.aspx?ID_MUNICION_UNIDAD=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD);
            me.close();
        });
    }
});
