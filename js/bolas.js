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

	function drawBubbles() {

		// generate data with calculated layout values
		var nodes = bubble.nodes(processData(data))
			.filter(function(d) { return !d.children; }); // filter out the outer bubble

		// assign new data to existing DOM 
		var vis = svg.selectAll('circle')
			.data(nodes, function(d) { return d.name; });

        
        
        
        //TRANSIÇÕES ABAIXO, SÓ PARA DEPOIS
		// enter data -> remove, so non-exist selections for upcoming data won't stay -> enter new data -> ...

		// To chain transitions, 
		// create the transition on the updating elements before the entering elements 
		// because enter.append merges entering elements into the update selection

		var duration = 300;
		var delay = 0;

		// update - this is created before enter.append. it only applies to updating nodes.
		vis.transition()
			.duration(duration)
			.delay(function(d, i) {delay = i * 7; return delay;}) 
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
			.style('opacity', 1); // force to 1, so they don't get stuck below 1 at enter()

		// enter - only applies to incoming elements (once emptying data)	
		vis.enter().append('circle')
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
			.attr('class', function(d) { return d.className; })
			.style('opacity', 0) 
			.transition()
			.duration(duration * 1.2)
			.style('opacity', 1);

		// exit
		vis.exit()
			.transition()
			.duration(duration + delay)
			.style('opacity', 0)
			.remove();
	}
    


	function processData(data) {
		if(!data) return;

		var obj = data.friends_list;

		var newDataSet = [];

		for(var prop in obj) {
			newDataSet.push({name: prop, className: prop.toLowerCase().replace(/ /g,''), size: obj[prop]});
		}
		return {children: newDataSet};
	}
    
            drawBubbles();

})();