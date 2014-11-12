using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace EMI.Website.Controllers
{
    [Authorize]
    public class BitacorasController : Controller
    {

        [HttpGet]
        public ActionResult ObtenerBitacoras(BitacorasService.Paginacion paginacion, BitacorasService.FiltrosModelOfBitacorasModelRb2EILji filtros, BitacorasService.BitacorasModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new BitacorasService.BitacorasClient();
            var result = obj.ObtenerBitacoras(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result, Total = result.Count() }) + ");";
            return JavaScript(callback);
        }
    }
}
