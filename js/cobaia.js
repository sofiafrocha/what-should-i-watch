var ids = new Array();
var names = new Array();
var userLikes = new Array();

var friendLikesIDs = new Array();
var friendLikesNames = new Array();

var tempIDs = new Array();
var tempNames = new Array();

var commonLikesIDs = new Array();
var commonLikesNames = new Array();


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


/////////////////////////////////////////// NOSSAS CENAS ///////


  function getUsersMovies() {
	console.log("getUsersMovies() - 1");
	FB.api(
    "/me/video.watches", function (response) {
	      if (response && !response.error) {

	      	for (var i = 0; i < response.data.length; i++) {
	      		response.data[i]
	      		$('.list-movies').append('<li>' + response.data[i].data.movie.title + '</li>');
	      	};
	      	
	      	//var tudo = response.data[0];
	        //console.log(tudo.data.movie.title);
	      }
	      console.log("getUsersMovies() - 1 - API request complete");
	      getUsersFriends();
	    }
	);

	console.log("getUsersMovies() - 1 - END OF FUNCTION");
}

function getUsersFriends() {
	console.log("getUsersFriends() - 2");
	FB.api(
    "/me/friends",
    function (response) {
	      if (response && !response.error) {

	      	for (var i = 0; i < response.data.length; i++) {
	      		$('.list-friends').append('<li>' + response.data[i].name + '</li>');
	      		//console.log("id: " + response.data[i].id);

	      		ids.push(response.data[i].id);
	      		names.push(response.data[i].name);

	      		//console.log("ids[0]: " + ids[0]);
	      		//console.log("names[0]: " + names[0]);
	      	};
	      	console.log("getUsersFriends() - 2- API request complete");
	      }

	      console.log("getUsersFriends() - 2- Fetching all the likes from your friends");
	      for (var i = 0; i < ids.length; i++) {
	      	getFriendsLikes(ids[i]);
	      }
	    }  
	);

	console.log("getUsersFriends() - 2 - END OF FUNCTION");
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
	console.log("getFriendsLikes() - 3");

	console.log("getFriendsLikes() - 3 - id: " + id);

	FB.api(
    "/" + id + "/likes",
	    function (response) {
	      if (response && !response.error) {
	        for (var i = 0; i < response.data.length; i++){
	        	//$('.lista-likes').append('<li>' + response.data[i].name + '-' + response.data[i].id + '</li>');
	        	tempIDs.push(response.data[i].id);
	        	tempNames.push(response.data[i].name);
	        	//console.log("id do like é:" +response.data[i].id);
	        }
	      }

	      console.log("getFriendsLikes() - tempIDs: " + tempIDs);
	      console.log("getFriendsLikes() - tempNames: " + tempNames);

	      friendLikesIDs.push(tempIDs);
	      friendLikesNames.push(tempNames);

	      console.log("getFriendsLikes() - 3 - API request complete");
	      console.log("getFriendsLikes() - 3 - Imprimir os likes");
			printFriendsLikes(id);
	    }
	);

	console.log("getFriendsLikes() - 3 - END OF FUNCTION");
}

function printFriendsLikes(id) {
	console.log("printFriendsLikes() - 4");

	console.log("names[0]: " + names[0]);
	console.log("names[1]: " + names[1]);
	//get position

	var index;

	for (var i = 0; i < ids.length; i++) {
		console.log("QUE É ISTO CARAGO ids: " + ids);

		console.log("id: " + id);
		console.log("ids: " + ids);
		console.log("i: " + i);
		console.log("index: " + index);
		console.log("ids[i]: " + ids[i]);

		if (ids[i] === id) {
			index = i;
			console.log("index set: " + index);
			break;
		};
		
		break;
	}

	//cria uma coluna para por os likes do amigo
	$('.main').append('<div class="large-3"><h4>Likes de ' + names[index] + '</h4><ul class="list-friends-likes ' + id + '"></ul></div>');
	//cria uma coluna para por os likes em comum (data adicionada depois)
	$('.main').append('<div class="large-3"><h4>Likes em comum</h4><ul class="list-common-likes ' + id + '"></ul></div>');

	console.log("friendLikesNames: " + friendLikesNames);

	//Por lista dos likes
	for (var i = 0; i < friendLikesNames[index].length; i++) {
		$('.list-friends-likes ' + id).append('<li>' + friendLikesNames[index][i] + '</li>');
	}

	getUsersLikes();
	console.log("printFriendsLikes() - END OF FUNCTION");
}

function printFriendsNames() {
	console.log("printFriendsNames, é adonde estamos");

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
	console.log("getUsersLikes() - 5");

	FB.api(
    "/me/likes",
	    function (response) {
	      if (response && !response.error) {
	        for (var i = 0; i < response.data.length; i++){
	        	userLikes.push(response.data[i].id);
	        	//console.log("userLikes[1]: " + userLikes[1]);
	        	$('.list-my-likes').append('<li>' + response.data[i].name + '</li>');
	        	//console.log(response);
	        }
	      }
	      console.log("getUsersLikes() - 5 - API request complete");
	      compareLikes();
	    }
	);

	console.log("getUsersLikes() - 5 - END OF FUNCTION");
    
}

function compareLikes() {
	console.log("compareLikes() - 6");

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
	console.log("compareLikes() - 6 - END OF FUNCTION");
}

function printCommon() {

	console.log("printCommon() - 7");

	for (var i = 0; i < commonLikesIDs.length; i++) {
		$('.list-common-likes').append('<li>' + commonLikesNames[i] + '</li>');
	}

	console.log("printCommon() - 7 - END OF FUNCTION");
}