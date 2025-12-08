# StackArray

A **stack** is a linear data structure that follows the **LIFO (Last In, First Out)** principle. The last element added to the stack is the first one to be removed. `StackArray<T>` implements a stack using an internal array for storage.

## Characteristics

- **LIFO ordering** — last element pushed is first to be popped
- **Dynamic size** — grows and shrinks automatically
- **Array-based** — uses JavaScript arrays for efficient implementation
- **Type-safe** — full TypeScript generic support

---

## API Reference

### Constructor

```typescript
new StackArray<T>(items?: readonly T[])
```

Creates a new stack. Optionally initializes it with an array of items.

**Example:**
```typescript
const stack = new StackArray<number>();
const stackWithItems = new StackArray<number>([1, 2, 3]);
```

---

### Methods

#### `push(item: T): void`

Adds an element to the **top** of the stack.

- **Time complexity:** O(1) amortized

**Example:**
```typescript
const stack = new StackArray<number>();
stack.push(1);
stack.push(2);
stack.push(3);
// Stack: [1, 2, 3] (3 is on top)
```

---

#### `pop(): T | undefined`

Removes and returns the element from the **top** of the stack.

- Returns `undefined` if the stack is empty
- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArray<number>([1, 2, 3]);
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
// Stack: [1]
```

---

#### `peek(): T | undefined`

Returns the element at the **top** of the stack without removing it.

- Returns `undefined` if the stack is empty
- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArray<number>([1, 2, 3]);
console.log(stack.peek()); // 3
console.log(stack.peek()); // 3 (still there)
console.log(stack.size()); // 3
```

---

#### `size(): number`

Returns the number of elements in the stack.

- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArray<number>([1, 2, 3]);
console.log(stack.size()); // 3
```

---

#### `isEmpty(): boolean`

Checks if the stack is empty.

- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArray<number>();
console.log(stack.isEmpty()); // true
stack.push(1);
console.log(stack.isEmpty()); // false
```

---

#### `clear(): void`

Removes all elements from the stack.

- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArray<number>([1, 2, 3]);
stack.clear();
console.log(stack.isEmpty()); // true
console.log(stack.size()); // 0
```

---

#### `contains(item: T, equalsFn?: (a: T, b: T) => boolean): boolean`

Checks if an element exists in the stack.

- **equalsFn** — optional custom comparison function for complex types
- Uses strict equality (`===`) by default
- **Time complexity:** O(n)

**Example:**
```typescript
const stack = new StackArray<number>([1, 2, 3]);
console.log(stack.contains(2)); // true
console.log(stack.contains(5)); // false

// With custom comparison
const objStack = new StackArray<{id: number}>([{id: 1}, {id: 2}]);
console.log(objStack.contains({id: 2}, (a, b) => a.id === b.id)); // true
```

---

#### `toArray(): T[]`

Returns a **copy** of all elements as an array.

- Elements are ordered from bottom to top (index 0 is the bottom)
- **Time complexity:** O(n)

**Example:**
```typescript
const stack = new StackArray<number>([1, 2, 3]);
const array = stack.toArray();
console.log(array); // [1, 2, 3]
// Modifying the array doesn't affect the stack
array.push(4);
console.log(stack.size()); // 3
```

---

#### `clone(): StackArray<T>`

Creates a **shallow copy** of the stack.

- **Time complexity:** O(n)
- **Note:** Values are not deep-cloned

**Example:**
```typescript
const stack = new StackArray<number>([1, 2, 3]);
const cloned = stack.clone();
cloned.push(4);
console.log(stack.size());   // 3
console.log(cloned.size());  // 4
```

---

#### `static fromArray<U>(array: readonly U[]): StackArray<U>`

Creates a new stack from an array.

- Array elements are added in order (first element becomes bottom, last becomes top)
- **Time complexity:** O(n)

**Example:**
```typescript
const stack = StackArray.fromArray([1, 2, 3]);
console.log(stack.peek()); // 3
console.log(stack.size()); // 3
```

---

## Time Complexity Summary

| Operation | Time Complexity |
|-----------|----------------|
| `push` | O(1) amortized |
| `pop` | O(1) |
| `peek` | O(1) |
| `size` | O(1) |
| `isEmpty` | O(1) |
| `clear` | O(1) |
| `contains` | O(n) |
| `toArray` | O(n) |
| `clone` | O(n) |

---

## Use Cases

- **Undo/Redo functionality** — track user actions in editors or applications
- **Expression evaluation** — parsing and evaluating mathematical expressions (postfix, infix)
- **Backtracking algorithms** — depth-first search, maze solving
- **Browser history** — navigating back through visited pages
- **Function call stack** — managing recursive function calls
- **Syntax parsing** — matching parentheses, brackets, and braces
- **Reversing data** — reversing strings, arrays, or other sequences

---

## Example Usage

```typescript
import { StackArray } from './src';

