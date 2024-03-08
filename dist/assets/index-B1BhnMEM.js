(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}})();const x=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"red"}),stroke:new ol.style.Stroke({color:"grey",width:2}),points:4,radius:7,angle:Math.PI/4})}),T=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"green"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:3,radius:7,rotation:0})}),E=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"blue"}),stroke:new ol.style.Stroke({color:"grey",width:1}),points:4,radius:7,angle:Math.PI/4})}),A=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(100, 100, 100, 1)"}),stroke:new ol.style.Stroke({color:"grey",width:1}),points:4,radius:6,angle:Math.PI/4})}),O=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:4,radius:7,angle:Math.PI/4})}),R=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1"}),stroke:new ol.style.Stroke({color:"black",width:.5}),points:4,radius:7,angle:Math.PI/2})}),I=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(209, 32, 253, 1)",width:4})}),N=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1)"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:4,radius:7,angle:Math.PI/4})}),G=new ol.style.Style({stroke:new ol.style.Stroke({color:"grey",width:.5})}),F=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(173, 114, 3, 1)",width:3})});function B(o){const e=o.get("Ein_ord");let l,r;switch(e){case"1. Ordnung":l="rgba(0, 68, 255, .8)",r="black";break;case"2. Ordnung":l="rgba(214, 0, 0, .8)",r="black";break;case"3. Ordnung":l="rgba(114, 114, 114, .8)",r="black";break;case"Sonstige":l="rgba(27, 117, 0, .8)",r="black";break;default:l="grey",r="grey"}return new ol.style.Style({image:new ol.style.Circle({fill:new ol.style.Fill({color:l}),stroke:new ol.style.Stroke({color:r,width:.5}),radius:7})})}function W(o){const e=o.get("Art");let l,r;switch(e){case"p":l="rgba(200, 200, 200, .6)",r="black";break;case"o":l="rgba(255, 220, 220, .6)",r="black";break;case"l":l="rgba(255, 190, 150, .6)",r="black";break;default:l="rgba(255, 255, 255, 1)",r="grey"}return new ol.style.Style({fill:new ol.style.Fill({color:l}),stroke:new ol.style.Stroke({color:r,width:.5})})}function V(o){var e=new ol.layer.Vector({source:new ol.source.Vector({features:[new ol.Feature({geometry:new ol.geom.Point(o)})]}),style:new ol.style.Style({image:new ol.style.Icon({src:"./data/marker1.jpg",scale:1})})});map.addLayer(e)}var P={};const j=new ol.style.Style({stroke:new ol.style.Stroke({color:"black",width:4}),geometry:function(o){const e=o.getGeometry().getCoordinates(),l=new ol.geom.LineString(e),r=e[e.length-1],t=e[e.length-2],n=r[0]-t[0],c=r[1]-t[1],u=Math.atan2(c,n),g=15,y=[r[0]-g*Math.cos(u-Math.PI/8),r[1]-g*Math.sin(u-Math.PI/8)],d=[r[0]-g*Math.cos(u+Math.PI/8),r[1]-g*Math.sin(u+Math.PI/8)];return l.setCoordinates([...e,y,r,d]),l}}),D=new ol.style.Style({geometry:function(o){const e=o.getGeometry().getCoordinates();return new ol.geom.Point(e[e.length-1])},image:new ol.style.Circle({radius:6,fill:new ol.style.Fill({color:"red"}),stroke:new ol.style.Stroke({color:"black",width:2})})}),C=[j,D];window.searchAddress=function(){var e=document.getElementById("addressInput").value,l=P.API_KEY||"c592a3d99b8d43878cf7d727d44187ce",r=`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(e)}&key=${l}`;fetch(r).then(t=>t.json()).then(t=>{if(t.results.length>0){var n=t.results[0].geometry;s.getView().setCenter(ol.proj.fromLonLat([n.lng,n.lat])),s.getView().setZoom(17),V([n.lng,n.lat])}else alert("Adresse nicht gefunden")}).catch(t=>{console.error("Geokodierung-Fehler:",t)})};var Y=document.getElementById("addressInput");Y.addEventListener("keydown",function(o){o.key==="Enter"&&searchAddress()});const z=new ol.control.Attribution({collapsible:!1}),J=new ol.control.ZoomToExtent({extent:[727361,6839277,858148,6990951]}),L=new ol.View({center:ol.proj.fromLonLat([7.35,52.7]),zoom:9}),s=new ol.Map({target:"map",view:L,controls:ol.control.defaults().extend([z,J])}),K=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/gehoelz_vec.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Gehölz(Plan)",name:"gehoelz_vec",style:F,visible:!1}),H=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_allgm_fsk.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"fsk",name:"fsk",style:W,visible:!1,minResolution:0,maxResolution:4}),q=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_gew_info.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Gew, Info",name:"gew_info",style:C,visible:!1}),U=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_son_lin.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Sonstige, Linien",name:"son_lin",style:I,visible:!1}),Z=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_son_pun.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Sonstige, Punkte",name:"son_pun",style:N,visible:!1}),X=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_ein.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Einläufe",name:"ein",style:B,visible:!1}),$=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_que.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Querung",name:"que",style:R,visible:!1}),Q=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_due.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Düker",name:"due",style:O,visible:!1}),ee=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_weh.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Wehr",name:"weh",style:T,visible:!1}),oe=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_bru_nlwkn.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Brücke (NLWKN)",name:"bru_nlwkn",style:E,visible:!1}),te=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_bru_andere.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Brücke (andere)",name:"bru_andere",style:A,visible:!1}),re=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_sle.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Schleuse",name:"sle",style:x,visible:!0}),le=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/km_10_scal.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km10scal",style:G,visible:!0,minResolution:0,maxResolution:1}),ne=function(o,e,l){var r=0,t=5;return l>r&&l<t?new ol.style.Style({text:new ol.style.Text({text:e,font:'normal 18px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10}),stroke:new ol.style.Stroke({color:"black",width:1})}):null},se=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/km_100_scal.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km100scal",style:function(o,e){return ne(o,o.get("TextString"),e)},visible:!0,minResolution:0,maxResolution:3}),ae=function(o,e,l){var r=0,t=10;return l>r&&l<t?new ol.style.Style({text:new ol.style.Text({text:e,font:'normal 20px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10,fill:new ol.style.Fill({color:"rgba(0, 0, 0, 1)"})}),stroke:new ol.style.Stroke({color:"black",width:2})}):null},ie=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/km_500_scal.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km500scal",style:function(o,e){return ae(o,o.get("TextString"),e)},visible:!0,minResolution:0,maxResolution:10}),ce=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/gew.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"gew",name:"gew",style:new ol.style.Style({fill:new ol.style.Fill({color:"rgba(0,28, 240, 0.4)"}),stroke:new ol.style.Stroke({color:"blue",width:2})})}),ue=new ol.control.LayerSwitcher({});s.addControl(ue);var S=document.createElement("div");S.className="get-position ol-unselectable ol-control";S.id="Button";const p=document.createElement("button");p.innerHTML="P";S.appendChild(p);document.body.appendChild(S);var h=document.createElement("div");h.className="getMeasure";h.id="ButtonM";const b=document.createElement("button");b.innerHTML="M";h.appendChild(b);document.body.appendChild(h);var i=new ol.Geolocation({projection:s.getView().getProjection(),tracking:!1,trackingOptions:{enableHighAccuracy:!0,maximumAge:5e3}}),M=function(o){console.log("Button wurde geklickt!");var e=i.getTracking();e?(i.setTracking(!1),console.log("Tracking wurde gestoppt.")):(i.setTracking(!0),console.log("Tracking wurde gestartet."))};p.addEventListener("click",M,!1);p.addEventListener("touchstart",M,!1);b.addEventListener("click",function(){});b.addEventListener("touchstart",function(){});function ge(){i.on("change:accuracyGeometry",function(){accuracyFeature.setGeometry(i.getAccuracyGeometry())}),i.on("change:position",function(){var o=i.getPosition();positionFeature.setGeometry(o?new ol.geom.Point(o):null),L.setCenter(o)})}function ye(){i.setTracking(!0),ge()}function we(){i.setTracking(!1),accuracyFeature.setGeometry(null),positionFeature.setGeometry(null)}p.addEventListener("click",function(){var o=i.getTracking();o?we():ye()});b.addEventListener("click",function(){alert("gecklickt")});const de=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_1._Ordnung29778",TILED:!0,TRANSPARENT:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"1. Ordn.",visible:!1}),pe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_2._Ordnung8177",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"2. Ordn.",visible:!1,minResolution:0,maxResolution:75}),be=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_3.Ordnung9928",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"3. Ordn.",visible:!1,minResolution:0,maxResolution:6}),me=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/HWSchutz_wms/MapServer/WMSServer",params:{LAYERS:"Überschwemmungsgebiete_Verordnungsfläechen_Niedersachsen11182",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"Uesg",visible:!1,opacity:.5,minResolution:0,maxResolution:10}),fe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Natur_wms/MapServer/WMSServer",params:{LAYERS:"Fauna-Flora-Habitat-Gebiete_(FFH)_in_Niedersachsen44579",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"NSG",visible:!1,opacity:.5,minResolution:0,maxResolution:10}),Se=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"10",TILED:"true",VERSION:"1.3.0"}}),title:"2023",opacity:1,visible:!1}),he=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"9",TILED:"true",VERSION:"1.3.0"}}),title:"2020",opacity:1,visible:!1}),_e=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"8",TILED:"true",VERSION:"1.3.0"}}),title:"2017",opacity:1,visible:!1}),ke=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"7",TILED:"true",VERSION:"1.3.0"}}),title:"2014",opacity:1,visible:!1}),ve=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"6",TILED:"true",VERSION:"1.3.0"}}),title:"2012",opacity:1,visible:!1}),Le=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"5",TILED:"true",VERSION:"1.3.0"}}),title:"2010",opacity:1,visible:!1}),Me=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"4",TILED:"true",VERSION:"1.3.0"}}),title:"2009",opacity:1,visible:!1}),xe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"3",TILED:"true",VERSION:"1.3.0"}}),title:"2002",opacity:1,visible:!1}),Te=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"2",TILED:"true",VERSION:"1.3.0"}}),title:"1970",opacity:1,visible:!1}),Ee=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"1",TILED:"true",VERSION:"1.3.0"}}),title:"1957",opacity:1,visible:!1}),Ae=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"0",TILED:"true",VERSION:"1.3.0"}}),title:"1937",opacity:1,visible:!1}),Oe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://sgx.geodatenzentrum.de/wms_basemapde",params:{LAYERS:"WMS DE BASEMAP.DE WEB RASTER",TILED:!0},crossOrigin:"anonymous"}),title:"base grau",visible:!1,minResolution:0,maxResolution:75});var Re=new ol.layer.Tile({title:"DOP20 NI",opacity:1,visible:!1,type:"base",source:new ol.source.TileWMS({url:"https://www.geobasisdaten.niedersachsen.de/doorman/noauth/wms_ni_dop",attributions:"Orthophotos Niedersachsen, LGLN",params:{LAYERS:"dop20",TILED:!0,VERSION:"1.3.0"}})});const Ie=new ol.layer.Tile({title:"GoogleSat",type:"base",baseLayer:!1,visible:!1,source:new ol.source.TileImage({url:"http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}"})}),Ne=new ol.layer.Tile({title:"ESRI",type:"base",opacity:1,visible:!1,source:new ol.source.XYZ({attributions:"Powered by Esri",url:"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),Ge=new ol.layer.Tile({title:"osm",type:"base",source:new ol.source.OSM({url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",attributions:["© OpenStreetMap contributors",'Tiles courtesy of <a href="https://www.openstreetmap.org/"></a>']})}),Fe=new ol.layer.Group({title:"WMS-Lay",fold:!0,fold:"close",layers:[be,pe,de,fe,me]}),Be=new ol.layer.Group({title:"GN-DOP's",fold:!0,fold:"close",layers:[Se,he,_e,ke,ve,Le,Me,xe,Te,Ee,Ae]}),We=new ol.layer.Group({title:"Bauw.",fold:!0,fold:"close",layers:[K,q,U,Z,X,te,oe,$,Q,ee,re]}),Ve=new ol.layer.Group({title:"Station",fold:!0,fold:"close",layers:[le,se,ie]}),Pe=new ol.layer.Group({title:"Base",fold:!0,fold:"close",layers:[Oe,Ne,Ie,Re,Ge]});s.addLayer(Pe);s.addLayer(Be);s.addLayer(H);s.addLayer(ce);s.addLayer(Fe);s.addLayer(Ve);s.addLayer(We);var je=document.getElementById("popup"),w=document.getElementById("popup-content"),v=document.getElementById("popup-closer"),a=new ol.Overlay({element:je,id:"1",autoPan:!0,autoPanAnimation:{duration:250}});s.addOverlay(a);v.onclick=function(){return a.setPosition(void 0),v.blur(),!1};s.on("click",function(o){s.forEachFeatureAtPixel(o.pixel,function(e,l){var r=l.get("name"),t=o.coordinates,n=e.get("beschreib_lang"),c="";if(n&&n.trim()!==""&&(c="<br><u>Beschreib (lang): </u>"+n+"</p>"),r!=="gew"&&r!=="km10scal"&&r!=="km100scal"&&r!=="km500scal"&&r!=="fsk"&&r!=="son_lin")if(console.log("Clicked on layer:",r),e){t=e.getGeometry().getCoordinates(),a.setPosition(t);var u=e.get("foto1"),g="",y=e.get("foto2"),d="",m=e.get("foto3"),_="",f=e.get("foto4"),k="";u&&u.trim()!==""?g='<a href="'+u+`" onclick="window.open('`+u+`', '_blank'); return false;">Foto 1</a>`:g=" Foto 1 ",y&&y.trim()!==""?d='<a href="'+y+`" onclick="window.open('`+y+`', '_blank'); return false;">Foto 2</a>`:d=" Foto 2 ",m&&m.trim()!==""?_='<a href="'+m+`" onclick="window.open('`+m+`', '_blank'); return false;">Foto 3</a>`:_=" Foto 3 ",f&&f.trim()!==""?k='<a href="'+f+`" onclick="window.open('`+f+`', '_blank'); return false;">Foto 4</a>`:k=" Foto 4 ",w.innerHTML='<div style="max-height: 200px; overflow-y: auto;"><p style="font-weight: bold; text-decoration: underline;">'+e.get("name")+"</p><p>Id = "+e.get("bw_id")+" ("+e.get("KTR")+")</p><p>"+g+" "+d+" "+_+" "+k+"<br><u>Beschreibung (kurz): </u>"+e.get("beschreib")+"</p><p>"+c+"</p></div>"}else a.setPosition(void 0);r==="gew_info"&&(t=o.coordinate,a.setPosition(t),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+e.get("IDUabschn")+'<br><p><a href="'+e.get("link1")+`" onclick="window.open('`+e.get("link1")+`', '_blank'); return false;">Link 1</a> <a href="`+e.get("link2")+`" onclick="window.open('`+e.get("link2")+`', '_blank'); return false;">Link 2</a> <a href="`+e.get("foto1")+`" onclick="window.open('`+e.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+e.get("foto2")+`" onclick="window.open('`+e.get("foto2")+`', '_blank'); return false;">Foto 2</a><br><p><a href="`+e.get("BSB")+`" onclick="window.open('`+e.get("BSB")+`', '_blank'); return false;">BSB  </a><a href="`+e.get("MNB")+`" onclick="window.open('`+e.get("MNB")+`', '_blank'); return false;">MNB</a><br> Kat: `+e.get("Kat")+"</a>, KTR: "+e.get("REFID_KTR")+"</a><br>von "+e.get("Bez_Anfang")+" bis "+e.get("Bez_Ende")+"</p></div>"),r==="son_lin"&&(t=o.coordinate,a.setPosition(t),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+e.get("name")+" ("+e.get("KTR")+')<br><p><a href="'+e.get("foto1")+`" onclick="window.open('`+e.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+e.get("foto2")+`" onclick="window.open('`+e.get("foto2")+`', '_blank'); return false;">Foto 2</a> <a href="`+e.get("foto3")+`" onclick="window.open('`+e.get("foto3")+`', '_blank'); return false;">Foto 3</a> <a href="`+e.get("foto4")+`" onclick="window.open('`+e.get("foto4")+`', '_blank'); return false;">Foto 4</a></p><br>Beschreib kurz = `+e.get("beschreib")+"</p>"+c+"</div>"),r==="gehoelz_vec"&&(t=o.coordinate,a.setPosition(t),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Gehölzentwicklung<br><br>Bemerk: '+e.get("UMn_Bemerk")+"</p></div>"),r==="fsk"&&(e.get("Art")==="o"||e.get("Art")==="l"?(t=o.coordinate,a.setPosition(t),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p><strong>gemark Flur Flurstück:</strong><br>'+e.get("Suche")+"</p>FSK: "+e.get("fsk")+"</p>FSK(ASL): "+e.get("FSK_ASL")+"</p><p>Eig.(öffentl.): "+e.get("Eig1")+"</p></div>"):(t=o.coordinate,a.setPosition(t),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p><strong>gemark Flur Flurstück:</strong><br>'+e.get("Suche")+"</p>FSK: "+e.get("fsk")+"</p><p>Art (p=privat): "+e.get("Art")+"</p></div>"))})});document.getElementById("popup-closer").onclick=function(){return a.setPosition(void 0),!1};
