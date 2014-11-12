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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IPedidos" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IPedidos
    {
        [OperationContract]
        ListasServicio<PedidoModelResp> ObtenerPedidosPaginados(Paginacion paginacion, FiltrosModel<PedidoModel> filtros);

        [OperationContract]
        ListasServicio<PedidoModelResp> ObtenerDetallesPedidosPaginados(Paginacion paginacion, FiltrosModel<PedidoModel> filtros);

        [OperationContract]
        ListasServicio<DespachoModelResp> ObtenerDespachosPaginados(Paginacion paginacion, FiltrosModel<PedidoModel> filtros);

        [OperationContract]
        RespuestaServicio GuardarPedido(PEDIDOS ped, string detalles, string usuario);

        [OperationContract]
        RespuestaServicio AutorizarPedido(PEDIDOS ped, string Observacion, string usuario);

        [OperationContract]
        RespuestaServicio GuardarDespacho(DESPACHOS des, string usuario);

        [OperationContract]
        RespuestaServicio GuardarDetalleDespacho(string detalles,DateTime FECHA, string usuario);

        [OperationContract]
        RespuestaServicio GuardarRecepcionDespachoMuniciones(int ID_DESPACHO, string usuario);

        [OperationContract]
        RespuestaServicio GuardarRecepcionDespachoArmamento(int ID_DESPACHO, string usuario);
    }
}
