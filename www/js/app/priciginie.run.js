(function() {
    'use strict';
    angular.module('starter', ['ionic', 'startercc', 'angular-chartist'])
        .run(function($ionicPlatform, urlHelper, $rootScope) {
        document.addEventListener("offline", onOffline, false);
    function onOffline() {
        console.log('hello1');
        urlHelper.openOffline();
    }
    document.addEventListener("online", onOnline, false);
    function onOnline() {
        urlHelper.openHome();
        console.log("hello2");
       
    }

    $ionicPlatform.ready(function() {
        var isWebView = ionic.Platform.isWebView();
        console.log(isWebView);
        try {
            if (device.platform == 'Android') {
                urlHelper.openHome();
                StatusBar.backgroundColorByHexString("#06457b");
            }
        }
        catch (e) {


        }
        if (isWebView) {
            urlHelper.openHome();
        }

    });
});
})();