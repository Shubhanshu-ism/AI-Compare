# React/JS Frontend Interview Questions (0-3 Years Experience)
## Comprehensive Guide for Indian Startups & Service Companies

---

## Table of Contents
1. [JavaScript Core Concepts](#javascript-core-concepts)
2. [JavaScript DSA Questions](#javascript-dsa-questions)
3. [JavaScript ES6+ Features](#javascript-es6-features)
4. [React Fundamentals](#react-fundamentals)
5. [React Hooks](#react-hooks)
6. [React Performance & Advanced](#react-performance-advanced)
7. [DOM Manipulation](#dom-manipulation)
8. [Asynchronous JavaScript](#asynchronous-javascript)
9. [Array Methods](#array-methods)
10. [CSS & Layout](#css-layout)
11. [API & Data Fetching](#api-data-fetching)
12. [Testing & Error Handling](#testing-error-handling)

---

## JavaScript Core Concepts

### 1. **What is a closure in JavaScript?**

**Answer:** A closure is a function that has access to variables from its outer (enclosing) function's scope, even after the outer function has finished executing.

**Analogy:** Think of a closure like a backpack. When you go on a trip (inner function), you pack items (variables) from your home (outer function). Even when you're far from home, you still have access to those items in your backpack.

**Code Example:**
```javascript
function outer() {
  const name = "JavaScript";
  
  function inner() {
    console.log(name); // Can access 'name' from outer scope
  }
  
  return inner;
}

const closureFunc = outer();
closureFunc(); // Output: "JavaScript"
```

**Interview Tip:** Closures are commonly used for data privacy, creating factory functions, and in event handlers.

---

### 2. **Explain the difference between `var`, `let`, and `const`.**

**Answer:**
- **`var`**: Function-scoped, hoisted, can be re-declared and updated
- **`let`**: Block-scoped, hoisted but not initialized, can be updated but not re-declared
- **`const`**: Block-scoped, hoisted but not initialized, cannot be updated or re-declared

**Analogy:** Think of variable declarations like rooms:
- `var` is like a room with no walls (accessible everywhere in function)
- `let` is like a room with walls (only accessible in that block)
- `const` is like a locked room (can't change what's inside)

**Code Example:**
```javascript
// var - function scoped
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (accessible outside block)
}

// let - block scoped
function letExample() {
  if (true) {
    let y = 20;
  }
  console.log(y); // ReferenceError: y is not defined
}

// const - cannot be reassigned
const PI = 3.14;
PI = 3.15; // TypeError: Assignment to constant variable
```

---

### 3. **What is hoisting in JavaScript?**

**Answer:** Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope (function or global) before code execution.

**Analogy:** Imagine you're organizing a party. Before guests arrive (code execution), you prepare the guest list (declarations) first, even if you wrote it at the bottom of your planning notes.

**Code Example:**
```javascript
console.log(x); // undefined (declaration hoisted, not initialization)
var x = 5;

// What actually happens:
// var x;
// console.log(x);
// x = 5;

// Functions are fully hoisted
greet(); // "Hello!" - works fine
function greet() {
  console.log("Hello!");
}

// let and const are hoisted but in "temporal dead zone"
console.log(y); // ReferenceError
let y = 10;
```

---

### 4. **Explain `this` keyword in JavaScript.**

**Answer:** `this` refers to the object that is executing the current function. Its value depends on how the function is called.

**Analogy:** `this` is like the word "I" in conversation. Who "I" refers to depends on who's speaking. Similarly, `this` refers to different objects depending on the context.

**Code Example:**
```javascript
// Global context
console.log(this); // Window object (in browser)

// Object method
const person = {
  name: "Alice",
  greet: function() {
    console.log(this.name); // "Alice"
  }
};
person.greet();

// Arrow function (lexical this)
const obj = {
  name: "Bob",
  regularFunc: function() {
    setTimeout(function() {
      console.log(this.name); // undefined (this is Window)
    }, 100);
  },
  arrowFunc: function() {
    setTimeout(() => {
      console.log(this.name); // "Bob" (this from parent scope)
    }, 100);
  }
};
```

---

### 5. **What are `call()`, `apply()`, and `bind()` methods?**

**Answer:** These methods are used to set the `this` value explicitly when calling a function.
- **call()**: Invokes function with given `this` and arguments individually
- **apply()**: Same as call but takes arguments as an array
- **bind()**: Returns a new function with `this` bound to the specified value

**Analogy:** Think of these as ways to borrow someone else's phone:
- `call()`: You borrow the phone and dial each number individually
- `apply()`: You borrow the phone with a pre-dialed list
- `bind()`: You get a phone card that permanently works on their account

**Code Example:**
```javascript
const person1 = { name: "John" };
const person2 = { name: "Jane" };

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

// call()
greet.call(person1, "Hello", "!"); // "Hello, John!"

// apply()
greet.apply(person2, ["Hi", "."]); // "Hi, Jane."

// bind()
const greetJohn = greet.bind(person1);
greetJohn("Hey", "!!!"); // "Hey, John!!!"
```

---

### 6. **What is the difference between `==` and `===`?**

**Answer:**
- **`==`** (Abstract Equality): Compares values after type coercion
- **`===`** (Strict Equality): Compares both value and type without coercion

**Analogy:** `==` is like saying "close enough" while `===` is like demanding "exact match."

**Code Example:**
```javascript
// == (type coercion happens)
5 == "5"    // true
0 == false  // true
null == undefined // true

// === (no type coercion)
5 === "5"   // false
0 === false // false
null === undefined // false

// Best practice: Always use === unless you specifically need type coercion
```

---

### 7. **Explain event bubbling and event capturing.**

**Answer:**
- **Event Bubbling**: Events propagate from the target element up to the root
- **Event Capturing**: Events propagate from the root down to the target element

**Analogy:** Think of dropping a stone in water:
- Bubbling is like ripples moving outward from where the stone landed
- Capturing is like watching the stone fall through water layers before it hits the bottom

**Code Example:**
```javascript
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked');
}, false); // false = bubbling phase (default)

document.getElementById('child').addEventListener('click', () => {
  console.log('Child clicked');
}, false);

// Clicking child logs:
// "Child clicked"
// "Parent clicked"

// To use capturing phase:
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked (capturing)');
}, true); // true = capturing phase

// Stop propagation
document.getElementById('child').addEventListener('click', (e) => {
  e.stopPropagation(); // Prevents bubbling
  console.log('Child clicked');
});
```

---

### 8. **What is event delegation?**

**Answer:** Event delegation is a technique where you attach a single event listener to a parent element to handle events from its children, leveraging event bubbling.

**Analogy:** Instead of hiring individual security guards for each shop in a mall, you hire one guard at the entrance who monitors everyone.

**Code Example:**
```javascript
// Without delegation (inefficient)
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    console.log('Button clicked');
  });
});

// With delegation (efficient)
document.getElementById('container').addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    console.log('Button clicked:', e.target.textContent);
  }
});

// Benefits: Better performance, works with dynamically added elements
```

---

### 9. **What is prototypal inheritance?**

**Answer:** JavaScript objects can inherit properties and methods from other objects through the prototype chain. Every object has an internal `[[Prototype]]` property.

**Analogy:** Think of DNA inheritance. Just as children inherit traits from parents, JavaScript objects inherit properties from their prototypes.

**Code Example:**
```javascript
// Constructor function
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person("John");
john.greet(); // "Hello, I'm John"

// Prototype chain
console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true

// ES6 Class syntax (syntactic sugar over prototypal inheritance)
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}
```

---

### 10. **Explain higher-order functions.**

**Answer:** A higher-order function is a function that either takes one or more functions as arguments or returns a function as its result.

**Analogy:** Think of a higher-order function like a manager who delegates tasks. The manager (higher-order function) takes instructions (callback functions) and executes them.

**Code Example:**
```javascript
// Function that takes another function as argument
function operate(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(operate(5, 3, add));      // 8
console.log(operate(5, 3, multiply)); // 15

// Function that returns a function
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Common higher-order functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
```

---

### 11. **What is debouncing and throttling?**

**Answer:**
- **Debouncing**: Delays function execution until after a certain time has passed since the last call
- **Throttling**: Ensures function executes at most once in a specified time period

**Analogy:**
- Debouncing is like waiting for an elevator—it won't close doors until everyone stops entering
- Throttling is like an elevator that departs every 5 minutes regardless of how many times the button is pressed

**Code Example:**
```javascript
// Debounce
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Use case: Search input
const searchInput = debounce((query) => {
  console.log('Searching for:', query);
}, 500);

// Throttle
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Use case: Scroll event
const handleScroll = throttle(() => {
  console.log('Scrolling...');
}, 2000);

window.addEventListener('scroll', handleScroll);
```

---

### 12. **What is the difference between `null` and `undefined`?**

**Answer:**
- **`undefined`**: Variable declared but not assigned a value
- **`null`**: Intentional absence of any object value

**Analogy:**
- `undefined` is like an empty parking spot that was reserved but no car came
- `null` is like an empty parking spot with a sign saying "No parking"

**Code Example:**
```javascript
let a;
console.log(a); // undefined (declared but not initialized)

let b = null;
console.log(b); // null (explicitly set to no value)

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (historical bug in JS)

// Common scenarios
function greet(name) {
  console.log(name); // undefined if not passed
}
greet();

const obj = { name: null }; // Explicitly no name
```

---

### 13. **Explain the `typeof` operator.**

**Answer:** The `typeof` operator returns a string indicating the type of the operand.

**Code Example:**
```javascript
console.log(typeof 42);           // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (known bug)
console.log(typeof {});           // "object"
console.log(typeof []);           // "object"
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());     // "symbol"

// Better array check
Array.isArray([]);     // true
Array.isArray({});     // false
```

---

### 14. **What are template literals?**

**Answer:** Template literals are string literals that allow embedded expressions, multi-line strings, and string interpolation using backticks (`` ` ``).

**Code Example:**
```javascript
// String interpolation
const name = "Alice";
const age = 25;
console.log(`My name is ${name} and I'm ${age} years old.`);

// Multi-line strings
const message = `
  This is a
  multi-line
  string
`;

// Expression evaluation
const a = 5;
const b = 10;
console.log(`Sum: ${a + b}`); // "Sum: 15"

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    `${result}${str}<strong>${values[i] || ''}</strong>`, 
  '');
}

const user = "John";
const role = "Admin";
const html = highlight`User: ${user}, Role: ${role}`;
```

---

### 15. **What is the spread operator and rest parameter?**

**Answer:**
- **Spread (...)**: Expands an iterable into individual elements
- **Rest (...)**: Collects multiple elements into an array

**Analogy:** Spread is like unpacking a suitcase, rest is like packing items into a suitcase.

**Code Example:**
```javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // {a:1, b:2, c:3, d:4}

// Clone array
const original = [1, 2, 3];
const clone = [...original];

// Rest parameter
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]
```

---

## JavaScript DSA Questions

### 16. **Check if a string is a palindrome**

**Answer:** A palindrome reads the same forward and backward.

**Analogy:** Like "racecar" or "madam"—it's the same when you read it from either direction.

**Code Example:**
```javascript
// Method 1: Two pointers
function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Method 2: Reverse and compare
function isPalindrome2(str) {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return str === str.split('').reverse().join('');
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false

// Time Complexity: O(n)
// Space Complexity: O(1) for method 1, O(n) for method 2
```

---

### 17. **Find the maximum sum subarray (Kadane's Algorithm)**

**Answer:** Find the contiguous subarray with the largest sum.

**Analogy:** Imagine tracking your bank balance—you keep a running total and remember your highest balance ever reached.

**Code Example:**
```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6 ([4,-1,2,1])
console.log(maxSubArray([1])); // 1
console.log(maxSubArray([5,4,-1,7,8])); // 23

// Time Complexity: O(n)
// Space Complexity: O(1)
```

---

### 18. **Two Sum Problem**

**Answer:** Find two numbers in an array that add up to a target.

**Analogy:** Like finding two puzzle pieces that fit together perfectly.

**Code Example:**
```javascript
// Method 1: Brute Force
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
// Time: O(n²), Space: O(1)

// Method 2: Hash Map (Optimized)
function twoSumOptimized(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n)

console.log(twoSumOptimized([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSumOptimized([3, 2, 4], 6));      // [1, 2]
```

---

### 19. **Reverse a linked list**

**Answer:** Reverse the direction of pointers in a singly linked list.

**Analogy:** Like reversing the direction of a train track so the train goes backward.

**Code Example:**
```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Iterative approach
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  
  return prev;
}

// Recursive approach
function reverseListRecursive(head) {
  if (head === null || head.next === null) {
    return head;
  }
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// Time Complexity: O(n)
// Space Complexity: O(1) iterative, O(n) recursive (call stack)
```

---

### 20. **Valid Anagram**

**Answer:** Check if two strings are anagrams (contain the same characters with same frequency).

**Analogy:** Like checking if two bags of Scrabble tiles contain exactly the same letters.

**Code Example:**
```javascript
// Method 1: Sorting
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
}
// Time: O(n log n), Space: O(1)

// Method 2: Hash Map (Optimized)
function isAnagramOptimized(s, t) {
  if (s.length !== t.length) return false;
  
  const charCount = {};
  
  for (let char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  for (let char of t) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }
  
  return true;
}
// Time: O(n), Space: O(1) - max 26 letters

console.log(isAnagramOptimized("anagram", "nagaram")); // true
console.log(isAnagramOptimized("rat", "car")); // false
```

---

### 21. **Binary Search**

**Answer:** Search for a target value in a sorted array by repeatedly dividing the search interval in half.

**Analogy:** Like finding a word in a dictionary—you open to the middle, then decide whether to search the left or right half.

**Code Example:**
```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}

console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); // 3
console.log(binarySearch([1, 3, 5, 7, 9, 11], 4)); // -1

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}

// Time Complexity: O(log n)
// Space Complexity: O(1) iterative, O(log n) recursive
```

---

### 22. **Fibonacci Number**

**Answer:** Find the nth Fibonacci number where F(n) = F(n-1) + F(n-2).

**Analogy:** Like rabbit population growth—each generation adds to the previous generations.

**Code Example:**
```javascript
// Method 1: Recursion (inefficient)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// Time: O(2^n), Space: O(n)

// Method 2: Memoization (optimized recursion)
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
// Time: O(n), Space: O(n)

// Method 3: Iteration (most efficient)
function fibIterative(n) {
  if (n <= 1) return n;
  
  let prev = 0, curr = 1;
  
  for (let i = 2; i <= n; i++) {
    const temp = curr;
    curr = prev + curr;
    prev = temp;
  }
  
  return curr;
}
// Time: O(n), Space: O(1)

console.log(fibIterative(10)); // 55
```

---

### 23. **Longest Substring Without Repeating Characters (Sliding Window)**

**Answer:** Find the length of the longest substring without repeating characters.

**Analogy:** Like a window that slides along a string, expanding when characters are unique and shrinking when duplicates are found.

**Code Example:**
```javascript
function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // 3 ("wke")

// Time Complexity: O(n)
// Space Complexity: O(min(n, m)) where m is charset size
```

---

### 24. **Find Missing Number**

**Answer:** Given an array containing n distinct numbers from 0 to n, find the missing number.

**Analogy:** Like a roll call in class—when one student doesn't respond, you know who's absent.

**Code Example:**
```javascript
// Method 1: Math formula
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// Method 2: XOR (clever bit manipulation)
function missingNumberXOR(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1]));    // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8

// Time Complexity: O(n)
// Space Complexity: O(1)
```

---

### 25. **Merge Two Sorted Arrays**

**Answer:** Merge two sorted arrays into one sorted array.

**Analogy:** Like merging two sorted decks of cards into one sorted deck.

**Code Example:**
```javascript
function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }
  
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }
  
  return merged;
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); 
// [1, 2, 3, 4, 5, 6]

// Time Complexity: O(n + m)
// Space Complexity: O(n + m)
```

---

### 26. **Valid Parentheses (Stack)**

**Answer:** Check if a string of parentheses is valid (properly opened and closed).

**Analogy:** Like checking if every opening bracket has a matching closing bracket, in the correct order.

**Code Example:**
```javascript
function isValidParentheses(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

console.log(isValidParentheses("()"));     // true
console.log(isValidParentheses("()[]{}"));  // true
console.log(isValidParentheses("(]"));     // false
console.log(isValidParentheses("([)]"));   // false

// Time Complexity: O(n)
// Space Complexity: O(n)
```

---

### 27. **First Non-Repeating Character**

**Answer:** Find the first character in a string that doesn't repeat.

**Code Example:**
```javascript
function firstUniqChar(s) {
  const charCount = {};
  
  // Count frequency
  for (let char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Find first non-repeating
  for (let i = 0; i < s.length; i++) {
    if (charCount[s[i]] === 1) {
      return i;
    }
  }
  
  return -1;
}

console.log(firstUniqChar("leetcode")); // 0 ('l')
console.log(firstUniqChar("loveleetcode")); // 2 ('v')
console.log(firstUniqChar("aabb")); // -1

// Time Complexity: O(n)
// Space Complexity: O(1) - max 26 letters
```

---

### 28. **Remove Duplicates from Sorted Array**

**Answer:** Remove duplicates in-place from a sorted array.

**Analogy:** Like cleaning a bookshelf where duplicate books are next to each other—you keep only one copy.

**Code Example:**
```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let i = 0; // Slow pointer
  
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  
  return i + 1; // Length of unique elements
}

const arr = [1, 1, 2, 2, 3, 4, 4];
const length = removeDuplicates(arr);
console.log(arr.slice(0, length)); // [1, 2, 3, 4]

// Time Complexity: O(n)
// Space Complexity: O(1)
```

---

### 29. **Move Zeros to End**

**Answer:** Move all zeros to the end while maintaining the order of non-zero elements.

**Code Example:**
```javascript
function moveZeroes(nums) {
  let nonZeroIndex = 0;
  
  // Move all non-zero elements forward
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i];
      nonZeroIndex++;
    }
  }
  
  // Fill remaining with zeros
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
  
  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]

// Time Complexity: O(n)
// Space Complexity: O(1)
```

---

### 30. **Find Intersection of Two Arrays**

**Answer:** Find common elements between two arrays.

**Code Example:**
```javascript
// Method 1: Using Set
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();
  
  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }
  
  return Array.from(result);
}

