using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Aplicacion.Servicios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Bitacoras" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Bitacoras.svc o Bitacoras.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Bitacoras : IBitacoras
    {
        
        BitacorasServicio serBit = new BitacorasServicio();
        public List<HistoricoEdicionModel> ObtenerBitacoras(Paginacion paginacion, FiltrosModel<BitacorasModel> filtros)
        {
            List<HistoricoEdicionModel> resultHist = new List<HistoricoEdicionModel>();
            IEnumerable<BITACORAS> result = serBit.ObtenerHistoricoCambios(filtros,null);
            resultHist = ObtenerHistoricosEdicionAgrupados(result);
            return resultHist;
        }

        public List<HistoricoEdicionModel> ObtenerHistoricosEdicionAgrupados(IEnumerable<BITACORAS> historicos)
        {
            List<HistoricoEdicionModel> result = new List<HistoricoEdicionModel>();
            var agrupados = historicos.GroupBy(x => new { x.FECHA, x.ACCION, x.LOGIN , x.TABLA}).Select(y => new { FECHA = y.Key.FECHA, MOTIVO = y.Key.ACCION, USUARIO = y.Key.LOGIN, y.Key.TABLA });
            foreach (var item in agrupados)
            {
                HistoricoEdicionModel record = new HistoricoEdicionModel();
                record.FECHA = item.FECHA;
                record.MOTIVO = item.MOTIVO;
                record.USUARIO = item.USUARIO;
                record.TABLA = item.TABLA;
                string detalle = "";
                var hist = historicos.Where(x => x.FECHA == item.FECHA);
                foreach (var item1 in hist)
                {
                    detalle = detalle == "" ? string.Format("<em>{0} </em>: {1}", item1.COLUMNA.ToUpper(), item1.VALOR) : string.Format("{0} </br> <em>{1}</em> : {2}", detalle, item1.COLUMNA.ToUpper(), item1.VALOR);
                }
                record.DETALLE = detalle;
                result.Add(record);
            }
            return result;
        }
    }
}
