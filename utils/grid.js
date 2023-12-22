import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//Define a cell status object
const CELL_STATUS = {
    unvisited: 'unvisited',
    visited: 'visited',
    wall: 'wall',
    start: 'start',
    end: 'end',
    path: 'path'
}

//Define a class Cell
class Cell {

    constructor(xpos, ypos, row, col, cellSize) {
        this.xpos = xpos
        this.ypos = ypos
        this.row = row
        this.col = col
        this.cellSize = cellSize
        this.cellStatus = CELL_STATUS.unvisited;
        this.neighbours = []
    }
    //A function that populates the neighbours array.
    getNeighbours(grid) {

        if (this.neighbours.length != 0) {
            return this.neighbours
        }
        //Define up,down,right,left indices
        const upNeighbourInd = this.row + 1
        const downNeighbourInd = this.row - 1
        const rightNeighbourInd = this.col + 1
        const leftNeighbourInd = this.col - 1

        //Helper function to see if the index is valid
        const isValidNeighbour = (index) => {
            if (index >= grid.length || index >= grid[0].length || index < 0) {
                return false
            }

            const statusA = grid[this.row][index]; //we're changing the column
            const statusB = grid[index][this.col]; //we're changing the row

            if (statusA == CELL_STATUS.wall || statusA == CELL_STATUS.visited) {
                return false
            }
            if (statusB == CELL_STATUS.wall || statusB == CELL_STATUS.visited) {
                return false
            }

            return true
        }
        //get up neighbour
        if (isValidNeighbour(upNeighbourInd)) {
            this.neighbours.push(grid[upNeighbourInd][this.col])
        }
        //get down neighbour 
        if (isValidNeighbour(downNeighbourInd)) {
            this.neighbours.push(grid[downNeighbourInd][this.col])
        }
        //get right neighbour
        if (isValidNeighbour(rightNeighbourInd)) {
            this.neighbours.push(grid[this.row][rightNeighbourInd])
        }
        //get left neighbour
        if (isValidNeighbour(leftNeighbourInd)) {
            this.neighbours.push(grid[this.row][leftNeighbourInd])
        }

        return this.neighbours;
    }
}

//Define constants
const gridSize = 500;
const cellSize = 25;
const gridColLength = gridSize / cellSize;
const gridRowLength = gridSize / cellSize;
const updatedCells = new Set();
let startCell = null;
const grid = createGrid();

//Define variables
let setStart = false //determines if the start cell has been chosen
let setEnd = false  //determines if the end cell has been chosen


//A function that creates the grid array
function createGrid() {
    const grid = [];
    var xpos = 0; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 0;

    for (let row = 0; row < gridColLength; row++) {
        //add a new row
        grid.push([]);

        for (let col = 0; col < gridRowLength; col++) {
            //add column
            grid[row].push(new Cell(xpos, ypos, row, col, cellSize));
            xpos += cellSize;
        }
        // reset the x position after a row is complete
        xpos = 0;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += cellSize;

    }
    return grid;
}

// console.log(grid)

//A function that draws the grid.
function drawGrid() {

    let isMouseDown = false;

    console.log('Drawing grid...')

    const svg = d3.select("#grid-container")
        .append("svg")
        .attr("width", gridSize)
        .attr("height", gridSize);

    var row = svg.selectAll(".row")
        .data(grid)
        .enter().append("g")
        .attr("class", "row");

    var column = row.selectAll(".square")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("class", "square")
        .attr("x", function (d) { return d.xpos; })
        .attr("y", function (d) { return d.ypos; })
        .attr("width", function (d) { return d.cellSize; })
        .attr("height", function (d) { return d.cellSize; })
        .style("fill", "#fff")
        .style("stroke", "#222")
        .on('mousedown', function (d) {
            // Start continuous update when mouse is pressed
            isMouseDown = true;
            handleCellClick(d, this);
        })
        .on('mouseup', function (d) {
            // Stop continuous update when mouse is released
            isMouseDown = false;
            updatedCells.clear()
        })
        .on('mousemove', function (d) {
            // Continue updating cells while mouse is held down and moving
            if (isMouseDown) {
                handleCellClick(d, this);
            }
        });
}

function getCellColour(cellStatus) {
    if (cellStatus == CELL_STATUS.start) return 'greenyellow';
    if (cellStatus == CELL_STATUS.end) return '#FF5733';
    if (cellStatus == CELL_STATUS.wall) return 'black';
    if (cellStatus == CELL_STATUS.path) return 'yellow';
    if (cellStatus == CELL_STATUS.visited) return '2C93E8';
    return 'white';
}

function updateGrid() {
    const cells = d3.selectAll(".square");

    cells.style("fill", (d, i) => getCellColour(d.cellStatus));
}
//Function that updates the cell to the appropriate colour.
function update(d, element) {
    // TODO: Switch from adding styles to adding a class 
    let cellStatus = null;

    if (setStart == false) {
        cellStatus = CELL_STATUS.start;
        setStart = true;
        startCell = d.toElement.__data__;
        console.log(startCell)
    }
    else if (setEnd == false) {
        cellStatus = CELL_STATUS.end;
        setEnd = true
    } else {
        cellStatus = CELL_STATUS.wall;
    }

    d3.select(element).style('fill', getCellColour(cellStatus));

    const cellObject = d.toElement.__data__;
    grid[cellObject.row][cellObject.col].cellStatus = cellStatus;
    // console.log(grid)

}

// Implement the handleCellClick function to handle user interactions
function handleCellClick(d, element) {

    if (!updatedCells.has(element)) {
        updatedCells.add(element);
        //update the cell 
        update(d, element)
    }

}

function getStart() {
    return startCell;
}

function getGrid() {
    return grid;
}

export { createGrid, drawGrid, updateGrid, getStart, getGrid };
