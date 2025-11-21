  # 20+ Frontend Interview Problems for Freshers (0-2 Years Experience)

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

## Problem 2: Simple Calculator (Add, Subtract, Multiply, Divide)

**Problem Statement:**  
Create a basic calculator with HTML buttons that performs basic arithmetic operations.

**Approach:**
- Track current input and previous value
- Handle number button clicks to build input
- Handle operator clicks to store operation
- Execute calculation on equals button

**Solution Code:**
```javascript
class SimpleCalculator {
  constructor() {
    this.display = document.getElementById('display');
    this.currentValue = '';
    this.previousValue = '';
    this.operation = null;
    
    this.setupButtons();
  }
  
  setupButtons() {
    document.querySelectorAll('.number').forEach(btn => {
      btn.addEventListener('click', (e) => this.appendNumber(e.target.textContent));
    });
    
    document.querySelectorAll('.operator').forEach(btn => {
      btn.addEventListener('click', (e) => this.setOperation(e.target.textContent));
    });
    
    document.getElementById('equals').addEventListener('click', () => this.calculate());
    document.getElementById('clear').addEventListener('click', () => this.clear());
  }
  
  appendNumber(num) {
    this.currentValue += num;
    this.display.textContent = this.currentValue;
  }
  
  setOperation(op) {
    if (this.currentValue === '') return;
    this.previousValue = this.currentValue;
    this.operation = op;
    this.currentValue = '';
  }
  
  calculate() {
    if (!this.operation || this.previousValue === '' || this.currentValue === '') return;
    
    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    let result;
    
    switch(this.operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/': result = prev / current; break;
      default: return;
    }
    
    this.display.textContent = result;
    this.currentValue = result;
    this.previousValue = '';
    this.operation = null;
  }
  
  clear() {
    this.currentValue = '';
    this.previousValue = '';
    this.operation = null;
    this.display.textContent = '0';
  }
}

// Usage: new SimpleCalculator();
```

---

## Problem 3: Todo List - Add, Delete, Mark Complete

**Problem Statement:**  
Create a basic todo list where users can add items, mark as complete (strikethrough), and delete items.

**Approach:**
- Maintain array of todo items
- Render list after each operation
- Track completion status with boolean flag
- Handle input, button clicks

**Solution Code:**
```javascript
class TodoList {
  constructor(inputId, listId, addBtnId) {
    this.input = document.getElementById(inputId);
    this.list = document.getElementById(listId);
    this.addBtn = document.getElementById(addBtnId);
    this.todos = [];
    
    this.addBtn.addEventListener('click', () => this.addTodo());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });
  }
  
  addTodo() {
    const text = this.input.value.trim();
    if (!text) return;
    
    this.todos.push({
      id: Date.now(),
      text: text,
      completed: false
    });
    
    this.input.value = '';
    this.render();
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    this.render();
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.render();
  }
  
  render() {
    this.list.innerHTML = '';
    
    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
      
      const span = document.createElement('span');
      span.textContent = todo.text;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
      
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      this.list.appendChild(li);
    });
  }
}

// Usage: new TodoList('todoInput', 'todoList', 'addBtn');
```

---

## Problem 4: Counter - Increment, Decrement, Reset

**Problem Statement:**  
Create a simple counter that increments/decrements on button clicks and can be reset to 0.

**Approach:**
- Maintain counter value
- Update display on button clicks
- Three operations: +1, -1, reset to 0

**Solution Code:**
```javascript
class Counter {
  constructor(displayId, incBtnId, decBtnId, resetBtnId) {
    this.display = document.getElementById(displayId);
    this.incBtn = document.getElementById(incBtnId);
    this.decBtn = document.getElementById(decBtnId);
    this.resetBtn = document.getElementById(resetBtnId);
    this.count = 0;
    
    this.incBtn.addEventListener('click', () => this.increment());
    this.decBtn.addEventListener('click', () => this.decrement());
    this.resetBtn.addEventListener('click', () => this.reset());
  }
  
  increment() {
    this.count++;
    this.updateDisplay();
  }
  
  decrement() {
    this.count--;
    this.updateDisplay();
  }
  
  reset() {
    this.count = 0;
    this.updateDisplay();
  }
  
  updateDisplay() {
    this.display.textContent = this.count;
  }
}

// Usage: new Counter('count', 'incBtn', 'decBtn', 'resetBtn');
```

