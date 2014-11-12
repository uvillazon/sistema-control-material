using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioMUNICIONES_UNIDADES : RepositorioBase<MUNICIONES_UNIDADES>
    {
        public RepositorioMUNICIONES_UNIDADES() : base() { }
        public string GuardarMunicion(MUNICIONES_UNIDADES mun, string login)
        {
            mun.ID_MUNICION_UNIDAD = ObtenerId();
            try
            {
                Crear(mun);
                GuardarHistorico(mun, "CREACION", mun.ID_MUNICION_UNIDAD, login);
                GuardarCambios();
                return mun.ID_MUNICION_UNIDAD.ToString();
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
