using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using EMI.Wcf.Aplicacion.Servicios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Tablas" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Tablas.svc o Tablas.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Tablas : ITablas
    {

        //public IQueryable<TABLAS> ObtenerTablas()
        //{
        //    var servicio = new TablasServicio();
        //    return servicio.ObtenerTablas();
        //}

        //[WebInvoke(Method = "GET",
        //            ResponseFormat = WebMessageFormat.Json)]
        //public IQueryable<TABLAS> ObtenerTablasJson()
        //{
        //    var servicio = new TablasServicio();
        //    return servicio.ObtenerTablas();
        //}
    }
}
