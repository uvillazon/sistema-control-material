using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class MatLogisticoModel
    {
            public string NRO_SERIE { get; set; }
            public int ID_ITEM_ { get; set; }
            public string NRO_PARTE { get; set; }
            public string AERONAVE { get; set; }
            public string GRUPO { get; set; }
            public string ESTADO { get; set; }
            public int? CICLO_VIDA { get; set; }
            public int? HORA_VIDA { get; set; }
            public int? ID_UNIDAD { get; set; }
            public string UNIDAD { get; set; }
            public string CODIGO { get; set; }
            public string FABRICANTE { get; set; }
            public string TIPO_COMPONENTE { get; set; }
            public string OBSERVACIONES { get; set; }
            public DateTime FECHA_DOTACION { get; set; }
    }
}
