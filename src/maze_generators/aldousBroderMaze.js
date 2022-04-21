function* aldousBroderMaze(leng, cols, startPos, targetPos, instant) {
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

	let current = null;
	while (current === null) {
		current = cells[Math.floor(Math.floor(Math.random() * leng))];
	}
	els[current].status = "empty";
	els[current].visited = true;
	unvisited.splice(unvisited.indexOf(current), 1);

	if (!instant) yield els.map((el) => el.status);

	let last;
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
		if (els[neighbors[randomNeighbor]].visited === false) {
			els[neighbors[randomNeighbor]].visited = true;
			unvisited.splice(unvisited.indexOf(neighbors[randomNeighbor]), 1);
			last = neighbors[randomNeighbor];

			if (
				els[walls[randomNeighbor]].status !== "start" &&
				els[walls[randomNeighbor]].status !== "target"
			) {
				els[walls[randomNeighbor]].status = "empty";
			}
		}

		if (
			els[current].status !== "start" &&
			els[current].status !== "target"
		) {
			els[current].status = "queued";
		}

		if (!instant) yield els.map((el) => el.status);

		if (
			els[current].status !== "start" &&
			els[current].status !== "target"
		) {
			els[current].status = "empty";
		}

		console.log(unvisited);
		current = neighbors[randomNeighbor];
	}
	if (els[last].status !== "start" && els[last].status !== "target") {
		els[last].status = "empty";
	}

	yield els.map((el) => el.status);
}

export default aldousBroderMaze;
