//extfunc.js
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

const km10scalStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'grey',
        width: .5
    })
});

const gehoelz_vecStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
    color: 'rgba(173, 114, 3, 1)',
    width: 3
    }),
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
  };

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
  };

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
  
export { bru_nlwknStyle,
    sleStyle,
    wehStyle, 
    bru_andereStyle, 
    dueStyle,
    queStyle,
    son_linStyle, 
    son_punStyle,
    km10scalStyle,
    gehoelz_vecStyle,
    getStyleForArtFSK,
    getStyleForArtEin
};
    
  

