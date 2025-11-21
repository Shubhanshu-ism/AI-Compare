# Frontend Interview Problems for Freshers (0-2 Years) - Including Custom Implementations

## Problem 1: Display Current Time and Update Every Second

**Problem Statement:**  
Create a clock that displays the current time in HH:MM:SS format and updates every second.

**Approach:**
- Get current time using Date object
- Format time as HH:MM:SS with padding
- Use setInterval to update every 1000ms
- Display in DOM element

**Solution Code:**
```javascript
function startClock() {
  const clockElement = document.getElementById('clock');
  
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}

// Usage: startClock();
```

---

## Problem 2: Custom Implement Array.map() Method

**Problem Statement:**  
Implement a custom map function that replicates the behavior of Array.prototype.map() without using the built-in method.

**Approach:**
- Create function that takes callback and optional thisArg
- Iterate through array
- Call callback with element, index, array
- Return new array with transformed elements
- Handle sparse arrays

**Solution Code:**
```javascript
// Custom map implementation
Array.prototype.customMap = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.map called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  const result = new Array(length);
  
  for (let i = 0; i < length; i++) {
    if (i in array) {
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }
  
  return result;
};

// Usage
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.customMap(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 }
];
const names = users.customMap(user => user.name);
console.log(names); // ['John', 'Jane']
```

---

## Problem 3: Custom Implement Array.filter() Method

**Problem Statement:**  
Implement a custom filter function that replicates Array.prototype.filter() functionality.

**Approach:**
- Create function that takes predicate callback
- Iterate through array
- Include element only if callback returns truthy value
- Return new array with filtered elements

**Solution Code:**
```javascript
// Custom filter implementation
Array.prototype.customFilter = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.filter called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  const result = [];
  
  for (let i = 0; i < length; i++) {
    if (i in array) {
      if (callback.call(thisArg, array[i], i, array)) {
        result.push(array[i]);
      }
    }
  }
  
  return result;
};

// Usage
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.customFilter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]

const adults = users.customFilter(user => user.age >= 18);
console.log(adults);
```

---

## Problem 4: Custom Implement Array.reduce() Method

**Problem Statement:**  
Implement a custom reduce function that processes array elements and returns a single accumulated value.

**Approach:**
- Accept callback and optional initial value
- Set accumulator to initial value or first element
- Iterate through array, calling callback with accumulator
- Return final accumulator value

**Solution Code:**
```javascript
// Custom reduce implementation
Array.prototype.customReduce = function(callback, initialValue) {
  if (this == null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  let startIndex = 0;
  let accumulator;
  
  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    if (length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = array[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < length; i++) {
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }
  
  return accumulator;
};

// Usage
const sum = numbers.customReduce((acc, num) => acc + num, 0);
console.log(sum); // 21

const groupByAge = users.customReduce((acc, user) => {
  const age = user.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(user);
  return acc;
}, {});
console.log(groupByAge);
```

---

## Problem 5: Custom Implement Array.find() Method

**Problem Statement:**  
Implement a custom find function that returns the first element matching the predicate.

**Approach:**
- Iterate through array
- Return element when callback returns true
- Return undefined if no match found

**Solution Code:**
```javascript
// Custom find implementation
Array.prototype.customFind = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  for (let i = 0; i < length; i++) {
    if (i in array) {
      if (callback.call(thisArg, array[i], i, array)) {
        return array[i];
      }
    }
  }
  
  return undefined;
};

// Usage
const firstEven = numbers.customFind(num => num % 2 === 0);
console.log(firstEven); // 2

const user30 = users.customFind(user => user.age === 30);
console.log(user30); // { name: 'Jane', age: 30 }
```

---

## Problem 6: Custom Implement String.trim() Method

**Problem Statement:**  
Implement a custom trim function that removes whitespace from both ends of a string.

**Approach:**
- Use regex to match leading and trailing whitespace
- Replace with empty string
- Handle various whitespace characters

