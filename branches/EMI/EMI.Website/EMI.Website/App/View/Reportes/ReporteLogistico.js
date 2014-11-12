Ext.define("App.View.Reportes.ReporteLogistico", {
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

        me.store_item_armamento = Ext.create("App.Store.Logisticos.MatLogisticos");
        //me.store_item_armamento.setExtraParams({ CATEGORIA: 'ARMAMENTO' });
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Mat. Logistico",
            name: "ID_MAT_LOGISTICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_LOGISTICO',
            width: 400,
            textoTpl: function () { return "{CODIGO} - {AERONAVE} Cant. Disp. {CANTIDAD_DISPONIBLE}" },
            store: me.store_item_armamento,
        });

        form.add(me.cbx_item_armamento);
        return form;
    },
    EventosForm: function () {
        var me = this;
        me.btn_guardar.on('click', function () {
            //me.close();
            window.open(Constantes.HOST + 'Reportes/ReporteLogistico.aspx?ID_MAT_LOGISTICO=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD);
            me.close();
        });
    }
});
