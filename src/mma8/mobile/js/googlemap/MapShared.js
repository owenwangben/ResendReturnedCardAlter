
/*取得使用者位置 開始*/
/*瀏覽器支援 HTML5 定位方法*/
function Location(Locate_value,branch_value) {
  var userAgent = navigator.userAgent;
  if (navigator.geolocation) {
      // HTML5 定位抓取
      navigator.geolocation.getCurrentPosition(function(position) {
        //alert(position.coords.latitude);
          mapServiceProvider(position.coords.latitude, position.coords.longitude,branch_value);
      },
      function(error) {
        
          switch (error.code) {
              case error.TIMEOUT://無法在指定的逾時期間內判斷目前位置
                  //alert('連線逾時');
                  mapServiceProvider(25.047108,121.542761,branch_value);
                  break;
   
              case error.POSITION_UNAVAILABLE:
                if(/Android/i.test(userAgent)){
                      //是否為Android
                      alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                 }else if(/iPhone|iPad/i.test(userAgent)){
                      //是否為iPhone或iPad
                      alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                 }
                  mapServiceProvider(25.047108,121.542761,branch_value);
                  break;
   
              case error.PERMISSION_DENIED://無權使用地理位置 API
                  if(/Android/i.test(userAgent)){
                      //是否為Android
                      alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                 }else if(/iPhone|iPad/i.test(userAgent)){
                      //是否為iPhone或iPad
                      alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                 }
                  mapServiceProvider(25.047108,121.542761,branch_value);
                  break;
   
              case error.UNKNOWN_ERROR:
                  //alert('不明的錯誤，請稍候再試');
                  mapServiceProvider(25.047108,121.542761,branch_value);
                  break;
          }
      });
  } else { // 不支援 HTML5 定位
      // 若支援 Google Gears
      if (window.google && google.gears) {
          try {
                // 嘗試以 Gears 取得定位
                var geo = google.gears.factory.create('beta.geolocation');
                geo.getCurrentPosition(successCallback,errorCallback, { enableHighAccuracy: true,gearsRequestAddress: true });
          } catch(e){
                if(/Android/i.test(userAgent)){
                      //是否為Android
                      alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                 }else if(/iPhone|iPad/i.test(userAgent)){
                      //是否為iPhone或iPad
                      alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                 }
                 mapServiceProvider(25.047108,121.542761,branch_value);
          }
      }else{
          if(/Android/i.test(userAgent)){
                //是否為Android
                alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
           }else if(/iPhone|iPad/i.test(userAgent)){
                //是否為iPhone或iPad
                alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
           }
          mapServiceProvider(25.047108,121.542761,branch_value);
      }
  }
  // 取得 Gears 定位發生錯誤
  function errorCallback(err) {
      var msg = 'Error retrieving your location: ' + err.message;
      alert(msg);
  }
   
  // 成功取得 Gears 定位
  function successCallback(p) {
        mapServiceProvider(p.latitude, p.longitude);
  }
  // 於地圖上顯示使用者目前位置
  function mapServiceProvider(latitude, longitude,branch_value) {
    document.getElementById("latitude").value = latitude;
    document.getElementById("longitude").value = longitude;
    initialize(latitude, longitude, branch_value);
    /*滑鼠縮放*/
    google.maps.event.addListener(map, 'zoom_changed', function() {
      var myLatLng=new google.maps.LatLng(latitude,longitude);
      //search(myLatLng);
    })
    /*滑鼠移動*/
    google.maps.event.addDomListener(map, 'dragend', function() {
      var myLatLng=new google.maps.LatLng(latitude,longitude);
      //search(myLatLng);
    })
  }
}
/*取得使用者位置 結束*/

