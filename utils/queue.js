export default class Queue {
    constructor() {
        this.firstInd = 0
        this.lastInd = -1
        this.size = 0
        this.queue = {}
    }

    enqueue(element) {
        this.lastInd += 1
        this.queue[this.lastInd] = element
        this.size += 1
    }

    dequeue() {
        if (this.size > 0) {
            const element = this.queue[this.firstInd]
            //delete the item
            delete this.queue[this.firstInd]
            this.firstInd += 1
            this.size -= 1
            return element
        }
        console.log('Cannot dequeue from empty queue')
    }

    isEmpty() {
        return this.size <= 0;
    }

    size() {
        return this.size;
    }
}