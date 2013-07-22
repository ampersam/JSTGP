//Javascript the Good parts
//notes

//the 'falsy' values - will always count as false or negative in any truth-checking situation
false
null
undefined
'' 
0
NaN
//the truthy values include all other values but primarily
true
1

//when using for/in loops, it is often necessary to use an if statement and the .hasOwnProperty method to ensure that the property name truly belongs to an object in question and is not part of the prototype
for (x in obj) {
	if (obj.hasOwnProperty(x)) {
		//do a thing...
	}
}

//operator precedence
. () []  				//refinement and invocation
delete new typeof + - ! //unary operators
* / % 					//multiplication, division, remainder
+ - 					//addition/concatenation, subtraction
< > <= >= 				//inequality
=== !== 				//equality
%%						//logical AND
|| 						//logical OR
?:						//ternary



//OBJECTS

//the simple types of data in js are numbers, strings, booleans, null, and undefined. all else is objects.
//arrays are objects. functions are objects. regular expressions are objects.

//an object is a container of properties: each property has a name and a value
//a property name can be any string even the empty string
//a property value can be anything except undefined

//object literals
var empty_object = {};
var stooge = {
	"first-name": "Jerome",
	"last-name": "Howard"
};
//the quotes around a property's name are optional if it would be a legal javascript name
//commas, not semicolons, separate name/value pairs
//object literals can contain more object literals (they can nest)
var flight = {
	airline: "Oceanic",
	number: 815;
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},					//comma after the closed bracket that finishes the property of departure
	pilot: "John Smith"
};

//can retrieve values from an object by wrapping a string expression in []
//if the name is a legal js name and not a reserved word, . notation can be used
stooge["first-name"];	//jerome
flight.departure.IATA;	//SYD
flight.airline === flight["airline"]
//the undefined value is produced if a non-existant property is retrieved
stooge["middle-name"] 	//undefined
flight.status			//undefined
//the OR operator can be used to return default values where none exist
var status = flight.status || "unknown";	//returns unknown since flight.status is falsy
//try to retreive properties from inside an already undefined property will return a TypeError exception
flight.equipment							//undefined
flight.equipment.model 						//TypeError
flight.equipment && flight.equipment.model	//undefined

//a value inside and object can be updated by assignment
//if the name already exists, the value is replaced
stooge["first-name"] = 'Jerome';
//if the property name doesn't exist, the object is augmented with the new property
stooge.nickname = "Curly";
flight.equpment = {
	model: "Boeing 777"
}
//objects are passed around by reference, never copied
//any modifcation through the reference affects the original object
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
nick === "Curly";	//true

var a = {}, b = {}, c = {};	//a b and c each refer to DIFFERENT empty objects
a = b = c = {};				//a b and c all refer to the same empty object

//every object is created from a prototype object from which it inherits properties
//all object-literal creations are linked to Object.prototype, a standard js prototype
//when a new object is created, you can select its prototype 
//normally a messy business, but can be simplified by using this .create method
//creates a new object that uses the old object as its prototype
if (typeOf Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}
var another_stooge = Object.create(stooge);
//updating an object has no effect on its respective prototype
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = "Moe";
//the prototype link only comes up again in retrieval
//trying to retrieve the property of an object that doesn't have that property forces the script to check the prototype for that property
//this process drills all the way down to the basic Object.prototype; this is called delegation

//prototype relationships are dynamic - adding a property to a prototype grants that property to all objects created from that prototype
stooge.profession = 'actor';
another_stooge.profession 	//returns 'actor' as the profession property will attach to all objects derived from the stooge prototype

//can determine the properties of an object by attempting to retrieve the properties and inspecting the values returned
//typeOf is a useful tool
typeOf flight.number	//'number'
typeOf flight.status	//'string'
typeOf flight.departure	//'object'
typeOf flight.manifest	//'undefined'
//any property on the prototype chain will also produce a value so be careful
typeOf flight.toString	//'function'
//can deal with methods being returned by having the program disregard returned function values
//hasOwnProperty is the other approach, which examines an object for the given property but DOES NOT inspect the prototype chain
flight.hasOwnProperty('number')		//true
flight.hasOwnProperty('toString')	//false

