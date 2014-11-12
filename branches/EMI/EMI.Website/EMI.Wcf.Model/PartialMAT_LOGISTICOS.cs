using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Model
{
    public partial class MAT_LOGISTICOS
    {
        public static Expression<Func<MAT_LOGISTICOS, bool>> Contiene(string contiene)
        {

            contiene = contiene.ToUpper();
            return m => contiene == null ||
                        m.GRUPO.Contains(contiene) ||
                        m.CODIGO.ToUpper().Contains(contiene) ||
                        m.FABRICANTE.ToUpper().Contains(contiene) ||
                        m.AERONAVE.ToUpper().Contains(contiene) ||
                        m.NRO_PARTE.ToUpper().Contains(contiene)||
                        m.TIPO_COMPONENTE.ToUpper().Contains(contiene) ;
            
        }
    }
}
