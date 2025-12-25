let age = 25;

var num;

var $name = "Atul";

// console.log($name);

// var x;
// console.log(x); // logs undefined

// let sum;
// console.log(sum); // logs undefined

// BAD PRACTICE
// const foo;  // SyntaxError: Missing initializer in const declaration

// GOOD PRACTICE
const $foo = "bar";
// console.log($foo); // Outputs "bar"

if (Math.random() > 0.5) {
  const y = 5;
}
// console.log(y); // ReferenceError: y is not defined

if (true) {
  var x = 5;
}
// console.log(x); // x is 5

// Hoisting

// var _x;
// console.log(_x === undefined); // true
// _x = 3;

// (function () {
//   var _x;
//   console.log(_x); // undefined
//   _x = "local value";
// })();

// (function () {
//   console.log($kag); // ReferenceError: Cannot access '$kag' before initialization
//   const $kag = "local value";

//   console.log(test); // ReferenceError: Cannot access 'test' before initialization
//   let test = "test value";
// })();

// console.log(parseInt("01101", 10));

// Literals

// Array Literals

// const myList = ["home", , "school"];
// console.log(myList); // [ 'home', <1 empty item>, 'school' ]

// const myList = ["home", "school", +"hospital"];

// console.log(myList);

// Tagged Templates

// const _name = "Mike";
// const _age = 25;

// function taggedTemplates(strings, ...expressions) {
//   const ageStr = expressions[1] < 100 ? "Youngster" : "Centenarian";

//   console.log(strings); // [ 'Hello! My name is ', '. I am ', ' years old.' ]
//   console.log(expressions); // [ 'Mike', 25 ]

//   return `${strings[0]}${expressions[0]}${strings[1]}${expressions[1]}${strings[2]} So, I am a ${ageStr}.`;
// }

// const output = taggedTemplates`Hello! My name is ${_name}. I am ${_age} years old.`;

// console.log(output); // Hello! My name is Mike. I am 25 years old. So, I am a Youngster.

// function add(a, b) {
//   /* An empty function */
// }

// console.log(add(1, 2));

// const person = {
//   name: "Alex",
//   sayName() {
//     console.log(this.name);
//   },
// };

// const fn = person.sayName;
// fn(); // undefined

// function show() {
//   console.log(this.value);
// }

// const a = { value: 10, show };
// const b = { value: 20, show };

// a.show();
// b.show();

// // Defining Functions

// // Constructor
// const multiply = new Function("x", "y", "return x * y");

// // Declaration
// function multiply(x, y) {
//   return x * y;
// } // No need for semicolon here

// // Expression; the function is anonymous but assigned to a variable
// const multiply = function (x, y) {
//   return x * y;
// };
// // Expression; the function has its own name
// const multiply = function funcName(x, y) {
//   return x * y;
// };

// // Arrow function
// const multiply = (x, y) => x * y;

// // Method
// const obj = {
//   multiply(x, y) {
//     return x * y;
//   },
// };

// Lexical this (arrow fn)

// const obj = {
//   name: "Ritik",
//   normal() {
//     console.log(this.name);
//   },
//   arrow: () => {
//     console.log(this.name);
//   },
// };

// obj.normal(); // Ritik
// obj.arrow(); // undefined

// // The simplest closure
// function outer() {
//   let count = 0;

//   function inner() {
//     count++;
//     console.log(count);
//   }

//   return inner;
// }

// const counter = outer();
// counter(); // 1
// counter(); // 2

// The classic loop bug (closure trap)

// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 100);
// }

// // Output
// // 3
// // 3
// // 3

// // Fix:

// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 100);
// }

// // Output
// // 0
// // 1
// // 2

// Memory leak via closures
function createHandler() {
  const bigData = new Array(1_000_000).fill("💣");

  return function handler() {
    console.log("clicked");
  };
}

const handler = createHandler();

// Creating Array (different ways)
// const arr1 = new Array(element0, element1, /* …, */ elementN);
// const arr2 = Array(element0, element1, /* …, */ elementN);
// const arr3 = [element0, element1, /* …, */ elementN];

// Array initialization

// const arr = [42]; // This creates an array with only one element: the number 42.

// const arr2 = Array(42); // This creates an array with no elements and arr2.length set to 42
// // OR
// const _arr2 = []; // This creates an array with no elements
// _arr2.length = 42; // _arr2.length set to 42

// // Property accessors

// const arr = ["one", "two", "three"];
// arr[2]; // three
// arr["length"]; // 3

// // Populating array
// const arr = [];
// arr[3.4] = "Oranges";
// console.log(arr.length); // 0
// console.log(Object.hasOwn(arr, 3.4)); // true

// // Iterating over arrays

// // Method 1
// const colors = ["red", "green", "blue"];
// for (let i = 0; i < colors.length; i++) {
//   console.log(colors[i]);
// }

// // Method 2
// const divs = document.getElementsByTagName("div");
// for (let i = 0, div; (div = divs[i]); i++) {
//   /* Process div in some way */
// }

// // Method 3
// const colors = ["red", "green", "blue"];
// colors.forEach((color) => console.log(color));
// // red
// // green
// // blue

// // Method 4
// const sparseArray = ["first", "second", , "fourth"];

// sparseArray.forEach((element) => {
//   console.log(element);
// });
// // Logs:
// // first
// // second
// // fourth

// if (sparseArray[2] === undefined) {
//   console.log("sparseArray[2] is undefined"); // true
// }

// const nonsparseArray = ["first", "second", undefined, "fourth"];

// nonsparseArray.forEach((element) => {
//   console.log(element);
// });
// // Logs:
// // first
// // second
// // undefined
// // fourth
