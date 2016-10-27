var background = chrome.extension.getBackgroundPage();
var me = {};

$(document).ready(function(){
  me = background.getUser();

  if (me.loggedin == true) {
    generateUser(me);
  } else {
    $('#login').click(function() {
      me = background.authorize();
      generateUser(me);
    });
  }
});

function generateUser(user){
  $('#main').html(user.userMe.display_name + '<br>');
  user.userGroups.items.forEach(function(element){
    $('#main').append(element.name + '<br>');
  });
}
