
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

export { bru_nlwknStyle, bru_andereStyle };
  