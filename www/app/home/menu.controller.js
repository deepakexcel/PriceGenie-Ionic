(function() {
    'use strict';

    angular.module('starter')
            .controller('menuCtrl', function($scope, ajaxRequest, $timeout, $rootScope, $ionicLoading, $ionicPlatform, $ionicHistory, urlHelper, timeStorage) {

                var count = 0;


                $scope.closePodcastsLoader = function() {
                    $ionicLoading.hide();
                };
                $scope.isMobile = false;
                document.addEventListener("deviceready", function() {

                    if (window.cordova) {
                        $scope.isMobile = true;
                    }
                    try {
                        $scope.uuid = device.uuid;   //getting device id
                        console.log($scope.uuid);
                        $scope.phoneName = device.platform;
                        console.log($scope.phoneName);
                        if (device.platform == 'iOS' || device.platform == 'iPhone') {
                            $scope.iostr = true;
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                    //     var push = PushNotification.init({ 
                    //         "android": {"senderID": "117380048302"}
                    //     });
                    //    push.on('registration', function(data) {
                    //     console.log(data);
                    //     var x=data.registrationId;
                    //     timeStorage.set("Noti_reg_id", x, 100);
                    //     var action = "add_mobile";
                    //     var params = 'device_id=' + encodeURIComponent(device.uuid) + '&user_key=' + '' + '&gcm_reg_id=' + encodeURIComponent(x);
                    //     var api = 'mobile_api/api.php?action=' + action + '&' + params;
                    //     console.log(api);
                    //     var promise = ajaxRequest.send(api);
                    //     promise.then(function(data) {
                    //     console.log(data);
                    //         });
                    // });
                    //  push.on('notification', function(data) {
                    //      console.log(data.message);
                    //     // data.message,
                    //     // data.title,
                    //     // data.count,
                    //     // data.sound,
                    //     // data.image,
                    //     // data.additionalData
                    // });

                    // push.on('error', function(e) {
                    //     console.log(e.message);
                    //     // e.message
                    // });

                });





                var data = {
                    title: "AUX Scrum",
                    message: "Scrum: Daily touchbase @ 10am Please be on time so we can cover everything on the agenda.",
                    actions: [
                        {icon: "emailGuests", title: "EMAIL GUESTS", callback: "app.emailGuests"},
                        {icon: "snooze", title: "SNOOZE", callback: "app.snooze"}
                    ]
                }
//    document.addEventListener("deviceready", function() {
//        var pushNotification = window.plugins.pushNotification;
//        console.log('push=' + pushNotification);
//        if (device.platform == 'Android')
//        {
//            pushNotification.register(
//                    successHandler,
//                    errorHandler,
//                    {
//                        'senderID': '117380048302',
//                        'ecb': "window.onNotification" // callback function
//                    }
//            );
//        }
//        function errorHandler(error) {
//            console.log('Error: ' + error);
//        }
//        function successHandler(result) {
//            console.log('Success: ' + result);
//        }
//
//
//        window.onNotification = function(e) {
//            console.log("i am in notification function");
//            switch (e.event) {
//                case 'registered':
//                    if (e.regid.length > 0) {
//                        //  deviceRegistered(e.regid);
//                        var x = e.regid;
//                        console.log(x);
//                        timeStorage.set("Noti_reg_id", x, 100);
//                        var action = "add_mobile";
//                        var params = 'device_id=' + encodeURIComponent(device.uuid) + '&user_key=' + '' + '&gcm_reg_id=' + encodeURIComponent(x);
//
//                        var api = 'mobile_api/api.php?action=' + action + '&' + params;
//                        console.log(api);
//                        var promise = ajaxRequest.send(api);
//                        promise.then(function(data) {
//                            console.log(data);
//                        });
//                    }
//                    break;
//
//                case 'message':
//                    if (e.foreground) {
//                        // When the app is running foreground. 
//                        console.log('foreground');
//                        alert(e.payload.message);
//
//                    }
//                    else if (e.background)
//                    {
//
//                        console.log('--INLINE NOTIFICATION--' + '');
//
//                    }
//                    else
//                    {
//                        // otherwise we were launched because the user touched a notification in the notification tray.
//                        if (e.coldstart)
//                            console.log('--COLDSTART NOTIFICATION--' + '');
//                        else
//                            console.log('--BACKGROUND NOTIFICATION--' + '');
//                        // direct user here:
//                    }
//
//                    break;
//
//                case 'error':
//                    console.log('Error: ' + e.msg);
//                    break;
//
//                default:
//                    console.log('An unknown event was received');
//                    break;
//            }
//            $scope.showMenu = function() {
//                console.log("yes i am ready");
//                $scope.showMenu1 = true;
//
//            };
//        };
//    });
                var self = this;
                $rootScope.iconColor = function(val) {
                    $scope.cl = val;
                };
                $rootScope.home = function() {
                    console.log('welcome to home');
                    urlHelper.openHome();
                };
                var menushow = 0;
                $scope.showMenu = function() {
                    console.log("yes i am ready");
                    if (menushow == 0) {
                        $scope.showMenu1 = true;
                        menushow = 1;
                    }
                    else {
                        $scope.showMenu1 = false;
                        menushow = 0;
                    }

                };
                $scope.goto = function() {
                    $scope.showMenu1 = false;
                    menushow = 0;
                };
                $scope.hidemenu = function() {
                    if ($scope.showMenu1 === false) {
                        menushow = 0;
                    } else {
                        $scope.showMenu1 = false;
                    }
                };

                self.caller = function() {
                    if (!timeStorage.get("login") && !timeStorage.get("googleLogin") && !timeStorage.get("fbLogin")) {
                        console.log("show");
                        $scope.login = false;
                        $rootScope.show = true;
                        $rootScope.show1 = false;
                    }
                    else if (timeStorage.get("login") !== '') {
                        var x = timeStorage.get("login");
                        console.log(x);
                        $scope.login = true;
                        $rootScope.user = x.firstname;
                        console.log("show1");
                        $rootScope.show1 = true;
                        $rootScope.show = false;
                    } else if (timeStorage.get("fbLogin") !== '') {
                        $scope.login = true;
                        var x = timeStorage.get("fbLogin");
                        console.log(x);
                        $rootScope.user = x.name;
                        console.log("show12");
                        $rootScope.show1 = true;
                        $rootScope.show = false;
                    }
                    else {
                        var x = timeStorage.get("googleLogin");
                        $scope.login = true;
                        console.log(x);
                        $rootScope.user = x.firstname;
                        console.log("show1");
                        $rootScope.show1 = true;
                        $rootScope.show = false;
                    }
                };

                $ionicPlatform.registerBackButtonAction(function() {
//        event.preventDefault();
//        event.stopPropagation();
                    $ionicLoading.hide();

                    var view = $ionicHistory.currentView();
                    console.log(view.stateId);
                    if (view.stateId == 'menu.home' && count == 0 || view.stateId == 'menu.offline' && count == 0)
                    {
                        $ionicLoading.hide();
                        window.plugins.toast.showShortBottom('Press Back Button Again To Exit The App!');
                        count++;

                        $timeout(function() {
                            count = 0;
                        }, 3000);
                    }
                    else if (view.stateId == 'menu.home' && count == 1 || view.stateId == 'menu.offline' && count == 1)
                    {
                        $ionicLoading.hide();
                        navigator.app.exitApp();
                        count = 0;
                    }
                    else
                    {
                        $ionicLoading.hide();
                        $ionicHistory.goBack();
                        count = 0;
                    }
                }, 100);
                // view = $ionicHistory.currentView();
                // console.log(view);
                $scope.cut = function(name) {
                    if (name)
                        var name1 = name.substr(0, 30);
                    return name1;
                };





                //This is for share app
                $scope.share = function() {
                    console.log('share me');
                    $scope.showMenu1 = false;
                    menushow = 0;
                    if ($scope.isMobile) {
                        console.log('true');
                        window.plugins.socialsharing.share('Checkout this App!', 'Use it to before buying anything online, it will show you better prices.', null, 'http://goo.gl/G1rgUz');
                    }
                    else {
                        console.log("false");
                    }
                };

                //this is for feedback 

                $scope.Email = false;

                if (window.cordova && window.cordova.plugins && window.cordova.plugins.email) {
                    cordova.plugins.email.isAvailable(function(isAvailable) {
                        $scope.Email = isAvailable;
                        console.log($scope.Email);
                    });
                }
                $rootScope.feedback = function() {
                    $scope.showMenu1 = false;
                    console.log(device.platform);
                    menushow = 0;
//                    if ($scope.isMobile && $scope.Email) {
                    console.log("true");
                    cordova.plugins.email.open({// for opening gmail app
                        app: 'gmail',
                        to: 'arun@excellencetechnologies.in', // email addresses for TO field
                        subject: 'Feedback For PriceGenie App',
                        isHtml: true,
                        attachments: ['base64:device.json//' + btoa(JSON.stringify($scope.device))]
                    });

//                    } else {
//                        console.log("false");
//                        urlHelper.openFeedback();
//                    }
                };
                if ($scope.isMobile) {
                    $scope.device = {
                        platform: device.platform,
                        version: device.version,
                        device_id: device.uuid
                    };
                    cordova.getAppVersion.getVersionNumber(function(version) {
                        $scope.$apply(function() {
                            $scope.device.Appversion = version;
                            console.log('app name is:' + $scope.device.Appversion);
                        });
                    });
                    cordova.getAppVersion.getAppName(function(name) {
                        $scope.$apply(function() {
                            $scope.device.Appname = name;
                            console.log('app name is:' + $scope.device.Appname);
                        });
                    });
                    console.log($scope.device);
                }

                // rate app function

                $scope.goback = function() {
                    $ionicHistory.goBack();
                };
                $scope.rateApp = function() {
                    console.log('rateApp');
                    $scope.showMenu1 = false;
                    menushow = 0;
                    var customLocale = {};
                    customLocale.title = "Rate PriceGenie";
                    customLocale.message = "If you enjoy using PriceGenie, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!";
                    customLocale.cancelButtonLabel = "No, Thanks";
                    customLocale.laterButtonLabel = "Remind Me Later";
                    customLocale.rateButtonLabel = "Rate It Now";
                    if ($scope.phoneName === "iOS") {
                        console.log('iPhone');
                        AppRate.preferences.customLocale = customLocale;
                        AppRate.preferences.storeAppURL.ios = '511364723';
                        AppRate.promptForRating(true);

                    } else if ($scope.phoneName === "Android") {
                        console.log('Android');
                        AppRate.preferences.customLocale = customLocale;
                        AppRate.preferences.storeAppURL.android = 'market://details?id=com.excellence.PriceGenie';
                        AppRate.promptForRating(true);

                    } else if ($scope.phoneName === "BlackBerry") {
                        console.log('BlackBerry');
                        AppRate.preferences.customLocale = customLocale;
                        AppRate.preferences.storeAppURL.blackberry = 'http://appworld.blackberry.com/webstore/content/<applicationid>';
                        AppRate.promptForRating(true);

                    }
                    else {
                        console.log('nothing');
                    }

                };
                var recent = [];
                //vaibhav common funcion in product and home page to open product page 

                $scope.product = function(product) {
                    urlHelper.openProduct({name: product.full_name, query_id: product.query_id});

                    var data = {
                        query_id: product.query_id,
                        query_date: new Date(),
                        query: product.full_name
                    };

                    if (!timeStorage.get('myRecentSearch'))
                    {
                        recent.push(data);
                        timeStorage.set('myRecentSearch', recent, 120);
                    }
                    else
                    {
                        recent = timeStorage.get('myRecentSearch');
                        console.log(recent.length);
                        for (var i = 0; i < recent.length; i++)
                        {
                            var j = recent.length;
                            if (data.query_id == recent[i].query_id)
                            {
                                console.log('if');
                                recent[i].query_date = new Date();
                                j = -10;
                                break;
                            }
                            else if (i == j - 1)
                            {
                                console.log('else');
                                recent.push(data);
                                break;
                            }
                        }
                        timeStorage.remove('myRecentSearch');
                        timeStorage.set('myRecentSearch', recent, 120);
                    }
                    console.log(recent);

                };
                var y = timeStorage.get("login")

                $scope.logout = function() {
                    $scope.shadow = {
                        'box-shadow': '0px 0px 0px 0px'
                    };
                    $scope.showMenu1 = false;
                    menushow = 0;
                    var api = 'mobile_api/api.php?action=logout_notify&user_key=' + y.user_key + '&device_id=' + $scope.uuid;
                    timeStorage.remove("login");
                    timeStorage.remove("googleLogin");
                    timeStorage.remove("google_access_token");
                    timeStorage.remove("fbLogin");
                    self.caller();
                    urlHelper.openHome();
                    window.plugins.toast.showShortTop("You are Logged Out");
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


                };

            }).directive('closeSubmenu', function($window, $ionicHistory, $localStorage) {
        return {
            scope: {
                closeSubmenu: '&'
            },
            link: function(scope, element, attrs) {

                var x = 0;
                angular.element($window).bind('click', function(e) {

                    if (e.target.id == 'moreView') {

                        if (x == 0) {
                            x = 1;
                            try {
                                if (device.platform == 'iOS') {
                                    console.log('ios');
                                    var ele = document.getElementById("mypopover");
                                    ele.className = ele.className.replace("ng-hide", 'sidem topm');
                                }
                                else {
                                    console.log('other');
                                    var ele = document.getElementById("mypopover");
                                    ele.className = ele.className.replace("ng-hide", 'sidem');
                                }

                            } catch (e) {
                                console.log('other1');
                                var ele = document.getElementById("mypopover");
                                ele.className = ele.className.replace("ng-hide", 'sidem');
                            }


                        } else {
                            x = 0;

                            var ele = document.getElementById("mypopover");
                            ele.setAttribute("class", "ng-hide");

                        }

                    } else {
                        x = 0;

                        var ele = document.getElementById("mypopover");
                        ele.setAttribute("class", "ng-hide");

                    }

//                    }
                });
            }
        };
    });
})();
