(function() {
    'use strict';
    angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
// if (ionic.Platform.isAndroid()) {
//      $ionicConfigProvider.scrolling.jsScrolling(false);
//    }
//    $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
    $stateProvider
//    .state('frontPage', {
//        url: '/frontPage',
//        templateUrl: 'partials/frontPage.html',
//        controller: 'frontPageCtrl'
//
//    })
            .state('menu', {
                url: '/priceGenie',
                templateUrl: 'partials/menu.html',
                controller: 'menuCtrl',
                // abstract: true
            })

            .state('menu.home', {
                url: '/home',
                views: {'mainView': {
                        templateUrl: 'partials/home.html',
                        controller: 'homeCtrl'
                    }}
            })
            .state('menu.category', {
                url: '/category/:name/:category/:subCategory/:brand',
                views: {'mainView': {
                        templateUrl: 'partials/viewall.html',
                        controller: 'viewallCtrl'
                    }}
            })
            .state('menu.search', {
                url: '/search',
                views: {'mainView': {
                        templateUrl: 'partials/search.html',
                        controller: 'searchCtrl'
                    }}
            })
            .state('menu.product', {
                url: '/product/:name/:query_id/',
                views: {'mainView': {
                        templateUrl: 'partials/product.html',
                        controller: 'productCtrl'
                    }}
            })
            .state('menu.register', {
                url: '/register',
                views: {'mainView': {
                        templateUrl: 'partials/register.html',
                        controller: 'registerCtrl'
                    }}
            })
            .state('menu.login', {
                url: '/login',
                views: {'mainView': {
                        templateUrl: 'partials/login.html',
                        controller: 'loginCtrl'
                    }}
            })
            .state('menu.setting', {
                url: '/setting',
                views: {'mainView': {
                        templateUrl: 'partials/setting.html',
                        controller: 'settingCtrl'
                    }}
            })
            .state('menu.feedback', {
                url: '/feedback',
                views: {'mainView': {
                        templateUrl: 'partials/feedback.html',
                        controller: 'feedbackCtrl'
                    }}
            })
            .state('menu.recentSearches', {
                url: '/recent',
                views: {'mainView': {
                        templateUrl: 'partials/myRecentSearches.html',
                        controller: 'recentSearches'
                    }}
            })
            .state('menu.Aboutus', {
                url: '/Aboutus',
                views: {'mainView': {
                        templateUrl: 'partials/Aboutus.html',
                        controller: 'AboutusCtrl'
                    }}
            })
            .state('menu.star', {
                url: '/notification',
                views: {'mainView': {
                        templateUrl: 'partials/star.html',
                        controller: 'star'
                    }}
            })
            .state('menu.notification', {
                url: '/category',
                views: {'mainView': {
                        templateUrl: 'partials/notification.html',
                        controller: 'star'
                    }}
            })
            .state('menu.Contactus', {
                url: '/Contactus',
                views: {'mainView': {
                        templateUrl: 'partials/Contactus.html',
                        controller: 'ContactusCtrl'
                    }}
            })
            .state('menu.YourAlert', {
                url: '/YourAlert',
                views: {'mainView': {
                        templateUrl: 'partials/YourAlert.html',
                        controller: 'YourAlertCtrl'
                    }}
            })
            .state('menu.website', {
                url: '/website',
                views: {'mainView': {
                        templateUrl: 'partials/website.html',
                        controller: 'star'
                    }}
            })
            .state('menu.notifytext', {
                url: '/text',
                views: {'mainView': {
                        templateUrl: 'partials/notifytext.html',
                        controller: 'star'
                    }}
            })
            .state('menu.success', {
                url: '/successful',
                views: {'mainView': {
                        templateUrl: 'partials/notifySuccess.html',
                        controller: 'star'
                    }}
            })
            .state('menu.offline', {
                url: '/offline',
                views: {'mainView': {
                        templateUrl: 'partials/offline.html',
                        controller: 'recentSearches'
                    }}
            });


    // $urlRouterProvider.otherwise('/priceGenie/home');

});
})();