---

## Problem 5: Show/Hide Password Toggle

**Problem Statement:**  
Create a password input field with an eye icon toggle to show/hide password.

**Approach:**
- Toggle input type between 'password' and 'text'
- Change icon based on current state
- Listen to toggle button click

**Solution Code:**
```javascript
class PasswordToggler {
  constructor(inputId, toggleBtnId) {
    this.input = document.getElementById(inputId);
    this.toggleBtn = document.getElementById(toggleBtnId);
    this.isVisible = false;
    
    this.toggleBtn.addEventListener('click', () => this.toggle());
  }
  
  toggle() {
    this.isVisible = !this.isVisible;
    this.input.type = this.isVisible ? 'text' : 'password';
    this.toggleBtn.textContent = this.isVisible ? '👁️' : '👁️‍🗨️';
  }
}

// Usage: new PasswordToggler('passwordInput', 'toggleBtn');
```

---

## Problem 6: Filter an Array Based on User Input

**Problem Statement:**  
Given a list of items, filter them as user types in a search box (case-insensitive).

**Approach:**
- Listen to input events
- Filter array based on current input value
- Re-render filtered list
- Case-insensitive comparison

**Solution Code:**
```javascript
class ArrayFilter {
  constructor(inputId, listId, dataArray) {
    this.input = document.getElementById(inputId);
    this.list = document.getElementById(listId);
    this.data = dataArray;
    
    this.input.addEventListener('input', (e) => this.filter(e.target.value));
    this.render(this.data);
  }
  
  filter(query) {
    const filtered = this.data.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    this.render(filtered);
  }
  
  render(items) {
    this.list.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      this.list.appendChild(li);
    });
  }
}

// Usage:
// const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];
// new ArrayFilter('searchInput', 'resultList', fruits);
```

---

## Problem 7: Fetch and Display Data from API

**Problem Statement:**  
Fetch data from a public API and display it in the DOM with loading and error states.

**Approach:**
- Show loading message initially
- Use fetch API to get data
- Parse JSON response
- Display data or show error message

**Solution Code:**
```javascript
class APIDataFetcher {
  constructor(containerId, apiUrl) {
    this.container = document.getElementById(containerId);
    this.apiUrl = apiUrl;
    
    this.fetchAndDisplay();
  }
  
  async fetchAndDisplay() {
    this.container.textContent = 'Loading...';
    
    try {
      const response = await fetch(this.apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.display(data);
    } catch (error) {
      this.container.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  }
  
  display(data) {
    this.container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}

// Usage:
// new APIDataFetcher('container', 'https://jsonplaceholder.typicode.com/posts/1');
```

---

## Problem 8: Image Gallery with Next/Previous Buttons

**Problem Statement:**  
Create a simple image gallery where users can navigate through images using next/previous buttons.

**Approach:**
- Maintain current image index
- Update displayed image on button click
- Wrap around when reaching ends
- Display current position (e.g., "1 of 5")

**Solution Code:**
```javascript
class ImageGallery {
  constructor(imageId, prevBtnId, nextBtnId, images) {
    this.image = document.getElementById(imageId);
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.images = images;
    this.currentIndex = 0;
    
    this.prevBtn.addEventListener('click', () => this.previous());
    this.nextBtn.addEventListener('click', () => this.next());
    
    this.display();
  }
  
  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.display();
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.display();
  }
  
  display() {
    this.image.src = this.images[this.currentIndex];
    document.getElementById('counter').textContent = 
      `${this.currentIndex + 1} of ${this.images.length}`;
  }
}

// Usage:
// const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
// new ImageGallery('gallery', 'prevBtn', 'nextBtn', images);
```

---

## Problem 9: Highlight Search Results

