using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;
using Newtonsoft.Json;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioBITACORAS : RepositorioBase<BITACORAS>
    {

        public RepositorioBITACORAS() : base() { }

      
        /// <summary>
        /// Proceso para cambiar componentes entre un operable y no operable
        /// </summary>
        /// <param name="ID_CMP1">COMPONENTE OPERABLE</param>
        /// <param name="ID_CMP2">COMPONENTE NO OPERABLE</param>
        /// <param name="login">NOMBRE USUARIO</param>
        /// <returns></returns>


    }
}
