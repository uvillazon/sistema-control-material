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
namespace EMI.Wcf.Aplicacion.Servicios
{
    public class ListasServicio : IListasServicio
    {
        private RepositorioLISTAS1 replista = new RepositorioLISTAS1();
        private RepositorioLISTAS_ITEMS repListaItem = new RepositorioLISTAS_ITEMS();
        public IQueryable<LISTAS_ITEMS> ObtenerListasItems(Paginacion paginacion, FiltrosModel<ListasItemsModel> filtros)
        {
            try
            {

                IQueryable<LISTAS_ITEMS> result = null;
                result = repListaItem.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = repListaItem.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                return result;
            }

            catch (Exception e)
            {

                throw;
            }
        }

        public IQueryable<LISTAS1> ObtenerListas(Paginacion paginacion, FiltrosModel<ListasModel> filtros)
        {
            try
            {

                IQueryable<LISTAS1> result = null;
                result = replista.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = replista.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                return result;
            }

            catch (Exception e)
            {

                throw;
            }
        }


        public IQueryable<LISTAS1> ObtenerTodasListas()
        {
            try
            {

                IQueryable<LISTAS1> result = null;
                result = replista.BuscarTodos();
                return result;
            }

            catch (Exception e)
            {

                throw;
            }
        }



        public RespuestaServicio GuardarLista(LISTAS1 lista, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            resp = replista.GuardarLista(lista, usuario);
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                result.id = id;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }

        public RespuestaServicio GuardarItemLista(LISTAS_ITEMS lista, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            if (lista.ID_TABLA == 0)
            {
                resp = repListaItem.GuardarItemLista(lista, usuario);
            }
            else {
                resp = repListaItem.EditarLista(lista, usuario);
            }

            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                result.id = id;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }
    }
}
