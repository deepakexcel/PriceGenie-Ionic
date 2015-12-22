(function() {
    'use strict';

    angular.module('starter')
    .controller('settingCtrl', function($scope, timeStorage, $rootScope, ajaxRequest,settingService) {
    console.log("Setting");
    var self = this;

    try {
        $scope.uuid = device.uuid;
        console.log($scope.uuid);
        $scope.phoneName = device.platform;
        console.log($scope.phoneName);
    }
    catch (e) {
        console.log(e);
    }
    self.caller =settingService.caller();
    var y = timeStorage.get("login");

    var api = 'mobile_api/api.php?action=logout_notify&user_key=' + y.user_key + '&device_id=' + $scope.uuid;
    $scope.logout = function() {
        timeStorage.remove("login");
        timeStorage.remove("googleLogin");
        timeStorage.remove("google_access_token");
        timeStorage.remove("fbLogin");
        var promise = ajaxRequest.send(api);
        promise.then(function(data) {
            $scope.response = data;
        });
        try {
            if (window.cordova) {
                facebookConnectPlugin.getLoginStatus(function(fbUserObject) {

                    console.log("FB success");
                    console.log(fbUserObject.status);
                    if (fbUserObject.status === 'connected') {
                        facebookConnectPlugin.logout(
                                function() {
                                },
                                function() {
                                });
                    }

                }, function(errorObj) {
                    console.log("FB failed" + errorObj);
                });
            }
            else {
                facebookConnectPlugin.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        facebookConnectPlugin.logout(function(response) {
                            // user is now logged out
                        });
                    }
                });

            }
        }
        catch (e) {

        }
        self.caller();

    };
});
})();