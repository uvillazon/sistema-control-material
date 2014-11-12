using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IListasServicio
    {
       
        IQueryable<LISTAS_ITEMS> ObtenerListasItems(Paginacion paginacion , FiltrosModel<ListasItemsModel> filtros);
        IQueryable<LISTAS1> ObtenerListas(Paginacion paginacion, FiltrosModel<ListasModel> filtros);

        IQueryable<LISTAS1> ObtenerTodasListas();
        RespuestaServicio GuardarLista(LISTAS1 lista, string usuario);
        RespuestaServicio GuardarItemLista(LISTAS_ITEMS lista, string usuario);
        //Res
    }
}
