Ext.define("App.View.Materiales.FormConsultaArmamento", {
    extend: "App.Config.Abstract.Form",
    //title: "Datos de Armamento",
    
    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        
        this.callParent(arguments);
    },
    CargarGridComponentes: function () {
        var me = this;
        me.gridCmp = Ext.create("App.View.Materiales.GridComponentesArmamentos", {
            title: 'Componentes',
            width: 490,
            height: 200,
            colspan : 2

        });
    },
    CargarFormulario: function () {
        var me = this;
        me.CargarGridComponentes();
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ITEM",
            hidden: true,
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "CODIGO",
            colspan : 2,
            readOnly : true
        });
        me.txt_nro_fusil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Fusil",
            name: "NRO_FUSIL",
            readOnly: true
        });
        me.txt_fabricacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fabricacion",
            name: "FABRICACION",
            readOnly: true
        });
        me.txt_calibracion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Calibre",
            name: "CALIBRE",
            readOnly: true
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            width: 480,
            colspan : 2,
            readOnly: true
        });
        me.txt_fecha_dotacion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Dotacion",
            name: "FECHA_DOTACION",
            readOnly: true
        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            readOnly: true
        });
        me.txt_observaciones = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            readOnly: true
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO1",
            colspan : 2,
            readOnly: true
        });
        me.items = [
        me.txt_id,
        me.txt_codigo,
        me.txt_nro_fusil,
        me.txt_fabricacion,
        me.txt_calibre,
        me.txt_nombre,
        me.txt_fecha_dotacion,
        me.txt_tipo,
        me.txt_observaciones,
        me.txt_estado,
        me.gridCmp
        ];
    },
});
