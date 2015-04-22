  //FAKE JSON
  var json = {"friends_list": {
      "Sofia": 18, "Joaquina": 15, "Emanuelina": 55
  }};

	var diameter = 300;

	var svg = d3.select('#graph').append('svg')
					.attr('width', diameter)
					.attr('height', diameter);

	var bubble = d3.layout.pack()
				.size([diameter, diameter])
				.value(function(d) {return d.size;})
				.padding(3);
    
    
    // generate bubbles with values calculated from friends_list
    var nodes = bubble.nodes(processData(json))
						.filter(function(d) { return !d.children; }); // filters out the parent outside bubble
    
    var vis = svg.selectAll('circle')
					.data(nodes);
    vis.enter().append('circle')
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
			.attr('class', function(d) { return d.className; });
    
/*
    node.append("label")
        .attr("dy", ".3em")
        .attr("dx", "3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.className });
    */
    
    function processData(data) {
        var source = data.friends_list;
        var newDataSet = [];

        for(var val in source) {
            newDataSet.push({name: val, className: val.toLowerCase(), size: source[val]});
        }
        return {children: newDataSet};
    }
