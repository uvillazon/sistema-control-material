using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;
using Newtonsoft.Json;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioDESPACHOS : RepositorioBase<DESPACHOS>
    {
        public RepositorioDESPACHOS() : base() { }

        public string GuardarDespacho(DESPACHOS despacho, string login)
        {
            despacho.ID_DESPACHO = ObtenerId();
            despacho.LOGIN = login;
            despacho.FECHA_REG = DateTime.Now;
            despacho.ESTADO = "DESPACHADO";

            var cantidadSolicitada = _dbContext.DETALLES_PEDIDOS.Where(x => x.ID_DETALLE == despacho.ID_DETALLE).FirstOrDefault().CANTIDAD_SOLICITADA;
            var cantidadEntregada = _dbContext.DESPACHOS.Where(x => x.ID_DETALLE == despacho.ID_DETALLE).Count() > 0 ? _dbContext.DESPACHOS.Where(x => x.ID_DETALLE == despacho.ID_DETALLE).Sum(y => y.CANTIDAD_ENTREGADA) : 0;
            //verificacion de despachos con el total a entregar no tiene que exceder lo entregado por lo solicitado
            if (cantidadSolicitada < cantidadEntregada + despacho.CANTIDAD_ENTREGADA)
            {
                int cant = cantidadEntregada + despacho.CANTIDAD_ENTREGADA;
                return "No puede DESPACHAR mas de lo SOLICITADO Cantidad Solicitada" + cantidadSolicitada + "/Cantidad Entregada : " + cant;
            }
            try
            {
                Crear(despacho);
                GuardarCambios();
                GuardarHistorico(despacho, "CREACION", despacho.ID_DESPACHO, login);
                return despacho.ID_DESPACHO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string GuardarRepcecion(int ID_DESPACHO, string login)
        {
            try
            {
                var despacho = BuscarPorCriterio(x => x.ID_DESPACHO == ID_DESPACHO);
                despacho.ESTADO = "RECEPCIONADO";
                despacho.LOGIN_RECEP = login;
                GuardarCambios();
                GuardarHistorico(despacho, "RECEPCIONAR", despacho.ID_DESPACHO, login);
                return despacho.ID_DESPACHO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string GuardarDetalleDespacho(string detalles, DateTime FECHA, string usuario)
        {
            string result = "";
            if (detalles != "false")
            {
                dynamic det = JsonConvert.DeserializeObject(detalles);
                try
                {
                    foreach (var item in det)
                    {
                        DESPACHOS detalle = new DESPACHOS()
                        {
                            ID_DETALLE = item.ID_DETALLE,
                            ID_ITEM_ARMAMENTO = item.ID_ITEM_ARMAMENTO,
                            ID_ITEM_LOGISTICO = item.ID_ITEM_LOGISTICO,
                            CANTIDAD_ENTREGADA = item.CANTIDAD_ENTREGADA,
                            ESTADO = item.ESTADO,
                            FECHA = FECHA,
                            //LOGIN = usuario

                            //CANTIDAD_SOLICITADA = item.CANTIDAD_SOLICITADA,
                            //CANTIDAD_ENTREGADA = 0,
                            //ID_MAT_BELICO = item.ID_MAT_BELICO == 0 ? null : item.ID_MAT_BELICO,
                            //ID_MAT_LOGISTICO = item.ID_MAT_LOGISTICO == 0 ? null : item.ID_MAT_LOGISTICO,

                        };

                        result =  GuardarDespacho(detalle, usuario);
                        GuardarHistorico(detalle, "CREACION", detalle.ID_DESPACHO, usuario);
                        //Crear(detalle);
                        //GuardarCambios();
                    }
                    return result;
                }
                catch (Exception e)
                {
                    return e.ToString();
                }
            }
            else
            {
                return "1";
            }
        }
    }
}
