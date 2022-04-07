import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Grid from "../Grid";
import Sidebar from "../Sidebar";
import StyledMain from "./Main.styled";

export default function Main() {
	const [appState, setAppState] = useState({
		size: 30,
	});

	const mainRef = useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [gridProps, setGridProps] = useState({
		cols: 0,
		rows: 0,
		size: appState.size,
	});

	const updateGrid = () => {
		const cols = Math.floor(dimensions.width / appState.size);
		const rows = Math.floor(dimensions.height / appState.size);
		setGridProps({
			cols,
			rows,
			size: appState.size,
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
		console.log(window);
	}, [appState.size]);

	return (
		<StyledMain>
			<Sidebar
				size={appState.size}
				setAppState={setAppState}
				updateGrid={updateGrid}
			/>
			<Grid
				size={gridProps.size}
				gridDimensions={{ cols: gridProps.cols, rows: gridProps.rows }}
				mainRef={mainRef}
			/>
		</StyledMain>
	);
}
