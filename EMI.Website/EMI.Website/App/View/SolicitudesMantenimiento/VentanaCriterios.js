Ext.define("App.View.SolicitudesMantenimiento.VentanaCriterios", {
    // extend: "App.Config.Abstract.Form",
    extend: "App.Config.Abstract.Window",
    title: "Criterios de Busqueda",
    bodyStyle: 'background-color:#fff',
    layout: {
        type: 'table',
        columns: 2,
       
    },
    width: 520,
    height: 320,
    resizable: false,
    opcion: '',
    storeBuscar: '',
    gridBuscar: '',
    data: '',
    tmp: '',
    noLimpiar : null,
    initComponent: function () {
        var me = this;
        //if(me.opcion == ''){
        me.CargarStore();
        //    me.CargarComponentes();
        //}
        //else{
        me.CargarComponentes();
        //}
        this.callParent(arguments);
        me.btn_guardar.on('click', me.Buscar, this);
    },
    CargarStore: function () {
        var me = this;
        //store de la unidad que solicita
        me.store_unidadSolicitante = Ext.create('App.Store.Listas.StoreLista');
        me.store_unidadSolicitante.setExtraParam('ID_LISTA', Lista.Buscar('UNIDAD_REPORTA'));
        //store de las areas de mantenimiento
        me.store_area = Ext.create('App.Store.Listas.StoreLista');
        me.store_area.setExtraParam('ID_LISTA', Lista.Buscar('AREA'));
        //store para obtener los responsables
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables', { autoLoad: true });
        //store para obtener los moviles
        me.store_moviles = Ext.create('App.Store.Moviles.Moviles', { autoLoad: true });
        //store para estados de solicitudes
        me.store_estados = Ext.create('App.Store.Listas.Estados', { autoLoad: true });
       /* me.store_estados.proxy.extraParams['condicion'] = 'SM';
        me.store_estados.proxy.extraParams['codigo'] = 'ESTADO';*/
      //  me.store_estados.setExtraParam('COD_OBJ', 'SM');
        me.store_estados.setExtraParam('COD_OBJ', 'SM');

        me.store_postes = Ext.create('App.Store.Postes.Postes');
        me.store_puestos = Ext.create('App.Store.Puestos.Puestos');
        me.store_codMant = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento");
        me.store_codDef = Ext.create("App.Store.SolicitudesMantenimiento.CodigosDefecto");

    },
    CargarComponentes: function () {
        var me = this;
        me.num_numeroSolicitud = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",
            maxLength: 10,
            colspan: 2,
            margin: '5',
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });

        /*  me.cbx_udestino = Ext.create("App.Config.Componente.ComboBase", {
              fieldLabel: 'Unidad Destino',
              name: 'UNIDAD_DESTINO',
              maxLength: 10,
              afterLabelTextTpl: Constantes.REQUERIDO,
              allowBlank: false,
              store: me.store_udest,
              selectOnFocus: true,
              margin: '2',
          });*/
        me.cbx_unidadSolicitante = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Unidad Solicitante",
            name: "UNIDAD_SOLICITANTE",
            maxLength: 50,
            store: me.store_unidadSolicitante,
            margin: '5',
        });

        me.cbx_area = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: 'Sistema',
            name: 'AREA_UBIC',
            maxLength: 10,
            store: me.store_area,
            selectOnFocus: true,
            colspan: 2,
            margin: '5',
        });

        me.num_numeroDocumento = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro. Documento",
            name: "NRO_DOCUMENTO",
            maxLength: 10,
            colspan: 1,
            margin: '5',
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });

        me.num_nus = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "NUS:",
            name: "NUS",
            maxLength: 10,
            colspan: 1,
            margin: '5',
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });

        me.cbx_poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Poste',
            name: 'ID_POSTE',
            margin: '5',
            displayField: 'COD_POSTE',
            valueField: 'ID_POSTE',
            selectOnFocus: true,
            store: me.store_postes,
            listConfig: {
                loadingText: 'Buscando',
                emptyText: 'No Existe Registros',
                getInnerTpl: function () {
                    return '<h3>{COD_POSTE}</h3>' +
                        '{DESC_TIPO}';
                }
            }
        });

        me.cbx_puesto = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Puesto',
            name: 'ID_PUESTO',
            margin: '5',
            displayField: 'COD_PUESTO',
            valueField: 'ID_PUESTO',
            selectOnFocus: true,
            store: me.store_puestos,
            listConfig: {
                loadingText: 'Buscando',
                emptyText: 'No Existe Registros',
                getInnerTpl: function () {
                    return '<h3>{COD_PUESTO}</h3>' +
                        '{ELEMENTO}';
                }
            }
        });

        /*me.txt_puesto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Poste/Puesto',
            name: 'COD_PUESTO',
            maxLength: 20,
            colspan: 2,
            margin: '5',
        });*/
        
        me.cbx_codMantenimiento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Mantenim.',
            maxLength: 5,
            margin: '5',
            displayField: 'COD_MAN',
            valueField: 'ID_COD_MAN',
            name: 'ID_COD_MAN',
            store: me.store_codMant,
            textoTpl: function () {
                return '<h3>{COD_MAN}</h3>' +
                    '{DESCRIP_MAN}'
            },
        });
        me.cbx_codDefecto = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Defecto',
            name: 'ID_COD_DEF',
            margin: '5',
            displayField: 'COD_DEF',
            valueField: 'ID_COD_DEF',
            selectOnFocus: true,
            store:   me.store_codDef,
            listConfig: {
                loadingText: 'Buscando',
                emptyText: 'No Existe Registros',
                getInnerTpl: function () {
                    return '<h3>{COD_DEF}</h3>' +
                        '{DESCRIP_DEF}';
                }
            }
        });
        me.date_fechaInicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Alta Inicial',
            margin: '5',
            name: 'FECHA_INICIAL',
            opcion: 'blanco',
        });

        me.date_fechaFinal = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Alta Final',
            name: 'FECHA_FINAL',
            margin: '5',
            opcion: 'blanco',
        });
        me.cbx_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado",
            displayField: 'VALOR',
            margin: '5',
            name: 'ESTADO',
            colspan: 2,
            //el store debe venir de la lista de estados de solicitudes de mantenimiento
            store: me.store_estados
        });
        me.store_alimentadores = Ext.create("App.Store.Puestos.Alimentadores");
        me.cbx_alimentador = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Alimentador",
            name: "ID_ALIMENTADOR",
            displayField: 'COD_ALIMENTADOR',
            valueField: 'ID_ALIMENTADOR',
            maxLength: 50,
            //    textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_alimentadores,
            margin: '5',
        });
        me.store_derivacion = Ext.create("App.Store.Puestos.Derivaciones");
        me.cbx_derivacion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Derivacion Inicial",
            name: "ID_ELEMENTO_1",
            displayField: 'COD_ELEMENTO_1',
            valueField: 'ID_ELEMENTO_1',
            maxLength: 50,
            //    textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_derivacion,
            margin: '5',
        });

        me.items = [
            me.num_numeroSolicitud,
            me.cbx_unidadSolicitante,
            me.cbx_area,
            me.num_numeroDocumento,
            me.num_nus,
            me.cbx_poste,
            me.cbx_puesto,
            me.cbx_codMantenimiento,
            me.cbx_codDefecto,
            me.date_fechaInicial,
            me.date_fechaFinal,
            me.cbx_alimentador,
            me.cbx_derivacion,
            me.cbx_estado,
        ];


    },
    Buscar: function () {
        var me = this;
        // alert("entro" + me.storeBuscar);
      //  alert(me.cbx_alimentador.getValue());
        me.storeBuscar.limpiarParametros(me.noLimpiar);
        me.storeBuscar.setExtraParam('ID_SOL_MAN', me.num_numeroSolicitud.getValue());
        me.storeBuscar.setExtraParam('UNIDAD_SOLICITANTE', me.cbx_unidadSolicitante.getValue());
        me.storeBuscar.setExtraParam('AREA_UBIC', me.cbx_area.getValue());
        me.storeBuscar.setExtraParam('NUS', me.num_nus.getValue());
        me.storeBuscar.setExtraParam('NRO_DOCUMENTO', me.num_numeroDocumento.getValue());
        me.storeBuscar.setExtraParam('ID_POSTE', me.cbx_poste.getValue());
        me.storeBuscar.setExtraParam('ID_PUESTO', me.cbx_puesto.getValue());
        me.storeBuscar.setExtraParam('ID_COD_MAN', me.cbx_codMantenimiento.getValue());
        me.storeBuscar.setExtraParam('ID_COD_DEF', me.cbx_codDefecto.getValue());
        me.storeBuscar.setExtraParam('ID_ALIMENTADOR', me.cbx_alimentador.getValue());
        me.storeBuscar.setExtraParam('ID_ELEMENTO_1', me.cbx_derivacion.getValue());
        me.storeBuscar.setExtraParamDate('FECHA_INICIAL', me.date_fechaInicial.getValue());
     //   me.storeBuscar.setExtraParam('FECHA_FINAL', me.date_fechaFinal.getValue());
        me.storeBuscar.setExtraParam('ESTADO', me.cbx_estado.getValue());

        if (me.date_fechaFinal.getValue() != null) {
            me.storeBuscar.setExtraParamDate('FECHA_FINAL', Ext.Date.add(me.date_fechaFinal.getValue(), Ext.Date.DAY, 1));
        }
        else {
            me.storeBuscar.setExtraParamDate('FECHA_FINAL', me.date_fechaFinal.getValue());
        }
        me.tmp.moveFirst();

        var udestinoValor; var sistemaValor; var puestoValor; var defectoValor; var mantenimientoValor; var f_altaIniValor; var f_altaFinValor; var estadoValor; var idPendiente; var idNus; var posteValor; var alimentadorValor; var derivacionValor;
        // var masignadoValor; var asignadoValor; var mrealizoValor; var realizadoValor; 

        if (me.num_numeroSolicitud.getValue() != null && me.num_numeroSolicitud.getValue() != '') {
            idPendiente = me.num_numeroSolicitud.getValue();
        }
        else {
            idPendiente = 'Todos';
        }
        if (me.num_nus.getValue() != null && me.num_nus.getValue() != '') {
            idNus = me.num_nus.getValue();
        }
        else {
            idNus = 'Todos';
        }
        if (me.cbx_unidadSolicitante.getValue() != null && me.cbx_unidadSolicitante.getValue() != '') {
            udestinoValor = me.cbx_unidadSolicitante.getValue();
        }
        else {
            udestinoValor = 'Todos';
        }
        if (me.cbx_area.getValue() != null && me.cbx_area.getValue() != '') {
            sistemaValor = me.cbx_area.getValue();
        }
        else {
            sistemaValor = 'Todos';
        }
        if (me.cbx_poste.getValue() != null && me.cbx_poste.getValue() != '') {
            posteValor = me.cbx_poste.getRawValue();
        }
        else {
            posteValor = 'Todos';
        }
        if (me.cbx_puesto.getValue() != null && me.cbx_puesto.getValue() != '') {
            puestoValor = me.cbx_puesto.getRawValue();
        }
        else {
            puestoValor = 'Todos';
        }
        if (me.cbx_codDefecto.getValue() != null && me.cbx_codDefecto.getValue() != '') {
            defectoValor = me.cbx_codDefecto.getRawValue();
        }
        else {
            defectoValor = 'Todos';
        }

        if (me.cbx_codMantenimiento.getValue() != null && me.cbx_codMantenimiento.getValue() != '') {
            mantenimientoValor = me.cbx_codMantenimiento.getRawValue();
        }
        else {
            mantenimientoValor = 'Todos';
        }
       
        if (me.cbx_alimentador.getValue() != null && me.cbx_alimentador.getValue() != '') {
          //  alert(me.cbx_alimentador.getValue());
            alimentadorValor = me.cbx_alimentador.datos[0].get('COD_ALIMENTADOR');
        }
        else {
            alimentadorValor = 'Todos';
        }
        if (me.cbx_derivacion.getValue() != null && me.cbx_derivacion.getValue() != '') {
            //  alert(me.cbx_derivacion.getValue());
            derivacionValor = me.cbx_derivacion.getRawValue();
        }
        else {
            derivacionValor = 'Todos';
        }
        if (me.date_fechaInicial.getValue() != null && me.date_fechaInicial.getValue() != '') {
            //*******************************
            var myDate = new Date(me.date_fechaInicial.getValue());
            var myFecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
          //  alert(myFecha);
            //*******************************
            f_altaIniValor = myFecha;
        }
        else {
            f_altaIniValor = 'Todos';
        }
        if (me.date_fechaFinal.getValue() != null && me.date_fechaFinal.getValue() != '') {
            //*******************************
            var myDate = new Date(me.date_fechaFinal.getValue());
            var myFecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
            //*******************************
            f_altaFinValor = myFecha;
        }
        else {
            f_altaFinValor = 'Todos';
        }
        if (me.cbx_estado.getValue() != null && me.cbx_estado.getValue() != '') {
            estadoValor = me.cbx_estado.getValue();
        }
        else {
            estadoValor = 'Todos';
        }       
        me.gridBuscar.tituloImpresion = '<H2 align="center">SOLICITUDES DE MANTENIMIENTO POR FILTRO</H2><TABLE border="1" align="center"  cellspacing="0" cellpadding="0" bordercolor="black"  STYLE="font-size: 11px;"><TR align="center"><TD><B>Id Solicitud</B></TD><TD><B>Unidad Solicitante</B></TD> <TD><B>Sistema</B></TD> <TD><B>Puesto/Elemento</B></TD><TD><B>Cod. Mantenimiento</B></TD><TD><B>Cod. Defecto</B></TD><TD><B>Fecha Alta Inicial</B></TD> </TR><TR align="center"><TD>' + idPendiente + '</TD><TD>' + udestinoValor + '</TD> <TD>' + sistemaValor + '</TD> <TD>' + puestoValor + '</TD><TD>' + mantenimientoValor + '</TD> <TD>' + defectoValor + '</TD> <TD>' + f_altaIniValor + '</TD></TR><TR align="center"><TD><B>Fecha Alta Final</B></TD><TD><B>Poste</B></TD><TD><B>Alimentador</B></TD><TD><B>Derivacion Inicial</B></TD><TD><B>Estado</B></TD></TR><TR align="center"><TD>' + f_altaFinValor + '</TD><TD>' + posteValor + '</TD><TD>' + alimentadorValor + '</TD><TD>' + derivacionValor + '</TD><TD>' + estadoValor + '</TD></TR></TABLE>';
        me.gridBuscar.getStore().loadData(me.storeBuscar);
        me.hide();
    },
});
