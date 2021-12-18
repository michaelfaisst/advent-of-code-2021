import { ICell } from "./commons";

export class PriorityQueue {
    private items: ICell[];

    constructor() {
        this.items = [];
    }

    enqueue(element: ICell) {
        let contain = false;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].distance > element.distance) {
                this.items.splice(i, 0, element);
                contain = true;
                break;
            }
        }

        if (!contain) {
            this.items.push(element);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}
