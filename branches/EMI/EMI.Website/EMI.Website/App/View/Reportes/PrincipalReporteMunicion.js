﻿Ext.define("App.View.Reportes.PrincipalReporteMunicion", {
    extend: "App.Config.Abstract.PanelPrincipal",
   
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        me.CargarEventos();
        this.callParent(arguments);
    },
    CargarEventos : function(){
        var me = this;
        //var direccion = Constantes.HOST + 'Reportes/ReporteArmamento.aspx?ID_MAT_BELICO=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD;
        me.btn1.on('click', function () {
            me.panel.load(
                Constantes.HOST + 'Reportes/ReporteMuniciones.aspx?ID_MUNICION_UNIDAD=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD
                
            );
        });
       
    },
    CargarComponentes: function () {
        var me = this;
        
        me.form = Ext.create("App.Config.Abstract.Form", { botones: false, icono: false, region : 'north' , columns : 3 });
        //me.btn3 = Funciones.CrearMenu('btn_Grafico', 'Generar Grafico', 'chart_bar', null, null, this);
        me.btn1 = Funciones.CrearMenu('btn_Normal', 'Generar', 'report', null, null, this);
        me.store_item_armamento = Ext.create("App.Store.Armamentos.MunicionesUnidad");
        me.store_item_armamento.setExtraParams({ ID_UNIDAD: Constantes.USUARIO.ID_UNIDAD });
        me.cbx_item_armamento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Municion",
            name: "ID_MUNICION_UNIDAD",
            displayField: 'CALIBRE',
            valueField: 'ID_MUNICION_UNIDAD',
            width: 400,
            textoTpl: function () { return "{CALIBRE} - {CODIGO}" },
            store: me.store_item_armamento,
        });

        me.form.add([me.cbx_item_armamento, me.btn1]);
        //me.form = form;
        me.panel = Ext.create("App.Config.ux.IFrame", {
            height : 750,
        });
        me.panelMain = Ext.create("Ext.panel.Panel", {
            title: 'Reporte',
            region: 'center',
            items: [me.panel]
        })

        me.items = [
            me.form,
            me.panelMain
        ];

    },
   
});
