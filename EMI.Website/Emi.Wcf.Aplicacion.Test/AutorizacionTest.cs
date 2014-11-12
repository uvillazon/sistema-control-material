using System;
using EMI.Wcf.Aplicacion.Servicios;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Emi.Wcf.Aplicacion.Test
{
    [TestClass]
    public class AutorizacionTest
    {

        [TestMethod]
        public void AuntentificarTest()
        {

            var aut = new AutorizacionServicio();

            Assert.IsTrue(aut.VerificarUsuario("yañes", "Yañes123").success);
        }
        [TestMethod]
        public void ObtenerUsuarioTest()
        {
            var aut = new AutorizacionServicio();
            var usu = aut.ObtenerUsuario("yañes123");
            Assert.IsNotNull(usu);
            //Assert.IsTrue(us > 0);
        }
        [TestMethod]
        public void DesbloquearConstrasenaTest() {
            var aut = new AutorizacionServicio();
            //primer paso bloquear la cuenta
            var usuario = aut.ObtenerUsuario("yañes");
            //string pass = ""yañes";Yañes123";
            string respuesta = "";
            for (int i = 0; i < 3; i++)
			{
               respuesta =  aut.VerificarUsuario(usuario.LOGIN, Guid.NewGuid().ToString()).msg;
			}
            //vovler a obtener el usuario y verificar que su cuenta fue bloqueada
            Assert.IsTrue(respuesta.Contains("Bloqueada"));

            //respuesta = aut.DesbloquearContrasena(usuario.ID_USUARIO);

            Assert.IsTrue(aut.DesbloquearContrasena(usuario.ID_USUARIO).success);
           

        }
    }
}
