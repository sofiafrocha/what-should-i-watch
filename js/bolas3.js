var nodes = [];

function bolinhas() {
	/*d3.select(".chart").append("svg")
		.attr("width", 100)
		.attr("height", 100).append("circle")
		.attr("cx", 25)
		.attr("cy", 25)
		.attr("r", 25).style("fill", "yellow");


		for (var i = 0; i < friendsJSON.length; i++) {
			console.log(friendsJSON[i].target);

			d3.select(".chart").append('svg')
				.attr("id", friendsJSON[i].target)
				.attr("width", 100)
				.attr("height", 100).append("circle")
				.attr("cx", 25)
				.attr("cy", 25)
				.attr("r", 25).style("fill", "red");

			d3.select(".chart").append('p')
				.attr("id", friendsJSON[i].target),
				.text(friendsJSON[i].target);
		}

		var links = [
		  {source: nodes[0], target: nodes[1]},
		  {source: nodes[2], target: nodes[1]}
		];
	*/



	nodes = [
		{x: 450, y: 200, r: 14}
	];

	var tempX;
	var tempY;
	var tempAng = Math.PI*2 / friendsJSON.length;

	for (var i = 0; i < friendsJSON.length; i++) {
		//console.log(Math.random());
		//tempX = Math.floor(Math.random() * (900 - 0 + 1)) + 0;
		//tempY = Math.floor(Math.random() * (400 - 0 + 1)) + 0;

		tempX = 450+100*Math.sin(tempAng * i);
		tempY = 200+100*Math.cos(tempAng * i);

		nodes.push({x: tempX, y: tempY, r: friendsJSON[i].target});
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
	vis.attr("width", 900).attr("height", 400);

	vis.selectAll("circle.nodes")
	  .data(nodes)
	  .enter()
	  .append("svg:circle")
	  .attr("cx", function(d) { return d.x; })
	  .attr("cy", function(d) { return d.y; })
	  .attr("r", function(d) { return d.r; })
	  .attr("fill", "black");

	for (var i = 0; i < labels.length; i++) {
		vis.append("text")
		    .attr("dx", nodes[i].x)
		    .attr("dy", nodes[i].y)
		    .text(labels[i]);
	}

	vis.selectAll(".line")
		.data(links)
		.enter()
		.append("line")
		.attr("x1", function(d) { return d.source.x })
		.attr("y1", function(d) { return d.source.y })
		.attr("x2", function(d) { return d.target.x })
		.attr("y2", function(d) { return d.target.y })
		.style("stroke", "rgb(6,120,155)");

}