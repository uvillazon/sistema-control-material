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
    public class MaterialesController : Controller
    {
        //metodo del controlador que devuelve para un store
        [HttpGet]
        public ActionResult ObtenerMaterialesPaginado(PaginacionModel paginacion)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            var login = User.Identity.Name;
            var obj = new MaterialesService.MaterialesClient();
            MaterialesService.Paginacion pag = new MaterialesService.Paginacion()
            {
                dir = paginacion.dir,
                limit = paginacion.limit,
                start = paginacion.start,
                sort = paginacion.sort,
                Contiene = paginacion.Contiene
            };

            var result = obj.ObtenerMaterialesPaginados(pag);


            MenuOpcionesModel menu1 = new MenuOpcionesModel();
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
            //return Json(new { USUARIO = user , MENUS = menus.msg , DATOS = menus.datos});
            //obj.PERFILES_OPCIONES.
        }
        [HttpPost]
        public ActionResult GuardarMaterial(MaterialesService.MATERIALES_BELICOS materiales)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesService.MaterialesClient();
            var result = obj.GuardarMaterial(materiales, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult EliminarMaterial(int ID_MATERIAL)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesService.MaterialesClient();
            var result = obj.EliminarMaterial(ID_MATERIAL, login);
            return Json(new { success = result.success, msg = result.msg });
        }

    }
}