**Problem Statement:**  
Given text content and a search term, highlight all occurrences of the term in the text.

**Approach:**
- Create regex with search term (case-insensitive)
- Replace matches with highlighted span
- Update DOM with highlighted content

**Solution Code:**
```javascript
class SearchHighlight {
  constructor(containerId, searchInputId) {
    this.container = document.getElementById(containerId);
    this.searchInput = document.getElementById(searchInputId);
    this.originalText = this.container.textContent;
    
    this.searchInput.addEventListener('input', (e) => this.highlight(e.target.value));
  }
  
  highlight(query) {
    if (!query) {
      this.container.textContent = this.originalText;
      return;
    }
    
    const regex = new RegExp(`(${query})`, 'gi');
    const highlighted = this.originalText.replace(
      regex,
      '<mark style="background-color: yellow;">$1</mark>'
    );
    
    this.container.innerHTML = highlighted;
  }
}

// Usage: new SearchHighlight('content', 'searchInput');
```

---

## Problem 10: Like/Favorite Button with Count

**Problem Statement:**  
Create a like button that toggles state and updates like count.

**Approach:**
- Track liked state with boolean
- Track like count with number
- Toggle state and update count on click
- Update button styling based on state

**Solution Code:**
```javascript
class LikeButton {
  constructor(btnId) {
    this.btn = document.getElementById(btnId);
    this.liked = false;
    this.count = 0;
    
    this.btn.addEventListener('click', () => this.toggle());
    this.updateDisplay();
  }
  
  toggle() {
    this.liked = !this.liked;
    this.count += this.liked ? 1 : -1;
    this.updateDisplay();
  }
  
  updateDisplay() {
    this.btn.textContent = this.liked ? `❤️ ${this.count}` : `🤍 ${this.count}`;
    this.btn.classList.toggle('liked', this.liked);
  }
}

// Usage: new LikeButton('likeBtn');
```

---

## Problem 11: Convert Temperature (Celsius to Fahrenheit)

**Problem Statement:**  
Create a converter that converts temperature between Celsius and Fahrenheit as user types.

**Approach:**
- Listen to input events
- Apply conversion formula
- Display converted value
- Formula: F = (C × 9/5) + 32 or C = (F - 32) × 5/9

**Solution Code:**
```javascript
class TemperatureConverter {
  constructor(celsiusId, fahrenheitId) {
    this.celsius = document.getElementById(celsiusId);
    this.fahrenheit = document.getElementById(fahrenheitId);
    
    this.celsius.addEventListener('input', (e) => {
      const c = parseFloat(e.target.value);
      if (!isNaN(c)) {
        const f = (c * 9/5) + 32;
        this.fahrenheit.value = f.toFixed(2);
      }
    });
    
    this.fahrenheit.addEventListener('input', (e) => {
      const f = parseFloat(e.target.value);
      if (!isNaN(f)) {
        const c = (f - 32) * 5/9;
        this.celsius.value = c.toFixed(2);
      }
    });
  }
}

// Usage: new TemperatureConverter('celsiusInput', 'fahrenheitInput');
```

---

## Problem 12: Text Length Counter (Character Count)

**Problem Statement:**  
Create a character counter that updates as user types in a textarea, showing current count and max limit.

**Approach:**
- Track textarea content length
- Display current count
- Show remaining characters if max limit exists
- Update on input event

**Solution Code:**
```javascript
class TextCounter {
  constructor(textareaId, counterId, maxLimit = null) {
    this.textarea = document.getElementById(textareaId);
    this.counter = document.getElementById(counterId);
    this.maxLimit = maxLimit;
    
    this.textarea.addEventListener('input', () => this.updateCount());
    this.updateCount();
  }
  
  updateCount() {
    const length = this.textarea.value.length;
    
    if (this.maxLimit) {
      const remaining = this.maxLimit - length;
      this.counter.textContent = `${length}/${this.maxLimit} (${remaining} remaining)`;
      
      if (remaining < 0) {
        this.textarea.classList.add('limit-exceeded');
      } else {
        this.textarea.classList.remove('limit-exceeded');
      }
    } else {
      this.counter.textContent = `${length} characters`;
    }
  }
}

// Usage: new TextCounter('textarea', 'counter', 100);
```

