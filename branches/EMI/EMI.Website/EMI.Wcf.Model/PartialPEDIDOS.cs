using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Model
{
    public partial class PEDIDOS
    {
        public static Expression<Func<PEDIDOS, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.NRO_PEDIDO);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.UNIDADES.UNIDAD.ToUpper().Contains(contiene.ToUpper()) ||
                             m.TIPO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.ESTADO.ToUpper().Contains(contiene.ToUpper()) ;
            }
        }
    }
}
