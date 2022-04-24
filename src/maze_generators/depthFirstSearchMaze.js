function* depthFirstSearchMaze(leng, cols, startPos, targetPos, instant) {
	let els = [];
	for (let i = 0; i < leng; i++) {
		if (i === startPos) {
			els.push({ status: "start", visited: false, index: i });
		} else if (i === targetPos) {
			els.push({ status: "target", visited: false, index: i });
		} else {
			els.push({ status: "wall", visited: false, index: i });
		}
	}
	if (!instant) yield els.map((el) => el.status);

	const start = Math.floor(Math.random() * leng);
	els[start].visited = true;
	let queue = [start];
	while (queue.length !== 0) {
		const currentIdx = queue.pop();
		// console.log(queue, els.length, currentIdx);
		if (currentIdx !== startPos && currentIdx !== targetPos)
			if (!instant)
				// els[currentIdx].status = "empty";
				yield els.map((el) => el.status);

		let neighbors = [];
		let walls = [];
		if (
			currentIdx + 2 * cols < leng &&
			els[currentIdx + 2 * cols].visited === false
		) {
			neighbors.push(currentIdx + 2 * cols);
			walls.push(currentIdx + cols);
			// els[currentIdx + 2 * cols].visited = true;
			// if (
			// 	currentIdx + 2 * cols !== startPos &&
			// 	currentIdx + 2 * cols !== targetPos
			// )
			// 	els[currentIdx + 2 * cols].status = "queued";
			// if (
			// 	currentIdx + cols !== startPos &&
			// 	currentIdx + cols !== targetPos
			// )
			// 	els[currentIdx + cols].status = "empty";
			// els[currentIdx + cols].visited = true;

			// if (!instant) yield els.map((el) => el.status);
		}
		if (
			currentIdx - 2 * cols >= 0 &&
			els[currentIdx - 2 * cols].visited === false
		) {
			neighbors.push(currentIdx - 2 * cols);
			walls.push(currentIdx - cols);
			// els[currentIdx - 2 * cols].visited = true;
			// if (
			// 	currentIdx - 2 * cols !== startPos &&
			// 	currentIdx - 2 * cols !== targetPos
			// )
			// 	els[currentIdx - 2 * cols].status = "queued";
			// if (
			// 	currentIdx - cols !== startPos &&
			// 	currentIdx - cols !== targetPos
			// )
			// 	els[currentIdx - cols].status = "empty";
			// els[currentIdx - cols].visited = true;

			// if (!instant) yield els.map((el) => el.status);
		}
		if (currentIdx % cols > 1 && els[currentIdx - 2].visited === false) {
			neighbors.push(currentIdx - 2);
			walls.push(currentIdx - 1);
			// els[currentIdx - 2].visited = true;
			// if (currentIdx - 2 !== startPos && currentIdx - 2 !== targetPos)
			// 	els[currentIdx - 2].status = "queued";
			// if (currentIdx - 1 !== startPos && currentIdx - 1 !== targetPos)
			// 	els[currentIdx - 1].status = "empty";
			// els[currentIdx - 1].visited = true;

			// if (!instant) yield els.map((el) => el.status);
		}
		if (
			currentIdx % cols < cols - 2 &&
			els[currentIdx + 2].visited === false
		) {
			neighbors.push(currentIdx + 2);
			walls.push(currentIdx + 1);
			// els[currentIdx + 2].visited = true;
			// if (currentIdx + 2 !== startPos && currentIdx + 2 !== targetPos)
			// 	els[currentIdx + 2].status = "queued";
			// if (currentIdx + 1 !== startPos && currentIdx + 1 !== targetPos)
			// 	els[currentIdx + 1].status = "empty";
			// els[currentIdx + 1].visited = true;

			// if (!instant) yield els.map((el) => el.status);
		}

		if (neighbors.length !== 0) {
			const randNeighbor = Math.floor(Math.random() * neighbors.length);
			// let expanded = neighbors[randNeighbor];
			// neighbors = [
			// 	...neighbors.slice(0, randNeighbor),
			// 	...neighbors.slice(randNeighbor + 1),
			// ];

			// for (let each of neighbors) {
			// 	queue.push(els[each]);
			// }
			// queue.push(els[expanded]);

			els[neighbors[randNeighbor]].visited = true;
			els[walls[randNeighbor]].visited = true;
			if (
				neighbors[randNeighbor] !== startPos &&
				neighbors[randNeighbor] !== targetPos
			)
				els[neighbors[randNeighbor]].status = "queued";
			if (
				walls[randNeighbor] !== startPos &&
				walls[randNeighbor] !== targetPos
			)
				els[walls[randNeighbor]].status = "empty";

			queue.push(currentIdx);
			queue.push(neighbors[randNeighbor]);
		} else {
			if (currentIdx !== startPos && currentIdx !== targetPos)
				els[currentIdx].status = "empty";
		}
		console.log(queue, els.length, currentIdx);
	}
	yield els.map((el) => el.status);
}

export default depthFirstSearchMaze;
