Ext.define("App.View.Materiales.FormMaterial", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Materiales",
    
    initComponent: function () {
        var me = this;
        me.CargarFormulario();
        this.callParent(arguments);
    },
    CargarFormulario: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MATERIAL",
            hidden: true,
        });
        me.txt_cod_maaterial = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo Material",
            name: "CODIGO_MATERIAL",
            maxLength: 20,
            ///las dos propiedades son para obligar que el campo es requerido
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_armamento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Armamento",
            name: "ARMAMENTO",
            //width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //maxLength: 8,
        });
        me.txt_calibre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Calibre",
            name: "CALIBRE",
            //width: 400,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_fabricacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fabricacion",
            name: "FABRICACION",
            //width: 480,
            colspan: 2,
            maxLength: 100,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.dat_fecha_dotacion = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Dotacion",
            name: "FECHA_DOTACION",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        //me.num_cod_tipo = Ext.create("App.Config.Componente.NumberFieldBase", {
        //    fieldLabel: "Cod Tipo",
        //    name: "COD_TIPO",
        //    width: 240,
        //    maxLength: 5,
        //    allowNegative: false,
        //    allowDecimals: false,
        //    afterLabelTextTpl: Constantes.REQUERIDO,
        //    allowBlank: false,
        //});
        //me.txt_desc_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
        //    fieldLabel: "Descripcion Tipo",
        //    name: "DESC_TIPO",
        //    width: 240,
        //    maxLength: 30,
        //});
        //me.dat_fecha_oper = Ext.create("App.Config.Componente.DateFieldBase", {
        //    opcion: "sin fecha",
        //    fieldLabel: "Fecha Operacion",
        //    name: "FECHA_OPER",
        //    width: 240,
        //    afterLabelTextTpl: Constantes.REQUERIDO,
        //    allowBlank: false,
        //});
        //me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
        //    fieldLabel: "Estado",
        //    name: "ESTADO",
        //    width: 240,
        //    maxLength: 15,
        //    afterLabelTextTpl: Constantes.REQUERIDO,
        //    allowBlank: false,
        //});
        me.items = [
        me.txt_id,
        me.txt_cod_maaterial,
        me.txt_armamento,
        me.txt_calibre,
        me.txt_fabricacion,
        me.dat_fecha_dotacion
        //me.txt_ubicacion,
        //me.num_cod_tipo,
        //me.txt_desc_tipo,
        //me.dat_fecha_oper,
        //me.txt_estado,
        ];
    },
});
