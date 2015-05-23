var nodes = [];

function bolinhas() {

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(40)
        .size([1000, 600]);

	nodes = [
		{x: 500, y: 300, r: 14, class : "circ"}
	];

	var tempX;
	var tempY;
	var tempAng = Math.PI*2 / friendsJSON.length;
    var cirClass;

	for (var i = 0; i < friendsJSON.length; i++) {

		tempX = 500+300*Math.sin(tempAng * i);
		tempY = 300+120*Math.cos(tempAng * i);
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
            .style("stroke", "rgb(6,120,155)");
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