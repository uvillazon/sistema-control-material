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
    public class MaterialesBelicosServicio : IMaterialesBelicosServicio
    {
        private RepositorioITEMS_ARMAMENTO repArm = new RepositorioITEMS_ARMAMENTO();
        private RepositorioMAT_BELICOS repMatBel = new RepositorioMAT_BELICOS();
        private RepositorioPARTES_MAT_BELICOS repPatBel = new RepositorioPARTES_MAT_BELICOS();
        private RepositorioCOMPONENTES_ITEMS repCompItem = new RepositorioCOMPONENTES_ITEMS();
        private RepositorioITEMS_MAT_LOGISTICOS repItmLog = new RepositorioITEMS_MAT_LOGISTICOS();
        private RepositorioMAT_LOGISTICOS repMatLog = new RepositorioMAT_LOGISTICOS();
        private RepositorioMUNICIONES_UNIDADES repMUn = new RepositorioMUNICIONES_UNIDADES();
        private RepositorioMOV_MAT_BELICOS repMov = new RepositorioMOV_MAT_BELICOS();
        private RepositorioSALIDADES_MUNICIONES repSal = new RepositorioSALIDADES_MUNICIONES();
        private RepositorioMOV_MUNICIONES_UNIDADES repMovMunUni = new RepositorioMOV_MUNICIONES_UNIDADES();
        private RepositorioITEMS_VERIFICACIONES repVeri = new RepositorioITEMS_VERIFICACIONES();
        //private RepositorioCOMPONENTES_ITEMS repCmp

        public IQueryable<ITEMS_ARMAMENTO> ObtenerArmamentoPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros, bool almacen)
        {
            try
            {

                IQueryable<ITEMS_ARMAMENTO> result = null;
                result = repArm.BuscarTodos();

                filtros.FiltrarDatos();

                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.Contiene != null)
                {
                    //paginacion.Contiene = paginacion.Contiene.ToUpper();
                    //result = result.AsEnumerable
                    result = result.AsExpandable().Where(ITEMS_ARMAMENTO.Contiene(filtros.Contiene));
                }
                if (almacen)
                {
                    result = result.Where(x => x.UNIDADES == null);
                }
                paginacion.total = result.Count();
                result = repArm.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                return result;
            }

            catch (Exception e)
            {

                throw;
            }
        }
        public IQueryable<MAT_BELICOS> ObtenerMaterialesBelicosPaginados(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros)
        {
            try
            {
                IQueryable<MAT_BELICOS> result = null;
                result = repMatBel.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.Contiene != null)
                {
                    result = result.AsExpandable().Where(MAT_BELICOS.Contiene(filtros.Contiene));
                }
                if (filtros.Unidades != null) {
                    result = result.AsExpandable().Where(MAT_BELICOS.EnUnidad(filtros.Unidades));
                    //result = result.Where(x => x.ITEMS_ARMAMENTO.Any(y => y.ID_UNIDAD == 2));
                }
                paginacion.total = result.Count();
                result = repMatBel.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                return result;
            }
            catch (Exception e)
            {
                throw;
            }
        }


        public RespuestaServicio GuardarModeloArmamento(MAT_BELICOS material, string detalles, string usuario)
        {
            try
            {
                var result = new RespuestaServicio();


                //controlar duplicidad
                if (!repMatBel.SiExiste(x => x.CODIGO.ToUpper() == material.CODIGO.ToUpper(),material.ID_MAT_BELICO == 0))
                {
                    return new RespuestaServicio() { msg = "Existe Otro Material con el mismo Codigo " + material.CODIGO, success = false };
                }
                else
                {
                    //para crear
                    if (material.ID_MAT_BELICO == 0)
                    {

                        int id = repMatBel.ObtenerId();
                        material.ID_MAT_BELICO = id;
                        material.CATEGORIA = "ARMAMENTO";
                        material.FECHA_REG = DateTime.Now;
                        material.LOGIN = usuario;
                        material.CANTIDAD_DISPONIBLE = 0;
                        repMatBel.Crear(material);

                    }
                    else
                    {
                        var mat = repMatBel.BuscarPorCriterio(x => x.ID_MAT_BELICO == material.ID_MAT_BELICO);
                        mat.NOMBRE = material.NOMBRE;
                        mat.OBSERVACION = material.OBSERVACION;
                        mat.FABRICACION = material.FABRICACION;
                        mat.CALIBRE = material.CALIBRE;
                        mat.TIPO = material.TIPO;
                        mat.FECHA_DOTACION = material.FECHA_DOTACION;
                        repPatBel.Eliminar(x => x.ID_MAT_BELICO == material.ID_MAT_BELICO);

                    }
                    repMatBel.GuardarCambios();
                    repPatBel.GuardarCambios();
                    if (detalles != "false")
                    {
                        dynamic det = JsonConvert.DeserializeObject(detalles);
                        foreach (var item in det)
                        {
                            PARTES_MAT_BELICOS partes = new PARTES_MAT_BELICOS()
                            {
                                ID_PARTE = repPatBel.ObtenerId(),
                                ID_MAT_BELICO = material.ID_MAT_BELICO,
                                NOMBRE = item.NOMBRE,
                                DESCRIPCION = item.DESCRIPCION
                            };
                            repPatBel.Crear(partes);
                            repPatBel.GuardarCambios();
                            //respuestaSP = _serCmp.SP_GrabarDetalleCompra(detalleCompra, id_usr);
                        }
                    }

                    //result.msg = "Proceso Ejectuado Correctamente";
                    //result.success = true;
                    return new RespuestaServicio() { msg = "Proceso ejecutado Correctamente", success = true };
                }
            }
            catch (Exception e)
            {
                return new RespuestaServicio() { msg = e.ToString(), success = false };
            }
        }

        public IQueryable<PARTES_MAT_BELICOS> ObtenerPartesArmamento(FiltrosModel<ArmamentoModel> filtros)
        {
            IQueryable<PARTES_MAT_BELICOS> result = null;
            result = repPatBel.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            return result;
        }


        public RespuestaServicio GuardarItemArmamento(ITEMS_ARMAMENTO item, string detalles, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            if (item.ID_ITEM == 0)
            {
                resp = repArm.GuardarItemArmamento(item, usuario);
            }
            else
            {
                resp = repArm.EditarItemArmamento(item, usuario);
            }
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                item.ID_ITEM = id;
                resp = repCompItem.GuardarComponentesDetalle(detalles, item);
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
        public RespuestaServicio BajaItemArmamento(ITEMS_ARMAMENTO item, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            resp = repArm.BajaItemArmamento(item, usuario);
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
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
            return result;

        }



        public IQueryable<COMPONENTES_ITEMS> ObtenerCmpArmamentos(FiltrosModel<ArmamentoModel> filtros)
        {
            IQueryable<COMPONENTES_ITEMS> result = null;
            result = repCompItem.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            return result;
        }


        public RespuestaServicio GuardarMuniciones(MAT_BELICOS material, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            if (material.ID_MAT_BELICO == 0)
            {
                resp = repMatBel.GuardarMuniciones(material, usuario);
                var mov = new MOV_MAT_BELICOS()
                {
                    ID_OPERACION = material.ID_MAT_BELICO,
                    FECHA = material.FECHA_DOTACION,
                    OPERACION = "INVENTARIO",
                    ID_MAT_BELICO = material.ID_MAT_BELICO,
                    ENTRADA = (int)material.CANTIDAD_DISPONIBLE
                };
                repMov.GuardarMovimiento(mov, usuario);

            }
            else
            {
                resp = repMatBel.EditarMuniciones(material, usuario);
            }
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                //result.id = ;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }

            return result;
        }


        public IQueryable<MAT_LOGISTICOS> ObtenerMatLogisticos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros)
        {
            IQueryable<MAT_LOGISTICOS> result = null;
            result = repMatLog.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            if (filtros.Contiene != null)
            {
                result = result.AsExpandable().Where(MAT_LOGISTICOS.Contiene(filtros.Contiene));
            }
            paginacion.total = result.Count();
            result = repMatLog.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }

        public IQueryable<ITEMS_MAT_LOGISTICOS> ObtenerItemMatLogisticos(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros, bool almacen)
        {
            IQueryable<ITEMS_MAT_LOGISTICOS> result = null;
            result = repItmLog.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            if (filtros.Contiene != null)
            {
                result = result.AsExpandable().Where(ITEMS_MAT_LOGISTICOS.Contiene(filtros.Contiene));
            }
            if (almacen)
            {
                result = result.Where(x => x.UNIDADES == null);
            }
            paginacion.total = result.Count();
            result = repItmLog.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }

        public RespuestaServicio GuardarMatLogistico(MAT_LOGISTICOS material, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            if (material.ID_MAT_LOGISTICO == 0)
            {
                resp = repMatLog.GuardarMatLogistico(material, usuario);
            }
            else
            {
                resp = repMatLog.EditarMatLogistico(material, usuario);
            }
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                //result.id = ;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }

            return result;
        }

        public RespuestaServicio GuardarItemMatLogistico(ITEMS_MAT_LOGISTICOS material, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            if (material.ID_ITEM == 0)
            {
                resp = repItmLog.GuardarItemMatLogiscitos(material, usuario);
            }
            else
            {
                resp = repItmLog.EditarItemMatLogistico(material, usuario);
            }
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                //result.id = ;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }

            return result;
        }


        public IQueryable<MUNICIONES_UNIDADES> ObtenerMunicionesPorUnidad(Paginacion paginacion, FiltrosModel<ArmamentoModel> filtros)
        {
            try
            {
                IQueryable<MUNICIONES_UNIDADES> result = null;
                result = repMUn.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.Contiene != null)
                {
                    result = result.AsExpandable().Where(MUNICIONES_UNIDADES.Contiene(filtros.Contiene));
                }
                paginacion.total = result.Count();
                result = repMUn.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                return result;
            }
            catch (Exception e)
            {
                throw;
            }
        }
        public RespuestaServicio CambiarComponentesArmamento(int ID_CMP1, int ID_CMP2, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            resp = repCompItem.CambiarCompomenteArmamento(ID_CMP1, ID_CMP2, usuario);
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                //result.id = ;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }

            return result;
        }
        public RespuestaServicio GuardarSalidaMunicionesUnidad(string detalles, string usuario)
        {

            var result = new RespuestaServicio();
            string resp = "";
            if (detalles != "false")
            {
                dynamic det = JsonConvert.DeserializeObject(detalles);
                try
                {
                    foreach (var item in det)
                    {
                        SALIDADES_MUNICIONES detalle = new SALIDADES_MUNICIONES()
                        {
                            SALIDA = item.SALIDA,
                            OBSERVACION = item.OBSERVACION,
                            FECHA = DateTime.Now.Date,
                            ID_MUNICION_UNIDAD = item.ID_MUNICION_UNIDAD,

                        };
                        string idresult = repSal.GuardarSalidaMuniciones(detalle, usuario);
                        int id;
                        bool esNumero = int.TryParse(idresult, out id);
                        if (esNumero && id > 0)
                        {
                            var mov = new MOV_MUNICIONES_UNIDADES()
                            {
                                ID_MUNICION_UNIDAD = detalle.ID_MUNICION_UNIDAD,
                                FECHA = detalle.FECHA,
                                OPERACION = string.Format("Salida Municiones Motivo: {0}",detalle.OBSERVACION ),
                                ENTRADA =0,
                                SALIDA = detalle.SALIDA,
                                ID_OPERACION = detalle.ID_SALIDA
                            };
                            repMovMunUni.GuardarMovimiento(mov, usuario);
                            result.success = true;
                            result.msg = "Proceso Ejecutado Correctamente";
                            //result.id = ;
                        }
                        else
                        {
                            result.success = false;
                            result.msg = resp;
                        }
                        //Crear(detalle);
                        //GuardarCambios();
                    }
                    return result;
                }
                catch (Exception e)
                {
                    result.success = false;
                    result.msg = e.ToString();
                    return result;
                }
            }
            else
            {
                result.success = false;
                result.msg = "Al menos registre una salida";
                return result;
            }
        }


        public RespuestaServicio VerificacionMaterialLogistico(ITEMS_VERIFICACIONES item, string usuario)
        {
            var result = new RespuestaServicio();
            string resp = "";
            resp = repVeri.GuardarItemVerificacion(item, usuario);
            int id;
            bool esNumero = int.TryParse(resp, out id);
            if (esNumero && id > 0)
            {
                result.success = true;
                result.msg = "Proceso Ejecutado Correctamente";
                //result.id = ;
            }
            else
            {
                result.success = false;
                result.msg = resp;
            }

            return result;
            //
        }


        public MAT_BELICOS ObtenerMaterialBelicoPorId(int ID_MAT_BELICO)
        {
            var result = repMatBel.BuscarPorCriterio(x => x.ID_MAT_BELICO == ID_MAT_BELICO);
            return result;
        }

        public IQueryable<ITEMS_ARMAMENTO> ObtenerArmamentoPorUnidad(int ID_MAT_BELICO , int ID_UNIDAD)
        {
            try
            {

                IQueryable<ITEMS_ARMAMENTO> result = null;
                result = repArm.BuscarTodos(x=>x.ID_MAT_BELICO == ID_MAT_BELICO && x.ID_UNIDAD == ID_UNIDAD);
                return result;
            }

            catch (Exception e)
            {

                throw;
            }
        }
    }
}