// Method 2: Two pointers (if sorted)
function intersectionSorted(nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  
  const result = [];
  let i = 0, j = 0;
  
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      if (result[result.length - 1] !== nums1[i]) {
        result.push(nums1[i]);
      }
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }
  
  return result;
}

console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
```

---

### 31. **Rotate Array**

**Answer:** Rotate array to the right by k steps.

**Code Example:**
```javascript
// Method 1: Extra array
function rotate(nums, k) {
  k = k % nums.length;
  const result = [...nums.slice(-k), ...nums.slice(0, -k)];
  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }
}

// Method 2: Reverse (in-place, optimal)
function rotateOptimal(nums, k) {
  k = k % nums.length;
  
  // Helper function to reverse array segment
  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };
  
  reverse(nums, 0, nums.length - 1);  // Reverse entire array
  reverse(nums, 0, k - 1);             // Reverse first k elements
  reverse(nums, k, nums.length - 1);   // Reverse remaining
}

const arr = [1, 2, 3, 4, 5, 6, 7];
rotateOptimal(arr, 3);
console.log(arr); // [5, 6, 7, 1, 2, 3, 4]

// Time Complexity: O(n)
// Space Complexity: O(1)
```

---

### 32. **Stock Buy and Sell (Best Time)**

**Answer:** Find the maximum profit from buying and selling stock once.

**Analogy:** Buy when price is low, sell when price is high—track the minimum price seen so far.

**Code Example:**
```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  
  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy at 1, sell at 6)
console.log(maxProfit([7, 6, 4, 3, 1]));    // 0 (no profit possible)

// Time Complexity: O(n)
// Space Complexity: O(1)
```

---

### 33. **Find Duplicate Number**

**Answer:** Find the duplicate number in an array containing n+1 integers where each integer is between 1 and n.

**Code Example:**
```javascript
// Method 1: Floyd's Cycle Detection (optimal)
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];
  
  // Find intersection point
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  
  // Find entrance to cycle
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  
  return slow;
}

// Method 2: Using Set (simpler but uses extra space)
function findDuplicateSet(nums) {
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
}

console.log(findDuplicate([1, 3, 4, 2, 2])); // 2
console.log(findDuplicate([3, 1, 3, 4, 2])); // 3

// Floyd's: Time O(n), Space O(1)
// Set: Time O(n), Space O(n)
```

---

### 34. **Count Inversions in Array**

**Answer:** Count pairs (i, j) where i < j but arr[i] > arr[j].

**Code Example:**
```javascript
function countInversions(arr) {
  let count = 0;
  
  function mergeSort(arr, temp, left, right) {
    if (left >= right) return 0;
    
    const mid = Math.floor((left + right) / 2);
    let invCount = 0;
    
    invCount += mergeSort(arr, temp, left, mid);
    invCount += mergeSort(arr, temp, mid + 1, right);
    invCount += merge(arr, temp, left, mid, right);
    
    return invCount;
  }
  
  function merge(arr, temp, left, mid, right) {
    let i = left, j = mid + 1, k = left;
    let invCount = 0;
    
    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp[k++] = arr[i++];
      } else {
        temp[k++] = arr[j++];
        invCount += (mid - i + 1);
      }
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (let i = left; i <= right; i++) {
      arr[i] = temp[i];
    }
    
    return invCount;
  }
  
  const temp = new Array(arr.length);
  return mergeSort(arr, temp, 0, arr.length - 1);
}

console.log(countInversions([2, 4, 1, 3, 5])); // 3
// Time Complexity: O(n log n)
```

---

### 35. **Container With Most Water (Two Pointers)**

**Answer:** Find two lines that form a container with maximum water.

**Analogy:** Like choosing two walls to hold the most water—move the shorter wall inward to potentially find a taller one.

**Code Example:**
```javascript
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    maxArea = Math.max(maxArea, width * minHeight);
    
    // Move the pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49

// Time Complexity: O(n)
// Space Complexity: O(1)
```

---

## JavaScript ES6+ Features

### 36. **Destructuring Assignment**

**Answer:** Extract values from arrays or properties from objects into distinct variables.

**Analogy:** Like unpacking a suitcase and putting items directly into designated drawers.

**Code Example:**
```javascript
// Array destructuring
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements
const [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3

// Rest operator
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head);  // 1
console.log(tail);  // [2, 3, 4, 5]

// Object destructuring
const person = { name: "Alice", age: 25, city: "Mumbai" };
const { name, age } = person;
console.log(name, age); // "Alice" 25

// Rename variables
const { name: personName } = person;
console.log(personName); // "Alice"

// Default values
const { country = "India" } = person;
console.log(country); // "India"

// Nested destructuring
const user = {
  id: 1,
  info: {
    name: "Bob",
    address: { city: "Delhi" }
  }
};
const { info: { address: { city } } } = user;
console.log(city); // "Delhi"

// Function parameters
function greet({ name, age }) {
  console.log(`Hello ${name}, you are ${age}`);
}
greet({ name: "Charlie", age: 30 });

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

---

### 37. **Arrow Functions**

**Answer:** Shorter syntax for writing functions with lexical `this` binding.

**Code Example:**
```javascript
// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const addArrow = (a, b) => a + b;

// Multiple statements need {}
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// Single parameter doesn't need ()
const square = x => x * x;

// No parameters need ()
const greet = () => console.log("Hello!");

// Lexical 'this' binding
const obj = {
  name: "Object",
  regularFunc: function() {
    setTimeout(function() {
      console.log(this.name); // undefined (this is window)
    }, 100);
  },
  arrowFunc: function() {
    setTimeout(() => {
      console.log(this.name); // "Object" (this from parent scope)
    }, 100);
  }
};

// Use cases where arrow functions should NOT be used:
// 1. Object methods (need dynamic this)
const person = {
  name: "John",
  greet: () => console.log(this.name) // Won't work!
};

// 2. Prototype methods
// 3. Event handlers needing 'this' context
// 4. When you need 'arguments' object
```

---

### 38. **Default Parameters**

**Answer:** Set default values for function parameters.

