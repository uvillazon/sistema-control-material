using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Emi.Wcf.Servicio.Test
{
    [TestClass]
    public class Reportes
    {
        [TestMethod]
        public void ObtenerDetallePedidoTest()
        {
            var obj = new ReportesService.ReportesClient();
            var list = obj.ObtenerDetallePedido(DateTime.Now.AddMonths(-1), DateTime.Now.AddMonths(2), 1);
            int cnt = 0;
            foreach (var item in list)
            {
                cnt++;
            }
            //List<ReportesService.DetallePedidoModel> list = obj.ObtenerDetallePedido(DateTime.Now.AddMonths(-1), DateTime.Now, 1);
            Assert.IsTrue(cnt > 0 );
        }
    }
}
