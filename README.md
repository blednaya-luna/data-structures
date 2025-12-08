# Data Structures

A collection of simple, efficient data structures implemented in TypeScript with full type safety and comprehensive documentation.

## 📦 Available Data Structures

### Stack Implementations

- **[StackArray](./src/docs/StackArray.md)** — Classic LIFO stack based on an array
- **[StackArrayWithSet](./src/docs/StackArrayWithSet.md)** — Stack with O(1) existence checks using an internal Set

### Linked Lists

- **[SinglyLinkedList](./src/docs/SinglyLinkedList.md)** — Linear collection with efficient insertions and deletions

---

## 🚀 Quick Start

```typescript
import { StackArray, StackArrayWithSet, SinglyLinkedList } from './src';

// StackArray - Simple LIFO stack
const stack = new StackArray<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2

// StackArrayWithSet - Stack with fast lookups
const stackSet = new StackArrayWithSet<string>();
stackSet.push('a');
stackSet.push('b');
console.log(stackSet.contains('a')); // true - O(1)!

// SinglyLinkedList - Efficient insertions/deletions
const list = new SinglyLinkedList<number>([1, 2, 3]);
list.append(4);
list.prepend(0);
list.insertAt(99, 2);
list.remove(2);
list.removeAt(0);

const node = list.find(3);
console.log(list.contains(4)); // true

const array = list.toArray();    // [1, 99, 3, 4]
const cloned = list.clone();     // new independent list
```

---

## 📚 Documentation

Each data structure has detailed documentation with API references, examples, and use cases:

### [StackArray](./src/docs/StackArray.md)

A **LIFO (Last In, First Out)** stack implementation using an array.

**Key Operations:**
- `push(item)` — O(1)
- `pop()` — O(1)
- `peek()` — O(1)
- `contains(item)` — O(n)
- `size()`, `isEmpty()`, `clear()`
- `toArray()`, `clone()`, `fromArray()`

**Best For:**
- Undo/redo functionality
- Expression evaluation (postfix, infix)
- Backtracking algorithms
- Browser history
- Function call stacks

**[→ Full Documentation](./src/docs/StackArray.md)**

---

### [StackArrayWithSet](./src/docs/StackArrayWithSet.md)

A **modified stack** with an internal Set for **O(1) existence checks**.

**Key Operations:**
- All `StackArray` methods
- `contains(item)` — **O(1)** ⚡ (without custom comparison)
- `contains(item, equalsFn)` — O(n) (with custom comparison)

**Best For:**
- Frequent `contains()` checks
- Graph algorithms with cycle detection
- Duplicate detection in processing
- Tracking visited states
- Cache with LIFO eviction

**Trade-off:** Higher memory usage (~O(n) for Set) vs faster lookups

**[→ Full Documentation](./src/docs/StackArrayWithSet.md)**

---

### [SinglyLinkedList](./src/docs/SinglyLinkedList.md)

A **singly linked list** where each node points to the next node.

**Key Operations:**
- `prepend(value)` — O(1)
- `append(value)` — O(1)
- `insertAt(value, index)` — O(n)
- `remove(value)` — O(n)
- `removeAt(index)` — O(n)
- `find(value)` — O(n)
- `contains(value)` — O(n)
- `size()`, `isEmpty()`, `clear()`
- `toArray()`, `clone()`, `fromArray()`

**Best For:**
- Efficient insertions/deletions at arbitrary positions
- Dynamic size requirements
- Implementing queues, stacks, deques
- Sequential data processing
- Memory-efficient storage

**[→ Full Documentation](./src/docs/SinglyLinkedList.md)**

---

## 🎯 Choosing the Right Data Structure

### Use **StackArray** when:
- ✅ You need simple LIFO behavior
- ✅ Memory efficiency is important
- ✅ Rare `contains()` operations
- ✅ Working primarily with push/pop/peek

### Use **StackArrayWithSet** when:
- ✅ Frequent `contains()` checks are needed
- ✅ Memory overhead is acceptable
- ✅ Working with primitives or comparable objects
- ✅ Need both stack behavior and fast lookups

### Use **SinglyLinkedList** when:
- ✅ Frequent insertions/deletions at various positions
- ✅ Size changes frequently
- ✅ Don't need random access by index
- ✅ Memory fragmentation is acceptable

---

## ⚡ Performance Comparison

| Operation | StackArray | StackArrayWithSet | SinglyLinkedList |
|-----------|-----------|-------------------|------------------|
| Push/Append | O(1) | O(1) | O(1) |
| Pop | O(1) | O(1) | - |
| Peek | O(1) | O(1) | - |
| Insert at beginning | - | - | O(1) |
| Insert at index | - | - | O(n) |
| Remove by value | O(n) | O(n) | O(n) |
| Remove by index | - | - | O(n) |
| Contains | O(n) | **O(1)** ⚡ | O(n) |
| Size | O(1) | O(1) | O(1) |
| Memory overhead | Low | High | Medium |

---

## 🛠️ Features

- **Full TypeScript support** with generic types
- **Custom comparison functions** for complex types
- **Immutable operations** (clone, toArray)
- **Factory methods** (fromArray)
- **Comprehensive documentation** with real-world examples
- **No external dependencies**

---

## 📖 Examples

### Practical Example: Parentheses Matching

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
```

### Practical Example: Graph DFS with Cycle Detection

```typescript
function hasPath(
  graph: Map<string, string[]>,
  start: string,
  end: string
): boolean {
  const stack = new StackArrayWithSet<string>();
  stack.push(start);

  while (!stack.isEmpty()) {
    const current = stack.pop()!;
    if (current === end) return true;

    const neighbors = graph.get(current) || [];
    for (const neighbor of neighbors) {
      // O(1) cycle detection!
      if (!stack.contains(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return false;
}
```

### Practical Example: Building a Queue

```typescript
class Queue<T> {
  private list = new SinglyLinkedList<T>();

  enqueue(value: T): void {
    this.list.append(value);
  }

  dequeue(): T | undefined {
    if (this.list.isEmpty()) return undefined;
    const value = this.list.head?.value;
    this.list.removeAt(0);
    return value;
  }

  peek(): T | undefined {
    return this.list.head?.value;
  }

  size(): number {
    return this.list.size();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }
}
```

---

## 📝 License

MIT

---

## 🤝 Contributing

Contributions are welcome! Please read the documentation for each data structure before submitting changes.

---

## 📚 Further Reading

For detailed API documentation, time complexity analysis, and more examples:

- [StackArray Documentation](./src/docs/StackArray.md)
- [StackArrayWithSet Documentation](./src/docs/StackArrayWithSet.md)
- [SinglyLinkedList Documentation](./src/docs/SinglyLinkedList.md)