import Queue from '../utils/queue.js'
import PriorityQueue from '../utils/priorityQueue.js'
import { updateGrid } from '../utils/grid.js';

//Define a cell status object
const CELL_STATUS = {
    unvisited: 'unvisited',
    visited: 'visited',
    obstacle: 'obstacle',
    start: 'start',
    end: 'end',
    path: 'path'
}

//delay
let delay = 50

function setDelay(delayInput) {
    delay = delayInput
}
//A helper function that finds the path
async function setPath(node, parents) {
    let currentNode = node;

    while (!(Object.keys(parents).length == 0)) {
        const parent = parents[[currentNode, currentNode.row, currentNode.col]]
        const row = parent.row
        const col = parent.col

        if (parent.cellStatus == CELL_STATUS.start) {
            break;
        }


        currentNode = parent
        parents.delete([currentNode, currentNode.row, currentNode.col]);
        parent.setStatus(CELL_STATUS.path);

        await new Promise(resolve => setTimeout(() => {
            updateGrid(row, col, parent);
            resolve();
        }, delay));
    }
}

//A heuristic function for the A* algorithm
function heuristic(start,goal){
    return (Math.abs(start.xpos-goal.xpos) + Math.abs(start.ypos-goal.ypos));
}

async function a_star(start, end, grid) {
    console.log("Running A*");


    const openSet = new PriorityQueue();
    const visitedSet = new Set();
    const parents = new Map();
    const gScore = new Map();
    const fScore = new Map();

    //Initialize all values to infinity
    for(let i=0; i<grid.length; i++){
        for(let cell of grid[i]){
            gScore.set(cell,Infinity);
            fScore.set(cell,Infinity);
        }
    }

    openSet.enqueue(0,start);
    visitedSet.add(start);
    gScore.set(start,0);
    fScore.set(start,heuristic(start,end));

    while(!openSet.isEmpty()){ 
        const currentNode = openSet.dequeue();
        visitedSet.delete(currentNode);
        
        //if we found the end node, stop iterating.
        if(currentNode===end){
            console.log("Path found!");
            setPath(end,parents);
            break;
        }
        
        const row = currentNode.row;
        const col = currentNode.col;
        const cellStatus = currentNode.cellStatus;

        if (!(cellStatus == CELL_STATUS.start || cellStatus == CELL_STATUS.end || cellStatus == CELL_STATUS.wall)) {
            currentNode.setStatus(CELL_STATUS.visited)
        }

        //update the grid (re-draw)
        await new Promise(resolve => setTimeout(() => {
            updateGrid(row, col, currentNode);
            resolve();
        }, delay));

        const neighbours = currentNode.getNeighbours(grid)

        for(let neighbour of neighbours){
            const tmpGScore = gScore.get(currentNode)+1;
           
            if(tmpGScore<gScore.get(neighbour)){
              
                gScore.set(neighbour,tmpGScore);
                fScore.set(neighbour,tmpGScore+heuristic(neighbour,end));

                //check if this is the first time we are visiting the node
                if(!visitedSet.has(neighbour)){
                    parents[[neighbour, neighbour.row, neighbour.col]] = currentNode

                    openSet.enqueue(fScore.get(neighbour),neighbour);
                    visitedSet.add(neighbour);
                 
                }
            }
        }
    }
}

async function bfs(start, grid) {
    console.log("Running BFS")
    const parents = new Map();
    const queue = new Queue();

    queue.enqueue(start);

    while (!queue.isEmpty()) {
        let currentNode = queue.dequeue();

        if (currentNode.cellStatus == CELL_STATUS.end) {
            setPath(currentNode, parents);
            break;
        }
        const row = currentNode.row;
        const col = currentNode.col;
        const cellStatus = currentNode.cellStatus;

        if (!(cellStatus == CELL_STATUS.start || cellStatus == CELL_STATUS.end || cellStatus == CELL_STATUS.wall)) {
            currentNode.setStatus(CELL_STATUS.visited)
        }

        await new Promise(resolve => setTimeout(() => {
            updateGrid(row, col, currentNode);
            resolve();
        }, delay));

        const neighbours = currentNode.getNeighbours(grid)

        for (let neighbour of neighbours) {
            if (!queue.contains(neighbour)) {
                queue.enqueue(neighbour)
                parents[[neighbour, neighbour.row, neighbour.col]] = currentNode
            }
        }

    }
    console.log("Completed BFS")
}


async function dfs(start, grid) {
    console.log("Running DFS")
    const parents = new Map();
    const stack = [];

    stack.push(start);

    while (stack.length > 0) {
        let currentNode = stack.pop();

        if (currentNode.cellStatus == CELL_STATUS.end) {
            setPath(currentNode, parents);
            break;
        }
        const row = currentNode.row;
        const col = currentNode.col;
        const cellStatus = currentNode.cellStatus;

        if (!(cellStatus == CELL_STATUS.start || cellStatus == CELL_STATUS.end || cellStatus == CELL_STATUS.wall)) {
            currentNode.setStatus(CELL_STATUS.visited)
        }

        await new Promise(resolve => setTimeout(() => {
            updateGrid(row, col, currentNode);
            resolve();
        }, delay));

        const neighbours = currentNode.getNeighbours(grid)

        for (let neighbour of neighbours) {
            if (!stack.includes(neighbour)) {
                stack.push(neighbour)
                parents[[neighbour, neighbour.row, neighbour.col]] = currentNode
            }
        }

    }
    console.log("Completed DFS")
}

export { bfs, dfs, a_star, setDelay }