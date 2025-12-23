Month 1 > Week 1 > Day 1

## Declarations

JavaScript has three kinds of variable declarations.

1. **var**

   Declares a variable, optionally initializing it to a value.

2. **let**

   Declares a block-scoped, local variable, optionally initializing it to a value.

3. **const**

   Declares a block-scoped, read-only named constant.

---

## A Fundamental Confusion!

### Difference between Variable and Identifier

#### Core difference _(short & precise)_

**Variable** → a **thing** that stores a value in memory

**Identifier** → the **name** you use to refer to that thing

#### Reality-first mental model

- **Variable** = box in memory

- **Identifier** = label stuck on that box

You interact with the **label**, but the **box** is what actually holds the value.

#### In code _(JavaScript example)_

<!-- ![image](codesnaps/var_idt.png) -->
<img src="codesnaps/var_idt.png" width=200 />

Break it down:

| **Part**  | **What it is**           | **Meaning**              |
| --------- | ------------------------ | ------------------------ |
| `age`     | **Identifier**           | The name                 |
| `let age` | **Variable declaration** | Creating the box         |
| `25`      | **Value**                | What goes inside the box |

---

## Declaring Variables

You can declare a variable in two ways:

1. With the keyword `var`. For example, `var x = 42`. This syntax can be used to declare both **local** and **global** variables, depending on the execution context.

2. With the keyword `const` or `let`. For example, `let y = 13`. This syntax can be used to declare a **block-scope** local variable.

> 💡 Variables should always be declared before they are used. JavaScript used to allow assigning to undeclared variables, which creates an undeclared global variable. This is an error in strict mode and should be avoided altogether.

## Declaration & Initialization

- In a statement like `let x = 42`, the `let x` part is called a **declaration**, and the` = 42` part is called an **initializer**.

- The declaration allows the variable to be accessed later in code without throwing a `ReferenceError`, while the initializer assigns a value to the variable.

- In `var` and `let` declarations, the initializer is **optional**. If a variable is declared without an initializer, it is assigned the value **undefined**.

- Refer to the exhibit for `let` & `var`:

   <img src="codesnaps/code2.png" width=300 />

- In essence, `let x = 42` is equivalent to `let x; x = 42`.

- `const` declarations always need an initializer, because they forbid any kind of assignment after declaration, and implicitly initializing it with `undefined` is likely a programmer mistake.

- Refer to the exhibit for `const`:

   <img src="codesnaps/code3.png" width=400 />

## Variable Scope

A variable may belong to one of the following scopes:

- **Global scope:** The default scope for all code running in script mode.

- **Module scope:** The scope for code running in module mode.

- **Function scope:** The scope created with a function.

In addition, variables declared with `let` or `const` can belong to an additional scope:

- **Block scope:** The scope created with a pair of curly braces _(a block)_.

> 💡 When you declare a variable outside of any function, it is called a **global variable**, because it is available to any other code in the current document.

> 💡 When you declare a variable within a function, it is called a **local variable**, because it is available only within that function.

`let` and `const` declarations can also be scoped to the block statement that they are declared in.

Refer to the exhibit below for `let` & `const` declarations:

<img src="codesnaps/code4.png" width=400 />

However, variables created with `var` are **not** block-scoped, but only local to the function (or global scope) that the block resides within.

Refer to the exhibit below for `var` declaration:

<img src="codesnaps/code5.png" width=300 />

## Variable Hoisting

- `var`-declared variables are **hoisted**, meaning you can refer to the variable anywhere in its scope, even if its declaration isn't reached yet.

- You can see var declarations as being "lifted" to the top of its function or global scope.

- However, if you access a variable before it's declared, the value is always `undefined`, because only its declaration and default initialization _(with `undefined`)_ is hoisted, but not its value assignment.

- Refer to the exhibit below for hoisting `var` declaration:

   <img src="codesnaps/code6.png" width=300 />

  The above examples will be interpreted the same as:

   <img src="codesnaps/code6.1.png" width=300 />

- In the case of `let` & `const`, referencing the variable in the block before the variable declaration always results in a `ReferenceError`, because the variable is in a **"temporal dead zone"** from the start of the block until the declaration is processed.

- Refer to the exhibit below for hoisting `let` & `const` declaration:

   <img src="codesnaps/code7.png" width=400 />

## Tagged Templates

- A more advanced form of template literals are tagged templates.

- Tags allow you to parse template literals with a function. The first argument of a tag function contains an array of string values. The remaining arguments are related to the expressions.

- The tag function can then perform whatever operations on these arguments you wish, and return the manipulated string. _(Alternatively, it can return something completely different, as described in one of the following examples in the exhibit.)_

   <img src="codesnaps/code8.png" width=600 />

> 💡 A tagged template is just a function call — written in a special syntax.

---
Month 1 > Week 1 > Day 2

### Defining functions

- There are special syntaxes for defining **arrow functions** and **methods**, which provide more precise semantics for their usage.

- Classes are conceptually not functions _(because they throw an error when called without `new`)_, but they also inherit from `Function.prototype` and have `typeof` `MyClass === "function"`.

<!-- Paste screenshot of `Defining Functions` code snippet from playground.js -->

All syntaxes do approximately the same thing, but there are some subtle behavior differences.

- The `Function()` constructor, `function` expression, and `function` declaration syntaxes create full-fledged function objects, which can be constructed with `new`. However, arrow functions and methods cannot be constructed. Async functions are not constructible regardless of syntax.

- The `function` declaration creates functions that are **hoisted**. **Other syntaxes** do not hoist the function and the function value is only visible **after the definition**.

- The arrow function and `Function()` constructor always create anonymous functions, which means they can't easily call themselves recursively. One way to call an arrow function recursively is by assigning it to a variable.

- The arrow function syntax does not have access to `arguments` or `this`.

- The `Function()` constructor cannot access any local variables — it only has access to the global scope.

- The `Function()` constructor causes runtime compilation and is often slower than other syntaxes.

> 💡 Arrow functions capture this from the surrounding scope at the time they are created. This is called lexical `this`.

- Refer to the exhibit below for lexical `this` (arrow fn):

<!-- Paste screenshot of Lexical this (arrow fn) code snippet from playground.js -->

Why?
- `normal()` → `this = obj`
- `arrow()` → `this` comes from outer scope, not obj

### Function Scope & Closures

- Functions form a scope for variables—this means variables defined inside a function cannot be accessed from anywhere outside the function.

- The function scope inherits from all the upper scopes. For example, a function defined in the global scope can access all variables defined in the global scope.

- A function defined inside another function can also access all variables defined in its parent function, and any other variables to which the parent function has access. On the other hand, the parent function (and any other parent scope) does not have access to the variables and functions defined inside the inner function. This provides a sort of encapsulation for the variables in the inner function.

### Closures

- A parent scope that defines some variables or functions. It should have a clear lifetime, which means it should finish execution at some point. **Any scope that's not the global scope satisfies this requirement; this includes blocks, functions, modules, and more**.

- An inner scope defined within the parent scope, which refers to some variables or functions defined in the parent scope.