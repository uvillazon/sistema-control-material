using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace EMI.Website.Controllers
{
    [Authorize]
    public class UnidadesController : Controller
    {
        [HttpGet]
        public ActionResult ObtenerUnidadesPaginados(UnidadesService.Paginacion paginacion)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            var obj = new UnidadesService.UnidadesClient();
            var result = obj.ObtenerUnidadesPaginados(paginacion);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }

    }
}
