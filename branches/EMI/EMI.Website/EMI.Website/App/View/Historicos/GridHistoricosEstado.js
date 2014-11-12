Ext.define("App.View.Historicos.GridHistoricosEstado", {
    extend: "Ext.grid.Panel",
    title: "Historicos",
    width: 650,
    height: 500,
    requires: ['App.Config.ux.Printer'],
    margins: '0 2 0 0',
    initComponent: function () {
        var me = this;
        me.CrearColumnas();
        me.EventosGridHistoricos();
        this.callParent(arguments);
    },
    EventosGridHistoricos: function () {
        var me = this;
        me.button.on('click', function () {
            me.store.setExtraParam('Contiene', me.txt_busqueda.getValue());
            me.store.setExtraParamDate('FECHA_INICIAL', me.date_fechaInicial.getValue());
            me.store.setExtraParamDate('FECHA_FINAL', me.date_fechaFinal.getValue());
            me.bar.moveFirst();
        });

    },
    CrearColumnas: function () {
        var me = this;
        me.store = Ext.create("App.Store.Historicos.HistoricosEstado");
        //me.store.load();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Operacion", width: 100, sortable: false, dataIndex: "OPERACION" },
            { header: "Detalle", width: 350, sortable: false, dataIndex: "OBSERV", renderer: me.renderDetalle },
            { header: "Fecha", width: 150, sortable: false, dataIndex: "FECHA_REG", renderer: me.renderPost },

        ];
        me.btn_imprimir = Ext.create('Ext.Button', {
            pressed: true,
            iconCls: 'printer',
            tooltip: 'Imprimir Datos',
            enableToggle: true,
            scope: this,
            handler: me.ImprimirReporte

        });
        me.date_fechaInicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Inicial',
            margin: '5',
            name: 'FECHA_INICIAL',
            labelWidth: 70,
            width: 170,
            opcion: 'blanco',
        });

        me.date_fechaFinal = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha  Final',
            name: 'FECHA_FINAL',
            labelWidth: 70,
            margin: '5',
            width: 170,
            opcion: 'blanco',
        });
        me.txt_busqueda = Ext.create("App.Config.Componente.TextFieldBase", { fieldLabel: "Responsable", width: 170, labelWidth: 70 })
        me.button = Ext.create('Ext.Button', {
            pressed: true,
            text: 'Buscar',
            iconCls: 'zoom',
            tooltip: 'Buscar por Criterio',
            enableToggle: true,
            scope: this

        });
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                me.date_fechaInicial,
                me.date_fechaFinal,
                me.txt_busqueda,
                me.button,
                me.btn_imprimir,
            ]
        });
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen Historicos de Cambio"

        });
        me.bar = me.bbar;
    },
    renderDetalle: function (value, p, record) {
        return Ext.String.format(
            'Estado Origen <strong>{0} </strong>   - Estado Destino <strong>{1} </strong></p><h3>Observacion</h3>{2}',
            record.data.EST_ORIG,
            record.data.EST_DEST,
            value
        );
    },
    renderPost: function (value, p, r) {
        return Ext.String.format('{0}<p/> Por <strong>{1}</strong></p>Autorizado Por <strong>{2}</strong> ',
            Ext.Date.dateFormat(value, 'd/m/Y g:i a'),
            r.get('LOGIN_USR'),
            r.get('NOM_AUTORIZA')            
        );
    },
    ImprimirReporte: function () {
        var me = this;
        // alert(me.tituloImpresion);
        //App.Config.ux.Printer.filtros = me.title;
        App.Config.ux.Printer.print(me);

    },
    //
    CargarHistorico: function (tabla, id) {
        var me = this;
        if (tabla != null && id != null) {
            me.store.setExtraParam('TABLA', tabla);
            me.store.setExtraParam('ID_TABLA', id);
            me.store.load();
        }
        else {
            Ext.Msg.alert("Error", "Tiene que Enviar los parametros TABLA y ID_TABLA");
        }
    },
    MostrarVentanaHistorico: function (tabla, id) {
        var me = this;
        if (tabla != null && id != null) {
            me.store.setExtraParam('TABLA', tabla);
            me.store.setExtraParam('ID_TABLA', id);
            me.store.load();
            var win = Ext.create("App.Config.Abstract.Window", {
                botones: false, width: 650,
                height: 500,
            });
            win.add(me);
            win.show();
        }
        else {
            Ext.Msg.alert("Error", "Tiene que Enviar los parametros TABLA y ID_TABLA");
        }
    }
});
