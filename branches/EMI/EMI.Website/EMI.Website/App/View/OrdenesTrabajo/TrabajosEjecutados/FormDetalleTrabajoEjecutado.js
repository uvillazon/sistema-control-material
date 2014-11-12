Ext.define('App.View.OrdenesTrabajo.TrabajosEjecutados.FormDetalleTrabajoEjecutado', {
    alternateClassName: 'App.view.OrdenesTrabajo.TrabajosEjecutados.FormDetalleTrabajoEjecutado',
    extend: 'Ext.form.Panel',
    alias: 'widget.nuevostrabajosejecutados',
    defaultType: 'textfield',
    initComponent: function () {
        var me = this;
        me.items = me.construirItems();
        //me.tbar = me.construirToolbar();
        me.callParent();
    },

    construirItems: function () {
        var me = this;
        me.te = Ext.widget('hiddenfield', {
            name: 'ID_TE',
        });

        me.ot = Ext.widget('hiddenfield', {
            name: 'ID_OT',
        });

        me.otorigen = Ext.widget('hiddenfield', {
            name: 'OT_ORIGEN',
        });

        me.objeto = Ext.widget('hiddenfield', {
            name: 'OBJETO',
        });

        me.poste = Ext.widget('hiddenfield', {
            name: 'ID_POSTE',
        }); 

        me.unidadconstructiva = Ext.widget('hiddenfield', {
            name: 'ID_UC',
        });

        me.conductor = Ext.widget('hiddenfield', {
            name: 'ID_CONDUCTOR',
        });

        me.emergencia = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Emergencia',
            afterLabelTextTpl: Constantes.REQUERIDO,
            name: 'EMERGENCIA',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: ' NO',
            valueField: 'NO',
            queryMode: 'local',
            store: ['SI', 'NO'],
            allowBlank: false,
            forceSelection: true,
            flex: 2,
        });
 
        me.terrenoduro = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Terreno Duro',
            afterLabelTextTpl: Constantes.REQUERIDO,
            name: 'TERR_DURO',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: ' NO',
            valueField: 'NO',
            queryMode: 'local',
            store: ['SI', 'NO'],
            allowBlank: false,
            forceSelection: true,
            margin: '0 0 0 60',
            flex: 2,
        });
        
        me.estadoterreno = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Estado Terreno:',
            name: 'ESTADO_TERR',
            labelAlign: 'right',
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });
 
        me.nuevainstalacion = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Nueva Instal.',
            afterLabelTextTpl: Constantes.REQUERIDO,
            name: 'NUEVA_INSTAL',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: ' NO',
            valueField: 'NO',
            queryMode: 'local',
            store: ['SI', 'NO'],
            forceSelection: true,
            allowBlank: false,
            flex: 2,
        });

        me.otrasplacas =  Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Otras Placas:',
            name: 'OTRAS_PLACAS',
            labelAlign: 'right',
            readOnlyCls: 'DisabledClaseReadOnly',
            margin: '0 0 0 60',
            flex: 1,
        });
 
        me.estadoplaca = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Estado Placa:',
            name: 'ESTADO_PLACA',
            labelAlign: 'right',
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });
 
        me.ap = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'A.P.:',
            afterLabelTextTpl: Constantes.REQUERIDO,
            name: 'AP',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: ' NO',
            valueField: 'NO',
            queryMode: 'local',
            store: ['SI', 'NO'],
            forceSelection: true,
            allowBlank: false,
            margin: '0 0 0 60',
            flex: 2,
        });

        me.numerooa = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Numero OA:',
            name: 'NUMERO_OA',
            allowNegative: false,
            minValue: 0,
            //allowBlank: false,
            labelAlign: 'right',
            margin: '0 0 0 60',
            flex: 1
        });

        me.nivel = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Nivel:',
            name: 'NIVEL',
            allowNegative: false,
            minValue: 0,
            allowBlank: false,
            labelAlign: 'right',
            flex: 1
        });

        me.distancia = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Distancia (km):',
            name: 'DISTANCIA',
            allowNegative: false,
            minValue: 0,
            allowBlank: false,
            labelAlign: 'right',
            margin: '0 0 0 60',
            flex: 1
        });

        me.codigoman = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Cod. Mantenimiento:',
            afterLabelTextTpl: Constantes.REQUERIDO,
            name: 'COD_MAN',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_MAN',
            valueField: 'ID_COD_MAN',
            store: Ext.create('App.Store.SolicitudesMantenimiento.CodigosMantenimiento'),
            queryMode: 'local',
            allowBlank: false,
            forceSelection: true,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No exiten Codigos de Mantenimiento.',
                getInnerTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_MAN}</div><div class="desc">{DESCRIP_MAN}</div></div>';
                }
            },
            flex: 2,
            listeners: {
                select: function (cbx) {
                    me.codigosol.enable();
                    me.cargarStoreCodigosSolucion(cbx);
                }
            }
        });

        me.codigosol = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Cod. Solucion:',
            afterLabelTextTpl: Constantes.REQUERIDO,
            name: 'COD_SOL',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_SOL',
            valueField: 'ID_COD_SOL',
            store: Ext.create('App.Store.SolicitudesMantenimiento.CodigosSolucion'),
            queryMode: 'local',
            allowBlank: false,
            forceSelection: true,
            disabled: true,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No exiten Codigos de Mantenimiento.',
                getInnerTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_SOL}</div><div class="desc">{DESCRIP_SOL}</div></div>';
                }
            },
            margin: '0 0 0 60',
            flex: 2,
            listeners: {
                select: function (cbx) {
                    me.materiales.enable();
                    me.cargarStoreGridDetalle(cbx);
                    me.cargarStoreMaterialesMano(cbx);
                }
            }
        });

        me.materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Materiales/Mano Obra:',
            emptyText: 'Buscar....',
            name: "ITEM",
            labelAlign: 'right',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'IDPRODUCTO',
            store: Ext.create("App.Store.Productos.MaterialesManoObra"),
            textoTpl: function () {
                return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_ALTERNATIVO}</div><div class="desc">{DESCRIPCION}</div></div>';
            },
            forceSelection: true,
            width: 265,
            margin: '0 0 0 -10',
            flex: 1,
            disabled: true,
            //disabledCls: null,
            //readOnlyCls: null,
            //enableKeyEvents: true,
            listeners: {
                select: function (cbx) {
                    me.cargarMaterialManoObraSeleccionado(cbx);
                }
            }
        });

        me.botonpresupuesto = Ext.create('Ext.button.Button', {
            text: 'Obtener Codigos y Materiales <br> desde Planilla Inspeccion',
            scale: 'medium',
            iconCls: 'layout_add',
            margin: '0 0 10 140',
            action: 'addpresupuesto',
            listeners: {
                click: function () {
                    me.materiales.enable();
                    me.cargarStoreGridDetalleDesdePlanilla();
                }
            }
        });

        me.fechaejecucion = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Fecha Ejec.<span style="color:#F00;">*</span>',
            name: 'FCH_HOR_INI',
            labelAlign: 'right',
            format: 'd/m/Y',
            allowBlank: false,
            maxValue: new Date(),
            flex: 1
        });

        me.horaini = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Inicio",
            labelAlign: 'right',
            name: "HORA_INI",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            margin: '0 0 0 50',
            flex: 1
        });

        me.horafin = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Fin",
            labelAlign: 'right',
            name: "HORA_FIN",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            margin: '0 0 0 50',
            flex: 1
        });

        me.fechafinalizacion = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Fecha Fin.<span style="color:#F00;">*</span>',
            labelAlign: 'right',
            name: 'FCH_HOR_FIN',
            labelAlign: 'right',
            allowBlank: false,
            format: 'd/m/Y',
            maxValue: new Date(),
            flex: 1
        });

        var datosObjeto = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Datos para completar del Objeto Intervenido</span>',
            width: 640,
            layout: {
                type: 'table',
                columns: 2,
            },
            items: [
                me.ot,
                me.te,
                me.objeto,
                me.poste,
                me.unidadconstructiva,
                me.conductor,
                me.nivel, 
                me.distancia, 
                me.estadoterreno, 
                me.terrenoduro, 
                me.nuevainstalacion, 
                me.ap, 
                me.emergencia, 
                me.numerooa, 
                me.estadoplaca, 
                me.otrasplacas],
        });

        var Mantenimiento = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Trabajos que se realizaran sobre el Objeto Intervenido</span>',
            width: 640,
            layout: {
                type: 'table',
                columns: 2,
            },
            items: [me.codigoman, me.codigosol, me.materiales, me.botonpresupuesto],
            //margin: '0 0 0 10',
        });

        var Fecha = Ext.widget('fieldset', {
            colspan: 2,
            title: '<span style="color:blue;font-weight:bold" data-qtip="Required">Fecha y hora en que se realizo la tarea</span>',
            width: 640,
            layout: {
                type: 'table',
                columns: 2,
            },
            items: [me.fechaejecucion, me.horaini, me.fechafinalizacion, me.horafin],
            //margin: '0 0 0 10',
        });

        var storeDetalleTrabajoEjecutado = Ext.create('App.store.OrdenesTrabajo.DetalleTrabajosEjecutados', {
            proxy: {
                type: 'ajax',
                api: {
                    create: Constantes.HOST + 'OrdenesTrabajo/GuardarDetalleTrabajosEjecutados',
                    read: Constantes.HOST + 'OrdenesTrabajo/ObtenerDetalleTrabajosEjecutadosPaginado',
                    update: Constantes.HOST + 'OrdenesTrabajo/ActualizarDetalleTrabajosEjecutados',
                    destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarDetalleTrabajosEjecutados'
                },
                reader: {
                    type: 'json',
                    root: 'Rows',
                    totalProperty: 'Total'
                },
                writer: {
                    type: 'json',
                    allowSingle: false
                }
            }
        });

        me.griddetalle = Ext.create('Ext.grid.Panel', {
            height: 240,
            width: 640,
            iconCls: null,
            //title: 'Detalle de los materiales ejecutados:',
            plugins: [{ ptype: 'cellediting', clicksToEdit: 1 }],
            store: storeDetalleTrabajoEjecutado,
            columns: [{ xtype: 'rownumberer' },
                    { text: '<b>COD. POSTE</b>', width: 100, dataIndex: 'COD_POSTE', hidden: true },
                    { text: '<b>COD. UC</b>', width: 100, dataIndex: 'CODIGO_UC', hidden: true },
                    { text: '<b>CONDUCTOR</b>', width: 100, dataIndex: 'COD_CONDUCTOR', hidden: true },
                    { text: '<b>TIPO PRODUCTO</b>', width: 150, dataIndex: 'TIPO_PROD', hidden: true },
                    { text: '<b>PRODUCTO</b>', width: 70, dataIndex: 'COD_PROD' },
                    { text: '<b>DESCRIPCION</b>', width: 200, dataIndex: 'DESC_PROD' },
                    { text: '<b>UNIDAD</b>', width: 50, align: 'center', dataIndex: 'UNID_PROD' },
                    { text: '<b>COSTO UNIT.</b>', width: 100, align: 'center', dataIndex: 'COSTO_UNIT', hidden: true },
                    { text: '<b>CANT. PRESU.</b>', width: 100, align: 'center', dataIndex: 'CANT_PRE', hidden: true },
                    { text: '<b>CANTIDAD </b>', width: 50, align: 'center', dataIndex: 'CANT_EJE', editor: { xtype: 'numberfield', allowBlank: false, minValue: 0 } },
                    { text: '<b>OBSERVACION</b>', width: 150, dataIndex: 'OBSERVACION', editor: { xtype: 'textfield', allowBlank: true } },
                    {
                         xtype: 'actioncolumn',
                         width: 25,
                         align: 'center',
                         items: [
                             {
                                 iconCls: 'icon-delete',
                                 tooltip: 'Eliminar',
                                 handler: function (grid, rowIndex, colIndex) {
                                     grid.getStore().removeAt(rowIndex);
                                 }
                             }]
                     }
            ]
        });

        var storepersonalmovil = Ext.create('App.Store.OrdenesTrabajo.PersonalMovilTrabajosEjecutados', {
            proxy: {
                type: 'ajax',
                api: {
                    create: Constantes.HOST + 'OrdenesTrabajo/GuardarPersonalMovilTrabajosEjecutados',
                    read: Constantes.HOST + 'OrdenesTrabajo/ObtenerPersonalMovilResponsables',
                    update: Constantes.HOST + 'OrdenesTrabajo/ActualizarPersonalMovilTrabajosEjecutados',
                    destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarPersonalMovilTrabajosEjecutados'
                },
                reader: {
                    type: 'json',
                    root: 'Rows',
                    totalProperty: 'Total'
                },
                writer: {
                    type: 'json',
                    allowSingle: false
                },
            }
        });

        me.viewpersonalmovil = Ext.create('App.view.OrdenesTrabajo.TrabajosEjecutados.ViewPersonalMovilTrabajoEjecutado', {
            store: storepersonalmovil,
            listeners: {
                itemdblclick: function (view, record, item, index, event, options) {
                    if (record.get('active')) {
                        Ext.fly(item).removeCls('active');
                        Ext.fly(item).addCls('inactive');
                    } else {
                        Ext.fly(item).removeCls('inactive');
                        Ext.fly(item).addCls('active');
                    }
                    record.data.active = !record.data.active;
                }
            }
        });

        var tabpanelgrids = new Ext.Panel({
            layout: 'fit',
            width: 640,
            height: 240,
            border: false,
            items: [{
                xtype: 'tabpanel',
                activeTab: 0,
                id: 'tabPanelFormDetalleTrabajosEjecutados',
                enableTabScroll: true,
                resizeTabs: true,
                minTabWidth: 75,
                items: [
                {
                    title: 'Materiales/Mano Obra',
                    items: [me.griddetalle]
                },
                {
                    title: 'Personal Movil',
                    autoScroll: true,
                    items: [me.viewpersonalmovil]
                }],
            }]
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [/*panel*/]
        };

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [datosObjeto]
        };

        var terceraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [Mantenimiento]
        };

        var cuartaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [Fecha]
        };

        var quintaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [me.materiales]
        };

        var sextaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [ tabpanelgrids]
        };

        return [/*primeraFila, */cuartaFila, segundaFila, terceraFila, sextaFila];
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
            iconCls: 'salir.png',
            handler: this.salirData,
            scope: this,
            action: 'salir'
        }]
    },

    cargarDatosIniciales: function (record) {
        var me = this;
        me.getForm().loadRecord(record);
        me.cargarStoreCodigosMantenimiento(record.get('ID_UC'), record.get('ID_CONDUCTOR'));
        me.cargarStorePersonalMovil(record.get('ID_OT'));
    },

    cargarStoreCodigosMantenimiento: function (uc, conductor) {
        var me = this;
        me.codigoman.store.setExtraParam('ID_UC', uc);
        me.codigoman.store.setExtraParam('ID_CONDUCTOR', conductor);
        me.codigoman.store.load();
    },

    cargarStoreCodigosSolucion: function (cbx) {
        var me = this;
        var record = cbx.getSelectedRecord();
        me.codigosol.store.setExtraParam('ID_COD_MAN', record.get('ID_COD_MAN'));
        me.codigosol.store.load();
    },

    cargarStorePersonalMovil: function (ot) {
        var me = this;
        me.viewpersonalmovil.store.load({ params: {ID_OT: ot } });
    },

    cargarStoreGridDetalle: function (cbx) {
        var me = this;
        var record = cbx.getSelectedRecord();
        var storeCodigosSolucionMateriales = Ext.create('App.store.OrdenesTrabajo.MaterialesCodigoSolucion');
        storeCodigosSolucionMateriales.load({
            scope: this,
            params: { ID_COD_SOL: record.get('ID_COD_SOL') },
            callback: function (records, operation, success) {
                for (var i = 0; i < operation.resultSet.count; i++) {
                    var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajosEjecutados', {
                        ID_COD_SOL: record.get('ID_COD_SOL'),
                        COD_SOL: record.get('COD_SOL'),
                        ID_COD_MAN: me.codigoman.getValue(),
                        COD_MAN: me.codigoman.getRawValue(),
                        IDPRODUCTO: records[i].get('IDPRODUCTO'),
                        COD_PROD: records[i].get('COD_ALTERNATIVO'),
                        UNID_PROD: records[i].get('IDUNIDAD'),
                        DESC_PROD: records[i].get('DESCRIPCION'),
                    });
                    if (!me.buscarExiste(records[i].get('IDPRODUCTO'), me.griddetalle.store, record.get('ID_COD_SOL'), me.codigoman.getValue())) {
                        me.griddetalle.store.add(det);
                    }
                }
                if (operation.resultSet.count == 0) {
                    var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajosEjecutados', {
                        ID_COD_SOL: record.get('ID_COD_SOL'),
                        COD_SOL: record.get('COD_SOL'),
                        ID_COD_MAN: me.codigoman.getValue(),
                        COD_MAN: me.codigoman.getRawValue(),
                        IDPRODUCTO: '',
                        COD_ALTERNATIVO: '',
                        COD_PROD: '',
                        UNID_PROD: '',
                        DESC_PROD: record.get('DESCRIP_SOL') + '. NO REQUIERE MATERIALES',
                    });
                    me.griddetalle.store.add(det);
                }
            }
        });
    },

    cargarStoreMaterialesMano: function (codigoMantenimiento) {
        var me = this;
        me.materiales.store.load();
    },

    cargarMaterialManoObraSeleccionado: function (cbx) {
        var me = this;
        var record = cbx.getSelectedRecord();
        if (!me.buscarExiste(record.get('IDPRODUCTO'), me.griddetalle.store, me.codigosol.getValue(), me.codigoman.getValue())) {
            var det = Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajosEjecutados', {
                ID_COD_SOL: me.codigosol.getValue(),
                COD_SOL: me.codigosol.getRawValue(),
                ID_COD_MAN: me.codigoman.getValue(),
                COD_MAN: me.codigoman.getRawValue(),
                IDPRODUCTO: record.get('IDPRODUCTO'),
                COD_PROD: record.get('COD_ALTERNATIVO'),
                UNID_PROD: record.get('IDUNIDAD'),
                DESC_PROD: record.get('DESCRIPCION'),
                CANT_EJE: 1
            });
            me.griddetalle.store.add(det);
        }
    },

    cargarStoreGridDetalleDesdePlanilla: function () {
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'OrdenesTrabajo/ObtenerCodigosDesdePlanillaInspeccion',
            method: 'GET',
            params: { OT_ORIGEN: me.otorigen.getValue(), ID_CONDUCTOR: me.conductor.getValue(), ID_POSTE: me.poste.getValue(), ID_UC: me.unidadconstructiva.getValue(), objeto: me.objeto.getValue() },
            success: function (response) {
                data = Ext.decode(response.responseText);
                console.dir(data);
                if (data.total > 0) {
                    for (var i = 0; i < data.total; i++) {
                        if (!me.buscarExiste(data.data[i].IDPRODUCTO, me.griddetalle.getStore(), data.data[i].COD_SOL, data.data[i].COD_MAN)) {
                            me.griddetalle.store.add(Ext.create('App.Model.OrdenesTrabajo.DetalleTrabajosEjecutados', {
                                ID_POSTE: data.data[i].ID_POSTE,
                                COD_POSTE: data.data[i].COD_POSTE,
                                ID_CONDUCTOR: data.data[i].ID_CONDUCTOR,
                                COD_CONDUCTOR: data.data[i].COD_CONDUCTOR,
                                FORMACION_CND: data.data[i].FORMACION_CND,
                                ID_UC: data.data[i].ID_UC,
                                COD_UC: data.data[i].COD_UC,
                                ID_COD_MAN: data.data[i].ID_COD_MAN,
                                COD_MAN: data.data[i].COD_MAN,
                                ID_COD_SOL: data.data[i].ID_COD_SOL,
                                COD_SOL: data.data[i].COD_SOL,
                                IDPRODUCTO: data.data[i].IDPRODUCTO,
                                COD_PROD: data.data[i].COD_PROD,
                                DESC_PROD: data.data[i].DESC_PROD,
                                UNID_PROD: data.data[i].UNID_PROD,
                                CANT_EJE: 0,
                            }));
                        }
                    }
                } else {
                    Ext.Msg.show({
                                  title: 'Informacion',
                                  msg: data.msg,
                                  buttons: Ext.Msg.OK,
                                  icon: Ext.Msg.INFO
                              });
                }
            },
            failure: function (response) {
            }
        });
    },

    guardarDetalleTrabajosEjecutados: function ()
    {
        var me = this;
        if (me.isValid()) {
            console.log(me.te.getValue());
            console.log(me.ot.getValue());
            me.viewpersonalmovil.store.each(function (r, i) {
                if (r.get('active')) {
                    r.set('ID_TE', me.te.getValue()),
                    r.set('ID_OT', me.ot.getValue()),
                    r.set('FCH_HOR_INI', me.convertirFechaHora(me.fechaejecucion.getValue(), me.horaini.getValue())),
                    r.set('FCH_HOR_FIN', me.convertirFechaHora(me.fechafinalizacion.getValue(), me.horafin.getValue())),
                    r.phantom = true;
                }
            });
            me.griddetalle.store.each(function (rec, index) {
                rec.set('ID_TE', me.te.getValue()),
                rec.set('ID_OT', me.ot.getValue()),
                rec.set('ID_POSTE', me.poste.getValue()),
                rec.set('ID_CONDUCTOR', me.conductor.getValue()),
                rec.set('ID_UC', me.unidadconstructiva.getValue())
                rec.set('FCH_HOR_INI', me.convertirFechaHora(me.fechaejecucion.getValue(), me.horaini.getValue())),
                rec.set('FCH_HOR_FIN', me.convertirFechaHora(me.fechafinalizacion.getValue(), me.horafin.getValue())),
                /*rec.set('ID_RESP', type: 'int' },
                rec.set('CAPATAZ' },
                rec.set('ID_MOVIL', type: 'int' },
                rec.set('MOVIL' },*/
                rec.set('NIVEL', me.nivel.getValue()),
                rec.set('DISTANCIA', me.distancia.getValue()),
                rec.set('EMERGENCIA', me.emergencia.getValue()),
                rec.set('TERR_DURO', me.terrenoduro.getValue()),
                rec.set('ESTADO_TERR', me.estadoterreno.getValue()),
                rec.set('NUEVA_INSTAL', me.nuevainstalacion.getValue()),
                rec.set('NUMERO_OA', me.numerooa.getValue()),
                rec.set('OTRAS_PLACAS', me.otrasplacas.getValue()),
                rec.set('ESTADO_PLACA', me.estadoplaca.getValue()),
                rec.set('AP', me.ap.getValue())
            });
            me.viewpersonalmovil.store.sync();
            me.griddetalle.store.sync();
            me.up('window').close();
        } else {
            Ext.Msg.alert("Error", "Complete los datos obligatorios")
        }
    },

    iniciarValoresFormulario: function (fechainicio, fechafin, horainicio, horafin, emergencia, terrenoduro) {
        var me = this;
        me.fechaejecucion(fechainicio);
        me.fechafinalizacion(fechafin);
        me.horaini(horainico);
        me.horafin(horafin);
        me.emergencia.setValue(emergencia);
        me.terrenoduro.setValue(terrenoduro);
    },

    buscarExiste: function (item, store, codsol, codman) {
        for (var i = 0; i < store.getCount() ; i++) {
            var comparar = store.getAt(i).data.IDPRODUCTO;
            if (item == comparar || item == store.getAt(i).data.DESC_PROD && store.getAt(i).data.ID_COD_SOL == codsol && store.getAt(i).data.ID_COD_MAN == codman) {
                return true;
            }
        }
    },

    convertirFechaHora: function (fecha, tiempo) {
        var nuevafecha = new Date(fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' + (fecha.getDate()) + ' ' + tiempo);
        return nuevafecha;
    },

});