/// Funktion zur Adresssuche mit OpenCage Geocoding API
window.searchAddress = function searchAddress() {
  var address = document.getElementById('addressInput').value;
  var apiKey = 'c592a3d99b8d43878cf7d727d44187ce'; // Ersetze dies durch deinen OpenCage API-Schlüssel

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

// Funktion zum Hinzufügen eines temporären Markers
function addTempMarker(coordinates) {
  var tempMarker = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        geometry: new ol.geom.Point(coordinates),
      })]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        src: './data/marker1.jpg',
        scale: 1 // Skalieren Sie die Größe des Icons nach Bedarf
      })
    })
  });

  // Fügen Sie den temporären Marker zur Karte hinzu
  map.addLayer(tempMarker);
}

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
  collapsible: true
});


const gew_infoStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(209, 100, 253, 1)',
    width: 3
  }),
});

const son_linStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(209, 32, 253, 1)',
    width: 4
  }),
});


const son_punStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(209, 32, 253, 1)' }),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 2
    }),
    points: 4,
    radius: 7,
    angle: Math.PI / 4
  })
});
  
const queStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(209, 32, 253, 1'}),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: .5
    }),
    points: 4,
    radius: 7,
    angle: Math.PI / 2
  })
});
  
const dueStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(209, 32, 253, 1'}),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 2
    }),
    points: 4,
    radius: 7,
    angle: Math.PI / 4
  })
});
  
const wehStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color: 'green'}),
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 2
    }),
    points: 3,
    radius: 7,
    rotation: 0  // Setzen Sie die Rotation auf 0 für ein Dreieck
  })
});
  
const bru_nlwknStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color: 'blue'}),
    stroke: new ol.style.Stroke({color: 'grey', width: 1}),
    points: 4,
    radius: 7,
    angle: Math.PI / 4
  })
});
  
const bru_andereStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({color:'rgba(100, 100, 100, 1)'}),
    stroke: new ol.style.Stroke({color: 'grey',width: 1}),
    points: 4,
    radius: 6,
    angle: Math.PI / 4
  })
});
  
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
  
const km10scalStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'grey',
    width: .5
  })
});
   
function getStyleForArtEin(feature) {   
  const artValue = feature.get('Ein_ord');
  let fillColor, strokeColor;
  switch (artValue) {
      case '1. Ordnung':
        fillColor = 'rgba(0, 68, 255, .8)';
        strokeColor = 'black';
        break;
      case '2. Ordnung':
        fillColor = 'rgba(214, 0, 0, .8)';
        strokeColor = 'black';
        break;
      case '3. Ordnung':
        fillColor = 'rgba(114, 114, 114, .8)';
        strokeColor = 'black';
        break;
      case 'Sonstige':
        fillColor = 'rgba(27, 117, 0, .8)';
        strokeColor = 'black';
        break;
      default:
        fillColor = 'grey';
        strokeColor = 'grey';
    }
    return new ol.style.Style({
      image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: strokeColor,
            width: 0.5
          }),
          radius: 7
        })
      
    })
}

//Berechnung Style für FSK
function getStyleForArtFSK(feature) {
const artValue = feature.get('Art');
let fillColor, strokeColor;

switch (artValue) {
  case 'p':
    fillColor = 'rgba(200, 200, 200, .6)';
    strokeColor = 'black';
    break;
  case 'o':
    fillColor = 'rgba(255, 220, 220, .6)';
    strokeColor = 'black';
    break;
  case 'l':
    fillColor = 'rgba(255, 190, 150, .6)';
    strokeColor = 'black';
    break;
  default:
    fillColor = 'rgba(255, 255, 255, 1)';
    strokeColor = 'grey';
}

return new ol.style.Style({
  fill: new ol.style.Fill({
    color: fillColor
  }),
  stroke: new ol.style.Stroke({
    color: strokeColor,
    width: 0.5
  })
});
}


const mapView = new ol.View({
  center: ol.proj.fromLonLat([7.35, 52.7]),
  zoom: 9
});

