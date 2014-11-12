using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioLISTAS_ITEMS : RepositorioBase<LISTAS_ITEMS>
    {
        public RepositorioLISTAS_ITEMS() : base() { }
        public string GuardarItemLista(LISTAS_ITEMS lista, string login)
        {
            lista.ID_TABLA = ObtenerId();
            if (!SiExiste(x => x.VALOR == lista.VALOR && x.ID_LISTA == lista.ID_LISTA))
            {
                return "Existe una lista con el mismo valor " + lista.VALOR;
            }
            try
            {
                Crear(lista);
                GuardarCambios();
                return lista.ID_TABLA.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string EditarLista(LISTAS_ITEMS lista, string login)
        {
            try
            {
                if (!SiExiste(x => x.VALOR == lista.VALOR && x.ID_LISTA == lista.ID_LISTA && x.ID_TABLA != lista.ID_TABLA))
                {
                    return "Existe una lista con el mismo valor " + lista.VALOR;
                }
                var itemEditar = BuscarPorCriterio(x => x.ID_TABLA == lista.ID_TABLA);
                itemEditar.VALOR = lista.VALOR;
                itemEditar.CODIGO = lista.CODIGO;
                itemEditar.ESTADO = lista.ESTADO;
                GuardarCambios();
                return itemEditar.ID_TABLA.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
