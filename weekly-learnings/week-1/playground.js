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

(function () {
  console.log($kag); // ReferenceError: Cannot access '$kag' before initialization
  const $kag = "local value";

  console.log(test); // ReferenceError: Cannot access 'test' before initialization
  let test = "test value";
})();
