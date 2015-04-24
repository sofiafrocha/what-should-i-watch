setTimeout(graph, 6500);


function graph(d, data) { 
    console.log("I haz begun");
    
    var width = 960,
        height = 500;

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(40)
        .size([width, height]);
    
    
    var drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", dragstarted)
        .on("drag", dragged)
        .on("dragend", dragended);

     var svg = d3.select("#chart").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + 5 + "," + 5 + ")")

        var rect = svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all");

        var container = svg.append("g");
                
                force
                    .nodes(friends)
                    .links(friendsJSON)
                    .start();              
      
	    
		var link = container.append("g")
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
                        .attr("cx", function(d) { return 700-d.x; })
                        .attr("cy", function(d) { return 50+d.y; })
                        .call(drag);
    
    		var me = container.append("g")
                        .attr("class", "nodes")
                        .selectAll(".node")
			.data(friends)
			.enter().append("g")
			.attr("class", "me")
                        .attr("cx", function(d) { return 700-d.x; })
                        .attr("cy", function(d) { return 50+d.y; })
                        .call(drag);
		  
		node.append("circle")
			.attr("r", function(d) { return d.magicNumber * 2; })
        
        me.append("circle")
			.attr("r", 15)
            .attr("transform", function(d) { return "translate(" + 300 + "," + 0 + ")"; })
            .style("fill", "Tomato")
            .style("stroke", "white");
		 
                
                force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                });
                    node.append("text")
                        .text(function(d) { return d.name; });
    
                    me.append("text")
                        .text("YOU")
                        .attr("transform", function(d) { return "translate(" + 300 + "," + 20 + ")"; })
                        .style("fill", "white");
                
                var linkedByIndex = {};
               friendsJSON.forEach(function(d) {
                    linkedByIndex[d.source.index + "," + d.target.index] = 1;
                   console.log("HEY HO: " + linkedByIndex);
                });

                function isConnected(a, b) {
                    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
                    console.log("ANDA LÁ QUE JÁ TOU FARTA" + linkedByIndex);
                }

    
    node.on("mouseover", function(d){
                        
                        node.classed("node-active", function(o) {
                            thisOpacity = isConnected(d, o) ? true : false;
                            this.setAttribute('fill-opacity', thisOpacity);
                            return thisOpacity;
                        });

                        link.classed("link-active", function(o) {
                            return o.source === d || o.target === d ? true : false;
                        });
                        
                        d3.select(this).classed("node-active", true);
                        d3.select(this).select("circle").transition()
                                .duration(750)
                                .attr("r", (d.magicNumber * 2)*1.5);
                        d3.select(this).select("text")
                                .style("fill", "Tomato");
                        
                })
		
		.on("mouseout", function(d){
                        
                        node.classed("node-active", false);
                        link.classed("link-active", false);
                    
                        d3.select(this).select("circle").transition()
                                .duration(750)
                                .attr("r", d.magicNumber * 2);
                });


        function dottype(d) {
          d.x = +d.x;
          d.y = +d.y;
          return d;
        };

        function dragstarted(d) {
          d3.event.sourceEvent.stopPropagation();
          
          d3.select(this).classed("dragging", true);
          force.start();
        }

        function dragged(d) {
          
          d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
          
        }

        function dragended(d) {
          
          d3.select(this).classed("dragging", false);
        }
};
