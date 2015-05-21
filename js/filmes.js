var filmes = new Array();
var clickedMovieName;

var clickedMovieInfo;

//// Events

$( ".movie-suggestions" ).click(function(e) {
    clickedMovieName = $( e.target ).html();
    //console.log("clickedMovieName: " + clickedMovieName);
    getMovieInfo(clickedMovieName);
});

function getMovieInfo(input){
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
            console.log(json);
            console.log("PART II - getMovieInfo - API Responded");

            clickedMovieInfo = json;
            console.log("PART II - " + clickedMovieInfo.results[0].title);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}