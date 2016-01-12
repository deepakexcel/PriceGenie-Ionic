(function() {
    'use strict';

    angular.module('starter')
            .controller('homeCtrl', function($ionicHistory, $timeout, $rootScope, $ionicModal, $scope, ajaxRequest, urlHelper, timeStorage, $interval, $ionicLoading, $ionicScrollDelegate, userData, homeService) {
                $ionicHistory.clearHistory();    //clearing history of app to disable back views
                console.log("kush");
                var self = this;
       
               
                
                var email = userData.userEmail();
                var userid = userData.userId();
//getting device id
                try {
                    $scope.uuid = device.uuid;   //getting device id
                    console.log($scope.uuid);
                    $scope.phoneName = device.platform;
                    console.log($scope.phoneName);
                }
                catch (e) {
                    console.log(e);
                }
                $scope.closePodcastsLoader = function() {
                    $ionicLoading.hide();
                };
                try {
                    if (device.platform == 'iOS' || device.platform == 'iPhone') {
                        $rootScope.iostr = true;
                        console.log("hello " + $rootScope.iostr)
                    }
                }
                catch (e) {
                    console.log('not ios');
                }
                //function to call toast
                self.toast = function(msg) {
                    window.plugins.toast.showWithOptions(
                            {
                                message: msg,
                                duration: "short",
                                position: "top",
                                addPixelsY: -40  // added a negative value to move it up a bit (default 0)
                            }
                    );
                };
                // checking login for side menu
                self.caller = homeService.caller();

                //event when modal closes
                $scope.$on('modal.hidden', function() {
                    $ionicScrollDelegate.scrollTop();
                });
                $ionicLoading.hide();

                console.log($scope.login);
                self.ajax1 = function() {
                    var urlmain = 'mobile_api/api.php?action=category_tree';
                    var promise = ajaxRequest.send(urlmain);
                    promise.then(function(data) {

                        console.log(data);
                        //vaibhav :setting data in localstorage
                        timeStorage.set('subcategory', data, 168);
                        $ionicLoading.hide();
                        $ionicScrollDelegate.resize();
//            $scope.$broadcast('scroll.refreshComplete');
                    });
                };

                if (!timeStorage.get('subcategory')) {
                    self.ajax1();
                }

                //vaibhav: initializing default category to load in popular items
                var cat;
                var category;
                //vaibhav: function loads data when click on category
                $ionicModal.fromTemplateUrl('partials/modals/homePage/subCat.html', {
                    scope: $scope,
                    animaion: 'slide-in-left'
                }).then(function(modal2) {
                    $scope.subCatModal = modal2;     // showing sub category in subCat Modal
                });
                $scope.subCatModalClose = function() {
                    $scope.subCatModal.hide();
                };

                $scope.loadLatest = function(cat) {
                    console.log("product");
                    $scope.homeCat = cat;

                    $timeout(function() {
                        $scope.homeCat = '';
                        $scope.catItems1 = '';
                        category = cat;
                        $scope.subCatModal.show();
                        $ionicLoading.show({
                            templateUrl: 'partials/modals/productPage/loading.html',
                            scope: $scope
                        });
                        $scope.categoryDisplay = cat;
                        cat = cat.replace(/[^a-zA-Z0-9]/gi, '');
                        //vaibhav: checking data in localstorage
                        if (timeStorage.get('subcategory')) {
                            $scope.catItems123 = timeStorage.get('subcategory');
                            for (var i = 0; i < $scope.catItems123.length; i++) {
                                console.log($scope.catItems123[i]);
                                if ($scope.catItems123[i].key == cat) {
                                    console.log($scope.catItems123[i].data);
                                    var catdata = $scope.catItems123[i].data;
                                    $scope.catItems1 = catdata;
                                    console.log($scope.catItems1);
                                }
                            }
                            console.log($scope.catItems1);
                            // self.status();
                            $ionicLoading.hide();
                            $ionicScrollDelegate.resize();
                        }
                        //vaibhav: if local storage is empty requesting new data by ajax
                        else
                        {
                            // self.ajax1();   
                        }
                        console.log($scope.catItems1);
                    }, 100);
                };
                //vaibhav: loading data first time

                //function to stop loading icon when user clicks on screen
                $scope.closePodcastsLoader = function() {
                    $ionicLoading.hide();
                };

                var webObj = [];     //obj to hold website selected

                //function to add website in webObj 
                $scope.addWeb = function(website, i) {
                    webObj.push(website);
                    console.log(webObj);
                    $scope.pricedata[i].show = i;
                };
                //function to subract website unchecked
                $scope.subWeb = function(website, j) {
                    for (i = 0; i < webObj.length; i++)
                    {
                        if (webObj[i] == website)
                            webObj.splice(i, 1);
                    }
                    console.log(webObj);
                    $scope.pricedata[j].show = 'false';
                };

                //function for setting follow console.log
                $scope.processFollow = function() {
                    //minimum one and maximum 3 website can be selected 
                    if (webObj.length == 0)
                    {
                        console.log('no website selected');
                        self.toast('no website selected');
                    }
                    else if (webObj.length > 3)
                    {
                        console.log('Please select maximum 3 websites');
                        self.toast('Please select maximum 3 websites');
                    }
                    else
                    {
                        var webStr = '';
                        //creating string to send website selected using url
                        for (i = 0; i < webObj.length; i++)
                        {
                            if (webObj.length > 1 && webObj.length - 1 != i)
                                comma = ',';
                            else
                                comma = '';
                            webStr += webObj[i] + comma;
                        }
                        console.log(webStr);
                        //ajax to set console.log
                        var promise = ajaxRequest.send('watch.php?watch=1&watch_website=' + webStr + '&query_id=' + qid + '&userid=' + userid + '&device_id=' + $scope.uuid);
                        promise.then(function(data) {
                            console.log(data);
                            $scope.followModal.hide();
                            if (data.error == 1)
                            {
                                self.toast('please login to start console.log');
                            }
                            else
                            {
                                self.toast('price console.log is successfully activated');
                            }
                        });
                        promise.catch(function(data) {
                            console.log(data);
                            self.toast('conectivity issue');
                            $scope.followModal.hide();
                        });
                    }
                };
                //function for view all button
                $scope.check = function(id, sub, name) {
                    $scope.homeCat = name;
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true
                    });
                    name = name.replace(/[^a-zA-Z0-9]/gi, '');
                    urlHelper.openCategory({category: id, subCategory: sub, name: name});
                    $timeout(function() {
                        $scope.homeCat = '';
                        $scope.subCatModal.hide();
                    }, 150);
                };

            });
})();