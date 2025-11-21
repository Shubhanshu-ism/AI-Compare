# 30+ Real-World Frontend Machine Coding Problems

## Problem 1: Generate Breadcrumbs from Nested JSON Object

**Problem Statement:**  
Given a nested JSON object with string or object values, generate all possible breadcrumb paths from the root to each leaf node. For example, for a user object with nested address and company info, output paths like `user > name`, `user > address > city`, etc.

**Approach:**
- Use recursion to traverse the nested object
- Maintain a path array as you traverse
- When you reach a leaf node (primitive value), push the complete path to results
- Handle both objects and primitive types

**Solution Code:**
```javascript
const user = {
  name: "shubhanshu",
  address: {
    city: "bangalore",
    area: "Thuraballi"
  },
  company: {
    name: "techpearl",
    address: {
      city: "bangalore",
      area: "HMT-5"
    }
  }
};

function generateBreadcrumbs(obj, currentPath = [], results = []) {
  for (let key in obj) {
    const value = obj[key];
    const newPath = [...currentPath, key];
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      generateBreadcrumbs(value, newPath, results);
    } else {
      results.push({
        path: newPath.join(' > '),
        value: value
      });
    }
  }
  return results;
}

const breadcrumbs = generateBreadcrumbs(user);
console.log(breadcrumbs);
// Output:
// [
//   { path: "user > name", value: "shubhanshu" },
//   { path: "user > address > city", value: "bangalore" },
//   { path: "user > address > area", value: "Thuraballi" },
//   { path: "user > company > name", value: "techpearl" },
//   { path: "user > company > address > city", value: "bangalore" },
//   { path: "user > company > address > area", value: "HMT-5" }
// ]
```

---

## Problem 2: Calculate Total Price in Shopping Cart

**Problem Statement:**  
Given a shopping cart array of items with price and quantity, calculate the total price, applicable taxes (18% GST), discount (if total > 1000), and final amount.

**Approach:**
- Iterate through all items and multiply price × quantity
- Sum all item totals
- Calculate tax on subtotal
- Apply discount if subtotal exceeds 1000
- Return subtotal, tax, discount, and final amount

**Solution Code:**
```javascript
const shoppingCart = [
  { name: "Laptop", price: 50000, quantity: 1 },
  { name: "Mouse", price: 500, quantity: 2 },
  { name: "Keyboard", price: 3000, quantity: 1 }
];

function calculateCartTotal(cart) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
  const finalAmount = subtotal + tax - discount;

  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    discount: discount.toFixed(2),
    finalAmount: finalAmount.toFixed(2)
  };
}

const result = calculateCartTotal(shoppingCart);
console.log(result);
// Output: { subtotal: "54000.00", tax: "9720.00", discount: "5400.00", finalAmount: "58320.00" }
```

---

## Problem 3: Flatten a Deeply Nested Array

**Problem Statement:**  
Given a deeply nested array (array of arrays), flatten it to a single-level array while preserving the order of elements.

**Approach:**
- Use recursion or iterative approach with a stack
- For each element, check if it's an array
- If yes, recursively flatten; if no, add to result
- Or use built-in Array.flat() method

**Solution Code:**
```javascript
const nestedArray = [1, [2, 3, [4, 5, [6, 7]]], 8, [9]];

// Method 1: Recursive approach
function flattenArray(arr) {
  const result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// Method 2: Using built-in flat()
function flattenArrayBuiltIn(arr) {
  return arr.flat(Infinity);
}

console.log(flattenArray(nestedArray));
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## Problem 4: Implement Debounce Function

**Problem Statement:**  
Create a debounce function that delays the execution of a function until after a specified time has elapsed since the last time it was called.

**Approach:**
- Store a timer reference
- On each call, clear the existing timer
- Set a new timer with the delay
- Execute the original function only when the timer completes

**Solution Code:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Usage example: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  // Make API call here
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

---

## Problem 5: Implement Throttle Function

**Problem Statement:**  
Create a throttle function that limits the frequency of function execution to at most once per specified time interval.

**Approach:**
- Track the last execution time
- Only execute if enough time has passed since the last execution
- Use timestamps to determine elapsed time

**Solution Code:**
```javascript
function throttle(func, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    }
  };
}

