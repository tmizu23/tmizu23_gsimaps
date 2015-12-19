{
  options: {
    attribution: 'ベクトルタイル',
    maxNativeZoom: 2
  },
  geojsonOptions: {
    pointToLayer: function(feature, latlng) {
      var s = {};
      for (name in feature.properties) {
        if (name.match(/^_/) && !name.match(/_markerType/)) {
          if (feature.properties['_markerType'] == 'Circle' && name == '_radius') {
            continue;
          }
          s[name.substr(1)] = feature.properties[name];
        }
      }
      if (feature.properties['_markerType'] == 'Icon') {
        var myIcon = L.icon(s);
        return L.marker(latlng, {
          icon: myIcon
        });
      }
      if (feature.properties['_markerType'] == 'DivIcon') {
        var myIcon = L.divIcon(s);
        return L.marker(latlng, {
          icon: myIcon
        });
      }
      if (feature.properties['_markerType'] == 'Circle') {
        return L.circle(latlng, feature.properties['_radius'], s);
      }
      if (feature.properties['_markerType'] == 'CircleMarker') {
        return L.circleMarker(latlng, s);
      }
    },
    style: function(feature) {
      if (!feature.properties['_markerType']) {
        var s = {};
        for (name in feature.properties) {
          if (name.match(/^_/) && !name.match(/_markerType/)) {
            if (feature.properties['_markerType'] == 'Circle' && name == '_radius') {
              continue;
            }
            s[name.substr(1)] = feature.properties[name];
          }
        }
        return s;
      }
    },
    onEachFeature: function(feature, layer) {
      /*
      var s = ''
      for (name in feature.properties) {
        if (!name.match(/^_/)) {
          if (name == "name") {
            s += "<a style='font-size: 14px;font-weight: bold;color:#000;'>" + feature.properties[name] + "</a><br>";
          } else {
            s += "<a style='font-size: 10px;color:#000;'>" + name + "：" + feature.properties[name] + "</a><br>";
          }
        }
      }
      */

      layer.on('click', function(e) {
        AWS.config.region = 'ap-northeast-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:d478938c-4d7e-4296-9be7-a1f13e48a289',
        });
        console.log(AWS.config.credentials.sesionToken);
        apigClient = apigClientFactory.newClient({
          accessKey: AWS.config.credentials.accessKeyId,
          secretKey: AWS.config.credentials.secretAccessKey,
          sessionToken: AWS.config.credentials.sesionToken, //OPTIONAL: If you are using temporary credentials you must include the session token
          region: 'ap-northeast-1' // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
        });
        //var apigClient = apigClientFactory.newClient({apiKey: 'H6bo2P4RlEaJ2OJkKt7ym5EGaxOnCI5m8NDliiAw'});

        var params = {param0: '',param1: ''};
        var body = {"key1": feature.properties["name"]};

        var additionalParams = {
          headers: {param0: '',param1: ''},
          queryParams: {param0: '',param1: ''}
        };

        apigClient.oppaiyamaIoTPost({}, body, {})
        .then(function(result){
          console.log(JSON.stringify(result));
          var pop = layer.bindPopup("ありがとう" + result.data.count + "人目です。");
          pop.openPopup();
        }).catch( function(result){
          console.log(JSON.stringify(result));
        });


/*
        $.ajax({
          //crossDomain: true,
          type: "POST",
          headers: { 'X-API-KEY': 'H6bo2P4RlEaJ2OJkKt7ym5EGaxOnCI5m8NDliiAw' },
          //cache: false,
          //contentType:'application/json',
          url: "https://oj48nv3zrj.execute-api.ap-northeast-1.amazonaws.com/prod/OppaiyamaIoT",
          data: JSON.stringify({
            "key1": feature.properties["name"]
          }),
          //dataType: 'json',
          success: function(ret) {

            console.log(JSON.stringify(ret));
            var pop = layer.bindPopup("ありがとう" + ret.count + "人目です。");
            pop.openPopup();
          }
        });
      */
      });
      layer.on('mouseover', function(e) {
        var pop = layer.bindPopup("click me");
        pop.options.icon.options.popupAnchor = [0, -20];
        pop.openPopup();

      });
      layer.on('mouseout', function(e) {
        e.target.closePopup();

      });
    }
  }
}