**Code Example:**
```javascript
// ES6 default parameters
function greet(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet());              // "Hello, Guest!"
console.log(greet("Alice"));       // "Hello, Alice!"
console.log(greet("Bob", "Hi"));   // "Hi, Bob!"

// Default can be expressions
function multiply(a, b = a * 2) {
  return a * b;
}
console.log(multiply(3));  // 18 (3 * 6)

// Default using previous parameters
function createUser(name, role = name === "admin" ? "superuser" : "user") {
  return { name, role };
}

console.log(createUser("admin"));  // { name: "admin", role: "superuser" }
console.log(createUser("john"));   // { name: "john", role: "user" }

// undefined triggers default, null doesn't
function test(val = 10) {
  return val;
}
console.log(test(undefined));  // 10
console.log(test(null));       // null
```

---

### 39. **Classes in ES6**

**Answer:** Syntactic sugar over JavaScript's prototypal inheritance.

**Code Example:**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Method
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  // Getter
  get info() {
    return `${this.name} is ${this.age} years old`;
  }
  
  // Setter
  set info(value) {
    const [name, age] = value.split(',');
    this.name = name;
    this.age = parseInt(age);
  }
  
  // Static method
  static species() {
    return "Homo sapiens";
  }
}

const john = new Person("John", 30);
john.greet();  // "Hello, I'm John"
console.log(john.info);  // "John is 30 years old"
console.log(Person.species());  // "Homo sapiens"

// Inheritance
class Developer extends Person {
  constructor(name, age, language) {
    super(name, age);  // Call parent constructor
    this.language = language;
  }
  
  code() {
    console.log(`${this.name} codes in ${this.language}`);
  }
  
  // Override parent method
  greet() {
    super.greet();  // Call parent method
    console.log(`I code in ${this.language}`);
  }
}

const dev = new Developer("Alice", 25, "JavaScript");
dev.code();   // "Alice codes in JavaScript"
dev.greet();  // "Hello, I'm Alice" + "I code in JavaScript"
```

---

### 40. **Modules (Import/Export)**

**Answer:** ES6 modules allow you to split code into reusable pieces.

**Code Example:**
```javascript
// math.js - Named exports
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

// utils.js - Default export
export default function multiply(a, b) {
  return a * b;
}

// Also export some named exports
export const CONSTANT = 42;

// main.js - Import
import multiply, { CONSTANT } from './utils.js';
import { add, subtract, PI } from './math.js';
import * as MathModule from './math.js';

console.log(add(5, 3));           // 8
console.log(multiply(4, 2));      // 8
console.log(MathModule.PI);       // 3.14159

// Rename imports
import { add as addition } from './math.js';
console.log(addition(1, 2));      // 3

// Dynamic import (async)
async function loadModule() {
  const module = await import('./math.js');
  console.log(module.add(1, 2));
}
```

---

### 41. **Promises**

**Answer:** Objects representing eventual completion or failure of an asynchronous operation.

**Analogy:** Like ordering food online—you get a promise that food will arrive. It can be fulfilled (delivered) or rejected (order cancelled).

**Code Example:**
```javascript
// Creating a promise
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Operation failed!");
  }
});

// Consuming promise
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Cleanup"));

// Chaining promises
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return fetch('https://api.example.com/more-data');
  })
  .then(response => response.json())
  .then(moreData => console.log(moreData))
  .catch(error => console.error(error));

// Promise.all - wait for all promises
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(values => console.log(values)); // [1, 2, 3]

// Promise.race - first to settle
Promise.race([p1, p2, p3])
  .then(value => console.log(value)); // 1 (first resolved)

// Promise.allSettled - wait for all, regardless of result
const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

Promise.allSettled(promises)
  .then(results => console.log(results));
// [{status: "fulfilled", value: 1}, {status: "rejected", reason: "error"}, ...]
```

---

### 42. **Async/Await**

**Answer:** Syntactic sugar for working with promises, making asynchronous code look synchronous.

**Analogy:** Like having a personal assistant who waits for tasks to complete before moving to the next one.

**Code Example:**
```javascript
// Basic async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Multiple awaits
async function getUserData(userId) {
  try {
    const user = await fetch(`/api/users/${userId}`).then(r => r.json());
    const posts = await fetch(`/api/users/${userId}/posts`).then(r => r.json());
    const comments = await fetch(`/api/users/${userId}/comments`).then(r => r.json());
    
    return { user, posts, comments };
  } catch (error) {
    console.error(error);
  }
}

// Parallel execution with Promise.all
async function getParallelData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}

// Error handling
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retry
    }
  }
}

// Async functions always return a promise
async function example() {
  return 42;
}
example().then(value => console.log(value)); // 42
```

---

### 43. **Map and Set**

**Answer:** New data structures for storing collections.

**Code Example:**
```javascript
// Map - key-value pairs with any type of key
const map = new Map();

map.set('name', 'John');
map.set(1, 'number key');
map.set(true, 'boolean key');
map.set({id: 1}, 'object key');

console.log(map.get('name'));  // "John"
console.log(map.has('name'));  // true
console.log(map.size);         // 4

map.delete(1);
map.clear(); // Remove all

// Iteration
const userMap = new Map([
  ['name', 'Alice'],
  ['age', 25],
  ['city', 'Mumbai']
]);

for (let [key, value] of userMap) {
  console.log(`${key}: ${value}`);
}

userMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// Set - unique values
const set = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log(set); // Set {1, 2, 3, 4, 5}

set.add(6);
set.delete(1);
console.log(set.has(2)); // true
console.log(set.size);   // 5

// Remove duplicates from array
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// Union
const union = new Set([...setA, ...setB]); // {1,2,3,4,5}

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x))); // {3}

// Difference
const difference = new Set([...setA].filter(x => !setB.has(x))); // {1,2}
```

---

### 44. **Optional Chaining (?.) and Nullish Coalescing (??)**

**Answer:** Safe property access and default value assignment.

**Code Example:**
```javascript
// Optional chaining
const user = {
  name: "John",
  address: {
    city: "Mumbai"
  }
};

// Without optional chaining
const city1 = user && user.address && user.address.city;

// With optional chaining
const city2 = user?.address?.city;  // "Mumbai"
const country = user?.address?.country;  // undefined (no error)

// Function calls
const admin = {
  getRole: () => "admin"
};

console.log(admin.getRole?.());  // "admin"
console.log(admin.getPermissions?.());  // undefined (no error)

// Array access
const arr = [1, 2, 3];
console.log(arr?.[0]);   // 1
console.log(arr?.[10]);  // undefined

// Nullish coalescing (??)
// Returns right operand when left is null or undefined
const value1 = null ?? "default";      // "default"
const value2 = undefined ?? "default"; // "default"
const value3 = 0 ?? "default";         // 0 (not null/undefined)
const value4 = "" ?? "default";        // "" (not null/undefined)
const value5 = false ?? "default";     // false (not null/undefined)

// Compare with OR (||)
const a = 0 || "default";   // "default" (0 is falsy)
const b = 0 ?? "default";   // 0 (0 is not null/undefined)

// Combining both
const username = user?.profile?.name ?? "Guest";
```

---

### 45. **Object Property Shorthand**

**Answer:** Concise syntax for object properties and methods.

**Code Example:**
```javascript
const name = "Alice";
const age = 25;

// Old way
const person1 = {
  name: name,
  age: age,
  greet: function() {
    console.log("Hello");
  }
};

// ES6 shorthand
const person2 = {
  name,    // Same as name: name
  age,     // Same as age: age
  greet() {  // Same as greet: function()
    console.log("Hello");
  }
};

// Computed property names
const prop = "score";
const obj = {
  [prop]: 100,
  [`total_${prop}`]: 500
};
console.log(obj); // { score: 100, total_score: 500 }

// Dynamic method names
const methodName = "calculate";
const calculator = {
  [methodName]() {
    return 42;
  }
};
console.log(calculator.calculate()); // 42
```

---

### 46. **for...of vs for...in**

**Answer:**
- **for...of**: Iterates over iterable objects (arrays, strings, maps, sets)
- **for...in**: Iterates over enumerable properties of an object

**Code Example:**
```javascript
// for...of (values)
const arr = ['a', 'b', 'c'];
for (let value of arr) {
  console.log(value); // 'a', 'b', 'c'
}

// for...in (keys/indices)
for (let index in arr) {
  console.log(index); // '0', '1', '2'
}

// Objects with for...in
const person = { name: "John", age: 30 };
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output: "name: John", "age: 30"

// for...of with strings
for (let char of "Hello") {
  console.log(char); // 'H', 'e', 'l', 'l', 'o'
}

// for...of with Map
const map = new Map([['a', 1], ['b', 2]]);
for (let [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// for...of with Set
const set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value);
}

// Get both index and value
const fruits = ['apple', 'banana', 'orange'];
for (let [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}
```

---

### 47. **Symbol**

**Answer:** Unique and immutable primitive value used as object property keys.

**Code Example:**
```javascript
// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym2 === sym3); // false (each symbol is unique)

// Symbols as object keys
const ID = Symbol('id');
const user = {
  name: "John",
  [ID]: 12345
};

console.log(user[ID]); // 12345
console.log(user.ID);  // undefined (different from string key)

// Symbols are not enumerable
for (let key in user) {
  console.log(key); // Only 'name' (Symbol keys are hidden)
}

console.log(Object.keys(user));  // ['name']
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]

// Well-known symbols
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // Iterator function

// Symbol.for - global symbol registry
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2); // true (same symbol from registry)
```

---

## React Fundamentals

### 48. **What is React and why use it?**

**Answer:** React is a JavaScript library for building user interfaces, developed by Facebook. It uses a component-based architecture and virtual DOM for efficient rendering.

**Analogy:** React is like building with Lego blocks—you create small, reusable pieces (components) that can be combined to build complex structures (applications).

**Key Benefits:**
- Component reusability
- Virtual DOM for performance
- One-way data flow
- Large ecosystem
- Strong community support

**Code Example:**
```javascript
// Functional component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Using the component
function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}
```

---

### 49. **What is JSX?**

**Answer:** JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code in JavaScript. It gets transpiled to `React.createElement()` calls.

**Analogy:** JSX is like writing in a human-friendly language that gets translated to machine code.

**Code Example:**
```javascript
// JSX
const element = <h1 className="title">Hello World</h1>;

// Transpiles to:
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello World'
);

// JSX with expressions
const name = "Alice";
const element2 = <h1>Hello, {name}!</h1>;

// JSX with conditions
const isLoggedIn = true;
const greeting = (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
  </div>
);

// JSX with lists
const numbers = [1, 2, 3, 4, 5];
const listItems = (
  <ul>
    {numbers.map(num => <li key={num}>{num}</li>)}
  </ul>
);

