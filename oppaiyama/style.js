{
options:
{
  attribution: 'ベクトルタイル',maxNativeZoom: 2
},
geojsonOptions:
{
   pointToLayer: function (feature, latlng) {
    var s = {};
    for(name in feature.properties) {
     if(name.match(/^_/) && !name.match(/_markerType/)){
      if( feature.properties['_markerType']=='Circle' && name =='_radius'){continue;}
      s[name.substr(1)]=feature.properties[name];
     }
    }
    if(feature.properties['_markerType']=='Icon'){
         var myIcon = L.icon(s);
         return L.marker(latlng, {icon: myIcon});
    }
    if(feature.properties['_markerType']=='DivIcon'){
         var myIcon = L.divIcon(s);
         return L.marker(latlng, {icon: myIcon});
    }
    if(feature.properties['_markerType']=='Circle'){
        return L.circle(latlng,feature.properties['_radius'],s);
    }
    if(feature.properties['_markerType']=='CircleMarker'){
        return L.circleMarker(latlng,s);
    }
   },
   style: function (feature) {
     if(!feature.properties['_markerType']){
       var s = {};
       for(name in feature.properties) {
        if(name.match(/^_/) && !name.match(/_markerType/)){
         if( feature.properties['_markerType']=='Circle' && name =='_radius'){continue;}
         s[name.substr(1)]=feature.properties[name];
        }
       }
       return s;
     }
   },
   onEachFeature: function (feature, layer) {
    var s = ''
    for(name in feature.properties) {
     if(!name.match(/^_/)){
      if(name=="name"){
       s += "<a href=\'https://qrb5uht5ta.execute-api.ap-northeast-1.amazonaws.com/prod/s3iot2\' style='font-size: 14px;font-weight: bold;color:#000;'>" + feature.properties[name] + "</a><br>";
      }else{
       s += "<a style='font-size: 10px;color:#000;'>" + name + "：" + feature.properties[name] + "</a><br>";
      }
     }
    }
    window.open("http://www.ecoris.co.jp");
    layer.bindPopup(s);
   }
}
}
