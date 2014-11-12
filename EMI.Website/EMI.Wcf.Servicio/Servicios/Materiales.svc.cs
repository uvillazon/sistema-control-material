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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Materiales" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Materiales.svc o Materiales.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Materiales : IMateriales
    {

        MaterialesServicio aplMat = new MaterialesServicio();
        public RespuestaServicio GuardarMaterial(Model.MATERIALES_BELICOS mat, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.GuardarMaterialBelico(mat, usuario);
            return result;
        }


        public RespuestaServicio EliminarMaterial(int ID, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplMat.EliminarMaterialBelico(ID, usuario);
            return result;
        }

        public ListasServicio<MaterialesModel> ObtenerMaterialesPaginados(Paginacion paginacion)
        {
            //crear instancia de la respuesta
            ListasServicio<MaterialesModel> result = new ListasServicio<MaterialesModel>();
            try
            {
                //obtener todos los materiales
                IEnumerable<MATERIALES_BELICOS> materiales = aplMat.ObtenerMaterialesPaginados(paginacion);
                //crear instancia
                List<MaterialesModel> datos = new List<MaterialesModel>();
                datos = materiales.Select(x => new MaterialesModel()
                {
                    ARMAMENTO = x.ARMAMENTO,
                    CODIGO_MATERIAL = x.CODIGO_MATERIAL,
                    ESTADO = x.ESTADO,
                    CALIBRE = x.CALIBRE,
                    FABRICACION = x.FABRICACION,
                    FECHA_DOTACION = x.FECHA_DOTACION,
                    ID_MATERIAL = x.ID_MATERIAL
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

        public MATERIALES_BELICOS ObtenerMaterialBelico(int ID)
        {
            MATERIALES_BELICOS result = aplMat.ObtenerMaterial(ID);
            return result;
        }
    }
}
