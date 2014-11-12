using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EMI.Website.Models;

namespace EMI.Website.Controllers
{
    [Authorize]
    public class MenuOpcionesController : Controller
    {
        //
        // GET: /MenuOpciones/

        public ActionResult Index()
        {
            return View();
        }
        private string FechaCaducidad(DateTime? fechacaducidad1)
        {
            if (fechacaducidad1 != null)
            {
                DateTime fechacaducidad = (DateTime)fechacaducidad1;
                DateTime fechaActual = DateTime.Now;
                if (fechacaducidad <= fechaActual.AddDays(5))
                {
                    //fechacaducidad = fechacaducidad.AddDays(5);
                    TimeSpan time = fechacaducidad - fechaActual;
                    int dias = time.Hours > 8 ? time.Days + 1 : time.Days;

                    //int dia = 
                    return string.Format("Su Contraseña Expira en {0} Dia(s). Desea Cambiar la Contraseña Ahora? ", dias);
                }
                else
                {
                    return "COMPLETADO";
                }
            }
            else
            {
                return "COMPLETADO";
            }

        }
        [HttpPost]
        public JsonResult ObtenerMenuOpciones()
        {
            var login = User.Identity.Name;
            var obj = new AutorizacionService.AutorizacionClient();
            var objListas = new ListaService.ListasClient();
            var user = obj.ObtenerUsuario(login);
         
            var usuarioResult = new
            {
                NOMBRE = user.NOMBRE,
                LOGIN = user.LOGIN,
                ID_UNIDAD = user.ID_UNIDAD,
                UNIDAD = user.UNIDAD,
                //Email = user.EMAIL,
                ESTADO = user.ESTADO,
                PERFIL = user.PERFIL,
                Caducidad = this.FechaCaducidad(user.FECHA_CADUCIDAD),
            };
            var menus = obj.ObtenerMenuOpciones(login);
            var listas = objListas.ObtenerTodasListas();
            //listas.datos.FirstOrDefault()
            MenuOpcionesModel menu1 = new MenuOpcionesModel();
            var result = menu1.MenuDinamico(menus.datos.ToList());

            return Json(new { Opciones = result, Usuario = usuarioResult, msg = menus.msg, Listas = listas.datos });
            //return Json(new { USUARIO = user , MENUS = menus.msg , DATOS = menus.datos});
            //obj.PERFILES_OPCIONES.
        }

    }
}