**Solution Code:**
```javascript
// Custom trim implementation
String.prototype.customTrim = function() {
  return this.replace(/^\s+|\s+$/g, '');
};

// Alternative without regex
String.prototype.customTrimNoRegex = function() {
  let start = 0;
  let end = this.length - 1;
  
  while (start <= end && /\s/.test(this[start])) {
    start++;
  }
  
  while (end >= start && /\s/.test(this[end])) {
    end--;
  }
  
  return this.substring(start, end + 1);
};

// Usage
const str = '  hello world  ';
console.log(str.customTrim()); // 'hello world'
console.log(str.customTrimNoRegex()); // 'hello world'
```

---

## Problem 7: Custom Implement Object.keys() Method

**Problem Statement:**  
Implement a custom function that returns an array of object's own property names.

**Approach:**
- Iterate through object properties
- Check hasOwnProperty to exclude inherited properties
- Push property names to result array

**Solution Code:**
```javascript
// Custom Object.keys implementation
function customKeys(obj) {
  if (obj == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  
  const result = [];
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(key);
    }
  }
  
  return result;
}

// Usage
const user = { name: 'John', age: 25, city: 'NYC' };
console.log(customKeys(user)); // ['name', 'age', 'city']
```

---

## Problem 8: Custom Implement Object.values() Method

**Problem Statement:**  
Implement a custom function that returns an array of object's own property values.

**Approach:**
- Similar to keys but collect values instead
- Use hasOwnProperty to filter only own properties

**Solution Code:**
```javascript
// Custom Object.values implementation
function customValues(obj) {
  if (obj == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  
  const result = [];
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(obj[key]);
    }
  }
  
  return result;
}

// Usage
console.log(customValues(user)); // ['John', 25, 'NYC']
```

---

## Problem 9: Custom Implement Object.entries() Method

**Problem Statement:**  
Implement a custom function that returns array of [key, value] pairs from an object.

**Approach:**
- Iterate through object properties
- Create [key, value] pairs
- Return array of pairs

**Solution Code:**
```javascript
// Custom Object.entries implementation
function customEntries(obj) {
  if (obj == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  
  const result = [];
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push([key, obj[key]]);
    }
  }
  
  return result;
}

// Usage
console.log(customEntries(user));
// [['name', 'John'], ['age', 25], ['city', 'NYC']]
```

---

## Problem 10: Custom Implement Array.includes() Method

**Problem Statement:**  
Implement a custom function that checks if array includes a specific element using strict equality.

**Approach:**
- Iterate through array
- Compare each element using === (strict equality)
- Return true if found, false otherwise
- Handle NaN case

**Solution Code:**
```javascript
// Custom Array.includes implementation
Array.prototype.customIncludes = function(searchElement, fromIndex = 0) {
  if (this == null) {
    throw new TypeError('Array.prototype.includes called on null or undefined');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  let index = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;
  
  while (index < length) {
    const elementAtIndex = array[index];
    
    // Handle NaN case
    if (searchElement !== searchElement && elementAtIndex !== elementAtIndex) {
      return true;
    }
    
    if (elementAtIndex === searchElement) {
      return true;
    }
    
    index++;
  }
  
  return false;
};

// Usage
const arr = [1, 2, 3, NaN, 5];
console.log(arr.customIncludes(3)); // true
console.log(arr.customIncludes(NaN)); // true
console.log(arr.customIncludes(10)); // false
```

---

## Problem 11: Custom Implement Array.indexOf() Method

**Problem Statement:**  
Implement a custom function that returns the first index of a specific element in array.

**Approach:**
- Iterate through array starting from fromIndex
- Compare using strict equality ===
- Return index when found, -1 if not found

**Solution Code:**
```javascript
// Custom Array.indexOf implementation
Array.prototype.customIndexOf = function(searchElement, fromIndex = 0) {
  if (this == null) {
    throw new TypeError('Array.prototype.indexOf called on null or undefined');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  if (length === 0) return -1;
  
  let index = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;
  
  while (index < length) {
    if (index in array && array[index] === searchElement) {
      return index;
    }
    index++;
  }
  
  return -1;
};

// Usage
console.log(arr.customIndexOf(2)); // 1
console.log(arr.customIndexOf(5)); // 4
console.log(arr.customIndexOf(10)); // -1
```

