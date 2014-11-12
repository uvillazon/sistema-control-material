using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IMaterialesServicio
    {
        RespuestaServicio GuardarMaterialBelico(MATERIALES_BELICOS material ,string usuario);
        RespuestaServicio EliminarMaterialBelico(int ID , string usuario);
        IQueryable<MATERIALES_BELICOS> ObtenerMaterialesPaginados(Paginacion paginacion);
        MATERIALES_BELICOS ObtenerMaterial(int ID);
        //Res
    }
}
