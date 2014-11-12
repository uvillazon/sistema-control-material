Ext.define("App.View.Unidades.FormVerificacionArmamento", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Verificacion Armamento",

    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.formArmamento = Ext.create("App.View.Materiales.FormConsultaArmamento", {
            colspan: 2,
            icono: false,
            botones: false
        });

        //me.store_estado = Ext.create("App.Store.Listas.StoreLista");
        //me.store_estado.setExtraParam('ID_LISTA', Lista.Buscar('ESTADO_ARMAMENTO'));
        me.cbx_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            //store: me.store_estado,
            store : ["NO OPERABLE","PERDIDO"],
            colspan: 1,
            value : 'NO OPERABLE',
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Verificacion",
            name: "FECHA_BAJA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txta_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION_BAJA",
            colspan: 2,
            maxLength: 250,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.items = [me.formArmamento,
            me.cbx_estado,
            me.dat_fecha,
            me.txta_observacion
        ];
    },
});
