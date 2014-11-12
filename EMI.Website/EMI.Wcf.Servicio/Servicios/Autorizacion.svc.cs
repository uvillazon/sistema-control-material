using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Aplicacion.Servicios;
using EMI.Wcf.Model;
using EMI.Wcf.Servicio.Models;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Autorizacion" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Autorizacion.svc o Autorizacion.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Autorizacion : IAutorizacion
    {

        public RespuestaServicio VerificaUsuario(string login, string contrasena)
        {
            var apli = new AutorizacionServicio();
            return apli.VerificarUsuario(login, contrasena);
            //throw new NotImplementedException();
        }
        public ListasServicio<MenuOpcionesModel> ObtenerMenuOpciones(string login)
        {
            var result = new ListasServicio<MenuOpcionesModel>();
            try
            {

            
            var apli = new AutorizacionServicio();
            var usuario = apli.ObtenerUsuario(login);
            var lista = new List<MenuOpcionesModel>();
            var menus = usuario.PERFILES.PERFILES_OPCIONES;
            foreach (var item in menus.Where(x => x.MENU_OPCIONES.ESTADO.Trim() == "A"))
            {
                var men = new MenuOpcionesModel()
                {
                    CLASE = item.MENU_OPCIONES.CLASE,
                    ICONCCS = item.MENU_OPCIONES.ICONCCS,
                    ID_MENU = item.MENU_OPCIONES.ID_MENU,
                    MENU = item.MENU_OPCIONES.MENU,
                    TOOLTIP = item.MENU_OPCIONES.TOOLTIP,
                    ID_PADRE = item.MENU_OPCIONES.ID_PADRE


                };
                lista.Add(men);
                //item.MENU_OPCIONES
            }
                result.datos = lista;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.success = false;
                result.msg = e.ToString();
                return result;
                //throw;
            }

        }

       public UsuariosModel ObtenerUsuario(string login)
        {
            var apli = new AutorizacionServicio();
            var usuario = apli.ObtenerUsuario(login);
            var user = new UsuariosModel()
           {
               NOMBRE = usuario.NOMBRE.Trim(),
               LOGIN = usuario.LOGIN,
               PERFIL = usuario.PERFILES.PERFIL,
               ESTADO = usuario.ESTADO,
               FECHA_CADUCIDAD = usuario.CONTRASENAS.Where(y => y.ESTADO == "ACTIVO").FirstOrDefault().FECHA_EXPIRACION,
               ID_UNIDAD = usuario.PERFILES.ID_UNIDAD == null ? 0 : usuario.PERFILES.ID_UNIDAD,
               UNIDAD = usuario.PERFILES.UNIDADES == null ? null : usuario.PERFILES.UNIDADES.UNIDAD
           };
            return user;
        }
    }
}
