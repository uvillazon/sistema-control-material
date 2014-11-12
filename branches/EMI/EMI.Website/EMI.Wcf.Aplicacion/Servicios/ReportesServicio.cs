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
    public class ReportesServicio : IReportesServicio
    {
        private RepositorioDESPACHOS repDes = new RepositorioDESPACHOS();
        private RepositorioITEMS_ARMAMENTO repItem = new RepositorioITEMS_ARMAMENTO();
        private RepositorioUNIDADES repUni = new RepositorioUNIDADES();
        private RepositorioSALIDADES_MUNICIONES repSal = new RepositorioSALIDADES_MUNICIONES();
        private RepositorioDETALLES_PEDIDOS repDetPed = new RepositorioDETALLES_PEDIDOS();
        private RepositorioITEMS_MAT_LOGISTICOS repMatLog = new RepositorioITEMS_MAT_LOGISTICOS();
        public List<ExistenciasModel> ObtenerExistenciasArmamento(string ANIO, string MES, int ID_UNIDAD)
        {
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            DateTime desde = Convert.ToDateTime(date);
            DateTime hasta = desde.AddMonths(1);
            string nota = "";
            //obtener todos los armamentos hasta la fecha desde Existencia anterior
            List<ExistenciasModel> result = new List<ExistenciasModel>();
            var existenciaAnterior = repDes.BuscarTodos(x => x.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD == ID_UNIDAD & x.ITEMS_ARMAMENTO != null && x.ESTADO == "RECEPCIONADO" && x.FECHA < desde).GroupBy(y => new { y.ITEMS_ARMAMENTO.MAT_BELICOS.NOMBRE, y.ITEMS_ARMAMENTO.MAT_BELICOS.ID_MAT_BELICO }).Select(z => new { NOMBRE = z.Key.NOMBRE, ID_ITEM = z.Key.ID_MAT_BELICO, CANTIDAD = z.Sum(y => y.CANTIDAD_ENTREGADA) });
            foreach (var item in existenciaAnterior)
            {
                ExistenciasModel res = new ExistenciasModel();
                var bajas = repItem.BuscarTodos(x => x.ID_MAT_BELICO == item.ID_ITEM && x.FECHA_BAJA < desde && x.ESTADO == "NO OPERABLE").Count();
                var perdidas = repItem.BuscarTodos(x => x.ID_MAT_BELICO == item.ID_ITEM && x.FECHA_BAJA < desde && x.ESTADO == "PERDIDO");

                var perdida = perdidas.Count();
                res.EXISTENCIA_ANTERIOR = item.CANTIDAD - bajas - perdida;
                res.DETALLE = item.NOMBRE;
                res.ID_DETALLE = item.ID_ITEM;
                result.Add(res);
                //vamos a recuperar todos los armamentos en estado baja o perdido apartir de la fecha desde

            }
            var existaneciasActuales = repDes.BuscarTodos(x => x.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD == ID_UNIDAD & x.ITEMS_ARMAMENTO != null && x.ESTADO == "RECEPCIONADO" && x.FECHA > desde && x.FECHA < hasta).GroupBy(y => new { y.ITEMS_ARMAMENTO.MAT_BELICOS.NOMBRE, y.ITEMS_ARMAMENTO.MAT_BELICOS.ID_MAT_BELICO }).Select(z => new { NOMBRE = z.Key.NOMBRE, ID_ITEM = z.Key.ID_MAT_BELICO, CANTIDAD = z.Sum(y => y.CANTIDAD_ENTREGADA) });
            foreach (var item in existaneciasActuales)
            {

                //var altas = existaneciasActuales.Where(x => x.ID_ITEM == item.ID_ITEM);
                if (result.Where(x => x.ID_DETALLE == item.ID_ITEM).Count() > 0)
                {
                    result.Where(x => x.ID_DETALLE == item.ID_ITEM).FirstOrDefault().ALTA = item.CANTIDAD;
                    //item.ALTA = altas.FirstOrDefault().CANTIDAD;
                }
                else
                {
                    ExistenciasModel res = new ExistenciasModel();
                    res.ID_DETALLE = item.ID_ITEM;
                    res.DETALLE = item.NOMBRE;
                    res.EXISTENCIA_ANTERIOR = 0;
                    res.ALTA = item.CANTIDAD;
                    result.Add(res);
                }
            }
            foreach (var item in result)
            {
                var bajas = repItem.BuscarTodos(x => x.ID_MAT_BELICO == item.ID_DETALLE && x.FECHA_BAJA > desde && x.FECHA_BAJA < hasta && x.ESTADO == "NO OPERABLE").Count();
                var perdidas = repItem.BuscarTodos(x => x.ID_MAT_BELICO == item.ID_DETALLE && x.FECHA_BAJA > desde && x.FECHA_BAJA < hasta && x.ESTADO == "PERDIDO");
                foreach (var item1 in perdidas)
                {
                    nota = string.Format("{0} , {1}", nota, item1.OBSERVACION_BAJA);
                }
                item.BAJAS = bajas;
                item.PERDIDAS = perdidas.Count();

            }
            foreach (var item in result)
            {
                item.NOTA = nota;
                item.UNIDAD = repUni.BuscarPorCriterio(x => x.ID_UNIDAD == ID_UNIDAD).DESCRIPCION;
                item.ID_UNIDAD = ID_UNIDAD;
            }
            return result;
        }



        public List<ExistenciasModel> ObtenerExistenciasMuniciones(string ANIO, string MES, int ID_UNIDAD)
        {
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            DateTime desde = Convert.ToDateTime(date);
            DateTime hasta = desde.AddMonths(1);
            string nota = "";
            //obtener todos los armamentos hasta la fecha desde Existencia anterior
            List<ExistenciasModel> result = new List<ExistenciasModel>();
            var existenciaAnterior = repDes.BuscarTodos(x => x.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD == ID_UNIDAD && x.ITEMS_ARMAMENTO == null && x.ITEMS_MAT_LOGISTICOS == null && x.ESTADO == "RECEPCIONADO" && x.FECHA < desde).GroupBy(y => new { y.DETALLES_PEDIDOS.MAT_BELICOS.CALIBRE, y.DETALLES_PEDIDOS.MAT_BELICOS.ID_MAT_BELICO }).Select(z => new { NOMBRE = z.Key.CALIBRE, ID_ITEM = z.Key.ID_MAT_BELICO, CANTIDAD = z.Sum(y => y.CANTIDAD_ENTREGADA) });
            foreach (var item in existenciaAnterior)
            {
                ExistenciasModel res = new ExistenciasModel();
                var bajas = repSal.BuscarTodos(x => x.MUNICIONES_UNIDADES.ID_MAT_BELICO == item.ID_ITEM && x.FECHA < desde).GroupBy(x => x.MUNICIONES_UNIDADES.ID_MAT_BELICO).Select(x => new { ID_DETALLE = x.Key, CANTIDAD = x.Sum(y => y.SALIDA) });
                if (bajas.Count() > 0)
                {
                    res.EXISTENCIA_ANTERIOR = item.CANTIDAD - bajas.FirstOrDefault().CANTIDAD;
                    res.DETALLE = item.NOMBRE;
                    res.ID_DETALLE = item.ID_ITEM;
                    result.Add(res);
                }
                else
                {
                    res.EXISTENCIA_ANTERIOR = item.CANTIDAD;
                    res.DETALLE = item.NOMBRE;
                    res.ID_DETALLE = item.ID_ITEM;
                    result.Add(res);
                }
                //vamos a recuperar todos los armamentos en estado baja o perdido apartir de la fecha desde

            }
            var existaneciasActuales = repDes.BuscarTodos(x => x.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD == ID_UNIDAD & x.ITEMS_ARMAMENTO == null && x.ITEMS_MAT_LOGISTICOS == null && x.ESTADO == "RECEPCIONADO" && x.FECHA > desde && x.FECHA < hasta).GroupBy(y => new { y.DETALLES_PEDIDOS.MAT_BELICOS.CALIBRE, y.DETALLES_PEDIDOS.MAT_BELICOS.ID_MAT_BELICO }).Select(z => new { NOMBRE = z.Key.CALIBRE, ID_ITEM = z.Key.ID_MAT_BELICO, CANTIDAD = z.Sum(y => y.CANTIDAD_ENTREGADA) });
            foreach (var item in existaneciasActuales)
            {

                //var altas = existaneciasActuales.Where(x => x.ID_ITEM == item.ID_ITEM);
                if (result.Where(x => x.ID_DETALLE == item.ID_ITEM).Count() > 0)
                {
                    result.Where(x => x.ID_DETALLE == item.ID_ITEM).FirstOrDefault().ALTA = item.CANTIDAD;
                    //item.ALTA = altas.FirstOrDefault().CANTIDAD;
                }
                else
                {
                    ExistenciasModel res = new ExistenciasModel();
                    res.ID_DETALLE = item.ID_ITEM;
                    res.DETALLE = item.NOMBRE;
                    res.EXISTENCIA_ANTERIOR = 0;
                    res.ALTA = item.CANTIDAD;
                    result.Add(res);
                }
            }
            foreach (var item in result)
            {
                var bajas = repSal.BuscarTodos(x => x.MUNICIONES_UNIDADES.ID_MAT_BELICO == item.ID_DETALLE && x.FECHA > desde && x.FECHA < hasta).GroupBy(x => x.MUNICIONES_UNIDADES.ID_MAT_BELICO).Select(x => new { ID_DETALLE = x.Key, CANTIDAD = x.Sum(y => y.SALIDA) });
                if (bajas.Count() > 0)
                {
                    item.BAJAS = bajas.FirstOrDefault().CANTIDAD;
                }
                else
                {
                    item.BAJAS = 0;
                }
            }
            foreach (var item in result)
            {
                item.NOTA = nota;
                item.UNIDAD = repUni.BuscarPorCriterio(x => x.ID_UNIDAD == ID_UNIDAD).DESCRIPCION;
                item.ID_UNIDAD = ID_UNIDAD;
            }
            return result;
        }


        public List<DetallePedidoModel> ObtenerDetallesPedido(DateTime FECHA_INI, DateTime FECHA_FIN, int ID_UNIDAD)
        {

            FECHA_FIN = FECHA_FIN.AddDays(1);
            var detalles = repDetPed.BuscarTodos(x => x.PEDIDOS.FECHA_PEDIDO >= FECHA_INI && x.PEDIDOS.FECHA_PEDIDO <= FECHA_FIN && x.PEDIDOS.ID_UNIDAD == ID_UNIDAD);
            List<DetallePedidoModel> result = new List<DetallePedidoModel>();
            foreach (var item in detalles)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendFormat("Nro Pedido : {0}", item.PEDIDOS.NRO_PEDIDO);
                sb.AppendLine();
                sb.AppendFormat("Fecha Pedido : {0}", item.PEDIDOS.FECHA_PEDIDO.ToString("dd/MM/yyyy"));
                sb.AppendLine();
                sb.AppendFormat("Observacion : {0}", item.PEDIDOS.OBSERVACIONES);
                sb.AppendLine();
                sb.AppendFormat("Estado Pedido : {0}", item.PEDIDOS.ESTADO);
                DetallePedidoModel det = new DetallePedidoModel()
                {
                    ID_PEDIDO = item.ID_PEDIDO,
                    DETALLE = sb.ToString(),
                    CODIGO = item.MAT_BELICOS == null ? item.MAT_LOGISTICOS == null ? null : item.MAT_LOGISTICOS.CODIGO : item.MAT_BELICOS.CODIGO,
                    UNIDAD = item.PEDIDOS.UNIDADES.UNIDAD,
                    CANTIDAD_SOLICITADA = item.CANTIDAD_SOLICITADA,
                    CANTIDAD_ENTREGADA = item.DESPACHOS.Sum(y => y.CANTIDAD_ENTREGADA),
                    CATEGORIA = item.MAT_BELICOS == null ? item.MAT_LOGISTICOS == null ? null : "MAT_LOGISTICO" : item.MAT_BELICOS.CATEGORIA,
                    ESTADO_DETALLE = EstadoDEtalle(item),
                    ESTADO_RECEPCION = EstadoRepcecion(item),
                    FECHA_INI = FECHA_INI,
                    FECHA_FIN = FECHA_FIN.AddDays(-1),

                };
                result.Add(det);

            }
            return result;
        }
        private string EstadoDEtalle(DETALLES_PEDIDOS det)
        {

            string Estado = "";
            if (det.DESPACHOS.Count() > 0)
            {
                var cantidadEntregada = det.DESPACHOS.Sum(x => x.CANTIDAD_ENTREGADA);
                var cantidadSolicitidad = det.CANTIDAD_SOLICITADA;
                if (cantidadEntregada == cantidadSolicitidad)
                {
                    Estado = "DESPACHO COMPLETO";
                }
                else
                {
                    Estado = "DESPACHO EN CURSO";
                }
            }
            else
            {
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


        public List<MatLogisticoModel> ObtenerMaterialesLogisticos(int ID_MAT_LOGISTICO, int ID_UNIDAD)
        {
            //var detalles = repDetPed.BuscarTodos(x => x.PEDIDOS.FECHA_PEDIDO >= FECHA_INI && x.PEDIDOS.FECHA_PEDIDO <= FECHA_FIN && x.PEDIDOS.ID_UNIDAD == ID_UNIDAD);
            var detalles = repMatLog.BuscarTodos(x => x.ID_UNIDAD == ID_UNIDAD && x.ID_MAT_LOGISTICO == ID_MAT_LOGISTICO);
            List<MatLogisticoModel> result = new List<MatLogisticoModel>();
            foreach (var item in detalles)
            {
                
                MatLogisticoModel det = new MatLogisticoModel()
                {
                   AERONAVE = item.MAT_LOGISTICOS.AERONAVE,
                   CICLO_VIDA = item.MAT_LOGISTICOS.CICLO_VIDA,
                    CODIGO = item.MAT_LOGISTICOS.CODIGO,
                   FABRICANTE = item.MAT_LOGISTICOS.FABRICANTE,
                    TIPO_COMPONENTE = item.MAT_LOGISTICOS.TIPO_COMPONENTE,
                    FECHA_DOTACION = item.MAT_LOGISTICOS.FECHA_DOTACION,
                    GRUPO = item.MAT_LOGISTICOS.GRUPO,
                    NRO_PARTE = item.MAT_LOGISTICOS.NRO_PARTE,
                    HORA_VIDA = item.ITEMS_VERIFICACIONES.Count() == 0 ?  item.MAT_LOGISTICOS.HORA_VIDA : Convert.ToInt32(item.ITEMS_VERIFICACIONES.OrderByDescending(y=>y.ID_VERIFICACION).FirstOrDefault().VALOR_NUEVO),
                    ESTADO = item.ESTADO,
                    NRO_SERIE = item.NRO_SERIE,
                    UNIDAD = item.UNIDADES == null ? null : item.UNIDADES.UNIDAD,
                    ID_ITEM_ = item.ID_ITEM,
                    ID_UNIDAD = item.ID_UNIDAD

                };
                result.Add(det);

            }
            return result;
        }

        public List<ExistenciasModel> ObtenerExistenciasMatLogisticos(string ANIO, string MES, int ID_UNIDAD)
        {
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            DateTime desde = Convert.ToDateTime(date);
            DateTime hasta = desde.AddMonths(1);
            //obtener todos los armamentos hasta la fecha desde Existencia anterior
            List<ExistenciasModel> result = new List<ExistenciasModel>();
            var existenciaAnterior = repDes.BuscarTodos(x => x.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD == ID_UNIDAD & x.ITEMS_MAT_LOGISTICOS != null && x.ESTADO == "RECEPCIONADO" && x.FECHA < desde).GroupBy(y => new {y.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.GRUPO, y.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.CODIGO, y.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.ID_MAT_LOGISTICO }).Select(z => new { GRUPO = z.Key.GRUPO, NOMBRE = z.Key.CODIGO, ID_ITEM = z.Key.ID_MAT_LOGISTICO, CANTIDAD = z.Sum(y => y.CANTIDAD_ENTREGADA) });
            foreach (var item in existenciaAnterior)
            {
                ExistenciasModel res = new ExistenciasModel();
                var bajas = repMatLog.BuscarTodos(x => x.ID_MAT_LOGISTICO == item.ID_ITEM && x.FECHA_BAJA < desde && x.ESTADO == "NO OPERABLE").Count();
                res.GRUPO = item.GRUPO;
                res.EXISTENCIA_ANTERIOR = item.CANTIDAD - bajas;
                res.DETALLE = item.NOMBRE;
                res.ID_DETALLE = item.ID_ITEM;
                result.Add(res);
                //vamos a recuperar todos los armamentos en estado baja o perdido apartir de la fecha desde

            }
            var existaneciasActuales = repDes.BuscarTodos(x => x.DETALLES_PEDIDOS.PEDIDOS.ID_UNIDAD == ID_UNIDAD & x.ITEMS_MAT_LOGISTICOS != null && x.ESTADO == "RECEPCIONADO" && x.FECHA > desde && x.FECHA < hasta).GroupBy(y => new {y.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.GRUPO, y.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.CODIGO, y.ITEMS_MAT_LOGISTICOS.MAT_LOGISTICOS.ID_MAT_LOGISTICO }).Select(z => new { GRUPO = z.Key.GRUPO, NOMBRE = z.Key.CODIGO, ID_ITEM = z.Key.ID_MAT_LOGISTICO, CANTIDAD = z.Sum(y => y.CANTIDAD_ENTREGADA) });
            foreach (var item in existaneciasActuales)
            {

                //var altas = existaneciasActuales.Where(x => x.ID_ITEM == item.ID_ITEM);
                if (result.Where(x => x.ID_DETALLE == item.ID_ITEM).Count() > 0)
                {
                    result.Where(x => x.ID_DETALLE == item.ID_ITEM).FirstOrDefault().ALTA = item.CANTIDAD;
                    //item.ALTA = altas.FirstOrDefault().CANTIDAD;
                }
                else
                {
                    ExistenciasModel res = new ExistenciasModel();
                    res.ID_DETALLE = item.ID_ITEM;
                    res.DETALLE = item.NOMBRE;
                    res.GRUPO = item.GRUPO;
                    res.EXISTENCIA_ANTERIOR = 0;
                    res.ALTA = item.CANTIDAD;
                    result.Add(res);
                }
            }
            foreach (var item in result)
            {
                var bajas = repMatLog.BuscarTodos(x => x.ID_MAT_LOGISTICO == item.ID_DETALLE && x.FECHA_BAJA > desde && x.FECHA_BAJA < hasta && x.ESTADO == "NO OPERABLE").Count();
               
                item.BAJAS = bajas;

            }
            return result;
        }
    }
}