/*Map畫布預設開始*/
function setMapOptions(latitude, longitude,branch_value) {
  var userAgent = navigator.userAgent;
  if(branch_value!="ATM_all"&&branch_value!="branch_all"&&branch_value!="branch_HomeSearch"&&branch_value!="mma_branch_HomeSearch"&&branch_value!="ATM_HomeSearch"&&branch_value!="mma_ATM_HomeSearch"){
    directionsDisplay = new google.maps.DirectionsRenderer();
  }
  var myLatLng=new google.maps.LatLng(latitude,longitude);
  var myLatLng2=new google.maps.LatLng(latitude+0.0025,longitude);
  if(/iPhone|iPad/i.test(userAgent)){
    var myOptions = {
      zoom: 16,
      center: myLatLng2,
      /*Map 佈景*/
      mapTypeControl: false,
      /*Map 方向盤*/
      panControl: false,
      /*Map 方向盤*/
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      /*Map 縮放控制*/
      scaleControl: false,
      /*Map 街景*/
      streetViewControl: false
    };
  }else{
    var myOptions = {
      zoom: 16,
      center: myLatLng2,
      /*Map 佈景*/
      mapTypeControl: false,
      /*Map 方向盤*/
      panControl: false,
      /*Map 方向盤*/
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      /*Map 縮放控制*/
      scaleControl: false,
      /*Map 街景*/
      streetViewControl: false
    };
  }

  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));
  if(branch_value=="first"||branch_value=="ATM_first"||branch_value=="mma_first"||branch_value=="mma_ATM_first"){
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
     });
   }
    var image = '/MMA7txt/CustomerService/images/firstpin1.png';
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        zIndex:6
    });
  places = new google.maps.places.PlacesService(map);
  //返回按鈕開始
  var homeControlDiv = document.createElement('div');
  homeControlDiv.setAttribute('class', 'mylocation');
  var homeControl = new HomeControl(homeControlDiv, map);

  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(homeControlDiv);
  //返回按鈕結束
}
/*Map畫布預設結束*/

//返回按鈕開始
function HomeControl(controlDiv, map) {
  /*規劃路線之路線及ab點清除start*/
  if(directionsDisplay != null) {
      directionsDisplay.setMap(null);
  }
  /*規劃路線之路線及ab點清除end*/
  var Classification=document.getElementById("Classification").value;
  if(Classification=="mma_branch"||Classification=="mma_ATM"){
    document.getElementById('directions-panel').style.display = 'none';
    document.getElementById('listing').style.display = '';
  }
  var controlUI = document.createElement('div');
  controlUI.title = '返回我的位置';
  controlUI.innerHTML = '返回我的位置'
  controlDiv.appendChild(controlUI);
  google.maps.event.addDomListener(controlUI, 'click', function() {
    var Classification=document.getElementById("Classification").value;
    if(Classification=="m_Branch"){
      Locate('','branch_HomeSearch');
    }
    else if(Classification=="mma_branch"){
      Locate('','mma_branch_HomeSearch');
    }
    else if(Classification=="ATM"){
      Locate('','ATM_HomeSearch');
    }
    else{
      Locate('','mma_ATM_HomeSearch');
    }
  });
}
//返回按鈕結束

/*Android Google Map 資料來源建置 開始*/
function BusName() {
    var homeControlDiv = document.createElement('div');
    homeControlDiv.index = 1;
    var homeControl = new BusControl(homeControlDiv);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(homeControlDiv);
}

function BusControl(controlDiv) {
    controlDiv.style.padding = '5px';
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#f5f5f5';
    controlUI.style.borderStyle = 'None';
    controlUI.style.borderWidth = '2px';
    controlUI.style.textAlign = 'center';
    controlUI.style.opacity ="0.7";
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'PMingLiU,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.style.color = "#474747";
    controlText.innerHTML = '資料來源:永豐銀行';
    controlUI.appendChild(controlText);
}
/*Android Google Map 資料來源建置 結束*/