// Usage example: Scroll event
window.addEventListener('scroll', throttle(() => {
  console.log('Scroll detected');
  // Load more content
}, 1000));
```

---

## Problem 6: Remove Duplicates from Array

**Problem Statement:**  
Given an array with duplicate elements, remove all duplicates and return a new array with unique elements.

**Approach:**
- Use Set data structure (automatic deduplication)
- Or use filter() with indexOf() check
- Or use reduce() to build unique array

**Solution Code:**
```javascript
const arrayWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];

// Method 1: Using Set
function removeDuplicatesSet(arr) {
  return [...new Set(arr)];
}

// Method 2: Using filter and indexOf
function removeDuplicatesFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// Method 3: Using reduce
function removeDuplicatesReduce(arr) {
  return arr.reduce((unique, item) => 
    unique.includes(item) ? unique : [...unique, item], []
  );
}

console.log(removeDuplicatesSet(arrayWithDuplicates));
// Output: [1, 2, 3, 4, 5]
```

---

## Problem 7: Group Array Items by Property

**Problem Statement:**  
Given an array of objects, group items by a specific property value.

**Approach:**
- Use reduce() to create an object with grouped items
- Key is the property value, value is array of items with that property

**Solution Code:**
```javascript
const employees = [
  { name: "John", department: "IT", salary: 50000 },
  { name: "Jane", department: "HR", salary: 45000 },
  { name: "Bob", department: "IT", salary: 55000 },
  { name: "Alice", department: "HR", salary: 48000 }
];

function groupByProperty(arr, property) {
  return arr.reduce((grouped, item) => {
    const key = item[property];
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {});
}

const grouped = groupByProperty(employees, 'department');
console.log(grouped);
// Output: { IT: [...], HR: [...] }
```

---

## Problem 8: Implement Pagination

**Problem Statement:**  
Given an array of items and page size, return items for a specific page number with metadata about total pages.

**Approach:**
- Calculate start and end indices based on page number and size
- Slice the array accordingly
- Calculate total pages using Math.ceil()

**Solution Code:**
```javascript
const items = Array.from({ length: 100 }, (_, i) => i + 1);

function paginate(arr, pageNumber, pageSize) {
  const totalItems = arr.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: arr.slice(startIndex, endIndex),
    currentPage: pageNumber,
    pageSize: pageSize,
    totalItems: totalItems,
    totalPages: totalPages,
    hasNextPage: pageNumber < totalPages,
    hasPrevPage: pageNumber > 1
  };
}

console.log(paginate(items, 2, 10));
// Output: { data: [11-20], currentPage: 2, totalPages: 10, hasNextPage: true, ... }
```

---

## Problem 9: Filter and Search Array of Objects

**Problem Statement:**  
Given an array of objects and a search term, filter items where any property contains the search term (case-insensitive).

**Approach:**
- Use filter() to iterate through array
- For each item, check if any property value contains the search term
- Compare strings in lowercase for case-insensitive matching

**Solution Code:**
```javascript
const products = [
  { id: 1, name: "iPhone 14", category: "Electronics" },
  { id: 2, name: "Samsung Galaxy", category: "Electronics" },
  { id: 3, name: "Apple Watch", category: "Wearables" }
];

function searchObjects(arr, searchTerm) {
  const term = searchTerm.toLowerCase();
  return arr.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(term)
    )
  );
}

const results = searchObjects(products, "apple");
console.log(results);
// Output: [{ id: 1, name: "iPhone 14", ... }, { id: 3, name: "Apple Watch", ... }]
```

---

## Problem 10: Sort Array of Objects by Multiple Criteria

**Problem Statement:**  
Sort an array of objects by multiple properties with priority order (primary sort, then secondary sort, etc.).

**Approach:**
- Use sort() with custom comparator function
- Check primary property first, if equal then check secondary, etc.
- Support both ascending and descending order

**Solution Code:**
```javascript
const students = [
  { name: "John", grade: "A", marks: 90 },
  { name: "Jane", grade: "A", marks: 95 },
  { name: "Bob", grade: "B", marks: 85 }
];

function sortByMultiple(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (let { property, order = 'asc' } of criteria) {
      const aVal = a[property];
      const bVal = b[property];
      
      if (aVal !== bVal) {
        const comparison = aVal > bVal ? 1 : -1;
        return order === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });
}

