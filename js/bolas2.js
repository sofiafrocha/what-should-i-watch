var data = {"friends_list": {
    "Sofia": 18, 
    "Joaquina": 15, 
    "Emanuelina": 55
}};

(function() { 
	
  // D3 Bubble Chart 

	var diameter = 600;

	var svg = d3.select('#chart').append('svg')
		.attr('width', diameter)
		.attr('height', diameter);

	var bubble = d3.layout.pack()
		.size([diameter, diameter])
		.value(function(d) {return d.size;}) // new data is loaded to bubble layout
		.padding(3);

		// generate data with calculated layout values
		var nodes = bubble.nodes(processData(data))
			.filter(function(d) { return !d.children; }); // filter out the outer bubble

		// assign new data to existing DOM 
		var vis = svg.selectAll('circle')
			.data(nodes, function(d) { return d.name; });

            
        var elem = svg.selectAll("g bubbleText")
            .data(processData(data));

        var elemEnter = vis.enter()
            .append("g")

        var circle = elemEnter.append("circle")
            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
            .attr("r", function(d){return d.r} )
            .attr("stroke","black")
            .attr('class', function(d) { return d.className; });

        elemEnter.append("text")
            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
            .attr("dx", function(d){return -0.5*d.r})
            .text(function(d){return d.name});


        function processData(data) {
            if(!data) return;

            var obj = data.friends_list;

            var newDataSet = [];

            for(var prop in obj) {
                newDataSet.push({name: prop, className: prop.toLowerCase().replace(/ /g,''), size: obj[prop]});
            }
            return {children: newDataSet};
        }


})();