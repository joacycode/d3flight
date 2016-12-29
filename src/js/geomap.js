/*
* geomap.js | xiaozhang
* 2016.12.25
*/
require("../css/main.less");
// var flightLine=require("./flightLine.js");
var PlaneGeoData=require("./PlaneGeoData.js");

var svgwidth="1600",svgHeight="700";
//添加svg画布 
var svg=d3.select('body')
    .append("div")
    .attr('id', 'flightMap')
    .append('svg')
    .attr('width', svgwidth)
    .attr('height', svgHeight)
    .attr("transform", "translate(0,0)");

var projection = d3.geo.mercator()
    .center([106, 39])
    .scale(600)
    .translate([svgwidth/2, svgHeight/2]);

var path = d3.geo.path()
    .projection(projection);

d3.json("/build/static/china.json", function(error, root) {    
    if (error) return console.error(error);     
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

    


    var location = svg.selectAll(".location")//标注点
        .data(PlaneGeoData)
        .enter()
        .append("g")
        .attr("class","location")
        .attr("transform",function(d){
            var coor = projection(d.pos);
            return "translate("+ coor[0] + "," + coor[1] +")";
        });

        location.append("path")
        .attr('class', 'fline')
        .attr("d","M0 0 C90 40 130 40 100.4 2.2");

        location.append("circle")
        .attr("class","point")
        .attr("r",0)
        .transition()
        .duration(2000)  
        .ease("linear") 
        .attr("r",5);

        location.append("circle")
        .attr("class","linePoint")
        .attr("r",0)
        .transition()
        .duration(2400)  
        .ease("linear") 
        .attr("r",8);

    var mapBlink = setInterval(function(){
        d3.selectAll(".linePoint")
            .transition()
            .duration(1200)
            .ease("linear")
            .attr("r",6)
            .transition()
            .duration(1200)
            .ease("linear") 
            .attr("r",8);
    },2400);
});