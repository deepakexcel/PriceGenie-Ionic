(function() {
    'use strict';
    angular.module('starter')
.factory('ajaxRequest',
        ['$http', '$q', '$log',
            function($http, $q, $log) {
                return {
                    hasInit: false,
                    init: function() {
                    },
                    url: function(api) {

                        return 'http://pricegenie.co/' + api;

                    },
                    send: function(api, data, method) {
                        var self = this;
                        if (!self.hasInit) {
                            self.init();
                        }
                        var silent = false;
                        if (!angular.isDefined(method)) {
                            method = 'POST';
                        } else {
                            if (method === true) {
                                silent = true;
                                method = 'POST';
                            }
                        }
                        var def = $q.defer();

//                        delete $http.defaults.headers.common['X-Requested-With'];
                        var http = $http({
                            url: this.url(api),
                            method: method,
                            headers: {'Content-Type': 'application/json;charset=utf-8'},
                            cache: false,
                            data: JSON.stringify(data),
                            timeout: 60000
                        });
                        http.success(function(data) {


                            def.resolve(data);

                        });


                        http.error(function() {
                            $log.warn('500 Error');
                            def.reject('500');
                        });
                        return def.promise;
                    }
//                    ,
//                       sendEncoded: function(api, data, method) {
//                        var self = this;
//                        if (!self.hasInit) {
//                            self.init();
//                        }
//                        var silent = false;
//                        if (!angular.isDefined(method)) {
//                            method = 'POST';
//                        } else {
//                            if (method === true) {
//                                silent = true;
//                                method = 'POST';
//                            }
//                        }
//                        var def = $q.defer();
//
////                        delete $http.defaults.headers.common['X-Requested-With'];
//                        var http = $http({
//                            url: this.url(api),
//                            method: method,
//                            headers: {'Content-Type': 'application/json;charset=utf-8'},
//                            cache: false,
//                            data: JSON.stringify(data),
//                            timeout: 60000
//                        });
//                        http.success(function(data) {
//
//
//                            def.resolve(data);
//
//                        });
//
//
//                        http.error(function() {
//                            $log.warn('500 Error');
//                            def.reject('500');
//                        });
//                        return def.promise;
//                    }
                };
            }
        ]);

})();
