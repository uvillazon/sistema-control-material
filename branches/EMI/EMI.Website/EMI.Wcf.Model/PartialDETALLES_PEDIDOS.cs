using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Model.Infraestructure;

namespace EMI.Wcf.Model
{
    public partial class DETALLES_PEDIDOS
    {
        public static Expression<Func<DETALLES_PEDIDOS, bool>> ElEstadoContiene(params string[] keywords)
        {
            var predicate = PredicateBuilder.False<DETALLES_PEDIDOS>();
            foreach (string keyword in keywords)
            {
                string temp = keyword;
                predicate = predicate.Or(ot => ot.PEDIDOS.ESTADO.ToUpper().Contains(temp));
            }
            return predicate;

            /*The temporary variable in the loop is required to avoid the outer variable trap, 
             * where the same variable is captured for each iteration of the foreach loop.*/
        }
        public static Expression<Func<DETALLES_PEDIDOS, bool>> EnUnidad(params string[] keywords)
        {
            var predicate = PredicateBuilder.False<DETALLES_PEDIDOS>();
            foreach (string keyword in keywords)
            {
                int temp = Convert.ToInt32(keyword);
                predicate = predicate.Or(ot => ot.PEDIDOS.ID_UNIDAD == temp);
            }
            return predicate;

            /*The temporary variable in the loop is required to avoid the outer variable trap, 
             * where the same variable is captured for each iteration of the foreach loop.*/
        }
        public static Expression<Func<DETALLES_PEDIDOS, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.PEDIDOS.NRO_PEDIDO);
            }
            catch (FormatException)
            {
                contiene = contiene.ToUpper();
                return m => contiene == null ||

                            m.MAT_BELICOS.CODIGO.ToUpper().Contains(contiene) ||
                            m.MAT_BELICOS.NOMBRE.ToUpper().Contains(contiene) ||
                            m.MAT_LOGISTICOS.CODIGO.ToUpper().Contains(contiene) ||
                            m.MAT_LOGISTICOS.TIPO_COMPONENTE.ToUpper().Contains(contiene) ||
                            m.MAT_BELICOS.CALIBRE.ToUpper().Contains(contiene);
            }
        }
    }
}
