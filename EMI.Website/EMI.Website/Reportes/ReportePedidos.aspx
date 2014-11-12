<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportePedidos.aspx.cs" Inherits="EMI.Website.Reportes.ReportePedidos" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" Height="600px" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="1103px">
            <LocalReport ReportEmbeddedResource="EMI.Website.Reportes.ReportePedidos.rdlc"  ReportPath="Reportes\ReportePedidos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="ReporteDetallesPedido" TypeName="EMI.Website.Reportes.ReporteDataSource, EMI.Website, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="" Name="FECHA_INI" Type="DateTime" QueryStringField ="FECHA_INI"/>
                <asp:QueryStringParameter DefaultValue="" Name="FECHA_FIN" Type="DateTime" QueryStringField ="FECHA_FIN"/>
                <asp:QueryStringParameter DefaultValue="" Name="ID_UNIDAD" Type="Int32" QueryStringField ="ID_UNIDAD"/>
             
            </SelectParameters>
        </asp:ObjectDataSource>
    </form>
</body>
</html>
