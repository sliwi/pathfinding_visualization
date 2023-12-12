import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//Define a cell status object
const CELL_STATUS = {
    unvisited: 'unvisited',
    visited: 'visited',
    obstacle: 'obstacle',
    start: 'start',
    end: 'end',
    path: 'path'
}

//Define a class Cell
class Cell {

    constructor(xpos, ypos, cellSize) {
        this.xpos = xpos
        this.ypos = ypos
        this.cellSize = cellSize
        this.cellStatus = CELL_STATUS.unvisited;
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
const gridSize = 500;
const cellSize = 25;
const gridColLength = gridSize / cellSize;
const gridRowLength = gridSize / cellSize;
const updatedCells = new Set();
const grid = createGrid();

//Define variables
let setStart = false //determines if the start cell has been chosen
let setEnd = false  //determines if the end cell has been chosen


//A function that creates the grid array
function createGrid() {
    const grid = []
    var xpos = 0; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 0;

    for (let row = 0; row < gridColLength; row++) {
        //add a new row
        grid.push([]);

        for (let col = 0; col < gridRowLength; col++) {
            //add column
            grid[row].push(new Cell(xpos, ypos, cellSize));
            xpos += cellSize;
        }
        // reset the x position after a row is complete
        xpos = 0;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += cellSize;

    }
    return grid;
}

console.log(grid)

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

//Function that updates the cell to the appropriate colour.
function update(d, element) {
    d3.select(element).style('fill', () => {
        if (d.cellStatus == CELL_STATUS.start) return 'greenyellow';
        if (d.cellStatus == CELL_STATUS.end) return '#FF5733';
        if (d.cellStatus == CELL_STATUS.wall) return 'black';
        if (d.cellStatus == CELL_STATUS.path) return 'yellow';
        if (d.cellStatus == CELL_STATUS.visited) return '2C93E8';
        return 'white';
    });
}

// Implement the handleCellClick function to handle user interactions
function handleCellClick(d, element) {

    if (!updatedCells.has(element)) {
        updatedCells.add(element);

        if (setStart == false) {
            d.cellStatus = CELL_STATUS.start;
            setStart = true
        }
        else if (setEnd == false) {
            d.cellStatus = CELL_STATUS.end;
            setEnd = true
        } else {
            d.cellStatus == CELL_STATUS.wall
        }
        //update the cell 
        update(d, element)
    }

}

export { drawGrid };
