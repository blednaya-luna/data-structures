import { StackArray } from '../StackArray';

describe('StackArray', () => {
  test('push', () => {
    const stack = new StackArray();
    stack.push(1);
    expect(stack.size()).toBe(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  test('pop', () => {
    const stack = new StackArray<number>([1, 2, 3]);
    expect(stack.pop()).toBe(3);
    expect(stack.size()).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
  });

  test('peek', () => {
    const stack = new StackArray<number>([1, 2, 3]);
    expect(stack.peek()).toBe(3);
  });

  test('size', () => {
    const stack = new StackArray<number>([1, 2, 3]);
    expect(stack.size()).toBe(3);
    stack.push(4);
    expect(stack.size()).toBe(4);
  });

  test('isEmpty', () => {
    const stack = new StackArray<number>();
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  test('clear', () => {
    const stack = new StackArray<number>([1, 2, 3]);
    expect(stack.size()).toBe(3);
    stack.clear();
    expect(stack.size()).toBe(0);
  });

  describe('contains', () => {
    test('contains existing value without equalsFn', () => {
      const stack = new StackArray<number>([1, 2, 3]);
      expect(stack.contains(2)).toBe(true);
      expect(stack.contains(4)).toBe(false);
    });

    test('contains existing value with equalsFn', () => {
      const stack = new StackArray<string>(['a', 'b', 'c']);
      expect(stack.contains('B', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(true);
      expect(stack.contains('D', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(false);
    });
  });

  test('toArray', () => {
    const stack = new StackArray<number>([1, 2, 3]);
    expect(stack.toArray()).toEqual([1, 2, 3]);
  });

  test('fromArray', () => {
    const array = [1, 2, 3];
    const stack = StackArray.fromArray(array);
    expect(stack.toArray()).toEqual(array);
  });

  test('clone', () => {
    const stack = new StackArray<number>([1, 2, 3]);
    const clonedStack = stack.clone();
    expect(clonedStack.toArray()).toEqual(stack.toArray());
    clonedStack.push(4);
    expect(stack.size()).toBe(3);
    expect(clonedStack.size()).toBe(4);
  });
});
