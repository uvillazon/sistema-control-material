﻿/**
 * @class App.Config.Constantes
 * @extends 
 * @autor Ubaldo Villazon
 * @date 23/07/2013
 *
 * Variables Globales Comunes 
 *
 **/
Ext.define("App.Config.Constantes", {
    alternateClassName  : ["Constantes","Lista"],
    singleton           : true,
    /* Aqui Defino todas mis contanstantes */
    HOST                : '/',
    //HOST                : 'http://elfpre02/SisMan/',
    REQUERIDO           : '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>',
    PIEPAGINA: '<font color="black"><h2  style="font-size:12px;height:14px">Copyright &copy;   2014  -  Version 1.0</h2></font>',
    ALTO: 660,
    MAXANCHO: 1024,
    MAXALTO : 660,
    ICONO_CREAR: 'application_form_add',
    ICONO_EDITAR: 'application_form_edit',
    ICONO_BAJA: 'application_form_delete',
    ICONO_VER: 'application_view_detail',
    ICONO_PRINT : 'printer',
    LiSTAS: null,
    USUARIO :  null,
    URLLISTAS: 'Listas/ObtenerTodasLasListas',
    URLIMAGEN : "Imagenes/VerImagen?",
    UnidadesRequeridas: function (unidad, requerido) {
        if (requerido) {
            return '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span><span style="color:blue" data-qtip="Requerido">[' + unidad + ']</span>';
        }
        else {
            return '<span style="color:blue" data-qtip="'+unidad+'">['+unidad+']</span>';
        }
    },
    CargarCssEstados: function (estado, tipo) {
        if (tipo == 'SM') {
            if (estado == 'NUEVA') return 'SMNueva';
            else if (estado == 'RECH_INSP') return 'SMRech_Insp';
            else if (estado == 'APROBADA') return 'SMAprobada';
            else if (estado == 'RECHAZADA') return 'SMRechazada';
            else if (estado == 'APR_JF_MN') return 'SMApr_Jf_Mn';
            else if (estado == 'CON_OT') return 'SMCon_Ot';
            else if (estado == 'CERRADA') return 'SMCerrada';
          
            return '';
        }
        else if (tipo == 'OT') {
            if (estado == 'NUEVA') return 'OTNueva';
            else if (estado == 'EJECUTADA') return 'OTEjecutada';
            else if (estado == 'APROBADA') return 'OTAprobada';
            else if (estado == 'CERRADA') return 'OTCerrada';
            else if (estado == 'EN_EJEC') return 'OTEn_Ejec';
            else if (estado == 'ASIGNADA') return 'OTAsignada';
            else if (estado == 'SOLIC_PAGO') return 'OTSolPago';
            else if (estado == 'PAGADA') return 'OTPagada';
            return '';
            //else if (estado == 'CON_OIT') return 'AmarilloFuerte';
        }
        else if (tipo == 'MO') {
            if (estado == 'MO') return 'ItemOMO';
            return '';
            //else if (estado == 'CON_OIT') return 'AmarilloFuerte';
        }
        else {
            return '';
        }
    },
    Buscar: function (lista) {
        var idLista = 0;
        Ext.each(this.LiSTAS, function (item) {
            if (lista == item.LISTA) {
                idLista = item.ID_LISTA;
                return false;
            }
        });
        return idLista;
    },
    getUrlImagen: function (http) {
        if (http != null) {
            return 'http://localhost:50684/' + Constantes.URLIMAGEN;
        }
        else {
            return Constantes.HOST + '' + Constantes.URLIMAGEN;
        }
    },
    CargarTamano: function () {
        this.ALTO = document.documentElement.clientHeight - 135;
        //this.MAXALTO = document.documentElement.clientHeight - 40;
        this.MAXANCHO = document.documentElement.clientWidth - 40;
        this.MAXALTO =document.documentElement.clientHeight - 70;
        //this.MAXANCHO = 1300;
    }
});