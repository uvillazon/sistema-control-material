Ext.define("App.View.Pedidos.FormAutorizacion", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario de Autorizacion",
    initComponent: function () {
        var me = this;
        //alert("asdasdadad");
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.formConsulta = Ext.create("App.View.Pedidos.FormConsultaPedido", { botones: false ,colspan : 2});

        me.txt_observarcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "Observacion",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //readOnly: true
        });

        me.items = [
        me.formConsulta,
        me.txt_observarcion
        //me.txt_ubicacion,
        //me.num_cod_tipo,
        //me.txt_desc_tipo,
        //me.dat_fecha_oper,
        //me.txt_estado,
        ];
    }
   
});
