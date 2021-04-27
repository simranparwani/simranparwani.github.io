let figures = ["img/fig1.png", "img/fig2.png", "img/bubblechart.gif", "img/fig4.png", "", "img/fig5.png", 
"img/fig6.png", "", "", "", "img/fig8.png", "img/fig9.png", "img/fig10.gif", "", "img/fig11.png", "img/fig12.gif",
"", "img/fig14.gif", "", "","","","","","","","img/fig21.png","","", "","", "img/fig27.png", "img/project5.gif" ];






function changeSrc(x){

	x.children[0].style.display = "none";
	x.children[1].style.display = "block";

}
	

function changeGif(x){
	x.children[1].style.display = "none";
	x.children[0].style.display = "block";
}

var main = d3.select("main");
      var scrolly = main.select("#scrolly");
      var figure = scrolly.select("figure");
      var article = scrolly.select("article");
      var step = article.selectAll(".step");

      // initialize the scrollama
      var scroller = scrollama();

      // generic window resize listener event
      function handleResize() {
        // 1. update height of step elements
        var stepH = Math.floor(window.innerHeight * 0.75);
        step.style("height", stepH + "px");

        var figureHeight = window.innerHeight / 3;
        var figureMarginTop = (window.innerHeight - figureHeight) / 12;

        figure
          .style("height", figureHeight + "px")
          .style("top", figureMarginTop + "px");

        // 3. tell scrollama to update new element dimensions
        scroller.resize();
      }


      // scrollama event handlers
      function handleStepEnter(response) {
       
        // response = { element, direction, index }

        // add color to current step only
        step.classed("is-active", function(d, i) {
          return i === response.index;
        });
       
         if (response.index === 5){
        	figure.select("#periscopic").attr("style", "display: block");
        } else {
        	figure.select("#periscopic").attr("style", "display: none");
        }

           if (response.index === 10){
        	figure.select("#dotchart").attr("style", "display: block");
        } else {
        	figure.select("#dotchart").attr("style", "display: none");
        }

          if (response.index === 17){
        	figure.select("#violinplot").attr("style", "display: block");
        } else {
        	figure.select("#violinplot").attr("style", "display: none");
        }

            if (response.index === 20){
        	figure.select("#chloropleth").attr("style", "display: block");
        } else {
        	figure.select("#chloropleth").attr("style", "display: none");
        }

          if (response.index === 21){
        	figure.select("#sankey").attr("style", "display: block");
        } else {
        	figure.select("#sankey").attr("style", "display: none");
        }

          if (response.index === 22){
        	figure.select("#treemap").attr("style", "display: block");
        } else {
        	figure.select("#treemap").attr("style", "display: none");
        }

            if (response.index === 24){
        	figure.select("#circles").attr("style", "display: block");
        } else {
        	figure.select("#circles").attr("style", "display: none");
        }

            if (response.index === 25){
        	figure.select("#concentricdot").attr("style", "display: block");
        } else {
        	figure.select("#concentricdot").attr("style", "display: none");
        }

            if (response.index === 26){
        	figure.select("#radar").attr("style", "display: block");
        } else {
        	figure.select("#radar").attr("style", "display: none");
        }

            if (response.index === 28){
        	figure.select("#radialbar").attr("style", "display: block");
        } else {
        	figure.select("#radialbar").attr("style", "display: none");
        }
 		if (response.index === 31){
        	figure.select("#population").attr("style", "display: block");
        } else {
        	figure.select("#population").attr("style", "display: none");
        }






        figure.select("#fig").attr("src",figures[response.index - 1]);

      }

      function setupStickyfill() {
        d3.selectAll(".sticky").each(function() {
          Stickyfill.add(this);
        });
      }

      function init() {
        setupStickyfill();

        // 1. force a resize on load to ensure proper dimensions are sent to scrollama
        handleResize();

        // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        // 3. bind scrollama event handlers (this can be chained like below)
        scroller
          .setup({
            step: "#scrolly article .step",
            offset: 0.5,
            debug: false
          })
          .onStepEnter(handleStepEnter);

        // setup resize event
        window.addEventListener("resize", handleResize);
      }

      // kick things off
      init();