//a for/in loop is useful for enumerating all the properties of an object but WILL consult the prototype chain
//use of hasOwnProperty or the check for a function as a conditional will solve the problem
var name;
for (name in another_stooge) {
	if (typeOf another_stooge[name] !== "function") {
		//do a thing...
	}
}
//order of property names is NOT guaranteed, best to use an array containing the property names in the correct order for your purposes
var i;
var properties = ['first-name','middle-name','last-name','profession'];
for (i in properties) {
	return stooge[properties[i]];
}
//returns only the properties listed in the properties array (avoiding any prototype delegation issues) and returns them in the array's order

//the delete operator will remove a property from an object
//does not affect any prototype delegation
//removing a property from an object that is also found in the prototype will cause the prototype's property to 'shine through' into the object
another_stooge.nickname		//'Moe'
delete another_stooge.nickname
another_stooge.nickname 	//'Curly'

//js lets you define global variables that are available to your entire program but they are a vulnerability and often create bugs
//one way to avoid global variables is to create a single global variable that holds the entire application
var MYAPP = {};
MYAPP.stooge = {"first-name": "Joe", "last-name":"Howard"};
//global variables can cause problems with other applications, widgets, or libraries


//FUNCTIONS

//functions are objects
//function objects link to the Function.prototype which itself links to Object.prototype
//functions are created with two hidden properties, the function's context and the code the implements the function's behavior

//function literals
var add = function (a, b) {
	return a + b;
}
//first part: reserved word 'function' that specifies what it is
//second part: optional name, functions can also be anonymous
//third part: parameters of the function; stored as variables; variables do not start as undefined, they are initialized as the arguments called by the function
//fourth part: body of the function; executed when the function is invoked

//function literals can appear anywhere an expression can appear including inside other functions
//inner functions will have access to the envrionment created by their enclosing function
//the function object contains a link to the outer context of the function -- this is called 'closure' 

//invoking a function suspends the currently running code and passes control and all parameters to the new function
//additonally, the invoked function receives two more properties: "this" and "arguments"
//the value of .this is determined by the function's invocation pattern

//invocation patterns
//four types of invocation patterns: method, function, constructor, and apply
//the invocation pattern determines how the property "this" is initialized
//the invocation operator is a pair of parentheses containing zero or more expressions

//method invocation pattern
//when a function is stored as property in a object, it is called a METHOD
//when the method is invoked, "this" is bound to the object containing the invoked method
var myObject = {
	value: 0;
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1;	//considers the value of 'value' inside 'this', which means this object
	}
}
myObject.increment(); 	//1
myObject.increment(2); 	//3

//function invocation pattern
//when a function is not the property of an object it can be invoked normally:
var sum = add(3,4);	//7
//when a function is invoked like so, "this" is bound to the global object
//as a consequence, a method cannot employ an inner function to do its work because the inner function does not share the method's access to its parent object
//you can assign "this" within the method to a variable to give an inner function access to that value
//by convention, this workaround variable is called "that"
myObject.double = function () {
	var that = this;				//the workaround
	var helper = function () {		//the inner function, where normally a "this" call would consult .value of the global object
		that.value = add(that.value, that.value);
	};
	helper();
}

//constructor invocation pattern
//js is a prototyal inheritance language (most other common langauges are classical)
//invoking a function with the "new" prefix creates an object with a hidden link to the value of the function's prototype memeber
//"this" will refer to that new object
//"new" also changes the behavior of return
var Quo = function (string) {
	this.status = string;
};
Quo.prototype.get_status = function () {
	return this.status;
};
var myQuo = new Quo("confused");
myQuo.get_status(); //confused
//function designed to be used with the "new" prefix are called constructors
//convetion designates that they be kept in variables with capitalized names because calling them as normal functions will break.everthing.
//that said, don't use this constructor method!

//apply invocation pattern
//because functions are objects, functions themselves can have methods
//apply lets us construct an array of arguments to use to invoke a function
//apply takes two parameters: the first will be bound to "this" and the second is the array of parameters
var array = [4, 3];
var sum = add.apply(null, array); //sum = 7

var statusObject = {
	status: "A-OK"
};
//statusObject won't inherit from Quo.prototype
//can still invoke the get_status method ON it, though
var status = Quo.prototype.get_status.apply(statusObject);	//A-OK


