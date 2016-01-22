function handleOpenURL(url) {
    console.log("received url: " + url);
    window.localStorage.setItem("external_load", url);
}
(function() {
    'use strict';
    angular.module('starter', ['ionic', 'angular-chartist', 'ngStorage', 'ngIOS9UIWebViewPatch'])
            .run(function($ionicPlatform, urlHelper, $ionicHistory, $rootScope, timeStorage, $timeout, Onsuccess) {

                Onsuccess.networkCheker();
                Onsuccess.ios();
                $ionicPlatform.ready(function() {

                    Onsuccess.redirect();

                });



            });
// var myapp = angular.module('starter', ['ionic', 'startercc', 'angular-chartist']);
// var myapps = angular.module('starterss', ['ionic', 'startercc', 'ngStorage']);
})();