﻿Ext.define("App.View.OrdenesTrabajo.FormDetallePresupuesto", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Detalle de Presupuesto",
    cargarStores: true,
    columns: 2,
    opcion: '',
    initComponent: function () {
        var me = this;

        if (me.opcion == "FormPresupuestoPorMaterial") {
            me.CargarFormPresupuestoPorMaterial();
            me.eventosFormularioPorMaterial();

        }
        else if (me.opcion == "FormPresupuestoPorUC") {
            me.CargarFormPresupuestoPorUC();
            me.eventosFormularioPorUC();
        }

        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    CargarFormPresupuestoPorMaterial: function () {
        var me = this;

        me.gridMaterialesMO = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'PresupuestoMaterialMO', title: 'Presupuesto por Items de Materiales y Mano de Obra', colspan: 2, width: 750, height: 350, editar: true, handler: me.EliminarPresupuesto });
        toolbarMateriales = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarItemMaterial', "Guardar Cambios", "disk", me.GuardarPresupuesto, toolbarMateriales, this);
        me.gridMaterialesMO.addDocked(toolbarMateriales, 1);

        me.store_codPoste = Ext.create("App.Store.Postes.Postes");
        me.cbx_poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Poste',
            displayField: 'COD_POSTE',
            valueField: 'COD_POSTE',
            name: 'COD_POSTE',
            colspan: 1,
            store: me.store_codPoste,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_POSTE}&tamano=150&TABLA=MN_POSTES" /> <h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
                return '<h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
            },
        });
        me.txt_poste = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESC_TIPO",
            maxLength: 500,
            width: 240,
        });
        me.cmp_poste = Ext.create("App.Config.Componente.FieldContainerBase", {
            colspan: 2,
            columns: 3,
            btn_titulo: 'Limpiar Formulario',
            btn_iconCls: 'page_white',
            btn_tooltip: 'Limpiar',
            botton: true,
            cmpArray: [me.cbx_poste, me.txt_poste],
            //componente: me.cbx_codigoSolucion,
        });
        me.store_uc = Ext.create("App.Store.Postes.UnidadesConstructivas");
        me.cbx_unidadConstructivas = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Unidad Constructivas',
            displayField: 'COD_UC',
            valueField: 'COD_UC',
            name: 'COD_UC',
            colspan: 1,
            //width: 220,
            store: me.store_uc,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_UC}&tamano=150&TABLA=MN_UNIDADES_CONS" /><h3>{COD_UC} - {DESCRIPCION}</h3>';
                return '<h3>{COD_UC} - {DESCRIPCION}</h3>';
            },
        });
        me.txt_desc_uc = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION",
            maxLength: 500,
            width: 240,
        });
        me.cmp_uc = Ext.create("App.Config.Componente.FieldContainerBase", {
            //btn_titulo: 'Agregar Item Por UC',
            //btn_iconCls: 'add',
            //btn_tooltip: 'Se Agregar la MO seleccionada',
            //btn_id: 'btn_MO_add',
            colspan: 2,
            columns: 3,
            botton: false,
            cmpArray: [me.cbx_unidadConstructivas, me.txt_desc_uc],
            //componente: me.cbx_codigoSolucion,
        });
        me.store_cnd = Ext.create("App.Store.Postes.Conductores");
        me.cbx_conductor = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Conductor',
            displayField: 'COD_CONDUCTOR',
            valueField: 'COD_CONDUCTOR',
            name: 'COD_CONDUCTOR',
            colspan: 1,
            store: me.store_cnd,
            textoTpl: function () {
                return '<h3>{COD_CONDUCTOR} - {DESC_TIPO} - {FORMACION}</h3>';
            },
        });
        me.txt_conductor = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "FORMACION",
            maxLength: 500,
            width: 240,
        });
        me.cmp_conductor = Ext.create("App.Config.Componente.FieldContainerBase", {
            colspan: 2,
            columns: 2,
            cmpArray: [me.cbx_conductor, me.txt_conductor],
        });

        //store de materiales en estado ACTIVO
        me.store_otros_materiales = Ext.create("App.Store.Postes.Materiales");
        me.store_otros_materiales.setExtraParams({IDSTATUS : 1});
        me.cbx_materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Materiales',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
            //colspan: 1,
            width: 240,

            store: me.store_otros_materiales,
            textoTpl: function () {
                return '<tpl for="."><div class="{CSSSTATUS}">{COD_ALTERNATIVO} - {DESCRIPCION}</div></tpl>';
            }
        });
        me.txt_cod_mat = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION_MAT",
            maxLength: 500,
            width: 240,
        });
        me.cmp_materiales = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Material',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar los materiales seleccionados',
            btn_id: 'btn_material_add',
            colspan: 2,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_materiales, me.txt_cod_mat],
            //componente: me.cbx_codigoSolucion,
        });
        //store de mano de obra solo mostrar las MO en estado ACTIVO
        me.store_mano_obra = Ext.create("App.Store.Productos.ManoObras");
        me.store_mano_obra.setExtraParams({ IDSTATUS: 1 });
        me.cbx_manoObra = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Item Mano de Obra',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
            //colspan: 1,
            width: 240,
            store: me.store_mano_obra,
            textoTpl: function () {
                return '<tpl for="."><div class="{CSSSTATUS}">{COD_ALTERNATIVO} - {DESCRIPCION}</div></tpl>';
            }
        });
        me.txt_cod_mo = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION_MO",
            maxLength: 500,
            width: 240,
        });
        me.cmp_manoObra = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Item MO',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar la MO seleccionada',
            btn_id: 'btn_MO_add',
            colspan: 2,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_manoObra, me.txt_cod_mo],
        });

        me.items = [
            me.cmp_poste,
            me.cmp_uc,
            me.cmp_conductor,
            me.cmp_materiales,
            me.cmp_manoObra,

            me.gridMaterialesMO
        ];

    },

    eventosFormularioPorMaterial: function () {
        var me = this;
        me.gridMaterialesMO.on('onSpecialKey', function (a) {
            alert(a);
        });
        me.cbx_materiales.on('select', function (cmb, record) {
            me.txt_cod_mat.setValue(record[0].get('DESCRIPCION'));
        });
        me.cbx_manoObra.on('select', function (cmb, record) {
            me.txt_cod_mo.setValue(record[0].get('DESCRIPCION'));
        });
        me.cbx_unidadConstructivas.on('select', function (cmb, record) {
            me.txt_desc_uc.setValue(record[0].get('DESCRIPCION'));

        });
        me.cbx_poste.on('select', function (cmb, record) {
            me.txt_poste.setValue(record[0].get('DESC_TIPO'));
            me.store_uc.setExtraParam("ID_POSTE", record[0].get('ID_POSTE'));
            me.store_uc.load();
            me.cmp_conductor.reset();
            me.gridMaterialesMO.getStore().setExtraParams({ ID_POSTE: record[0].get('ID_POSTE') });
            me.gridMaterialesMO.getStore().setExtraParams({ ID_CONDUCTOR: null });
            me.gridMaterialesMO.getStore().load();
        });
        me.cbx_conductor.on('select', function (cmb, record) {
            me.txt_conductor.setValue(record[0].get('FORMACION'));
            me.cmp_poste.reset();
            me.cmp_uc.reset();
            me.gridMaterialesMO.getStore().setExtraParams({ ID_POSTE: null });
            me.gridMaterialesMO.getStore().setExtraParams({ ID_CONDUCTOR: record[0].get('ID_CONDUCTOR') });
            me.gridMaterialesMO.getStore().load();
        });
        me.cmp_manoObra.btn.on('click', function () {
            if (me.cbx_manoObra.getValue() != null && me.ValidarRegistro()) {
                var prod = me.cbx_manoObra.datos[0];
                var poste = me.cbx_poste.getValue() == null ? null : me.cbx_poste.datos[0];
                var conductor = me.cbx_conductor.getValue() == null ? null : me.cbx_conductor.datos[0];
                var iduc = me.cbx_unidadConstructivas.getValue() == null ? null : me.cbx_unidadConstructivas.datos[0].get('ID_UC');
                Funciones.AjaxRequestGridSC("Presupuestos", "CrearPresupuestoPorItemyMO", me, { ID_OT: me.ot.get('ID_OT'), TIPO_PROD: 'MO', IDPRODUCTO: prod.get('IDPRODUCTO'), COD_PROD: prod.get('COD_ALTERNATIVO'), DESC_PROD: prod.get('DESCRIPCION'), UNID_PROD: prod.get('IDUNIDAD'), COSTO_UNIT: prod.get('COSTO'), CANT_PRE: 1, ID_POSTE: me.cbx_poste.getValue() == null ? null : poste.get('ID_POSTE'), ID_CONDUCTOR: me.cbx_conductor.getValue() == null ? null : conductor.get('ID_CONDUCTOR'), ID_UC: iduc }, me.gridMaterialesMO);
            }
            else {
                Ext.Msg.alert("Error", "Seleccione una mano de obra");
            }
        });
        me.cmp_poste.btn.on('click', function () {
            me.CargarDatos(me.ot);
        });
        me.cmp_materiales.btn.on('click', function () {
            if (me.cbx_materiales.getValue() != null && me.ValidarRegistro()) {
                var prod = me.cbx_materiales.datos[0];
                var poste = me.cbx_poste.getValue() == null ? null : me.cbx_poste.datos[0];
                var conductor = me.cbx_conductor.getValue() == null ? null : me.cbx_conductor.datos[0];
                var iduc = me.cbx_unidadConstructivas.getValue() == null ? null : me.cbx_unidadConstructivas.datos[0].get('ID_UC');
                Funciones.AjaxRequestGridSC("Presupuestos", "CrearPresupuestoPorItemyMO", me, { ID_OT: me.ot.get('ID_OT'), TIPO_PROD: 'ITEM', IDPRODUCTO: prod.get('IDPRODUCTO'), COD_PROD: prod.get('COD_ALTERNATIVO'), DESC_PROD: prod.get('DESCRIPCION'), UNID_PROD: prod.get('IDUNIDAD'), COSTO_UNIT: prod.get('COSTO'), CANT_PRE: 1, ID_POSTE: me.cbx_poste.getValue() == null ? null : poste.get('ID_POSTE'), ID_CONDUCTOR: me.cbx_conductor.getValue() == null ? null : conductor.get('ID_CONDUCTOR'), ID_UC: iduc }, me.gridMaterialesMO);
            }
            else {
                Ext.Msg.alert("Error", "Seleccione un Material y a que poste o conductor se asociara...");
            }
        });
        //me.grid.on('cellclick', me.CargarDatos, this);
    },
    ValidarRegistro : function(){
        var me = this;
        var cnd = me.cbx_conductor.getValue();
        var poste = me.cbx_poste.getValue();
        var uc = me.cbx_unidadConstructivas.getValue();
        if(cnd != null){
            return true;
        }
        else{
            if(poste != null && uc != null){
                return true;
            }
            else{
                return false;
            }
        }
        //if(me.cbx_conductor.getValue
        //cbx_poste
        //cbx_unidadConstructivas
    
    },
    CargarDatos: function (ot) {
        var me = this;
        me.ot = ot;
        me.getForm().reset();
        me.store_codPoste.setExtraParam("ID_OT", ot.get('ID_OT'));
        me.store_cnd.setExtraParam("ID_OT", ot.get('ID_OT'));
        me.store_codPoste.load();
        me.store_cnd.load();
        //vamos a limpiar todos los filtros del grid de materiales
        me.gridMaterialesMO.getStore().limpiarParametros();
        me.gridMaterialesMO.getStore().setExtraParams({ ID_OT: ot.get('ID_OT') });
        me.gridMaterialesMO.getStore().load();
        
    },
    CargarDatosUC: function (ot) {
        var me = this;
        me.ot = ot;
        me.gridMaterialesMO.getStore().setExtraParams({ ID_OT: ot.get('ID_OT') });
        //me.gridMaterialesMO.getStore().load();
        me.gridMaterialesMO.getStore().removeAll();
        me.getForm().reset();
        me.store_codPoste.setExtraParam("ID_OT", ot.get('ID_OT'));
        me.store_codPoste.load();
    },
    GuardarPresupuesto: function () {
        var me = this;
        var json = Funciones.convertirJson(me.gridMaterialesMO);
        if (json == false) {
            Ext.Msg.alert("Error", "No Existe ningun Cambio");
        }
        else {
            Funciones.AjaxRequestGridSC("Presupuestos", "CrearPresupuestoPorDetalle", me,  { ID_OT: me.ot.get('ID_OT'), detalles: json }, me.gridMaterialesMO);
        }

    },
    //se eliminara desde el grid 
    EliminarPresupuesto: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        Funciones.AjaxRequestGrid("Presupuestos", "EliminarItem", me, "Esta Seguro de Eliminar el Item", { ID_OT: rec.get('ID_OT'), ID_PRE: rec.get('ID_PRE'), ID_UC: rec.get('ID_UC') }, grid);
        //alert("Terminate " + rec.get('firstname'));

    },

    // formulario detalle por UC
    CargarFormPresupuestoPorUC: function () {
        var me = this;

        me.gridMaterialesMO = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'PresupuestoMaterialMO', title: 'Presupuesto por Items de Materiales y Mano de Obra', colspan: 2, width: 750, height: 350, editar: true, handler: me.EliminarPresupuesto });
        toolbarMateriales = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarItemMaterial', "Guardar Cambios", "disk", me.GuardarPresupuesto, toolbarMateriales, this);
        //Funciones.CrearMenu('btn_EliminarItemMaterial', "Eliminar Item", "delete", me.EliminarPresupuesto, toolbarMateriales, this);
        me.gridMaterialesMO.addDocked(toolbarMateriales, 1);
        me.store_codPoste = Ext.create("App.Store.Postes.Postes");
        me.cbx_poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Poste',
            displayField: 'COD_POSTE',
            valueField: 'COD_POSTE',
            name: 'COD_POSTE',
            colspan: 1,
            store: me.store_codPoste,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_POSTE}&tamano=150&TABLA=MN_POSTES" /> <h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
                return '<h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
            },
        });
        me.txt_poste = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESC_TIPO",
            maxLength: 500,
            width: 240,
        });
        me.cmp_poste = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Poste',
            colspan: 2,
            columns: 2,
            //botton: true,
            cmpArray: [me.cbx_poste, me.txt_poste],
            //componente: me.cbx_codigoSolucion,
        });
        me.store_uc = Ext.create("App.Store.Postes.UnidadesConstructivas");
        me.cbx_unidadConstructivas = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Unidad Constructivas',
            displayField: 'COD_UC',
            valueField: 'COD_UC',
            name: 'COD_UC',
            colspan: 1,
            //width: 220,
            store: me.store_uc,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_UC}&tamano=150&TABLA=MN_UNIDADES_CONS" /><h3>{COD_UC} - {DESCRIPCION}</h3>';
                return '<h3>{COD_UC} - {DESCRIPCION}</h3>';
            },
        });
        me.txt_desc_uc = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION",
            maxLength: 500,
            width: 240,
        });
        me.cmp_uc = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Item Por UC',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar la MO seleccionada',
            btn_id: 'btn_MO_add',
            colspan: 2,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_unidadConstructivas, me.txt_desc_uc],
            //componente: me.cbx_codigoSolucion,
        });
        me.store_otros_materiales = Ext.create("App.Store.Productos.MaterialesPorUC");
        me.cbx_materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Materiales o MO',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
            //colspan: 1,
            width: 240,

            store: me.store_otros_materiales,
            textoTpl: function () {
                //return '<h3>Tipo : {TIPO} --{COD_ALTERNATIVO} - {DESCRIPCION}</h3>';
                return '<div class="{CSSSTATUS}">Tipo : {TIPO} --{COD_ALTERNATIVO} - {DESCRIPCION}</div>';
            }
        });
        me.txt_cod_mat = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION_MAT",
            maxLength: 500,
            width: 240,
        });
        me.cmp_materiales = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Material o MO',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar los materiales seleccionados',
            btn_id: 'btn_material_add',
            colspan: 2,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_materiales, me.txt_cod_mat],
            //componente: me.cbx_codigoSolucion,
        });
        me.num_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad UC",
            name: "CANTIDAD",
            maxLength: 2,
            colspan : 2,
            maxValue: 99,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_cuenta_contable = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cuenta Contable",
            name: "DESCRIPCION_MO",
            hidden : true
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.items = [
            me.cmp_poste,
            me.cmp_uc,
            me.cmp_materiales,
            me.num_cantidad,
            me.txt_cuenta_contable,
            me.gridMaterialesMO
        ];
    },
    eventosFormularioPorUC: function () {
        var me = this;
        me.cbx_poste.on('select', function (cmb, record) {
            me.txt_poste.setValue(record[0].get('DESC_TIPO'));
            me.store_uc.setExtraParam("ID_POSTE", record[0].get('ID_POSTE'));
            me.store_uc.load();
            me.gridMaterialesMO.getStore().setExtraParams({ ID_POSTE: record[0].get('ID_POSTE') });
            me.gridMaterialesMO.getStore().load();
        });
        me.cbx_unidadConstructivas.on('select', function (cmb, record) {
            me.txt_desc_uc.setValue(record[0].get('DESCRIPCION'));
            me.store_otros_materiales.setExtraParams({ ID_UC: record[0].get('ID_UC') });
            me.store_otros_materiales.load();
        });
        me.cbx_materiales.on('select', function (cmb, record) {
            me.txt_cod_mat.setValue(record[0].get('DESCRIPCION'));

        });
        me.cmp_uc.btn.on('click', function () {
            if (me.getForm().isValid()) {
                var poste = me.cbx_poste.datos[0];
                var uc = me.cbx_unidadConstructivas.datos[0];
                Funciones.AjaxRequestGridSC("Presupuestos", "CrearPresupuestoPorUC", me, { ID_OT: me.ot.get('ID_OT'), ID_UC: uc.get('ID_UC'), CANTIDAD: me.num_cantidad.getValue(), ID_POSTE: poste.get('ID_POSTE'), CODCUENTA: me.txt_cuenta_contable.getValue() }, me.gridMaterialesMO);
            }
            else {
                Ext.Msg.alert("Error", "Complete el formulario");
            }
        });
        me.cmp_materiales.btn.on('click', function () {
            if (me.cbx_materiales.getValue() != null && me.getForm().isValid()) {
                var prod = me.cbx_materiales.datos[0];
                var poste = me.cbx_poste.datos[0];
                var uc = me.cbx_unidadConstructivas.datos[0];
                Funciones.AjaxRequestGridSC("Presupuestos", "CrearPresupuestoPorItemyMO", me, { ID_OT: me.ot.get('ID_OT'), TIPO_PROD: prod.get('TIPO'), IDPRODUCTO: prod.get('IDPRODUCTO'), COD_PROD: prod.get('COD_ALTERNATIVO'), DESC_PROD: prod.get('DESCRIPCION'), UNID_PROD: prod.get('IDUNIDAD'), CANT_PRE: prod.get('CANTIDAD_MAT_UC') * me.num_cantidad.getValue(), CODCUENTA: me.txt_cuenta_contable.getValue(), ID_UC: uc.get('ID_UC'), ID_POSTE: poste.get('ID_POSTE') }, me.gridMaterialesMO);
            }
            else {
                Ext.Msg.alert("Error", "Seleccione un Material");
            }
        });
    }

    
});
