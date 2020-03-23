//Written By Jonathan Shaw 03/2020

document.addEventListener("DOMContentLoaded", function() {
  var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search_input"),
    {
      types: ["(regions)"],
      componentRestrictions: {
        country: "USA"
      }
    }
  );

  google.maps.event.addListener(autocomplete, "place_changed", function() {
    var place = autocomplete.getPlace();
    var la = (document.getElementById("lat").value = place.geometry.location.lat());
    var ln = (document.getElementById("lng").value = place.geometry.location.lng());
    var zm = 12;

    initMap(la, ln, zm);
  });
});
