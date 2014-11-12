using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioITEMS_ARMAMENTO : RepositorioBase<ITEMS_ARMAMENTO>
    {
        public RepositorioITEMS_ARMAMENTO() : base() { }

        public string GuardarItemArmamento(ITEMS_ARMAMENTO item, string login) {

            item.ID_ITEM = ObtenerId();
            item.LOGIN = login;
            item.FECHA_REG = DateTime.Now;
            if (!SiExiste(x => x.NRO_FUSIL == item.NRO_FUSIL))
            {
                return "Existe un Items con el mismo codigo" + item.NRO_FUSIL;
            }
            try
            {
                Crear(item);
                GuardarHistorico(item, "CREACION", item.ID_ITEM, login);
                GuardarCambios();
                return item.ID_ITEM.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string EditarItemArmamento(ITEMS_ARMAMENTO item, string login)
        {
            try
            {
                var itemEditar = BuscarPorCriterio(x => x.ID_ITEM == item.ID_ITEM);
                itemEditar.ID_MAT_BELICO = item.ID_MAT_BELICO;
                itemEditar.ID_UNIDAD = item.ID_UNIDAD;
                //itemEditar.OBSERVACION_BAJA =item.
                GuardarCambios();
                GuardarHistorico(item, "EDICION", item.ID_ITEM, login);
                return itemEditar.ID_ITEM.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string BajaItemArmamento(ITEMS_ARMAMENTO item, string login)
        {
            try
            {
                var itemEditar = BuscarPorCriterio(x => x.ID_ITEM == item.ID_ITEM);
                itemEditar.OBSERVACION_BAJA = item.OBSERVACION_BAJA;
                itemEditar.FECHA_BAJA = item.FECHA_BAJA;
                itemEditar.LOGIN_BAJA = login;
                itemEditar.ESTADO = item.ESTADO;
                //itemEditar.OBSERVACION_BAJA =item.
                GuardarCambios();
                GuardarHistorico(item, "BAJA", item.ID_ITEM, login);
                return itemEditar.ID_ITEM.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        
    }
}