// Create a new stack
const stack = new StackArray<number>();

// Push elements
stack.push(10);
stack.push(20);
stack.push(30);
// Stack: [10, 20, 30] (30 is on top)

// Peek at the top
console.log(stack.peek()); // 30

// Pop elements
console.log(stack.pop()); // 30
console.log(stack.pop()); // 20
// Stack: [10]

// Check size and emptiness
console.log(stack.size());    // 1
console.log(stack.isEmpty()); // false

// Check if element exists
stack.push(5);
stack.push(15);
console.log(stack.contains(10)); // true
console.log(stack.contains(99)); // false

// Convert to array
const array = stack.toArray();
console.log(array); // [10, 5, 15]

// Clone the stack
const cloned = stack.clone();
cloned.push(25);
console.log(stack.size());   // 3
console.log(cloned.size());  // 4

// Create from array
const fromArray = StackArray.fromArray([1, 2, 3, 4, 5]);
console.log(fromArray.peek()); // 5
console.log(fromArray.size()); // 5

// Clear the stack
stack.clear();
console.log(stack.isEmpty()); // true
```

---

## Practical Example: Parentheses Matching

```typescript
function isBalanced(expression: string): boolean {
  const stack = new StackArray<string>();
  const pairs: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of expression) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      if (stack.isEmpty() || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

console.log(isBalanced("()"));        // true
console.log(isBalanced("([{}])"));    // true
console.log(isBalanced("([)]"));      // false
console.log(isBalanced("((()"));      // false
```

---

## Practical Example: Undo/Redo System

```typescript
class TextEditor {
  private content: string = '';
  private undoStack = new StackArray<string>();
  private redoStack = new StackArray<string>();

  write(text: string): void {
    this.undoStack.push(this.content);
    this.content += text;
    this.redoStack.clear(); // Clear redo history on new action
  }

  undo(): void {
    if (!this.undoStack.isEmpty()) {
      this.redoStack.push(this.content);
      this.content = this.undoStack.pop()!;
    }
  }

  redo(): void {
    if (!this.redoStack.isEmpty()) {
      this.undoStack.push(this.content);
      this.content = this.redoStack.pop()!;
    }
  }

  getContent(): string {
    return this.content;
  }
}

const editor = new TextEditor();
editor.write('Hello');
editor.write(' World');
console.log(editor.getContent()); // "Hello World"

editor.undo();
console.log(editor.getContent()); // "Hello"

editor.redo();
console.log(editor.getContent()); // "Hello World"
```

---

## Notes

- The `clone()` and `toArray()` methods perform **shallow copies** of values. If your stack contains objects, modifications to those objects will affect both the original and cloned stack.
- The `contains()` method searches through all elements, making it O(n). If you need frequent existence checks, consider using `StackArrayWithSet` instead.
- All methods that accept an `equalsFn` parameter allow custom comparison logic for complex types.
- The internal array grows dynamically, so `push` operations have O(1) amortized time complexity.