using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Interfaces;
using System.Linq.Dynamic;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Infraestructura.Repositorios;
using EMI.Wcf.Model;
using LinqKit;
using Newtonsoft.Json;
namespace EMI.Wcf.Aplicacion.Servicios
{
    public class PedidosServicio : IPedidosServicio
    {
        private RepositorioPEDIDOS repPed = new RepositorioPEDIDOS();
        private RepositorioDETALLES_PEDIDOS repDetPed = new RepositorioDETALLES_PEDIDOS();
        private RepositorioDESPACHOS repDesp = new RepositorioDESPACHOS();
        private RepositorioMOV_MAT_BELICOS repMov = new RepositorioMOV_MAT_BELICOS();
        private RepositorioHISTORICOS_PEDIDOS repHis = new RepositorioHISTORICOS_PEDIDOS();
        private RepositorioMUNICIONES_UNIDADES repMunUni = new RepositorioMUNICIONES_UNIDADES();
        private RepositorioMOV_MUNICIONES_UNIDADES repMovMunUni = new RepositorioMOV_MUNICIONES_UNIDADES();
        private RepositorioITEMS_ARMAMENTO repItemArm = new RepositorioITEMS_ARMAMENTO();
        private RepositorioITEMS_MAT_LOGISTICOS repItemLog = new RepositorioITEMS_MAT_LOGISTICOS();

        public IQueryable<PEDIDOS> ObtenerPedidosPaginados(Paginacion paginacion, FiltrosModel<PedidoModel> filtros)
        {
            IQueryable<PEDIDOS> result = null;
            result = repPed.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            if (filtros.Contiene != null)
            {
                result = result.AsExpandable().Where(PEDIDOS.Contiene(filtros.Contiene));
            }
            paginacion.total = result.Count();
            result = repPed.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }

        public IQueryable<DETALLES_PEDIDOS> ObtenerDetallePedidoPaginado(Paginacion paginacion, FiltrosModel<PedidoModel> filtros)
        {
            IQueryable<DETALLES_PEDIDOS> result = null;
            result = repDetPed.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            if (filtros.Contiene != null)
            {
                result = result.AsExpandable().Where(DETALLES_PEDIDOS.Contiene(filtros.Contiene));
            }
            if (filtros.Estados != null)
            {
                result = result.AsExpandable().Where(DETALLES_PEDIDOS.ElEstadoContiene(filtros.Estados));
                //result = result.Where(x => x.PEDIDOS.ESTADO == filtros.Estados);
            }
            if (filtros.Unidades != null) {
                result = result.AsExpandable().Where(DETALLES_PEDIDOS.EnUnidad(filtros.Unidades));
            }
            paginacion.total = result.Count();
            result = repDetPed.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }

        public RespuestaServicio GuardarPedido(PEDIDOS ped, string detalles, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            if (ped.ID_PEDIDO == 0)
            {
                resp = repPed.GuardarPedido(ped, usuario);
            }
            else
            {
                resp = repPed.EditarPedido(ped, usuario);
            }
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                ped.ID_PEDIDO = id;
                repHis.GuardarHistoricoPedido(id, "NUEVO", usuario, ped.FECHA_PEDIDO, "Creacion de Pedido");
                resp = repDetPed.GuardarDetallePedido(detalles, ped);
                if (resp == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = resp;
                }
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }
        //para municiones
        public RespuestaServicio GuardarDespacho(DESPACHOS des, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            resp = repDesp.GuardarDespacho(des, usuario);


            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                var despacho = repDesp.BuscarPorCriterio(x => x.ID_DESPACHO == id);
                int? idMatBelico = despacho.DETALLES_PEDIDOS.ID_MAT_BELICO;
                var mov = new MOV_MAT_BELICOS()
                {
                    ID_OPERACION = id,
                    FECHA = des.FECHA,
                    OPERACION = "DESPACHO ALMACEN",
                    ID_MAT_BELICO = (int)idMatBelico,
                    SALIDA = des.CANTIDAD_ENTREGADA,
                };
                repMov.GuardarMovimiento(mov, usuario);
                repHis.GuardarHistoricoPedido(despacho.DETALLES_PEDIDOS.ID_PEDIDO, "DESPACHADO", usuario, despacho.FECHA, string.Format("Material : {0} Cantidad Despachada : {1}", despacho.DETALLES_PEDIDOS.MAT_BELICOS.CODIGO, despacho.CANTIDAD_ENTREGADA));
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                result.id = id;

            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }

        public RespuestaServicio AutorizarPedido(PEDIDOS ped, string Observacion, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            if (ped.ID_PEDIDO == 0)
            {
                resp = "No Existe Ese Pedido";
            }
            else
            {
                resp = repPed.AutorizarPedido(ped, usuario, Observacion);
            }
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                repHis.GuardarHistoricoPedido(id, ped.ESTADO, usuario, DateTime.Now.Date, Observacion);
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                result.id = id;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }



        public IQueryable<DESPACHOS> ObtenerDespachosPaginado(Paginacion paginacion, FiltrosModel<PedidoModel> filtros)
        {
            IQueryable<DESPACHOS> result = null;
            result = repDesp.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            paginacion.total = result.Count();
            result = repDesp.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }



        public RespuestaServicio GuardarDespachoDetalle(string detalle, string usuario, DateTime FECHA)
        {
            var result = new RespuestaServicio();
            string resp = "";
            resp = repDesp.GuardarDetalleDespacho(detalle, FECHA, usuario);
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {

                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                result.id = id;
                var despacho = repDesp.BuscarTodos(x => x.ID_DESPACHO == id).FirstOrDefault();
                string material = despacho.DETALLES_PEDIDOS.MAT_BELICOS == null ? despacho.DETALLES_PEDIDOS.MAT_LOGISTICOS == null ? null : despacho.DETALLES_PEDIDOS.MAT_LOGISTICOS.CODIGO : despacho.DETALLES_PEDIDOS.MAT_BELICOS.CODIGO;
                repHis.GuardarHistoricoPedido(despacho.DETALLES_PEDIDOS.ID_PEDIDO, "DESPACHADO", usuario, despacho.FECHA, string.Format("Material : {0} Cantidad Despachada : {1}", material, despacho.CANTIDAD_ENTREGADA));
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }


        public RespuestaServicio GuardarRecepcionDespachoMuniciones(int ID_DESPACHO, string usuario)
        {

            var result = new RespuestaServicio();
            string resp = "";
            resp = repDesp.GuardarRepcecion(ID_DESPACHO, usuario);
            int id;
            int idMun;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                var despacho = repDesp.BuscarPorCriterio(x => x.ID_DESPACHO == ID_DESPACHO);
                if (repMunUni.BuscarTodos(x => x.ID_MAT_BELICO == (int)despacho.DETALLES_PEDIDOS.ID_MAT_BELICO && x.ID_UNIDAD == despacho.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD).Count() == 0)
                {
                    var mun = new MUNICIONES_UNIDADES()
                    {
                        ID_MAT_BELICO = (int)despacho.DETALLES_PEDIDOS.ID_MAT_BELICO,
                        ID_UNIDAD = despacho.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD
                    };
                    resp = repMunUni.GuardarMunicion(mun, usuario);

                    esNumero = int.TryParse(resp, out idMun);

                }
                else
                {
                    idMun = repMunUni.BuscarPorCriterio(x => x.ID_MAT_BELICO == (int)despacho.DETALLES_PEDIDOS.ID_MAT_BELICO && x.ID_UNIDAD == despacho.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD).ID_MUNICION_UNIDAD;
                }
                var mov = new MOV_MUNICIONES_UNIDADES()
                {
                    ID_MUNICION_UNIDAD = idMun,
                    FECHA = DateTime.Now.Date,
                    OPERACION = "Recepcion de Municiones",
                    ENTRADA = despacho.CANTIDAD_ENTREGADA,
                    ID_OPERACION = despacho.ID_DESPACHO
                };
                repMovMunUni.GuardarMovimiento(mov, usuario);

                //repMunUni.GuardarMunicion(
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                result.id = id;
                repPed.ActualizarPedidoCompletado(despacho.DETALLES_PEDIDOS.ID_PEDIDO);
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }

        public RespuestaServicio GuardarRecepcionDespachoArmamento(int ID_DESPACHO, string usuario)
        {

            var result = new RespuestaServicio();
            string resp = "";
            resp = repDesp.GuardarRepcecion(ID_DESPACHO, usuario);
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                var despacho = repDesp.BuscarPorCriterio(x => x.ID_DESPACHO == ID_DESPACHO);
                if (despacho.ITEMS_ARMAMENTO != null)
                {
                    var item = despacho.ITEMS_ARMAMENTO;
                    item.ID_UNIDAD = despacho.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD;
                    repItemArm.EditarItemArmamento(item, usuario);
                }
                if (despacho.ITEMS_MAT_LOGISTICOS != null)
                {
                    var item = despacho.ITEMS_MAT_LOGISTICOS;
                    item.ID_UNIDAD = despacho.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD;
                    repItemLog.EditarItemMatLogistico(item, usuario);
                }
                //repMunUni.GuardarMunicion(
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                result.id = id;
                repPed.ActualizarPedidoCompletado(despacho.DETALLES_PEDIDOS.ID_PEDIDO);

            }
            else
            {
                result.success = false;
                result.msg = resp;
            }
            return result;
        }


        public IQueryable<DESPACHOS> ObtenerDespachos(System.Linq.Expressions.Expression<Func<DESPACHOS, bool>> criterios)
        {
            IQueryable<DESPACHOS> result = null;
            result = repDesp.BuscarTodos();
            return result;
        }
    }
}
