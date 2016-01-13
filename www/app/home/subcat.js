(function() {
    'use strict';

    angular.module('starter')
            .controller('subcatCtrl', function($ionicHistory, $stateParams, $timeout, $rootScope, $state, $ionicModal, $scope, ajaxRequest, urlHelper, timeStorage, $interval, $ionicLoading, $ionicScrollDelegate, userData, homeService) {
                console.log($stateParams);
                var cat = $stateParams.cat;
                var self = this;
                $scope.catItems1=$stateParams.catitems;
                self.loadLatest = function(cat) {
                    console.log("product");
                    $scope.homeCat = cat;

                    $timeout(function() {
                        $scope.homeCat = '';
                        $scope.catItems1 = '';
                        var category = cat;
                        $state.go('menu.subcat');
                        // $scope.subCatModal.show();
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
                self.loadLatest(cat);
                $scope.check = function(id, sub, name) {
                    $scope.homeCat = name;
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true
                    });
                    name = name.replace(/[^a-zA-Z0-9]/gi, '');
                    urlHelper.openCategory({category: id, subCategory: sub, name: name});
                    $timeout(function() {
                        $scope.homeCat = '';
//                        $scope.subCatModal.hide();
                    }, 150);
                };

            });
})();