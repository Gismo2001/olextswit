(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const O=new ol.style.Style({image:new ol.style.Icon({src:"./data/sle.svg",scale:.9})}),G=new ol.style.Style({image:new ol.style.Icon({src:"./data/weh.svg",scale:.9})}),F=new ol.style.Style({image:new ol.style.Icon({src:"./data/bru_nlwkn.svg",scale:.9})}),W=new ol.style.Style({image:new ol.style.Icon({src:"./data/bru_andere.svg",scale:.9})}),B=new ol.style.Style({image:new ol.style.Icon({src:"./data/due.svg",scale:.9})}),V=new ol.style.Style({image:new ol.style.Icon({src:"./data/que.svg",scale:.9})}),P=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(209, 32, 253, 1)",width:4})}),j=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1)"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:4,radius:7,angle:Math.PI/4})}),C=new ol.style.Style({stroke:new ol.style.Stroke({color:"grey",width:.5})}),D=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(173, 114, 3, 1)",width:3})});function z(t){const e=t.get("Ein_ord");let n,o;switch(e){case"1. Ordnung":n="rgba(0, 68, 255, .8)",o="black";break;case"2. Ordnung":n="rgba(214, 0, 0, .8)",o="black";break;case"3. Ordnung":n="rgba(114, 114, 114, .8)",o="black";break;case"Sonstige":n="rgba(27, 117, 0, .8)",o="black";break;default:n="grey",o="grey"}return new ol.style.Style({image:new ol.style.Circle({fill:new ol.style.Fill({color:n}),stroke:new ol.style.Stroke({color:o,width:.5}),radius:7})})}function Y(t){console.log(t.get("Art"))}function J(t){const e=t.get("Art");let n,o;switch(e){case"p":n="rgba(200, 200, 200, .6)",o="black";break;case"o":n="rgba(255, 220, 220, .6)",o="black";break;case"l":n="rgba(255, 190, 150, .6)",o="black";break;default:n="rgba(255, 255, 255, 1)",o="grey"}return new ol.style.Style({fill:new ol.style.Fill({color:n}),stroke:new ol.style.Stroke({color:o,width:.5})})}function K(t){const e=t.get("Massn_ID");let n;switch(e){case 23:n="rgba(135, 101, 0, 0.1)";break;case 9:n="red";break;case 4:n="blue";break;case 11:n="blue";break;case 1:n="blue";break;default:n="grey"}return new ol.style.Style({stroke:new ol.style.Stroke({color:n,width:5})})}const H=function(t,e,n){var o=0,r=5;return n>o&&n<r?new ol.style.Style({text:new ol.style.Text({text:e,font:'normal 18px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10}),stroke:new ol.style.Stroke({color:"black",width:1})}):null},U=function(t,e,n){var o=0,r=10;return n>o&&n<r?new ol.style.Style({text:new ol.style.Text({text:e,font:'normal 20px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10,fill:new ol.style.Fill({color:"rgba(0, 0, 0, 1)"})}),stroke:new ol.style.Stroke({color:"black",width:2})}):null};var q={};const X=new ol.style.Style({stroke:new ol.style.Stroke({color:"black",width:4}),geometry:function(t){const e=t.getGeometry().getCoordinates(),n=new ol.geom.LineString(e),o=e[e.length-1],r=e[e.length-2],l=o[0]-r[0],u=o[1]-r[1],i=Math.atan2(u,l),g=15,s=[o[0]-g*Math.cos(i-Math.PI/8),o[1]-g*Math.sin(i-Math.PI/8)],c=[o[0]-g*Math.cos(i+Math.PI/8),o[1]-g*Math.sin(i+Math.PI/8)];return n.setCoordinates([...e,s,o,c]),n}}),$=new ol.style.Style({geometry:function(t){const e=t.getGeometry().getCoordinates();return new ol.geom.Point(e[e.length-1])},image:new ol.style.Circle({radius:6,fill:new ol.style.Fill({color:"red"}),stroke:new ol.style.Stroke({color:"black",width:2})})}),Z=[X,$];window.searchAddress=function(){var e=document.getElementById("addressInput").value,n=q.API_KEY||"c592a3d99b8d43878cf7d727d44187ce",o=`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(e)}&key=${n}`;fetch(o).then(r=>r.json()).then(r=>{if(r.results.length>0){var l=r.results[0].geometry;a.getView().setCenter(ol.proj.fromLonLat([l.lng,l.lat])),a.getView().setZoom(17),ee([l.lng,l.lat])}else alert("Adresse nicht gefunden")}).catch(r=>{console.error("Geokodierung-Fehler:",r)})};var Q=document.getElementById("addressInput");Q.addEventListener("keydown",function(t){t.key==="Enter"&&searchAddress()});function ee(t){var e=new ol.layer.Vector({source:new ol.source.Vector({features:[new ol.Feature({geometry:new ol.geom.Point(t)})]}),style:new ol.style.Style({image:new ol.style.Icon({src:"./data/marker1.jpg",scale:1})})});a.addLayer(e)}const te=new ol.control.Attribution({collapsible:!1}),oe=new ol.control.ZoomToExtent({extent:[727361,6839277,858148,6990951]}),M=new ol.View({center:ol.proj.fromLonLat([7.35,52.7]),zoom:9}),a=new ol.Map({target:"map",view:M,controls:ol.control.defaults().extend([te,oe])}),re=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/gehoelz_vec.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Gehölz(Plan)",name:"gehoelz_vec",style:D,visible:!1}),ne=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_allgm_fsk.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"fsk",name:"fsk",style:J,visible:!1,minResolution:0,maxResolution:4}),le=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_gew_info.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Gew, Info",name:"gew_info",style:Z,visible:!1}),se=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_gew_umn.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"U-Maßnahmen",name:"gew_umn",style:K,visible:!1}),ae=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_son_lin.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Sonstige, Linien",name:"son_lin",style:P,visible:!1}),ie=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_son_pun.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Sonstige, Punkte",name:"son_pun",style:j,visible:!1}),ce=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_ein.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Einläufe",name:"ein",style:z,visible:!1}),ue=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_que.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Querung",name:"que",style:V,visible:!1}),ge=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_due.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Düker",name:"due",style:B,visible:!1}),ye=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_weh.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Wehr",name:"weh",style:G,visible:!1}),de=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_bru_nlwkn.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Brücke (NLWKN)",name:"bru_nlwkn",style:F,visible:!1}),we=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_bru_andere.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Brücke (andere)",name:"bru_andere",style:W,visible:!1}),pe=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/exp_bw_sle.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Schleuse",name:"sle",style:O,visible:!0}),me=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/km_10_scal.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km10scal",style:C,visible:!0,minResolution:0,maxResolution:1}),be=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/km_100_scal.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km100scal",style:function(t,e){return H(t,t.get("TextString"),e)},visible:!0,minResolution:0,maxResolution:3}),fe=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/km_500_scal.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km500scal",style:function(t,e){return U(t,t.get("TextString"),e)},visible:!0,minResolution:0,maxResolution:10}),Se=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(t){return"./myLayers/gew.geojson?bbox="+t.join(",")},strategy:ol.loadingstrategy.bbox}),title:"gew",name:"gew",style:new ol.style.Style({fill:new ol.style.Fill({color:"rgba(0,28, 240, 0.4)"}),stroke:new ol.style.Stroke({color:"blue",width:2})})}),x=new ol.layer.Tile({title:"NSG",name:"NSG",source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Natur_wms/MapServer/WMSServer",params:{LAYERS:"Naturschutzgebiet",FORMAT:"image/png",TRANSPARENT:!0,TILED:!0}}),visible:!1,opacity:.5}),T=new ol.layer.Tile({title:"LSG",name:"LSG",source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Natur_wms/MapServer/WMSServer",params:{LAYERS:"Landschaftsschutzgebiet",FORMAT:"image/png",TRANSPARENT:!0,TILED:!0}}),visible:!1,opacity:.5}),E=new ol.layer.Tile({title:"ÜSG",name:"ÜSG",source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/HWSchutz_wms/MapServer/WMSServer",params:{LAYERS:"Überschwemmungsgebiete_Verordnungsfläechen_Niedersachsen11182",FORMAT:"image/png",TRANSPARENT:!0,TILED:!0}}),visible:!1,opacity:.5}),A=new ol.layer.Tile({title:"Fließgew.",name:"Fließgew.",source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/WRRL_wms/MapServer/WMSServer",params:{LAYERS:"Fliessgewaesser_WRRL",FORMAT:"image/png",TRANSPARENT:!0,TILED:!0}}),visible:!1,opacity:1}),R=new ol.layer.Tile({title:"GewWms",name:"GewWms",source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz",FORMAT:"image/png",TRANSPARENT:!0,TILED:!0}}),visible:!1,opacity:1}),ve=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"10",TILED:"true",VERSION:"1.3.0"}}),title:"2023",opacity:1,visible:!1}),he=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"9",TILED:"true",VERSION:"1.3.0"}}),title:"2020",opacity:1,visible:!1}),_e=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"8",TILED:"true",VERSION:"1.3.0"}}),title:"2017",opacity:1,visible:!1}),ke=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"7",TILED:"true",VERSION:"1.3.0"}}),title:"2014",opacity:1,visible:!1}),Le=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"6",TILED:"true",VERSION:"1.3.0"}}),title:"2012",opacity:1,visible:!1}),Me=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"5",TILED:"true",VERSION:"1.3.0"}}),title:"2010",opacity:1,visible:!1}),xe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"4",TILED:"true",VERSION:"1.3.0"}}),title:"2009",opacity:1,visible:!1}),Te=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"3",TILED:"true",VERSION:"1.3.0"}}),title:"2002",opacity:1,visible:!1}),Ee=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"2",TILED:"true",VERSION:"1.3.0"}}),title:"1970",opacity:1,visible:!1}),Ae=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"1",TILED:"true",VERSION:"1.3.0"}}),title:"1957",opacity:1,visible:!1}),Re=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"0",TILED:"true",VERSION:"1.3.0"}}),title:"1937",opacity:1,visible:!1}),Ie=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://sgx.geodatenzentrum.de/wms_basemapde",params:{LAYERS:"WMS DE BASEMAP.DE WEB RASTER",TILED:!0},crossOrigin:"anonymous"}),title:"base grau",visible:!1,minResolution:0,maxResolution:75});var Ne=new ol.layer.Tile({title:"DOP20 NI",opacity:1,visible:!1,type:"base",source:new ol.source.TileWMS({url:"https://www.geobasisdaten.niedersachsen.de/doorman/noauth/wms_ni_dop",attributions:"Orthophotos Niedersachsen, LGLN",params:{LAYERS:"dop20",TILED:!0,VERSION:"1.3.0"}})});const Oe=new ol.layer.Tile({title:"GoogleSat",type:"base",baseLayer:!1,visible:!1,source:new ol.source.TileImage({url:"http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}"})}),Ge=new ol.layer.Tile({title:"ESRI",type:"base",opacity:1,visible:!1,source:new ol.source.XYZ({attributions:"Powered by Esri",url:"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),Fe=new ol.layer.Tile({title:"osm",type:"base",source:new ol.source.OSM({url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",attributions:["© OpenStreetMap contributors",'Tiles courtesy of <a href="https://www.openstreetmap.org/"></a>']})}),We=new ol.control.LayerSwitcher({});a.addControl(We);var f=document.createElement("div");f.className="getMeasure";f.id="ButtonM";const S=document.createElement("button");S.innerHTML="M";f.appendChild(S);document.body.appendChild(f);var v=document.createElement("div");v.className="get-position ol-unselectable ol-control";v.id="Button";const p=document.createElement("button");p.innerHTML="P";v.appendChild(p);document.body.appendChild(v);var d=new ol.Geolocation({projection:a.getView().getProjection(),tracking:!1,trackingOptions:{enableHighAccuracy:!0,maximumAge:5e3}}),I=function(t){var e=d.getTracking();e?d.setTracking(!1):d.setTracking(!0)};p.addEventListener("click",I,!1);p.addEventListener("touchstart",I,!1);var N=new ol.Feature,L=new ol.Feature;function Be(){d.on("change:accuracyGeometry",function(){N.setGeometry(d.getAccuracyGeometry())}),d.on("change:position",function(){var t=d.getPosition();L.setGeometry(t?new ol.geom.Point(t):null),M.setCenter(t)})}function Ve(){d.setTracking(!0),Be()}function Pe(){d.setTracking(!1),N.setGeometry(null),L.setGeometry(null)}p.addEventListener("click",function(){var t=d.getTracking();t?Pe():Ve()});S.addEventListener("click",function(){alert("jetzt richtig gecklickt")});S.addEventListener("touchstart",function(){alert("jetzt richtig gecklickt")});const je=new ol.layer.Group({title:"WMS-Lay",fold:!0,fold:"close",layers:[T,x,E,A,R]}),Ce=new ol.layer.Group({title:"GN-DOP's",fold:!0,fold:"close",layers:[ve,he,_e,ke,Le,Me,xe,Te,Ee,Ae,Re]}),De=new ol.layer.Group({title:"Bauw.(L)",fold:!0,fold:"close",layers:[re,le,se,ae]}),ze=new ol.layer.Group({title:"Bauw.(P)",fold:!0,fold:"close",layers:[ie,ce,we,de,ue,ge,ye,pe]}),Ye=new ol.layer.Group({title:"Station",fold:!0,fold:"close",layers:[me,be,fe]}),Je=new ol.layer.Group({title:"Base",fold:!0,fold:"close",layers:[Ie,Ge,Oe,Ne,Fe]});a.addLayer(Je);a.addLayer(Ce);a.addLayer(ne);a.addLayer(Se);a.addLayer(je);a.addLayer(Ye);a.addLayer(De);a.addLayer(ze);const Ke=new ol.source.Vector({features:[L]}),He=new ol.layer.Vector({displayInLayerSwitcher:!1,source:Ke,style:new ol.style.Style({image:new ol.style.Circle({radius:8,fill:new ol.style.Fill({color:"blue"}),stroke:new ol.style.Stroke({color:"white",width:2})})})});a.addLayer(He);var Ue=document.getElementById("popup"),w=document.getElementById("popup-content"),k=document.getElementById("popup-closer"),y=new ol.Overlay({element:Ue,id:"1",autoPan:!0,autoPanAnimation:{duration:250}});a.addOverlay(y);k.onclick=function(){return y.setPosition(void 0),k.blur(),!1};a.on("singleclick",function(t){const e=[{layer:R,name:"GewWms"},{layer:A,name:"WRRL"},{layer:E,name:"ÜSG"},{layer:x,name:"NSG"},{layer:T,name:"LSG"}],n=a.getView().getResolution(),o=a.getView().getProjection();e.forEach(({layer:r,name:l})=>{if(r.getVisible()){const u=r.getSource().getGetFeatureInfoUrl(t.coordinate,n,o,{INFO_FORMAT:"text/html"});u&&fetch(u).then(i=>i.text()).then(i=>{if(i.trim()!==""){const g=document.getElementById("info");g&&g.remove();const s=document.createElement("div");s.id="info",s.style.border="1px solid black",s.style.background="white",s.style.opacity="1",s.style.overflowX="auto",s.innerHTML=`<strong>${l} Layer</strong><br>${i}`,s.style.position="absolute",s.style.bottom="150px",s.style.width="100%",s.style.left="0px",s.style.zIndex="9999";const c=document.createElement("span");c.innerHTML="&times;",c.style.position="absolute",c.style.top="5px",c.style.right="5px",c.style.cursor="pointer",c.style.fontSize="20px",c.addEventListener("click",function(){s.style.display="none"}),s.appendChild(c),document.body.appendChild(s)}})}})});var k=document.getElementById("popup-closer");a.on("click",function(t){a.forEachFeatureAtPixel(t.pixel,function(e,n){var o=n.get("name"),r=t.coordinates,l=e.get("beschreib_lang"),u="";if(l&&l.trim()!==""&&(u="<br><u>Beschreib (lang): </u>"+l+"</p>"),o!=="gew"&&o!=="km10scal"&&o!=="km100scal"&&o!=="km500scal"&&o!=="fsk"&&o!=="son_lin")if(console.log("Clicked on layer:",o),Y(e),e){r=e.getGeometry().getCoordinates(),y.setPosition(r);var i=e.get("foto1"),g="",s=e.get("foto2"),c="",m=e.get("foto3"),h="",b=e.get("foto4"),_="";i&&i.trim()!==""?g='<a href="'+i+`" onclick="window.open('`+i+`', '_blank'); return false;">Foto 1</a>`:g=" Foto 1 ",s&&s.trim()!==""?c='<a href="'+s+`" onclick="window.open('`+s+`', '_blank'); return false;">Foto 2</a>`:c=" Foto 2 ",m&&m.trim()!==""?h='<a href="'+m+`" onclick="window.open('`+m+`', '_blank'); return false;">Foto 3</a>`:h=" Foto 3 ",b&&b.trim()!==""?_='<a href="'+b+`" onclick="window.open('`+b+`', '_blank'); return false;">Foto 4</a>`:_=" Foto 4 ",w.innerHTML='<div style="max-height: 200px; overflow-y: auto;"><p style="font-weight: bold; text-decoration: underline;">'+e.get("name")+"</p><p>Id = "+e.get("bw_id")+" ("+e.get("KTR")+")</p><p>"+g+" "+c+" "+h+" "+_+"<br><u>Beschreibung (kurz): </u>"+e.get("beschreib")+"</p><p>"+u+"</p></div>"}else y.setPosition(void 0);o==="gew_info"&&(r=t.coordinate,y.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+e.get("IDUabschn")+'<br><p><a href="'+e.get("link1")+`" onclick="window.open('`+e.get("link1")+`', '_blank'); return false;">Link 1</a> <a href="`+e.get("link2")+`" onclick="window.open('`+e.get("link2")+`', '_blank'); return false;">Link 2</a> <a href="`+e.get("foto1")+`" onclick="window.open('`+e.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+e.get("foto2")+`" onclick="window.open('`+e.get("foto2")+`', '_blank'); return false;">Foto 2</a><br><p><a href="`+e.get("BSB")+`" onclick="window.open('`+e.get("BSB")+`', '_blank'); return false;">BSB  </a><a href="`+e.get("MNB")+`" onclick="window.open('`+e.get("MNB")+`', '_blank'); return false;">MNB</a><br> Kat: `+e.get("Kat")+"</a>, KTR: "+e.get("REFID_KTR")+"</a><br>von "+e.get("Bez_Anfang")+" bis "+e.get("Bez_Ende")+"</p></div>"),o==="gew_umn"&&(r=t.coordinate,y.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>ID: '+e.get("Massn_ID")+"<br><p>Bez (Art): "+e.get("UMnArtBez")+"<br><p>Bez (Gruppe): "+e.get("UMNGrBez")+"<br></div>"),o==="son_lin"&&(r=t.coordinate,y.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+e.get("name")+" ("+e.get("KTR")+')<br><p><a href="'+e.get("foto1")+`" onclick="window.open('`+e.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+e.get("foto2")+`" onclick="window.open('`+e.get("foto2")+`', '_blank'); return false;">Foto 2</a> <a href="`+e.get("foto3")+`" onclick="window.open('`+e.get("foto3")+`', '_blank'); return false;">Foto 3</a> <a href="`+e.get("foto4")+`" onclick="window.open('`+e.get("foto4")+`', '_blank'); return false;">Foto 4</a></p><br>Beschreib kurz = `+e.get("beschreib")+"</p>"+u+"</div>"),o==="gehoelz_vec"&&(r=t.coordinate,y.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Gehölzentwicklung<br><br>Bemerk: '+e.get("UMn_Bemerk")+"</p></div>"),o==="fsk"&&(e.get("Art")==="o"||e.get("Art")==="l"?(r=t.coordinate,y.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p><strong>gemark Flur Flurstück:</strong><br>'+e.get("Suche")+"</p>FSK: "+e.get("fsk")+"</p>FSK(ASL): "+e.get("FSK_ASL")+"</p><p>Eig.(öffentl.): "+e.get("Eig1")+"</p></div>"):(r=t.coordinate,y.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p><strong>gemark Flur Flurstück:</strong><br>'+e.get("Suche")+"</p>FSK: "+e.get("fsk")+"</p><p>Art (p=privat): "+e.get("Art")+"</p><p>Eig.(privat): "+e.get("Eig1")+"</p></div>"))})});document.addEventListener("DOMContentLoaded",function(){var t=document.getElementById("popup"),e=document.getElementById("popup-closer"),n=document.createElement("div"),o=document.createElement("a");o.textContent="Weitere Infos",o.href="#",o.addEventListener("click",function(r){r.preventDefault();var l=window.open("","_blank");l.document.body.innerHTML="<p>Hallo neue Welt</p>"}),n.appendChild(o),n.appendChild(e),t.appendChild(n)});document.getElementById("popup-closer").onclick=function(){return y.setPosition(void 0),!1};