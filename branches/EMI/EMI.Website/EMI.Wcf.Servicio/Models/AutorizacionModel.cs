using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Wcf.Servicio.Models
{
    public class UsuariosModel
    {
        public int ID_USUARIO { get; set; }
        public string NOMBRE { get; set; }
        public string LOGIN { get; set; }
        public string CONTRASEÑA { get; set; }
        public System.DateTime FECHA_ALTA { get; set; }
        public Nullable<System.DateTime> FECHA_CADUCIDAD { get; set; }
        public int ID_PERFIL { get; set; }
        public int? ID_UNIDAD { get; set; }
        public string PERFIL { get; set; }
        public string UNIDAD { get; set; }
        //public int MyProperty { get; set; }
        public string ESTADO { get; set; }
    }
    public class MenuOpcionesModel
    {
        public int ID_MENU { get; set; }
        public string MENU { get; set; }
        public string CLASE { get; set; }
        public string TOOLTIP { get; set; }
        public string ICONCCS { get; set; }
        public Nullable<int> ID_PADRE { get; set; }
        public string ESTADO { get; set; }
    }
}