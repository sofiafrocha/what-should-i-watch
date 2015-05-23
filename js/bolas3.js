var nodes = [];

function bolinhas() {

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(20)
        .size([600, 600]);

	nodes = [
		{x: 200, y: 100, r: 14, class : "circ"}
	];

	var tempX;
	var tempY;
	var tempAng = Math.PI*2 / friendsJSON.length;
    var cirClass;

	for (var i = 0; i < friendsJSON.length; i++) {

		tempX = 200+150*Math.sin(tempAng * i);
		tempY = 100+100*Math.cos(tempAng * i);
        cirClass = "circ" + i

		nodes.push({x: tempX, y: tempY, r: friendsJSON[i].target, class: cirClass});
	}

	var links = [];

	for (var i = 0; i < nodes.length; i++) {
		links.push({source: nodes[0], target: nodes[i]});
	}

	var labels = ['Tu'];

	for (var i = 0; i < friendsJSON.length; i++) {
		labels.push(friendsJSON[i].label);
	}

	var vis = d3.select("#chart").append('svg');
	vis.attr("width", 1000).attr("height", 600);
    
     force
        .start();              
      
   force.on("tick", function() {
        vis.selectAll(".line")
            .data(links)
            .enter()
            .append("line")
            .attr("x1", function(d) { return d.source.x })
            .attr("y1", function(d) { return d.source.y })
            .attr("x2", function(d) { return d.target.x })
            .attr("y2", function(d) { return d.target.y })
            .style("stroke", "rgb(76,80,101)");
    }); 

	vis.selectAll("circle.nodes")
        .data(nodes)
        .enter()
        .append("svg:circle")  
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })
        .attr("fill", "#img1")
        .attr("class", function(d) {return d.class; })
        .on("click", function(d) { clickGraph(); });
    

	for (var i = 0; i < labels.length; i++) {
		vis.append("text")
		    .attr("dx", nodes[i].x)
		    .attr("dy", nodes[i].y)
		    .text(labels[i]);
	}

    var node = vis.selectAll("circle.nodes");

    vis.selectAll("circle.nodes").on("mouseover", function(d){
                        
                        d3.select(this).select("circle").transition()
                                .duration(250)
                                .attr("r", function(d) { return d.r*1.5; });
                        d3.select(this).select("text")
                        
                })
		
		.on("mouseout", function(d){
 
                        d3.select(this).select("circle").transition()
                                .duration(250)
                                .attr("r", function(d) { return d.r; });
                });
}