using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class PedidoModelResp
    {
        public int ID_PEDIDO { get; set; }
        public int NRO_PEDIDO { get; set; }
        public string TIPO { get; set; }
        public int ID_UNIDAD { get; set; }
        public string UNIDAD { get; set; }
        public System.DateTime FECHA_PEDIDO { get; set; }
        public string OBSERVACIONES { get; set; }
        public string LOGIN { get; set; }
        public Nullable<System.DateTime> FECHA_MODIF { get; set; }
        public string ESTADO { get; set; }
        public int ID_DETALLE { get; set; }
        public Nullable<int> ID_MAT_BELICO { get; set; }
        public string CODIGO { get; set; }
        public string DETALLE { get; set; }
        public Nullable<int> ID_MAT_LOGISTICO { get; set; }
        public int CANTIDAD_SOLICITADA { get; set; }
        public Nullable<int> CANTIDAD_ENTREGADA { get; set; }
        public string CATEGORIA { get; set; }
        public int CANTIDAD_EXISTENTE { get; set; }
        public string ESTADO_DETALLE { get; set; }
        public string ESTADO_RECEPCION { get; set; }
    }
    
}