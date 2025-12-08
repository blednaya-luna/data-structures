# StackArrayWithSet

A **modified stack** that combines the LIFO (Last In, First Out) behavior of a stack with the fast lookup capabilities of a Set. `StackArrayWithSet<T>` maintains both an internal array (for stack operations) and a Set (for O(1) existence checks).

## Characteristics

- **LIFO ordering** — last element pushed is first to be popped
- **Fast lookup** — O(1) contains checks using internal Set
- **Dual storage** — array for order preservation + Set for fast existence checks
- **Type-safe** — full TypeScript generic support
- **Unique element tracking** — automatically tracks unique elements

---

## API Reference

### Constructor

```typescript
new StackArrayWithSet<T>(items?: readonly T[])
```

Creates a new stack with Set optimization. Optionally initializes it with an array of items.

**Example:**
```typescript
const stack = new StackArrayWithSet<number>();
const stackWithItems = new StackArrayWithSet<number>([1, 2, 3]);
```

---

### Methods

#### `push(item: T): void`

Adds an element to the **top** of the stack and updates the internal Set.

- **Time complexity:** O(1) amortized

**Example:**
```typescript
const stack = new StackArrayWithSet<number>();
stack.push(1);
stack.push(2);
stack.push(3);
// Stack: [1, 2, 3] (3 is on top)
```

---

#### `pop(): T | undefined`

Removes and returns the element from the **top** of the stack, also removing it from the internal Set.

- Returns `undefined` if the stack is empty
- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArrayWithSet<number>([1, 2, 3]);
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
const stack = new StackArrayWithSet<number>([1, 2, 3]);
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
const stack = new StackArrayWithSet<number>([1, 2, 3]);
console.log(stack.size()); // 3
```

---

#### `isEmpty(): boolean`

Checks if the stack is empty.

- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArrayWithSet<number>();
console.log(stack.isEmpty()); // true
stack.push(1);
console.log(stack.isEmpty()); // false
```

---

#### `clear(): void`

Removes all elements from the stack and clears the internal Set.

- **Time complexity:** O(1)

**Example:**
```typescript
const stack = new StackArrayWithSet<number>([1, 2, 3]);
stack.clear();
console.log(stack.isEmpty()); // true
console.log(stack.size()); // 0
```

---

#### `contains(item: T, equalsFn?: (a: T, b: T) => boolean): boolean`

Checks if an element exists in the stack.

- **Without equalsFn:** Uses the internal Set for **O(1)** lookup
- **With equalsFn:** Falls back to linear search for custom comparison (**O(n)**)
- **Time complexity:** O(1) without `equalsFn`, O(n) with `equalsFn`

**Example:**
```typescript
const stack = new StackArrayWithSet<number>([1, 2, 3]);
console.log(stack.contains(2)); // true - O(1)
console.log(stack.contains(5)); // false - O(1)

// With custom comparison (O(n))
const objStack = new StackArrayWithSet<{id: number}>([{id: 1}, {id: 2}]);
console.log(objStack.contains({id: 2}, (a, b) => a.id === b.id)); // true
```

---

#### `toArray(): T[]`

Returns a **copy** of all elements as an array.

- Elements are ordered from bottom to top (index 0 is the bottom)
- **Time complexity:** O(n)

**Example:**
```typescript
const stack = new StackArrayWithSet<number>([1, 2, 3]);
const array = stack.toArray();
console.log(array); // [1, 2, 3]
```

---

#### `clone(): StackArrayWithSet<T>`

Creates a **shallow copy** of the stack with both array and Set.

- **Time complexity:** O(n)
- **Note:** Values are not deep-cloned

**Example:**
```typescript
const stack = new StackArrayWithSet<number>([1, 2, 3]);
const cloned = stack.clone();
cloned.push(4);
console.log(stack.size());   // 3
console.log(cloned.size());  // 4
```

---

