using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Model
{
    public partial class ITEMS_MAT_LOGISTICOS
    {
        public static Expression<Func<ITEMS_MAT_LOGISTICOS, bool>> Contiene(string contiene)
        {

            contiene = contiene.ToUpper();
            return m => contiene == null ||
                        m.NRO_SERIE.Contains(contiene) ||
                        m.MAT_LOGISTICOS.CODIGO.ToUpper().Contains(contiene) ||
                        m.MAT_LOGISTICOS.FABRICANTE.ToUpper().Contains(contiene) ||
                        m.MAT_LOGISTICOS.AERONAVE.ToUpper().Contains(contiene) ||
                        m.MAT_LOGISTICOS.TIPO_COMPONENTE.ToUpper().Contains(contiene)||
                        m.MAT_LOGISTICOS.GRUPO.ToUpper().Contains(contiene)||
                        m.MAT_LOGISTICOS.NRO_PARTE.ToUpper().Contains(contiene)||
                        m.UNIDADES.UNIDAD.ToUpper().Contains(contiene) ;
            
        }
    }
}