/*搜尋分行資料 開始*/
function search_branch(myLatLng,branch_value) {
  var Classification=document.getElementById("Classification").value;
  for (var i = 0; i < results.length; i++) {
    if(Classification=="m_Branch"||Classification=="mma_branch"){
        var markerIcon='/MMA7txt/CustomerService/images/pin2.png';
        var beachMarker = new google.maps.Marker({
        zIndex:7
      });
    }
    else{
      var markerIcon='/MMA7txt/CustomerService/images/pin3.png';
      var beachMarker = new google.maps.Marker({
        zIndex:7
      });
    }
    var vLat=results[i].geometry.location.k;
    var vLng=results[i].geometry.location.A;
    if(branch_value=="ATM_all" || branch_value=="ATM_first"||branch_value=="ATM_area" || branch_value=="mma_ATM_first"||branch_value=="mma_ATM_area"||branch_value=="ATM_HomeSearch"||branch_value=="mma_ATM_HomeSearch"){
      var branch_name = results[i].location;
      var branch_address = results[i].address;
      var branch_savingwithdrawoutntd = results[i].savingwithdrawoutntd;
      var branch_withdrawoutcurr = results[i].withdrawoutcurr;
      var branch_sATM_24_service = results[i].sATM_24_service;
    }else{
      var branch_name = results[i].name;
      var branch_Bank_No = results[i].Bank_No.substring(3,6);
      var branch_ENG_name = results[i].ENG_name;
      var branch_address = results[i].vicinity;
      var branch_telno = results[i].telno;
      var branch_fax = results[i].fax;
    }
    var branchLat = vLat;
    var branchlng = vLng;
    var Classification=document.getElementById("Classification").value;
    if(Classification=="m_Branch"||Classification=="ATM"){
      var branchLatlng = new google.maps.LatLng(vLat,vLng);
    }
    else{
      var branchLatlng = new google.maps.LatLng(vLat,vLng);
    }
    document.getElementById("branch_Latlng").value = branchLatlng;
    if(Classification=="mma_branch"||Classification=="mma_ATM"){
      document.getElementById("search_Lat").value = branchLat;
      document.getElementById("search_Lng").value = branchlng;
    }
    if(branch_value=="ATM_first"||branch_value=="ATM_all"||branch_value=="ATM_area"||branch_value=="mma_ATM_first"||branch_value=="mma_ATM_area"||branch_value=="ATM_HomeSearch"||branch_value=="mma_ATM_HomeSearch"){
      markers[i] = new google.maps.Marker({
        position: branchLatlng,
        name: branch_name,
        Bank_No: branch_Bank_No,
        ENG_name: branch_ENG_name,
        branch_address:branch_address,
        branch_savingwithdrawoutntd:branch_savingwithdrawoutntd,
        branch_withdrawoutcurr:branch_withdrawoutcurr,
        branch_sATM_24_service:branch_sATM_24_service,
        icon: markerIcon,
        zIndex:8
      });
      markers[i].placeResult = results[i];
      google.maps.event.addListener(markers[i], 'click', showInfoWindow_ATM);
    }
    else{
        markers[i] = new google.maps.Marker({
        position: branchLatlng,
        name: branch_name,
        Bank_No: branch_Bank_No,
        ENG_name: branch_ENG_name,
        branch_address:branch_address,
        branch_telno:branch_telno,
        branch_fax:branch_fax,
        icon: markerIcon,
        zIndex:8
      });
      markers[i].placeResult = results[i];
      google.maps.event.addListener(markers[i], 'click', showInfoWindow1);
    }
    /*使用者位置與分行距離運算 開始*/
    var branch = markers[i];
    branch.distance = distHaversine(branchLat, branchlng, myLatLng);
    /*使用者位置與分行距離運算 結束*/
    /*距離排序 開始*/
    markers.sort(function (a, b) {
        if (a.distance == b.distance) return 0;
        return (a.distance > b.distance) ? 1 : -1;
    });
    /*距離排序 結束*/
  }
  /*右邊分行列表資料排序 開始*/
  for (var i = 0; i < markers.length; i++) {
	//branch left list
	  if(Classification=="m_Branch"||Classification=="mma_branch"){
      if(branch_value=="first"||branch_value=="branch_HomeSearch"){
        if (i<10) {
          setTimeout(dropMarker(i, markers), i * 1);
          addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address'>"+markers[i].branch_address+"</div><div class='tel'>Tel："+markers[i].branch_telno+"</div><div class='fax'>Fax："+markers[i].branch_fax+"</div></div>");
        }
      }
      else if(branch_value=="mma_first"||branch_value=="mma_branch_HomeSearch"){
        if (i<10) {
          setTimeout(dropMarker(i, markers), i * 1);
          addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].Bank_No+"&nbsp;"+markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address'>"+markers[i].branch_address+"</div></div>");
        }
      }
      else if(branch_value=="mma_branch_area"){
        if (i<25) {
          setTimeout(dropMarker(i, markers), i * 1);
          document.getElementById('listing').style.display = '';
          addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].Bank_No+"&nbsp;"+markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address'>"+markers[i].branch_address+"</div></div>");
        }
      }
      else if(branch_value=="branch_area"||branch_value=="branch_all"){
        if (i<25) {
          setTimeout(dropMarker(i, markers), i * 1);
          document.getElementById('listing').style.display = '';
          addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address'>"+markers[i].branch_address+"</div><div class='tel'>Tel："+markers[i].branch_telno+"</div><div class='fax'>Fax："+markers[i].branch_fax+"</div></div>");
        }
      }
    }
	// ATM left list
    else{
      if(branch_value=="ATM_first"||branch_value=="ATM_HomeSearch"){
          if (i<10) {
            setTimeout(dropMarker(i, markers), i * 1);
            addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address atm-address'>"+markers[i].branch_address+"</div><div class='withdrawoutcurr'>"+markers[i].branch_withdrawoutcurr+"</div><div class='deposits'>"+markers[i].branch_savingwithdrawoutntd+"</div><div class='sTM_24_service'>"+markers[i].branch_sATM_24_service+"</div></div>");
        }
      }
      else if(branch_value=="mma_ATM_first"||branch_value=="mma_ATM_HomeSearch"){
          if (i<10) {
            setTimeout(dropMarker(i, markers), i * 1);
            addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address atm-address'>"+markers[i].branch_address+"</div></div>");
        }
      }
      else if(branch_value=="mma_ATM_area"){
        if (i<25) {
            setTimeout(dropMarker(i, markers), i * 1);
            document.getElementById('listing').style.display = '';
            addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address atm-address'>"+markers[i].branch_address+"</div></div>");
        }
       }
      else if(branch_value=="ATM_all"||branch_value=="ATM_area"){
        if (i<25) {
            setTimeout(dropMarker(i, markers), i * 1);
            document.getElementById('listing').style.display = '';
            addResult(i,markers[i],"<div class='list'><div class='name'>"+ markers[i].name+"</div><div class='distance'>"+ markers[i].distance.toFixed(2)+" km</div><div class='clear'></div><div class='address atm-address'>"+markers[i].branch_address+"</div><div class='withdrawoutcurr'>"+markers[i].branch_withdrawoutcurr+"</div><div class='deposits'>"+markers[i].branch_savingwithdrawoutntd+"</div><div class='sTM_24_service'>"+markers[i].branch_sATM_24_service+"</div></div>");
        }
       }
     }
    /*右邊分行列表資料排序 結束*/
  }
	search_list_hover();
}
/*搜尋分行資料 結束*/

