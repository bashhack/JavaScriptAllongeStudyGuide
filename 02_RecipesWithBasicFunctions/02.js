/**
 * 02 - Recipes with Basic Functions
 * =================================
 */

/* Partial Application/Currying */
const callFirst = (fn, larg) =>
  function (...rest) {
    return fn.call(this, larg, ...rest);
  }

const callLast = (fn, rarg) =>
  function (...rest) {
    return fn.call(this, ...rest, rarg);
  }

const add = (x, y) => {
  return x + y;
}

const greet = (me, you) =>
  `Hello, ${you}, my name is ${me}`;

const heliosSaysHello = callFirst(greet, 'Helios');
// larg = 'Helios'
// ...rest = 'Eartha'
// greet(me, you) = greet(larg, ...rest) = greet('Helios', 'Eartha') NOTE: me = 'Helios' you = 'Eartha' = 'Hello, Eartha, my name is Helios'

heliosSaysHello('Eartha');
//=> 'Hello, Eartha, my name is Helios'

const sayHelloToCeline = callLast(greet, 'Celine');
// rarg = 'Celine'
// ...rest = 'Eartha'
// greet(me, you) = greet(...rest, rarg) = greet('Eartha', 'Celine') NOTE: me = 'Eartha' you = 'Celine' = 'Hello, Celine, my name is Eartha'

sayHelloToCeline('Eartha');
//=> 'Hello, Celine, my name is Eartha'

const partialAddSixFirst = callFirst(add, 6);
// larg = 6
// ...rest = 7
const partialAddSixLast = callLast(add, 6);
// rarg = 6
// ...rest = 7
partialAddSixFirst(7);
//=> Execution Order:
//=> x = 6
//=> y = 7
//=> R: 13
partialAddSixLast(7);
//=> Execution Order:
//=> x = 7
//=> y = 6
//=> R: 13

// NOTE: Extending partial application to work with more than one arguments
const leftPartialApply = (fn, ...args) =>
  (...remainingArgs) =>
    fn(...args, ...remainingArgs);

const rightPartialApply = (fn, ...args) =>
  (...remainingArgs) =>
    fn(...remainingArgs, ...args);

const partialAddSixFirstWithCallLeft = callLeft(add, 6);
const partialAddSixLastWithCallRight = callRight(add, 6);
partialAddSixFirstWithCallLeft(7);
//=> Execution Order:
//=> ...args = 6
//=> ...remainingArgs = 7
partialAddSixLastWithCallRight(7);
//=> Execution Order:
//=> ...args = 7
//=> ...remainingArgs = 6
partialAddSixFirstWithCallLeft(7, 8);
//=> Execution Order:
//=> ...args = 6
//=> ...remainingArgs = 7
partialAddSixLastWithCallRight(7, 8);
//=> Execution Order:
//=> ...args = 7
//=> ...remainingArgs = 8

// NOTE: I wanted to test adding more than the expected number of args to
// to the 'callRight' function because I had a feeling I'd encounter
// some oddities. Sure enough, if too many args are passed into the partial
// then the original bound argument (6) is lost, essentially turning what would
// otherwise be a predictable return value
// Ben Alman notes here:
// http://benalman.com/news/2012/09/partial-application-in-javascript/
// "In JavaScript, partially applying from the left will always be simpler and
// more robust than partially applying from the right"

// A super concise and clear definition of partial application vs currying:
// “Currying is the decomposition of a polyadic function into a chain of nested
// unary functions. Thus decomposed, you can partially apply one or more
// arguments,3 although the curry operation itself does not apply any arguments
// to the function.”
// “Partial application is the conversion of a polyadic function into a function
// taking fewer arguments by providing one or more arguments in advance.”

// More indepth examples courtesy of:
// http://raganwald.com/2013/03/07/currying-and-partial-application.html
// http://raganwald.com/2015/04/01/partial-application.html
// http://raganwald.com/2013/01/05/practical-applications-of-partial-application.html



/* Unary */
/* Tap */
/* Maybe */
/* Once */
/* Left-Variadic Functions */
/* Compose and Pipeline */
