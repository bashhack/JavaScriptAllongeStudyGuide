/**
 * 01 - The First Sip: Basic Numbers
 * =================================
 */

// The basic function form...
() => 0
// "A function that is applied to no vlaues and returns 0"

// We verify that a function is a value...
(() => 0) //=> [Function]

// But we must remember that functions are a reference type, as opposed
// to being value types - such that:
(() => 0) === (() => 0) //=> false

// NOTE: The abstract form of the function, in and of itself, in isolation:
fn_expr(args)

// We, of course, invoke a function with 0 or more args like so:
(() => 0)() // We call this function without args

((...args) => 0)(arg1, arg2, arg3) // We call this function with args

// Likewise, we can then show that:
(() => 1)() //=> 1

(() => "String")() //=> "String"

(() => (() => "Function inside a function")())() //=> "Function inside a function"

// Functions are amazing, in part because they can return other functions -
// this is possible because we can treat functions as values themselves

/**
 * Fast Fact - The Comma Operator
 *
 * (1, 2) //=> 2
 * (1 + 1, 2 + 2) //=> 4
 *
 * The comma operator "takes two arguments, evaluates them both, and itself
 * evaluates to the value of the right-hand argument"
 *
 * We can use this to our advantage when doing things that involve side-effects
 */

// Our functions can return blocks, as well - zero or more statements, separated
// by semicolons
() => {}

(() => {})() //=> undefined (the absence of value, itself a type of value)

/**
 * Fast Fact - undefined
 *
 * undefined === undefined //=> true
 *
 * (() => {})() === undefined //=> true
 *
 * void 0 || void (2 + 2) //=> undefined
 * NOTE: void is an operator that takes any value, evaluates to undefined
 */

// Looking at the difference between blocks and expressions in the function:
(() => { 2 + 2 })() //=> undefined

(() => { 1 + 1; 2 + 2 })() //=> undefined

(() => {
  1 + 1;
  2 + 2
})() //=> undefined

// In other words, a "block with one expression does not behave like
// an expression, and a block with more than one expression does not
// behave like an expression constructed with the comma operator"
(() => 2 + 2)() //=> 4

(() => (1 + 1, 2 + 2))() //=> 4

// We can write functions that evaluate a block to return a value like so:
(() => { return 0 })() //=> 0

// Functions that evaluate to functions:
(() => () => 0)()() //=> 0
// We would say this is "a function, that returns a function, that returns 0"

// Passing arguments:
(param) => {}
(param1, param2) => {}

// Ex. Celsius to Fahrenheit
(celsius) => celsius * 1.8 + 32
((celsius) => celsius * 1.8 + 32)(20)

// Essential to our understanding of the function and its properties, are
// variables and bindings

// Let's deconstruct:
(x) => (y) => x
// Here, x is an argument, the y in (y) is another argument, and the x in the
// inner-most function scope is not an argument, it's an expression that
// refers to a variable

// From this, we conclude that functions create scopes/environments:
((x) => x)(2)
// Within this scope, we say that the value 2 is bound to the name x {x: 2, ...}
// This leads us to a larger discussion of closures, a key mechanism
// of the language design and fundamental to its proper application
// When we combine "value types, reference types, arguments, and closures"
// it becomes apparent that this function will always true:
(value) =>
  ((ref1, ref2) => ref1 === ref2)(value, value)

// To explore using a more concrete example:
((x) => (y) => x)(1)(2) //=> 1
// {x: 1, ...} //=> outer environment/scope
((x) => (y) => x)(1)
// {y: 2, ...} //=> inner environment/scope
((y) => x)(2)
// The evaluation of x in the inner scope, with no x in its environment,
// comes from the outer scope - closure in action
// In this example, the inner function (y) => x, contains a free variable, x.
// A "free variable is one that is not bound within the function," and a
// function that has one or more free variables are called closures.
// Functions that contain NO free variables are called pure functions.
