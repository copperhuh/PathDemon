import { useEffect, useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";
import depthFirstSearchMaze from "../maze_generators/depthFirstSearchMaze";
import { useDispatch, useSelector } from "react-redux";
import {
	doSetGenerating,
	doSetPathVisible,
	doSetReset,
	doSetSkip,
	doSetVisualizationOngoing,
} from "../redux/Actions";
import Node from "../components/Grid/Node";
import aStar from "../maze_solvers/aStar";
import kruskalMaze from "../maze_generators/kruskalMaze";
import primMaze from "../maze_generators/primMaze";
import aldousBroderMaze from "../maze_generators/aldousBroderMaze";
import wilsonMaze from "../maze_generators/wilsonMaze";
import recursiveDivisionMaze from "../maze_generators/recursiveDivisionMaze";

export default function useAlgo(mainRef) {
	const size = useSelector((state) => state.size);
	const cols = useSelector((state) => state.dimensions.cols);
	const rows = useSelector((state) => state.dimensions.rows);
	const delayRef = useSelector((state) => state.delayRef);
	const visualizationOngoing = useSelector(
		(state) => state.visualizationOngoing
	);
	const generating = useSelector((state) => state.generating);
	const pathVisible = useSelector((state) => state.pathVisible);
	const skipRef = useSelector((state) => state.skipRef);
	const reset = useSelector((state) => state.reset);
	const mazeType = useSelector((state) => state.mazeType);

	const dispatch = useDispatch();

	const [elements, setElements] = useState([]);
	const [start, setStart] = useState(null);
	const [target, setTarget] = useState(null);
	const [transitionSpecial, setTransitionSpecial] = useState({
		flag: false,
		pos: null,
		memoVal: null,
	});
	const resetRef = useRef(reset);
	const [special, setSpecial] = useState({ pos: null, val: null });
	const [gridStart, setGridStart] = useState({
		left: 0,
		top: 0,
	});
	useEffect(() => {
		if (mainRef === null) return;
		setGridStart({
			left: mainRef.offsetLeft,
			top: mainRef.offsetTop,
		});
	}, [mainRef, mainRef?.current?.offsetLeft]);

	const [paintNodes, setPaintNodes] = useState(null);

	const getIdxFromCoords = (x, y) => {
		const nodeX = Math.floor((x - gridStart.left) / size);
		const nodeY = Math.floor((y - gridStart.top) / size);
		return cols * nodeY + nodeX >= elements.length ||
			cols * nodeY + nodeX < 0 ||
			x <= gridStart.left ||
			x >= gridStart.left + cols * size ||
			y <= gridStart.top ||
			y >= gridStart.top + rows * size
			? null
			: cols * nodeY + nodeX;
	};
	const bind = useDrag(({ canceled, buttons, cancel, down, xy: [x, y] }) => {
		if (
			x < 0 ||
			y < 0 ||
			canceled ||
			visualizationOngoing ||
			buttons === 0
		) {
			setPaintNodes(null);
			if (pathVisible) generateInstant();
			cancel();
			return;
		}
		const currentNode = getIdxFromCoords(x, y);
		if (paintNodes === null) {
			if (elements[getIdxFromCoords(x, y)] === "wall") {
				setPaintNodes("toEmpty");
				setElements((prevElements) => [
					...prevElements.slice(0, currentNode),
					"empty",
					...prevElements.slice(currentNode + 1),
				]);
			} else {
				setPaintNodes("toWall");
				setElements((prevElements) => [
					...prevElements.slice(0, currentNode),
					"wall",
					...prevElements.slice(currentNode + 1),
				]);
			}
		}
		if (!down) setPaintNodes(null);

		if (
			currentNode === null ||
			currentNode >= elements.length ||
			currentNode === target ||
			currentNode === start
		) {
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
		// if (pathVisible) generateInstant();
	}, {});
	const bindSpecial = useDrag(
		({ canceled, buttons, cancel, down, xy: [x, y] }) => {
			if (
				x < 0 ||
				y < 0 ||
				canceled ||
				visualizationOngoing ||
				buttons === 0 ||
				!down
			) {
				if (special.val === "start") {
					setElements((prevElements) => [
						...prevElements.slice(0, start),
						transitionSpecial.memoVal,
						...prevElements.slice(start + 1),
					]);
					setStart(special.pos);
				} else if (special.val === "target") {
					setElements((prevElements) => [
						...prevElements.slice(0, target),
						transitionSpecial.memoVal,
						...prevElements.slice(target + 1),
					]);
					setTarget(special.pos);
				}
				if (special.pos !== null) {
					setElements((prevElements) => [
						...prevElements.slice(0, special.pos),
						special.val,
						...prevElements.slice(special.pos + 1),
					]);
					if (transitionSpecial.pos === special.pos) {
						setElements((prevElements) => [
							...prevElements.slice(0, transitionSpecial.pos),
							special.val,
							...prevElements.slice(transitionSpecial.pos + 1),
						]);
					} else {
						setElements((prevElements) => [
							...prevElements.slice(0, transitionSpecial.pos),
							"empty",
							...prevElements.slice(transitionSpecial.pos + 1),
						]);
					}
					setSpecial({ pos: null, val: null });
					setTransitionSpecial({
						flag: false,
						pos: null,
						memoVal: null,
					});
					if (pathVisible && special.pos !== transitionSpecial.pos)
						generateInstant();
				}

				cancel();
				return;
			}
			const currentNode = getIdxFromCoords(x, y);
			if (special.val === null) {
				setSpecial({
					pos: currentNode,
					val: elements[currentNode],
				});
				setTransitionSpecial({
					flag: false,
					pos: currentNode,
					memoVal: null,
				});
				//
				setElements((prevElements) => [
					...prevElements.slice(0, currentNode),
					elements[currentNode] + "-transition",
					...prevElements.slice(currentNode + 1),
				]);
				//
				// if (pathVisible) generateInstant();
			}
			if (
				currentNode === null ||
				currentNode >= elements.length ||
				currentNode === start ||
				currentNode === target
			) {
				return;
			}

			if (special.pos !== currentNode) {
				setSpecial((prevSpecial) => ({
					...prevSpecial,
					pos: currentNode,
				}));
				if (transitionSpecial.flag) {
					if (special.val === "start") {
						setElements((prevElements) => [
							...prevElements.slice(0, start),
							transitionSpecial.memoVal,
							...prevElements.slice(start + 1),
						]);
						setStart(currentNode);
					} else if (special.val === "target") {
						setElements((prevElements) => [
							...prevElements.slice(0, target),
							transitionSpecial.memoVal,
							...prevElements.slice(target + 1),
						]);
						setTarget(currentNode);
					}
					setTransitionSpecial((prev) => ({
						...prev,
						memoVal: elements[currentNode],
					}));
					setElements((prevElements) => [
						...prevElements.slice(0, currentNode),
						special.val,
						...prevElements.slice(currentNode + 1),
					]);
				} else {
					if (special.val === "start") {
						setStart(currentNode);
					} else if (special.val === "target") {
						setTarget(currentNode);
					}
					setTransitionSpecial((prev) => ({
						...prev,
						flag: true,
						memoVal: elements[currentNode],
					}));
					setElements((prevElements) => [
						...prevElements.slice(0, currentNode),
						special.val,
						...prevElements.slice(currentNode + 1),
					]);
				}
			}
		},
		{}
	);

	const generate = async () => {
		let generator;
		if (generating === "path") {
			generator = aStar(elements, cols, start, target, false);
		} else {
			// generator = depthFirstSearchMaze(
			// 	elements.length,
			// 	cols,
			// 	start,
			// 	target,
			// 	false
			// );
			generator = getMazeAlgo(mazeType)(
				elements.length,
				cols,
				start,
				target,
				false
			);
		}

		while (true) {
			if (skipRef.current.value === "true") {
				generateInstant();
				skipRef.current.value = "false";
				return;
			}
			await sleep(parseInt(delayRef.current.textContent));
			if (resetRef.current === true) {
				dispatch(doSetVisualizationOngoing(false));
				dispatch(doSetPathVisible(false));
				dispatch(doSetReset(false));
				return;
			}
			const out = generator.next();
			if (out.done === true) {
				dispatch(doSetVisualizationOngoing(false));
				if (generating === "path") {
					dispatch(doSetPathVisible(true));
				}
				break;
			}
			setElements(out.value);
		}
	};
	const generateInstant = () => {
		let generator;
		if (generating === "path") {
			generator = aStar(elements, cols, start, target, true);
		} else {
			generator = getMazeAlgo(mazeType)(
				elements.length,
				cols,
				start,
				target,
				true
			);
		}
		if (resetRef.current === true) {
			dispatch(doSetVisualizationOngoing(false));
			dispatch(doSetPathVisible(false));
			dispatch(doSetReset(false));
			return;
		}
		while (true) {
			const out = generator.next();
			if (out.done === true) {
				dispatch(doSetVisualizationOngoing(false));
				if (generating === "path") {
					dispatch(doSetPathVisible(true));
				}
				break;
			}
			setElements(out.value);
		}
	};

	useEffect(() => {
		if (visualizationOngoing) {
			generate();
		}
	}, [visualizationOngoing]);

	const updateElements = (nodes) =>
		nodes.map((el, idx) => (
			<Node
				look={el}
				idx={idx}
				bindSpecial={{ ...bindSpecial() }}
				bind={{ ...bind() }}
				key={idx}
				size={size}
			/>
		));

	useEffect(() => {
		resetRef.current = reset;
		resetGrid(cols, rows, setStart, setTarget, setElements);
		dispatch(doSetVisualizationOngoing(false));
		dispatch(doSetPathVisible(false));
		if (!visualizationOngoing) {
			dispatch(doSetReset(false));
		}
	}, [cols, rows, reset]);

	return updateElements(elements);
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetGrid(cols, rows, setStart, setTarget, setElements) {
	const localStart = Math.floor(rows / 2) * cols + Math.floor(cols / 4);
	const localTarget =
		Math.floor(rows / 2) * cols + cols - Math.floor(cols / 4) - 1;
	let cleanGrid = [];
	for (let i = 0; i < cols * rows; i++) {
		if (i === localStart) {
			cleanGrid.push("start");
		} else if (i === localTarget) {
			cleanGrid.push("target");
		} else {
			cleanGrid.push("empty");
		}
	}
	setStart(localStart);
	setTarget(localTarget);
	setElements(cleanGrid);
	return [cleanGrid, localStart, localTarget];
}

const getMazeAlgo = (mazeType) => {
	switch (mazeType) {
		case "DFS":
			return depthFirstSearchMaze;
		case "Kruskal":
			return kruskalMaze;
		case "Prim":
			return primMaze;
		case "Recursive":
			return recursiveDivisionMaze;
		case "Aldous-Broder":
			return aldousBroderMaze;
		case "Wilson":
			return wilsonMaze;
		default:
			return depthFirstSearchMaze;
	}
};
