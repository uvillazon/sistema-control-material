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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Usuarios" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Usuarios.svc o Usuarios.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Usuarios : IUsuarios
    {
        UsuariosServicio serUsr = new UsuariosServicio();
        public ListasServicio<UsuarioModelResp> ObtenerUsuariosPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros)
        {
            ListasServicio<UsuarioModelResp> result = new ListasServicio<UsuarioModelResp>();
            try
            {
                IEnumerable<USUARIOS> usr = serUsr.ObtenerUsuariosPaginados(paginacion, filtros);
                List<UsuarioModelResp> datos = new List<UsuarioModelResp>();
                datos = usr.Select(x => new UsuarioModelResp()
                {
                    ESTADO = x.ESTADO,
                    LOGIN = x.LOGIN,
                    NOMBRE = x.NOMBRE,
                    CONTRASEÑA = x.CONTRASEÑA,
                    FECHA_ALTA = x.FECHA_ALTA,
                    PERFIL = x.PERFILES.PERFIL,
                    ID_PERFIL = x.ID_PERFIL,
                    ID_USUARIO = x.ID_USUARIO,
                    FECHA_BLOQUEO = x.CONTRASENAS.Where(y=>y.ESTADO == "ACTIVO").FirstOrDefault().FECHA_BLOQUEO,
                    NRO_FALLIDO = x.CONTRASENAS.Where(y => y.ESTADO == "ACTIVO").FirstOrDefault().NRO_FALLIDO,


                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }

        public ListasServicio<UsuarioModelResp> ObtenerPerfilesPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros)
        {
            ListasServicio<UsuarioModelResp> result = new ListasServicio<UsuarioModelResp>();
            try
            {
                IEnumerable<PERFILES> usr = serUsr.ObtenerPerfilesPaginados(paginacion, filtros);
                List<UsuarioModelResp> datos = new List<UsuarioModelResp>();
                datos = usr.Select(x => new UsuarioModelResp()
                {
                    ESTADO = x.ESTADO,
                    PERFIL = x.PERFIL,
                    DESCRIPCION = x.DESCRIPCION,
                    ID_PERFIL = x.ID_PERFIL

                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }

        public Aplicacion.Modelo.RespuestaServicio GuardarUsuario(Model.USUARIOS usr)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = serUsr.GuardarUsuario(usr);
            return result;
        }
        public RespuestaServicio GuardarContrasena(string login, string contrasena)
        {
            var apli = new AutorizacionServicio();
            var usuario = serUsr.ObtenerUsuario(x => x.LOGIN.ToUpper() == login.ToUpper());
            return apli.GuardarContrasena(usuario.ID_USUARIO, contrasena);
            //throw new NotImplementedException();
        }


        public RespuestaServicio DesbloquearContrasena(int ID_USUARIO)
        {
            RespuestaServicio result = new RespuestaServicio();
            var apli = new AutorizacionServicio();
            result = apli.DesbloquearContrasena(ID_USUARIO);
            return result;
        }
    }
}
