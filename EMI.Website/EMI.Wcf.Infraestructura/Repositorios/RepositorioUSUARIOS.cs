using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioUSUARIOS : RepositorioBase<USUARIOS>
    {
        public RepositorioUSUARIOS() : base() { }

        public string GuardarUsuario(USUARIOS usr, string login)
        {
            try
            {
                usr.ESTADO = "A";
                usr.FECHA_ALTA = DateTime.Now;
                usr.ID_USUARIO = ObtenerId();
                Crear(usr);
                GuardarCambios();
                return usr.ID_USUARIO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string EditarUsuario(USUARIOS usr, string login)
        {
            try
            {
                var user = BuscarPorCriterio(x => x.ID_USUARIO == usr.ID_USUARIO);
                user.NOMBRE = usr.NOMBRE;
                user.ID_PERFIL = usr.ID_PERFIL;
                user.CONTRASEÑA = usr.CONTRASEÑA;
                user.ESTADO = usr.ESTADO;
                user.FECHA_CADUCIDAD = usr.ESTADO == "I" ? (DateTime?)DateTime.Now : null;
                GuardarCambios();
                return usr.ID_USUARIO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
