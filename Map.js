//Written By Jonathan Shaw 03/2020

var cafes = [];
var map;
var service;
var infowindow;

function initMap(la, ln, zm) {
  //var marietta = new google.maps.LatLng(33.9526, -84.5499);
  if (la === undefined || ln === undefined) {
    //center of US
    la = 37.0902;
    ln = -95.7129;
    zm = 3;
  }
  var city = new google.maps.LatLng(la, ln);
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: city,
    zoom: zm
  });

  var request = {
    location: city,
    radius: 3700,
    types: ["cafe"]
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (results.length === 0) {
      cafes = [];
      cafes.push("No results found");
      document.getElementById("tableData").innerHTML = cafes;
    }
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  }
}

function createMarker(place) {
 
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: "./images/coffee-shop-marker.png",
      scaledSize: new google.maps.Size(30, 30)
    }
  });
  updateCafesArray(place);
  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function updateTableData() {

  tableBody = document.getElementById("tableData");
  let dataHtml = "";

  for (let i = 0; i < cafes.length; i++) {
    dataHtml += `<tr><td>${cafes[i]}</td></tr>`;
  }
  tableBody.innerHTML = dataHtml;
}

function updateCafesArray(place) {
  cafes = [];

  var request = { reference: place.reference };
  service.getDetails(request, function(details) {
    cafes.push(   
        "<br />" +
        "<b>" +
        details.name +
        "</b>" +
        "<br />" +
        details.formatted_phone_number +
        "<br />" +
        details.formatted_address +
        "<br />" +
        "Rating: " +
        details.rating +
        "<br />"
    );
    updateTableData();
    
    
  });
}
