# typed-function

[![Version](https://img.shields.io/npm/v/typed-function.svg)](https://www.npmjs.com/package/typed-function)
[![Downloads](https://img.shields.io/npm/dm/typed-function.svg)](https://www.npmjs.com/package/typed-function)
[![Build Status](https://github.com/josdejong/typed-function/workflows/Node.js%20CI/badge.svg)](https://github.com/josdejong/typed-function/actions)

Move type checking logic and type conversions outside of your function in a
flexible, organized way. Automatically throw informative errors in case of
wrong input arguments.


## Features

typed-function has the following features:

- Runtime type-checking of input arguments.
- Automatic type conversion of arguments.
- Compose typed functions with multiple signatures.
- Supports union types, any type, and variable arguments.
- Detailed error messaging.

Supported environments: node.js, Chrome, Firefox, Safari, Opera, IE11+.


## Why?

In JavaScript, functions can be called with any number and any type of arguments.
When writing a function, the easiest way is to just assume that the function
will be called with the correct input. This leaves the function's behavior on
invalid input undefined. The function may throw some error, or worse,
it may silently fail or return wrong results. Typical errors are
*TypeError: undefined is not a function* or *TypeError: Cannot call method
'request' of undefined*. These error messages are not very helpful. It can be
hard to debug them, as they can be the result of a series of nested function
calls manipulating and propagating invalid or incomplete data.

Often, JavaScript developers add some basic type checking where it is important,
using checks like `typeof fn === 'function'`, `date instanceof Date`, and
`Array.isArray(arr)`. For functions supporting multiple signatures,
the type checking logic can grow quite a bit, and distract from the actual
logic of the function.

For functions dealing with a considerable amount of type checking and conversion
logic, or functions facing a public API, it can be very useful to use the
`typed-function` module to handle the type-checking logic. This way:

-   Users of the function get useful and consistent error messages when using
    the function wrongly.
-   The function cannot silently fail or silently give wrong results due to
    invalid input.
-   Correct type of input is assured inside the function. The function's code
    becomes easier to understand as it only contains the actual function logic.
    Lower level utility functions called by the type-checked function can
    possibly be kept simpler as they don't need to do additional type checking.

It's important however not to *overuse* type checking:

-   Locking down the type of input that a function accepts can unnecessarily
    limit its flexibility. Keep functions as flexible and forgiving as possible,
    follow the
    [robustness principle](http://en.wikipedia.org/wiki/Robustness_principle)
    here: "be liberal in what you accept and conservative in what you send"
    (Postel's law).
-   There is no need to apply type checking to *all* functions. It may be
    enough to apply type checking to one tier of public facing functions.
-   There is a performance penalty involved for all type checking, so applying
    it everywhere can unnecessarily worsen the performance.


## Load

Install via npm:

    npm install typed-function


## Usage

Here are some usage examples. More examples are available in the
[/examples](/examples) folder.

```js
var typed = require('typed-function');

// create a typed function
var fn1 = typed({
  'number, string': function (a, b) {
    return 'a is a number, b is a string';
  }
});

// create a typed function with multiple types per argument (type union)
var fn2 = typed({
  'string, number | boolean': function (a, b) {
    return 'a is a string, b is a number or a boolean';
  }
});

// create a typed function with any type argument
var fn3 = typed({
  'string, any': function (a, b) {
    return 'a is a string, b can be anything';
  }
});

// create a typed function with multiple signatures
var fn4 = typed({
  'number': function (a) {
    return 'a is a number';
  },
  'number, boolean': function (a, b) {
    return 'a is a number, b is a boolean';
  },
  'number, number': function (a, b) {
    return 'a is a number, b is a number';
  }
});

// create a typed function from a plain function with signature
function fnPlain(a, b) {
  return 'a is a number, b is a string';
}
fnPlain.signature = 'number, string';
var fn5 = typed(fnPlain);

// use the functions
console.log(fn1(2, 'foo'));      // outputs 'a is a number, b is a string'
console.log(fn4(2));             // outputs 'a is a number'

// calling the function with a non-supported type signature will throw an error
try {
  fn2('hello', 'world');
}
catch (err) {
  console.log(err.toString());
  // outputs:  TypeError: Unexpected type of argument.
  //           Expected: number or boolean, actual: string, index: 1.
}
```


## Types

typed-function has the following built-in types:

- `null`
- `boolean`
- `number`
- `string`
- `Function`
- `Array`
- `Date`
- `RegExp`
- `Object`

The following type expressions are supported:

- Multiple arguments: `string, number, Function`
- Union types: `number | string`
- Variable arguments: `...number`
- Any type: `any`


## API

### Construction

A typed function can be constructed in two ways:

-   Create from an object with one or multiple signatures:

    ```
    typed(signatures: Object.<string, function>) : function
    typed(name: string, signatures: Object.<string, function>) : function
    ```

-   Merge multiple typed functions into a new typed function:

    ```
    typed(functions: ...function) : function
    typed(name: string, functions: ...function) : function
    ```

    Each function in `functions` can be either a typed function created before,
    or a plain function having a `signature` property.


### Methods

-   `typed.convert(value: *, type: string) : *`

    Convert a value to another type. Only applicable when conversions have
    been defined in `typed.conversions` (see section [Properties](#properties)). 
    Example:
    
    ```js
    typed.conversions.push({
      from: 'number',
      to: 'string',
      convert: function (x) {
        return +x;
    });
    
    var str = typed.convert(2.3, 'string'); // '2.3' 
    ```

-   `typed.create() : function`

    Create a new, isolated instance of typed-function. Example:
    
    ```js
    var typed = require('typed-function');  // default instance
    var typed2 = typed.create();            // a second instance
    ```

    This would allow you, for example, to have two different type hierarchies
    for different purposes.

-   `typed.find(fn: typed-function, signature: string | Array) : function | null`

    Find a specific signature from a typed function. The function currently
    only finds exact matching signatures.
    
    For example:
    
    ```js
    var fn = typed(...);
    var f = typed.find(fn, ['number', 'string']);
    var f = typed.find(fn, 'number, string');
    ```

-   `typed.addType(type: {name: string, test: function} [, beforeObjectTest=true]): void`

    Add a new type. A type object contains a name and a test function.
    The order of the types determines in which order function arguments are 
    type-checked, so for performance it's important to put the most used types 
    first. All types are added to the Array `typed.types`. 
    
    Example:
    
    ```js
    function Person(...) {
      ...
    }
    
    Person.prototype.isPerson = true;

    typed.addType({
      name: 'Person',
      test: function (x) {
        return x && x.isPerson === true;
      }
    });
    ```

    By default, the new type will be inserted before the `Object` test
    because the `Object` test also matches arrays and classes and hence
    `typed-function` would never reach the new type. When `beforeObjectTest`
    is `false`, the new type will be added at the end of all tests.

-   `typed.addConversion(conversion: {from: string, to: string, convert: function}) : void`

    Add a new conversion. Conversions are added to the Array `typed.conversions`.
    
    ```js
    typed.addConversion({
      from: 'boolean',
      to: 'number',
      convert: function (x) {
        return +x;
    });
    ```

    Note that any typed functions created before this conversion is added will
    not have their arguments undergo this new conversion automatically, so it is
    best to add all of your desired automatic conversions before defining any
    typed functions.

-   `typed.createError(name: string, args: Array.<any>, signatures: Array.<Signature>): TypeError`

    Generates a custom error object reporting the problem with calling
    the typed function of the given `name` with the given `signatures` on the
    actual arguments `args`. Note the error object has an extra property `data`
    giving the details of the problem. This method is primarily useful in
    writing your own handler for a type mismatch (see the `typed.onMismatch`
    property below), in case you have tried to recover but end up deciding
    you want to throw the error that the default handler would have.

### Properties

-   `typed.types: Array.<{name: string, test: function}>`

    Array with types. Each object contains a type name and a test function.
    The order of the types determines in which order function arguments are 
    type-checked, so for performance it's important to put the most used types 
    first. Custom types can be added like:

    ```js
    function Person(...) {
      ...
    }
    
    Person.prototype.isPerson = true;

    typed.types.push({
      name: 'Person',
      test: function (x) {
        return x && x.isPerson === true;
      }
    });
    ```

-   `typed.conversions: Array.<{from: string, to: string, convert: function}>`

    An Array with built-in conversions. Empty by default. Can be used to define
    conversions from `boolean` to `number`. For example:

    ```js
    typed.conversions.push({
      from: 'boolean',
      to: 'number',
      convert: function (x) {
        return +x;
    });
    ```

    Also note the `addConversion()` method above for simply adding a single
    conversion at a time.
    
-   `typed.ignore: Array.<string>`

    An Array with names of types to be ignored when creating a typed function.
    This can be useful to filter signatures when creating a typed function.
    For example:

    ```js
    // a set with signatures maybe loaded from somewhere
    var signatures = {
      'number': function () {...},
      'string': function () {...}
    }

    // we want to ignore a specific type
    typed.ignore = ['string'];

    // the created function fn will only contain the 'number' signature 
    var fn = typed('fn', signatures);
    ```

-   `typed.onMismatch: function`

    The handler called when a typed-function call fails to match with any
    of its signatures. The handler is called with three arguments: the name
    of the typed function being called, the actual argument list, and an array
    of the signatures for the typed function being called. (Each signature is
    an object with property 'signature' giving the actual signature and\
    property 'fn' giving the raw function for that signature.) The default
    value of `onMismatch` is `typed.throwMismatchError`.

    This can be useful if you have a collection of functions and have common
    behavior for any invalid call. For example, you might just want to log
    the problem and continue:

    ```
    const myErrorLog = [];
    typed.onMismatch = (name, args, signatures) => {
      myErrorLog.push(`Invalid call of ${name} with ${args.length} arguments.`);
      return null;
    };
    typed.sqrt(9); // assuming definition as above, will return 3
    typed.sqrt([]); // no error will be thrown; will return null.
    console.log(`There have been ${myErrorLog.length} invalid calls.`)
    ```

    Note that there is only one `onMismatch` handler at a time; assigning a
    new value discards the previous handler. To restore the default behavior,
    just assign `typed.onMismatch = typed.throwMismatchError`.

    Finally note that this handler fires whenever _any_ typed function call
    does not match any of its signatures. You can in effect define such a
    "handler" for a single typed function by simply specifying an implementation
    for the `...` signature:

    ```
    const lenOrNothing = typed({
      string: s => s.length,
      '...': () => 0
    });
    console.log(lenOrNothing('Hello, world!')) // Output: 13
    console.log(lenOrNothing(57, 'varieties')) // Output: 0
    ```

### Recursion

The `this` keyword can be used to self-reference the typed-function:

```js
var sqrt = typed({
  'number': function (value) {
    return Math.sqrt(value);
  },
  'string': function (value) {
    // on the following line we self reference the typed-function using "this"
    return this(parseInt(value, 10));
  }
});

// use the typed function
console.log(sqrt('9')); // output: 3
```


### Output

The functions generated with `typed({...})` have:

- A function `toString`. Returns well readable code which can be used to see
  what the function exactly does. Mostly for debugging purposes.
- A property `signatures`, which holds a map with the (normalized)
  signatures as key and the original sub-functions as value.
- A property `name` containing the name of the typed function, if it was
  assigned one at creation, or an empty string.


## Roadmap

### Version 2

- Be able to turn off exception throwing.
- Extend function signatures:
  - Optional arguments like `'[number], array'` or like `number=, array`
  - Nullable arguments like `'?Object'`
- Create a good benchmark, to get insight in the overhead.
- Allow conversions to fail (for example string to number is not always
  possible). Call this `fallible` or `optional`?

### Version 3

- Extend function signatures:
  - Constants like `'"linear" | "cubic"'`, `'0..10'`, etc.
  - Object definitions like `'{name: string, age: number}'`
  - Object definitions like `'Object.<string, Person>'`
  - Array definitions like `'Array.<Person>'`
- Improve performance of both generating a typed function as well as
  the performance and memory footprint of a typed function.


## Test

To test the library, run:

    npm test


## Minify

To generate the minified version of the library, run:

    npm run minify


## Publish

1. Describe the changes in `HISTORY.md`
2. Increase the version number in `package.json`
3. Test and build:
    ```
    npm install
    npm run build
    npm test
    ```
4. Verify whether the bundle and minified bundle works correctly by opening
   `./test/browser.html`  and `./test/browser.min.html` in your browser. 
5. Commit the changes
6. Merge `develop` into `master`, and push `master`
7. Create a git tag, and pus this
8. publish the library:
    ```
    npm publish
    ```
