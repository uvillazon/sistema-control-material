using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IListas" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IListas
    {
        [OperationContract]
        ListasServicio<ListasItemsModel> ObtenerListasItems(Paginacion paginacion, FiltrosModel<ListasItemsModel> filtros);

        [OperationContract]
        ListasServicio<ListasModel> ObtenerListas(Paginacion paginacion, FiltrosModel<ListasModel> filtros);

        [OperationContract]
        ListasServicio<ListasModel> ObtenerTodasListas();

        [OperationContract]
        RespuestaServicio GuardarLista(Model.LISTAS1 lista, string usuario);

        [OperationContract]
        RespuestaServicio GuardarItemLista(Model.LISTAS_ITEMS lista, string usuario);
    }
}
