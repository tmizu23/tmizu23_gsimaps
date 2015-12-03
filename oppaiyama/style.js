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
       s += "<a style='font-size: 14px;font-weight: bold;color:#000;'>" + feature.properties[name] + "</a><br>";
      }else{
       s += "<a style='font-size: 10px;color:#000;'>" + name + "：" + feature.properties[name] + "</a><br>";
      }
     }
   }


    layer.on('click', function(e) {
      $.ajax({
           //crossDomain: true,
           type: "POST",
           //cache: false,
           //contentType:'application/json',
           url: "https://qrb5uht5ta.execute-api.ap-northeast-1.amazonaws.com/prod/s3iot2",
           data: JSON.stringify({"key1":"oppai"}),
           //dataType: 'json',
           success: function(ret){

               console.log(JSON.stringify(ret));
               var pop = layer.bindPopup(JSON.stringify(ret));
               pop.openPopup();
           }
       });
    });
    layer.on('mouseover', function(e) {

               var pop = layer.bindPopup("click me");
               pop.options.icon.options.popupAnchor = [20,0]
               pop.openPopup();

    });
   }
}
}
