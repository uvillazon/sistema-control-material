using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Model.Infraestructure;

namespace EMI.Wcf.Model
{
    public partial class MAT_BELICOS
    {
        public static Expression<Func<MAT_BELICOS, bool>> Contiene(string contiene)
        {

            contiene = contiene.ToUpper();
            return m => contiene == null ||

                        m.CODIGO.ToUpper().Contains(contiene) ||
                        m.FABRICACION.ToUpper().Contains(contiene) ||
                        m.CALIBRE.ToUpper().Contains(contiene) ||
                        m.TIPO.ToUpper().Contains(contiene) ||
                        m.NOMBRE.ToUpper().Contains(contiene);

        }
        public static Expression<Func<MAT_BELICOS, bool>> EnUnidad(params string[] keywords)
        {
            var predicate = PredicateBuilder.False<MAT_BELICOS>();
            foreach (string keyword in keywords)
            {
                int temp = Convert.ToInt32(keyword);
                predicate = predicate.Or(ot => ot.ITEMS_ARMAMENTO.Any(a => a.ID_UNIDAD == temp));
            }
            return predicate;

            /*The temporary variable in the loop is required to avoid the outer variable trap, 
             * where the same variable is captured for each iteration of the foreach loop.*/
        }
    }
}
