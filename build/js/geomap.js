/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* geomap.js | xiaozhang
	* 2016.12.25
	*/
	__webpack_require__(1);

	var svgwidth = "100%",
	    svgHeight = "800",
	    rectPadding = 4;
	//添加svg画布 
	var svg = d3.select('body').append("div").attr('id', 'flightMap').append('svg').attr('width', svgwidth).attr('height', svgHeight).attr("transform", "translate(0,0)");

	// var mapFlight=require("./geo_flight.js");
	// var allPlanes=require("./geo_plane.js");

	var cities = [{
	    pos: [39.9, 116.3],
	    name: "Peking",
	    color: "#FFCCCC"
	}, {
	    pos: [31.2, 121.4],
	    name: "Shanghai",
	    color: "#F5CCFF"
	}, {
	    pos: [22.2, 114.2],
	    name: "Hongkong",
	    color: "#CCFFFF"
	}, {
	    pos: [24.9, 121, 5],
	    name: "Taipei",
	    color: "#CCFFD1"
	}, {
	    pos: [41.9, 12.4],
	    name: "Roma",
	    color: "#42C7FF"
	}, {
	    pos: [48.8, 2.27],
	    name: "france",
	    color: "#8591FF"
	}, {
	    pos: [52.5, 13.5],
	    name: "berlin",
	    color: "#E785FF"
	}, {
	    pos: [51.6, 0],
	    name: "London",
	    color: "#FF85CE"
	}, {
	    pos: [9, 38.8],
	    name: "Addis Ababa",
	    color: "#DFD362"
	}, {
	    pos: [-25.7, 28.2],
	    name: "Pretoria",
	    color: "#7BDF62"
	}, {
	    pos: [-33.85, 151.21],
	    name: "Sydney",
	    color: "#DA9AEB"
	}, {
	    pos: [40.7, -74.01],
	    name: "New York",
	    color: "#62DFDF"
	}, {
	    pos: [37.4, -121.88],
	    name: "San Francisco",
	    color: "#EB9A9A"
	}, {
	    pos: [35.7, 139.1],
	    name: "Tokyo",
	    color: "#85FFFF"
	}],
	    mymap = L.map("flightMap", {
	    zoom: 2,
	    minZoom: 2,
	    maxZoom: 2
	}).setView([37, 110], 3),
	    southWest = L.latLng(-700, -200),
	    northEast = L.latLng(700, 200),
	    bounds = L.latLngBounds(southWest, northEast);
	mymap.setMaxBounds(bounds);
	d3.json("/build/static/world_map.json", function (a, b) {
	    function g() {
	        for (var a = f.length - 1; a >= 0; a--) f[a].isEnd() ? f[a].isCleaning || (f[a].isCleaning = !0, f[a].delete(), f.splice(a, 1)) : (f[a].update(), f[a].render());
	    }
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
	    mymap.on("zoomend", g);
	    setInterval(function () {
	        if (f.length < 7 && Math.random() < .3) {
	            f.push(new Flight(mymap, d));
	            var a = Math.floor(10 * Math.random()),
	                b = Math.floor(4 + 10 * Math.random());
	            f[f.length - 1].init({
	                lat: cities[a].pos[0],
	                lng: cities[a].pos[1]
	            }, {
	                lat: cities[b].pos[0],
	                lng: cities[b].pos[1]
	            });
	        }
	        g();
	    }, 100);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);