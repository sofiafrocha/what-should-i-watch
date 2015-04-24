setTimeout(graph, 6500);

function graph(d, data) { 
    console.log("I haz begun");
    
    var diameter = 400;

    var svg = d3.select('#chart').append('svg')
        .attr('width', 3*diameter)
        .attr('height', diameter);

    var bubble = d3.layout.pack()
        .size([diameter, diameter])
        .value(function(d) {return d.magicNumber;}) // new data is loaded to bubble layout
        .padding(3)
        .sort(d3.descending);

    // generate data with calculated layout values
    var nodes = bubble.nodes(friends)
        .filter(function(d) { return !d.children; }); // filter out the outer bubble

    // assign new data to existing DOM 
    var vis = svg.selectAll('circle')
        .data(friends);
        
    var elem = svg.selectAll("g bubbleText")
        .data(nodes, function(d) { return d.name; });

    var elemEnter = vis.enter()
        .append("g")

    for (var i = 0; i < friends.length; i++) {        
        var circle = elemEnter.append("circle")
            .attr('transform', function(d) { return 'translate(' + (i+0.1)*1000/friends.length + ',' + 400/friends.length + ')' })
            .attr("r", function(d){return 2*friends[i].magicNumber} )
            .attr("stroke","black")
            .attr('class', function(d) { return friends[i].name });


        elemEnter.append("text")
            .attr('transform', function(d) { return 'translate(' + i*1000/friends.length + ',' + (-50+(400/friends.length)) + ')' })
            .attr("dx", function(d){return (-1)*0,1*friends[i].magicNumber})
            .text(function(d){return friends[i].name});

    }
    
    console.log("I iz done");
};

/*
function getUserPhotos(){
    console.log("ME ME ME ME ME ME ME ");
    
    for (var i = 0; i < friends_list.length; i++){
        console.log("ME ME ME ME PART II"); 
        FB.api(
        "/" + friends[i].id + "/picture",
        function (response) {
            if (response && !response.error) {
                console.log("ME ME ME ME PART III"); 
                //for (var j = 0; j < response.data.length; j++) {
                    console.log(friends_list[0].photo);
                    //friends_list.photo.push(response.data.url);
                    //console.log("LOOOK AT MEEEEEE " + response.data);
                //}
            }
        }
        );
    }

    friends.forEach()

} */