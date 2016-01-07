(function() {
    'use strict';
angular
    .module('starter')
    .service('settingService', settingService);

function settingService(timeStorage, $rootScope) {
  this.caller = function() {
    if (!timeStorage.get("login") && !timeStorage.get("googleLogin") && !timeStorage.get("fbLogin")) {
            console.log("show");
            $rootScope.show = true;
            $rootScope.show1 = false;
        }
        else if (timeStorage.get("login") !== '') {
            var x = timeStorage.get("login");
            console.log(x);
            $rootScope.user = x.firstname;
            console.log("show1");
            $rootScope.show1 = true;
            $rootScope.show = false;
        } else if (timeStorage.get("fbLogin") !== '') {
            var x = timeStorage.get("fbLogin");
            console.log(x);
            $rootScope.user = x.name;
            console.log("show12");
            $rootScope.show1 = true;
            $rootScope.show = false;
        }
        else {
            var x = timeStorage.get("googleLogin");
            console.log(x);
            $rootScope.user = x.firstname;
            console.log("show1");
            $rootScope.show1 = true;
            $rootScope.show = false;
        }
    };

  }
  

})();