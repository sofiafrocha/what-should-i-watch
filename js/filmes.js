
var filmes = new Array();

console.log("PART II - Startiiiiing");

    var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        input,
        key = '&api_key=b4ab8b4bc3e18c2d31a3641078d88a38';


function getMovieInfo(){
    console.log("PART II - 1");
    
        var input = "Pride and Prejudice";
        $.ajax({
            type: 'GET',
            url: url + mode + input + key,
            async: false,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {
                console.log(json);
                console.log("PART II - 1B");
            },
            error: function(e) {
                console.log(e.message);
            }
        });
}


getMovieInfo();