---

## Problem 12: Custom Implement Array.join() Method

**Problem Statement:**  
Implement a custom function that joins array elements into a string with separator.

**Approach:**
- Convert each element to string
- Join with separator
- Handle null, undefined, and empty array cases

**Solution Code:**
```javascript
// Custom Array.join implementation
Array.prototype.customJoin = function(separator = ',') {
  if (this == null) {
    throw new TypeError('Array.prototype.join called on null or undefined');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  if (length === 0) return '';
  
  let result = '';
  
  for (let i = 0; i < length; i++) {
    if (i > 0) result += separator;
    
    if (array[i] != null) {
      result += String(array[i]);
    }
  }
  
  return result;
};

// Usage
const fruits = ['Apple', 'Banana', 'Orange'];
console.log(fruits.customJoin()); // 'Apple,Banana,Orange'
console.log(fruits.customJoin('-')); // 'Apple-Banana-Orange'
console.log(fruits.customJoin(' | ')); // 'Apple | Banana | Orange'
```

---

## Problem 13: Custom Implement Array.slice() Method

**Problem Statement:**  
Implement a custom function that returns a shallow copy of array portion without modifying original.

**Approach:**
- Handle start and end indices (negative, undefined)
- Create new array with elements from start to end
- Don't modify original array

**Solution Code:**
```javascript
// Custom Array.slice implementation
Array.prototype.customSlice = function(start = 0, end = undefined) {
  if (this == null) {
    throw new TypeError('Array.prototype.slice called on null or undefined');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  // Normalize start
  let beginIndex = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
  
  // Normalize end
  let endIndex = end === undefined ? length : (
    end < 0 ? Math.max(length + end, 0) : Math.min(end, length)
  );
  
  const result = [];
  
  for (let i = beginIndex; i < endIndex; i++) {
    if (i in array) {
      result.push(array[i]);
    }
  }
  
  return result;
};

// Usage
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.customSlice(1, 4)); // [2, 3, 4]
console.log(numbers.customSlice(-2)); // [4, 5]
console.log(numbers.customSlice()); // [1, 2, 3, 4, 5]
```

---

## Problem 14: Custom Implement Array.reverse() Method

**Problem Statement:**  
Implement a custom function that reverses array in place.

**Approach:**
- Swap elements from both ends moving towards center
- Modify original array
- Return the array

**Solution Code:**
```javascript
// Custom Array.reverse implementation
Array.prototype.customReverse = function() {
  if (this == null) {
    throw new TypeError('Array.prototype.reverse called on null or undefined');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  const middle = Math.floor(length / 2);
  
  for (let i = 0; i < middle; i++) {
    const swapIndex = length - 1 - i;
    
    // Swap elements
    const temp = array[i];
    array[i] = array[swapIndex];
    array[swapIndex] = temp;
  }
  
  return array;
};

// Usage
const arr = [1, 2, 3, 4, 5];
arr.customReverse();
console.log(arr); // [5, 4, 3, 2, 1]
```

---

## Problem 15: Custom Implement Array.some() Method

**Problem Statement:**  
Implement a custom function that checks if at least one element matches the predicate.

**Approach:**
- Iterate through array
- Return true if callback returns truthy for any element
- Return false if no match

**Solution Code:**
```javascript
// Custom Array.some implementation
Array.prototype.customSome = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.some called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  for (let i = 0; i < length; i++) {
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      return true;
    }
  }
  
  return false;
};

// Usage
const hasEven = numbers.customSome(num => num % 2 === 0);
console.log(hasEven); // true

const hasAdult = users.customSome(user => user.age >= 18);
console.log(hasAdult); // true
```

---

## Problem 16: Custom Implement Array.every() Method

**Problem Statement:**  
Implement a custom function that checks if all elements match the predicate.

**Approach:**
- Iterate through array
- Return false if any callback returns falsy
- Return true if all pass

