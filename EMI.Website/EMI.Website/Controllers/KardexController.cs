using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
namespace EMI.Website.Controllers
{
     [Authorize]
    public class KardexController : Controller
    {
        [HttpGet]
        public ActionResult ObtenerKardexMunicionesUnidad(KardexMunicionesService.Paginacion paginacion, KardexMunicionesService.FiltrosModelOfKardexModelRb2EILji filtros, KardexMunicionesService.KardexModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new KardexMunicionesService.KardexMunicionesClient();
            var result = obj.ObtenerKardexUnidadPaginados(paginacion, filtros);
            var lista = result.datos.OrderByDescending(x => x.ID_MOV).ThenByDescending(y => y.FECHA);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = lista, Total = result.total }) + ");";
            return JavaScript(callback);
        }

        [HttpGet]
        public ActionResult ObtenerKardexMuniciones(KardexMunicionesService.Paginacion paginacion, KardexMunicionesService.FiltrosModelOfKardexModelRb2EILji filtros, KardexMunicionesService.KardexModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new KardexMunicionesService.KardexMunicionesClient();
            var result = obj.ObtenerKardexPaginados(paginacion, filtros);
            var lista = result.datos.OrderByDescending(x => x.ID_MOV).ThenByDescending(y => y.FECHA);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = lista, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        [HttpGet]
        public ActionResult ObtenerHistoricosCmpArmamentoPaginados(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfKardexModelRb2EILji filtros, MaterialesBelicosLogisticosService.KardexModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.ObtenerHistoricosCmpArmamentoPaginados(paginacion, filtros);
            //var lista = result.datos.OrderByDescending(x => x.ID_MOV).ThenByDescending(y => y.FECHA);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }

        [HttpGet]
        public ActionResult ObtenerHistoricoVerificacionMatLogisticoPaginados(HistoricosService.Paginacion paginacion, HistoricosService.FiltrosModelOfKardexModelRb2EILji filtros,HistoricosService.KardexModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new HistoricosService.HistoricosClient();
            var result = obj.ObtenerHistoricoVerificacionMatLogisticoPaginados(paginacion, filtros);
            //var lista = result.datos.OrderByDescending(x => x.ID_MOV).ThenByDescending(y => y.FECHA);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        //
    }
}
