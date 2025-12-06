class StackArray<T> {
    private items: T[];

    constructor(items: T[] = []) {
        this.items = [...items];
    }
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.size() === 0;
    }

    size(): number {
        return this.items.length;
    }    

    clear(): void {
        this.items = [];
    }

    contains(item: T): boolean {
        return this.items.includes(item);
    }

    toArray() {
        return [...this.items];
    }

    static fromArray<U>(array: U[]): StackArray<U> {
        return new StackArray([...array]);
    }

    clone(): StackArray<T> {
        return new StackArray([...this.items]);
    }
};
