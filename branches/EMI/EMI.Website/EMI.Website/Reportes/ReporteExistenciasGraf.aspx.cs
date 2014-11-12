using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

namespace EMI.Website.Reportes
{
    public partial class ReporteExistenciasGraf1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Unnamed_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {

            ReporteDataSource report = new ReporteDataSource();
            String ANIO = e.Parameters[1].Values[0].ToString();
            String MES = e.Parameters[2].Values[0].ToString();
            int ID_UNIDAD = Convert.ToInt32(e.Parameters[0].Values[0]);
            var query = report.ReporteExistencias(ANIO, MES, ID_UNIDAD);
            var queryMuniciones = report.ReporteExistenciaMunicion(ANIO, MES, ID_UNIDAD);
            var queryArmamentos = report.ReporteExistenciaArmamento(ANIO, MES, ID_UNIDAD);
            ReportDataSource dataSource = new ReportDataSource("DataSet1", query);
            //ReportDataSource dataSource = new ReportDataSource("DataSetVentaConsumo", query);
            e.DataSources.Add(new ReportDataSource("Municiones", queryMuniciones));
            e.DataSources.Add(new ReportDataSource("Armamentos", queryArmamentos));
            //e.DataSources.Add(new ReportDataSource("DataSetSalida", query2));
            e.DataSources.Add(dataSource);
        }
    }
}