Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.GridOTsContratista', {
    extend: /*'Ext.grid.Panel',*/'App.Config.Abstract.Grid',
    alias: 'widget.gridotcontratista',
    iconCls: null,
    itemId: 'gridOTsContratista',
    width: 300,
    height: 500,
    margins: '0 20 10 20',
    initComponent: function () {
        var me = this;
        me.createModel();
        me.columns = me.buildColumns();
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'OT');
            }
        };
        me.store = me.buildStore();
        me.dockedItems = me.buildDockedItems();
        //me.store.load();
        this.callParent(arguments);
    },

    createModel: function () {

    },

    buildStore: function () {
        return Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable', {
            proxy: {
                type: 'jsonp',
                url: Constantes.HOST + 'OrdenesTrabajo/ObtenerOrdenesTrabajoEjecutadoContratista',
                reader: {
                    root: 'Rows',
                    totalProperty: 'Total'
                },
                simpleSortMode: true
            },
            sorters: [{
                property: 'ID_OT',
                direction: 'DESC'
            }]
        });
    },

    buildColumns: function () {
        var tpl = '<h2>Nro. OT: {ID_OT}</h2><h4>S.M.: {ID_SOL_MAN}</h4> <tpl if="TIPO_OT == \'PROYECTO\'"> <div class = "resaltarAzul">Obra: {NRO_SOL}  Proy: {NRO_PRO}</div></br></tpl> Estado: {ESTADO}';
        return [{ text: '<b>Orden de Trabajo</b>', xtype: 'templatecolumn', flex: 1, dataIndex: 'ID_OT', tpl: tpl },
                  { text: '<b>Reporte</b>', align: 'center', witdh: 75, dataIndex: 'REPORTE_CONTRATISTA', renderer: function (v, metadata) {
                      metadata.tdAttr = 'data-qtip="Seleccione una OT en Estado: EN_EJEC, para registrar su Reporte"';
                      return '<img src="Content/images/' + v.toLowerCase() + '.png">';
                  }}]
    },

    buildDockedItems: function () {
        return [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: this.store,
        }]
    },

});