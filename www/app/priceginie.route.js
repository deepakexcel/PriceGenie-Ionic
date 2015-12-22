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
                templateUrl: 'app/home/menu.html',
                controller: 'menuCtrl',
                // abstract: true
            })

            .state('menu.home', {
                url: '/home',
                views: {'mainView': {
                        templateUrl: 'app/home/home.html',
                        controller: 'homeCtrl'
                    }}
            })
            .state('menu.category', {
                url: '/category/:name/:category/:subCategory/:brand',
                views: {'mainView': {
                        templateUrl: 'app/product/viewall.html',
                        controller: 'viewallCtrl'
                    }}
            })
            .state('menu.search', {
                url: '/search',
                views: {'mainView': {
                        templateUrl: 'app/product/search.html',
                        controller: 'searchCtrl'
                    }}
            })
            .state('menu.product', {
                url: '/product/:name/:query_id/',
                views: {'mainView': {
                        templateUrl: 'app/product/product.html',
                        controller: 'productCtrl'
                    }}
            })
            .state('menu.register', {
                url: '/register',
                views: {'mainView': {
                        templateUrl: 'app/register/register.html',
                        controller: 'registerCtrl'
                    }}
            })
            .state('menu.login', {
                url: '/login',
                views: {'mainView': {
                        templateUrl: 'app/login/login.html',
                        controller: 'loginCtrl'
                    }}
            })
            .state('menu.setting', {
                url: '/setting',
                views: {'mainView': {
                        templateUrl: 'app/setting/setting.html',
                        controller: 'settingCtrl'
                    }}
            })
            .state('menu.feedback', {
                url: '/feedback',
                views: {'mainView': {
                        templateUrl: 'app/feedback/feedback.html',
                        controller: 'feedbackCtrl'
                    }}
            })
            .state('menu.recentSearches', {
                url: '/recent',
                views: {'mainView': {
                        templateUrl: 'app/product/myRecentSearches.html',
                        controller: 'recentSearches'
                    }}
            })
            .state('menu.Aboutus', {
                url: '/Aboutus',
                views: {'mainView': {
                        templateUrl: 'app/about/Aboutus.html',
                        controller: 'AboutusCtrl'
                    }}
            })
            .state('menu.star', {
                url: '/notification',
                views: {'mainView': {
                        templateUrl: 'app/common/star.html',
                        controller: 'star'
                    }}
            })
            .state('menu.notification', {
                url: '/category',
                views: {'mainView': {
                        templateUrl: 'app/common/notification.html',
                        controller: 'star'
                    }}
            })
            .state('menu.Contactus', {
                url: '/Contactus',
                views: {'mainView': {
                        templateUrl: 'app/contact/Contactus.html',
                        controller: 'ContactusCtrl'
                    }}
            })
            .state('menu.YourAlert', {
                url: '/YourAlert',
                views: {'mainView': {
                        templateUrl: 'app/common/YourAlert.html',
                        controller: 'YourAlertCtrl'
                    }}
            })
            .state('menu.website', {
                url: '/website',
                views: {'mainView': {
                        templateUrl: 'app/common/website.html',
                        controller: 'star'
                    }}
            })
            .state('menu.notifytext', {
                url: '/text',
                views: {'mainView': {
                        templateUrl: 'app/common/notifytext.html',
                        controller: 'star'
                    }}
            })
            .state('menu.success', {
                url: '/successful',
                views: {'mainView': {
                        templateUrl: 'app/common/notifySuccess.html',
                        controller: 'star'
                    }}
            })
            .state('menu.offline', {
                url: '/offline',
                views: {'mainView': {
                        templateUrl: 'app/common/offline.html',
                        controller: 'recentSearches'
                    }}
            });


    $urlRouterProvider.otherwise('/priceGenie/home');

});
})();