import { SinglyLinkedList } from '../SinglyLinkedList';

describe('SinglyLinkedList', () => {
  describe('initialization', () => {
    test('on empty initialization', () => {
      const linkedList = new SinglyLinkedList<number>();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });

    test('on initialization with array', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      expect(linkedList.head.value).toBe(1);
      expect(linkedList.tail.value).toBe(3);
      expect(linkedList.length).toBe(3);
    });
  });

  describe('append', () => {
    test('append on empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      linkedList.append(1);
      expect(linkedList.head.value).toBe(1);
      expect(linkedList.tail.value).toBe(1);
      expect(linkedList.length).toBe(1);
    });

    test('append on non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      linkedList.append(1);
      linkedList.append(2);
      expect(linkedList.head.value).toBe(1);
      expect(linkedList.tail.value).toBe(2);
      expect(linkedList.length).toBe(2);
    });
  });

  describe('prepend', () => {
    test('prepend on empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      linkedList.prepend(1);
      expect(linkedList.head.value).toBe(1);
      expect(linkedList.tail.value).toBe(1);
      expect(linkedList.length).toBe(1);
    });

    test('prepend on non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      linkedList.prepend(2);
      linkedList.prepend(1);
      expect(linkedList.head.value).toBe(1);
      expect(linkedList.tail.value).toBe(2);
      expect(linkedList.length).toBe(2);
    });
  });

  describe('insertAt', () => {
    test('insertAt in the start of the list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2]);
      linkedList.insertAt(0, 0);
      expect(linkedList.head.value).toBe(0);
      expect(linkedList.length).toBe(3);
    });

    test('insertAt in the end of the list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2]);
      linkedList.insertAt(3, 2);
      expect(linkedList.tail.value).toBe(3);
      expect(linkedList.length).toBe(3);
    });

    test('insertAt in the middle of the list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 3]);
      linkedList.insertAt(2, 1);
      expect(linkedList.head.next.value).toBe(2);
      expect(linkedList.length).toBe(3);
    });
  });

  describe('remove', () => {
    test('removes existing value in head without equalsFn', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      linkedList.remove(1);
      expect(linkedList.head.value).toBe(2);
      expect(linkedList.length).toBe(2);
    });

    test('remove existing value in middle without equalsFn', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      linkedList.remove(2);
      expect(linkedList.head.next.value).toBe(3);
      expect(linkedList.length).toBe(2);
    });

    test('removes existing value in tail without equalsFn', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      linkedList.remove(3);
      expect(linkedList.tail.value).toBe(2);
      expect(linkedList.length).toBe(2);
    });

    test('removes existing value with equalsFn', () => {
      const linkedList = new SinglyLinkedList<string>(['a', 'b', 'c']);
      linkedList.remove('B', (a, b) => a.toLowerCase() === b.toLowerCase());
      expect(linkedList.head.next.value).toBe('c');
      expect(linkedList.length).toBe(2);
    });

    test('removes non-existing value', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      linkedList.remove(4);
      expect(linkedList.length).toBe(3);
    });

    test('removes from empty list', () => {
      const linkedList = new SinglyLinkedList<number>([1]);
      linkedList.remove(1);
      expect(linkedList.length).toBe(0);
    });
  });

  describe('removeAt', () => {
    test('removeAt from empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      linkedList.removeAt(0);
      expect(linkedList.length).toBe(0);
    });

    test('removeAt from non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      linkedList.removeAt(1);
      expect(linkedList.length).toBe(2);
      expect(linkedList.head.next.value).toBe(3);
    });

    test('removeAt with invalid index', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      linkedList.removeAt(-1);
      expect(linkedList.length).toBe(3);
      linkedList.removeAt(3);
      expect(linkedList.length).toBe(3);
    });

    test('removeAt with single element list', () => {
      const linkedList = new SinglyLinkedList<number>([1]);
      linkedList.removeAt(0);
      expect(linkedList.length).toBe(0);
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
    });

    test('removeAt with 2 elements list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2]);
      linkedList.removeAt(1);
      expect(linkedList.length).toBe(1);
      expect(linkedList.head.value).toBe(1);
      expect(linkedList.tail.value).toBe(1);
    });
  });

  describe('find', () => {
    test('find existing value without equalsFn', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      const node = linkedList.find(2);
      expect(node.value).toBe(2);
    });

    test('find existing value with equalsFn', () => {
      const linkedList = new SinglyLinkedList<string>(['a', 'b', 'c']);
      linkedList.append('a');
      linkedList.append('b');
      linkedList.append('c');
      const node = linkedList.find('B', (a, b) => a.toLowerCase() === b.toLowerCase());
      expect(node.value).toBe('b');
    });
  });

  describe('contains', () => {
    test('contains existing value without equalsFn', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      expect(linkedList.contains(2)).toBe(true);
      expect(linkedList.contains(4)).toBe(false);
    });

    test('contains existing value with equalsFn', () => {
      const linkedList = new SinglyLinkedList<string>(['a', 'b', 'c']);
      expect(linkedList.contains('B', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(true);
      expect(linkedList.contains('D', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(false);
    });
  });

  describe('size', () => {
    test('size on empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      expect(linkedList.size()).toBe(0);
    });

    test('size on non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      expect(linkedList.size()).toBe(3);
    });
  });

  describe('isEmpty', () => {
    test('isEmpty on empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      expect(linkedList.isEmpty()).toBe(true);
    });

    test('isEmpty on non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      expect(linkedList.isEmpty()).toBe(false);
    });
  });

  describe('clear', () => {
    test('clear on empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });

    test('clear on non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      linkedList.clear();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });
  });

  describe('toArray', () => {
    test('toArray on empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      const array = linkedList.toArray();
      expect(array).toEqual([]);
    });

    test('toArray on non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2, 3]);
      const array = linkedList.toArray();
      expect(array).toEqual([1, 2, 3]);
    });
  });

  describe('fromArray', () => {
    test('fromArray creates a new list', () => {
      const linkedList = SinglyLinkedList.fromArray([1, 2, 3]);
      expect(linkedList.head.value).toBe(1);
      expect(linkedList.tail.value).toBe(3);
      expect(linkedList.length).toBe(3);
    });
  });

  describe('clone', () => {
    test('clone on empty list', () => {
      const linkedList = new SinglyLinkedList<number>();
      const cloned = linkedList.clone();
      expect(cloned.head).toBeNull();
      expect(cloned.tail).toBeNull();
      expect(cloned.length).toBe(0);
    });

    test('clone on non-empty list', () => {
      const linkedList = new SinglyLinkedList<number>([1, 2]);
      const cloned = linkedList.clone();
      expect(cloned.head.value).toBe(linkedList.head.value);
      expect(cloned.tail.value).toBe(linkedList.tail.value);
      expect(cloned.length).toBe(linkedList.length);
    });
  });
});