/*使用者位置與分行距離運算 開始*/
function distHaversine(branchLat, branchlng, myLatLng) {
  var latitude = document.getElementById('latitude').value;
  var longitude = document.getElementById('longitude').value;
  var rad = function (x) { return x * Math.PI / 180; }
  var R = 6371; // earth's mean radius in km
  var dLat = rad(latitude - branchLat);
  var dLong = rad(longitude - branchlng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(branchLat)) * Math.cos(rad(latitude))
          * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return parseFloat(d.toFixed(3));
}
/*使用者位置與分行距離運算 結束*/

/*清除左邊地圖資料 開始*/
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}
/*清除左邊地圖資料 結束*/

/*清除右邊分行列表資料 開始*/
function clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}
/*清除右邊分行列表資料 結束*/

/*右邊分行列表版型 開始*/
function addResult(i,marker,name) {
  var results = document.getElementById('results');
  var markerIcon="../../../MMA7txt/CustomerService/images/listarrow.png";
  var tr = document.createElement('tr');
  var Classification=document.getElementById("Classification").value;
  //tr.style.backgroundColor = (i % 2 == 0 ? '#F0F0F0' : '#FFFFFF');
  tr.onclick = function() {
    markers.push(marker);
    google.maps.event.trigger(marker, 'click');

    /*街景關閉 開始*/
      if(Classification=="mma_ATM"||Classification=="mma_branch"){
        panorama.setVisible(false);
        document.getElementById('close_StreetView').style.display = 'none';
      }
    /*街景關閉 結束*/
  };
  
  var iconTd = document.createElement('td');
  iconTd.style.textAlign = 'right';
  iconTd.setAttribute('class', 'icontd');
  var nameTd = document.createElement('td');
  var icon = document.createElement('img');
  icon.src = markerIcon;
  icon.setAttribute('class', 'placeIcon');
  icon.setAttribute('className', 'placeIcon');
  iconTd.appendChild(icon);
  nameTd.innerHTML = name;
  tr.appendChild(nameTd);
  tr.appendChild(iconTd);
  results.appendChild(tr);
}
/*右邊分行列表版型 結束*/

