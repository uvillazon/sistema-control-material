using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using EMI.Website.Models;
namespace EMI.Website.Controllers
{
    [Authorize]
    public class LogisticosController : Controller
    {
        //metodo del controlador que devuelve para un store
        [HttpGet]
        public ActionResult ObtenerMatLogisticosPaginados(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfArmamentoModelRb2EILji filtros, MaterialesBelicosLogisticosService.ArmamentoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();

            var result = obj.ObtenerMatLogisticosPaginagos(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        [HttpGet]
        public ActionResult ObtenerItemMatLogisticos(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfArmamentoModelRb2EILji filtros, MaterialesBelicosLogisticosService.ArmamentoModel Entidad, bool almacen = false)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.ObtenerItemMatLogisticosPaginagos(paginacion, filtros, almacen);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }

        [HttpPost]
        public ActionResult GuardarMatLogisticos(MaterialesBelicosLogisticosService.MAT_LOGISTICOS materiales)
        {
            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.GuardarMatLogistico(materiales, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult GuardarItemMatLogisticos(MaterialesBelicosLogisticosService.ITEMS_MAT_LOGISTICOS materiales)
        {
            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.GuardarItemMatLogistico(materiales, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult VerificacionMaterialLogistico(MaterialesBelicosLogisticosService.ITEMS_VERIFICACIONES item)
        {
            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.VerificacionMaterialLogistico(item, login);
            return Json(new { success = result.success, msg = result.msg });
        }
    }
}