#### `static fromArray<U>(array: readonly U[]): StackArrayWithSet<U>`

Creates a new stack from an array.

- Array elements are added in order (first element becomes bottom, last becomes top)
- **Time complexity:** O(n)

**Example:**
```typescript
const stack = StackArrayWithSet.fromArray([1, 2, 3]);
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
| `contains` (without equalsFn) | **O(1)** ⚡ |
| `contains` (with equalsFn) | O(n) |
| `toArray` | O(n) |
| `clone` | O(n) |

---

## Comparison with StackArray

| Feature | StackArray | StackArrayWithSet |
|---------|-----------|-------------------|
| Memory usage | Lower | Higher (stores Set) |
| `contains` without custom compare | O(n) | **O(1)** ⚡ |
| `contains` with custom compare | O(n) | O(n) |
| Best for | General stack operations | Frequent existence checks |

**When to use StackArrayWithSet:**
- You need frequent `contains()` checks
- Memory overhead is acceptable
- Working with primitive types or objects with proper equality

**When to use StackArray:**
- Memory efficiency is critical
- Rare `contains()` operations
- Working primarily with push/pop/peek operations

---

## Use Cases

- **Tracking visited nodes** in graph algorithms (DFS with fast cycle detection)
- **Browser history with duplicate detection** — track if a page was already visited
- **Undo/Redo with state checking** — quickly check if a state already exists
- **Processing unique items in order** — maintain order while checking for duplicates
- **Command pattern with validation** — ensure commands aren't duplicated
- **Cache with LIFO eviction** — track cached items with fast lookup

---

## Example Usage

```typescript
import { StackArrayWithSet } from './src';

// Create a new stack
const stack = new StackArrayWithSet<number>();

// Push elements
stack.push(10);
stack.push(20);
stack.push(30);
// Stack: [10, 20, 30] (30 is on top)

// Fast O(1) contains check
console.log(stack.contains(20)); // true - instant lookup!
console.log(stack.contains(99)); // false

// Pop elements
console.log(stack.pop()); // 30
console.log(stack.pop()); // 20

// Contains is updated after pop
console.log(stack.contains(20)); // false - removed from Set

// Check size and emptiness
console.log(stack.size());    // 1
console.log(stack.isEmpty()); // false

// Convert to array
const array = stack.toArray();
console.log(array); // [10]

// Clone the stack
const cloned = stack.clone();
cloned.push(25);
console.log(stack.size());   // 1
console.log(cloned.size());  // 2

// Create from array
const fromArray = StackArrayWithSet.fromArray([1, 2, 3, 4, 5]);
console.log(fromArray.peek()); // 5
console.log(fromArray.contains(3)); // true - O(1)

// Clear the stack
stack.clear();
console.log(stack.isEmpty()); // true
```

---

## Practical Example: Graph DFS with Cycle Detection

```typescript
interface GraphNode {
  id: string;
  neighbors: string[];
}

