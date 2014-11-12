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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IKardexMuniciones" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IKardexMuniciones
    {
        [OperationContract]
        ListasServicio<KardexModelResp> ObtenerKardexUnidadPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros);

        [OperationContract]
        ListasServicio<KardexModelResp> ObtenerKardexPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros);

        [OperationContract]
        ListasServicio<ArmamentoModelResp> ObtenerMoviminetosMunicionUnidad(int ID_MUNICION_UNIDAD);
    }
}
