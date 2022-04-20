function* kruskalMaze(leng, cols, startPos, targetPos, instant) {
	let els = [];
	let walls = [];
	let cells = [];

	for (let i = 0; i < leng; i++) {
		if (i === startPos) {
			els.push({ status: "start", visited: false, index: i });
			cells.push([i]);
		} else if (i === targetPos) {
			els.push({ status: "target", visited: false, index: i });
			cells.push([i]);
		} else {
			if ((i % cols) % 2 === 0 || Math.floor(i / cols) % 2 === 0) {
				els.push({ status: "wall", visited: false, index: i });
				walls.push(i);
				cells.push(null);
			} else {
				els.push({ status: "wall", visited: false, index: i });
				cells.push([i]);
			}
		}
	}
	if (!instant) yield els.map((el) => el.status);
	let n = walls.length;
	for (let i = 0; i < n; i++) {
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
			JSON.stringify(cells[neighbors[0]].sort()) !==
				JSON.stringify(cells[neighbors[1]].sort())
		) {
			if (currentIdx !== startPos && currentIdx !== targetPos) {
				els[currentIdx].status = "empty";
			}

			let temp = [...cells[neighbors[0]], ...cells[neighbors[1]]];
			for (let each of temp) {
				cells[each] = temp;
			}

			if (neighbors[0] !== startPos && neighbors[0] !== targetPos) {
				els[neighbors[0]].status = "empty";
			}
			if (neighbors[1] !== startPos && neighbors[1] !== targetPos) {
				els[neighbors[1]].status = "empty";
			}
			if (!instant) yield els.map((el) => el.status);
		}
	}
	yield els.map((el) => el.status);
}

export default kruskalMaze;
