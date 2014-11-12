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
    public class BitacorasServicio : IBitacorasServicio
    {
        private RepositorioBITACORAS repBit = new RepositorioBITACORAS();


        public IEnumerable<BITACORAS> ObtenerHistoricoCambios(FiltrosModel<BitacorasModel> filtros, System.Linq.Expressions.Expression<Func<BITACORAS, bool>> criterio = null)
        {
            IQueryable<BITACORAS> result;
            if (criterio == null)
            {
                result = repBit.BuscarTodos();
            }
            else
            {
                result = repBit.BuscarTodos(criterio);
            }
            if (!string.IsNullOrEmpty(filtros.Contiene))
            {

                result = result.Where(x => x.LOGIN.ToUpper().Contains(filtros.Contiene.ToUpper()));
            }
            return result;
        }
    }
}