// JSX rules:
// 1. Single parent element (or Fragment)
// 2. className instead of class
// 3. Close all tags
// 4. camelCase for attributes (onClick, onChange)
```

---

### 50. **What is the Virtual DOM?**

**Answer:** The Virtual DOM is a lightweight copy of the actual DOM. React uses it to calculate the most efficient way to update the real DOM.

**Analogy:** Like having a blueprint before renovating a house—you plan changes on paper before touching the actual structure.

**How it works:**
1. State changes trigger re-render
2. New Virtual DOM tree created
3. Diffing algorithm compares old and new Virtual DOM
4. Only changed nodes updated in real DOM

**Code Example:**
```javascript
// When state changes
function Counter() {
  const [count, setCount] = useState(0);
  
  // React creates new Virtual DOM tree
  // Compares with previous tree
  // Updates only the changed <span> in real DOM
  return (
    <div>
      <h1>Counter</h1>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Reconciliation process:
// 1. User clicks button
// 2. setCount updates state
// 3. Component re-renders
// 4. New Virtual DOM created
// 5. Diff algorithm finds only <span> changed
// 6. Real DOM updated efficiently
```

---

### 51. **What is the difference between state and props?**

**Answer:**
- **Props**: Data passed from parent to child (immutable in child)
- **State**: Data managed within component (mutable)

**Analogy:**
- Props are like gifts you receive (you can't change them)
- State is like your own belongings (you can modify them)

**Code Example:**
```javascript
// Props - passed from parent
function ParentComponent() {
  return <ChildComponent name="Alice" age={25} />;
}

function ChildComponent(props) {
  // Props are read-only
  // props.name = "Bob"; // ❌ Don't do this
  
  return <h1>Hello, {props.name}! Age: {props.age}</h1>;
}

// State - internal to component
function Counter() {
  const [count, setCount] = useState(0); // State
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Combining state and props
function ParentWithState() {
  const [message, setMessage] = useState("Hello");
  
  return (
    <div>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <DisplayMessage text={message} /> {/* Pass state as prop */}
    </div>
  );
}

function DisplayMessage({ text }) {
  return <h2>{text}</h2>;
}
```

---

### 52. **Explain React component lifecycle methods**

**Answer:** Lifecycle methods are hooks that run at specific times in a component's life. (Mostly relevant for class components; functional components use hooks)

**Analogy:** Like stages in a person's life: birth (mounting), growth (updating), and death (unmounting).

**Code Example:**
```javascript
// Class component lifecycle
class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor');
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null;
  }
  
  componentDidMount() {
    console.log('4. componentDidMount - Component mounted');
    // API calls, subscriptions
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate');
    return true; // Return false to prevent re-render
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('7. getSnapshotBeforeUpdate');
    return null;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('8. componentDidUpdate - Component updated');
  }
  
  componentWillUnmount() {
    console.log('9. componentWillUnmount - Component unmounting');
    // Cleanup: remove listeners, cancel timers
  }
  
  render() {
    console.log('3/6. Render');
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// Functional component equivalent using hooks
function LifecycleDemoFunctional() {
  const [count, setCount] = useState(0);
  
  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('Component mounted or updated');
    
    // componentWillUnmount
    return () => {
      console.log('Component unmounting');
    };
  }, [count]); // Dependency array
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

### 53. **What are controlled vs uncontrolled components?**

**Answer:**
- **Controlled**: Form data handled by React state
- **Uncontrolled**: Form data handled by DOM itself

**Analogy:**
- Controlled is like a puppet (React controls everything)
- Uncontrolled is like an independent actor (DOM controls itself)

**Code Example:**
```javascript
// Controlled component
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name, 'Email:', email);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled component
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', nameRef.current.value);
    console.log('Email:', emailRef.current.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// When to use each:
// Controlled: When you need validation, conditional rendering, etc.
// Uncontrolled: For simple forms, file inputs, integration with non-React code
```

---

### 54. **What is lifting state up?**

**Answer:** Moving state to a common parent component when multiple children need to share the same state.

**Analogy:** Like keeping family documents in a shared cabinet instead of each family member having their own copy.

**Code Example:**
```javascript
// Before lifting state up - each component has its own state
function TemperatureInput1() {
  const [temperature, setTemperature] = useState('');
  return <input value={temperature} onChange={(e) => setTemperature(e.target.value)} />;
}

// After lifting state up - parent manages state
function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  
  const fahrenheit = celsius * 9/5 + 32;
  
  return (
    <div>
      <CelsiusInput temperature={celsius} onTemperatureChange={setCelsius} />
      <FahrenheitDisplay temperature={fahrenheit} />
    </div>
  );
}

function CelsiusInput({ temperature, onTemperatureChange }) {
  return (
    <div>
      <label>Celsius:</label>
      <input 
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </div>
  );
}

function FahrenheitDisplay({ temperature }) {
  return (
    <div>
      <label>Fahrenheit:</label>
      <input value={temperature || ''} readOnly />
    </div>
  );
}
```

---

### 55. **What are React Fragments?**

**Answer:** Fragments let you group multiple elements without adding extra nodes to the DOM.

**Analogy:** Like a transparent container—holds items together but doesn't add visual bulk.

**Code Example:**
```javascript
// Without Fragment (adds extra div)
function List1() {
  return (
    <div>
      <li>Item 1</li>
      <li>Item 2</li>
    </div>
  );
}

// With Fragment (no extra element)
function List2() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}

// Long form (useful when you need key)
function List3() {
  const items = ['A', 'B', 'C'];
  return (
    <>
      {items.map(item => (
        <React.Fragment key={item}>
          <li>{item}</li>
        </React.Fragment>
      ))}
    </>
  );
}

// Use case: Table rows
function Table() {
  return (
    <table>
      <tbody>
        <Columns />
      </tbody>
    </table>
  );
}

function Columns() {
  return (
    <>
      <td>Column 1</td>
      <td>Column 2</td>
    </>
  );
}
```

---

### 56. **What is the purpose of keys in React?**

**Answer:** Keys help React identify which items have changed, been added, or removed in lists. They should be stable, unique identifiers.

**Analogy:** Like employee ID numbers—they help identify specific employees even if their names change.

**Code Example:**
```javascript
// ❌ Bad: Using index as key
function BadList() {
  const items = ['Apple', 'Banana', 'Orange'];
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// ✅ Good: Using unique ID
function GoodList() {
  const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Why keys matter - example with reordering
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build app', done: false }
  ]);
  
  // Without proper keys, React might confuse which todo is which
  // when list is reordered or items are added/removed
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

// When index as key is okay:
// - List is static (never reordered)
// - Items don't have unique IDs
// - List is never filtered or sorted
```

---

### 57. **What is prop drilling and how to avoid it?**

**Answer:** Prop drilling is passing props through multiple levels of components that don't need them, just to reach a deeply nested component.

**Analogy:** Like passing a message through a chain of people—each person passes it along without using it themselves.

**Solutions:**
1. Context API
2. Component composition
3. State management libraries (Redux, Zustand)

**Code Example:**
```javascript
// Problem: Prop drilling
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />; // Just passing through
}

function Child({ user }) {
  return <GrandChild user={user} />; // Just passing through
}

function GrandChild({ user }) {
  return <h1>Hello, {user.name}!</h1>; // Finally used here
}

// Solution 1: Context API
const UserContext = createContext();

function AppWithContext() {
  const [user, setUser] = useState({ name: 'Alice' });
  
  return (
    <UserContext.Provider value={user}>
      <ParentWithContext />
    </UserContext.Provider>
  );
}

function ParentWithContext() {
  return <ChildWithContext />; // No props needed
}

function ChildWithContext() {
  return <GrandChildWithContext />; // No props needed
}

function GrandChildWithContext() {
  const user = useContext(UserContext); // Direct access
  return <h1>Hello, {user.name}!</h1>;
}

// Solution 2: Component composition
function AppWithComposition() {
  const [user, setUser] = useState({ name: 'Alice' });
  
  return (
    <Layout>
      <UserProfile user={user} />
    </Layout>
  );
}

function Layout({ children }) {
  return <div className="layout">{children}</div>;
}
```

---

### 58. **What is React Context API?**

**Answer:** Context provides a way to pass data through the component tree without manually passing props at every level.

**Analogy:** Like a broadcast system—instead of calling each person individually, you broadcast the message to everyone who's listening.

**Code Example:**
```javascript
// Creating context
const ThemeContext = createContext('light');

// Provider component
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer component (using useContext)
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      style={{
        background: theme === 'dark' ? '#333' : '#FFF',
        color: theme === 'dark' ? '#FFF' : '#333'
      }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}

// Multiple contexts
const UserContext = createContext();
const SettingsContext = createContext();

function MultiContextApp() {
  const [user, setUser] = useState({ name: 'Alice' });
  const [settings, setSettings] = useState({ notifications: true });
  
  return (
    <UserContext.Provider value={user}>
      <SettingsContext.Provider value={settings}>
        <Dashboard />
      </SettingsContext.Provider>
    </UserContext.Provider>
  );
}

function Dashboard() {
  const user = useContext(UserContext);
  const settings = useContext(SettingsContext);
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Notifications: {settings.notifications ? 'On' : 'Off'}</p>
    </div>
  );
}
```

---

### 59. **What is conditional rendering?**

**Answer:** Rendering different UI based on certain conditions.

**Code Example:**
```javascript
// Method 1: if/else
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in</h1>;
  }
}

// Method 2: Ternary operator
function GreetingTernary({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
    </div>
  );
}

// Method 3: Logical && operator
function Notification({ hasMessages, messageCount }) {
  return (
    <div>
      {hasMessages && <p>You have {messageCount} new messages</p>}
    </div>
  );
}

// Method 4: Switch case (for multiple conditions)
function Status({ status }) {
  const renderStatus = () => {
    switch(status) {
      case 'loading':
        return <p>Loading...</p>;
      case 'success':
        return <p>Success!</p>;
      case 'error':
        return <p>Error occurred</p>;
      default:
        return null;
    }
  };
  
  return <div>{renderStatus()}</div>;
}

// Method 5: Early return
function UserProfile({ user }) {
  if (!user) {
    return <p>No user found</p>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

### 60. **What are Higher-Order Components (HOC)?**

**Answer:** A HOC is a function that takes a component and returns a new enhanced component.

**Analogy:** Like a decorator that adds extra features to a gift box without changing what's inside.

**Code Example:**
```javascript
// Basic HOC
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);
  
  return <UserListWithLoading users={users} isLoading={isLoading} />;
}

// HOC with authentication
function withAuth(Component) {
  return function WithAuthComponent(props) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    return <Component {...props} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);

// Modern alternative: Custom Hooks (preferred in functional components)
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // ... auth logic
  return { isAuthenticated };
}
```

---

### 61. **What is React.memo()?**

**Answer:** `React.memo()` is a higher-order component that memoizes a component, preventing unnecessary re-renders if props haven't changed.

**Analogy:** Like taking a photo instead of redrawing the same picture—you only update when something actually changes.

**Code Example:**
```javascript
// Without React.memo - re-renders every time parent re-renders
function ChildComponent({ name, count }) {
  console.log('ChildComponent rendered');
  return <div>{name}: {count}</div>;
}

// With React.memo - only re-renders when props change
const MemoizedChild = React.memo(function ChildComponent({ name, count }) {
  console.log('MemoizedChild rendered');
  return <div>{name}: {count}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  return (
    <div>
      <MemoizedChild name="Alice" count={count} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherState(otherState + 1)}>
        Change Other State
      </button>
      {/* MemoizedChild won't re-render when otherState changes */}
    </div>
  );
}

// Custom comparison function
const CustomMemoizedChild = React.memo(
  function ChildComponent({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

---

### 62. **What is React reconciliation?**

**Answer:** Reconciliation is the process React uses to diff the Virtual DOM and determine what changes need to be made to the real DOM.

**Analogy:** Like a teacher checking homework—comparing the new version with the old to mark what changed.

**Diffing Algorithm:**
1. Different types → Replace entire tree
2. Same type → Update attributes
3. Keys in lists → Reorder efficiently

**Code Example:**
```javascript
// Example 1: Different element types (replaces entire subtree)
// Before: <div><Counter /></div>
// After:  <span><Counter /></span>
// Result: Entire Counter unmounted and remounted

// Example 2: Same type, different attributes
// Before: <div className="before" />
// After:  <div className="after" />
// Result: Only className updated

// Example 3: Keys help with reconciliation
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);
  
  // With keys, React knows to reorder, not recreate
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Optimization: Keep component structure consistent
// Bad: Conditional wrapper changes structure
function BadExample({ showWrapper }) {
  return showWrapper ? (
    <div><Content /></div>
  ) : (
    <Content />
  );
}

// Good: Consistent structure
function GoodExample({ showWrapper }) {
  return (
    <div style={{ display: showWrapper ? 'block' : 'contents' }}>
      <Content />
    </div>
  );
}
```

---

## React Hooks

### 63. **What is useState and how does it work?**

**Answer:** `useState` is a Hook that lets you add state to functional components.

**Analogy:** Like a memory cell that remembers a value and can update it.

**Code Example:**
```javascript
// Basic usage
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Multiple state variables
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={age} onChange={(e) => setAge(Number(e.target.value))} />
    </form>
  );
}

// State with object
function User() {
  const [user, setUser] = useState({
    name: '',
    age: 0,
    email: ''
  });
  
  // Updating object state (must spread previous state)
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name }));
  };
  
  return (
    <input 
      value={user.name} 
      onChange={(e) => updateName(e.target.value)} 
    />
  );
}

// Lazy initialization (for expensive computations)
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    const initialData = computeExpensiveValue();
    return initialData;
  });
}

// Functional updates (when new state depends on previous)
function Counter2() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    // ✅ Correct: Uses functional update
    setCount(prev => prev + 1);
  };
  
  const incrementMultiple = () => {
    // Without functional update, only increments once
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    
    // With functional update, increments three times
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
  
  return <button onClick={incrementMultiple}>+3</button>;
}
```

---

### 64. **What is useEffect and how does it work?**

**Answer:** `useEffect` performs side effects in functional components (data fetching, subscriptions, DOM manipulation).

**Analogy:** Like a janitor that cleans up after tasks and runs maintenance jobs.

**Code Example:**
```javascript
// Basic usage
function DataFetcher() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Side effect runs after render
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []); // Empty array = run once on mount
  
  return <div>{JSON.stringify(data)}</div>;
}

// Dependency array controls when effect runs
function SearchComponent({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // Runs when 'query' changes
    searchAPI(query).then(setResults);
  }, [query]); // Dependency array
  
  return <div>{results.length} results</div>;
}

// Cleanup function
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup runs before component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <div>Seconds: {seconds}</div>;
}

// Multiple effects for separation of concerns
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // Effect 1: Fetch user data
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);
  
  // Effect 2: Fetch user posts
  useEffect(() => {
    fetch(`/api/users/${userId}/posts`)
      .then(res => res.json())
      .then(setPosts);
  }, [userId]);
  
  // Effect 3: Update document title
  useEffect(() => {
    if (user) {
      document.title = `${user.name}'s Profile`;
    }
  }, [user]);
  
  return <div>...</div>;
}

