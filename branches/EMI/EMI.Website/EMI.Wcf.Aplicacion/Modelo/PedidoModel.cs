using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class PedidoModel
    {
        //mensajede respuesta
        public int? ID_UNIDAD { get; set; }
        public string ESTADO { get; set; }
        public string TIPO { get; set; }
        public int? ID_PEDIDO { get; set; }
        public int? ID_DETALLE { get; set; }
    }
   
}
