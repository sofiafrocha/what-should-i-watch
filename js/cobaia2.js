var user = {
    likesName: [],
    likesID: [],
    friendsNames: [],
    friendsIDs: []
}

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();

      getUsersLikes();

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }


  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1377241132606748',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.2
  }, {scope: 'user_actions.video'});

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }


/////////////////////////////////////////// NOSSAS CENAS ///////

/*FB.api(
    "/me/video.watches", function (response) {
    if (response && !response.error) {
        

    }
);*/


// Get Likes do User
function getUsersLikes() {
    console.log("1 - getUsersLikes - START");

    FB.api("/me/likes", 
        function (response) {
            if (response && !response.error) {

                //console.log("1 - getUsersLikes - START");

                for (var i = 0; i < response.data.length; i++) {
                    user.likesName.push(response.data[i].name);
                    user.likesID.push(response.data[i].id);
                }

                console.log("1 - getUsersLikes - API RESPONDED");
                getUsersFriends();
                
            }
            console.log("1 - getUsersLikes - user.likesName: " + user.likesName);
            console.log("1 - getUsersLikes - user.likesID: " + user.likesID);
        }
    );

    console.log("1 - getUsersLikes - END");
}

// Get User's Friends
function getUsersFriends() {
    console.log("2 - getUsersFriends - START");

    FB.api("/me/friends", 
        function (response) {
            if (response && !response.error) {

                for (var i = 0; i < response.data.length; i++) {
                    user.friendsNames.push(response.data[i].name);
                    user.friendsIDs.push(response.data[i].id);
                }

                console.log("2 - getUsersFriends - API RESPONDED");
                console.log("2 - getUsersFriends - user.friendsNames: " + user.friendsNames);
                console.log("2 - getUsersFriends - user.friendsIDs: " + user.friendsIDs);

                printUsersFriends();
            }
        }
    );

    console.log("2 - getUsersFriends - END");
}

// Print User's Friends

function printUsersFriends() {
    console.log("hello?");

    $('.user').append('<div class="large-3 columns"></div>');
    $('.user .columns').append('<h4>Your Friends</h4>');
    $('.user .columns').append('<ul class="user-friends"></ul>');

    for (var i = 0; i < user.friendsNames.length; i++) {
        $('.user-friends').append('<li>' + user.friendsNames[i] + '</li>');
        //console.log("user.friendsNames[i]: " + user.friendsNames[i]);
    }
}

// For every friend

//// Get the friend's likes

//// Compare the likes

//// Print the User's likes

//// Print the Friend's likes

//// Print the comparison










