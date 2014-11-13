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
    
    public partial class ITEMS_MAT_LOGISTICOS
    {
        public ITEMS_MAT_LOGISTICOS()
        {
            this.ITEMS_VERIFICACIONES = new HashSet<ITEMS_VERIFICACIONES>();
            this.DESPACHOS = new HashSet<DESPACHOS>();
        }
    
        public int ID_ITEM { get; set; }
        public Nullable<int> ID_MAT_LOGISTICO { get; set; }
        public string NRO_SERIE { get; set; }
        public Nullable<System.DateTime> FECHA_BAJA { get; set; }
        public string OBSERVACION_BAJA { get; set; }
        public Nullable<int> ID_UNIDAD { get; set; }
        public Nullable<System.DateTime> FECHA_REG { get; set; }
        public string LOGIN { get; set; }
        public string LOGIN_BAJA { get; set; }
        public string ESTADO { get; set; }
    
        public virtual MAT_LOGISTICOS MAT_LOGISTICOS { get; set; }
        public virtual UNIDADES UNIDADES { get; set; }
        public virtual ICollection<ITEMS_VERIFICACIONES> ITEMS_VERIFICACIONES { get; set; }
        public virtual ICollection<DESPACHOS> DESPACHOS { get; set; }
    }
}