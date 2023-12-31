import Queue from '../utils/queue.js'
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

function a_star(start, end, grid) {
    console.log("Running A*");
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