using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class ArmamentoModel
    {
        //mensajede respuesta
        public int? ID_UNIDAD { get; set; }
        public string CATEGORIA { get; set; }
        public int? ID_ITEM { get; set; }
        public string ESTADO { get; set; }
        //para partes
        public int? ID_MAT_BELICO { get; set; }

        public int? ID_MAT_LOGISTICO { get; set; }
    }
   
}
