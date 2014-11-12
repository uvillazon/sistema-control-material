using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class MatBelicoModelResp
    {
      
        public Nullable<int> ID_MAT_BELICO { get; set; }
        public int ID_MUNICION_UNIDAD { get; set; }
        public string UNIDAD { get; set; }
        public string CODIGO { get; set; }
        public string FABRICACION { get; set; }
        public string CALIBRE { get; set; }
        public string CATEGORIA { get; set; }
        public string NOMBRE { get; set; }
        public int CANTIDAD_DISPONIBLE { get; set; }
        public System.DateTime FECHA_DOTACION { get; set; }
        public string OBSERVACION { get; set; }
        public string TIPO { get; set; }


    }
    
}