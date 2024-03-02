const attribution = new ol.control.Attribution({
  collapsible: false
});

const mapView = new ol.View({
  center: ol.proj.fromLonLat([7.35, 52.7]),
  zoom: 14
});

const map = new ol.Map({
  target: "map",
  view: mapView,
  controls: ol.control.defaults().extend([attribution])
  
});

const wmsLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer',
    params: {
      'LAYERS': 'Gewässernetz',
      'TILED': true,
    },
    serverType: 'arcgis',
    crossOrigin: 'anonymous',
  }),
  title: 'hydro',
});


map.addLayer(wmsLayer);




