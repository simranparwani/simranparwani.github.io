/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
let mapData, newsData, data2004, data2014, data2016, data2019;
let height = window.innerHeight / 1.6;
let width = window.innerWidth / 2;
let yearsAvailable = ["2004", "2014", "2016", "2019"];
let svg;
let opacitySelected;
let opacityToggle = false;
let colorScheme = [
  "#FFF",
  "#CFE7CB",
  "#A6D49F",
  "#78B66E",
  "#4D9542",
  "#0A4001"
];
let map = document.getElementById("map");
let counties = document.getElementsByTagName("PATH");
let countyDisplay = document.getElementById("county");
let paperList = document.getElementById("paperList");
let toggle = document.getElementById("toggle");
let scale;

function checkToggle(element) {
  if (element.checked === true) {
    document.getElementsByClassName("leg0")[0].innerHTML =
      '<span id="circle" class="leg0" style="background: #FFF"></span>0-5';
    document.getElementsByClassName("leg1")[0].innerHTML =
      '<span id="circle" class="leg1" style="background: #CFE7CB"></span>5-10';
    document.getElementsByClassName("leg2")[0].innerHTML =
      '<span id="circle" class="leg2" style="background: #A6D49F"></span>10-15';
    document.getElementsByClassName("leg3")[0].innerHTML =
      '<span id="circle" class="leg3" style="background: #78B66E"></span>15-20';
    document.getElementsByClassName("leg4")[0].innerHTML =
      '<span id="circle" class="leg4" style="background: #4D9542"></span>20-25';
    document.getElementsByClassName("leg5")[0].innerHTML =
      '<span id="circle" class="leg5" style="background: #0A4001"></span>25+';
    return [5, 10, 15, 20, 25];
  } else {
    document.getElementsByClassName("leg0")[0].innerHTML =
      '<span id="circle" class="leg0" style="background: #FFF"></span>0';
    document.getElementsByClassName("leg1")[0].innerHTML =
      '<span id="circle" class="leg1" style="background: #CFE7CB"></span>1';
    document.getElementsByClassName("leg2")[0].innerHTML =
      '<span id="circle" class="leg2" style="background: #A6D49F"></span>2';
    document.getElementsByClassName("leg3")[0].innerHTML =
      '<span id="circle" class="leg3" style="background: #78B66E"></span>3-5';
    document.getElementsByClassName("leg4")[0].innerHTML =
      '<span id="circle" class="leg4" style="background: #4D9542"></span>5-10';
    document.getElementsByClassName("leg5")[0].innerHTML =
      '<span id="circle" class="leg5" style="background: #0A4001"></span>10+';
    return [1, 2, 3, 6, 10];
  }
}
toggle.onchange = function() {
  scale = checkToggle(this);
  d3.select("svg").remove();
  drawMap(yearsAvailable[slider.value], scale);
};

//slider for first chart. slider value gives 0-3 which is an index that matches to the yearsAvailable array
var slider = document.getElementById("yearInput");
var output = document.getElementById("year");
output.innerHTML = yearsAvailable[slider.value];

//when user changes slider value, remove svg and redraw map with new data
slider.oninput = function() {
  output.innerHTML = yearsAvailable[this.value];
  scale = checkToggle(toggle);
  d3.select("svg").remove();
  drawMap(yearsAvailable[slider.value], scale);
};

//slider for packed clustered bubble chart
var sliderBubble = document.getElementById("yearBubbleInput");
var outputBubble = document.getElementById("yearBubble");
console.log(sliderBubble.value);
outputBubble.innerHTML = yearsAvailable[sliderBubble.value];

//removes bubble chart svg and tooltips before redrawing with different year
sliderBubble.oninput = function() {
  d3.select("#bubbleChart").remove();
  d3.selectAll("#tooltip").remove();
  outputBubble.innerHTML = yearsAvailable[this.value];
  let dataYear = eval("data" + yearsAvailable[this.value]);
  drawChart(dataYear);
  drawTooltip(dataYear);
};

d3.csv("newsdeserts.csv").then(function(newsDataset) {
  newsData = newsDataset;
  isDataReady();
});

d3.json("county.oh.json").then(function(county_data) {
  mapData = county_data;
  isDataReady();
});

d3.tsv("oh2004.tsv").then(function(newsDataset) {
  data2004 = newsDataset;
  isDataReady();
});

d3.tsv("oh2014.tsv").then(function(newsDataset) {
  data2014 = newsDataset;
  isDataReady();
});

d3.tsv("oh2016.tsv").then(function(newsDataset) {
  data2016 = newsDataset;
  isDataReady();
});

