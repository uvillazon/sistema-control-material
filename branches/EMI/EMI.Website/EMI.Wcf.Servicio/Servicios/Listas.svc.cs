using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Aplicacion.Servicios;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Listas" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Listas.svc o Listas.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class Listas : IListas
    {
        ListasServicio aplLista = new ListasServicio();
        public ListasServicio<ListasItemsModel> ObtenerListasItems(Paginacion paginacion, FiltrosModel<ListasItemsModel> filtros)
        {
            //crear instancia de la respuesta
            ListasServicio<ListasItemsModel> result = new ListasServicio<ListasItemsModel>();
            try
            {
                var listas = aplLista.ObtenerListasItems(paginacion, filtros);
                var datos = listas.Select(x => new ListasItemsModel()
                {
                     CODIGO= x.CODIGO,
                     VALOR = x.VALOR,
                     ID_LISTA = x.ID_LISTA,
                     ID_TABLA = x.ID_TABLA,
                     ESTADO = x.ESTADO
                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {

                //result.datos = datos;
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }

        public ListasServicio<ListasModel> ObtenerListas(Paginacion paginacion,FiltrosModel<ListasModel> filtros)
        {
            //crear instancia de la respuesta
            ListasServicio<ListasModel> result = new ListasServicio<ListasModel>();
            try
            {
                var listas = aplLista.ObtenerListas(paginacion, filtros);
                var datos = listas.Select(x => new ListasModel()
                {
                    LISTA = x.LISTA,
                    ID_LISTA = x.ID_LISTA,
                    DESCRIPCION = x.DESCRIPCION,
                    MAYUS_MINUS = x.MAYUS_MINUS,
                    TAM_LIMITE = (short?)x.TAM_LIMITE,
                    TIPO_VALOR = x.TIPO_VALOR

                }).ToList();
                result.total = paginacion.total;
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public ListasServicio<ListasModel> ObtenerTodasListas()
        {
            //crear instancia de la respuesta
            ListasServicio<ListasModel> result = new ListasServicio<ListasModel>();
            try
            {
                var listas = aplLista.ObtenerTodasListas();
                var datos = listas.Select(x => new ListasModel()
                {
                    LISTA = x.LISTA,
                    ID_LISTA = x.ID_LISTA,

                }).ToList();
                result.total = datos.Count();
                result.datos = datos;
                result.msg = "Exito";
                result.success = true;
                return result;
            }
            catch (Exception e)
            {
                result.msg = string.Format("Error Ocurrio {0}", e.ToString());
                result.success = false;
                return result;
            }
        }


        public RespuestaServicio GuardarLista(Model.LISTAS1 lista, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplLista.GuardarLista(lista, usuario);
            return result;
        }

        public RespuestaServicio GuardarItemLista(Model.LISTAS_ITEMS lista, string usuario)
        {
            RespuestaServicio result = new RespuestaServicio();
            result = aplLista.GuardarItemLista(lista, usuario);
            return result;
        }
    }
}
