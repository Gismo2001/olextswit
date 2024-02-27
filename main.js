const sleStyle = new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: new ol.style.Fill({color: 'red'}),
      stroke: new ol.style.Stroke({
        color: 'grey',
        width: 2
      }),
      points: 4,
      radius: 7,
      angle: Math.PI / 4
    })
  });

const attribution = new ol.control.Attribution({
    collapsible: false
 });
  ///////////////
const mapView = new ol.View({
    center: ol.proj.fromLonLat([7.35, 52.7]),
    zoom: 9
});
  
const map = new ol.Map({
    target: "map",
    view: mapView,
    controls: ol.control.defaults().extend([attribution])
});
 
const layerSwitcher = new ol.control.LayerSwitcher({ });

map.addControl(layerSwitcher);

//// sle
const exp_bw_sle_layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        return './myLayers/exp_bw_sle.geojson' + '?bbox=' + extent.join(',');
      },
      strategy: ol.loadingstrategy.bbox
    }),
    title: 'sle', // Title for the Layer Switcher
    style: sleStyle,
    visible: true
  });
  
const googleLayer = new ol.layer.Tile({
    title: "GoogleSat",
    type: 'base',
    baseLayer: false,
    visible: false,
    source: new ol.source.TileImage({url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}' })
});

const ESRIWorldImagery = new ol.layer.Tile({
    title: 'ESRI',
    type: 'base',
    opacity: 1.000000,
     visible: false,
     source: new ol.source.XYZ({
        attributions: 'Powered by Esri',
        url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    })
});

const osmTile = new ol.layer.Tile({
    title: "osm",
    type: 'base',
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attributions: ['© OpenStreetMap contributors', 'Tiles courtesy of <a href="https://www.openstreetmap.org/"></a>'],
    }),
});
  
const BaseGroup = new ol.layer.Group({
    title: "Hintergrund",
    fold: true,
    fold: 'close',
    layers: [ESRIWorldImagery, googleLayer, osmTile ]
});

map.addLayer(BaseGroup);
map.addLayer(exp_bw_sle_layer);