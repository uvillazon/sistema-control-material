<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteExistenciaLogistico.aspx.cs" Inherits="EMI.Website.Reportes.ReporteExistenciaLogistico" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" Height="496px" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="990px">
            <LocalReport ReportEmbeddedResource="EMI.Website.Reportes.ReporteExistenciaLogistico.rdlc" ReportPath="Reportes\ReporteExistenciaLogistico.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="ReporteExistenciasMatLogistico" TypeName="EMI.Website.Reportes.ReporteDataSource, EMI.Website, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null">
            <SelectParameters>
                 <asp:QueryStringParameter DefaultValue="" Name="ANIO" Type="String" QueryStringField ="ANIO"></asp:QueryStringParameter>
                <asp:QueryStringParameter DefaultValue="" Name="MES" Type="String" QueryStringField ="MES"></asp:QueryStringParameter>
                <asp:QueryStringParameter DefaultValue="" Name="ID_UNIDAD" Type="Int32" QueryStringField ="ID_UNIDAD"></asp:QueryStringParameter>
               
            </SelectParameters>
        </asp:ObjectDataSource>
    </form>
</body>
</html>
