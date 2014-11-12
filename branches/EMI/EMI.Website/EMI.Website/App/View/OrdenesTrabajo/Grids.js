Ext.define("App.View.OrdenesTrabajo.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    requires: ['App.Config.ux.Printer'],
    loadMask: true,
    opcion: '',
    pieTitulo: '',
    editar: false,
    conPie: false,
    imprimir: false,
    tituloImpresion: '',
    //evento del grid para mostrar las opcion de Verificar
    listenersbtn: null,
    /////
    initComponent: function () {

        var me = this;
        if (me.imprimir) {
            me.btn_imprimir = Ext.create('Ext.Button', {
                pressed: true,
                iconCls: 'printer',
                tooltip: 'Imprimir Datos',
                enableToggle: true,
                scope: this,
                //hidden: me.imprimir,
                tooltipType: 'qtip',
                handler: me.ImprimirReporte


            });
            me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
                items: [
                me.btn_imprimir,
                ]
            });
            this.dockedItems = me.toolBar;
            me.dock = this.dockedItems;
        }
        if (me.opcion == "GridOTTipo1") {
            me.title = "Detalles de Poste(s) Intervenido(s)";
            me.pieTitulo = "Reemplazo o Reparacion";
            me.CargarComponentesGridOTTipo1();
            /*  me.bbar = Ext.create('Ext.PagingToolbar', {
                  store: me.store,
                  displayInfo: true,
                  displayMsg: 'Desplegando {0} - {1} de {2}',
                  emptyMsg: "No existen " + me.pieTitulo + "."
  
              });*/
        }
        else if (me.opcion == "GridOTTipo1Consultas") {
            me.title = me.title == null ? "Presupuesto por Materiales" : me.title;
            me.pieTitulo = "Postes Intervenidos";
            me.CargarComponentesGridOTTipo1Consultas();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else if (me.opcion == "OTSeleccionadas") {
            me.title = "OT Seleccionadas para Asignacion";
            me.CargarComponentesSeleccionados();
        }
        else if (me.opcion == "DetallePoste") {
            me.title = "Detalle Intervencion Postes";
            me.CargarComponentesGridConsultarDetallePoste();
        }
        else if (me.opcion == "OTSeleccionadasReasignar") {
            me.title = "OT Seleccionadas para Reasignacion";
            me.CargarComponentesSeleccionados();
        }
        else if (me.opcion == "MaterialesOT") {
            me.title = "Devolucion de Materiales de OT";
            me.CargarComponentesMaterialesOT();
        }
        else if (me.opcion == "GridPlanillaMTyBT") {
            me.title = "Detalle Planilla de Inspeccion de Redes de Media y Baja Tensíon";
            me.CargarComponentesGridPlanillaMTyBT();
        }
        else if (me.opcion == "GridPlanillaMTyBTV1") {
            me.title = "Detalle Planilla de Inspeccion de Redes de Media y Baja Tensíon";
            me.CargarComponentesGridPlanillaMTyBTV1();
            if (!me.editar) {
                me.on('beforeedit', function () { return false; });
            }
        }
        else if (me.opcion == "GridSubDetallesPlanilla") {
            me.title = "Codigo Solucion y Materiales a Usar";
            me.CargarSubDetallePlanilla();
        }
        else if (me.opcion == "GridPlanillaMTyBTConsulta") {
            me.title = "Detalle Planilla de Inspeccion de Redes de Media y Baja Tensíon";
            me.CargarComponentesGridPlanillaMTyBTConsulta();
        }//OTElegidas
        else if (me.opcion == "OTElegidas") {
            me.title = "Ordenes de Trabajo Asignados";
            me.CargarComponentesGridPlanillaMTyBT();
        }
        else if (me.opcion == "PresupuestoMaterialMO") {

            me.title = me.title == null ? "Presupuesto por Materiales" : me.title;
            me.pieTitulo = "Presupestos";
            me.CargarPresupuestoMaterialMO();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else if (me.opcion == "DevoluciontoMaterial") {
            //alert("entro");
            me.title = me.title == null ? "Devolucion de Materiales" : me.title;
            me.pieTitulo = "Devoluciones de Materiales";
            me.CargarDevolucionesMateriales();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else if (me.opcion == "MaterialEjecutados") {
            //alert("entro");
            me.title = me.title == null ? "Materiales Ejecutados" : me.title;
            me.pieTitulo = "Materiales Ejecutados";
            me.CargarMaterialesEjecutados();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else if (me.opcion == "MaterialesPreEjeDev") {
            //alert("entro");
            me.title = me.title == null ? "Materiales" : me.title;
            me.pieTitulo = "Materiales";
            me.CargarMaterialesPreEjeDev();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });

        }
            //Grid Detalle Planilla Corto se usa para el registro de Planilla al detalle en grupo
        else if (me.opcion == "GridDetallePlanillaCorto") {

            me.CargarGridDetallePlanillaCorto();
            if (me.conPie) {
                me.bbar = Ext.create('Ext.PagingToolbar', {
                    store: me.store,
                    displayInfo: true,
                    displayMsg: 'Desplegando {0} - {1} de {2}',
                    emptyMsg: "No existen Postes o Conductores"

                });
            }
        }
            //Grid detalle para pago de contratista detella de Trabajo Ejecutado por Contratista
        else if (me.opcion == "GridDetalleContratista") {
            me.title = me.title == null ? "Detalles Contratista" : me.title;
            me.pieTitulo = "Detalles";
            me.CargarGridDetalleContratista();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });

        }else  if (me.opcion == "IntervPostes") {
            me.title = "Intervencion de Postes";
            me.CargarIntervencionPostes();
        }

            //MaterialEjecutados
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarComponentesGridOTTipo1: function () {
        var me = this;
        me.store = Ext.create('App.Store.OrdenesTrabajo.DetallesReemplazo');
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                if (record.get('INTERVENIDO') == true) {
                    return "PosteIntervenidoCss";
                }
                
                //return Constantes.CargarCssEstados(record.get("ESTADO"), 'OT');
            }
        };
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Prioridad", width: 50, sortable: true, dataIndex: 'PRIORIDAD', renderer: me.renderImagenPlanillaPrioridad },
            { header: "Cod. Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Cod. Mantenimiento", width: 120, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. Solucion", width: 120, sortable: true, dataIndex: "COD_SOL" },
       //     { header: "Centro <br>Costo", width: 80, sortable: true, dataIndex: "DESCRIPCION_CC" },
           // { header: "Detalle<br>Corto UC", width: 150, sortable: true, dataIndex: "DESC_CORTA" },

        ];
    },
    CargarComponentesGridOTTipo1Consultas: function () {
        var me = this;
        me.store = Ext.create('App.Store.OrdenesTrabajo.DetallesReemplazo');
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Cod. <br>Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Cod. <br>Mantenimiento", width: 80, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. <br>Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
         //   { header: "Centro <br>Costo", width: 80, sortable: true, dataIndex: "DESCRIPCION_CC" },
           // { header: "Detalle<br>Corto UC", width: 150, sortable: true, dataIndex: "DESC_CORTA" },

        ];
    },
    CargarComponentesGridConsultarDetallePoste: function () {
        var me = this;
        me.store = Ext.create('App.Store.OrdenesTrabajo.DetalleIntervencionPoste');
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "OT", width: 40, sortable: true, dataIndex: "ID_OT" },
           { header: "Cod. <br>Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
           { header: "Cod. <br>Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
           { header: "Cod. <br>Solucion", width: 70, sortable: true, dataIndex: "COD_SOL" },
           { header: "Cod UC", width: 100, sortable: true, dataIndex: "COD_UC" },
           { header: "Cod Producto", width: 100, sortable: true, dataIndex: "COD_PROD" },
           { header: "Des. Producto", width: 150, sortable: true, dataIndex: "DESC_PROD" },
           { header: "Ejecutor", width: 80, sortable: true, dataIndex: "EJECUTOR" },
           { header: "Fec. Inicio", width: 100, sortable: true, dataIndex: "FECHA_INICIO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
           { header: "Fec. Fin", width: 100, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        ];
    },
    CargarComponentesSeleccionados: function () {
        var me = this;
        //******************************
        me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        //******************************
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "ID OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Asignado a", width: 80, sortable: true, dataIndex: "NOMBRE_ASIGNADO" },
            {
                header: "Observacion", width: 250, sortable: true, dataIndex: "MOTIVO", editor: {
                    xtype: 'textfield',
                }
            },
            { header: "Tipo<br>OT", width: 70, sortable: true, dataIndex: "TIPO_OT" },
            { header: "Lugar Trabajo", width: 120, sortable: true, dataIndex: "LUGAR_TRABAJO" },
            { header: "Cod. Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
            {
                header: "Cod. Defecto", width: 70, sortable: true, dataIndex: "COD_DEF", editor: {
                    xtype: 'textfield',
                }
            },
            { header: "Cod. Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Problema", width: 250, sortable: true, dataIndex: "DESC_PROBL" },
            //{ header: "Observacion", width: 250, sortable: true, dataIndex: "OBSERVACION" },
            
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    CargarComponentesMaterialesOT: function () {
        var me = this;
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Cod Material", width: 100, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "UNIDAD_REPORTA" },
            { header: "Unidad", width: 150, sortable: true, dataIndex: "TIPO_DOCUMENTO" },
            { header: "Cantidad<br>Asignada", width: 150, sortable: true, dataIndex: "TIPO_DOCUMENTO1" },
            { header: "Cantidad<br>Devuelta", width: 150, sortable: true, dataIndex: "TIPO_DOCUMENTO1" },

        ];
    },
    BorrarOT: function () {
        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.getStore().remove(data);
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
        }
    },


    CargarComponentesGridPlanillaMTyBT: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPlanilla");
        //me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                if (record.get('ID_PLA_DET') == 0) {
                    return "EditarDetalleOT";
                }
                //return Constantes.CargarCssEditarDetallePlanilla(record.get("ESTADO"), 'OT');
            }
        };
        me.pieTitulo = "Detalles";
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.pieTitulo + "."

        });
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Codigo Poste<br>Conductor", width: 70, sortable: false, dataIndex: "CODIGO" },
           {
               header: "Piq", width: 50, sortable: false, dataIndex: "PIQUETE", editor: {
                   xtype: 'numberfield',
               }
           },
           {
               text: 'Unidad Constructiva', columns: [
                   { header: "Nivel<br>Tensíon", width: 50, sortable: false, dataIndex: "TENSION" },
                   { header: "Codigo <br>UC", width: 50, sortable: false, dataIndex: "COD_UC" },
                   { header: "Form", width: 70, sortable: false, dataIndex: "FORMACION_CND" },
                   { header: "Descripcion", width: 150, sortable: false, dataIndex: "DESCRIPCION" },
                   {
                       header: "Nivel", width: 70, sortable: false, dataIndex: "NIVEL", editor: {
                           xtype: 'numberfield',
                       }
                   },
                   {
                       header: "Cant UC", width: 50, sortable: false, dataIndex: "CANTIDAD", editor: {
                           xtype: 'numberfield',
                       }
                   },
                   {

                       header: "Cod Mant.", width: 70, sortable: false, dataIndex: "COD_MAN", editor: {
                           xtype: 'textfield',
                       }
                   },
               ]
           },
            {
                text: 'Codigo Solucion y Materiales a Usar', columns: [
                   {
                       header: "Codigo <br>Solucion", width: 50, sortable: false, dataIndex: "COD_SOL", editor: {
                           xtype: 'textfield',
                       }
                   },
                   {
                       header: "Codigo<br>Material", width: 50, sortable: false, dataIndex: "COD_PROD", editor: {
                           xtype: 'textfield',
                       }
                   },
                   { header: "Descripcion <br>Material", width: 100, sortable: false, dataIndex: "DESC_PROD" },
                   { header: "Unidad", width: 50, sortable: false, dataIndex: "UNID_PROD" },

                   {
                       header: "Cantidad<br>Material", width: 50, sortable: false, dataIndex: "CANT_PRE", editor: {
                           xtype: 'numberfield',
                       }
                   },
                ]
            },
           {
               header: "Cantidad<br>Acometida", width: 70, sortable: false, dataIndex: "CANT_ACOM", editor: {
                   xtype: 'numberfield',
               }
           },
           {
               header: "AP[si]o[no]", width: 70, sortable: false, dataIndex: "AP", editor: {
                   xtype: 'combo',
                   store: ["SI", "NO"]
               }
           },
           {
               header: "Distancia<br>Aprox. Poste<br>Camino", width: 80, sortable: true, dataIndex: "DIST_POS_CAMI", editor: {
                   xtype: 'numberfield',
                   allowBlank: false
               }
           },
           {
               header: "Observaciones", width: 100, sortable: false, dataIndex: "OBSERV", editor: {
                   xtype: 'textfield',
               }
           },

        ];
    },
    CargarComponentesGridPlanillaMTyBTV1: function () {
        var me = this;

        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPlanilla");

        //para la cabecera
        me.txt_busqueda = Ext.create("App.Config.Componente.TextFieldBase", { fieldLabel: '', width: 100, labelWidth: 90 })
        me.button = Ext.create('Ext.Button', {
            pressed: true,
            text: 'Buscar',
            iconCls: 'zoom',
            tooltip: 'Buscar por Codigo Poste',
            enableToggle: true,
            scope: this

        });
        me.checkIntervenido = Ext.create('Ext.form.field.Checkbox', {
            boxLabel: 'Mostrar Observados',
            name: 'INTERVENIDOS',
            inputValue: 'intervenidos',
            checked: false,
        });
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
            me.txt_busqueda,
            me.button,
            //me.checkIntervenido
            ]
        });

        this.dockedItems = me.toolBar;
        //me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                if (record.get('ID_PLA_DET') == 0) {
                    return "EditarDetalleOT";
                }
                //return Constantes.CargarCssEditarDetallePlanilla(record.get("ESTADO"), 'OT');
            },
            listeners: me.listenersbtn
        };
        me.pieTitulo = "Detalles";
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.pieTitulo + ".",
            items: me.checkIntervenido

        });
        me.bar = me.bbar;
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Prio<br>ridad", width: 40, sortable: true, dataIndex: 'PRIORIDAD', renderer: me.renderImagenPlanillaPrioridad },
           { header: "Con<br>Mat", width: 40, sortable: true, dataIndex: 'VERIFICADO', renderer: me.renderImagenPlanilla },
           { header: "Codigo Poste<br>Conductor", width: 70, sortable: true, dataIndex: "CODIGO" },
           {
               header: "Piq", width: 50, sortable: true, dataIndex: "PIQUETE", editor: {
                   xtype: 'numberfield',
               }
           },
           {
               text: 'Unidad Constructiva', columns: [
                   { header: "Nivel<br>Tensíon", width: 50, sortable: true, dataIndex: "TENSION" },
                   { header: "Codigo <br>UC", width: 50, sortable: true, dataIndex: "COD_UC" },
                   { header: "Form", width: 70, sortable: true, dataIndex: "FORMACION_CND" },
                   { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
                   {
                       header: "Nivel", width: 70, sortable: true, dataIndex: "NIVEL", editor: {
                           xtype: 'numberfield',
                       }
                   },
                   {
                       header: "Cant UC", width: 50, sortable: true, dataIndex: "CANTIDAD", editor: {
                           xtype: 'numberfield',
                       }
                   },
                   {

                       header: "Cod Mant.", width: 70, sortable: true, dataIndex: "COD_MAN", /*editor: {
                           xtype: 'textfield',
                       }*/
                   },
               ]
           },
           {
               header: "Cantidad<br>Acometida", width: 70, sortable: true, dataIndex: "CANT_ACOM", editor: {
                   xtype: 'numberfield',
               }
           },
           {
               header: "AP[si]o[no]", width: 70, sortable: true, dataIndex: "AP", editor: {
                   xtype: 'combo',
                   store: ["SI", "NO"]
               }
           },
           {
               header: "Distancia<br>Aprox. Poste<br>Camino", width: 80, sortable: true, dataIndex: "DIST_POS_CAMI", editor: {
                   xtype: 'numberfield',
                   allowBlank: false
               }
           },
           {
               header: "Observaciones", width: 100, sortable: true, dataIndex: "OBSERV", editor: {
                   xtype: 'textfield',
               }
           },

        ];
        me.txt_busqueda.on('specialkey', function (f, e) {
            if (e.getKey() == e.ENTER) {
                me.store.setExtraParam('Contiene', me.txt_busqueda.getValue());
                me.bar.moveFirst();
            }
        });
        me.button.on('click', function () {
            me.store.setExtraParam('Contiene', me.txt_busqueda.getValue());
            me.bar.moveFirst();
        });
        me.checkIntervenido.on('change', function (ck, newValue, oldValue, eOpts) {
            me.store.setExtraParam('intervenidos', newValue);
            me.bar.moveFirst();
        });
    },
    CargarComponentesGridPlanillaMTyBTConsulta: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPlanilla");
        me.pieTitulo = "Detalles";
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.pieTitulo + "."

        });
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Codigo Poste<br>Conductor", width: 70, sortable: true, dataIndex: "CODIGO" },
           {
               header: "Piq", width: 50, sortable: true, dataIndex: "PIQUETE"
           },
           {
               text: 'Unidad Constructiva', columns: [
                   { header: "Nivel<br>Tensíon", width: 50, sortable: true, dataIndex: "TENSION" },
                   { header: "Codigo <br>UC", width: 50, sortable: true, dataIndex: "COD_UC" },
                   { header: "Form", width: 70, sortable: true, dataIndex: "FORMACION_CND" },
                   { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
                   {
                       header: "Nivel", width: 70, sortable: true, dataIndex: "NIVEL"
                   },
                   {
                       header: "Cant UC", width: 50, sortable: true, dataIndex: "CANTIDAD"
                   },
                   {

                       header: "Cod Mant.", width: 70, sortable: true, dataIndex: "COD_MAN"
                   },
               ]
           },
           {
               text: 'Codigo Solucion y Materiales a Usar', columns: [
                  {
                      header: "Codigo <br>Solucion", width: 50, sortable: false, dataIndex: "COD_SOL"
                  },
                  {
                      header: "Codigo<br>Material", width: 50, sortable: false, dataIndex: "COD_PROD"
                  },
                  { header: "Descripcion <br>Material", width: 100, sortable: false, dataIndex: "DESC_PROD" },
                  { header: "Unidad", width: 50, sortable: false, dataIndex: "UNID_PROD" },

                  {
                      header: "Cantidad<br>Material", width: 50, sortable: false, dataIndex: "CANT_PRE"
                  },
               ]
           },
           {
               header: "Cantidad<br>Acometida", width: 70, sortable: true, dataIndex: "CANT_ACOM"
           },
           {
               header: "AP[si]o[no]", width: 70, sortable: true, dataIndex: "AP"
           },
           {
               header: "Distancia<br>Aprox. Poste<br>Camino", width: 70, sortable: true, dataIndex: "DIST_POS_CAM"
           },
           {
               header: "Observaciones", width: 100, sortable: true, dataIndex: "OBSERV"
           },

        ];
    },
    CargarPresupuestoMaterialMO: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPresupuesto");
        if (me.editar) {
            me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
            ];
            me.columnCantPre = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Presupuestada",
                width: 75,
                sortable: true,
                dataIndex: "CANT_PRE",
                editor: {
                    xtype: 'numberfield',
                    selectOnFocus: true
                }
            });
            me.columnCunetaContable = Ext.create("Ext.grid.column.Column", {
                header: "Cuenta<br>Contable",
                width: 70,
                sortable: true,
                dataIndex: "CODCUENTA",
                editor: {
                    xtype: 'textfield',
                    selectOnFocus: true
                }
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls: 'delete',
                        tooltip: 'Eliminar',
                        handler: me.handler
                    }]
            });
        }
        else {
            me.columnCantPre = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Presupuestada",
                width: 75,
                sortable: true,
                dataIndex: "CANT_PRE"
            });
            me.columnCunetaContable = Ext.create("Ext.grid.column.Column", {
                header: "Cuenta<br>Contable",
                width: 70,
                sortable: true,
                dataIndex: "CODCUENTA"
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                hidden: true,
            });
        }
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Poste/Conductor", width: 70, sortable: true, dataIndex: "CODIGO" },
           { header: "Unidad/Constructiva", width: 70, sortable: true, dataIndex: "CODIGO_UC" },
            { header: "Tipo <br>Item", width: 55, sortable: true, dataIndex: "TIPO_PROD" },
            { header: "Codigo<br>Item", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            me.columnCantPre,
            { header: "Tipo<br>Vale", width: 55, sortable: true, dataIndex: "TIPO_VALE" },
            { header: "Nro<br>Vale", width: 55, sortable: true, dataIndex: "IDVALE" },
            { header: "Nro<br>Comp.", width: 55, sortable: true, dataIndex: "NROCBTE" },
            { header: "Nro Vale<br>Cambiado.", width: 55, sortable: true, dataIndex: "CAN_IDVALE" },
            { header: "Deposito", width: 55, sortable: true, dataIndex: "IDDEPOSITO" },
            //me.columnCunetaContable,
            me.columnAction

        ];
    },
    CargarDevolucionesMateriales: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesDevolucion");
        if (me.editar) {
            me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
            ];
            me.columnCantDev = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Devolucion",
                width: 75,
                sortable: true,
                dataIndex: "CANT_DEV",
                editor: {
                    xtype: 'numberfield',
                }
            });
            me.columnObservacion = Ext.create("Ext.grid.column.Column", {
                header: "Observacion",
                width: 150,
                sortable: true,
                hidden: true,
                dataIndex: "OBSERVACION",
                editor: {
                    xtype: 'textfield',
                }
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls: 'delete',
                        tooltip: 'Eliminar',
                        handler: me.handler
                    }]
            });
        }
        else {
            me.columnCantDev = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Devolucion",
                width: 75,
                sortable: true,
                dataIndex: "CANT_DEV"
            });
            me.columnObservacion = Ext.create("Ext.grid.column.Column", {
                header: "Observacion",
                width: 150,
                sortable: true,
                hidden: true,
                dataIndex: "OBSERVACION"
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                hidden: true,
            });
        }
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            me.columnCantDev,
            me.columnObservacion,
            me.columnAction

        ];
    },
    CargarMaterialesEjecutados: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesMaterialEjecutado");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 200, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            { header: "Cant.<br>Ejecutada", width: 100, sortable: true, dataIndex: "CANTIDAD" },
        ];
    },
    CargarMaterialesPreEjeDev: function () {
        var me = this;
        //me.xtype = 'row-expander-grid';
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesMaterialPreEjeDev");
        me.columnAction = Ext.create("Ext.grid.column.Action", {
            width: 27,
            align: 'center',
            items: [
                {
                    iconCls: 'report',
                    tooltip: 'Ver Postes o Conductores',
                    handler: me.handlerPoste
                }]
        });
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("TIPO_PROD"), 'MO');
            }
        };
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            me.columnAction,
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 200, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            { header: "Cant.<br>Presupuestada", width: 90, sortable: true, dataIndex: "CANT_PRE" },
            {
                text: 'Materiales de Vales', columns: [
                    { header: "Vale <br>Normal", width: 60, sortable: false, dataIndex: "CANT_VAL_N" },
                    { header: "Vale <br>Incremental", width: 60, sortable: false, dataIndex: "CANT_VAL_I" },
                    { header: "Vale <br>Cambio", width: 60, sortable: false, dataIndex: "CANT_VAL_C" },
                ]
            },
            { header: "Cant.<br>Ejecutada", width: 90, sortable: true, dataIndex: "CANT_EJE" },
            { header: "Cant.<br>Devoluciones", width: 90, sortable: true, dataIndex: "CANT_DEV" },
            {
                header: "Total", width: 90, sortable: true, dataIndex: "TOTAL",
                renderer: function (value, metadata) {
                    metadata.tdAttr = 'data-qtip=" (Vale Normal + Vale Incremental + Vale en Cambio) - (Cant. Ejecutado + Cant. Devoluciones) = 0"';
                    return value;
                }
            },
        ];
        //me.plugins = [{
        //    ptype: 'rowexpander',
        //    rowBodyTpl: [
        //        '<p><b>Company:</b> {COD_PROD}</p><br>',
        //        '<p><b>Summary:</b> {CANT_PRE}</p>'
        //    ]
        //}];
        //me.collapsible = true;
        //me.animCollapse = false;
    },

    CargarSubDetallePlanilla: function () {
        var me = this;
        me.pieTitulo = "Detalles";
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesSubPlanilla");

        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.pieTitulo + "."

        });

        if (me.editar) {
            me.viewConfig = {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    if (record.get('IDSTATUS') == 0) {
                        return 'MatInactivosGridCSS';
                    }

                }
            };
            me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
            ];
            me.columnCantPre = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Material",
                width: 75,
                sortable: false,
                dataIndex: "CANT_PRE",
                editor: {
                    xtype: 'numberfield',
                }
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls: 'delete',
                        tooltip: 'Eliminar',
                        handler: me.handler
                    }]
            });
        }
        else {
            me.columnCantPre = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Material",
                width: 75,
                sortable: false,
                dataIndex: "CANT_PRE"
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                hidden: true,
            });
        }
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           //{ header: "Poste/Conductor", width: 70, sortable: true, dataIndex: "CODIGO" },
           { header: "Cod Mant.", width: 70, sortable: false, dataIndex: "COD_MAN" },
            { header: "Codigo <br>Solucion", width: 50, sortable: false, dataIndex: "COD_SOL" },
            { header: "Codigo<br>Item", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            me.columnCantPre,
            me.columnAction

        ];
    },
    renderImagenPlanilla: function (val, metaData, record) {
        //alert(record.data.ESTADO_PLA)
        if (record.data.INTERVENIDO == true) {
            return '<img data-qtip="OT con Planilla en Estado NUEVA", src="' + Constantes.HOST + 'Content/Iconos/wrench_orange.png" />';
        }
        else {
            if (record.get('VERIFICADO') === true) {
                return '<img data-qtip="Poste Verificado", src="' + Constantes.HOST + 'Content/Iconos/accept.png" />';
            }
            else {
                return '<img data-qtip="Poste Sin Verificacion", src="' + Constantes.HOST + 'Content/Iconos/bullet_error.png" />';
            }
        }
    },
    renderImagenPlanillaPrioridad: function (val, metaData, record) {
        if (val == true) {
            return '<img data-qtip="Prioridad Alta", src="' + Constantes.HOST + 'Content/Iconos/flag_red.png" />';
        }
        else {
            return '<img data-qtip="Prioridad Baja", src="' + Constantes.HOST + 'Content/Iconos/flag_green.png" />';
           
        }
    },
    //metodo donde se define las columnas del grid detalle de planilla corto 
    CargarGridDetallePlanillaCorto: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPlanilla");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo Poste<br>Conductor", width: 75, sortable: true, dataIndex: "CODIGO" },
            { header: "Niv. <br>Tension", width: 45, sortable: true, dataIndex: "TENSION" },
            { header: "Codigo <br>UC", width: 50, sortable: false, dataIndex: "COD_UC" },
            { header: "Form", width: 50, sortable: false, dataIndex: "FORMACION_CND" }

        ];
        me.on('itemclick', me.onItemClick, this);
    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.recordSelected = record;
    },

    //Grid para mostrar detalle de trabajo Contratista
    CargarGridDetalleContratista: function () {
        var me = this;
        me.store = Ext.create("App.store.OrdenesTrabajo.DetalleEjecutadoContratista");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo Poste<br>Conductor", width: 75, sortable: true, dataIndex: "CODIGO" },
            { header: "Codigo <br>UC", width: 50, sortable: false, dataIndex: "CODIGO_UC" },
            { header: "Form", width: 50, sortable: false, dataIndex: "FORMACION_CND" },
            { header: "Producto", width: 70, sortable: false, dataIndex: "COD_PROD" },
            { header: "Descripcion", width: 200, sortable: false, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 50, sortable: false, dataIndex: "UNID_PROD" },
            //{ header: "Costo", width: 50, sortable: false, dataIndex: "FORMACION_CND" },
            { header: "Cant<br>Eje", width: 50, sortable: false, dataIndex: "CANT_EJE" },
            //{ header: "Total", width: 50, sortable: false, dataIndex: "FORMACION_CND" },



        ];

    },
    CargarIntervencionPostes: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.OrdenesTrabajo", {
            url: 'OrdenesTrabajo/ObtenerIntervencionPostes'
        });
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Cod Def.", width: 100, sortable: true, dataIndex: "COD_DEF" },
            { header: "Cod Man.", width: 100, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod Sol.", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Fec Prob.", width: 100, sortable: true, dataIndex: "FECHA_PROBL", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fec Ejec. Ini.", width: 100, sortable: true, dataIndex: "FECHA_EJE_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fec Ejec. Fin", width: 100, sortable: true, dataIndex: "FECHA_EJE_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Ejecutor", width: 200, sortable: true, dataIndex: "NOMBRE_ASIGNADO" },
           
        ];
    },
    ImprimirReporte: function () {
        var me = this;
        // alert(me.tituloImpresion);
        App.Config.ux.Printer.filtros = me.tituloImpresion;
        App.Config.ux.Printer.print(me);

    },
    handlerPoste: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        alert(rec.get('COD_PROD'));
    }
});

