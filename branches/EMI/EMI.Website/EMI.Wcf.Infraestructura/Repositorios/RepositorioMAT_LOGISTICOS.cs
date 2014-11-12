using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioMAT_LOGISTICOS : RepositorioBase<MAT_LOGISTICOS>
    {
        public RepositorioMAT_LOGISTICOS() : base() { }
        public string GuardarMatLogistico(MAT_LOGISTICOS material, string login)
        {
            material.ID_MAT_LOGISTICO = ObtenerId();
            material.LOGIN = login;
            material.FECHA_REG = DateTime.Now;
            if (!SiExiste(x => x.CODIGO == material.CODIGO))
            {
                return "Existe un Items con el mismo codigo" + material.CODIGO;
            }
            try
            {
                Crear(material);
                GuardarCambios();
                GuardarHistorico(material, "CREACION", material.ID_MAT_LOGISTICO, login);
                return material.ID_MAT_LOGISTICO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string EditarMatLogistico(MAT_LOGISTICOS materiales, string login)
        {
            try
            {
                var itemEditar = BuscarPorCriterio(x => x.ID_MAT_LOGISTICO == materiales.ID_MAT_LOGISTICO);
                itemEditar.FABRICANTE = materiales.FABRICANTE;
                itemEditar.TIPO_COMPONENTE = materiales.TIPO_COMPONENTE;
                itemEditar.AERONAVE = materiales.AERONAVE;
                itemEditar.FECHA_DOTACION = materiales.FECHA_DOTACION;
                itemEditar.DESCRIPCION = materiales.DESCRIPCION;
                itemEditar.GRUPO = materiales.GRUPO;
                itemEditar.NRO_PARTE = materiales.NRO_PARTE;
                itemEditar.CICLO_VIDA = materiales.CICLO_VIDA;
                itemEditar.HORA_VIDA = materiales.HORA_VIDA;
                GuardarCambios();
                GuardarHistorico(materiales, "EDIDICON", materiales.ID_MAT_LOGISTICO, login);
                return itemEditar.ID_MAT_LOGISTICO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
