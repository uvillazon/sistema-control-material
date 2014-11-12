﻿Ext.define("App.View.Reportes.ReporteLogisticoPorUnidad", {
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
        me.form.add([me.cbx_item_armamento , me.cbx_unidad]);
        return me.form;
    },
    EventosForm: function () {
        var me = this;
        me.btn_guardar.on('click', function () {
            //me.close();
            if (me.form.isValid()) {
                window.open(Constantes.HOST + 'Reportes/ReporteLogistico.aspx?ID_MAT_LOGISTICO=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + me.cbx_unidad.getValue());
                me.close();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar Formulario");
            }
        });
    }
});
