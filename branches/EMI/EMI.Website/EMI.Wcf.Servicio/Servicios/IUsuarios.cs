using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Servicio.Models;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IUsuarios" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IUsuarios
    {
        [OperationContract]
        ListasServicio<UsuarioModelResp> ObtenerUsuariosPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros);

        [OperationContract]
        ListasServicio<UsuarioModelResp> ObtenerPerfilesPaginados(Paginacion paginacion, FiltrosModel<UsuarioModel> filtros);

        [OperationContract]
        RespuestaServicio GuardarUsuario(Model.USUARIOS usr);

        [OperationContract]
        RespuestaServicio GuardarContrasena(string login, string contrasena);

        [OperationContract]
        RespuestaServicio DesbloquearContrasena(int ID_USUARIO);
    }
}
