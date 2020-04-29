let mapData, newsData;
let height = window.innerHeight/1.6;
let width = window.innerWidth/2;
let yearsAvailable =['2004', '2014', '2016', '2019']

var slider = document.getElementById("yearInput");
var output = document.getElementById("year");
output.innerHTML = yearsAvailable[slider.value];
let colorScheme = ['#180000', '#700B0B', '#AA3939', '#E48181',  '#FFCDCD', '#FFF']

slider.oninput = function() {
  output.innerHTML = yearsAvailable[this.value];
  d3.select("svg").remove();
  drawMap(yearsAvailable[slider.value]);
}

d3.csv('newsdeserts.csv')
	.then(function(newsDataset){
		newsData = newsDataset;
		isDataReady();
});

d3.json('county.oh.json')
	.then(function(county_data){ 
		mapData = county_data; 
	isDataReady();
});

function isDataReady() {
	if (mapData && newsData) {
		drawMap(yearsAvailable[slider.value]);
	}
}

function drawMap(year) {
	let projection = d3.geoConicConformal()
	.center([0,42.954])
  	.parallels([40 + 26 / 60, 41 + 42 / 60])
    .rotate([82 + 30 / 60, -39 - 40 / 60])
  	.translate([width/2, height/2])
	
	let path = d3.geoPath(projection);
	let counties = topojson.feature(mapData, mapData.objects.counties);

	projection.scale(1).translate([0, 0]);
	let b = path.bounds(counties),
  		s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    	t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

  	projection.scale(s).translate(t);

	let colorScale = d3.scaleThreshold()
					    .domain([1,2,3,5,10])
					    .range(colorScheme);
	let svg = d3.select('#map').append('svg').attr('viewBox', "0 0 "+ width + " " + height);
	svg.selectAll("path")
		.data(counties.features.filter(function(d) { return d.id % 1000; }))
   		.enter().append("path")
		.attr("d", path)
		.style('stroke','#ececec')
		.style('fill', function(feature){
			let name = feature.properties.name;
			let row = newsData.find(function(countyRow){
				return countyRow['county'] == name;
			});
			if(row){
				return colorScale(row[year]);
			}
	})
   
}

