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
    
    public partial class MUNICIONES_UNIDADES
    {
        public MUNICIONES_UNIDADES()
        {
            this.MOV_MUNICIONES_UNIDADES = new HashSet<MOV_MUNICIONES_UNIDADES>();
            this.SALIDADES_MUNICIONES = new HashSet<SALIDADES_MUNICIONES>();
        }
    
        public int ID_MUNICION_UNIDAD { get; set; }
        public int ID_MAT_BELICO { get; set; }
        public int ID_UNIDAD { get; set; }
        public int CANTIDAD_DISPONIBLE { get; set; }
    
        public virtual ICollection<MOV_MUNICIONES_UNIDADES> MOV_MUNICIONES_UNIDADES { get; set; }
        public virtual UNIDADES UNIDADES { get; set; }
        public virtual ICollection<SALIDADES_MUNICIONES> SALIDADES_MUNICIONES { get; set; }
        public virtual MAT_BELICOS MAT_BELICOS { get; set; }
    }
}