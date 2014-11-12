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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IHistoricos" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IHistoricos
    {

        [OperationContract]
        ListasServicio<HistoricoVerificacionModelResp> ObtenerHistoricoVerificacionMatLogisticoPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros);
    }
}
