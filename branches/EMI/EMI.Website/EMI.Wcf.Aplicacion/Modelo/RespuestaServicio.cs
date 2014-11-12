using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class RespuestaServicio
    {
        //mensajede respuesta
        public string msg { get; set; }
        //si la operacion fue exitoa devolvera true caso contrario false 
        public bool success { get; set; }
        public int id { get; set; }
    }
}
