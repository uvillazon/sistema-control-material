Ext.define("App.View.Materiales.FormConsultaMatLogistico", {
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
            readOnly : true
        });
        me.txt_nro_serie = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Serie",
            name: "NRO_SERIE",
            readOnly: true
        });
        me.txt_fabricacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fabricante",
            name: "FABRICANTE",
            readOnly: true
        });
        me.txt_tipo_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Componente",
            name: "TIPO_COMPONENTE",
            readOnly: true
        });
        me.txt_aeronave = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Aeronave",
            name: "AERONAVE",
            readOnly: true
        });
        me.txt_grupo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Grupo",
            name: "GRUPO",
            readOnly: true
        });
        me.txt_nro_parte = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Parte",
            name: "NRO_PARTE",
            readOnly: true
        });
        me.txt_fecha_dotacion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Dotacion",
            name: "FECHA_DOTACION",
            readOnly: true
        });
        me.txt_ciclo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ciclo de Vida",
            name: "CICLO_VIDA",
            readOnly: true
        });
        me.txt_hora = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora de vida",
            name: "HORA_VIDA",
            readOnly: true
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            readOnly: true
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            colspan : 2,
            readOnly: true
        });
        me.items = [
        me.txt_id,
        me.txt_codigo,
        me.txt_nro_serie,
        me.txt_fabricacion,
        me.txt_tipo_cmp,
        me.txt_aeronave,
        me.txt_grupo,
        me.txt_nro_parte,
        me.txt_fecha_dotacion,
        me.txt_ciclo,
        me.txt_hora,
        me.txt_descripcion,
        me.txt_estado
        ];
    },
});
