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
    public class KardexServicio : IKardexServicio
    {
        private RepositorioMOV_MUNICIONES_UNIDADES repMovUni = new RepositorioMOV_MUNICIONES_UNIDADES();
        private RepositorioMOV_MAT_BELICOS repMovMun = new RepositorioMOV_MAT_BELICOS();
        private RepositorioHISTORICO_CMP repHistCmp = new RepositorioHISTORICO_CMP();
        private RepositorioITEMS_VERIFICACIONES repVerLog = new RepositorioITEMS_VERIFICACIONES();

        public IQueryable<MOV_MUNICIONES_UNIDADES> ObtenerKardexUnidadesPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {
            IQueryable<MOV_MUNICIONES_UNIDADES> result = null;
            result = repMovUni.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            paginacion.total = result.Count();
            result = repMovUni.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }


        public IQueryable<MOV_MAT_BELICOS> ObtenerKardexPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {
            IQueryable<MOV_MAT_BELICOS> result = null;
            result = repMovMun.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            paginacion.total = result.Count();
            result = repMovMun.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }


        public IQueryable<HISTORICO_CMP> ObtenerHistoricosCmpArmamentoPaginados(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {
            IQueryable<HISTORICO_CMP> result = null;
            result = repHistCmp.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            if (filtros.Contiene != null)
            {
                filtros.Contiene = filtros.Contiene.ToUpper();
                result = result.Where(x=>x.ITEMS_ARMAMENTO.NRO_FUSIL.Contains(filtros.Contiene)||x.ITEMS_ARMAMENTO1.NRO_FUSIL.Contains(filtros.Contiene));
            }
            paginacion.total = result.Count();
            result = repHistCmp.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }





        public IQueryable<MOV_MUNICIONES_UNIDADES> ObtenerKardexUnidadesPorId(int ID_MUNICION_UNIDAD)
        {
            try
            {

                IQueryable<MOV_MUNICIONES_UNIDADES> result = null;
                result = repMovUni.BuscarTodos(x => x.ID_MUNICION_UNIDAD == ID_MUNICION_UNIDAD && x.ENTRADA > 0 );
                return result;
            }

            catch (Exception e)
            {

                throw;
            }
        }


        public IQueryable<ITEMS_VERIFICACIONES> ObtenerHistoricosMatLogistico(Paginacion paginacion, FiltrosModel<KardexModel> filtros)
        {
            IQueryable<ITEMS_VERIFICACIONES> result = null;
            result = repVerLog.BuscarTodos();
            filtros.FiltrarDatos();
            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
            paginacion.total = result.Count();
            result = repVerLog.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }
    }
}
