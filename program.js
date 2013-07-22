//JS:TGP testing script
"use strict";


//Hex color randomizer code
/* 
var divCode = {
	"random256": function () {
		var x = Math.floor(Math.random() * 1000);
		if (x > 256) {
			return divCode.random256();
		}
		else {
			return x.toString(16).length === 2 ? x.toString(16) : "0" + x.toString(16);
		}
	},
	"randomColorHex": function () {
		var R = divCode.random256();
		var G = divCode.random256();
		var B = divCode.random256();
		return R + G + B;
	},
	"randomColorDiv": function () {
		document.getElementById("myBoxDiv").style.backgroundColor = divCode.randomColorHex();
	},
	"doIt": function (){
		setInterval(divCode.randomColorDiv, 125);
	}
};
*/

var colorSelector = {
	"makeColor": function (color) {
		document.getElementById("myBoxDiv").style.backgroundColor = color;
	}
	
};
var el = document.getElementById("greenDiv");
el.addEventListener("click", function () {colorSelector.makeColor("green")}, false);



