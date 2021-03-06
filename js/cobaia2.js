var friends = [];

var user = {
    likesName: [],
    likesID: [],
    friendsNames: [],
    friendsIDs: [],
    moviesNames: [],
    moviesIDs: [],
    photo: []
}

var mostCompatibleName;
var mostCompatibleID;
var mostCompatibleIndex;

var friendsJSON = [];




function resgate() {
    for (var i = 0; i < friends.length; i++) {
        var temp = {
            "source" : 0,
            "target" : 5*friends[i].magicNumber,
            "x": "",
            "y": "",
            "size": 5*friends[i].magicNumber,
            "label": friends[i].name
        }

        friendsJSON.push(temp);
        //console.log(temp);
    }
    console.log("i'm done.");
}

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    //console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();

        $('.fb_iframe_widget').hide();

        //$('.full-info').hide();

        getUsersLikes();
        getUsersFriends();
        getUsersPhotos();
        getUsersMovies();
        setTimeout(bolinhas, 6000);

        setTimeout(printUsersFriends, 1500);
        setTimeout(printUsersMovies,1500);
        setTimeout(getAllLikes, 1500);

        setTimeout(getAllPhotos, 2000);

        setTimeout( function() {
            $('.full-info').hide();
        }, 2000);

        setTimeout(compareLikes, 3000);
        setTimeout(printSuggestions, 3800);
        

        setTimeout(resgate, 5100);


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
        '<h4>Thanks for logging in, ' + response.name + '!</h4>';
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
                
            }
            //console.log("1 - getUsersLikes - user.likesName: " + user.likesName);
            //console.log("1 - getUsersLikes - user.likesID: " + user.likesID);

            console.log("1 - getUsersLikes - END");
        }
    );
}

// Get User's Movies

function getUsersMovies() {

    console.log("1 a) - getUsersMovies - START");

    FB.api(
    "/me/video.watches", function (response) {
        if (response && !response.error) {
            for (var i = 0; i < response.data.length; i++) {
                //console.log("i: " + i);
                if (response.data[i].application.name === "Movies") {
                    //console.log("passinhos pequeninos!" + response.data[i].data.movie.url);
                    console.log("passinhos pequeninos!" + response.data[i].data.movie.title);
                    //console.log("passinhos pequeninos!" + response.data[i].data.movie.id);
                    
                    user.moviesNames.push(response.data[i].data.movie.title);
                    user.moviesIDs.push(response.data[i].data.movie.id);
                }
            }

        }
    });

    console.log("1 a) - getUsersMovies - END");
}

// Print User's Movies

function printUsersMovies() {

    console.log("1 b) - printUsersMovies - START");
    console.log(user.moviesNames);

    $('.user').append('<div class="large-3 columns"><h4>Your Movies</h4><ul></ul></div>');
    for (var i = 0; i < user.moviesNames.length; i++) {
        $('.user .columns ul').append('<li>' + user.moviesNames[i] + '</li>');
    }

    console.log("1 b) - printUsersMovies - START");
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

                    var temp = { name: response.data[i].name, id: response.data[i].id, likesNames: [], likesIDs: [], commonLikesNames: [], commonLikesIDs: [], magicNumber: [], moviesNames: [], moviesIDs: [], photo: [] };
                    friends.push(temp);

                }

                console.log("2 - getUsersFriends - API RESPONDED");
                console.log("2 - getUsersFriends - user.friendsNames: " + user.friendsNames);
                console.log("2 - getUsersFriends - user.friendsIDs: " + user.friendsIDs);

                console.log("2 - getUsersFriends - END");
            }
        }
    );  
}

// Print User's Friends

function printUsersFriends() {
    console.log("3 - printUsersFriends - START");
    //console.log("hello?");

    $('.full-info').append('<div class="row"><div class="large-4 columns"></div></div>');
    $('.full-info .columns').append('<h4>Your Friends</h4>');
    $('.full-info .columns').append('<ul class="user-friends"></ul>');

    for (var i = 0; i < user.friendsNames.length; i++) {
        $('.user-friends').append('<li>' + user.friendsNames[i] + '</li>');
        //console.log("user.friendsNames[i]: " + user.friendsNames[i]);

        //criar todas as linhas necessárias, onde vamos por os likes do user, os do amigo e os em comum
        $('.full-info').append('<div class="row ' + user.friendsIDs[i] + '"></div>');
    }

    console.log("3 - printUsersFriends - END");
}

// For every friend
//// Get the friend's likes

