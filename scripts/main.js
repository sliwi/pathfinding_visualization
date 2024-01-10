import Queue from '../utils/queue.js'
import { drawGrid, getStart, getEnd, getGrid, reset, resetAll } from '../utils/grid.js';
import { bfs, dfs, a_star, setDelay } from '../utils/algorithms.js';

document.addEventListener("DOMContentLoaded", function () {
    //draw the grid
    drawGrid();

    const dropdown = document.getElementById("dropdown");
    const speedSlider = document.getElementById("speed-slider");


    document.getElementById("start").addEventListener("click", () => {
        const algorithm = dropdown.value;
        const delay = speedSlider.value;

        console.log(delay)
        //set the delay
        setDelay(delay);

        if (algorithm == "a_star"){
            a_star(getStart(), getEnd(), getGrid());
        }
        else if (algorithm == "bfs") {
            bfs(getStart(), getGrid());
        }
        else if (algorithm == "dfs") {
            dfs(getStart(), getGrid());
        }
    });

    document.getElementById("reset").addEventListener("click", () => reset());

    document.getElementById("reset_all").addEventListener("click", () => resetAll());
});