const sorted = sortByMultiple(students, [
  { property: 'grade', order: 'asc' },
  { property: 'marks', order: 'desc' }
]);
console.log(sorted);
// Output: Sorted by grade first, then by marks in descending order
```

---

## Problem 11: Implement Auto-Complete Search

**Problem Statement:**  
Create an autocomplete feature that suggests matching items as user types, with debouncing to avoid excessive API calls.

**Approach:**
- Debounce input events
- Filter items based on current input
- Display top N suggestions
- Handle keyboard navigation

**Solution Code:**
```javascript
const suggestedItems = [
  "JavaScript", "Java", "Python", "C++", "C#", "Ruby", "Go", "Rust"
];

class AutoComplete {
  constructor(inputSelector, suggestionsSelector, delay = 300) {
    this.input = document.querySelector(inputSelector);
    this.suggestionsContainer = document.querySelector(suggestionsSelector);
    this.delay = delay;
    this.timeoutId = null;

    this.input.addEventListener('input', (e) => this.handleInput(e));
  }

  handleInput(e) {
    clearTimeout(this.timeoutId);
    const query = e.target.value.toLowerCase();
    
    this.timeoutId = setTimeout(() => {
      if (!query) {
        this.suggestionsContainer.innerHTML = '';
        return;
      }

      const suggestions = suggestedItems.filter(item =>
        item.toLowerCase().includes(query)
      );

      this.displaySuggestions(suggestions);
    }, this.delay);
  }

  displaySuggestions(suggestions) {
    this.suggestionsContainer.innerHTML = suggestions
      .slice(0, 5)
      .map(item => `<div class="suggestion">${item}</div>`)
      .join('');
  }
}

// Usage: new AutoComplete('#searchInput', '#suggestions');
```

---

## Problem 12: Deep Clone an Object

**Problem Statement:**  
Create a deep copy of a complex object including nested objects and arrays.

**Approach:**
- Recursively clone each property
- Handle primitive values, objects, arrays, and special cases (Date, RegExp, etc.)
- Or use JSON serialization method (with limitations)

**Solution Code:**
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }

  if (obj instanceof Object) {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

const original = {
  name: "John",
  address: { city: "NYC", zip: 10001 },
  hobbies: ["reading", "gaming"]
};

const cloned = deepClone(original);
cloned.address.city = "LA";
console.log(original.address.city); // NYC (unchanged)
```

---

## Problem 13: Merge Multiple Objects

**Problem Statement:**  
Merge multiple objects into a single object, handling nested objects and arrays properly.

**Approach:**
- Use spread operator for shallow merge
- For deep merge, recursively merge nested objects
- Handle array concatenation or replacement based on requirements

**Solution Code:**
```javascript
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (typeof target === 'object' && typeof source === 'object') {
    for (let key in source) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return deepMerge(target, ...sources);
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = deepMerge({}, obj1, obj2);
console.log(merged);
// Output: { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

---

## Problem 14: Validate Form Input

**Problem Statement:**  
Create a form validator that checks email, password strength, required fields, and displays error messages.

**Approach:**
- Define validation rules for each field
- Use regex for pattern matching (email, phone)
- Check password length and complexity
- Return object with field names and error messages

**Solution Code:**
```javascript
const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format'
  },
  password: {
    minLength: 8,
    message: 'Password must be at least 8 characters'
  },
  name: {
    required: true,
    minLength: 3,
    message: 'Name must be at least 3 characters'
  }
};

function validateForm(formData) {
  const errors = {};

  for (let field in validationRules) {
    const rules = validationRules[field];
    const value = formData[field];

    if (rules.required && !value) {
      errors[field] = `${field} is required`;
      continue;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.message;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = rules.message;
    }
  }

  return errors;
}

