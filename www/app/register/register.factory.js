(function() {
    'use strict';
    angular.module('starter')
        .factory('registerService', registerService);

    function registerService($ionicLoading, ajaxRequest, $ionicScrollDelegate, $http,$q) {
        var service = {};
        service.option=function(){
            var opt = {
            client_id: '117380048302-2a8bqb3vjdme9733tr0mk70gom4llmte.apps.googleusercontent.com',
            redirect_uri: 'http://localhost/PriceGeniee/www/',
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me',
            secret: 'X763UlBbCrPTrJMfsum9Mwye'
            };
            return opt;
        }

        return service;
    }
})();