import React, { useEffect, useRef, useState } from "react";
import StyledSidebar from "./Sidebar.styled";
import Slider from "@mui/material/Slider";
import {
	doChangeSize,
	doSetDelayRef,
	doSetVisualizationOngoing,
} from "../../redux/Actions";
import { connect } from "react-redux";

function Sidebar({
	visualizationOngoing,
	setVisualizationOngoing,
	setDelayRef,
	changeSize,
}) {
	const [settings, setSettings] = useState({
		size: 50,
		delay: 50,
	});

	const delayRef = useRef(null);

	useEffect(() => {
		setDelayRef(delayRef);
	}, [delayRef]);

	const handleChange = (e) => {
		setSettings((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		if (e.target.name === "size") {
			changeSize(e.target.value);
		}
	};

	return (
		<StyledSidebar>
			<div className="sidebar-element">
				GRID SIZE
				<Slider
					disabled={visualizationOngoing}
					className="slider"
					name="size"
					defaultValue={30}
					value={settings.size}
					onChange={handleChange}
					step={1}
					min={10}
					max={70}
					valueLabelDisplay="auto"
					aria-label="size"
				/>
			</div>
			<div className="sidebar-element">
				DELAY
				<Slider
					ref={delayRef}
					className="slider"
					name="delay"
					defaultValue={50}
					value={settings.delay}
					onChange={handleChange}
					min={0}
					max={500}
					valueLabelDisplay="auto"
					aria-label="delay"
				/>
			</div>
			<div className="sidebar-element">
				<button
					disabled={visualizationOngoing}
					onClick={() => setVisualizationOngoing(true)}
				>
					GENERATE MAZE
				</button>
			</div>
		</StyledSidebar>
	);
}

const Actions = (dispatch) => ({
	changeSize: (size) => dispatch(doChangeSize(size)),
	setDelayRef: (sortType) => dispatch(doSetDelayRef(sortType)),
	setVisualizationOngoing: (visualizationOngoing) =>
		dispatch(doSetVisualizationOngoing(visualizationOngoing)),
});

const Props = (state) => ({
	visualizationOngoing: state.visualizationOngoing,
});

export default connect(Props, Actions)(Sidebar);
