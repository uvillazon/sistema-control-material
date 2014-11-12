using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EMI.Website.Controllers
{
    [Authorize]
    public class TablasController : Controller
    {
        //
        // GET: /Tablas/

        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ObtenerTablas()
        {

            TablasService.TablasClient servicio = new TablasService.TablasClient();

            return Json(new { Rows = servicio.ObtenerTablas(), Total = servicio.ObtenerTablas().Count() }, JsonRequestBehavior.AllowGet);
            //return View(servicio.ObtenerTablas());
        }

    }
}