function hasPath(
  graph: Map<string, GraphNode>,
  start: string,
  end: string
): boolean {
  const stack = new StackArrayWithSet<string>();
  stack.push(start);

  while (!stack.isEmpty()) {
    const current = stack.pop()!;

    if (current === end) {
      return true;
    }

    const node = graph.get(current);
    if (!node) continue;

    for (const neighbor of node.neighbors) {
      // O(1) cycle detection!
      if (!stack.contains(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return false;
}

// Example usage
const graph = new Map<string, GraphNode>([
  ['A', { id: 'A', neighbors: ['B', 'C'] }],
  ['B', { id: 'B', neighbors: ['D'] }],
  ['C', { id: 'C', neighbors: ['D'] }],
  ['D', { id: 'D', neighbors: [] }]
]);

console.log(hasPath(graph, 'A', 'D')); // true
console.log(hasPath(graph, 'A', 'X')); // false
```

---

## Practical Example: Duplicate Detection in Processing

```typescript
class UniqueTaskProcessor {
  private taskStack = new StackArrayWithSet<string>();

  addTask(taskId: string): boolean {
    // O(1) check if task already exists
    if (this.taskStack.contains(taskId)) {
      console.log(`Task ${taskId} already queued`);
      return false;
    }

    this.taskStack.push(taskId);
    console.log(`Task ${taskId} added to queue`);
    return true;
  }

  processNext(): string | undefined {
    const task = this.taskStack.pop();
    if (task) {
      console.log(`Processing task: ${task}`);
    }
    return task;
  }

  hasPendingTask(taskId: string): boolean {
    return this.taskStack.contains(taskId); // O(1)
  }

  getPendingCount(): number {
    return this.taskStack.size();
  }
}

const processor = new UniqueTaskProcessor();
processor.addTask('TASK-001'); // Added
processor.addTask('TASK-002'); // Added
processor.addTask('TASK-001'); // Already queued - rejected

console.log(processor.hasPendingTask('TASK-002')); // true
processor.processNext(); // Processing TASK-002
console.log(processor.hasPendingTask('TASK-002')); // false
```

---

## Practical Example: Browser History with Duplicate Detection

```typescript
class BrowserHistory {
  private history = new StackArrayWithSet<string>();

  visit(url: string): void {
    if (this.history.contains(url)) {
      console.log(`Already visited: ${url}`);
    } else {
      console.log(`First visit: ${url}`);
    }
    this.history.push(url);
  }

  back(): string | undefined {
    const current = this.history.pop();
    const previous = this.history.peek();
    console.log(`Going back from ${current} to ${previous || 'start'}`);
    return previous;
  }

  hasVisited(url: string): boolean {
    return this.history.contains(url); // O(1)
  }

  getHistory(): string[] {
    return this.history.toArray();
  }
}

const browser = new BrowserHistory();
browser.visit('google.com');      // First visit
browser.visit('github.com');      // First visit
browser.visit('google.com');      // Already visited
browser.visit('stackoverflow.com');

console.log(browser.hasVisited('github.com')); // true - O(1)
browser.back(); // Going back from stackoverflow.com to google.com
```

---

## Important Notes

### Duplicate Handling
```typescript
const stack = new StackArrayWithSet<number>();
stack.push(1);
stack.push(2);
stack.push(1); // Duplicate allowed in array
// Stack: [1, 2, 1]
// Set: {1, 2}

console.log(stack.size()); // 3 - array has all items
console.log(stack.contains(1)); // true

stack.pop(); // Removes 1
console.log(stack.contains(1)); // true - another 1 still in array!

stack.pop(); // Removes 2
stack.pop(); // Removes last 1
console.log(stack.contains(1)); // false - all 1's removed
```

**Important:** The Set tracks which unique values are present, but duplicates can exist in the array. `contains()` returns `true` if **any** instance exists.

### Memory Considerations

- **Extra memory:** ~O(n) for the Set in addition to the array
- **Trade-off:** Faster lookups vs higher memory usage
- **Best for:** Scenarios where lookup speed outweighs memory cost

### Custom Equality Functions

When using `equalsFn`, the method falls back to O(n) linear search:

```typescript
const stack = new StackArrayWithSet<{id: number, name: string}>();
stack.push({id: 1, name: 'Alice'});
stack.push({id: 2, name: 'Bob'});

// This is O(n), not O(1)
const found = stack.contains(
  {id: 1, name: 'Alice'}, 
  (a, b) => a.id === b.id
);
```

For optimal O(1) performance, use primitive types or objects with proper JavaScript equality.

---

## Performance Tips

1. **Use without equalsFn for O(1) lookups** — this is the main advantage
2. **Consider memory usage** — if contains() is rare, use regular StackArray
3. **Avoid duplicates if possible** — Set size stays smaller
4. **Use primitive types** — numbers, strings, booleans work best with Set