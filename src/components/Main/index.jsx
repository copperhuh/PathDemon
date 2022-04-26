import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { doChangeDimensions, doChangeSize } from "../../redux/Actions";
import Grid from "../Grid";
import Sidebar from "../Sidebar";
import StyledMain from "./Main.styled";
import MenuIcon from "@mui/icons-material/Menu";
import HiddenSidebar from "../Sidebar/HiddenSidebar";

function Main({ size, changeDimensions }) {
	const mainRef = useRef(null);

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [width, setWidth] = useState(window.innerWidth);

	React.useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (open) {
			document.body.classList.add("open-modal-2");
		} else {
			document.body.classList.remove("open-modal-2");
		}
	}, [open]);

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

	return (
		<StyledMain>
			{width > 1250 ? (
				<div className="sidebar">
					<Sidebar hiddenSidebarSetOpen={false} />
				</div>
			) : (
				<button onClick={() => setOpen(true)} className="open-sidebar">
					<MenuIcon sx={{ fontSize: "2.7rem" }} />
				</button>
			)}
			<HiddenSidebar open={open} setOpen={setOpen} />
			<Grid width={width} mainRef={mainRef} />
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
