Ext.define('App.View.OrdenesTrabajo.FormOTProyecto', {
    alternateClassName: 'App.view.OrdenesTrabajo.FormOTProyecto',
    extend: 'Ext.form.Panel',
    alias: 'widget.formotproyecto',
    defaultType: 'textfield',
    initComponent: function () {
        var me = this;
        me.items = me.construirItems();
        me.callParent();
    },

    construirItems: function () {
        var storeClientes = Ext.create('App.store.Erp.Clientes');
        var clientes = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cliente:',
            emptyText: 'Id Cliente o Apellido',
            name: "IDCLIENTE",
            labelAlign: 'right',
            displayField: 'NOMBRE_COMPLETO',
            valueField: 'IDCLIENTE',
            store: storeClientes.load(),
            textoTpl: function () {
                return '<div class="search-item" style="background-image:url({logo})"><div class="name">{APELLIDOS} {NOMBRES}</div><div class="desc">{RAZON_SOCIAL}</div></div>';
            },
            forceSelection: true,
            allowBlank: false,
            width: 290,
            flex: 1,
            disabledCls: null,
            readOnlyCls: null,
            enableKeyEvents: true
        });

        var nombre = Ext.create('Ext.form.field.Text', {
            name: 'NOMBRES',
            hidden: true,
        });

        var apellido = Ext.create('Ext.form.field.Text', {
            name: 'APELLIDOS',
            hidden: true,
        });

        var direccion = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Direccion:',
            labelAlign: 'right',
            name: 'CALLE',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            width: 290,
            flex: 1,
        });

        var telefono = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Telefono:',
            labelAlign: 'right',
            name: 'TELEFONOS',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            width: 290,
            flex: 1,
        });

        var nit = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'NIT/CI:',
            labelAlign: 'right',
            name: 'NIT',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            width: 290,
            flex: 1,
        });

        var storeAreaSistema = Ext.create('App.store.Erp.AreaSistema');
        var zona = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Zona:',
            emptyText: 'Id Area o Sistema',
            name: "AREA",
            labelAlign: 'right',
            displayField: 'MN_SISTEMA',
            valueField: 'AREA',
            allowBlank: false,
            store: storeAreaSistema.load(),
            textoTpl: function () {
                return '<div class="search-item" style="background-image:url({logo})"><div class="name">{MN_SISTEMA} - {AREA}:{SISTEMA}</div><div class="desc">{SUBSISTEMA} - {DESCRIPCION}</div></div>';
            },
            forceSelection: true,
            width: 270,
            flex: 1,
            disabledCls: null,
            readOnlyCls: null,
            enableKeyEvents: true
        });

        var descripcion = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Descripcion:',
            labelAlign: 'right',
            name: 'DESCRIPCION',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });

        var sistema = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Sistema:',
            labelAlign: 'right',
            name: 'SISTEMA',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });

        var subsistema = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Subsistema:',
            labelAlign: 'right',
            name: 'SUBSISTEMA',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });

        var mn_sistema = Ext.create('Ext.form.field.Text', {
            name: 'MN_SISTEMA',
            hidden: true,
        });

        var nroclientes = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Nro. Clientes:',
            labelAlign: 'right',
            name: 'NRO_CLIENTES',
            minValue: 1,
            width: 170,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            flex: 1,
        });

        var longitud = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Ampliacion:',
            emptyText: 'Metros',
            labelAlign: 'right',
            name: 'DISTANCIA',
            minValue: 0,
            width: 170,
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            flex: 1,
        });

        var DatosCliente = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Datos del Cliente</span>',
            //columnWidth: 0.5,
            columns: 4,
            defaultType: 'textfield',
            defaults: { anchor: '100%' },
            layout: 'anchor',
            items: [clientes, nombre, apellido, direccion, telefono, nit],
            margin: '0 10 0 0',
        });

        var storePlan = Ext.create('App.store.Erp.Plan');
        var plan = Ext.widget('combobox', {
            fieldLabel: 'Plan',
            name: 'PLAN',
            emptyText: 'Seleccione o escriba...',
            labelAlign: 'right',
            displayField: 'PLAN',
            valueField: 'PLAN',
            enableKeyEvents: true,
            store: storePlan.load(), 
            forceSelection: true,
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            flex: 1,
        });

        var DatosZona = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Zona</span>',
            //columnWidth: 0.5,
            columns: 4,
            defaultType: 'textfield',
            defaults: { anchor: '100%' },
            layout: 'anchor',
            items: [zona, descripcion, sistema, subsistema, mn_sistema],
            margin: '0 0 0 10',
        });

        var DatosProyecto = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Datos del Proyecto</span>',
            width: 240,
            columnWidth: 0.5,
            defaults: { anchor: '100%' },
            layout: 'anchor',
            margin: '0 20 0 0',
            items: [nroclientes, longitud]
        });

        var Urbanizacion = Ext.widget('fieldset', {
             colspan: 2,
             title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Urbanizacion</span>',
             items: [{
                 xtype: 'radiogroup',
                 width: 150,
                 columns: 1,
                 vertical: true,
                 items: [
                      { boxLabel: 'Si', name: 'URBANIZACION', inputValue: "Si", checked: true },
                      { boxLabel: 'No', name: 'URBANIZACION', inputValue: "No" }
                    ]
             }],
             margin: '0 20 0 0',
        });

        var Concesion = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Area Concesion</span>',
            items: [{
                xtype: 'radiogroup',
                //width: 150, valor para el formulario original
                width: 190,
                vertical: true,
                columns: 1,
                items: [
                     { boxLabel: 'Dentro', name: 'AREA_CONCESION', inputValue: "D", checked: true },
                     { boxLabel: 'Fuera', name: 'AREA_CONCESION', inputValue: "F" }
                ]
            }],
            //margin: '0 20 0 0', valor para el formulario original
            margin: '0 0 0 20',
        });

        var Motivo = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Motivo</span>',
            width: 300,
            items: [{
                xtype: 'radiogroup',
                width: 265,
                vertical: false,
               // columns: 1,
                items: [
                     { boxLabel: 'Calidad', name: 'MOTIVO', inputValue: "Calidad", checked: true },
                     { boxLabel: 'Demanda', name: 'MOTIVO', inputValue: "Demanda" }
                ]
            }],
        });

        var Plan = Ext.widget('fieldset', {
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Plan</span>',
            width: 305,
            items: [plan],
            margin: '0 0 0 20',
        });

        var Tension = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Tension Suministro</span>',
            items: [{
                xtype: 'radiogroup',
                width: 160,
                vertical: true,
                columns: 1,
                items: [
                     { boxLabel: 'Alta', name: 'TENSION_SUMINISTRO', inputValue: "A"},
                     { boxLabel: 'Media', name: 'TENSION_SUMINISTRO', inputValue: "M", checked: true },
                     { boxLabel: 'Baja', name: 'TENSION_SUMINISTRO', inputValue: "B" }
            ]
            }],
            margin: '0 0 0 20',
        });

        var Inicia = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Inicia</span>',
            items: [{
                xtype: 'radiogroup',
                width: 170,
                allowBlank: false,
                vertical: true,
                columns: 1,
                items: [
                     { boxLabel: 'Elfec', name: 'INICIA', inputValue: "E", checked: true },
                     { boxLabel: 'Contratista', name: 'INICIA', inputValue: "C" }
                ]
            }]
        });

        var Subencionado = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Subencionado</span>',
            width: 210,
            items: [{
                xtype: 'radiogroup',
                //width: 180,
                vertical: true,
                allowBlank: false,
                columns: 2,
                items: [
                     { boxLabel: 'Si', name: 'SUBENCIONADO', inputValue: "Si", items: 1 },
                     { xtype: 'numberfield', emptyText: 'Porcentaje', name: 'PORCENTAJE_SUBENCION', minValue: 0, width: 70, items: 2 },
                     { boxLabel: 'No', name: 'SUBENCIONADO', inputValue: "No", items: 3, checked: true },
            ]
            }],
            margin: '0 0 0 20',
        });

        var Observaciones = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Observaciones</span>',
            layout: {
                type: 'table',
                columns: 2,
            },
            items: [{
                xtype: 'textarea',
                name: 'OBSERVACION',
                height: 100,
                width: 235,
                margin: '20 20 20 20'
            }],
            margin: '0 20 0 0',
        });

        var Croquis = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Croquis</span>',
            layout: {
                type: 'table',
                columns: 2,
            },
            items: [{
                xtype: 'textarea',
                name: 'CROQUIS',
                readOnly: true,
                height: 200,
                width: 275
            }],
            margin: '0 0 0 10',
        });

        var inspector = Ext.widget('hiddenfield', {
            name: 'NOMBRE_ASIGNADO',
        });

        var fechainspeccion = Ext.widget('hiddenfield', {
            name: 'FECHA_ASIG',
        });

        var otorigen = Ext.widget('hiddenfield', {
            name: 'ID_OT',
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [DatosCliente, DatosZona]
        };

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [DatosProyecto, Urbanizacion, Concesion]
        };

        var terceraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [Motivo, Plan]
        };

        var cuartaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [Inicia, /*Subencionado*/Concesion, Tension]
        };

        var quintaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [Observaciones, Croquis]
        };

        var sextaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            hidden: true,
            items: [inspector, fechainspeccion, otorigen]
        };

        return [primeraFila, /*segundaFila, terceraFila,*/ cuartaFila, quintaFila, sextaFila];
    }
});