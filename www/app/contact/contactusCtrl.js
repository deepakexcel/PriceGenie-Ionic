(function() {
    'use strict';

    angular.module('starter').controller('ContactusCtrl', function($scope, $ionicHistory) {

    $scope.backHistory = function() {   //this is for back button 
        $ionicHistory.goBack();
    };

});
})();
