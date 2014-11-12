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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Historicos" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Historicos.svc o Historicos.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Historicos : IHistoricos
    {
        KardexServicio serKar = new KardexServicio();
        public ListasServicio<HistoricoVerificacionModelResp> ObtenerHistoricoVerificacionMatLogisticoPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {
            ListasServicio<HistoricoVerificacionModelResp> result = new ListasServicio<HistoricoVerificacionModelResp>();
            try
            {
                IEnumerable<ITEMS_VERIFICACIONES> mov = serKar.ObtenerHistoricosMatLogistico(paginacion, filtros);
                List<HistoricoVerificacionModelResp> datos = new List<HistoricoVerificacionModelResp>();
                datos = mov.Select(x => new HistoricoVerificacionModelResp()
                {
                    CODIGO = x.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.CODIGO,
                    NRO_SERIE = x.ITEMS_MAT_LOGISTICOS.NRO_SERIE,
                    TIPO_COMPONENTE = x.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.TIPO_COMPONENTE,
                    AERONAVE = x.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.AERONAVE,
                    FABRICANTE = x.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.FABRICANTE,
                    FECHA = x.FECHA,
                    RESPONSABLE = x.LOGIN,
                    HORA_ACTUAL = x.VALOR_NUEVO,
                    HORA_ANTERIOR = x.VALOR_ANTERIOR,
                    OBSERVACION = x.OBSERVACION,
                    GRUPO = x.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.GRUPO,

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
    }
}
