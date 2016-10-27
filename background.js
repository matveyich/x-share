var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': "https://api.xing.com/v1/request_token",
  'authorize_url': "https://api.xing.com/v1/authorize",
  'access_url': "https://api.xing.com/v1/access_token",
  'consumer_key': xing_config.consumer_key,
  'consumer_secret': xing_config.consumer_secret
});
//console.log(oauth);
var userMeGlobal = {};

function user(){
  this.loggedin = false;
  this.userMe = {};
  this.userGroups = {};
};

var me = new user();

me.setUserMe = function (profile){
   profile = JSON.parse(profile);
   me.userMe = profile.users[0];
   me.loggedin = true;
}

me.setUserGroups = function (groups){
  me.userGroups = JSON.parse(groups).groups;
}

function authorize() {
  oauth.authorize(function() {
    onAuthorized();
  });
  return me;
};

function requestCallbackToConsole(resp, xhr) {
  console.log(resp);
};

function onAuthorized() {
  getUsersMe();
  getUserGroups();
};

function getUsersMe(){
  var url = 'https://api.xing.com/v1/users/me';
  var request = {
    'method': 'GET'
  };
  oauth.sendSignedRequest(url, me.setUserMe, request);
}

function getUserGroups(){
  var url = 'https://api.xing.com/v1/users/me/groups';
  var request = {
    'method': 'GET',
    'parameters': {'limit': 100}
  };
  oauth.sendSignedRequest(url, me.setUserGroups, request);
}

function getUser(){
  return me;
}
