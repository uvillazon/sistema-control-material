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
    
    public partial class COMPONENTES_ITEMS
    {
        public int ID_CMP { get; set; }
        public int ID_ITEM { get; set; }
        public string NOMBRE { get; set; }
        public string CODIGO { get; set; }
    
        public virtual ITEMS_ARMAMENTO ITEMS_ARMAMENTO { get; set; }
    }
}
