var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': "https://api.xing.com/v1/request_token",
  'authorize_url': "https://api.xing.com/v1/authorize",
  'access_url': "https://api.xing.com/v1/access_token",
  'consumer_key': xing_config.consumer_key,
  'consumer_secret': xing_config.consumer_secret
});
console.log(oauth);

function authorize() {
  oauth.authorize(function() {
    onAuthorized();
  });
};

function requestCallback(resp, xhr) {
  console.log(resp);
};

function onAuthorized() {
  var url = 'https://api.xing.com/v1/users/me';
  var request = {
    'method': 'GET'
  };

  // Send: GET https://docs.google.com/feeds/default/private/full?alt=json
  oauth.sendSignedRequest(url, requestCallback, request);
};
