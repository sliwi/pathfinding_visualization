class QueueElement{
    constructor(element,priority){
        this.element = element;
        this.priority = priority;

    }
}

export default class PriorityQueue{
    constructor(){
        this.pQueue = [];
    }
    
    //helper function that checks if the queue is empty
    isEmpty(){
        return this.pQueue.length==0;
    }


    //adds element to the priority queue based on its priority
    enqueue(priority,element){

        //checks if pQueue is empty, or if elem has absolute lowest priority
        if(this.isEmpty() || priority>this.pQueue[this.pQueue.length-1].priority || priority===this.pQueue[this.pQueue.length-1].priority){
            this.pQueue.push(new QueueElement(element,priority));
        }
        //checks if it has the absolute highest priority
        else if(priority<this.pQueue[0].priority){
            this.pQueue.splice(0,0,new QueueElement(element,priority));
        }
        //checks if it has the same priority but maintains order of insertion
        else if(priority===this.pQueue[0].priority){
            this.pQueue.splice(1,0,new QueueElement(element,priority));
        }

        //checks where to insert by comparing the priority of each element
        else{
            const queueSize = this.pQueue.length;
            for(let i=queueSize-1; i>0; i--){
                if((priority<this.pQueue[i].priority && priority>this.pQueue[i-1].priority)){
                    this.pQueue.splice(i,0,new QueueElement(element,priority));
                    break;
                }
                else if(priority===this.pQueue[i].priority){
                    this.pQueue.splice(i+1,0,new QueueElement(element,priority));
                    break;
                }

            }    
        }
    }
    
    //removes and returns first element from the queue
    dequeue(){
        if(!this.isEmpty()){
            return this.pQueue.shift().element;
        }
    }
    
    //returns first element
    front(){
        return this.pQueue[0];
    }

    //returns last element
    rear(){
        return this.pQueue[this.pQueue.length-1];
    }
    
    printPQueue() { 
        let str = ""; 
        for (let i = 0; i < this.pQueue.length; i++) 
            str += this.pQueue[i].element + " "; 
        return str; 
    } 
}
