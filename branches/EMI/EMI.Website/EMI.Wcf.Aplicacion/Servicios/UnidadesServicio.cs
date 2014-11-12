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
namespace EMI.Wcf.Aplicacion.Servicios
{
    public class UnidadesServicio : IUnidadesServicio
    {
        private RepositorioUNIDADES repUni = new RepositorioUNIDADES();
        public UNIDADES ObtenerUnidadPorId(int ID_UNIDAD)
        {
            var unidad = repUni.BuscarPorCriterio(x => x.ID_UNIDAD == ID_UNIDAD);
            return unidad;

        }


        public IQueryable<UNIDADES> ObtenerUnidadesPaginados(Paginacion paginacion)
        {
            IQueryable<UNIDADES> result = null;
            result = repUni.BuscarTodos();
            paginacion.total = result.Count();
            result = repUni.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }
    }
}