d3.tsv("oh2019.tsv").then(function(newsDataset) {
  data2019 = newsDataset;
  isDataReady();
});

//draws charts when data is loaded
function isDataReady() {
  if (mapData && newsData && data2004 && data2014 && data2016 && data2019) {
    drawMap(yearsAvailable[slider.value], [1, 2, 3, 6, 10]);
    drawChart(data2004);
  }
}

//takes year argument which is the dataset for the year indicated by the slider value
function drawMap(year, scale) {
  let projection = d3
    .geoConicConformal()
    .center([0, 42.954])
    .parallels([40 + 26 / 60, 41 + 42 / 60])
    .rotate([82 + 30 / 60, -39 - 40 / 60])
    .translate([width / 2, height / 2]);
  console.log(scale.domain);
  let path = d3.geoPath(projection);
  let counties = topojson.feature(mapData, mapData.objects.counties);

  projection.scale(1).translate([0, 0]);
  let b = path.bounds(counties),
    s =
      0.95 /
      Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [
      (width - s * (b[1][0] + b[0][0])) / 2,
      (height - s * (b[1][1] + b[0][1])) / 2
    ];

  projection.scale(s).translate(t);

  let colorScale = d3
    .scaleThreshold()
    .domain(scale)
    .range(colorScheme);
  let opacityScale = d3
    .scaleThreshold()
    .domain(scale)
    .range([0, 1, 2, 3, 4, 5]);
  svg = d3
    .select("#map")
    .append("svg")
    .attr("viewBox", "0 0 " + width + " " + height);
  svg
    .selectAll("path")
    .data(
      counties.features.filter(function(d) {
        return d.id % 1000;
      })
    )
    .join("path")

    .attr("d", path)
    .style("stroke", "#ececec")

    .style("fill", function(feature) {
      let name = feature.properties.name;
      let row = newsData.find(function(countyRow) {
        return countyRow["county"] == name;
      });
      if (row) {
        return colorScale(row[year]);
      }
    })
    .style("opacity", function(feature) {
      if (opacityToggle === false) {
        return;
      } else {
        let name = feature.properties.name;
        let row = newsData.find(function(countyRow) {
          return countyRow["county"] == name;
        });
        if (row) {
          let opacityVal = opacityScale(row[year]);
          if (opacityVal != opacitySelected) {
            return 0.08;
          }
        }
      }
    })

    .on("mouseenter", function(feature) {
      let name = feature.properties.name;
      let data_year = year;
      displayInfo(name, data_year);
    });

  document.getElementById("legend-row1").addEventListener("click", function(e) {
    opacitySelected = e.target.className.slice(-1);

    console.log(opacitySelected);
    if (opacitySelected < 6) {
      opacityToggle = true;
    } else {
      opacityToggle = false;
      countyDisplay.innerHTML =
        '<p style="font-size:1vw;">1. Click on a county to learn more.<br><br>2. Click the legend to filter by number of newspapers.<br><br>3. Use the slider to change the year.<br><br>4. Use the toggle to change the scaling.</p>';
      while (paperList.firstChild) {
        paperList.removeChild(paperList.firstChild);
      }
    }
    d3.select("svg").remove();
    drawMap(yearsAvailable[slider.value], scale);
  });
}

function displayInfo(name, year) {
  let data = eval("data" + year);
  let county = name.split(" ")[0];
  let countyPapers = data.filter(function(row) {
    return row.county == county;
  });
  while (paperList.firstChild) {
    paperList.removeChild(paperList.firstChild);
  }
  countyDisplay.innerHTML =
    'Newspapers in <strong style="color:#6FAE66;">' +
    county +
    "</strong> County";

  for (let i = 0; i < countyPapers.length; i++) {
    var item = document.createElement("LI");
    item.innerHTML =
      "<span style = 'color: #E9B872;'>\u25A0 </span>" +
      "  " +
      countyPapers[i].newspaper_name;
    paperList.appendChild(item);
  }
}

function createGroups(data) {
  let colorScale = d3
    .scaleThreshold()
    .domain([1, 3, 5])
    .range(["#FFF", "#654236", "#90A9B7", "#E9B872"]);
  let nested_data = d3
    .nest()
    .key(function(d) {
      return d.owner_name;
    })
    .entries(data);
  nested_data.sort((a, b) => (a.values.length < b.values.length ? 1 : -1));
  console.log(nested_data);
  let owners = [];

  for (let i = 0; i < nested_data.length; i++) {
    let nodes = [];
    let color;
    if (i === 0) {
      color = "#AA3939";
    } else if (i === 1) {
      color = "#A6D49F";
    } else if (i === 2) {
      color = "#C0876D";
    } else {
      color = colorScale(nested_data[i].values.length);
    }
    for (let j = 0; j < nested_data[i].values.length; j++) {
      let node = {
        group: i,
        value: 1,
        color: color,
        properties: {
          name: nested_data[i].values[j]["newspaper_name"],
          county: nested_data[i].values[j]["county"],
          frequency: nested_data[i].values[j]["frequency"],
          owner_name: nested_data[i].values[j]["owner_name"]
        }
      };
      nodes.push(node);
    }
    owners.push({ children: nodes });
  }
  return { children: owners };
}

