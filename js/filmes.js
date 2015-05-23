var filmes = new Array();
var clickedMovieName;

var clickedMovieBasicInfo;
var clickedMovieID;
var clickedMovieSynopsis;
var clickedMovieTrailerID;
var clickedMovieCast = [];


//// Events

$( ".movie-suggestions" ).click(function(e) {
    clickedMovieName = $( e.target ).html();
    //console.log("clickedMovieName: " + clickedMovieName);
    getMovieBasicInfo(clickedMovieName);

});

$( "h2" ).click(function(e) {
    hideMovieInfo();
});


function getMovieBasicInfo(input){
    console.log("PART II - 1");

    var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        input,
        key = '&api_key=b4ab8b4bc3e18c2d31a3641078d88a38';

    $.ajax({
        type: 'GET',
        url: url + mode + input + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            //console.log(json);
            console.log("PART II - getMovieBasicInfo - API Responded");

            clickedMovieBasicInfo = json;
            clickedMovieID = json.results[0].id;

            console.log("PART II - " + clickedMovieBasicInfo.results[0].title);
            console.log(clickedMovieBasicInfo.results[0]);

            getMovieSynopsis(clickedMovieID);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function showMovieInfo(){
    //Hide suggestion list
    $(".movie-suggestions").hide('slow');

    //Show Info
    $("#dois .columns").append('<div class="row topbar"><div class="large-12 columns"></div></div>');
    $("#dois > .columns").append('<div class="row info"></div>');

    $(".topbar").append('<div class="large-2 columns" id="back"><p>Go Back</p></div>');
    $(".topbar").append('<div class="large-8 columns"><h3>' + clickedMovieBasicInfo.results[0].title + '</h3></div>');

    $(".info").append('<div class="large-4 columns" id="synopsis"><p>' + clickedMovieSynopsis + '</p></div>');

    var movieTrailerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + clickedMovieTrailerID + '" frameborder="0" allowfullscreen></iframe>';

    $(".info").append('<div class="large-4 columns" id="trailer">' + movieTrailerHTML + '</div>');
    $(".info").append('<div class="large-4 columns" id="cast"><ul></ul></div>');

    for (var i = 0; i < clickedMovieCast.length; i++) {
        $("#cast ul").append('<li>' + clickedMovieCast[i] + '</li>');
    }
}

function getMovieSynopsis(id){

    var url = 'http://api.themoviedb.org/3/movie/',
        key = '?api_key=b4ab8b4bc3e18c2d31a3641078d88a38';

    $.ajax({
        type: 'GET',
        url: url + id + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            console.log(json);
            console.log("PART II - getMoreInfo - API Responded");

            clickedMovieSynopsis = json.overview;
            getMovieCast(id);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function getMovieCast(id) {
    var url = 'http://api.themoviedb.org/3/movie/' + id + '/credits';
    var key = '?api_key=b4ab8b4bc3e18c2d31a3641078d88a38';


    $.ajax({
        type: 'GET',
        url: url + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            console.log(json);
            console.log("PART II - getMoreInfo - API Responded");

            for (var i = 0; i < json.cast.length; i++) {
                clickedMovieCast.push(json.cast[i].name);
            }

            getMovieTrailer(id);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function getMovieTrailer(id) {
    var url = 'http://api.themoviedb.org/3/movie/' + id + '/videos';
    var key = '?api_key=b4ab8b4bc3e18c2d31a3641078d88a38';


    $.ajax({
        type: 'GET',
        url: url + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            console.log(json);
            console.log("PART II - getMoreInfo - API Responded");

            clickedMovieTrailerID = json.results[0].key;

            showMovieInfo();
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function hideMovieInfo() {

    clickedMovieCast = [];

    $(".info").hide();
    $(".topbar").hide();

    $(".movie-suggestions").show();
}

function clickGraph() {
    
    $("#tres").append('<div class="row recs"><div class="large-12 columns"></div></div>');
    
    $(".recs").append('<h3> Hey there </h3>');
}