![Screenshot 1](https://github.com/copperhuh/PathDemon/blob/master/screenshots/screenshot-1.png?raw=true)

# PATH DEMON - Visualizer of Maze Generation and Pathfinding Algorithms

A responsive visualizer of maze generation and pathfinding algorithms, allowing for custom delay time and grid size. It’s meant to make the process of understanding maze generation and pathfinding easy and visually interesting.

## Demo

[Github Pages](https://copperhuh.github.io/PathDemon/)

![Screenshot 2](https://github.com/copperhuh/PathDemon/blob/master/screenshots/screenshot-2.png?raw=true)

## Table of Contents

-   [Technologies](#Technologies)
-   [Run Locally](#Run-Locally)
-   [How It Works](#How-It-Works)
-   [Inspiration](#Inspiration)
-   [Appendix](#Appendix)
-   [Author](#Author)
-   [Feedback](#Feedback)

## Technologies

#### Main

-   **React**
-   **Redux** (with react-redux)
-   **Styled Components**

#### Other

-   **use-gesture** (making grid cells interactive)
-   **Material UI** (icons, slider component, select component)
-   **Framer Motion** (animating responsive sidebar and modals)
-   **Create React App** (initial project template)
-   **Github Pages** (hosting demo)

## Run Locally

Clone the project

```bash
  git clone https://github.com/copperhuh/PathDemon
```

Go to the project directory

```bash
  cd PathDemon
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## How It Works

### Visualizing Algorithms' Steps

In short, each algorithm is implemented in a generator that mutates the original grid array. Throughout its runtime, the generator yields the mutated grid after a significant change to it was made and we want it reflected on screen, e.g. a wall node was converted to a passage node. The whole generator is operated by an async function, that waits a set amount of milliseconds (set by the delay slider) before getting each new value from the generator. 

I included a more detailed explanation of this entire process in the READ ME of my [previous project](https://github.com/copperhuh/SortDemon), so please check it out if you are interested.

### Resizable Grid

The container that holds the grid is made to take up the whole width of the page. To calculate the exact number of columns and rows that the grid should comprise, we get the pixel width and height of the grid's container from reference with the useRef hook. We then absolutely divide the width and height by the current value from the size slider (which specifies how many pixels wide should each grid cell's side be) to get the respective number of columns and rows. These values are recomputed on every window resize and on each change of the size parameter.

### use-gesture usage

use-gesture's useDrag hook is used to make individual grid cells switch from between being passages and being walls when clicked, or be movable if they are the start cell or the target cell. I chose to use the useDrag hook instead of the built-in events like `click` or `mouseover`, mainly because browsers check for them at a set rate of once per a couple of milliseconds. This means that if we wanted to quickly move the cursor over multiple cells, only some of them would actually react to the `mouseover` event since, for most of them, the cursor was over them in between the browser's 'checks'. All of that made interacting with the grid feel very laggy. 

On the other hand, with the use of the useDrag hook, we can very easily have our function be rerun on even the slightest mouse movement with new cursor coordinates. In this case, at the start of the drag event, we check whether the initial cell we clicked was a passage or a wall and store that information in state until the end of the event. Then on each mouse move, using the new mouse coordinates, we calculate the exact cell index at which our cursor is currently positioned and switch that cell to being a wall if the initial clicked cell was a passage or to being a passage if the initial cell was a wall. We specify the behavior for dragging the start and target cells in a similar way (check the `useAlgo`'s `bind` and `bindSpecial` functions in `hooks` directory for code).


## Inspiration

-   [Pathfinding Visualizer](https://clementmihailescu.github.io/Pathfinding-Visualizer/)

These site was a major inspiration for this project, as well as a place from which I got ideas for many of the features present. My main goal was to build on this by making the grid resizable and responsive, making the visualization speed changeable mid-visualization, making manually creating walls smoother, and including the maze generation algorithms. 

Also, I want to specify, that this project is not based on any tutorials (I know that the creator of the first site made one, but I didn't want to watch it) and so all of the code, as well as the solutions to all of the problems, are original and I want to take credit for them. I'm saying that, because I don't want anyone to think that I simply ripped off someone's code - I know that the project idea is not totally original, but I assure everyone that this is my own, honest take on it.

## Appendix

I'm aware that opening devtools doesn't cause the grid to automatically resize for some reason, but if that happens, simply slightly changing the size via the slider fixes everything.

If anyone wants to make the grid even larger and is patient enough to bear the lag - you can zoom out the page and then make a change to the size slider or reload the page. If you do this, I recommend immediately clicking the skip button after starting the visualization.

Source for the maze algorithms' info text - [Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm)

Source for the path algorithms' info text - [Medium](https://medium.com/omarelgabrys-blog/path-finding-algorithms-f65a8902eb40)

## Author

-   [Jakub Koper](https://github.com/copperhuh)

## Feedback

If you have any feedback, please reach out to me at jakub.koper@wpc-huh.com
