using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Website.Reportes
{
    public class ReporteDataSource
    {
        public IEnumerable<ReporteArmamentoModel> ReporteArmamento(int ID_MAT_BELICO, int ID_UNIDAD)
        {
            var serUni = new UnidadesService.UnidadesClient();
            var unidad = serUni.ObtenerUnidadPorId(ID_UNIDAD);

            var serMat = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var modelo = serMat.ObtenerMaterialBelicoPorID(ID_MAT_BELICO, ID_UNIDAD);
            List<ReporteArmamentoModel> reporte = new List<ReporteArmamentoModel>();

            var items2 = serMat.ObtenerArmamentoPorUnidad(ID_MAT_BELICO, ID_UNIDAD);
            var total = items2.datos.Count();
            foreach (var item in items2.datos)
            {
                ReporteArmamentoModel rep = new ReporteArmamentoModel()
                {
                    ARMAMENTO = modelo.NOMBRE,
                    UNIDAD = unidad.DESCRIPCION,
                    CANTIDAD = modelo.CANTIDAD_DISPONIBLE,
                    FECHA_DOTACION = modelo.FECHA_DOTACION,
                    FABRICACION = modelo.FABRICACION,
                    CALIBRE = modelo.CALIBRE,
                    NRO_FUSIL = item.NRO_FUSIL,
                    NRO_CANON = item.NRO_CANON,
                    NRO_CIERRE = item.NRO_CIERRE,
                    NRO_CORREDERA = item.NRO_CORREDERA,
                    OPERABLE = item.ESTADO,
                    OBSERVACIONES = item.OBSERVACION,
                    TOTAL = total

                };
                reporte.Add(rep);
            }

            return reporte;
        }
        public IEnumerable<ReporteArmamentoModel> ReporteMuniciones(int ID_MUNICION_UNIDAD, int ID_UNIDAD)
        {
            var serUni = new UnidadesService.UnidadesClient();
            var unidad = serUni.ObtenerUnidadPorId(ID_UNIDAD);

            var serMat = new KardexMunicionesService.KardexMunicionesClient();
            List<ReporteArmamentoModel> reporte = new List<ReporteArmamentoModel>();

            var items2 = serMat.ObtenerMoviminetosMunicionUnidad(ID_MUNICION_UNIDAD);

            foreach (var item in items2.datos)
            {
                ReporteArmamentoModel rep = new ReporteArmamentoModel()
                {

                    UNIDAD = unidad.DESCRIPCION,
                    CANTIDAD = item.CANTIDAD_DISPONIBLE,
                    FECHA_DOTACION = item.FECHA_DOTACION,
                    FABRICACION = item.FABRICACION,
                    CALIBRE = item.CALIBRE,
                    OPERABLE = item.ESTADO,
                    OBSERVACIONES = item.OBSERVACION

                };
                reporte.Add(rep);
            }

            return reporte;
        }
        public IEnumerable<ReporteExistenciaModel> ReporteExistenciaGenerales(string ANIO, string MES, int ID_UNIDAD) {
            var servicio = new ReportesService.ReportesClient();
            var query = servicio.ObtenerExistenciasArmamento(ANIO, MES, ID_UNIDAD).Select(x => new ReporteExistenciaModel()
            {
                ALTA = x.ALTA,
                BAJAS = x.BAJAS,
                DETALLE = x.DETALLE,
                EXISTENCIA_ANTERIOR = x.EXISTENCIA_ANTERIOR,
                FECHA = x.FECHA,
                ID_UNIDAD = x.ID_UNIDAD,
                UNIDAD = x.UNIDAD,
                PERDIDAS = x.PERDIDAS,
                NOTA = x.NOTA,
                GRUPO = "ARMAMENTOS"

            });

            //var servicio = new ReportesService.ReportesClient();
            var query1 = servicio.ObtenerExistenciasMuniciones(ANIO, MES, ID_UNIDAD).Select(x => new ReporteExistenciaModel()
            {
                ALTA = x.ALTA,
                BAJAS = x.BAJAS,
                DETALLE = x.DETALLE,
                EXISTENCIA_ANTERIOR = x.EXISTENCIA_ANTERIOR,
                FECHA = x.FECHA,
                ID_UNIDAD = x.ID_UNIDAD,
                UNIDAD = x.UNIDAD,
                PERDIDAS = x.PERDIDAS,
                NOTA = x.NOTA,
                GRUPO = "MUNICIONES"

            });
            var result = query1.Union(query);
            return result;
        
        }
        public IEnumerable<ReporteExistenciaModel> ReporteExistenciaArmamento(string ANIO, string MES, int ID_UNIDAD)
        {
            //List<ReporteExistenciaModel> reporte = new List<ReporteExistenciaModel>();
            var servicio = new ReportesService.ReportesClient();
            var query = servicio.ObtenerExistenciasArmamento(ANIO, MES, ID_UNIDAD).Select(x => new ReporteExistenciaModel()
            {
                ALTA = x.ALTA,
                BAJAS = x.BAJAS,
                DETALLE = x.DETALLE,
                EXISTENCIA_ANTERIOR = x.EXISTENCIA_ANTERIOR,
                FECHA = x.FECHA,
                ID_UNIDAD = x.ID_UNIDAD,
                UNIDAD = x.UNIDAD,
                PERDIDAS = x.PERDIDAS,
                NOTA = x.NOTA

            });

            return query;
        }
        public IEnumerable<ReporteExistenciaModel> ReporteExistenciaMunicion(string ANIO, string MES, int ID_UNIDAD)
        {
            var servicio = new ReportesService.ReportesClient();
            var query = servicio.ObtenerExistenciasMuniciones(ANIO, MES, ID_UNIDAD).Select(x => new ReporteExistenciaModel()
            {
                ALTA = x.ALTA,
                BAJAS = x.BAJAS,
                DETALLE = x.DETALLE,
                EXISTENCIA_ANTERIOR = x.EXISTENCIA_ANTERIOR,
                FECHA = x.FECHA,
                ID_UNIDAD = x.ID_UNIDAD,
                UNIDAD = x.UNIDAD,
                PERDIDAS = x.PERDIDAS,
                NOTA = x.NOTA

            });

            return query;
        }
        public IEnumerable<ReporteExistenciaModel> ReporteExistencias(string ANIO, string MES, int ID_UNIDAD)
        {
            var serUni = new UnidadesService.UnidadesClient();
            var unidad = serUni.ObtenerUnidadPorId(ID_UNIDAD);
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            DateTime dt = Convert.ToDateTime(date);
            List<ReporteExistenciaModel> reporte = new List<ReporteExistenciaModel>();
            ReporteExistenciaModel ext = new ReporteExistenciaModel()
            {
                ID_UNIDAD = ID_UNIDAD,
                UNIDAD = unidad.UNIDAD,
                FECHA = dt
            };
            reporte.Add(ext);
            return reporte;
        }
        public IEnumerable<ReporteDetallePedidoModel> ReporteDetallesPedido(DateTime FECHA_INI, DateTime FECHA_FIN, int ID_UNIDAD)
        {
            List<ReporteDetallePedidoModel> reporte = new List<ReporteDetallePedidoModel>();
            var servicio = new ReportesService.ReportesClient();
            var query = servicio.ObtenerDetallePedido(FECHA_INI, FECHA_FIN, ID_UNIDAD).Select(x => new ReporteDetallePedidoModel()
            {
                CANTIDAD_ENTREGADA = x.CANTIDAD_ENTREGADA,
                CANTIDAD_SOLICITADA = x.CANTIDAD_SOLICITADA,
                CATEGORIA = x.CATEGORIA,
                CODIGO = x.CODIGO,
                DETALLE = x.DETALLE,
                ESTADO_DETALLE = x.ESTADO_DETALLE,
                ESTADO_RECEPCION = x.ESTADO_RECEPCION,
                FECHA = x.FECHA,
                FECHA_FIN = x.FECHA_FIN,
                FECHA_INI = x.FECHA_INI,
                ID_PEDIDO = x.ID_PEDIDO,
                UNIDAD = x.UNIDAD

            });

            return query;
        }
        public IEnumerable<ReportesService.MatLogisticoModel> ReporteMatLogisticos(int ID_MAT_LOGISTICO, int ID_UNIDAD)
        {
            var servicio = new ReportesService.ReportesClient();
            var query = servicio.ObtenerMaterialesLogisticos(ID_MAT_LOGISTICO, ID_UNIDAD).Select(x => new ReportesService.MatLogisticoModel()
            {
                AERONAVE = x.AERONAVE,
                CICLO_VIDA = x.CICLO_VIDA,
                CODIGO = x.CODIGO,
                ESTADO = x.ESTADO,
                FABRICANTE = x.FABRICANTE,
                FECHA_DOTACION = x.FECHA_DOTACION,
                GRUPO = x.GRUPO,
                HORA_VIDA = x.HORA_VIDA,
                ID_ITEM_ = x.ID_ITEM_,
                ID_UNIDAD = x.ID_UNIDAD,
                NRO_PARTE = x.NRO_PARTE,
                NRO_SERIE = x.NRO_SERIE,
                OBSERVACIONES = x.OBSERVACIONES,
                TIPO_COMPONENTE = x.TIPO_COMPONENTE,
                UNIDAD = x.UNIDAD

            });
            return query;
        }
        public IEnumerable<ReporteExistenciaModel> ReporteExistenciasMatLogistico(string ANIO, string MES, int ID_UNIDAD)
        {
            var servicio = new ReportesService.ReportesClient();
            var query = servicio.ObtenerExistenciasMatLogisticos(ANIO, MES, ID_UNIDAD).Select(x => new ReporteExistenciaModel()
            {
                ALTA = x.ALTA,
                BAJAS = x.BAJAS,
                DETALLE = x.DETALLE,
                EXISTENCIA_ANTERIOR = x.EXISTENCIA_ANTERIOR,
                FECHA = x.FECHA,
                ID_UNIDAD = x.ID_UNIDAD,
                UNIDAD = x.UNIDAD,
                PERDIDAS = x.PERDIDAS,
                NOTA = x.NOTA,
                GRUPO = x.GRUPO

            });

            return query;
        }
    }
}