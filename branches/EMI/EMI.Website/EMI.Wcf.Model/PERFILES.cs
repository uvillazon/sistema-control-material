//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EMI.Wcf.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class PERFILES
    {
        public PERFILES()
        {
            this.USUARIOS = new HashSet<USUARIOS>();
            this.PERFILES_OPCIONES = new HashSet<PERFILES_OPCIONES>();
        }
    
        public int ID_PERFIL { get; set; }
        public string PERFIL { get; set; }
        public string DESCRIPCION { get; set; }
        public string ESTADO { get; set; }
        public Nullable<int> ID_UNIDAD { get; set; }
    
        public virtual ICollection<USUARIOS> USUARIOS { get; set; }
        public virtual ICollection<PERFILES_OPCIONES> PERFILES_OPCIONES { get; set; }
        public virtual UNIDADES UNIDADES { get; set; }
    }
}
