# pathfinding_visualization
A web-based application to visualize popular pathfinding algorithms. The application allows you to run and visualize Depth-first Search (DFS), Breadth-first Search (BFS), and the A* algorithm. The project helps visualize these three popular pathfinding algorithm. From the visualization, the user is able to better understand the behaviour of BFS, DFS, and A*. 

# How it works
When the application loads, the user is presented with a blank canvas:  

![image](https://github.com/sliwi/pathfinding_visualization/assets/64179309/57e1f80f-612e-4fbb-8b3d-14120a13caf8)

The user can select a cell to be the start cell (green) by clicking on the cell. The next click then selects the end cell (orange). After the selection of the start and end cell, any other selection become walls (black). An example is shown below:  

![image](https://github.com/sliwi/pathfinding_visualization/assets/64179309/8a7bb859-56b5-4dd9-ae5c-5c74f17b4ffa)

From the menu, the user can then select an algorithm, the speed at which the visualization will be done, and click 'Start' to begin the visualization:  

![image](https://github.com/sliwi/pathfinding_visualization/assets/64179309/d13d7a0d-2841-4bb5-891e-21577a0379c2)

In this case, the A* algorithm was chosen. The blue cells indicates the explored cells while the yellow cells indicate the path from the start to end cells:  

![image](https://github.com/sliwi/pathfinding_visualization/assets/64179309/8d7178be-4aee-46fe-9ac7-e1c7a69f04dd)

Clicking on the 'Reset' button allows the user to keep the current configuration (keeping the grid as is) but run the visualization with another algorithm:  

![image](https://github.com/sliwi/pathfinding_visualization/assets/64179309/a7df551e-44ee-47d8-9871-3494dd40bd8a)

Below is an example of keeping the same configuration but this time using the BFS algorithm:  

![image](https://github.com/sliwi/pathfinding_visualization/assets/64179309/8404646a-b32b-48e1-9e8a-edad6e91d285)

Finally, the 'Reset All' button clears the configurations (the grid) to a blank state:  

![image](https://github.com/sliwi/pathfinding_visualization/assets/64179309/8192998b-d724-4c14-aaec-936cdd052a08)

# Accessing the Project
To try out the application: https://sliwi.github.io/pathfinding_visualization/

