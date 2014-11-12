using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Emi.Wcf.Servicio.Test
{
    [TestClass]
    public class Materiales
    {
        [TestMethod]
        public void ObtenerMaterialBelicoPorIdTest()
        {
            var obj = new MaterialesBelicosLogisticosService.MaterialesBelicosLogisticosClient();

            var material = obj.ObtenerMaterialBelicoPorID(14, 2);
            Assert.IsFalse(material.NOMBRE == null && material.CALIBRE == null);

        }

    }
}
