export class StackArrayWithSet<T> {
    private items: T[];
    private set: Set<T>;

    constructor(items: readonly T[] = []) {
        this.items = [...items];
        this.set = new Set(items);
    }
    
    push(item: T): void {
        this.items.push(item);
        this.set.add(item);
    }
    
    pop(): T | undefined {
        const item = this.items.pop();
        if (item !== undefined) this.set.delete(item);
        return item;
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    clear(): void {
        this.items = [];
        this.set = new Set();
    }

    contains(item: T, equalsFn?: (a: T, b: T) => boolean): boolean {
        if (equalsFn) {
            return this.items.some((value) => equalsFn(value, item));
        }
        return this.set.has(item);
    }

    toArray() {
        return [...this.items];
    }

    static fromArray<U>(array: readonly U[]): StackArrayWithSet<U> {
        return new StackArrayWithSet(array);
    }

    clone(): StackArrayWithSet<T> {
        return new StackArrayWithSet(this.items);
    }
}
