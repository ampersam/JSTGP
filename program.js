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

var edge = {
	"natMax": {
		"human": 7,
		"elf": 6,
		"dwarf": 6,
		"ork": 6,
		"troll": 6
	},
	"init": {
		"human": 2,
		"elf": 1,
		"dwarf": 1,
		"ork": 1,
		"troll": 1
	}
};


var characterObj = {
	"metatype": undefined,
	"points": {
		"attribute": 0,
		"skill": 0,
		"karma": 25,
		"essence": 6
	},
	"condition": {
		"physical": {
			"current": 0,
			"max": 0
		},
		"stun": {
			"current": 0,
			"max": 0
		},
		"initCondition": function () {
			this.physical.max = Math.ceil((characterObj.attr.body)/2) + 8;
			this.stun.max = Math.ceil((characterObj.attr.willpower)/2) + 8;
			this.physical.current = this.physical.max;
			this.stun.current = this.stun.max;
		},
		"getPenalty": function () {	
			var x, y, result;
			result = 0;
			x = this.physical.max - this.physical.current;
			y = this.stun.max - this.stun.current;
			while (x >= 3) {
				x -= 3;
				result += 1;
			}
			while (y >= 3) {
				y -= 3;
				result += 1;
			}
			return -result;
		}
	},
	"attr": {
		"body": 0,
		"agility": 0,
		"reaction": 0,
		"strength": 0,
		"willpower": 0,
		"logic": 0,
		"intuition": 0,
		"charisma": 0,
		"edge": 0,
		"incAttr": function (attr, x) {
			if (x > 0) {
				if (this[attr] < characterObj.maxAttr[attr]) {
					this[attr] += x;
				}
			}
			if (x < 0) {
				if (this[attr] > 1) {
					this[attr] += x;
				}
			}
			refreshCalcs();
			redrawTables();
		}
	},			
	"maxAttr": {
		"body": 0,
		"agility": 0,
		"reaction": 0,
		"strength": 0,
		"willpower": 0,
		"logic": 0,
		"intuition": 0,
		"charisma": 0,
	},
	"secondaryAttr": {
		"initiative": {
			"dice": 0,
			"calcInitiative": function () {
				this.dice = characterObj.attr.reaction + characterObj.attr.intuition;
			}
		},
		"edge": {
			"current": 0,
			"natMax": 0,
			"initEdge": function(){
					this.current = edge.init[characterObj.metatype];
					this.natMax = edge.natMax[characterObj.metatype];
			}
		}
	},
	"limits": {
		"mental": 0,
		"physical": 0,
		"social": 0,
		"calcLimits": function () {
			var attr = characterObj.attr;
			this.mental = Math.ceil(((attr.logic * 2) + attr.intuition + attr.willpower)/3);
			this.physical = Math.ceil(((attr.strength * 2) + attr.body + attr.reaction)/3);
			this.social = Math.ceil(((attr.charisma * 2) + attr.willpower + characterObj.points.essence)/3);
		}
	}
};



//set standard order of attributes
var attributeArray = ["body", "agility", "reaction", "strength", "willpower", "logic", "intuition", "charisma"];
var limitArray = ["mental", "physical", "social"];

//jquery lite
var getTable = function (tableClass) {
	var array = document.getElementsByClassName(tableClass);
	return array;
};








//table drawing functions
var populateAttributeTable = function () {
	var array;
	array = getTable("attr");
	for (var i = 0; i < array.length; i += 1) {
		array[i].nextSibling.nextSibling.firstChild.nextSibling.innerHTML = characterObj.attr[attributeArray[i]];
		array[i].nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = characterObj.maxAttr[attributeArray[i]];
	}
};

var populateSecondaryAttrTable = function () {
	var array, i;
	array = getTable("secondaryAttr");
	for (i = 0; i < array.length; i += 1) {
		if (array[i].innerHTML === "Edge") {
			array[i].nextSibling.nextSibling.firstChild.nextSibling.innerHTML = characterObj.secondaryAttr.edge.current;
			array[i].nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = characterObj.secondaryAttr.edge.natMax;
		}
		else if (array[i].innerHTML === "Initiative") {
			array[i].nextSibling.nextSibling.innerHTML = characterObj.secondaryAttr.initiative.dice;
		}
	}
};

