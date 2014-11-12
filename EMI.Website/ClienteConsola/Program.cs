using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClienteConsola
{
    class Program
    {
        static void Main(string[] args)
        {
            var ser = new ServiceReference1.TablasClient();
            var ip = new ServiceReference2.P2GeoSoapClient();
            //ip.Country
            var  result = ip.ResolveIP("200.58.79.117", "123");
            //result.Country.tos
            foreach (var item in ser.ObtenerTablas())
            {
                Console.WriteLine(item.DESCRIPCION +" "+ result.Country);
                
            }
            Console.ReadKey();
        }
    }
}
