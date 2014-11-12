//Grid con Rows Expaner Por defecto
Ext.define("App.View.OrdenesTrabajo.GridsRE", {
    extend: "Ext.grid.Panel",
    //width: 250,
    requires: ['App.Config.ux.Printer'],
    collapsible: true,
    animCollapse: false,
    opcion: '',
    pieTitulo: '',
    editar: false,
    conPie: false,
    imprimir: false,
    tituloImpresion: '',
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: ['ELFADALSD : {NOMBRE}']
    }],
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
        if (me.opcion == "MaterialesPreEjeDev") {
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
     
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
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

   
    ImprimirReporte: function () {
        var me = this;
        // alert(me.tituloImpresion);
        App.Config.ux.Printer.filtros = me.tituloImpresion;
        App.Config.ux.Printer.print(me);

    },
});

