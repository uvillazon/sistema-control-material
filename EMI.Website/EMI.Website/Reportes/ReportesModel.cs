using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMI.Website.Reportes
{
    public class ReporteArmamentoModel
    {
        public string UNIDAD { get; set; }
        public string ARMAMENTO { get; set; }
        public int CANTIDAD { get; set; }
        public DateTime? FECHA_DOTACION { get; set; }
        public string FABRICACION { get; set; }
        public string CALIBRE { get; set; }
        public string NRO_FUSIL { get; set; }
        public string NRO_CIERRE { get; set; }
        public string NRO_CANON { get; set; }
        public string NRO_CORREDERA { get; set; }
        public string OPERABLE { get; set; }
        public string NO_OPERABLE { get; set; }
        public string OBSERVACIONES { get; set; }
        public string PROCEDENCIA { get; set; }
        public int TOTAL { get; set; }
    }
    public class ReporteExistenciaModel
    {
        public string GRUPO { get; set; }
        public string DETALLE { get; set; }
        public int EXISTENCIA_ANTERIOR { get; set; }
        public int ALTA { get; set; }
        public int BAJAS { get; set; }
        public int PERDIDAS { get; set; }
        public string NOTA { get; set; }
        public string UNIDAD { get; set; }
        public int ID_UNIDAD { get; set; }
        public DateTime FECHA { get; set; }

    }
    public class ReporteDetallePedidoModel
    {
        //mensajede respuesta
        public string UNIDAD { get; set; }
        public string DETALLE { get; set; }
        public int ID_PEDIDO { get; set; }
        public string CODIGO { get; set; }
        public int CANTIDAD_SOLICITADA { get; set; }
        public int CANTIDAD_ENTREGADA { get; set; }
        public DateTime FECHA { get; set; }
        public string ESTADO_DETALLE { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
        public string CATEGORIA { get; set; }
        public string ESTADO_RECEPCION { get; set; }
        //public int? ID_DETALLE { get; set; }
    }
    
}