setTimeout(graph, 4000);

function graph(d, data) { 
    
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
    var nodes = bubble.nodes(friends_list)
        .filter(function(d) { return !d.children; }); // filter out the outer bubble

    // assign new data to existing DOM 
    var vis = svg.selectAll('circle')
        .data(friends_list);
        
    var elem = svg.selectAll("g bubbleText")
        .data(nodes, function(d) { return d.name; });

    var elemEnter = vis.enter()
        .append("g")

    for (var i = 0; i < friends_list.length; i++) {        
        var circle = elemEnter.append("circle")
            .attr('transform', function(d) { return 'translate(' + i*1000/friends_list.length + ',' + 400/friends_list.length + ')' })
            .attr("r", function(d){return 2*friends_list[i].magicNumber} )
            .attr("stroke","black")
            .attr('class', function(d) { return friends_list[i].name });


        elemEnter.append("text")
            .attr('transform', function(d) { return 'translate(' + i*1000/friends_list.length + ',' + 400/friends_list.length + ')' })
            .attr("dx", function(d){return (-1)*0,1*friends_list[i].magicNumber})
            .text(function(d){return friends_list[i].name});

    }

};

function getUserPhotos(){
    
    for (var i = 0; i < friends.length; i++){
    FB.api(
    "/"+friends[i]+"/picture",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
    );   
}
}