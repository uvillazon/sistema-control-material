Ext.define("App.View.Reportes.ReportePedido", {
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
        me.form = Ext.create("App.Config.Abstract.Form", { botones: false  , icono : false});
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
        me.form.add([me.date_fechaIni, me.date_fechaFin]);
        return me.form;
    },
    EventosForm: function () {
        var me = this;
        
            me.btn_guardar.on('click', function () {
                //me.close();
                if (me.form.isValid()) {
                    window.open(Constantes.HOST + 'Reportes/ReportePedidos.aspx?FECHA_INI=' + me.date_fechaIni.getSubmitValue() + '&FECHA_FIN=' + me.date_fechaFin.getSubmitValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD);
                    me.close();
                }
                else {
                    Ext.Msg.alert("Error", "Falta Completar formulario");
                }
            });
        
        
    }
});
