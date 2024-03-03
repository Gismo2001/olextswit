(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=l(t);fetch(t.href,s)}})();window.searchAddress=function(){var o=document.getElementById("addressInput").value,l="c592a3d99b8d43878cf7d727d44187ce",r=`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(o)}&key=${l}`;fetch(r).then(t=>t.json()).then(t=>{if(t.results.length>0){var s=t.results[0].geometry;n.getView().setCenter(ol.proj.fromLonLat([s.lng,s.lat])),n.getView().setZoom(17),E([s.lng,s.lat])}else alert("Adresse nicht gefunden")}).catch(t=>{console.error("Geokodierung-Fehler:",t)})};var M=document.getElementById("addressInput");M.addEventListener("keydown",function(e){e.key==="Enter"&&searchAddress()});function E(e){var o=new ol.layer.Vector({source:new ol.source.Vector({features:[new ol.Feature({geometry:new ol.geom.Point(e)})]}),style:new ol.style.Style({image:new ol.style.Icon({src:"./data/marker1.jpg",scale:1})})});n.addLayer(o)}const O=new ol.control.Attribution({collapsible:!0}),A=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(209, 100, 253, 1)",width:3})}),R=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(209, 32, 253, 1)",width:4})}),I=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1)"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:4,radius:7,angle:Math.PI/4})}),N=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1"}),stroke:new ol.style.Stroke({color:"black",width:.5}),points:4,radius:7,angle:Math.PI/2})}),V=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:4,radius:7,angle:Math.PI/4})}),G=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"green"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:3,radius:7,rotation:0})}),F=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"blue"}),stroke:new ol.style.Stroke({color:"grey",width:1}),points:4,radius:7,angle:Math.PI/4})}),W=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(100, 100, 100, 1)"}),stroke:new ol.style.Stroke({color:"grey",width:1}),points:4,radius:6,angle:Math.PI/4})}),j=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"red"}),stroke:new ol.style.Stroke({color:"grey",width:2}),points:4,radius:7,angle:Math.PI/4})}),B=new ol.style.Style({stroke:new ol.style.Stroke({color:"grey",width:.5})});function P(e){const o=e.get("Ein_ord");let l,r;switch(o){case"1. Ordnung":l="rgba(0, 68, 255, .8)",r="black";break;case"2. Ordnung":l="rgba(214, 0, 0, .8)",r="black";break;case"3. Ordnung":l="rgba(114, 114, 114, .8)",r="black";break;case"Sonstige":l="rgba(27, 117, 0, .8)",r="black";break;default:l="grey",r="grey"}return new ol.style.Style({image:new ol.style.Circle({fill:new ol.style.Fill({color:l}),stroke:new ol.style.Stroke({color:r,width:.5}),radius:7})})}function D(e){const o=e.get("Art");let l,r;switch(o){case"p":l="rgba(200, 200, 200, .6)",r="black";break;case"o":l="rgba(255, 220, 220, .6)",r="black";break;case"l":l="rgba(255, 190, 150, .6)",r="black";break;default:l="rgba(255, 255, 255, 1)",r="grey"}return new ol.style.Style({fill:new ol.style.Fill({color:l}),stroke:new ol.style.Stroke({color:r,width:.5})})}const x=new ol.View({center:ol.proj.fromLonLat([7.35,52.7]),zoom:9}),n=new ol.Map({target:"map",view:x,controls:ol.control.defaults().extend([O])}),Y=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_allgm_fsk.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"fsk",style:D,visible:!1,minResolution:0,maxResolution:4}),J=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_gew_info.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"gew_info",style:A,visible:!1}),z=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_son_lin.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"son_lin",style:R,visible:!1}),C=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_son_pun.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"son_pun",style:I,visible:!1}),H=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_ein.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"ein",style:P,visible:!1}),q=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_que.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"que",style:N,visible:!1}),K=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_due.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"due",style:V,visible:!1}),U=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_weh.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"weh",style:G,visible:!1}),X=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_bru_nlwkn.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"bru_nlwkn",style:F,visible:!1}),Z=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_bru_andere.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"bru_andere",style:W,visible:!1}),$=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/exp_bw_sle.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"sle",style:j,visible:!0}),Q=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/km_10_scal.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km10scal",style:B,visible:!0,minResolution:0,maxResolution:1}),ee=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/km_100_scal.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km100scal",style:function(e,o){return oe(e,e.get("TextString"),o)},visible:!0,minResolution:0,maxResolution:3}),oe=function(e,o,l){var r=0,t=5;return l>r&&l<t?new ol.style.Style({text:new ol.style.Text({text:o,font:'normal 18px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10,fill:new ol.style.Fill({color:"rgba(128, 128, 128, 1)"}),stroke:new ol.style.Stroke({color:"#000000",width:.25})})}):null},te=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/km_500_scal.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km500scal",style:function(e,o){return re(e,e.get("TextString"),o)},visible:!0,minResolution:0,maxResolution:10}),re=function(e,o,l){var r=0,t=10;return l>r&&l<t?new ol.style.Style({text:new ol.style.Text({text:o,font:'normal 20px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10,fill:new ol.style.Fill({color:"rgba(0, 0, 0, 1)"}),stroke:new ol.style.Stroke({color:"#000000",width:.25})})}):null},le=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(e){return"./myLayers/gew.geojson?bbox="+e.join(",")},strategy:ol.loadingstrategy.bbox}),title:"gew",name:"gew",style:new ol.style.Style({fill:new ol.style.Fill({color:"rgba(0,28, 240, 0.4)"}),stroke:new ol.style.Stroke({color:"blue",width:2})})}),se=new ol.control.LayerSwitcher({});n.addControl(se);var b=document.createElement("div");b.className="get-position ol-unselectable ol-control";b.id="Button";const y=document.createElement("button");y.innerHTML="P";b.appendChild(y);document.body.appendChild(b);var a=new ol.Geolocation({projection:n.getView().getProjection(),tracking:!1,trackingOptions:{enableHighAccuracy:!0,maximumAge:5e3}}),T=function(e){console.log("Button wurde geklickt!");var o=a.getTracking();o?(a.setTracking(!1),console.log("Tracking wurde gestoppt.")):(a.setTracking(!0),console.log("Tracking wurde gestartet."))};y.addEventListener("click",T,!1);y.addEventListener("touchstart",T,!1);var k=new ol.Feature,h=new ol.Feature;new ol.layer.Vector({map:n,source:new ol.source.Vector({features:[k,h]}),style:new ol.style.Style({image:new ol.style.Circle({radius:7,fill:new ol.style.Fill({color:"blue"}),stroke:new ol.style.Stroke({color:"white",width:2})})})});function ne(){a.on("change:accuracyGeometry",function(){k.setGeometry(a.getAccuracyGeometry())}),a.on("change:position",function(){var e=a.getPosition();h.setGeometry(e?new ol.geom.Point(e):null),x.setCenter(e)})}function ae(){a.setTracking(!0),ne()}function ie(){a.setTracking(!1),k.setGeometry(null),h.setGeometry(null)}y.addEventListener("click",function(){var e=a.getTracking();e?ie():ae()});const ce=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_1._Ordnung29778",TILED:!0,TRANSPARENT:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"1. Ordn.",visible:!0}),ue=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_2._Ordnung8177",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"2. Ordn.",visible:!1,minResolution:0,maxResolution:75}),ye=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_3.Ordnung9928",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"3. Ordn.",visible:!1,minResolution:0,maxResolution:6}),ge=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/HWSchutz_wms/MapServer/WMSServer",params:{LAYERS:"Überschwemmungsgebiete_Verordnungsfläechen_Niedersachsen11182",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"Uesg",visible:!1,minResolution:0,maxResolution:10}),we=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"10",TILED:"true",VERSION:"1.3.0"}}),title:"2023",opacity:1,visible:!1}),de=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"9",TILED:"true",VERSION:"1.3.0"}}),title:"2020",opacity:1,visible:!1}),pe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"8",TILED:"true",VERSION:"1.3.0"}}),title:"2017",opacity:1,visible:!1}),be=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"7",TILED:"true",VERSION:"1.3.0"}}),title:"2014",opacity:1,visible:!1}),fe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"6",TILED:"true",VERSION:"1.3.0"}}),title:"2012",opacity:1,visible:!1}),me=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"5",TILED:"true",VERSION:"1.3.0"}}),title:"2010",opacity:1,visible:!1}),Se=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"4",TILED:"true",VERSION:"1.3.0"}}),title:"2009",opacity:1,visible:!1}),_e=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"3",TILED:"true",VERSION:"1.3.0"}}),title:"2002",opacity:1,visible:!1}),ke=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"2",TILED:"true",VERSION:"1.3.0"}}),title:"1970",opacity:1,visible:!1}),he=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"1",TILED:"true",VERSION:"1.3.0"}}),title:"1957",opacity:1,visible:!1}),ve=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"0",TILED:"true",VERSION:"1.3.0"}}),title:"1937",opacity:1,visible:!1}),Le=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://sgx.geodatenzentrum.de/wms_basemapde",params:{LAYERS:"WMS DE BASEMAP.DE WEB RASTER",TILED:!0},crossOrigin:"anonymous"}),title:"base grau",visible:!1,minResolution:0,maxResolution:75});var xe=new ol.layer.Tile({title:"DOP20 NI",opacity:1,visible:!1,type:"base",source:new ol.source.TileWMS({url:"https://www.geobasisdaten.niedersachsen.de/doorman/noauth/wms_ni_dop",attributions:"Orthophotos Niedersachsen, LGLN",params:{LAYERS:"dop20",TILED:!0,VERSION:"1.3.0"}})});const Te=new ol.layer.Tile({title:"GoogleSat",type:"base",baseLayer:!1,visible:!1,source:new ol.source.TileImage({url:"http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}"})}),Me=new ol.layer.Tile({title:"ESRI",type:"base",opacity:1,visible:!1,source:new ol.source.XYZ({attributions:"Powered by Esri",url:"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),Ee=new ol.layer.Tile({title:"osm",type:"base",source:new ol.source.OSM({url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",attributions:["© OpenStreetMap contributors",'Tiles courtesy of <a href="https://www.openstreetmap.org/"></a>']})}),v=new ol.layer.Group({title:"WMS-Lay",fold:!0,fold:"close",layers:[ye,ue,ce,ge]});v.setVisible(!1);const Oe=new ol.layer.Group({title:"GN-DOP's",fold:!0,fold:"close",layers:[we,de,pe,be,fe,me,Se,_e,ke,he,ve]});v.setVisible(!1);const Ae=new ol.layer.Group({title:"Bauw.",fold:!0,fold:"close",layers:[J,z,C,H,Z,X,q,K,U,$]}),Re=new ol.layer.Group({title:"Station",fold:!0,fold:"close",layers:[Q,ee,te]}),Ie=new ol.layer.Group({title:"Base",fold:!0,fold:"close",layers:[Le,Me,Te,xe,Ee]});n.addLayer(Ie);n.addLayer(Oe);n.addLayer(Y);n.addLayer(le);n.addLayer(v);n.addLayer(Re);n.addLayer(Ae);var Ne=document.getElementById("popup"),u=document.getElementById("popup-content"),L=document.getElementById("popup-closer"),i=new ol.Overlay({element:Ne,autoPan:!0,autoPanAnimation:{duration:250}});n.addOverlay(i);L.onclick=function(){return i.setPosition(void 0),L.blur(),!1};n.on("click",function(e){n.forEachFeatureAtPixel(e.pixel,function(o,l){var r=l.get("title");console.log(r);var t=e.coordinates,s=o.get("beschreib_lang"),c="";if(s&&s.trim()!==""&&(c="<br><u>Beschreib (lang): </u>"+s+"</p>"),r!=="gew"&&r!=="km10scal"&&r!=="km100scal"&&r!=="km500scal"&&r!=="fsk"&&r!=="son_lin")if(console.log("Clicked on layer:",r),o){t=o.getGeometry().getCoordinates(),i.setPosition(t);var g=o.get("foto1"),f="",w=o.get("foto2"),m="",d=o.get("foto3"),S="",p=o.get("foto4"),_="";g&&g.trim()!==""?f='<a href="'+g+`" onclick="window.open('`+g+`', '_blank'); return false;">Foto 1</a>`:f=" Foto 1 ",w&&w.trim()!==""?m='<a href="'+w+`" onclick="window.open('`+w+`', '_blank'); return false;">Foto 2</a>`:m=" Foto 2 ",d&&d.trim()!==""?S='<a href="'+d+`" onclick="window.open('`+d+`', '_blank'); return false;">Foto 3</a>`:S=" Foto 3 ",p&&p.trim()!==""?_='<a href="'+p+`" onclick="window.open('`+p+`', '_blank'); return false;">Foto 4</a>`:_=" Foto 4 ",u.innerHTML='<div style="max-height: 200px; overflow-y: auto;"><p style="font-weight: bold; text-decoration: underline;">'+o.get("Name")+"</p><p>Id = "+o.get("bw_id")+"</p><p>"+f+" "+m+" "+S+" "+_+"<br><u>Beschreibung (kurz): </u>"+o.get("Beschreib")+"</p><p>"+c+"</p></div>"}else i.setPosition(void 0);r==="gew_info"&&(t=e.coordinate,i.setPosition(t),u.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+o.get("IDUabschn")+'<br><p><a href="'+o.get("link1")+`" onclick="window.open('`+o.get("link1")+`', '_blank'); return false;">Link 1</a> <a href="`+o.get("link2")+`" onclick="window.open('`+o.get("link2")+`', '_blank'); return false;">Link 2</a> <a href="`+o.get("foto1")+`" onclick="window.open('`+o.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+o.get("foto2")+`" onclick="window.open('`+o.get("foto2")+`', '_blank'); return false;">Foto 2</a></p>Kat `+o.get("Kat")+"</a><br>von = "+o.get("Bez_Anfang")+" bis "+o.get("Bez_Ende")+"</p></div>"),r==="son_lin"&&(t=e.coordinate,i.setPosition(t),u.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+o.get("Name")+'<br><p><a href="'+o.get("foto1")+`" onclick="window.open('`+o.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+o.get("foto2")+`" onclick="window.open('`+o.get("foto2")+`', '_blank'); return false;">Foto 2</a> <a href="`+o.get("foto3")+`" onclick="window.open('`+o.get("foto3")+`', '_blank'); return false;">Foto 3</a> <a href="`+o.get("foto4")+`" onclick="window.open('`+o.get("foto4")+`', '_blank'); return false;">Foto 4</a></p><br>Beschreib kurz = `+o.get("Beschreib")+"</p>"+c+"</div>"),r==="fsk"&&(t=e.coordinate,i.setPosition(t),u.innerHTML=u.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p><strong>gemark Flur Flurstück:</strong><br>'+o.get("Suche")+"</p>FSK: "+o.get("fsk")+"</p><p>Art (p=privat): "+o.get("Art")+"</p></div>")})});document.getElementById("popup-closer").onclick=function(){return i.setPosition(void 0),!1};
