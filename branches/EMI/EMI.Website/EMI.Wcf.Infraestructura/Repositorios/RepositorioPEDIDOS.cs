using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioPEDIDOS : RepositorioBase<PEDIDOS>
    {
        public RepositorioPEDIDOS() : base() { }
        public string GuardarPedido(PEDIDOS ped, string login)
        {
            ped.ID_PEDIDO = ObtenerId();
            ped.NRO_PEDIDO = ped.ID_PEDIDO;
            ped.LOGIN = login;
            ped.FECHA_REG = DateTime.Now;
            ped.ESTADO = "NUEVO";
            try
            {
                Crear(ped);
                GuardarCambios();
                GuardarHistorico(ped, "CREACION", ped.ID_PEDIDO, login);
                return ped.ID_PEDIDO.ToString();
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }


        public string EditarPedido(PEDIDOS ped, string login)
        {
            try
            {
                var itemEditar = BuscarPorCriterio(x => x.ID_PEDIDO == ped.ID_PEDIDO);
                if (itemEditar.ESTADO == "NUEVO")
                {
                    itemEditar.TIPO = ped.TIPO;
                    itemEditar.OBSERVACIONES = ped.OBSERVACIONES;
                    itemEditar.FECHA_MODIF = DateTime.Now;
                    itemEditar.FECHA_PEDIDO = ped.FECHA_PEDIDO;
                    GuardarCambios();
                    GuardarHistorico(ped, "EDICION", ped.ID_PEDIDO, login);
                    return itemEditar.ID_PEDIDO.ToString();
                }
                else
                {
                    return string.Format("El Pedido Nro {0} : esta en Estado : {1}. solo los Pedidos en Estado NUEVO pueden ser Editados", itemEditar.NRO_PEDIDO, itemEditar.ESTADO);
                }
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string AutorizarPedido(PEDIDOS ped, string login, string Observacion)
        {
            try
            {
                var itemEditar = BuscarPorCriterio(x => x.ID_PEDIDO == ped.ID_PEDIDO);
                if (itemEditar.ESTADO == "NUEVO")
                {
                    itemEditar.ESTADO = ped.ESTADO;
                    itemEditar.OBSERVACIONES = string.Format("{0} , Cambio Estado : {1}", itemEditar.OBSERVACIONES, Observacion);
                    GuardarCambios();
                    return itemEditar.ID_PEDIDO.ToString();
                }
                else
                {
                    return string.Format("El Pedido Nro {0} : esta en Estado : {1}. solo los Pedidos en Estado NUEVO pueden ser Autorizados", itemEditar.NRO_PEDIDO, itemEditar.ESTADO);
                }
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string ActualizarPedidoCompletado(int ID_PEDIDO)
        {

            var pedido = BuscarPorCriterio(x => x.ID_PEDIDO == ID_PEDIDO);
            bool ban = true;
            if (pedido != null)
            {
                foreach (var item in pedido.DETALLES_PEDIDOS)
                {
                    int despachado = item.DESPACHOS.Where(x => x.ESTADO == "RECEPCIONADO").Sum(y => y.CANTIDAD_ENTREGADA);
                    if (item.CANTIDAD_SOLICITADA != despachado)
                    {
                        ban = false;
                        break;
                    }


                }
                if (ban)
                {
                    pedido.ESTADO = "COMPLETADO";
                    GuardarCambios();

                }
                return "1";
            }
            else
            {
                return "No Existe Pedido.";
            }

        }
    }
}
