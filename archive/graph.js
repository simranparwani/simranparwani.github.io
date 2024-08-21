//adapted from Mike Bostock's demo: https://observablehq.com/@d3/force-directed-graph
let data = {
  "nodes": [
    {"id": "yelp", "group": 1, "main": false},
    {"id": "broadband", "group": 1, "main": false},
    {"id": "bail", "group": 2, "main": false},
    {"id": "ratrace", "group":1, "main": false},
    {"id": "personal", "group":4, "main": false},
     {"id": "impact2030", "group":4, "main": false},
      {"id": "maasalama", "group":4, "main": false},
     {"id": "selfTracking", "group":4, "main": false},
     {"id": "ptp", "group": 2, "main": false},
     {"id": "menstrual", "group": 3, "main": false},
     {"id": "westemhsc", "group": 3, "main": false},
     {"id": "ohioNews", "group": 2, "main": false},
      {"id": "code", "group":1, "main": true}, 
      {"id": "dataStorytelling", "group":2, "main": true},
      {"id": "socialImpact", "group":3, "main": true},
      {"id": "vizDesign", "group":4, "main": true}
      
    ],

  "links": [
    {"source": "yelp", "target": "code", "value": 1},
    {"source": "broadband", "target": "code", "value": 1},
    {"source": "ratrace", "target": "code", "value": 1},
    {"source": "bail", "target": "code", "value": 1},
    {"source": "bail", "target": "socialImpact", "value": 1},
    {"source": "bail", "target": "vizDesign", "value": 1},
    {"source": "bail", "target": "dataStorytelling", "value": 5},
    {"source": "personal", "target": "vizDesign", "value": 1},
    {"source": "impact2030", "target": "vizDesign", "value": 1},
    {"source": "impact2030", "target": "socialImpact", "value": 1},
    {"source": "maasalama", "target": "vizDesign", "value": 1},
    {"source": "selfTracking", "target": "vizDesign", "value": 1},
    {"source": "ptp", "target": "code", "value": 1},
    {"source": "ptp", "target": "socialImpact", "value": 1},
    {"source": "menstrual", "target": "vizDesign", "value": 1},
    {"source": "menstrual", "target": "socialImpact", "value": 1},
    {"source": "westemhsc", "target": "socialImpact", "value": 1},
    {"source": "ohioNews", "target": "code", "value": 1},
    {"source": "ohioNews", "target": "socialImpact", "value": 1},
    {"source": "ohioNews", "target": "vizDesign", "value": 1},
    {"source": "ohioNews", "target": "dataStorytelling", "value": 5},
    {"source": "code", "target": "dataStorytelling", "value": 10},
    {"source": "vizDesign", "target": "dataStorytelling", "value": 10},
    {"source": "socialImpact", "target": "dataStorytelling", "value": 10}
  ]
}
let width = window.innerWidth*.6;
let height = window.innerHeight * .8;
let colors = ["FFF","#526F63", "#6A5B6E", "#D5370B", "#F0C62D"]
let labels = ["Labels","Code", "Data Journalism", "Social Impact", "Visualization"]

createChart(data);



function drag(simulation) {

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

function createChart(data){
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));
    let svg = d3.select("#viz").append("svg");
    if (width > height) {
        svg.attr("viewBox", [-width/6,-height/6, width/3, height/3]);
    } else {
        svg.attr("viewBox", [-width/2,-height/4, width, height/2]);
    }
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(0,0));


   const link = svg.selectAll("line").data(links)
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.selectAll("g").data(nodes).enter().append("g").call(drag(simulation));


    let circles = node.append("circle").attr("stroke", "#fff")
        .attr("stroke-width", 1)        
        .attr("r", function(d) {
            if (d.main === true) {
                return 22;
            } else {
                return 6;
            }
        })
        .attr("fill", function(d) {
            return colors[d.group];
        });
        

let titles = node.append("text")
    
    .attr("fill", function(d) {
            if (d.group === 4){
                return "#000000"
            } else {
                return "#FFFFFF"
            }
        })
    .attr("font-size", ".3vw")
    .attr("font-family", "Open Sans")
    .attr("text-align", "center")
      .text(function(d) {
        if (d.main ===true){
        return labels[d.group];
    }
      });
node.append("title")
      .text(function(d) { return d.id; });
  

    simulation.on("tick", () => {
        let lineLength = 1.2;
        link
            .attr("x1", d => lineLength * d.source.x)
            .attr("y1", d => lineLength * d.source.y)
            .attr("x2", d => lineLength * d.target.x)
            .attr("y2", d => lineLength * d.target.y);

        circles
            .attr("cx", d => lineLength * d.x)
            .attr("cy", d => lineLength * d.y);

        titles 
            .attr("x", d => lineLength * d.x - 18)
            .attr("y", d => lineLength * d.y + 2)
    });

    // invalidation.then(() => simulation.stop());

    return svg.node();
}