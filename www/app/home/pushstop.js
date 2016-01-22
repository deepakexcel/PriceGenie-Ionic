(function() {
    'use strict';
    angular.module('starter').factory('pushStop', function($q, $http) {
        var push = {};
        push.Stop = function(api1) {
            var def = $q.defer();
            var http = $http({
                url: api1,
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                cache: false,
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
        };
        return push;
    });

})();
