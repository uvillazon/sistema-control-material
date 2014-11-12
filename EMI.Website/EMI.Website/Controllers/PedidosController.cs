using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
namespace EMI.Website.Controllers
{
    [Authorize]
    public class PedidosController : Controller
    {
        [HttpGet]
        public ActionResult ObtenerPedidosPaginados(PedidosService.Paginacion paginacion, PedidosService.FiltrosModelOfPedidoModelRb2EILji filtros, PedidosService.PedidoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new PedidosService.PedidosClient();
            var result = obj.ObtenerPedidosPaginados(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        [HttpGet]
        public ActionResult ObtenerDetallePaginados(PedidosService.Paginacion paginacion, PedidosService.FiltrosModelOfPedidoModelRb2EILji filtros, PedidosService.PedidoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new PedidosService.PedidosClient();
            var result = obj.ObtenerDetallesPedidosPaginados(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }

        [HttpGet]
        public ActionResult ObtenerDespachosPaginados(PedidosService.Paginacion paginacion, PedidosService.FiltrosModelOfPedidoModelRb2EILji filtros, PedidosService.PedidoModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var obj = new PedidosService.PedidosClient();
            var result = obj.ObtenerDespachosPaginados(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }

        [HttpPost]
        public ActionResult GuardarPedido(PedidosService.PEDIDOS ped, string detalles)
        {
            var login = User.Identity.Name;
            var obj = new PedidosService.PedidosClient();
            var result = obj.GuardarPedido(ped, detalles, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult AutorizarPedido(PedidosService.PEDIDOS ped, string Observacion)
        {
            var login = User.Identity.Name;
            var obj = new PedidosService.PedidosClient();
            var result = obj.AutorizarPedido(ped, Observacion, login);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult GuardarDespacho(PedidosService.DESPACHOS des, string Observacion)
        {
            var login = User.Identity.Name;
            var obj = new PedidosService.PedidosClient();
            var result = obj.GuardarDespacho(des, login);
            return Json(new { success = result.success, msg = result.msg });
        }

        [HttpPost]
        public ActionResult GuardarDetalleDespacho(string detalles, DateTime FECHA)
        {
            var login = User.Identity.Name;
            var obj = new PedidosService.PedidosClient();
            var result = obj.GuardarDetalleDespacho(detalles, FECHA, login);
            return Json(new { success = result.success, msg = result.msg });
        }

        [HttpPost]
        public ActionResult GuardarRecepcionDespachoMuniciones(int ID_DESPACHO)
        {
            var login = User.Identity.Name;
            var obj = new PedidosService.PedidosClient();
            var result = obj.GuardarRecepcionDespachoMuniciones(ID_DESPACHO, login);
            return Json(new { success = result.success, msg = result.msg });
        }

        [HttpPost]
        public ActionResult GuardarRecepcionDespachoArmamento(int ID_DESPACHO)
        {
            var login = User.Identity.Name;
            var obj = new PedidosService.PedidosClient();
            var result = obj.GuardarRecepcionDespachoArmamento(ID_DESPACHO, login);
            return Json(new { success = result.success, msg = result.msg });
        }

    }
}
