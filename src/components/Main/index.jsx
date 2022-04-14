import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { doChangeDimensions } from "../../redux/Actions";
import Grid from "../Grid";
import Sidebar from "../Sidebar";
import StyledMain from "./Main.styled";

function Main({ size, changeDimensions }) {
	const mainRef = useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	const updateGrid = () => {
		changeDimensions(
			Math.floor(dimensions.width / size),
			Math.floor(dimensions.height / size)
		);
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
			<Sidebar />
			<Grid mainRef={mainRef} />
		</StyledMain>
	);
}

const Actions = (dispatch) => ({
	changeDimensions: (cols, rows) => dispatch(doChangeDimensions(cols, rows)),
});

const Props = (state) => ({
	size: state.size,
});

export default connect(Props, Actions)(Main);
