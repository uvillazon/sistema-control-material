using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Aplicacion.Servicios;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Reportes" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Reportes.svc o Reportes.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Reportes : IReportes
    {
        ReportesServicio serRep = new ReportesServicio();
        public List<ExistenciasModel> ObtenerExistenciasArmamento(string ANIO, string MES, int ID_UNIDAD)
        {
            List<ExistenciasModel> result = new List<ExistenciasModel>();
            result = serRep.ObtenerExistenciasArmamento(ANIO, MES, ID_UNIDAD);
            return result;
        }


        public List<ExistenciasModel> ObtenerExistenciasMuniciones(string ANIO, string MES, int ID_UNIDAD)
        {
            List<ExistenciasModel> result = new List<ExistenciasModel>();
            result = serRep.ObtenerExistenciasMuniciones(ANIO, MES, ID_UNIDAD);
            return result;
        }


        public List<DetallePedidoModel> ObtenerDetallePedido(DateTime FECHA_INI, DateTime FECHA_FIN, int ID_UNIDAD)
        {
            List<DetallePedidoModel> result = new List<DetallePedidoModel>();
            result = serRep.ObtenerDetallesPedido(FECHA_INI,FECHA_FIN, ID_UNIDAD);
            return result;
        }


        public List<MatLogisticoModel> ObtenerMaterialesLogisticos(int ID_MAT_LOGISTICO, int ID_UNIDAD)
        {
            List<MatLogisticoModel> result = new List<MatLogisticoModel>();
            result = serRep.ObtenerMaterialesLogisticos(ID_MAT_LOGISTICO,ID_UNIDAD);
            return result;
        }

        public List<ExistenciasModel> ObtenerExistenciasMatLogisticos(string ANIO, string MES, int ID_UNIDAD)
        {
            List<ExistenciasModel> result = new List<ExistenciasModel>();
            result = serRep.ObtenerExistenciasMatLogisticos(ANIO, MES, ID_UNIDAD);
            return result;
        }
    }
}
