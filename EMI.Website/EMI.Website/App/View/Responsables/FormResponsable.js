Ext.define("App.View.Responsables.FormResponsable", {
    extend: "App.Config.Abstract.Form",
    title: "Datos del Responsable",
    cargarStores: true,
    initComponent: function () {
        var me = this;
        if (me.cargarStores) {
            me.CargarStore();
            me.CargarComponentes();
            me.EventosFormResponsable();
        }
        else {
            me.CargarComponentes();
        }
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;

        me.store_area = Ext.create("App.Store.Listas.StoreLista");
        me.store_area.setExtraParam('ID_LISTA', Lista.Buscar('AREA'));

        me.store_unidad = Ext.create("App.Store.Listas.StoreLista");
        me.store_unidad.setExtraParam('ID_LISTA', Lista.Buscar('UNIDAD_REPORTA'));

        me.store_tipo = Ext.create("App.Store.Listas.StoreLista");
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_CTTA'));

    },
    EventosFormResponsable : function(){
        var me = this;
        me.cbx_tipo.on('select', function (cbx, record) {
            //alert(cbx.getValue());
            if (cbx.getValue() == "C") {
                me.cbx_unidad.setValue("CONTRATISTA");
                me.cbx_unidad.setReadOnly(true);
                me.txt_empresa.reset();
                me.txt_empresa.setReadOnly(false);

            }
            else {
                me.txt_empresa.setValue("ELFEC SA.");
                me.txt_empresa.setReadOnly(true);
                me.cbx_unidad.setReadOnly(false);
            }
        });
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_RESP",
            hidden: true,
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            width: 480,
            maxLength: 30,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_apellido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Apellidos",
            name: "APELLIDO",
            width: 480,
            colspan: 2,
            maxLength: 30,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_unidad = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Unidad",
            name: "UNIDAD",
            width: 240,
            store: me.store_unidad,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_area = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Area",
            name: "AREA",
            width: 240,
            store: me.store_area,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.cbx_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            maxLength: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            value: 'A',
            store: ["A", "I"],
            allowBlank: false,
            colspan: 2,
        });
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            width: 240,
            colspan: 2,
            store: me.store_tipo,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_empresa = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Empresa",
            name: "EMPRESA_CTTA",
            width: 480,
            colspan: 2,
            maxLength: 30,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.gridRes = Ext.create("App.View.Responsables.Grids", {
            opcion: 'GridResponsabilidades',
            colspan: 2,
            height: 300,
            //width : 
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearResponsabilidad', 'Crear', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_EliminarResponsabilidad', 'Eliminar', Constantes.ICONO_BAJA, me.EventosBoton, me.toolbar, this);
        me.gridRes.addDocked(me.toolbar, 1);

        me.items = [
        me.txt_id,
        me.txt_nombre,
        me.txt_apellido,
        me.cbx_tipo,
        me.txt_empresa,
        me.cbx_unidad,
        me.cbx_area,
        //me.chx_privilegios,
        me.cbx_estado,
        me.gridRes
        //me.cbx_responsabilidades
        ];

    },
    EventosBoton: function (btn) {
        var me = this;
    },
    CargarDatos: function (record) {
        var me = this;
        me.record = record;
        me.getForm().reset();
        me.BloquearFormulario();
        me.getForm().loadRecord(record);
        me.gridRes.getStore().setExtraParam('ID_RESP', record.get('ID_RESP'));
        me.gridRes.getStore().load();
    }
});