**Solution Code:**
```javascript
// Custom Array.every implementation
Array.prototype.customEvery = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.every called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  for (let i = 0; i < length; i++) {
    if (i in array && !callback.call(thisArg, array[i], i, array)) {
      return false;
    }
  }
  
  return true;
};

// Usage
const allPositive = numbers.customEvery(num => num > 0);
console.log(allPositive); // true

const allAdults = users.customEvery(user => user.age >= 18);
console.log(allAdults); // depends on data
```

---

## Problem 17: Custom Implement Array.flat() Method

**Problem Statement:**  
Implement a custom function that flattens nested arrays up to specified depth.

**Approach:**
- Recursively flatten array elements
- Track depth and stop when depth reaches limit
- Return new flattened array

**Solution Code:**
```javascript
// Custom Array.flat implementation
Array.prototype.customFlat = function(depth = 1) {
  if (this == null) {
    throw new TypeError('Array.prototype.flat called on null or undefined');
  }
  
  const array = Object(this);
  const result = [];
  
  function flatten(arr, currentDepth) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && currentDepth > 0) {
        flatten(arr[i], currentDepth - 1);
      } else {
        result.push(arr[i]);
      }
    }
  }
  
  flatten(array, depth);
  return result;
};

// Usage
const nested = [1, [2, 3, [4, 5]]];
console.log(nested.customFlat()); // [1, 2, 3, [4, 5]]
console.log(nested.customFlat(2)); // [1, 2, 3, 4, 5]
```

---

## Problem 18: Custom Implement typeof Operator Logic

**Problem Statement:**  
Implement a custom function that returns the type of a value accurately.

**Approach:**
- Check for null explicitly (typeof returns 'object' for null)
- Use typeof for primitives
- Use Object.prototype.toString for accurate type detection

**Solution Code:**
```javascript
// Custom type checker
function customTypeof(value) {
  // Handle null explicitly
  if (value === null) return 'null';
  
  // For objects, use Object.prototype.toString
  if (typeof value === 'object') {
    const type = Object.prototype.toString.call(value);
    // Returns [object Type]
    return type.slice(8, -1).toLowerCase();
  }
  
  return typeof value;
}

// Better implementation
function getType(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  
  const type = typeof value;
  
  if (type === 'object') {
    const objectType = Object.prototype.toString.call(value).match(/\[object (\w+)\]/)[1];
    return objectType.toLowerCase();
  }
  
  return type;
}

// Usage
console.log(customTypeof(null)); // 'null'
console.log(customTypeof([])); // 'array'
console.log(customTypeof({})); // 'object'
console.log(customTypeof(new Date())); // 'date'
console.log(customTypeof(/regex/)); // 'regexp'
console.log(customTypeof(undefined)); // 'undefined'
```

---

## Problem 19: Custom Implement JSON.stringify() Method

**Problem Statement:**  
Implement a custom function that converts JavaScript value to JSON string.

**Approach:**
- Handle different data types
- Convert objects to key-value pairs
- Handle arrays recursively
- Format indentation if needed

**Solution Code:**
```javascript
// Custom JSON.stringify implementation (simplified)
function customStringify(value, space = 0) {
  const indent = typeof space === 'number' ? ' '.repeat(space) : (space || '');
  let depth = 0;
  
  function stringify(val) {
    if (val === null) return 'null';
    if (val === undefined) return undefined;
    
    const type = typeof val;
    
    if (type === 'string') return `"${val}"`;
    if (type === 'number' || type === 'boolean') return String(val);
    
    if (Array.isArray(val)) {
      const items = val.map(item => stringify(item)).filter(item => item !== undefined);
      
      if (!indent) return `[${items.join(',')}]`;
      
      depth++;
      const result = `[\n${indent.repeat(depth)}${items.join(`,\n${indent.repeat(depth)}`)}\n${indent.repeat(depth - 1)}]`;
      depth--;
      return result;
    }
    
    if (type === 'object') {
      const keys = Object.keys(val);
      const pairs = keys.map(key => {
        const value = stringify(val[key]);
        return value !== undefined ? `"${key}":${value}` : undefined;
      }).filter(Boolean);
      
      if (!indent) return `{${pairs.join(',')}}`;
      
      depth++;
      const result = `{\n${indent.repeat(depth)}${pairs.join(`,\n${indent.repeat(depth)}`)}\n${indent.repeat(depth - 1)}}`;
      depth--;
      return result;
    }
    
    return undefined;
  }
  
  return stringify(value);
}

// Usage
const obj = { name: 'John', age: 30, hobbies: ['reading', 'gaming'] };
console.log(customStringify(obj));
// {"name":"John","age":30,"hobbies":["reading","gaming"]}
```

