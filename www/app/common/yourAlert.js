(function() {
    'use strict';

    angular.module('starter')
            .controller('YourAlertCtrl', function($scope, $ionicPopup, ajaxRequest, $stateParams, timeStorage, urlHelper, $ionicLoading) {
                var self = this;
                console.log($stateParams);
                self.AllData = function(api) {
                    $ionicLoading.show({
                        templateUrl: 'partials/modals/productPage/loading.html',
                        scope: $scope

                    });
                    var promise = ajaxRequest.send(api);
                    promise.then(function(data) {
                        $scope.response = data.data;
                        console.log('this data is for alert');
                        console.log($scope.response);

                        $ionicLoading.hide();
                        if (data.data == '') {
                            $scope.yes = true;

                        } else {
                            $scope.yes = false;
                        }

                    });
                };
                try {
                    if (device.platform == 'iOS' || device.platform == 'iPhone') {
                        $scope.iostr = true;
                    }
                }
                catch (e) {
                    console.log('not ios');
                }
                $scope.break = function(website) {
                    var web = [];
                    //  console.log(website);

                    var str = '';
                    for (var i = 0; i < website.length; i++)
                    {
                        if (website[i] !== ',' && i != website.length - 1)
                        {
                            if (website[i] !== ' ')
                                str = str + website[i];
                        }

                        else if (website[i] === ',' || i == website.length - 1)
                        {
                            if (i == website.length - 1)
                                str = str + website[i];
                            web.push(str);
                            str = '';
                        }
                    }

                    // console.log(web);
                    return web;
                };
                $scope.home = function() {
                    urlHelper.openHome();
                };
                var email;
                var userid;
                if (timeStorage.get('login').email)
                {
                    email = timeStorage.get('login').email;
                    userid = timeStorage.get('login').userid;
                }
                else if (timeStorage.get('googleLogin').email)
                {
                    email = timeStorage.get('googleLogin').email;
                    userid = timeStorage.get('googleLogin').userid;
                }
                else if (timeStorage.get('fbLogin').email)
                {
                    email = timeStorage.get('fbLogin').email;
                    userid = timeStorage.get('fbLogin').userid;
                }
                try {
                    $scope.uuid = device.uuid;
                    console.log($scope.uuid);
                    $scope.phoneName = device.platform;
                    console.log($scope.phoneName);
                }
                catch (e) {
                    //    console.log(e);
                }
                $scope.open = function(url) {
                    console.log(url);
                    window.open(url, '_system', 'location=yes');
                };
                $scope.closePodcastsLoader = function() {
                    $ionicLoading.hide();
                };

                self.main = function() {
                    var api = 'mobile_api/api.php?action=notify&type=account&device_id=' + $scope.uuid + '&user_id=' + userid + '&email=' + email;
                    self.AllData(api);
                };
              
                $scope.stoped = function(id, type) {
                    console.log(id);


                    if (type == "price_watch_start") {
                        var api = 'mobile_api/api.php?action=watch&watch_notify_id=' + id + '&device_id=' + $scope.uuid;
                        var promise = ajaxRequest.send(api);
                        promise.then(function(data) {
                            $scope.response = data.data;

                            if (data.message = "Watch Removed") {
                                window.plugins.toast.showShortTop(data.message);
                                var api = 'mobile_api/api.php?action=notify&type=account&device_id=' + $scope.uuid + '&user_id=' + userid + '&email=' + email;
                                self.AllData(api);
                            }
                        });
                    }
                    else {
                        var api = 'mobile_api/api.php?action=deal_notify&type=deal_notify_stop&notify_id=' + id + '&device_id=' + $scope.uuid;
                        var promise = ajaxRequest.send(api);
                        promise.then(function(data) {
                            $scope.response = data.data;

                            if (data.status == 1) {

                                var api = 'mobile_api/api.php?action=notify&type=account&device_id=' + $scope.uuid + '&user_id=' + userid + '&email=' + email;
                                self.AllData(api);
                            }
                        });
                    }
                };

                $scope.price = function(id, j) {
                    $ionicLoading.show({
                        templateUrl: 'partials/modals/productPage/loading.html',
                        scope: $scope

                    });
                    $scope.x = j;
                    var api = 'mobile_api/api.php?action=notify&type=watch_history&id=' + id + '&device_id=' + $scope.uuid + '&user_id=' + userid + '&email=' + email;
                    var promise = ajaxRequest.send(api);
                    promise.then(function(data) {
                        $scope.response1 = data;
                        $ionicLoading.hide();
                        console.log(data);
                    });
                };
            });
})();
