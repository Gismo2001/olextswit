(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function l(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(r){if(r.ep)return;r.ep=!0;const n=l(r);fetch(r.href,n)}})();const x=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(173, 114, 3, 1)",width:3})});var T={};window.searchAddress=function(){var e=document.getElementById("addressInput").value,l=T.API_KEY||"c592a3d99b8d43878cf7d727d44187ce",t=`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(e)}&key=${l}`;fetch(t).then(r=>r.json()).then(r=>{if(r.results.length>0){var n=r.results[0].geometry;s.getView().setCenter(ol.proj.fromLonLat([n.lng,n.lat])),s.getView().setZoom(17),O([n.lng,n.lat])}else alert("Adresse nicht gefunden")}).catch(r=>{console.error("Geokodierung-Fehler:",r)})};var E=document.getElementById("addressInput");E.addEventListener("keydown",function(o){o.key==="Enter"&&searchAddress()});function O(o){var e=new ol.layer.Vector({source:new ol.source.Vector({features:[new ol.Feature({geometry:new ol.geom.Point(o)})]}),style:new ol.style.Style({image:new ol.style.Icon({src:"./data/marker1.jpg",scale:1})})});s.addLayer(e)}const R=new ol.style.Style({stroke:new ol.style.Stroke({color:"black",width:4}),geometry:function(o){const e=o.getGeometry().getCoordinates(),l=new ol.geom.LineString(e),t=e[e.length-1],r=e[e.length-2],n=t[0]-r[0],i=t[1]-r[1],c=Math.atan2(i,n),g=15,y=[t[0]-g*Math.cos(c-Math.PI/8),t[1]-g*Math.sin(c-Math.PI/8)],d=[t[0]-g*Math.cos(c+Math.PI/8),t[1]-g*Math.sin(c+Math.PI/8)];return l.setCoordinates([...e,y,t,d]),l}}),A=new ol.style.Style({geometry:function(o){const e=o.getGeometry().getCoordinates();return new ol.geom.Point(e[e.length-1])},image:new ol.style.Circle({radius:6,fill:new ol.style.Fill({color:"red"}),stroke:new ol.style.Stroke({color:"black",width:2})})}),I=[R,A],N=new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(209, 32, 253, 1)",width:4})}),G=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1)"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:4,radius:7,angle:Math.PI/4})}),F=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1"}),stroke:new ol.style.Stroke({color:"black",width:.5}),points:4,radius:7,angle:Math.PI/2})}),V=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(209, 32, 253, 1"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:4,radius:7,angle:Math.PI/4})}),B=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"green"}),stroke:new ol.style.Stroke({color:"black",width:2}),points:3,radius:7,rotation:0})}),W=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"blue"}),stroke:new ol.style.Stroke({color:"grey",width:1}),points:4,radius:7,angle:Math.PI/4})}),P=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"rgba(100, 100, 100, 1)"}),stroke:new ol.style.Stroke({color:"grey",width:1}),points:4,radius:6,angle:Math.PI/4})}),j=new ol.style.Style({image:new ol.style.RegularShape({fill:new ol.style.Fill({color:"red"}),stroke:new ol.style.Stroke({color:"grey",width:2}),points:4,radius:7,angle:Math.PI/4})}),D=new ol.style.Style({stroke:new ol.style.Stroke({color:"grey",width:.5})});function Y(o){const e=o.get("Ein_ord");let l,t;switch(e){case"1. Ordnung":l="rgba(0, 68, 255, .8)",t="black";break;case"2. Ordnung":l="rgba(214, 0, 0, .8)",t="black";break;case"3. Ordnung":l="rgba(114, 114, 114, .8)",t="black";break;case"Sonstige":l="rgba(27, 117, 0, .8)",t="black";break;default:l="grey",t="grey"}return new ol.style.Style({image:new ol.style.Circle({fill:new ol.style.Fill({color:l}),stroke:new ol.style.Stroke({color:t,width:.5}),radius:7})})}function z(o){const e=o.get("Art");let l,t;switch(e){case"p":l="rgba(200, 200, 200, .6)",t="black";break;case"o":l="rgba(255, 220, 220, .6)",t="black";break;case"l":l="rgba(255, 190, 150, .6)",t="black";break;default:l="rgba(255, 255, 255, 1)",t="grey"}return new ol.style.Style({fill:new ol.style.Fill({color:l}),stroke:new ol.style.Stroke({color:t,width:.5})})}const L=new ol.View({center:ol.proj.fromLonLat([7.35,52.7]),zoom:9}),C=new ol.control.Attribution({collapsible:!1}),J=new ol.control.ZoomToExtent({extent:[727361,6839277,858148,6990951]}),s=new ol.Map({target:"map",view:L,controls:ol.control.defaults().extend([C,J])}),H=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/gehoelz_vec.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Gehölz(Plan)",name:"gehoelz_vec",style:x,visible:!1}),K=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_allgm_fsk.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"fsk",name:"fsk",style:z,visible:!1,minResolution:0,maxResolution:4}),q=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_gew_info.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Gew, Info",name:"gew_info",style:I,visible:!1}),U=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_son_lin.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Sonstige, Linien",name:"son_lin",style:N,visible:!1}),Z=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_son_pun.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Sonstige, Punkte",name:"son_pun",style:G,visible:!1}),X=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_ein.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Einläufe",name:"ein",style:Y,visible:!1}),$=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_que.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Querung",name:"que",style:F,visible:!1}),Q=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_due.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Düker",name:"due",style:V,visible:!1}),ee=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_weh.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Wehr",name:"weh",style:B,visible:!1}),oe=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_bru_nlwkn.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Brücke (NLWKN)",name:"bru_nlwkn",style:W,visible:!1}),te=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_bru_andere.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Brücke (andere)",name:"bru_andere",style:P,visible:!1}),re=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/exp_bw_sle.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"Schleuse",name:"sle",style:j,visible:!0}),le=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/km_10_scal.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km10scal",style:D,visible:!0,minResolution:0,maxResolution:1}),ne=function(o,e,l){var t=0,r=5;return l>t&&l<r?new ol.style.Style({text:new ol.style.Text({text:e,font:'normal 18px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10}),stroke:new ol.style.Stroke({color:"black",width:1})}):null},se=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/km_100_scal.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km100scal",style:function(o,e){return ne(o,o.get("TextString"),e)},visible:!0,minResolution:0,maxResolution:3}),ae=function(o,e,l){var t=0,r=10;return l>t&&l<r?new ol.style.Style({text:new ol.style.Text({text:e,font:'normal 20px "Arial Light", "Helvetica Neue Light", Arial, sans-serif',offsetX:-10,offsetY:10,fill:new ol.style.Fill({color:"rgba(0, 0, 0, 1)"})}),stroke:new ol.style.Stroke({color:"black",width:2})}):null},ie=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/km_500_scal.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"km500scal",style:function(o,e){return ae(o,o.get("TextString"),e)},visible:!0,minResolution:0,maxResolution:10}),ce=new ol.layer.Vector({source:new ol.source.Vector({format:new ol.format.GeoJSON,url:function(o){return"./myLayers/gew.geojson?bbox="+o.join(",")},strategy:ol.loadingstrategy.bbox}),title:"gew",name:"gew",style:new ol.style.Style({fill:new ol.style.Fill({color:"rgba(0,28, 240, 0.4)"}),stroke:new ol.style.Stroke({color:"blue",width:2})})}),ue=new ol.control.LayerSwitcher({});s.addControl(ue);var f=document.createElement("div");f.className="get-position ol-unselectable ol-control";f.id="Button";const b=document.createElement("button");b.innerHTML="P";f.appendChild(b);document.body.appendChild(f);var a=new ol.Geolocation({projection:s.getView().getProjection(),tracking:!1,trackingOptions:{enableHighAccuracy:!0,maximumAge:5e3}}),M=function(o){console.log("Button wurde geklickt!");var e=a.getTracking();e?(a.setTracking(!1),console.log("Tracking wurde gestoppt.")):(a.setTracking(!0),console.log("Tracking wurde gestartet."))};b.addEventListener("click",M,!1);b.addEventListener("touchstart",M,!1);var h=new ol.Feature,k=new ol.Feature;new ol.layer.Vector({map:s,source:new ol.source.Vector({features:[h,k]}),style:new ol.style.Style({image:new ol.style.Circle({radius:7,fill:new ol.style.Fill({color:"blue"}),stroke:new ol.style.Stroke({color:"white",width:2})})})});function ge(){a.on("change:accuracyGeometry",function(){h.setGeometry(a.getAccuracyGeometry())}),a.on("change:position",function(){var o=a.getPosition();k.setGeometry(o?new ol.geom.Point(o):null),L.setCenter(o)})}function ye(){a.setTracking(!0),ge()}function we(){a.setTracking(!1),h.setGeometry(null),k.setGeometry(null)}b.addEventListener("click",function(){var o=a.getTracking();o?we():ye()});const de=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_1._Ordnung29778",TILED:!0,TRANSPARENT:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"1. Ordn.",visible:!1}),be=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_2._Ordnung8177",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"2. Ordn.",visible:!1,minResolution:0,maxResolution:75}),pe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Hydro_wms/MapServer/WMSServer",params:{LAYERS:"Gewässernetz_3.Ordnung9928",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"3. Ordn.",visible:!1,minResolution:0,maxResolution:6}),me=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/HWSchutz_wms/MapServer/WMSServer",params:{LAYERS:"Überschwemmungsgebiete_Verordnungsfläechen_Niedersachsen11182",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"Uesg",visible:!1,opacity:.5,minResolution:0,maxResolution:10}),fe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://www.umweltkarten-niedersachsen.de/arcgis/services/Natur_wms/MapServer/WMSServer",params:{LAYERS:"Fauna-Flora-Habitat-Gebiete_(FFH)_in_Niedersachsen44579",TILED:!0},serverType:"arcgis",crossOrigin:"anonymous"}),title:"NSG",visible:!1,opacity:.5,minResolution:0,maxResolution:10}),Se=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"10",TILED:"true",VERSION:"1.3.0"}}),title:"2023",opacity:1,visible:!1}),_e=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"9",TILED:"true",VERSION:"1.3.0"}}),title:"2020",opacity:1,visible:!1}),he=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"8",TILED:"true",VERSION:"1.3.0"}}),title:"2017",opacity:1,visible:!1}),ke=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"7",TILED:"true",VERSION:"1.3.0"}}),title:"2014",opacity:1,visible:!1}),ve=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"6",TILED:"true",VERSION:"1.3.0"}}),title:"2012",opacity:1,visible:!1}),Le=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"5",TILED:"true",VERSION:"1.3.0"}}),title:"2010",opacity:1,visible:!1}),Me=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"4",TILED:"true",VERSION:"1.3.0"}}),title:"2009",opacity:1,visible:!1}),xe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"3",TILED:"true",VERSION:"1.3.0"}}),title:"2002",opacity:1,visible:!1}),Te=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"2",TILED:"true",VERSION:"1.3.0"}}),title:"1970",opacity:1,visible:!1}),Ee=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"1",TILED:"true",VERSION:"1.3.0"}}),title:"1957",opacity:1,visible:!1}),Oe=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://geo.grafschaft.de/arcgis/services/Migratrion_Okt_2020/BAS_Luftbilder_2/MapServer/WMSServer",attributions:" ",params:{LAYERS:"0",TILED:"true",VERSION:"1.3.0"}}),title:"1937",opacity:1,visible:!1}),Re=new ol.layer.Tile({source:new ol.source.TileWMS({url:"https://sgx.geodatenzentrum.de/wms_basemapde",params:{LAYERS:"WMS DE BASEMAP.DE WEB RASTER",TILED:!0},crossOrigin:"anonymous"}),title:"base grau",visible:!1,minResolution:0,maxResolution:75});var Ae=new ol.layer.Tile({title:"DOP20 NI",opacity:1,visible:!1,type:"base",source:new ol.source.TileWMS({url:"https://www.geobasisdaten.niedersachsen.de/doorman/noauth/wms_ni_dop",attributions:"Orthophotos Niedersachsen, LGLN",params:{LAYERS:"dop20",TILED:!0,VERSION:"1.3.0"}})});const Ie=new ol.layer.Tile({title:"GoogleSat",type:"base",baseLayer:!1,visible:!1,source:new ol.source.TileImage({url:"http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}"})}),Ne=new ol.layer.Tile({title:"ESRI",type:"base",opacity:1,visible:!1,source:new ol.source.XYZ({attributions:"Powered by Esri",url:"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),Ge=new ol.layer.Tile({title:"osm",type:"base",source:new ol.source.OSM({url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",attributions:["© OpenStreetMap contributors",'Tiles courtesy of <a href="https://www.openstreetmap.org/"></a>']})}),Fe=new ol.layer.Group({title:"WMS-Lay",fold:!0,fold:"close",layers:[pe,be,de,fe,me]}),Ve=new ol.layer.Group({title:"GN-DOP's",fold:!0,fold:"close",layers:[Se,_e,he,ke,ve,Le,Me,xe,Te,Ee,Oe]}),Be=new ol.layer.Group({title:"Bauw.",fold:!0,fold:"close",layers:[H,q,U,Z,X,te,oe,$,Q,ee,re]}),We=new ol.layer.Group({title:"Station",fold:!0,fold:"close",layers:[le,se,ie]}),Pe=new ol.layer.Group({title:"Base",fold:!0,fold:"close",layers:[Re,Ne,Ie,Ae,Ge]});s.addLayer(Pe);s.addLayer(Ve);s.addLayer(K);s.addLayer(ce);s.addLayer(Fe);s.addLayer(We);s.addLayer(Be);var je=document.getElementById("popup"),w=document.getElementById("popup-content"),v=document.getElementById("popup-closer"),u=new ol.Overlay({element:je,id:"1",autoPan:!0,autoPanAnimation:{duration:250}});s.addOverlay(u);v.onclick=function(){return u.setPosition(void 0),v.blur(),!1};s.on("click",function(o){s.forEachFeatureAtPixel(o.pixel,function(e,l){var t=l.get("name"),r=o.coordinates,n=e.get("beschreib_lang"),i="";if(n&&n.trim()!==""&&(i="<br><u>Beschreib (lang): </u>"+n+"</p>"),t!=="gew"&&t!=="km10scal"&&t!=="km100scal"&&t!=="km500scal"&&t!=="fsk"&&t!=="son_lin")if(console.log("Clicked on layer:",t),e){r=e.getGeometry().getCoordinates(),u.setPosition(r);var c=e.get("foto1"),g="",y=e.get("foto2"),d="",p=e.get("foto3"),S="",m=e.get("foto4"),_="";c&&c.trim()!==""?g='<a href="'+c+`" onclick="window.open('`+c+`', '_blank'); return false;">Foto 1</a>`:g=" Foto 1 ",y&&y.trim()!==""?d='<a href="'+y+`" onclick="window.open('`+y+`', '_blank'); return false;">Foto 2</a>`:d=" Foto 2 ",p&&p.trim()!==""?S='<a href="'+p+`" onclick="window.open('`+p+`', '_blank'); return false;">Foto 3</a>`:S=" Foto 3 ",m&&m.trim()!==""?_='<a href="'+m+`" onclick="window.open('`+m+`', '_blank'); return false;">Foto 4</a>`:_=" Foto 4 ",w.innerHTML='<div style="max-height: 200px; overflow-y: auto;"><p style="font-weight: bold; text-decoration: underline;">'+e.get("name")+"</p><p>Id = "+e.get("bw_id")+" ("+e.get("KTR")+")</p><p>"+g+" "+d+" "+S+" "+_+"<br><u>Beschreibung (kurz): </u>"+e.get("beschreib")+"</p><p>"+i+"</p></div>"}else u.setPosition(void 0);t==="gew_info"&&(r=o.coordinate,u.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+e.get("IDUabschn")+'<br><p><a href="'+e.get("link1")+`" onclick="window.open('`+e.get("link1")+`', '_blank'); return false;">Link 1</a> <a href="`+e.get("link2")+`" onclick="window.open('`+e.get("link2")+`', '_blank'); return false;">Link 2</a> <a href="`+e.get("foto1")+`" onclick="window.open('`+e.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+e.get("foto2")+`" onclick="window.open('`+e.get("foto2")+`', '_blank'); return false;">Foto 2</a><br><p><a href="`+e.get("BSB")+`" onclick="window.open('`+e.get("BSB")+`', '_blank'); return false;">BSB  </a><a href="`+e.get("MNB")+`" onclick="window.open('`+e.get("MNB")+`', '_blank'); return false;">MNB</a><br> Kat: `+e.get("Kat")+"</a>, KTR: "+e.get("REFID_KTR")+"</a><br>von "+e.get("Bez_Anfang")+" bis "+e.get("Bez_Ende")+"</p></div>"),t==="son_lin"&&(r=o.coordinate,u.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Name: '+e.get("name")+" ("+e.get("KTR")+')<br><p><a href="'+e.get("foto1")+`" onclick="window.open('`+e.get("foto1")+`', '_blank'); return false;">Foto 1</a> <a href="`+e.get("foto2")+`" onclick="window.open('`+e.get("foto2")+`', '_blank'); return false;">Foto 2</a> <a href="`+e.get("foto3")+`" onclick="window.open('`+e.get("foto3")+`', '_blank'); return false;">Foto 3</a> <a href="`+e.get("foto4")+`" onclick="window.open('`+e.get("foto4")+`', '_blank'); return false;">Foto 4</a></p><br>Beschreib kurz = `+e.get("beschreib")+"</p>"+i+"</div>"),t==="gehoelz_vec"&&(r=o.coordinate,u.setPosition(r),w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p>Gehölzentwicklung<br><br>Bemerk: '+e.get("UMn_Bemerk")+"</p></div>"),t==="fsk"&&(r=o.coordinate,u.setPosition(r),w.innerHTML=w.innerHTML='<div style="max-height: 300px; overflow-y: auto;"><p><strong>gemark Flur Flurstück:</strong><br>'+e.get("Suche")+"</p>FSK: "+e.get("fsk")+"</p><p>Art (p=privat): "+e.get("Art")+"</p></div>")})});document.getElementById("popup-closer").onclick=function(){return u.setPosition(void 0),!1};
