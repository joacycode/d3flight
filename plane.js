var cities = [
{
    pos: [39.9, 116.3],//纬经度
    name: "Peking",
    color: "#FFCCCC"
},
{
    pos: [31.2, 121.4],
    name: "Shanghai",
    color: "#F5CCFF"
},
{
    pos: [22.2, 114.2],
    name: "Hongkong",
    color: "#CCFFFF"
},
{
    pos: [28.6633,116.0046],
    name: "nanchang",
    color: "#CCFFD1"
},
{
    pos: [29.56301, 106.551556],
    name: "chongqing",
    color: "#42C7FF"
},
{
    pos: [23.12911, 113.27],
    name: "guangzhou",
    color: "#8591FF"
},
{
    pos: [22.817002, 108.366],
    name: "nanning",
    color: "#E785FF"
},
{
    pos: [29.652491, 91.17211],
    name: "lasa",
    color: "#FF85CE"
},
{
    pos: [40.657378, 109.84034900000006],
    name: "包头",
    color: "#DFD362"
},
{
    pos: [38.91400300000001, 121.61468200000002],
    name: "dalian",
    color: "#7BDF62"
},
{
    pos: [43.817072, 125.32354399999997],
    name: "changchun",
    color: "#DA9AEB"
}],
    mymap = L.map("flightMap", {
        zoom: 3,
        minZoom: 2,
        maxZoom: 4
    }).setView([37, 110], 3),
    southWest = L.latLng(-700, -200),
    northEast = L.latLng(700, 200);
bounds = L.latLngBounds(southWest, northEast),
mymap.setMaxBounds(bounds),
d3.json("./data/world_map.json", function (a, b)
    {
        function g()
        {
            for (var a = f.length - 1; a >= 0; a--) f[a].isEnd() ? f[a].isCleaning || (f[a].isCleaning = !0, f[a].delete(), f.splice(a, 1)) : (f[a].update(), f[a].render())
        }
        console.log(b);
        var c = topojson.feature(b, b.objects.countries);
        L.geoJSON(c, {
            style: {
                color: "#fffd4b",
                opacity: .5,
                weight: 1,
                fillColor: "black",
                fillOpacity: .2
            }
        }).addTo(mymap);
        var d = d3.select("#flightMap").select("svg"),
            f = (d.append("g"), []);
        mymap.on("zoomend", g),
        setInterval(function ()
            {
                if (f.length < 6 && Math.random() < .2)
                {
                    f.push(new Flight(mymap, d));
                    var a = Math.floor(3 * Math.random()),
                        b = Math.floor(4 + 10 * Math.random());
                    console.log(a + " " + b),
                    f[f.length - 1].setPlaneColor(cities[b].color),
                    f[f.length - 1].setRoadColor(cities[b].color),
                    f[f.length - 1].setBeginColor(cities[a].color),
                    f[f.length - 1].setEndColor(cities[b].color),
                    f[f.length - 1].init(
                        {
                            lat: cities[a].pos[0],
                            lng: cities[a].pos[1]
                        }, {
                            lat: cities[b].pos[0],
                            lng: cities[b].pos[1]
                        })
                }
                g()
            }, 25)
    });