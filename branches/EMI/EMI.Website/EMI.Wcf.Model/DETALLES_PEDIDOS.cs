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
    
    public partial class DETALLES_PEDIDOS
    {
        public DETALLES_PEDIDOS()
        {
            this.DESPACHOS = new HashSet<DESPACHOS>();
        }
    
        public int ID_DETALLE { get; set; }
        public int ID_PEDIDO { get; set; }
        public Nullable<int> ID_MAT_BELICO { get; set; }
        public Nullable<int> ID_MAT_LOGISTICO { get; set; }
        public int CANTIDAD_SOLICITADA { get; set; }
        public Nullable<int> CANTIDAD_ENTREGADA { get; set; }
        public string ESTADO { get; set; }
    
        public virtual MAT_LOGISTICOS MAT_LOGISTICOS { get; set; }
        public virtual PEDIDOS PEDIDOS { get; set; }
        public virtual MAT_BELICOS MAT_BELICOS { get; set; }
        public virtual ICollection<DESPACHOS> DESPACHOS { get; set; }
    }
}
