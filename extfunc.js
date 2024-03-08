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
  export {
    addTempMarker    
};