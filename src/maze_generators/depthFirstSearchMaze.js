function* depthFirstSearchMaze(leng, cols) {
	let els = [];
	for (let i = 0; i < leng; i++) {
		els.push({ status: "wall", visited: false, index: i });
	}
	yield els.map((el) => el.status);

	const start = Math.floor(Math.random() * leng);
	els[start].visited = true;
	let queue = [els[start]];
	while (queue.length >= 1) {
		const currentIdx = queue[queue.length - 1].index;
		queue.pop();
		els[currentIdx].status = "empty";
		yield els.map((el) => el.status);

		let neighbors = [];
		if (
			currentIdx + 2 * cols < leng &&
			els[currentIdx + 2 * cols].visited === false
		) {
			neighbors.push(currentIdx + 2 * cols);
			els[currentIdx + 2 * cols].visited = true;
			els[currentIdx + 2 * cols].status = "queued";
			els[currentIdx + cols].status = "empty";
			els[currentIdx + cols].visited = true;

			yield els.map((el) => el.status);
		}
		if (
			currentIdx - 2 * cols >= 0 &&
			els[currentIdx - 2 * cols].visited === false
		) {
			neighbors.push(currentIdx - 2 * cols);
			els[currentIdx - 2 * cols].visited = true;
			els[currentIdx - 2 * cols].status = "queued";
			els[currentIdx - cols].status = "empty";
			els[currentIdx - cols].visited = true;

			yield els.map((el) => el.status);
		}
		if (currentIdx % cols > 1 && els[currentIdx - 2].visited === false) {
			neighbors.push(currentIdx - 2);
			els[currentIdx - 2].visited = true;
			els[currentIdx - 2].status = "queued";
			els[currentIdx - 1].status = "empty";
			els[currentIdx - 1].visited = true;

			yield els.map((el) => el.status);
		}
		if (
			currentIdx % cols < cols - 2 &&
			els[currentIdx + 2].visited === false
		) {
			neighbors.push(currentIdx + 2);
			els[currentIdx + 2].visited = true;
			els[currentIdx + 2].status = "queued";
			els[currentIdx + 1].status = "empty";
			els[currentIdx + 1].visited = true;

			yield els.map((el) => el.status);
		}

		if (neighbors.length !== 0) {
			const randNeighbor = Math.floor(Math.random() * neighbors.length);
			let expanded = neighbors[randNeighbor];
			neighbors = [
				...neighbors.slice(0, randNeighbor),
				...neighbors.slice(randNeighbor + 1),
			];

			for (let each of neighbors) {
				queue.push(els[each]);
			}
			queue.push(els[expanded]);
		}
	}
}

export default depthFirstSearchMaze;
