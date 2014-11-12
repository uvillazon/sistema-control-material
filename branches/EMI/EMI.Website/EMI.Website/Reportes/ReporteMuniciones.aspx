<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteMuniciones.aspx.cs" Inherits="EMI.Website.Reportes.ReporteMuniciones" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Height="573px" Width="1123px" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportEmbeddedResource="EMI.Website.Reportes.ReporteMuniciones.rdlc" ReportPath="Reportes\ReporteMuniciones.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="ReporteMuniciones" TypeName="EMI.Website.Reportes.ReporteDataSource, EMI.Website, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null">
            <SelectParameters>
              
                <asp:QueryStringParameter DefaultValue="" Name="ID_MUNICION_UNIDAD" Type="Int32" QueryStringField ="ID_MUNICION_UNIDAD"/>
                <asp:QueryStringParameter DefaultValue="" Name="ID_UNIDAD" Type="Int32" QueryStringField ="ID_UNIDAD"/>
            </SelectParameters>
        </asp:ObjectDataSource>
    </form>
</body>
</html>
