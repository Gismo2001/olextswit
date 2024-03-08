//import './style.css';

import { 
  getStyleForArtEin,
  gehoelz_vecStyle, 
  sleStyle, 
  wehStyle, 
  bru_nlwknStyle, 
  bru_andereStyle,
  dueStyle, 
  queStyle, 
  getStyleForArtFSK, 
  son_linStyle, 
  son_punStyle,
  km10scalStyle,
  addTempMarker 
} from './extStyle';


 
const arrowStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
      color: 'black', // Schwarze Farbe für die Linie
      width: 4,        // Breite der Linie (dicker)
  }),
  geometry: function (feature) {
      const coordinates = feature.getGeometry().getCoordinates();
  
      const arrowLine = new ol.geom.LineString(coordinates);
      const lastCoordinate = coordinates[coordinates.length - 1];
      const secondLastCoordinate = coordinates[coordinates.length - 2];
  
      const dx = lastCoordinate[0] - secondLastCoordinate[0];
      const dy = lastCoordinate[1] - secondLastCoordinate[1];
      const rotation = Math.atan2(dy, dx);
  
      // Länge der Pfeillinien
      const arrowLength = 15;
  
      // Koordinaten für die Pfeillinien
      const arrow1 = [
      lastCoordinate[0] - arrowLength * Math.cos(rotation - Math.PI / 8),
      lastCoordinate[1] - arrowLength * Math.sin(rotation - Math.PI / 8),
      ];
  
      const arrow2 = [
      lastCoordinate[0] - arrowLength * Math.cos(rotation + Math.PI / 8),
      lastCoordinate[1] - arrowLength * Math.sin(rotation + Math.PI / 8),
      ];
  
      arrowLine.setCoordinates([...coordinates, arrow1, lastCoordinate, arrow2]);
  
      return arrowLine;
  },
  });
  const endpointStyle = new ol.style.Style({
      geometry: function (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          return new ol.geom.Point(coordinates[coordinates.length - 1]);
      },
      image: new ol.style.Circle({
          radius: 6,          // Radius des Kreises (Endpunkt)
          fill: new ol.style.Fill({ color: 'red' }), // Füllfarbe des Kreises
          stroke: new ol.style.Stroke({
          color: 'black',    // Randfarbe des Kreises
          width: 2,          // Breite des Randes
          }),
      }),
  });
 // Kombinierter Stil für Linie und Endpunkt
const combinedStyle = [arrowStyle, endpointStyle];

window.searchAddress = function searchAddress() {
  var address = document.getElementById('addressInput').value;
  var apiKey = process.env.API_KEY || 'c592a3d99b8d43878cf7d727d44187ce';

  var apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        var location = data.results[0].geometry;
        // Karte auf die gefundenen Koordinaten zentrieren
        map.getView().setCenter(ol.proj.fromLonLat([location.lng, location.lat]));
        map.getView().setZoom(17); // Zoom-Level anpassen

        // Temporären Marker hinzufügen
        addTempMarker([location.lng, location.lat]);
      } else {
        // Adresse nicht gefunden, Meldung ausgeben
        alert('Adresse nicht gefunden');
      }
    })
    .catch(error => {
      console.error('Geokodierung-Fehler:', error);
    });
}

// Event-Listener für die Enter-Taste hinzufügen
var inputElement = document.getElementById('addressInput');
inputElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchAddress();
  }
});

// Funktion zum Entfernen des temporären Markers
function removeTempMarker() {
  // Durchlaufen Sie alle Karten-Layer und entfernen Sie alle, die als temporärer Marker markiert sind
  map.getLayers().getArray().forEach(function (layer) {
    if (layer.get('tempMarker')) {
      map.removeLayer(layer);
    }
  });
}

const attribution = new ol.control.Attribution({
  collapsible: false,
});


const additionalControl = new ol.control.ZoomToExtent({
  extent: [
    727361,  6839277, 858148,
    6990951,
  ],
});

const mapView = new ol.View({
  center: ol.proj.fromLonLat([7.35, 52.7]),
  zoom: 9
  });
  
