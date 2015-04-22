
//FAKE JSON
var json = {"friends_list": {
    "Sofia": 18, 
    "Joaquina": 15, 
    "Emanuelina": 55
}};

var width = 960,
    height = 500;

var color = d3.scale.category10();

var nodes = [],
    links = [];

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-400)
    .linkDistance(120)
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("#mainBubble").append("svg")
    .attr("width", width)
    .attr("height", height);

/*
var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");
*/

// generate bubbles with values calculated from friends_list
var bubbles = force.nodes(processData(json));

var node = svg.selectAll('circle').data(nodes);
var link = svg.selectAll(".link");

// 1. Add three nodes and three links.
setTimeout(function() {
  var a = {id: "a"}, b = {id: "b"}, c = {id: "c"};
  nodes.push(a, b, c);
  links.push({source: a, target: b}, {source: a, target: c}, {source: b, target: c});
  start();
}, 0);

// 2. Remove node B and associated links.
setTimeout(function() {
  nodes.splice(1, 1); // remove b
  links.shift(); // remove a-b
  links.pop(); // remove b-c
  start();
}, 3000);

// Add node B back.
setTimeout(function() {
  var a = nodes[0], b = {id: "b"}, c = nodes[1];
  nodes.push(b);
  links.push({source: a, target: b}, {source: b, target: c});
  start();
}, 6000);

function start() {
  link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
  link.enter().insert("line", ".node").attr("class", "link");
  link.exit().remove();

  node = node.data(force.nodes(), function(d) { return d.id;});
  node.enter().append("circle").attr("class", function(d) { return "node " + d.id; }).attr("r", 8);
  node.exit().remove();

  force.start();
}

function tick() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}

    
function processData(data) {
    var source = data.friends_list;
    var newDataSet = [];

    for(var val in source) {
        newDataSet.push({name: val, className: val.toLowerCase(), size: source[val]});
    }
        return {children: newDataSet};
        console.log("OLHA PARA MIM"+newDataSet);
    }