function createTooltip(data) {
  let tooltip = d3
    .select("#leftBubble")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .text("")
    .style("z-index", 10)
    .style("visibility", "hidden")
    .style("font-size", "16px")
    .style("font-family", "sans-serif")
    .style("padding", "4px")
    .style("background-color", "white");
  return tooltip;
}

function drawChart(year) {
  let tooltip = createTooltip(year);
  let nodes = createGroups(year);

  let svg2 = d3
    .select("#leftBubble")
    .append("svg")
    .attr("width", width)
    .attr("height", width)
    .attr("id", "bubbleChart");
  pack = () =>
    d3
      .pack()
      .size([width * 0.8, width * 0.8])
      .padding(4)(d3.hierarchy(nodes).sum(d => d.value));

  let data = pack().leaves();

  const simulation = d3
    .forceSimulation(data)
    .force("x", d => d3.forceX(d.x))
    .force("y", d => d3.forceY(d.y))
    .force("cluster", forceCluster())
    .force("collide", forceCollide())
    .alpha(0.09)
    .alphaDecay(0);

  const circle = svg2
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 4)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("fill", d => d.data.color)
    .call(drag(simulation))
    .on("mouseenter", function(row) {
      tooltip
        .style("visibility", "visible")
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 10 + "px")
        .html(
          '<strong style="color:#C0876D;">Name: </strong>' +
            row.data.properties.name +
            "</br>" +
            '<strong style="color:#C0876D;">Owner: </strong>' +
            row.data.properties.owner_name +
            '</br><strong style="color:#C0876D;">County: </strong>' +
            row.data.properties.county
        );
    })
    .on("mouseout", function() {
      tooltip
        .transition()
        .duration(100)
        .style("visibility", "hidden");
    });

  circle
    .transition()
    .delay((d, i) => Math.random() * 500)
    .duration(750)
    .attrTween("r", d => {
      const i = d3.interpolate(0, d.r);
      return t => (d.r = i(t));
    });

  simulation.on("tick", () => {
    circle.attr("cx", d => d.x).attr("cy", d => d.y);
  });

  function centroid(nodes) {
    let x = 0;
    let y = 0;
    let z = 0;
    for (const d of nodes) {
      let k = d.r * d.r;
      x += d.x * k;
      y += d.y * k;
      z += k;
    }
    return { x: x / z, y: y / z };
  }

  function forceCluster() {
    const strength = 0.18;

    function force(alpha) {
      const centroids = d3.rollup(data, centroid, d => d.data.group);
      const l = alpha * strength;
      for (const d of data) {
        const { x: cx, y: cy } = centroids.get(d.data.group);
        d.vx -= (d.x - cx) * l;
        d.vy -= (d.y - cy) * l;
      }
    }

    force.initialize = _ => (nodes = _);

    return force;
  }

  function forceCollide() {
    const alpha = 0.4;
    const padding1 = 5; // separation between same-color nodes
    const padding2 = 6; // separation between different-color nodes
    let maxRadius;

    function force() {
      const quadtree = d3.quadtree(data, d => d.x, d => d.y);
      for (const d of data) {
        const r = d.r + maxRadius;
        const nx1 = d.x - r,
          ny1 = d.y - r;
        const nx2 = d.x + r,
          ny2 = d.y + r;

        quadtree.visit((q, x1, y1, x2, y2) => {
          if (!q.length)
            do {
              if (q.data !== d) {
                const r =
                  d.r +
                  q.data.r +
                  (d.group === q.data.group ? padding1 : padding2);
                let x = d.x - q.data.x,
                  y = d.y - q.data.y,
                  l = Math.hypot(x, y);
                if (l < r) {
                  l = ((l - r) / l) * alpha;
                  (d.x -= x *= l), (d.y -= y *= l);
                  (q.data.x += x), (q.data.y += y);
                }
              }
            } while ((q = q.next));
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      }
    }

    force.initialize = _ =>
      (maxRadius =
        d3.max((nodes = _), d => d.r) + Math.max(padding1, padding2));

    return force;
  }

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

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
}
