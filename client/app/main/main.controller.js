'use strict';

angular.module('meetmeinthemiddleApp')
  .controller('MainCtrl', ['$scope', '$http', 'socket', 'uiGmapGoogleMapApi', 'geoService', 'distanceService', 
  function ($scope, $http, socket, uiGmapGoogleMapApi, geoService, distanceService) {
    
    $scope.optionsA = {
      address: {
        city: '',
        state: '',
        label: 'Your location!',
        id: 0
      },
      showForm: false
    };
    
    $scope.optionsB = {
      address: {
        city: '',
        state: '',
        label: 'Their location!',
        id: 1
      },
      showForm: true
    };
    
    $scope.polyline = {
      stroke: {
        color: "#FC6254",
        weight: 3,
        opacity: .75
      },
      distance: 0,
      //center: {latitude:0, longitude:0}
      options: {
        disableAutoPan: true
      }
    };
    
    $scope.map = {
      zoom: 4, 
      center: {latitude: 39.8282, longitude: -98.5795},
      fit: false,
      options: {scrollwheel: false},
    };
 
    $scope.coordsArray = [];
    
  
    // This is the geoService promise, it gets the users coordinates
    // On fulfillment of promise, it sets $scope.coordObj to the users coords
    var promise = geoService.getCoords();
    // We want to resolve our promise for the coords now since we want to give the location of our user as the center of the map
    promise.then(function(coords) {
      coords.id= 0;
      $scope.coordsArray[0] = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        id: 0,
        options: {
          title: coords.longitude+', '+coords.latitude,
          opacity: .75
        }
      };
    }, function(reason) {
      console.log('Failed: ' + reason);
      // It failed to get their coordinates, so now we need the user to enter that.
      $scope.showFormA = true;
    });
    
    var stringifyAddress = function(address) {
      return address.city + ', ' + address.state;
    };
    
    var addressIsFilledOut = function(address) {
      return (address.city !== '' || address.state !== '') ? true : false;
    };
    
    $scope.updateLocation = function(address) {
      console.log(address.id);
      if(addressIsFilledOut(address)) {
        uiGmapGoogleMapApi.then(function(maps) {
          var geocoder = new maps.Geocoder();
          geocoder.geocode({ 'address': stringifyAddress(address) }, function(results, status) {
            if (status === maps.GeocoderStatus.OK) {
              $scope.coordsArray[address.id] = {
                latitude: results[0].geometry.location.lat(),
                longitude: results[0].geometry.location.lng(),
                id: address.id,
                options: {
                  title: results[0].geometry.location.lng()+', '+results[0].geometry.location.lat(),
                  opacity: .75
                }
              };
              if($scope.coordsArray.length === 2 && $scope.coordsArray[0].latitude !== null && $scope.coordsArray[1].latitude !== null) {
                var longA = $scope.coordsArray[0].longitude;
                var latA = $scope.coordsArray[0].latitude;
                var longB = $scope.coordsArray[1].longitude;
                var latB = $scope.coordsArray[1].latitude;
                $scope.map.center = {
                  latitude: (latA + latB) / 2,
                  longitude: (longA + longB) / 2
                };
                $scope.map.fit = true;
                $scope.polyline.distance = Math.floor(distanceService.getDistance({lat: latA, lng: longA}, {lat: latB, lng: longB}) / 1609.34) + " miles";
                $scope.polyline.center = distanceService.getMidpoint({lat: latA, lng: longA}, {lat: latB, lng: longB});
                console.log($scope.polyline.center);
              }
              $scope.$digest();
            }
          });
        });
      }
    };
    
  }]);
