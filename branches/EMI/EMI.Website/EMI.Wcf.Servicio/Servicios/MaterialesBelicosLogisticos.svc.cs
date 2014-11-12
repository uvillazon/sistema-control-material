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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "MaterialesBelicosLogisticos" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione MaterialesBelicosLogisticos.svc o MaterialesBelicosLogisticos.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class MaterialesBelicosLogisticos : IMaterialesBelicosLogisticos
    {
        MaterialesBelicosServicio aplMat = new MaterialesBelicosServicio();
        KardexServicio serKar = new KardexServicio();

        public ListasServicio<ArmamentoModelResp> ObtenerMaterialesPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros,bool almacen)
        {
            //crear instancia de la respuesta
            ListasServicio<ArmamentoModelResp> result = new ListasServicio<ArmamentoModelResp>();
            try
            {
                //obtener todos los materiales
                //filtros.Entidad = Entidad;
                IEnumerable<ITEMS_ARMAMENTO> materiales = aplMat.ObtenerArmamentoPaginados(paginacion, filtros,almacen);
                //crear instancia
                List<ArmamentoModelResp> datos = new List<ArmamentoModelResp>();
                datos = materiales.Select(x => new ArmamentoModelResp()
                {
                    ID_ITEM = x.ID_ITEM,
                    ID_MAT_BELICO = x.ID_MAT_BELICO,
                    CODIGO = x.MAT_BELICOS.CODIGO,
                    UNIDAD = x.UNIDADES == null ? null : x.UNIDADES.UNIDAD,
                    NOMBRE = x.MAT_BELICOS.NOMBRE,
                    NRO_FUSIL = x.NRO_FUSIL,
                    FABRICACION = x.MAT_BELICOS.FABRICACION,
                    CALIBRE = x.MAT_BELICOS.CALIBRE,
                    TIPO = x.MAT_BELICOS.TIPO,
                    CANTIDAD_DISPONIBLE = 1,
                    FECHA_DOTACION = x.MAT_BELICOS.FECHA_DOTACION,
                    ESTADO = x.ESTADO,
                    OBSERVACION = x.DESPACHOS.Count()> 0 ? x.DESPACHOS.FirstOrDefault().ESTADO == "DESPACHADO" ? "ITEM DESPACHADO. FALTA RECEPCIONAR ": x.MAT_BELICOS.OBSERVACION : x.MAT_BELICOS.OBSERVACION,

                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public ListasServicio<MatBelicoModelResp> ObtenerMatBelicosPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros)
        {
            ListasServicio<MatBelicoModelResp> result = new ListasServicio<MatBelicoModelResp>();
            try
            {
                IEnumerable<MAT_BELICOS> materiales = aplMat.ObtenerMaterialesBelicosPaginados(paginacion, filtros);
                //crear instancia
                List<MatBelicoModelResp> datos = new List<MatBelicoModelResp>();
                datos = materiales.Select(x => new MatBelicoModelResp()
                {
                    ID_MAT_BELICO = x.ID_MAT_BELICO,

                    CODIGO = x.CODIGO,
                    //UNIDAD = x.UNIDADES == null ? null : x.UNIDADES.UNIDAD,
                    NOMBRE = x.NOMBRE,
                    FABRICACION = x.FABRICACION,
                    CATEGORIA = x.CATEGORIA,
                    CALIBRE = x.CALIBRE,
                    TIPO = x.TIPO,
                    CANTIDAD_DISPONIBLE = x.CATEGORIA == "ARMAMENTO" ?  x.ITEMS_ARMAMENTO.Where(y => y.UNIDADES == null).Count() : (int)x.CANTIDAD_DISPONIBLE,
                    FECHA_DOTACION = x.FECHA_DOTACION,
                    OBSERVACION = x.OBSERVACION

                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }

        public RespuestaServicio GuardarModeloArmamento(Model.MAT_BELICOS mat, string detalles, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.GuardarModeloArmamento(mat, detalles, usuario);
            return result;
        }


        public ListasServicio<ParteArmamentoModelResp> ObtenerPartesArmamentos(FiltrosModel<ArmamentoModel> filtros)
        {
            //crear instancia de la respuesta
            ListasServicio<ParteArmamentoModelResp> result = new ListasServicio<ParteArmamentoModelResp>();
            try
            {
                //obtener todos los materiales
                //filtros.Entidad = Entidad;
                IEnumerable<PARTES_MAT_BELICOS> materiales = aplMat.ObtenerPartesArmamento(filtros);
                //crear instancia
                List<ParteArmamentoModelResp> datos = new List<ParteArmamentoModelResp>();
                datos = materiales.Select(x => new ParteArmamentoModelResp()
                {
                    ID_PARTE = x.ID_PARTE,
                    ID_MAT_BELICO = x.ID_MAT_BELICO,
                    NOMBRE = x.NOMBRE,
                    DESCRIPCION = x.DESCRIPCION

                }).ToList();
                result.total = datos.Count();
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public RespuestaServicio GuardarItemArmamento(ITEMS_ARMAMENTO item, string detalles, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.GuardarItemArmamento(item, detalles, usuario);
            return result;
        }


        public ListasServicio<ParteArmamentoModelResp> ObtenerCmpArmamentos(FiltrosModel<ArmamentoModel> filtros)
        {
            //crear instancia de la respuesta
            ListasServicio<ParteArmamentoModelResp> result = new ListasServicio<ParteArmamentoModelResp>();
            try
            {
                IEnumerable<COMPONENTES_ITEMS> materiales = aplMat.ObtenerCmpArmamentos(filtros);
                List<ParteArmamentoModelResp> datos = new List<ParteArmamentoModelResp>();
                datos = materiales.Select(x => new ParteArmamentoModelResp()
                {
                    ID_ITEM = x.ID_ITEM,
                    ID_PARTE = x.ID_CMP,
                    NOMBRE = x.NOMBRE,
                    CODIGO = x.CODIGO,
                    ARMAMENTO = x.ITEMS_ARMAMENTO.MAT_BELICOS.CODIGO

                }).ToList();
                result.total = datos.Count();
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


        public RespuestaServicio GuardarMuniciones(MAT_BELICOS mat, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.GuardarMuniciones(mat, usuario);
            return result;
        }


        public ListasServicio<MatLogisticoModelResp> ObtenerMatLogisticosPaginagos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros)
        {
            ListasServicio<MatLogisticoModelResp> result = new ListasServicio<MatLogisticoModelResp>();
            try
            {
                IEnumerable<MAT_LOGISTICOS> materiales = aplMat.ObtenerMatLogisticos(paginacion, filtros);
                //crear instancia
                List<MatLogisticoModelResp> datos = new List<MatLogisticoModelResp>();
                datos = materiales.Select(x => new MatLogisticoModelResp()
                {
                    ID_MAT_LOGISTICO = x.ID_MAT_LOGISTICO,
                    CODIGO = x.CODIGO,
                    FABRICANTE = x.FABRICANTE,
                    DESCRIPCION = x.DESCRIPCION,
                    AERONAVE = x.AERONAVE,
                    TIPO_COMPONENTE = x.TIPO_COMPONENTE,
                    CANTIDAD_DISPONIBLE = x.ITEMS_MAT_LOGISTICOS.Where(y=>y.UNIDADES == null).Count(),
                    FECHA_DOTACION = x.FECHA_DOTACION,
                    GRUPO = x.GRUPO,
                    CICLO_VIDA = x.CICLO_VIDA,
                    NRO_PARTE = x.NRO_PARTE,
                    HORA_VIDA = x.HORA_VIDA,
                    ESTADO =x.ESTADO,
                    //UNIDAD = x.mat

                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }

        public ListasServicio<MatLogisticoModelResp> ObtenerItemMatLogisticosPaginagos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros, bool almacen)
        {
            ListasServicio<MatLogisticoModelResp> result = new ListasServicio<MatLogisticoModelResp>();
            try
            {
                IEnumerable<ITEMS_MAT_LOGISTICOS> materiales = aplMat.ObtenerItemMatLogisticos(paginacion, filtros,almacen);
                //crear instancia
                List<MatLogisticoModelResp> datos = new List<MatLogisticoModelResp>();
                datos = materiales.Select(x => new MatLogisticoModelResp()
                {
                    ID_ITEM = x.ID_ITEM,
                    ID_MAT_LOGISTICO = (int)x.ID_MAT_LOGISTICO,
                    CODIGO = x.MAT_LOGISTICOS.CODIGO,
                    FABRICANTE = x.MAT_LOGISTICOS.FABRICANTE,
                    DESCRIPCION = x.MAT_LOGISTICOS.DESCRIPCION,
                    AERONAVE = x.MAT_LOGISTICOS.AERONAVE,
                    TIPO_COMPONENTE = x.MAT_LOGISTICOS.TIPO_COMPONENTE,
                    FECHA_DOTACION = x.MAT_LOGISTICOS.FECHA_DOTACION,
                    GRUPO = x.MAT_LOGISTICOS.GRUPO,
                    CICLO_VIDA = x.MAT_LOGISTICOS.CICLO_VIDA,
                    NRO_PARTE = x.MAT_LOGISTICOS.NRO_PARTE,
                    HORA_VIDA = x.ITEMS_VERIFICACIONES.Count() == 0 ?  x.MAT_LOGISTICOS.HORA_VIDA : Convert.ToInt32(x.ITEMS_VERIFICACIONES.OrderByDescending(y=>y.ID_VERIFICACION).FirstOrDefault().VALOR_NUEVO),
                    ESTADO = x.ESTADO,
                    NRO_SERIE = x.NRO_SERIE,
                    UNIDAD = x.UNIDADES == null ? null : x.UNIDADES.UNIDAD,

                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }

        public RespuestaServicio GuardarMatLogistico(MAT_LOGISTICOS mat, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.GuardarMatLogistico(mat, usuario);
            return result;
        }

        public RespuestaServicio GuardarItemMatLogistico(ITEMS_MAT_LOGISTICOS mat, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.GuardarItemMatLogistico(mat, usuario);
            return result;
        }


        public ListasServicio<MatBelicoModelResp> ObtenerMunicionesPorUnidadPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros)
        {
            ListasServicio<MatBelicoModelResp> result = new ListasServicio<MatBelicoModelResp>();
            try
            {
                IEnumerable<MUNICIONES_UNIDADES> materiales = aplMat.ObtenerMunicionesPorUnidad(paginacion, filtros);
                //crear instancia
                List<MatBelicoModelResp> datos = new List<MatBelicoModelResp>();
                datos = materiales.Select(x => new MatBelicoModelResp()
                {
                    ID_MAT_BELICO = x.ID_MAT_BELICO,
                    UNIDAD = x.UNIDADES.UNIDAD,
                    CODIGO = x.MAT_BELICOS.CODIGO,
                    ID_MUNICION_UNIDAD = x.ID_MUNICION_UNIDAD,
                    //UNIDAD = x.UNIDADES == null ? null : x.UNIDADES.UNIDAD,
                    NOMBRE = x.MAT_BELICOS.NOMBRE,
                    FABRICACION = x.MAT_BELICOS.FABRICACION,
                    CATEGORIA = x.MAT_BELICOS.CATEGORIA,
                    CALIBRE = x.MAT_BELICOS.CALIBRE,
                    TIPO = x.MAT_BELICOS.TIPO,
                    CANTIDAD_DISPONIBLE = (int)x.CANTIDAD_DISPONIBLE,
                    FECHA_DOTACION = x.MAT_BELICOS.FECHA_DOTACION,
                    OBSERVACION = x.MAT_BELICOS.OBSERVACION

                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public RespuestaServicio BajaItemArmamento(ITEMS_ARMAMENTO item, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.BajaItemArmamento(item, usuario);
            return result;
        }


        public RespuestaServicio CambiarComponentesArmamento(int ID_CMP1, int ID_CMP2, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.CambiarComponentesArmamento(ID_CMP1,ID_CMP2, usuario);
            return result;
        }


        public RespuestaServicio GuardarSalidaMunicionesUnidad(string detalles, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.GuardarSalidaMunicionesUnidad(detalles, usuario);
            return result;
        }


        public RespuestaServicio VerificacionMaterialLogistico(ITEMS_VERIFICACIONES item, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.VerificacionMaterialLogistico(item, usuario);
            return result;
        }


        public ListasServicio<HistoricoCmpModelResp> ObtenerHistoricosCmpArmamentoPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {//crear instancia de la respuesta
            ListasServicio<HistoricoCmpModelResp> result = new ListasServicio<HistoricoCmpModelResp>();
            try
            {
                //obtener todos los materiales
                //filtros.Entidad = Entidad;
                IEnumerable<HISTORICO_CMP> materiales = serKar.ObtenerHistoricosCmpArmamentoPaginados(paginacion, filtros);
                //crear instancia
                List<HistoricoCmpModelResp> datos = new List<HistoricoCmpModelResp>();
                datos = materiales.Select(x => new HistoricoCmpModelResp()
                {
                    CODIGO = x.ITEMS_ARMAMENTO.MAT_BELICOS.CODIGO,
                    NRO_SERIE_OPERABLE = x.ITEMS_ARMAMENTO.NRO_FUSIL,
                    NRO_SERIE_NO_OPERABLE = x.ITEMS_ARMAMENTO1.NRO_FUSIL,
                    CMP_ALTA = x.CMP_OPERABLE,
                    CMP_BAJA = x.CMP_NO_OPERABLE,
                    FECHA = x.FECHA,
                    USR = x.LOGIN
                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public ArmamentoModelResp ObtenerMaterialBelicoPorID(int ID_MAT_BELICO,int ID_UNIDAD)
        {
            ArmamentoModelResp result = new ArmamentoModelResp();
            var material = aplMat.ObtenerMaterialBelicoPorId(ID_MAT_BELICO);
            if (material != null) {
                result.CALIBRE = material.CALIBRE;
                result.NOMBRE = material.NOMBRE;
                result.FECHA_DOTACION = material.FECHA_DOTACION;
                result.FABRICACION = material.FABRICACION;
                result.CANTIDAD_DISPONIBLE = material.CATEGORIA == "ARMAMENTO" ? material.ITEMS_ARMAMENTO.Where(y => y.ID_UNIDAD == ID_UNIDAD).Count() : (int)material.CANTIDAD_DISPONIBLE;
            }
            return result;
        }


        public ListasServicio<ArmamentoModelResp> ObtenerArmamentoPorUnidad(int ID_MAT_BELICO, int ID_UNIDAD)
        {
            ListasServicio<ArmamentoModelResp> result = new ListasServicio<ArmamentoModelResp>();
            try
            {
                //obtener todos los materiales
                //filtros.Entidad = Entidad;
                IEnumerable<ITEMS_ARMAMENTO> materiales = aplMat.ObtenerArmamentoPorUnidad(ID_MAT_BELICO,ID_UNIDAD);
                //crear instancia
                List<ArmamentoModelResp> datos = new List<ArmamentoModelResp>();
                datos = materiales.Select(x => new ArmamentoModelResp()
                {
                    ID_ITEM = x.ID_ITEM,
                    ID_MAT_BELICO = x.ID_MAT_BELICO,
                    CODIGO = x.MAT_BELICOS.CODIGO,
                    UNIDAD = x.UNIDADES == null ? null : x.UNIDADES.UNIDAD,
                    NOMBRE = x.MAT_BELICOS.NOMBRE,
                    NRO_FUSIL = x.NRO_FUSIL,
                    FABRICACION = x.MAT_BELICOS.FABRICACION,
                    CALIBRE = x.MAT_BELICOS.CALIBRE,
                    TIPO = x.MAT_BELICOS.TIPO,
                    CANTIDAD_DISPONIBLE = 1,
                    FECHA_DOTACION = x.MAT_BELICOS.FECHA_DOTACION,
                    ESTADO = x.ESTADO,
                    OBSERVACION = x.MAT_BELICOS.OBSERVACION,
                    NRO_CANON = x.COMPONENTES_ITEMS.Where(y=>y.NOMBRE == "CAÑON").Count() > 0 ? x.COMPONENTES_ITEMS.Where(y=>y.NOMBRE == "CAÑON").FirstOrDefault().CODIGO : null,
                    NRO_CIERRE = x.COMPONENTES_ITEMS.Where(y => y.NOMBRE == "CIERRE").Count() > 0 ? x.COMPONENTES_ITEMS.Where(y => y.NOMBRE == "CIERRE").FirstOrDefault().CODIGO : null,
                    NRO_CORREDERA = x.COMPONENTES_ITEMS.Where(y => y.NOMBRE == "CORREDERA").Count() > 0 ? x.COMPONENTES_ITEMS.Where(y => y.NOMBRE == "CORREDERA").FirstOrDefault().CODIGO : null,
                }).ToList();
                result.total = datos.Count();
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }
    }
}
