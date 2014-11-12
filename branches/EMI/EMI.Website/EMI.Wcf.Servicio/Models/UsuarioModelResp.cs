using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class UsuarioModelResp
    {
        public int ID_USUARIO { get; set; }
        public string NOMBRE { get; set; }
        public string LOGIN { get; set; }
        public string CONTRASEÑA { get; set; }
        public System.DateTime FECHA_ALTA { get; set; }
        public Nullable<System.DateTime> FECHA_CADUCIDAD { get; set; }
        public int ID_PERFIL { get; set; }
        public string ESTADO { get; set; }
        public string PERFIL { get; set; }
        public string DESCRIPCION { get; set; }
        public DateTime? FECHA_BLOQUEO { get; set; }
        public int NRO_FALLIDO { get; set; }
        //public string Caduci { get; set; }


    }
    
}