const map = new ol.Map({
  target: "map",
  view: mapView,
  controls: ol.control.defaults().extend([attribution])
  
});



const exp_allgm_fsk_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_allgm_fsk.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'fsk', // Titel für den Layer-Switcher
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
  title: 'gew_info', // Titel für den Layer-Switcher
  style: gew_infoStyle,
  visible: false
});

// sonstige Linien
const exp_bw_son_lin_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_son_lin.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'son_lin', // Titel für den Layer-Switcher
  style: son_linStyle,
  visible: false
});

// sonstige Punkte
const exp_bw_son_pun_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_son_pun.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'son_pun', // Titel für den Layer-Switcher
  style: son_punStyle,
  visible: false
});

// ein
const exp_bw_ein_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {return './myLayers/exp_bw_ein.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'ein', // Titel für den Layer-Switcher
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
  title: 'que', // Titel für den Layer-Switcher
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
  title: 'due', // Titel für den Layer-Switcher
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
  title: 'weh', // Titel für den Layer-Switcher
  style: wehStyle,
  visible: false
});

//bru nlwkn
const exp_bw_bru_nlwkn_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_bw_bru_nlwkn.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'bru_nlwkn', // Titel für den Layer-Switcher
  style: bru_nlwknStyle,
  visible: false
});

//bru andere
const exp_bw_bru_andere_layer = new ol.layer.Vector({
  source: new ol.source.Vector({format: new ol.format.GeoJSON(), url: function (extent) {return './myLayers/exp_bw_bru_andere.geojson' + '?bbox=' + extent.join(','); }, strategy: ol.loadingstrategy.bbox }),
  title: 'bru_andere', // Titel für den Layer-Switcher
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
  title: 'sle', // Titel für den Layer-Switcher
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
        fill: new ol.style.Fill({
          color: 'rgba(128, 128, 128, 1)' // Graue Farbe
        }),
        stroke: new ol.style.Stroke({
          color: '#000000',
          width: 0.25
        })
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

// Style-Funktion mit Beschriftung
const km500scalStyle = function(feature, text, resolution) {
  var minResolution = 0;
  var maxResolution = 10; 
  if (resolution > minResolution && resolution < maxResolution) {
    return new ol.style.Style({
      text: new ol.style.Text({text: text, font: 'normal 20px "Arial Light", "Helvetica Neue Light", Arial, sans-serif', offsetX: -10, offsetY: 10, fill: new ol.style.Fill({color: 'rgba(0, 0, 0, 1)'}),
      stroke: new ol.style.Stroke({color: '#000000', width: .25 })
      })
    });
  } else {
    return null;
  }
};

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
layers: [wmsHydDrittOrdLayer, wmsHydZweitOrdLayer, wmsHydErstOrdLayer]
});

wmsLayerGroup.setVisible(false);

const GNAtlasGroup = new ol.layer.Group({
  title: "GN-DOP's",
  fold: true,
  fold: 'close',
  layers: [ gnAtlas2023, gnAtlas2020, gnAtlas2017, gnAtlas2014, gnAtlas2012, gnAtlas2010, gnAtlas2009, gnAtlas2002, gnAtlas1970, gnAtlas1957, gnAtlas1937]
  });
  
wmsLayerGroup.setVisible(false);

const BwGroup = new ol.layer.Group({
  title: "Bauw.",
  fold: true,
  fold: 'close',  
  layers: [exp_gew_info_layer, exp_bw_son_lin_layer, exp_bw_son_pun_layer, exp_bw_ein_layer, exp_bw_bru_andere_layer, exp_bw_bru_nlwkn_layer, exp_bw_que_layer, exp_bw_due_layer, exp_bw_weh_layer, exp_bw_sle_layer]
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
  layers: [ESRIWorldImagery, googleLayer, dop20ni_layer, osmTile]
});

map.addLayer(BaseGroup);
map.addLayer(GNAtlasGroup);
map.addLayer(exp_allgm_fsk_layer);
map.addLayer(gew_layer_layer);
map.addLayer(wmsLayerGroup);
map.addLayer(kmGroup);
map.addLayer(BwGroup);
