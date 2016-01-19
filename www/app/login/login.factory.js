(function() {
    'use strict';
    angular.module('starter')
        .factory('loginService', loginService);

    function loginService($ionicLoading, $timeout, $rootScope, $log, timeStorage, ajaxRequest, urlHelper) {
        var service = {};
        service.facebookLogin = function(){
            this.timeout();    
        };
        service.timeout = function() {
            $timeout(function() {
                //timeout requried to wait for facebook plugin file to load
                try {
                    if (window.cordova.platformId == "browser") {
                        facebookConnectPlugin.browserInit('467986553238213');
                    }
                    facebookConnectPlugin.getLoginStatus(function(response) {
                        $log.info(response);
                        if (response.status === 'connected') {
                            $log.info('User Already LoggedIn');
                            service.getData();
                            //  self.caller();
                        } else {
                            $log.info('User Not Logged In');
                            this.facebookLogin();
                        }
                    }, function() {
                        $log.warn('Get Login Status Error');

                    });
                } catch (e) {

                }
            }, 1000);
        };
        service.facebookLogin = function() {
        console.log("yes");
        $ionicLoading.show({
            templateUrl: 'partials/modals/productPage/loading.html',
            scope: $rootScope,
            noBackdrop: false
        });
        facebookConnectPlugin.login(['public_profile'], function(data) {
            $log.info(data);
            service.getData();
        }, function(data) {
            $log.warn(data);
            $ionicLoading.hide();
        });
    };
        service.getData = function() {
        facebookConnectPlugin.api('/me', ['public_profile'], function(data) {
            $log.info(data);
      
            $rootScope.$apply(function() {
                $rootScope.fb_data = data;
            });
            var api1 = 'facebook.php?type=mobile_facebook&id=' + data.id + '&name=' + data.name + '&email=' + data.email + '&gender=' + data.gender + '&device_id=' + device.uuid;
            var promise = ajaxRequest.send(api1);
            promise.then(function(data1) {
                $rootScope.response = data;
                var name = 'fbLogin';
                timeStorage.set(name, data1, 168);
                urlHelper.openHome();
                window.plugins.toast.showShortTop('Hi ' + data1.firstname);
            });
            console.log('fb login' + data.id + ',' + data.name);
        });
    };
        return service;
    }
})();