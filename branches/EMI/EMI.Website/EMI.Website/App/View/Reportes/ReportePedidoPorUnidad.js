Ext.define("App.View.Reportes.ReportePedidoPorUnidad", {
    extend: "App.Config.Abstract.Window",
    title: "Reporte General",
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
        me.form = Ext.create("App.Config.Abstract.Form", { botones: false  , icono : false , columns : 1});
        me.date_fechaIni = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha inicio",
            name: "FECHA_INI",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.date_fechaFin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Fin",
            name: "FECHA_FIN",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_unidad = Ext.create('App.Store.Unidades.Unidades');
        me.cbx_unidad = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Unidad",
            name: "ID_UNIDAD",
            displayField: 'UNIDAD',
            valueField: 'ID_UNIDAD',
            allowBlank: false,
            width: 400,
            textoTpl: function () { return "{UNIDAD} - {DESCRIPCION}" },
            store: me.store_unidad,
        });
        me.form.add([me.date_fechaIni, me.date_fechaFin, me.cbx_unidad]);
        return me.form;
    },
    EventosForm: function () {
        var me = this;
        
            me.btn_guardar.on('click', function () {
                //me.close();
                if (me.form.isValid()) {
                    window.open(Constantes.HOST + 'Reportes/ReportePedidos.aspx?FECHA_INI=' + me.date_fechaIni.getSubmitValue() + '&FECHA_FIN=' + me.date_fechaFin.getSubmitValue() + '&ID_UNIDAD=' + me.cbx_unidad.getValue());
                    me.close();
                }
                else {
                    Ext.Msg.alert("Error", "Falta Completar formulario");
                }
            });
        
        
    }
});
