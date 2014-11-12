using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IBitacorasServicio
    {

        IEnumerable<BITACORAS> ObtenerHistoricoCambios(FiltrosModel<BitacorasModel> filtros, Expression<Func<BITACORAS, bool>> criterio = null);
      
    }
}