var populateLimitTable = function () {
	var array, i;
	array = getTable("limit");
	for (i = 0; i < array.length; i +=1) {
		array[i].nextSibling.nextSibling.innerHTML = characterObj.limits[limitArray[i]];
	}
};

var redrawTables = function () {
	populateAttributeTable();
	populateSecondaryAttrTable();
	populateLimitTable();
}






//CHARACTEROBJ AND ASSOCIATED CALCUATIONS
//pull characterObj data from the attribute objects
//!!!!warning will erase existing stored characterObj data!!!
var initCharacterObj = function (metatype) {
	var i;
	for (i = 0; i < attributeArray.length; i += 1) {
		characterObj.attr[attributeArray[i]] = window[attributeArray[i]].init[metatype];
		characterObj.maxAttr[attributeArray[i]] = window[attributeArray[i]].natMax[metatype];
	}
};

//all-inclusive attribute-based value refresh
var refreshCalcs = function () {
	characterObj.secondaryAttr.initiative.calcInitiative();
	characterObj.secondaryAttr.edge.initEdge();
	characterObj.limits.calcLimits();
	characterObj.condition.initCondition();
}

//initial population from the metatype selection
var metatypePopulate = function () {
	characterObj.metatype = document.getElementById("metatypeSelector").value;
	initCharacterObj(characterObj.metatype);
	refreshCalcs();
	redrawTables();
	document.getElementById("tablesDiv").className = "";

};







//UI FUNCTIONS
var lockUnlockMetatype = function () {
	var x = document.getElementById("metatypeSelector");
	if (!x.disabled) {
		x.disabled = true;
		document.getElementById("metatypeLock").src = "images/locked.png";
	}
	else {
		x.disabled = false;
		document.getElementById("metatypeLock").src = "images/unlocked.png";
	}
}

var hideArrows = function (x) {
	var el = getTable("current");
	var i;
	if (x) {
		x.previousSibling.className = "hidden";
		x.nextSibling.className = "hidden";
		return;
	}
	for (i = 0; i < el.length; i += 1) {
		el[i].previousSibling.className = "hidden";
		el[i].nextSibling.className = "hidden";
	}
}

var toggleArrows = function () {
	var i;
	var x = document.getElementById("selected");
	if (this.previousSibling.className === "hidden") {
		this.id = "selected"
		this.previousSibling.className = "notHidden";
		this.nextSibling.className = "notHidden";
	} 
	if (x) {
		x.id = "";
		hideArrows(x);
	}
};

var upAttr = function () {
	var attr = this.parentNode.previousSibling.previousSibling.innerHTML.toLowerCase();
	console.log(attr);
	if (attr === "edge") {
		if (characterObj.secondaryAttr.edge.current < characterObj.secondaryAttr.edge.natMax) {
			characterObj.secondaryAttr.edge.current += 1;
			redrawTables();
		}
	}
	else {
		characterObj.attr.incAttr(attr, 1);
	}
};
var downAttr = function () {
	var attr = this.parentNode.previousSibling.previousSibling.innerHTML.toLowerCase();
	if (attr === "edge") {
		if (characterObj.secondaryAttr.edge.current > 0) {
			characterObj.secondaryAttr.edge.current -= 1;
			redrawTables();
		}
	}
	else {
		characterObj.attr.incAttr(attr, -1);
	}
};





//onload event listeners
var el;
el = document.getElementById("metatypeSelector");
el.addEventListener('change', metatypePopulate, false);
el = document.getElementById("metatypeLock");
el.addEventListener('click', lockUnlockMetatype, false);
el = getTable("current");
for (var i = 0; i < el.length; i += 1) {
	el[i].addEventListener('click', toggleArrows, false);
	el[i].previousSibling.addEventListener('click', upAttr, false);
	el[i].nextSibling.addEventListener('click', downAttr, false);
}
hideArrows();