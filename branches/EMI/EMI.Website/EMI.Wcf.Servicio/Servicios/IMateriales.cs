using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;
using EMI.Wcf.Servicio.Models;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IMateriales" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IMateriales
    {
        [OperationContract]
        RespuestaServicio GuardarMaterial(MATERIALES_BELICOS mat, string usuario);

        [OperationContract]
        RespuestaServicio EliminarMaterial(int ID, string usuario);

        [OperationContract]
        ListasServicio<MaterialesModel> ObtenerMaterialesPaginados(Paginacion paginacion);

        [OperationContract]
        MATERIALES_BELICOS ObtenerMaterialBelico(int ID);

    }
}