function getFriendsLikes(element, index, array) {

    console.log("4 - getFriendsLikes - START");

        
    FB.api("/" + element.id + "/likes",
        function(response) {
            //f = i;
            if (response && !response.error) {

                for (var j = 0; j < response.data.length; j++) {

                    element.likesNames.push(response.data[j].name);
                    element.likesIDs.push(response.data[j].id);
                    console.log("COMEÇANDO PASSO INTERMÉDIO");
                    if (response.paging.next != "undefined"){
                        //console.log("  PASSO INTERMÉDIO - PRINT THIS TO SEE IF IT WORKS " + response.paging.next.data);
                    } else {
                        console.log("GOOD OLD 1 PAGE");   
                    }

                }

                console.log("4 - getFriendsLikes - element.likesNames: " + element.likesNames);

            }

            console.log("4 - getFriendsLikes - API RESPONDED");
        }
    );

    console.log("4- getFriendsLikes - END");
}

function getAllLikes() {

    friends.forEach(getFriendsLikes);
}


//// Compare the likes
function compareLikes() {

    console.log("5 - compareLikes - START");

    for (var i = 0; i < friends.length; i++) {

        for (var k = 0; k < user.likesID.length; k++) {

            //console.log("compareLikes - friends[i].likesIDs: " + friends[i].likesIDs);

            for (var j = 0; j < friends[i].likesIDs.length; j++) {

                //console.log("compareLikes - está a tentar comparar");

                if (user.likesID[k] === friends[i].likesIDs[j]) {

                    console.log("encontrado um em comum!");
                    friends[i].commonLikesIDs.push(user.likesID[k]);
                    friends[i].commonLikesNames.push(user.likesName[k]);

                    //console.log("os em comum actuais são: " + friends[i].commonLikesNames);
                }
            }

        }
    }

    console.log("5 - compareLikes - END");
    printUsersLikes();
}

//// Print the User's likes

function printUsersLikes() {

    console.log("6 - printUsersLikes - START");

    for (var k = 0; k < user.friendsIDs.length; k++) {
        $('.' + user.friendsIDs[k]).append('<div class="large-4 columns user-likes"><h4>My Likes</h4><ul></ul></div>');
    
        for (var i = 0; i < user.likesName.length; i++) {
            $('.' + user.friendsIDs[k] + ' .user-likes ul').append('<li>' + user.likesName[i] + '</li>');
        }
    }
    
    console.log("6 - printUsersLikes - END");
    printFriendsLikes();
}

//// Print the Friend's likes

function printFriendsLikes() {

    console.log("7 - printUsersLikes - START");


    for (var k = 0; k < friends.length; k++) {

        console.log("7 - likes deste amigo: " + friends[k].likesNames);
        console.log("7 - printUsersLikes  - id deste amigo: " + friends[k].id);


        $('.' + friends[k].id).append('<div class="large-4 columns friend-likes"><h4>' + friends[k].name + ' Likes</h4><ul></ul></div>');
    
        for (var i = 0; i < friends[k].likesNames.length; i++) {
            $('.' + friends[k].id + ' .friend-likes ul').append('<li>' + friends[k].likesNames[i] + '</li>');
        }
    }


    console.log("7 - printUsersLikes - START");
    printCommonLikes();
}

//// Print the comparison

function printCommonLikes() {

    console.log("8 - printCommonLikes - START");

    for (var i = 0; i < friends.length; i++) {
        $('.' + friends[i].id).append('<div class="large-4 columns common-likes"><h4>Common Likes</h4><ul></ul></div>');
    
        for (var k = 0; k < friends[i].commonLikesNames.length; k++) {
            $('.' + friends[i].id + ' .common-likes ul').append('<li>' + friends[i].commonLikesNames[k] + '</li>');
        }
    }

    setCompatibility();
}


//// Calculate Compatibility
function setCompatibility() {

    console.log("9 - setCompatibility - START");

    for (var i = 0; i<friends.length; i++){
        
        //se têm a mesma densidade de likes
        if (user.likesName.length >= 0.8*friends[i].commonLikesNames.length && user.likesName.length <= 1.2*friends[i].commonLikesNames.length) {
            friends[i].magicNumber = +friends[i].magicNumber + 5;   
        }
        
        else {
            friends[i].magicNumber = +friends[i].magicNumber + 1;
        }

        //se têm gostos semelhantes
        friends[i].magicNumber = +friends[i].magicNumber + +friends[i].commonLikesNames.length;
        
        console.log("tu e "+ +friends[i].name +" são assim tão compativeis: " + +friends[i].magicNumber);
        
        //proximidade geográfica
        
        
    }

    console.log("9 - setCompatibility - END");
    printCompatibility();
}

