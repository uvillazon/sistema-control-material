﻿Ext.define("App.View.Reportes.PReporteGeneral", {
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
                Constantes.HOST + 'Reportes/ReporteExistencias.aspx?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD
                //Constantes.HOST + 'Reportes/ReporteArmamento.aspx?ID_MAT_BELICO=' + me.cbx_item_armamento.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD
                
            );
        });
        me.btn3.on('click', function () {
           me.panel.load(
               Constantes.HOST + 'Reportes/ReporteExistenciasGraf.aspx?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD

           );
        });
    },
    CargarComponentes: function () {
        var me = this;
        
        me.form = Ext.create("App.Config.Abstract.Form", { botones: false, icono: false, region : 'north' , columns : 3 });
        //me.btn3 = Funciones.CrearMenu('btn_Grafico', 'Generar Grafico', 'chart_bar', null, null, this);
        me.btn1 = Funciones.CrearMenu('btn_Normal', 'Generar', 'report', null, null, this);
		me.btn3 = Funciones.CrearMenu('btn_CrearMaterial', 'Generar Grafico', 'chart_bar', null, null, this);
        
		me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_mes,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_anio = Ext.create('App.Store.Listas.StoreLista');
        me.store_anio.setExtraParam('ID_LISTA', Lista.Buscar('ANIO'));
        me.cbx_anio = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "A\u00f1o",
            name: "ANIO",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_anio,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.form.add([me.store_mes,me.store_anio, me.btn1 , me.btn3]);
        //me.form = form;
        me.panel = Ext.create("App.Config.ux.IFrame", {
            height : 750,
        });
        me.panelMain = Ext.create("Ext.panel.Panel", {
            title: 'Reporte Armamento P/Unidad',
            region: 'center',
            items: [me.panel]
        })

        me.items = [
            me.form,
            me.panelMain
        ];

    },
   
});
