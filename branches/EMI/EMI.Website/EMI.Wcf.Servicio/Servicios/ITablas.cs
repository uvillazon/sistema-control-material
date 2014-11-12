using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Model;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "ITablas" en el código y en el archivo de configuración a la vez.
   // [ServiceContract]
    [ServiceContract(Namespace = "http://localhost:17877/Servicios/Tablas.svc")]
    public interface ITablas
    {
        //[OperationContract]
        //IQueryable<TABLAS> ObtenerTablas();

        //[OperationContract]
        //IQueryable<TABLAS> ObtenerTablasJson();
    }
}
