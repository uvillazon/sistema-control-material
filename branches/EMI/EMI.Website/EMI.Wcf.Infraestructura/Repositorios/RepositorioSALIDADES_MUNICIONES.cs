using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioSALIDADES_MUNICIONES : RepositorioBase<SALIDADES_MUNICIONES>
    {
        public RepositorioSALIDADES_MUNICIONES() : base() { }
        public string GuardarSalidaMuniciones(SALIDADES_MUNICIONES salida, string login)
        {
           
            try
            {
                salida.ID_SALIDA = ObtenerId();
               
                salida.FECHA_REG = DateTime.Now;
                salida.LOGIN = login;
               
                Crear(salida);
                GuardarHistorico(salida, "CREACION", salida.ID_SALIDA, login);
                GuardarCambios();
                return salida.ID_SALIDA.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
