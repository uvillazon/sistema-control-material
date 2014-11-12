Ext.define("App.View.Principal.PanelInfo", {
    extend: "Ext.panel.Panel",
    autoHeigth: true,
    autoWidht: true,
    autoScroll: true,
    viewConfig: {
        forceFit: true,
    },
    //    title:'DIAGRAMAS TRANSICION ESTADOS',
    defaults: {
        bodyStyle: 'padding:2px'
    },
    activeTab: 0,
    data: '',

    initComponent: function () {

        var me = this;
        me.html = '<IMG SRC="Content/images/Immagine.png" width="' + Constantes.MAXANCHO + '" height="725">';
        //var direccion = "file:///C:/Users/Familia/Documents/startpage/index2.html";
        //me.html = '<iframe name="ManualUsuario"  frame" src="file:///C:/Users/Familia/Documents/startpage/index2.html" frameborder="0" width=100% height="100%" scrolling="yes"></iframe>';
       
        this.callParent(arguments);

    }
});