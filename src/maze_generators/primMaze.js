function* primMaze(leng, cols, startPos, targetPos, instant) {
	let els = [];
	let cells = [];

	for (let i = 0; i < leng; i++) {
		if (i === startPos) {
			els.push({ status: "start", visited: false, index: i });
			cells.push(i);
		} else if (i === targetPos) {
			els.push({ status: "target", visited: false, index: i });
			cells.push(i);
		} else {
			if ((i % cols) % 2 === 0 || Math.floor(i / cols) % 2 === 0) {
				els.push({ status: "wall", visited: false, index: i });
				cells.push(null);
			} else {
				els.push({ status: "wall", visited: false, index: i });
				cells.push(i);
			}
		}
	}

	let start = null;
	while (start === null) {
		start = cells[Math.floor(Math.floor(Math.random() * leng))];
	}
	els[start].status = "empty";
	els[start].visited = true;

	if (!instant) yield els.map((el) => el.status);

	let walls = [];
	if (start + cols < leng && els[start + cols].status === "wall") {
		walls.push(start + cols);
	}
	if (start - cols >= 0 && els[start - cols].status === "wall") {
		walls.push(start - cols);
	}
	if (start % cols !== 0 && els[start - 1].status === "wall") {
		walls.push(start - 1);
	}
	if (start % cols !== cols - 1 && els[start + 1].status === "wall") {
		walls.push(start + 1);
	}
	while (walls.length !== 0) {
		let idx = Math.floor(Math.random() * walls.length);
		let currentIdx = walls[idx];
		walls.splice(idx, 1);

		let neighbors = [];
		if (currentIdx + cols < leng && cells[currentIdx + cols] !== null) {
			neighbors.push(currentIdx + cols);
		}
		if (currentIdx - cols >= 0 && cells[currentIdx - cols] !== null) {
			neighbors.push(currentIdx - cols);
		}
		if (currentIdx % cols !== 0 && cells[currentIdx - 1] !== null) {
			neighbors.push(currentIdx - 1);
		}
		if (currentIdx % cols !== cols - 1 && cells[currentIdx + 1] !== null) {
			neighbors.push(currentIdx + 1);
		}
		if (
			neighbors.length === 2 &&
			((els[neighbors[0]].visited && !els[neighbors[1]].visited) ||
				(!els[neighbors[0]].visited && els[neighbors[1]].visited))
		) {
			cells[currentIdx] = [currentIdx];
			if (currentIdx !== startPos && currentIdx !== targetPos) {
				els[currentIdx].status = "empty";
			}
			if (neighbors[0] !== startPos && neighbors[0] !== targetPos) {
				els[neighbors[0]].status = "empty";
			}
			if (neighbors[1] !== startPos && neighbors[1] !== targetPos) {
				els[neighbors[1]].status = "empty";
			}

			let unvisited;
			if (!els[neighbors[0]].visited) {
				unvisited = neighbors[0];
			} else {
				unvisited = neighbors[1];
			}

			if (
				unvisited + cols < leng &&
				els[unvisited + cols].status === "wall"
			) {
				walls.push(unvisited + cols);
				els[unvisited + cols].status = "queued";
			}
			if (
				unvisited - cols >= 0 &&
				els[unvisited - cols].status === "wall"
			) {
				walls.push(unvisited - cols);
				els[unvisited - cols].status = "queued";
			}
			if (
				unvisited % cols !== 0 &&
				els[unvisited - 1].status === "wall"
			) {
				walls.push(unvisited - 1);
				els[unvisited - 1].status = "queued";
			}
			if (
				unvisited % cols !== cols - 1 &&
				els[unvisited + 1].status === "wall"
			) {
				walls.push(unvisited + 1);
				els[unvisited + 1].status = "queued";
			}

			els[unvisited].visited = true;
		} else {
			els[currentIdx].status = "wall";
		}
		if (!instant) yield els.map((el) => el.status);
	}
	yield els.map((el) => el.status);
}

export default primMaze;