// Common use cases:
// 1. Data fetching
// 2. Setting up subscriptions
// 3. DOM manipulation
// 4. Event listeners
// 5. Timers/intervals
```

---

### 65. **What is useContext?**

**Answer:** `useContext` lets you subscribe to React context without nesting.

**Code Example:**
```javascript
// Creating context
const ThemeContext = createContext('light');
const UserContext = createContext(null);

// Provider at top level
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'Alice' });
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={user}>
        <Dashboard />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Consuming context with useContext
function Dashboard() {
  const { theme, setTheme } = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#FFF' }}>
      <h1>Welcome, {user.name}</h1>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
}

// Custom hook for context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function ThemedButton() {
  const { theme } = useTheme();
  return <button className={theme}>Click me</button>;
}
```

---

### 66. **What is useRef?**

**Answer:** `useRef` returns a mutable ref object that persists across renders without causing re-renders.

**Analogy:** Like a sticky note that you can update without triggering a page refresh.

**Code Example:**
```javascript
// Use case 1: Accessing DOM elements
function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Use case 2: Storing mutable values (doesn't trigger re-render)
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// Use case 3: Storing previous value
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>Current: {count}, Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// useRef vs useState:
// - useRef: Doesn't trigger re-render when updated
// - useState: Triggers re-render when updated
```

---

### 67. **What is useReducer?**

**Answer:** `useReducer` is an alternative to `useState` for complex state logic, similar to Redux.

**Analogy:** Like a state machine with predefined actions—you dispatch actions and reducer decides how to update state.

**Code Example:**
```javascript
// Basic counter with useReducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}

// Complex example: Todo list
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, done: !todo.done }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    dispatch({ type: 'ADD_TODO', payload: input });
    setInput('');
  };
  
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// When to use useReducer over useState:
// 1. Complex state logic
// 2. Multiple sub-values
// 3. Next state depends on previous state
// 4. Want to optimize performance with deep updates
```

---

### 68. **What is useMemo?**

**Answer:** `useMemo` memoizes expensive computations, recomputing only when dependencies change.

**Analogy:** Like caching calculation results—don't recalculate if inputs haven't changed.

**Code Example:**
```javascript
// Without useMemo - expensive calculation runs on every render
function ExpensiveComponent({ a, b, unrelatedProp }) {
  const result = expensiveCalculation(a, b); // Runs every render
  
  return <div>{result}</div>;
}

// With useMemo - calculation only runs when a or b changes
function OptimizedComponent({ a, b, unrelatedProp }) {
  const result = useMemo(() => {
    console.log('Computing...');
    return expensiveCalculation(a, b);
  }, [a, b]); // Only recompute if a or b changes
  
  return <div>{result}</div>;
}

// Example: Filtering large list
function SearchableList({ items, query }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// useMemo for referential equality
function Parent() {
  const [count, setCount] = useState(0);
  
  // Without useMemo - new object on every render
  const config = { theme: 'dark', lang: 'en' };
  
  // With useMemo - same object reference if dependencies don't change
  const memoizedConfig = useMemo(
    () => ({ theme: 'dark', lang: 'en' }),
    []
  );
  
  return <Child config={memoizedConfig} />;
}

const Child = React.memo(({ config }) => {
  console.log('Child rendered');
  return <div>{config.theme}</div>;
});

// When to use useMemo:
// 1. Expensive calculations
// 2. Referential equality for React.memo
// 3. Large data processing
// 4. Complex object creation
```

---

### 69. **What is useCallback?**

**Answer:** `useCallback` memoizes functions, returning the same function reference if dependencies don't change.

**Analogy:** Like reusing the same tool instead of buying a new one every time.

**Code Example:**
```javascript
// Without useCallback - new function on every render
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // Child re-renders every time Parent re-renders
  return <Child onClick={handleClick} />;
}

// With useCallback - same function reference
function OptimizedParent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Function never changes
  
  // Child only re-renders if handleClick changes
  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

// Example with dependencies
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleSearch = useCallback(async () => {
    const data = await searchAPI(query);
    setResults(data);
  }, [query]); // Recreate when query changes
  
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchButton onSearch={handleSearch} />
    </div>
  );
}

// useMemo vs useCallback:
// useMemo: Memoizes VALUE
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

// useCallback: Memoizes FUNCTION
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// useCallback is equivalent to:
const memoizedCallback2 = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);
```

---

### 70. **What are custom hooks?**

**Answer:** Custom hooks are JavaScript functions that start with "use" and can call other hooks. They let you extract component logic into reusable functions.

**Analogy:** Like creating your own tool from existing tools—combine basic tools to make a specialized one.

**Code Example:**
```javascript
// Custom hook for API fetching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user.name}</div>;
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
}

// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  
  const reset = () => {
    setValues(initialValues);
  };
  
  return { values, handleChange, reset };
}

// Usage
function LoginForm() {
  const { values, handleChange, reset } = useForm({
    email: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      <input name="password" value={values.password} onChange={handleChange} type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### 71. **What is useLayoutEffect?**

**Answer:** `useLayoutEffect` is similar to `useEffect`, but it fires synchronously after all DOM mutations, before the browser paints.

**Analogy:** Like measuring a room after furniture is moved but before painting—you need the measurements before the visual update.

**Code Example:**
```javascript
// useEffect - runs after paint (asynchronous)
function ComponentWithUseEffect() {
  const [width, setWidth] = useState(0);
  const divRef = useRef();
  
  useEffect(() => {
    setWidth(divRef.current.offsetWidth);
  }, []);
  
  // Might see a flicker because useEffect runs after paint
  return <div ref={divRef}>Width: {width}px</div>;
}

// useLayoutEffect - runs before paint (synchronous)
function ComponentWithUseLayoutEffect() {
  const [width, setWidth] = useState(0);
  const divRef = useRef();
  
  useLayoutEffect(() => {
    setWidth(divRef.current.offsetWidth);
  }, []);
  
  // No flicker because useLayoutEffect runs before paint
  return <div ref={divRef}>Width: {width}px</div>;
}

// Use case: Measuring DOM nodes
function Tooltip() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef();
  
  useLayoutEffect(() => {
    const rect = tooltipRef.current.getBoundingClientRect();
    setCoords({ x: rect.left, y: rect.top });
  }, []);
  
  return <div ref={tooltipRef} style={{ left: coords.x, top: coords.y }}>...</div>;
}

// When to use useLayoutEffect:
// 1. Measuring DOM elements
// 2. Positioning tooltips/popovers
// 3. Preventing visual flicker
// 4. Reading layout before paint

// When to use useEffect:
// 1. Data fetching
// 2. Subscriptions
// 3. Most other cases
```

---

### 72. **Explain useImperativeHandle**

**Answer:** `useImperativeHandle` customizes the instance value exposed to parent components when using `ref`.

**Code Example:**
```javascript
// Without useImperativeHandle - exposes entire DOM node
function Input() {
  const inputRef = useRef();
  return <input ref={inputRef} />;
}

// With useImperativeHandle - only exposes specific methods
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));
  
  return <input ref={inputRef} />;
});

// Usage
function Form() {
  const inputRef = useRef();
  
  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
}
```

---

### 73. **What is the dependency array in useEffect?**

**Answer:** The dependency array controls when the effect runs. Effects re-run when dependencies change.

**Code Example:**
```javascript
// No dependency array - runs after every render
useEffect(() => {
  console.log('Runs on every render');
});

// Empty dependency array - runs once on mount
useEffect(() => {
  console.log('Runs once on mount');
}, []);

// With dependencies - runs when dependencies change
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);

// Multiple dependencies
useEffect(() => {
  console.log('Runs when count or name changes');
}, [count, name]);

// Common mistake: Missing dependencies
function SearchComponent() {
  const [query, setQuery] = useState('');
  
  // ❌ Bad: Missing 'query' dependency
  useEffect(() => {
    fetchResults(query);
  }, []);
  
  // ✅ Good: Includes all used variables
  useEffect(() => {
    fetchResults(query);
  }, [query]);
}
```

---

### 74. **Explain the rules of hooks**

**Answer:** Hooks have two important rules:

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call from functional components or custom hooks

**Why these rules exist:** React relies on the order hooks are called to maintain state correctly.

**Code Example:**
```javascript
// ❌ Bad: Conditional hook
function BadComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // Don't do this!
  }
}

// ✅ Good: Hook at top level, conditional logic inside
function GoodComponent({ condition }) {
  const [state, setState] = useState(0);
  
  if (condition) {
    // Use the hook value conditionally
  }
}

// ❌ Bad: Hook in loop
function BadList({ items }) {
  items.forEach(item => {
    const [selected, setSelected] = useState(false); // Don't do this!
  });
}

// ✅ Good: Separate component with hook
function ListItem({ item }) {
  const [selected, setSelected] = useState(false);
  return <li>{item}</li>;
}

function GoodList({ items }) {
  return (
    <ul>
      {items.map(item => <ListItem key={item.id} item={item} />)}
    </ul>
  );
}

// ❌ Bad: Hook in regular function
function regularFunction() {
  const [state, setState] = useState(0); // Don't do this!
}

// ✅ Good: Hook in custom hook
function useCustomHook() {
  const [state, setState] = useState(0); // OK in custom hook
  return state;
}
```

---

## React Performance & Advanced

### 75. **How to optimize React application performance?**

**Answer:** Multiple techniques can optimize React performance:

**Code Example:**
```javascript
// 1. Use React.memo for component memoization
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive render */}</div>;
});

// 2. Use useMemo for expensive calculations
function DataProcessor({ data }) {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);
  
  return <div>{processedData}</div>;
}

// 3. Use useCallback for function memoization
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <Child onClick={handleClick} />;
}

// 4. Code splitting with React.lazy and Suspense
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 5. Virtualization for long lists
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <FixedSizeList
      height={500}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  );
}

// 6. Debouncing expensive operations
function SearchInput() {
  const [query, setQuery] = useState('');
  
  const debouncedSearch = useMemo(
    () => debounce((value) => searchAPI(value), 500),
    []
  );
  
  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };
  
  return <input value={query} onChange={handleChange} />;
}

// 7. Use production build
// npm run build (creates optimized production bundle)

// 8. Use key prop correctly
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li> // Stable key
      ))}
    </ul>
  );
}
```

---

### 76. **What are Error Boundaries?**

**Answer:** Error Boundaries are React components that catch JavaScript errors in their child component tree, log errors, and display fallback UI.

**Analogy:** Like a safety net that catches errors before they crash the entire application.

**Code Example:**
```javascript
// Error Boundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

// What Error Boundaries DON'T catch:
// - Event handlers (use try/catch)
// - Async code (setTimeout, promises)
// - Server-side rendering
// - Errors in Error Boundary itself
```

---

### 77. **What is React.StrictMode?**

**Answer:** StrictMode is a development tool that highlights potential problems in an application.

**Code Example:**
```javascript
function App() {
  return (
    <React.StrictMode>
      <AppComponents />
    </React.StrictMode>
  );
}

// StrictMode helps:
// 1. Identify unsafe lifecycles
// 2. Warn about legacy string ref usage
// 3. Warn about deprecated findDOMNode
// 4. Detect unexpected side effects (double-invokes functions)
// 5. Detect legacy context API
```

---

### 78. **What is lazy loading in React?**

**Answer:** Lazy loading defers loading of components until they're needed, reducing initial bundle size.

**Code Example:**
```javascript
// Lazy load component
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  const [show, setShow] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShow(true)}>Load Component</button>
      
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

// Route-based code splitting
const Home = React.lazy(() => import('./routes/Home'));
const About = React.lazy(() => import('./routes/About'));

function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  );
}

// Named exports with lazy loading
const { Header } = React.lazy(() => import('./Components'));
```

---

### 79. **What is code splitting?**

**Answer:** Code splitting breaks your app into smaller chunks that are loaded on demand.

**Code Example:**
```javascript
// Dynamic import
function loadComponent() {
  import('./HeavyComponent').then(module => {
    const Component = module.default;
    // Use component
  });
}

// With React.lazy
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Webpack magic comments for chunk naming
const AdminPanel = React.lazy(() => 
  import(/* webpackChunkName: "admin" */ './AdminPanel')
);
```

---

### 80. **Explain React portals**

**Answer:** Portals provide a way to render children into a DOM node outside the parent component hierarchy.

**Analogy:** Like a teleporter—renders content in a different location in the DOM tree.

**Code Example:**
```javascript
// Modal using portal
function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Render here instead
  );
}

// Usage
function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isOpen}>
        <h1>Modal Content</h1>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

// HTML structure needed:
// <div id="root"></div>
// <div id="modal-root"></div>

// Use cases:
// - Modals
// - Tooltips
// - Dropdowns
// - Notifications
```

---

### 81. **What is React.forwardRef()?**

**Answer:** `forwardRef` lets a component pass a ref to a child component.

**Code Example:**
```javascript
// Without forwardRef - won't work
function InputComponent(props) {
  return <input {...props} />;
}

// With forwardRef - works
const InputComponent = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Usage
function Form() {
  const inputRef = useRef();
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <InputComponent ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

---

### 82. **What is Suspense in React?**

**Answer:** Suspense lets components "wait" for something before rendering, showing a fallback while waiting.

**Code Example:**
```javascript
// With lazy loading
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}

// Multiple lazy components
function App2() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentA />
      <ComponentB />
      <ComponentC />
    </Suspense>
  );
}

