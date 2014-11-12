using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Aplicacion.Servicios;
using EMI.Wcf.Model;
using EMI.Wcf.Servicio.Models;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "KardexMuniciones" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione KardexMuniciones.svc o KardexMuniciones.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class KardexMuniciones : IKardexMuniciones
    {
        KardexServicio serKar = new KardexServicio();
        public ListasServicio<KardexModelResp> ObtenerKardexUnidadPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {
            ListasServicio<KardexModelResp> result = new ListasServicio<KardexModelResp>();
            try
            {
                IEnumerable<MOV_MUNICIONES_UNIDADES> mov = serKar.ObtenerKardexUnidadesPaginados(paginacion, filtros);
                List<KardexModelResp> datos = new List<KardexModelResp>();
                datos = mov.Select(x => new KardexModelResp()
                {
                   ID_MOV = x.ID_MOV,
                   FECHA = x.FECHA,
                   ENTRADA = x.ENTRADA,
                   SALDO = x.SALDO,
                   SALIDA = x.SALIDA,
                   OPERACION = x.OPERACION,
                   CODIGO = x.MUNICIONES_UNIDADES.MAT_BELICOS.CODIGO,
                   LOGIN = x.LOGIN
                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }
        /// <summary>
        /// obtiene kardex paginado de los moviemintos de municiones del almcanen
        /// </summary>
        /// <param name="paginacion"></param>
        /// <param name="filtros"></param>
        /// <returns></returns>

        public ListasServicio<KardexModelResp> ObtenerKardexPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {
            ListasServicio<KardexModelResp> result = new ListasServicio<KardexModelResp>();
            try
            {
                IEnumerable<MOV_MAT_BELICOS> mov = serKar.ObtenerKardexPaginados(paginacion, filtros);
                List<KardexModelResp> datos = new List<KardexModelResp>();
                datos = mov.Select(x => new KardexModelResp()
                {
                    ID_MOV = x.ID_MOV,
                    FECHA = x.FECHA,
                    ENTRADA = x.ENTRADA,
                    SALDO = x.SALDO,
                    SALIDA = x.SALIDA,
                    OPERACION = x.OPERACION,
                    CODIGO = x.MAT_BELICOS.CODIGO,
                    LOGIN = x.LOGIN
                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public ListasServicio<ArmamentoModelResp> ObtenerMoviminetosMunicionUnidad(int ID_MUNICION_UNIDAD)
        {
            ListasServicio<ArmamentoModelResp> result = new ListasServicio<ArmamentoModelResp>();
            try
            {
                IEnumerable<MOV_MUNICIONES_UNIDADES> mov = serKar.ObtenerKardexUnidadesPorId(ID_MUNICION_UNIDAD);
                List<ArmamentoModelResp> datos = new List<ArmamentoModelResp>();
                datos = mov.Select(x => new ArmamentoModelResp()
                {
                    UNIDAD = x.MUNICIONES_UNIDADES.UNIDADES.DESCRIPCION,
                    CALIBRE = x.MUNICIONES_UNIDADES.MAT_BELICOS.CALIBRE,
                    FABRICACION = x.MUNICIONES_UNIDADES.MAT_BELICOS.FABRICACION,
                    CANTIDAD_DISPONIBLE = x.ENTRADA,
                    FECHA_DOTACION = x.FECHA,
                    ESTADO = "OPERABLE",
                    OBSERVACION = x.MUNICIONES_UNIDADES.MAT_BELICOS.OBSERVACION
                }).ToList();
                result.total = datos.Count();
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }
    }
}