/*左邊地圖資料顯示 開始*/
function dropMarker(i, markers) {
    return function() {
      markers[i].setMap(map);
  }
}
/*左邊地圖資料顯示 結束*/

/*分行左邊地圖資料詳細 開始*/
function showInfoWindow1() {
  /*規劃路線之路線及ab點清除start*/
  if(directionsDisplay != null) {
      directionsDisplay.setMap(null);
  }
  /*規劃路線之路線及ab點清除end*/
  var Classification=document.getElementById("Classification").value;
  var marker = this;
  var littlemanIcon="https://m.sinopac.com/App_Themes/img/littleman.png";
  document.getElementById("branch_Latlng").value = marker.placeResult.lat +',' + marker.placeResult.lng;
  infoWindow.open(map, marker);

  if(Classification=="mma_branch"){
    var Business_Services="";
    var Gold = marker.placeResult.Gold;
    var Coffer = marker.placeResult.Coffer;
    var CNYATM = marker.placeResult.CNYATM;
    
    if(Gold=="Y"){
      Business_Services="<span>黃金業務</span>";
    }else{
      Business_Services="";
    }
    if(Coffer=="Y"){
      Business_Services=Business_Services+"<span>保險箱出租業務</span>";
    }
    if(CNYATM=="Y"){
      Business_Services=Business_Services+"<span>ATM提領人民幣現鈔</span>";
    }
	/*20140516 如果沒黃金、保險箱、atm的話就不要顯示粉紅底的tr*/
	$('#iw-Business_Services-row').css('display','');
	if (Business_Services.length == "" ) {
		Business_Services="";
		$('#iw-Business_Services-row').css('display','none');
	}
	document.getElementById('iw-url').innerHTML = '<b><a href="' + marker.placeResult.icon +
      '">' + marker.placeResult.Bank_No.substring(3,6) +"&nbsp;&nbsp;"+ marker.placeResult.name +"&nbsp;&nbsp;"+ marker.placeResult.ENG_name + '</a></b>';
    document.getElementById('iw-distance').innerHTML = marker.distance.toFixed(2)+" km"; 
    document.getElementById('iw-address').innerHTML = marker.placeResult.vicinity; 
    document.getElementById('iw-ENG_adress').innerHTML = marker.placeResult.ENG_adress; 
    document.getElementById('iw-phone-row').style.display = '';
    document.getElementById('iw-phone').innerHTML = marker.placeResult.telno;  
    document.getElementById('iw-fax').innerHTML = marker.placeResult.fax;
    document.getElementById('iw-offtime').innerHTML = marker.placeResult.offtime;
    document.getElementById('iw-Business_Services').innerHTML = Business_Services;
    document.getElementById('info-content').style.display = '';
    document.getElementById('address-zone').style.display = '';
    document.getElementById('listing').style.display = '';
    document.getElementById('directions-panel').style.display = 'none';
	document.getElementById('close').style.display = 'none';

    //街景
    document.getElementById("branch_Lat").value = marker.placeResult.lat;
    document.getElementById("branch_Lng").value = marker.placeResult.lng;
    var branch_Lat = document.getElementById("branch_Lat").value;
    var branch_Lng = document.getElementById("branch_Lng").value;
    var StreetView_LatLng=new google.maps.LatLng(branch_Lat,branch_Lng);
    panorama = map.getStreetView();
    //alert(panorama);
    panorama.setPosition(StreetView_LatLng);
    panorama.setPov(({
      heading: 265,
      pitch: 0
    }));
    map.setCenter(new google.maps.LatLng(branch_Lat-0 + 0.0025-0 , branch_Lng));
  }
  else{
      document.getElementById("branch_Latlng").value = marker.placeResult.lat +',' + marker.placeResult.lng;
      infoWindow.open(map, marker);
      document.getElementById('iw-url').innerHTML = '<b><a href="' + marker.placeResult.icon +
        '">' + marker.placeResult.name + '</a></b>';
      document.getElementById('iw-distance').innerHTML = marker.distance.toFixed(2)+" km"; 
      document.getElementById('iw-address').innerHTML = marker.placeResult.vicinity; 
      document.getElementById('iw-phone-row').style.display = '';
      document.getElementById('iw-phone').innerHTML = "Tel:" + marker.placeResult.telno;  
      document.getElementById('iw-fax-row').style.display = '';
      document.getElementById('iw-fax').innerHTML = "Fax:" + marker.placeResult.fax;
      document.getElementById('info-content').style.display = '';
      document.getElementById('address-zone').style.display = 'none';
      document.getElementById('listing').style.display = 'none';
      document.getElementById("branch_Lat").value = marker.placeResult.lat;
      document.getElementById("branch_Lng").value = marker.placeResult.lng;
      var branch_Lat = document.getElementById("branch_Lat").value;
      var branch_Lng = document.getElementById("branch_Lng").value;
      //map.setCenter(new google.maps.LatLng(branch_Lat, branch_Lng));
      map.setZoom(16);
  }
}
/*分行左邊地圖資料詳細 結束*/
/*ATM左邊地圖資料詳細 開始*/
function showInfoWindow_ATM() {
  /*規劃路線之路線及ab點清除start*/
  if(directionsDisplay != null) {
      directionsDisplay.setMap(null);
  }
  /*規劃路線之路線及ab點清除end*/
  var Classification=document.getElementById("Classification").value;
  var marker = this;
 // var littlemanIcon="https://m.sinopac.com/App_Themes/img/littleman.png";
  document.getElementById("branch_Latlng").value = marker.placeResult.lat +',' + marker.placeResult.lng;
  infoWindow.open(map, marker);
  if(Classification=="mma_ATM"){
    document.getElementById('iw-location').innerHTML = marker.placeResult.location; 
    document.getElementById('iw-distance').innerHTML = marker.distance.toFixed(2)+" km"; 
    document.getElementById('iw-address').innerHTML = marker.placeResult.address; 
    if(marker.placeResult.withdrawoutcurr==""){
      document.getElementById('iw-withdrawoutcurr-row').style.display = 'none';
    }
    else{
      document.getElementById('iw-withdrawoutcurr-row').style.display = '';
    }
    document.getElementById('iw-withdrawoutcurr').innerHTML = marker.placeResult.withdrawoutcurr;
    if(marker.placeResult.savingwithdrawoutntd==""){
      document.getElementById('iw-savingwithdrawoutntd-row').style.display = 'none';
    }
    else{
      document.getElementById('iw-savingwithdrawoutntd-row').style.display = '';
    }
    document.getElementById('iw-savingwithdrawoutntd').innerHTML = marker.placeResult.savingwithdrawoutntd;
    document.getElementById('iw-ATM_24_service-row').style.display = '';
    document.getElementById('iw-ATM_24_service').innerHTML = marker.placeResult.sATM_24_service;
    document.getElementById('info-content').style.display = '';
    document.getElementById('address-zone').style.display = '';
    document.getElementById('listing').style.display = '';
    document.getElementById('directions-panel').style.display = 'none';
	document.getElementById('close').style.display = 'none';
    //街景
    document.getElementById("branch_Lat").value = marker.placeResult.lat;
    document.getElementById("branch_Lng").value = marker.placeResult.lng;
    var branch_Lat = document.getElementById("branch_Lat").value;
    var branch_Lng = document.getElementById("branch_Lng").value;
    var StreetView_LatLng=new google.maps.LatLng(branch_Lat,branch_Lng);
    panorama = map.getStreetView();
    panorama.setPosition(StreetView_LatLng);
    panorama.setPov(({
      heading: 265,
      pitch: 0
    }));
    map.setCenter(new google.maps.LatLng(branch_Lat-0 + 0.0025-0 , branch_Lng));
  }
  else{
    document.getElementById('iw-location').innerHTML = marker.placeResult.location; 
    document.getElementById('iw-distance').innerHTML = marker.distance.toFixed(2)+" km"; 
    document.getElementById('iw-address').innerHTML = marker.placeResult.address; 
    if(marker.placeResult.withdrawoutcurr==""){
      document.getElementById('iw-withdrawoutcurr-row').style.display = 'none';
    }
    else{
      document.getElementById('iw-withdrawoutcurr-row').style.display = '';
    }
    document.getElementById('iw-withdrawoutcurr').innerHTML = marker.placeResult.withdrawoutcurr;
    if(marker.placeResult.savingwithdrawoutntd==""){
      document.getElementById('iw-savingwithdrawoutntd-row').style.display = 'none';
    }
    else{
      document.getElementById('iw-savingwithdrawoutntd-row').style.display = '';
    }
    document.getElementById('iw-savingwithdrawoutntd').innerHTML = marker.placeResult.savingwithdrawoutntd;
    document.getElementById('iw-ATM_24_service-row').style.display = '';
    document.getElementById('iw-ATM_24_service').innerHTML = marker.placeResult.sATM_24_service;
    document.getElementById('iw-route-row').style.display = '';
    document.getElementById('info-content').style.display = '';
    document.getElementById('listing').style.display = 'none';
    document.getElementById('address-zone').style.display = 'none';
    document.getElementById("branch_Lat").value = marker.placeResult.lat;
    document.getElementById("branch_Lng").value = marker.placeResult.lng;
    var branch_Lat = document.getElementById("branch_Lat").value;
    var branch_Lng = document.getElementById("branch_Lng").value;
    //map.setCenter(new google.maps.LatLng(branch_Lat, branch_Lng));
    map.setZoom(16);
  }
}
/*ATM左邊地圖資料詳細 結束*/
//關閉列表
function close_list() {
  document.getElementById('listing').style.display = 'none';
}
//關閉路線列表
function close_Route() {
  var Classification=document.getElementById("Classification").value;
  if(Classification=="mma_branch"||Classification=="mma_ATM"){
    /*規劃路線之路線及ab點清除start*/
    if(directionsDisplay != null) {
        directionsDisplay.setMap(null);
    }
    /*規劃路線之路線及ab點清除end*/
    document.getElementById('listing').style.display = '';
    /*點選返回後，置中 START*/
    var branch_Lat = document.getElementById("branch_Lat").value;
    var branch_Lng = document.getElementById("branch_Lng").value;
    map.setCenter(new google.maps.LatLng(branch_Lat, branch_Lng));
    map.setZoom(16);
    /*點選返回後，置中 END*/
  }
  else{
    document.getElementById('listing').style.display = 'none';
  }
  document.getElementById('directions-panel').style.display = 'none';
  document.getElementById('Transport').style.display = 'none';
  document.getElementById('close').style.display = 'none';

  open_scroll('.nicescroll');
}
//開啟路線列表
function open_Route() {
  document.getElementById('Transport').style.display = '';
  document.getElementById('directions-panel').style.display = '';
  document.getElementById('close').style.display = '';
}
//路徑規劃
function calcRoute(Transport) {
  infoWindow.close();
  directionsDisplay.setMap(map);
  var first_myLatLng =document.getElementById("first_myLatLng").value;
  var branch_Latlng =document.getElementById("branch_Latlng").value;
  var Classification=document.getElementById("Classification").value;
  var myLatLng = first_myLatLng;
  var ToSinopac = branch_Latlng;
  var request = {
      origin: myLatLng,
      destination: ToSinopac,
      travelMode: google.maps.TravelMode[Transport],
      optimizeWaypoints: true,
      provideRouteAlternatives: true
      
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
	  document.getElementById('listing').style.display = 'none';	
      directionsDisplay.setDirections(response);
      document.getElementById('directions-panel').style.display = '';
      document.getElementById('Transport').style.display = '';
      document.getElementById('close').style.display = '';
  	  open_scroll(".directions-panel");
    }
    else{
      if(Classification=="mma_ATM"||Classification=="mma_branch"){
        document.getElementById('listing').style.display = '';
      }
	   
      directionsDisplay.setDirections(response);
	  document.getElementById('listing').style.display = '';
      document.getElementById('directions-panel').style.display = 'none';
      document.getElementById('Transport').style.display = 'none';
      document.getElementById('close').style.display = 'none';
	  alert("很抱歉，Google地圖無法計算出路線。");
    }
    var xheight = $('#closeimg').height()
    $("#directions-panel").css('top',xheight-3+"px");
    $( window ).resize(function() {
    var xheight = $('#closeimg').height()
    $("#directions-panel").css('top',xheight+"px");
	$('#Transport a').first().addClass('on');
    });

  });

}
//街景模式
function setStreetView() {
  var branch_Lat = document.getElementById("branch_Lat").value;
  var branch_Lng = document.getElementById("branch_Lng").value;
  var StreetView_LatLng=new google.maps.LatLng(branch_Lat,branch_Lng);
  var sv = new google.maps.StreetViewService();
  sv.getPanoramaByLocation(StreetView_LatLng, 50, processSVData);
  var streetView = map.getStreetView();
  streetView.setOptions({ enableCloseButton: false });
  /*
  var closeButton = document.querySelector('#close_StreetView'),
  controlPosition = google.maps.ControlPosition.TOP_LEFT;
  streetView.controls[ controlPosition ].push( closeButton );
  */
}
function close_StreetView() {
  document.getElementById('address-zone').style.display = '';
  document.getElementById('close_StreetView').style.display = 'none';
  panorama.setVisible(false);
}

