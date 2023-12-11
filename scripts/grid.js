import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

class Cell {
    constructor(row, col) {
        this.row = row
        this.col = col
        this.visited = false
        this.obstacle = false
        this.start = false
        this.end = false
        this.path = false
        this.neighbours = []
    }

    //A function that populates the neighbours array.
    getNeighbours(grid) {
        //Define up,down,right,left indices
        upNeighbourInd = row + 1
        downNeighbourInd = row - 1
        rightNeighbourInd = col + 1
        leftNeighbourInd = col - 1

        //Helper function to see if the index is valid
        const isValidIndex = (index) => {
            if (index >= gridColLength || index >= gridRowLength || index < 0) {
                return false
            }
            return true
        }
        //get up neighbour
        if (isValidIndex(upNeighbourInd)) {
            this.neighbours.push(grid[upNeighbourInd, col])
        }
        //get down neighbour 
        if (isValidIndex(upNeighbourInd)) {
            this.neighbours.push(grid[downNeighbourInd, col])
        }
        //get right neighbour
        if (isValidIndex(upNeighbourInd)) {
            this.neighbours.push(grid[rightNeighbourInd, col])
        }
        //get left neighbour
        if (isValidIndex(upNeighbourInd)) {
            this.neighbours.push(grid[leftNeighbourInd, col])
        }
    }
}

//Define constants
const gridColLength = 20;
const gridRowLength = 20;
const cellSize = 30;
const grid = createGrid();

function createGrid() {
    const grid = []
    for (let row = 0; row < gridColLength; row++) {
        //add a new row
        grid.push([]);

        for (let col = 0; col < gridRowLength; col++) {
            //add column
            grid[row].push(new Cell(row, col));
        }
    }
    console.log(grid)
}

function drawGrid() {
    console.log('Drawing grid...')
}

export { drawGrid };
