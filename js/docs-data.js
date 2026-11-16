/**
 * JavaScript Beginner Documentation Data
 * Contains comprehensive lessons, runnable examples, notes, tips, warnings, and challenges.
 */

const DOCS_DATA = [
  {
    id: "getting-started",
    category: "Basics & Fundamentals",
    title: "1. Getting Started with JavaScript",
    subtitle: "What is JavaScript, where does it run, and how to write your first program.",
    badge: "Core Basics",
    overview: `
      <p><strong>JavaScript (JS)</strong> is the programming language of the Web. Along with HTML (content) and CSS (styling), JavaScript provides interactivity, dynamic updates, data processing, and animations in modern browsers and servers (Node.js).</p>
      <p>JavaScript is a <strong>high-level, dynamically typed, interpreted/JIT-compiled</strong> language with first-class functions.</p>
    `,
    sections: [
      {
        subId: "where-does-js-run",
        title: "Where Does JavaScript Run?",
        content: `
          <p>JavaScript originally ran exclusively inside web browsers (Chrome, Firefox, Safari, Edge). Today, thanks to engines like Google's <strong>V8</strong>, JavaScript also runs on servers, desktop computers, mobile phones, and IoT devices via <strong>Node.js</strong> and <strong>Deno</strong>.</p>
        `,
        callout: {
          type: "tip",
          title: "Browser vs Server",
          text: "In the browser, JS has access to `window`, `document`, and web APIs like `fetch`. In Node.js, there is no `document`, but you have access to `process`, file system (`fs`), and operating system tools."
        }
      },
      {
        subId: "linking-js",
        title: "How to Add JavaScript to HTML",
        content: `
          <p>There are two primary ways to run JavaScript in HTML:</p>
          <ol style="margin-left: 1.5rem; margin-bottom: 1rem;">
            <li><strong>Inline Script:</strong> Writing code directly inside <code>&lt;script&gt;</code> tags.</li>
            <li><strong>External Script:</strong> Linking an external <code>.js</code> file using <code>&lt;script src="script.js" defer&gt;&lt;/script&gt;</code> (Recommended).</li>
          </ol>
        `,
        code: `<!-- 1. External file (Best Practice) -->
<!-- Put this in the <head> with the 'defer' attribute -->
<script src="app.js" defer></script>

<!-- 2. Inline script -->
<script>
  console.log("Hello from inside HTML!");
</script>`
      },
      {
        subId: "console-and-outputs",
        title: "Displaying Output & Console Methods",
        content: `
          <p>As a student or developer, your primary debugging tool is the <strong>Browser Console</strong> (F12 or Right Click &rarr; Inspect &rarr; Console). Let's see all common ways to output data:</p>
        `,
        code: `// Standard output
console.log("Welcome to JavaScript!");

// Formatted table (awesome for arrays and objects!)
console.table([
  { id: 1, name: "Alice", grade: "A" },
  { id: 2, name: "Bob", grade: "B+" },
  { id: 3, name: "Charlie", grade: "A-" }
]);

// Warning message (yellow)
console.warn("This is a warning message!");

// Error message (red)
console.error("This is an error message!");

// Informational message
console.info("Information: JavaScript is awesome.");`,
        runnable: true
      },
      {
        subId: "comments-and-syntax",
        title: "Comments & Semicolons",
        content: `
          <p>Comments are notes for humans that the JavaScript engine ignores.</p>
        `,
        code: `// This is a single-line comment

/*
  This is a multi-line comment.
  Use it to explain complex algorithms
  or temporary disabled code blocks.
*/

// Semicolons (;) terminate statements.
// Although optional due to Automatic Semicolon Insertion (ASI),
// writing them explicitly is widely considered a safe best practice!
let greeting = "Hello";
console.log(greeting);`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #1",
      description: "Log your name, age, and favorite programming language to the console using console.log() and console.table().",
      solution: `console.log("Hello World!");
console.table({
  name: "Alex",
  age: 20,
  language: "JavaScript"
});`
    }
  },

  {
    id: "variables-declarations",
    category: "Basics & Fundamentals",
    title: "2. Variables: let, const & var",
    subtitle: "How to store, update, and manage data in memory with proper scoping.",
    badge: "Essential",
    overview: `
      <p>A <strong>variable</strong> is a named container used to store data in memory so your program can read, calculate, and modify it later.</p>
      <p>JavaScript provides three keywords to declare variables: <code>const</code>, <code>let</code>, and the legacy <code>var</code>.</p>
    `,
    sections: [
      {
        subId: "let-const-var-comparison",
        title: "const vs let vs var (Comparison)",
        content: `
          <p>Modern JavaScript development (ES6+) relies heavily on <strong>const by default</strong> and <strong>let when values change</strong>. Avoid <code>var</code> in modern code!</p>
          <div class="table-responsive">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Scope</th>
                  <th>Reassignable?</th>
                  <th>Redeclarable?</th>
                  <th>Hoisted?</th>
                  <th>Best Used For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>const</code></td>
                  <td>Block <code>{}</code></td>
                  <td>❌ No</td>
                  <td>❌ No</td>
                  <td>Temporal Dead Zone</td>
                  <td>Default choice for constants, objects, arrays, functions</td>
                </tr>
                <tr>
                  <td><code>let</code></td>
                  <td>Block <code>{}</code></td>
                  <td>✅ Yes</td>
                  <td>❌ No</td>
                  <td>Temporal Dead Zone</td>
                  <td>Counters, loop variables, values that change</td>
                </tr>
                <tr>
                  <td><code>var</code></td>
                  <td>Function / Global</td>
                  <td>✅ Yes</td>
                  <td>✅ Yes</td>
                  <td>Hoisted (as undefined)</td>
                  <td>Legacy code only (avoid!)</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        code: `// 1. const: Cannot be reassigned
const pi = 3.14159;
console.log("PI:", pi);

// Uncommenting the next line will throw an error:
// pi = 3.14; // TypeError: Assignment to constant variable.

// 2. let: Can be updated later
let score = 0;
console.log("Initial score:", score);
score = 10;
console.log("Updated score:", score);

// 3. Block Scope demonstration
if (true) {
  let blockVariable = "I live inside this block only!";
  const blockSecret = 999;
  var functionVariable = "I leak outside blocks!";
  console.log(blockVariable);
}

// functionVariable is accessible outside, but blockVariable is not!
console.log("var leaked:", functionVariable);`,
        runnable: true
      },
      {
        subId: "naming-rules",
        title: "Variable Naming Rules & Conventions",
        content: `
          <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
            <li>Names must begin with a letter, underscore (<code>_</code>), or dollar sign (<code>$</code>).</li>
            <li>Names cannot start with a number (e.g. <code>1stPlayer</code> is invalid, <code>player1</code> is valid).</li>
            <li>Variable names are <strong>case-sensitive</strong> (<code>myAge</code> and <code>myage</code> are two distinct variables).</li>
            <li>Use <strong>camelCase</strong> for standard variables and functions (e.g. <code>studentName</code>, <code>totalScore</code>).</li>
            <li>Use <strong>UPPER_SNAKE_CASE</strong> for hardcoded constants (e.g. <code>API_KEY</code>, <code>MAX_USERS</code>).</li>
          </ul>
        `,
        code: `// Recommended naming conventions
const MAX_ATTEMPTS = 3;
let currentScore = 150;
let isStudentEnrolled = true;
let userFirstName = "Sarah";

console.log(userFirstName, "has score:", currentScore, "Max tries:", MAX_ATTEMPTS);`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #2",
      description: "Declare a `const` for your birth year and a `let` for your current age. Calculate your age next year and print it.",
      solution: `const birthYear = 2005;
let age = 21;
age = age + 1;
console.log("Next year age will be:", age);`
    }
  },

  {
    id: "data-types",
    category: "Basics & Fundamentals",
    title: "3. Data Types & Type Conversion",
    subtitle: "Primitives, Reference Types, typeof operator, and type coercion explained clearly.",
    badge: "Foundation",
    overview: `
      <p>JavaScript variables are dynamically typed, which means a variable doesn't have a rigid type fixed forever; instead, the <strong>value</strong> held by the variable determines its type.</p>
      <p>Data types in JavaScript are divided into two categories: <strong>7 Primitive Types</strong> (immutable, stored directly in stack) and <strong>Reference Types</strong> (objects, stored in heap memory).</p>
    `,
    sections: [
      {
        subId: "primitive-types",
        title: "The 7 Primitive Data Types",
        content: `
          <p>Every primitive represents a single, raw value:</p>
        `,
        code: `// 1. String: Textual data
let studentName = "Emily Watson";

// 2. Number: Integers and floating-point floats
let score = 98.5;

// 3. Boolean: Logical true or false
let hasPassed = true;

// 4. Undefined: A variable declared but not assigned any value yet
let futureCareer;

// 5. Null: Intentional absence of any object value
let emptyWallet = null;

// 6. BigInt: Numbers larger than 2^53 - 1
let bigNumber = 9007199254740991n;

// 7. Symbol: Unique and immutable identifier
let id = Symbol("userId");

console.log("studentName:", typeof studentName);
console.log("score:", typeof score);
console.log("hasPassed:", typeof hasPassed);
console.log("futureCareer:", typeof futureCareer);
console.log("emptyWallet:", typeof emptyWallet); // Gotcha: returns 'object'!
console.log("bigNumber:", typeof bigNumber);
console.log("id:", typeof id);`,
        runnable: true,
        callout: {
          type: "warning",
          title: "The Historic 'typeof null' Gotcha",
          text: "In JavaScript, `typeof null` outputs `'object'`. This is a famous bug from the first version of JavaScript in 1995 that couldn't be fixed without breaking existing websites. `null` is a primitive, NOT an object!"
        }
      },
      {
        subId: "type-conversion",
        title: "Explicit vs Implicit Type Conversion",
        content: `
          <p><strong>Explicit Conversion:</strong> You intentionally convert a type using built-in constructors (<code>Number()</code>, <code>String()</code>, <code>Boolean()</code>).</p>
          <p><strong>Implicit Coercion:</strong> JavaScript automatically converts types when operators are used between mismatched types.</p>
        `,
        code: `// Explicit Conversions (Safe & Predictable)
let stringNumber = "42";
let convertedNumber = Number(stringNumber);
console.log("Converted Number:", convertedNumber, "Type:", typeof convertedNumber);

let num = 100;
let convertedStr = String(num);
console.log("Converted String:", convertedStr, "Type:", typeof convertedStr);

// Implicit Coercion (Can cause surprises!)
console.log("'5' + 2 =", "5" + 2); // '52' -> '+' with string concatenates!
console.log("'5' - 2 =", "5" - 2); // 3 -> '-' converts string to number!
console.log("'10' * '2' =", "10" * "2"); // 20
console.log("true + 1 =", true + 1); // 2 -> true is coerced to 1
console.log("false + 1 =", false + 1); // 1 -> false is coerced to 0`,
        runnable: true
      },
      {
        subId: "truthy-falsy",
        title: "Truthy and Falsy Values",
        content: `
          <p>In conditionals, any value is evaluated as either <strong>truthy</strong> or <strong>falsy</strong>.</p>
          <p>There are only <strong>8 falsy values</strong> in JavaScript. Everything else is truthy!</p>
          <div class="callout warning">
            <div class="callout-icon">⚠️</div>
            <div class="callout-body">
              <div class="callout-title">The 8 Falsy Values</div>
              <div><code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code> (BigInt zero), <code>""</code> (empty string), <code>null</code>, <code>undefined</code>, and <code>NaN</code>.</div>
            </div>
          </div>
        `,
        code: `// Testing Truthy vs Falsy
function checkTruthy(val) {
  return Boolean(val);
}

console.log("Boolean(0):", checkTruthy(0));             // false
console.log("Boolean(''):", checkTruthy(""));           // false
console.log("Boolean(null):", checkTruthy(null));       // false
console.log("Boolean(undefined):", checkTruthy(undefined)); // false
console.log("Boolean(NaN):", checkTruthy(NaN));         // false

// All of these are TRUTHY!
console.log("Boolean('Hello'):", checkTruthy("Hello")); // true
console.log("Boolean([]):", checkTruthy([]));           // true (Empty array is truthy!)
console.log("Boolean({}):", checkTruthy({}));           // true (Empty object is truthy!)
console.log("Boolean('0'):", checkTruthy("0"));         // true (Non-empty string is truthy!)`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #3",
      description: "Convert the string '99.95' to a floating point number and calculate a 10% discount.",
      solution: `let priceStr = "99.95";
let price = parseFloat(priceStr);
let discountedPrice = price * 0.9;
console.log("Discounted price:", discountedPrice.toFixed(2));`
    }
  },

  {
    id: "operators",
    category: "Basics & Fundamentals",
    title: "4. Operators & Expressions",
    subtitle: "Arithmetic, Assignment, Strict Equality, Logical, and Modern Nullish Operators.",
    badge: "Core Basics",
    overview: `
      <p>Operators perform mathematical, logical, and relational calculations on one or more operands (variables and values).</p>
    `,
    sections: [
      {
        subId: "arithmetic-ops",
        title: "Arithmetic & Assignment Operators",
        content: `
          <p>Basic mathematical operators in JavaScript:</p>
        `,
        code: `let a = 10;
let b = 3;

console.log("Addition (a + b):", a + b);       // 13
console.log("Subtraction (a - b):", a - b);    // 7
console.log("Multiplication (a * b):", a * b); // 30
console.log("Division (a / b):", a / b);       // 3.333...
console.log("Modulo / Remainder (a % b):", a % b); // 1 (10 / 3 gives remainder 1)
console.log("Exponentiation (a ** b):", a ** b);   // 10^3 = 1000

// Increment and Decrement
let counter = 5;
counter++; // counter = counter + 1
console.log("After counter++:", counter); // 6

// Compound Assignment
let total = 50;
total += 25; // same as total = total + 25
total *= 2;  // same as total = total * 2
console.log("Total:", total); // 150`,
        runnable: true
      },
      {
        subId: "equality-comparison",
        title: "Loose Equality (==) vs Strict Equality (===)",
        content: `
          <p>One of the most important concepts for beginners to learn!</p>
          <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
            <li><code>==</code> (Loose Equality): Compares values <strong>after type coercion</strong> (dangerous!).</li>
            <li><code>===</code> (Strict Equality): Compares both <strong>value AND data type</strong> without coercion (Always use this!).</li>
          </ul>
        `,
        code: `// Loose equality == (Avoid!)
console.log("5 == '5':", 5 == '5');       // true (coerces string '5' to number 5)
console.log("0 == false:", 0 == false);   // true (coerces false to 0)
console.log("null == undefined:", null == undefined); // true

// Strict equality === (Always recommend!)
console.log("5 === '5':", 5 === '5');     // false (number is not string)
console.log("0 === false:", 0 === false); // false (number is not boolean)
console.log("null === undefined:", null === undefined); // false

// Inequality
console.log("5 !== '5':", 5 !== '5');     // true (Strict inequality)`,
        runnable: true
      },
      {
        subId: "logical-and-modern-ops",
        title: "Logical Operators, Nullish Coalescing (??) & Optional Chaining (?.)",
        content: `
          <p>Modern JavaScript has powerful logical and fallback operators:</p>
        `,
        code: `// Logical AND (&&) - Returns true only if both sides are truthy
let isAdult = true;
let hasID = true;
console.log("Can enter club:", isAdult && hasID); // true

// Logical OR (||) - Returns true if at least one side is truthy
let hasCash = false;
let hasCreditCard = true;
console.log("Can pay:", hasCash || hasCreditCard); // true

// Logical NOT (!) - Inverts the boolean value
let isRaining = false;
console.log("Is it sunny?:", !isRaining); // true

// Modern Operator: Nullish Coalescing (??)
// Returns right side ONLY if left side is null or undefined (preserves 0 and "")
let userScore = 0; // A valid score of 0!
let resultWithOR = userScore || 10; // Gotcha: 0 is falsy, so it replaces with 10!
let resultWithNullish = userScore ?? 10; // Correct: 0 is NOT null/undefined
console.log("resultWithOR:", resultWithOR);         // 10
console.log("resultWithNullish:", resultWithNullish); // 0

// Modern Operator: Optional Chaining (?.)
// Prevents "Cannot read property of undefined" crashes!
const student = { name: "Maria", profile: null };
console.log("Avatar:", student.profile?.avatarUrl); // undefined (No crash!)`,
        runnable: true
      },
      {
        subId: "ternary-operator",
        title: "The Ternary Operator (condition ? expr1 : expr2)",
        content: `
          <p>A concise single-line alternative to <code>if...else</code> statements when assigning a value based on a condition.</p>
        `,
        code: `let examScore = 78;

// Syntax: condition ? valueIfTrue : valueIfFalse
let result = examScore >= 50 ? "Passed! 🎉" : "Failed. Keep practicing! 📚";
console.log("Result:", result);`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #4",
      description: "Write a ternary statement that sets a variable `shippingFee` to 0 if `cartTotal` is $50 or more, otherwise $10.",
      solution: `let cartTotal = 65;
let shippingFee = cartTotal >= 50 ? 0 : 10;
console.log("Shipping fee:", shippingFee);`
    }
  },

  {
    id: "control-flow",
    category: "Control Flow & Logic",
    title: "5. Conditionals & Decision Making",
    subtitle: "if, else if, else, switch-case, and writing clean conditional logic.",
    badge: "Core Logic",
    overview: `
      <p>Conditionals allow your code to make decisions and execute different branches of code depending on whether conditions evaluate to true or false.</p>
    `,
    sections: [
      {
        subId: "if-else-statements",
        title: "if, else if, and else",
        content: `
          <p>The standard conditional structure in JavaScript.</p>
        `,
        code: `let studentGrade = 87;

if (studentGrade >= 90) {
  console.log("Grade: A (Outstanding!)");
} else if (studentGrade >= 80) {
  console.log("Grade: B (Great job!)");
} else if (studentGrade >= 70) {
  console.log("Grade: C (Passed)");
} else if (studentGrade >= 60) {
  console.log("Grade: D (Needs Improvement)");
} else {
  console.log("Grade: F (Failed)");
}`,
        runnable: true
      },
      {
        subId: "switch-statement",
        title: "The switch Statement",
        content: `
          <p>Use <code>switch</code> when testing a single variable against many discrete matching cases. Don't forget <code>break</code>!</p>
        `,
        code: `let dayOfWeek = "Wednesday";

switch (dayOfWeek) {
  case "Monday":
    console.log("Start of the school week.");
    break;
  case "Wednesday":
    console.log("Hump day! Halfway through.");
    break;
  case "Friday":
    console.log("TGIF! Weekend is near.");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Enjoy your weekend! 🏖️");
    break;
  default:
    console.log("Regular study day.");
    break;
}`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #5",
      description: "Write a conditional checking if a given number is positive, negative, or zero.",
      solution: `let num = -5;
if (num > 0) {
  console.log("Positive");
} else if (num < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}`
    }
  },

  {
    id: "loops",
    category: "Control Flow & Logic",
    title: "6. Loops & Iteration",
    subtitle: "for, while, do-while, for-of, for-in, break, and continue.",
    badge: "Control Flow",
    overview: `
      <p>Loops allow you to run a block of code repeatedly until a specific condition is met, preventing repetitive code.</p>
    `,
    sections: [
      {
        subId: "for-loop",
        title: "The Standard for Loop",
        content: `
          <p>The most common loop when you know in advance how many times you want to iterate.</p>
        `,
        code: `// Syntax: for (initialization; condition; increment/decrement)
for (let i = 1; i <= 5; i++) {
  console.log("Iteration count:", i);
}

// Looping backward
console.log("Countdown:");
for (let i = 3; i >= 1; i--) {
  console.log(i + "...");
}
console.log("Blast off! 🚀");`,
        runnable: true
      },
      {
        subId: "while-and-do-while",
        title: "while & do...while Loops",
        content: `
          <p><code>while</code> loops check the condition before each run. <code>do...while</code> runs at least <strong>once</strong> guaranteed before checking the condition.</p>
        `,
        code: `// while loop
let energy = 3;
while (energy > 0) {
  console.log("Studying... Energy remaining:", energy);
  energy--;
}
console.log("Need a coffee break! ☕");

// do...while loop: Always executes at least once
let count = 10;
do {
  console.log("do...while ran once even though condition is false! Count:", count);
  count++;
} while (count < 5);`,
        runnable: true
      },
      {
        subId: "for-of-and-for-in",
        title: "Modern Loops: for...of vs for...in",
        content: `
          <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
            <li><code>for...of</code>: Loops over the <strong>values</strong> of an iterable (Arrays, Strings, Sets).</li>
            <li><code>for...in</code>: Loops over the <strong>keys / property names</strong> of an Object.</li>
          </ul>
        `,
        code: `// 1. for...of with an Array
const programmingLanguages = ["JavaScript", "Python", "Rust", "TypeScript"];
for (const lang of programmingLanguages) {
  console.log("Language:", lang);
}

// 2. for...of with a String
for (const char of "CODE") {
  console.log("Letter:", char);
}

// 3. for...in with an Object
const book = {
  title: "Eloquent JavaScript",
  author: "Marijn Haverbeke",
  pages: 472
};

for (const key in book) {
  console.log(key + ":", book[key]);
}`,
        runnable: true
      },
      {
        subId: "break-and-continue",
        title: "Controlling Loops: break & continue",
        content: `
          <p><code>break</code> immediately terminates the loop. <code>continue</code> skips the current iteration and jumps to the next one.</p>
        `,
        code: `console.log("Demonstrating continue (skip evens):");
for (let i = 1; i <= 6; i++) {
  if (i % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log("Odd number:", i);
}

console.log("Demonstrating break (stop at 4):");
for (let i = 1; i <= 10; i++) {
  if (i === 4) {
    console.log("Found 4! Stopping loop immediately.");
    break;
  }
  console.log("Checking:", i);
}`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #6",
      description: "Write a for loop that calculates the sum of all numbers from 1 to 10.",
      solution: `let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log("Sum of 1 to 10 is:", sum);`
    }
  },

  {
    id: "functions",
    category: "Functions & Scope",
    title: "7. Functions & Scope",
    subtitle: "Declarations, expressions, arrow functions, parameters, return values, and closures.",
    badge: "Core Building Block",
    overview: `
      <p>A <strong>function</strong> is a reusable block of code designed to perform a specific task. Instead of repeating code, you define it once and call it whenever needed.</p>
    `,
    sections: [
      {
        subId: "function-declarations",
        title: "Function Declarations & Expressions",
        content: `
          <p>Ways to define a function:</p>
        `,
        code: `// 1. Function Declaration (Hoisted!)
function greet(studentName) {
  return "Hello, " + studentName + "! Welcome to class.";
}
console.log(greet("Taylor"));

// 2. Function Expression (Stored in a variable, NOT hoisted!)
const calculateArea = function(width, height) {
  return width * height;
};
console.log("Area of 5x8 rectangle:", calculateArea(5, 8));`,
        runnable: true
      },
      {
        subId: "arrow-functions",
        title: "Modern ES6 Arrow Functions () => {}",
        content: `
          <p>Arrow functions provide a clean, modern shorthand syntax, especially useful for short callbacks.</p>
        `,
        code: `// Regular function
const addRegular = function(a, b) {
  return a + b;
};

// Arrow function with block body
const addArrow = (a, b) => {
  return a + b;
};

// Concise arrow function (implicit return when single expression!)
const multiply = (a, b) => a * b;
const square = x => x * x; // Parentheses optional for single parameter!

console.log("multiply(4, 5):", multiply(4, 5));
console.log("square(7):", square(7));`,
        runnable: true
      },
      {
        subId: "parameters-and-rest",
        title: "Default Parameters & Rest Parameters (...)",
        content: `
          <p>Default parameters supply fallback values if no argument is passed. Rest parameters collect multiple arguments into an array.</p>
        `,
        code: `// Default parameters
function createWelcomeMessage(name = "Student", role = "Learner") {
  return "Welcome, " + name + " (" + role + ")";
}
console.log(createWelcomeMessage()); // Uses defaults!
console.log(createWelcomeMessage("Devon", "Admin"));

// Rest parameters (...args)
function sumAllNumbers(...numbers) {
  let total = 0;
  for (let n of numbers) {
    total += n;
  }
  return total;
}
console.log("Sum:", sumAllNumbers(5, 10, 15, 20));`,
        runnable: true
      },
      {
        subId: "scope-and-closures",
        title: "Scope & Beginner Guide to Closures",
        content: `
          <p><strong>Scope</strong> determines where variables can be accessed. A <strong>closure</strong> is a function that remembers and retains access to its outer variables even after the outer function has finished executing!</p>
        `,
        code: `// Practical Closure: A Bank Counter function
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable enclosed in closure!

  return {
    increment: () => {
      count++;
      return count;
    },
    decrement: () => {
      count--;
      return count;
    },
    getCount: () => count
  };
}

const studentPoints = createCounter(10);
console.log("Initial points:", studentPoints.getCount());
console.log("Add point:", studentPoints.increment());
console.log("Add point:", studentPoints.increment());
console.log("Remove point:", studentPoints.decrement());`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #7",
      description: "Write an arrow function `isEven(num)` that returns `true` if a number is even, and `false` if it is odd.",
      solution: `const isEven = (num) => num % 2 === 0;
console.log("isEven(4):", isEven(4));
console.log("isEven(7):", isEven(7));`
    }
  },

  {
    id: "strings",
    category: "Data Structures",
    title: "8. Strings & String Methods",
    subtitle: "Template literals, indexing, case conversion, slicing, searching, and replacing.",
    badge: "Data Types",
    overview: `
      <p>Strings in JavaScript are sequences of UTF-16 code units used to represent text. They are immutable (cannot be altered in-place), so string methods return a new string.</p>
    `,
    sections: [
      {
        subId: "template-literals",
        title: "Template Literals (${...})",
        content: `
          <p>Enclosed by backticks (<code>\`</code>), template literals allow string interpolation and multi-line strings without ugly concatenation.</p>
        `,
        code: `const firstName = "Jordan";
const topic = "JavaScript";
const lessonNumber = 8;

// Modern template literal with embedded expressions
const message = \`Student \${firstName} is currently studying \${topic}, Lesson #\${lessonNumber}!\`;
console.log(message);

// Multi-line support
const multiLine = \`
  Line 1: Clean code
  Line 2: Modern syntax
  Line 3: Happy learning!
\`;
console.log(multiLine.trim());`,
        runnable: true
      },
      {
        subId: "essential-string-methods",
        title: "Essential String Methods (Cheatsheet)",
        content: `
          <p>The most frequently used string manipulation methods in real-world code:</p>
        `,
        code: `let str = "  JavaScript is Incredible!  ";

// 1. Length
console.log("Length:", str.length);

// 2. Trimming whitespace
let trimmed = str.trim();
console.log("Trimmed:", \`"\${trimmed}"\`);

// 3. Changing Case
console.log("Uppercase:", trimmed.toUpperCase());
console.log("Lowercase:", trimmed.toLowerCase());

// 4. Searching & Checking
console.log("Includes 'Script':", trimmed.includes("Script")); // true
console.log("Starts with 'Java':", trimmed.startsWith("Java")); // true
console.log("Ends with '!':", trimmed.endsWith("!")); // true
console.log("Index of 'is':", trimmed.indexOf("is")); // 11

// 5. Extracting substrings (slice)
console.log("Slice(0, 10):", trimmed.slice(0, 10)); // "JavaScript"
console.log("Slice(-11):", trimmed.slice(-11)); // "Incredible!"

// 6. Replacing
console.log("Replace:", trimmed.replace("Incredible", "Powerful"));

// 7. Splitting into Array
let words = trimmed.split(" ");
console.log("Split words:", words);`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #8",
      description: "Take an email string like '  STUDENT@GMAIL.COM  ', trim the spaces, and convert it to lowercase.",
      solution: `let rawEmail = "  STUDENT@GMAIL.COM  ";
let cleanEmail = rawEmail.trim().toLowerCase();
console.log("Clean email:", cleanEmail);`
    }
  },

  {
    id: "numbers-math",
    category: "Data Structures",
    title: "9. Numbers & The Math Object",
    subtitle: "Parsing numbers, rounding, formatting decimals, and generating random numbers.",
    badge: "Math & Numbers",
    overview: `
      <p>JavaScript represents all standard numbers as 64-bit floating point numbers (IEEE 754 standard). The global <code>Math</code> object provides mathematical constants and functions.</p>
    `,
    sections: [
      {
        subId: "parsing-and-formatting",
        title: "Parsing & Formatting Numbers",
        content: `
          <p>Converting strings to numbers and formatting decimal places:</p>
        `,
        code: `// Parsing
console.log("parseInt('42px'):", parseInt("42px"));         // 42
console.log("parseFloat('3.1415'):", parseFloat("3.1415")); // 3.1415
console.log("Number('100'):", Number("100"));               // 100

// Formatting decimals (.toFixed)
let pi = 3.14159265;
console.log("pi.toFixed(2):", pi.toFixed(2)); // "3.14" (Note: returns a string!)

// Checking for NaN (Not-a-Number)
let invalid = Number("Hello");
console.log("Invalid conversion:", invalid); // NaN
console.log("Number.isNaN(invalid):", Number.isNaN(invalid)); // true`,
        runnable: true
      },
      {
        subId: "math-object-methods",
        title: "The Math Object Methods",
        content: `
          <p>Common utility methods on <code>Math</code>:</p>
        `,
        code: `console.log("Math.PI:", Math.PI);

// Rounding
console.log("Math.round(4.7):", Math.round(4.7)); // 5 (Nearest integer)
console.log("Math.floor(4.9):", Math.floor(4.9)); // 4 (Round down)
console.log("Math.ceil(4.1):", Math.ceil(4.1));   // 5 (Round up)
console.log("Math.trunc(4.9):", Math.trunc(4.9)); // 4 (Discard decimals)

// Min and Max
console.log("Math.min(10, 5, 20, 2):", Math.min(10, 5, 20, 2)); // 2
console.log("Math.max(10, 5, 20, 2):", Math.max(10, 5, 20, 2)); // 20

// Absolute, Power & Square root
console.log("Math.abs(-15):", Math.abs(-15)); // 15
console.log("Math.pow(2, 4):", Math.pow(2, 4)); // 16
console.log("Math.sqrt(64):", Math.sqrt(64));   // 8`,
        runnable: true
      },
      {
        subId: "random-numbers",
        title: "Generating Random Numbers (Formula)",
        content: `
          <p><code>Math.random()</code> returns a floating point number between <code>0</code> (inclusive) and <code>1</code> (exclusive).</p>
          <p>Here is the standard formula to generate random integers between <code>min</code> and <code>max</code> (both inclusive):</p>
        `,
        code: `// Generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Roll a 6-sided die
console.log("Dice roll 1:", getRandomInt(1, 6));
console.log("Dice roll 2:", getRandomInt(1, 6));
console.log("Random grade (50-100):", getRandomInt(50, 100));`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #9",
      description: "Write a function that simulates flipping a coin ('Heads' or 'Tails') using `Math.random()`.",
      solution: `function flipCoin() {
  return Math.random() < 0.5 ? "Heads" : "Tails";
}
console.log("Coin result:", flipCoin());`
    }
  },

  {
    id: "arrays",
    category: "Data Structures",
    title: "10. Arrays & Modern Array Methods",
    subtitle: "push, pop, splice, slice, map, filter, reduce, find, some, and every.",
    badge: "Crucial Skill",
    overview: `
      <p>An <strong>Array</strong> is an ordered list of values. Arrays in JavaScript are zero-indexed, dynamic in size, and can contain elements of any data type.</p>
    `,
    sections: [
      {
        subId: "array-basics",
        title: "Creating & Basic Array Modification",
        content: `
          <p>Fundamental methods that add and remove elements:</p>
        `,
        code: `const fruits = ["Apple", "Banana", "Cherry"];
console.log("Initial array:", fruits);
console.log("First fruit:", fruits[0]);
console.log("Total fruits:", fruits.length);

// Adding elements
fruits.push("Mango");       // Adds to the END
fruits.unshift("Strawberry"); // Adds to the START
console.log("After push & unshift:", fruits);

// Removing elements
let lastItem = fruits.pop();   // Removes from END
let firstItem = fruits.shift(); // Removes from START
console.log("Removed:", lastItem, "&", firstItem);
console.log("Current fruits:", fruits);

// Check if item exists
console.log("Includes 'Banana'?:", fruits.includes("Banana"));`,
        runnable: true
      },
      {
        subId: "modern-iterators",
        title: "Essential Array Methods: map, filter, reduce",
        content: `
          <p>Modern functional array methods allow you to transform and aggregate data without manual <code>for</code> loops!</p>
        `,
        code: `const numbers = [1, 2, 3, 4, 5, 6];

// 1. .map() -> Transforms each element and returns a NEW array
const doubled = numbers.map(num => num * 2);
console.log("Doubled (.map):", doubled);

// 2. .filter() -> Returns a new array with items that pass a test
const evens = numbers.filter(num => num % 2 === 0);
console.log("Evens (.filter):", evens);

// 3. .reduce() -> Combines all elements into a single accumulated result
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log("Sum (.reduce):", sum);

// 4. .find() & .findIndex()
const students = [
  { id: 101, name: "Alice", score: 92 },
  { id: 102, name: "Bob", score: 78 },
  { id: 103, name: "Charlie", score: 85 }
];
const topStudent = students.find(s => s.score > 90);
console.log("Top student (.find):", topStudent);`,
        runnable: true
      },
      {
        subId: "some-every-sort",
        title: "some, every, sort, and reverse",
        content: `
          <p>Helpful utility methods on arrays:</p>
        `,
        code: `const scores = [85, 92, 78, 64, 99];

// .some() -> Returns true if AT LEAST ONE item matches
const hasHonorStudent = scores.some(score => score >= 90);
console.log("Any score >= 90? (.some):", hasHonorStudent);

// .every() -> Returns true if ALL items match
const allPassed = scores.every(score => score >= 50);
console.log("Did everyone pass? (.every):", allPassed);

// .sort() -> Sorts array (Warning: default sort converts to strings!)
// For numbers, always provide a comparator function: (a, b) => a - b
const sortedAscending = [...scores].sort((a, b) => a - b);
console.log("Sorted Ascending:", sortedAscending);`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #10",
      description: "Given an array of temperatures in Celsius `[0, 15, 25, 30]`, use `.map()` to convert them to Fahrenheit: `(c * 9/5) + 32`.",
      solution: `const celsius = [0, 15, 25, 30];
const fahrenheit = celsius.map(c => (c * 9/5) + 32);
console.log("Fahrenheit temps:", fahrenheit);`
    }
  },

  {
    id: "objects",
    category: "Data Structures",
    title: "11. Objects & Object Methods",
    subtitle: "Key-value pairs, accessing properties, methods, destructuring, and Object utilities.",
    badge: "Core Structure",
    overview: `
      <p>An <strong>Object</strong> is a collection of related data and functionality stored as key-value pairs (properties and methods).</p>
    `,
    sections: [
      {
        subId: "object-basics",
        title: "Creating & Accessing Object Properties",
        content: `
          <p>Properties can be accessed using <strong>dot notation</strong> or <strong>bracket notation</strong>.</p>
        `,
        code: `const student = {
  firstName: "Samantha",
  lastName: "Reed",
  age: 20,
  major: "Computer Science",
  gpa: 3.85,
  skills: ["HTML", "CSS", "JavaScript"]
};

// Dot notation
console.log("First Name:", student.firstName);
console.log("GPA:", student.gpa);

// Bracket notation (useful for dynamic keys or spaces)
const lookupKey = "major";
console.log("Dynamic lookup:", student[lookupKey]);

// Modifying and adding properties
student.gpa = 3.92;
student.isEnrolled = true;
console.log("Updated student:", student);`,
        runnable: true
      },
      {
        subId: "object-methods-this",
        title: "Object Methods & 'this' Keyword",
        content: `
          <p>A method is a function stored as a property inside an object. The <code>this</code> keyword refers to the object the method belongs to.</p>
        `,
        code: `const userAccount = {
  username: "code_ninja",
  balance: 250,
  
  deposit(amount) {
    this.balance += amount;
    return \`Deposited \$\${amount}. New balance: \$\${this.balance}\`;
  },
  
  withdraw(amount) {
    if (amount > this.balance) {
      return "Insufficient funds!";
    }
    this.balance -= amount;
    return \`Withdrew \$\${amount}. New balance: \$\${this.balance}\`;
  }
};

console.log(userAccount.deposit(50));
console.log(userAccount.withdraw(120));`,
        runnable: true
      },
      {
        subId: "object-static-methods",
        title: "Object.keys(), Object.values(), and Object.entries()",
        content: `
          <p>Built-in static methods to inspect objects:</p>
        `,
        code: `const course = {
  code: "CS101",
  title: "Intro to Web Dev",
  credits: 4,
  semester: "Fall"
};

// 1. Object.keys() -> array of property names
console.log("Keys:", Object.keys(course));

// 2. Object.values() -> array of property values
console.log("Values:", Object.values(course));

// 3. Object.entries() -> array of [key, value] pairs
console.log("Entries:", Object.entries(course));`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #11",
      description: "Create a `car` object with `brand`, `model`, and a method `getCarInfo()` that returns 'This is a [brand] [model]'.",
      solution: `const car = {
  brand: "Toyota",
  model: "Corolla",
  getCarInfo() {
    return \`This is a \${this.brand} \${this.model}\`;
  }
};
console.log(car.getCarInfo());`
    }
  },

  {
    id: "dom-manipulation",
    category: "DOM & Browser APIs",
    title: "12. DOM Manipulation",
    subtitle: "Selecting elements, modifying text/HTML, styling, classList, and creating dynamic elements.",
    badge: "Web Interactivity",
    overview: `
      <p>The <strong>DOM (Document Object Model)</strong> is the browser's tree-like representation of your HTML document. JavaScript interacts with this tree to dynamically add, edit, or remove elements on the webpage.</p>
    `,
    sections: [
      {
        subId: "selecting-elements",
        title: "Selecting HTML Elements",
        content: `
          <p>Modern DOM selection uses <code>document.querySelector</code> and <code>document.querySelectorAll</code> with standard CSS selectors.</p>
        `,
        code: `// Simulating DOM element selection
// In real HTML:
// <h1 id="title">JavaScript Docs</h1>
// <p class="description">Learn JS step-by-step.</p>
// <ul class="list"><li>Item 1</li><li>Item 2</li></ul>

console.log("1. document.getElementById('title') -> returns element with ID");
console.log("2. document.querySelector('.description') -> returns first matching element");
console.log("3. document.querySelectorAll('.list li') -> returns NodeList of all matches");`,
        runnable: true
      },
      {
        subId: "modifying-dom",
        title: "Changing Text, HTML, Attributes & Styles",
        content: `
          <p>How to update elements programmatically:</p>
        `,
        code: `// Creating a virtual element in JS to demonstrate
const card = document.createElement("div");

// Changing text content safely (prevents XSS vulnerabilities)
card.textContent = "Hello Student!";

// Changing classes using classList
card.classList.add("student-card", "active");
console.log("Classes present:", card.className);
console.log("Contains 'active'?:", card.classList.contains("active"));

// Modifying inline style properties
card.style.backgroundColor = "#3b82f6";
card.style.color = "#ffffff";
card.style.padding = "10px";

console.log("Card outerHTML:", card.outerHTML);`,
        runnable: true
      },
      {
        subId: "creating-elements",
        title: "Creating & Appending Elements (createElement)",
        content: `
          <p>To dynamically build UI cards, lists, or tables:</p>
        `,
        code: `// Building a list item dynamically
const fruits = ["Apples", "Bananas", "Oranges"];
const ul = document.createElement("ul");

fruits.forEach(fruit => {
  const li = document.createElement("li");
  li.textContent = fruit;
  ul.appendChild(li);
});

console.log("Generated HTML List:\n", ul.outerHTML);`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #12",
      description: "Create an HTML button element with text 'Click Me' and add the class 'btn-primary' to it using JavaScript.",
      solution: `const btn = document.createElement("button");
btn.textContent = "Click Me";
btn.classList.add("btn-primary");
console.log(btn.outerHTML);`
    }
  },

  {
    id: "events",
    category: "DOM & Browser APIs",
    title: "13. Events & Event Handling",
    subtitle: "addEventListener, click, input, form submit, keyboard events, and the Event Object.",
    badge: "Interactivity",
    overview: `
      <p>Events are signals fired by the browser when something happens — for example, when the user clicks a button, types on the keyboard, submits a form, or resizes the browser window.</p>
    `,
    sections: [
      {
        subId: "add-event-listener",
        title: "addEventListener() Syntax",
        content: `
          <p>The standard way to attach an event handler to any DOM element.</p>
        `,
        code: `// Syntax: element.addEventListener(eventType, callbackFunction)

// Example simulation:
function handleClick(event) {
  console.log("Button clicked!");
  console.log("Target element:", event.target);
}

// In HTML with <button id="myBtn">Click</button>:
// const btn = document.querySelector("#myBtn");
// btn.addEventListener("click", handleClick);

console.log("Ready to listen for 'click', 'keydown', 'submit', 'input'!");`,
        runnable: true
      },
      {
        subId: "event-object-and-prevent-default",
        title: "The Event Object (e) & e.preventDefault()",
        content: `
          <p>When an event occurs, the browser automatically passes an <strong>Event Object</strong> (usually named <code>e</code> or <code>event</code>) containing critical details about the event.</p>
        `,
        code: `// Preventing default form submit page reload
function handleFormSubmit(e) {
  // Stop standard browser behavior (reloading the entire page)
  e.preventDefault();
  
  console.log("Form submitted seamlessly without reloading page!");
}

// Example Keyboard event:
function handleKeyPress(e) {
  console.log("Key pressed:", e.key);
  console.log("Key Code:", e.code);
  if (e.key === "Enter") {
    console.log("User pressed ENTER!");
  }
}

// Test key event simulation
handleKeyPress({ key: "Enter", code: "Enter" });`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #13",
      description: "Write an event listener callback function that logs 'Welcome!' whenever a button is clicked.",
      solution: `const onButtonClick = (e) => {
  console.log("Welcome! Button was clicked.");
};
onButtonClick({ type: "click" });`
    }
  },

  {
    id: "async-promises",
    category: "Asynchronous JavaScript",
    title: "14. Asynchronous JS: Promises & Async/Await",
    subtitle: "Call stack, event loop, setTimeout, Promise states (.then/.catch), and async/await.",
    badge: "Advanced Core",
    overview: `
      <p>JavaScript is single-threaded, meaning it can only execute one task at a time. <strong>Asynchronous programming</strong> allows long-running operations (such as network requests or timers) to happen in the background without freezing the user interface!</p>
    `,
    sections: [
      {
        subId: "settimeout-and-event-loop",
        title: "Timers: setTimeout() and setInterval()",
        content: `
          <p>Scheduling code execution after a delay:</p>
        `,
        code: `console.log("1. Program starts (Synchronous)");

// setTimeout runs once after specified milliseconds (1000ms = 1s)
setTimeout(() => {
  console.log("3. Timer finished! (Asynchronous callback)");
}, 500);

console.log("2. Program continues immediately without waiting!");`,
        runnable: true
      },
      {
        subId: "promises-explained",
        title: "Promises (.then, .catch, .finally)",
        content: `
          <p>A <strong>Promise</strong> represents a value that might be available now, in the future, or never. It has three states: <strong>Pending</strong>, <strong>Fulfilled</strong> (resolved), or <strong>Rejected</strong>.</p>
        `,
        code: `// Creating a Promise
const checkStudentHomework = new Promise((resolve, reject) => {
  let isDone = true; // Change to false to test reject

  if (isDone) {
    resolve("Homework submitted on time! Grade: 100 🌟");
  } else {
    reject("Homework missing! ⚠️");
  }
});

// Consuming the Promise
checkStudentHomework
  .then(result => {
    console.log("SUCCESS:", result);
  })
  .catch(error => {
    console.error("ERROR:", error);
  })
  .finally(() => {
    console.log("FINALLY: Grading process completed.");
  });`,
        runnable: true
      },
      {
        subId: "async-await-syntax",
        title: "Modern async / await",
        content: `
          <p>Introduced in ES2017, <code>async / await</code> is syntax sugar over Promises that makes asynchronous code look and read like clean synchronous code!</p>
        `,
        code: `// Helper function that returns a delayed promise
const fetchUserData = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "Marcus", role: "Student" });
    }, 400);
  });
};

// Async function
async function loadDashboard() {
  console.log("Loading dashboard...");
  try {
    const user = await fetchUserData(101); // Pauses until Promise resolves!
    console.log("User data received:", user);
    console.log("Welcome back,", user.name);
  } catch (err) {
    console.error("Failed to load user:", err);
  }
}

loadDashboard();`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #14",
      description: "Create an async function that waits for a 1-second Promise and then logs 'Done waiting!'.",
      solution: `const waitOneSec = () => new Promise(res => setTimeout(res, 1000));
async function testWait() {
  console.log("Waiting...");
  await waitOneSec();
  console.log("Done waiting!");
}
testWait();`
    }
  },

  {
    id: "fetch-api",
    category: "Asynchronous JavaScript",
    title: "15. Fetch API & JSON",
    subtitle: "Making HTTP requests, parsing JSON, handling responses, and POSTing data.",
    badge: "Web APIs",
    overview: `
      <p>The <strong>Fetch API</strong> provides a modern interface for fetching resources asynchronously across the network. It returns Promises that resolve to the Response object.</p>
    `,
    sections: [
      {
        subId: "json-methods",
        title: "Working with JSON (stringify & parse)",
        content: `
          <p><strong>JSON (JavaScript Object Notation)</strong> is the universal text format for sending data across the web.</p>
        `,
        code: `const studentObj = {
  name: "Leo",
  course: "Full-Stack Web Dev",
  lessonsCompleted: 15
};

// 1. JSON.stringify() -> Converts JS Object to JSON String
const jsonString = JSON.stringify(studentObj);
console.log("JSON String:", jsonString);
console.log("Type:", typeof jsonString); // string

// 2. JSON.parse() -> Converts JSON String back to JS Object
const parsedObject = JSON.parse(jsonString);
console.log("Parsed Object:", parsedObject.name);`,
        runnable: true
      },
      {
        subId: "fetch-get-request",
        title: "Making a GET Request with fetch()",
        content: `
          <p>How to fetch data from an API using <code>async / await</code>:</p>
        `,
        code: `// Fetching sample post data from JSONPlaceholder API
async function getPostData() {
  try {
    console.log("Fetching data from API...");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    
    // Check if HTTP status is OK (200-299)
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    console.log("Post Title:", data.title);
    console.log("Post Body preview:", data.body.slice(0, 50) + "...");
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}

getPostData();`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #15",
      description: "Convert the JavaScript object `{ item: 'Book', price: 15 }` into a formatted JSON string.",
      solution: `const product = { item: 'Book', price: 15 };
const jsonOut = JSON.stringify(product, null, 2);
console.log(jsonOut);`
    }
  },

  {
    id: "modern-es6",
    category: "Modern ES6+ Features",
    title: "16. Modern ES6+ Features & Syntax",
    subtitle: "Destructuring, Spread/Rest operators, default parameters, modules, and shorthands.",
    badge: "Modern Standards",
    overview: `
      <p>ECMAScript 6 (ES6 / ES2015) and subsequent yearly updates brought revolutionary enhancements that transformed JavaScript into a clean, modern, and expressive language.</p>
    `,
    sections: [
      {
        subId: "destructuring-assignment",
        title: "Destructuring (Arrays & Objects)",
        content: `
          <p>Destructuring allows you to unpack values from arrays or properties from objects into distinct variables in one line.</p>
        `,
        code: `// 1. Object Destructuring
const developer = {
  devName: "Aiden",
  role: "Frontend Engineer",
  yearsExperience: 4,
  country: "Canada"
};

// Extracting properties into local variables
const { devName, role, country, salary = 75000 } = developer;
console.log(devName, "is a", role, "based in", country, "- Salary:", salary);

// 2. Array Destructuring
const colors = ["#ff0000", "#00ff00", "#0000ff"];
const [red, green, blue] = colors;
console.log("RGB colors:", red, green, blue);

// Swapping variables with destructuring!
let x = 1, y = 2;
[x, y] = [y, x];
console.log("Swapped: x =", x, "y =", y);`,
        runnable: true
      },
      {
        subId: "spread-operator",
        title: "The Spread Operator (...)",
        content: `
          <p>The spread operator expands an iterable (like an array or object) into individual elements.</p>
        `,
        code: `// 1. Combining Arrays
const fruits = ["Apple", "Orange"];
const vegetables = ["Carrot", "Spinach"];
const groceries = [...fruits, ...vegetables, "Milk"];
console.log("Groceries:", groceries);

// 2. Cloning & Merging Objects
const baseUser = { id: 1, name: "Sam" };
const userSettings = { theme: "dark", notifications: true };

const fullProfile = {
  ...baseUser,
  ...userSettings,
  lastLogin: "Today"
};
console.log("Merged Profile:", fullProfile);`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #16",
      description: "Given an array `[first, ...rest] = [10, 20, 30, 40]`, print `first` and `rest` to inspect them.",
      solution: `const [first, ...rest] = [10, 20, 30, 40];
console.log("First:", first);
console.log("Rest:", rest);`
    }
  },

  {
    id: "browser-storage",
    category: "DOM & Browser APIs",
    title: "17. Browser Storage: localStorage",
    subtitle: "Storing key-value data persistently in the browser across page refreshes.",
    badge: "Data Persistence",
    overview: `
      <p>Web Storage APIs allow web applications to store data locally within the user's browser without sending it to a server. <code>localStorage</code> persists even after closing the browser tab or restarting the computer!</p>
    `,
    sections: [
      {
        subId: "localstorage-crud",
        title: "localStorage CRUD Operations",
        content: `
          <p>Four primary methods for interacting with <code>localStorage</code>:</p>
        `,
        code: `// 1. Create / Update (setItem)
localStorage.setItem("username", "student_42");
localStorage.setItem("preferredTheme", "dark");

// 2. Read (getItem)
const storedUser = localStorage.getItem("username");
console.log("Retrieved User:", storedUser);

// 3. Storing complex Objects / Arrays with JSON
const studentProgress = { topic: "JavaScript", score: 95, completed: true };
localStorage.setItem("jsProgress", JSON.stringify(studentProgress));

const savedProgress = JSON.parse(localStorage.getItem("jsProgress"));
console.log("Saved Topic:", savedProgress.topic, "- Score:", savedProgress.score);

// 4. Delete item (removeItem)
localStorage.removeItem("preferredTheme");

// 5. Clear all storage (clear)
// localStorage.clear();`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #17",
      description: "Save an array of your top 3 favorite songs in `localStorage` as JSON and retrieve the first song.",
      solution: `const songs = ["Song A", "Song B", "Song C"];
localStorage.setItem("mySongs", JSON.stringify(songs));
const loaded = JSON.parse(localStorage.getItem("mySongs"));
console.log("First song:", loaded[0]);`
    }
  },

  {
    id: "error-handling",
    category: "Advanced & Best Practices",
    title: "18. Error Handling & Debugging",
    subtitle: "try...catch...finally, custom errors, common JS exceptions, and console tips.",
    badge: "Best Practices",
    overview: `
      <p>Bugs and runtime errors happen in every program. Professional developers use structured error handling to catch unexpected errors gracefully without crashing the whole application.</p>
    `,
    sections: [
      {
        subId: "try-catch-finally",
        title: "try...catch...finally Block",
        content: `
          <p>The standard pattern to handle potential runtime errors:</p>
        `,
        code: `function divideNumbers(a, b) {
  try {
    console.log("Attempting division:", a, "/", b);
    if (b === 0) {
      // Throw custom error
      throw new Error("Division by zero is not allowed!");
    }
    return a / b;
  } catch (error) {
    console.error("Caught an Error:", error.message);
    return null; // Graceful fallback
  } finally {
    console.log("Finally block: Always executes whether error happened or not!");
  }
}

console.log("Result 1:", divideNumbers(10, 2));
console.log("Result 2:", divideNumbers(10, 0));`,
        runnable: true
      },
      {
        subId: "common-js-errors",
        title: "Common JavaScript Errors & What They Mean",
        content: `
          <div class="table-responsive">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Error Type</th>
                  <th>What Caused It</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ReferenceError</code></td>
                  <td>Using a variable that hasn't been declared or is out of scope</td>
                  <td><code>console.log(undefinedVar)</code></td>
                </tr>
                <tr>
                  <td><code>TypeError</code></td>
                  <td>Attempting an illegal operation on a value (e.g. calling non-function or accessing null property)</td>
                  <td><code>null.toUpperCase()</code></td>
                </tr>
                <tr>
                  <td><code>SyntaxError</code></td>
                  <td>Invalid JavaScript code structure that cannot be parsed</td>
                  <td><code>let x = ;</code></td>
                </tr>
                <tr>
                  <td><code>RangeError</code></td>
                  <td>Number is outside permissible numeric range</td>
                  <td><code>new Array(-1)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        code: `// Demonstrating ReferenceError handling
try {
  let result = nonExistentVariable + 10;
} catch (err) {
  console.log("Error Name:", err.name);
  console.log("Error Message:", err.message);
}`,
        runnable: true
      }
    ],
    challenge: {
      title: "Student Challenge #18",
      description: "Write a function `validateAge(age)` that throws an error if age is less than 0 or not a number.",
      solution: `function validateAge(age) {
  if (typeof age !== "number" || age < 0) {
    throw new Error("Age must be a positive number");
  }
  return "Valid age: " + age;
}

try {
  console.log(validateAge(25));
  validateAge(-5);
} catch (e) {
  console.log("Caught:", e.message);
}`
    }
  }
];

// Quick Cheat Sheet Data for Students
const CHEATSHEET_DATA = [
  {
    category: "Variables & Types",
    items: [
      { code: "const x = 10;", desc: "Immutable variable binding" },
      { code: "let y = 20;", desc: "Reassignable block-scoped variable" },
      { code: "typeof val", desc: "Returns type of value as string" },
      { code: "Number(str)", desc: "Converts value to number" },
      { code: "String(val)", desc: "Converts value to string" },
      { code: "Boolean(val)", desc: "Converts value to true or false" }
    ]
  },
  {
    category: "Array Methods",
    items: [
      { code: "arr.push(item)", desc: "Adds item to the end of array" },
      { code: "arr.pop()", desc: "Removes & returns last item" },
      { code: "arr.map(fn)", desc: "Transforms each item into new array" },
      { code: "arr.filter(fn)", desc: "Keeps items that return true" },
      { code: "arr.reduce(fn, init)", desc: "Combines items to single value" },
      { code: "arr.find(fn)", desc: "Returns first matching item" },
      { code: "arr.includes(val)", desc: "Checks if value is in array" }
    ]
  },
  {
    category: "DOM Manipulation",
    items: [
      { code: "document.querySelector('sel')", desc: "Selects first matching element" },
      { code: "document.querySelectorAll('sel')", desc: "Selects all matching elements" },
      { code: "el.textContent = 'text'", desc: "Sets safe text content" },
      { code: "el.classList.add('cls')", desc: "Adds CSS class" },
      { code: "el.classList.toggle('cls')", desc: "Toggles CSS class" },
      { code: "el.addEventListener('evt', fn)", desc: "Attaches event listener" }
    ]
  },
  {
    category: "Modern ES6+ Syntax",
    items: [
      { code: "const fn = (a, b) => a + b", desc: "Arrow function" },
      { code: "const { x, y } = obj;", desc: "Object destructuring" },
      { code: "const [a, b] = arr;", desc: "Array destructuring" },
      { code: "const combined = [...a, ...b];", desc: "Spread operator" },
      { code: "obj?.prop?.subProp", desc: "Optional chaining" },
      { code: "val ?? 'fallback'", desc: "Nullish coalescing" }
    ]
  }
];

// Interactive Quiz Questions for Students
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which keyword should you use by default when declaring a variable whose value will not change?",
    options: [
      "const",
      "let",
      "var",
      "def"
    ],
    correct: 0,
    explanation: "In modern JavaScript, 'const' should be your default choice for declaring variables unless you know their value must be reassigned, in which case you use 'let'."
  },
  {
    id: 2,
    question: "What is the output of `typeof null` in JavaScript?",
    options: [
      "'null'",
      "'object'",
      "'undefined'",
      "'boolean'"
    ],
    correct: 1,
    explanation: "Due to a historic bug in the original 1995 JavaScript implementation, `typeof null` returns 'object', even though null is actually a primitive type."
  },
  {
    id: 3,
    question: "What will `console.log('5' + 3)` output?",
    options: [
      "8",
      "'53'",
      "NaN",
      "TypeError"
    ],
    correct: 1,
    explanation: "When the plus (+) operator is used with a string operand, JavaScript coerces the other operand to a string and performs string concatenation ('5' + '3' = '53')."
  },
  {
    id: 4,
    question: "What is the difference between `==` and `===`?",
    options: [
      "`==` compares only objects, `===` compares primitives",
      "`==` performs type coercion before comparing, `===` checks both value and type strictly",
      "`===` is an older deprecated version of `==`",
      "There is no difference"
    ],
    correct: 1,
    explanation: "`===` is the strict equality operator that checks both the data type and value without performing automatic type conversion."
  },
  {
    id: 5,
    question: "Which of the following values is TRUTHY?",
    options: [
      "0",
      "'' (empty string)",
      "[] (empty array)",
      "null"
    ],
    correct: 2,
    explanation: "In JavaScript, all objects and arrays (even empty arrays `[]` and empty objects `{}`) are truthy. Only 0, '', null, undefined, NaN, and false are falsy."
  },
  {
    id: 6,
    question: "Which array method returns a NEW array containing only items that satisfy a given condition?",
    options: [
      ".map()",
      ".filter()",
      ".forEach()",
      ".reduce()"
    ],
    correct: 1,
    explanation: "`.filter()` runs a predicate function on every element and returns a new array with all elements that returned true."
  },
  {
    id: 7,
    question: "What does the `??` (Nullish Coalescing) operator check for?",
    options: [
      "Any falsy value (0, false, '')",
      "Only `null` or `undefined`",
      "Only `NaN`",
      "Only boolean `false`"
    ],
    correct: 1,
    explanation: "`??` returns the right-hand operand only when the left-hand operand is null or undefined, preserving valid values like `0` or `''`."
  },
  {
    id: 8,
    question: "How do you select an element with ID 'submit-btn' using `querySelector`?",
    options: [
      "document.querySelector('submit-btn')",
      "document.querySelector('.submit-btn')",
      "document.querySelector('#submit-btn')",
      "document.querySelector('@submit-btn')"
    ],
    correct: 2,
    explanation: "In CSS selectors, the hash `#` symbol denotes an ID, so `document.querySelector('#submit-btn')` targets the ID."
  },
  {
    id: 9,
    question: "What does `e.preventDefault()` do inside an event listener?",
    options: [
      "Prevents JavaScript errors from throwing",
      "Prevents the default browser action for that event (such as a form submitting and reloading the page)",
      "Deletes the target HTML element",
      "Stops event bubbling up the DOM tree"
    ],
    correct: 1,
    explanation: "`e.preventDefault()` halts the browser's default behavior, such as preventing a form submit from refreshing the page or a link from navigating."
  },
  {
    id: 10,
    question: "What does an `async` function always return?",
    options: [
      "A Promise",
      "A Boolean",
      "Undefined",
      "A Callback"
    ],
    correct: 0,
    explanation: "Any function marked with the `async` keyword automatically returns a Promise, resolving to whatever value is returned from the function."
  },
  {
    id: 11,
    question: "Which method is used to store data permanently in the user's browser?",
    options: [
      "sessionStorage.setItem()",
      "localStorage.setItem()",
      "document.cookie.store()",
      "cache.save()"
    ],
    correct: 1,
    explanation: "`localStorage` persists data across browser sessions and computer restarts until explicitly cleared."
  },
  {
    id: 12,
    question: "How do you safely access a deeply nested property without crashing if an intermediate object is null or undefined?",
    options: [
      "user||profile||avatar",
      "user?.profile?.avatar",
      "user??profile??avatar",
      "user.exists('profile.avatar')"
    ],
    correct: 1,
    explanation: "Optional chaining `?.` short-circuits and returns `undefined` if the reference is nullish, preventing 'Cannot read property of undefined' errors."
  }
];
