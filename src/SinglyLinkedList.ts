class SinglyLinkedListNode<T> {
  value: T;
  next: SinglyLinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedList<T> {
  head: SinglyLinkedListNode<T>;
  tail: SinglyLinkedListNode<T>;
  length: number;

  constructor(items?: T[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (items) {
      for (const item of items) {
        this.append(item);
      }
    }
  }

  prepend(value: T): void {
    const node = new SinglyLinkedListNode(value);
    node.next = this.head;
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  }

  append(value: T): void {
    const node = new SinglyLinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  insertAt(value: T, index: number): void {
    if (index === 0) {
      this.prepend(value);
    } else if (index >= this.length) {
      this.append(value);
    } else {
      const node = new SinglyLinkedListNode(value);
      let current = this.head;
      let prev = null;
      let i = 0;
      while (i < index) {
        prev = current;
        current = current.next;
        i++;
      }
      prev.next = node;
      node.next = current;
      this.length++;
    }
  }

  remove(value: T, equalsFn?: (a: T, b: T) => boolean): void {
    let current = this.head;
    let prev = null;
    while (current) {
      const isEqual = equalsFn ? equalsFn(current.value, value) : current.value === value;
      if (isEqual) {
        if (prev) {
          prev.next = current.next;
          if (current === this.tail) {
            this.tail = prev;
          }
          this.length--;
          return;
        } else {
          this.head = current.next;
          if (current === this.tail) {
            this.tail = null;
          }
          this.length--;
          return;
        }
      }
      prev = current;
      current = current.next;
    }
  }

  removeAt(index: number): void {
    if (this.isEmpty()) {
      return;
    }
    if (index < 0 || index >= this.length) {
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      if (this.length === 1) {
        this.tail = null;
      }
      this.length--;
    } else {
      let current = this.head;
      let prev = null;
      let i = 0;
      while (i < index) {
        prev = current;
        current = current.next;
        i++;
      }
      prev.next = current.next;
      if (current === this.tail) {
        this.tail = prev;
      }
      this.length--;
    }
  }

  find(value: T, equalsFn?: (a: T, b: T) => boolean): SinglyLinkedListNode<T> | null {
    let current = this.head;
    while (current) {
      const isEqual = equalsFn ? equalsFn(current.value, value) : current.value === value;
      if (isEqual) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  contains(value: T, equalsFn?: (a: T, b: T) => boolean): boolean {
    return this.find(value, equalsFn) !== null;
  }

  size(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  toArray(): T[] {
    const array: T[] = [];
    let current = this.head;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }

  static fromArray<U>(array: U[]): SinglyLinkedList<U> {
    return new SinglyLinkedList<U>(array);
  }

  // TODO support immutable values
  clone(): SinglyLinkedList<T> {
    const cloned = new SinglyLinkedList<T>();
    let current = this.head;
    while (current) {
      cloned.append(current.value);
      current = current.next;
    }
    return cloned;
  }
}
