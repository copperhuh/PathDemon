export default function* depthFirst(nodes, cols, startPos, targetPos, instant) {
	let path;
	let els = [];

	for (let i = 0; i < nodes.length; i++) {
		if (
			nodes[i] === "wall" ||
			nodes[i] === "start" ||
			nodes[i] === "target"
		) {
			els.push({ status: nodes[i], index: i, visited: false });
		} else {
			els.push({ status: "empty", index: i, visited: false });
		}
	}

	let openSet = [startPos];
	let cameFrom = [];

	for (let i = 0; i < els.length; i++) {
		cameFrom.push(null);
	}

	while (openSet.length !== 0) {
		let changed = false;

		let current = openSet.pop();
		els[current].visited = true;

		// if (current === targetPos) {
		// 	path = [current];
		// 	while (cameFrom[current] !== null) {
		// 		current = cameFrom[current];
		// 		path.unshift(current);
		// 		if (current !== startPos && current !== targetPos) {
		// 			els[current].status = "path";
		// 			if (!instant) yield els.map((el) => el.status);
		// 		}
		// 	}
		// 	break;
		// }

		if (
			current % cols !== 0 &&
			els[current - 1].status !== "wall" &&
			els[current - 1].visited === false
		) {
			openSet.push(current - 1);
			cameFrom[current - 1] = current;
			if (
				current - 1 !== startPos &&
				current - 1 !== targetPos &&
				els[current - 1].status !== "queued"
			) {
				els[current - 1].status = "queued";
				changed = true;
			}

			if (current - 1 === targetPos) {
				current = current - 1;
				path = [current];
				while (cameFrom[current] !== null) {
					current = cameFrom[current];
					path.unshift(current);
					if (current !== startPos && current !== targetPos) {
						els[current].status = "path";
						if (!instant) yield els.map((el) => el.status);
					}
				}
				break;
			}
		}
		if (
			current + cols < nodes.length &&
			els[current + cols].status !== "wall" &&
			els[current + cols].visited === false
		) {
			openSet.push(current + cols);
			cameFrom[current + cols] = current;
			if (
				current + cols !== startPos &&
				current + cols !== targetPos &&
				els[current + cols].status !== "queued"
			) {
				els[current + cols].status = "queued";
				changed = true;
			}

			if (current + cols === targetPos) {
				current = current + cols;
				path = [current];
				while (cameFrom[current] !== null) {
					current = cameFrom[current];
					path.unshift(current);
					if (current !== startPos && current !== targetPos) {
						els[current].status = "path";
						if (!instant) yield els.map((el) => el.status);
					}
				}
				break;
			}
		}
		if (
			current % cols !== cols - 1 &&
			els[current + 1].status !== "wall" &&
			els[current + 1].visited === false
		) {
			openSet.push(current + 1);
			cameFrom[current + 1] = current;
			if (
				current + 1 !== startPos &&
				current + 1 !== targetPos &&
				els[current + 1].status !== "queued"
			) {
				els[current + 1].status = "queued";
				changed = true;
			}

			if (current + 1 === targetPos) {
				current = current + 1;
				path = [current];
				while (cameFrom[current] !== null) {
					current = cameFrom[current];
					path.unshift(current);
					if (current !== startPos && current !== targetPos) {
						els[current].status = "path";
						if (!instant) yield els.map((el) => el.status);
					}
				}
				break;
			}
		}
		if (
			current - cols >= 0 &&
			els[current - cols].status !== "wall" &&
			els[current - cols].visited === false
		) {
			openSet.push(current - cols);
			cameFrom[current - cols] = current;
			if (
				current - cols !== startPos &&
				current - cols !== targetPos &&
				els[current - cols].status !== "queued"
			) {
				els[current - cols].status = "queued";
				changed = true;
			}

			if (current - cols === targetPos) {
				current = current - cols;
				path = [current];
				while (cameFrom[current] !== null) {
					current = cameFrom[current];
					path.unshift(current);
					if (current !== startPos && current !== targetPos) {
						els[current].status = "path";
						if (!instant) yield els.map((el) => el.status);
					}
				}
				break;
			}
		}

		if (
			current !== startPos &&
			current !== targetPos &&
			els[current].status !== "visited"
		) {
			els[current].status = "visited";
			changed = true;
		}

		if (changed && !instant) {
			yield els.map((el) => el.status);
		}
	}
	yield els.map((el) => el.status);
}
