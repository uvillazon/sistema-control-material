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
    public class ArmamentosController : Controller
    {
        //metodo del controlador que devuelve para un store
        [HttpGet]
        public ActionResult ObtenerMaterialesPaginado(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfArmamentoModelRb2EILji filtros, MaterialesBelicosLogisticosService.ArmamentoModel Entidad, bool almacen = false)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var login = User.Identity.Name;
            //var obj = new MaterialesService.MaterialesClient();
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            //var obj = new PruebaServicio.MaterialesBelicosLogisticosClient();
            var result = obj.ObtenerMaterialesPaginados(paginacion, filtros, almacen);
            //var result = obj.ObtenerMaterialesPaginados(
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
            //return Json(new { USUARIO = user , MENUS = menus.msg , DATOS = menus.datos});
            //obj.PERFILES_OPCIONES.
        }
        [HttpGet]
        public ActionResult ObtenerMaterialesBelicosPaginado(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfArmamentoModelRb2EILji filtros, MaterialesBelicosLogisticosService.ArmamentoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var login = User.Identity.Name;
            //var obj = new MaterialesService.MaterialesClient();
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();

            var result = obj.ObtenerMatBelicosPaginados(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
            //return Json(new { USUARIO = user , MENUS = menus.msg , DATOS = menus.datos});
            //obj.PERFILES_OPCIONES.
        }

        [HttpGet]
        public ActionResult ObtenerPartesArmamento(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfArmamentoModelRb2EILji filtros, MaterialesBelicosLogisticosService.ArmamentoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var login = User.Identity.Name;
            //var obj = new MaterialesService.MaterialesClient();
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();

            var result = obj.ObtenerPartesArmamentos(filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
            //return Json(new { USUARIO = user , MENUS = menus.msg , DATOS = menus.datos});
            //obj.PERFILES_OPCIONES.
        }

        [HttpPost]
        public ActionResult GuardarModeloArmamento(MaterialesBelicosLogisticosService.MAT_BELICOS materiales, string detalles)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.GuardarModeloArmamento(materiales, detalles, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult GuardarItemArmamento(MaterialesBelicosLogisticosService.ITEMS_ARMAMENTO items, string detalles)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.GuardarItemArmamento(items, detalles, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpGet]
        public ActionResult ObtenerCmpArmamentos(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfArmamentoModelRb2EILji filtros, MaterialesBelicosLogisticosService.ArmamentoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.ObtenerCmpArmamentos(filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        [HttpPost]
        public ActionResult GuardarMuniciones(MaterialesBelicosLogisticosService.MAT_BELICOS materiales)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.GuardarMuniciones(materiales, login);
            return Json(new { success = result.success, msg = result.msg });
        }

        [HttpGet]
        public ActionResult ObtenerMunicionesPorUnidadPaginado(MaterialesBelicosLogisticosService.Paginacion paginacion, MaterialesBelicosLogisticosService.FiltrosModelOfArmamentoModelRb2EILji filtros, MaterialesBelicosLogisticosService.ArmamentoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();

            var result = obj.ObtenerMunicionesPorUnidadPaginados(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        [HttpPost]
        public ActionResult BajaItemArmamento(MaterialesBelicosLogisticosService.ITEMS_ARMAMENTO items)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.BajaItemArmamento(items, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult CambiarComponentesArmamento(int ID_CMP1, int ID_CMP2)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.CambiarComponentesArmamento(ID_CMP1, ID_CMP2, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult GuardarSalidaMunicionesUnidad(string detalles)
        {

            var login = User.Identity.Name;
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();
            var result = obj.GuardarSalidaMunicionesUnidad(detalles, login);
            return Json(new { success = result.success, msg = result.msg });
        }
    }
}
