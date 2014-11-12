Ext.define("App.View.Reportes.ReporteArmamento", {
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
        me.btn3 = Funciones.CrearMenu('btn_CrearMaterial', 'Generar Grafico', 'chart_bar', null, null, this);
        me.items = [
        me.CargarFormularioReporte()
        ];
    },
    CargarFormularioReporte: function () {
        var me = this;
        var form = Ext.create("App.Config.Abstract.Form", { botones: false  , icono : false});

        me.store_item_armamento = Ext.create('App.Store.Armamentos.MatBelicos');
        me.store_item_armamento.setExtraParams({ CATEGORIA: 'ARMAMENTO', Unidades: [Constantes.USUARIO.ID_UNIDAD] });
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Items Armamento",
            name: "ID_MAT_BELICO",
            displayField: 'CODIGO',
            valueField: 'ID_MAT_BELICO',
            width: 400,
            textoTpl: function () { return "{CODIGO} - {NOMBRE} " },
            store: me.store_item_armamento,
        });

        form.add(me.cbx_item_armamento);
        return form;
    },
    EventosForm: function () {
        var me = this;
        me.btn_guardar.on('click', function () {
            //me.close();
            window.open(Constantes.HOST + 'Reportes/ReporteArmamento.aspx?ID_MAT_BELICO=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD);
            me.close();
        });
        me.btn3.on('click', function () {
            //me.close();
            window.open(Constantes.HOST + 'Reportes/ReporteArmamentoGraf.aspx?ID_MAT_BELICO=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD);
            me.close();
        });
    }
});
