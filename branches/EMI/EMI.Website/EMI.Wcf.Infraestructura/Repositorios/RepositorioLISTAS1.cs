using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioLISTAS1 : RepositorioBase<LISTAS1>
    {
        public RepositorioLISTAS1() : base() { }

        public string GuardarLista(LISTAS1 lista, string login)
        {
            lista.ID_LISTA = ObtenerId();
            if (!SiExiste(x => x.LISTA == lista.LISTA))
            {
                return "Existe una lista con el mismo valor " + lista.LISTA;
            }
            try
            {
                Crear(lista);
                GuardarCambios();
                return lista.ID_LISTA.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
