using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioMAT_BELICOS : RepositorioBase<MAT_BELICOS>
    {
        public RepositorioMAT_BELICOS() : base() { }

        public string GuardarMuniciones(MAT_BELICOS material, string login) {
            material.ID_MAT_BELICO = ObtenerId();
            material.LOGIN = login;
            material.FECHA_REG = DateTime.Now;
            material.CATEGORIA = "MUNICIONES";
            if (!SiExiste(x => x.CODIGO == material.CODIGO))
            {
                return "Existe un Items con el mismo codigo" + material.CODIGO;
            }
            try
            {
                Crear(material);
                GuardarHistorico(material, "CREACION", material.ID_MAT_BELICO, login);
                GuardarCambios();
                
                return material.ID_MAT_BELICO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        public string EditarMuniciones(MAT_BELICOS materiales, string login)
        {
            try
            {
                var itemEditar = BuscarPorCriterio(x => x.ID_MAT_BELICO == materiales.ID_MAT_BELICO);
                itemEditar.FABRICACION = materiales.FABRICACION;
                itemEditar.CALIBRE = materiales.CALIBRE;
                itemEditar.TIPO = materiales.TIPO;
                itemEditar.FECHA_DOTACION = materiales.FECHA_DOTACION;
                itemEditar.OBSERVACION = materiales.OBSERVACION;

                GuardarCambios();
                GuardarHistorico(materiales, "EDICION", materiales.ID_MAT_BELICO, login);
                return itemEditar.ID_MAT_BELICO.ToString();

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
