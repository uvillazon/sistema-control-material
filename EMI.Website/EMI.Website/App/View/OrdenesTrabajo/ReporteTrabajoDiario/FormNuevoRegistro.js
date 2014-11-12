Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.FormNuevoRegistro', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formnuevoregistro',
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        this.callParent(arguments);
    },
    buildItems: function () {
        var poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'POSTE:',
            emptyText: 'Escribir o elegir...',
            itemId: 'combo_poste',
            name: "COD_POSTE",
            labelAlign: 'right',
            displayField: 'COD_POSTE',
            valueField: 'ID_POSTE',
            queryMode: 'local',
            store: Ext.create('App.store.Postes.Postes'),
            textoTpl: function () {
                return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_POSTE}</div><div class="desc">{DESC_TIPO}</div></div>';
            },
            forceSelection: true,
            width: 300,
            flex: 1,
            disabledCls: null,
            readOnlyCls: null,
        });
        var btnPoste = Ext.create('Ext.button.Button', {
            text: '',
            itemId: 'btnposte',
            scale: 'small',
            iconCls: 'wrench',
            margin: '0px 0px 0px 3px',
            flex: 1
        });
        var conductor = Ext.create('App.Config.Componente.ComboAutoBase', {
            fieldLabel: 'CONDUCTOR:',
            name: 'COD_CONDUCTOR',
            itemId: 'combo_conductor',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_CONDUCTOR',
            valueField: 'ID_CONDUCTOR',
            queryMode: 'local',
            forceSelection: true,
            store: Ext.create('App.store.Postes.Conductores'),
            textoTpl: function () {
                return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_CONDUCTOR}</div><div class="desc">{DESC_TIPO}</div></div>';
            },
            flex: 1,
            width: 300,
            margin: '0px 0px 0px 0px',
            disabledCls: null,
            readOnlyCls: null,
        });

        var cabeceraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 0px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [poste, btnPoste, conductor]
        };

        var uc = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'COD. UC.:',
            name: 'COD_UC',
            itemId: 'combo_uc',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_UC',
            valueField: 'ID_UC',
            store: Ext.create('App.store.Postes.UnidadesConstructivas'),
            forceSelection: true,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No exiten Unidades Constructivas',
                getInnerTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_UC} - {COD_REA}</div><div class="desc">{DESCRIPCION}</div></div>';
                }
            },
            width: 290,
            margin: '0 0 0 10',
            disabled: true,
            flex: 1,
        });
        var btnUc = Ext.create('Ext.button.Button', {
            text: '',
            itemId: 'btnuc',
            scale: 'small',
            iconCls: 'wrench',
            margin: '0px 0px 0px 3px',
            flex: 1,
            disable: true,
        });

        var formacion = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'FORMACION:',
            name: 'FORMACION',
            itemId: 'fieldformacion',
            width: 290,
            margin: '0px 0px 0px 10px',
            emptyText: 'Formacion del conductor...',
            labelAlign: 'right',
            displayField: 'FORMACION',
            disabled: true,
            readOnly: true,
            flex: 1,
        });

        var nivel = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'NIVEL:',
            itemId: 'fieldnivel',
            name: 'NIVEL',
            margin: '0px 0px 0px 0px',
            width: 200,
            allowNegative: false,
            minValue: 0,
            allowBlank: false,
            labelAlign: 'right',
            flex: 1
        });

        var descripcionconductor = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'DESCRIPCION:',
            itemId: 'desc_tipo',
            name: 'DESC_TIPO',
            width: 290,
            margin: '0px 0px 0px 125px',
            emptyText: 'Descripcion del conductor...',
            labelAlign: 'right',
            displayField: 'DESC_TIPO',
            disabled: true,
            readOnly: true,
            flex: 1,
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 0px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [uc, btnUc, formacion]
        };

        var codigoman = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'COD.MANT:',
            afterLabelTextTpl: Constantes.REQUERIDO,
            name: 'COD_MAN',
            itemId: 'combocodman',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_MAN',
            valueField: 'ID_COD_MAN',
            queryMode: 'local',
            forceSelection: true,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No exiten Codigos de Mantenimiento.',
                getInnerTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_MAN}</div><div class="desc">{DESCRIP_MAN}</div></div>';
                }
            },
            width: 290,
            disabled: true,
            flex: 1,
        });

        var codigosol = Ext.widget('gridcodigossolucion', {
            margin: '0 0 0 100',
            disabled: true,
            flex: 3,
        });

        var segundaFilaA = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 10px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [nivel, descripcionconductor]
        };

        var segundaFilaB = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 10px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [codigoman, codigosol]
        };

        var materialsol = Ext.widget('griddetalletrabajodiario', {
            flex: 1,
        });

        var terceraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 22px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [materialsol],
        };

        return [cabeceraFila, primeraFila, segundaFilaA, segundaFilaB, terceraFila]
    }
});
