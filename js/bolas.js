setTimeout(graph, 6500);


function graph(d, data) { 
    console.log("I haz begun");
    /*
    var diameter = 400;

    var svg = d3.select('#chart').append('svg')
        .attr('width', 3*diameter)
        .attr('height', diameter);

    var bubble = d3.layout.force()
        .size([diameter, diameter])
        .value(function(d) {return d.magicNumber;}) // new data is loaded to bubble layout
        .padding(3)

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
            .attr("r", function(d){return 3*friends[i].magicNumber} )
            .attr("stroke","black")
            .attr('class', function(d) { return friends[i].name })
            .attr("fill", function(d){return "url("+friends[i].photo+")"});


        elemEnter.append("text")
            .attr('transform', function(d) { return 'translate(' + i*1000/friends.length + ',' + (-50+(400/friends.length)) + ')' })
            .attr("dx", function(d){return (-1)*0,1*friends[i].magicNumber})
            .text(function(d){return friends[i].name});

    }
    
    console.log("I iz done");
};





var margin = {top: -5, right: -5, bottom: -5, left: -5};
        var width = 1000 - margin.left - margin.right,
	height = 600- margin.top - margin.bottom;
	
	var force = d3.layout.force()
            .charge(-200)
            .linkDistance(50)
            .size([width, height]);


        var field = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
    

        var container = field.append("g");
    

                
                force
                    .nodes(friends)
                    .links(friendsJSON)
                    .start();
                
for (var i = 0; i < friends.length; i++) {
		var link = field.append("g")
                        .attr("class", "links")
                        .selectAll(".link")
			             .data(friendsJSON)
                        .enter().append("line")
			             .attr("class", "link")
			             .style("stroke-width", 3);
 
		var node = container.append("g")
                        .attr("class", "nodes")
                        .selectAll(".node")
			.data(friends)
			.enter().append("g")
			.attr("class", "node")
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; })
    
    console.log("OH CARAGO: "+friends[i].magicNumber);

		node.append("circle")
			.attr("r", function(d) { return 3*friends[i].magicNumber })
}
                
                force.on("tick", function() {
                    link.attr("x1", function(d) { return 3*d.source; })
                        .attr("y1", function(d) { return 3*d.source; })
                        .attr("x2", function(d) { return 3*d.target; })
                        .attr("y2", function(d) { return 3*d.target; });

                    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                });
                
                var linkedByIndex = {};
                friendsJSON.forEach(function(d) {
                    linkedByIndex[d.source + "," + d.target] = 1;
                });

                function isConnected(a, b) {
                    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
                }


}

*/
    
var width = 960,
    height = 500;

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(40)
    .size([width, height]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

  force
      .nodes(friends)
      .links(friendsJSON)
      .start();

  var link = svg.selectAll(".link")
      .data(friendsJSON)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", 3);
  
  var nodes = force.nodes(friends);  
    
    var vis = svg.selectAll('circle')
        .data(friends);
        
    var elem = svg.selectAll("g bubbleText")
        .data(nodes, function(d) { return d.name; });

    var elemEnter = vis.enter()
        .append("g");
    
     var circle = elemEnter.append("circle")
     .attr("class", "node")
     .attr("r", function(d){return 2*d.magicNumber})
     .attr('transform', function(d) { return 'translate(' + 20*d.magicNumber + ',' + 20*d.magicNumber + ')' });
                 
    
    //The code below is draggable but won't show text
/*  var node = svg.selectAll(".node")
      .data(friends)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d){return 2*d.magicNumber})
    //.append('g')
      .call(force.drag);*/

  elemEnter.append("text")
      .text(function(d) { return d.name; })
    .attr('transform', function(d) { return 'translate(' + 20*d.magicNumber + ',' + 20*d.magicNumber + ')' });
    

  force.on("tick", function() {
    link.attr("x1", function(d) { return 20+d.source; })
        .attr("y1", function(d) { return 20+d.source; })
        .attr("x2", function(d) { return 20+d.target; })
        .attr("y2", function(d) { return 20+d.target; });

    elemEnter.attr("cx", function(d) { return 10+d.x; })
        .attr("cy", function(d) { return 10+d.y; });
  });
};
