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

    setStatus(status) {
        this.cellStatus = status;
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
        const isValidNeighbour = (index, direction) => {
            if (index >= grid.length || index >= grid[0].length || index < 0) {
                return false
            }

            let status = null;

            if (direction == "horizontal") {
                status = grid[this.row][index].cellStatus; //we're changing the column
            } else {
                status = grid[index][this.col].cellStatus // we're changing the row
            }



            if (status == CELL_STATUS.wall || status == CELL_STATUS.visited || status == CELL_STATUS.start) {
                return false
            }


            return true
        }
        //get up neighbour
        if (isValidNeighbour(upNeighbourInd, "vertical")) {
            this.neighbours.push(grid[upNeighbourInd][this.col])
        }
        //get down neighbour 
        if (isValidNeighbour(downNeighbourInd, "vertical")) {
            this.neighbours.push(grid[downNeighbourInd][this.col])
        }
        //get right neighbour
        if (isValidNeighbour(rightNeighbourInd, "horizontal")) {
            this.neighbours.push(grid[this.row][rightNeighbourInd])
        }
        //get left neighbour
        if (isValidNeighbour(leftNeighbourInd, "horizontal")) {
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
let endCell = null
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
    if (cellStatus == CELL_STATUS.visited) return '#2C93E8';
    return 'white';
}

function updateGrid(row, col, item) {
    grid[row][col] = item;
    const cells = d3.selectAll(".square");

    cells.style("fill", (d, i) => {
        return getCellColour(d.cellStatus)
    });

}
//Function that updates the cell to the appropriate colour.
function update(d, element) {
    // TODO: Switch from adding styles to adding a class 
    let cellStatus = null;

    if (setStart == false) {
        cellStatus = CELL_STATUS.start;
        setStart = true;
        startCell = d.toElement.__data__;
    }
    else if (setEnd == false) {
        cellStatus = CELL_STATUS.end;
        setEnd = true
        endCell = d.toElement.__data__;
    } else {
        cellStatus = CELL_STATUS.wall;
    }

    d3.select(element).style('fill', getCellColour(cellStatus));

    const cellObject = d.toElement.__data__;
    const cell = grid[cellObject.row][cellObject.col];

    cell.setStatus(cellStatus);
    grid[cellObject.row][cellObject.col] = cell;
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


function getEnd() {
    return endCell;
}

function getGrid() {
    return grid;
}

function reset() {
    //set visited to unvisited, set path to unvisited, and clear the neighbours
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            //clear neighbours
            grid[i][j].neighbours = []

            const cellStatus = grid[i][j].cellStatus;
            if (cellStatus == CELL_STATUS.visited || cellStatus == CELL_STATUS.path) {
                grid[i][j].setStatus(CELL_STATUS.unvisited);
            }
        }
    }

    const cells = d3.selectAll(".square");

    cells.style("fill", (d, i) => {
        return getCellColour(d.cellStatus)
    });
}

//clear the entire grid
function resetAll() {
    startCell = null;
    endCell = null
    setStart = false;
    setEnd = false;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            //reset status and clear neighbours
            grid[i][j].setStatus(CELL_STATUS.unvisited);
            grid[i][j].neighbours = []
        }
    }

    const cells = d3.selectAll(".square");
    cells.style("fill", (d, i) => {
        return getCellColour(d.cellStatus)
    });
}

export { drawGrid, updateGrid, getStart,getEnd, getGrid, reset, resetAll };
