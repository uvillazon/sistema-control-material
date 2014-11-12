using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Aplicacion.Servicios;
using EMI.Wcf.Model;
using EMI.Wcf.Servicio.Models;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Pedidos" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Pedidos.svc o Pedidos.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Pedidos : IPedidos
    {

        PedidosServicio serPed = new PedidosServicio();
        public ListasServicio<PedidoModelResp> ObtenerPedidosPaginados(Paginacion paginacion, FiltrosModel<PedidoModel> filtros)
        {
            ListasServicio<PedidoModelResp> result = new ListasServicio<PedidoModelResp>();
            try
            {
                IEnumerable<PEDIDOS> pedidos = serPed.ObtenerPedidosPaginados(paginacion, filtros);
                List<PedidoModelResp> datos = new List<PedidoModelResp>();
                datos = pedidos.Select(x => new PedidoModelResp()
                {
                    ID_PEDIDO = x.ID_PEDIDO,
                    NRO_PEDIDO = x.NRO_PEDIDO,
                    TIPO = x.TIPO,
                    UNIDAD = x.UNIDADES.UNIDAD,
                    FECHA_PEDIDO = x.FECHA_PEDIDO,
                    FECHA_MODIF = x.FECHA_MODIF,
                    OBSERVACIONES = x.OBSERVACIONES,
                    ESTADO = x.ESTADO
                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }

        public ListasServicio<PedidoModelResp> ObtenerDetallesPedidosPaginados(Paginacion paginacion, FiltrosModel<PedidoModel> filtros)
        {
            ListasServicio<PedidoModelResp> result = new ListasServicio<PedidoModelResp>();
            try
            {
                IEnumerable<DETALLES_PEDIDOS> pedidos = serPed.ObtenerDetallePedidoPaginado(paginacion, filtros);
                List<PedidoModelResp> datos = new List<PedidoModelResp>();
                datos = pedidos.Select(x => new PedidoModelResp()
                {
                    NRO_PEDIDO = x.PEDIDOS.NRO_PEDIDO,
                    TIPO = x.PEDIDOS.TIPO,
                    ID_DETALLE = x.ID_DETALLE,
                    ID_PEDIDO = x.ID_PEDIDO,
                    ID_MAT_BELICO = x.ID_MAT_BELICO,
                    ID_MAT_LOGISTICO = x.ID_MAT_LOGISTICO,
                    CANTIDAD_SOLICITADA = x.CANTIDAD_SOLICITADA,
                    CANTIDAD_ENTREGADA = x.DESPACHOS.Sum(y=>y.CANTIDAD_ENTREGADA),
                    FECHA_PEDIDO = x.PEDIDOS.FECHA_PEDIDO,
                    FECHA_MODIF = x.PEDIDOS.FECHA_MODIF,
                    OBSERVACIONES = x.PEDIDOS.OBSERVACIONES,
                    UNIDAD = x.PEDIDOS.UNIDADES.UNIDAD,
                    CATEGORIA = x.MAT_BELICOS == null ? x.MAT_LOGISTICOS == null ? null : "MAT_LOGISTICO" : x.MAT_BELICOS.CATEGORIA,
                    CODIGO = x.MAT_BELICOS == null ? x.MAT_LOGISTICOS == null ? null : x.MAT_LOGISTICOS.CODIGO : x.MAT_BELICOS.CODIGO,
                    ESTADO = x.PEDIDOS.ESTADO,
                    ESTADO_DETALLE = EstadoDEtalle(x),
                    ESTADO_RECEPCION = EstadoRepcecion(x),
                    CANTIDAD_EXISTENTE = ObtenerCantidad(x)
                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }
        private string EstadoDEtalle(DETALLES_PEDIDOS det){

            string Estado = "";
            if (det.DESPACHOS.Count() > 0)
            {
                var cantidadEntregada = det.DESPACHOS.Sum(x=>x.CANTIDAD_ENTREGADA);
                var cantidadSolicitidad = det.CANTIDAD_SOLICITADA;
                if (cantidadEntregada == cantidadSolicitidad)
                {
                    Estado = "DESPACHO COMPLETO";
                }
                else {
                    Estado = "DESPACHO EN CURSO";
                }
            }
            else {
                Estado = "NUEVO";
            }
            return Estado;
        }
        private string EstadoRepcecion(DETALLES_PEDIDOS det)
        {

            string Estado = "";
            if (det.DESPACHOS.Where(x => x.ESTADO == "RECEPCIONADO").Count() > 0)
            {
                var cantidadRecepcionda = det.DESPACHOS.Where(x => x.ESTADO == "RECEPCIONADO").Sum(x => x.CANTIDAD_ENTREGADA);
                var cantidadSolicitidad = det.CANTIDAD_SOLICITADA;
                if (cantidadRecepcionda == cantidadSolicitidad)
                {
                    Estado = "RECEPCION COMPLETA";
                }
                else
                {
                    Estado = "RECEPCION EN CURSO";
                }
            }
            else
            {
                Estado = "SIN RECEPCIONAR";
            }
            return Estado;
        }
        private int ObtenerCantidad(DETALLES_PEDIDOS x)
        {
            int cantidad = 0;
            if (x.MAT_BELICOS != null) {
                if (x.MAT_BELICOS.CATEGORIA == "ARMAMENTO")
                {
                    cantidad = x.MAT_BELICOS.ITEMS_ARMAMENTO.Where(y => y.UNIDADES == null).Count();
                }
                else {
                    cantidad = (int)x.MAT_BELICOS.CANTIDAD_DISPONIBLE;
                }
            }
            else if (x.MAT_LOGISTICOS != null)
            {
                cantidad = x.MAT_LOGISTICOS.ITEMS_MAT_LOGISTICOS.Where(y => y.UNIDADES == null).Count();
            }
            else {
                cantidad = 0;
            }
            return cantidad;
        }

        public RespuestaServicio GuardarPedido(PEDIDOS ped, string detalles, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = serPed.GuardarPedido(ped, detalles, usuario);
            return result;
        }


        public RespuestaServicio AutorizarPedido(PEDIDOS ped, string Observacion, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = serPed.AutorizarPedido(ped, Observacion, usuario);
            return result;
        }


        public RespuestaServicio GuardarDespacho(DESPACHOS des, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = serPed.GuardarDespacho(des, usuario);
            return result;
        }

        public ListasServicio<DespachoModelResp> ObtenerDespachosPaginados(Paginacion paginacion, FiltrosModel<PedidoModel> filtros)
        {
            ListasServicio<DespachoModelResp> result = new ListasServicio<DespachoModelResp>();
            try
            {
                IEnumerable<DESPACHOS> pedidos = serPed.ObtenerDespachosPaginado(paginacion, filtros);
                List<DespachoModelResp> datos = new List<DespachoModelResp>();
                datos = pedidos.Select(x => new DespachoModelResp()
                {
                    NRO_PEDIDO = x.DETALLES_PEDIDOS.PEDIDOS.NRO_PEDIDO,
                    ID_DETALLE = x.ID_DETALLE,
                    ID_ITEM_ARMAMENTO = x.ID_ITEM_ARMAMENTO,
                    ID_ITEM_LOGISTICO = x.ID_ITEM_LOGISTICO,
                    ID_DESPACHO = x.ID_DESPACHO,
                    ID_PEDIDO = x.DETALLES_PEDIDOS.ID_PEDIDO,
                    CANTIDAD_ENTREGADA = x.CANTIDAD_ENTREGADA,
                    FECHA = x.FECHA,
                    LOGIN = x.LOGIN,
                    ESTADO = x.ESTADO,
                    CODIGO = x.ITEMS_ARMAMENTO == null ? x.ITEMS_MAT_LOGISTICOS == null ? x.DETALLES_PEDIDOS.MAT_BELICOS.CODIGO : string.Format("{0} - Nro Serie :{1}",x.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.CODIGO , x.ITEMS_MAT_LOGISTICOS.NRO_SERIE)  : string.Format("{0} - Nro Fusil :{1}",x.ITEMS_ARMAMENTO.MAT_BELICOS.CODIGO,x.ITEMS_ARMAMENTO.NRO_FUSIL)
                    //CODIGO = x.DETALLES_PEDIDOS.MAT_BELICOS == null ? x.DETALLES_PEDIDOS.MAT_LOGISTICOS == null ? null : x.DETALLES_PEDIDOS.MAT_LOGISTICOS.CODIGO : x.DETALLES_PEDIDOS.MAT_BELICOS.CODIGO,
                    
                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public RespuestaServicio GuardarDetalleDespacho(string detalles, DateTime FECHA, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = serPed.GuardarDespachoDetalle(detalles,usuario,FECHA);
            return result;
        }


        public RespuestaServicio GuardarRecepcionDespachoMuniciones(int ID_DESPACHO, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = serPed.GuardarRecepcionDespachoMuniciones(ID_DESPACHO, usuario);
            return result;
        }
        public RespuestaServicio GuardarRecepcionDespachoArmamento(int ID_DESPACHO, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = serPed.GuardarRecepcionDespachoArmamento(ID_DESPACHO, usuario);
            return result;
        }

        
    }
}
