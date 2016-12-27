var plane = function(){
	var cities = [
	{
	    pos: [116.3,39.9],//纬经度
	    name: "Peking",
	    color: "#FFCCCC"
	},
	{
	    pos: [121.4,31.2],
	    name: "Shanghai",
	    color: "#F5CCFF"
	},
	{
	    pos: [116.0046,28.6633],
	    name: "nanchang",
	    color: "#CCFFD1"
	},
	{
	    pos: [106.551556, 29.56301],
	    name: "chongqing",
	    color: "#42C7FF"
	},
	{
	    pos: [113.27,23.12911 ],
	    name: "guangzhou",
	    color: "#8591FF"
	},
	{
	    pos: [108.366,22.817002 ],
	    name: "nanning",
	    color: "#E785FF"
	},
	{
	    pos: [ 91.17211,29.652491],
	    name: "lasa",
	    color: "#FF85CE"
	},
	{
	    pos: [109.84034900000006,40.657378 ],
	    name: "包头",
	    color: "#DFD362"
	},
	{
	    pos: [121.61468200000002,38.91400300000001 ],
	    name: "dalian",
	    color: "#7BDF62"
	},
	{
	    pos: [125.32354399999997, 43.817072],
	    name: "changchun",
	    color: "#DA9AEB"
	}];
	return cities;
}
module.exports=plane();



var projection = d3.geoMercator() 
    .center([107, 31])
    .scale(850)
    .translate([svgwidth/2, svgHeight/2]);

var path = d3.geoPath()
    .projection(projection);
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