const map = new ol.Map({
  target: "map",
  view: mapView,
  controls: ol.control.defaults().extend([attribution, additionalControl]),
});



const vector = new ol.layer.Vector({
  source: new ol.source.Vector(),
  title: 'measure', // Titel für den Layer-Switcher
  name: 'measure',
  style: new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2,
      }),
      radius: 7,
    }),
  }),
  visible: false,
});


let sketch;

// exp_gew_info
const gehoelzvecLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/gehoelz_vec.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'Gehölz(Plan)', // Titel für den Layer-Switcher
  name: 'gehoelz_vec',
  style: gehoelz_vecStyle,
  visible: false
});


const exp_allgm_fsk_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_allgm_fsk.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'fsk',
  name: 'fsk', 
  style: getStyleForArtFSK,
  visible: false,
  minResolution: 0,
  maxResolution: 4
})

// exp_gew_info
const exp_gew_info_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_gew_info.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'Gew, Info', 
  name: 'gew_info',
  style: combinedStyle,
  visible: false
});

// sonstige Linien
const exp_bw_son_lin_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_son_lin.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'Sonstige, Linien', // Titel für den Layer-Switcher
  name: 'son_lin', // Titel für den Layer-Switcher
  style: son_linStyle,
  visible: false
});

// sonstige Punkte
const exp_bw_son_pun_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_son_pun.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'Sonstige, Punkte', 
  name: 'son_pun', 
  style: son_punStyle,
  visible: false
});

// ein
const exp_bw_ein_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_ein.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'Einläufe', 
  name: 'ein', 
  style: getStyleForArtEin,
  visible: false
});

// que
const exp_bw_que_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_que.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'Querung', 
  name: 'que', // Titel für den Layer-Switcher
  style: queStyle,
  visible: false
});

// due
const exp_bw_due_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_due.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'Düker', // Titel für den Layer-Switcher
  name: 'due', // Titel für den Layer-Switcher
  style: dueStyle,
  visible: false
});

// weh
const exp_bw_weh_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_weh.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'Wehr', // Titel für den Layer-Switcher
  name: 'weh', // Titel für den Layer-Switcher
  style: wehStyle,
  visible: false
});

//bru nlwkn
const exp_bw_bru_nlwkn_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_bw_bru_nlwkn.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'Brücke (NLWKN)', // Titel für den Layer-Switcher
  name: 'bru_nlwkn', // Titel für den Layer-Switcher
  style: bru_nlwknStyle,
  visible: false
});

//bru andere
const exp_bw_bru_andere_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_bw_bru_andere.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'Brücke (andere)', 
  name: 'bru_andere', 
  style: bru_andereStyle,
  visible: false
});

//sle
const exp_bw_sle_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return './myLayers/exp_bw_sle.geojson' + '?bbox=' + extent.join(',');
    },
    strategy: ol.loadingstrategy.bbox
  }),
  title: 'Schleuse', // Titel für den Layer-Switcher
  name: 'sle', // Titel für den Layer-Switcher
  style: sleStyle,
  visible: true
});

//kilometrierung 10 m
const km10scal_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/km_10_scal.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'km10scal', // Titel für den Layer-Switcher
  style: km10scalStyle,
  visible: true,
  minResolution: 0,
  maxResolution: 1 
});

// km 100 Style-Funktion mit Beschriftung
const km100scalStyle = function(feature, text, resolution) {
  var minResolution = 0;
  var maxResolution = 5; 
  if (resolution > minResolution && resolution < maxResolution) {
    return new ol.style.Style({
      text: new ol.style.Text({
        text: text,
        font: 'normal 18px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',
        offsetX: -10,
        offsetY: 10,        
      }),
      stroke: new ol.style.Stroke({
        color: 'black', // oder eine andere Linienfarbe
        width: 1 // oder eine andere Linienbreite  
      })
    });
  } else {
    return null;
  }
};
//kilometrierung 100 m
const km100scal_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/km_100_scal.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'km100scal', // Titel für den Layer-Switcher
  style: function(feature, resolution) {
    return km100scalStyle(feature, feature.get('TextString'), resolution);
  },
  visible: true,
  minResolution: 0,
  maxResolution: 3 
});

