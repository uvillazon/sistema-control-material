Ext.define("App.View.Postes.GridPostes", {
    extend: "App.Config.Abstract.Grid",
    title: 'Postes Registrados',
    criterios: true,
    textBusqueda: 'Postes',
    imprimir: true,
    width: 550, 
    height: 350,
    equipo: 'Postes',
    win: null,
    formulario: null,
    imagenes: true,
    check: false,
    checkTodos : false,
    opcion: '',
    relevamiento : false,
    initComponent: function () {
        var me = this;
        if (me.opcion=='') {
            me.store = Ext.create("App.Store.Postes.Postes");
        }
        else if ( me.opcion=='PostesPuesto') {
            me.store = Ext.create("App.Store.Puestos.PostesPorPuesto");
            me.cargarStore = false;
        }
       
        me.CargarComponentes();
        if (me.check) {
            sm = new Ext.selection.CheckboxModel({
                showHeaderCheckbox: true,
                checkOnly: true,
                headerWidth: 40,
                onHeaderClick: function (headerCt, header, e) {
                    if (header.isCheckerHd) {
                        e.stopEvent();
                        var me = this,
                            isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
                        me.preventFocus = true;
                        if (isChecked) {
                            me.checkTodos = false;
                            me.deselectAll();
                        } else {
                            me.checkTodos = true;
                            me.selectAll();
                        }
                        delete me.preventFocus;
                    }
                }
            });
            me.selModel = sm;
            //*****************************************************

        }
        if (me.opcion == 'PostesPuesto') {
            me.checkIntervenido = Ext.create('Ext.form.field.Checkbox', {
                boxLabel: 'Intervenidos',
                name: 'INTERVENIDOS',
                inputValue: 'intervenidos',
                checked: false,
            });
            me.checkPrioridad = Ext.create('Ext.form.field.Checkbox', {
                boxLabel: 'Prioritarios',
                name: 'PRIORITARIO',
                inputValue: 'prioritario',
                checked: false,
            });
            me.viewConfig = {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    if (record.get('INTERVENIDO') == true) {
                        return "PosteIntervenidoCss";
                    }

                    //return Constantes.CargarCssEstados(record.get("ESTADO"), 'OT');
                }
            };
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + ".",
                items: [me.checkIntervenido, me.checkPrioridad]

            });
            me.bar = me.bbar;
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls: 'add',
                        tooltip: 'Agregar',
                        //handler: me.handlerPoste
                    }]
            });
            me.columns = [
           { xtype: "rownumberer", width: 45, sortable: false, hidden: me.check },
           { header: "Prio<br>ridad", width: 40, sortable: true, dataIndex: 'PRIORIDAD', renderer: me.renderImagenPlanillaPrioridad },
           { header: "Codigo<br>Poste", width: 90, sortable: true, dataIndex: 'COD_POSTE' },
           { header: "Area", width: 90, sortable: true, dataIndex: 'AREA_UBIC' },
           { header: "Ubicacion", width: 100, sortable: true, dataIndex: 'UBICACION' },
            me.columnAction
            ];
            me.checkIntervenido.on('change', function (ck, newValue, oldValue, eOpts) {
                me.store.setExtraParam('intervenidos', newValue);
                me.bar.moveFirst();
                //  alert(newValue);
                //el siguiente codigo no permite q se seleccionen los dos checkbox para ningun caso solo el seleccionado actualmente
                if (newValue == true) {                 
                    me.checkPrioridad.setDisabled(true);
                } else {
                    me.checkPrioridad.setDisabled(false);
                }
            });
            me.checkPrioridad.on('change', function (ck, newValue, oldValue, eOpts) {
                me.store.setExtraParam('prioritarios', newValue);
                me.bar.moveFirst();
                //el siguiente codigo no permite q se seleccionen los dos checkbox para ningun caso solo el seleccionado actualmente
                if (newValue == true) {
                    me.checkIntervenido.setDisabled(true);
                } else {
                    me.checkIntervenido.setDisabled(false);
                }
            });
        } else {
            me.columns = [
            { xtype: "rownumberer", width: 45, sortable: false, hidden: me.check },
            { header: "Img", width: 155, sortable: true, dataIndex: 'ID_POSTE', renderer: me.renderImagen, disabled: me.imagenes ? true : false, hidden: me.imagenes },
            { header: "Codigo<br>Poste", width: 90, sortable: true, dataIndex: 'COD_POSTE' },
            { header: "Sistema", width: 90, sortable: true, dataIndex: 'AREA_UBIC' },
            { header: "Ubicacion", width: 90, sortable: true, dataIndex: 'UBICACION' },
            { header: "Codigo<br>Tipo", width: 90, sortable: true, dataIndex: 'COD_TIPO' },
            { header: "Descrp. Tipo", width: 90, sortable: true, dataIndex: 'DESC_TIPO' },
            { header: 'Fecha<br>Operacion', dataIndex: 'FECHA_OPER', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') }
            ];
        }
        //me.on('celldblclick', me.DevolverDatosPoste, this);
        if (me.relevamiento && me.check) {
            me.store.on('load', me.CargarStorePuesto, me);
        }
        this.callParent(arguments);
    },
    CargarStorePuesto : function(grd, records, successful, eOpts){
        var me = this;
        for (i = 0 ; i < records.length ; i++){
            if (records[i].get('RELEVAMIENTO')) {
                me.selModel.select(records[i], true);
            }
        }
        
       
    },
    DevolverDatosPoste: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if (me.win != null) {
            me.win.hide();
            me.record = record;
            me.formulario.CargarPoste(record);
        } else {

        }
    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_POSTE == 0) {
            return '<img src="../Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150&TABLA=MN_POSTES"/>';
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
    handlerPoste: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        //alert(rec.get('COD_PROD'));
        alert(rec.get('COD_POSTE'));
    }
});