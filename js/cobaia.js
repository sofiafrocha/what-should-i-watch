var ids = new Array();
var names = new Array();
var userLikes = new Array();
var friendLikesIDs = new Array();
var friendLikesNames = new Array();
var commonLikesIDs = new Array();
var commonLikesNames = new Array();
var magicNumber = new Array();


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
      getUsersMovies();

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

  function getUsersMovies() {
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
	      getUsersFriends();
	    }
	);
}

function getUsersFriends() {
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

	    	getFriendsLikes(ids[0]);
	      
	    }  
	);
}

function getFriendsIds() {
	//console.log(ids.length);
	//console.log(ids[1]);
	for (var i = 0; i < ids.length; i++) {
		//console.log("ESCREVE BOLAS + " + i);
		//console.log("devia estar a escrever " + ids[i]);
		$('.lista-ids').append('<li>' + ids[i] + '</li>');
	};
	
}

function getFriendsLikes(id) {
	console.log("getFriendsLikes, é adonde estamos");

	FB.api(
    "/" + id + "/likes",
	    function (response) {
	      if (response && !response.error) {
	        for (var i = 0; i < response.data.length; i++){
	        	//$('.lista-likes').append('<li>' + response.data[i].name + '-' + response.data[i].id + '</li>');
	        	friendLikesIDs.push(response.data[i].id);
	        	friendLikesNames.push(response.data[i].name);
	        	//console.log("id do like é:" +response.data[i].id);
	        }
	      }
	      getUsersLikes();
	    }
	);
}

function printFriendsNames() {
	console.log("printFriendsLikes, é adonde estamos");

	for (var i = 0; i < ids.length; i++) {
		console.log("um?");
		$('.main').append('<div class="large-3 columns ' + ids[i] + '"></div>');
		$('.' + ids[i] + '').append('<h4>' + names[i] + '</h4>');

		for (var j = 0; j < friendLikesIDs.length; j++) {
			$('.' + ids[i] + '').append('<ul class="lista-likes"></ul>');
		}
	}
}

function getUsersLikes() {
	$('.main').append('<div class="large-3 columns 123"></div>');
	$('.123').append('<h4>Meus Likes</h4>');
	$('.123').append('<ul class="lista-meus-likes"></ul>');

	FB.api(
    "/me/likes",
	    function (response) {
	      if (response && !response.error) {
	        for (var i = 0; i < response.data.length; i++){
	        	userLikes.push(response.data[i].id);
	        	//console.log("userLikes[1]: " + userLikes[1]);
	        	$('.lista-meus-likes').append('<li>' + response.data[i].name + '</li>');
	        }
	      }

	      compareLikes();
	    }
	);
}

function compareLikes() {
	console.log("compareLikes, é adonde estamos.");

	for (var i = 0; i < userLikes.length; i++) {
		//console.log("like: " + userLikes[i]);
		//console.log("dentro de um for");

		//console.log(friendLikesIDs.length);
		for (var k = 0; k < friendLikesIDs.length; k++) {

			//console.log("dentro do outro for");

			if (userLikes[i] === friendLikesIDs[k]) {
				console.log("Igual detectado! É o " + userLikes[i]);
				commonLikesIDs.push(friendLikesIDs[k]);
				commonLikesNames.push(friendLikesNames[k]);
			}
		}
		//console.log("final");
	}

	printCommon();
}

function printCommon() {

	console.log("kansdknjf");

	$('.main').append('<div class="large-3 columns 456"></div>');
	$('.456').append('<h4>Likes em Comum</h4>');
	$('.456').append('<ul class="lista-likes-comuns"></ul>');

	for (var i = 0; i < commonLikesIDs.length; i++) {
		$('.lista-likes-comuns').append('<li>' + commonLikesNames[i] + '</li>');
	}
    getMagicNumber();
}

function getMagicNumber() {
    for (var i = 0; i <names.length; i++) {
        magicNumber[i] = names[i]+": "+commonLikesIDs.length;
        console.log("estamos a descobrir os números");
    }
    console.log(magicNumber);
}