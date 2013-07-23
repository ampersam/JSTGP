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


var colorSelector = {
	"makeColor": function (color) {
		document.getElementById("myBoxDiv").style.backgroundColor = color;
	}
	
};
var el = document.getElementById("greenDiv");
el.addEventListener("click", function () {colorSelector.makeColor("green")}, false);
*/


var body = {
	"natMax": {
		"human": 6,
		"elf": 6,
		"troll": 10,
		"dwarf": 8,
		"ork": 9
	},
	"init": {
		"human": 1,
		"elf": 1,
		"dwarf": 3,
		"ork": 4,
		"troll": 5
	}
};

var agility = {
	"natMax": {
		"human": 6,
		"elf": 7,
		"dwarf": 6,
		"ork": 6,
		"troll": 5
	},
	"init": {
		"human": 1,
		"elf": 2,
		"dwarf": 1,
		"ork": 1,
		"troll": 1
	}
};

var reaction = {
	"natMax": {
		"human": 6,
		"elf": 6,
		"dwarf": 5,
		"ork": 6,
		"troll": 6
	},
	"init": {
		"human": 1,
		"elf": 1,
		"dwarf": 1,
		"ork": 1,
		"troll": 1
	}
};

var strength = {
	"natMax": {
		"human": 6,
		"elf": 6,
		"dwarf": 8,
		"ork": 8,
		"troll": 10
	},
	"init": {
		"human": 1,
		"elf": 1,
		"dwarf": 3,
		"ork": 3,
		"troll": 5
	}
};

var willpower = {
	"natMax": {
		"human": 6,
		"elf": 6,
		"dwarf": 7,
		"ork": 6,
		"troll": 6
	},
	"init": {
		"human": 1,
		"elf": 1,
		"dwarf": 2,
		"ork": 1,
		"troll": 1
	}
};

var logic = {
	"natMax": {
		"human": 6,
		"elf": 6,
		"dwarf": 6,
		"ork": 5,
		"troll": 5
	},
	"init": {
		"human": 1,
		"elf": 1,
		"dwarf": 1,
		"ork": 1,
		"troll": 1
	}
};

var intuition = {
	"natMax": {
		"human": 6,
		"elf": 6,
		"dwarf": 6,
		"ork": 6,
		"troll": 5
	},
	"init": {
		"human": 1,
		"elf": 1,
		"dwarf": 1,
		"ork": 1,
		"troll": 1
	}
};

var charisma = {
	"natMax": {
		"human": 6,
		"elf": 8,
		"dwarf": 6,
		"ork": 5,
		"troll": 4
	},
	"init": {
		"human": 1,
		"elf": 3,
		"dwarf": 1,
		"ork": 1,
		"troll": 1
	}
};

var characterObj = {
	"attr": {
		"body": 0,
		"agility": 0,
		"reaction": 0,
		"strength": 0,
		"willpower": 0,
		"logic": 0,
		"intuition": 0,
		"charisma": 0
	},
	"maxAttr": {
		"body": 0,
		"agility": 0,
		"reaction": 0,
		"strength": 0,
		"willpower": 0,
		"logic": 0,
		"intuition": 0,
		"charisma": 0
	}
};

var priorities = {
	"attribute-points": 15
}

var rewriteAttrTable = function () {
	var attrArray = document.getElementsByClassName("attr");
	var metatype = el.value;
	for (var i = 0; i < attrArray.length; i += 1) {
		var currentAttr = eval(attrArray[i].innerHTML.toLowerCase());
		var currentAttrString = attrArray[i].innerHTML.toLowerCase();
		characterObj.attr[currentAttrString] = currentAttr.init[metatype];
		characterObj.maxAttr[currentAttrString] = currentAttr.natMax[metatype];
		attrArray[i].nextSibling.nextSibling.innerHTML = characterObj.attr[currentAttrString];
		attrArray[i].nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = characterObj.maxAttr[currentAttrString];
	}
}

var el = document.getElementById("metatypeSelector");
el.addEventListener('change', rewriteAttrTable, false);