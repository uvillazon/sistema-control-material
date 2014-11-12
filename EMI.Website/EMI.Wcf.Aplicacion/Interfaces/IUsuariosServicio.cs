using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IUsuariosServicio
    {

        IQueryable<USUARIOS> ObtenerUsuariosPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros);
        IQueryable<PERFILES> ObtenerPerfilesPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros);
        USUARIOS ObtenerUsuario(Expression<Func<USUARIOS, bool>> criterios);


        RespuestaServicio GuardarUsuario(USUARIOS usr);

    }
}