//another bonus parameter available to functions is the "arguments" array
//gives access to all the arguments of the function, even those not bound to the available parameters
//allows functions to take an unlimited number of parameters
var addThings = function () {
	var sum;
	for (var i in arguments) {
		sum += arguments[i];
	}
	return sum;
};
//arguments is an array-like object, not an array
//has a "length" property but does not auto-update; has no other standard array methods


//return statements
//normally, a function executes sequentially through its statements and ends at the closing } 
//return breaks out of that context, ignoring any remaining statements
//a function always returns a value; if the return value is not specified, it will always return "undefined"
//if a function was invoked a constructor and the return value is not an object, "this" (the new object) is returned instead

//exceptions
//exceptions are mishaps that interfere with the program's normal flow
//when something happens like that, it should stop and throw an exception
var add = function (a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: "TypeError",
			message: "wrong input type"
		};
		return a + b;
	}
//similar to return, throw interrupts the execution of the function
//should generally return an object with a name and message property
//the exception object will be delivered to the catch clause of a try statement
var handler = function () {
	try {
		add("four", 3);
	} catch (e) {
		console.log(e.name + ": " + e.message);
	}
}

//if an exception is thrown inside a try block, control will go to the catch clause
//a try statement can only have a single catch clause; if the handling depends on the type of exception, that clause inspect the name and determine the action itself

//augmenting types
//js allows the basic types to be augmented through their prototypes
//for instance adding a method to Object.prototype adds that method to all objects
//similarly, we can augment Function.prototype for the same goal
Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
}
//now we can construct new methods directly with other functions
//for instance, we can create a method to automatically create an integer out of a floating point number
//uses either the Math.ceil or Math.floor methods to round up or down appropriately
Number.method('integer', function () {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});
(-10 / 3).integer();	//-3
//or, we can create a string method to remove any trailing spaces
//this will use a regular expression which is greek shit but covered later
String.method('trim', function () {
	return this.replace(/^\s+|\s$/g, '');
});
'"' + "    neat     ".trim() + '"';

//prototypal inheritance means that ALL values, even ones created before the prototype received the new method, will have access to that new method
//mixing js libraries can sometimes cause methods to be in conflict, so it's a good idea to only conditionally add a method
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
		return this;
	}
};
//remember that for/in statements will produce weird results with a lot of prototypes, so be sure to use at least the hasOwnProperty workaround


//recursion
//a technique in which a larger problem is divided into smaller subproblems with trivial solutions
//tower of hanoi is a popular problem that can be solved using a recursive solution
var hanoi = function hanoi(disc, src, aux, dst) {
	if (disc > 0) {
		hanoi(disc - 1, src, dst, aux);
		console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst);
		hanoi(disc - 1, aux, src, dst);
	}
}
hanoi(3, 'Src', 'Aux', 'Dst')
//this function moves a stack of discs from one post to another, using the auxiliary post if necessary
//breaks the problem into three subproblems
//1. uncovers the bottom disc by moving the rest of the stack to the auxiliary post
//2. moves the bottom disc to the destination post
//3. move the substack to the destination post
//movement of the substack is handled by recursively calling the function to work on the subproblems of that problem
//the function is passed the number of discs it is to move and the three posts to use
//when it calls itself, the recursive function deals with the disc above the originally selected disc 
//this proceeds until recursion calls a nonexistent disc number

//more practically, recursive functions are often used for manipulating tree elements like the browser's DOM
//each recursive call gets a smaller piece of the tree to 'work' on
//Walk-the-DOM function that visits every node of the HTML tree and performs the specified function on each node then on each child node, etc.
var walk_the_DOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node.func);
		node = node.nextSibling;
	}
};
//then we can make a function that goes over every entry in the DOM and creates an array of all the nodes that match a given attribute
var getElementsbyAttribute = function (att, value) {
	var results = [];
	walk_the_DOM(document.body, function (node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
			results.push(node);
		}
	});
	return results;
}

//some langauges offer tail recursion optimization, which means that functions that return themselves (tail recursion) are optimized into al oop
//js does not do this, and so deep recursions can often fail by exhausting the return stack
var factorial = function factorial(i, a) {
	a = a || 1;
	if (i < 2) {
		return a;
	}
	return factorial(i - 1, a * i);
}
factorial(4); 	//returns 24


