Ext.define('App.View.OrdenesTrabajo.ReporteTrabajoDiario.ReporteTrabajoDiarioConsulta', {
    alternateClassName: 'App.view.OrdenesTrabajo.ReporteTrabajoDiario.ReporteTrabajoDiarioConsulta',
    extend: 'Ext.form.Panel',
    alias: 'widget.trabajodiarioconsulta',
    title: 'Trabajos Ejecutados',
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
        me.td = Ext.widget('hiddenfield', { name: 'ID_TD' });
        me.ot = Ext.widget('textfield', { fieldLabel: 'Orden Trabajo:', labelAlign: 'right', name: 'ID_OT', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.fechaejecucion = Ext.widget('datefield', { fieldLabel: 'Fecha Ejecucion:', labelAlign: 'right', name: 'FECHA_EJE_INI', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.horainicio = Ext.create('Ext.form.TimeField', { fieldLabel: 'Hora Inicio:', labelAlign: 'right', name: 'FCH_HOR_INI', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.estado = Ext.create('Ext.form.field.Text', { name: 'ESTADO', fieldLabel: 'Estado', labelAlign: 'right', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });

        var cabeceraTrabajoEjecutado = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            width: 1024,
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,

            },
            items: [me.td, me.ot, me.fechaejecucion, me.horainicio, /*me.horafin,*/ me.estado]
        };

        me.espacio1 = Ext.widget('label', { text:'', flex: 1 });
        me.fechaejecucionfinal = Ext.widget('datefield', { fieldLabel: 'Fecha Ejec. Final:', labelAlign: 'right', name: 'FECHA_EJE_FIN', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 });
        me.horafin = Ext.widget('textfield', { fieldLabel: 'Hora Fin:', labelAlign: 'right', name: 'FCH_HOR_FIN', readOnly: true, readOnlyCls: 'DisabledClaseReadOnly', flex: 1 })
        me.espacio2 = Ext.widget('label', { text: '', flex: 1 });
        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            width: 1024,
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [me.espacio1, me.fechaejecucionfinal, me.horafin, me.espacio2]
        };

        me.griddetalle = Ext.create('Ext.grid.Panel', {
            //title: 'Detalle de los trabajos ejecutados:',
            height: 300,
            width: 1024,
            iconCls: null,
            tbar: [{
                text: '<b>Detalle de los Trabajos Ejecutados: </b>',
            }, {
                xtype: 'tbfill'
            }, {
                text: 'Imprimir',
                iconCls: 'printer',
                handler : function(){
                    App.Config.ux.Printer.filtros = '';
                    App.Config.ux.Printer.print(me.griddetalle);
                }
            }],
            store: Ext.create('App.store.OrdenesTrabajo.DetallePrincipalTrabajoDiario'),
            /*dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: this.store,
            }],*/
            columns: [{ xtype: 'rownumberer' },
            { text: '<b>COD. POSTE</b>', width: 100, dataIndex: 'COD_POSTE' },
            { text: '<b>COD. UC</b>', width: 100, dataIndex: 'COD_UC' },
            { text: '<b>COD. CONDUCTOR</b>', width: 100, dataIndex: 'COD_CONDUCTOR' },
            { text: '<b>FORMACION CND. </b>', width: 120, dataIndex: 'FORMACION_CND' },
            { text: '<b>COD. MANT.</b>', width: 80, dataIndex: 'COD_MAN' },
            { text: '<b>COD. SOL. </b>', width: 80, dataIndex: 'COD_SOL' },
            { text: '<b>COD. MATERIAL</b>', width: 100, dataIndex: 'COD_PROD' },
            { text: '<b>DESCRIPCION</b>', width: 200, dataIndex: 'DESC_PROD' },
            { text: '<b>UNIDAD</b>', width: 70, dataIndex: 'UNID_PROD' },
            { text: '<b>CANT. EJEC.</b>', width: 90, flex: 1, dataIndex: 'CANT_EJE' },
            { text: '<b>NIVEL</b>', width: 50, flex: 1, dataIndex: 'NIVEL' },
            { text: '<b>OBSERV.</b>', width: 100, flex: 1, dataIndex: 'OBSERV' },
            { text: '<b>FECHA INI.</b>', width: 100, flex: 1, dataIndex: 'FCH_HOR_INI', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'), /*hidden: true*/ },
            { text: '<b>FECHA FIN.</b>', width: 100, flex: 1, dataIndex: 'FCH_HOR_FIN', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'), /*hidden: true*/ },
            { text: '<b>CAPATAZ</b>', width: 150, flex: 1, dataIndex: 'CAPATAZ', /*hidden: true*/ },
            { text: '<b>MOVIL</b>', width: 60, flex: 1, dataIndex: 'MOVIL', /*hidden: true*/ }],
            listeners: {
                itemclick: function (dv, record, item, index, e) {
                    me.gridpersonal.store.load({ params: { ID_TD: record.get('ID_TD'), FCH_HOR_INI: record.get('FCH_HOR_INI'), consulta: true } });
                }
            }
        });
        var detalleTrabajoEjecutado = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,

            },
            items: [me.griddetalle]
        }

        me.gridpersonal = Ext.create('Ext.grid.Panel', {
            //title: 'Detalle de los trabajos ejecutados:',
            height: 150,
            width: 480,
            iconCls: null,
            tbar: [{
                text: '<b>Personal del movil: </b>',
            }],
            store: Ext.create('App.Store.OrdenesTrabajo.PersonalTrabajoDiario'),
            columns: [{ xtype: 'rownumberer' },
            { text: '<b>Nombre</b>', width: 100, dataIndex: 'NOMBRE' },
            { text: '<b>Apelllido</b>', width: 100, dataIndex: 'APELLIDO' },
            { text: '<b>Unidad</b>', width: 100, dataIndex: 'UNIDAD' },
            { text: '<b>Area</b>', width: 120, dataIndex: 'AREA' }]
        });

        me.observaciones = Ext.create('Ext.form.TextArea', {
            fieldLabel: 'Observacion:',
            itemId: 'fieldobservacion',
            name: 'OBSERVCION',
            labelAlign: 'right',
            width: 480,
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
        });

        var personalTrabajoEjecutado = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [me.gridpersonal, me.observaciones]
        }

        return [cabeceraTrabajoEjecutado, segundaFila, detalleTrabajoEjecutado, personalTrabajoEjecutado]
    },

    construirStore: function () {
        return Ext.create('App.store.OrdenesTrabajo.DetallePrincipalTrabajoDiario');
    },

    cargarDatos: function (ot) {
        var me = this;
      
        Ext.Ajax.request({
            type: 'ajax',
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerTrabajoDiarioCabecera',
            method: 'GET',
            params: { ID_OT: ot },
            success: function (response, options) {
                data = Ext.decode(response.responseText);
                if (data.data != null) {
                    me.td.setValue(data.data.ID_TD);
                    me.ot.setValue(ot);
                    me.fechaejecucion.setValue(data.data.FECHA_EJE_INI);
                    me.fechaejecucionfinal.setValue(data.data.FECHA_EJE_FIN);
                    me.horainicio.setValue(data.data.FCH_HOR_INI);
                    me.horafin.setValue(data.data.FCH_HOR_FIN);
                    me.estado.setValue(data.data.ESTADO);
                    me.cargarDatosDetalle(data.data.ID_TD);
                }
            },
            failure: function () {
            }
        });
    },

    cargarDatosDetalle: function (td) {
        var me = this;
        me.griddetalle.store.load({ params: { ID_TD: td } })
    },

    valorarReporteTrabajoEjecutado: function (btn, window, grid, respuesta) {
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
                        name: 'ID_TD',
                        value: me.td.getValue(),
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
                    Funciones.checkTimeout();
                    var form = this.up('form');
                    var record = form.getForm().getValues();
                    console.log(record.ID_OT);
                    if (this.up('form').getForm().isValid() && respuesta != 'yes') {
                        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de ' + btn.text + ' el Reporte del Trabajo Ejecutado?', function (button) {
                            if (button == 'yes') {
                                var estadodestino = btn.text == 'Aprobar' ? 'APROBADO' : 'RECHAZADO';
                                Ext.Ajax.request({
                                    url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarTrabajosEjecutados',
                                    params: { ID_OT: record.ID_OT, ID: record.ID_TD, OPERACION: btn.text, EST_ORIG: record.EST_ORIG, EST_DEST: estadodestino, TIPO_REPORTE: 'CPZ', OBSERV: record.OBSERV },
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
                        if (respuesta == 'yes') {
                            var estadodestino = btn.text == 'Aprobar' ? 'APROBADO' : 'RECHAZADO';
                            Ext.Ajax.request({
                                url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarTrabajosEjecutados',
                                params: { ID_OT: record.ID_OT, ID: record.ID_TD, OPERACION: btn.text, EST_ORIG: record.EST_ORIG, EST_DEST: estadodestino, TIPO_REPORTE: 'CPZ', OBSERV: record.OBSERV },
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
                            this.up('form').getForm().reset();
                            this.up('window').close();
                        } else {
                            Ext.MessageBox.alert('Faltan datos importantes', 'Por favor! ingrese el Motivo');
                        }
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