
//extfunc.js
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

  const son_linStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgba(209, 32, 253, 1)',
        width: 4
    }),
  });
export { bru_nlwknStyle, bru_andereStyle, getStyleForArtFSK, son_linStyle };
  