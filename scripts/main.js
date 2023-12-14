import Queue from '../utils/queue.js'
import { drawGrid } from '../utils/grid.js';

document.addEventListener("DOMContentLoaded", function () {
    drawGrid();
});


function setPath(node, parents) {
    while (!(Object.keys(parents).length == 0)) {
        parent = parents[node]
        parent.cellStatus = CELL_STATUS.path;
    }
}

function a_star(start, end, grid) {
    console.log("run A*");
}

function bfs(start, end, grid) {
    parents = {};
    const queue = new Queue();
    queue.enqueue(start);

    while (!queue.isEmpty()) {
        currentNode = queue.dequeue();

        if (currentNode.cellStatus == CELL_STATUS.end) {
            setPath(currentNode);
            break;
        }

        currentNode.cellStatus = CELL_STATUS.visited;

        neighbours = currentNode.getNeighbours()

        for (neighbour of neighbours) {
            queue.add(neighbour)
            parents[neighbour] = currentNode
        }

    }
}

