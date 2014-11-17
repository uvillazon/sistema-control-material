Ext.define("App.View.Reportes.PReportePedidoPorUnidad", {
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
            if (me.form.isValid()) {
					me.panel.load(
						Constantes.HOST + 'Reportes/ReportePedidos.aspx?FECHA_INI=' + me.date_fechaIni.getSubmitValue() + '&FECHA_FIN=' + me.date_fechaFin.getSubmitValue() + '&ID_UNIDAD=' + me.cbx_unidad.getValue()
					);
                }
			else {
				Ext.Msg.alert("Error", "Falta Completar formulario");
			}
			
        });
        // me.btn3.on('click', function () {
           // me.panel.load(
               // Constantes.HOST + 'Reportes/ReporteExistenciasGraf.aspx?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue() + '&ID_UNIDAD=' + Constantes.USUARIO.ID_UNIDAD

           // );
        // });
    },
    CargarComponentes: function () {
        var me = this;
        
        me.form = Ext.create("App.Config.Abstract.Form", { botones: false, icono: false, region : 'north' , columns : 3 });
        //me.btn3 = Funciones.CrearMenu('btn_Grafico', 'Generar Grafico', 'chart_bar', null, null, this);
        me.btn1 = Funciones.CrearMenu('btn_Normal', 'Generar', 'report', null, null, this);
		// me.btn3 = Funciones.CrearMenu('btn_CrearMaterial', 'Generar Grafico', 'chart_bar', null, null, this);
        
		me.date_fechaIni = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha inicio",
            name: "FECHA_INI",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.date_fechaFin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Fin",
            name: "FECHA_FIN",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_unidad = Ext.create('App.Store.Unidades.Unidades');
        me.cbx_unidad = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Unidad",
            name: "ID_UNIDAD",
            displayField: 'UNIDAD',
            valueField: 'ID_UNIDAD',
            allowBlank: false,
            width: 400,
            textoTpl: function () { return "{UNIDAD} - {DESCRIPCION}" },
            store: me.store_unidad,
        });

        me.form.add([me.date_fechaIni,me.date_fechaFin, me.cbx_unidad,me.btn1 ]);
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
