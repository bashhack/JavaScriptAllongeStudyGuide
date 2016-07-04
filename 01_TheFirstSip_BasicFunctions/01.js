/**
 * 01 - The First Sip: Basic Functions
 * ===================================
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

// As functional programmers, we strive to write pure functions because they are
// predictable, given the same input they will provide the same output

// It is important to remember that pure functions can contain a closure!

// Going back to our example, we see that the actual environment looks like:
// {y: 2, '..': {x: 1, ...}}

/**
 * Fast Fact - Function Lexicon
 *
 * ((x) =>
 *   (y) =>
 *     x)(1)(2)
 *
 * (x) => x is called the I Combinator, the Identity Function. (x) => (y) => x
 * is called the K Combinator, or Kestrel.
 */

// Functions aren't just capable of parent/child scopes, but grandparents:
(x) =>
  (y) =>
    (z) => x + y + z
// This does much the same thing as:
(x, y, z) => x + y + z

// The difference here being that in the former, "we could call it (1)(2)(3)
// instead of (1, 2, 3). The other big difference is that you can call it with
// (1) and get a function back that you can later call with (2)(3). The first
// function is the result of currying the second function. Calling a curried
// function with only some of its arguments is sometimes called
// partial application.

// Since JavaScript always "has at least one environment we do not control:
// a global environment," we can isolate from it by creating our own environment
// like so:
(() => {
  // ... code ...
})();

// A look at refactoring functions:
// We start simply with the first iteration:
((diameter) => diameter * 3.14159265)(2)

// We refactor to rid ourselves of the magic number scenario
((PI) =>
  (diameter) => diameter * PI)(3.14159265)(2)
// NOTE: Here, we're looking at the same principle structure:
// ((x) => (y) => x * y)(x)(y)

// We refactor again to try and encapsulate logically-bound information:
((diameter) =>
  ((PI) =>
    diameter * PI)(3.14159265))(2)
// NOTE: Here, we've bound everything within the body (PI bound in function),
// so that the naming of PI is a concern of the function itself and not
// of ours at the time of calling the function

// We refactor again, this time because we know that invoking a function
// is considerably more costly than evaluating expressions:
((diameter, PI) => diameter * PI)(2, 3.14159265)
// NOTE: This is better because we have a single environment, "one binding
// in the environment representing our regular argument and another our constant"

// We refactor again, this time to take advantage of the `const` keyword:
((diameter) => {
  const PI = 3.14159265;

  return diameter * PI
})(2)

// We refactor again, noting that the whole of the function is a stable
// and repeatable formula:
(d) => {
  const calc = (diameter) => {
    const PI = 3.14159265;

    return diameter * PI
  };

  return "The circumference is " + calc(d)
}

// We refactor a final time for consise, readable code:
(d) => {
  const PI = 3.14159265,
        calc = (diameter) => diameter * PI;

  return "The circumference is " + calc(d)
}

// Quick reminder - "`const` statements don't just shadow values bound
// within the environments created by functions, they shadow values bound
// within environments created by blocks!"

/**
 * Fast Fact - Principle of Least Privilege
 *
 * "The principle of least privilege requires that in a particular abstraction
 * layer of a computing environment, every module must be able to access only
 * the information and resources that are necessary for its legitimate purpose"
 *
 * When we bind a name inside of a block "the name is only needed in the block,
 * we are not 'leaking' its binding to other parts of the code that do not need
 * to interact with it"
 */

// It is important to realize that `const` does not name the function in our
// example, however. `const` behind the scenes is syntax which simply binds
// an anonymous function to a name in an environment, making it read-only.

// Until this point we have not formally given a name to a function, but
// we can do so by introducing the `function` keyword (NOTE: Of course,
// we still do not have a name in this instance, as a name - positioned
// between `function` and `(str)` is optional:
function (str) { return str + str }

const repeat = function repeat (str) {
  return str + str;
}

const double = function repeat (str) {
  return str + str;
}

double.name //=> 'repeat'
// NOTE: This is a `named function expression,` where double is the name
// of the environment and repeat is the actual function name. We can refer to
// these parts as the binding name and actual name.
const bindingName = function actualName () {
  //...
};

bindingName //=> [Function: actualName]
actualName //=> ReferenceError: actualName is not defined

// In practice:
(function even (n) {
  if (n === 0) {
    return true
  }
  else return !even(n - 1)
})(2)
// Here, name `even` is "bound ot the function within the function's body,"
// outside of the function:
even //=> Can't find variable: even

// A `named function expression` has a counterpart, a `function declaration`:
function myFunc () {
  //...
}
// NOTE: Function declarations are hoisted to the top of the current scope
(function () {
  return fizzbuzz();

  const fizzbuzz = function fizzbuzz () {
    return 'FizzBuzz';
  }
})() //=> undefined is not a function
(function () {
  return fizzbuzz();

  function fizzbuzz () {
    return "FizzBuzz";
  }
})() //=> 'FizzBuzz'

/**
 * Fast Fact - Why Does the Language Support This Hoisting?
 *
 * "This behavior is intentional on the part of JavaScript's design
 * to facilitate a certain style of programming where you put the main logic
 * up front and the 'helper functions' at the bottom"
 */

// NOTE: For obvious reasons, writing code that places the declaration
// below the logic isn't necessarily a good idea! It's generally easier,
// and more maintainable to place function declarations at the top of the scope.
// Similarly, it is generally not a good idea to place function declarations
// inside of blocks, because doing so can introduce variable results, subject
// to JavaScript engine changes to function optimization, etc. Additionally,
// function declarations cannot exist inside of ANY expression, otherwise it
// is a function expression.

