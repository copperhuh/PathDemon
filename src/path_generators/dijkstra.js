import PriorityQueue from "js-priority-queue";

export default function* dijkstra(nodes, cols, startPos, targetPos, instant) {
	let path;
	let els = [];

	for (let i = 0; i < nodes.length; i++) {
		if (
			nodes[i] === "wall" ||
			nodes[i] === "start" ||
			nodes[i] === "target"
		) {
			els.push({
				status: nodes[i],
				index: i,
				neighbors: [],
				visited: false,
			});
		} else {
			els.push({
				status: "empty",
				index: i,
				neighbors: [],
				visited: false,
			});
		}
	}
	for (let one of els) {
		if (one.status === "wall") continue;

		let tempNeighbors = [];
		if (one.index - cols >= 0 && els[one.index - cols].status !== "wall") {
			tempNeighbors.push(one.index - cols);
		}
		if (
			one.index % cols !== cols - 1 &&
			els[one.index + 1].status !== "wall"
		) {
			tempNeighbors.push(one.index + 1);
		}
		if (
			one.index + cols < nodes.length &&
			els[one.index + cols].status !== "wall"
		) {
			tempNeighbors.push(one.index + cols);
		}
		if (one.index % cols !== 0 && els[one.index - 1].status !== "wall") {
			tempNeighbors.push(one.index - 1);
		}
		one.neighbors = tempNeighbors;
	}

	let openSet = new PriorityQueue({
		comparator: (a, b) => {
			if (gScore[a] === gScore[b]) return counts[a] - counts[b];
			return gScore[a] - gScore[b];
		},
		initialValues: [startPos],
	});
	let openSetEls = [startPos];

	let cameFrom = [];
	let gScore = [];

	let counter = 0;
	let counts = [];
	for (let i = 0; i < els.length; i++) {
		cameFrom.push(null);
		gScore.push(Infinity);
	}

	gScore[startPos] = 0;

	while (openSet.length !== 0) {
		let changed = false;

		let current = openSet.dequeue();
		openSetEls.splice(openSetEls.indexOf(current), 1);
		els[current].visited = true;

		if (current === targetPos) {
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
		if (
			current !== startPos &&
			current !== targetPos &&
			els[current].status !== "visited"
		) {
			els[current].status = "visited";
			changed = true;
		}

		for (let neighbor of els[current].neighbors) {
			if (els[neighbor].visited === false) {
				const tempGScore = gScore[current] + 1;
				if (tempGScore < gScore[neighbor]) {
					cameFrom[neighbor] = current;
					gScore[neighbor] = tempGScore;
					counter++;
					counts[neighbor] = counter;
					openSet.queue(neighbor);
					openSetEls.push(neighbor);

					if (
						neighbor !== startPos &&
						neighbor !== targetPos &&
						els[neighbor].status !== "queued"
					) {
						els[neighbor].status = "queued";
						changed = true;
					}
				}
			}
		}
		if (changed && !instant) {
			yield els.map((el) => el.status);
		}
	}
	yield els.map((el) => el.status);
}
