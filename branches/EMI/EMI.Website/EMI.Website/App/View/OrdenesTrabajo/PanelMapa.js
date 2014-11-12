Ext.define("App.View.OrdenesTrabajo.PanelMapa", {
    extend: "App.Config.ux.GMapPanelv02",
    title: "",
    height: Constantes.ALTO - 120,
    zoomLevel: 15,
    title: 'Localizacion por OT',
    iconCls: 'map',
    //map : null,
    markers: [],
    setCenter: {
        'lat': -17.4194,
        'lng': -66.1325,
    },
    initComponent: function () {
        this.callParent(arguments);
    },
    CargarPuntos: function (record) {
        var me = this;
        //me.panelMapa.hideMarkers();
        me.clearMarkers();
        //alert(record.lng);
        var latlng = new google.maps.LatLng(record.lat, record.lng);

        //var marker = new google.maps.Marker({
        //    position: latlng,
        //    zoom: 15,
        //    map: me.gmap
        //});
        me.addMarker(latlng);
        me.gmap.setCenter(latlng);
        //google.maps.event.addListener(marker, 'click', function () {
        //    infowindow.open(map, marker);
        //});
        me.on('click', function () {
            alert("asdasd");
        });
    },
    clearMarkers: function () {
        this.setAllMap(null);
        //var me = this;
        //alert(map);
        //for (var i = 0; i < me.markers.length; i++) {
        //    me.markers[i].setMap(map);
        //}
    },
    setAllMap: function (map) {
        //alert(map);
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    },
    addMarker: function (location) {
        var me = this;
        var contentString = '<div>' +
      '<div>' +
      '</div>' +
      '<h1 class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>';
        var image = Constantes.HOST + 'Content/images/poste_map.png';
        var marker = new google.maps.Marker({
            position: location,
            map: this.gmap,
            icon: image,
            title: 'POSTE 1',
            labelContent: "$425K",
            //draggable: true,
            //animation: google.maps.Animation.DROP
        });
        //var marker = new MarkerWithLabel({
        //    position: location,
        //    map: this.gmap,
        //    icon: image,
        //    //draggable: true,
        //    //raiseOnDrag: true,
        //    labelContent: "A123AS",
        //    //labelAnchor: new google.maps.Point(3, 30),
        //    labelClass: "LabelMap", // the CSS class for the label
        //    labelInBackground: false
        //});
       
        google.maps.event.addListener(marker, 'click', function () {
            alert("dasd");
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            infowindow.open(this.gmap, marker);
        });
        this.markers.push(marker);
        //google.maps.event.addDomListener(window, 'load', initialize);
    },
    clickEvent: function (obj) {

    },

});
