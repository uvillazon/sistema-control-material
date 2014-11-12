using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class DetallePedidoModel
    {
        //mensajede respuesta
        public string UNIDAD { get; set; }
        public string DETALLE { get; set; }
        public int ID_PEDIDO { get; set; }
        public string CODIGO { get; set; }
        public int CANTIDAD_SOLICITADA { get; set; }
        public int CANTIDAD_ENTREGADA { get; set; }
        public DateTime FECHA { get; set; }
        public string ESTADO_DETALLE { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
        public string CATEGORIA { get; set; }
        public string ESTADO_RECEPCION { get; set; }
        //public int? ID_DETALLE { get; set; }
    }
   
}
