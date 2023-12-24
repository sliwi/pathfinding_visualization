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
    let currentNode = node;

    while (!(Object.keys(parents).length == 0)) {
        const parent = parents[[currentNode, currentNode.row, currentNode.col]]
        const row = parent.row
        const col = parent.col

        if (parent.cellStatus == CELL_STATUS.start) {
            console.log('FOUND START')
            break;
        }

        console.log(parent)
        currentNode = parent
        console.log(Object.keys(parents).length)
        parents.delete([currentNode, currentNode.row, currentNode.col]);
        console.log('AFTER DELETION')
        console.log(Object.keys(parents).length)
        parent.setStatus(CELL_STATUS.path);

        updateGrid(row, col, parent)
    }
}

function a_star(start, end, grid) {
    console.log("run A*");
}

function bfs(start, grid) {
    const parents = new Map();
    const queue = new Queue();

    queue.enqueue(start);

    while (!queue.isEmpty()) {
        console.log('iteration 1')
        let currentNode = queue.dequeue();
        // console.log(currentNode)
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
        // console.log(grid[currentNode.row][currentNode.col]);

        updateGrid(row, col, currentNode);

        const neighbours = currentNode.getNeighbours(grid)

        for (let neighbour of neighbours) {
            // console.log(neighbour)
            if (!queue.contains(neighbour)) {
                queue.enqueue(neighbour)
                parents[[neighbour, neighbour.row, neighbour.col]] = currentNode
                // console.log(Object.keys(parents).length);
            }
        }

    }
}

