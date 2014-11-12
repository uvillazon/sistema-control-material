using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using EMI.Website.Filters;
using EMI.Website.Models;

namespace EMI.Website.Controllers
{

    public class AccountController : Controller
    {
        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        public ActionResult LogOnVerificar(string loginPassword, string loginUsername)
        {
            LogErrores log = new LogErrores();
            var ser = new AutorizacionService.AutorizacionClient();
            var respuesta = ser.VerificaUsuario(loginUsername, loginPassword);
            //var hola = ser.
            if (respuesta.success)
            {
                FormsAuthentication.SetAuthCookie(loginUsername, true);
                log.InicioOk(loginUsername);
                return Json(new { success = true });
            }
            else
            {
                log.FalloLogin(loginUsername);
                return Json(new { success = false, msg = respuesta.msg });
            }

        }
        //
        // POST: /Account/LogOff

        [HttpGet]
        public ActionResult LogOff()
        {
            //WebSecurity.Logout();
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

    }
}
