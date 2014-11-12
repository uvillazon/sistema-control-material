using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace EMI.Website.Models
{
    public class LogErrores
    {
        private string logExito = "LogExito.txt";
        private string logFallido = "LogFallido.txt";
        public void logcreateFile(string text, string dir)
        {

            StreamWriter log;
            string logarchivo = string.Format("{0} {1}", HttpContext.Current.Server.MapPath("~/Log/"), dir);
            if (!File.Exists(logarchivo))
            {
                log = new StreamWriter(logarchivo);
            }
            else
            {
                log = File.AppendText(logarchivo);
            }
            log.WriteLine("Fecha:" + DateTime.Now);
            log.WriteLine(text);
            log.Close();
        }
        public void InicioOk(string username)
        {
            var cur = HttpContext.Current.Request; //HttpContext.Current.Request;
            String clientIP = cur.ServerVariables["REMOTE_ADDR"];

            StringBuilder content2 = new StringBuilder("Exito");
            content2 = content2.Append(string.Format(" IP CLIENTE : {0}", clientIP));
            content2 = content2.Append(string.Format(" USUARIO SISTEMA : {0}", username));
            content2 = content2.Append(string.Format(" USUARIO WINDOWS : {0}", Environment.UserName));
            content2 = content2.Append(string.Format(" NAVEGADOR : {0}", cur.ServerVariables["HTTP_USER_AGENT"]));
            content2 = content2.Append(Environment.NewLine);
            logcreateFile(content2.ToString(), logExito);

        }
        public void FalloLogin(string username)
        {
            var cur = HttpContext.Current.Request; //HttpContext.Current.Request;
            String clientIP = cur.ServerVariables["REMOTE_ADDR"];
            StringBuilder content2 = new StringBuilder("Intento Fallido");
            //foreach (var item in cur.ServerVariables)
            //{
            //    content2 = content2.Append(string.Format(" {1} : {0}", item.ToString(), cur.ServerVariables[item.ToString()]));
            //    //string i = cur.ServerVariables[item.ToString()];
            //}
            //StringBuilder content2 = new StringBuilder("Intento Fallido");
            content2 = content2.Append(string.Format(" IP CLIENTE : {0}", clientIP));
            content2 = content2.Append(string.Format(" USUARIO SISTEMA : {0}", username));
            content2 = content2.Append(string.Format(" USUARIO WINDOWS : {0}", Environment.UserName));
            content2 = content2.Append(string.Format(" NAVEGADOR : {0}", cur.ServerVariables["HTTP_USER_AGENT"]));
            content2 = content2.Append(Environment.NewLine);
            logcreateFile(content2.ToString(), logFallido);
        }
    }
}