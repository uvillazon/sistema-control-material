using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using EMI.Website.UsuariosService;

namespace EMI.Website.Controllers
{
    [Authorize]
    public class UsuariosController : Controller
    {
        UsuariosService.UsuariosClient obj = new UsuariosService.UsuariosClient();
        AutorizacionService.AutorizacionClient autSer = new AutorizacionService.AutorizacionClient();
        [HttpGet]
        public ActionResult ObtenerUsuariosPaginados(UsuariosService.Paginacion paginacion, UsuariosService.FiltrosModelOfUsuarioModelRb2EILji filtros, UsuariosService.UsuarioModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var result = obj.ObtenerUsuariosPaginados(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        [HttpGet]
        public ActionResult ObtenerPerfilesPaginados(UsuariosService.Paginacion paginacion, UsuariosService.FiltrosModelOfUsuarioModelRb2EILji filtros, UsuariosService.UsuarioModel Entidad)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string callback;
            filtros.Entidad = Entidad;
            var result = obj.ObtenerPerfilesPaginados(paginacion, filtros);
            callback = paginacion.callback + "(" + js.Serialize(new { Rows = result.datos, Total = result.total }) + ");";
            return JavaScript(callback);
        }
        [HttpPost]
        public ActionResult GuardarUsuario(USUARIOS usr)
        {

            var login = User.Identity.Name;
            var result = obj.GuardarUsuario(usr);
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult CambiarContrasena(string contrasena)
        {

            var login = User.Identity.Name;
            var result = obj.GuardarContrasena(login, contrasena);
            FormsAuthentication.SignOut();
            return Json(new { success = result.success, msg = result.msg });
        }
        [HttpPost]
        public ActionResult DesbloquearUsuario(int ID_USUARIO)
        {

            var login = User.Identity.Name;
            var result = obj.DesbloquearContrasena(ID_USUARIO);
            //FormsAuthentication.SignOut();
            return Json(new { success = result.success, msg = result.msg });
        }
        

    }
}
