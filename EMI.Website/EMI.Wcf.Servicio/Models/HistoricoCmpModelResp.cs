using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class HistoricoCmpModelResp
    {
        public string CODIGO { get; set; }
        public string NRO_SERIE_OPERABLE { get; set; }
        public string NRO_SERIE_NO_OPERABLE { get; set; }
        public string CMP_ALTA { get; set; }
        public string CMP_BAJA{ get; set; }
        public DateTime FECHA { get; set; }
        public string USR { get; set; }


    }
    
}