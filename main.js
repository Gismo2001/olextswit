
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

var button = document.createElement('button');
    button.innerHTML = 'P';

    var handleGetPosition = function(e) {
      getPosition();
};

button.addEventListener('click', handleGetPosition, false);
button.addEventListener('touchstart', handleGetPosition, false);

var element = document.createElement('div');
element.className = 'get-position ol-unselectable ol-control';
element.id ="PositionButton";
element.appendChild(button);

var GetPositionControl = new ol.control.Control({
    element: element
});
map.addControl(GetPositionControl);


// set up the geolocation api to track our position
function getPosition() {
  var geolocation = new ol.Geolocation({
    projection: map.getView().getProjection(),
    tracking: true,
    trackingOptions: {
      enableHighAccuracy: true,
      maximumAge: 5000  
    }
  });

 var accuracyFeature = new ol.Feature();
  geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  var positionFeature = new ol.Feature();
  positionFeature.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
      radius: 4,
      fill: new ol.style.Fill({
        color: '#3399CC'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 1
      })
    })
  }));

  geolocation.on('change:position', function() {
    var pos = geolocation.getPosition();
    positionFeature.setGeometry(pos ?
        new ol.geom.Point(pos) : null);
    mapView.setCenter(pos);
    mapView.setZoom(19);    
  });

  new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
      features: [accuracyFeature, positionFeature]
    })
  });     
};  


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
  layers: [ESRIWorldImagery, googleLayer, osmTile]
});

map.addLayer(BaseGroup);
map.addLayer(exp_bw_sle_layer);