/* Combinators and Function Decorators */
// Higher-order functions take functions as arguments, return functions, or both.
// Great examples are map, filter, reduce, etc. But we can define our own:

const repeat = (num, fn) =>
  (num > 0)
    ? (repeat(num - 1, fn), fn(num))
    : undefined

repeat(3, function (n) {
  console.log('Hello ${n}')
}) //=> 'Hello 1' 'Hello 2' 'Hello 3' undefined

// "A combinator is a higher-order function that uses only function application
// and earlier defined combinators to define a result from its arguments"

/**
 * Fast Fact - Combinatory Logic
 *
 * S, K, and I are the most basic combinators and are defined as:
 *
 * I (identity) : (x) => x
 * K (kestrel) : (x) => (y) => x
 * S (starling) : (x) => (y) => (z) => xz(yz))
 *
 * B (bluebird) : (x) => (y) => (z) => x(yz)
 * C (cardinal) : (x) => (y) => (z) => x(z(y))
 * W (warbler) : (x) => (y) => x(y(y))
 *
 * I  === W K
 * S === B (B (B W) C) (B B) === B (B W) (B B C)
 *
 * https://github.com/raganwald/oscin.es/blob/master/spec/bird.by.bird.spec.coffee
 */

// One of the very useful combinators available to us is the B combinator,
// which we might call 'compose' in a programming implementation:
const compose = (a, b) => (c) => a(b(c))

const addOne = (number) => number + 1;

const doubleOf = (number) => number * 2;

const doubleOfAddOne = (number) => doubleOf(addOne(number));
// With compose we can write the above as:
const doubleOfAddOne = compose(doubleOf, addOne);
doubleOfAddOne(2) //=> 6

// "Combinators are useful when you want to emphasize what you're doing and how
// it fits together, and more explicit code is useful when you want to emphasize
// what you're working with"

/**
 * Fast Fact - Function Decorators
 *
 * "A function decorator is a higher order function that takes one function
 * as an argument, returns another function, and the returned function is a
 * variation of the argument function."
 *
 * Ex. not / once / maybe / etc.
 *
 * Function decorators tend to modify functions while maintaining
 * a strong relationship to the original function semantics.
 */

const not = (fn) => (x) => !fn(x);

const something = (x) => x != null;

const nothing = not(something);

// Function composition is a pattern/tool we can use to structure our code,
// to add order to our work, that along with another useful pattern called
// partial application can greatly improve the quality of our code

// We can compose either directly or indirectly:
// Direct -
const cookAndEat = (food) => eat(cook(food))
// Indirect -
const cookAndEat = compose(eat, cook)

// We should strive to write and organize our code in a way that we can
// use these patterns to their benefit

const actuallyTransfer = (from, to, amount) => {
  //...
}

const invokeTransfer = once(maybe(actuallyTransfer(...)))

// With partial application, we are dealing with a function that can take
// multiple arguments but only passing some of its arguments - in this case
// we cannot get the final value, but we can get a function that represents
// a part of our application.

// NOTE: Cool way to think about default map method on array:
const map = (a, fn) => a.map(fn)

const squareAll = (array) => map(array, (n) => n * n)

// We can "abstract this one level higher. mapWith takes any function as an
// argument and returns a partially applied map function"
const mapWith = (fn) =>
  (array) => map(array, fn)

const squareAll = mapWith((n) => n * n)

squareAll([1, 2, 3]) //=> [1, 4, 9]

const safeSquareAll = mapWith(maybe((n) => n * n))

safeSquareAll([1, null, 2, 3]) //=> [1, null, 4, 9]

/**
 * Fast Fact - Arguments
 *
 * "When a function is applied to arguments, JavaScript binds the values of
 * arguments to the function's argument names in an environment"
 *
 * const plus = function (a, b) {
 *   return arguments[0] + arguments[1];
 * }
 * plus(2, 3) //=> 5
 *
 * arguments looks like an array but is more like an object that binds values
 * to properties that look like integers starting at zero
 */

// Because the 'arguments' keyword always references all arguments passed to
// the function, the previous function could be written like so:
const plus = function () {
  return arguments[0] + arguments[1];
}
plus(2, 3) //=> 5

// NOTE: Functions created with the fat arrow syntax behave slightly differently
// than those with the 'function' keyword:
(function () {
  return (function () {
    return arguments[0];
  })('inner');
})('outer') //=> 'inner'

(function () {
  return (() => arguments[0])('inner')
})('outer') //=> 'outer'

// NOTE: I'd never heard of these terms, but after reading about them,
// I realize I use these ideas on a regular basis:
// "...there is a general design principle that deserves attention. Sometimes,
// a function is meant to be used as a Big-F function. It has a name, it is
// called by different pieces of code, it's a first-class entity in the code.
//
// But sometimes, a function is a small-f function. It's a simple representation
// of an expression to be computed."

/* REVIEW */
// • Functions are values that can be part of expressions,
// returned from other functions, and so forth.
// • Functions are reference values.
// • Functions are applied to arguments.
// • The arguments are passed by sharing, which is also called “pass by value.”
// • Fat arrow functions have expressions or blocks as their bodies.
// • function keyword functions always have blocks as their bodies.
// • Function bodies have zero or more statements.
// • Expression bodies evaluate to the value of the expression.
// • Block bodies evaluate to whatever is returned with the return keyword,
// or to undefined.
// • JavaScript uses const to bind values to names within block scope.
// • JavaScript uses function declarations to bind functions to names within
// function scope. Function declarations are “hoisted.”
// • Function application creates a scope.
// • Blocks also create scopes if const statements are within them.
// • Scopes are nested and free variable references closed over.
// • Variables can shadow variables in an enclosing scope.
