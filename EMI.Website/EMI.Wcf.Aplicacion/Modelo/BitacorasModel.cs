using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class BitacorasModel
    {
        public long? ID_HIST { get; set; }
        public long? ID_TABLA { get; set; }
        public string TABLA { get; set; }
        public string COLUMNA { get; set; }
        public string VALOR { get; set; }
        public string ACCION { get; set; }
        public DateTime? FECHA { get; set; }
        public string LOGIN { get; set; }
    }
    public class HistoricoEdicionModel
    {
        public string USUARIO { get; set; }
        public string MOTIVO { get; set; }
        public string TABLA { get; set; }
        public string DETALLE { get; set; }
        public DateTime? FECHA { get; set; }
    }
   
}
