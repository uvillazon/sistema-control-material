Ext.define('App.View.OrdenesTrabajo.TrabajosEjecutados.FormCabecera', {
    alternateClassName: 'App.view.OrdenesTrabajo.TrabajosEjecutados.FormCabecera',
    extend: 'Ext.form.Panel',
    alias: 'widget.cabeceratrabajosejecutados',
    defaultType: 'textfield',
    initComponent: function () {
        var me = this;
        me.items = me.construirItems();
        me.tbar = me.construirToolbar();
        me.callParent();
    },

    construirItems: function () {
        var me = this;
        me.idcabecera = Ext.create('Ext.form.field.Text', {
            name: 'ID_TE',
            hidden: true,
            value: null
        });

        me.sm = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'S.M.:',
            name: 'ID_SOL_MAN',
            labelAlign: 'right',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            width: 170
            //flex: 1,
        });

        me.ot = Ext.create('Ext.form.Text', {
            name: 'ID_OT',
            fieldLabel: 'O.T.:',
            labelAlign: 'right',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            width: 175,
            //flex: 1
        });

        me.otorigen = Ext.widget('hiddenfield', {
            name: 'OT_ORIGEN',
        });

        me.descripcion = Ext.widget('textfield', {
            fieldLabel: 'Descripcion:',
            labelAlign: 'right',
            name: 'DESC_PROBL',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 3
        });

        me.idresponsable = Ext.widget('hiddenfield', {
            name: 'ID_RESPONSABLE',
        });

        me.capataz = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Capataz:',
            name: 'CAPATAZ',
            labelAlign: 'right',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        me.idmovil = Ext.widget('hiddenfield', {
            name: 'ID_MOVIL',
        });

        me.movil = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Movil:',
            name: 'MOVIL',
            labelAlign: 'right',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 3
        });

        me.fechaEjecucion = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Fecha Ejec.<span style="color:#F00;">*</span>',
            name: 'FECHA_EJE_INI',
            labelAlign: 'right',
            format: 'd/m/Y H:i:s',
            //maxValue: new Date(),
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        me.fechaEjecucionFinal = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Fecha Ejec.<span style="color:#F00;">*</span>',
            name: 'FECHA_EJE_FIN',
            labelAlign: 'right',
            format: 'd/m/Y H:i:s',
            //maxValue: new Date(),
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        me.estadoreporte = Ext.widget('textfield', {
            fieldLabel: 'Estado:',
            labelAlign: 'right',
            name: 'ESTADO',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        me.observacion = Ext.create('Ext.form.TextArea', {
            fieldLabel: 'Observacion:',
            name: 'OBSERVACION',
            labelAlign: 'right',
            height: 50,
            margin: '0 0 1 0',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [me.idcabecera, me.sm, me.ot, me.otorigen, me.idmovil, me.descripcion, me.fechaEjecucion, me.estadoreporte]
        };

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [me.idresponsable, me.capataz, me.idmovil, me.movil, me.horaInicio, me.fechaEjecucionFinal, me.observacion]
        };
        return [primeraFila, segundaFila];
    },

    construirToolbar: function () {
        return [{
            text: '<b>Datos Generales de la Orden de Trabajo</b>',
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Notificar Conclusion',
            iconCls: 'icon-mail',
            handler: this.enviarSolicitudValoracion,
            scope: this,
            action: 'notificar'
        }, {
            text: 'Cerrar',
            iconCls: 'icon-cerrar',
            handler: this.salirData,
            scope: this,
            action: 'salir'
        }]
    },

    cargarDatosCabecera: function (record)
    {
        var me = this;
        me.getForm().loadRecord(record);
    },

    guardarDatosCabecera: function () {
        var me = this;
        if (me.idcabecera.getValue() == 0) {
            Ext.Ajax.request({
                url: Constantes.HOST + 'OrdenesTrabajo/GuardarCabeceraTrabajosEjecutados',
                params: me.getForm().getValues(),
                success: function () { }
            });
        }
    },

    /*saveData: function () {
        var me = this;
        me.getForm().submit({
            url: 'Home/GuardarCabecera',
            success: function (form, action) {
                Ext.Msg.alert('Success', action.result.message);
            },
            failure: function (form, action) {
                Ext.Msg.alert('Failure', action.result.message);
            }
        });
    },*/

    salirData: function () {
        var me = this;
        var tabCurrent = Ext.ComponentQuery.query('#maintab')[0];
        var tab = tabCurrent.getActiveTab();
        tabCurrent.remove(tab);
        var btn = Ext.ComponentQuery.query('#btn_TrabajoEjecutado')[0];
        if (btn != null) {
            var adminOt = btn.up('window');
            adminOt.show();
        }
    },

    enviarSolicitudValoracion: function () {
        var me = this;
        Ext.Msg.confirm('Confirmar', 'Esta seguro de enviar un correo de notificacion </br>al Inspector de Mantenimiento para su revision?', function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: Constantes.HOST + 'OrdenesTrabajo/SolicitarRevisionTrabajoEjecutado',
                    params: { ID_OT: me.comboOt.getValue(), tipoInforme: 'TRABAJO EJECUTADO POR CAPATAZ' },
                    success: function (response, options) {
                        /*data = Ext.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: 'Enviado...',
                            msg: data.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });*/
                    },
                });
            }
        });
    },

    setFechas: function (fechainicio, fechafin) {
        var me = this;
        me.fechaEjecucion.setValue(fechainicio);
        me.fechaEjecucionFinal.setValue(fechafin);
    }
});