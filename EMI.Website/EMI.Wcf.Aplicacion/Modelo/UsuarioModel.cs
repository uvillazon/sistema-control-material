using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class UsuarioModel
    {
        //mensajede respuesta
        public int? ID_USUARIO { get; set; }
        public int? ID_PERFIL { get; set; }
        public string ESTADO { get; set; }
    }

}
