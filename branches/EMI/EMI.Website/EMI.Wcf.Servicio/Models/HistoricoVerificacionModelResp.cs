using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class HistoricoVerificacionModelResp
    {

        
        public string CODIGO { get; set; }
        public string NRO_SERIE { get; set; }
        public string FABRICANTE { get; set; }
        public string TIPO_COMPONENTE { get; set; }
        public string AERONAVE { get; set; }
        public string GRUPO { get; set; }
        public string HORA_ANTERIOR { get; set; }
        public string HORA_ACTUAL { get; set; }
        public string RESPONSABLE { get; set; }
        public DateTime? FECHA { get; set; }
        public string OBSERVACION { get; set; }


    }
    
}