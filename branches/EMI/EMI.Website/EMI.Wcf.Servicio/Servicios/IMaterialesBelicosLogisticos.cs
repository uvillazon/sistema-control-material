using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Servicio.Models;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IMaterialesBelicosLogisticos" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IMaterialesBelicosLogisticos
    {
        [OperationContract]
        ListasServicio<ArmamentoModelResp> ObtenerMaterialesPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros , bool almacen = false);

        [OperationContract]
        ListasServicio<MatBelicoModelResp> ObtenerMatBelicosPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros);

        [OperationContract]
        ListasServicio<MatBelicoModelResp> ObtenerMunicionesPorUnidadPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros);

        [OperationContract]
        ListasServicio<ParteArmamentoModelResp> ObtenerPartesArmamentos(FiltrosModel<ArmamentoModel> filtros);

        [OperationContract]
        ListasServicio<ParteArmamentoModelResp> ObtenerCmpArmamentos(FiltrosModel<ArmamentoModel> filtros);

        [OperationContract]
        RespuestaServicio GuardarModeloArmamento(Model.MAT_BELICOS mat, string detalles, string usuario);

        [OperationContract]
        RespuestaServicio GuardarItemArmamento(Model.ITEMS_ARMAMENTO item, string detalles, string usuario);

        [OperationContract]
        RespuestaServicio BajaItemArmamento(Model.ITEMS_ARMAMENTO item,  string usuario);

        [OperationContract]
        RespuestaServicio GuardarMuniciones(Model.MAT_BELICOS mat, string usuario);

        [OperationContract]
        ListasServicio<MatLogisticoModelResp> ObtenerMatLogisticosPaginagos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros);

        [OperationContract]
        ListasServicio<MatLogisticoModelResp> ObtenerItemMatLogisticosPaginagos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros, bool almacen);

        [OperationContract]
        RespuestaServicio GuardarMatLogistico(Model.MAT_LOGISTICOS mat, string usuario);

        [OperationContract]
        RespuestaServicio GuardarItemMatLogistico(Model.ITEMS_MAT_LOGISTICOS mat, string usuario);

        [OperationContract]
        RespuestaServicio CambiarComponentesArmamento(int ID_CMP1 , int ID_CMP2, string usuario);

        [OperationContract]
        RespuestaServicio GuardarSalidaMunicionesUnidad(string detalles,string usuario);

        [OperationContract]
        RespuestaServicio VerificacionMaterialLogistico(Model.ITEMS_VERIFICACIONES item, string usuario);

        [OperationContract]
        ListasServicio<HistoricoCmpModelResp> ObtenerHistoricosCmpArmamentoPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros);

        [OperationContract]
        ArmamentoModelResp ObtenerMaterialBelicoPorID(int ID_MAT_BELICO , int ID_UNIDAD);
        
        [OperationContract]
        ListasServicio<ArmamentoModelResp> ObtenerArmamentoPorUnidad(int ID_MAT_BELICO, int ID_UNIDAD);
    }
}
