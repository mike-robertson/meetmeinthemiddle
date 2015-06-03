'use strict';

angular.module('meetmeinthemiddleApp')
  .directive('addressForm', function () {
    return {
      templateUrl: 'app/directives/address-form/address-form.html',
      restrict: 'EA',
      scope: {
        options: '=',
        coordsArray: '=',
        labelText: '@',
        update: '&'
      },
      controller: function($scope) {   
        console.log($scope.options);
        $scope.callParentUpdate = function() {
          $scope.update({address: $scope.options.address});
        };
        
        $scope.toggleShowForm = function() {
          $scope.options.showForm = !$scope.options.showForm;
        };             
        
        // This is just a list of all states for use in our address picker.
        $scope.states = [      
          'Alabama',      'Alaska',      'Arizona',      'Arkansas',
          'California',      'Colorado',      'Connecticut',      'Delaware',
          'Florida',      'Georgia',      'Hawaii',      'Idaho',
          'Illinois',      'Indiana',      'Iowa',      'Kansas',
          'Kentucky',      'Louisiana',      'Maine',      'Maryland',
          'Massachusetts',      'Michigan',      'Minnesota',      'Mississippi',
          'Missouri',      'Montana',      'Nebraska',      'Nevada',
          'New Hampshire',      'New Jersey',      'New Mexico',      'New York',
          'North Carolina',      'North Dakota',      'Ohio',      'Oklahoma',
          'Oregon',      'Pennsylvania',      'Rhode Island',      'South Carolina',
          'South Dakota',      'Tennessee',      'Texas',      'Utah',
          'Vermont',      'Virginia',      'Washington',      'West Virginia',
          'Wisconsin',      'Wyoming'
        ];
      }
    };
  });