(function() {
    'use strict';
angular
    .module('starter')
    .service('userData', userData);

function userData(timeStorage) {
    var email = '';
    var userid = '';
  this.userEmail = function() {

    	if (timeStorage.get('login').email)
    {
        return email = timeStorage.get('login').email;  //retrieving user email
            }
    else if (timeStorage.get('googleLogin').email)
    {
        return email = timeStorage.get('googleLogin').email;
    }
    else if (timeStorage.get('fbLogin').email)
    {
        return email = timeStorage.get('fbLogin').email;
    }
  };
  this.userId = function() {
    	if (timeStorage.get('login').email)
    {
        return userid = timeStorage.get('login').userid;  //retrieving userid
    }
    else if (timeStorage.get('googleLogin').email)
    {
        return userid = timeStorage.get('googleLogin').userid;
    }
    else if (timeStorage.get('fbLogin').email)
    {
        return userid = timeStorage.get('fbLogin').userid;
    }
  };
}
})();