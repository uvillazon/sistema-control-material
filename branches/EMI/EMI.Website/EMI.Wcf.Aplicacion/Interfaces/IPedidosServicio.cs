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
    interface IPedidosServicio
    {
       
        IQueryable<PEDIDOS> ObtenerPedidosPaginados(Paginacion paginacion , FiltrosModel<PedidoModel> filtros);
        IQueryable<DETALLES_PEDIDOS> ObtenerDetallePedidoPaginado(Paginacion paginacion, FiltrosModel<PedidoModel> filtros);
        IQueryable<DESPACHOS> ObtenerDespachosPaginado(Paginacion paginacion, FiltrosModel<PedidoModel> filtros);
        IQueryable<DESPACHOS> ObtenerDespachos(Expression<Func<DESPACHOS, bool>> criterios);
        //IQueryable<PARTES_MAT_BELICOS> ObtenerPartesArmamento(FiltrosModel<ArmamentoModel> filtros);
        //IQueryable<COMPONENTES_ITEMS> ObtenerCmpArmamentos(FiltrosModel<ArmamentoModel> filtros);
        //IQueryable<MAT_LOGISTICOS> ObtenerMatLogisticos(Paginacion paginacion ,FiltrosModel<ArmamentoModel> filtros);
        //IQueryable<ITEMS_MAT_LOGISTICOS> ObtenerItemMatLogisticos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros);

        RespuestaServicio GuardarPedido(PEDIDOS ped, string detalles, string usuario);
        RespuestaServicio AutorizarPedido(PEDIDOS ped, string Observacion, string usuario);
        RespuestaServicio GuardarDespacho(DESPACHOS des, string usuario);
        RespuestaServicio GuardarDespachoDetalle( string detalle, string usuario,DateTime FECHA);
        RespuestaServicio GuardarRecepcionDespachoMuniciones(int ID_DESPACHO, string usuario);
        //RespuestaServicio GuardarItemArmamento(ITEMS_ARMAMENTO item, string detalles, string usuario);

        //RespuestaServicio GuardarMuniciones(MAT_BELICOS material, string usuario);


        //RespuestaServicio GuardarMatLogistico(MAT_LOGISTICOS material, string usuario);

        //RespuestaServicio GuardarItemMatLogistico(ITEMS_MAT_LOGISTICOS material, string usuario);

        //Res
    }
}
