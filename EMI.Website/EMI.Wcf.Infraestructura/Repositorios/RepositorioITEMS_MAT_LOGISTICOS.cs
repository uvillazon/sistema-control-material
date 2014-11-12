using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioITEMS_MAT_LOGISTICOS : RepositorioBase<ITEMS_MAT_LOGISTICOS>
    {
        public RepositorioITEMS_MAT_LOGISTICOS() : base() { }
        public string GuardarItemMatLogiscitos(ITEMS_MAT_LOGISTICOS material, string login)
        {
            material.ID_ITEM = ObtenerId();
            material.LOGIN = login;
            material.FECHA_REG = DateTime.Now;
            if (!SiExiste(x => x.NRO_SERIE == material.NRO_SERIE))
            {
                return "Existe un Items con el mismo codigo" + material.NRO_SERIE;
            }
            try
            {
                Crear(material);
                GuardarHistorico(material, "CREACION", material.ID_ITEM, login);
                GuardarCambios();
                return material.ID_ITEM.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string EditarItemMatLogistico(ITEMS_MAT_LOGISTICOS materiales, string login)
        {
            try
            {
                var itemEditar = BuscarPorCriterio(x => x.ID_ITEM == materiales.ID_ITEM);
                itemEditar.ID_MAT_LOGISTICO = materiales.ID_MAT_LOGISTICO;
                itemEditar.ID_UNIDAD = materiales.ID_UNIDAD;
                GuardarCambios();
                GuardarHistorico(materiales, "EDICION", materiales.ID_ITEM, login);
                return itemEditar.ID_ITEM.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
