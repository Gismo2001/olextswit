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

var element = document.createElement('div');
element.className = 'get-position ol-unselectable ol-control';
element.id = "Button";

var button = document.createElement('button');  // Button-Element erstellen
button.innerHTML = 'P';

element.appendChild(button);  // Hinzufügen des Buttons zum 'element'
document.body.appendChild(element);  // Füge das 'element' dem DOM hinzu
var firstPositionFound = false; // Variable für den ersten erfolgreichen Fix

var geolocation = new ol.Geolocation({
  projection: map.getView().getProjection(),
  tracking: false,
  trackingOptions: {
    enableHighAccuracy: true,
    maximumAge: 5000  
  }
});

var accuracyFeature = new ol.Feature();
var positionFeature = new ol.Feature();

var vectorLayer = new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  }),
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: 'blue'
      }),
      stroke: new ol.style.Stroke({
        color: 'white',
        width: 2
      })
    })
  })
});

function updatePosition() {
  geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  geolocation.on('change:position', function() {
    var pos = geolocation.getPosition();
    if (pos && !firstPositionFound) {
      positionFeature.setGeometry(new ol.geom.Point(pos));
      map.getView().setCenter(pos);
      firstPositionFound = true;
    }
  });
}

function startTracking() {
  geolocation.setTracking(true);
  updatePosition();
}

function stopTracking() {
  geolocation.setTracking(false);
  accuracyFeature.setGeometry(null);
  positionFeature.setGeometry(null);
}

button.addEventListener('click', function() {
  var trackingWasAlreadyOn = geolocation.getTracking();
  if (trackingWasAlreadyOn) {
    stopTracking();
  } else {
    startTracking();
  }
});

// Starte die Positionsupdates, wenn die Seite geladen wird
//startTracking();

// sle
const exp_bw_sle_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
          return './myLayers/exp_bw_sle.geojson' + '?bbox=' + extent.join(',');
      },
      strategy: ol.loadingstrategy.bbox
  }),
  title: 'sle',
  style: sleStyle,
  visible: true
});

const wmsHydErstOrdLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer',
    params: {
      'LAYERS': 'Gewässernetz_1._Ordnung29778',
      'TILED': true,
      'TRANSPARENT': true,
    },
    serverType: 'arcgis',
    crossOrigin: 'anonymous',
  }),
  title: 'wmsHydErstOrd',
  visible: true
});

const wmsHydZweitOrdLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer',
    params: {
      'LAYERS': 'Gewässernetz_2._Ordnung8177',
      'TILED': true,
    },
    serverType: 'arcgis',
    crossOrigin: 'anonymous',
  }),
  title: 'wmsHydZweitOrd',
  visible: false
});

const wmsHydDrittOrdLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer',
    params: {
      'LAYERS': 'Gewässernetz_3.Ordnung9928',
      'TILED': true,
    },
    serverType: 'arcgis',
    crossOrigin: 'anonymous',
  }),
  title: 'wmsHydDritttOrd',
  visible: false
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

const wmsLayerGroup = new ol.layer.Group({
title: "wms-Layer",
fold: true,
fold: 'close',
layers: [wmsHydErstOrdLayer]
});
wmsLayerGroup.setVisible(false);

const BaseGroup = new ol.layer.Group({
  title: "Hintergrund",
  fold: true,
  fold: 'close',
  layers: [ESRIWorldImagery, googleLayer, osmTile]
});

map.addLayer(BaseGroup);
map.addLayer(wmsLayerGroup);
map.addLayer(exp_bw_sle_layer);
