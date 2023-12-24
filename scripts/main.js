import Queue from '../utils/queue.js'
import { drawGrid, getStart, getGrid, reset, resetAll } from '../utils/grid.js';
import { bfs, dfs, a_star } from '../utils/algorithms.js';


document.addEventListener("DOMContentLoaded", function () {
    //draw the grid
    drawGrid();

    const dropdown = document.getElementById("dropdown");


    document.getElementById("start").addEventListener("click", () => {
        const algorithm = dropdown.value;

        if (algorithm == "bfs") {
            bfs(getStart(), getGrid());
        }
        else if (algorithm == "dfs") {
            dfs(getStart(), getGrid());
        }
    });

    document.getElementById("reset").addEventListener("click", () => reset());

    document.getElementById("reset_all").addEventListener("click", () => resetAll());
});
