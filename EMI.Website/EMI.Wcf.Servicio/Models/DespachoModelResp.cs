using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class DespachoModelResp
    {
        public int ID_DESPACHO { get; set; }
        public int ID_PEDIDO { get; set; }
        public int? ID_ITEM_ARMAMENTO { get; set; }
        public int? ID_ITEM_LOGISTICO { get; set; }
        public int NRO_PEDIDO { get; set; }
        public int ID_DETALLE { get; set; }
        public string CODIGO { get; set; }
        public int CANTIDAD_ENTREGADA { get; set; }
        public DateTime FECHA { get; set; }
        public string LOGIN { get; set; }
        public string ESTADO { get; set; }
        //public int CANTIDAD_EXISTENTE { get; set; }
    }
    
}