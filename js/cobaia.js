var ids = new Array();
var names = new Array();

function getLikes() {
	var axoreanah;

	/*FB.api(
	    "/me/friends",
	    function (response) {
	      if (response && !response.error) {
	        console.log(response);
	        axoreanah = response.data[0];
	        console.log(axoreanah['id']);
	      }

	      var id = axoreanah['id'];

			FB.api(
			    "/" + id + "/movies",
			    function (response) {
			      if (response && !response.error) {
			        console.log(response.data);
			      }
			    }
			);
	    }
	),{scope: 'movies'};

	FB.api(
		"/me/likes",
		function (response){
			if (response && !response.error) {
		        console.log(response);
		      }
			
	});*/

}

function getMovies() {
	//console.log("helloooooooooooo");
	FB.api(
    "/me/video.watches",
    function (response) {
	      if (response && !response.error) {

	      	for (var i = 0; i < response.data.length; i++) {
	      		response.data[i]
	      		$('.lista-filmes').append('<li>' + response.data[i].data.movie.title + '</li>');
	      	};

	      	//var tudo = response.data[0];
	        //console.log(tudo.data.movie.title);
	      }
	    }
	);
}

function getFriends() {
	FB.api(
    "/me/friends",
    function (response) {
	      if (response && !response.error) {

	      	for (var i = 0; i < response.data.length; i++) {
	      		$('.lista-amigos').append('<li>' + response.data[i].name + '</li>');
	      		//console.log("id: " + response.data[i].id);

	      		ids.push(response.data[i].id);
	      		names.push(response.data[i].name);

	      		//console.log("ids[0]: " + ids[0]);
	      		//console.log("names[0]: " + names[0]);
	      	};
	      }

	      getIds();
	      getFriendsLikes();
	    }
	);
}

function getIds() {
	//console.log(ids.length);
	//console.log(ids[1]);
	for (var i = 0; i < ids.length; i++) {
		//console.log("ESCREVE BOLAS + " + i);
		//console.log("devia estar a escrever " + ids[i]);
		$('.lista-ids').append('<li>' + ids[i] + '</li>');
	};
	
}

function getFriendsLikes() {
	var likes = new Array();
	console.log("getFriendsLikes, é adonde estamos");

	for (var i = 0; i < names.length; i++) {
		console.log("um?");
		$('.main').append('<div class="large-3 columns ' + ids[i] + '"></div>');
		$('.' + ids[i] + '').append('<h4>' + names[i] + '</h4>');
		$('.' + ids[i] + '').append('<ul class="lista-likes"></ul>');

		FB.api(
	    "/" + ids[i] + "/likes",
		    function (response) {
		      if (response && !response.error) {
		        for (var i = 0; i < response.data.length; i++){
		        	$('.lista-likes').append('<li>' + response.data[i].name + '</li>');
		        }
		      }
		    }
		);
	}
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
      getMovies();
      getLikes();
      getFriends();

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