const formData = { email: "test@example", password: "123", name: "Jo" };
console.log(validateForm(formData));
// Output: { email: "Invalid email format", password: "Password must...", name: "Name must..." }
```

---

## Problem 15: Format Currency

**Problem Statement:**  
Format numbers as currency with proper locale, symbol, and decimal places.

**Approach:**
- Use Intl.NumberFormat API for proper localization
- Or manually format with toFixed() and thousand separators
- Support different currencies and locales

**Solution Code:**
```javascript
function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Manual approach
function formatCurrencyManual(amount, currencySymbol = '$') {
  return currencySymbol + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log(formatCurrency(1234.56)); // $1,234.56
console.log(formatCurrency(1234.56, 'de-DE', 'EUR')); // 1.234,56 €
console.log(formatCurrencyManual(1234.56)); // $1,234.56
```

---

## Problem 16: Calculate Time Difference

**Problem Statement:**  
Calculate the time difference between two dates and display it in human-readable format (e.g., "2 days ago", "3 hours ago").

**Approach:**
- Calculate millisecond difference
- Convert to appropriate units (seconds, minutes, hours, days)
- Format as relative time string

**Solution Code:**
```javascript
function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return new Date(date).toLocaleDateString();
}

console.log(getRelativeTime(new Date(Date.now() - 2 * 60 * 60 * 1000))); // "2h ago"
```

---

## Problem 17: Implement Todo List with localStorage

**Problem Statement:**  
Create a todo list application that persists data in localStorage, with add, delete, toggle, and filter capabilities.

**Approach:**
- Load todos from localStorage on initialization
- Save to localStorage after each modification
- Implement CRUD operations
- Support filtering (all, active, completed)

**Solution Code:**
```javascript
class TodoList {
  constructor(storageKey = 'todos') {
    this.storageKey = storageKey;
    this.todos = this.loadTodos();
  }

  loadTodos() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  saveTodos() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  addTodo(text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(todo);
    this.saveTodos();
    return todo;
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  getTodos(filter = 'all') {
    if (filter === 'active') return this.todos.filter(t => !t.completed);
    if (filter === 'completed') return this.todos.filter(t => t.completed);
    return this.todos;
  }
}
```

---

## Problem 18: Implement Infinite Scroll

**Problem Statement:**  
Create an infinite scroll feature that loads more items as user scrolls near the bottom of the page.

**Approach:**
- Listen to scroll events with throttling
- Calculate distance from bottom
- Trigger data load when near bottom
- Append new items to DOM

**Solution Code:**
```javascript
class InfiniteScroll {
  constructor(containerSelector, loadMoreCallback, threshold = 200) {
    this.container = document.querySelector(containerSelector);
    this.loadMoreCallback = loadMoreCallback;
    this.threshold = threshold;
    this.isLoading = false;

    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    if (this.isLoading) return;

    const distanceFromBottom =
      document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

    if (distanceFromBottom < this.threshold) {
      this.isLoading = true;
      this.loadMoreCallback().then(() => {
        this.isLoading = false;
      });
    }
  }

  addItems(items) {
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'item';
      el.textContent = item;
      this.container.appendChild(el);
    });
  }
}
```

---

## Problem 19: Implement Tabs Component

**Problem Statement:**  
Create a tabs component that switches between different content panels when user clicks on tab headers.

**Approach:**
- Track active tab state
- Hide all panels and show only active one
- Update active tab styling
- Support keyboard navigation

**Solution Code:**
```javascript
class Tabs {
  constructor(tabsSelector, panelsSelector) {
    this.tabs = document.querySelectorAll(tabsSelector);
    this.panels = document.querySelectorAll(panelsSelector);
    this.activeTabIndex = 0;

    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.switchTab(index));
    });

    this.init();
  }

  switchTab(index) {
    // Hide all panels
    this.panels.forEach(panel => panel.style.display = 'none');
    // Remove active class from all tabs
    this.tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected panel
    this.panels[index].style.display = 'block';
    // Add active class to selected tab
    this.tabs[index].classList.add('active');

    this.activeTabIndex = index;
  }

  init() {
    this.switchTab(0);
  }
}

// Usage: new Tabs('.tab', '.panel');
```

---

## Problem 20: Implement Modal Dialog

**Problem Statement:**  
Create a reusable modal component with open, close, and overlay click functionality.

**Approach:**
- Hide modal by default
- Toggle visibility on open/close
- Handle overlay click to close
- Trap focus within modal for accessibility

**Solution Code:**
```javascript
class Modal {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    this.openBtns = document.querySelectorAll('[data-modal-trigger]');
    this.closeBtns = this.modal.querySelectorAll('[data-modal-close]');
    this.overlay = this.modal.querySelector('.modal-overlay');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });

    this.closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    this.overlay?.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open() {
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}
```

---

## Problem 21: Implement Star Rating Component

**Problem Statement:**  
Create an interactive star rating component where users can click to rate and see visual feedback.

**Approach:**
- Create 5 star elements
- Track current rating
- Update visual state on hover and click
- Store and retrieve rating value

**Solution Code:**
```javascript
class StarRating {
  constructor(containerSelector, onRatingChange) {
    this.container = document.querySelector(containerSelector);
    this.onRatingChange = onRatingChange;
    this.rating = 0;

    this.createStars();
    this.attachEventListeners();
  }