/// Style-Funktion mit Beschriftung
const km500scalStyle = function(feature, text, resolution) {
  var minResolution = 0;
  var maxResolution = 10; 
  if (resolution > minResolution && resolution < maxResolution) {
    return new ol.style.Style({
      text: new ol.style.Text({
        text: text,
        font: 'normal 20px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',
        offsetX: -10,
        offsetY: 10,
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 0, 1)'
        }),
      }),
      stroke: new ol.style.Stroke({
        color: 'black', // oder eine andere Linienfarbe
        width: 2 // oder eine andere Linienbreite  
      })
    });
  } else {
    return null;
  }
};

//kilometrierung 500 m
const km500scal_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/km_500_scal.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'km500scal', // Titel für den Layer-Switcher
  style: function(feature, resolution) {
    return km500scalStyle(feature, feature.get('TextString'), resolution);
  },
  visible: true,
  minResolution: 0,
  maxResolution: 10 
});

//gew Layer
const gew_layer_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/gew.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'gew', // Titel für den Layer-Switcher
  name: 'gew',
  style: new ol.style.Style({
    fill: new ol.style.Fill({ color: 'rgba(0,28, 240, 0.4)' }),
    stroke: new ol.style.Stroke({ color: 'blue', width: 2 })
  })
})

const layerSwitcher = new ol.control.LayerSwitcher({ });
map.addControl(layerSwitcher);

// Neues div-Element mit Namen: "element" und den Klassen "get-position", "ol-unselectable" und "ol-control"
var element = document.createElement('div');
element.className = 'get-position ol-unselectable ol-control';
element.id = "Button";
const button = document.createElement('button');
button.innerHTML = 'P';
element.appendChild(button);
document.body.appendChild(element);

// Korrigierter Code für das zweite Element
var elementM = document.createElement('div');
elementM.className = 'getMeasure';
elementM.id = "ButtonM";
const buttonM = document.createElement('button');
buttonM.innerHTML = 'M';  // Ändere dies zu buttonM
elementM.appendChild(buttonM);  // Ändere dies zu buttonM
document.body.appendChild(elementM);  // Ändere dies zu elementM

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

buttonM.addEventListener('click', function() {});
buttonM.addEventListener('touchstart', function() {});

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

buttonM.addEventListener('click', function() {
  alert('gecklickt');
});

/* var buttonState = false;
document.getElementById("toggleButton").addEventListener("click", toggleButton);

function toggleButton() {
    // Funktionslogik hier
    var button = document.getElementById("toggleButton");

    // Toggle Button-Zustand
    buttonState = !buttonState;

    // Ändere den Text und die Farbe entsprechend dem Zustand
    if (buttonState) {
        button.innerHTML = "An ";
        button.classList.remove("off");
        button.classList.add("on");
    } else {
        button.innerHTML = "Aus";
        button.classList.remove("on");
        button.classList.add("off");
    }
}; */

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
  title: '1. Ordn.',
  visible: false
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
  title: '2. Ordn.',
  visible: false,
  minResolution: 0,
  maxResolution: 75
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
  title: '3. Ordn.',
  visible: false,
  minResolution: 0,
  maxResolution: 6
});

const wmsUesgLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://www.umweltkarten-niedersachsen.de/arcgis/services/HWSchutz_wms/MapServer/WMSServer',
    params: {
      'LAYERS': 'Überschwemmungsgebiete_Verordnungsfläechen_Niedersachsen11182',
      'TILED': true,
    },
    serverType: 'arcgis',
    crossOrigin: 'anonymous',
  }),
  title: 'Uesg',
  visible: false,
  opacity: .5,
  minResolution: 0,
  maxResolution: 10
});

const wmsNsgLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://www.umweltkarten-niedersachsen.de/arcgis/services/Natur_wms/MapServer/WMSServer',
    params: {
      'LAYERS': 'Fauna-Flora-Habitat-Gebiete_(FFH)_in_Niedersachsen44579',
      'TILED': true,
    },
    serverType: 'arcgis',
    crossOrigin: 'anonymous',
  }),
  title: 'NSG',
  visible: false,
  opacity: .5,
  minResolution: 0,
  maxResolution: 10
});

