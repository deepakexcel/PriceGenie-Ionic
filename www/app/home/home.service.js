(function() {
    'use strict';
    angular
            .module('starter')
            .service('homeService', homeService);

    function homeService(timeStorage, $rootScope) {
        this.caller = function() {
            if (!timeStorage.get("login") && !timeStorage.get("googleLogin") && !timeStorage.get("fbLogin")) {
                console.log("show");
                $rootScope.show = true;
                $rootScope.show1 = false;
                $rootScope.login = false;
            }
            else if (timeStorage.get("login") != '') {
                var x = timeStorage.get("login");
                $rootScope.login = true;
                console.log(x);
                $rootScope.user = x.firstname;
                console.log($rootScope.user);
                console.log("show1");
                $rootScope.show1 = true;
                $rootScope.show = false;
                $rootScope.shadow = {
                    'box-shadow': '0px -1px 0px 0px #5b656f'
                };
            } else if (timeStorage.get("fbLogin") != '') {
                var x = timeStorage.get("fbLogin");
                $rootScope.login = true;
                console.log(x);
                $rootScope.user = x.firstname;
                console.log("show12");
                $rootScope.show1 = true;
                $rootScope.show = false;
                $rootScope.shadow = {
                    'box-shadow': '0px -1px 0px 0px #5b656f'
                };
            }
            else {
                var x = timeStorage.get("googleLogin");
                console.log(x);
                $rootScope.login = true;
                $rootScope.user = x.firstname;
                console.log("show13");
                $rootScope.show1 = true;
                $rootScope.show = false;
                $rootScope.shadow = {
                    'box-shadow': '0px -1px 0px 0px #5b656f'
                };
            }

        };

    }

})();