function processSVData(data, status) {
  document.getElementById('address-zone').style.display = 'none';
  document.getElementById('close_StreetView').style.display = '';
  
  if (status == google.maps.StreetViewStatus.OK) {
    panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 270,
      pitch: 0
    });
    panorama.setVisible(true);
	
	
  } else {
	document.getElementById('listing').style.display = '';  
    document.getElementById('address-zone').style.display = '';
    document.getElementById('close_StreetView').style.display = 'none';
    alert('很抱歉，Google地圖無法提供街景模式之服務。');
  }
};

$(document).ready(function() {
  
    //$(".nicescroll").niceScroll({touchbehavior:false,cursorcolor:"#cbcbcb",cursoropacitymax:0.6,cursorwidth:8,autohidemode:false});
 
});
var ns_remove = false;
var open = 1;
function search_list_hover () {

	if (ns_remove) {
		close_scroll(".nicescroll");
	}
	ns_remove = true;
	open_scroll(".nicescroll");
	$("#listing div.list").hover(function() {
		$(this).addClass("hover");
	}, function() {
    	$(this).removeClass("hover");
	});
	$("#listing div.list").click(function() {
		$("#listing div.list").removeClass("on");
		$(this).addClass("on");
	});
	if (open) {
	$("#listing div.list").first().trigger("click");
	}
	open = 0;
}

function open_scroll(selector) {
	$(selector).niceScroll({
		touchbehavior:false,
		cursorcolor:"#cbcbcb",
		cursoropacitymax:0.6
		,cursorwidth:8,
		autohidemode:false
	});
}

function close_scroll(selector) {
	$(selector).niceScroll().remove();
}
function CopyRightClick(e) {
    var netscape;
    if (navigator.appName.indexOf("Netscape") > -1) {
        // window.captureEvents(Event.MOUSEDOWN);
        netscape = e.button;
    }
    else {
        netscape = event.button;
    }

    if (netscape == 2) {
        alert('版權所有！瀏覽本頁時是禁止使用滑鼠右鍵的！');
    }
}

if (navigator.appName.indexOf("Netscape") > -1) {
    document.addEventListener('mousedown', CopyRightClick, false);
}
else {
    document.onmousedown = CopyRightClick;
}