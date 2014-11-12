using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class ParteArmamentoModelResp
    {
        public int ID_PARTE { get; set; }
        public Nullable<int> ID_MAT_BELICO { get; set; }
        public string NOMBRE { get; set; }
        public string DESCRIPCION { get; set; }
        public int ID_ITEM { get; set; }
        public string CODIGO { get; set; }
        public string ARMAMENTO { get; set; }


    }
    
}