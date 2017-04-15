        function initGeolocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, fail);
            }
            else {
                alert("Sorry, your browser does not support geolocation services.");
            }
        }
        var map;

function initMap(){
    var styles= [
  {
    "featureType": "administrative.country",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffb83b"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a6f5ab"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fffcec"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c5fcca"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#bbfac2"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#cecad9"
      },
      {
        "weight": 1.5
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c0bfc5"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dfdce4"
      },
      {
        "weight": 1.5
      }
    ]
  }
];

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});


map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

        function success(position) {
            // Define the coordinates as a Google Maps LatLng Object
            var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // Prepare the map options
            var mapOptions = {
                zoom: 14
                , center: coords
                , disableDefaultUI: true, mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
                , navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                }
                
            };
            // Create the map, and place it in the map_canvas div
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var image = {
                url: 'images/flags .png'
            , };
            // Place the initial marker
            var marker = new google.maps.Marker({
                position: coords
                , map: map
                , animation: google.maps.Animation.DROP
                , icon: image
                , title: "Ես այստեղ եմ"
            });
            marker.addListener('click', toggleBounce);
        }

        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            }
            else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

        function fail() {
            // Could not obtain location
        }
        //Request places from Google
        function placesRequest(title, latlng, radius, types) {
            //Parameters for our places request
            var request = {
                location: latlng
                , radius: radius
                , types: types
            };
            //Make the service call to google
        }