  createStars() {
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.innerHTML = '★';
      star.dataset.value = i;
      this.container.appendChild(star);
    }
  }

  attachEventListeners() {
    const stars = this.container.querySelectorAll('.star');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        this.rating = star.dataset.value;
        this.updateStars();
        this.onRatingChange?.(this.rating);
      });

      star.addEventListener('mouseover', () => {
        this.highlightStars(star.dataset.value);
      });
    });

    this.container.addEventListener('mouseleave', () => {
      this.updateStars();
    });
  }

  highlightStars(value) {
    const stars = this.container.querySelectorAll('.star');
    stars.forEach(star => {
      star.classList.toggle('hover', star.dataset.value <= value);
    });
  }

  updateStars() {
    const stars = this.container.querySelectorAll('.star');
    stars.forEach(star => {
      star.classList.toggle('active', star.dataset.value <= this.rating);
    });
  }
}
```

---

## Problem 22: Implement Carousel/Slider

**Problem Statement:**  
Create an image carousel component with previous/next navigation and automatic rotation.

**Approach:**
- Maintain current slide index
- Update transform CSS to show current slide
- Handle previous/next button clicks
- Auto-rotate with setInterval

**Solution Code:**
```javascript
class Carousel {
  constructor(containerSelector, autoplay = true, interval = 3000) {
    this.container = document.querySelector(containerSelector);
    this.slides = this.container.querySelectorAll('.slide');
    this.currentIndex = 0;
    this.autoplay = autoplay;
    this.interval = interval;
    this.timeoutId = null;

    this.attachEventListeners();
    if (this.autoplay) this.startAutoplay();
  }

  attachEventListeners() {
    document.querySelector('.prev')?.addEventListener('click', () => this.previous());
    document.querySelector('.next')?.addEventListener('click', () => this.next());
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    this.currentIndex = index;
  }

  next() {
    this.showSlide((this.currentIndex + 1) % this.slides.length);
    this.resetAutoplay();
  }

  previous() {
    this.showSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
    this.resetAutoplay();
  }

  startAutoplay() {
    this.timeoutId = setInterval(() => this.next(), this.interval);
  }

  resetAutoplay() {
    clearInterval(this.timeoutId);
    if (this.autoplay) this.startAutoplay();
  }
}
```

---

## Problem 23: Implement Dropdown Menu

**Problem Statement:**  
Create a dropdown menu component that opens/closes on click and closes when clicking outside.

**Approach:**
- Toggle visibility on toggle button click
- Close on outside click (event delegation)
- Support keyboard navigation (Escape to close)

**Solution Code:**
```javascript
class Dropdown {
  constructor(triggerSelector, menuSelector) {
    this.trigger = document.querySelector(triggerSelector);
    this.menu = document.querySelector(menuSelector);
    this.isOpen = false;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    document.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.menu.style.display = 'block';
    this.trigger.classList.add('active');
    this.isOpen = true;
  }

  close() {
    this.menu.style.display = 'none';
    this.trigger.classList.remove('active');
    this.isOpen = false;
  }
}
```

---

## Problem 24: Implement Notification/Toast

**Problem Statement:**  
Create a toast notification system that displays temporary messages with different types (success, error, warning, info).

**Approach:**
- Create notification container
- Add notification elements dynamically
- Auto-remove after duration
- Support multiple simultaneous notifications

**Solution Code:**
```javascript
class Toast {
  static container = null;