// Nested Suspense
function App3() {
  return (
    <Suspense fallback={<div>Loading app...</div>}>
      <NavBar />
      <Suspense fallback={<div>Loading content...</div>}>
        <Content />
      </Suspense>
    </Suspense>
  );
}

// Future: Suspense for data fetching (experimental)
function UserProfile({ userId }) {
  const user = useUser(userId); // Suspends while fetching
  return <div>{user.name}</div>;
}
```

---

### 83. **Explain synthetic events in React**

**Answer:** Synthetic events are React's cross-browser wrapper around native events, providing consistent API.

**Code Example:**
```javascript
function EventExample() {
  const handleClick = (e) => {
    e.preventDefault(); // Synthetic event
    e.stopPropagation();
    
    console.log(e.type);        // "click"
    console.log(e.target);      // DOM element
    console.log(e.currentTarget); // Element with handler
    console.log(e.nativeEvent); // Original browser event
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Event pooling (React 16 and earlier)
// Synthetic events are pooled and reused for performance
function OldEventHandling() {
  const handleClick = (e) => {
    console.log(e.type); // "click"
    
    setTimeout(() => {
      console.log(e.type); // null (event is pooled)
      // To persist:
      e.persist();
    }, 100);
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// React 17+: No event pooling
```

---

### 84. **What is server-side rendering (SSR) in React?**

**Answer:** SSR renders React components on the server and sends HTML to the client, improving initial load time and SEO.

**Code Example:**
```javascript
// Server-side (Node.js)
import ReactDOMServer from 'react-dom/server';
import App from './App';

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

// Client-side (hydration)
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(<App />, document.getElementById('root'));

// Frameworks that handle SSR:
// - Next.js (most popular)
// - Gatsby
// - Remix
```

---

## DOM Manipulation

### 85. **How do you select elements in JavaScript?**

**Answer:** Multiple methods exist to select DOM elements.

**Code Example:**
```javascript
// By ID
const element = document.getElementById('myId');

// By class name (returns HTMLCollection)
const elements = document.getElementsByClassName('myClass');

// By tag name
const paragraphs = document.getElementsByTagName('p');

// Query selector (CSS selector, returns first match)
const first = document.querySelector('.myClass');

// Query selector all (returns NodeList)
const all = document.querySelectorAll('.myClass');

// Modern preferred: querySelector/querySelectorAll
const specific = document.querySelector('#id .class > element');

// Difference between HTMLCollection and NodeList:
// HTMLCollection: Live, auto-updates when DOM changes
// NodeList: Can be static (querySelectorAll) or live (childNodes)

const liveCollection = document.getElementsByClassName('item');
const staticNodeList = document.querySelectorAll('.item');

document.body.innerHTML += '<div class="item">New</div>';
// liveCollection includes new element
// staticNodeList does not
```

---

### 86. **How do you create and append elements?**

**Code Example:**
```javascript
// Create element
const div = document.createElement('div');
div.className = 'container';
div.id = 'myDiv';
div.textContent = 'Hello World';

// Set attributes
div.setAttribute('data-id', '123');
div.style.color = 'blue';

// Create text node
const text = document.createTextNode('Some text');

// Append to DOM
document.body.appendChild(div);

// Insert before
const reference = document.querySelector('#reference');
document.body.insertBefore(div, reference);

// Insert adjacent (modern)
reference.insertAdjacentElement('beforebegin', div); // Before element
reference.insertAdjacentElement('afterbegin', div);  // First child
reference.insertAdjacentElement('beforeend', div);   // Last child
reference.insertAdjacentElement('afterend', div);    // After element

// Remove element
div.remove(); // Modern
// or
div.parentNode.removeChild(div); // Old way

// Replace element
const newDiv = document.createElement('div');
div.replaceWith(newDiv);
```

---

### 87. **What is the difference between innerHTML, textContent, and innerText?**

**Answer:**
- **innerHTML**: Gets/sets HTML content (can parse HTML)
- **textContent**: Gets/sets text content (ignores HTML tags)
- **innerText**: Gets/sets visible text (respects CSS styling)

**Code Example:**
```javascript
const div = document.getElementById('myDiv');

// innerHTML - parses HTML
div.innerHTML = '<strong>Bold</strong> text';
// Result: <div id="myDiv"><strong>Bold</strong> text</div>

// textContent - treats as plain text
div.textContent = '<strong>Bold</strong> text';
// Result: <div id="myDiv">&lt;strong&gt;Bold&lt;/strong&gt; text</div>

// innerText - considers CSS visibility
div.style.display = 'none';
console.log(div.textContent); // Returns text even if hidden
console.log(div.innerText);   // Returns empty string if hidden

// Performance: textContent is faster than innerText
// Security: textContent is safer (no XSS risk)
```

---

### 88. **How do you add/remove classes?**

**Code Example:**
```javascript
const element = document.querySelector('.myElement');

// Add class
element.classList.add('active');
element.classList.add('class1', 'class2', 'class3');

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active'); // Adds if absent, removes if present

// Check if class exists
if (element.classList.contains('active')) {
  console.log('Element is active');
}

// Replace class
element.classList.replace('oldClass', 'newClass');

// Old way (not recommended)
element.className = 'class1 class2';
element.className += ' class3';
```

---

### 89. **How do you modify element styles?**

**Code Example:**
```javascript
const element = document.querySelector('.box');

// Inline styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';

// Multiple styles
Object.assign(element.style, {
  color: 'red',
  backgroundColor: 'blue',
  fontSize: '20px'
});

// Get computed style
const styles = window.getComputedStyle(element);
console.log(styles.color);
console.log(styles.fontSize);

// cssText (sets multiple styles at once)
element.style.cssText = 'color: red; background: blue;';

// Remove style
element.style.removeProperty('color');
// or
element.style.color = '';

// Best practice: Use classes instead of inline styles
element.classList.add('styled');
```

---

### 90. **How do you handle events in vanilla JavaScript?**

**Code Example:**
```javascript
const button = document.querySelector('#myButton');

// addEventListener (recommended)
button.addEventListener('click', function(e) {
  console.log('Clicked!', e.target);
});

// Multiple listeners
button.addEventListener('click', handler1);
button.addEventListener('click', handler2);

// Remove event listener
function handler(e) {
  console.log('Clicked');
}
button.addEventListener('click', handler);
button.removeEventListener('click', handler);

// Event delegation (efficient for multiple elements)
document.querySelector('#parent').addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    console.log('Button clicked:', e.target);
  }
});

// Event options
button.addEventListener('click', handler, {
  once: true,     // Runs only once
  passive: true,  // Won't call preventDefault()
  capture: true   // Use capture phase
});

// preventDefault and stopPropagation
link.addEventListener('click', (e) => {
  e.preventDefault();  // Prevent default action
  e.stopPropagation(); // Stop bubbling
});

// Common events:
// - click, dblclick
// - mouseenter, mouseleave, mousemove
// - keydown, keyup, keypress
// - submit, change, input
// - focus, blur
// - scroll, resize
// - load, DOMContentLoaded
```

---

### 91. **What is the difference between DOMContentLoaded and load?**

**Code Example:**
```javascript
// DOMContentLoaded - fires when DOM is fully parsed
// (doesn't wait for images, stylesheets, etc.)
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
  // Safe to manipulate DOM here
});

// load - fires when entire page is loaded
// (including images, stylesheets, scripts)
window.addEventListener('load', () => {
  console.log('Page fully loaded');
  // All resources loaded
});

// jQuery equivalents:
// $(document).ready() ≈ DOMContentLoaded
// $(window).load() ≈ load
```

---

### 92. **How do you traverse the DOM?**

**Code Example:**
```javascript
const element = document.querySelector('.child');

// Parent
const parent = element.parentElement;
const parentNode = element.parentNode;

// Children
const children = element.children; // HTMLCollection (elements only)
const childNodes = element.childNodes; // NodeList (includes text nodes)
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Siblings
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;

// Closest ancestor matching selector
const ancestor = element.closest('.container');

// Matches selector
if (element.matches('.active')) {
  console.log('Element is active');
}

// Get all ancestors
function getAncestors(element) {
  const ancestors = [];
  while (element.parentElement) {
    ancestors.push(element.parentElement);
    element = element.parentElement;
  }
  return ancestors;
}
```

---

## Asynchronous JavaScript

### 93. **Explain the Event Loop**

**Answer:** The event loop handles asynchronous operations in JavaScript's single-threaded environment.

**Analogy:** Like a restaurant with one waiter—takes orders (tasks), sends them to kitchen (Web APIs), and serves when ready (callback queue).

**Components:**
1. **Call Stack**: Where code executes
2. **Web APIs**: Handle async operations (setTimeout, fetch, etc.)
3. **Callback Queue (Macrotasks)**: setTimeout, setInterval callbacks
4. **Microtask Queue**: Promises, queueMicrotask
5. **Event Loop**: Moves tasks from queue to call stack

**Code Example:**
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2
// Explanation:
// 1. "1" - synchronous, runs immediately
// 4. "4" - synchronous, runs immediately
// 3. "3" - microtask (Promise), runs before macrotasks
// 2. "2" - macrotask (setTimeout), runs last
```

---

### 94. **What are microtasks and macrotasks?**

**Answer:**
- **Microtasks**: Promise callbacks, queueMicrotask, MutationObserver (higher priority)
- **Macrotasks**: setTimeout, setInterval, I/O operations (lower priority)

**Execution order:** All microtasks run before the next macrotask.

**Code Example:**
```javascript
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

setTimeout(() => console.log('Timeout 2'), 0);

Promise.resolve().then(() => console.log('Promise 3'));

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Promise 3
// Timeout 1
// Timeout 2

// Visualization:
// 1. Sync code runs: "Start", "End"
// 2. All microtasks: "Promise 1", "Promise 2", "Promise 3"
// 3. First macrotask: "Timeout 1"
// 4. Check microtasks (none)
// 5. Next macrotask: "Timeout 2"
```

---

### 95. **What is callback hell and how to avoid it?**

**Answer:** Callback hell is deeply nested callbacks that make code hard to read and maintain.

