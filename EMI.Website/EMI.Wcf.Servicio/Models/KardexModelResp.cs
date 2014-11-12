using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class KardexModelResp
    {
        public int ID_MOV { get; set; }
        public System.DateTime FECHA { get; set; }
        public int ID_MUNICION_UNIDAD { get; set; }
        public int ID_MAT_BELICO { get; set; }
        public string CODIGO { get; set; }
        public int ENTRADA { get; set; }
        public int SALIDA { get; set; }
        public int SALDO { get; set; }
        public string OPERACION { get; set; }
        public int ID_OPERACION { get; set; }
        public string LOGIN { get; set; }


    }
    
}