---

## Problem 13: Validate Email Input

**Problem Statement:**  
Validate email format as user types and show valid/invalid feedback.

**Approach:**
- Use regex pattern for email validation
- Check on input change
- Display validation message
- Show visual feedback (green/red)

**Solution Code:**
```javascript
class EmailValidator {
  constructor(inputId, feedbackId) {
    this.input = document.getElementById(inputId);
    this.feedback = document.getElementById(feedbackId);
    
    this.input.addEventListener('input', () => this.validate());
  }
  
  validate() {
    const email = this.input.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);
    
    this.input.classList.remove('valid', 'invalid');
    this.input.classList.add(isValid ? 'valid' : 'invalid');
    
    this.feedback.textContent = isValid ? '✓ Valid email' : '✗ Invalid email';
    this.feedback.className = isValid ? 'valid' : 'invalid';
  }
}

// Usage: new EmailValidator('emailInput', 'feedback');
```

---

## Problem 14: BMI Calculator

**Problem Statement:**  
Create a BMI calculator that takes height (cm) and weight (kg) and calculates BMI with category.

**Approach:**
- Get height and weight from inputs
- Calculate BMI = weight / (height in meters)²
- Determine category (Underweight, Normal, Overweight, Obese)
- Display result with category

**Solution Code:**
```javascript
class BMICalculator {
  constructor(heightId, weightId, resultId) {
    this.height = document.getElementById(heightId);
    this.weight = document.getElementById(weightId);
    this.result = document.getElementById(resultId);
    
    this.height.addEventListener('input', () => this.calculate());
    this.weight.addEventListener('input', () => this.calculate());
  }
  
  calculate() {
    const h = parseFloat(this.height.value) / 100; // cm to meters
    const w = parseFloat(this.weight.value);
    
    if (h <= 0 || w <= 0) {
      this.result.textContent = '';
      return;
    }
    
    const bmi = w / (h * h);
    let category;
    
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    this.result.innerHTML = `
      <p>BMI: <strong>${bmi.toFixed(2)}</strong></p>
      <p>Category: <strong>${category}</strong></p>
    `;
  }
}

// Usage: new BMICalculator('heightInput', 'weightInput', 'result');
```

---

## Problem 15: Toggle Dark/Light Mode

**Problem Statement:**  
Create a theme toggle button that switches between dark and light mode and persists preference.

**Approach:**
- Toggle class on body/html element
- Update button icon/text
- Save preference to localStorage
- Load saved preference on page load

**Solution Code:**
```javascript
class ThemeToggler {
  constructor(toggleBtnId, storageKey = 'theme') {
    this.btn = document.getElementById(toggleBtnId);
    this.storageKey = storageKey;
    this.isDark = this.loadTheme();
    
    this.btn.addEventListener('click', () => this.toggle());
    this.applyTheme();
  }
  
  loadTheme() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  toggle() {
    this.isDark = !this.isDark;
    this.saveTheme();
    this.applyTheme();
  }
  
  saveTheme() {
    localStorage.setItem(this.storageKey, this.isDark ? 'dark' : 'light');
  }
  
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.btn.textContent = this.isDark ? '☀️' : '🌙';
  }
}

// Usage: new ThemeToggler('themeToggle');
```

---

## Problem 16: Display Table Rows Based on Array

**Problem Statement:**  
Render a table from array of objects with proper headers and data rows.

**Approach:**
- Get object keys as table headers
- Iterate through array to create table rows
- Create td elements for each property
- Append to table body

