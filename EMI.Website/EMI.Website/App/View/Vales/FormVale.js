Ext.define("App.View.Vales.FormVale", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    desdePrincipal: false,
    //record de la OT
    ot: null,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormCrearVale") {
            me.title = "Formulario de Creacion de Vales";
            me.CargarFormCrearVale();
            me.eventosFormCrearVale();
        }
        else {
            alert("Seleccione alguna Opciones");
        }
        this.callParent(arguments);
    },
    CargarFormCrearVale: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_VALE",
            hidden: true,
        });
        me.txt_nro_vale = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Vale",
            name: "NROVALE",
            width: 240,
            maxLength: 20,
            readOnly: true
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            //opcion: "sin fecha",
            fieldLabel: "Fecha",
            name: "FECHA",
            width: 240,
            colspan : me.desdePrincipal ? 2: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_VALE'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo Vale",
            name: "TIPO_VALE",
            displayField: 'VALOR',
            store: me.store_tipo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            value: 'NORMAL'
        });

        me.chk_css = Ext.create("Ext.form.field.Checkbox", {
            boxLabel: 'Grupos Propios',
            name: 'GCC',
            checked: true
        });
        me.store_grupoSCC = Ext.create('App.Store.OrdenesTrabajo.GrupoCentroCostos').load();
        me.cbx_grupoSCC = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Grp Centro Costos",
            name: "IDGRUPOCC",
            valueField: 'IDGRUPOCC',
            displayField: 'IDGRUPOCC',
            store: me.store_grupoSCC,
            afterLabelTextTpl: Constantes.REQUERIDO,
            textoTpl: function () { return "{IDGRUPOCC} -  {DESCRIPCION}" },
            allowBlank: false,
        });
        me.store_SCC = Ext.create('App.Store.OrdenesTrabajo.CentroCostos');
        me.cbx_SCC = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Centro Costos",
            name: "IDCENTRO_COSTO",
            displayField: 'IDCENTRO_COSTO',
            valueField: 'IDCENTRO_COSTO',
            store: me.store_SCC,
            afterLabelTextTpl: Constantes.REQUERIDO,
            textoTpl: function () { return "{IDCENTRO_COSTO} -  {DESCRIPCION}" },
            allowBlank: false,
            
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_nro_ot = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "NRO_OT",
            width: 240,
            maxLength: 15,
            colspan: 1,
            hidden : true,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.formOT = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'FormConsultaOTSM', columns: 3, colspan: 3,
            title: '',
            icono: false
        });
        Funciones.BloquearFormularioReadOnly(me.formOT);

        me.gridMaterialesVale = Ext.create("App.View.Vales.Grids", {
            opcion: 'GridMaterialesPresupuesto',
            editar: true,
            scope : me,
            handler : me.EliminarRecord,
            colspan: 3,
            width: 760,
            height: 250
        })
        me.formValeIncremental = Ext.create("App.View.Vales.Forms", {
            colspan: 3, opcion: 'FormValeIncremental',
            title: '',
            icono: false
        });
        me.formValeCambio = Ext.create("App.View.Vales.Forms", {
            colspan: 3, opcion: 'FormValeCambio',
            title: '',
            icono: false
        });
        me.formValeIncremental.BloquearFormulario();
        me.formValeCambio.BloquearFormulario();
        //me.formValeIncremental.hide();
        me.items = [
            me.txt_id,
            me.txt_nro_vale,
            me.dat_fecha,
            me.chk_css,
            me.cbx_tipo,
            me.txt_nro_ot,
            me.cbx_grupoSCC,
            me.cbx_SCC,
            me.formOT,
            me.formValeIncremental,
            me.formValeCambio,
            me.gridMaterialesVale
            //me.txt_estado,
        ];
    },
    eventosFormCrearVale: function () {
        var me = this;
        //evento del fomrulario incremental
        me.formValeIncremental.cmp_materiales.btn.on('click', function () {

            if (me.formValeIncremental.cbx_materiales.getValue() != null) {
                var prod = me.formValeIncremental.cbx_materiales.datos[0];
                var item = me.formValeIncremental.cbx_detalle_item_trabajo.datos;
                var rec = Ext.create("App.Model.Vales.DetallesVale", {
                    IDPRODUCTO : prod.get('IDPRODUCTO'),
                    COD_PROD: prod.get('COD_ALTERNATIVO'),
                    DESC_PROD: prod.get('DESCRIPCION'),
                    UNID_PROD: prod.get('IDUNIDAD'),
                    CANT_VALE: 1,
                    ID_POSTE: item == null ? 0 :item.get('ID_POSTE'),
                    ID_CONDUCTOR: item == null ? 0 : item.get('ID_CONDUCTOR'),
                    ID_UC: item == null ? 0 : item.get('ID_UC'),
                });
                me.gridMaterialesVale.getStore().add(rec);
            }
            else {
                Ext.Msg.alert("Error", "Seleccione un Material");
            }
        });
        me.formValeCambio.btn.on('click', function () {

            if (me.formValeCambio.isValid()) {
                var prod = me.formValeCambio.cbx_materiales.datos[0];
                var prodcambio = me.formValeCambio.cbx_materiales_cambio.datos[0];
                    var rec = Ext.create("App.Model.Vales.DetallesVale", {
                        IDPRODUCTO: prodcambio.get('IDPRODUCTO'),
                        COD_PROD: prodcambio.get('COD_ALTERNATIVO'),
                        DESC_PROD: prodcambio.get('DESCRIPCION'),
                        UNID_PROD: prodcambio.get('IDUNIDAD'),
                        ID_PRE_VC: prod.get('ID_PRE'),
                        COD_PROD_VC: prod.get('COD_PROD') +" / " + prod.get('DESC_PROD'),
                        CANT_VALE: 1
                    });
                    me.gridMaterialesVale.getStore().add(rec);
            }
            else {
                Ext.Msg.alert("Error", "Completar Formulario.");
            }
        });
        me.cbx_tipo.on('select', function (cmb, record) {
            if (cmb.getValue() == "NORMAL") {
                if (me.formOT.txt_nroOT.getValue() != "") {
                    me.gridMaterialesVale.getStore().setExtraParams({ ID_OT: me.formOT.txt_nroOT.getValue(), TIPO_PROD: 'ITEM',TIPO_VALE : 'N' });
                    me.gridMaterialesVale.getStore().load();
                }
                else {
                    Ext.Msg.alert("Error", "Seleccione una OT primero");
                    me.gridMaterialesVale.getStore().removeAll();
                    cmb.reset();
                }
                me.formValeIncremental.BloquearFormulario();
                me.formValeCambio.BloquearFormulario();
            }
            else if (cmb.getValue() == "CAMBIO") {
                me.gridMaterialesVale.getStore().removeAll();
                me.formValeIncremental.BloquearFormulario();
                me.formValeCambio.store_materiales_pres.setExtraParams({ ID_OT: me.formOT.txt_nroOT.getValue(), TIPO_PROD: 'ITEM', TIPO_VALE: 'N' });
                me.formValeCambio.store_materiales_pres.load();
                me.formValeCambio.DesbloquearFormulario();
                //Ext.Msg.alert("Aviso", "No Esta Implementado Aun");
                //cmb.reset();
            }
            else if (cmb.getValue() == "INCREMENTAL") {
                //alert("adsda");
                me.formValeIncremental.DesbloquearFormulario();
                me.formValeCambio.BloquearFormulario();
                me.gridMaterialesVale.getStore().removeAll();
                me.formValeIncremental.store_item.setExtraParams({ ID_OT: me.ot.get('ID_OT') });
                me.formValeIncremental.store_item.load();
            }
            else {
                me.formValeIncremental.BloquearFormulario();
                me.formValeCambio.BloquearFormulario();
                me.gridMaterialesVale.getStore().removeAll();
            }
            //if(cmb.getValue)
        });
        me.txt_nro_ot.on('specialkey', function (field, e) {
            if (e.getKey() == e.ENTER) {
                if (field.getValue() == "") {
                    me.formOT.getForm().reset();
                    me.gridMaterialesVale.getStore().removeAll();
                    Ext.Msg.alert("Error", "Seleccione una OT primero");
                }
                else {
                    me.formOT.loadFormulario("OrdenesTrabajo", "BuscarOrdenTrabajo", { ID_OT: field.getValue() });
                    me.cbx_tipo.reset();
                    me.gridMaterialesVale.getStore().removeAll();
                    //me.gridMaterialesVale.getStore().setExtraParams({ ID_OT: field.getValue(), TIPO_PROD: 'ITEM' });
                    //me.gridMaterialesVale.getStore().load();
                }
                me.formValeIncremental.BloquearFormulario();
            }
        });
        me.gridMaterialesVale.on('beforeedit', function (editor, e, eOpts) {
            //alert(e.record.get('COD_PRODUCTO'));editor, e, eOpts 
            if (me.cbx_tipo.getValue() == "NORMAL") {
                return false;
            }

        });
        me.cbx_grupoSCC.on('select', function (cmb, record) {
            //me.store_SCC = Ext.create('App.Store.OrdenesTrabajo.CentroCostos');
            //me.store_SCC.limpiarParametros();
            me.store_SCC.setExtraParams({ IDGRUPOCC: record[0].get('IDGRUPOCC') });
            me.store_SCC.load();
        });
        me.chk_css.on('change', function (chk, newValue, oldValue, eOpts) {
            //me.store_SCC = Ext.create('App.Store.OrdenesTrabajo.CentroCostos');
            //me.store_SCC.limpiarParametros();
            me.cbx_grupoSCC.reset();
            me.cbx_SCC.reset();
            me.store_grupoSCC.setExtraParams({ porUsuario: newValue });
            me.store_grupoSCC.load();

        });
    },
    EliminarRecord: function (grid, rowIndex, colIndex, item, e, record) {
        //alert("dasd");
        var me = this;
        if (me.cbx_tipo.getValue() == "NORMAL") {
            Ext.Msg.alert("Error","No puede Eliminar el Detalle por que es un vale tipo Normal")
        }
        else if (me.cbx_tipo.getValue() == "INCREMENTAL") {
            grid.getStore().removeAt(rowIndex);
        }
        else {
            grid.getStore().removeAt(rowIndex);
        }
        //alert(me.txt_nro_ot.getValue());
    },
    ObtenerTipoOT: function () {
        return this.formOT.txt_tipo.getValue();
    },
    //limpia el formulario de vales y lo lleva a un estado inicial como inicio vale normal mas su presupuesto
    LimpiarFormulario: function (ot) {
        var me = this;
        me.getForm().reset();
        me.formValeIncremental.BloquearFormulario();
        me.formValeCambio.BloquearFormulario();
        me.gridMaterialesVale.getStore().setExtraParams({ ID_OT: ot.get('ID_OT'), TIPO_PROD: 'ITEM', TIPO_VALE: 'N' });
        me.gridMaterialesVale.getStore().load();
    },
});
