(function() {
    'use strict';

    angular.module('starter')
            .service('Onsuccess', stateChange);

    function stateChange($rootScope, timeStorage, urlHelper) {



        this.ios = function() {
            var ios = ionic.Platform.isIOS();
            if (ios) {
                $rootScope.footer_ios = true;
                $rootScope.head = false;
            }
            else {
                $rootScope.head = true;
                $rootScope.footer_ios = false;
                console.log('not ios' + $rootScope.head);

            }
        };
        this.redirect = function() {
            var isWebView = ionic.Platform.isWebView();
            console.log('hello' + isWebView);
            try {
                if (device.platform == 'Android') {
                    StatusBar.backgroundColorByHexString("#06457b");
                }

            } catch (e) {


            }
            if (localStorage.getItem('external_load')) {
                urlHelper.openProduct();
                console.log('Product');
            } else {
                console.log('home');
                urlHelper.openHome();
            }

        };
        this.networkCheker = function() {
            document.addEventListener("offline", onOffline, false);

            function onOffline() {
                console.log('hello1');
                //   window.plugins.toast.showShortBottom('You Are Offline Now');
                urlHelper.openOffline();
            }
            document.addEventListener("online", onOnline, false);

            function onOnline() {
                urlHelper.openHome();
                console.log("hello2");
                //  window.plugins.toast.showShortBottom('You Are Online Now');
            }
        }

        $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                    console.log('run');
                    console.log($rootScope.showdata);
//                        $rootScope.$emit('hideMenu');
                    if ($rootScope.showdata)
                    {
                        $rootScope.myFold = true;
                        $rootScope.showdata = false;
                    }

                    if (toState.name == 'main.Report') {
                        console.log(toState);
                        console.log('yes report view');
                        $rootScope.show = true;
                        $rootScope.show1 = true;
                        $rootScope.show2 = true;

                    }
                    else {
                        console.log(toState);
                        console.log('no report view ');
                        $rootScope.show = false;
                        $rootScope.show1 = false;
                        if (timeStorage.get('login').role == "Data Controls" || timeStorage.get('login').role == "Documentation") {
                            console.log('data control role');
                            $rootScope.show2 = true;
                        } else {
                            console.log('not data control role');
                            $rootScope.show2 = false;
                        }
                    }
                });

    }
    ;







})();