//// Print compatibility
function printCompatibility() {

    console.log("10 - printCompatibility - START");

    for (var i = 0; i < friends.length; i++) {
        $('.' + friends[i].id + ' .common-likes').append('<h4>Magic Number</h4><ul></ul>');
        $('.' + friends[i].id + ' .common-likes ul:nth-child(4)').append('<li>' + friends[i].magicNumber + '</li>');
    }

    console.log("10 - printCompatibility - END");

    getMostCompatible();
}

//// Determine most compatible person

function getMostCompatible() {

    console.log("11 - getMostCompatible - START");

    var temp = 0;

    for (var i = 0; i < friends.length; i++) {
        if (friends[i].magicNumber > temp) {

            temp = friends[i].magicNumber;
            mostCompatibleName = friends[i].name;
            mostCompatibleID = friends[i].id;
            mostCompatibleIndex = i;

        }
    }

    console.log("11 - getMostCompatible - END");
    getAllMovies();
}

function getAllMovies(){

    console.log("12 - getAllMovies - START");
    friends.forEach(getMovies);
    //console.log(friends[0].moviesNames);
    console.log("12 - getAllMovies - END");

}

function getMovies(element, index, array) {

    console.log("13 - getMovies - START");

    FB.api(
    "/" + element.id + "/video.watches", function (response) {
        if (response && !response.error) {
            for (var i = 0; i < response.data.length; i++) {
                //console.log("i: " + i);
                if (response.data[i].application.name === "Movies") {
                    //console.log("passinhos pequeninos!" + response.data[i].data.movie.url);
                    //console.log("passinhos pequeninos!" + response.data[i].data.movie.title);
                    //console.log("passinhos pequeninos!" + response.data[i].data.movie.id);
                    //console.log(response.data[i].data.movie.title);
                    //console.log(element);
                    //console.log(element.moviesNames);

                    element.moviesNames.push(response.data[i].data.movie.title);
                    element.moviesIDs.push(response.data[i].data.movie.id);

                    //console.log(element.moviesNames);
                }
            }

        }
    });

    console.log("13 - getMovies - end");
}

function printSuggestions() {
    console.log("14 - printSuggestions - START");

    for (var i = 0; i < friends[mostCompatibleIndex].moviesNames.length; i++) {
        $('#dois .columns ul').append('<li>' + friends[mostCompatibleIndex].moviesNames[i] + '</li>');

    }

    var secondMostCompatible;
    var temp = -1;

    for (var i = 0; i < friends.length; i++) {
        console.log("i: " +i);
        console.log("mostCompatibleIndex: " + mostCompatibleIndex);

        if (i !== mostCompatibleIndex) {

            console.log("temp: " + temp);
            console.log("friends[i].magicNumber" + friends[i].magicNumber);

            if (friends[i].magicNumber > temp) {
                secondMostCompatible = i;
                temp = friends[i].magicNumber;
            };

        }
    };

    for (var i = 0; i < friends[secondMostCompatible].moviesNames.length; i++) {
        $('#dois .columns ul').append('<li>' + friends[secondMostCompatible].moviesNames[i] + '</li>');
    };

    console.log("14 - printSuggestions - END");

}

function getFriendsPhotos(element, index, array) {
    console.log("5 b) - getFriendsPhotos - START");

    FB.api("/" + friends[index].id + "/picture",
        function (response) {
            if (response && !response.error) {
                console.log(response.data.url);

                friends[index].photo.push(response.data.url);
            }

            console.log("5 b) - getFriendsPhotos - API RESPONDED");
        }
    );
    console.log("5 b) - getFriendsPhotos - END");
}

function getAllPhotos() {
    friends.forEach(getFriendsPhotos);
}

function getUsersPhotos() {
    console.log("5 c) - getUsersPhoto - START");

    FB.api("/me/picture",
        function (response) {
            if (response && !response.error) {
                console.log(response.data.url);

                user.photo.push(response.data.url);
            }

            console.log("5 c) - getUsersPhoto - API RESPONDED");
        }
    );
    console.log("5 c) - getUsersPhoto - END");
}

function showClickedFriendInfo(id) {

    console.log("id: " + id + "name: " + friends[id].name);

    $("#friend-photo").attr("src", friends[id].photo);

    $("#friend-name").text(friends[id].name);
    $("#friend-magic-number").text(friends[id].magicNumber);

    console.log("friends[1].moviesNames.length: " + friends[1].moviesNames.length);

    $(".friend-movie-name").remove();

    for (var i = 0; i < friends[id].moviesNames.length; i++) {
        console.log("eu devia estar a imprimir, já vai no " + i);
        $("#friend-info").append("<li class='friend-movie-name'>" + friends[id].moviesNames[i] + "</li>");
    };
}