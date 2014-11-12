using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class MatLogisticoModelResp
    {

        public int ID_MAT_LOGISTICO { get; set; }
        public int ID_ITEM { get; set; }
        public string CODIGO { get; set; }
        public string FABRICANTE { get; set; }
        public string TIPO_COMPONENTE { get; set; }
        public string AERONAVE { get; set; }
        public string GRUPO { get; set; }
        public string NRO_PARTE { get; set; }
        public string ESTADO { get; set; }
        public Nullable<int> CICLO_VIDA { get; set; }
        public Nullable<int> HORA_VIDA { get; set; }
        public string DESCRIPCION { get; set; }
        public System.DateTime FECHA_DOTACION { get; set; }
        public string LOGIN { get; set; }
        public string NRO_SERIE { get; set; }
        public string UNIDAD { get; set; }
        public int CANTIDAD_DISPONIBLE { get; set; }


    }
    
}