import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Grid from "../Grid";
import Sidebar from "../Sidebar";
import StyledMain from "./Main.styled";

export default function Main() {
	const [size, setSize] = useState(30);
	const [appState, setAppState] = useState({
		delayRef: 30,
		started: false,
	});

	const mainRef = useRef(null);
	const delayRef = useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [gridProps, setGridProps] = useState({
		cols: 0,
		rows: 0,
		size: size,
	});

	const updateGrid = () => {
		const cols = Math.floor(dimensions.width / size);
		const rows = Math.floor(dimensions.height / size);
		setGridProps({
			cols,
			rows,
			size: size,
		});
	};

	useLayoutEffect(() => {
		const updateWidth = () => {
			setDimensions({
				width: mainRef.current.clientWidth,
				height: mainRef.current.clientHeight,
			});
			updateGrid();
		};
		if (mainRef.current) {
			setDimensions({
				width: mainRef.current.clientWidth,
				height: mainRef.current.clientHeight,
			});
			updateGrid();
			window.addEventListener("resize", updateWidth);
		}

		return () => window.removeEventListener("resize", updateWidth);
	}, [dimensions.width]);

	useEffect(() => {
		updateGrid();
	}, [size]);

	return (
		<StyledMain>
			<Sidebar
				size={size}
				setSize={setSize}
				delayRef={delayRef}
				appState={appState}
				setAppState={setAppState}
				updateGrid={updateGrid}
			/>
			<Grid
				delayRef={delayRef}
				size={gridProps.size}
				gridDimensions={{ cols: gridProps.cols, rows: gridProps.rows }}
				mainRef={mainRef}
				started={appState.started}
			/>
		</StyledMain>
	);
}
