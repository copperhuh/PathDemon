function* recursiveDivisionMaze(leng, cols, startPos, targetPos, instant) {
	let els = [];
	let steps = [];

	const updateEls = (idx, newStatus) => {
		if (els[idx] !== "start" && els[idx] !== "target") {
			els[idx] = newStatus;
		}
	};

	for (let i = 0; i < leng; i++) {
		if (i === startPos) {
			els.push("start");
		} else if (i === targetPos) {
			els.push("target");
		} else if (
			i < cols ||
			i > leng - cols - 1 ||
			i % cols === 0 ||
			i % cols === cols - 1
		) {
			els.push("wall");
		} else {
			els.push("empty");
		}
	}

	const makeMaze = (TL, TR, BR, BL) => {
		let width = (TR % cols) - (TL % cols) + 1;
		let height = Math.floor(BL / cols) - Math.floor(TL / cols) + 1;

		if (width <= 1 || height <= 1 || TL === BL || TL === TR) {
			return;
		}

		let favoredWallV = [];
		let favoredWallH = [];
		let possibleWallV = [];
		let possibleWallH = [];
		let reserved = [];
		for (let i = 0; i < width; i++) {
			if (
				els[TL - cols + i] === "wall" &&
				els[BL + cols + i] === "wall" &&
				i !== 0 &&
				i !== width - 1
			) {
				favoredWallV.push(i);
			} else if (
				!(
					els[TL - cols + i] === "empty" &&
					els[BL + cols + i] === "empty"
				)
			) {
				possibleWallV.push(i);
			}

			if (els[TL - cols + i] === "empty") {
				reserved.push(TL + i);
			}
			if (els[BL + cols + i] === "empty") {
				reserved.push(BL + i);
			}
		}
		for (let i = 0; i < height; i++) {
			if (
				els[TL - 1 + i * cols] === "wall" &&
				els[TR + 1 + i * cols] === "wall" &&
				i !== 0 &&
				i !== height - 1
			) {
				favoredWallH.push(i);
			} else if (
				!(
					els[TL - 1 + i * cols] === "empty" &&
					els[TR + 1 + i * cols] === "empty"
				)
			) {
				possibleWallH.push(i);
			}

			if (els[TL - 1 + i * cols] === "empty") {
				reserved.push(TL + i * cols);
			}
			if (els[TR + 1 + i * cols] === "empty") {
				reserved.push(TR + i * cols);
			}
		}

		let wallPosition;
		if (favoredWallH.length === 0 && favoredWallV.length > 0) {
			wallPosition = "vertical";
		} else if (favoredWallV.length === 0 && favoredWallH.length > 0) {
			wallPosition = "horizontal";
		} else if (possibleWallH.length === 0 && possibleWallV.length > 0) {
			wallPosition = "vertical";
		} else if (possibleWallV.length === 0 && possibleWallH.length > 0) {
			wallPosition = "horizontal";
		} else if (possibleWallH.length <= 2 && possibleWallV.length > 2) {
			wallPosition = "vertical";
		} else if (possibleWallV.length <= 2 && possibleWallH.length > 2) {
			wallPosition = "horizontal";
		} else if (height > width) {
			wallPosition = "horizontal";
		} else if (height < width) {
			wallPosition = "vertical";
		} else {
			if (Math.floor(Math.random() * 2) === 0) {
				wallPosition = "horizontal";
			} else {
				wallPosition = "vertical";
			}
		}

		if (wallPosition === "vertical") {
			let wallIdx;
			let wall = [];
			if (favoredWallV.length > 0) {
				wallIdx =
					favoredWallV[
						Math.floor(Math.random() * favoredWallV.length)
					];
				let passage = Math.floor(Math.random() * height);
				for (let i = 0; i < height; i++) {
					if (i !== passage) {
						wall.push(TL + wallIdx + cols * i, "wall");
					}
				}
			} else {
				let notEdges = [];
				for (let each of possibleWallV) {
					if (each !== 0 && each !== width - 1) {
						notEdges.push(each);
					}
				}

				if (notEdges.length !== 0) {
					wallIdx =
						notEdges[Math.floor(Math.random() * notEdges.length)];
					for (let i = 0; i < height; i++) {
						if (!reserved.includes(TL + wallIdx + cols * i)) {
							wall.push(TL + wallIdx + cols * i, "wall");
						}
					}
				} else {
					wallIdx =
						possibleWallV[
							Math.floor(Math.random() * possibleWallV.length)
						];
					for (let i = 0; i < height; i++) {
						if (!reserved.includes(TL + wallIdx + cols * i)) {
							wall.push(TL + wallIdx + cols * i, "wall");
							break;
						}
					}
				}
			}
			for (let each of wall) {
				updateEls(each, "wall");
			}
			steps.push(JSON.parse(JSON.stringify(els)));

			makeMaze(TL, TL + wallIdx - 1, BL + wallIdx - 1, BL);
			makeMaze(TL + wallIdx + 1, TR, BR, BL + wallIdx + 1);
		} else {
			let wallIdx;
			let wall = [];
			if (favoredWallH.length > 0) {
				wallIdx =
					favoredWallH[
						Math.floor(Math.random() * favoredWallH.length)
					];
				let passage = Math.floor(Math.random() * width);
				for (let i = 0; i < width; i++) {
					if (i !== passage) {
						wall.push(TL + cols * wallIdx + i, "wall");
					}
				}
			} else {
				let notEdges = [];
				for (let each of possibleWallV) {
					if (each !== 0 && each !== width - 1) {
						notEdges.push(each);
					}
				}

				if (notEdges.length !== 0) {
					wallIdx =
						notEdges[Math.floor(Math.random() * notEdges.length)];
					for (let i = 0; i < width; i++) {
						if (!reserved.includes(TL + cols * wallIdx + i)) {
							wall.push(TL + cols * wallIdx + i, "wall");
						}
					}
				} else {
					wallIdx =
						possibleWallH[
							Math.floor(Math.random() * possibleWallH.length)
						];
					for (let i = 0; i < width; i++) {
						if (!reserved.includes(TL + cols * wallIdx + i)) {
							wall.push(TL + cols * wallIdx + i, "wall");
							break;
						}
					}
				}
			}
			for (let each of wall) {
				updateEls(each, "wall");
			}
			steps.push(JSON.parse(JSON.stringify(els)));

			makeMaze(
				TL,
				TR,
				TR + (wallIdx - 1) * cols,
				TL + (wallIdx - 1) * cols
			);
			makeMaze(
				TL + (wallIdx + 1) * cols,
				TR + (wallIdx + 1) * cols,
				BR,
				BL
			);
		}
	};

	makeMaze(
		cols + 1,
		2 * cols - 2,
		leng - cols - 2,
		cols * (leng / cols - 2) + 1
	);

	if (!instant) {
		for (let each of steps) {
			yield each;
		}
	}

	yield els;
}

export default recursiveDivisionMaze;
