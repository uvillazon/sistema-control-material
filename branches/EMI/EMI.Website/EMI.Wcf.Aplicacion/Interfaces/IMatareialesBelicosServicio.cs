using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IMaterialesBelicosServicio
    {

        IQueryable<ITEMS_ARMAMENTO> ObtenerArmamentoPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros, bool almacen);
        IQueryable<MAT_BELICOS> ObtenerMaterialesBelicosPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros);
        IQueryable<PARTES_MAT_BELICOS> ObtenerPartesArmamento(FiltrosModel<ArmamentoModel> filtros);
        IQueryable<COMPONENTES_ITEMS> ObtenerCmpArmamentos(FiltrosModel<ArmamentoModel> filtros);
        IQueryable<MAT_LOGISTICOS> ObtenerMatLogisticos(Paginacion paginacion ,FiltrosModel<ArmamentoModel> filtros);
        IQueryable<ITEMS_MAT_LOGISTICOS> ObtenerItemMatLogisticos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros, bool almacen);
        IQueryable<MUNICIONES_UNIDADES> ObtenerMunicionesPorUnidad(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros);


        RespuestaServicio GuardarModeloArmamento(MAT_BELICOS material ,string detalles, string usuario);

        RespuestaServicio GuardarItemArmamento(ITEMS_ARMAMENTO item, string detalles, string usuario);
        RespuestaServicio BajaItemArmamento(ITEMS_ARMAMENTO item, string usuario);

        RespuestaServicio GuardarMuniciones(MAT_BELICOS material, string usuario);


        RespuestaServicio GuardarMatLogistico(MAT_LOGISTICOS material, string usuario);

        RespuestaServicio GuardarItemMatLogistico(ITEMS_MAT_LOGISTICOS material, string usuario);


        RespuestaServicio CambiarComponentesArmamento(int ID_CMP1 , int ID_CMP2, string usuario);

        RespuestaServicio GuardarSalidaMunicionesUnidad(string detalles, string usuario);

        RespuestaServicio VerificacionMaterialLogistico(ITEMS_VERIFICACIONES item, string usuario);

        MAT_BELICOS ObtenerMaterialBelicoPorId(int ID_MAT_BELICO );
        IQueryable<ITEMS_ARMAMENTO> ObtenerArmamentoPorUnidad(int ID_MAT_BELICO, int ID_UNIDAD);
        //Res
    }
}
