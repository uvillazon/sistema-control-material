using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMI.Wcf.Aplicacion.Modelo
{
    public class FiltrosModel<TEntity> where TEntity : class 
    {
        private string operador = " and ";
        private string comparador = " == ";
        public string Contiene { get; set; }
        public TEntity Entidad { get; set; }
        //public string Estados { get; set; }
        public string[] Estados { get; set; }
        public string[] Unidades { get; set; }
        //public string[] tiposOT { get; set; }//SE AGREGO PARA FILTRAR POR TIPO DE OT
        //public string[] tiposSM { get; set; }
        //public string[] tipos { get; set; } //GENERICO PARA TODOS LOS TIPOS DE FILTROS QUE SE PUEDA USAR EN UNA ENTIDAD
        //public string[] Responsabilidades { get; set; }//SE AGREGO PARA FILTRAR POR RESPONSABILIDADES
        //public string[] Areas { get; set; }//SE AGREGO PARA FILTRAR POR AREAS
        //public string[] MostrarPara { get; set; }
        public DateTime? FECHA_INICIAL { get; set; }
        public DateTime? FECHA_FINAL { get; set; }

        public string Predicado { get; set; }
        public Dictionary<string,object> Diccionario { get; set; }

        public string Operador 
        {
            set { operador = string.Format(" {0} ", value); }
            get { return operador; }
        }

        public string Comparador 
        {
            set { comparador = string.Format(" {0} ", value); }
            get { return comparador; }
        }

        public void FiltrarDatos(){
        
            var propiedades = Entidad
                                .GetType()
                                .GetProperties()
                                .Where(x => x != null && x.GetValue(Entidad,null)!= null);

            //Creacion de un diccionario que contendrá nombre de la propiedad y valor
            Diccionario = propiedades.ToDictionary(propiedad => propiedad.Name,
                                                      propiedad => propiedad.GetValue(Entidad,null));

            //Creacion del predicado
            IEnumerable<string> filtro = Diccionario.Keys.Select((clave, index) => string.Format("{0} == @{1}", clave, index));
            Predicado = string.Join(" and ", filtro);
        //}
        //    //Separacion de las propiedades que el usuario no uso
        //    var propiedades = Entidad
        //                        .GetType()
        //                        .GetProperties()
        //                        .Where(x => x != null && x.GetValue(Entidad) != null);

        //    //Creacion de un diccionario que contendrá nombre de la propiedad y valor
        //    Diccionario = propiedades.ToDictionary(propiedad => propiedad.Name,
        //                                              propiedad => propiedad.GetValue(Entidad));

        //    //Creacion del predicado
        //    IEnumerable<string> filtro = Diccionario.Keys.Select((clave, index) => string.Format("{0}" + Comparador + "@{1}", clave, index));
        //    Predicado = string.Join(Operador, filtro);
        }
    }
}
