import { StackArray } from '../StackArray';

describe('StackArray', () => {
    let stack: StackArray<number>;

    beforeEach(() => {
        stack = new StackArray<number>();
    });

    test('isEmpty on new stack', () => {
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
    });

    test('push and peek', () => {
        stack.push(1);
        expect(stack.peek()).toBe(1);
        stack.push(2);
        expect(stack.peek()).toBe(2);
    });

    test('push and pop', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBeUndefined();
    });

    test('clear', () => {
        stack.push(1);
        stack.push(2);
        stack.clear();
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
    });

    test('contains without equalsFn', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.contains(1)).toBe(true);
        expect(stack.contains(3)).toBe(false);

    });

    test('contains with equalsFn', () => {
        const _stack = new StackArray(['a', 'b', 'c']);
        expect(_stack.contains('A', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(true);
        expect(_stack.contains('D', (a, b) => a.toLowerCase() === b.toLowerCase())).toBe(false);
    });

    test('clone returns a new identical stack', () => {
        stack.push(1);
        stack.push(2);
        const cloned = stack.clone();
        expect(cloned.toArray()).toEqual(stack.toArray());
        cloned.push(3);
        expect(stack.size()).toBe(2);
        expect(cloned.size()).toBe(3);
    });

    test('static fromArray creates a new stack', () => {
       const _array = [1, 2, 3];
       const _stack = StackArray.fromArray(_array);
       expect(_stack.toArray()).toEqual(_array);
       _stack.push(4);
       expect(_array).toEqual([1, 2, 3]);
    });
})