**Solution Code:**
```javascript
class TableRenderer {
  constructor(tableId, dataArray) {
    this.table = document.getElementById(tableId);
    this.data = dataArray;
    
    this.render();
  }
  
  render() {
    if (this.data.length === 0) return;
    
    const thead = this.table.querySelector('thead');
    const tbody = this.table.querySelector('tbody');
    
    // Clear existing data
    thead.innerHTML = '';
    tbody.innerHTML = '';
    
    // Create headers
    const headerRow = document.createElement('tr');
    Object.keys(this.data[0]).forEach(key => {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // Create rows
    this.data.forEach(item => {
      const row = document.createElement('tr');
      Object.values(item).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
  }
}

// Usage:
// const data = [
//   { name: 'John', age: 28, city: 'NYC' },
//   { name: 'Jane', age: 32, city: 'LA' }
// ];
// new TableRenderer('myTable', data);
```

---

## Problem 17: Accordion (Expand/Collapse Sections)

**Problem Statement:**  
Create accordion component where clicking a header expands/collapses the content section.

**Approach:**
- Track open/closed state per section
- Toggle display property on click
- Close other sections if single-open required
- Add visual indicator (arrow/+-)

**Solution Code:**
```javascript
class Accordion {
  constructor(containerClass, allowMultiple = false) {
    this.items = document.querySelectorAll(`.${containerClass}`);
    this.allowMultiple = allowMultiple;
    
    this.items.forEach((item, index) => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => this.toggle(index));
    });
  }
  
  toggle(index) {
    const item = this.items[index];
    const isOpen = item.classList.contains('open');
    
    if (!this.allowMultiple) {
      this.items.forEach(i => i.classList.remove('open'));
    }
    
    if (!isOpen) {
      item.classList.add('open');
    }
  }
}

// Usage: new Accordion('accordion-item');
```

---

## Problem 18: Form Field Validation with Error Messages

**Problem Statement:**  
Validate form fields on blur/submit and display specific error messages.

**Approach:**
- Define validation rules per field
- Check rules on input blur
- Display error message below field
- Enable submit only when all valid

**Solution Code:**
```javascript
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errors = {};
    
    this.setupValidation();
  }
  
  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validateAll();
    });
  }
  
  validateField(input) {
    const { name, type, value } = input;
    let error = '';
    
    if (!value) {
      error = `${name} is required`;
    } else if (type === 'email' && !this.isValidEmail(value)) {
      error = 'Invalid email format';
    } else if (type === 'password' && value.length < 8) {
      error = 'Password must be at least 8 characters';
    }
    
    if (error) {
      this.showError(input, error);
    } else {
      this.clearError(input);
    }
    
    return !error;
  }
  
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  showError(input, error) {
    input.classList.add('error');
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = error;
  }
  
  clearError(input) {
    input.classList.remove('error');
    const errorElement = input.nextElementSibling;
    if (errorElement?.classList.contains('error-message')) {
      errorElement.remove();
    }
  }
  
  validateAll() {
    const inputs = this.form.querySelectorAll('input, textarea');
    let allValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        allValid = false;
      }
    });
    
    if (allValid) {
      alert('Form submitted successfully!');
      this.form.reset();
    }
  }
}

// Usage: new FormValidator('myForm');
```

---

## Problem 19: Random Quote Generator

**Problem Statement:**  
Display a random quote with author and button to get next quote.

**Approach:**
- Maintain array of quote objects
- Generate random index on button click
- Display quote and author
- Add fade animation on quote change

**Solution Code:**
```javascript
class QuoteGenerator {
  constructor(containerId, nextBtnId) {
    this.container = document.getElementById(containerId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.quotes = [
      { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
      { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
      { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
      { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
      { text: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle' }
    ];
    
    this.nextBtn.addEventListener('click', () => this.showRandomQuote());
    this.showRandomQuote();
  }
  
  showRandomQuote() {
    const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    
    this.container.style.opacity = '0';
    
    setTimeout(() => {
      this.container.innerHTML = `
        <p class="quote-text">"${quote.text}"</p>
        <p class="quote-author">— ${quote.author}</p>
      `;
      this.container.style.opacity = '1';
    }, 300);
  }
}

// Usage: new QuoteGenerator('quoteContainer', 'nextQuoteBtn');
```

---

## Problem 20: Age Calculator

**Problem Statement:**  
Calculate age from date of birth and display years, months, days.

