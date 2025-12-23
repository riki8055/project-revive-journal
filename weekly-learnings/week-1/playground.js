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

const obj = {
  name: "Ritik",
  normal() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  }
};

obj.normal(); // Ritik
obj.arrow();  // undefined
