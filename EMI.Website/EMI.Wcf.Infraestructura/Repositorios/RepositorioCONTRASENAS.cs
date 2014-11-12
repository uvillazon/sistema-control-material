using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Elfec.SisMan.Infraestructura.Repositorios;
using EMI.Wcf.Model;
using Newtonsoft.Json;

namespace EMI.Wcf.Infraestructura.Repositorios
{
    public class RepositorioCONTRASENAS : RepositorioBase<CONTRASENAS>
    {
        private int dias = 5;
        private int nroFallidos = 3;
        public RepositorioCONTRASENAS() : base() { }

        public string VerificarContrasena(int ID_USUARIO, string contrasena)
        {
            var verificar = BuscarPorCriterio(x => x.ID_USUARIO == ID_USUARIO && x.ESTADO == "ACTIVO");
            if (contrasena == verificar.CONTRASENA)
            {
                if (verificar.NRO_FALLIDO >= nroFallidos)
                {
                    return string.Format("Su cuenta fue Bloqueada en fecha : {0}", verificar.FECHA_BLOQUEO.Value.ToString("dd/MM/yyyy"));
                }
                verificar.NRO_FALLIDO = 0;
                GuardarCambios();
                if (DateTime.Now > verificar.FECHA_EXPIRACION)
                {
                    return string.Format("La contrasena ya Expiro en fecha : {0}", verificar.FECHA_EXPIRACION);
                }
                else
                {
                    if (DateTime.Now.AddDays(dias) > verificar.FECHA_EXPIRACION)
                    {
                        TimeSpan difer = verificar.FECHA_EXPIRACION - DateTime.Now;
                        int diaExpira = Convert.ToInt16(difer.Days);
                        return diaExpira.ToString();
                    }
                    else
                    {
                        return "Exito";
                    }
                }
                //DateTime hoy = DateTime.Now.AddDays(-5);
                //if( hoy < verificar.FECHA_EXPIRACION )

            }
            else
            {
                
                    verificar.NRO_FALLIDO = verificar.NRO_FALLIDO + 1;

                    if (verificar.NRO_FALLIDO >= nroFallidos)
                    {
                        verificar.FECHA_BLOQUEO = DateTime.Now;
                    }
                    GuardarCambios();
                    string msg = verificar.NRO_FALLIDO >= 3 ? "Su cuenta fue Bloqueada" : string.Format("La contrasena no corresponde al Usuario : {0}", verificar.USUARIOS.LOGIN);
                    return msg;
                }
        }
        public string DesbloquearContrasena(int ID_USUARIO)
        {
            var verificar = BuscarPorCriterio(x => x.ID_USUARIO == ID_USUARIO && x.ESTADO == "ACTIVO");
            if (verificar == null)
            {
                return "No existe Contraseña.";
            }
            else
            {
                if (verificar.NRO_FALLIDO >= nroFallidos)
                {
                    verificar.NRO_FALLIDO = 0;
                    verificar.FECHA_BLOQUEO = null;
                    GuardarCambios();
                    return "1";
                }
                else
                {
                    return "Su Contraseña no requiere Desbloquear.";
                }
            }

        }
        public string GuardarContrasena(int ID_USUARIO, string contrasena)
        {
            try
            {
                var anterior = BuscarTodos(x => x.ID_USUARIO == ID_USUARIO && x.ESTADO == "ACTIVO").FirstOrDefault();
                if (anterior != null)
                {
                    anterior.ESTADO = "INACTIVO";
                }
                int cnt = BuscarTodos(x => x.ID_USUARIO == ID_USUARIO && x.CONTRASENA == contrasena).Count();
                if (cnt == 0)
                {
                    CONTRASENAS nuevo = new CONTRASENAS()
                    {
                        CONTRASENA = contrasena,
                        FECHA_ALTA = DateTime.Now,
                        FECHA_EXPIRACION = DateTime.Now.AddMonths(3),
                        ESTADO = "ACTIVO",
                        ID_USUARIO = ID_USUARIO,
                        ID_CONTRASENA = ObtenerId(),
                        NRO_FALLIDO = 0

                    };
                    Crear(nuevo);
                    GuardarCambios();
                    return nuevo.ID_CONTRASENA.ToString();
                }
                else
                {
                    return string.Format("La contraseña ya fue Utilizada anteriormente");
                }
            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }
        /// <summary>
        /// Proceso para cambiar componentes entre un operable y no operable
        /// </summary>
        /// <param name="ID_CMP1">COMPONENTE OPERABLE</param>
        /// <param name="ID_CMP2">COMPONENTE NO OPERABLE</param>
        /// <param name="login">NOMBRE USUARIO</param>
        /// <returns></returns>


    }
}
