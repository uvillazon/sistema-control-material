using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class MaterialesModel
    {
        public int ID_MATERIAL { get; set; }
        public string CODIGO_MATERIAL { get; set; }
        public string ARMAMENTO { get; set; }
        public string CALIBRE { get; set; }
        public string ESTADO { get; set; }
        public string FABRICACION { get; set; }
        public System.DateTime FECHA_DOTACION { get; set; }
        public Nullable<System.DateTime> FECHA_MODIFICACION { get; set; }

    }
    
}