**Approach:**
- Get date of birth from input
- Calculate difference in milliseconds
- Convert to years, months, days
- Display formatted result

**Solution Code:**
```javascript
class AgeCalculator {
  constructor(dobInputId, resultId) {
    this.input = document.getElementById(dobInputId);
    this.result = document.getElementById(resultId);
    
    this.input.addEventListener('change', () => this.calculate());
  }
  
  calculate() {
    const dob = new Date(this.input.value);
    const today = new Date();
    
    if (dob > today) {
      this.result.textContent = 'Please enter a valid date of birth';
      return;
    }
    
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
    
    if (days < 0) {
      months--;
      days += 30;
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    this.result.innerHTML = `
      <p>Age: <strong>${years}</strong> years, <strong>${months}</strong> months, <strong>${days}</strong> days</p>
    `;
  }
}

// Usage: new AgeCalculator('dobInput', 'result');
```

---

## Problem 21: Tip Calculator

**Problem Statement:**  
Calculate bill total with tip percentage and split among people.

**Approach:**
- Get bill amount and tip percentage
- Calculate tip and total
- Divide by number of people
- Show per-person amount

**Solution Code:**
```javascript
class TipCalculator {
  constructor(billId, tipId, peopleId, resultId) {
    this.bill = document.getElementById(billId);
    this.tip = document.getElementById(tipId);
    this.people = document.getElementById(peopleId);
    this.result = document.getElementById(resultId);
    
    [this.bill, this.tip, this.people].forEach(el => {
      el.addEventListener('input', () => this.calculate());
    });
  }
  
  calculate() {
    const billAmount = parseFloat(this.bill.value) || 0;
    const tipPercent = parseFloat(this.tip.value) || 0;
    const numPeople = parseInt(this.people.value) || 1;
    
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numPeople;
    
    this.result.innerHTML = `
      <p>Tip Amount: <strong>$${tipAmount.toFixed(2)}</strong></p>
      <p>Total: <strong>$${totalAmount.toFixed(2)}</strong></p>
      <p>Per Person: <strong>$${perPerson.toFixed(2)}</strong></p>
    `;
  }
}

// Usage: new TipCalculator('billInput', 'tipInput', 'peopleInput', 'result');
```

---

## Problem 22: Simple Notes App with localStorage

**Problem Statement:**  
Create a notes app where users can create, view, edit, and delete notes with localStorage persistence.

**Approach:**
- Store notes in localStorage as JSON
- Load notes on page load
- Render notes as list/cards
- CRUD operations update localStorage

**Solution Code:**
```javascript
class NotesApp {
  constructor(containerId, inputId, addBtnId, storageKey = 'notes') {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.addBtn = document.getElementById(addBtnId);
    this.storageKey = storageKey;
    this.notes = this.loadNotes();
    
    this.addBtn.addEventListener('click', () => this.addNote());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addNote();
    });
    
    this.render();
  }
  
  loadNotes() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }
  
  saveNotes() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }
  
  addNote() {
    const text = this.input.value.trim();
    if (!text) return;
    
    this.notes.push({
      id: Date.now(),
      text: text,
      created: new Date().toLocaleString()
    });
    
    this.input.value = '';
    this.saveNotes();
    this.render();
  }
  
  deleteNote(id) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotes();
    this.render();
  }
  
  render() {
    this.container.innerHTML = '';
    
    this.notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.className = 'note-card';
      noteEl.innerHTML = `
        <p>${note.text}</p>
        <small>${note.created}</small>
        <button onclick="app.deleteNote(${note.id})">Delete</button>
      `;
      this.container.appendChild(noteEl);
    });
  }
}

// Usage: window.app = new NotesApp('notesContainer', 'noteInput', 'addNoteBtn');
```

---

**These 22 problems are specifically designed for freshers with 0-2 years experience and are frequently asked in interviews at Indian tech companies like Flipkart, Swiggy, Amazon, Microsoft, and Ola. They focus on practical DOM manipulation, event handling, basic data structures, and user interaction - the core skills required for entry-level frontend roles.**