---

## Problem 20: Custom Implement JSON.parse() Method

**Problem Statement:**  
Implement a custom function that parses JSON string to JavaScript object.

**Approach:**
- Use regex to tokenize JSON string
- Recursively parse tokens
- Handle objects, arrays, strings, numbers, booleans, null

**Solution Code:**
```javascript
// Custom JSON.parse implementation (simplified)
function customParse(jsonString) {
  let index = 0;
  
  function parseValue() {
    skipWhitespace();
    
    const char = jsonString[index];
    
    if (char === '"') return parseString();
    if (char === '{') return parseObject();
    if (char === '[') return parseArray();
    if (char === 't' || char === 'f') return parseBoolean();
    if (char === 'n') return parseNull();
    if (char === '-' || (char >= '0' && char <= '9')) return parseNumber();
    
    throw new SyntaxError('Unexpected character: ' + char);
  }
  
  function skipWhitespace() {
    while (index < jsonString.length && /\s/.test(jsonString[index])) {
      index++;
    }
  }
  
  function parseString() {
    index++; // skip opening quote
    let result = '';
    
    while (index < jsonString.length && jsonString[index] !== '"') {
      if (jsonString[index] === '\\') {
        index++;
        const escapeChar = jsonString[index];
        switch(escapeChar) {
          case '"': result += '"'; break;
          case '\\': result += '\\'; break;
          case '/': result += '/'; break;
          case 'b': result += '\b'; break;
          case 'f': result += '\f'; break;
          case 'n': result += '\n'; break;
          case 'r': result += '\r'; break;
          case 't': result += '\t'; break;
          default: result += escapeChar;
        }
      } else {
        result += jsonString[index];
      }
      index++;
    }
    
    index++; // skip closing quote
    return result;
  }
  
  function parseNumber() {
    let numStr = '';
    
    if (jsonString[index] === '-') {
      numStr += '-';
      index++;
    }
    
    while (index < jsonString.length && /[0-9.]/.test(jsonString[index])) {
      numStr += jsonString[index];
      index++;
    }
    
    return parseFloat(numStr);
  }
  
  function parseBoolean() {
    if (jsonString.substr(index, 4) === 'true') {
      index += 4;
      return true;
    }
    if (jsonString.substr(index, 5) === 'false') {
      index += 5;
      return false;
    }
    throw new SyntaxError('Invalid boolean value');
  }
  
  function parseNull() {
    if (jsonString.substr(index, 4) === 'null') {
      index += 4;
      return null;
    }
    throw new SyntaxError('Invalid null value');
  }
  
  function parseArray() {
    const array = [];
    index++; // skip [
    skipWhitespace();
    
    if (jsonString[index] === ']') {
      index++;
      return array;
    }
    
    while (true) {
      array.push(parseValue());
      skipWhitespace();
      
      if (jsonString[index] === ']') {
        index++;
        break;
      }
      
      if (jsonString[index] === ',') {
        index++;
        skipWhitespace();
      } else {
        throw new SyntaxError('Expected , or ]');
      }
    }
    
    return array;
  }
  
  function parseObject() {
    const obj = {};
    index++; // skip {
    skipWhitespace();
    
    if (jsonString[index] === '}') {
      index++;
      return obj;
    }
    
    while (true) {
      skipWhitespace();
      const key = parseString();
      skipWhitespace();
      
      if (jsonString[index] !== ':') {
        throw new SyntaxError('Expected :');
      }
      index++;
      
      obj[key] = parseValue();
      skipWhitespace();
      
      if (jsonString[index] === '}') {
        index++;
        break;
      }
      
      if (jsonString[index] === ',') {
        index++;
      } else {
        throw new SyntaxError('Expected , or }');
      }
    }
    
    return obj;
  }
  
  return parseValue();
}

// Usage
const jsonStr = '{"name":"John","age":30,"hobbies":["reading","gaming"]}';
const parsed = customParse(jsonStr);
console.log(parsed); // { name: 'John', age: 30, hobbies: [ 'reading', 'gaming' ] }
```

