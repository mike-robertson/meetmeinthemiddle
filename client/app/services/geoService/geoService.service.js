'use strict';

angular.module('meetmeinthemiddleApp')
  .factory('geoService', ['$q', function geoService($q) {

	return {
		getCoords: function() {
			var deferred = $q.defer();
			deferred.notify('getting coordinates now...');
			
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(function(position) {
				var coordObj = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				};
				
				deferred.resolve(coordObj);
				}, function() {
					deferred.reject('Unable to get the coordinates. The action timed out or the user denied the request');
				});
			} else {
				deferred.reject('Unable to get the coordinates. The action timed out or the user denied the request');
			}
			return deferred.promise;
		}
	};
  }]);
