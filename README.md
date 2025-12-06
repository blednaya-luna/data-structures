# Data Structures

A collection of simple data structures implemented in TypeScript.

Current version includes:

- `StackArray<T>` — stack based on an array.
- `StackArrayWithSet<T>` — stack with an internal `Set` for fast lookup.

---

## StackArray

A stack is a **LIFO (Last In, First Out)** data structure.  
`StackArray` stores elements in an array and supports the following operations:

- `push(item: T)` — add an element to the top of the stack.
- `pop(): T | undefined` — remove and return the top element.
- `peek(): T | undefined` — return the top element without removing it.
- `isEmpty(): boolean` — check if the stack is empty.
- `size(): number` — get the number of elements.
- `clear()` — remove all elements from the stack.
- `contains(item: T, equalsFn?: (a, b) => boolean): boolean` — check if an element exists, with optional comparison function.
- `toArray(): T[]` — get an array of all elements.
- `clone(): StackArray<T>` — create a copy of the stack.
- `static fromArray<U>(array: readonly U[]): StackArray<U>` — create a stack from an array.

**Use cases:**
- Undo/redo operations.
- Postfix notation and expression evaluation.
- Any scenario where the order of insertion and removal matters.

---

## StackArrayWithSet

`StackArrayWithSet` is a **modified stack** that also stores elements in a `Set` for **fast existence checks (`contains`)**.

- All methods of `StackArray` are available.
- Internal `Set` allows `contains` checks in `O(1)` time.
- `contains(item, equalsFn?)` supports a custom comparison function.

**Use cases:**
- Frequent existence checks for elements in the stack.
- When you need regular stack behavior plus fast lookup of unique items.

---

## Example Usage

```ts
import { StackArray, StackArrayWithSet } from './src';

const stackArray = new StackArray<number>();
stackArray.push(1);
stackArray.push(2);
console.log(stackArray.pop()); // 2

const stackArrayWithSet = new StackArrayWithSet<string>();
stackArrayWithSet.push('a');
stackArrayWithSet.push('b');
console.log(stackArrayWithSet.contains('a')); // true