const gnAtlas2023 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "10", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2023",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas2020 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "9", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2020",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas2017 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "8", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2017",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas2014 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "7", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2014",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas2012 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "6", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2012",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas2010 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "5", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2010",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas2009 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "4", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2009",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas2002 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "3", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "2002",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas1970 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "2", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "1970",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas1957 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "1", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "1957",
  opacity: 1.000000,
  visible: false,
});

const gnAtlas1937 = new ol.layer.Tile({
  source: new ol.source.TileWMS(({
      url: "https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",
      attributions: ' ',
     params: {"LAYERS": "0", "TILED": "true", "VERSION": "1.3.0"},
    })),
  title: "1937",
  opacity: 1.000000,
  visible: false,
});

const wmsBaseMapDEGrau = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://sgx.geodatenzentrum.de/wms_basemapde',
    params: {
      'LAYERS': 'WMS DE BASEMAP.DE WEB RASTER',
      'TILED': true,
    },
    crossOrigin: 'anonymous',
  }),
  title: 'base grau',
  visible: false,
  minResolution: 0,
  maxResolution: 75
});

var dop20ni_layer = new ol.layer.Tile({
  title: "DOP20 NI",
  opacity: 1.000000,
  visible: false,
  type: 'base',
  source: new ol.source.TileWMS({
    url: "https://www.geobasisdaten.niedersachsen.de/doorman/noauth/wms_ni_dop",
    attributions: 'Orthophotos Niedersachsen, LGLN',
    params: {
      "LAYERS": "dop20",
      "TILED": true, // "true" sollte ohne Anführungszeichen sein
      "VERSION": "1.3.0"
    },
  }),
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
title: "WMS-Lay",
fold: true,
fold: 'close',
layers: [wmsHydDrittOrdLayer, wmsHydZweitOrdLayer, wmsHydErstOrdLayer, wmsNsgLayer, wmsUesgLayer]
});

const GNAtlasGroup = new ol.layer.Group({
  title: "GN-DOP's",
  fold: true,
  fold: 'close',
  layers: [ gnAtlas2023, gnAtlas2020, gnAtlas2017, gnAtlas2014, gnAtlas2012, gnAtlas2010, gnAtlas2009, gnAtlas2002, gnAtlas1970, gnAtlas1957, gnAtlas1937]
  });

const BwGroup = new ol.layer.Group({
  title: "Bauw.",
  fold: true,
  fold: 'close',  
  layers: [gehoelzvecLayer, exp_gew_info_layer, exp_bw_son_lin_layer, exp_bw_son_pun_layer, exp_bw_ein_layer, exp_bw_bru_andere_layer, exp_bw_bru_nlwkn_layer, exp_bw_que_layer, exp_bw_due_layer, exp_bw_weh_layer, exp_bw_sle_layer]
});

const kmGroup = new ol.layer.Group({
  title: "Station",
  fold: true,
  fold: 'close',
  layers: [km10scal_layer, km100scal_layer, km500scal_layer]
});

const BaseGroup = new ol.layer.Group({
  title: "Base",
  fold: true,
  fold: 'close',
  layers: [wmsBaseMapDEGrau, ESRIWorldImagery, googleLayer, dop20ni_layer, osmTile]
});

map.addLayer(BaseGroup);
map.addLayer(GNAtlasGroup);
map.addLayer(exp_allgm_fsk_layer);
map.addLayer(gew_layer_layer);
map.addLayer(wmsLayerGroup);
map.addLayer(kmGroup);
map.addLayer(BwGroup);



