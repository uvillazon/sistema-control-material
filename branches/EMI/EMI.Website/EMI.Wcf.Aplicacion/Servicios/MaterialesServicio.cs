using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Interfaces;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Infraestructura.Repositorios;
using EMI.Wcf.Model;
namespace EMI.Wcf.Aplicacion.Servicios
{
    public class MaterialesServicio : IMaterialesServicio
    {
        private RepositorioMATERIALES_BELICOS repMat = new RepositorioMATERIALES_BELICOS();

        public RespuestaServicio GuardarMaterialBelico(MATERIALES_BELICOS material, string usuario)
        {
            try
            {
                var result = new RespuestaServicio();
                int id = 0;
                //var repMat = new RepositorioMATERIALES_BELICOS();
                if (repMat.BuscarTodos().Count() > 0)
                {
                    id = repMat.BuscarTodos().OrderByDescending(x => x.ID_MATERIAL).FirstOrDefault().ID_MATERIAL + 1;
                }
                else
                {
                    id = 1;
                }
                //controlar duplicidad
                if (!repMat.SiExiste(x => x.CODIGO_MATERIAL == material.CODIGO_MATERIAL))
                {
                    return new RespuestaServicio() { msg = "Existe Otro Material con el mismo Codigo" + material.CODIGO_MATERIAL, success = false };
                }
                else
                {
                    material.ID_MATERIAL = id;
                    repMat.Crear(material);
                    repMat.GuardarCambios();
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

        public RespuestaServicio EliminarMaterialBelico(int ID, string usuario)
        {
            try
            {
                RespuestaServicio result = new RespuestaServicio();
                //aqui estamso obteniendo el material que vamos a elimminar
                MATERIALES_BELICOS material = repMat.BuscarPorCriterio(x => x.ID_MATERIAL == ID);
                if (material == null)
                {
                    return new RespuestaServicio() { msg = "No Existe el Material", success = false };
                }
                else
                {
                    repMat.Eliminar(material);
                    repMat.GuardarCambios();
                    return new RespuestaServicio() { msg = "Proceso ejecutado Correctamente", success = true };
                }
            }
            catch (Exception e)
            {

                return new RespuestaServicio() { msg = e.ToString(), success = false };
            }
            //var result = new RespuestaServicio();
        }

        public IQueryable<MATERIALES_BELICOS> ObtenerMaterialesPaginados(Paginacion paginacion)
        {
            //vamos aobtener todos los registros
            IQueryable<MATERIALES_BELICOS> result = null;
            result = repMat.BuscarTodos();
            //if (paginacion.Contiene != null)
            //{
            //    paginacion.Contiene = paginacion.Contiene.ToUpper();
            //    result = result.Where(x => x.CODIGO_MATERIAL.ToUpper().Contains(paginacion.Contiene) || x.ARMAMENTO.ToUpper().Contains(paginacion.Contiene));
            //}
            paginacion.total = result.Count();
            result = repMat.ObtenerElementosPaginados(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            return result;
        }

        public MATERIALES_BELICOS ObtenerMaterial(int ID)
        {
            MATERIALES_BELICOS result = new MATERIALES_BELICOS();
            result = repMat.BuscarPorCriterio(x => x.ID_MATERIAL == ID);
            return result;
        }
    }
}
