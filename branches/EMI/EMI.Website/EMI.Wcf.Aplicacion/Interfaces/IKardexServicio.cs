using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IKardexServicio
    {
       
        IQueryable<MOV_MUNICIONES_UNIDADES> ObtenerKardexUnidadesPaginados(Paginacion paginacion , FiltrosModel<KardexModel> filtros);

        IQueryable<MOV_MUNICIONES_UNIDADES> ObtenerKardexUnidadesPorId(int ID_MUNICION_UNIDAD);

        IQueryable<MOV_MAT_BELICOS> ObtenerKardexPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros);

        IQueryable<HISTORICO_CMP> ObtenerHistoricosCmpArmamentoPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros);

        IQueryable<ITEMS_VERIFICACIONES> ObtenerHistoricosMatLogistico(Paginacion paginacion, FiltrosModel<KardexModel> filtros);
      
    }
}
