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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IUnidades" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IUnidades
    {
        [OperationContract]
        UnidadModelResp ObtenerUnidadPorId(int ID_UNIDAD);

        [OperationContract]

        ListasServicio<UnidadModelResp> ObtenerUnidadesPaginados(Paginacion paginacion);
    }
}
