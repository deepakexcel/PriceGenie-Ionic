(function() {
    'use strict';
    angular.module('starter')
        .factory('feedbackService', feedbackService);

    function feedbackService($ionicLoading, ajaxRequest, $ionicScrollDelegate, $http,$q) {
        var service = {};
        service.sendEmail=function(data){
            var def=$q.defer();
            $http({method: 'POST',
                url: 'http://pricegenie.co/dev/sendmail.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            })
                    .success(function(data) {
                        // return ;
                        def.resolve(data);

                        console.log(data);
                        console.log('Thanking you for your valuable feedback');
                        $ionicLoading.hide();
                        
                        window.plugins.toast.showShortTop('Thanking you for your valuable feedback');
                    })
                    .error(function() {

                        console.log('error');
                        window.plugins.toast.showShortTop('Feedback not submitted, check network');
                    });
                    return def.promise;
        }

        return service;
    }
})();