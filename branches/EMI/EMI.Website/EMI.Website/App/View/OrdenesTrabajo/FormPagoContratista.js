Ext.define("App.View.OrdenesTrabajo.FormPagoContratista", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario Pago de Contratista",
    cargarStores: true,
    //columns: 2,
    opcion: '',
    winUC: null,
    winDetalle: null,
    winPrincipal: null,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormPagoContratista") {
            me.CargarFormPagoContratista();
            me.EventosFormPagoContratista();
            //me.eventosBotton();
            //me.CargarVentanaDetalleItem();
            //me.winPrincipal.btn_guardar.on('click', me.GuardarPlanilla, this);
        }
        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    //Cargamos los componentes de la interfaz de pago a contratista
    CargarFormPagoContratista: function () {
        var me = this;
        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            opcion: 'GridOTContratistas',
            title: 'OTs Por Contratistas',
            width: 350,
            height: 550,
            //false para mostrar y true para ocultar la imagen que indica si la ot tiene pago o no
            imagenPago: false,
            imagenTrabEje: false
        });
        me.formOT = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'FormConsultaOTContratista', columns: 3, colspan: 2,
            title: '',
            icono: false
        });
        me.formCabeceraPago = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'FormPagoContratista', columns: 3, colspan: 2,
            title: '',
            icono: false
        });
        Funciones.BloquearFormularioReadOnly(me.formOT);
        Funciones.BloquearFormularioReadOnly(me.formCabeceraPago);
        me.gridDetalle = Ext.create('App.View.OrdenesTrabajo.Grids', {
            opcion: 'GridDetalleContratista',
            title: 'Detalle Mo Contratista',
            width: 760,
            height: 250
        });
        //vamos a filitar todos los detalles que son MO
        me.gridDetalle.getStore().setExtraParams({ TIPO_PROD: 'MO' });
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            items: [
                me.formCabeceraPago,
                me.formOT,
                me.gridDetalle
            ]
        });
        me.items = [
         me.gridOT,
         me.form

        ];
    },
    EventosFormPagoContratista: function () {
        var me = this;
        //me.gridOT.on('cellclick', function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {

        //});
        me.gridOT.getSelectionModel().on('selectionchange', me.onSelectChange, this);
        me.formCabeceraPago.cbx_grupoSCC.on('select', function (cmb, record) {
            //me.store_SCC = Ext.create('App.Store.OrdenesTrabajo.CentroCostos');
            //me.store_SCC.limpiarParametros();
            me.formCabeceraPago.cbx_SCC.reset();
            me.formCabeceraPago.store_SCC.setExtraParams({ IDGRUPOCC: record[0].get('IDGRUPOCC') });
            me.formCabeceraPago.store_SCC.load();

        });
        me.formCabeceraPago.chk_css.on('change', function (chk, newValue, oldValue, eOpts) {
            //me.store_SCC = Ext.create('App.Store.OrdenesTrabajo.CentroCostos');
            //me.store_SCC.limpiarParametros();
            me.formCabeceraPago.cbx_grupoSCC.reset();
            me.formCabeceraPago.cbx_SCC.reset();
            me.formCabeceraPago.store_grupoSCC.setExtraParams({ porUsuario: newValue });
            me.formCabeceraPago.store_grupoSCC.load();

        });
        //me.gridOT.on('cellclick', function ( grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        //    alert(cellIndex + "  " + rowIndex);
        //});

    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        if (disabled) {
            me.getForm().reset();
            me.gridDetalle.getStore().setExtraParams({ ID_TE: 0 });
            me.gridDetalle.getStore().load();
            //alert("entro");
            Funciones.DisabledButton('btn_guardar', me.winPrincipal, true);
            Funciones.BloquearFormularioReadOnly(me.formCabeceraPago);
        }
        else {
            
            me.formOT.loadRecord(selections[0]);
            me.gridDetalle.getStore().setExtraParams({ ID_TE: selections[0].get('ID_TE') });
            me.gridDetalle.getStore().load();
           
            if (selections[0].get('CON_PAGO') && selections[0].get('ESTADO_EJE_CNT') == "APROBADO" && selections[0].get('ESTADO') == "EJECUTADA") {
                
                me.formCabeceraPago.cbx_grupoSCC.setReadOnly(false);
                me.formCabeceraPago.cbx_SCC.setReadOnly(false);
                me.formCabeceraPago.chk_css.setReadOnly(false);
                me.formCabeceraPago.loadRecord(selections[0]);
                Funciones.DisabledButton('btn_guardar', me.winPrincipal, false);
                //Funciones.BloquearFormularioReadOnly(me.formCabeceraPago, ["IDGRUPOCC", "IDCENTRO_COSTO", "GCC"]);
            }
            else {
                Funciones.DisabledButton('btn_guardar', me.winPrincipal, true);
                Funciones.BloquearFormularioReadOnly(me.formCabeceraPago);

            }
        }
       

    }
});
