using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Interfaces;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Infraestructura.Repositorios;
using EMI.Wcf.Model;
namespace EMI.Wcf.Aplicacion.Servicios
{
    public class AutorizacionServicio : IAutorizacionServicio
    {

        public RespuestaServicio VerificarUsuario(string usuario, string contrasena)
        {
            var repusu = new RepositorioUSUARIOS();
            var repCont = new RepositorioCONTRASENAS();
            contrasena = Encriptar(contrasena);

            var query = repusu.BuscarPorCriterio(x => x.LOGIN == usuario && x.ESTADO == "A");
            if (query != null)
            {
                var res = repCont.VerificarContrasena(query.ID_USUARIO, contrasena);
                int i = 0;
                bool result = int.TryParse(res, out i);
                if (result)
                {
                    return new RespuestaServicio() { success = true, msg = string.Format("Su contrasena Caduca en {0} dia(s)", i) };
                }
                else {
                    if (res == "Exito")
                    {
                        return new RespuestaServicio() { success = true, msg = string.Format("Exito") };
                    }
                    else {
                        return new RespuestaServicio() { success = false, msg = res };
                    }
                }     
            }
            else {
                return new RespuestaServicio() { success = false, msg = "El usuario no se encuentra activo" };
            }
        }


        public USUARIOS ObtenerUsuario(string usuario)
        {
            var repUsu = new RepositorioUSUARIOS();
            //sentencia linq
            var usu = repUsu.BuscarPorCriterio(x => x.LOGIN.ToUpper() == usuario.ToUpper());
            
            //var user = new USUARIOS();
            return usu;
        }


        public string Encriptar(string _cadenaAencriptar)
        {
            string result = string.Empty;
            byte[] encryted = System.Text.Encoding.Unicode.GetBytes(_cadenaAencriptar);
            result = Convert.ToBase64String(encryted);
            return result;
        }

        public string DesEncriptar(string _cadenaAdesencriptar)
        {
            string result = string.Empty;
            byte[] decryted = Convert.FromBase64String(_cadenaAdesencriptar);
            result = System.Text.Encoding.Unicode.GetString(decryted);
            return result;
        }


        public RespuestaServicio GuardarContrasena(int ID_USUARIO, string contrasena)
        {
            var repCont = new RepositorioCONTRASENAS();
            var res = repCont.GuardarContrasena(ID_USUARIO, Encriptar(contrasena));
            int i = 0;
            bool result = int.TryParse(res, out i);
            if (result)
            {
                return new RespuestaServicio() { success = true, msg = "Se Cambio la Contraseña" };
            }
            else {
                return new RespuestaServicio() { success = false, msg = res};
            }
        }


        public RespuestaServicio DesbloquearContrasena(int ID_USUARIO)
        {
            var repCont = new RepositorioCONTRASENAS();
            var res = repCont.DesbloquearContrasena(ID_USUARIO);
            int i = 0;
            bool result = int.TryParse(res, out i);
            if (result)
            {
                return new RespuestaServicio() { success = true, msg = "Se Desbloque Correctamente" };
            }
            else
            {
                return new RespuestaServicio() { success = false, msg = res };
            }
        }
    }
}
