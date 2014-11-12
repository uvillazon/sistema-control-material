﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Model
{
    public partial class ITEMS_ARMAMENTO
    {
        public static Expression<Func<ITEMS_ARMAMENTO, bool>> Contiene(string contiene)
        {

            contiene = contiene.ToUpper();
            return m => contiene == null ||
                        m.NRO_FUSIL.Contains(contiene) ||
                        m.MAT_BELICOS.CODIGO.ToUpper().Contains(contiene) ||
                        m.MAT_BELICOS.FABRICACION.ToUpper().Contains(contiene) ||
                        m.MAT_BELICOS.CALIBRE.ToUpper().Contains(contiene) ||
                        m.MAT_BELICOS.TIPO.ToUpper().Contains(contiene)||
                        m.MAT_BELICOS.NOMBRE.ToUpper().Contains(contiene)||
                        m.UNIDADES.UNIDAD.ToUpper().Contains(contiene) ;
            
        }
    }
}