---

## Problem 21: Custom Implement Array.forEach() Method

**Problem Statement:**  
Implement a custom forEach function that executes callback for each element.

**Approach:**
- Iterate through array
- Call callback with element, index, array
- No return value, returns undefined

**Solution Code:**
```javascript
// Custom Array.forEach implementation
Array.prototype.customForEach = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.forEach called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  for (let i = 0; i < length; i++) {
    if (i in array) {
      callback.call(thisArg, array[i], i, array);
    }
  }
};

// Usage
numbers.customForEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
```

---

## Problem 22: Custom Implement Object.assign() Method

**Problem Statement:**  
Implement a custom function that copies properties from source objects to target object.

**Approach:**
- Accept target and multiple source objects
- Copy enumerable own properties
- Return modified target object

**Solution Code:**
```javascript
// Custom Object.assign implementation
function customAssign(target, ...sources) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  
  const to = Object(target);
  
  for (let i = 0; i < sources.length; i++) {
    const nextSource = sources[i];
    
    if (nextSource == null) continue;
    
    const from = Object(nextSource);
    
    for (let key in from) {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }
  }
  
  return to;
}

// Usage
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };
const result = customAssign({}, obj1, obj2, obj3);
console.log(result); // { a: 1, b: 2, c: 3 }
```

---

## Problem 23: Custom Implement Array.findIndex() Method

**Problem Statement:**  
Implement a custom function that returns the index of first element matching predicate.

**Approach:**
- Similar to find but return index instead of element
- Return -1 if not found

**Solution Code:**
```javascript
// Custom Array.findIndex implementation
Array.prototype.customFindIndex = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.findIndex called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  const array = Object(this);
  const length = parseInt(array.length) || 0;
  
  for (let i = 0; i < length; i++) {
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      return i;
    }
  }
  
  return -1;
};

// Usage
const firstEvenIndex = numbers.customFindIndex(num => num % 2 === 0);
console.log(firstEvenIndex); // Index of first even number
```

---

## Problem 24: Custom Implement Array.concat() Method

**Problem Statement:**  
Implement a custom function that merges arrays and returns new array without modifying originals.

**Approach:**
- Copy all elements from original array
- Copy elements from all argument arrays
- Handle non-array arguments

**Solution Code:**
```javascript
// Custom Array.concat implementation
Array.prototype.customConcat = function(...items) {
  if (this == null) {
    throw new TypeError('Array.prototype.concat called on null or undefined');
  }
  
  const array = Object(this);
  const result = [];
  
  // Add elements from original array
  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      result.push(array[i]);
    }
  }
  
  // Add elements from arguments
  for (let i = 0; i < items.length; i++) {
    if (Array.isArray(items[i])) {
      for (let j = 0; j < items[i].length; j++) {
        result.push(items[i][j]);
      }
    } else {
      result.push(items[i]);
    }
  }
  
  return result;
};

// Usage
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = arr1.customConcat(arr2, [7, 8]);
console.log(merged); // [1, 2, 3, 4, 5, 6, 7, 8]
```

---

**These 24 problems combine practical DOM manipulation, event handling, real-world scenarios, and custom implementations of built-in JavaScript methods. Freshers are often asked to implement these core functions to test their understanding of JavaScript internals and problem-solving abilities.**