  static init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  static show(message, type = 'info', duration = 3000) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close">&times;</button>
    `;

    this.container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  static success(message) { this.show(message, 'success'); }
  static error(message) { this.show(message, 'error'); }
  static warning(message) { this.show(message, 'warning'); }
  static info(message) { this.show(message, 'info'); }
}

// Usage: Toast.success('Operation completed!');
```

---

## Problem 25: Implement Timer/Stopwatch

**Problem Statement:**  
Create a timer or stopwatch application with start, pause, reset, and time display functionality.

**Approach:**
- Use setInterval to track time
- Maintain elapsed time state
- Format time as HH:MM:SS
- Handle pause/resume and reset

**Solution Code:**
```javascript
class Timer {
  constructor() {
    this.elapsedTime = 0;
    this.isRunning = false;
    this.intervalId = null;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.intervalId = setInterval(() => {
      this.elapsedTime += 1000;
    }, 1000);
  }

  pause() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  reset() {
    this.pause();
    this.elapsedTime = 0;
  }

  getFormattedTime() {
    const totalSeconds = Math.floor(this.elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

// Usage
const timer = new Timer();
timer.start();
console.log(timer.getFormattedTime()); // 00:00:05
```

---

## Problem 26: Implement Accordion

**Problem Statement:**  
Create an accordion component where expanding one item collapses the others, with smooth animations.

**Approach:**
- Track currently open accordion item
- Close previous item before opening new one
- Toggle visibility and height animation
- Support multiple or single open items

**Solution Code:**
```javascript
class Accordion {
  constructor(containerSelector, allowMultiple = false) {
    this.container = document.querySelector(containerSelector);
    this.items = this.container.querySelectorAll('.accordion-item');
    this.allowMultiple = allowMultiple;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.items.forEach((item, index) => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => this.toggle(index));
    });
  }

  toggle(index) {
    const item = this.items[index];
    const isActive = item.classList.contains('active');

    if (!this.allowMultiple) {
      this.items.forEach(i => i.classList.remove('active'));
    }

    if (!isActive) {
      item.classList.add('active');
    }
  }
}

// Usage: new Accordion('.accordion', false);
```

---

## Problem 27: Implement Password Strength Indicator

**Problem Statement:**  
Create a password strength indicator that shows strength level (weak, medium, strong) and suggests improvements.

**Approach:**
- Check password length
- Check for uppercase, lowercase, numbers, special characters
- Calculate strength score
- Provide feedback suggestions

**Solution Code:**
```javascript
function getPasswordStrength(password) {
  let strength = 0;
  const feedback = [];

  if (password.length >= 8) strength++;
  else feedback.push('At least 8 characters');

  if (password.length >= 12) strength++;

  if (/[a-z]/.test(password)) strength++;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) strength++;
  else feedback.push('Add uppercase letters');

  if (/[0-9]/.test(password)) strength++;
  else feedback.push('Add numbers');

  if (/[!@#$%^&*]/.test(password)) strength++;
  else feedback.push('Add special characters (!@#$%^&*)');

  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

  return {
    score: strength,
    level: levels[strength],
    feedback: feedback
  };
}

console.log(getPasswordStrength('Pass123!'));
// { score: 6, level: 'Very Strong', feedback: [] }
```

---

## Problem 28: Implement Data Export to CSV

**Problem Statement:**  
Export an array of objects to CSV format and trigger download of the file.

**Approach:**
- Convert array to CSV format (headers + rows)
- Create blob and object URL
- Create and trigger download link
- Handle special characters and escaping

**Solution Code:**
```javascript
function exportToCSV(data, filename = 'export.csv') {
  if (!data || data.length === 0) return;

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csv = headers.join(',') + '\n';
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Escape quotes and wrap in quotes if contains comma
      return typeof value === 'string' && value.includes(',')
        ? `"${value.replace(/"/g, '""')}"` 
        : value;
    });
    csv += values.join(',') + '\n';
  });

  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}

// Usage: exportToCSV(employees, 'employees.csv');
```

---

## Problem 29: Implement Image Upload with Preview

**Problem Statement:**  
Create an image upload component with preview display and file validation.

**Approach:**
- Listen for file input change
- Validate file type and size
- Read file using FileReader
- Display preview image

**Solution Code:**
```javascript
class ImageUploader {
  constructor(inputSelector, previewSelector, maxSize = 5 * 1024 * 1024) {
    this.input = document.querySelector(inputSelector);
    this.preview = document.querySelector(previewSelector);
    this.maxSize = maxSize;

    this.input.addEventListener('change', (e) => this.handleFileSelect(e));
  }

  handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size
    if (file.size > this.maxSize) {
      alert(`File size must be less than ${this.maxSize / 1024 / 1024}MB`);
      return;
    }

