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

## Inspiration

-   [Pushing Sorts to their Limits](https://www.youtube.com/watch?v=8MsTNqK3o_w&t=1271s)

This video was a major inspiration for how to visualize the algorithms and was also the place from which I picked the algorithms that I want to implement. I wanted to include the algorithms that were visually interesting and since the video shows what my end visualization will look like, the choosing process was considerably easier.

## Appendix

SORT DEMON is a visualizer of sorting algorithms. It is meant to be used as a tool for learning **how the algorithms act and how they contrast from one another**. I did **not** design it to accurately show the relative speed of the algorithms, since I deemed it would make the faster algorithms less “readable”. Please keep that in mind while using the site.

### About Algorithms

There can be up to 9 algorithms running at the same time. If after adding a new algorithm, only its name appears, just click the **reset** or **shuffle** button to show it entirely. Also, note that **removing an algorithm in the middle of the runtime** can lead to some strange behavior that is also easily fixed with a **reset** or **shuffle**. Another thing - the more structurally complex algorithms (like the ones using recursion) have to **run in their entirety** before recreating their steps on the screen. I say that because that initial run in the background can lead to a **slight lag** when starting the visualization with a **large array size** and **multiple of these complex algorithms**.

### About Descriptions

**I do not take credit for any of the descriptions’ contents** - proper sources are linked at the bottom of each description. This is a **personal project** - the description functionality is just a feature that I thought would be nice to implement and thought that authentic articles would look better than some Lorem Ipsum boilerplate text. I strongly recommend everyone to visit the websites from which I go the articles - all of them are great resources for learning computer science-related topics.

## Author

-   [Jakub Koper](https://github.com/copperhuh)

## Feedback

If you have any feedback, please reach out to me at /jakub.koper@wpc-huh.com
