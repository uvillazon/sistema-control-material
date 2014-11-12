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
    public class RepositorioDETALLES_PEDIDOS : RepositorioBase<DETALLES_PEDIDOS>
    {
        public RepositorioDETALLES_PEDIDOS() : base() { }
        public string GuardarDetallePedido(string detalles, PEDIDOS ped)
        {
            if (BuscarTodos(x => x.ID_PEDIDO == ped.ID_PEDIDO).Count() > 0)
            {
                Eliminar(x => x.ID_PEDIDO == ped.ID_PEDIDO);
                GuardarCambios();
            }
            if (detalles != "false")
            {
                dynamic det = JsonConvert.DeserializeObject(detalles);
                try
                {
                    foreach (var item in det)
                    {
                        DETALLES_PEDIDOS detalle = new DETALLES_PEDIDOS()
                        {
                            ID_DETALLE = ObtenerId(),
                            ID_PEDIDO = ped.ID_PEDIDO,
                            CANTIDAD_SOLICITADA = item.CANTIDAD_SOLICITADA,
                            CANTIDAD_ENTREGADA = 0,
                            ID_MAT_BELICO = item.ID_MAT_BELICO == 0 ? null : item.ID_MAT_BELICO,
                            ID_MAT_LOGISTICO = item.ID_MAT_LOGISTICO == 0 ? null : item.ID_MAT_LOGISTICO,

                        };
                        Crear(detalle);
                        GuardarHistorico(detalle, "CREACION", detalle.ID_DETALLE, "-");
                        GuardarCambios();
                    }
                    return "1";
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
