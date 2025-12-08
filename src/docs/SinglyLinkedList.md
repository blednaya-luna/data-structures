# SinglyLinkedList

A **singly linked list** is a linear data structure consisting of nodes where each node contains a value and a reference (pointer) to the next node in the sequence. The last node points to `null`, indicating the end of the list.

## Characteristics

- **Dynamic size** — grows and shrinks as needed without pre-allocation
- **Efficient insertion/deletion** — O(1) at the beginning, O(1) at the end (with tail pointer)
- **Sequential access** — requires traversal from head to access elements
- **Memory overhead** — each node requires extra memory for the `next` pointer

---

## API Reference

### Constructor

```typescript
new SinglyLinkedList<T>(items?: T[])
```

Creates a new singly linked list. Optionally initializes it with an array of items.

**Example:**
```typescript
const list = new SinglyLinkedList<number>();
const listWithItems = new SinglyLinkedList<number>([1, 2, 3]);
```

---

### Methods

#### `prepend(value: T): void`

Adds an element to the **beginning** of the list.

- **Time complexity:** O(1)

**Example:**
```typescript
const list = new SinglyLinkedList<number>();
list.prepend(1);
list.prepend(2);
// List: 2 -> 1
```

---

#### `append(value: T): void`

Adds an element to the **end** of the list.

- **Time complexity:** O(1)

**Example:**
```typescript
const list = new SinglyLinkedList<number>();
list.append(1);
list.append(2);
// List: 1 -> 2
```

---

#### `insertAt(value: T, index: number): void`

Inserts an element at a specific index.

- If `index === 0`, behaves like `prepend`
- If `index >= length`, behaves like `append`
- **Time complexity:** O(n)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 4]);
list.insertAt(3, 2);
// List: 1 -> 2 -> 3 -> 4
```

---

#### `remove(value: T, equalsFn?: (a: T, b: T) => boolean): void`

Removes the **first occurrence** of an element by value.

- **equalsFn** — optional custom comparison function
- **Time complexity:** O(n)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3, 2]);
list.remove(2);
// List: 1 -> 3 -> 2

// With custom comparison
const objList = new SinglyLinkedList<{id: number}>([{id: 1}, {id: 2}]);
objList.remove({id: 2}, (a, b) => a.id === b.id);
```

---

#### `removeAt(index: number): void`

Removes an element at a specific index.

- Does nothing if index is out of bounds
- **Time complexity:** O(n)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3]);
list.removeAt(1);
// List: 1 -> 3
```

---

#### `find(value: T, equalsFn?: (a: T, b: T) => boolean): SinglyLinkedListNode<T> | null`

Finds and returns the **first node** with the specified value.

- Returns `null` if not found
- **equalsFn** — optional custom comparison function
- **Time complexity:** O(n)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3]);
const node = list.find(2);
console.log(node?.value); // 2
console.log(node?.next?.value); // 3
```

---

#### `contains(value: T, equalsFn?: (a: T, b: T) => boolean): boolean`

Checks if a value exists in the list.

- **equalsFn** — optional custom comparison function
- **Time complexity:** O(n)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3]);
console.log(list.contains(2)); // true
console.log(list.contains(5)); // false
```

---

#### `size(): number`

Returns the number of elements in the list.

- **Time complexity:** O(1)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3]);
console.log(list.size()); // 3
```

---

#### `isEmpty(): boolean`

Checks if the list is empty.

- **Time complexity:** O(1)

**Example:**
```typescript
const list = new SinglyLinkedList<number>();
console.log(list.isEmpty()); // true
list.append(1);
console.log(list.isEmpty()); // false
```

---

#### `clear(): void`

Removes all elements from the list.

- **Time complexity:** O(1)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3]);
list.clear();
console.log(list.isEmpty()); // true
```

---

#### `toArray(): T[]`

Converts the list to an array.

- **Time complexity:** O(n)

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3]);
const array = list.toArray();
console.log(array); // [1, 2, 3]
```

---

#### `clone(): SinglyLinkedList<T>`

Creates a **shallow copy** of the list with new nodes.

- **Time complexity:** O(n)
- **Note:** Values are not deep-cloned

**Example:**
```typescript
const list = new SinglyLinkedList<number>([1, 2, 3]);
const cloned = list.clone();
cloned.append(4);
console.log(list.size());   // 3
console.log(cloned.size()); // 4
```

---

#### `static fromArray<U>(array: U[]): SinglyLinkedList<U>`

Creates a new list from an array.

- **Time complexity:** O(n)

**Example:**
```typescript
const list = SinglyLinkedList.fromArray([1, 2, 3]);
console.log(list.size()); // 3
```

---

## Time Complexity Summary

| Operation | Time Complexity |
|-----------|----------------|
| `prepend` | O(1) |
| `append` | O(1) |
| `insertAt` | O(n) |
| `remove` | O(n) |
| `removeAt` | O(n) |
| `find` | O(n) |
| `contains` | O(n) |
| `size` | O(1) |
| `isEmpty` | O(1) |
| `clear` | O(1) |
| `toArray` | O(n) |
| `clone` | O(n) |

---

## Use Cases

- **Efficient insertions and deletions** at the beginning or end of the list
- **Implementing other data structures** like stacks, queues, or deques
- **Memory-efficient storage** when the size is unknown or frequently changes
- **Sequential data processing** where you iterate through elements once
- **Undo/redo functionality** in applications

---

## Example Usage

```typescript
import { SinglyLinkedList } from './src';

// Create a new list
const list = new SinglyLinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
// List: 0 -> 1 -> 2 -> 3

// Insert at specific position
list.insertAt(1.5, 2);
// List: 0 -> 1 -> 1.5 -> 2 -> 3

// Remove elements
list.remove(1.5);
list.removeAt(0);
// List: 1 -> 2 -> 3

// Search for elements
const node = list.find(2);
console.log(node?.value); // 2

console.log(list.contains(2)); // true
console.log(list.contains(5)); // false

// Convert to array
const array = list.toArray();
console.log(array); // [1, 2, 3]

// Clone the list
const cloned = list.clone();
cloned.append(4);
console.log(list.toArray());   // [1, 2, 3]
console.log(cloned.toArray()); // [1, 2, 3, 4]

// Create from array
const fromArray = SinglyLinkedList.fromArray([10, 20, 30]);
console.log(fromArray.size()); // 3
```

---

## Node Structure

Each node in the list is represented by the `SinglyLinkedListNode<T>` class:

```typescript
class SinglyLinkedListNode<T> {
  value: T;
  next: SinglyLinkedListNode<T> | null;
}
```

- **value** — the data stored in the node
- **next** — reference to the next node (or `null` if it's the last node)

---

## Notes

- The `clone()` method performs a **shallow copy** of values. If your list contains objects, the cloned list will reference the same objects.
- All methods that accept an `equalsFn` parameter allow custom comparison logic for complex types.
- The list maintains both `head` and `tail` pointers for efficient operations at both ends.