**Code Example:**
```javascript
// Callback hell
getUserData(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      getPayment(details.paymentId, (payment) => {
        console.log(payment);
      });
    });
  });
});

// Solution 1: Promises
getUserData(userId)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => getPayment(details.paymentId))
  .then(payment => console.log(payment))
  .catch(error => console.error(error));

// Solution 2: Async/Await
async function fetchUserPayment(userId) {
  try {
    const user = await getUserData(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    const payment = await getPayment(details.paymentId);
    console.log(payment);
  } catch (error) {
    console.error(error);
  }
}

// Solution 3: Modularize with named functions
function handlePayment(details) {
  return getPayment(details.paymentId);
}

function handleDetails(orders) {
  return getOrderDetails(orders[0].id).then(handlePayment);
}

function handleOrders(user) {
  return getOrders(user.id).then(handleDetails);
}

getUserData(userId).then(handleOrders);
```

---

### 96. **What is Promise.all vs Promise.race vs Promise.allSettled?**

**Code Example:**
```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject('Error');
const p4 = new Promise(resolve => setTimeout(() => resolve(4), 1000));

// Promise.all - waits for all, fails if any fails
Promise.all([p1, p2])
  .then(values => console.log(values)); // [1, 2]

Promise.all([p1, p2, p3])
  .catch(error => console.log(error)); // "Error"

// Promise.race - returns first settled (resolved or rejected)
Promise.race([p1, p4])
  .then(value => console.log(value)); // 1 (first to resolve)

// Promise.allSettled - waits for all, never fails
Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'rejected', reason: 'Error' }
// ]

// Promise.any - returns first fulfilled, ignores rejections
Promise.any([p3, p1, p2])
  .then(value => console.log(value)); // 1

// Use cases:
// - Promise.all: Fetch multiple resources, need all to succeed
// - Promise.race: Timeout implementation, fastest response
// - Promise.allSettled: Run multiple tasks, want all results
// - Promise.any: Try multiple sources, need one to succeed
```

---

### 97. **How to handle errors in async/await?**

**Code Example:**
```javascript
// Method 1: try/catch
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Method 2: try/catch with specific error handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('Network error');
    } else {
      console.error('Other error:', error);
    }
  }
}

// Method 3: Global error boundary
async function safeAsync(fn) {
  try {
    return await fn();
  } catch (error) {
    console.error('Error in', fn.name, ':', error);
    return null;
  }
}

// Usage
const data = await safeAsync(() => fetchData());

// Method 4: Promise.catch with async/await
async function getData() {
  const data = await fetch('/api/data')
    .then(r => r.json())
    .catch(error => {
      console.error(error);
      return null;
    });
  
  return data;
}
```

---

### 98. **What is the difference between setTimeout and setInterval?**

**Code Example:**
```javascript
// setTimeout - runs once after delay
const timeoutId = setTimeout(() => {
  console.log('Runs once after 1 second');
}, 1000);

// Clear timeout
clearTimeout(timeoutId);

// setInterval - runs repeatedly at interval
const intervalId = setInterval(() => {
  console.log('Runs every 1 second');
}, 1000);

// Clear interval
clearInterval(intervalId);

// Problem with setInterval: doesn't wait for function to complete
setInterval(() => {
  // If this takes 2 seconds, next call happens before it's done
  slowOperation();
}, 1000);

// Solution: Recursive setTimeout
function repeatWithTimeout() {
  setTimeout(() => {
    slowOperation();
    repeatWithTimeout(); // Call again after completion
  }, 1000);
}
repeatWithTimeout();

// Cleanup pattern
function useTimer() {
  const intervalId = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // Cleanup
  return () => clearInterval(intervalId);
}

const cleanup = useTimer();
// Later...
cleanup();
```

---

### 99. **Explain async iteration**

**Code Example:**
```javascript
// Async iterator
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      async next() {
        if (i < 3) {
          return { value: i++, done: false };
        }
        return { done: true };
      }
    };
  }
};

// for await...of
async function processAsyncIterable() {
  for await (const value of asyncIterable) {
    console.log(value); // 0, 1, 2
  }
}

// Async generator
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

async function useAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    console.log(value); // 1, 2, 3
  }
}

// Real-world example: Paginated API
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    
    if (data.items.length === 0) break;
    
    yield data.items;
    page++;
  }
}

// Usage
async function processAllPages() {
  for await (const items of fetchPages('/api/users')) {
    console.log('Processing page:', items);
  }
}
```

---

### 100. **What is Promise chaining?**

**Code Example:**
```javascript
// Basic chaining
fetch('/api/user/1')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// Chaining with transformation
Promise.resolve(5)
  .then(x => x * 2)      // 10
  .then(x => x + 3)      // 13
  .then(x => x / 2)      // 6.5
  .then(result => console.log(result));

// Return value vs return Promise
Promise.resolve(1)
  .then(x => x + 1)           // Returns value
  .then(x => Promise.resolve(x + 1))  // Returns Promise
  .then(x => console.log(x)); // 3

// Error handling in chain
Promise.resolve(1)
  .then(x => {
    throw new Error('Oops');
  })
  .then(x => console.log('This won\'t run'))
  .catch(error => console.log('Caught:', error.message))
  .then(() => console.log('Chain continues after catch'));
```

---

### 101. **What is the difference between Promise.resolve() and new Promise()?**

**Code Example:**
```javascript
// Promise.resolve - creates resolved promise
const p1 = Promise.resolve(42);
p1.then(value => console.log(value)); // 42

// new Promise - for async operations
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(42), 1000);
});

// Promise.resolve with thenable
const thenable = {
  then: (resolve, reject) => {
    resolve(42);
  }
};
Promise.resolve(thenable).then(value => console.log(value)); // 42

// Converting value to promise
async function getValue() {
  return 42; // Automatically wrapped in Promise.resolve
}

// Same as:
function getValue2() {
  return Promise.resolve(42);
}
```

---

### 102. **Explain queueMicrotask**

**Code Example:**
```javascript
console.log('Start');

queueMicrotask(() => {
  console.log('Microtask 1');
});

Promise.resolve().then(() => {
  console.log('Microtask 2');
});

console.log('End');

// Output: Start, End, Microtask 1, Microtask 2

// Use case: Defer execution but before macrotasks
queueMicrotask(() => {
  // Runs before setTimeout, setInterval
  updateUI();
});

setTimeout(() => {
  console.log('This runs after microtasks');
}, 0);
```

---

## Array Methods

### 103. **Explain map(), filter(), and reduce()**

**Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// map() - transforms each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - selects elements that pass condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce() - reduces array to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Chaining
const result = numbers
  .filter(n => n % 2 === 0)  // [2, 4]
  .map(n => n * 2)           // [4, 8]
  .reduce((acc, n) => acc + n, 0);  // 12

// reduce() advanced examples
// 1. Find max
const max = numbers.reduce((acc, n) => Math.max(acc, n), -Infinity);

// 2. Group by property
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

const groupedByAge = people.reduce((acc, person) => {
  if (!acc[person.age]) {
    acc[person.age] = [];
  }
  acc[person.age].push(person);
  return acc;
}, {});

// 3. Flatten array
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);

// 4. Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
```

---

### 104. **What is the difference between forEach and map?**

**Code Example:**
```javascript
const numbers = [1, 2, 3];

// forEach - no return value, just iterates
const result1 = numbers.forEach(n => n * 2);
console.log(result1); // undefined

// map - returns new array
const result2 = numbers.map(n => n * 2);
console.log(result2); // [2, 4, 6]

// forEach - mutates original if needed
numbers.forEach((n, i, arr) => {
  arr[i] = n * 2;
});
console.log(numbers); // [2, 4, 6]

// map - doesn't mutate original
const original = [1, 2, 3];
const mapped = original.map(n => n * 2);
console.log(original); // [1, 2, 3] (unchanged)

// Performance: forEach is slightly faster (no new array)
// Use map when you need the new array
// Use forEach when you just need to iterate
```

---

### 105. **Explain find(), findIndex(), some(), and every()**

**Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// find() - returns first element that matches
const found = numbers.find(n => n > 3);
console.log(found); // 4

// findIndex() - returns index of first match
const index = numbers.findIndex(n => n > 3);
console.log(index); // 3

// some() - returns true if ANY element matches
const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven); // true

// every() - returns true if ALL elements match
const allPositive = numbers.every(n => n > 0);
console.log(allPositive); // true

// Real-world examples
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
];

// Find user by ID
const user = users.find(u => u.id === 2);

// Check if any user is active
const hasActiveUser = users.some(u => u.active);

// Check if all users are active
const allActive = users.every(u => u.active);
```

---

### 106. **What are flat() and flatMap()?**

**Code Example:**
```javascript
// flat() - flattens nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity)); // Fully flatten

// flatMap() - map then flat (depth 1)
const arr = [1, 2, 3];

const result1 = arr.map(n => [n, n * 2]);
console.log(result1); // [[1, 2], [2, 4], [3, 6]]

const result2 = arr.flatMap(n => [n, n * 2]);
console.log(result2); // [1, 2, 2, 4, 3, 6]

// Real-world use case: Extract nested data
const data = [
  { name: 'Alice', hobbies: ['reading', 'gaming'] },
  { name: 'Bob', hobbies: ['cooking', 'sports'] }
];

const allHobbies = data.flatMap(person => person.hobbies);
console.log(allHobbies); // ['reading', 'gaming', 'cooking', 'sports']

// Remove empty values
const withEmpties = [1, 2, , 4, 5];
const cleaned = withEmpties.flatMap(x => x !== undefined ? [x] : []);
```

---

### 107. **Explain Array.from() and Array.of()**

**Code Example:**
```javascript
// Array.from() - creates array from iterable or array-like
// 1. From string
const str = 'hello';
console.log(Array.from(str)); // ['h', 'e', 'l', 'l', 'o']

// 2. From Set
const set = new Set([1, 2, 3]);
console.log(Array.from(set)); // [1, 2, 3]

// 3. From NodeList
const divs = document.querySelectorAll('div');
const divArray = Array.from(divs);

// 4. With mapping function
console.log(Array.from([1, 2, 3], x => x * 2)); // [2, 4, 6]

// 5. Generate range
const range = Array.from({ length: 5 }, (_, i) => i);
console.log(range); // [0, 1, 2, 3, 4]

// Array.of() - creates array from arguments
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(Array.of(7));       // [7]

// Difference from Array constructor
console.log(Array(7));    // [ <7 empty items> ]
console.log(Array.of(7)); // [7]
```

---

### 108. **What are slice() and splice()?**

**Code Example:**
```javascript
const arr = [1, 2, 3, 4, 5];

// slice(start, end) - returns new array, doesn't mutate
const sliced = arr.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)

// splice(start, deleteCount, items...) - mutates original
const arr2 = [1, 2, 3, 4, 5];
const removed = arr2.splice(1, 2); // Remove 2 elements starting at index 1
console.log(removed); // [2, 3]
console.log(arr2);    // [1, 4, 5] (changed)

// splice to add elements
const arr3 = [1, 2, 5];
arr3.splice(2, 0, 3, 4); // Add 3, 4 at index 2, delete 0 elements
console.log(arr3); // [1, 2, 3, 4, 5]

// splice to replace
const arr4 = [1, 2, 3, 4, 5];
arr4.splice(2, 1, 99); // Replace element at index 2
console.log(arr4); // [1, 2, 99, 4, 5]

// Common uses:
// slice - copy, extract portion
// splice - insert, remove, replace
```

---

### 109. **Explain includes(), indexOf(), and lastIndexOf()**

**Code Example:**
```javascript
const arr = [1, 2, 3, 4, 3, 5];

// includes() - returns boolean
console.log(arr.includes(3));  // true
console.log(arr.includes(6));  // false

// indexOf() - returns first index or -1
console.log(arr.indexOf(3));   // 2
console.log(arr.indexOf(6));   // -1

// lastIndexOf() - returns last index or -1
console.log(arr.lastIndexOf(3)); // 4

// includes() with NaN
console.log([NaN].includes(NaN));  // true
console.log([NaN].indexOf(NaN));   // -1 (indexOf can't find NaN)

// includes() with second argument (start position)
console.log(arr.includes(3, 3));  // true (searches from index 3)

// Use cases:
// includes() - check existence (more readable)
// indexOf() - need the index
// lastIndexOf() - need last occurrence
```

---

### 110. **What is Array destructuring?**

