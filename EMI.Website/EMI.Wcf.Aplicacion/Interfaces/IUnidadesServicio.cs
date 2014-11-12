using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IUnidadesServicio
    {

        UNIDADES ObtenerUnidadPorId(int ID_UNIDAD);
        IQueryable<UNIDADES> ObtenerUnidadesPaginados(Paginacion paginacion);
    }
}
