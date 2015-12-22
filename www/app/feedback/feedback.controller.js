(function() {
    'use strict';

    angular.module('starter')
    .controller('feedbackCtrl', function($scope, $ionicLoading, ajaxRequest, $ionicScrollDelegate, $http,feedbackService) {
    var self = this;
    $scope.text = {
        show: 'What do you want to say about the product!',
        email: '',
        name: ''
    };

    $scope.closePodcastsLoader = function() {
        $ionicLoading.hide();
    };
    $scope.again = function() {
        if (!$scope.text.show)
            $scope.text.show = 'What do you want to say about the product!';
    };

    $scope.feedBack = function() {

        $ionicScrollDelegate.scrollTop(true);
        if (!$scope.text.name)
        {
            console.log('please enter your name');
            window.plugins.toast.showShortTop('please enter your name');
        }
        else if (!$scope.text.email)
        {
            console.log('please enter a valid email');
            window.plugins.toast.showShortTop('please enter a valid email');
        }
        else if (!$scope.text.show)
        {
            console.log('please enter a some message');
            window.plugins.toast.showShortTop('please enter a some message');
        }
        else
        {
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope
            });
            var data = {
                email: $scope.text.email,
                feed_msg: $scope.text.show,
                name: $scope.text.name,
                pageURL: 'From Mobile App'
            };

            console.log(data);
            feedbackService.sendEmail(data).then(function(data){
                console.log("success");
                $scope.text.name = '';
                $scope.text.email = '';
                $scope.text.show = 'What do you want to say about the product!';
            });
            
        }
    };


});
})();