Ext.define("App.View.Principal.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormConstrasena") {
            me.title = "Cambio de Contraseña";
            me.CargarFormConstrasena();
            //me.EventosFormValeIncremental();

        }
        //else if (me.opcion == "FormValeCambio") {
        //    me.title = "";
        //    me.columns = 3,
        //    me.CargarFormValeCambio();
        //    me.EventosFormValeCambio();
        //}
        else {
            alert("Seleccione alguna Opciones");
        }
        this.callParent(arguments);
    },
    CargarFormConstrasena: function () {
        var me = this;
        me.defaults = {
            width: 300,
            inputType: 'password',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        };
        Ext.create("App.Config.ux.PasswordStrength");
        me.defaultType = 'textfield';
        me.items=  [
            {
                fieldLabel: 'Nueva Contraseña',
                name: 'contrasena',
                plugins    : ["passwordstrength"]  ,
                itemId: 'contrasena'
            },
            {
                fieldLabel: 'Confirmar Contraseña',
                name: 'pass-cfrm',
                vtype: 'password',
                plugins: ["passwordstrength"],
                initialPassField: 'contrasena' // id of the initial password field
            }
        ]
    }   
});
