Ext.define('App.View.OrdenesTrabajo.EjecutadoContratista.EjecutadoContratistaConsulta', {
    alternateClassName: 'App.view.OrdenesTrabajo.EjecutadoContratista.EjecutadoContratistaConsulta',
    extend: 'Ext.form.Panel',
    alias: 'widget.ejecutadocontratistaconsulta',
    title: 'Trabajos Ejecutados Contratista',
    iconCls: 'application_form_add',
    requires: [
        'Ext.layout.container.Border',
        'Ext.resizer.BorderSplitterTracker',
    ],

    //layout: 'border',
    initComponent: function () {
        var me = this;
        me.items = me.construirItems();
        me.callParent();
    },

    construirItems: function () {
        var me = this;
        me.te = Ext.widget('hiddenfield', { name: 'ID_TE' });
        me.ot = Ext.widget('textfield', { fieldLabel: 'Orden Trabajo:', labelAlign: 'right', name: 'ID_OT', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.fechaejecucion = Ext.widget('datefield', { fieldLabel: 'Fech. Ejec.:', labelAlign: 'right', name: 'FECHA_EJE_INI', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.estado = Ext.create('Ext.form.field.Text', { name: 'ESTADO', fieldLabel: 'Estado', labelAlign: 'right', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.distancia = Ext.create('Ext.form.field.Number', { fieldLabel: 'Distancia (Km):', name: 'DISTANCIA', labelAlign: 'right', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.terreno = Ext.create('Ext.form.field.Checkbox', { boxLabel: 'Terreno Inaccesible', name: 'INCR_TERR', inputValue: 'SI', uncheckedValue: 'NO', readOnly: true,/* margin: '0 0 0 30',*/ flex: 1 });
        me.emergencia = Ext.create('Ext.form.field.Checkbox', { boxLabel: 'Emergencia', name: 'INCR_EMER', inputValue: 'SI', uncheckedValue: 'NO', readOnly: true, flex: 1 });

        var radiogroup = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:black;font-weight:bold" data-qtip="Required">Incrementos por:</span>',
            items: [{
                xtype: 'radiogroup',
                //width: 160,
                vertical: true,
                columns: 1,
                items: [ me.terreno, me.emergencia ]
            }],
            margin: '0 0 0 20',
            flex: 1
        });

        var cabeceraEjecutadoContratista = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            width: 1024,
            padding: '20px 20px 20px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,

            },
            items: [me.te, me.ot, me.estado, me.fechaejecucion, me.distancia, /*me.terreno, me.emergencia*/ radiogroup]
        };

        me.gridmaterialescontratista = Ext.create('Ext.grid.Panel', {
            height: 480,
            width: 1024,
            title: 'Detalle de los materiales ejecutados:',
            plugins: [{ ptype: 'cellediting', clicksToEdit: 1 }],
            store: Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista'),
            columns: [{ xtype: 'rownumberer' },
                    { text: '<b>COD. POSTE</b>', width: 150, flex: 1, dataIndex: 'COD_POSTE' },
                    { text: '<b>COD. UC</b>', width: 150, flex: 1, dataIndex: 'CODIGO_UC' },
                    { text: '<b>CONDUCTOR</b>', width: 150, flex: 1, dataIndex: 'COD_CONDUCTOR' },
                    { text: '<b>TIPO PRODUCTO</b>', width: 150, flex: 1, dataIndex: 'TIPO_PROD' },
                    { text: '<b>PRODUCTO</b>', width: 150, flex: 1, dataIndex: 'COD_PROD' },
                    { text: '<b>DESCRIPCION</b>', width: 200, flex: 1, dataIndex: 'DESC_PROD' },
                    { text: '<b>UNIDAD</b>', width: 100, align: 'center', flex: 1, dataIndex: 'UNID_PROD' },
                    { text: '<b>COSTO UNIT.</b>', width: 100, align: 'center', flex: 1, dataIndex: 'COSTO_UNIT', hidden: true },
                    { text: '<b>CANT. PRESU.</b>', width: 100, align: 'center', flex: 1, dataIndex: 'CANT_PRE', hidden: true },
                    { text: '<b>CANT. EJEC.</b>', width: 100, align: 'center', flex: 1, dataIndex: 'CANT_EJE' },
                    { text: '<b>OBSERV.</b>', width: 100, flex: 1, dataIndex: 'OBSERVACION', editor: { xtype: 'textfield', allowBlank: true }},
            ]
        });

        me.gridmanoobracontratista = Ext.create('Ext.grid.Panel', {
            height: 480,
            width: 1024,
            title: 'Detalle de la mano de obra ejecutada:',
            plugins: [{ ptype: 'cellediting', clicksToEdit: 1 }],
            store: Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista'),
            columns: [{ xtype: 'rownumberer' },
                    { text: '<b>COD. POSTE</b>', width: 150, flex: 1, dataIndex: 'COD_POSTE' },
                    { text: '<b>COD. UC</b>', width: 150, flex: 1, dataIndex: 'CODIGO_UC' },
                    { text: '<b>CONDUCTOR</b>', width: 150, flex: 1, dataIndex: 'COD_CONDUCTOR' },
                    { text: '<b>TIPO PRODUCTO</b>', width: 150, flex: 1, dataIndex: 'TIPO_PROD' },
                    { text: '<b>PRODUCTO</b>', width: 150, flex: 1, dataIndex: 'COD_PROD' },
                    { text: '<b>DESCRIPCION</b>', width: 200, flex: 1, dataIndex: 'DESC_PROD' },
                    { text: '<b>UNIDAD</b>', width: 100, align: 'center', flex: 1, dataIndex: 'UNID_PROD' },
                    { text: '<b>COSTO UNIT.</b>', width: 100, align: 'center', flex: 1, dataIndex: 'COSTO_UNIT', hidden: true },
                    { text: '<b>CANT. PRESU.</b>', width: 100, align: 'center', flex: 1, dataIndex: 'CANT_PRE', hidden: true },
                    { text: '<b>CANT. EJEC.</b>', width: 100, align: 'center', flex: 1, dataIndex: 'CANT_EJE' },
                    { text: '<b>OBSERV.</b>', width: 100, flex: 1, dataIndex: 'OBSERVACION', editor: { xtype: 'textfield', allowBlank: true } },
            ]
        });

        me.gridCorregidos = Ext.create('App.view.Historicos.GridCorreccionesTrabajoContratista', {
            tbar: [{
                        text: '<b>Detalle de los Trabajos Ejecutados: </b>',
                    }, 
                    {
                        xtype: 'tbfill'
                    }, {
                        text: 'Imprimir',
                        iconCls: 'printer',
                        handler : function(){
                        App.Config.ux.Printer.filtros = '';
                        App.Config.ux.Printer.print(me.gridCorregidos);
                    }
                  }],
            height: 480,
            width: 1024,
            title: 'Correcciones realizadas:'
        });

        var tabpanelgrids= new Ext.Panel({
            layout: 'fit',
            width: 1024,
            height: 480,
            border: false,
            items: [{
                xtype: 'tabpanel',
                activeTab: 0,
                id: 'myTabPanel',
                enableTabScroll: true,
                resizeTabs: true,
                minTabWidth: 75,
                items: [
                {
                    title: 'Materiales',
                    items: [me.gridmaterialescontratista]
                },
                {
                    title: 'Mano de Obra',
                    items: [me.gridmanoobracontratista]
                },
                {
                    title: 'Correcciones',
                    items: [me.gridCorregidos]
                }
                ],
            }]
        });

        var detalleEjecutadoContratista = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,

            },
            items: [/*me.griddetallecontratista*/tabpanelgrids]
        }
        return [cabeceraEjecutadoContratista, detalleEjecutadoContratista]
    },

    construirStore: function () {
        return Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista');
    },

    cargarDatos: function (ot) {
        var me = this;

        Ext.Ajax.request({
            type: 'ajax',
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerCabeceraEjecutadosContratista',
            method: 'GET',
            params: { ID_OT: ot },
            success: function (response, options) {
                data = Ext.decode(response.responseText);
                if (data.data != null) {
                    data.data.INCR_EMER == 'SI' ? me.emergencia.setValue(true) : me.emergencia.setValue(false);
                    data.data.INCR_TERR == 'SI' ? me.terreno.setValue(true) : me.terreno.setValue(false);
                    me.te.setValue(data.data.ID_TE);
                    me.ot.setValue(ot);
                    me.estado.setValue(data.data.ESTADO);
                    me.fechaejecucion.setValue(data.data.FECHA_EJE_INI);
                    me.distancia.setValue(data.data.DISTANCIA);
                    me.cargarDatosDetalle(data.data.ID_TE);
                }
            },
            failure: function () {
            }
        });
    },

    cargarDatosDetalle: function (te) {
        var me = this;
        me.gridmaterialescontratista.store.load({ params: { ID_TE: te, TIPO_PROD: 'ITEM' } });
        me.gridmanoobracontratista.store.load({ params: { ID_TE: te, TIPO_PROD: 'MO' } });
        me.gridCorregidos.store.load({ params: { ID_TE:  te}});
    },

    valorarReporteEjecutadoContratista: function (btn, window, grid) {
        var me = this;
        var norequerido = btn.text == 'Aprobar' ? true : false;
        var form = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            items: [{
                        xtype: 'textfield',
                        name: 'EST_ORIG',
                        value: me.estado.getValue(),
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'ID_OT',
                        value: me.ot.getValue(),
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'ID_TE',
                        value: me.te.getValue(),
                        hidden: true
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Motivo:',
                        name: 'OBSERV',
                        labelAlign: 'top',
                        flex: 1,
                        margins: '0',
                        allowBlank: norequerido
                    }],
            buttons: [{
                text: btn.text,
                handler: function () {
                    var form = this.up('form');
                    var record = form.getForm().getValues();
                    if (this.up('form').getForm().isValid()) {
                        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de ' + btn.text + ' el Reporte del Trabajo Ejecutado?', function (button) {
                            if (button == 'yes') {
                                var estadodestino = btn.text == 'Aprobar' ? 'APROBADO' : 'RECHAZADO';
                                me.gridmaterialescontratista.store.sync();
                                me.gridmanoobracontratista.store.sync();
                                Ext.Ajax.request({
                                    url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarTrabajosEjecutados',
                                    params: { ID_OT: record.ID_OT, ID: record.ID_TE, OPERACION: btn.text, EST_ORIG: record.EST_ORIG, EST_DEST: estadodestino, OBSERV: record.OBSERV, TIPO_REPORTE: 'CTR' },
                                    success: function (response, options) {
                                        var data = Ext.decode(response.responseText);
                                        if (data.success) {
                                            Ext.MessageBox.show({
                                                title: 'Felicidades',
                                                msg: data.msg,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.INFO
                                            });
                                            grid != null ? grid.store.load() : null;
                                        } else {
                                            Ext.MessageBox.show({
                                                title: 'Advertencia',
                                                msg: data.msg,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.WARNING
                                            });
                                        }
                                    }
                                });
                                window.close();
                            }
                        })
                        this.up('form').getForm().reset();
                        this.up('window').close();
                    } else {
                        Ext.MessageBox.alert('Faltan datos importantes', 'Por favor! ingrese el Motivo');
                    }
                }
            }, {
                text: 'Cancelar',
                handler: function () {
                    this.up('form').getForm().reset();
                    this.up('window').close();
                }
            }]
        });

        win = Ext.widget('window', {
            title: 'Descripcion',
            closeAction: 'hide',
            width: 300,
            height: 300,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: form
        });
        win.show();
    }
});