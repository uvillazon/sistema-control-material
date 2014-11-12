using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class ExistenciasModel
    {
            public string DETALLE { get; set; }
            public int ID_DETALLE { get; set; }
            public string GRUPO { get; set; }
            public int EXISTENCIA_ANTERIOR { get; set; }
            public int ALTA { get; set; }
            public int BAJAS { get; set; }
            public int PERDIDAS { get; set; }
            public string NOTA { get; set; }
            public string UNIDAD { get; set; }
            public int ID_UNIDAD { get; set; }
            public DateTime FECHA { get; set; }
    }
}
