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
        .scale(800)
        .translate([svgwidth/2, svgHeight/2]);

    var path = d3.geo.path()
        .projection(projection);

    var posCoor=function(opts){//位置函数
        return (
            "M"+opts.M0+" "+opts.M1+" "+"Q"+opts.Q0+" "+opts.Q1+" "+opts.Q3+" "+opts.Q4
            );
    }

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

    //标注点
    var location = svg.selectAll(".location")
        .data(PlaneGeoData)
        .enter()
        .append("g")
        .attr("class","location")
        .attr("transform",function(d){
            var coor = projection(d.pos);
            return "translate("+ coor[0] + "," + coor[1] +")";
        });

    var planeFlight=svg.append("g").attr("class","planeFlight");

    
    var proPlaces=[],createPlane;

    var flightPlane=function(){
        for(i=0;i<PlaneGeoData.length;i++){
            proPlaces.push(projection(PlaneGeoData[i].pos));
            //曲线

            svg.append("path")
            .attr('class', 'fline')
            .attr('d',posCoor({
                M0:proPlaces[0][0],
                M1:proPlaces[0][1],
                Q0:proPlaces[0][0],
                Q1:proPlaces[0][1],
                Q3:proPlaces[0][0],
                Q4:proPlaces[0][1]
            }))
            .transition()
            .duration(2000)
            .ease("linear")
            .attr('d',posCoor({
                M0:proPlaces[0][0],
                M1:proPlaces[0][1],
                Q0:(proPlaces[0][0]+proPlaces[i][0])/2-25,
                Q1:(proPlaces[0][1]+proPlaces[i][1])/2-10,
                Q3:proPlaces[i][0],
                Q4:proPlaces[i][1]
            }));

            planeFlight.append('rect')//飞机初始化
                .attr('class', 'singlePlane')
                .attr("fill","#a5c75d")
                .attr("width","15px")
                .attr("height","15px")
                .attr('opacity', '1')
                .attr("transform","translate("+(proPlaces[0][0]-7)+","+(proPlaces[0][1]-7)+")")
                .transition()
                .duration(5000)
                .ease("linear")
                .attr("transform","translate("+(proPlaces[i][0]-7)+","+(proPlaces[i][1]-7)+")");
        } 
    };
   var fltPlnInval=setInterval(flightPlane,5000);
    //内圈
    location.append("circle")
        .attr("class","point")
        .attr("r",0)
        .transition()
        .duration(2000)  
        .ease("linear") 
        .attr("r",5);
    //外圈
    location.append("circle")
        .attr("class","linePoint")
        .attr("r",0)
        .transition()
        .duration(2400)  
        .ease("linear") 
        .attr("r",8);
    //动态显示
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


    // 飞机运动
    var planeFlight=function(){
       
    }
});
