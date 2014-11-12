Ext.define("App.View.Unidades.FormVerificacionMatLogistico", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Verificacion Material Logistico",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        me.EventosFormulario();
        this.callParent(arguments);
    },
    EventosFormulario : function(){
        var me = this;
        me.num_hora_vida_actual.on('change', function (num,nue,vie) {
            var valor = me.formMatLogistico.txt_hora.getValue();
            if (nue >= valor) {
                Ext.Msg.alert("Error", "Hora de vida actual no puede ser mayor o igual a la hora de vida anterior");
                num.reset();
            }
        });
    },
    CargarFormulario: function () {
        var me = this;
        me.formMatLogistico = Ext.create("App.View.Materiales.FormConsultaMatLogistico", {
            colspan: 2,
            icono: false,
            botones: false
        });

        me.num_hora_vida_actual = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Hora Vida Actual",
            name: "VALOR_NUEVO",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.dat_fecha_verificacion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Verificacion",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txta_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            colspan: 2,
            maxLength: 250,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        //txt_hora
        me.items = [me.formMatLogistico,
            me.num_hora_vida_actual,
            me.dat_fecha_verificacion,
            me.txta_observacion
        ];
    },
});
