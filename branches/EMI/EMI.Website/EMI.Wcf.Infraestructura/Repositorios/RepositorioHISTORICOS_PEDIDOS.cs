using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioHISTORICOS_PEDIDOS : RepositorioBase<HISTORICOS_PEDIDOS>
    {
        public RepositorioHISTORICOS_PEDIDOS() : base() { }
        public string GuardarHistoricoPedido(int ID_PEDIDO, string ESTADO, string login, DateTime FECHA, string Observacion)
        {
            try
            {
                var itemEditar = _dbContext.PEDIDOS.Where(x => x.ID_PEDIDO == ID_PEDIDO).FirstOrDefault();
                var historico = new HISTORICOS_PEDIDOS()
                {
                    ID_PEDIDO = ID_PEDIDO,
                    FECHA = FECHA,
                    ID_HIST = ObtenerId(),
                    LOGIN = login,
                    ESTADO = ESTADO,
                    OBSERVACION = Observacion

                };
                itemEditar.ESTADO = ESTADO;
                Crear(historico);
                GuardarCambios();
                return "1";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
