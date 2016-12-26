/*
* geomap.js | xiaozhang
* 2016.12.25
*/
require("../css/main.less");
// var mapFlight=require("./geo_flight.js");
var allPlanes=require("./geo_plane.js");

var svgwidth=1000,svgHeight=1000,rectPadding=4;
//添加svg画布 
var svg=d3.select('body')
	.append("div")
	.attr('id', 'flightMap')
	.append('svg')
	.attr('width', svgwidth)
	.attr('height', svgHeight)
	.attr("transform", "translate(0,0)");

var projection = d3.geo.mercator()
    .center([107, 31])
    .scale(850)
    .translate([svgwidth/2, svgHeight/2]);

var path = d3.geo.path()
    .projection(projection);

d3.json("/build/static/china.json", function(error, root) {
        
    if (error) 
        return console.error(error);     
    svg.selectAll("path")
        .data( root.features )
        .enter()
        .append("path")
        .attr("stroke","#7b8592")
        .attr("stroke-width",1)
        .attr("fill", "#323c47")
        .attr("d", path )
        .on("mouseover",function(d,i){
            d3.select(this)
               .attr("fill","#2b333d");
        })
        .on("mouseout",function(d,i){
            d3.select(this)
               .attr("fill","#323c47");
        });
	var location = svg.selectAll(".location")
        .data(allPlanes)
        .enter()
        .append("g")
        .attr("class","location")
        .attr("transform",function(d){
            var coor = projection(d.pos);
            return "translate("+ coor[0] + "," + coor[1] +")";
        });
		location.append("circle")
	    .attr("class","point")
	    .attr("r",0)
	    .transition()
	    .duration(2000)  
	    .ease("linear") 
	    .attr("r",8);
    var mapBlinks = function(){
            d3.selectAll(".point")
            .transition()
            .duration(1000)
            .ease("linear")
            .attr("r",6)
            .transition()
            .duration(1000)
            .ease("linear") 
            .attr("r",8);
        }
        setInterval(mapBlinks,2000);
});