//scope
//scope refers to the visibility and lifetime of the variables and parameters that are contained in any code
//see this example for how varibles gain and lose values
var foo = function () {
	var a = 3, b = 5;
	var bar = function () {
		var b = 7, c = 11;
		//right now, a = 3, b = 7, c = 11
		a += b + c;
		//at this point, a = 21, b = 7, c = 11
	};
	//at this point, a = 3, b = 5, c = undefined
	bar();
	//now, a = 21, b = 5
};
//js does not have block scope - brackets will never determine the scope of variables
//js's scope is function-based - parameters and variables defined within a function are not visible outside it but are visible inside it, including in inner functions
//js best practice is to declare all variables immediately inside the scope they will be used in (generally at the top of a function body)


//closure
//closure rules determine that the inner functions get access to variables declared by their outer functions
//this and arguments are exceptions, always referring to the global context (in the case of function invocation) for the former and the arguments of the function calling the arguments variable for the latter
//an inner function can have a longer lifetime than its outer function
//an earlier example made a myObject with a value and increment method, suppose we wanted to protect value from being changed by unauthorized sources
//myObject was initialized as an object literal - if instead we call a function initializes the object literal, the value variable within the object within the function will not be available to any context outside the function
var myObject = (function () {
	var value = 0;
	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue: function () {
			return value;
		}
	};
}());
//we are not assigning the function to the variable, we are assigning the result of running the function
var quo = function (status) {
	return {
		get_status: function () {
			return status;
		}
	};
};
//when we call quo, it returns an object with a get_status method; the reference to that object gets stored in myQuo
//get_status method has privledged access to quo's status property even though quo has been returned
//this is possible because the function has access to the context in which it was created -- this is called closure

//a more useful example
//a function that sets a DOM node's color to yellow then fades it to white
var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);	//changes the value of level to hexadecimal
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if (level < 15) {
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
}
fade(document.body);
//step always has access to the variable level because even though fade() has returned, the variables live on as long as an inner function needs them

//necessary to understand that variables passed around inside functions are the ACTUAL variables and not copies of them 
//BAD EXAMPLE
var add_the_handlers = function (nodes) {
	var i;
	for (i = 0, i < nodes.length, i += 1) {
		nodes[i].onclick = function (e) {
			alert[i];
		};
	}
};
//BETTER VERSION
var add_the_handlers = function (nodes) {
	var helper = function (i) {
		return function (e) {
			alert(i);
		};
	};
	var i;
	for (i = 0; i < nodes.length; i += 1) {
		nodes[i].onclick = helper(i);
	}
}
//avoid creating a function within a loop in general; it is inefficient and prone to the above confusion


//callbacks
//functions can also be used to deal with discontinuous events - suppose this sequence of events:
//user interaction, page makes a request to the server, and then display the server's response
//the inefficient way to write that code would be like so:
request = prepare_the_request();
response = send_request_synchronously(request);
display(response);
//the problem is that if the network is slow to respond, the code will hang on the second step
//better solution is to make an asychronous request that is returned immediately and invokes a callback when the request is received
request = prepare_the_request();
send_request_asychronously(request, function (response) {
	display(response);
});
//the function parameter then is called when the response is available


//modules
//we can combine usage of functions and closure closure to create modules
//a module is a functional interface that hides its state and implementation from non-module related functions
//use of modules is an effective method to avoid using global variables, the bane of javascript

