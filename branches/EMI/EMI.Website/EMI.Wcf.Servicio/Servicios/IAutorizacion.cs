using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;
using EMI.Wcf.Servicio.Models;

namespace EMI.Wcf.Servicio.Servicios
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IAutorizacion" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IAutorizacion
    {
        [OperationContract]
        RespuestaServicio VerificaUsuario(string login, string contrasena);

        [OperationContract]
        ListasServicio<MenuOpcionesModel> ObtenerMenuOpciones(string login);

        [OperationContract]
        UsuariosModel ObtenerUsuario(string login);

    }
}
