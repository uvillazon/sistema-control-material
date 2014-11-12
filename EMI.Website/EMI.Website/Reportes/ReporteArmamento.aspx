<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteArmamento.aspx.cs" Inherits="EMI.Website.Reportes.ReporteArmamento" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Height="800px" Width="1038px" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportEmbeddedResource="EMI.Website.Reportes.ReporteArmamento.rdlc" ReportPath="Reportes\ReporteArmamento.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="ReporteArmamento" TypeName="EMI.Website.Reportes.ReporteDataSource, EMI.Website, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="" Name="ID_MAT_BELICO" Type="Int32" QueryStringField ="ID_MAT_BELICO"/>
                <asp:QueryStringParameter DefaultValue="" Name="ID_UNIDAD" Type="Int32" QueryStringField ="ID_UNIDAD"/>
            </SelectParameters>
        </asp:ObjectDataSource>
    </form>
</body>
</html>


<%--<asp:ObjectDataSource ID="ObjectDataSource2" runat="server" 
        SelectMethod="ReporteUtilidadVentaEstimada" 
        TypeName="CityTruck.WebSite.Reportes.SourceReport">
        <SelectParameters>
            <asp:QueryStringParameter DefaultValue="2014" Name="ANIO" 
                QueryStringField="ANIO" Type="String" />
            <asp:QueryStringParameter DefaultValue="01" Name="MES" QueryStringField="MES" 
                Type="String" />
        </SelectParameters>
    </asp:ObjectDataSource>--%>