var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new ol.Overlay({
  element: container,//document.getElementById('popup'),
  id: '1',
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

map.addOverlay(popup);

closer.onclick = function()
{
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

// 
map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
  var layname = layer.get('name');
  
  /*   switch (layname) {
      case 'sle':
        alert(layname);
        break;
      case 'weh':
        alert(layname);
        break;
      case 'bru_nlwkn':
        alert(layname);
        break;
      case 'bru_andere':
        alert(layname);
        break;
      case 'gew_info':
        // Hier könnten weitere Aktionen für 'gew_info' hinzugefügt werden
        break;
      default:
        alert("sonstige: " + layname);
    } */

    
  
    var coordinates = evt.coordinates;
    var beschreibLangValue = feature.get('beschreib_lang');
    var beschreibLangHtml = '';
    if (beschreibLangValue && beschreibLangValue.trim() !== '') {
      beschreibLangHtml = '<br>' + '<u>' + "Beschreib (lang): " + '</u>' + beschreibLangValue + '</p>';
    };




    // Popup soll nur für bestimmte Layernamen angezeigt werden
    if (layname !== 'gew' && layname !== 'km10scal' && layname !== 'km100scal' && layname !== 'km500scal' && layname !== 'fsk' && layname !== 'son_lin') {
      console.log('Clicked on layer:', layname);
      if (feature) {
        coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
       
        // HTML-Tag Foto1
        var foto1Value = feature.get('foto1');
        var foto1Html = '';
        
        var foto2Value = feature.get('foto2');
        var foto2Html = '';
        
        var foto3Value = feature.get('foto3');
        var foto3Html = '';
        
        var foto4Value = feature.get('foto4');
        var foto4Html = '';
        
        if (foto1Value && foto1Value.trim() !== '') {
          foto1Html = '<a href="' + foto1Value + '" onclick="window.open(\'' + foto1Value + '\', \'_blank\'); return false;">Foto 1</a>';
        } else {
          foto1Html =   " Foto 1 ";
        }
      
        if (foto2Value && foto2Value.trim() !== '') {
          foto2Html = '<a href="' + foto2Value + '" onclick="window.open(\'' + foto2Value + '\', \'_blank\'); return false;">Foto 2</a>';
        } else {
          foto2Html = " Foto 2 ";
        }
      
        if (foto3Value && foto3Value.trim() !== '') {
          foto3Html = '<a href="' + foto3Value + '" onclick="window.open(\'' + foto3Value + '\', \'_blank\'); return false;">Foto 3</a>';
        } else {
          foto3Html = " Foto 3 ";
        }
      
        if (foto4Value && foto4Value.trim() !== '') {
          foto4Html = '<a href="' + foto4Value + '" onclick="window.open(\'' + foto4Value + '\', \'_blank\'); return false;">Foto 4</a>';
        } else {
          foto4Html = " Foto 4 ";
        }
      
      content.innerHTML =
          '<div style="max-height: 200px; overflow-y: auto;">' +
          '<p style="font-weight: bold; text-decoration: underline;">' + feature.get('name') + '</p>' +
          '<p>' + "Id = " + feature.get('bw_id') +  ' (' + feature.get('KTR') +')' +  '</p>' +
          '<p>' + foto1Html + " " + foto2Html + " " + foto3Html + " " + foto4Html + 
           '<br>' + '<u>' + "Beschreibung (kurz): " + '</u>' + feature.get('beschreib') + '</p>' +
           '<p>' + beschreibLangHtml + '</p>' +
          '</div>';
      
        
      } else {
        popup.setPosition(undefined);
      }
    }
    // Führen Sie Aktionen für den Layernamen 'gew_info' durch
    if (layname === 'gew_info') {
      coordinates = evt.coordinate; 
      popup.setPosition(coordinates);
      content.innerHTML =
      '<div style="max-height: 300px; overflow-y: auto;">' +
      '<p>Name: ' + feature.get('IDUabschn') + '<br>' +
      '<p><a href="' + feature.get('link1') + '" onclick="window.open(\'' + feature.get('link1') + '\', \'_blank\'); return false;">Link 1</a> ' +
      '<a href="' + feature.get('link2') + '" onclick="window.open(\'' + feature.get('link2') + '\', \'_blank\'); return false;">Link 2</a> ' +
      '<a href="' + feature.get('foto1') + '" onclick="window.open(\'' + feature.get('foto1') + '\', \'_blank\'); return false;">Foto 1</a> ' +
      '<a href="' + feature.get('foto2') + '" onclick="window.open(\'' + feature.get('foto2') + '\', \'_blank\'); return false;">Foto 2</a><br>' +
      '<p><a href="' + feature.get('BSB') + '" onclick="window.open(\'' + feature.get('BSB') + '\', \'_blank\'); return false;">BSB  </a>' +
      '<a href="' + feature.get('MNB') + '" onclick="window.open(\'' + feature.get('MNB') + '\', \'_blank\'); return false;">MNB</a><br> ' +
      'Kat: ' + feature.get('Kat') + '</a>' +
      ', KTR: ' + feature.get('REFID_KTR') + '</a>' +
      '<br>' + "von " + feature.get('Bez_Anfang') + " bis " + feature.get('Bez_Ende')  + '</p>' +
      '</div>';
    }

    // Führen Sie Aktionen für den Layernamen 'son_lin' durch
    if (layname === 'son_lin') {
      coordinates = evt.coordinate; 
      popup.setPosition(coordinates);
      content.innerHTML =
      '<div style="max-height: 300px; overflow-y: auto;">' +
      '<p>Name: ' + feature.get('name') +  ' (' + feature.get('KTR') +')' + '<br>' +
      '<p><a href="' + feature.get('foto1') + '" onclick="window.open(\'' + feature.get('foto1') + '\', \'_blank\'); return false;">Foto 1</a> ' +
      '<a href="' + feature.get('foto2') + '" onclick="window.open(\'' + feature.get('foto2') + '\', \'_blank\'); return false;">Foto 2</a> ' +
      '<a href="' + feature.get('foto3') + '" onclick="window.open(\'' + feature.get('foto3') + '\', \'_blank\'); return false;">Foto 3</a> ' +
      '<a href="' + feature.get('foto4') + '" onclick="window.open(\'' + feature.get('foto4') + '\', \'_blank\'); return false;">Foto 4</a></p>' +
      '<br>' + "Beschreib kurz = " + feature.get('beschreib') + '</p>' +
      beschreibLangHtml +
      '</div>';
    }

    // Führen Sie Aktionen für den Layernamen 'gehoelz_vecLayer' durch
    if (layname === 'gehoelz_vec') {
      coordinates = evt.coordinate; 
      popup.setPosition(coordinates);
      content.innerHTML =
      '<div style="max-height: 300px; overflow-y: auto;">' +
      '<p>Gehölzentwicklung' + '<br>' +
      '<br>' + "Bemerk: " + feature.get('UMn_Bemerk') + '</p>' +
      '</div>';
    }

    // Führen Sie Aktionen für den Layernamen 'fsk' durch
    if (layname === 'fsk') {
      if (feature.get('Art') === 'o' || feature.get('Art') === 'l') {
        coordinates = evt.coordinate; // Define coordinates for 'fsk'
        popup.setPosition(coordinates);
        content.innerHTML =
          '<div style="max-height: 300px; overflow-y: auto;">' +
          '<p><strong>gemark Flur Flurstück:</strong><br>' + feature.get('Suche') + '</p>' +
          'FSK: ' + feature.get('fsk') + '</p>' +
          'FSK(ASL): ' + feature.get('FSK_ASL') + '</p>' +
          '<p>' + 'Eig.(öffentl.): ' + feature.get('Eig1') + '</p>' +
          '</div>';
      } else {
        coordinates = evt.coordinate; // Define coordinates for 'fsk'
        popup.setPosition(coordinates);
        content.innerHTML =
          '<div style="max-height: 300px; overflow-y: auto;">' +
          '<p><strong>gemark Flur Flurstück:</strong><br>' + feature.get('Suche') + '</p>' +
          'FSK: ' + feature.get('fsk') + '</p>' +
          '<p>' + 'Art (p=privat): ' + feature.get('Art') + '</p>' +
          '</div>';
      }
    }
    
  });
});

document.getElementById('popup-closer').onclick = function () {
  popup.setPosition(undefined);
  return false;
};


