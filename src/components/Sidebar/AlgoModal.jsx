import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import AlgoModalStyled from "./AlgoModal.styles";
import { MenuItem, Select } from "@mui/material";
import { connect } from "react-redux";

function AlgoModal({ open, setOpen, mazeType, searchType }) {
	const outside = useRef(null);

	const [mainSection, setMainSection] = useState("mazes");
	const [maze, setMaze] = useState(mazeType);
	const [search, setSearch] = useState(searchType);

	useEffect(() => {
		setMaze(mazeType);
	}, [mazeType]);

	useEffect(() => {
		setSearch(searchType);
	}, [searchType]);

	function onClose(e) {
		if (outside.current === e.target) {
			setOpen(false);
		}
	}

	const handleChange = (e) => {
		if (e.target.name === "maze") {
			setMaze(e.target.value);
		} else {
			setSearch(e.target.value);
		}
	};

	let description;
	if (mainSection === "mazes") {
		switch (maze) {
			case "DFS":
				description = (
					<>
						<p>
							This algorithm is a <span>randomized</span> version
							of the
							<span> depth-first search</span> algorithm and is
							one of the simplest ways to generate a maze using a
							computer.
						</p>
						<p>
							Consider the space for a maze being a large grid of
							cells (like a large chess board), each cell starting
							with <span>four walls</span>. Starting from a random
							cell, the computer then selects a random
							neighbouring cell that has not yet been visited. The
							computer <span>removes </span>
							the wall between the two cells and marks the new
							cell as <span>visited</span>, and adds it to the
							queue to facilitate backtracking.{" "}
						</p>
						<p>
							The computer continues this process, with a cell
							that has <span>no unvisited neighbours</span> being
							considered a <span>dead-end</span>. When at a
							dead-end it <span>backtracks</span> through the path
							until it reaches a cell with an unvisited neighbour,{" "}
							<span>continuing the path generation</span> by
							visiting this new, unvisited cell (creating a new
							junction).{" "}
						</p>
						<p>
							This process continues until <span>every</span> cell
							has been visited, causing the computer to backtrack
							all the way <span>back to the beginning cell</span>.
							We can be <span>sure</span> every cell is visited.
						</p>
						<p>
							Mazes generated with a{" "}
							<span>depth-first search</span> have a{" "}
							<span>low branching factor</span> and{" "}
							<span>contain many long corridors</span>, because
							the algorithm explores as far as possible along each
							branch before backtracking.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>
								Choose the initial cell, mark it as visited and
								push it to the queue
							</li>

							<li>While the queue is not empty</li>
							<ol>
								<li>
									Pop a cell from the queue and make it a
									current cell{" "}
								</li>
								<li>
									If the current cell has any neighbours which
									have not been visited{" "}
								</li>
								<ol>
									<li>Push the current cell to the queue</li>
									<li>
										Choose one of the unvisited neighbours
									</li>
									<li>
										Remove the wall between the current cell
										and the chosen cell
									</li>
									<li>
										Mark the chosen cell as visited and push
										it to the queue
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Kruskal":
				description = (
					<>
						<p>
							This algorithm is a randomized version of Kruskal's
							algorithm.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>
								Create a list of all walls, and create a set for
								each cell, each containing just that one cell.
							</li>

							<li>For each wall, in some random order:</li>
							<ol>
								<li>
									If the cells divided by this wall belong to
									distinct sets:
								</li>
								<ol>
									<li>Remove the current wall.</li>
									<li>
										Join the sets of the formerly divided
										cells.
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Prim":
				description = (
					<>
						<p>
							This algorithm is a randomized version of Prim's
							algorithm.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>Start with a grid full of walls.</li>

							<li>
								Pick a cell, mark it as part of the maze. Add
								the walls of the cell to the wall list.
							</li>
							<li>While there are walls in the list:</li>
							<ol>
								<li>
									Pick a random wall from the list. If only
									one of the cells that the wall divides is
									visited, then:
								</li>
								<ol>
									<li>
										Make the wall a passage and mark the
										unvisited cell as part of the maze.
									</li>
									<li>
										Add the neighboring walls of the cell to
										the wall list.
									</li>
								</ol>
								<li>Remove the wall from the list.</li>
							</ol>
						</ol>
					</>
				);
				break;
			case "Recursive":
				description = (
					<>
						<p>
							Mazes can be created with recursive division, an
							algorithm which works as follows: Begin with the
							maze's space with no walls. Call this a chamber.
							Divide the chamber with a randomly positioned wall
							(or multiple walls) where each wall contains a
							randomly positioned passage opening within it. Then
							recursively repeat the process on the subchambers
							until all chambers are minimum sized.
						</p>
						<p>
							{" "}
							This method results in mazes with long straight
							walls crossing their space, making it easier to see
							which areas to avoid.
						</p>
					</>
				);
				break;
			case "Aldous-Broder":
				description = (
					<>
						<p>
							The Aldous-Broder algorithm, due to it's randomness,
							produces uniform spanning trees.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>
								Pick a random cell as the current cell and mark
								it as visited.
							</li>

							<li>While there are unvisited cells:</li>
							<ol>
								<li>Pick a random neighbour.</li>
								<li>
									If the chosen neighbour has not been
									visited:
								</li>
								<ol>
									<li>
										Remove the wall between the current cell
										and the chosen neighbour.
									</li>
									<li>
										Mark the chosen neighbour as visited.
									</li>
								</ol>
								<li>
									Make the chosen neighbour the current cell.
								</li>
							</ol>
						</ol>
					</>
				);
				break;
			case "Wilson":
				description = (
					<>
						<p>
							All the above algorithms have <span>biases</span> of
							various sorts: depth-first search is biased toward
							long corridors, while Kruskal's/Prim's algorithms
							are biased toward many short dead ends. Wilson's
							algorithm, on the other hand, generates an
							<span>unbiased</span> sample from the uniform
							distribution over all mazes, using{" "}
							<span>loop-erased random walks</span>.
						</p>
						<p>
							We begin the algorithm by initializing the maze with
							<span>one cell chosen arbitrarily</span>. Then we
							start at a new cell chosen arbitrarily, and{" "}
							<span>
								perform a random walk until we reach a cell
								already in the maze
							</span>{" "}
							- however, if at any point the random walk reaches{" "}
							<span>its own path</span>, forming a loop, we{" "}
							<span>erase the loop</span> from the path before
							proceeding. When the path reaches the maze, we{" "}
							<span>add it to the maze</span>. Then we perform{" "}
							<span>another</span>
							loop-erased random walk from another arbitrary
							starting cell, repeating until all cells have been
							filled.
						</p>
						<p>
							This procedure remains unbiased no matter which
							method we use to arbitrarily choose starting cells.
							So we could always choose the first unfilled cell in
							left-to-right, top-to-bottom order for simplicity.
						</p>
					</>
				);
				break;
			default:
				description = <></>;
		}
	} else {
		switch (search) {
			case "A*":
				description = (
					<>
						<p>
							A* is an informed search algorithm and guarantees
							the shortest path
						</p>
						<p>
							A* is a combination of Dijkstra and Greedy. It uses
							distance from the root node plus heuristics distance
							to the goal. The algorithm terminates when we find
							the goal node.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>
								Assign dis[v] for all nodes = INT_MAX (distance
								from root node + heuristics of every node).
							</li>

							<li>
								Assign dis[root] = 0 + heuristic(root, goal)
								(distance from root node to itself +
								heuristics).
							</li>
							<li>Add root node to priority queue.</li>
							<li>
								Loop on the queue as long as it's not empty.
							</li>
							<ol>
								<li>
									In every loop, choose the node with the
									minimum distance from the root node in the
									queue + heuristic (root node will be
									selected first).
								</li>
								<li>
									Remove the current chosen node from the
									queue (vis[current] = true).
								</li>
								<li>
									If the current node is the goal node, then
									return it.
								</li>
								<li>
									For every child of the current node, do the
									following:
								</li>
								<ol>
									<li>
										Assign temp = distance(root, current) +
										distance(current, child) +
										heuristic(child, goal).
									</li>
									<li>
										If
										{` temp < dis[child], then, assign dis[child] = temp`}
										. This denotes a shorter path to child
										node has been found.
									</li>
									<li>
										And, add child node to the queue if not
										already in the queue (thus, it's now
										marked as not visited again).
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Dijkstra":
				description = (
					<>
						<p>
							Dijkstra is an informed search algorithm and
							guarantees the shortest path
						</p>
						<p>
							Dijkstra's algorithm tries to find the shortest path
							from the starting(root) node to every node, hence we
							can get the shortest path from the starting node to
							the goal.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>
								Assign dis[v] for all nodes = INT_MAX (distance
								from root node to every other node).
							</li>

							<li>
								Assign dis[root] = 0(distance from root node to
								itself).
							</li>
							<li>Add all nodes to a priority queue.</li>
							<li>
								Loop on the queue as long as it's not empty.
							</li>
							<ol>
								<li>
									In every loop, choose the node with the
									minimum distance from the root node in the
									queue(root node will be selected first).
								</li>
								<li>
									Remove the current chosen node from the
									queue (vis[current] = true).
								</li>
								<li>
									If the current chosen node is the goal node,
									then return it.
								</li>
								<li>
									For every child of the current node, do the
									following:
								</li>
								<ol>
									<li>
										If child node is not already in the
										queue (already visited), then skip this
										iteration.
									</li>
									<li>
										Assign temp = dis[current] + distance
										from current to child node.
									</li>
									<li>
										If{" "}
										{
											"temp < dis[child], then, assign dis[child] = temp"
										}
										. This denotes a shorter path to child
										node has been found.
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Greedy":
				description = (
					<>
						<p>
							Greedy is an informed search algorithm but does not
							guarantees the shortest path
						</p>
						<p>
							Greedy is an algorithm which makes a choice based on
							educated guesses(heuristics) at each stage. The node
							with shortest heuristic distance from the goal node
							will be explored next.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>
								Assign dis[v] for all nodes = INT_MAX (distance
								from every node to goal node).
							</li>

							<li>
								Assign dis[root] = 0(distance from root node to
								itself).
							</li>
							<li>Add root node to priority queue.</li>
							<li>
								Loop on the queue as long as it's not empty.
							</li>
							<ol>
								<li>
									In every loop, choose the node with the
									minimum heuristic distance from the goal
									node in the queue(root node will be selected
									first).
								</li>
								<li>
									Remove the current chosen node from the
									queue (vis[current] = true).
								</li>
								<li>
									If the current chosen node is the goal node,
									then return it.
								</li>
								<li>
									For every child of the current node, do the
									following:
								</li>
								<ol>
									<li>
										If child node is already visited
										(previously removed from the queue),
										then skip this iteration.
									</li>
									<li>
										Assign dis[current] =
										heuristics(current, goal).
									</li>
									<li>Add child node to the queue.</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Depth First":
				description = (
					<>
						<p>
							Depth First Search is not an informed search
							algorithm and does not guarantees the shortest path
						</p>
						<p>
							It starts at the root and explores one of it's
							neighbor's sub tree, and then move to the next
							neighbor's sub tree, and so on.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>Add root node to the queue.</li>

							<li>
								Loop on the queue as long as it's not empty.
							</li>
							<ol>
								<li>
									Get the node at the top of the
									queue(current), mark it as visited, and
									remove it.
								</li>
								<li>
									For every non-visited neighbor of the
									current node, do the following:
								</li>
								<ol>
									<li>
										Check if it's the goal node, If so, then
										return this neighbor node.
									</li>
									<li>Otherwise, push it to the queue.</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Breadth First":
				description = (
					<>
						<p>
							Depth First Search is not an informed search
							algorithm but guarantees the shortest path
						</p>
						<p>
							It starts at the root and explores all of it's
							neighbors in the next level before moving to each of
							the root neighbors, and then, it explores the
							neighbors of the root neighbors, and so on.
						</p>
						<h3>Algorithm</h3>
						<ol>
							<li>
								Add root node to the queue, and mark it as
								visited(already explored)
							</li>

							<li>
								Loop on the queue as long as it's not empty:
							</li>
							<ol>
								<li>
									Get and remove the node at the top of the
									queue(current).
								</li>
								<li>
									For every non-visited neighbor of the
									current node, do the following:
								</li>
								<ol>
									<li>Mark it as visited.</li>
									<li>
										Check if it's the goal node, If so, then
										return it.
									</li>
									<li>Otherwise, push it to the queue.</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			default:
				description = <></>;
		}
	}

	return ReactDOM.createPortal(
		<AnimatePresence>
			{open && (
				<AlgoModalStyled ref={outside} onClick={onClose}>
					<motion.div
						animate={{ y: 0 }}
						initial={{ y: "-50vh" }}
						exit={{ y: "-100vh" }}
						transition={{ ease: "easeOut", duration: 0.1 }}
						className="modal-bg"
					>
						<div className="main-btns">
							<button
								className={`main-btn ${
									mainSection === "mazes"
										? "current-main"
										: null
								}`}
								onClick={() => setMainSection("mazes")}
							>
								MAZES
							</button>
							<button
								className={`main-btn ${
									mainSection === "searches"
										? "current-main"
										: null
								}`}
								onClick={() => setMainSection("searches")}
							>
								SEARCHES
							</button>
						</div>
						<div className="content">
							{mainSection === "mazes" ? (
								<Select
									labelId="select-label"
									className="select"
									value={maze}
									name={"maze"}
									onChange={handleChange}
								>
									<MenuItem value={"DFS"}>DFS</MenuItem>
									<MenuItem value={"Kruskal"}>
										Kruskal
									</MenuItem>
									<MenuItem value={"Prim"}>Prim</MenuItem>
									<MenuItem value={"Recursive"}>
										Recursive
									</MenuItem>
									<MenuItem value={"Aldous-Broder"}>
										Aldous-Broder
									</MenuItem>
									<MenuItem value={"Wilson"}>Wilson</MenuItem>
								</Select>
							) : (
								<Select
									className="select"
									value={search}
									name={"search"}
									onChange={handleChange}
								>
									<MenuItem value={"A*"}>A*</MenuItem>
									<MenuItem value={"Dijkstra"}>
										Dijkstra
									</MenuItem>
									<MenuItem value={"Greedy"}>Greedy</MenuItem>
									<MenuItem value={"Depth First"}>
										Depth First
									</MenuItem>
									<MenuItem value={"Breadth First"}>
										Breadth First
									</MenuItem>
								</Select>
							)}
							{description}
							<button
								onClick={() => setOpen(false)}
								className="close-modal"
							>
								<CloseIcon sx={{ fontSize: "2.7rem" }} />
							</button>
						</div>
					</motion.div>
				</AlgoModalStyled>
			)}
		</AnimatePresence>,
		document.getElementById("portal")
	);
}

const Props = (state) => ({
	mazeType: state.mazeType,
	searchType: state.searchType,
});

export default connect(Props, null)(AlgoModal);