**Code Example:**
```javascript
const arr = [1, 2, 3, 4, 5];

// Basic destructuring
const [first, second] = arr;
console.log(first, second); // 1 2

// Skip elements
const [a, , c] = arr;
console.log(a, c); // 1 3

// Rest operator
const [head, ...tail] = arr;
console.log(head);  // 1
console.log(tail);  // [2, 3, 4, 5]

// Default values
const [x, y, z = 0] = [1, 2];
console.log(x, y, z); // 1 2 0

// Swapping variables
let num1 = 10, num2 = 20;
[num1, num2] = [num2, num1];
console.log(num1, num2); // 20 10

// Nested arrays
const nested = [1, [2, 3], 4];
const [one, [two, three], four] = nested;

// Function return values
function getCoordinates() {
  return [10, 20];
}
const [lat, lng] = getCoordinates();
```

---

## CSS & Layout

### 111. **What is the difference between Flexbox and Grid?**

**Answer:**
- **Flexbox**: One-dimensional layout (row OR column)
- **Grid**: Two-dimensional layout (rows AND columns)

**Code Example:**
```css
/* Flexbox - one-dimensional */
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

/* Common flexbox properties */
.flex-item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  flex-direction: row; /* row, column, row-reverse, column-reverse */
  flex-wrap: wrap; /* wrap, nowrap, wrap-reverse */
}

/* Grid - two-dimensional */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 200px auto;
  gap: 20px;
}

.grid-item {
  grid-column: 1 / 3; /* span columns */
  grid-row: 1 / 2;    /* span rows */
}

/* When to use:
   - Flexbox: Navbar, card layout, centering
   - Grid: Page layout, complex layouts, magazine-style
*/
```

---

### 112. **How do you center an element?**

**Code Example:**
```css
/* Method 1: Flexbox (easiest) */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Method 2: Grid */
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}

/* Method 3: Absolute positioning */
.container {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Method 4: Margin auto (horizontal only) */
.child {
  width: 50%;
  margin: 0 auto;
}

/* Method 5: Text-align (inline elements) */
.container {
  text-align: center;
}
```

---

### 113. **What is the Box Model?**

**Answer:** The CSS box model describes the rectangular boxes generated for elements, consisting of content, padding, border, and margin.

**Code Example:**
```css
.box {
  width: 200px;      /* Content width */
  height: 100px;     /* Content height */
  padding: 20px;     /* Space inside border */
  border: 5px solid; /* Border */
  margin: 10px;      /* Space outside border */
}

/* Total width = 200 + 40 (padding) + 10 (border) + 20 (margin) = 270px */

/* box-sizing: border-box makes width include padding and border */
.box-border {
  box-sizing: border-box;
  width: 200px;  /* Now width includes padding and border */
  padding: 20px;
  border: 5px solid;
}
/* Total width = 200px (padding and border included) */

/* Best practice: Apply to all elements */
* {
  box-sizing: border-box;
}
```

---

### 114. **What is CSS specificity?**

**Answer:** Specificity determines which CSS rule applies when multiple rules target the same element.

**Specificity hierarchy:**
1. Inline styles (1000)
2. IDs (100)
3. Classes, attributes, pseudo-classes (10)
4. Elements, pseudo-elements (1)

**Code Example:**
```css
/* Specificity: 1 (element) */
p { color: red; }

/* Specificity: 10 (class) */
.text { color: blue; }

/* Specificity: 100 (ID) */
#title { color: green; }

/* Specificity: 111 (1 ID + 1 class + 1 element) */
#title.text p { color: purple; }

/* Inline style wins (specificity: 1000) */
<p style="color: yellow;">Text</p>

/* !important overrides everything (avoid if possible) */
p { color: red !important; }

/* Tips:
   - Avoid !important
   - Use classes over IDs for styling
   - Keep specificity low for maintainability
*/
```

---

### 115. **What are CSS variables (Custom Properties)?**

**Code Example:**
```css
/* Define variables */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --spacing: 16px;
  --font-size: 16px;
}

/* Use variables */
.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
  font-size: var(--font-size);
}

/* Fallback value */
.text {
  color: var(--text-color, black);
}

/* Override in specific context */
.dark-theme {
  --primary-color: #0056b3;
  --secondary-color: #545b62;
}

/* JavaScript access */
const root = document.documentElement;
root.style.setProperty('--primary-color', '#ff0000');
const color = getComputedStyle(root).getPropertyValue('--primary-color');
```

---

### 116. **What is responsive design?**

**Answer:** Responsive design makes websites adapt to different screen sizes and devices.

**Code Example:**
```css
/* Mobile-first approach (recommended) */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}

/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 20px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}

/* Viewport meta tag (required in HTML) */
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* Fluid typography */
html {
  font-size: calc(16px + (24 - 16) * ((100vw - 320px) / (1920 - 320)));
}
```

---

## API & Data Fetching

### 117. **What is the difference between fetch and axios?**

**Answer:**
- **fetch**: Built-in browser API, returns promises
- **axios**: Third-party library, more features, better error handling

**Code Example:**
```javascript
// fetch - native
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network error');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// axios - library
import axios from 'axios';

axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Key differences:
// 1. fetch requires manual JSON parsing
// 2. fetch doesn't reject on HTTP errors (4xx, 5xx)
// 3. axios has better error handling
// 4. axios has interceptors
// 5. axios has built-in XSRF protection
// 6. axios can cancel requests

// axios interceptors
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axios cancel token
const source = axios.CancelToken.source();
axios.get('/api/data', {
  cancelToken: source.token
});
source.cancel('Request cancelled');

// async/await
async function fetchData() {
  try {
    // fetch
    const response = await fetch('/api/data');
    const data = await response.json();
    
    // axios
    const { data } = await axios.get('/api/data');
  } catch (error) {
    console.error(error);
  }
}
```

---

### 118. **How do you handle API errors?**

**Code Example:**
```javascript
// Method 1: try/catch with async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('Network error:', error);
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
}

// Method 2: Custom error handling
class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

async function fetchWithCustomError() {
  const response = await fetch('/api/data');
  
  if (!response.ok) {
    throw new APIError(response.status, await response.text());
  }
  
  return response.json();
}

// Usage
try {
  const data = await fetchWithCustomError();
} catch (error) {
  if (error instanceof APIError) {
    if (error.status === 404) {
      console.log('Not found');
    } else if (error.status === 401) {
      console.log('Unauthorized');
    }
  }
}

// Method 3: React error handling
function DataComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

---

### 119. **What are HTTP methods?**

**Answer:** HTTP methods define the action to be performed on a resource.

**Code Example:**
```javascript
// GET - retrieve data
fetch('/api/users')
  .then(r => r.json());

// POST - create new resource
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' })
});

// PUT - update entire resource
fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice Updated', email: 'alice@example.com' })
});

// PATCH - partial update
fetch('/api/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice Updated' })
});

// DELETE - remove resource
fetch('/api/users/1', {
  method: 'DELETE'
});

// Common status codes:
// 200 OK - Success
// 201 Created - Resource created
// 204 No Content - Success, no response body
// 400 Bad Request - Invalid request
// 401 Unauthorized - Authentication required
// 403 Forbidden - Not authorized
// 404 Not Found - Resource doesn't exist
// 500 Internal Server Error - Server error
```

---

### 120. **How do you make concurrent API requests?**

**Code Example:**
```javascript
// Sequential (slow)
async function fetchSequential() {
  const user = await fetch('/api/user').then(r => r.json());
  const posts = await fetch('/api/posts').then(r => r.json());
  const comments = await fetch('/api/comments').then(r => r.json());
  
  return { user, posts, comments };
}

// Concurrent with Promise.all (fast)
async function fetchConcurrent() {
  const [user, posts, comments] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { user, posts, comments };
}

// With error handling
async function fetchConcurrentSafe() {
  const results = await Promise.allSettled([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  const [user, posts, comments] = results.map(result => 
    result.status === 'fulfilled' ? result.value : null
  );
  
  return { user, posts, comments };
}

// Dependent requests
async function fetchDependent() {
  const user = await fetch('/api/user').then(r => r.json());
  const posts = await fetch(`/api/users/${user.id}/posts`).then(r => r.json());
  
  return { user, posts };
}
```

---

### 121. **What is CORS?**

**Answer:** CORS (Cross-Origin Resource Sharing) is a security mechanism that allows or restricts resources requested from another domain.

**Code Example:**
```javascript
// Browser blocks this by default
fetch('https://api.other-domain.com/data')
  .then(r => r.json())
  .catch(error => console.log('CORS error'));

// Server must send CORS headers:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE
// Access-Control-Allow-Headers: Content-Type, Authorization

// Workarounds (not recommended for production):
// 1. Proxy server
// 2. JSONP (legacy)
// 3. Browser extension to disable CORS (development only)

// Proper solution: Configure server to allow CORS
// Express.js example:
const cors = require('cors');
app.use(cors({
  origin: 'https://your-frontend.com',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

---

## Testing & Error Handling

### 122. **What is unit testing in JavaScript?**

**Answer:** Unit testing involves testing individual units/components in isolation.

**Code Example:**
```javascript
// Function to test
function add(a, b) {
  return a + b;
}

// Jest test
describe('add function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

// Testing React components
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter', () => {
  render(<Counter />);
  
  const button = screen.getByText('Increment');
  fireEvent.click(button);
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// Mocking
jest.mock('./api');
import { fetchData } from './api';

test('fetches data', async () => {
  fetchData.mockResolvedValue({ name: 'Alice' });
  
  const data = await fetchData();
  expect(data.name).toBe('Alice');
});
```

---

### 123. **What are Error Boundaries in React?**
*(Already covered in Question 76)*

---

### 124. **How do you debug JavaScript?**

**Answer:** Multiple debugging techniques exist:

**Code Example:**
```javascript
// 1. console.log (basic)
console.log('Debug:', variable);
console.table({ name: 'Alice', age: 25 });
console.error('Error occurred');
console.warn('Warning');

// 2. debugger statement
function problematicFunction() {
  debugger; // Pauses execution
  const result = calculateSomething();
  return result;
}

// 3. Browser DevTools
// - Set breakpoints
// - Step through code
// - Watch variables
// - Call stack inspection

// 4. try/catch with detailed logging
try {
  riskyOperation();
} catch (error) {
  console.error('Error name:', error.name);
  console.error('Error message:', error.message);
  console.error('Stack trace:', error.stack);
}

// 5. React DevTools
// - Component inspector
// - Props/state viewer
// - Profiler

// 6. Network tab
// - Monitor API calls
// - Check request/response
// - Timing information
```

---

### 125. **What is the difference between development and production builds?**

**Answer:**
- **Development**: Includes source maps, warnings, unminified code
- **Production**: Minified, optimized, smaller bundle size

**Code Example:**
```javascript
// Check environment
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
} else {
  console.log('Production mode');
}

// React development vs production
// Development: More error messages, slower
// Production: Optimized, no warnings

// Build commands:
// npm run build (production)
// npm start (development)

// Webpack configuration
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
};
```

---

### 126. **What are polyfills?**

**Answer:** Polyfills are code that implements features not supported in older browsers.

**Code Example:**
```javascript
// Check if feature exists before polyfilling
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}

// Promise polyfill (for old browsers)
if (typeof Promise === 'undefined') {
  // Load promise polyfill
  require('promise-polyfill');
}

// Common polyfills:
// - Promise
// - Array.from, Array.includes
// - Object.assign
// - fetch
// - IntersectionObserver

// Using polyfill.io (CDN)
<script src="https://polyfill.io/v3/polyfill.min.js"></script>

// Babel for transpiling ES6+ to ES5
// Automatically adds polyfills based on target browsers
```

---

## Final Tips for Interviews

### Best Practices to Mention:
1. **Code Quality**: Write clean, maintainable code
2. **Performance**: Optimize where needed, don't premature optimize
3. **Accessibility**: Make apps usable for everyone
4. **SEO**: Consider search engine optimization
5. **Testing**: Write tests for critical functionality
6. **Documentation**: Comment complex logic
7. **Version Control**: Use Git effectively
8. **Continuous Learning**: Stay updated with new features

### Common Interview Scenarios:
1. **Building a feature from scratch**
2. **Debugging existing code**
3. **Optimizing slow components**
4. **Implementing responsive design**
5. **Handling edge cases**
6. **Writing tests**
7. **Code review discussions**

### Key Skills for Service Companies:
1. **Client requirements understanding**
2. **Timeline estimation**
3. **Communication with stakeholders**
4. **Working with legacy code**
5. **Multiple project handling**
6. **Code handoff documentation**

---

**Good luck with your interviews! 🚀**

*Remember: Understanding concepts is more important than memorizing answers. Practice coding regularly and build projects to solidify your knowledge.*