    // Read and display preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.preview.src = e.target.result;
      this.preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// Usage: new ImageUploader('#fileInput', '#imagePreview');
```

---

## Problem 30: Implement Dark Mode Toggle

**Problem Statement:**  
Create a dark/light mode toggle that persists user preference and updates the entire page theme.

**Approach:**
- Store theme preference in localStorage
- Apply theme class to document root
- Toggle on button click
- Load saved preference on page load

**Solution Code:**
```javascript
class ThemeToggler {
  constructor(toggleSelector = '.theme-toggle', storageKey = 'theme') {
    this.toggle = document.querySelector(toggleSelector);
    this.storageKey = storageKey;
    this.currentTheme = this.loadTheme();

    this.applyTheme(this.currentTheme);
    this.toggle.addEventListener('click', () => this.toggleTheme());
  }

  loadTheme() {
    return localStorage.getItem(this.storageKey) || 'light';
  }

  saveTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    this.saveTheme(this.currentTheme);
  }
}

// Usage: new ThemeToggler('.theme-toggle');
```

---

## Problem 31: Implement Form Auto-Save

**Problem Statement:**  
Create a form that automatically saves user input to localStorage and restores it on page reload.

**Approach:**
- Listen to input/change events on form fields
- Debounce save operations
- Store form data in localStorage
- Restore form on page load

**Solution Code:**
```javascript
class FormAutoSave {
  constructor(formSelector, storageKey = 'formData', debounceDelay = 1000) {
    this.form = document.querySelector(formSelector);
    this.storageKey = storageKey;
    this.debounceDelay = debounceDelay;
    this.saveTimeout = null;

    this.restoreFormData();
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.form.addEventListener('input', (e) => {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(() => this.saveFormData(), this.debounceDelay);
    });

    this.form.addEventListener('change', (e) => {
      this.saveFormData();
    });
  }

  saveFormData() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    console.log('Form saved');
  }

  restoreFormData() {
    const data = JSON.parse(localStorage.getItem(this.storageKey)) || {};
    Object.keys(data).forEach(key => {
      const field = this.form.elements[key];
      if (field) field.value = data[key];
    });
  }

  clearSavedData() {
    localStorage.removeItem(this.storageKey);
  }
}

// Usage: new FormAutoSave('#myForm');
```

---

## Problem 32: Implement Load More Button

**Problem Statement:**  
Create a load more button that fetches and appends additional items to the list when clicked.

**Approach:**
- Track current page/offset
- Load items in batches
- Disable button when no more items
- Show loading state during fetch

**Solution Code:**
```javascript
class LoadMoreButton {
  constructor(containerSelector, btnSelector, batchSize = 10) {
    this.container = document.querySelector(containerSelector);
    this.btn = document.querySelector(btnSelector);
    this.batchSize = batchSize;
    this.currentPage = 0;
    this.isLoading = false;

    this.btn.addEventListener('click', () => this.loadMore());
    this.loadMore(); // Load initial items
  }

  async loadMore() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.btn.disabled = true;
    this.btn.textContent = 'Loading...';

    try {
      const items = await this.fetchItems(this.currentPage, this.batchSize);
      
      if (items.length === 0) {
        this.btn.textContent = 'No more items';
        this.btn.disabled = true;
        return;
      }

      this.renderItems(items);
      this.currentPage++;
      this.btn.textContent = 'Load More';
    } catch (error) {
      console.error('Error loading items:', error);
      this.btn.textContent = 'Error - Retry';
    } finally {
      this.isLoading = false;
      this.btn.disabled = false;
    }
  }

  async fetchItems(page, size) {
    // Simulated API call
    return new Promise(resolve => {
      setTimeout(() => {
        const items = Array.from({ length: size }, (_, i) => 
          `Item ${page * size + i + 1}`
        );
        resolve(items);
      }, 1000);
    });
  }

  renderItems(items) {
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'item';
      el.textContent = item;
      this.container.appendChild(el);
    });
  }
}

