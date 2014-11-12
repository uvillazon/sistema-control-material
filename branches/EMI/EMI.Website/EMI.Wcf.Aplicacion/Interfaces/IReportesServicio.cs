using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IReportesServicio
    {

        List<ExistenciasModel> ObtenerExistenciasArmamento(string ANIO, string MES, int ID_UNIDAD);
        List<ExistenciasModel> ObtenerExistenciasMuniciones(string ANIO, string MES, int ID_UNIDAD);

        List<DetallePedidoModel> ObtenerDetallesPedido(DateTime FECHA_INI,DateTime FECHA_FIN, int ID_UNIDAD);
        List<MatLogisticoModel> ObtenerMaterialesLogisticos(int ID_MAT_LOGISTICO, int ID_UNIDAD);

        List<ExistenciasModel> ObtenerExistenciasMatLogisticos(string ANIO, string MES, int ID_UNIDAD);
        

        
      
    }
}
