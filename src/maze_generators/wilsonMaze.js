function* wilsonMaze(leng, cols, startPos, targetPos, instant) {
	let els = [];
	let cells = [];
	let unvisited = [];

	for (let i = 0; i < leng; i++) {
		if ((i % cols) % 2 === 0 || Math.floor(i / cols) % 2 === 0) {
			if (i === startPos) {
				els.push({ status: "start", visited: false, index: i });
			} else if (i === targetPos) {
				els.push({ status: "target", visited: false, index: i });
			} else {
				els.push({ status: "wall", visited: false, index: i });
			}
			cells.push(null);
		} else {
			if (i === startPos) {
				els.push({ status: "start", visited: false, index: i });
			} else if (i === targetPos) {
				els.push({ status: "target", visited: false, index: i });
			} else {
				els.push({ status: "wall", visited: false, index: i });
			}
			cells.push(i);
			unvisited.push(i);
		}
	}

	let start = unvisited[unvisited.length - 1];
	els[start].status = "empty";
	els[start].visited = true;
	unvisited.splice(unvisited.indexOf(start), 1);

	let current = unvisited[unvisited.length - 1];

	if (!instant) yield els.map((el) => el.status);

	let branch = [];
	while (unvisited.length !== 0) {
		let neighbors = [];
		let walls = [];
		if (current + 2 * cols < leng && cells[current + 2 * cols] !== null) {
			neighbors.push(current + 2 * cols);
			walls.push(current + cols);
		}
		if (current - 2 * cols >= 0 && cells[current - 2 * cols] !== null) {
			neighbors.push(current - 2 * cols);
			walls.push(current - cols);
		}
		if (current % cols > 1 && cells[current - 2] !== null) {
			neighbors.push(current - 2);
			walls.push(current - 1);
		}
		if (current % cols < cols - 2 && cells[current + 2] !== null) {
			neighbors.push(current + 2);
			walls.push(current + 1);
		}

		const randomNeighbor = Math.floor(Math.random() * neighbors.length);

		branch.push(walls[randomNeighbor], neighbors[randomNeighbor]);
		if (
			els[walls[randomNeighbor]].status !== "start" &&
			els[walls[randomNeighbor]].status !== "target"
		) {
			els[walls[randomNeighbor]].status = "queued";
		}
		if (
			els[neighbors[randomNeighbor]].status !== "start" &&
			els[neighbors[randomNeighbor]].status !== "target"
		) {
			els[neighbors[randomNeighbor]].status = "queued";
		}
		if (!instant) yield els.map((el) => el.status);

		if (els[neighbors[randomNeighbor]].visited === true) {
			for (let each of branch) {
				if (cells[each] !== null && els[each].visited === false) {
					unvisited.splice(unvisited.indexOf(each), 1);
					els[each].visited = true;
				}
				if (
					els[each].status !== "start" &&
					els[each].status !== "target"
				) {
					els[each].status = "empty";
				}
			}

			branch = [];
			if (unvisited.length !== 0) {
				current = unvisited[unvisited.length - 1];
				branch.push(current);
			}

			if (!instant) yield els.map((el) => el.status);
		} else if (
			[...branch.slice(0, branch.length - 1)].includes(
				neighbors[randomNeighbor]
			)
		) {
			let idx = branch.indexOf(neighbors[randomNeighbor]);
			let cut = [...branch.slice(idx + 1, branch.length - 1)];
			branch = [...branch.slice(0, idx + 1)];

			for (let each of cut) {
				if (
					els[each].status !== "start" &&
					els[each].status !== "target"
				) {
					els[each].status = "wall";
				}
			}
			current = neighbors[randomNeighbor];

			if (!instant) yield els.map((el) => el.status);
		} else {
			current = neighbors[randomNeighbor];
		}
	}

	yield els.map((el) => el.status);
}

export default wilsonMaze;