//as an example, let's create a module to augment String with a deentityify method (finds escaped HTML characters and replaces them with the appropriate character)
String.method('deentityify', function () {
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};
	return function () {
		return this.replace(/&([^&;]+);/g, function (a, b) {
			var r = entity[b];
			return typeof r === 'string' ? r : a;
		});
	};
}());
'&lt;&quot;&gt'.deentityify();		//<">
//in this case, only the deentityify method has access to the data stored in 'entity'
//here's another example of how to use a secure object inside a module
var serial_maker = function () {
	var prefix = '';
	var seq = 0;
	return {
		set_prefix: function (p) {
			prefix = String(p);
		},
		set_seq: function (s) {
			seq = s;
		},
		gensym: function () {
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();	//unique = Q1000
//thus seqer.gensym() can be passed into third party functions but will not expose any of the data or allow manipulation of the prefix or sequence


//cascades
//some methods are designed solely to change the state of an object; these methods usually do not 'return' anything
//if we have those methods return 'this' instead of undefined, this will create a cascade
//a cascade allows us to call a variety of methods on a single object in a single statement
//an example, from AJAX
getElement('myBoxDiv')
	.move(350, 150)
	.width(100)
	.height(100)
	.color('red')
	.border('10px outset')
	.padding('4px')
	.appendText("Please stand by")
	.on('mousedown', function (m){
		this.startDrag(m, this.getNinth(m));
	})
	.on('mousemove', 'drag')
	.on('mouseup', 'stopDrag')
	.later(2000, function () {
		this
			.color('yellow')
			.setHTML("What hath god wrought?")
			.slide(400, 40, 200, 200);
	})
	tip('This box is resizeable');
//in this example, the getElement function produces an object attached to the DOM element with id=myBoxDiv with all the attached methods
//each method returns the object, so each subsequent invocation result can be used for the next invocation

//TEST EXERCISES
//from http://www.ling.gu.se/~lager/kurser/webtechnology/lab4.html
//1. define a function that takes two arguments and returns the highest number of the two
var maxOfTwo = function (a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: "TypeError",
			message: "Wrong input type"
		};
	}
	return Math.max(a,b);
}
//2. define a function maxOfThree() that does the same for three numbers -- or any numbers!
var maxOfAll = function() {
	var result = 0;
	var i;
	for (i in arguments) {
		if (arguments[i] > result) {
			result = arguments[i];
		}
	}
	return result;
}
//3. write a function that takes a character (aka string with a length of one) and returns true if its a vowel and false otherwise
var isVowel = function (string) {
	if (string.length !== 1 || typeof string !== 'string') {
		return {
			name: "Bad input"
			message: "check input type or length"
		}
	}
	var vowels = ["a", "e", "i", "o", "u"];
	for (var i in vowels) {
		if (string === vowels[i]) {
			return true;
		}
	}
	return false;
}
//4. write a function that takes a string, doubles every consonant and then places "o" in between the doubled letters
var translate = function(string) {
	var array = string.split('');
	for (var i in array) {
		if (!isVowel(array[i])) {
			array[i] = array[i] + "o" + array[i];
		}	
	}
	return array.join('');
}
//5. define a function sum and multiply that take an array of numbers and do the appropriate operation on the entire array
var sum = function (array) {
	var result = 0;
	for (var i in array) {
		result += array[i];
	}
	return result;
}
var multiply = function(array) {
	var result = 1;
	for (var i in array) {
		result *= array[i];
	}
	return result;
}
//6. define a function that takes a string and returns its inverse (hotdogs -> sgodtoh)
var reverse = function (string) {
	var array = string.split('');
	var result = [];
	for (var i = array.length; i >= 0; i -= 1) {
		result.push(array[i]);
	}
	return result.join('');
}
//7. create an object with some simple 1:1 word translation replacement and use it with a function to translate a sentence
var words = {
	"who": "wer",
	"where": "wo",
	"when": "wenn",
	"why": "warum",
	"how": "wie"
};
var intoGerman = function (string) {
	var array = string.split(' ');
	for (var i in array) {
		if (words[array[i]]) {
			array[i] = words[array[i]];
		}
	}
	return array.join(' ');
}
//8. define a function findLongestWord() which does what it says to a string of words
var findLongestWord = function (string) {
	var array = string.split(' ');
	var result = '';
	for (var i in array) {
		if (array[i].length > result.length) {
			result = array[i];
		}
	}
	return result;
}
//9. define filterLongWords() which takes a string and a number and filters out any words longer than the number
var filterLongWords = function (string, num) {
	var array = string.split(' ');
	var result = [];
	console.log(array[1]);
	for (var i = 0; i < array.length; i += 1) {
		if (array[i].length <= num) {
			result.push(array[i]);
		}
	}
	return result;
}
//10. define charFreq() that takes a string and returns an object listing the frequency of each letters
var charFreq = function (string) {
	var result = {};
	while (string !== '') {
		var letter = string.charAt(0);
		if (result[letter]) {
			result[letter] += 1;
		}
		else {
			result[letter] = 1;
		}
		string = string.slice(1);
	}
	return result;
}
charFreq("abbabcbdbabdbdbabababcbcbab");