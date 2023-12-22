import Queue from '../utils/queue.js'
import { createGrid, drawGrid, updateGrid, getStart, getGrid } from '../utils/grid.js';

//Define a cell status object
const CELL_STATUS = {
    unvisited: 'unvisited',
    visited: 'visited',
    wall: 'wall',
    start: 'start',
    end: 'end',
    path: 'path'
}

document.addEventListener("DOMContentLoaded", function () {
    // const grid = createGrid();
    drawGrid();
    //console.log(getGrid())
    document.getElementById("start").addEventListener("click", () => bfs(getStart(), getGrid()));
});


function setPath(node, parents) {
    while (!(Object.keys(parents).length == 0)) {
        parent = parents[node]
        parent.cellStatus = CELL_STATUS.path;
        updateGrid()
    }
}

function a_star(start, end, grid) {
    console.log("run A*");
}

function bfs(start, grid) {
    const parents = {};
    const queue = new Queue();
    queue.enqueue(start);

    console.log(start)
    while (!queue.isEmpty()) {
        console.log('iteration 1')
        let currentNode = queue.dequeue();
        // console.log(currentNode)
        if (currentNode.cellStatus == CELL_STATUS.end) {
            setPath(currentNode);
            break;
        }

        currentNode.cellStatus = CELL_STATUS.visited;
        updateGrid()
        const neighbours = currentNode.getNeighbours(grid)

        for (let neighbour of neighbours) {
            console.log(neighbour)
            queue.enqueue(neighbour)
            parents[neighbour] = currentNode
        }

    }
}

