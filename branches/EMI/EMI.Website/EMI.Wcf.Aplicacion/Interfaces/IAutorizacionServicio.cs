using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMI.Wcf.Aplicacion.Modelo;
using EMI.Wcf.Model;

namespace EMI.Wcf.Aplicacion.Interfaces
{
    interface IAutorizacionServicio
    {
        RespuestaServicio VerificarUsuario(string usuario, string contrasena);

        USUARIOS ObtenerUsuario(string usuario);
        string Encriptar(string _cadenaAencriptar);
        string DesEncriptar(string _cadenaAdesencriptar);

        RespuestaServicio GuardarContrasena(int ID_USUARIO, string contrasena);
        RespuestaServicio DesbloquearContrasena(int ID_USUARIO);

    }
}
