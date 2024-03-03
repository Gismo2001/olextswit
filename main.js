//Style für sle
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
  collapsible: true
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

//neues div-Element mit Namen: "element" und den Klassen get-position ol-unselectabler und ol-control
var element = document.createElement('div');
element.className = 'get-position ol-unselectable ol-control';
element.id = "Button";
//Button erstellen, und mit dem Text "p" beschriften
const button = document.createElement('button');
button.innerHTML = 'P';
//Button hinzufügen
element.appendChild(button);  // Hinzufügen des Buttons zum 'element'
document.body.appendChild(element);  // Füge das 'element' dem DOM hinzu



//neues Objekt der Klasse ol.Geolocation
var geolocation = new ol.Geolocation({
  projection: map.getView().getProjection(), // Projektion der Karte
  tracking: false, // VerFolgung deaktiviert
  trackingOptions: {enableHighAccuracy: true, maximumAge: 5000}
});

// Funktion zum Abrufen der Position
function getPosition() {
  // Hier kannst du den Code für die Positionierung einfügen
 // console.log('Position wird abgerufen...');
}

var handleGetPosition = function(e) {
  console.log('Button wurde geklickt!');
  
  var trackingWasAlreadyOn = geolocation.getTracking(); 
  if (trackingWasAlreadyOn) { 
    geolocation.setTracking(false);
    console.log('Tracking wurde gestoppt.');
    //** CODE HERE TO REMOVE THE LAYER **
  } else { 
    geolocation.setTracking(true); 
    console.log('Tracking wurde gestartet.');
    getPosition(); 
  } 
};

button.addEventListener('click', handleGetPosition, false);
button.addEventListener('touchstart', handleGetPosition, false);

// Vector-Layer und Features erstellen
var accuracyFeature = new ol.Feature();
var positionFeature = new ol.Feature();

var vectorLayer = new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  }),
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7, // Radius des Punkts
      fill: new ol.style.Fill({
        color: 'blue' // Farbe des Punkts
      }),
      stroke: new ol.style.Stroke({
        color: 'white', // Farbe des Randes
        width: 2 // Breite des Randes
      })
    })
  })
});

// Funktion zum Aktualisieren der Position
function updatePosition() {
  geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  geolocation.on('change:position', function() {
    var pos = geolocation.getPosition();
    positionFeature.setGeometry(pos ? new ol.geom.Point(pos) : null);
    mapView.setCenter(pos);
  });
}

// Funktion zum Starten der Verfolgung
function startTracking() {
  geolocation.setTracking(true);
  updatePosition();
}

// Funktion zum Stoppen der Verfolgung
function stopTracking() {
  geolocation.setTracking(false);
  accuracyFeature.setGeometry(null);
  positionFeature.setGeometry(null);
}

// Event-Listener für den Button
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
