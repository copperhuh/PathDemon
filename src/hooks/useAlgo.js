import { useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";

export default function useAlgo(nodeCount, mainRef, size, cols, rows) {
	const [elements, setElements] = useState([]);
	const [gridStart, setGridStart] = useState({
		left: 0,
		top: 0,
	});
	useEffect(() => {
		if (mainRef === null) return;
		console.log(mainRef.current);
		setGridStart({
			left: mainRef.offsetLeft,
			top: mainRef.offsetTop,
		});
	}, [mainRef, mainRef?.current?.offsetLeft]);

	const [paintNodes, setPaintNodes] = useState(null);

	function Node({ look, idx }) {
		let color;

		switch (look) {
			case "empty":
				color = "#d4d0c1";
				break;
			case "wall":
				color = "blue";
				break;
			default:
				color = "#d4d0c1";
		}

		return (
			<div className="node" {...bind()}>
				<div
					className="node-coloured"
					style={{ background: color, touchAction: "none" }}
				></div>
			</div>
		);
	}
	const getIdxFromCoords = (x, y) => {
		const nodeX = Math.floor((x - gridStart.left) / size);
		const nodeY = Math.floor((y - gridStart.top) / size);
		// console.log(x, size * cols + gridStart.left);
		return cols * nodeY + nodeX >= elements.length
			? null
			: cols * nodeY + nodeX;
	};
	const bind = useDrag(
		({ canceled, cancel, down, xy: [x, y] }) => {
			// console.log(gridStart.left, gridStart.top, down, "aaa");
			// console.log(x, y, getIdxFromCoords(x, y), "ccc");
			if (x < 0 || y < 0 || canceled) {
				cancel();
				return;
			}
			const currentNode = getIdxFromCoords(x, y);
			console.log(currentNode);
			if (paintNodes === null) {
				if (elements[getIdxFromCoords(x, y)] === "empty") {
					setPaintNodes("toWall");
					setElements((prevElements) => [
						...prevElements.slice(0, currentNode),
						"wall",
						...prevElements.slice(currentNode + 1),
					]);
				} else {
					setPaintNodes("toEmpty");
					setElements((prevElements) => [
						...prevElements.slice(0, currentNode),
						"empty",
						...prevElements.slice(currentNode + 1),
					]);
				}
			}
			if (!down) setPaintNodes(null);

			if (currentNode === -1 && currentNode !== elements.length) {
				cancel();
				return;
			}
			if (paintNodes === "toWall" && elements[currentNode] !== "wall") {
				setElements((prevElements) => [
					...prevElements.slice(0, currentNode),
					"wall",
					...prevElements.slice(currentNode + 1),
				]);
			} else if (
				paintNodes === "toEmpty" &&
				elements[currentNode] !== "empty"
			) {
				setElements((prevElements) => [
					...prevElements.slice(0, currentNode),
					"empty",
					...prevElements.slice(currentNode + 1),
				]);
			}
		},
		{ enabled: size > 20 }
	);
	const updateElements = (nodes) =>
		nodes.map((el, idx) => <Node look={el} idx={idx} key={idx} />);

	useEffect(() => {
		let cleanGrid = [];
		for (let i = 0; i < nodeCount; i++) {
			cleanGrid.push("empty");
		}
		setElements(cleanGrid);
	}, [nodeCount]);

	return updateElements(elements);
}
