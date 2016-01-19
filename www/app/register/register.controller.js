(function() {
    'use strict';

    angular.module('starter').controller('registerCtrl', function($scope, $ionicHistory, $ionicLoading, $log, googleLogin, $rootScope, urlHelper, timeStorage, $timeout, ajaxRequest, registerService) {
        $scope.model = {
            reg_firstname: '',
            reg_email: '',
            reg_pwd: '',
            reg_con_pwd: '',
            check: ''
        };
//        $ionicHistory.nextViewOptions({
//            historyRoot: true
//        });
        $scope.goback = function() {
            $ionicHistory.goBack();
        };
        $scope.closePodcastsLoader = function() {
            $ionicLoading.hide();
        };
        try {
            $scope.uuid = device.uuid;
            console.log($scope.uuid);
            $scope.phoneName = device.platform;
            console.log($scope.phoneName);
        } catch (e) {}
        var c = 0;
        var checked = false;
        $scope.check = function() {
                if (c == 0) {
                    checked = true;
                    c++;
                } else {
                    checked = false;
                    c--;
                }
            }
            //for email id sign up
        $scope.signup = function() {
                if (!$scope.model.reg_firstname) {
                    $scope.msg = "Please enter your name";
                    console.log($scope.msg);
                    window.plugins.toast.showShortTop($scope.msg);
                } else if (!$scope.model.reg_email) {
                    $scope.msg = "Please enter valid email";
                    console.log($scope.msg);
                    window.plugins.toast.showShortTop($scope.msg);
                } else if (!$scope.model.reg_pwd) {
                    $scope.msg = "Please enter password"
                    console.log($scope.msg);
                    window.plugins.toast.showShortTop($scope.msg);
                } else if (!$scope.model.reg_con_pwd) {
                    $scope.msg = "Please enter confirm password";
                    console.log($scope.msg);
                    window.plugins.toast.showShortTop($scope.msg);
                } else if (checked == false) {
                    $scope.msg = "Please agree with terms and conditions";
                    console.log($scope.msg);
                    window.plugins.toast.showShortTop($scope.msg);
                } else if ($scope.model.reg_con_pwd == $scope.model.reg_pwd) {
                    console.log("yes");
                    $ionicLoading.show({
                        templateUrl: 'partials/modals/productPage/loading.html',
                        scope: $scope
                    });
                    var api = 'mobile_api/api.php?action=facebook&mobile_app=1&reg_firstname=' + $scope.model.reg_firstname +
                        '&reg_email=' + $scope.model.reg_email + '&reg_pwd=' + $scope.model.reg_pwd + '&reg_con_pwd=' + $scope.model.reg_con_pwd +
                        '&register=manual&&device=' + $scope.phoneName + '&device_id=' + $scope.uuid;
                    var promise = ajaxRequest.send(api);
                    promise.then(function(data) {
                        $scope.response = data;
                        console.log(data.registration);
                        if (data.registration == true) {
                             $scope.msg = data.register_status;
                            $ionicLoading.hide();
                            urlHelper.openLogin();
                            window.plugins.toast.showShortTop($scope.msg);
                        } else {
                            $scope.msg = data.register_status;
                            $ionicLoading.hide();
                            window.plugins.toast.showShortTop($scope.msg);
                        }
                    });
                } else {
                    $scope.msg = "password not match";
                    console.log($scope.msg);
                    window.plugins.toast.showShortTop($scope.msg);
                }
            }
            //for terms and condition
        $scope.terms = function() {
                console.log("terms")
                window.open('http://pricegenie.co/blog/terms-and-conditions/', '_system', 'location=yes');
            };
            //google+ login 
        var opt = registerService.option();
        $scope.gogleLogin = function() {
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope,
                noBackdrop: false
            });
            var loginGoogle = googleLogin.authorize(opt);
            loginGoogle.then(function(res) {
                console.log(res);
                if (res.google_id != '') {
                    var api1 = 'facebook.php?type=mobile_google&id=' + res.google_id + '&name=' + res.name + '&email=' + res.email + '&gender=' + res.gender + '&device_id=' + $scope.uuid;;
                    var promise = ajaxRequest.send(api1);
                    promise.then(function(data) {
                        $scope.response = data;
                        var name = 'googleLogin';
                        timeStorage.set(name, data, 168);
                        urlHelper.openHome();
                        window.plugins.toast.showShortTop('Hi ' + data.firstname);
                        console.log(data);
                    });
                }
            });
        };
        //for facebook login
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
                        self.getData();
                    } else {
                        $log.info('User Not Logged In');
                    }
                }, function() {
                    $log.warn('Get Login Status Error');
                });
            } catch (e) {

            }
        }, 1000);
        $scope.facebookLogin = function() {
            $ionicLoading.show({
                templateUrl: 'partials/modals/productPage/loading.html',
                scope: $scope,
                noBackdrop: false
            });
            facebookConnectPlugin.login(['public_profile'], function(data) {
                $log.info(data);
                self.getData();
            }, function(data) {
                $log.warn(data);
                $ionicLoading.hide();
            });
        };
        self.getData = function() {
            console.log("api call");
            facebookConnectPlugin.api('/me', ['public_profile', 'email'], function(data) {
                $log.info("data from login" + data);
                $scope.$apply(function() {
                    $scope.fb_data = data;
                });
               var api1 = 'facebook.php?type=mobile_facebook&id=' + data.id + '&name=' + data.name + '&email=' + data.email + '&gender=' + data.gender + '&device_id=' + $scope.uuid;
                var promise = ajaxRequest.send(api1);
                promise.then(function(data1) {
                    $scope.response = data;
                    var name = 'fbLogin';
                    timeStorage.set(name, data1, 168);
                    urlHelper.openHome();
                    window.plugins.toast.showShortTop('Hi ' + data1.firstname);
                });
                console.log('fb login=' + data.id + ',' + data.name + ',' + data.email);
            });
        };
    });
})();