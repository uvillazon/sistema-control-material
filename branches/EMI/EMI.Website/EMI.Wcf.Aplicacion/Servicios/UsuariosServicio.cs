using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Interfaces;
using System.Linq.Dynamic;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Infraestructura.Repositorios;
using EMI.Wcf.Model;
using LinqKit;
using Newtonsoft.Json;
using System.Linq.Expressions;
namespace EMI.Wcf.Aplicacion.Servicios
{
    public class UsuariosServicio : IUsuariosServicio
    {
        private RepositorioUSUARIOS repUsr = new RepositorioUSUARIOS();
        private RepositorioPERFILES repPer = new RepositorioPERFILES();

        public IQueryable<USUARIOS> ObtenerUsuariosPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros)
        {
            try
            {
                IQueryable<USUARIOS> result = null;
                result = repUsr.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.Contiene != null)
                {
                    result = result.Where(x => x.NOMBRE.ToUpper().Contains(filtros.Contiene.ToUpper()));
                }
                paginacion.total = result.Count();
                result = repUsr.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                return result;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public IQueryable<PERFILES> ObtenerPerfilesPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros)
        {
            try
            {
                IQueryable<PERFILES> result = null;
                result = repPer.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.Contiene != null)
                {
                    result = result.Where(x => x.PERFIL.ToUpper().Contains(filtros.Contiene.ToUpper()));
                }
                paginacion.total = result.Count();
                result = repPer.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                return result;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public RespuestaServicio GuardarUsuario(USUARIOS usr)
        {
            try
            {
                var result = new RespuestaServicio();

                //controlar duplicidad


                //para crear
                if (usr.ID_USUARIO == 0)
                {
                    if (!repUsr.SiExiste(x => x.LOGIN.ToUpper() == usr.LOGIN.ToUpper()))
                    {
                        return new RespuestaServicio() { msg = "Existe Otro usuario con el mismo login" + usr.LOGIN, success = false };
                    }
                    repUsr.GuardarUsuario(usr,null);
                }
                else
                {
                    repUsr.EditarUsuario(usr, null);

                }
                return new RespuestaServicio() { msg = "Proceso ejecutado Correctamente", success = true };


            }
            catch (Exception e)
            {
                return new RespuestaServicio() { msg = e.ToString(), success = false };
            }
        }


        public USUARIOS ObtenerUsuario(Expression<Func<USUARIOS, bool>> criterio)
        {
            return  repUsr.BuscarPorCriterio(criterio);
        }
    }
}
