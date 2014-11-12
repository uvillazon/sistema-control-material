using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IReportes" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IReportes
    {
        [OperationContract]
        List<ExistenciasModel> ObtenerExistenciasArmamento(string ANIO, string MES, int ID_UNIDAD);
        [OperationContract]
        List<ExistenciasModel> ObtenerExistenciasMuniciones(string ANIO, string MES, int ID_UNIDAD);
        [OperationContract]
        List<DetallePedidoModel> ObtenerDetallePedido(DateTime FECHA_INI, DateTime FECHA_FIN, int ID_UNIDAD);

        [OperationContract]
        List<MatLogisticoModel> ObtenerMaterialesLogisticos(int ID_MAT_LOGISTICO, int ID_UNIDAD);
        [OperationContract]
        List<ExistenciasModel> ObtenerExistenciasMatLogisticos(string ANIO, string MES, int ID_UNIDAD);
    }
}
