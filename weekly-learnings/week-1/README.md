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

## Functions

- A function is a "subprogram" that can be called by code external (or internal, in the case of recursion) to the function.

- Like the program itself, a function is composed of a sequence of statements called the function body.

- Values can be passed to a function as parameters, and the function will return a value.

- Function values are typically instances of `Function`. Callable values cause `typeof` to return "function" instead of "object".

  or

- Functions in JavaScript are objects created from the Function constructor, but JavaScript treats **callable objects specially** and reports their type as "function" instead of "object".

   <img src="codesnaps/code9.png" width=400 />

- So:
  - `add` is a **function**
  - internally, it's an **object**
  - Its constructor is `Function`

### Proof that functions ARE objects

<img src="codesnaps/code10.png" width=500 />

You can:

- attach properties
- pass functions as values
- return them
- store them in arrays

> 💡 Function = Object + ()

### Return Value

- By default, if a function's execution doesn't end at a `return` statement, or if the `return` keyword doesn't have an expression after it, then the return value is `undefined`.

- The `return` statement allows you to return an arbitrary value from the function.

- One function call can only return one value, but you can simulate the effect of returning multiple values by returning an object or array and destructuring the result.

   <img src="codesnaps/code11.png" width=300 />

### The `this` Keyword

The `this` keyword refers to the object that the function is accessed on — it does not refer to the currently executing function, so you must refer to the function value by name, even within the function body.

> 💡 `this` means the object on which the function was called

<img src="codesnaps/code12.png" width=400 />

### Now the scary part (same function, different this)

<img src="codesnaps/code13.png" width=400 />

What is `this` now?

- ❌ not person
- ❌ not the function
- ✅ `undefined` (in strict mode)

Because:

```
fn(); // no object on the left
```

> 💡 `this` is not lexical. It is dynamic. It is determined **at call time**, not at write time.
