using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class ArmamentoModelResp
    {
        public int ID_ITEM { get; set; }
        public Nullable<int> ID_MAT_BELICO { get; set; }
        public string NRO_FUSIL { get; set; }
        public System.DateTime FECHA_BAJA { get; set; }
        public string OBSERVACION_BAJA { get; set; }
        public string UNIDAD { get; set; }
        public string LOGIN { get; set; }
        public string ESTADO { get; set; }
        public string LOGIN_BAJA { get; set; }
        public string CODIGO { get; set; }
        public string FABRICACION { get; set; }
        public string CALIBRE { get; set; }
        public string CATEGORIA { get; set; }
        public string NOMBRE { get; set; }
        public int CANTIDAD_DISPONIBLE { get; set; }
        public System.DateTime FECHA_DOTACION { get; set; }
        public string OBSERVACION { get; set; }
        public string TIPO { get; set; }
        public string NRO_CANON { get; set; }
        public string NRO_CIERRE { get; set; }
        public string NRO_CORREDERA { get; set; }


    }
    
}