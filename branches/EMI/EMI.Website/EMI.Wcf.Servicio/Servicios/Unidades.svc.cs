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
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Unidades" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Unidades.svc o Unidades.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Unidades : IUnidades
    {

        UnidadesServicio serUni = new UnidadesServicio();
        public UnidadModelResp ObtenerUnidadPorId(int ID_UNIDAD)
        {
            UnidadModelResp result = new UnidadModelResp();
            var rest = serUni.ObtenerUnidadPorId(ID_UNIDAD);
            result.DESCRIPCION = rest.DESCRIPCION;
            result.ID_UNIDAD = rest.ID_UNIDAD;
            result.UNIDAD = rest.UNIDAD;
            return result;
        }


        public ListasServicio<UnidadModelResp> ObtenerUnidadesPaginados(Paginacion paginacion)
        {
            ListasServicio<UnidadModelResp> result = new ListasServicio<UnidadModelResp>();
            try
            {
                IEnumerable<UNIDADES> mov = serUni.ObtenerUnidadesPaginados(paginacion);
                List<UnidadModelResp> datos = new List<UnidadModelResp>();
                datos = mov.Select(x => new UnidadModelResp()
                {
                  ID_UNIDAD = x.ID_UNIDAD,
                  DESCRIPCION = x.DESCRIPCION,
                  UNIDAD = x.UNIDAD
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
    }
}
