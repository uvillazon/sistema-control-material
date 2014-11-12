﻿/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 14
Elaborado: P. Sergio Alvarado G.
*/
Ext.define('App.View.OrdenesTrabajo.EjecutadoContratista.FormCabecera', {
    alternateClassName: 'App.view.OrdenesTrabajo.EjecutadoContratista.FormCabecera',
    extend: 'Ext.form.Panel',
    alias: 'widget.ejecutadocontratistacabecera',
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
            itemId: 'idte',
            hidden: true,
        });

        me.estado = Ext.create('Ext.form.field.Text', {
            name: 'ESTADO',
            itemId: 'hestado',
            hidden: true,
        });

        me.sm = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'S.M.:',
            name: 'ID_SOL_MAN',
            itemId: 'comboboxsm',
            emptyText: 'Seleccione o escriba...',
            labelAlign: 'right',
            displayField: 'ID_SOL_MAN',
            valueField: 'ID_SOL_MAN',
            enableKeyEvents: true,
            queryMode: 'local',
            /*forceSelection: true, /*Esto impide que el usuario introduzca un valor que no esta en el combo.*/
            /*store: Ext.create('App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados', { autoLoad: true }), por lo convenido con el equipo de desarrollo, el combo se usa como textfield*/
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });

        me.fuente = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Fuente:',
            labelAlign: 'right',
            name: 'COD_FUENTE',
            itemId: 'fieldfuente',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });

        me.ubicacion = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Ubicacion:',
            labelAlign: 'right',
            name: 'LUGAR_TRABAJO',
            itemId: 'fieldubicacion',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });
        me.fechaEjecucion = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Fecha Ejec.',
            afterLabelTextTpl: Constantes.REQUERIDO,
            itemId: 'fejecini',
            name: 'FECHA_EJE_INI',
            labelAlign: 'right',
            format: 'd/m/Y',
            maxValue: new Date(),
            margin: '0 0 0 20',
            readOnly: true,
            flex: 1
        });

        me.terreno = Ext.create('Ext.form.field.Checkbox', {
            boxLabel: 'Terreno Inaccesible',
            name: 'INCR_TERR',
            inputValue: 'SI',
            uncheckedValue: 'NO',
            margin: '0 0 0 30',
            id: 'checkboxterreno',
            readOnly: true,
            flex: 1
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,

            },
            items: [me.idcabecera, me.estado, me.sm, me.fuente, me.ubicacion, me.fechaEjecucion, me.terreno]
        };

        me.comboOt = Ext.create('Ext.form.ComboBox', {
            name: 'ID_OT',
            itemId: 'comboboxot',
            fieldLabel: 'O.T.:',
            emptyText: 'Seleccione o escriba....',
            width: 240,
            displayField: 'ID_OT',
            valueField: 'ID_OT',
            labelAlign: 'right',
            queryMode: 'local',
            //forceSelection: true,
            //allowBlank: false,
            //store: Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable', { params: { ID_SOL_MAN: sm.getValue(), queryType: 'default' }/*, autoLoad: true*/ }),
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1
        });

        me.descripcion = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Descripcion:',
            itemId: 'fielddescripcion',
            name: 'INSTRUCCIONES',
            labelAlign: 'right',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        me.distancia = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Distancia (Km):',
            afterLabelTextTpl: Constantes.REQUERIDO,
            itemId: 'fielddistancia',
            name: 'DISTANCIA',
            minValue: 1,
            labelAlign: 'right',
            margin: '0 0 0 20',
            readOnly: true,
            flex: 1
        });

        me.km = Ext.widget('label', {
            forId: 'myFieldId',
            text: 'Km.',
            margin: '0 0 0 10'
        });

        me.emergencia = Ext.create('Ext.form.field.Checkbox', {
            boxLabel: 'Emergencia',
            name: 'INCR_EMER',
            inputValue: 'SI',
            uncheckedValue: 'NO',
            id: 'checkboxemergencia',
            margin: '0 0 0 30',
            readOnly: true,
            flex: 1
        });

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 20px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [me.comboOt, me.descripcion, me.distancia, me.emergencia]
        };

        return [primeraFila, segundaFila];
    },

    construirToolbar: function () {
        return [{
            text: '<b>Datos Generales</b>',
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Nuevo',
            icon: Constantes.HOST + 'Content/images/new.png',
            handler: this.saveData,
            scope: this,
            disabled: true,
            hidden: true,
            action: 'nuevo'
        }, {
            text: 'Editar',
            icon: Constantes.HOST + 'Content/images/pencil.png',
            disabled: true,
            handler: this.saveData,
            scope: this,
            hidden: true,
            //disabled: true,
            action: 'editar'
        }, {
            text: 'Ver Observaciones',
            icon: Constantes.HOST + 'Content/images/eye.png',
            disabled: true,
            handler: this.verObservaciones,
            scope: this,
            action: 'verobservaciones'
        },
        {
            text: 'Solicitar Valoracion',
            icon: Constantes.HOST + 'Content/images/mail.png',
            handler: this.enviarSolicitudValoracion,
            disabled: true,
            scope: this,
            action: 'notificarValoracion'
        },
        {
            text: 'Guardar',
            iconCls: 'icon-save',
            disabled: true,
            handler: this.saveData,
            scope: this,
            action: 'save'
        },{
            text: 'Cerrar',
            icon: Constantes.HOST + 'Content/images/salir.png',
            handler: this.salirData,
            scope: this,
            action: 'salir'
        }]
    },

    /*bloquearCabecera: function (v) {
        var me = this;
        me.distancia.setReadOnly(v);
    },*/

    enviarSolicitudValoracion: function () {
        var me = this;
        Ext.Msg.confirm('Confirmar', 'Esta seguro de enviar un correo de notificacion </br>al Inspector de Mantenimiento para su revision?', function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url: Constantes.HOST + 'OrdenesTrabajo/SolicitarRevisionTrabajoEjecutado',
                    params: { ID_OT: me.comboOt.getValue(), tipoInforme: 'TRABAJO EJECUTADO POR CONTRATISTA'},
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

    salirData: function () {
        var me = this;
        var tabCurrent = Ext.ComponentQuery.query('#maintab')[0];
        var tab = tabCurrent.getActiveTab();
        tabCurrent.remove(tab);
                                                                                                                                                                                               }
});