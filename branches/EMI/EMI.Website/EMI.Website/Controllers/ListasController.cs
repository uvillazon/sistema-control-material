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
    public class ListasController : Controller
    {
        ListaService.ListasClient obj = new ListaService.ListasClient();

        [HttpGet]
        public ActionResult ObtenerListas(ListaService.Paginacion paginacion,ListaService.FiltrosModelOfListasModelRb2EILji filtros , ListaService.ListasModel Entidad)
        {

            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;

            var result = obj.ObtenerListas(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);

        }
        [HttpGet]
        public ActionResult ObtenerListasItem(ListaService.Paginacion paginacion, ListaService.FiltrosModelOfListasItemsModelRb2EILji filtros, ListaService.ListasItemsModel Entidad)
        {

            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var result = obj.ObtenerListasItems(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);

        }
        [HttpPost]
        public ActionResult GrabarListaSP(ListaService.LISTAS1 lis)
        {
            var login = User.Identity.Name;
            var result = obj.GuardarLista(lis, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult GrabarListaItemSP(ListaService.LISTAS_ITEMS lis)
        {
            var login = User.Identity.Name;
            var result = obj.GuardarItemLista(lis, login);
            return Json(new { success = result.success, msg = result.msg });
        }

    }
}