// Usage: new LoadMoreButton('.items-container', '.load-more-btn');
```

---

## Problem 33: Implement Multi-Select Dropdown

**Problem Statement:**  
Create a dropdown that allows selecting multiple options with checkboxes and displays selected items as tags.

**Approach:**
- Track selected options in array
- Display selected items as removable tags
- Update tag display on selection/deselection
- Support adding/removing tags

**Solution Code:**
```javascript
class MultiSelect {
  constructor(triggerSelector, optionsData) {
    this.trigger = document.querySelector(triggerSelector);
    this.selected = [];
    this.options = optionsData;

    this.renderDropdown();
    this.attachEventListeners();
  }

  renderDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'multi-select-dropdown';

    this.options.forEach(option => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = option;
      input.addEventListener('change', (e) => this.toggleSelection(e));

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      dropdown.appendChild(label);
    });

    this.trigger.appendChild(dropdown);
  }

  toggleSelection(e) {
    const value = e.target.value;
    if (e.target.checked) {
      this.selected.push(value);
    } else {
      this.selected = this.selected.filter(s => s !== value);
    }
    this.updateTags();
  }

  updateTags() {
    let tagsContainer = this.trigger.querySelector('.selected-tags');
    if (!tagsContainer) {
      tagsContainer = document.createElement('div');
      tagsContainer.className = 'selected-tags';
      this.trigger.insertBefore(tagsContainer, this.trigger.firstChild);
    }

    tagsContainer.innerHTML = this.selected
      .map(item => `<span class="tag">${item} <button data-value="${item}">×</button></span>`)
      .join('');

    tagsContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = e.target.dataset.value;
        this.selected = this.selected.filter(s => s !== value);
        this.trigger.querySelector(`input[value="${value}"]`).checked = false;
        this.updateTags();
      });
    });
  }
}

// Usage: new MultiSelect('.select-trigger', ['Option1', 'Option2', 'Option3']);
```

---

## Problem 34: Implement Search with Highlight

**Problem Statement:**  
Create a search feature that highlights matching text in results and navigates between matches.

**Approach:**
- Search through text content
- Wrap matching text in highlight element
- Track current match position
- Navigate with next/previous buttons

**Solution Code:**
```javascript
class SearchHighlighter {
  constructor(containerSelector, searchInputSelector) {
    this.container = document.querySelector(containerSelector);
    this.searchInput = document.querySelector(searchInputSelector);
    this.currentMatch = 0;
    this.matches = [];

    this.searchInput.addEventListener('input', (e) => this.search(e.target.value));
  }

  search(query) {
    if (!query) {
      this.clearHighlights();
      return;
    }

    const regex = new RegExp(`(${query})`, 'gi');
    const text = this.container.textContent;
    
    this.container.innerHTML = text.replace(regex, '<mark>$1</mark>');
    this.matches = this.container.querySelectorAll('mark');
    this.currentMatch = 0;
    
    if (this.matches.length > 0) {
      this.highlightMatch(0);
    }
  }

  highlightMatch(index) {
    this.matches.forEach(m => m.classList.remove('current'));
    if (this.matches[index]) {
      this.matches[index].classList.add('current');
      this.matches[index].scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextMatch() {
    this.currentMatch = (this.currentMatch + 1) % this.matches.length;
    this.highlightMatch(this.currentMatch);
  }

  prevMatch() {
    this.currentMatch = (this.currentMatch - 1 + this.matches.length) % this.matches.length;
    this.highlightMatch(this.currentMatch);
  }

  clearHighlights() {
    this.container.innerHTML = this.container.textContent;
    this.matches = [];
  }
}

// Usage: new SearchHighlighter('.content', '#searchInput');
```

---

## Problem 35: Implement Lazy Loading Images

**Problem Statement:**  
Implement lazy loading for images so they load only when they become visible in the viewport.

**Approach:**
- Use Intersection Observer API
- Load image when it enters viewport
- Show placeholder while loading
- Handle load/error states

**Solution Code:**
```javascript
class LazyImageLoader {
  constructor(imageSelector = 'img[data-src]') {
    this.images = document.querySelectorAll(imageSelector);
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
        }
      });
    });

    this.images.forEach(img => this.observer.observe(img));
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    img.src = src;
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      this.observer.unobserve(img);
    });
    img.addEventListener('error', () => {
      img.classList.add('error');
    });
  }
}

// Usage: new LazyImageLoader();
// HTML: <img src="placeholder.jpg" data-src="actual-image.jpg" />
```

---

**These 35 problems cover most real-world frontend scenarios developers encounter during interviews and production work.**
